"""Image generator for Meryll Dindin's portfolio.

Generate minimalist black and white images and upload to CDN.

Usage:
    uv run python scripts/create_image.py --generate "concept description"
    uv run python scripts/create_image.py --generate "concept" --type section --upload --name "asset-name"
    uv run python scripts/create_image.py --enhance --input input/photo.jpg --upload --name "enhanced"
    uv run python scripts/create_image.py --preview "concept"
    uv run python scripts/create_image.py --list-assets
"""

import argparse
import json
import sys
from datetime import datetime
from pathlib import Path

from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv(Path(__file__).parent.parent / ".env")

from generators.images import enhance_image, generate_image, preview_prompt
from models.image import (
    IMAGE_TYPE_CONFIG,
    GeneratedImage,
    ImageResolution,
    ImageType,
)
from utils.aws import list_cdn_assets, upload_image_variants
from utils.optimize import generate_all_variants, generate_portrait_variants, generate_thumbnail_variants

SCRIPTS_DIR: Path = Path(__file__).parent
OUTPUT_DIR: Path = SCRIPTS_DIR / "output"


def create_output_directory() -> tuple[Path, str]:
    """Create timestamped output directory.

    Returns:
        Tuple of (output_path, timestamp)
    """
    timestamp: str = datetime.now().strftime("%Y%m%d-%H%M%S")
    output_path: Path = OUTPUT_DIR / timestamp
    output_path.mkdir(parents=True, exist_ok=True)
    return output_path, timestamp


def save_metadata(
    name: str,
    image_type: ImageType,
    prompt: str,
    local_paths: list[Path],
    cdn_urls: list[str] | None,
    output_dir: Path,
) -> Path:
    """Save generation metadata to JSON file.

    Args:
        name: Asset name
        image_type: Type of image generated
        prompt: Original prompt
        local_paths: List of local file paths
        cdn_urls: Optional list of CDN URLs after upload
        output_dir: Directory to save metadata

    Returns:
        Path to metadata file
    """
    metadata: GeneratedImage = GeneratedImage(
        name=name,
        image_type=image_type,
        prompt=prompt,
        local_paths=[str(p) for p in local_paths],
        cdn_urls=cdn_urls,
    )

    metadata_path: Path = output_dir / "metadata.json"
    metadata_path.write_text(
        json.dumps(metadata.model_dump(), indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    print(f"  Saved: {metadata_path}")
    return metadata_path


def run_generate(
    prompt: str,
    image_type: ImageType,
    name: str | None,
    should_upload: bool,
    cdn_path: str | None = None,
    bucket: str = "network-eu-west-3",
    region: str = "eu-west-3",
    cdn_domain: str = "cdn.merylldindin.com",
) -> None:
    """Generate a new image from prompt.

    Args:
        prompt: Concept description for image generation
        image_type: Type of image to generate
        name: Optional asset name (required if uploading)
        should_upload: Whether to upload to CDN
        cdn_path: Optional CDN path override
        bucket: S3 bucket name
        region: AWS region
        cdn_domain: CDN domain
    """
    print("\n" + "=" * 60)
    print(f"GENERATING {image_type.value.upper()} IMAGE")
    print("=" * 60 + "\n")

    if should_upload and not name:
        print("Error: --name is required when using --upload")
        sys.exit(1)

    # Create output directory
    output_dir, timestamp = create_output_directory()
    print(f"Output: {output_dir}\n")

    # Generate base image
    config = IMAGE_TYPE_CONFIG[image_type]
    base_filename: str = name or f"generated-{timestamp}"
    png_path: Path = output_dir / f"{base_filename}.png"

    print("Step 1: Generating image with Gemini...")
    generate_image(
        prompt,
        png_path,
        image_type=image_type,
        resolution=ImageResolution.HIGH,
    )

    # Create variants
    print("\nStep 2: Creating optimized variants...")
    if image_type == ImageType.THUMBNAIL:
        variant_paths: list[Path] = generate_thumbnail_variants(
            png_path, output_dir, base_filename
        )
    elif image_type == ImageType.PORTRAIT:
        variant_paths = generate_portrait_variants(png_path, output_dir, base_filename)
    else:
        variant_paths = generate_all_variants(png_path, output_dir, base_filename)

    # Upload if requested
    cdn_urls: list[str] | None = None
    if should_upload:
        print("\nStep 3: Uploading to CDN...")
        result = upload_image_variants(
            variant_paths,
            name,
            image_type,
            cdn_path_override=cdn_path,
            bucket=bucket,
            region=region,
            cdn_domain=cdn_domain,
        )
        cdn_urls = list(result.urls.values())

        print("\n" + "-" * 40)
        print("JSON SNIPPET (copy to content file):")
        print("-" * 40)
        print(result.json_snippet)
        print("-" * 40)

    # Save metadata
    print("\nSaving metadata...")
    save_metadata(
        name=name or base_filename,
        image_type=image_type,
        prompt=prompt,
        local_paths=variant_paths,
        cdn_urls=cdn_urls,
        output_dir=output_dir,
    )

    print("\n" + "=" * 60)
    print("GENERATION COMPLETE")
    print("=" * 60)
    print(f"\nOutput directory: {output_dir}")
    if cdn_urls:
        print(f"\nUploaded to CDN: {len(cdn_urls)} files")
    print("=" * 60 + "\n")


def run_enhance(
    input_path: Path,
    image_type: ImageType,
    name: str | None,
    should_upload: bool,
    style_notes: str | None,
    cdn_path: str | None = None,
    bucket: str = "network-eu-west-3",
    region: str = "eu-west-3",
    cdn_domain: str = "cdn.merylldindin.com",
) -> None:
    """Enhance an existing image to match the visual identity.

    Args:
        input_path: Path to source image
        image_type: Output image type
        name: Optional asset name (required if uploading)
        should_upload: Whether to upload to CDN
        style_notes: Additional style guidance
        cdn_path: Optional CDN path override
        bucket: S3 bucket name
        region: AWS region
        cdn_domain: CDN domain
    """
    print("\n" + "=" * 60)
    print("ENHANCING IMAGE")
    print("=" * 60 + "\n")

    if not input_path.exists():
        print(f"Error: Input file not found: {input_path}")
        sys.exit(1)

    if should_upload and not name:
        print("Error: --name is required when using --upload")
        sys.exit(1)

    # Create output directory
    output_dir, timestamp = create_output_directory()
    print(f"Output: {output_dir}")
    print(f"Input: {input_path}\n")

    # Enhance image
    base_filename: str = name or f"enhanced-{timestamp}"
    png_path: Path = output_dir / f"{base_filename}.png"

    print("Step 1: Enhancing image with Gemini...")
    enhance_image(
        input_path,
        png_path,
        image_type=image_type,
        style_notes=style_notes,
        resolution=ImageResolution.HIGH,
    )

    # Create variants
    print("\nStep 2: Creating optimized variants...")
    if image_type == ImageType.THUMBNAIL:
        variant_paths: list[Path] = generate_thumbnail_variants(
            png_path, output_dir, base_filename
        )
    elif image_type == ImageType.PORTRAIT:
        variant_paths = generate_portrait_variants(png_path, output_dir, base_filename)
    else:
        variant_paths = generate_all_variants(png_path, output_dir, base_filename)

    # Upload if requested
    cdn_urls: list[str] | None = None
    if should_upload:
        print("\nStep 3: Uploading to CDN...")
        result = upload_image_variants(
            variant_paths,
            name,
            image_type,
            cdn_path_override=cdn_path,
            bucket=bucket,
            region=region,
            cdn_domain=cdn_domain,
        )
        cdn_urls = list(result.urls.values())

        print("\n" + "-" * 40)
        print("JSON SNIPPET (copy to content file):")
        print("-" * 40)
        print(result.json_snippet)
        print("-" * 40)

    # Save metadata
    print("\nSaving metadata...")
    save_metadata(
        name=name or base_filename,
        image_type=image_type,
        prompt=f"Enhanced from: {input_path}",
        local_paths=variant_paths,
        cdn_urls=cdn_urls,
        output_dir=output_dir,
    )

    print("\n" + "=" * 60)
    print("ENHANCEMENT COMPLETE")
    print("=" * 60)
    print(f"\nOutput directory: {output_dir}")
    if cdn_urls:
        print(f"\nUploaded to CDN: {len(cdn_urls)} files")
    print("=" * 60 + "\n")


def run_preview(prompt: str, image_type: ImageType) -> None:
    """Preview the enhanced prompt without generating.

    Args:
        prompt: Concept description
        image_type: Type of image
    """
    print("\n" + "=" * 60)
    print("PROMPT PREVIEW")
    print("=" * 60 + "\n")

    enhanced: str = preview_prompt(prompt, image_type)

    print(f"Image type: {image_type.value}")
    print(f"Aspect ratio: {IMAGE_TYPE_CONFIG[image_type]['aspect_ratio']}")
    print("\n--- ENHANCED PROMPT ---\n")
    print(enhanced)
    print("\n" + "=" * 60 + "\n")


def run_list_assets(
    bucket: str = "network-eu-west-3",
    region: str = "eu-west-3",
) -> None:
    """List assets currently on the CDN.

    Args:
        bucket: S3 bucket name
        region: AWS region
    """
    print("\n" + "=" * 60)
    print("CDN ASSETS")
    print("=" * 60 + "\n")

    print("Assets (assets/):")
    for key in list_cdn_assets("assets/", bucket=bucket, region=region):
        print(f"  {key}")

    print("\nThumbnails (thumbnails/):")
    for key in list_cdn_assets("thumbnails/", bucket=bucket, region=region):
        print(f"  {key}")

    print("\n" + "=" * 60 + "\n")


def run_upload_latest(
    name: str,
    image_type: ImageType,
    cdn_path: str | None = None,
    bucket: str = "network-eu-west-3",
    region: str = "eu-west-3",
    cdn_domain: str = "cdn.merylldindin.com",
) -> None:
    """Upload the latest generated output to CDN.

    Args:
        name: Asset name for CDN
        image_type: Type of image (determines CDN path)
        cdn_path: Optional CDN path override
        bucket: S3 bucket name
        region: AWS region
        cdn_domain: CDN domain
    """
    print("\n" + "=" * 60)
    print("UPLOADING LATEST OUTPUT")
    print("=" * 60 + "\n")

    # Find latest output directory
    if not OUTPUT_DIR.exists():
        print("Error: No output directory found")
        sys.exit(1)

    output_dirs: list[Path] = sorted(OUTPUT_DIR.iterdir(), reverse=True)
    if not output_dirs:
        print("Error: No generated outputs found")
        sys.exit(1)

    latest_dir: Path = output_dirs[0]
    print(f"Latest output: {latest_dir}\n")

    # Find variant files
    if image_type == ImageType.THUMBNAIL:
        variant_paths: list[Path] = list(latest_dir.glob("*.png"))
    else:
        variant_paths = list(latest_dir.glob("*.webp"))

    if not variant_paths:
        print("Error: No image files found in latest output")
        sys.exit(1)

    print(f"Found {len(variant_paths)} files to upload\n")

    # Upload
    result = upload_image_variants(
        variant_paths,
        name,
        image_type,
        cdn_path_override=cdn_path,
        bucket=bucket,
        region=region,
        cdn_domain=cdn_domain,
    )

    print("\n" + "-" * 40)
    print("JSON SNIPPET (copy to content file):")
    print("-" * 40)
    print(result.json_snippet)
    print("-" * 40)

    print("\n" + "=" * 60)
    print("UPLOAD COMPLETE")
    print("=" * 60 + "\n")


def main() -> None:
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description="Generate minimalist black and white images for the portfolio",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s --generate "abstract representation of longevity and transhumanism"
  %(prog)s --generate "minimalist books visualization" --type section --upload --name "books"
  %(prog)s --enhance --input input/photo.jpg --type fullpage --upload --name "enhanced"
  %(prog)s --preview "sustainable city concept"
  %(prog)s --list-assets
  %(prog)s --upload --name "asset-name" --type section
        """,
    )

    mode_group = parser.add_mutually_exclusive_group(required=True)
    mode_group.add_argument(
        "--generate",
        metavar="PROMPT",
        help="Generate new image from concept prompt",
    )
    mode_group.add_argument(
        "--enhance",
        action="store_true",
        help="Enhance existing image (requires --input)",
    )
    mode_group.add_argument(
        "--preview",
        metavar="PROMPT",
        help="Preview enhanced prompt without generating",
    )
    mode_group.add_argument(
        "--list-assets",
        action="store_true",
        help="List assets currently on CDN",
    )
    mode_group.add_argument(
        "--upload",
        action="store_true",
        help="Upload latest output to CDN (requires --name)",
    )

    parser.add_argument(
        "--input",
        metavar="PATH",
        type=Path,
        help="Input image path for --enhance mode",
    )

    parser.add_argument(
        "--type",
        choices=["thumbnail", "section", "fullpage", "background", "portrait"],
        default="section",
        help="Image type (default: section)",
    )

    parser.add_argument(
        "--name",
        metavar="NAME",
        help="Asset name for CDN upload (e.g., 'mission-longevity')",
    )

    parser.add_argument(
        "--style",
        metavar="NOTES",
        help="Additional style notes for enhancement",
    )

    parser.add_argument(
        "--cdn-path",
        metavar="PATH",
        help="Override CDN path (e.g., 'articles/posters' instead of default 'assets')",
    )

    parser.add_argument(
        "--bucket",
        metavar="NAME",
        default="network-eu-west-3",
        help="S3 bucket name (default: network-eu-west-3)",
    )

    parser.add_argument(
        "--region",
        metavar="REGION",
        default="eu-west-3",
        help="AWS region (default: eu-west-3)",
    )

    parser.add_argument(
        "--cdn-domain",
        metavar="DOMAIN",
        default="cdn.merylldindin.com",
        help="CDN domain (default: cdn.merylldindin.com)",
    )

    args = parser.parse_args()

    # Convert type string to enum
    image_type: ImageType = ImageType(args.type)

    try:
        if args.generate:
            run_generate(
                prompt=args.generate,
                image_type=image_type,
                name=args.name,
                should_upload=args.name is not None,
                cdn_path=args.cdn_path,
                bucket=args.bucket,
                region=args.region,
                cdn_domain=args.cdn_domain,
            )

        elif args.enhance:
            if not args.input:
                parser.error("--enhance requires --input")
            run_enhance(
                input_path=args.input,
                image_type=image_type,
                name=args.name,
                should_upload=args.name is not None,
                style_notes=args.style,
                cdn_path=args.cdn_path,
                bucket=args.bucket,
                region=args.region,
                cdn_domain=args.cdn_domain,
            )

        elif args.preview:
            run_preview(args.preview, image_type)

        elif args.list_assets:
            run_list_assets(bucket=args.bucket, region=args.region)

        elif args.upload:
            if not args.name:
                parser.error("--upload requires --name")
            run_upload_latest(
                args.name,
                image_type,
                cdn_path=args.cdn_path,
                bucket=args.bucket,
                region=args.region,
                cdn_domain=args.cdn_domain,
            )

    except KeyboardInterrupt:
        print("\n\nAborted by user.")
        sys.exit(1)
    except Exception as e:
        print(f"\nError: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()

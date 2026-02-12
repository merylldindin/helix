"""Image optimization utilities for WebP conversion and variants.

Uses ImageMagick (convert) and cwebp for all image processing.
"""

import subprocess
from pathlib import Path

from models.image import DESKTOP_VARIANTS, MOBILE_VARIANTS, PORTRAIT_VARIANTS


def get_image_dimensions(image_path: Path) -> tuple[int, int]:
    """Get image dimensions using ImageMagick identify.

    Args:
        image_path: Path to image file

    Returns:
        Tuple of (width, height)
    """
    result = subprocess.run(
        ["identify", "-format", "%w %h", str(image_path)],
        check=True,
        capture_output=True,
        text=True,
    )
    width, height = map(int, result.stdout.strip().split())
    return width, height


def convert_to_webp(
    source_path: Path,
    output_path: Path,
    quality: int = 85,
    max_width: int | None = None,
) -> Path:
    """Convert image to WebP format with optional resizing.

    Args:
        source_path: Source image file (PNG or other format)
        output_path: Output WebP file path
        quality: WebP quality 0-100
        max_width: Optional maximum width (height auto-calculated)

    Returns:
        Path to the created WebP file
    """
    cmd: list[str] = ["cwebp", "-q", str(quality), str(source_path)]

    if max_width:
        cmd.extend(["-resize", str(max_width), "0"])

    cmd.extend(["-o", str(output_path)])

    subprocess.run(cmd, check=True, capture_output=True)
    return output_path


def crop_to_16_9(source_path: Path, output_path: Path) -> Path:
    """Crop a square image to 16:9 aspect ratio (center crop).

    Uses ImageMagick convert with gravity center crop.

    Args:
        source_path: Source image file (should be square)
        output_path: Output cropped image path

    Returns:
        Path to the cropped image
    """
    width, height = get_image_dimensions(source_path)

    # Calculate 16:9 crop dimensions from a square
    # For a square, we crop vertically (full width, reduced height)
    target_height: int = int(width * 9 // 16)

    # Use ImageMagick convert with center gravity crop
    subprocess.run(
        [
            "convert",
            str(source_path),
            "-gravity", "center",
            "-crop", f"{width}x{target_height}+0+0",
            "+repage",
            str(output_path),
        ],
        check=True,
        capture_output=True,
    )

    return output_path


def create_lazy_variant(
    source_path: Path,
    output_path: Path,
    max_width: int = 100,
    quality: int = 20,
) -> Path:
    """Create a tiny lazy-loading placeholder variant.

    Args:
        source_path: Source image file
        output_path: Output WebP file path
        max_width: Maximum width for placeholder
        quality: Low quality for small file size

    Returns:
        Path to the created lazy variant
    """
    return convert_to_webp(source_path, output_path, quality=quality, max_width=max_width)


def create_mobile_variant(
    source_path: Path,
    output_path: Path,
    max_width: int = 768,
    quality: int = 80,
) -> Path:
    """Create a mobile-optimized variant (16:9 crop from square).

    Args:
        source_path: Source image file (square)
        output_path: Output WebP file path
        max_width: Maximum width for mobile
        quality: Quality for mobile

    Returns:
        Path to the created mobile variant
    """
    # First crop to 16:9 using ImageMagick
    temp_cropped: Path = output_path.with_suffix(".cropped.png")
    crop_to_16_9(source_path, temp_cropped)

    # Then convert to WebP with resizing
    convert_to_webp(temp_cropped, output_path, quality=quality, max_width=max_width)

    # Clean up temp file
    temp_cropped.unlink()

    return output_path


def generate_all_variants(
    source_png: Path,
    output_dir: Path,
    base_name: str,
) -> list[Path]:
    """Generate all WebP variants from a source PNG.

    Desktop variants keep the original 1:1 aspect ratio.
    Mobile variants are cropped to 16:9 from the center.

    Creates:
    - {base_name}.webp (full resolution 1:1, 85% quality)
    - {base_name}-lazy.webp (100px 1:1, 20% quality)
    - {base_name}-mobile.webp (768px 16:9, 80% quality)
    - {base_name}-mobile-lazy.webp (50px 16:9, 15% quality)

    Args:
        source_png: Source PNG file from image generation (should be 1:1)
        output_dir: Directory to save variants
        base_name: Base name for output files

    Returns:
        List of paths to all created variants
    """
    output_dir.mkdir(parents=True, exist_ok=True)
    created_paths: list[Path] = []

    # Desktop variants (keep 1:1 aspect ratio)
    for variant in DESKTOP_VARIANTS:
        output_path: Path = output_dir / f"{base_name}{variant.suffix}.webp"

        print(f"  Creating {variant.description}...")
        convert_to_webp(
            source_png,
            output_path,
            quality=variant.quality,
            max_width=variant.max_width,
        )
        created_paths.append(output_path)
        print(f"    Saved: {output_path.name}")

    # Mobile variants (crop to 16:9)
    for variant in MOBILE_VARIANTS:
        output_path: Path = output_dir / f"{base_name}{variant.suffix}.webp"

        print(f"  Creating {variant.description}...")
        create_mobile_variant(
            source_png,
            output_path,
            max_width=variant.max_width,
            quality=variant.quality,
        )
        created_paths.append(output_path)
        print(f"    Saved: {output_path.name}")

    return created_paths


def generate_portrait_variants(
    source_png: Path,
    output_dir: Path,
    base_name: str,
) -> list[Path]:
    """Generate portrait WebP variants from a 9:16 source PNG.

    Portrait images are used as mobile backgrounds - no cropping needed,
    just resize and compress.

    Creates:
    - {base_name}-mobile.webp (768px wide, 80% quality)
    - {base_name}-mobile-lazy.webp (50px wide, 15% quality)

    Args:
        source_png: Source PNG file from image generation (should be 9:16)
        output_dir: Directory to save variants
        base_name: Base name for output files

    Returns:
        List of paths to all created variants
    """
    output_dir.mkdir(parents=True, exist_ok=True)
    created_paths: list[Path] = []

    for variant in PORTRAIT_VARIANTS:
        output_path: Path = output_dir / f"{base_name}{variant.suffix}.webp"

        print(f"  Creating {variant.description}...")
        convert_to_webp(
            source_png,
            output_path,
            quality=variant.quality,
            max_width=variant.max_width,
        )
        created_paths.append(output_path)
        print(f"    Saved: {output_path.name}")

    return created_paths


def generate_thumbnail_variants(
    source_png: Path,
    output_dir: Path,
    base_name: str,
) -> list[Path]:
    """Generate thumbnail variants as WebP.

    Thumbnails are used for OG images and don't need lazy/mobile variants.
    Generated at 16:9 and cropped to exactly 1200x630 (1.9:1) for OG compatibility.

    Uses ImageMagick convert for resize and crop operations, then cwebp for WebP.

    Args:
        source_png: Source PNG file from image generation (16:9)
        output_dir: Directory to save thumbnail
        base_name: Base name for output file

    Returns:
        List containing single WebP path
    """
    output_dir.mkdir(parents=True, exist_ok=True)
    temp_png: Path = output_dir / f"{base_name}_temp.png"
    output_path: Path = output_dir / f"{base_name}.webp"

    # Use ImageMagick to resize to 1200px width then center crop to 630px height
    # 16:9 at 1200px width = 675px height, crop to 630px (center)
    subprocess.run(
        [
            "convert",
            str(source_png),
            "-resize", "1200x",           # Resize to 1200px width
            "-gravity", "center",
            "-crop", "1200x630+0+0",       # Center crop to exact OG dimensions
            "+repage",
            str(temp_png),
        ],
        check=True,
        capture_output=True,
    )

    # Convert to WebP with high quality for OG images
    convert_to_webp(temp_png, output_path, quality=90)

    # Clean up temp file
    temp_png.unlink()

    print(f"  Saved thumbnail: {output_path.name} (1200x630)")
    return [output_path]

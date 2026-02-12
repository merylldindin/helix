"""AWS S3 upload utilities for CDN deployment."""

import os
from datetime import datetime
from pathlib import Path

import boto3
from botocore.config import Config

from models.image import IMAGE_TYPE_CONFIG, ImageType, PORTRAIT_VARIANTS, UploadResult


def get_versioned_name(base_name: str, suffix: str = "") -> str:
    """Generate versioned filename with ISO timestamp.

    Args:
        base_name: Base asset name (e.g., 'books-thumbnail')
        suffix: Optional suffix (e.g., '-lazy', '-mobile')

    Returns:
        Versioned name like 'books-thumbnail-20260201T204153' or 'books-thumbnail-20260201T204153-lazy'
    """
    timestamp: str = datetime.now().strftime("%Y%m%dT%H%M%S")
    if suffix:
        return f"{base_name}-{timestamp}{suffix}"
    return f"{base_name}-{timestamp}"


def get_s3_client(region: str = "eu-west-3"):
    """Create S3 client with configured profile.

    Args:
        region: AWS region

    Returns:
        boto3 S3 client
    """
    profile: str = os.getenv("AWS_PROFILE", "personal")

    session = boto3.Session(profile_name=profile)
    return session.client(
        "s3",
        region_name=region,
        config=Config(signature_version="s3v4"),
    )


def get_content_type(file_path: Path) -> str:
    """Get content type for file.

    Args:
        file_path: Path to file

    Returns:
        MIME content type
    """
    suffix: str = file_path.suffix.lower()
    content_types: dict[str, str] = {
        ".webp": "image/webp",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
    }
    return content_types.get(suffix, "application/octet-stream")


def upload_to_s3(
    local_path: Path,
    s3_key: str,
    bucket: str = "network-eu-west-3",
    region: str = "eu-west-3",
    cdn_domain: str = "cdn.merylldindin.com",
) -> str:
    """Upload a single file to S3.

    Args:
        local_path: Local file path
        s3_key: S3 object key (path within bucket)
        bucket: S3 bucket name
        region: AWS region
        cdn_domain: CDN domain for URL generation

    Returns:
        Full CDN URL
    """
    client = get_s3_client(region)

    print(f"  Uploading {local_path.name} to s3://{bucket}/{s3_key}")

    client.upload_file(
        str(local_path),
        bucket,
        s3_key,
        ExtraArgs={
            "ContentType": get_content_type(local_path),
            "CacheControl": "public, max-age=31536000",
        },
    )

    cdn_url: str = f"https://{cdn_domain}/{s3_key}"
    print(f"    CDN URL: {cdn_url}")

    return cdn_url


def upload_image_variants(
    variant_paths: list[Path],
    name: str,
    image_type: ImageType,
    cdn_path_override: str | None = None,
    bucket: str = "network-eu-west-3",
    region: str = "eu-west-3",
    cdn_domain: str = "cdn.merylldindin.com",
) -> UploadResult:
    """Upload all image variants to S3 with versioned filenames.

    Files are uploaded with ISO timestamp for version control:
    - books-thumbnail-20260201T204153.png
    - books-20260201T204153.webp
    - books-20260201T204153-lazy.webp

    Args:
        variant_paths: List of local file paths for all variants
        name: Base name for the asset
        image_type: Type of image (determines CDN path)
        cdn_path_override: Optional CDN path override
        bucket: S3 bucket name
        region: AWS region
        cdn_domain: CDN domain for URL generation

    Returns:
        UploadResult with all CDN URLs and JSON snippet
    """
    config = IMAGE_TYPE_CONFIG[image_type]
    cdn_path: str = (cdn_path_override or config["cdn_path"]).rstrip("/")

    # Generate timestamp once for all variants
    timestamp: str = datetime.now().strftime("%Y%m%dT%H%M%S")
    versioned_base: str = f"{name}-{timestamp}"

    urls: dict[str, str] = {}

    for variant_path in variant_paths:
        # Determine variant suffix from filename
        filename: str = variant_path.stem
        if filename.endswith("-mobile-lazy"):
            suffix = "-mobile-lazy"
        elif filename.endswith("-mobile"):
            suffix = "-mobile"
        elif filename.endswith("-lazy"):
            suffix = "-lazy"
        else:
            suffix = ""

        # Build versioned S3 key
        extension: str = variant_path.suffix
        versioned_filename: str = f"{versioned_base}{suffix}{extension}"
        s3_key: str = f"{cdn_path}/{versioned_filename}"

        # Upload
        cdn_url: str = upload_to_s3(
            variant_path, s3_key, bucket=bucket, region=region, cdn_domain=cdn_domain
        )
        urls[suffix] = cdn_url

    # Generate JSON snippet for content files (with versioned names)
    if image_type == ImageType.THUMBNAIL:
        json_snippet: str = f'''"thumbnail": "https://{cdn_domain}/{cdn_path}/{versioned_base}.webp"'''
    elif image_type == ImageType.PORTRAIT:
        json_snippet = f'''"mobile": "https://{cdn_domain}/{cdn_path}/{versioned_base}-mobile.webp",
"lazyMobile": "https://{cdn_domain}/{cdn_path}/{versioned_base}-mobile-lazy.webp"'''
    else:
        json_snippet = f'''"image": {{
  "altText": "AI-generated abstract representation",
  "source": "https://{cdn_domain}/{cdn_path}/{versioned_base}.webp",
  "lazySource": "https://{cdn_domain}/{cdn_path}/{versioned_base}-lazy.webp",
  "mobile": "https://{cdn_domain}/{cdn_path}/{versioned_base}-mobile.webp",
  "lazyMobile": "https://{cdn_domain}/{cdn_path}/{versioned_base}-mobile-lazy.webp"
}}'''

    return UploadResult(
        name=versioned_base,
        cdn_path=cdn_path,
        urls=urls,
        json_snippet=json_snippet,
    )


def list_cdn_assets(
    prefix: str = "assets/",
    bucket: str = "network-eu-west-3",
    region: str = "eu-west-3",
) -> list[str]:
    """List assets in the CDN bucket.

    Args:
        prefix: S3 prefix to filter (default: assets/)
        bucket: S3 bucket name
        region: AWS region

    Returns:
        List of S3 keys
    """
    client = get_s3_client(region)

    response = client.list_objects_v2(Bucket=bucket, Prefix=prefix)

    keys: list[str] = []
    if "Contents" in response:
        for obj in response["Contents"]:
            keys.append(obj["Key"])

    return keys

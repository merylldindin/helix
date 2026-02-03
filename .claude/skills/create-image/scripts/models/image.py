"""Image content models for portfolio generation."""

from enum import Enum

from pydantic import BaseModel, Field


class ImageType(str, Enum):
    """Image type enumeration."""

    THUMBNAIL = "thumbnail"
    SECTION = "section"
    FULLPAGE = "fullpage"
    BACKGROUND = "background"


class ImageResolution(str, Enum):
    """Image resolution for generation."""

    STANDARD = "1K"
    HIGH = "2K"


IMAGE_TYPE_CONFIG: dict[ImageType, dict] = {
    ImageType.THUMBNAIL: {
        "aspect_ratio": "16:9",  # Generate at 16:9, then resize to 1200x630
        "width": 1200,
        "height": 630,
        "cdn_path": "thumbnails",
        "format": "png",
    },
    ImageType.SECTION: {
        "aspect_ratio": "1:1",
        "width": 1080,
        "height": 1080,
        "cdn_path": "assets",
        "format": "webp",
    },
    ImageType.FULLPAGE: {
        "aspect_ratio": "1:1",
        "width": 1080,
        "height": 1080,
        "cdn_path": "assets",
        "format": "webp",
    },
    ImageType.BACKGROUND: {
        "aspect_ratio": "16:9",
        "width": 1920,
        "height": 1080,
        "cdn_path": "assets",
        "format": "webp",
    },
}


class ImageVariant(BaseModel):
    """Generated image variant."""

    suffix: str = Field(description="File suffix (e.g., '', '-lazy', '-mobile')")
    max_width: int | None = Field(description="Maximum width in pixels")
    quality: int = Field(description="WebP quality 0-100")
    description: str = Field(description="Variant purpose")
    is_mobile: bool = Field(default=False, description="Whether this is a mobile variant (16:9)")


# Desktop variants (keep original aspect ratio)
DESKTOP_VARIANTS: list[ImageVariant] = [
    ImageVariant(
        suffix="",
        max_width=None,
        quality=85,
        description="Full resolution desktop (1:1)",
    ),
    ImageVariant(
        suffix="-lazy",
        max_width=100,
        quality=20,
        description="Desktop blur placeholder",
    ),
]

# Mobile variants (16:9 aspect ratio)
MOBILE_VARIANTS: list[ImageVariant] = [
    ImageVariant(
        suffix="-mobile",
        max_width=768,
        quality=80,
        description="Mobile optimized (16:9)",
        is_mobile=True,
    ),
    ImageVariant(
        suffix="-mobile-lazy",
        max_width=50,
        quality=15,
        description="Mobile blur placeholder (16:9)",
        is_mobile=True,
    ),
]

# Combined for backwards compatibility
IMAGE_VARIANTS: list[ImageVariant] = DESKTOP_VARIANTS + MOBILE_VARIANTS


class GeneratedImage(BaseModel):
    """Metadata for a generated image."""

    name: str = Field(description="Base name for the image (e.g., 'mission-longevity')")
    image_type: ImageType = Field(description="Type of image generated")
    prompt: str = Field(description="Original generation prompt")
    local_paths: list[str] = Field(description="Local file paths for all variants")
    cdn_urls: list[str] | None = Field(
        default=None, description="CDN URLs after upload"
    )


class EnhanceRequest(BaseModel):
    """Request to enhance an existing image."""

    input_path: str = Field(description="Path to source image")
    image_type: ImageType = Field(
        default=ImageType.SECTION, description="Output image type"
    )
    style_notes: str | None = Field(
        default=None, description="Additional style guidance"
    )


class UploadResult(BaseModel):
    """Result of CDN upload."""

    name: str = Field(description="Asset name")
    cdn_path: str = Field(description="CDN base path (assets/ or thumbnails/)")
    urls: dict[str, str] = Field(
        description="Map of variant suffix to full CDN URL"
    )
    json_snippet: str = Field(
        description="JSON snippet for content files"
    )

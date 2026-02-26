"""Image generation using Gemini for minimalist black and white portfolio visuals."""

import time
from pathlib import Path

from google import genai
from google.genai import types
from PIL import Image

from models.image import IMAGE_TYPE_CONFIG, ImageResolution, ImageType

GEMINI_IMAGE_MODEL: str = "gemini-3.1-flash-image-preview"

VISUAL_IDENTITY_SUFFIX: str = """
Style Requirements (CRITICAL - MUST FOLLOW EXACTLY):
- Background: Pure WHITE or very light gray (#F5F5F5). White is dominant.
- Lines: Thin BLACK line drawings only. Clean geometric strokes.
- Style: Flat 2D vector illustration, isometric perspective allowed. Like a technical diagram or icon.
- Composition: Extremely minimal. One simple centered object/concept. Generous white space on all sides.
- Aesthetic: Clean, modern, geometric. Think Apple-style simplicity.
- NO text, NO labels, NO words, NO letters, NO numbers in the image.
- NO gradients, NO shadows, NO 3D rendering, NO photorealism.
- NO color - only black lines on white background.
- NO complex scenes - just one simple iconic representation.
- NO human faces or bodies.
- Reproducible: Design should be simple enough to recreate consistently.
"""


def build_enhanced_prompt(user_prompt: str, image_type: ImageType) -> str:
    """Enhance user prompt with visual identity requirements.

    Args:
        user_prompt: User's concept description
        image_type: Type of image being generated

    Returns:
        Enhanced prompt with style requirements
    """
    config = IMAGE_TYPE_CONFIG[image_type]

    # Add aspect ratio context
    aspect_note: str = f"Output format: {config['aspect_ratio']} aspect ratio."

    # Always enforce the minimalist white background + black line style
    style_prefix: str = (
        "Create a minimalist icon-style illustration. "
        "White background, thin black line drawing only. "
        "Simple, geometric, centered composition. "
        "No text or labels. "
        "Concept: "
    )

    return f"{style_prefix}{user_prompt}\n\n{aspect_note}\n{VISUAL_IDENTITY_SUFFIX}"


def generate_image(
    prompt: str,
    output_path: Path,
    image_type: ImageType = ImageType.SECTION,
    resolution: ImageResolution = ImageResolution.HIGH,
    max_retries: int = 3,
) -> None:
    """Generate a minimalist black and white image using Gemini.

    Args:
        prompt: Image generation prompt (will be enhanced with style requirements)
        output_path: Path to save the PNG file
        image_type: Type of image (determines aspect ratio)
        resolution: Image resolution ("1K" or "2K")
        max_retries: Maximum retry attempts on failure
    """
    client: genai.Client = genai.Client()
    config = IMAGE_TYPE_CONFIG[image_type]

    # Build enhanced prompt with visual identity
    enhanced_prompt: str = build_enhanced_prompt(prompt, image_type)

    print(f"Generating {image_type.value} image...")
    print(f"  Aspect ratio: {config['aspect_ratio']}")
    print(f"  Resolution: {resolution.value}")

    for attempt in range(max_retries):
        try:
            response = client.models.generate_content(
                model=GEMINI_IMAGE_MODEL,
                contents=enhanced_prompt,
                config=types.GenerateContentConfig(
                    response_modalities=["IMAGE"],
                    image_config=types.ImageConfig(
                        aspectRatio=config["aspect_ratio"],
                        imageSize=resolution.value,
                    ),
                ),
            )

            if not response.candidates:
                raise RuntimeError("No candidates in image generation response")

            candidate = response.candidates[0]
            if not candidate.content or not candidate.content.parts:
                raise RuntimeError("Empty content in image generation response")

            for part in candidate.content.parts:
                if part.inline_data is not None:
                    image_data: bytes = part.inline_data.data
                    output_path.write_bytes(image_data)
                    print(f"  Generated: {output_path}")
                    return

            raise RuntimeError("No image data found in response")

        except Exception as e:
            if attempt < max_retries - 1:
                wait_time: float = (attempt + 1) * 2.0
                print(f"  Retry {attempt + 1}/{max_retries} after {wait_time}s: {e}")
                time.sleep(wait_time)
            else:
                raise RuntimeError(f"Failed after {max_retries} attempts: {e}") from e


def enhance_image(
    input_path: Path,
    output_path: Path,
    image_type: ImageType = ImageType.SECTION,
    style_notes: str | None = None,
    resolution: ImageResolution = ImageResolution.HIGH,
    max_retries: int = 3,
) -> None:
    """Transform an existing image to match the minimalist black and white style.

    Args:
        input_path: Path to the input image
        output_path: Path to save the enhanced PNG
        image_type: Output image type (determines aspect ratio)
        style_notes: Additional style guidance
        resolution: Image resolution
        max_retries: Maximum retry attempts on failure
    """
    client: genai.Client = genai.Client()
    config = IMAGE_TYPE_CONFIG[image_type]

    input_image = Image.open(input_path)

    # Build edit prompt
    edit_prompt: str = f"""Transform this image into a minimalist black and white abstract visualization.

REQUIRED TRANSFORMATIONS:
1. Convert to pure black and white (no color, no sepia)
2. Apply lo-fi, scientific, algorithmic aesthetic
3. Simplify composition to focus on one core concept
4. Add subtle geometric or data visualization elements
5. Ensure clean, uncluttered negative space
6. Make it feel like a technical blueprint or wireframe

Output format: {config['aspect_ratio']} aspect ratio.
"""

    if style_notes:
        edit_prompt += f"\n\nAdditional guidance: {style_notes}"

    edit_prompt += VISUAL_IDENTITY_SUFFIX

    print(f"Enhancing image to {image_type.value} format...")
    print(f"  Input: {input_path}")
    print(f"  Aspect ratio: {config['aspect_ratio']}")

    contents: list = [edit_prompt, input_image]

    for attempt in range(max_retries):
        try:
            response = client.models.generate_content(
                model=GEMINI_IMAGE_MODEL,
                contents=contents,
                config=types.GenerateContentConfig(
                    response_modalities=["IMAGE"],
                    image_config=types.ImageConfig(
                        aspectRatio=config["aspect_ratio"],
                        imageSize=resolution.value,
                    ),
                ),
            )

            if not response.candidates:
                raise RuntimeError("No candidates in image enhancement response")

            candidate = response.candidates[0]
            if not candidate.content or not candidate.content.parts:
                raise RuntimeError("Empty content in image enhancement response")

            for part in candidate.content.parts:
                if part.inline_data is not None:
                    image_data: bytes = part.inline_data.data
                    output_path.write_bytes(image_data)
                    print(f"  Enhanced: {output_path}")
                    return

            raise RuntimeError("No image data found in response")

        except Exception as e:
            if attempt < max_retries - 1:
                wait_time: float = (attempt + 1) * 2.0
                print(f"  Retry {attempt + 1}/{max_retries} after {wait_time}s: {e}")
                time.sleep(wait_time)
            else:
                raise RuntimeError(f"Failed after {max_retries} attempts: {e}") from e


def preview_prompt(prompt: str, image_type: ImageType = ImageType.SECTION) -> str:
    """Preview the enhanced prompt without generating an image.

    Args:
        prompt: User's concept description
        image_type: Type of image

    Returns:
        The enhanced prompt that would be sent to Gemini
    """
    return build_enhanced_prompt(prompt, image_type)

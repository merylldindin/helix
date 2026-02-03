---
name: create-image
description: Generates minimalist black and white images for the portfolio. Creates optimized WebP variants (desktop, mobile, lazy) and uploads to AWS S3/CloudFront CDN.
allowed-tools: Read, Glob, Bash, WebFetch
---

# Image Generation Skill

Generates portfolio images following Meryll Dindin's visual identity. See `references/visual-identity.md` for style guidelines.

## When to Use

- Creating images for portfolio pages (/missions/, /suggestions/, /ventures/, /thoughts/)
- Generating thumbnails, section images, or backgrounds
- Replacing or updating existing CDN images

## Commands

Run from `.claude/skills/create-image/`:

```bash
# Generate and upload
uv run python scripts/create_image.py --generate "prompt" --name "asset-name"

# Generate to custom CDN path (e.g., for /thoughts/ articles)
uv run python scripts/create_image.py --generate "prompt" --name "asset" --cdn-path "articles/posters"

# Generate specific type
uv run python scripts/create_image.py --generate "prompt" --type thumbnail --name "asset"

# Enhance existing image
uv run python scripts/create_image.py --enhance --input path/to/image --name "asset"

# Preview prompt only
uv run python scripts/create_image.py --preview "prompt"

# List CDN assets
uv run python scripts/create_image.py --list-assets
```

## Image Types

| Type         | Dimensions | CDN Path      | Use Case         |
| ------------ | ---------- | ------------- | ---------------- |
| `section`    | 1080x1080  | `assets/`     | Section images   |
| `fullpage`   | 1080x1080  | `assets/`     | Full-page images |
| `thumbnail`  | 1200x630   | `thumbnails/` | OG images        |
| `background` | 1920x1080  | `assets/`     | Page backgrounds |

## Output Variants

Each image produces 4 WebP files:

- Desktop (1:1, 85% quality)
- Desktop lazy (100px, 20% quality)
- Mobile (16:9 center crop, 768px)
- Mobile lazy (50px, 15% quality)

## Visual Identity Summary

- **Monochrome**: Black and white only
- **Minimalist**: One concept, generous whitespace
- **Abstract**: Conceptual, not literal
- **Lo-fi**: Scientific, algorithmic aesthetic

See `references/visual-identity.md` for full guidelines and prompt templates.

## After Upload

Update the relevant JSON content file with the returned URLs:

```json
{
  "image": {
    "source": "https://cdn.merylldindin.com/assets/{name}-{timestamp}.webp",
    "lazySource": "...-lazy.webp",
    "mobile": "...-mobile.webp",
    "lazyMobile": "...-mobile-lazy.webp"
  }
}
```

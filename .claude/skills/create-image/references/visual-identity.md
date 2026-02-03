# Visual Identity Guidelines

## Core Principles

Meryll Dindin's portfolio uses a consistent minimalist visual language across all imagery.

### 1. White Background, Black Lines

- **Background**: Pure white (#FFFFFF) or very light gray (#F5F5F5)
- **Drawings**: Thin black lines only
- **Style**: Flat 2D vector illustration, clean geometric strokes
- **Never**: Color, gradients, shadows, 3D effects, photorealism

### 2. Extreme Minimalism

- One simple concept per image
- Generous white space on all sides
- Single centered object/icon
- Clean, uncluttered layouts
- Think: Apple-style simplicity

### 3. Icon-Style Illustrations

- Simple geometric shapes
- Isometric perspective allowed
- Technical diagram aesthetic
- Reproducible designs (simple enough to recreate consistently)
- Like a refined line icon or technical illustration

### 4. Prohibited Elements

- **NO TEXT**: No labels, words, letters, numbers
- **NO FACES**: No human faces or bodies
- **NO COLOR**: Only black on white
- **NO COMPLEXITY**: No busy scenes, multiple objects, or detailed backgrounds
- **NO REALISM**: No photographs or photorealistic renders

## Image Prompt Template

Use this structure for consistent results:

```
Using a lo-fi, scientific, and algorithmic tone, create an abstract [STYLE] of [CONCEPT].

Key elements:
- [Specific visual element 1]
- [Specific visual element 2]
- [Mood/atmosphere]

Style: Black and white, minimalist, high contrast, [additional style notes].
```

### Style Options

- **depiction**: General abstract representation
- **visualization**: Data/technical focus
- **portrayal**: Emotional/conceptual focus
- **interpretation**: Artistic/creative focus

## Existing Image Examples

### Mission Page Images

**Longevity** (`mission-longevity.webp`):

> "Using a lo-fi, scientific, and algorithmic tone, create an abstract depiction of transhumanism that reflects the potential for humans to live beyond a thousand years. Consider the dichotomy of our primal origins and future bio-digital enhancements, and weave in the complexity and paradoxes of such an extended lifespan."

**Sustainable City** (`mission-city.webp`):

> "Using a lo-fi, scientific, and algorithmic tone, envision and construct an abstract portrayal of a futuristic, self-sustaining city devoid of government, where humans live harmoniously amidst pollution-free surroundings."

**Academy** (`mission-academy.webp`):

> "Using a lo-fi, scientific, and algorithmic tone, develop a vision of a new-age academy, focusing on the mission of fostering critical thinking skills and the resurgence of autonomous, self-reliant humans."

### Suggestion Section Images

These are simpler, single-concept visuals:

- `books.webp`: Abstract book/knowledge representation
- `enhancers.webp`: Abstract health/biohacking visualization
- `newsletters.webp`: Abstract communication/information flow
- `podcasts.webp`: Abstract audio/conversation waves
- `toolkits.webp`: Abstract tools/coding elements

## Technical Requirements

### Resolution by Type

| Type           | Dimensions | Aspect Ratio |
| -------------- | ---------- | ------------ |
| Thumbnail (OG) | 1200x630   | 1.91:1       |
| Section        | 1080x1080  | 1:1 (square) |
| Full Page      | 1080x1080  | 1:1 (square) |
| Background     | 1920x1080  | 16:9         |

### Optimization

All images are served as WebP with 4 variants:

- Desktop full resolution (1:1, 85% quality)
- Desktop lazy placeholder (1:1, 20% quality, 100px width)
- Mobile (16:9 center crop, 80% quality, 768px max width)
- Mobile lazy (16:9 center crop, 15% quality, 50px width)

**Workflow:** Generate a square (1:1) image, then crop to 16:9 for mobile variants.

## Prohibited Elements

- Human faces (hands are acceptable in abstract contexts)
- Realistic photographs
- Color (unless explicitly requested for special cases)
- Text or typography within the image
- Logos or brand marks
- Cluttered or busy compositions
- Stock photo aesthetic
- Literal representations of concepts

## Consistency Checklist

Before finalizing any image:

- [ ] Is it black and white only?
- [ ] Does it convey ONE clear concept?
- [ ] Is the composition clean and minimal?
- [ ] Does it feel lo-fi/scientific/algorithmic?
- [ ] Is it abstract rather than literal?
- [ ] Does it match the existing portfolio aesthetic?
- [ ] Are there no prohibited elements?

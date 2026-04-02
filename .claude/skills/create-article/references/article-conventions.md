# Article JSON Conventions

## File Structure

```
src/content/pages/thoughts/SCREAMING_SNAKE_NAME.json
```

## Top-Level Schema

```json
{
  "layout": "scrolled",
  "schema": {
    "type": "blogPosting",
    "prop": {
      "dateModified": "YYYY-MM-DD",
      "datePublished": "YYYY-MM-DD",
      "keywords": "comma, separated, keywords"
    }
  },
  "head": {
    "canonical": "/thoughts/{kebab-slug}/",
    "title": "{Short Title} | Meryll Dindin",
    "description": "120-160 chars",
    "ogType": "article",
    "thumbnail": "https://cdn.merylldindin.com/thumbnails/{slug}-{timestamp}.webp",
    "thumbnailAlt": "Description of thumbnail image"
  },
  "components": [
    {
      "name": "ARTICLE_SECTION",
      "id": "home-section",
      "props": {
        "background": { ... },
        "content": [ ... ]
      }
    }
  ]
}
```

## Background Image Object

```json
{
  "altText": "Descriptive alt text for the header image",
  "darkModeTreatment": "invert-on-dark",
  "source": "https://cdn.merylldindin.com/articles/headers/{slug}-{timestamp}.webp",
  "lazySource": "...headers/{slug}-{timestamp}-lazy.webp",
  "mobile": "...headers/{slug}-{timestamp}-mobile.webp",
  "lazyMobile": "...headers/{slug}-{timestamp}-mobile-lazy.webp"
}
```

## Content Array Elements

### H1 Title (exactly one, first element)

```json
{
  "type": "headline",
  "prop": {
    "level": 1,
    "text": "Article Title Here",
    "typography": "text-cartesian headline-2"
  }
}
```

### Date (exactly one, second element)

```json
{
  "type": "headline",
  "prop": {
    "level": 2,
    "text": "Initially published Month DD, YYYY",
    "typography": "text-lexend-deca headline-6"
  }
}
```

### Section Headings (H2)

```json
{
  "type": "headline",
  "prop": {
    "level": 2,
    "text": "Section Title",
    "typography": "text-lexend-deca headline-4 my-6"
  }
}
```

### Body Text

```json
{
  "type": "text",
  "prop": "Paragraph content here."
}
```

**Unicode escaping:** Use curly quotes and typographic punctuation in article body text, never straight ASCII equivalents.

- `\u2019` — right single quote / apostrophe (')
- `\u201c` / `\u201d` — left / right double quotes ("")
- `\u2014` — em-dash (—)

### Inline Images (within body, between text blocks)

```json
{
  "type": "image",
  "prop": {
    "altText": "Descriptive alt text for the inline image",
    "source": "https://cdn.merylldindin.com/articles/sections/{slug}-{timestamp}.webp",
    "lazySource": "...sections/{slug}-{timestamp}-lazy.webp",
    "mobile": "...sections/{slug}-{timestamp}-mobile.webp",
    "lazyMobile": "...sections/{slug}-{timestamp}-mobile-lazy.webp"
  }
}
```

Use for user-provided screenshots, diagrams, or data visualizations embedded within the article body. These are distinct from the background header image. Place immediately after the paragraph that contextualizes the image.

### Mermaid Diagrams (inline, between text blocks)

For technical or architectural articles, mermaid diagrams are pre-rendered to PNG, converted to WebP, and embedded as image blocks with dark mode inversion support.

**When to use:** Architecture flows, request lifecycles, infrastructure stacks, build roadmaps. Use sparingly — only when a diagram communicates something the text alone cannot. If the text already enumerates a list, a diagram restating that list in boxes adds nothing.

**Diagram rules:**
- All diagrams must use `graph LR` (left-to-right). Minimize vertical height.
- Avoid fan-in/fan-out patterns (many nodes → one node) — mermaid stacks these vertically regardless of `LR`. Instead, consolidate multiple sources into grouped nodes using `<br/>` line breaks.
- No subgraph wrappers unless they add real semantic grouping — subgraphs force vertical stacking.
- Keep node labels short. Use `·` as a separator within grouped nodes.

**Theme and rendering:**
- Use a B&W mermaid theme config (white backgrounds, black text/borders, no color).
- Render with transparent background (`-b transparent`). The `darkModeTreatment: "invert-on-dark"` property on the image triggers a dedicated CSS class (`custom-image-invert-on-dark`) that applies only `filter: invert(1)` — no background color, no blend mode — so transparency is preserved in both light and dark modes.
- Mermaid config:
  ```json
  {
    "theme": "base",
    "themeVariables": {
      "primaryColor": "#ffffff",
      "primaryTextColor": "#000000",
      "primaryBorderColor": "#000000",
      "lineColor": "#000000",
      "secondaryColor": "#ffffff",
      "tertiaryColor": "#ffffff",
      "background": "#ffffff",
      "mainBkg": "#ffffff",
      "nodeBorder": "#000000",
      "clusterBkg": "#ffffff",
      "clusterBorder": "#000000",
      "titleColor": "#000000",
      "edgeLabelBackground": "#ffffff",
      "nodeTextColor": "#000000"
    }
  }
  ```
- Render: `npx @mermaid-js/mermaid-cli -i diagram.mmd -o diagram.png -w 1600 -b transparent -c mermaid-config.json`
- Convert with alpha preserved: `cwebp -q 85 -alpha_q 100 input.png -o output.webp`

**Conversion and upload:**
Same as user-provided images (cwebp → S3), uploaded to `articles/sections/`.

**JSON block:**
```json
{
  "type": "image",
  "prop": {
    "darkModeTreatment": "invert-on-dark",
    "altText": "Diagram of [what it shows]",
    "source": "https://cdn.merylldindin.com/articles/sections/{slug}-{name}-{timestamp}.webp",
    "lazySource": "...-lazy.webp",
    "mobile": "...-mobile.webp",
    "lazyMobile": "...-mobile-lazy.webp"
  }
}
```

IMPORTANT: Always include `"darkModeTreatment": "invert-on-dark"` — this inverts the diagram in dark mode (black-on-white → white-on-black) via the `ContentGenerator` component.

**Redundancy check:** Before finalizing, review all diagrams against the surrounding text. Remove any diagram that merely restates what the text already says. A good diagram shows relationships or flow that prose handles poorly. A bad diagram puts a bulleted list into boxes.

### Social Share Block (after final paragraph, before references)

```json
{
  "type": "networks",
  "prop": {
    "quote": "Checkout the article ''{Article Title}'' by Meryll Dindin \ud83d\udc40",
    "url": "/thoughts/{slug}/"
  }
}
```

### References Section Heading

```json
{
  "type": "headline",
  "prop": {
    "level": 2,
    "text": "References",
    "typography": "headline-3 my-6"
  }
}
```

### Reference Links

```json
{
  "type": "article",
  "prop": {
    "href": "https://example.com",
    "title": "Source Title",
    "description": "One-line description of the source."
  }
}
```

## Listing Page Entry (THOUGHTS_PAGE.json)

Add to the `components` array, **sorted by publication date (newest first)**:

```json
{
  "name": "IMAGE_SECTION",
  "id": "{slug}-section",
  "props": {
    "content": [
      {
        "type": "headline",
        "prop": {
          "level": 2,
          "text": "Short Display Title",
          "typography": "text-cartesian headline-2"
        }
      },
      {
        "type": "headline",
        "prop": {
          "level": 3,
          "text": "Month DD, YYYY",
          "typography": "text-lexend-deca headline-6 mb-3"
        }
      },
      {
        "type": "text",
        "prop": "One-sentence article description matching the meta description."
      },
      {
        "type": "more",
        "prop": {
          "ariaLabel": "Read the blog article {Full Title}",
          "to": "/thoughts/{slug}/"
        }
      }
    ],
    "image": {
      "altText": "Descriptive alt text for the poster image",
      "darkModeTreatment": "invert-on-dark",
      "source": "https://cdn.merylldindin.com/articles/posters/{slug}-{timestamp}.webp",
      "lazySource": "...posters/{slug}-{timestamp}-lazy.webp",
      "mobile": "...posters/{slug}-{timestamp}-mobile.webp",
      "lazyMobile": "...posters/{slug}-{timestamp}-mobile-lazy.webp"
    }
  }
}
```

## SEO

See `.claude/rules/content-system.md` and `CLAUDE.md` for full SEO rules. Key article-specific note: canonical must use trailing slash (`/thoughts/{slug}/`).

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

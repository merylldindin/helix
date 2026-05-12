# Content System

## Page JSON Structure

Pages are defined in `app/content/pages/*.json`:

```json
{
  "layout": "default",
  "schema": { "type": "WebPage", "name": "..." },
  "head": {
    "title": "Page Title | Meryll Dindin",
    "description": "120-160 char description",
    "canonical": "/page/",
    "thumbnail": "https://cdn.merylldindin.com/thumbnails/..."
  },
  "components": [
    { "name": "ComponentName", "id": "section-id", "props": {...} }
  ]
}
```

## File Naming

- JSON content: SCREAMING_SNAKE_CASE (LANDING_PAGE.json)
- Export from `app/content/pages/index.ts`

## Adding New Pages

1. Create JSON in `app/content/pages/NEW_PAGE.json`
2. Export from `app/content/pages/index.ts`
3. Add route to `app/types/routes.ts`
4. Create page component if needed

## Schema.org Integration

- Static schemas: `app/content/schemas/` (JSON)
- Dynamic generators: `app/utils/schemas/` (TypeScript)
- Injected via `nuxt-jsonld` module

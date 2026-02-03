# Helix

Nuxt 4 SSG personal portfolio for Meryll Dindin. Vue 3, Vuetify 3, TypeScript, SCSS.

## Commands

```bash
make start      # Dev server
make build      # Production build
make deploy     # Build and deploy to CloudFront
yarn checks     # All linters (prettier, stylelint, eslint, types)
yarn eslint:fix # Fix ESLint issues
yarn types      # TypeScript type checking
```

## Code Conventions

See `.claude/rules/` for detailed guidelines:

- `vue-components.md` - Component naming, structure, props
- `typescript.md` - Types, imports, ESLint rules
- `styling.md` - SCSS, BEM, Vuetify colors
- `content-system.md` - JSON page structure, schemas
- `git-workflow.md` - Conventional commits, branches

## Skills

| Skill        | Command         | Purpose                                            |
| ------------ | --------------- | -------------------------------------------------- |
| create-image | `/create-image` | Generate minimalist B&W images, upload to CDN      |
| review-seo   | `/review-seo`   | SEO audit for meta tags, schemas, content          |
| create-skill | `/create-skill` | Create, optimize, or audit skills/rules/references |

## Project Structure

```
src/
├── components/          # Vue components (layouts/, pages/, shared/)
├── content/             # JSON content (pages/, schemas/, layouts/)
├── types/               # TypeScript definitions
├── utils/               # Utility functions
└── plugins/             # Nuxt plugins (vuetify, gtag)
```

## Key Patterns

### Content-Driven Pages

Pages are JSON in `src/content/pages/`:

```json
{
  "head": { "title": "...", "description": "...", "canonical": "/page/" },
  "components": [{ "name": "ComponentName", "props": {...} }]
}
```

### Adding New Colors

1. Add to `src/plugins/vuetify.client/colors.ts`
2. Name using [Name That Color](https://chir.ag/projects/name-that-color)
3. Access: `rgb(var(--v-theme-color-name))`

### SEO

- Title: 50-60 chars, format `{Page} | Meryll Dindin`
- Description: 120-160 chars
- Canonical: trailing slash (`/ventures/`)
- Schema.org: Person, WebSite, BlogPosting, BreadcrumbList

## Site Architecture

```
/              → Landing page
/ventures/     → Companies & projects
/thoughts/     → Blog/articles
/suggestions/  → Recommendations
/mentions/     → Press & media
/missions/     → Mission statement
```

## Dependencies

- Yarn 4 (see `packageManager` in package.json)
- Node 24.x (see `.nvmrc`)
- `nuxt-jsonld` for Schema.org
- `@nuxtjs/sitemap` for sitemap generation

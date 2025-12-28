# Claude Code Guidelines

This file provides context for Claude Code to assist with package/repository maintenance and expansion.

## Project Overview

Helix is a Nuxt 4 SSG (Static Site Generation) personal portfolio/linktree alternative built with Vue 3, Vuetify 3, and TypeScript. It's part of the BioForge initiative.

## Tech Stack

- **Framework**: Nuxt 4 with SSG mode (`nuxi generate`)
- **UI Library**: Vuetify 3 with custom BEM-based theming
- **Language**: TypeScript (strict typing encouraged)
- **Styling**: SCSS with BEM conventions
- **Package Manager**: Yarn 4 (see `packageManager` in package.json)
- **Node Version**: 24.x (see `.nvmrc` and `engines` in package.json)

## Project Structure

```
src/
├── app.vue              # Root app component
├── error.vue            # Error page
├── assets/              # Static assets (animations, styles, variables)
├── components/
│   ├── layouts/         # Layout components (Navbar, Footer, etc.)
│   ├── pages/           # Page-specific components
│   └── shared/          # Reusable components (CustomButton, CustomImage, etc.)
├── content/             # JSON content files for pages
│   ├── layouts/         # Layout content (avatar, cookie banner, etc.)
│   ├── pages/           # Page content organized by route
│   └── schemas/         # JSON-LD schema definitions
├── layouts/             # Nuxt layouts (default, scrolled, snaped)
├── middleware/          # Nuxt middleware
├── plugins/             # Nuxt plugins (vuetify, gtag, lottie)
├── public/              # Public static files
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## Code Conventions

### Naming

- **Components**: PascalCase folders and files (e.g., `AppNavbar/main.vue`)
- **TypeScript files**: camelCase (e.g., `routes.ts`, `utilities.ts`)
- **Constants**: SCREAMING_SNAKE_CASE
- **JSON content files**: SCREAMING_SNAKE_CASE (e.g., `LANDING_PAGE.json`)
- **Functions**: camelCase, minimum 2 words
- **Booleans**: prefix with `is` or `has`
- **Colors**: use [Name That Color](https://chir.ag/projects/name-that-color)

### Component Structure

- Components with sub-components use folder structure with `main.vue` as entry
- Export via `index.ts` barrel files
- Shared components prefixed with `Custom` (CustomButton, CustomImage, etc.)

### Styling

- Use BEM conventions for SCSS classes
- Vuetify colors configured in `src/plugins/vuetify.client/colors.ts`
- Global styles in `src/assets/styles/`
- SCSS variables in `src/assets/variables/`

### TypeScript

- Avoid `any`, prefer `unknown` when type is uncertain
- Define types in `src/types/`
- Use explicit member accessibility in classes

### ESLint Rules (Key)

- Double quotes for strings
- Semicolons required
- Sort object keys alphabetically
- Sort imports (declaration sort ignored)
- Vue attributes ordered alphabetically

## Git Workflow

### Commits

Uses [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` new feature
- `fix:` bug fix
- `refactor:` code refactoring
- `docs:` documentation
- `style:` formatting changes
- `test:` test changes
- `build:` build system changes
- `chore:` maintenance tasks

Enforced via commitlint with `@commitlint/config-conventional`.

### Pre-commit Hooks

Husky runs lint-staged on commit:

- Prettier formatting on staged files
- ESLint with `--fix` on `.ts`, `.js`, `.vue`
- Stylelint with `--fix` on `.scss`, `.css`, `.vue`

### Branches

Format: `{initials}/{descriptive-kebab-case}` (e.g., `md/feature-a`)

## Common Commands

```bash
make setup      # Install dev experience (husky + uv)
make install    # Install dependencies
make start      # Start dev server
make build      # Build for production
make serve      # Preview production build
yarn checks     # Run all linters (prettier, stylelint, eslint, types)
yarn eslint:fix # Fix ESLint issues
yarn prettier:fix # Fix Prettier issues
yarn stylelint:fix # Fix Stylelint issues
yarn types      # Run TypeScript type checking
```

## Adding New Content

### New Page

1. Create JSON content in `src/content/pages/NEW_PAGE.json`
2. Export from `src/content/pages/index.ts`
3. Add route to `src/types/routes.ts`
4. Create page component if needed in `src/components/pages/`

### New Component

1. Create in appropriate folder under `src/components/`
2. For complex components, use folder structure with `main.vue`
3. Export via `index.ts` barrel file
4. Add types to `src/types/components.ts` if needed

### New Color

1. Add to `src/plugins/vuetify.client/colors.ts`
2. Name using [Name That Color](https://chir.ag/projects/name-that-color)
3. Access via `var(--v-theme-color-name)` or `text-color-name` class

## Build & Deployment

- Static generation via `nuxi generate`
- Output in `.output/public/`
- Deployed to CloudFront via `make deploy`
- All routes pre-rendered based on `RoutePath` enum

## Dependencies to Note

- `vue3-lottie`: Lottie animations (chunked separately in build)
- `nuxt-swiper`: Carousel/slider functionality
- `nuxt-jsonld`: JSON-LD structured data for SEO
- `@nuxtjs/sitemap`: Automatic sitemap generation
- `nuxt-link-checker`: Link validation

## Testing

- Cypress for E2E testing
- Run with `yarn cypress` or `yarn cypress:open`

## Claude Code Skills

Self-contained automation pipelines exposed as Claude Code skills. Skills are invoked via `/skill-name` commands.

| Skill | Command | Description |
|-------|---------|-------------|
| **seo** | `/seo` | SEO audit and optimization for the portfolio |

### Skill Structure

```
.claude/skills/
└── seo/                    # SEO audit tools
    ├── SKILL.md            # Skill definition and activation triggers
    ├── pyproject.toml      # Python dependencies
    ├── references/         # Context documents (guidelines)
    └── scripts/            # Python implementation
        ├── seo_audit.py    # Main entry point
        ├── output/         # Audit reports
        ├── validators/     # SEO validation modules
        └── models/         # Pydantic models
```

### SEO Skill (`/seo`)

Audits the portfolio for SEO compliance. Activates when discussing meta tags, Schema.org, structured data, personal branding SEO, or search optimization.

**Run from `.claude/skills/seo/`:**

| Command | Description |
|---------|-------------|
| `uv run python scripts/seo_audit.py --all` | Full SEO audit (source files) |
| `uv run python scripts/seo_audit.py --live` | Live site audit (deployed) |
| `uv run python scripts/seo_audit.py --all --live` | Both source and live audits |
| `uv run python scripts/seo_audit.py --meta` | Meta tags validation only |
| `uv run python scripts/seo_audit.py --schema` | Schema.org validation only |

**Validators:**
- `meta_validator.py` - Title, description, canonical, OG tags
- `schema_validator.py` - Person schema, WebSite schema, generators
- `content_analyzer.py` - H1 presence, content length, image alts
- `technical_seo.py` - robots.txt, sitemap, Nuxt config
- `live_site.py` - Deployed site checks

**References:**
- `references/seo-guidelines.md` - Personal portfolio SEO best practices

## SEO Guidelines

### Meta Tags
- **Title**: 50-60 characters, format: `{Page} | Meryll Dindin`
- **Description**: 120-160 characters, compelling summary
- **Canonical**: Trailing slash, relative path (`/ventures/`)
- **OG Image**: 1200x630px recommended

### Schema.org Types
- `Person` - Primary identity (default.json)
- `WebSite` - Site metadata (website.json)
- `BreadcrumbList` - Navigation (breadcrumbs.ts)
- `BlogPosting` - Articles (blogposts.ts)
- `ItemList` - Collections (itemlists.ts)

### Site Architecture

```
/                          → Landing page
/ventures/                 → Companies & projects
/thoughts/                 → Blog/articles
/suggestions/              → Recommendations
/mentions/                 → Press & media
/missions/                 → Mission statement
```

## Key Configuration Files

| File | Purpose |
|------|---------|
| `nuxt.config.ts` | Nuxt modules, SSR, image config |
| `eslint.config.mjs` | ESLint flat config |
| `stylelint.config.js` | Stylelint SCSS/Vue |
| `.lintstagedrc.mjs` | Lint-staged configuration |
| `.prettierrc` | Prettier (88 char, ES5 trailing commas) |
| `commitlint.config.js` | Conventional commits |
| `.nvmrc` | Node version (24.12.0) |

## Important Patterns

### Content System

Pages are defined as JSON in `src/content/pages/`:

```json
{
  "head": {
    "title": "Page Title",
    "description": "Meta description",
    "canonical": "/page/"
  },
  "components": [
    { "name": "ComponentName", "props": {...} }
  ]
}
```

### Component Rendering

Dynamic rendering via component name mapping in `src/components/pages/`.

### Schema.org Integration

- Static schemas in `src/content/schemas/` (JSON)
- Dynamic generators in `src/utils/schemas/` (TypeScript)
- Injected via `nuxt-jsonld` module

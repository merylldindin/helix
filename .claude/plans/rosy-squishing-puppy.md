# TipTap Editor CMS Module for Helix

## Context

Helix is a Nuxt 4 SSG portfolio where all content lives as JSON files in `src/content/pages/`. Articles for `/thoughts/` and `/ventures/` are authored by hand-editing JSON with a flat array of typed content blocks (`headline`, `text`, `image`, `networks`, etc.). This works but is painful for long-form writing. The goal is to introduce a rich-text writing experience using TipTap, while keeping JSON as the source of truth and ensuring the editor has zero footprint in production SSG builds.

## Architecture Decision: Draft Files + Dev-Only Nuxt Module

### Why not a separate server?
A standalone Express/Fastify server would require managing a separate process, port, CORS, and wouldn't benefit from Nuxt's HMR. Nuxt already has a dev server with Nitro — we should use it.

### Why not just a client plugin?
A client-only overlay can't write files to disk. We need server routes for persistence. A **Nuxt module** gives us both: server API routes + client components, with built-in dev-only gating.

### The approach: `modules/editor/` — a local Nuxt module

```
modules/editor/           ← Local Nuxt module (dev-only)
├── index.ts              ← Module entry: registers routes + components only in dev
├── runtime/
│   ├── server/
│   │   └── api/
│   │       ├── drafts.get.ts       ← List drafts
│   │       ├── drafts.post.ts      ← Save/update draft
│   │       ├── drafts.[slug].get.ts ← Load single draft
│   │       ├── drafts.[slug].delete.ts
│   │       └── publish.post.ts     ← Convert draft → JSON + update routes/exports
│   ├── components/
│   │   ├── EditorOverlay.vue       ← Floating panel toggled with Ctrl+E
│   │   ├── TipTapEditor.vue        ← The rich text editor
│   │   ├── SeoPanel.vue            ← SEO metadata form
│   │   ├── ImageManager.vue        ← Drag-and-drop image handling
│   │   └── DraftList.vue           ← Draft browser
│   └── composables/
│       └── useEditorState.ts       ← Editor state management
drafts/                   ← Untracked directory (.gitignore'd)
├── learning-differences.draft.json
└── new-article.draft.json
```

## Draft Format

Drafts live in `./drafts/` (project root, gitignored). Each draft is a single JSON file that mirrors the final `PageContent` structure but with a richer content model:

```json
{
  "meta": {
    "status": "draft",
    "createdAt": "2026-03-15T10:00:00Z",
    "updatedAt": "2026-03-15T14:30:00Z",
    "category": "thoughts",
    "slug": "new-article"
  },
  "seo": {
    "title": "Article Title | Meryll Dindin",
    "description": "120-160 chars...",
    "keywords": "ai, technology",
    "ogType": "article",
    "thumbnailAlt": "Alt text for thumbnail"
  },
  "images": {
    "thumbnail": null,
    "poster": null,
    "header": null
  },
  "content": "<p>TipTap HTML content...</p>"
}
```

## TipTap Editor Configuration

### Core extensions
- `StarterKit` (paragraphs, headings, bold, italic, lists, blockquotes, hard breaks, horizontal rules)
- `@tiptap/extension-link` — for href support
- `@tiptap/extension-image` — drag-and-drop images
- `@tiptap/extension-code-block-lowlight` — syntax-highlighted code blocks (lowlight + highlight.js)
- Custom `Mermaid` node extension — renders mermaid diagrams in preview, stores source as code block

### Custom extensions needed
1. **MermaidBlock** — a custom node that stores mermaid source and renders a preview via `mermaid.render()` in the editor. On publish, converts to an SVG image or keeps as a code block with `type: "mermaid"`.
2. **ImageUpload** — on drop/paste, calls `/api/editor/upload-image` which invokes the `create-image` skill pipeline, returns CDN URLs, and inserts the 4-variant `DeliveredImage` structure.

### What the editor looks like
- Floating overlay panel (right side, resizable) toggled via `Ctrl+E`
- Top bar: draft selector dropdown, category picker (thoughts/ventures), status badge
- Main area: TipTap WYSIWYG editor with toolbar (headings, bold, italic, link, image, code block, mermaid, horizontal rule)
- Bottom panel: collapsible SEO form (title, description, keywords, canonical preview)
- Action buttons: Save Draft, Preview (opens article route in new tab), Publish

## Content Type Extensions

### New ContentTypes to add to the existing system

```typescript
// Add to src/types/contents.ts
CODEBLOCK = "codeblock",
MERMAID = "mermaid",
LINK = "link",       // inline links already work via HTML in text, but explicit link cards
```

### New components to render them

```
src/components/pages/components/ContentGenerator/components/
├── CodeblockContent.vue   ← Syntax-highlighted code with language label + copy button
├── MermaidContent.vue     ← Client-side mermaid rendering from source string
```

These integrate into the existing `ContentGenerator/main.vue` v-if chain.

## HTML → JSON Conversion (Publish Pipeline)

The critical piece: converting TipTap's HTML output into the existing `GenericContent[]` array format.

```typescript
// modules/editor/runtime/server/utils/htmlToContent.ts

// Parses TipTap HTML DOM and maps nodes to GenericContent items:
// <h1..h6>        → { type: "headline", prop: { level, text, typography } }
// <p>             → { type: "text", prop: "..." }
// <img>           → { type: "image", prop: { source, lazySource, mobile, lazyMobile, altText } }
// <pre><code>     → { type: "codeblock", prop: { language, code } }
// <div.mermaid>   → { type: "mermaid", prop: "..." }
// <a> (standalone)→ { type: "button", prop: { to, ariaLabel, prompt } }
// <blockquote>    → { type: "reference", prop: { text, href } }
```

Typography classes are auto-assigned based on heading level following existing conventions:
- h1 → `"text-cartesian headline-2"`
- h2 → `"text-lexend-deca headline-4 my-6"`
- h3-h6 → scaled accordingly

## Publish Flow

When you click "Publish" in the editor:

1. **Validate SEO** — title length (50-60 chars), description (120-160 chars), canonical format
2. **Generate images** (if not already done) — trigger `/create-image` skill for:
   - `thumbnail` (1200x630) → `thumbnails/{slug}-{timestamp}.webp`
   - `poster` (1080x1080) → `articles/posters/{slug}-{timestamp}.webp`
   - `header` (1080x1080) → `articles/headers/{slug}-{timestamp}.webp`
3. **Convert content** — TipTap HTML → `GenericContent[]` via `htmlToContent()`
4. **Generate article JSON** — full `PageContent` object with layout, schema, head, components
5. **Write files**:
   - `src/content/pages/{category}/{SLUG}.json` — the article
   - Append export to `src/content/pages/{category}/index.ts`
   - Add route to `src/types/routes.ts` (RoutePath enum)
   - Add to `src/utils/routes.ts` (ROUTES_CONTENT record)
   - Add entry to collection page JSON (`THOUGHTS_PAGE.json` or `VENTURES_PAGE.json`)
   - Add sitemap entry to `nuxt.config.ts`
6. **Update draft status** — mark as `"published"` in draft file
7. **HMR triggers** — Vite picks up file changes, dev server reflects new article immediately

## Dev-Only Gating

### Module registration (nuxt.config.ts)
```typescript
modules: [
  // ... existing modules
  ...(process.env.NODE_ENV === 'development' ? ['./modules/editor'] : []),
],
```

### Additional safety
- `modules/editor/index.ts` checks `nuxt.options.dev` and returns early if false
- Server routes are prefixed with `/_editor/` (underscore convention = internal)
- No editor components are auto-imported in production (module doesn't register them)
- `drafts/` directory is in `.gitignore` — drafts never enter source control
- Tree-shaking eliminates all editor code from the SSG build

## Dependencies to Add (devDependencies only)

```
@tiptap/vue-3
@tiptap/starter-kit
@tiptap/extension-link
@tiptap/extension-image
@tiptap/extension-code-block-lowlight
@tiptap/extension-placeholder
lowlight                    ← for code syntax highlighting
mermaid                     ← for diagram rendering
@types/mermaid
node-html-parser            ← server-side HTML parsing for publish conversion
```

All as `devDependencies` since they're only used in dev mode.

## Implementation Phases

### Phase 1: Foundation
- Create `modules/editor/index.ts` with dev-only module shell
- Create `drafts/` directory + `.gitignore` entry
- Set up server API routes for CRUD on draft files
- Add TipTap with StarterKit + Link + Image + CodeBlock extensions
- Build minimal `EditorOverlay.vue` with Ctrl+E toggle
- Wire up save/load draft cycle

### Phase 2: Rich Content
- Implement `htmlToContent()` converter
- Add `CodeblockContent.vue` and `MermaidContent.vue` to ContentGenerator
- Add `CODEBLOCK` and `MERMAID` to ContentType enum
- Build custom MermaidBlock TipTap extension
- Integrate image drag-and-drop with CDN upload via `create-image` skill

### Phase 3: Publish Pipeline
- Build SEO validation panel
- Implement full publish flow (write article JSON, update routes, update collection page)
- Add "edit existing article" mode (load published JSON back into editor)
- Add preview mode (render article at its future route during dev)

### Phase 4: Polish
- Keyboard shortcuts (Ctrl+S save, Ctrl+Shift+P publish)
- Draft auto-save (debounced, every 30s)
- Image placeholder/loading states
- Typography preview matching production styles in editor

## Key Files to Modify

| File | Change |
|------|--------|
| `nuxt.config.ts` | Conditionally add editor module |
| `.gitignore` | Add `drafts/` |
| `src/types/contents.ts` | Add CODEBLOCK, MERMAID to ContentType enum |
| `src/components/pages/components/ContentGenerator/main.vue` | Add v-if branches for new types |
| `package.json` | Add TipTap + mermaid devDependencies |

## Verification

1. `make start` → dev server boots, Ctrl+E opens editor overlay
2. Create a draft, write content with headings/code/mermaid/images, save
3. Publish → verify JSON written to `src/content/pages/thoughts/`
4. Verify article renders at its route in dev
5. `make build` → SSG build succeeds with zero editor code in output
6. Verify `drafts/` is not committed, editor routes return 404 in production preview
7. `yarn checks` → all linters pass

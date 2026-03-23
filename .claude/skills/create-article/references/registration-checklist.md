# Article Registration Checklist

## File Naming

- JSON file: `src/content/pages/thoughts/SCREAMING_SNAKE_NAME.json`
- Route slug: `/thoughts/kebab-case-name/` (trailing slash required)
- Export name: `SCREAMING_SNAKE_NAME` (matches filename without extension)

## 1. Route Enum (`src/types/routes.ts`)

Add entry in **alphabetical order**:

```typescript
export enum RoutePath {
  SCREAMING_SNAKE_NAME = "/thoughts/kebab-case-name/",
  // ... existing entries alphabetically
}
```

## 2. Barrel Export (`src/content/pages/thoughts/index.ts`)

Add in **alphabetical order**:

```typescript
export { default as SCREAMING_SNAKE_NAME } from "./SCREAMING_SNAKE_NAME.json";
```

## 3. Route Mapping (`src/utils/routes.ts`)

Add import (alphabetical in the import block):

```typescript
import {
  SCREAMING_SNAKE_NAME,
  // ... existing imports
} from "@/content";
```

Add mapping (alphabetical in the object):

```typescript
export const ROUTES_CONTENT: Record<RoutePath, PageContent> = {
  [RoutePath.SCREAMING_SNAKE_NAME]: SCREAMING_SNAKE_NAME,
  // ... existing mappings
};
```

## 4. Listing Page (`src/content/pages/THOUGHTS_PAGE.json`)

Add `IMAGE_SECTION` in the `components` array **sorted by publication date (newest first)**. Check the dates of surrounding entries to find the correct position — do NOT always insert at the top. See `article-conventions.md` for the full template.

## 5. Verification

Run in parallel:

```bash
yarn types      # TypeScript compilation
yarn eslint:fix # Lint and auto-fix
```

Both must pass before committing.

# TypeScript Standards

## Type Safety

- Avoid `any`, prefer `unknown` when type is uncertain
- Define types in `src/types/`
- Use explicit return types for public functions
- Use explicit member accessibility in classes

## Naming

- **Files**: camelCase (routes.ts, utilities.ts)
- **Constants**: SCREAMING_SNAKE_CASE
- **Functions**: camelCase, minimum 2 words

## Import Sorting

- Imports are sorted alphabetically (declaration sort ignored by ESLint)
- Use barrel exports via `index.ts` files

## ESLint Enforced

- Double quotes for strings
- Semicolons required
- Sort object keys alphabetically
- Vue attributes ordered alphabetically

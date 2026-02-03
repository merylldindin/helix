# Git Workflow

## Commits

Conventional commits enforced via commitlint:

- `feat:` new feature
- `fix:` bug fix
- `refactor:` code refactoring
- `docs:` documentation
- `style:` formatting changes
- `test:` test changes
- `build:` build system changes
- `chore:` maintenance tasks

## Pre-commit Hooks

Husky runs lint-staged:

- Prettier formatting
- ESLint `--fix` on .ts, .js, .vue
- Stylelint `--fix` on .scss, .css, .vue

## Branches

Format: `{initials}/{descriptive-kebab-case}`

Example: `md/add-new-feature`

## Pull Requests

- Keep title under 70 chars
- Include Summary and Test plan sections

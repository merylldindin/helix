# Vue Component Conventions

## Naming

- **Components**: PascalCase folders with `main.vue` as entry point
- **Shared components**: Prefix with `Custom` (CustomButton, CustomImage, CustomLink)
- **Export**: Via `index.ts` barrel files

## Structure

```
ComponentName/
├── main.vue        # Entry point
├── index.ts        # Barrel export
└── components/     # Sub-components (if needed)
```

## Props

- Use `defineProps` with TypeScript interface
- Name destructured props variable `cProps`
- Boolean props: prefix with `is` or `has`

## Component Organization

- **layouts/**: Layout components (AppNavbar, AppFooter)
- **pages/**: Page-specific components
- **shared/**: Reusable components

## Dynamic Rendering

Pages use JSON-driven component rendering via component name mapping in `src/components/pages/`.

# Styling Conventions

## SCSS

- Use BEM naming: `.block__element--modifier`
- Variables in `src/assets/variables/`
- Global styles in `src/assets/styles/`

## Vuetify Colors

- Define in `src/plugins/vuetify.client/colors.ts`
- Name using [Name That Color](https://chir.ag/projects/name-that-color)
- Access via CSS: `rgb(var(--v-theme-color-name))`
- Access via class: `text-color-name` or `bg-color-name`

## Responsive Design

- Use `@include sm-down` mixin for mobile styles
- Breakpoints defined in SCSS variables
- Mobile-first approach

## Linting

- Stylelint enforces SCSS/Vue style rules
- Run `yarn stylelint:fix` to auto-fix issues

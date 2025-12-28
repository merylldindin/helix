import globals from "globals";
import unicornPlugin from "eslint-plugin-unicorn";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt([
  // Global ignores
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/.nuxt/**",
      "**/.output/**",
      "**/coverage/**",
      "cypress/integration/*.spec.js",
    ],
  },

  // Language options for all files
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
  },

  // TypeScript rules override (Nuxt already sets up TypeScript)
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.vue"],
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/consistent-type-imports": "off",
      "@typescript-eslint/explicit-member-accessibility": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/prefer-ts-expect-error": "off",
    },
  },

  // Vue rules override (Nuxt already sets up Vue)
  {
    files: ["**/*.vue"],
    rules: {
      "vue/attributes-order": [
        "error",
        {
          alphabetical: true,
          order: [
            "DEFINITION",
            "LIST_RENDERING",
            "CONDITIONALS",
            "RENDER_MODIFIERS",
            "GLOBAL",
            ["UNIQUE", "SLOT"],
            "TWO_WAY_BINDING",
            "OTHER_DIRECTIVES",
            "OTHER_ATTR",
            "EVENTS",
            "CONTENT",
          ],
        },
      ],
      "vue/html-self-closing": "off",
      "vue/multi-word-component-names": "off",
    },
  },

  // Unicorn plugin configuration
  {
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      "unicorn/filename-case": [
        "error",
        {
          cases: {
            camelCase: true,
            pascalCase: true,
          },
          ignore: ["shims-*"],
        },
      ],
      "unicorn/no-array-for-each": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/no-null": "off",
      "unicorn/prefer-query-selector": "off",
      "unicorn/prevent-abbreviations": [
        "error",
        {
          ignore: ["i18n", "e2e"],
          replacements: {
            params: false,
            props: false,
            ref: false,
          },
        },
      ],
    },
  },

  // General JavaScript/TypeScript rules
  {
    rules: {
      "class-methods-use-this": "off",
      "lines-between-class-members": [
        "error",
        "always",
        {
          exceptAfterSingleLine: true,
        },
      ],
      "no-console": "off",
      "no-param-reassign": [
        "error",
        {
          props: false,
        },
      ],
      "no-restricted-exports": "off",
      "no-restricted-syntax": ["error", "LabeledStatement", "WithStatement"],
      "no-shadow": "off",
      "no-undef": "off",
      "no-unneeded-ternary": "error",
      "no-unused-vars": "off",
      "no-useless-concat": "error",
      "prefer-template": "error",
      quotes: ["error", "double", { avoidEscape: true }],
      radix: "off",
      semi: ["error", "always"],
      "sort-imports": [
        "error",
        {
          ignoreDeclarationSort: true,
        },
      ],
      "sort-keys": [
        "error",
        "asc",
        {
          caseSensitive: true,
          minKeys: 2,
          natural: false,
        },
      ],
    },
  },
]);

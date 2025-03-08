import globals from "globals";
import eslint from "@eslint/js";
import withNuxt from "./.nuxt/eslint.config.mjs";
import prettierConfig from "eslint-config-prettier";
import unicornPlugin from "eslint-plugin-unicorn";

export default withNuxt([
  // Base Config
  eslint.configs["recommended"],
  // Typescript Config
  {
    ignores: ["cypress/integration/*.spec.js"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        ...globals.es6,
        ...globals.node,
      },
      parserOptions: {
        project: "./tsconfig.json",
      },
      sourceType: "module",
    },
    plugins: {
      unicorn: unicornPlugin,
    }
  },
  // Prettier Config
  prettierConfig,
  // Override Rules
  {
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
      quotes: ["error", "double"],
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
      "unicorn/filename-case": [
        "error",
        {
          cases: {
            camelCase: true,
            pascalCase: true,
          },
          ignore: ["shims-*"]
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
      "vue/multi-word-component-names": "off",
    },
  },
]);

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["@nuxt/eslint-config", "airbnb-base", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2021,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "import", "prettier", "sonarjs", "unicorn", "vue"],
  root: true,
  rules: {
    "@typescript-eslint/explicit-member-accessibility": "error",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_" }],
    "class-methods-use-this": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-relative-packages": "off",
    "import/no-unresolved": "off",
    "import/order": [
      "error",
      {
        alphabetize: { caseInsensitive: false, order: "asc" },
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
        pathGroups: [{ group: "internal", pattern: "@/**" }],
      },
    ],
    "import/prefer-default-export": "off",
    "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
    "no-console": "off",
    "no-param-reassign": ["error", { props: false }],
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
    "sort-keys": ["error", "asc", { caseSensitive: true, minKeys: 2, natural: false }],
    "unicorn/prevent-abbreviations": [
      "error",
      {
        ignore: ["i18n"],
        replacements: {
          ref: false,
          props: false,
          params: false,
        },
      },
    ],
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: ["index", "main", "default", "error"],
      },
    ],
  },
};

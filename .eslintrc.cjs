module.exports = {
  root: true,
  extends: ["@nuxtjs/eslint-config-typescript"],
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    "import/order": [
      "error",
      {
        alphabetize: { order: "asc", caseInsensitive: false },
        "newlines-between": "always",
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        pathGroups: [{ pattern: "@/**", group: "internal" }],
      },
    ],
    "lines-between-class-members": [
      "error",
      "always",
      { exceptAfterSingleLine: true },
    ],
    "no-console": "off",
    "no-restricted-exports": "off",
    "no-useless-concat": "error",
    "no-unneeded-ternary": "error",
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
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "./src"]],
        extensions: [".vue", ".json", ".js", ".ts"],
      },
    },
  },
};

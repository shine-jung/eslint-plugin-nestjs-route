const nestjsRoute = require("eslint-plugin-nestjs-route");
const tsParser = require("@typescript-eslint/parser");
const tseslint = require("@typescript-eslint/eslint-plugin");

module.exports = [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },
    plugins: {
      "nestjs-route": nestjsRoute,
      "@typescript-eslint": tseslint,
    },
    rules: {
      // Usage example
      "nestjs-route/order": "error",
      "nestjs-route/no-duplicates": "error",

      // Korean message usage example
      // "nestjs-route/order": ["error", { locale: "ko" }],
      // "nestjs-route/no-duplicates": ["error", { locale: "ko" }],
    },
  },
  {
    ignores: ["node_modules/**", "lib/**", "coverage/**"],
  },
];

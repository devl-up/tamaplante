import eslint from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginRouter from "@tanstack/eslint-plugin-router";

export default tseslint.config(
  { ignores: ["dist", "src/api/types/**/*.ts"] },
  {
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      ...pluginQuery.configs["flat/recommended"],
      ...pluginRouter.configs["flat/recommended"],
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-misused-promises": "off",
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      "@typescript-eslint/no-unsafe-member-access": ["off"],
      "@typescript-eslint/no-unsafe-call": ["off"],
      "@typescript-eslint/no-unsafe-assignment": ["off"],
    },
  },
  eslintPluginPrettierRecommended,
);

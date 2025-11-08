import { FlatCompat } from "@eslint/eslintrc";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";

// For compatibility with old "extends" configs
const compat = new FlatCompat({
  baseDirectory: process.cwd(),
});

export default [
  // Apply recommended ESLint rules
  ...compat.extends("eslint:recommended"),
  // TypeScript plugin rules
  ...compat.extends("plugin:@typescript-eslint/recommended"),

  {
    files: ["*.ts", "*.tsx"],
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "single"],
    },
  },
];

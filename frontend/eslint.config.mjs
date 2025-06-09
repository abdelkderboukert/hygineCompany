import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Extend the base configuration and add custom rules
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@next/next/no-img-element": "off", // Disable the rule for <img> tags
      "react-hooks/exhaustive-deps": "off", // Disable missing dependency warnings
      "react/jsx-no-duplicate-props": "off", // Disable duplicate props error
      "@typescript-eslint/ban-ts-comment": "off", // Disable unused @ts-expect-error directive error
    },
  },
];

export default eslintConfig;

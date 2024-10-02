import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    ignores: ["**/node_modules/", "./dist/"],
    languageOptions: {
      "globals": { ...globals.browser, process: "readonly" }
    },
    rules: {
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-undef": "error",
      "no-console": "warn",
      "semi": "warn"
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: globals.browser }, rules: {"prefer-const": "error"} },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
];

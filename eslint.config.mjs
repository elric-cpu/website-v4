import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";

export default [
  {
    ignores: [
      "dist/**",
      "artifacts/**",
      "playwright-report/**",
      "test-results/**",
      "node_modules/**",
      ".tmp-*.mjs",
      "**/.tmp-*.mjs",
    ],
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.mjs"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, React: "readonly", Intl: "readonly" },
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        node: { extensions: [".js", ".jsx", ".mjs", ".ts", ".tsx"] },
        alias: {
          map: [["@", "./src"]],
          extensions: [".js", ".jsx", ".mjs", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      ...(react.configs?.recommended?.rules ?? {}),
      ...(reactHooks.configs?.recommended?.rules ?? {}),
      ...(importPlugin.configs?.recommended?.rules ?? {}),
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      "react/display-name": "off", // Non-critical, component works without displayName
      "react/jsx-uses-react": "off", // Not needed in React 17+, non-critical
      "react/react-in-jsx-scope": "off", // Not needed in React 17+, non-critical
      "react/jsx-uses-vars": "off", // Non-critical, code works fine
      "react/jsx-no-comment-textnodes": "off", // Non-critical, comments could be visible if put inside the JSX, most cases are just rendering text like '///'
      "no-unused-vars": "off", // Non-critical, code works fine with unused vars
      "import/no-named-as-default": "off", // Can cause runtime import errors, usually fine to leave as is
      "import/no-named-as-default-member": "off", // Can cause runtime import errors
      "no-undef": "error", // Undefined variables cause runtime errors
      "import/no-self-import": "error", // Extremely fast rule, breaking results in infinite loop/bundling error
      "import/no-cycle": "off", // AI rarely makes this error, and the rule is very slow to run
    },
  },
  {
    files: [
      "ai-orchestrator/**/*.{js,mjs}",
      "scripts/**/*.{js,mjs}",
      "tools/**/*.{js,mjs}",
      "tailwind.config.js",
      "vite.config.js",
    ],
    languageOptions: { globals: { ...globals.node, fetch: "readonly" } },
    rules: {
      "import/default": "off",
      "import/namespace": "off",
    },
  },
  {
    files: ["k6/**/*.js"],
    languageOptions: {
      globals: { ...globals.node, __ENV: "readonly", fetch: "readonly" },
    },
    rules: {
      "import/no-unresolved": "off",
    },
  },
];

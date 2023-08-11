module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended",
    "airbnb",
    "airbnb/hooks",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "src/components/ui/*"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "prettier", "import"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": "off",
    "import/extensions": "off",
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};

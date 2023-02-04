module.exports = {
  extends: [
    "plugin:astro/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    extraFileExtensions: [".astro"], // This is a required setting in `@typescript-eslint/parser` v5.
  },
  plugins: ["jsx-a11y"],
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        "quotes": ["error", "single"],
        "semi": ["error", "never"]
      }
    }
  ]
}
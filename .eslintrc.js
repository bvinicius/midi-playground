module.exports = {
  parser: "vue-eslint-parser",
  extends: [
    "plugin:vue/recommended", // Use this if you are using Vue.js 2.x.
    "plugin:vue/base",
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
    extraFileExtensions: [".vue"],
  },
};

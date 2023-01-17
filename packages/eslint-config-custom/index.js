module.exports = {
  extends: [
    "next",
    "turbo",
    "airbnb",
    "airbnb-typescript",
    "tailwindcss",
    "prettier",
  ], // 설정을 가져와 base설정
  parserOptions: {
    project: "./tsconfig.json",
    // tsconfigRootDir: __dirname,
  },
  plugins: [], // 규칙을 확장(플러그인만으로 규칙이 적용되진 않는다!)
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "no-unneeded-ternary": "off",
    "no-console": 1,
    "import/prefer-default-export": "off",
    "react/function-component-definition": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
  },
}

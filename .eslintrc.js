
module.exports = {
    env: {
        browser: true,
        webextensions: true,
        es2020: true
    },
    extends: [
        "standard"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 11,
        sourceType: "module"
    },
    plugins: [
        "@typescript-eslint"
    ],
    globals: {
        FiltersUIList: "writable",
        Filters: "writable"
    },
    rules: {
        indent: ["error", 4],
        "quote-props": ["error", "as-needed"],
        quotes: ["error", "double"],
        "space-before-function-paren": ["error", "never"],
        "no-useless-constructor": "off",
        "padded-blocks": "off"
    }
}

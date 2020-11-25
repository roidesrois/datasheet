module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    // extends: ["plugin:@typescript-eslint/recommended", "plugin:react/recommended"],
    // rules: {
    //     "react-hooks/rules-of-hooks": "error", // Проверяем правила хуков
    //     "react-hooks/exhaustive-deps": "warn", // Проверяем зависимости эффекта
    // },
    // settings: {
    //     react: {
    //         version: "detect",
    //     },
    // },
};

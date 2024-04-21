module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
        '@typescript-eslint/ban-ts-comment': 1,
        '@typescript-eslint/no-unused-vars': [
            1,
            {
                argsIgnorePattern: '_',
            },
        ],
        'no-trailing-spaces': 2,
        'brace-style': 0,
        '@typescript-eslint/brace-style': 2,
        'comma-spacing': 0,
        '@typescript-eslint/comma-spacing': 2,
        '@typescript-eslint/no-confusing-void-expression': [
            2,
            {
                ignoreArrowShorthand: true,
            },
        ],
        '@typescript-eslint/no-non-null-assertion': 2,
        'no-shadow': 0,
        '@typescript-eslint/no-shadow': 2,
        'no-use-before-define': 0,
        'object-curly-spacing': 0,
        '@typescript-eslint/object-curly-spacing': [2, 'always'],
        '@typescript-eslint/no-use-before-define': 2,
        '@typescript-eslint/prefer-ts-expect-error': 2,
        quotes: 0,
        '@typescript-eslint/type-annotation-spacing': 2,
        '@typescript-eslint/quotes': [2, 'single'],
        curly: [2, 'all'],
        indent: [2, 4],
        'no-duplicate-imports': 2,
        'arrow-body-style': 2,
        'consistent-return': 2,
        'default-case-last': 2,
        'dot-notation': 2,
        eqeqeq: 2,
    },
    overrides: [
        {
            files: ['./packages/client/**'],
            extends: [
                'plugin:react/recommended',
                'plugin:react-hooks/recommended',
            ],
            parserOptions: {
                ecmaVersion: 11,
                ecmaFeatures: {
                    jsx: true,
                },
                sourceType: 'module',
                project: './tsconfig.json',
            },
            settings: {
                react: {
                    version: 'detect',
                },
            },
            rules: {
                indent: 0,
                '@typescript-eslint/no-restricted-imports': [
                    2,
                    {
                        name: 'react-redux',
                        importNames: ['useSelector', 'useDispatch', 'useStore'],
                        message:
                            'Use typed hooks `useAppDispatch`, `useAppSelector` and `useAppStore` instead.',
                    },
                ],
                'react/jsx-indent': [2, 4],
                'react/jsx-indent-props': [2, 4],
                'react/react-in-jsx-scope': 0,
                'react/display-name': 0,
                'react/jsx-filename-extension': [
                    2,
                    {
                        extensions: ['.tsx'],
                    },
                ],
                'react/jsx-props-no-spreading': 0,
                'react/self-closing-comp': 2,
            },
        },
        {
            files: ['./packages/server/**'],
            parserOptions: {
                ecmaVersion: 11,
                project: './tsconfig.json',
            },
        },
    ],
}

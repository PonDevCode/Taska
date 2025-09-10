// eslint.config.js
import js from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReactRefresh from 'eslint-plugin-react-refresh'

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
       ecmaFeatures: { jsx: true }
    },
    settings: { react: { version: '18.2' } },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh
    },
    rules: {
      'react-refresh/only-export-components': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 0,
      'react/display-name': 0,
      'no-restricted-imports': [
        'error',
        {
          patterns: [{ regex: '^@mui/[^/]+$' }]
        }
      ],
      'no-console': 1,
      'no-extra-boolean-cast': 0,
      'no-lonely-if': 1,
      'no-unused-vars': 1,
      'no-trailing-spaces': 1,
      'no-multi-spaces': 1,
      'no-multiple-empty-lines': 1,
      'space-before-blocks': ['error', 'always'],
      'object-curly-spacing': [1, 'always'],
      indent: ['warn', 2],
      semi: [1, 'never'],
      quotes: ['error', 'single'],
      'array-bracket-spacing': 1,
      'linebreak-style': 0,
      'no-unexpected-multiline': 'warn',
      'keyword-spacing': 1,
      'comma-dangle': 1,
      'comma-spacing': 1,
      'arrow-spacing': 1
    }
  }
]

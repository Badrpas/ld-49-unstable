module.exports = {

  parser: 'babel-eslint',

  env: {
    es2021: true,
  },

  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },

  rules: {
    'semi': ['error', 'always'],
    'space-before-function-paren': ['error', 'always'],
    'max-len': ['warn', 120],
    'linebreak-style': 'off',
    'object-curly-spacing': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'indent': ['error', 2, { SwitchCase: 1 }],
    'quotes': ['error', 'single', {
      allowTemplateLiterals: true,
      avoidEscape: true,
    }],
    'eqeqeq': ['error', 'always'],
  },

};

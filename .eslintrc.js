module.exports = {
  root: true,

  env: {
    node: true
  },

  'globals': [
    'plugin:vue/essential',
    '@vue/standard'
  ],

  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/html-indent': 'error',
    'vue/html-quotes': 'error',
    'vue/html-self-closing': 'error',
    'vue/max-attributes-per-line': 'error',
    'vue/multiline-html-element-content-newline': 'error',
    'vue/mustache-interpolation-spacing': 'error',
    'vue/name-property-casing': 'error',
    'vue/no-multi-spaces': 'error',
    'vue/no-spaces-around-equal-signs-in-attribute': 'error',
    'vue/no-template-shadow': 'error',
    'vue/prop-name-casing': 'error',
    'vue/require-default-prop': 'error',
    'vue/require-prop-types': 'error',
    'vue/singleline-html-element-content-newline': 'error',
    'vue/v-bind-style': 'error',
    'vue/v-on-style': 'error',
    'vue/attributes-order': 'warning',
    'vue/no-confusing-v-for-v-if': 'warning',
    'vue/no-v-html': 'warning',
    'vue/order-in-components': 'warning',
    'vue/this-in-template': 'warning',
    'vue/array-bracket-spacing': 'warning',
    'vue/arrow-spacing': 'warning',
    'vue/block-spacing': 'warning',
    'vue/brace-style': 'warning',
    'vue/camelcase': 'warning',
    'vue/comma-dangle': 'warning',
    'vue/component-name-in-template-casing': 'warning',
    'vue/eqeqeq': 'warning',
    'vue/key-spacing': 'warning',
    'vue/match-component-file-name': 'warning',
    'vue/no-boolean-default': 'warning',
    'vue/no-restricted-syntax': 'warning',
    'vue/object-curly-spacing': 'warning',
    'vue/require-direct-export': 'warning',
    'vue/script-indent': 'warning',
    'vue/space-infix-ops': 'warning',
    'vue/space-unary-ops': 'warning',
    'vue/v-on-function-call': 'warning',
    'vue/attribute-hyphenation': 'error',
    'vue/html-closing-bracket-newline': 'error',
    'vue/html-closing-bracket-spacing': 'error',
    'vue/html-end-tags': 'error',
    // add
    "prefer-template": 2,
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  globals: {}
}

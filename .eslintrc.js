module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    node: true,
  },
  extends: 'airbnb',
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'global-require': 'off',
    'import/no-dynamic-require': 'off',
    'no-unused-expressions': 'off',
    // 'operator-linebreak': ['error', 'before', { overrides: { '=': 'none' } }],
    'max-len': ['error', { code: 120, tabWidth: 2 }],
    'no-param-reassign': 'off', // 在forEach循环中修改迭代元素, 遇到这种情况可以使用map来替换
  },
};

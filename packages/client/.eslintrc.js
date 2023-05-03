module.exports = {
  root: true,
  extends: ['@xuatz/eslint-config'],
  env: {
    node: true,
  },
  globals: {
    window: true,
    module: true,
  },
  rules: {
    'no-undef': 'warn', // TODO remove this in future after we migrate away from CRA
  },
};

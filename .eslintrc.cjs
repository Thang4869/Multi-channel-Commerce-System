module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./**/tsconfig.json'],
    extraFileExtensions: ['.ts', '.tsx']
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  rules: {},
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser'
    }
  ]
};

// Relax strict runtime-type rules for repository/infrastructure code (Prisma clients etc.)
// to reduce noise while maintaining stricter rules for application code.
module.exports.overrides.push({
  files: ['services/*/src/**/infrastructure/**', 'services/*/src/**/repositories/**'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off'
  }
});

// Also relax require-await for these implementation files where Promises are returned directly
module.exports.overrides[module.exports.overrides.length - 1].rules['@typescript-eslint/require-await'] = 'off';

// Relax rules for tests and mocks where `any` and non-awaited async helpers are common
module.exports.overrides.push({
  files: ['**/__tests__/**', '**/__mocks__/**', '**/*.spec.ts', '**/*.spec.tsx'],
  rules: {
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off'
  }
});

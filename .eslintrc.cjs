// eslint config aligned with backend/frontend architecture guardrails
module.exports = {
  root: true,
  extends: ['next/core-web-vitals'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@features/*/*/*', '@backend/features/*/*/*'],
            message: 'Import from the feature barrel (index.ts) only.',
          },
          {
            group: ['@features/*/infra/*', '@features/*/http/*'],
            message: "Do not import another module's infra/http.",
          },
        ],
      },
    ],
    'import/no-cycle': ['error', { ignoreExternal: true }],
  },
};


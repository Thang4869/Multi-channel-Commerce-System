module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).ts'],
  testPathIgnorePatterns:
    process.env.RUN_REAL_REDIS_INTEGRATION === 'true' ? ['/node_modules/'] : ['/node_modules/', 'redis\.integration\.real\.spec\.ts$'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  clearMocks: true,
  collectCoverage: false,
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};

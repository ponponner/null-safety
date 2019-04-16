module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverageFrom: ['src/**/*.ts'],
  // coverageDirectory: 'dest/coverage/',
  globals: {
    'ts-jest': {
      tsConfig: 'tests/tsconfig.json',
    },
  },
};

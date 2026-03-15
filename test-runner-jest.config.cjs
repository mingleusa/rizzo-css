/**
 * Jest config for @storybook/test-runner (CommonJS for Jest compatibility).
 * Reduces haste-map collisions in the monorepo (root + packages/rizzo-css both have name "rizzo-css").
 * See: https://storybook.js.org/docs/writing-tests/test-runner#ejecting-configuration
 */
const { getJestConfig } = require('@storybook/test-runner');

const testRunnerConfig = getJestConfig();

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  ...testRunnerConfig,
  // Avoid scanning packages/ and scaffold (duplicate package.json names cause haste-map collisions)
  modulePathIgnorePatterns: [
    ...(Array.isArray(testRunnerConfig.modulePathIgnorePatterns)
      ? testRunnerConfig.modulePathIgnorePatterns
      : []),
    '<rootDir>/packages/',
    '<rootDir>/node_modules/',
  ],
  testTimeout: 20000,
};

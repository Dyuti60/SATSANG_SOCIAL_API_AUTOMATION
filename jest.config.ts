import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest/presets/default-esm',

  testEnvironment: 'allure-jest/node',

  setupFiles: ['dotenv/config'],

  setupFilesAfterEnv: ['<rootDir>/src/hooks/jest.hooks.ts'],
  testSequencer: "<rootDir>/customSequencer.js",

  globalSetup: '<rootDir>/src/setup/globalSetup.ts',
  globalTeardown: '<rootDir>/src/setup/globalTeardown.ts',

  testMatch: ['**/tests/**/*.spec.ts'],
  maxWorkers: 1,
  testTimeout: 60000,
  transformIgnorePatterns: [
    '/node_modules/(?!(\\@faker-js)/)'
  ]
}

export default config
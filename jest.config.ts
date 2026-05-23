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
  ],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^api/(.*)$': '<rootDir>/src/api/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^testdata/(.*)$': '<rootDir>/src/testdata/$1',
    '^factory/(.*)$': '<rootDir>/src/testdata/factory/$1',
    '^endpoints/(.*)$': '<rootDir>/src/endpoints/$1',
    '^helper/(.*)$': '<rootDir>/src/helper/$1'
  }
}

export default config
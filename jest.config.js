/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/src/infra/db/typeorm/setup.jest.js'],
};

module.exports = config;

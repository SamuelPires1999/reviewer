// eslint-disable-next-line @typescript-eslint/no-var-requires
const package = require('./package.json');

module.exports = {
  testEnvironment: './test/environment/mongodb.ts',
  testPathIgnorePatterns: ['/node_modules/', './dist'],
  transform: {
    '^.+\\.(js|ts|tsx)?$': '<rootDir>/test/babel-transformer',
  },
  setupFiles: ['./test/jest.setup.js'],
};
/* eslint-disable @typescript-eslint/no-var-requires */
const { createTransformer } = require('babel-jest').default;

const config = require('@reviewer/babel');

module.exports = createTransformer({ ...config });
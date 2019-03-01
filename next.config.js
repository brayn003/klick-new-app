const { parsed: localEnv } = require('dotenv').config();
// const fs = require('fs');
// const path = require('path');
/* eslint-disable */
const webpack = require('webpack');
const withCSS = require('@zeit/next-css');
// const withWorkers = require('@zeit/next-workers');
/* eslint-enable */


const webpackFunc = (c) => {
  const config = c;

  config.plugins = c.plugins || [];

  config.plugins = [
    ...c.plugins,

    // Read the .env file
    new webpack.EnvironmentPlugin(localEnv),
  ];

  return config;
};

const exportCss = {
  webpack: webpackFunc,
};

module.exports = withCSS(exportCss);

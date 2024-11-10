const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "buffer": require.resolve("buffer/"),
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "util": require.resolve("util/"),
    "os": require.resolve("os-browserify/browser"),
    "url": require.resolve("url/"),
    "timers": require.resolve("timers-browserify"),
    "timers/promises": false,
    "process": require.resolve("process/browser"),
    "path": require.resolve("path-browserify"),
    "zlib": require.resolve("browserify-zlib"),
    "fs": false,
    "net": false,
    "tls": false,
    "child_process": false,
    "dns": false,
    "http": require.resolve("stream-http"),
    "assert": require.resolve("assert/")
  };

  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    'process/browser': require.resolve('process/browser.js') // Ensure extension is specified
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  );

  return config;
};

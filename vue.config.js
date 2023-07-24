const webpack = require('webpack');

module.exports = {
  // ...
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify')
      })
    ],
    resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify')
      }
    }
  }
};


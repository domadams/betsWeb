const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const zopfli = require('@gfx/zopfli');
const zlib = require('zlib');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { clientConfig, serverConfig } = require('./webpack.common.js');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const prodConfig = {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
    },
    minimize: true,
    minimizer: [
      new TerserPlugin(),
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    // Remove all files inside webpack's dist directory,
    // as well as all unused webpack assets after every successful rebuild.
    new CleanWebpackPlugin(),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
      compressionOptions: {
        numiterations: 15,
      },
      algorithm(input, compressionOptions, callback) {
        return zopfli.gzip(input, compressionOptions, callback);
      },
    }),
    new CompressionPlugin({
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      test: /\.js(\?.*)?$/i,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
  ],
};

// Merge webpack.common config with webpack.prod
module.exports = [merge(clientConfig, prodConfig), serverConfig];

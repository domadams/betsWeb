const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { clientConfig, serverConfig } = require('./webpack.common.js');

const prodConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
    },
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    // Remove all files inside webpack's dist directory,
    // as well as all unused webpack assets after every successful rebuild.
    new CleanWebpackPlugin(),
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
    }),
  ],
};

// Merge webpack.common config with webpack.dev
module.exports = [merge(clientConfig, prodConfig), serverConfig];

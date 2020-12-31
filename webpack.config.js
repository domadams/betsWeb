const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const nodeDir = `${__dirname}/node_modules`;

const commonLoaders = [
  {
    test: /\.jsx|\.js$/,
    exclude: /node_modules/,
    use: 'babel-loader',
  },
  {
    test: /\.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      'css-loader',
    ],
  },
];

module.exports = [
  {
    // The configuration for the client
    name: 'client-side rendering',
    mode: 'production',
    context: path.resolve(__dirname),
    entry: './src/client/app-router.jsx',
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, 'dist/public'),
    },
    module: {
      rules: commonLoaders,
    },
    resolve: {
      extensions: [' ', '.js', '.jsx'],
    },
    plugins: [
      new webpack.DefinePlugin({
        __isBrowser__: 'true',
      }),
    ],
  },
  {
    // The configuration for the server-side rendering
    name: 'server-side rendering',
    mode: 'production',
    entry: './src/server/server.js',
    target: 'node',
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: './public',
      filename: 'server.generated.js',
    },
    node: {
      global: false,
      __filename: false,
      __dirname: false,
    },
    externals: [nodeExternals()],
    module: {
      noParse: [
        `${nodeDir}/react/react.min.js`,
        `${nodeDir}/react/react-dom.min.js`,
      ],
      rules: commonLoaders,
    },
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(),
      ],
    },
    resolve: {
      extensions: [' ', '.js', '.jsx'],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'public/[name].css',
      }),
      new webpack.DefinePlugin({
        __isBrowser__: 'false',
      }),
    ],
  },
];

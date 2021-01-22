const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const nodeDir = `${__dirname}/node_modules`;
const commonLoaders = [
  {
    test: /\.jsx|\.js$/,
    exclude: /node_modules/,
    use: 'babel-loader',
  },
  {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          publicPath: '/',
        },
      },
    ],
  },
];

const clientConfig = {
  // The configuration for the client
  name: 'client-side rendering',
  entry: {
    main: path.resolve(__dirname, '../src/client', 'app-router.jsx'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist/public'),
    publicPath: '/',
  },
  module: {
    rules: commonLoaders,
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'true',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

const serverConfig = {
  // The configuration for the server-side rendering
  name: 'server-side rendering',
  mode: 'production',
  entry: './src/server/server.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../dist'),
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
  resolve: {
    extensions: [' ', '.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'false',
    }),
  ],
};

module.exports = { clientConfig, serverConfig };

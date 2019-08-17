const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'development',
  entry: {
    app: path.join(__dirname, 'src', 'index.jsx'),
  },
  devtool: 'source-map',
  output: {
    path: outputPath,
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: require('./babel.config'),
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CopyPlugin([
      {
        from: path.join(__dirname, 'public'),
        to: path.join(outputPath),
      },
    ]),
  ],
};

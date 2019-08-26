module.exports = () => {
  const webpack = require('webpack'); // eslint-disable-line global-require, import/no-extraneous-dependencies
  const middleware = require('webpack-dev-middleware'); // eslint-disable-line global-require, import/no-extraneous-dependencies
  const webpackConfig = require('../app/webpack.config'); // eslint-disable-line global-require, import/no-extraneous-dependencies

  const compiler = webpack(webpackConfig);
  return middleware(compiler);
};

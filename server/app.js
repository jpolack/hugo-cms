const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const webpackConfig = require('../app/webpack.config');

const compiler = webpack(webpackConfig);

module.exports = middleware(compiler);

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const fs = require('fs');

module.exports = [{
  entry: {
    'bundle': './src/entry.js',
  },
  output: {
      path: "./dist",
      filename: "bundle.js",
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['bundle']
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      },
      comments: false
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
}, {
  entry: {
    style: './src/main.scss',
  },
  output: {
    path: './dist',
    filename: '[name].css',
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?minimize!sass-loader", "inline-css-webpack-loader"),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(css)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
}];

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin')
const fs = require('fs');

module.exports = {
  entry: {
    'bundle': './src/entry.js',
  },
  output: {
      path: "./dist",
      filename: "bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader"),
      },
    ]
  },
  plugins: [
      new webpack.optimize.CommonsChunkPlugin({
      name: ['bundle']
    }),
    new ExtractTextPlugin("main.css"),
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
      test: /\.js$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  postcss: [
    require('postcss-custom-properties')(),
    require('postcss-nested'),
  ],
};

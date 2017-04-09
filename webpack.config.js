var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');

let plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: ['bundle']
  }),
  new ExtractTextPlugin("main.css"),
];

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
  plugins: plugins,
  postcss: [
    require('postcss-custom-properties')(),
    require('postcss-nested'),
  ],
};

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
let grades = [
  {
    name: '4',
    levels: [4],
  },
  {
    name: '5-6',
    levels: [5,6],
  },
  {
    name: '7',
    levels: [7],
  },
  {
    name: '8',
    levels: [8],
  },
  {
    name: '9',
    levels: [9],
  },
];
for (var i in grades) {
  let grade = grades[i];
  let musics = [];
  for (var j in grade.levels) {
    let m = JSON.parse(fs.readFileSync('./data/musics-level-' + grade.levels[j] + '.json'));
    musics = musics.concat(m);
  }
  plugins.push(new HtmlWebpackPlugin({
      template: './src/folder.ejs',
      filename: 'level-' + grade.name + '.html',
      grades: grades,
      grade: grade,
      musics: musics,
    }));
}
plugins.push(new HtmlWebpackPlugin({
    template: './src/index.ejs',
    filename: 'index.html',
    grade: {name: ''},
    grades: grades,
  }));

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
        test: /\.html$/,
        loader: 'html',
      },
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

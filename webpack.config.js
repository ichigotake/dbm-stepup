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
    header: [
     { folder: "-", description: "ほぼ皿なし" },
     { folder: "F", description: "ほぼ無理皿なし" },
     { folder: "E", description: "鍵盤一個の単発無理皿が低頻度に" },
     { folder: "D", description: "最大鍵盤二個の単発無理皿" },
     { folder: "C", description: "低間隔な無理皿" },
     { folder: "B", description: "" },
     { folder: "A", description: "LEVEL 4 上位（5C,7F相当）" },
    ],
    guides: [
      {
        name: "DP五段",
        values: [
          "",
          "DBMに慣れる",
          "拾い方を覚える",
          "基礎の確認",
          "特攻",
          "非推奨",
          "非推奨",
        ]
      },
      {
        name: "DP八段",
        values: [
          "",
          "小手調べ",
          "小手調べ",
          "拾い方を覚える",
          "基礎の確認",
          "ステップアップ",
          "5Cや7Fに慣れてから",
        ]
      },
    ]
  },
  {
    name: '5-6',
    levels: [5,6],
    header: [
     { folder: "-", description: "ほぼ皿なし" },
     { folder: "F", description: "低頻度な単発無理皿" },
     { folder: "E", description: "最大鍵盤二個の単発無理皿" },
     { folder: "D", description: "" },
     { folder: "C", description: "DBM特有の皿配置" },
     { folder: "B", description: "DBM特有の皿配置が多め" },
     { folder: "A", description: "LEVEL 5,6 上位" },
    ],
    guides: [
      {
        name: "DP八段",
        values: [
          "",
          "小手調べ",
          "5,6入門",
          "基礎の確認",
          "基礎の確認 その2",
          "特攻",
          "ケガに注意",
        ]
      },
      {
        name: "DP皆伝",
        values: [
          "",
          "小手調べ",
          "小手調べ",
          "5,6入門",
          "基礎の確認",
          "基礎の確認 その2",
          "特攻",
        ]
      },
    ],
  },
  {
    name: '7',
    levels: [7],
    header: [
     { folder: "-", description: "ほぼ皿なし" },
     { folder: "F", description: "低頻度な単発無理皿" },
     { folder: "E", description: "最大鍵盤2個の単発無理皿" },
     { folder: "D", description: "最大鍵盤3個の単発無理皿" },
     { folder: "C", description: "" },
     { folder: "B", description: "LEVEL 7 上位" },
     { folder: "A", description: "初見クリアは不正クラス" },
    ],
    guides: [
      {
        name: "DP九段",
        values: [
          "",
          "7入門<br>6Dに慣れてから",
          "基礎の確認<br>6C,7Fに慣れてから",
          "基礎の確認 その2",
          "特攻",
          "ケガに注意",
          "不正",
        ]
      },
      {
        name: "DP皆伝",
        values: [
          "",
          "小手調べ",
          "小手調べ",
          "7入門",
          "基礎の確認",
          "特攻",
          "不正",
        ]
      },
    ],
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

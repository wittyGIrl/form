// 未压缩版本
var path = require('path');
var webpack = require('webpack');
var moment = require('moment');

var pkg = JSON.parse(require('fs').readFileSync('./package.json'));
var now = moment().format('YYYY-MM-DD HH:mm');
var year = moment().format('YYYY');

var banner = ` ${pkg.title || pkg.name} - v${pkg.version} - ${now} \n` +
  ` Copyright (c) ${year} ${pkg.author}`;

var es3ifyPlugin = require('es3ify-webpack-plugin');

module.exports = {
  entry: {
    core: "./src/index",
    display: ['babel-polyfill', "./src/display"],
  },
  output: {
    path: path.join(__dirname, "dist"),
    // path: 'e://job/2015/Demo/WitBPM.Demo.Web/Scripts/witui/form/design',
    filename: "formDesigner.[name].js",
    library: ["FormDesigner", "[name]"],
    libraryTarget: "var",
  },
  plugins: [
    new webpack.BannerPlugin(banner, {entryOnly: true}),
    new es3ifyPlugin(),
  ],
  module: {
    loaders: [
      {test: /\.js$/, loaders: ['babel'], include: path.join(__dirname, 'src')},
      {test: /\.less$/, loader: "style!css!less"},
      {test: /\.png$/, loader: "url-loader", query: { mimetype: "image/png" }}
    ]
  }
};

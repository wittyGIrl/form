var path = require('path');
var webpack = require('webpack');

module.exports = {

  entry: {
    core: [
		'babel-plugin-transform-es3-member-expression-literals',
		'babel-plugin-transform-es3-property-literals',
		'babel-plugin-add-module-exports',
		'babel-polyfill',
		'es3ify',
		'es5-shim',
		'es5-shim/es5-sham',
		'console-polyfill',
      './src/index'
    ],
    display: [

		'es3ify',
		'babel-plugin-transform-es3-member-expression-literals',
		'babel-plugin-transform-es3-property-literals',
		'babel-plugin-add-module-exports',
		'babel-polyfill',
		'es5-shim',
		'es5-shim/es5-sham',
		'console-polyfill',
		'./src/display'
	]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "bundle.[name].js",
    //filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
  ],
  module: {
    loaders: [
	  {test: /\.jsx?$/,loaders: ['es3ify-loader']},
      { test: /\.js$/, loaders: ['babel'], include: path.join(__dirname, 'src') },
      { test: /\.less$/, loader: "style!css!less"},
      { test: /\.png$/, loader: "url-loader", query: { mimetype: "image/png" }},
    ]
  }
};

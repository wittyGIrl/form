var path = require('path');
var webpack = require('webpack');
var express = require('express');
var devMiddleware = require('webpack-dev-middleware');
var hotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var bodyParser = require('body-parser');

var app = express();
var compiler = webpack(config);

app.use(express.static(__dirname + '/public'));

app.use(devMiddleware(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
}));

app.use(hotMiddleware(compiler));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/preview', function(req, res, next){
  app.cachedJson = JSON.parse(req.body.json);
  res.json('index');
});

app.get('/preview', function(req, res, next){
  res.json({data: app.cachedJson});
});

app.get('/preview/index', function(req, res, next){
  res.redirect('/previewIndex');
});

app.get('/previewIndex', function(req, res, next){
  res.sendFile(path.join(__dirname, 'preview.html'));
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

var port = 3000;
app.listen(port, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log(`Listening at http://localhost:${port}/`);
});

/* eslint no-console: 0 */

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config.js');
var mongoose = require('mongoose');

//models
var Game = require('./app/models/Game');
var System = require('./app/models/System');

mongoose.connect('mongodb://localhost/gameSessions');
var isDeveloping = process.env.NODE_ENV !== 'production';
var port = isDeveloping ? 3000 : process.env.PORT;
var app = express();

var sampleData = [
  {id: 1, user: "Pete Hunt", game: "Destiny", description: 'Daily strikes', date: '12:11', system: 'X-Box One', slots: '1/4' },
  {id: 2, user: "Jordan Walke", game: "Far Cry 4", description: 'Survival mode', date: '14:11', system: 'Playstation 3', slots: '3/4' }
];

if (isDeveloping) {
  var compiler = webpack(config);
  var middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.get('/', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('/', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/games', function (req, res) {
  Game.find(function (err, docs) {
    res.json(docs);
  });
});

app.get('/systems', function (req, res) {
  System.find(function (err, docs) {
    res.json(docs);
  });
});

app.get('/sessions', function (req, res) {
    res.json(sampleData);
});

app.post('/sessions', function (req, res) {
    res.json(req.body);
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

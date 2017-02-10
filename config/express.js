var express = require('express'),
    load = require('express-load'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator');

module.exports = function() {

  var app = express();

  app.use(express.static('./app/public'));
  app.set('view engine','ejs');
  app.set('views', './app/views');

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(expressValidator());


  load('routes', {cwd: 'app'})
      .then('infra')
      .into(app);

  app.use(function(req,res,next) {
    res.status(404).render('erros/404');
    next();
  });

  app.use(function(error,req,res,next) {
    if (process.env.NODE_ENV == 'production') {
      res.status(500).render('erros/500');
      return;
    }
    next(error);
  });

  return app;
}

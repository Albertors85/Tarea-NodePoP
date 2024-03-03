var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');

require('./lib/connectMoogoose');

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
 * Middlewares
 */


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Rutas del WEbsite
 */

app.use('/', indexRouter);

/**
 * Rutas del Api
 */

app.use('/articulos', require('./routes/api/articulos'));


// catch 404 and forward to error handler

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if(err.array){
    const errInfo = err.array({})[0];
    console.log(errInfo);
    err.message = `Not valid - ${errInfo.type} ${errInfo.path} in ${errInfo.location} ${errInfo.msg}`;
    err.satus =422;
  };

  res.status(err.status || 500);

  // Erro en Api respuesta en JSON
  if(req.originalUrl.startsWith('/api/')){
    res.json({error: err.message });
    return;
  };

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  // render the error page
  res.render('error');
});

module.exports = app;

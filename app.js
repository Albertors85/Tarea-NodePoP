var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session= require('express-session');
const MongoStore = require('connect-mongo');
var indexRouter = require('./routes/index');
const i18n = require('./lib/i18nConfi');
const sessionAuth = require('./lib/sessionAuthMiddleware.js')
const jwtAuth = require('./lib/jwtAuthMiddleware.js')
const LanguajeController = require('./controllers/LanguageController.js');
const LoginController = require('./controllers/LoginController.js');
const PrivateControllers = require('./controllers/PrivateControlers.js');
const CreateController = require('./controllers/CreateController.js')

const languajeController = new LanguajeController();
const loginController = new LoginController();
const privateControllers = new PrivateControllers();
const createAdverts = new CreateController();

require('./lib/connectMoogoose');
var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


/**
 * Middlewares
 */

// tituloooooo aqui local

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Rutas del Api
 */
app.post('/api/login',loginController.postApiJWT);
app.use('/articulos',jwtAuth , require('./routes/api/articulos'));


/**
 * Rutas del WEbsite
 */
app.use(i18n.init);
app.use(session({
  name:'nodePop-Session',
  secret: 'efh98fhf89djndjkvkjre9493riojscnsdmnc',
  saveUninitialized: true,
  resave: false,
  cookie:{
    maxAge: 1000*60*60*12*1
  },
  store : MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/NodepopArt'
  })
}));

app.use((req,res,next)=>{
  res.locals.session = req.session;
  next();
})

  

app.use('/', indexRouter);
app.use('/users', require('./routes/userApi.js'));
app.get('/change-locale/:locale',languajeController.changeLocale);
app.get('/private',sessionAuth, privateControllers.index);
app.get('/login', loginController.index);
app.post('/login', loginController.post, loginController.postApiJWT);
app.get('/logout', loginController.logOut);
app.get('/create-advert', createAdverts.newAdvert);
app.post('/create-advert', createAdverts.postCreate);



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

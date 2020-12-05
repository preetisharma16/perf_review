var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var verifySession = require('./routes/verify');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getManagerRouter = require('./routes/getManager');
var getEmployeesRouter = require('./routes/getEmployees');
var addRatingRouter = require('./routes/addRating');
var updateRatingRouter = require('./routes/updateRating');
var getEmployeeRatingRouter = require('./routes/getEmployeeRating');

require('dotenv').config()

var app = express();
const oidc = new ExpressOIDC({
  issuer: process.env.OIDC_ISSUER,
  client_id: process.env.OIDC_CLIENT_ID,
  client_secret: process.env.OIDC_CLIENT_SECRET,
  appBaseUrl: process.env.BASE_URL,
  loginRedirectUri: `${process.env.BASE_URL}/callback`,
  scope: 'openid profile',
  routes: {
    loginCallback: {
      path: '/callback'
    },
  }
});
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}));
app.use(oidc.router);

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(verifySession);

/*
app.get('/', (req, res, next) => {
  console.log("inside get function");
  res.sendFile(__dirname + '/public/managerHome.html');

 }); */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/getManager', getManagerRouter);
app.use('/getEmployees', getEmployeesRouter);
app.use('/addRating', addRatingRouter);
app.use('/updateRating', updateRatingRouter);
app.use('/getEmployeeRating', getEmployeeRatingRouter);

app.get('/getEmpChart/:id', (req, res) => {
  console.log("Inside users.js get employee")
  res.sendFile(__dirname + '/public/charts.html');
});

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;

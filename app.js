var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let JiraClient = require('jira-connector');
require('datejs');
let cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var taskCountRouter = require('./routes/taskcount');
var taskLabels = require('./routes/tasklabels');
var taskLifespan = require('./routes/tasklifespan');
var taskVersion = require('./routes/taskversions');

var jira = new JiraClient({
  host: 'leffsu.atlassian.net',
  basic_auth: {
    username: "faggid@gmail.com",
    password: "m66GGsZ38EpMKpayBkbU2A01"
  },
  // strictSSL: true // One of optional parameters
});

var app = express();

app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/taskcount', taskCountRouter);
app.use('/tasklabels', taskLabels);
app.use('/tasklifespan', taskLifespan);
app.use('/taskversion', taskVersion);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {
  app: app,
  jira: jira
};

// どのページでも使用するモジュール require
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const mypageRouter = require('./routes/mypage');
const auctionRouter = require('./routes/auction');
const registRouter = require('./routes/regist');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// log
app.use(logger('dev'));

app.use(express.json());
// http.req.body
app.use(express.urlencoded({ extended: true }));
// cookie
app.use(cookieParser());
// session
app.use(
  session({
    secret: '',
    resave: false,
    saveUninitialized: true,
  }),
);

// 静的ファイルのパス
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/regist', registRouter);
app.use('/mypage', mypageRouter);
app.use('/auction', auctionRouter);

// ログインチェック middleware

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

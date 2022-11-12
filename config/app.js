// どのページでも使用するモジュール require
const express = require('express');
// const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../app/views'));
app.set('view engine', 'ejs');

// log
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie
app.use(cookieParser());

// 静的ファイルのパス
app.use(express.static(path.join(__dirname, '../public')));

// router 追加するならここに追記
const indexRouter = require('./router');
const mypageRouter = require('../app/controller/mypage/router');
const auctionRouter = require('../app/controller/auction/router');
const registRouter = require('../app/controller/regist/router');

app.use('/', indexRouter);
app.use('/regist', registRouter);
app.use('/mypage', mypageRouter);
app.use('/auction', auctionRouter);

//  middleware
// ログインチェック
// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

// // error handler
// app.use((err, req, res) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;

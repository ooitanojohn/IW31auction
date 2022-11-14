/**
 * どのページでも使用するモジュールを記述
 * */
const express = require('express');
// const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
/**
 * appインスタンス作成
 */
const app = express();
// debug
// const logger = require('morgan');
// app.use(logger('dev'));
/**
 * express 便利モジュール設定
 */
// view engine setup
app.set('views', path.join(__dirname, '../app/views'));
app.set('view engine', 'ejs');
// 静的ファイルのパス
app.use(express.static(path.join(__dirname, '../public')));
// httpRequest body取得設定
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie session便利
app.use(cookieParser());

// csrf対策
app.use(
  session({
    secret: 'secret-key',
    resave: true,
    saveUninitialized: true,
  }),
);

// router 追加するならここに追記
const indexRouter = require('../app/controller/top/router');
const loginRouter = require('../app/controller/login/router');
const registRouter = require('../app/controller/regist/router');
const mypageRouter = require('../app/controller/mypage/router');
const auctionRouter = require('../app/controller/auction/router');

app.use('/', indexRouter);
app.use('/login', loginRouter);
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

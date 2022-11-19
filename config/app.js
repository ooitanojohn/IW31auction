/** 共通モジュール */
const express = require('express');
// const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const logger = require('morgan');
const { auctionRouter, registRouter, mypageRouter, loginRouter, topRouter } = require('./router');
// const passport = require('passport');

/** appインスタンス */
const app = express();
/** 環境変数 */
require('dotenv').config();
/** パス設定 */
app.set('views', path.join(__dirname, '../app/views'));
app.set('view engine', 'ejs');
/** middleware */
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
/** passportモジュールをロード */
/** session設定 まだ良くわかってない */
app.use(
  session({
    secret: 'secret-key',
    resave: true,
    saveUninitialized: true,
  }),
);

/** router 非同期、ページ遷移用 */
app.use('/', topRouter);
app.use('/login', loginRouter);
app.use('/regist', registRouter);
app.use('/mypage', mypageRouter);
app.use('/auction', auctionRouter);
/** logger */
// app.use(logger('dev'));
module.exports = app;

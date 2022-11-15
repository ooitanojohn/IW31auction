/** 共通モジュール */
const express = require('express');
// const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const logger = require('morgan');
const topRouter = require('../app/controller/top/router');
const loginRouter = require('../app/controller/login/router');
const registRouter = require('../app/controller/regist/router');
const mypageRouter = require('../app/controller/mypage/router');
const auctionRouter = require('../app/controller/auction/router');
const topApiRouter = require('../app/api/top/router');
const loginApiRouter = require('../app/api/login/router');
const registApiRouter = require('../app/api/regist/router');
const mypageApiRouter = require('../app/api/mypage/router');
const auctionApiRouter = require('../app/api/auction/router');
/** appインスタンス */
const app = express();
/** パス設定 */
app.set('views', path.join(__dirname, '../app/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));
/** middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
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
/** nodeでサーバサイドを作成する場合 */
app.use('/api', topApiRouter);
app.use('/loginApi', loginApiRouter);
app.use('/registApi', registApiRouter);
app.use('/mypageApi', mypageApiRouter);
app.use('/auctionApi', auctionApiRouter);

/** logger */
// app.use(logger('dev'));

module.exports = app;

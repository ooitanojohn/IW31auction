require('dotenv').config();
const createError = require('http-errors');
const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

/** authorization */
require('./passport')(app);

/** view engine set up */
app.set('views', path.join(__dirname, '../app/views'));
app.set('view engine', 'ejs');
/** middleware */
app.use(express.static(`${__dirname}/../public`, { index: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/** flashMsg */
app.use((req, res, next) => {
  const msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !!msgs.length;
  req.session.messages = [];
  next();
});

/** router */
const adminRouter = require('../app/controller/admin/router');
/**
 * 管理者側
 */
/** 管理画面  */
app.use('/admin', adminRouter);
/** 車両管理  */
adminRouter.use('/carStocks', require('../app/controller/admin/carStocksManagementRouter'));
/** 出品管理 */
adminRouter.use('/products', require('../app/controller/admin/productsManagementRouter'));
/** 会員管理 */
adminRouter.use('/users', require('../app/controller/admin/userManagementRouter'));
/** 売上管理 */
adminRouter.use('/sales', require('../app/controller/admin/salesManagementRouter'));

/**
 * ユーザー側
 */
/** ログイン */
app.use('/', require('../routes/auth'));
/** オークション一覧 + 入札ページ + 商品詳細 */
app.use('/', require('../routes/index'));
// マイページ (落札一覧、入札履歴、退会処理)
app.use('/mypage', require('../routes/mypage'));
// 上記以外のURLを404ページに飛ばして404にTOPへのリンクをつける

/** http-error 404ページ */
app.use((req, res, next) => {
  /** 404を受け取るとエラーをthrowする */
  next(createError(404));
});

// error handler 404か500のエラーがthrowされたとき、catchする
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  /** local変数への格納 */
  res.locals.message = err.message;
  /** error内容 */
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  /** 404か 500を返す */
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

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

/** loginCheck */
app.use('/', require('./middleware/loginCheck'));

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
// 上記以外のURLを404ページに飛ばして404にTOPへのリンクをつける
/** ログイン */
app.use('/', require('../routes/auth'));

/** オークション一覧 */
app.use('/', require('../routes/auction'));

/** 入札ページ  */
app.use('/bidding', require('../routes/bidding'));
/** 商品詳細 */
app.use('/product', require('../routes/product'));

/** マイページ (落札一覧、入札履歴、退会処理) */
app.use('/mypage', require('../routes/mypage'));

const { httpRapper } = require('../app/common/httpRapper');

/** http-error 404ページ */
app.use((req, res, next) => {
  next(createError(404));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const resInfo = httpRapper(req);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error', { ejsRender: resInfo });
});

module.exports = app;

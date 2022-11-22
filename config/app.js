const express = require('express');

const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

/**
 * 静的ファイル
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../app/views'));
/**
 * middleware
 */
app.use(express.static(`${__dirname}/../public`, { index: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * router
 */
const adminRouter = require('../app/controller/admin/router');
const biddingRouter = require('../app/controller/bidding/router');
const carStocksManagementRouter = require('../app/controller/admin/carStocksManagement/router');
const productsManagementRouter = require('../app/controller/admin/productsManagement/router');
const userManagementRouter = require('../app/controller/admin/userManagement/router');

/**
 * 管理者側
 */
/**
 * 管理画面
 * ログイン
 */
app.use('/admin', adminRouter);
/**
 * 車両管理
 */
app.use('/admin/carStocks', carStocksManagementRouter);
/** 出品管理 */
app.use('/admin/products', productsManagementRouter);
/** 会員管理 */
app.use('/admin/users', userManagementRouter);
/** 売上管理 */
app.use('/admin', biddingRouter);

/**
 * ユーザー側
 */
/** ランディングページ */

/** ログイン、登録ページ */

/**
 * オークションスケジュール確認
 * (商品一覧確認、商品詳細ページ)
 */
// app.get("/admin/car", carRouter);
// app.use("/top", productRouter);

// 入札ページ
app.use('/bidding', biddingRouter);

// マイページ (落札一覧、入札履歴、退会処理)
// app.use("/myPage",myPageRouter);

// 上記以外のURLを404ページに飛ばして404にTOPへのリンクをつける
app.get('/', (req, res) => {
  res.send('send');
});

module.exports = app;

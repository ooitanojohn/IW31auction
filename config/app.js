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

/** router */
/**
 * 管理者側
 */
const adminRouter = require('../app/controller/admin/router');
/**
 * 管理画面
 * ログイン
 */
app.use('/admin', adminRouter);
/**
 * 車両管理
 */
adminRouter.use(
  '/carStocks',
  require('../app/controller/admin/carStocksManagementRouter'),
); /** localhost:9000/admin/catStocks */
/** 出品管理 */
adminRouter.use('/products', require('../app/controller/admin/productsManagementRouter'));
/** 会員管理 */
adminRouter.use('/users', require('../app/controller/admin/userManagementRouter'));
/** 売上管理 */
adminRouter.use('/sales', require('../app/controller/admin/salesManagementRouter'));

/**
 * ユーザー側
 */
app.use('/', require('../app/controller/router'));
/** ランディングページ = / */
/** ログイン、登録ページ  /login /regist */
/**
 * オークションスケジュール確認
 * (商品一覧確認、商品詳細ページ)
 */
// 入札ページ
app.use('/auction', require('../app/controller/mypageRouter'));
// マイページ (落札一覧、入札履歴、退会処理)
app.use('/mypage', require('../app/controller/auctionRouter'));
// 上記以外のURLを404ページに飛ばして404にTOPへのリンクをつける

module.exports = app;

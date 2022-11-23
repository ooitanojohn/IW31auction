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
const carStocksManagementRouter = require('../app/controller/admin/carStocksManagementRouter');
const productsManagementRouter = require('../app/controller/admin/productsManagementRouter');
const userManagementRouter = require('../app/controller/admin/userManagementRouter');
const salesManagementRouter = require('../app/controller/admin/salesManagementRouter');

const userRouter = require('../app/controller/router');
const mypageRouter = require('../app/controller/mypageRouter');
const auctionRouter = require('../app/controller/auctionRouter');

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
adminRouter.use('/carStocks', carStocksManagementRouter);
/** 出品管理 */
adminRouter.use('/products', productsManagementRouter);
/** 会員管理 */
adminRouter.use('/users', userManagementRouter);
/** 売上管理 */
adminRouter.use('/sales', salesManagementRouter);

/**
 * ユーザー側
 */
app.use('/', userRouter);
/** ランディングページ = / */
/** ログイン、登録ページ  /login /regist */
/**
 * オークションスケジュール確認
 * (商品一覧確認、商品詳細ページ)
 */
// 入札ページ
app.use('/auction', auctionRouter);
// マイページ (落札一覧、入札履歴、退会処理)
app.use('/mypage', mypageRouter);
// 上記以外のURLを404ページに飛ばして404にTOPへのリンクをつける

module.exports = app;

const express = require('express');

const router = express.Router();
const {
  adminExhibitSelect,
  adminPrepareSelect,
  adminExhibitInsert,
  adminExhibitUpdate,
  adminExhibitDelete,
  adminBidRegist,
} = require('../../app/controller/admin/adminProductController');

/**
 * 出品状態一覧の商品を取ってきて表示
 * 検索?クエリがあれば分岐
 */
router.get('/exhibit/:pageId', (req, res, next) => {
  adminExhibitSelect(req, res, next);
});
/** 在庫一覧表示 新規登録 */
router.get('/prepare/:pageId', (req, res, next) => {
  adminPrepareSelect(req, res, next);
});

/**
 * 商品登録
 * carstocksテーブルからproductテーブルに登録。画像登録も行う
 */
router.post('/insert', (req, res, next) => {
  adminExhibitInsert(req, res, next);
});

/**
 * 出品予定商品更新
 */
router.post('/update/', async (req, res, next) => {
  adminExhibitUpdate(req, res, next);
});

/**
 * 出品予定商品削除
 */
router.post('/delete/:productId', async (req, res, next) => {
  adminExhibitDelete(req, res, next);
});

/**
 * 落札者登録
 */
router.post('/regist/:productId', async (req, res, next) => {
  adminBidRegist(req, res, next);
});

module.exports = router;

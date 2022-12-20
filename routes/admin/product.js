/* eslint-disable no-shadow */
const express = require('express');
const debug = require('debug')('http:adminProduct');
const multer = require('multer');

const router = express.Router();
const {
  adminExhibitSelect,
  adminPrepareSelect,
  adminExhibitInsert,
  adminExhibitUpdate,
  adminExhibitDelete,
  adminBidRegist,
} = require('../../app/controller/admin/adminProductController');

const { storage, fileFilterImg } = require('../../app/common/multer');
const { beginTran } = require('../../app/module/mysqlPool');

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

/** upload設定 */
const uploadImgAdmin = multer({
  storage: storage('product'),
  fileFilter: fileFilterImg,
});
const uploadImgAdminArray = uploadImgAdmin.array('product', 10);
/** 出品予定画像登録 */
router.post('/upload/:productId', async (req, res, next) => {
  const imgList = [];
  try {
    uploadImgAdminArray(req, res, async (err) => {
      imgList.push(req.files[0].filename);
      debug(req.files);
      if (err instanceof multer.MulterError) {
        throw new Error(err);
      } else if (err) {
        throw new Error(err);
      }
      const tran = await beginTran();
      try {
        await tran
          .query(`UPDATE products SET car_img = ? WHERE product_id = ?;`, [
            JSON.stringify(req.files[0].filename),
            req.params.productId,
          ])
          .catch((err) => {
            throw new Error(err);
          });
        await tran.commit();
      } catch (err) {
        await tran.rollback();
        debug(err);
        next(err);
      }
    });
  } catch (err) {
    debug(err);
  }
  debug(imgList);
  res.redirect(301, '/admin/product/exhibit/1?state=schedule');
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

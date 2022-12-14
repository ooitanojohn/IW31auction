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
router.post('/insert', async (req, res, next) => {
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

// /** 出品登録画面での更新(PUT)、論理削除処理 (form) */
// router.post('/update/:productId', async (req, res, next) => {
//   /** resに渡す情報とSQLモジュールの読み込み */
//   const tran = await beginTran();
//   try {
//     await tran.query(
//       `UPDATE user_tbl
//       SET card_number=?, card_key=?, user_state=?
//       WHERE user_id=?`,
//       [3540000000000001, 555, 1, 1],
//     );
//     // throw new Error("エラーテスト");
//     await tran.commit();
//     res.end('OK');
//   } catch (err) {
//     await tran.rollback();
//     next(err);
//   }
// });

// router.post('/regist', upload.array('multi-files'), async (req, res, next) => {
//   res.header('Content-Type', 'text/plain;charset=utf-8');
//   const tran = await beginTran();
//   const stockInfo = httpRapper(req);

//   try {
//     stockInfo.sql = await tran.query(`SELECT * FROM carstocks WHERE stock_id = ?`, [req.body.id]);
//     await tran.commit();
//   } catch (err) {
//     await tran.rollback();
//     next(err);
//   }
//   res.end('OK');
// });

// const formData = require('express-form-data');
// const path = require('path');
// const fs = require('fs');
// const multer = require('multer');
// const { imgUpload }= require('../app/common/imgUpload');

// const storage = multer.diskStorage({
//   //ファイルの保存先を指定
//   //Express4の仕様かなんかで画像staticなファイルを保存するときはpublic/以下のフォルダに置かないとダメらしい
//   //詳しくは express.static public でググろう！
//   destination: function (req, file, cb) {
//     cb(null, '../../common/public/src/car');
//   },
//   //ファイル名を指定
//   //ここでは image.jpg という名前で保存
//   filename: function (req, file, cb) {
//     cb(null, 'image.jpg');
//   },
// });
// const upload = multer({ storage: storage });

// ファイルアップロードに利用
// router.use(formData.parse({ uploadDir: path.join(__dirname, '../../common/public/src/car'), autoClean: true }));

// これを指定すると、サイズが0のファイルはfilesから削除してくれる
// router.use(formData.format());

// /** carStock_tbl一覧表示
//  * 画像登録フォーム×10 を書くリストの下につけておく
//  * checkbox 選択 + 追加情報で 新規登録
//  *
//  */
// router.post('/insert', async (req, res, next) => {
//   const tran = await beginTran();
//   try {
//     await tran.query(`INSERT`, []);
//     // throw new Error("エラーテスト");
//     await tran.commit();
//     res.end('OK');
//   } catch (err) {
//     await tran.rollback();
//     next(err);
//   }
// });

module.exports = router;

const express = require('express');
const router = express.Router();
const formData = require('express-form-data');
const path = require('path');
const fs = require('fs');

//*** 追加1 ここから***//
var multer = require('multer');
const storage = multer.diskStorage({
  //ファイルの保存先を指定
  //Express4の仕様かなんかで画像staticなファイルを保存するときはpublic/以下のフォルダに置かないとダメらしい
  //詳しくは express.static public でググろう！
  destination: function (req, file, cb) {
    cb(null, '../../common/public/src/car');
  },
  //ファイル名を指定
  //ここでは image.jpg という名前で保存
  filename: function (req, file, cb) {
    cb(null, 'image.jpg');
  },
});
var upload = multer({ storage: storage });

// ファイルアップロードに利用
//router.use(formData.parse({ uploadDir: path.join(__dirname, '../../common/public/src/car'), autoClean: true }));

// これを指定すると、サイズが0のファイルはfilesから削除してくれる
// router.use(formData.format());
/** 出品管理 product_tbl一覧表示 */
router.get('/admin/products/1', async (req, res, next) => {
  /** resに渡す情報とSQLモジュールの読み込み */
  const resInfo = httpRapper(req);
  /** paging */
  const limit = 5;
  const offset = paginate(5, 1);
  debug(offset);
  /** 画像データは10個。json化してinsertする */
  try {
    if (req.query === 'search') {
      /** 絞り込み */
      resInfo.sql = await executeQuery('SELECT * FROM `products` LIMIT ? OFFSET ?;', [
        limit,
        offset,
      ]);
    }
    /** ここに処理を記述 */
    resInfo.sql = await executeQuery(
      'SELECT * FROM `products` WHERE `product_state` = 1 LIMIT ? OFFSET ?;',
      [limit, offset],
    );
    debug(resInfo.sql);
    res.render('admin/productsTable.ejs', { ejsRender: resInfo });
  } catch (err) {
    next(err);
  }
});
/**
 * 出品管理 router + controller
 */
/** 必要module読み込み */
/** resに渡す情報とSQLモジュールの読み込み */
const debug = require('debug')('http:products');
const { executeQuery, beginTran } = require('../../module/mysqlPool');
const { httpRapper } = require('../../common/httpRapper');
const { paginate } = require('../../common/paginate');
// const { imgUpload }= require('../../common/imgUpload');
/** carStock_tbl一覧表示
 * 画像登録フォーム を書くリストの下につけておく
 */
router.get('/insert', async (req, res, next) => {
  const stockInfo = httpRapper(req);
  try {
    stockInfo.sql = await executeQuery('SELECT * FROM `carstocks` WHERE `stock_state` = 0;');
    // throw new Error("エラーテスト");
    res.render('admin/carStock.ejs', { ejsRender: stockInfo });
  } catch (err) {
    next(err);
  }
});
/** 商品登録
 * carstocksテーブルからproductテーブルに登録。画像登録も行う
 */
router.post('/regist', upload.array('multi-files'), async (req, res, next) => {
  res.header('Content-Type', 'text/plain;charset=utf-8');
  const tran = await beginTran();
  const stockInfo = httpRapper(req);

  try {
    stockInfo.sql = await tran.query(`SELECT * FROM carstocks WHERE stock_id = ?`, [req.body.id]);
    //const img = imgUpload(req.files);
    // throw new Error("エラーテスト");
    await tran.commit();
  } catch (err) {
    await tran.rollback();
    next(err);
  }
  res.end('OK');
});
/** 出品管理 product_tbl一覧表示 */
router.get('/:page', async (req, res, next) => {
  /** resに渡す情報とSQLモジュールの読み込み */
  const resInfo = httpRapper(req);
  /** paging */
  const limit = 5;
  const offset = paginate(5, req.params.page);
  debug(offset);
  /** 画像データは10個。json化してinsertする */
  try {
    if (req.query === 'search') {
      /** 絞り込み */
      resInfo.sql = await executeQuery('SELECT * FROM `products` LIMIT ? OFFSET ?;', [
        limit,
        offset,
      ]);
    }
    /** ここに処理を記述 */
    resInfo.sql = await executeQuery(
      'SELECT * FROM `products` WHERE `product_state` = 1 LIMIT ? OFFSET ?;',
      [limit, offset],
    );
    debug(resInfo.sql);
    res.render('admin/productsTable.ejs', { ejsRender: resInfo });
  } catch (err) {
    next(err);
  }
});

// /** 出品登録画面での更新、論理削除処理 (form) */
// router.post('/:productId', async (req, res, next) => {
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

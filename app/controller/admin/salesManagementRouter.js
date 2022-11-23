const express = require('express');

const router = express.Router();
/**
 * 売上管理 router + controller
 */
const debug = require("debug")("http:sales");
const { executeQuery, beginTran } = require('../../module/mysqlPool');
const { httpRapper } = require("../../common/httpRapper");

/** 売上管理 時間終了した出品一覧表示 */
router.get('/', async (req, res, next) => {
  /** resに渡す情報とSQLモジュールの読み込み */
  const resInfo = httpRapper(req);
  try {
    if (req.query === 'search') {
      /** 絞り込み */
      resInfo.sql = await executeQuery(
        'SELECT * FROM `biddings` WHERE `product_id` = ? ORDER BY `bidding_time` ASC LIMIT 5',
        ['1'],
      );
    }
    /** ここに処理を記述 */
    resInfo.sql = await executeQuery(
      'SELECT * FROM `biddings` WHERE `product_id` = ? ORDER BY `bidding_time` ASC LIMIT 5',
      ['1'],
    );
    debug(resInfo.sql);
    res.render('admin/top', { ejsRender: resInfo });
  } catch (err) {
    next(err);
  }
});

/** 入金を確認したら入金登録 */
router.post('/:productId', async (req, res, next) => {
  /** resに渡す情報とSQLモジュールの読み込み */
  const tran = await beginTran();
  try {
    await tran.query(
      `UPDATE user_tbl
      SET card_number=?, card_key=?, user_state=?
      WHERE user_id=?`,
      [3540000000000001, 555, 1, 1],
    );
    // throw new Error("エラーテスト");
    await tran.commit();
    res.end('OK');
  } catch (err) {
    await tran.rollback();
    next(err);
  }
});

/** product_tbl 購入権取得カラム 一覧表示 */
router.get('/insert', async (req, res, next) => {
  /** resに渡す情報とSQLモジュールの読み込み */
  const tran = await beginTran();
  try {
    await tran.query(`INSERT`, []);
    // throw new Error("エラーテスト");
    await tran.commit();
    res.end('OK');
  } catch (err) {
    await tran.rollback();
    next(err);
  }
});

/** product_tbl product_state = 3 入金を確認したら入金tbl登録  */
router.post('/insert', async (req, res, next) => {
  /** resに渡す情報とSQLモジュールの読み込み */
  const tran = await beginTran();
  try {
    await tran.query(`INSERT`, []);
    // throw new Error("エラーテスト");
    await tran.commit();
    res.end('OK');
  } catch (err) {
    await tran.rollback();
    next(err);
  }
});

module.exports = router;

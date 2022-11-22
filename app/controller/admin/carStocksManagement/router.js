/* eslint-disable global-require */
const express = require('express');

const router = express.Router();
/**
 * 車両管理 router + controller
 *
 */
/** 必要module読み込み */
const { executeQuery, beginTran } = require('../../../module/mysqlPool');

/** 車両一覧表示 */
router.get('/:page', async (req, res, next) => {
  /** resに渡す情報とSQLモジュールの読み込み */
  const { reqInfoReturn } = require('../../../common/httpRapper');
  const resInfo = reqInfoReturn(req);
  try {
    /** ここに処理を記述 */
    resInfo.sql = await executeQuery(
      'SELECT * FROM `biddings_tbl` WHERE `product_id` = ? ORDER BY `bidding_time` ASC LIMIT 5',
      ['1'],
    );

    res.render('bidding.ejs', { ejsRender: resInfo });
  } catch (err) {
    next(err);
  }
});

/** 新規登録 (csv) */
router.post('/', async (req, res, next) => {
  /** resに渡す情報とSQLモジュールの読み込み */
  const { reqInfoReturn } = require('../../../common/httpRapper');
  const resInfo = reqInfoReturn(req);
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

/** 更新処理 (form) */
router.post('/:car', async (req, res, next) => {
  /** resに渡す情報とSQLモジュールの読み込み */
  const { reqInfoReturn } = require('../../conf/auctionResInfo');
  const resInfo = reqInfoReturn(req);
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

module.exports = router;

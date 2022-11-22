const express = require('express');

const router = express.Router();
/**
 * 会員管理 router + controller
 */
/** 必要module読み込み */
/** resに渡す情報とSQLモジュールの読み込み */
const debug = require("debug")("http:user");
const { executeQuery, beginTran } = require('../../module/mysqlPool');
const { httpRapper } = require("../../common/httpRapper");

/** 会員管理 一覧表示 */
/** 詳細 slider modalで表示 */
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
    res.render('admin/userManagement.ejs', { ejsRender: resInfo });
  } catch (err) {
    next(err);
  }
});

/** 出品登録画面での垢バン 論理削除処理 (form) */
router.post('/:userId', async (req, res, next) => {
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

/**
 * ユーザーごとの購入データ表示 グラフ化 chart.js
 */
router.get('/userId/:userId', async (req, res, next) => {
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

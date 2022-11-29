const express = require('express');

const router = express.Router();
/**
 * 売上管理 router + controller
 */

/** 売上管理 時間終了した出品一覧表示 */
router.get('/', async (req, res, next) => {
  /** resに渡す情報とSQLモジュールの読み込み */
  const { reqInfoReturn } = require('../../conf/auctionResInfo');
  const resInfo = reqInfoReturn(req);
  const { executeQuery } = require('../../module/mysqlTransaction');

  try {
    if (req.query === 'search') {
      /** 絞り込み */
      resInfo.sql = await executeQuery(
        'SELECT * FROM `biddings_tbl` WHERE `product_id` = ? ORDER BY `bidding_time` ASC LIMIT 5',
        ['1'],
      );
    }
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

/** 入金を確認したら入金登録 */
router.post('/:productId', async (req, res, next) => {
  /** resに渡す情報とSQLモジュールの読み込み */
  const { reqInfoReturn } = require('../../conf/auctionResInfo');
  const resInfo = reqInfoReturn(req);
  const { beginTran } = require('/app/module/mysqlTransaction');
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
  const { reqInfoReturn } = require('../../conf/auctionResInfo');
  const resInfo = reqInfoReturn(req);
  const { beginTran } = require('/app/module/mysqlTransaction');
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
  const { reqInfoReturn } = require('../../conf/auctionResInfo');
  const resInfo = reqInfoReturn(req);
  const { beginTran } = require('/app/module/mysqlTransaction');
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

/** 
 * 時間終了した出品IDの最大入札金額者のid、金額を取ってくる。
 * 入札確定者の情報一覧表示 
 * */
app.get("/bidder", async (req, res, next) => {
app/module/mysqlTransactionを読み込む
  const { executeQuery } = require("app/module/mysqlTransaction");
  try {
    const data =  executeQuery('SELECT bi.user_id, bi.product_id , MAX(bi.bidding_money) FROM biddings AS bi INNER JOIN products AS pr ON pr.product_id = bi.product_id WHERE pr.end_time < NOW() GROUP BY bi.product_id;');
    console.log(data);
  res.end("OK");
  } catch (err) {
    next(err);
  }
});

module.exports = router;



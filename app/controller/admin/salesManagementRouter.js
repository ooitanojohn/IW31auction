const express = require('express');

const router = express.Router();
/**
 * 売上管理 router + controller
 */
// const debug = require('debug')('http:sales');
const { executeQuery, beginTran } = require('../../module/mysqlPool');
const { httpRapper } = require('../../common/httpRapper');
const { paginate } = require('../../common/paginate');

/** 売上管理 時間終了した出品一覧表示 */
router.get('/:salesId', async (req, res, next) => {
  const resInfo = httpRapper(req);
  const limit = 5;
  let data;
  let offset;
  resInfo.maxpage = 0;
  /** resに渡す情報とSQLモジュールの読み込み */
  try {
    // if (req.query === 'search') {
    //   /** 絞り込み */
    //   resInfo.sql = await executeQuery(
    //     'SELECT * FROM `biddings` WHERE `product_id` = ? ORDER BY `bidding_time` ASC LIMIT 5',
    //     ['1'],
    //   );
    // }
    /** ここに処理を記述 */
    data = await executeQuery('SELECT count(*) as count FROM `sales` ORDER BY `user_id`');
    resInfo.maxpage = Math.ceil(data[0].count / limit);
    resInfo.now = Math.max(req.params.salesId, 1); /** resInfo.nowが１未満になるのを防ぐ */
    resInfo.now = Math.min(
      resInfo.maxpage,
      resInfo.now,
    ); /** resInfo.nowが($maxpage+1)以上になるのを防ぐ */
    offset = paginate(limit, resInfo.now);

    /** ここに処理を記述 */
    resInfo.sql = await executeQuery(
      'SELECT * FROM `sales` ORDER BY `user_id` ASC LIMIT ? OFFSET ?;',
      [limit, offset],
    ).catch((err) => {
      throw new Error(err);
    });
    res.render('admin/salesManagementRouter', { ejsRender: resInfo });
  } catch (err) {
    next(err);
  }
});

/** 入金を確認したら入金登録 */
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

// //特定時間にメール送信する
// const cron_confirmation = require('node-cron');
// let sql = executeQuery(
//   'SELECT end_time,user_mail FROM `sales` s INNER JOIN products p ON s.product_id = p.product_id INNER JOIN users u ON s.user_id = u.user_id',
// );
// cron_confirmation.schedule('',function(){
// });

module.exports = router;

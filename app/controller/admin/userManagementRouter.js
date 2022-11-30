const express = require('express');

const router = express.Router();
/**
 * 会員管理 router + controller
 */
/** 必要module読み込み */
/** resに渡す情報とSQLモジュールの読み込み */
const debugMySQL = require('debug')('MySQL:user');
const { executeQuery, beginTran } = require('../../module/mysqlPool');
const { httpRapper } = require('../../common/httpRapper');

/** 会員管理 一覧表示 */
/** 詳細 slider modalで表示 */
router.get('/', async (req, res, next) => {
  /** resに渡す情報とSQLモジュールの読み込み */
  const resInfo = httpRapper(req);
  try {
    debugMySQL(resInfo);
    /** ここに処理を記述 */
    resInfo.sql = await executeQuery('SELECT * FROM `users` ORDER BY `user_id` ASC').catch(
      (err) => {
        throw new Error(err);
      },
    );
    res.render('admin/userManagement.ejs', { ejsRender: resInfo });
  } catch (err) {
    next(err);
  }
});

/** 出品登録画面での垢バン 論理削除処理 (form) */
router.post('/', async (req, res, next) => {
  const tran = await beginTran();
  const resInfo = httpRapper(req);
  try {
    /** 変更をかけたいuserのuser_stateを抽出 */
    resInfo.user_state = await executeQuery('SELECT * FROM `users` WHERE user_id = ?', [
      req.body.upbutton,
    ]);
    // console.log(resInfo.user_state[0]['user_state']);
    if (resInfo.user_state[0].user_state === 0) {
      resInfo.user_state[0].user_state = 2;
    } else {
      resInfo.user_state[0].user_state = 0;
    }

    /** user */
    await tran
      .query(
        `UPDATE users
      SET user_state = ?
      WHERE user_id = ?`,
        [resInfo.user_state[0].user_state, req.body.upbutton],
      )
      .catch((err) => {
        throw new Error(err);
      });
    await tran.commit();

    resInfo.sql = await executeQuery('SELECT * FROM `users` ORDER BY `user_id` ASC');
    res.render('admin/userManagement.ejs', { ejsRender: resInfo });
  } catch (err) {
    await tran.rollback();
    next(err);
  }
});

/**
 * ユーザーごとの購入データ表示 グラフ化 chart.js
 */
// router.get('/userId/:userId', async (req, res, next) => {
//   /** resに渡す情報とSQLモジュールの読み込み */
//   const resInfo = httpRapper(req);

//   try {
//     if (req.query === 'search') {
//       /** 絞り込み */
//       resInfo.sql = await executeQuery(
//         'SELECT * FROM `biddings` WHERE `product_id` = ? ORDER BY `bidding_time` ASC LIMIT 5',
//         ['1'],
//       );
//     }
//     /** ここに処理を記述 */
//     resInfo.sql = await executeQuery(
//       'SELECT * FROM `biddings` WHERE `product_id` = ? ORDER BY `bidding_time` ASC LIMIT 5',
//       ['1'],
//     );
//     debug(resInfo.sql);
//     res.render('admin/userManagement.ejs', { ejsRender: resInfo });
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;

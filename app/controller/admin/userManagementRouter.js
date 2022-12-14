const express = require('express');

const router = express.Router();
/**
 * 会員管理 router + controller
 */
/** 必要module読み込み */
/** resに渡す情報とSQLモジュールの読み込み */
const debug = require('debug')('http:usermanage');
const debugMySQL = require('debug')('MySQL:user');
const { executeQuery, beginTran } = require('../../module/mysqlPool');
const { httpRapper } = require('../../common/httpRapper');
const { paginate } = require('../../common/paginate');

/** 会員+-管理 一覧表示 */
/** 詳細 slider modalで表示 */
router.get('/:page', async (req, res, next) => {
  /** resに渡す情報とSQLモジュールの読み込み */
  const resInfo = httpRapper(req);
  const limit = 5;
  let data;
  let offset;
  resInfo.maxpage = 0;
  try {
    debugMySQL(resInfo);
    /** リンクがクリックされた時の処理 */
    data = await executeQuery('SELECT count(*) as count FROM `users` ORDER BY `user_id`');
    resInfo.maxpage = Math.ceil(data[0].count / limit);
    resInfo.now = Math.max(req.params.page, 1); /** resInfo.nowが１未満になるのを防ぐ */
    resInfo.now = Math.min(
      resInfo.maxpage,
      resInfo.now,
    ); /** resInfo.nowが($maxpage+1)以上になるのを防ぐ */
    offset = paginate(limit, resInfo.now);

    /** ここに処理を記述 */
    resInfo.sql = await executeQuery(
      'SELECT * FROM `users` ORDER BY `user_id` ASC LIMIT ? OFFSET ?;',
      [limit, offset],
    ).catch((err) => {
      throw new Error(err);
    });
    res.render('admin/userManagement.ejs', { ejsRender: resInfo });
  } catch (err) {
    next(err);
  }
});

/** 出品登録画面での垢バン 論理削除処理 (form) */
router.post('/', async (req, res, next) => {
  debug(req.body);
  const tran = await beginTran();
  const resInfo = httpRapper(req);
  try {
    /** 変更をかけたいuserのuser_stateを抽出 */
    resInfo.user_state = await executeQuery('SELECT * FROM `users` WHERE user_id = ?', [
      req.body.upbutton,
    ]);
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
    // res.redirect('admin/userManagement.ejs', { ejsRender: resInfo });
  } catch (err) {
    await tran.rollback();
    next(err);
  }
  res.redirect(301, `/admin/users/${req.body.now}`);
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

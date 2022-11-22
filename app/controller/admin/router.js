/**
 * 管理者 router + controller
 *
 */
const express = require('express');

const router = express.Router();

/** adminLogin */
router.get('/:no', (req, res, next) => {
  /** resに渡す情報とSQLモジュールの読み込み */
  const { reqInfoReturn } = require('../../conf/resInfo');
  const resInfo = reqInfoReturn(req);
  try {
    // 8888だとログイン
    if (req.params === 8888) {
      res.send('ログイン');
    }
    res.render('ユーザー');
  } catch (err) {
    next(err);
  }
});

/** 管理画面一覧表示 */
router.get('/top', (req, res, next) => {
  /** resに渡す情報とSQLモジュールの読み込み */
  const { reqInfoReturn } = require('../../conf/resInfo');
  const resInfo = reqInfoReturn(req);
  try {
    /** 各画面へのリンク */
    res.render('bidding.ejs', { ejsRender: resInfo });
    /** 追加機能で直近の更新ログ */
  } catch (err) {
    next(err);
  }
});

/** 管理者アカウントは一つがあってそれを使用、変更、削除などはしない */

module.exports = router;

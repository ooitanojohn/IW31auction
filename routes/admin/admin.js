const express = require('express');

const router = express.Router();
const debug = require('debug')('http:admin');

const { httpRapper } = require('../../app/common/httpRapper');

/** adminLogin */
router.get('/', (req, res) => {
  const resInfo = httpRapper(req);
  debug(resInfo);
  res.render('admin/adminLogin.ejs');
});
/** ログイン処理 */
router.post('/', (req, res) => {
  res.redirect(301, 'admin/top');
});
/** 管理画面一覧表示 */
router.get('/top', (req, res) => {
  /** resに渡す情報とSQLモジュールの読み込み */
  const resInfo = httpRapper(req);
  /** 各画面へのリンク */
  res.render('admin/adminTop', { ejsRender: resInfo });
  /** 追加機能で直近の更新ログ */
});

/** 管理者アカウントは一つがあってそれを使用、変更、削除などはしない */

module.exports = router;

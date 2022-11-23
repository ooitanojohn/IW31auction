const express = require('express');

const router = express.Router();
/** controller */
// const { biddingShow } = require("./biddingController");
// router.get("/:productId", (req, res) => biddingShow(req, res));
/**
 * index router + controller
 */
/** 必要module読み込み */
/** resに渡す情報とSQLモジュールの読み込み */
// const { executeQuery } = require('../module/mysqlPool');
// const { httpRapper } = require("../common/httpRapper");
// const csrf = require('../../config/middleware/csrf');
//  csrf
// router.use(csrf);

router.get('/', (req, res) => {
  res.render('login', { loginCheckMsg: '' });
});

router.post('/', (req, res) => {
  // User api
  // ログイン成功
  if (req.body.id === 'admin' && req.body.password === 'admin') {
    // とりあえずログインフラグ
    req.session.loginFlg = true;
    return res.redirect(301, 'mypage');
  }
  // 失敗
  return res.render('login', {
    csrfField: `<input type="hidden" name="csrfToken" value="${req.body.csrfToken}">`,
    loginCheckMsg: 'ログインID、又はパスワードが違います。',
  });
});

module.exports = router;

module.exports = router;

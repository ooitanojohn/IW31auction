const express = require('express');

const router = express.Router();

const { httpRapper } = require('../../app/common/httpRapper');

/** ログイン判定 urlを変数にしてrender */
router.get('/', (req, res, next) => {
  const resInfo = httpRapper(req);
  if (!req.user) {
    return res.render('home', { ejsRender: resInfo });
  }
  return next();
});

module.exports = router;

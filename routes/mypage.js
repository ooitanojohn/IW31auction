const express = require('express');

const router = express.Router();

const { executeQuery } = require('../app/module/mysqlPool');
const { httpRapper } = require('../app/common/httpRapper');

/** 落札一覧、入札履歴、退会処理  */
router.get('/', async (req, res, next) => {
  const resInfo = httpRapper(req);
  try {
    resInfo.sql = await executeQuery(
      'SELECT * FROM `biddings` WHERE `product_id` = ? ORDER BY `bidding_time` ASC LIMIT 5',
      [req.params.productId],
    );
    res.render('mypage.ejs', { ejsRender: resInfo });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

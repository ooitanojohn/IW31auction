const express = require('express');

const router = express.Router();
const debug = require('debug')('http:mypage');
const { executeQuery } = require('../app/module/mysqlPool');
const { httpRapper } = require('../app/common/httpRapper');

/** 落札一覧、入札履歴、退会処理  */
router.get('/', async (req, res, next) => {
  const resInfo = httpRapper(req);
  debug(req.user);
  try {
    /** 入札一覧 */
    resInfo.sql = await executeQuery(
      'SELECT biddings.product_id,MAX(bidding_time),MAX(bidding_money),products.car_id,products.car_img,products.end_time,cars.car_name FROM biddings,products,cars WHERE biddings.user_id = 1 AND products.product_id = biddings.product_id AND cars.car_id = products.car_id GROUP BY biddings.product_id;',
      [1],
      /** req.user.user_id */
    );
    /** 最大入札額と最終入札時間 */
    resInfo.sql2 = await executeQuery(
      'SELECT product_id, MAX(bidding_money), MAX(bidding_time) FROM biddings GROUP BY product_id;',
    );
    debug(resInfo.sql2);
    res.render('mypage.ejs', { ejsRender: resInfo });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

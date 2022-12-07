const express = require('express');

// const debug = require('debug')('http:bidding');

const router = express.Router();
// const { DateTime } = require('luxon');
const { executeQuery } = require('../app/module/mysqlPool');
const { httpRapper } = require('../app/common/httpRapper');

/** 入札ページ */
router.get('/:productId', async (req, res, next) => {
  const resInfo = httpRapper(req);
  try {
    /** 入札情報過去5件数 */
    resInfo.sql = await executeQuery(
      'SELECT b.user_id, b.product_id, b.bidding_money, b.bidding_time, p.car_img,p.end_time, c.car_name FROM biddings as b, products as p, cars as c WHERE b.product_id = ? AND p.product_id = ? AND p.car_id = c.car_id ORDER BY b.bidding_time ASC LIMIT 5; ',
      [req.params.productId, req.params.productId],
    ).catch((err) => {
      throw new Error(err);
    });
    /** 最高額入札情報  */
    const max = await executeQuery(
      'SELECT user_id, MAX(bidding_money), MAX(bidding_time) FROM biddings WHERE product_id = ? ORDER BY bidding_time ASC LIMIT 5;',
      [req.params.productId],
    ).catch((err) => {
      throw new Error(err);
    });
    /** 日付処理周り */
    // const start = DateTime.now();
    // debug(max[0]['MAX(bidding_time)']);
    // const end = DateTime.fromISO(max[0]['MAX(bidding_time)']);
    // debug(end);
    // const diff = end.diff(start, 'hours');
    // debug(diff);
    resInfo.max = max;
    /** 日付のフォーマット  */
    res.render('bidding.ejs', { ejsRender: resInfo });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

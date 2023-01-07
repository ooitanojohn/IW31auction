const debug = require('debug')('http:bidding');

const { DateTime } = require('luxon');

const { executeQuery } = require('../module/mysqlPool');
const { httpRapper } = require('../common/httpRapper');

const biddingSelect = async (req, res, next) => {
  const resInfo = httpRapper(req);
  try {
    /** 入札情報 */
    resInfo.sql = await executeQuery(
      'SELECT b.user_id, b.product_id, b.bidding_money, b.bidding_time, p.car_img,p.end_time, c.car_name FROM biddings as b, products as p, cars as c WHERE b.product_id = ? AND p.product_id = ? AND p.car_id = c.car_id ORDER BY b.bidding_time ASC;',
      [req.params.productId, req.params.productId],
    ).catch((err) => {
      throw new Error(err);
    });
    /** 商品情報 */
    resInfo.sql2 = await executeQuery(
      'SELECT p.car_img,p.end_time, c.car_name FROM products as p, cars as c WHERE p.product_id = ? AND p.car_id = c.car_id ;',
      [req.params.productId, req.params.productId],
    ).catch((err) => {
      throw new Error(err);
    });
    /** 日付フォーマット処理 */
    for (let i = 1; i < resInfo.sql.length; i += 1) {
      const time = new Date(resInfo.sql[i].bidding_time).toISOString();
      resInfo.sql[i].bidding_time = DateTime.fromISO(`${time}`).toFormat('yyyy-LL-dd HH:mm:ss');
    }

    /** 最高額入札情報  */
    if (resInfo.sql.length !== 0) {
      resInfo.max = resInfo.sql[resInfo.sql.length - 1];
    } else {
      resInfo.max = {
        bidding_money: 0,
        user_id: req.params.user_id,
      };
    }
    /** 日付の差分 */
    if (resInfo.sql.length !== 0) {
      const start = DateTime.now();
      const end = DateTime.fromISO(new Date(`${resInfo.max.bidding_time}`).toISOString());
      const diff = start.diff(end, ['days', 'hours', 'minutes', 'seconds']);
      debug(diff.values);
      diff.values.seconds = Math.floor(diff.values.seconds);
      resInfo.max.diff = diff.values;
    } else {
      resInfo.max.diff = {
        days: 0,
        hours: 0,
        minutes: 18,
        seconds: 35,
      };
    }
    /** user情報一覧 */
    resInfo.sql4 = await executeQuery('SELECT * FROM users WHERE user_id = ?;', [
      req.user.user_id,
    ]).catch((err) => {
      throw new Error(err);
    });
  } catch (err) {
    // debug(err);
    next(err);
  }
  res.render('bidding.ejs', { ejsRender: resInfo });
};

module.exports = { biddingSelect };

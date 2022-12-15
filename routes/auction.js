const express = require('express');

const router = express.Router();

const { httpRapper } = require('../app/common/httpRapper');
const { executeQuery } = require('../config/module/mysqlPool');

/* オークション一覧表示 */
router.get('/', async (req, res, next) => {
  const resInfo = httpRapper(req);
  try {
    resInfo.sql = await executeQuery(
      'SELECT products.product_id, cars.car_name, makers.maker_name, products.start_price,product.start_time products.end_time FROM products INNER JOIN cars ON products.car_id = cars.car_id INNER JOIN makers ON cars.maker_id = makers.maker_id WHERE products.start_time <= NOW() AND NOW() <= products.end_time;',
    ).catch((err) => {
      throw new Error(err);
    });
    res.render('auction.ejs', { ejsRender: resInfo });
  } catch (err) {
    next(err);
  }
});

/** オークション  */
router.post('/', (req, res) => {
  const resInfo = httpRapper(req);
  res.render('', { ejsRender: resInfo });
});

module.exports = router;

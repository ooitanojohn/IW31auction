const express = require('express');
const { nextTick } = require('process');

const router = express.Router();

const { httpRapper } = require('../app/common/httpRapper');
const { executeQuery } = require('../config/module/mysqlPool');

/* オークション一覧表示 */
router.get('/', async(req, res) => {
  const resInfo = httpRapper(req);
  try{
    resInfo.sql = await executeQuery(
      "SELECT products.product_id, cars.carname, products.start_price, products.end_time FROM products INNER JOIN cars ON products.car_id = cars.car_id WHERE products.start_date <= NOW() AND NOW() <= products.end_date;",);
    res.render('auction.ejs', { ejsRender: resInfo });
  }catch(err){
    nextTick(err);
  }
});

module.exports = router;

const express = require('express');

const router = express.Router();
const { executeQuery } = require('../app/module/mysqlPool');
const { httpRapper } = require('../app/common/httpRapper');

router.get('/', async (req, res, next) => {
  const resInfo = httpRapper(req);

  try {
    /** ここに処理を記述 */
    resInfo.sql = await executeQuery(
      'SELECT * FROM `biddings` WHERE `product_id` = ? ORDER BY `bidding_time` ASC LIMIT 5',
      [req.params.productId],
    );

    res.render('bidding.ejs', { ejsRender: resInfo });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

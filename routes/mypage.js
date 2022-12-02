const express = require('express');

const router = express.Router();

/** 必要module読み込み */
/** resに渡す情報とSQLモジュールの読み込み */
const { executeQuery } = require('../app/module/mysqlPool');
const { httpRapper } = require('../app/common/httpRapper');
/** 配列操作 モジュール */
const { array2ndFindKeyMapVal, array2ndFindValMapArr } = require('../app/common/arrayMap');

/** 入札ページ。ページ遷移時に入札情報を取ってくる */
router.get('/bidding/:productId', async (req, res, next) => {
  const resInfo = httpRapper(req);

  try {
    /** ここに処理を記述 */
    resInfo.sql = await executeQuery(
      'SELECT * FROM `biddings` WHERE `product_id` = ? ORDER BY `bidding_time` ASC LIMIT 5',
      [req.params.productId],
    );

    /** resInfoに最大入札額を追加 */
    const maxBiddingMoney = Math.max(...array2ndFindKeyMapVal(resInfo.sql, 'bidding_money'));
    /** 最大入札額から入札者と時間を取ってくる */
    resInfo.max = array2ndFindValMapArr(resInfo.sql, 'bidding_money', maxBiddingMoney);
    res.render('bidding.ejs', { ejsRender: resInfo });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

/* eslint-disable global-require */
const express = require('express');

const router = express.Router();
/** controller */
// const { biddingShow } = require("./biddingController");
// router.get("/:productId", (req, res) => biddingShow(req, res));
/**
 * 入札 route controller
 */
/** 必要module読み込み */
const { executeQuery, beginTran } = require('../../module/mysqlPool');

/** ページ遷移時に入札情報を取ってくる */
router.get('/:productId', async (req, res, next) => {
  /** resに渡す情報とSQLモジュールの読み込み */
  const { reqInfoReturn } = require('../../conf/req');
  const resInfo = reqInfoReturn(req);
  /** 配列操作 モジュール */
  const { array2ndFindKeyMapVal, array2ndFindValMapArr } = require('../../common/arrayMap');

  try {
    /** ここに処理を記述 */
    resInfo.sql = await executeQuery(
      'SELECT * FROM `biddings_tbl` WHERE `product_id` = ? ORDER BY `bidding_time` ASC LIMIT 5',
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

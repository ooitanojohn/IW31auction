const express = require('express');

const router = express.Router();

const {
  selectMypage,
  updateAccount,
  updateAddress,
  updateCard,
  updateDrop,
} = require('../app/controller/mypageController');

/** 落札一覧、入札履歴、退会処理  */
router.get('/', async (req, res, next) => {
  const resInfo = httpRapper(req);
  // debug(req.user);
  try {
    /** 入札一覧 */
    resInfo.sql = await executeQuery(
      'SELECT biddings.product_id,MAX(bidding_time),MAX(bidding_money),products.car_id,products.car_img,products.end_time,cars.car_name FROM biddings,products,cars WHERE biddings.user_id = ? AND products.product_id = biddings.product_id AND cars.car_id = products.car_id GROUP BY biddings.product_id;',
      [1],
      /** req.user.user_idに変更 */
    );
    /** 最大入札額と最終入札時間 */
    resInfo.sql2 = await executeQuery(
      'SELECT product_id, MAX(bidding_money), MAX(bidding_time) FROM biddings GROUP BY product_id;',
    );
    /** 落札一覧  */
    resInfo.sql3 = await executeQuery(
      'SELECT p.product_id, p.product_state, MAX(bidding_money), p.car_id, p.car_img, cars.car_name FROM products as p, biddings, cars WHERE p.product_state IN(2, 3) AND p.user_id = ? AND p.product_id = biddings.product_id AND cars.car_id = p.car_id GROUP BY p.product_id;',
      [3],
      /** req.user.user_idに変更 */
    );
    resInfo.sql4 = await executeQuery('SELECT * FROM users WHERE user_id = ?;', [req.user.user_id]);
    res.render('mypage.ejs', { ejsRender: resInfo });
  } catch (err) {
    next(err);
  }
});

/** アカウント変更 */
router.post('/acount', async (req, res, next) => {
  await updateAccount(req, res, next);
});
/** カード情報変更 */
router.post('/card', async (req, res, next) => {
  await updateCard(req, res, next);
});
/** 住所変更 */
router.post('/address', async (req, res, next) => {
  await updateAddress(req, res, next);
});
/** 退会登録  */
router.post('/drop', async (req, res, next) => {
  await updateDrop(req, res, next);
});
module.exports = router;

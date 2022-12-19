/* eslint-disable camelcase */
const debug = require('debug')('http:mypage');
// const bcrypt = require('bcrypt');
const { executeQuery, beginTran } = require('../module/mysqlPool');
const { httpRapper } = require('../common/httpRapper');
// const { uploadUser } = require("../module/uploader");
/**
 * 入札履歴、落札一覧
 */
const selectMypage = async (req, res, next) => {
  const resInfo = httpRapper(req);
  // debug(req.body);
  try {
    /** 入札一覧 */
    resInfo.sql = await executeQuery(
      'SELECT biddings.product_id,MAX(bidding_time),MAX(bidding_money),products.car_id,products.car_img,products.end_time,cars.car_name FROM biddings,products,cars WHERE biddings.user_id = ? AND products.product_id = biddings.product_id AND cars.car_id = products.car_id GROUP BY biddings.product_id;',
      [req.user.user_id],
    ).catch((err) => {
      throw new Error(err);
    });
    /** 最大入札額と最終入札時間 */
    resInfo.sql2 = await executeQuery(
      'SELECT product_id, MAX(bidding_money), MAX(bidding_time) FROM biddings GROUP BY product_id;',
    ).catch((err) => {
      throw new Error(err);
    });
    /** 落札一覧  */
    resInfo.sql3 = await executeQuery(
      'SELECT p.product_id, p.product_state, MAX(bidding_money), p.car_id, p.car_img, cars.car_name FROM products as p, biddings, cars WHERE p.product_state IN(2, 3) AND p.user_id = ? AND p.product_id = biddings.product_id AND cars.car_id = p.car_id GROUP BY p.product_id;',
      [req.user.user_id],
    ).catch((err) => {
      throw new Error(err);
    });
    /** user更新の為の情報一覧 */
    resInfo.sql4 = await executeQuery('SELECT * FROM users WHERE user_id = ?;', [
      req.user.user_id,
    ]).catch((err) => {
      throw new Error(err);
    });
    // debug(resInfo.sql);
    res.render('mypage.ejs', { ejsRender: resInfo });
  } catch (err) {
    next(err);
  }
};

/**
 * 画像,パスワード登録処理
 */
// const saltRounds = 10;

// const updateAccount = async (req, res, next) => {
//   await uploadUser(req, res, next)
//     // eslint-disable-next-line no-shadow
//     .then((req) => {
//       debug(req.body);
//       debug(req.file);
//       bcrypt.hash(req.body.password, saltRounds, async (er, hashedPassword) => {
//         const tran = await beginTran();
//         try {
//           await tran
//             .query(`UPDATE users SET hashed_password = ? WHERE user_id = ?;`, [
//               hashedPassword,
//               req.user.user_id,
//             ])
//             .catch((error) => {
//               throw new Error(error);
//             });
//           await tran.commit();
//         } catch (errN) {
//           await tran.rollback();
//           debug(errN);
//           next(errN);
//         }
//       });
//     })
//     .catch((err) => {
//       debug(err);
//     });

//   res.redirect(301, '/mypage');
// };

/**
 * card 更新処理
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const updateCard = async (req, res, next) => {
  const tran = await beginTran();
  try {
    await tran
      .query(`UPDATE users SET card_number = ?, card_key = ?  WHERE user_id = ?;`, [
        req.body.card_number,
        req.body.card_key,
        req.user.user_id,
      ])
      .catch((error) => {
        throw new Error(error);
      });
    await tran.commit();

    res.redirect(301, '/mypage');
  } catch (err) {
    await tran.rollback();
    next(err);
  }
};

/**
 * 住所 更新処理
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const updateAddress = async (req, res, next) => {
  debug(req.body);
  const tran = await beginTran();
  try {
    await tran
      .query(
        `UPDATE users SET
      user_name = ?,
      user_mail = ?,
      user_post_code = ?,
      user_address = ?,
      user_phone_number = ? WHERE user_id = ?;`,
        [
          req.body.user_name,
          req.body.user_mail,
          req.body.user_post_code,
          req.body.user_address,
          req.body.user_phone_number,
          req.user.user_id,
        ],
      )
      .catch((error) => {
        throw new Error(error);
      });
    await tran.commit();
    res.redirect(301, '/mypage');
  } catch (err) {
    await tran.rollback();
    next(err);
  }
};

/**
 * 退会 更新処理
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const updateDrop = async (req, res, next) => {
  const tran = await beginTran();
  try {
    debug(tran);
    await tran
      .query(`UPDATE users SET user_state = 1 WHERE user_id = ?;`, [req.user.user_id])
      .catch((error) => {
        throw new Error(error);
      });
    await tran.commit();

    res.redirect(301, '/mypage');
  } catch (err) {
    await tran.rollback();
    next(err);
  }
};
module.exports = {
  selectMypage,
  // updateAccount
  updateCard,
  updateAddress,
  updateDrop,
};

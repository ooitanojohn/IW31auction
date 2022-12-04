/**
 * 画像,パスワード登録処理
 */
const debug = require('debug')('http:mypage');
const bcrypt = require('bcrypt');
const { beginTran } = require('../module/mysqlPool');

const saltRounds = 10;

const updateAccount = async (req, res, next) => {
  const tran = await beginTran();
  try {
    // eslint-disable-next-line consistent-return
    await bcrypt.hash(req.body.password, saltRounds, async (err, hashedPassword) => {
      debug(tran);
      if (err) throw new Error(err);
      await tran
        .query(`UPDATE users SET hashed_password = ? WHERE user_id = ?;`, [
          hashedPassword,
          req.user.user_id,
        ])
        .catch((error) => {
          throw new Error(error);
        });
    });
    await tran.commit();

    res.redirect(301, '/mypage');
  } catch (err) {
    await tran.rollback();
    next(err);
  }
};

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
module.exports = { updateAccount, updateCard, updateAddress, updateDrop };

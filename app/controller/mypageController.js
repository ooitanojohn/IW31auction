/**
 * パスワード登録処理
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

module.exports = { updateAccount };

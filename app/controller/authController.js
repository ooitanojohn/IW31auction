/**
 * 登録処理
 */
const debug = require('debug')('http:mypage');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const { beginTran } = require('../module/mysqlPool');

/** userData登録 */
const signup = async (req, res, next) => {
  debug(req.body);
  const tran = await beginTran();
  /** 新規登録ID初期化 */
  try {
    /** パスワードのハッシュ化と登録 */
    await bcrypt.hash(req.body.password, saltRounds, async (err, hashedPassword) => {
      if (err) throw new Error(err);
      let id = 0;
      await tran
        .query(
          `INSERT INTO users (
          user_login_id,
          hashed_password,
          user_state
          ) VALUES(?, ?, 0)`,
          [req.body.user_login_id, hashedPassword],
        )
        .then((results) => {
          id = results.insertId;
        })
        .catch((error) => {
          throw new Error(error);
        });
      await tran.commit();
      /** 成功したらsessionにid付与してログイン */
      const user = {
        user_id: id,
        user_login_id: req.body.user_login_id,
      };
      // eslint-disable-next-line no-shadow
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect('/');
      });
    });

    // eslint-disable-next-line no-shadow
  } catch (err) {
    await tran.rollback();
    next(err);
  }
};

module.exports = { signup };

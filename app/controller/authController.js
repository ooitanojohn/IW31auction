/**
 * 登録処理
 */
const bcrypt = require('bcrypt');

const saltRounds = 10;
const { beginTran } = require('../module/mysqlPool');

/** userData登録 */
const signup = async (req, res, next) => {
  /** パスワードのハッシュ化と登録 */
  let hashedPassword = '';
  // eslint-disable-next-line consistent-return
  await bcrypt.hash(req.body.password, saltRounds, (err, password) => {
    hashedPassword = password;
    if (err) return next(err);
  });

  const tran = await beginTran();
  /** 新規登録ID初期化 */
  try {
    let id = 0;
    await tran
      .query(
        `INSERT INTO users (
          user_login_id,
          hashed_password,
          user_name,
          user_mail,
          user_post_code,
          user_address,
          user_phone_number,
          card_number,
          card_key,
          icon_img,
          user_state
          ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [req.body.user_login_id, hashedPassword, '', '', '', '', '', '', '', '', 0],
      )
      .then((results) => {
        id = results.insertId;
      })
      .catch((err) => {
        throw new Error(err);
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
    // eslint-disable-next-line no-shadow
  } catch (err) {
    await tran.rollback();
    next(err);
  }
};

module.exports = { signup };

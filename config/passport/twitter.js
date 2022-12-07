const debug = require('debug')('http:twitter');
const { beginTran } = require('../../app/module/mysqlPool');

/**
 *  twitter 認証
 * @param {string} token accessToken
 * @param {string} tokenSecret accessTokenSecret
 * @param {object} profile twitterInfo
 * @param {func} cb func
 * @returns {func} cb
 */
const twitterAuth = async (token, tokenSecret, profile, cb) => {
  /**
   * token, tokenSecret tokenとtokenSecretの違いが分からん秘密、公開鍵的な？
   * どっちもばれたらアウトみたいだけど
   * 必要なの provider,subject = tokenにする
   * あとuser名 + img画像もここで取ってくるか
   */
  /** 初ログイン */
  const tran = await beginTran();
  try {
    /** 既にgoogleログインしているか credentialに引っかかるか否か */
    const row = await tran
      .query('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
        profile.provider,
        token,
      ])
      .catch((err) => cb(err));

    /** 初回登録 */
    let id = 0;
    if (row.length === 0) {
      /** userTableにlogin_idを追加 */
      await tran
        .query('INSERT INTO users (user_login_id,icon_img) VALUES (?,?)', [
          profile.username,
          profile.photos[0].value,
        ]) /** 追加した最後のIDを取ってくる (userID) */
        .then((results) => {
          id = results.insertId;
        })
        .catch((err) => {
          throw new Error(err);
        });
      /** クレデンシャル tableに登録 */
      await tran
        .query('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
          id,
          profile.provider,
          token,
        ])
        .catch((err) => {
          throw new Error(err);
        });
      await tran.commit();
      const user = {
        user_id: id,
        user_login_id: profile.username,
      };
      debug(user);
      return cb(null, user);
    }
    /** 既ログイン */
    const row2 = await tran
      .query('SELECT * FROM users WHERE user_id = ?', [row[0].user_id])
      .catch((err) => cb(err));
    if (row2.length === 0) {
      return cb(null, false);
    }
    return cb(null, row2[0]);
  } catch (err) {
    await tran.rollback();
    return cb(err);
  }
};

module.exports = { twitterAuth };

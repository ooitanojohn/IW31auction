const express = require('express');

const router = express.Router();
const debug = require('debug')('http:mypage');
const bcrypt = require('bcrypt');

const {
  selectMypage,
  // updateAccount,
  updateAddress,
  updateCard,
  updateDrop,
} = require('../app/controller/mypageController');

const { uploadUser } = require('../app/module/uploader');

const { beginTran } = require('../app/module/mysqlPool');

/** 落札一覧、入札履歴、退会処理  */
router.get('/', async (req, res, next) => {
  await selectMypage(req, res, next);
});
/** アカウント変更 */
/**
 * 画像,パスワード登録処理
 */
const saltRounds = 10;
router.post('/acount/:userId', async (req, res, next) => {
  // await updateAccount(req, res, next);
  await uploadUser(req, res, next)
    // eslint-disable-next-line no-shadow
    .then((req) => {
      debug(req.body);
      debug(req.file);
      bcrypt.hash(req.body.password, saltRounds, async (er, hashedPassword) => {
        const tran = await beginTran();
        try {
          await tran
            .query(`UPDATE users SET hashed_password = ? WHERE user_id = ?;`, [
              hashedPassword,
              req.user.user_id,
            ])
            .catch((error) => {
              throw new Error(error);
            });
          await tran.commit();
        } catch (errN) {
          await tran.rollback();
          debug(errN);
          next(errN);
        }
      });
    })
    .catch((err) => {
      debug(err);
    });
  res.redirect(301, '/mypage');
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

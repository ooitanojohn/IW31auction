const express = require('express');

const router = express.Router();
const debug = require('debug')('http:mypage');

const {
  selectMypage,
  updateAccount,
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

/** 画像登録 */
router.post('/upload/:userId', async (req, res, next) => {
  await uploadUser(req, res, next)
    // eslint-disable-next-line no-shadow
    .then(async (req) => {
      const tran = await beginTran();
      try {
        await tran
          .query(`UPDATE users SET icon_img = ? WHERE user_id = ?;`, [
            req.file.filename,
            req.user.user_id,
          ])
          .catch((error) => {
            throw new Error(error);
          });
        await tran.commit();
      } catch (err) {
        await tran.rollback();
        debug(err);
        next(err);
      }
    });
  res.redirect(301, '/mypage');
});
/** アカウント変更 */
router.post('/acount/:userId', async (req, res, next) => {
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

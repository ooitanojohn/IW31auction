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
  await selectMypage(req, res, next);
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

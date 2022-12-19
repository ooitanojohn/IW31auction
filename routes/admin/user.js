const express = require('express');

const router = express.Router();

const { userSelect, userDelete } = require('../../app/controller/admin/userManagementController');

/** 会員+-管理 一覧表示 */
router.get('/:page', (req, res, next) => {
  userSelect(req, res, next);
});

/** 出品登録画面での垢バン 論理削除処理 (form) */
router.post('/', (req, res, next) => {
  userDelete(req, res, next);
});

module.exports = router;

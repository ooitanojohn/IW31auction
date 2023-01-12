const express = require('express');

const router = express.Router();
const { productDetail } = require('../app/controller/productController');
/** 落札一覧、入札履歴、退会処理  */
router.get('/:productId', async (req, res, next) => {
  // console.log(req.params);
  await productDetail(req, res, next);
});

module.exports = router;

const express = require('express');

const router = express.Router();
const { httpRapper } = require('../app/common/httpRapper');

/** 落札一覧、入札履歴、退会処理  */
router.get('/:productId', async (req, res) => {
  const resInfo = httpRapper(req);
  res.render('product', { ejsRender: resInfo });
});

/**  */

module.exports = router;

const express = require('express');

const router = express.Router();

const { biddingSelect } = require('../app/controller/biddingController');

/** 入札ページ */
router.get('/:productId', async (req, res, next) => {
  await biddingSelect(req, res, next);
});

module.exports = router;

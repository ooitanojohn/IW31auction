const express = require('express');

const router = express.Router();

const { httpRapper } = require('../app/common/httpRapper');

/* オークション一覧表示 */
router.get('/', (req, res) => {
  const resInfo = httpRapper(req);
  res.render('index', { user: req.user, ejsRender: resInfo });
});

module.exports = router;

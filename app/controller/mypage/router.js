const express = require('express');

const router = express.Router();

const crypto = require('crypto');
// csrf middleware
router.use((req, res, next) => {
  const { method } = req;
  // GEtの場合randomなtokenをhtmlに埋め込む
  if (method === 'GET') {
    const csrfToken = crypto.randomBytes(20).toString('hex');
    req.session.csrfToken = csrfToken;
    res.locals = {
      csrfToken,
      csrfField: `<input type="hidden" name="csrfToken" value="${csrfToken}">`,
    };
  } else if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    if (req.body.csrfToken !== req.session.csrfToken) {
      return res.status(419).send('Page Expired : 不正なページ更新が行われました');
    }
  }
  return next();
});

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('mypage');
});

module.exports = router;

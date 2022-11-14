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

/* GET homePage. */
router.get('/', (req, res) => {
  res.render('regist', { registCheckMsg: '' });
});

router.post('/', (req, res) => {
  // User api
  // ログイン成功
  if (req.body.id === 'admin' && req.body.password === 'admin') {
    return res.redirect(301, 'mypage');
  }
  // 失敗
  return res.render('regist', {
    csrfField: `<input type="hidden" name="csrfToken" value="${req.body.csrfToken}">`,
    registCheckMsg: 'ログインID、又はパスワードが違います。',
  });
});

module.exports = router;

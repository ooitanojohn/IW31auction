const express = require('express');

const router = express.Router();
const csrf = require('../../../config/middleware/csrf');
//  csrf
router.use(csrf);

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

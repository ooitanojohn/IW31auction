const crypto = require('crypto');

/* ejsフォームに埋め込む */
// <% - csrfField %>

const csrf = (req, res, next) => {
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
};

module.exports = csrf;

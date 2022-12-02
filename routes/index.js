const express = require('express');

const router = express.Router();

/* ログイン判定 */
router.get(
  '/',
  (req, res, next) => {
    if (!req.user) {
      return res.render('home');
    }
    return next();
  },
  (req, res) => {
    res.locals.filter = null;
    res.render('index', { user: req.user });
  },
);

module.exports = router;

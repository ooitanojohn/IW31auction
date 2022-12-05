const express = require('express');
const passport = require('passport');
const { signup } = require('../app/controller/authController');

const router = express.Router();

/** ログイン画面表示 */
router.get('/login', (req, res) => {
  res.render('login');
});
/** 認証 */
/** local */
router.post(
  '/login/password',
  passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true,
  }),
);
/** google */
router.get('/login/federated/google', passport.authenticate('google'));
router.get(
  '/oauth2/redirect/google',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);
/** twitter */
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  },
);

/** ログアウト */
router.post('/logout', (req, res, next) => {
  // eslint-disable-next-line consistent-return
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});
/** 登録画面表示 */
router.get('/signup', (req, res) => {
  res.render('signup');
});
/** 登録処理 */
router.post('/signup', (req, res, next) => {
  signup(req, res, next);
});

module.exports = router;

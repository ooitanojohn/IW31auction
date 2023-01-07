/* eslint-disable camelcase */
/**
 * passport認証
 */
const debug = require('debug')('http:passport');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oidc');
const { Strategy } = require('passport-twitter');
const session = require('express-session');
const { loginCheck } = require('./passport/local');
const { googleAuth } = require('./passport/google');
const { twitterAuth } = require('./passport/twitter');

module.exports = (app) => {
  /** シリアライズ sessionにtokenを保存 */
  passport.serializeUser((user, cb) => {
    process.nextTick(() => {
      debug(user);
      cb(null, { user_id: user.user_id, user_login_id: user.user_login_id });
    });
  });
  /** デシリアライズ sessionからtokenを削除 */
  passport.deserializeUser((user, cb) => {
    process.nextTick(() => cb(null, user));
  });
  /**
   * ログインチェック
   */
  /** local */
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'user_login_id',
        passwordField: 'password',
      },
      (user_login_id, password, cb) => {
        loginCheck(user_login_id, password, cb);
      },
    ),
  );
  /** google */
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/oauth2/redirect/google',
        scope: ['profile'],
      },
      (issuer, profile, cb) => {
        googleAuth(issuer, profile, cb);
      },
    ),
  );
  /** twitter */
  passport.use(
    new Strategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: 'http://localhost:3000/auth/twitter/callback',
      },
      (token, tokenSecret, profile, cb) => {
        twitterAuth(token, tokenSecret, profile, cb);
      },
    ),
  );
  /** authorization */
  app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.authenticate('session'));
};

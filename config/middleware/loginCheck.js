const express = require('express');

const router = express.Router();

const { httpRapper } = require('../../app/common/httpRapper');

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
    const resInfo = httpRapper(req);
    res.locals.filter = null;
    res.render('index', { user: req.user, ejsRender: resInfo });
  },
);

// router.use("/",
//   (req, res, next) => {
//     if (!req.user) {
//       return res.render('home');
//     }
//     return next();
//   },
//   (req, res) => {
//     const resInfo = httpRapper(req);
//     res.locals.filter = null;
//     res.render('index', { user: req.user, ejsRender: resInfo });
//   },
// );

module.exports = router;
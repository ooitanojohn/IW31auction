const express = require('express');

const router = express.Router();

const csrf = require('../../../config/middleware/csrf');
//  csrf
router.use(csrf);

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('mypage');
});

module.exports = router;

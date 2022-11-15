const express = require('express');

const router = express.Router();

const csrf = require('../../../config/middleware/csrf');
//  csrf
router.use(csrf);

/* GET home page. */
router.get('/', (req, res) => {
  res.render('auction');
});

module.exports = router;

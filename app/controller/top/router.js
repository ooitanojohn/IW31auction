const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('top', { tel: '074-456-3939' });
});

module.exports = router;

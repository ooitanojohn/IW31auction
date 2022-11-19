const express = require('express');
const mysql = require('mysql2');
const { mysqlConf, mysqlConnectError } = require('../../common/mysql');

const connection = mysql.createConnection(mysqlConf);

const router = express.Router();

const csrf = require('../../../config/middleware/csrf');
//  csrf
router.use(csrf);

connection.connect(mysqlConnectError);

/* GET home page. */
router.get('/', (req, res) => {
  res.render('auction');
});

module.exports = router;

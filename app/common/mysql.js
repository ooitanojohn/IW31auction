require('dotenv').config();
// const debug = require("debug")("temp:server");
// DB接続設定
const { consoleLog } = require('./consoleLog');

const mysqlConf = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: '',
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
};
const mysqlConnectError = (err) => {
  if (err) {
    consoleLog(`MySQL: err connect${err.stack}`);
    return;
  }
  consoleLog('MYSQL connected');
};
exports.mysqlConf = mysqlConf;
exports.mysqlConnectError = mysqlConnectError;

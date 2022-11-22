const connect = require('debug')('MySQL:connect');
const connectErr = require('debug')('MySQL:connectErr');
const transactionErr = require('debug')('MySQL:transactionErr');
const transaction = require('debug')('MySQL:transaction');

/** 接続失敗したらerrをthrowする */
const mysqlConnectErr = (err) => {
  connectErr(err);
  if (err) throw err;
  connect('MySQL connected');
};
/** クエリが失敗したらerrをthrow */
const mysqlTransaction = (err, results) => {
  transactionErr(err);
  if (err) throw err;
  transaction(results);
};
/**
 * pool
 */
/** 接続失敗したらerrをthrowする */

/** クエリが失敗したらerrをthrow */
const mysqlPoolTransaction = (err, results, connection) => {
  if (err) {
    connection.release(); // コネクションを開放
    transactionErr(err);
    throw err;
  }
  transaction(results);
  connection.release();
  // return results;
};

exports.mysqlTransaction = mysqlTransaction;
exports.mysqlConnectErr = mysqlConnectErr;
exports.mysqlPoolTransaction = mysqlPoolTransaction;

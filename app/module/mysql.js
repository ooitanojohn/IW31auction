/**
 * MySQL poolを使わない参照処理
 */
/** promise(reject,resolveを返す) */

const { promisify } = require('util');
const mysql = require('mysql2');
/** 接続設定 */
const { mysqlConf } = require('../../config/conf/mysql');

const connection = mysql.createConnection(mysqlConf);
const conPromise = {
  connect: promisify(connection.connect).bind(connection),
  execute: promisify(connection.execute).bind(connection),
  end: promisify(connection.end).bind(connection),
};
module.exports = { conPromise };

/** client */
/** MySQL  */
// app.get("/", async (req, res, next) => {
// /** ファイルの階層を合わせてrequireする */
//   const { conPromise } = require("./module/mysqlPromise");
//   try {
//     // ここに処理を書いていく
//     await conPromise.connect();
//     const data = await conPromise.execute('SELECT * FROM `user_tbl` WHERE `user_id` = ? AND `card_key` = ?',
//       ['1', 556]);
//     console.log(data);
//     res.end("ejs render");
//   } catch (err) {
//     // 失敗したとき
//     next(err);
//   } finally {
//     // middleware
//     // await conPromise.end();
//   }
// });

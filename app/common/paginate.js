/**
 * req.paramsから何番目から要素を取ってくるかを返す関数
 * @param {int} limit 表示したい要素数
 * @returns {int} offset 何番目から要素を取ってくるかの数値
 */
const paginate = (limit, reqParams) => {
  let offset = 0;
  if (reqParams > 1) {
    offset = (Number(reqParams) - 1) * limit;
  }
  return offset;
};

module.exports = { paginate };

/** 使用例 */
// const { paginate } = require("../../common/paginate");

// resInfo.sql = await executeQuery(
//   'SELECT * FROM `users` LIMIT ? OFFSET ?;',
//   [limit, offset],
// );

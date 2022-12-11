/**
 * req.paramsから何番目から要素を取ってくるかを返す関数
 * @param {int} limit 表示したい要素数
 * @returns {int} offset 何番目から要素を取ってくるかの数値
 */
const paginate = (limit, page) => {
  let offset = 0;
  if (page > 1) {
    offset = (Number(page) - 1) * limit;
  }
  return offset;
};

/**
 * DBのカラム数からMAXページ数を取得
 * @param {int} count データベースから取ってきたカラム数
 * @param {int} limit 上限値
 */
const paginateCount = (count, limit) => {
  if (count % limit === 0) {
    return Math.trunc(count / limit);
  } else {
    return Math.trunc(count / limit) + 1;
  }
};

module.exports = { paginate, paginateCount };

/** 使用例 */
// const { paginate } = require("../../common/paginate");

// resInfo.sql = await executeQuery(
//   'SELECT * FROM `users` LIMIT ? OFFSET ?;',
//   [limit, offset],
// );

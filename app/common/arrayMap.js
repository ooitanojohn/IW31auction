/** 配列操作系 関数 */

/**
 * 2次元配列内にある指定したobjKeyからobjValueを返す関数
 * @param {array} array 2次元配列であること
 * @param {string} objKey objのkey値
 * @returns {array} result objのvalue値の一次元配列
 */
const array2ndFindKeyMapVal = (array, objKey) => {
  const result = [];
  for (let i = 0; i < array.length; i += 1) {
    result[result.length] = array[i][objKey];
  }
  return result;
};

/**
 *  2次元配列内にある指定したobjKeyのobjValがmatchと一致したobjを返す関数
 * @param {array} array 2次元配列であること
 * @param {*} objKey objのvalue値
 * @param {*} match 配列objから探したい値
 * @returns {object} result 検索した要素のobject
 */
const array2ndFindValMapArr = (array, objKey, match) => {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][objKey] === match) return array[i];
  }
  return {};
};

module.exports = {
  array2ndFindKeyMapVal,
  array2ndFindValMapArr,
};

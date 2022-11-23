const sharp = require('sharp');
// 出力画像サイズの指定
const width = 300;
const height = 300;
// @param inputImg 元となる画像データ名
// @param outputImg 出力したい画像データ名
function imgResize(inputImg, outputImg) {
  sharp(inputImg)
    .resize(width, height, {
      // 小さいほうに合わせてアスペクト比率を維持したまま変更
      fit: 'inside',
    })
    .toFile(outputImg, (err) => {
      if (err) {
        throw err;
      }
    });
}
exports.imgResize = imgResize;

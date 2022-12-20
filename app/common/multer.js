/**
 * multer設定
 */
const debug = require('debug')('http:multer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

/**
 * ファイルアップロードディレクトリ
 * dist or storage 保存場所
 * fileFilter ファイル受け入れ制御
 * limits ファイル大きさ制限
 * preservePath 元ファイル名保存
 */
/** バイナリデータで保存 */
// const upload = multer({ dest: 'uploads/' });

/**
 * 保存するフォルダ、パス名を相対で指定する
 * @param {*} folderName 保存したいフォルダ名を入力
 * @param {*} fileName 保存したいファイル名を入力
 * @returns multerEngine
 */
const storage = (folderName) => {
  return multer.diskStorage({
    /** どのフォルダにどんな名前で保存するか */
    destination: (req, file, cb) => {
      debug(req.params);
      let paramId;
      if (req.params.userId !== 'undefined') {
        paramId = req.params.userId;
      }
      if (req.params.productId !== 'undefined') {
        paramId = req.params.productId;
      }
      const dir = path.join(__dirname, `../../uploads/${folderName}/${paramId}/`);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
    // filename: (req, file, cb) => {
    //   cb(null, fileName + '.' + file.mimetype.split('/')[1])
    // }
  });
};

/**
 * multerのファイルアップロードエラーハンドラ関数
 * mime-typeが画像の拡張子のみ許可する
 * 他にも実行ファイルを防ぐ、ファイルのチェック方法はあるみたい。
 * mime-typeは偽装可能
 * @param {*} req
 * @param {*} file
 * @param {*} cb
 */
/** imgフィルタ */
const fileFilterImg = (req, file, cb) => {
  // debug(file);
  if (['image/png', 'image/jpeg', 'image/jpg'].includes(file.mimetype)) {
    cb(null, true);
    return;
  }
  cb(new TypeError('Invalid File Type'));
};

/** pdf,csvフィルタ */
const fileFilterPdf = (req, file, cb) => {
  // debug(file.mimetype);
  if (['application/pdf'].includes(file.mimetype)) {
    cb(null, true);
    return;
  }
  cb(new TypeError('Invalid File Type'));
};

module.exports = { storage, fileFilterImg, fileFilterPdf };

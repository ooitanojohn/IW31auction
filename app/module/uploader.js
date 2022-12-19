const debug = require('debug')('http:uploader');
const multer = require('multer');
const { storage, fileFilterImg } = require('../common/multer');

/**
 * user管理画面
 */
/** user設定 */
const uploadImgUser = multer({
  storage: storage('user'),
  fileFilter: fileFilterImg,
});

/** 単体アップロード */
const uploadImgUserSingle = uploadImgUser.single('userImg');
const uploadUser = (req, res) =>
  new Promise((resolve, reject) => {
    try {
      uploadImgUserSingle(req, res, (err) => {
        // debug(req.body);
        // debug(req.file);
        if (err instanceof multer.MulterError) {
          throw new Error(err);
        } else if (err) {
          throw new Error(err);
        }
        resolve(req);
      });
    } catch (err) {
      debug(err);
      reject(new Error(err));
    }
  });

/**
 * 管理者側
 */
/** upload設定 */
const uploadImgAdmin = multer({
  storage: storage('product'),
  fileFilter: fileFilterImg,
  // 画像の制限の最適が不明
  // limits: {}
});
/** 単体アップロード */
const uploadImgAdminSingle = uploadImgAdmin.single('productId');
const uploadAdmin = (req, res) =>
  new Promise((resolve, reject) => {
    try {
      uploadImgAdminSingle(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          throw new Error(err);
        } else if (err) {
          throw new Error(err);
        }
        resolve(req);
      });
    } catch (err) {
      debug(err);
      reject(new Error(err));
    }
  });

/** 複数枚アップロード */
const uploadImgAdminArray = uploadImgAdmin.array('photos', 12);
const multiUploadAdmin = (req, res) =>
  new Promise((resolve, reject) => {
    try {
      uploadImgAdminArray(req, res, (err) => {
        // debug(req.files);
        if (err instanceof multer.MulterError) {
          throw new Error(err);
        } else if (err) {
          throw new Error(err);
        }
        resolve(req);
      });
    } catch (err) {
      debug(err);
      reject(new Error(err));
    }
  });

// /** 画像のリサイズ  */
// const memoryStorage = multer.memoryStorage;
// const uploadThumbnail = multer({
//   storage: storage(),
//   fileFilter: fileFilterImg,
// });

// /** pdfアップロード */
// const uploadPdf = multer({
//   storage: storage(),
//   fileFilter: fileFilterPdf,
// });

module.exports = { uploadUser, uploadAdmin, multiUploadAdmin };

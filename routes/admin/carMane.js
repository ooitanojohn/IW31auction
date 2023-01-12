const path = require('path');
const express = require('express');

const debug = require('debug')('http:body');
const formData = require('express-form-data');
const {
  getCarmane,
  postCsv,
  updateForm,
} = require('../../app/controller/admin/carStocksManagementRouter');

const router = express.Router();

// ファイルアップロードに利用.
router.use(
  formData.parse({ uploadDir: path.join(__dirname, '../../src/upload'), autoClean: true }),
);
console.log(path.join(__dirname, '../../src/upload'));
// これを指定すると、サイズが0のファイルはfilesから削除してくれる
router.use(formData.format());

/** 登録車両取得  */
router.get('/', async (req, res, next) => {
  await getCarmane(req, res, next);
});

/** 新規（CSV）  */
router.post('/', async (req, res) => {
  debug(req.files);
  try {
    await postCsv(req, res);
  } catch (err) {
    debug(err);
  }
});

/** 更新  */
router.post('/:option', async (req, res, next) => {
  await updateForm(req, res, next);
});
module.exports = router;

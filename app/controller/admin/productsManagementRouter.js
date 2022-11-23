const express = require('express');

const router = express.Router();
/**
 * 出品管理 router + controller
 */
/** 必要module読み込み */
/** resに渡す情報とSQLモジュールの読み込み */
const debug = require('debug')('http:products');
const { executeQuery, beginTran } = require('../../module/mysqlPool');
const { httpRapper } = require('../../common/httpRapper');
const { paginate } = require('../../common/paginate');

/** 出品管理 product_tbl一覧表示 */
/** 詳細 slider modalで表示 */
router.get('/:page', async (req, res, next) => {
  /** resに渡す情報とSQLモジュールの読み込み */
  const resInfo = httpRapper(req);
  /** paging */
  const limit = 5;
  const offset = paginate(5, req.params.page);
  debug(offset);
  /** 画像データは10個。json化してinsertする */
  try {
    if (req.query === 'search') {
      /** 絞り込み */
      resInfo.sql = await executeQuery('SELECT * FROM `users` LIMIT ? OFFSET ?;', [limit, offset]);
    }
    /** ここに処理を記述 */
    resInfo.sql = await executeQuery('SELECT * FROM `users` LIMIT ? OFFSET ?;', [limit, offset]);
    debug(resInfo.sql);
    res.render('admin/top.ejs', { ejsRender: resInfo });
  } catch (err) {
    next(err);
  }
});

/** 出品登録画面での更新、論理削除処理 (form) */
router.post('/:productId', async (req, res, next) => {
  /** resに渡す情報とSQLモジュールの読み込み */
  const tran = await beginTran();
  try {
    await tran.query(
      `UPDATE user_tbl
      SET card_number=?, card_key=?, user_state=?
      WHERE user_id=?`,
      [3540000000000001, 555, 1, 1],
    );
    // throw new Error("エラーテスト");
    await tran.commit();
    res.end('OK');
  } catch (err) {
    await tran.rollback();
    next(err);
  }
});

/** carStock_tbl一覧表示
 * 画像登録フォーム×10 を書くリストの下につけておく
 */
router.get('/insert', async (req, res, next) => {
  const tran = await beginTran();
  try {
    await tran.query(`INSERT`, []);
    // throw new Error("エラーテスト");
    await tran.commit();
    res.end('OK');
  } catch (err) {
    await tran.rollback();
    next(err);
  }
});

/** carStock_tbl一覧表示
 * 画像登録フォーム×10 を書くリストの下につけておく
 * checkbox 選択 + 追加情報で 新規登録
 *
 */
router.post('/insert', async (req, res, next) => {
  const tran = await beginTran();
  try {
    await tran.query(`INSERT`, []);
    // throw new Error("エラーテスト");
    await tran.commit();
    res.end('OK');
  } catch (err) {
    await tran.rollback();
    next(err);
  }
});

module.exports = router;

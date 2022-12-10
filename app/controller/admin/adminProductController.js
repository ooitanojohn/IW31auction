const debug = require('debug')('http:products');
// const multer = require('multer');
const { DateTime } = require('luxon');

const { executeQuery, beginTran } = require('../../module/mysqlPool');
const { httpRapper } = require('../../common/httpRapper');
const { paginate, paginateCount } = require('../../common/paginate');

/**
 * 出品商品一覧表示
 * 出品予定、出品中、出品終了で分けた
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const adminExhibitSelect = async (req, res, next) => {
  const resInfo = httpRapper(req);
  const limit = 5;
  const offset = paginate(5, req.params.pageId);
  resInfo.params.pageId = Number(req.params.pageId);
  try {
    if (req.query === 'search') {
      /** 絞り込み */
      resInfo.sql = await executeQuery(
        'SELECT p.product_id, p.start_price, p.asking_price, p.start_time, p.end_time, p.user_id, p.car_img, p.product_state, c.car_name, c.stock, cs.car_state, cs.arrival_price, m.maker_name FROM products as p, cars as c, carstocks as cs, makers as m WHERE p.car_id = c.car_id AND p.stock_id = cs.stock_id AND c.maker_id = m.maker_id GROUP BY p.product_id LIMIT ? OFFSET ?; ',
        [DateTime.now().toFormat('yyyy-mm-dd HH:mm:ss'), limit, offset],
      );
    }
    /** 出品中状態の商品一覧を取得する */
    resInfo.sql = await executeQuery(
      'SELECT p.product_id, p.start_price, p.asking_price, p.start_time, p.end_time, p.user_id, p.car_img, p.product_state, c.car_name, c.stock, cs.car_state, cs.arrival_price, m.maker_name FROM products as p, cars as c, carstocks as cs, makers as m WHERE p.car_id = c.car_id AND p.stock_id = cs.stock_id AND c.maker_id = m.maker_id AND p.start_time > ? AND p.product_state = 1 GROUP BY p.product_id LIMIT ? OFFSET ?;',
      [DateTime.now().toFormat('yyyy-mm-dd HH:mm:ss'), limit, offset],
    );
    debug(DateTime.now().toFormat('yyyy-LL-dd HH:mm:ss'));

    /** 全件取得時のカラム数 */
    const count = await executeQuery(
      'SELECT COUNT(cs.stock_id) FROM products as p, cars as c, carstocks as cs WHERE p.car_id = c.car_id AND p.stock_id = cs.stock_id AND p.start_time > ? AND p.product_state = 1;',
      [DateTime.now().toFormat('yyyy-mm-dd HH:mm:ss')],
    );
    resInfo.sql2 = paginateCount(count[0]['COUNT(cs.stock_id)'], limit);

    /** 日付フォーマット処理 */
    for (let i = 0; i < resInfo.sql.length; i += 1) {
      const time = new Date(`${resInfo.sql[i].start_time}`).toISOString();
      const time2 = new Date(`${resInfo.sql[i].end_time}`).toISOString();
      resInfo.sql[i].start_time = DateTime.fromISO(`${time}`).toFormat('yyyy-MM-dd');
      resInfo.sql[i].end_time = DateTime.fromISO(`${time2}`).toFormat('yyyy-MM-dd');
    }

    res.render('admin/productExhibit', { ejsRender: resInfo });
  } catch (err) {
    next(err);
  }
};

/**
 * 新規登録 在庫一覧表示ページ
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const adminPrepareSelect = async (req, res, next) => {
  const resInfo = httpRapper(req);
  const limit = 5;
  const offset = paginate(5, req.params.pageId);
  resInfo.params.pageId = Number(req.params.pageId);
  try {
    if (req.query === 'search') {
      /** 絞り込み */
      resInfo.sql = await executeQuery(
        'SELECT cs.stock_id, cs.car_state, cs.arrival_time, cs.arrival_price, cs.updata_time, c.car_id, c.car_name, c.stock, c.maker_id, m.maker_name FROM cars as c, carstocks as cs, makers as m WHERE c.car_id = cs.car_id AND c.maker_id = m.maker_id AND c.stock >= 1 GROUP BY cs.stock_id LIMIT ? OFFSET ?; ',
        [limit, offset],
      )
        .then((result) => {
          debug(result.insertId);
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
    /** 出品中状態の商品一覧を取得する */
    resInfo.sql = await executeQuery(
      'SELECT cs.stock_id, cs.car_state, cs.arrival_time, cs.arrival_price, cs.updata_time, c.car_id, c.car_name, c.stock, c.maker_id, m.maker_name FROM cars as c, carstocks as cs, makers as m WHERE c.car_id = cs.car_id AND c.maker_id = m.maker_id AND c.stock >= 1 GROUP BY cs.stock_id LIMIT ? OFFSET ?;',
      [limit, offset],
    );
    /** 全件取得時のカラム数 */
    const count = await executeQuery(
      'SELECT COUNT(cs.stock_id) FROM cars as c, carstocks as cs, makers as m WHERE c.car_id = cs.car_id AND c.maker_id = m.maker_id AND c.stock >= 1;',
    );
    resInfo.sql2 = paginateCount(count[0]['COUNT(cs.stock_id)'], limit);
    res.render('admin/productPrepare', { ejsRender: resInfo });
  } catch (err) {
    next(err);
  }
};

/**
 * オークション出品新規登録
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const adminExhibitInsert = async (req, res) => {
  debug(req.body);
  const tran = await beginTran();
  try {
    await tran
      .query(
        `INSERT INTO products(car_id, stock_id, start_price, asking_price, start_time, end_time, user_id, car_img, product_state) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          req.body.car_id,
          req.body.stock_id,
          req.body.start_price,
          req.body.asking_price,
          req.body.start_time,
          req.body.end_time,
          null,
          'tempSrc',
          1,
        ],
      )
      .catch((error) => {
        throw new Error(error);
      });
    await tran.commit();
  } catch (err) {
    await tran.rollback();
  }
  res.redirect(302, '/admin/product/exhibit/1');
};

/**
 * 出品予定変更
 * @param {*} req
 * @param {*} res
 */
const adminExhibitUpdate = async (req, res) => {
  debug(req.body);
  const tran = await beginTran();
  try {
    await tran
      .query(
        `UPDATE products SET start_price = ?, asking_price = ?, start_time = ?, end_time = ? WHERE product_id = ?;`,
        [
          req.body.start_price,
          req.body.asking_price,
          req.body.start_time,
          req.body.end_time,
          req.body.product_id,
        ],
      )
      .catch((error) => {
        throw new Error(error);
      });
    await tran.commit();
  } catch (err) {
    await tran.rollback();
  }
  res.redirect(302, '/admin/product/exhibit/1');
};

/**
 * 出品予定削除
 * @param {*} req
 * @param {*} res
 */
const adminExhibitDelete = async (req, res) => {
  debug(req.params);
  const tran = await beginTran();
  try {
    await tran
      .query(`UPDATE products SET product_state = 0 WHERE product_id = ?;`, [req.params.productId])
      .catch((error) => {
        throw new Error(error);
      });
    await tran.commit();
  } catch (err) {
    await tran.rollback();
  }
  res.redirect(302, '/admin/product/exhibit/1');
};

module.exports = {
  adminExhibitSelect,
  adminPrepareSelect,
  adminExhibitInsert,
  adminExhibitUpdate,
  adminExhibitDelete,
};

const debug = require('debug')('http:products');
// const multer = require('multer');
const { executeQuery, beginTran } = require('../../module/mysqlPool');
const { httpRapper } = require('../../common/httpRapper');
const { paginate, paginateCount } = require('../../common/paginate');

/**
 * 出品商品一覧表示 どういう画面にしよう 状態混ぜて並び変えるか
 * click modalで表示 →止め 更新削除のみ
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
        'SELECT p.product_id, p.start_price, p.asking_price, p.start_time, p.end_time, p.user_id, p.car_img, p.product_state, c.car_name, c.stock, cs.car_state, cs.arrival_price FROM products as p, cars as c, carstocks as cs WHERE p.car_id = c.car_id AND p.stock_id = cs.stock_id GROUP BY p.product_id LIMIT ? OFFSET ?; ',
        [limit, offset],
      );
    }
    /** 出品中状態の商品一覧を取得する */
    resInfo.sql = await executeQuery(
      'SELECT p.product_id, p.start_price, p.asking_price, p.start_time, p.end_time, p.user_id, p.car_img, p.product_state, c.car_name, c.stock, cs.car_state, cs.arrival_price FROM products as p, cars as c, carstocks as cs WHERE p.car_id = c.car_id AND p.stock_id = cs.stock_id GROUP BY p.product_id LIMIT ? OFFSET ?;',
      [limit, offset],
    );

    /** 全件取得時のカラム数 */
    const count = await executeQuery(
      'SELECT COUNT(cs.stock_id) FROM products as p, cars as c, carstocks as cs WHERE p.car_id = c.car_id AND p.stock_id = cs.stock_id;',
    );
    resInfo.sql2 = paginateCount(count[0]['COUNT(cs.stock_id)'], limit);
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
  const tran = await beginTran();
  try {
    await tran
      .query(
        `INSERT INTO products(car_id, stock_id, start_price, asking_price, start_time, end_time, user_id, car_img, product_state) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          req.body.stock_id,
          req.body.car_state,
          req.body.arrival_time,
          req.body.updata_time,
          req.body.arrival_time,
          req.body.car_id,
          req.body.car_name,
          req.body.maker_id,
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

module.exports = { adminExhibitSelect, adminPrepareSelect, adminExhibitInsert };

const { httpRapper } = require('../common/httpRapper');
const { executeQuery } = require('../module/mysqlPool');
/** 商品詳細 */
const productDetail = async (req, res, next) => {
  const resInfo = httpRapper(req);
  try {
    resInfo.sql = await executeQuery(
      'SELECT * FROM products as p, cars as c, makers as m WHERE p.car_id = c.car_id AND m.maker_id = c.maker_id AND p.product_id = ? GROUP BY p.product_id;',
      [req.params.productId],
    );
    resInfo.sql2 = await executeQuery(
      'SELECT * FROM products as p, options as o WHERE p.stock_id = o.stock_id AND p.product_id = ?',
      [req.params.productId],
    );
    /** user更新の為の情報一覧 */
    resInfo.sql4 = await executeQuery('SELECT * FROM users WHERE user_id = ?;', [
      req.user.user_id,
    ]).catch((err) => {
      throw new Error(err);
    });
    res.render('product', { ejsRender: resInfo });
  } catch (err) {
    next(err);
  }
};
module.exports = { productDetail };

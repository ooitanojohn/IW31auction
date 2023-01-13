const debug = require('debug')('http:products');
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
  const now = DateTime.now().toFormat('yyyy-LL-dd HH:mm:ss');
  debug(now);
  try {
    /**
     * 出品予定の商品一覧を取得する
     */
    if (req.query.state === 'schedule') {
      resInfo.sql = await executeQuery(
        'SELECT p.product_id, p.start_price, p.asking_price, p.start_time, p.end_time, p.user_id, p.car_img, p.product_state, c.car_id, c.car_name, c.stock, cs.car_state, cs.arrival_price, m.maker_name FROM products as p, cars as c, carstocks as cs, makers as m WHERE p.car_id = c.car_id AND p.stock_id = cs.stock_id AND c.maker_id = m.maker_id AND p.start_time > ? AND p.product_state = 1 GROUP BY p.product_id LIMIT ? OFFSET ?;',
        [now, limit, offset],
      ).catch((err) => {
        throw new Error(err);
      });

      /** ページング用のカラム数 */
      const count = await executeQuery(
        'SELECT COUNT(cs.stock_id) FROM products as p, cars as c, carstocks as cs WHERE p.car_id = c.car_id AND p.stock_id = cs.stock_id AND p.start_time > ? AND p.product_state = 1;',
        [now],
      );
      resInfo.sql2 = paginateCount(count[0]['COUNT(cs.stock_id)'], limit);
    }
    /**
     * 出品中の商品一覧を習得する
     *  */
    if (req.query.state === 'open') {
      resInfo.sql = await executeQuery(
        'SELECT p.product_id, p.start_price, p.asking_price, p.start_time, p.end_time, p.user_id, p.car_img, p.product_state, c.car_id, c.car_name, c.stock, cs.car_state, cs.arrival_price, m.maker_name FROM products as p, cars as c, carstocks as cs, makers as m WHERE p.car_id = c.car_id AND p.stock_id = cs.stock_id AND c.maker_id = m.maker_id AND p.start_time < ? AND p.end_time > ? AND p.product_state = 1 GROUP BY p.product_id LIMIT ? OFFSET ?;',
        [now, now, limit, offset],
      ).catch((err) => {
        throw new Error(err);
      });
      /** ページング用のカラム数 */
      const count = await executeQuery(
        'SELECT COUNT(p.product_id) FROM products as p, cars as c, carstocks as cs, makers as m WHERE p.car_id = c.car_id AND p.stock_id = cs.stock_id AND c.maker_id = m.maker_id AND p.start_time < ? AND p.end_time > ? AND p.product_state = 1 ;',
        [now, now],
      ).catch((err) => {
        throw new Error(err);
      });
      resInfo.sql2 = paginateCount(count[0]['COUNT(p.product_id)'], limit);

      /** 開催中オークションの最大入札者一覧 */
      resInfo.sql3 = await executeQuery(
        'SELECT b1.user_id, b1.product_id,MAX(bidding_time),MAX(bidding_money),p.car_id,p.car_img,p.end_time,c.car_name FROM biddings as b1, products as p, cars as c WHERE b1.bidding_money >= (SELECT MAX(bidding_money) FROM biddings as b2 WHERE b1.product_id = b2.product_id GROUP BY product_id) AND p.product_id = b1.product_id AND c.car_id = p.car_id AND p.end_time >= ? GROUP BY b1.product_id;',
        [now],
      ).catch((err) => {
        throw new Error(err);
      });
      /** 日付フォーマット処理 */
      for (let i = 0; i < resInfo.sql3.length; i += 1) {
        const time = new Date(`${resInfo.sql3[i]['MAX(bidding_time)']}`).toISOString();
        const time2 = new Date(`${resInfo.sql3[i].end_time}`).toISOString();
        resInfo.sql3[i]['MAX(bidding_time)'] = DateTime.fromISO(`${time}`).toFormat(
          'yyyy-LL-dd HH:mm:ss',
        );
        resInfo.sql3[i].end_time = DateTime.fromISO(`${time2}`).toFormat('yyyy-LL-dd HH:mm:ss');
      }
    }
    /**
     * 出品終了(落札連絡)一覧
     */
    if (req.query.state === 'close') {
      let productState = 0;
      if (req.query.close === 'done') {
        productState = 2;
      } else if (req.query.close === 'not') {
        productState = 1;
      }
      debug(productState);
      resInfo.sql = await executeQuery(
        'SELECT b1.user_id, b1.product_id,MAX(bidding_time),MAX(bidding_money),p.car_id,p.car_img,p.end_time,c.car_name FROM biddings as b1, products as p, cars as c WHERE b1.bidding_money >= (SELECT MAX(bidding_money) FROM biddings as b2 WHERE b1.product_id = b2.product_id GROUP BY product_id) AND p.product_id = b1.product_id AND c.car_id = p.car_id AND p.end_time <= ? AND p.product_state = ? GROUP BY b1.product_id LIMIT ? OFFSET ?;',
        [now, productState, limit, offset],
      ).catch((err) => {
        throw new Error(err);
      });
      /** ページング用のカラム数 */
      const count = await executeQuery(
        'SELECT COUNT(p.product_id) FROM biddings as b1, products as p, cars as c WHERE b1.bidding_money >= (SELECT MAX(bidding_money) FROM biddings as b2 WHERE b1.product_id = b2.product_id GROUP BY product_id) AND p.product_id = b1.product_id AND c.car_id = p.car_id AND p.end_time <= ? AND p.product_state = ?',
        [now, productState],
      ).catch((err) => {
        throw new Error(err);
      });
      resInfo.sql2 = paginateCount(count[0]['COUNT(p.product_id)'], limit);
    }
    /** 日付フォーマット処理 */
    if (req.query.state === 'schedule' || req.query.state === 'open') {
      for (let i = 0; i < resInfo.sql.length; i += 1) {
        const time = new Date(`${resInfo.sql[i].start_time}`).toISOString();
        const time2 = new Date(`${resInfo.sql[i].end_time}`).toISOString();
        resInfo.sql[i].start_time = DateTime.fromISO(`${time}`).toFormat('yyyy-LL-dd HH:mm:ss');
        resInfo.sql[i].end_time = DateTime.fromISO(`${time2}`).toFormat('yyyy-LL-dd HH:mm:ss');
      }
    } else if (req.query.state === 'close' && req.query.close === 'done') {
      for (let i = 0; i < resInfo.sql.length; i += 1) {
        const time = new Date(`${resInfo.sql[i]['MAX(bidding_time)']}`).toISOString();
        const time2 = new Date(`${resInfo.sql[i].end_time}`).toISOString();
        resInfo.sql[i]['MAX(bidding_time)'] = DateTime.fromISO(`${time}`).toFormat(
          'yyyy-LL-dd HH:mm:ss',
        );
        resInfo.sql[i].end_time = DateTime.fromISO(`${time2}`).toFormat('yyyy-LL-dd HH:mm:ss');
      }
    }
    res.render('admin/productExhibit', { ejsRender: resInfo });
  } catch (err) {
    debug(err);
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
        'SELECT cs.stock_id, cs.car_state, cs.arrival_time, cs.arrival_price, cs.updata_time, c.car_id, c.car_name, c.stock, c.maker_id, m.maker_name FROM cars as c, carstocks as cs, makers as m, products as p WHERE c.car_id = cs.car_id AND c.maker_id = m.maker_id AND c.stock >= 1 AND cs.stock_id NOT IN (SELECT stock_id FROM products) GROUP BY cs.stock_id LIMIT ? OFFSET ?;',
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
      'SELECT cs.stock_id, cs.car_state, cs.arrival_time, cs.arrival_price, cs.updata_time, c.car_id, c.car_name, c.stock, c.maker_id, m.maker_name FROM cars as c, carstocks as cs, makers as m, products as p WHERE c.car_id = cs.car_id AND c.maker_id = m.maker_id AND c.stock >= 1 AND cs.stock_id NOT IN (SELECT stock_id FROM products) GROUP BY cs.stock_id LIMIT ? OFFSET ?;;',
      [limit, offset],
    );
    /** 全件取得時のカラム数 */
    const count = await executeQuery(
      'SELECT COUNT(cs.stock_id) FROM cars as c, carstocks as cs, makers as m WHERE c.car_id = cs.car_id AND c.maker_id = m.maker_id AND c.stock >= 1 AND cs.stock_id NOT IN (SELECT stock_id FROM products);',
    );
    resInfo.sql2 = paginateCount(count[0]['COUNT(cs.stock_id)'], limit);
    /** 日付フォーマット処理 */
    for (let i = 0; i < resInfo.sql.length; i += 1) {
      const time = new Date(`${resInfo.sql[i].arrival_time}`).toISOString();
      const time2 = new Date(`${resInfo.sql[i].updata_time}`).toISOString();
      resInfo.sql[i].arrival_time = DateTime.fromISO(`${time}`).toFormat('yyyy年MM月dd日');
      resInfo.sql[i].updata_time = DateTime.fromISO(`${time2}`).toFormat('yyyy年MM月dd日');
    }
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
    /** 出品登録をする */
    await tran
      .query(
        `INSERT INTO products(car_id, stock_id, start_price, asking_price, start_time, end_time, product_state,user_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          req.body.car_id,
          req.body.stock_id,
          req.body.start_price,
          req.body.asking_price,
          req.body.start_time,
          req.body.end_time,
          1,
          0,
        ],
      )
      .catch((error) => {
        throw new Error(error);
      });
    /** 在庫数を1減らす */
    await tran
      .query(`UPDATE cars SET stock = ? WHERE car_id = ?;`, [
        Number(req.body.stock) - 1,
        req.body.car_id,
      ])
      .catch((error) => {
        throw new Error(error);
      });
    await tran.commit();
  } catch (err) {
    debug(err);
    await tran.rollback();
  }
  res.redirect(301, '/admin/product/exhibit/1?state=schedule');
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
    debug(err);
    await tran.rollback();
  }
  res.redirect(301, '/admin/product/exhibit/1?state=schedule');
};

/**
 * 出品予定削除
 * @param {*} req
 * @param {*} res
 */
const adminExhibitDelete = async (req, res) => {
  const tran = await beginTran();
  debug(req.body);
  try {
    /** 出品登録から削除 */
    await tran
      .query(`DELETE FROM products WHERE product_id = ?;`, [req.params.productId])
      .catch((err) => {
        throw new Error(err);
      });
    /** 在庫を増やす */
    await tran
      .query(`UPDATE cars SET stock = ? WHERE car_id = ?;`, [
        Number(req.body.stock) + 1,
        req.body.car_id,
      ])
      .catch((err) => {
        throw new Error(err);
      });
    await tran.commit();
  } catch (err) {
    debug(err);
    await tran.rollback();
  }
  res.redirect(301, '/admin/product/prepare/1');
};

const { sendMail } = require('../../common/mail');
/**
 * 落札登録 & メール送信
 * @param {*} req
 * @param {*} res
 */
const adminBidRegist = async (req, res) => {
  debug(req.body);
  const tran = await beginTran();
  try {
    await tran
      .query(`UPDATE products SET user_id = ?, product_state = ? WHERE product_id = ?;`, [
        req.body.user_id,
        2,
        req.params.productId,
      ])
      .catch((error) => {
        throw new Error(error);
      });
    await tran.commit();
    // const usermail = await executeQuery("SELECT user_mail FROM users WHERE user_id = " + req.body.user_id);
    // endTime = req.body.end_time.toString;
    const userMail = 'qmkh733310@gmail.com';
    const mails = {
      from: process.env.SMTP_USER, // 送信元メールアドレス
      to: userMail, // 送信先メールアドレス
      subject: '落札完了のお知らせ',
      text: '',
      html: `<p>${req.body.user_id}様購入ありがとうございます。</p>`,
    };
    sendMail(mails);
  } catch (err) {
    debug(err);
    await tran.rollback();
  }
  res.redirect(301, '/admin/product/exhibit/1?state=close');
};

module.exports = {
  adminExhibitSelect,
  adminPrepareSelect,
  adminExhibitInsert,
  adminExhibitUpdate,
  adminExhibitDelete,
  adminBidRegist,
};

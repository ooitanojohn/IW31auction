/**
 * paramとか良く返す値を常に格納して纏めて返す
 * @param {*} req httpリクエストの値を格納
 * @returns {object} httpレスポンスで返す値を格納
 */
const reqInfoReturn = (req) => {
  const resInfo = {
    body: req.body, // 送信データ client？ serverじゃない?再入力時は居るな
    params: req.params, // 今回はproductId。 myPage,userIDとか商品詳細ページの商品IDとかbiddingページのproductIDとか
    query: req.query, // ?queryParam ?search="subaru"&order="ASC"
    session: req.session,
    cookie: req.cookie,
  };
  return resInfo;
};

module.exports = {
  reqInfoReturn,
};

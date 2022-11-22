const resInfo = {
  body: {}, // 送信データ client？ serverじゃない?再入力時は居るな
  params: {}, // 今回はproductId。 myPage,userIDとか商品詳細ページの商品IDとかbiddingページのproductIDとか
  query: {}, // ?queryParam ?search="subaru"&order="ASC"
  session: {},
  cookie: {},
};

module.exports = resInfo;

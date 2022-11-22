const socketIo = io();
// ページを開いた時にオークション商品へjoin
const join = {
  productId: info.params.productId,
};
socketIo.emit('toServerJoin', join);

// ボタンが押されたらserverへsocket送信
const form = document.getElementById('biddingForm');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  const biddingData = {
    productId: info.params.productId,
    userId: document.getElementById('userId').value,
    biddingTime: new Date(),
    biddingMoney: document.getElementById('biddingMoney').value,
  };
  socketIo.emit('toServerBiddingSend', biddingData);
});

// サーバ(Node.js) →クライアント(ブラウザ)へSocket受信
socketIo.on('toRenderBiddingSend', (biddingData) => {
  // console.log(biddingData);
  /** 上記の入札履歴リスト更新 */
  const div = document.getElementById('biddingLog');
  let p = document.createElement('p');
  let text = document.createTextNode(
    '入札No:' +
      '入札者番号:' +
      biddingData.userId +
      '入札価格:' +
      biddingData.biddingTime +
      '入札時間:' +
      biddingData.biddingMoney,
  );
  p.appendChild(text);
  div.appendChild(p);
  // const updateBiddingLog = () => {
  //   return new Promise((resolve) => {
  //     const p = document.createElement("p");
  //     p.innerText = "入札No:" + "入札者番号:" + biddingData.userId + "入札価格:" + biddingData.biddingTime + "入札時間:" + biddingData.biddingMoney;
  //     resolve(div.appendChild(p));
  //   });
  // }

  // async () => {
  //   await updateBiddingLog();
  //   while (div.hasChildNodes()) { // 子要素削除
  //     if (div.childNodes.length <= 10) { break; }
  //     div.removeChild(div.childNodes[0]);
  //   }
  // }
  console.log(div.childNodes);

  /** 最高入札額の更新 */
  const maxBiddingMoney = document.querySelector('#maxBiddingMoney');
  const maxUserId = document.querySelector('#maxUserId');
  const maxBiddingTime = document.querySelector('#maxBiddingTime');
  const biddingMoney = document.querySelector('#biddingMoney');
  maxBiddingMoney.textContent = biddingData.biddingMoney;
  maxUserId.textContent = biddingData.userId;
  maxBiddingTime.textContent = biddingData.biddingTime;
  biddingMoney.min = Number(biddingData.biddingMoney) + 100;
  biddingMoney.placeholder = Number(biddingData.biddingMoney) + 100;
});

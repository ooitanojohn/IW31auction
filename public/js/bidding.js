const socketIo = io();

// ページを開いた時にオークション商品へjoin
const join = {
  productId: info.params.productId,
};
socketIo.emit('toServerJoin', join);

// ボタンが押されたらserverへsocket送信
const form = document.getElementById('biddingForm');
form.addEventListener('submit', (event) => {
  let biddingLogId = document.querySelectorAll('#biddingLogId');
  event.preventDefault();
  const biddingData = {
    userId: info.user.user_id,
    productId: info.params.productId,
    biddingMoney: document.getElementById('biddingMoney').value,
    biddingTime: DateTime.now(),
    id: Number(biddingLogId[biddingLogId.length - 1].textContent) + 1,
  };
  socketIo.emit('toServerBiddingSend', biddingData);
});

// ボタンが押されたらserverへsocket送信
const formBtn = document.getElementById('biddingFormBtn');
formBtn.addEventListener('click', (event) => {
  let biddingLogId = document.querySelectorAll('#biddingLogId');
  event.preventDefault();
  const biddingData = {
    userId: info.user.user_id,
    productId: info.params.productId,
    biddingMoney:
      Number(document.getElementById('biddingMoneyBtn').value) + Number(event.target.id),
    biddingTime: DateTime.now(),
    id: Number(biddingLogId[biddingLogId.length - 1].textContent) + 1,
  };
  console.log(biddingData);
  socketIo.emit('toServerBiddingSend', biddingData);
});

// サーバ(Node.js) →クライアント(ブラウザ)へSocket受信
socketIo.on('toRenderBiddingSend', (biddingData) => {
  /** 上記の入札履歴リスト更新 */
  const div = document.getElementById('biddingLog');
  let p = document.createElement('p');
  let text = document.createTextNode(
    '入札No:' +
      biddingData.id +
      '入札価格:' +
      biddingData.biddingMoney +
      '万円' +
      '入札者番号:' +
      biddingData.userId +
      '入札時間:' +
      biddingData.biddingTime,
  );
  p.appendChild(text);
  div.appendChild(p);

  /** 最高入札額の更新 */
  const maxBiddingMoney = document.querySelector('#maxBiddingMoney');
  const maxUserId = document.querySelector('#maxUserId');
  const maxBiddingTime = document.querySelector('#maxBiddingTime');
  const biddingMoney = document.querySelector('#biddingMoney');
  const biddingMoneyBtn = document.querySelector('#biddingMoneyBtn');

  maxBiddingMoney.textContent = biddingData.biddingMoney;
  maxUserId.textContent = biddingData.userId;
  maxBiddingTime.textContent = biddingData.biddingTime;
  biddingMoney.min = Number(biddingData.biddingMoney) + 100;
  biddingMoney.placeholder = Number(biddingData.biddingMoney) + 100;
  biddingMoneyBtn.value = biddingData.biddingMoney;
});

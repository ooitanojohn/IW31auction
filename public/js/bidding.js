const socketIo = io();

// ページを開いた時にオークション商品へjoin
const join = {
  productId: info.params.productId,
};
socketIo.emit('toServerJoin', join);

let biddingLogId = document.querySelectorAll('#biddingLogId');
let biddingId = Number(biddingLogId[0].textContent) + 1;

// ボタンが押されたらserverへsocket送信
const form = document.getElementById('biddingForm');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const biddingData = {
    userId: info.user.user_id,
    productId: info.params.productId,
    biddingMoney: document.getElementById('biddingMoney').value,
    biddingTime: DateTime.now(),
    id: biddingId,
  };
  socketIo.emit('toServerBiddingSend', biddingData);
});

// ボタンが押されたらserverへsocket送信
const formBtn = document.getElementById('biddingFormBtn');
formBtn.addEventListener('click', async (event) => {
  console.log(biddingId);
  event.preventDefault();
  const biddingData = {
    userId: info.user.user_id,
    productId: info.params.productId,
    biddingMoney:
      Number(document.getElementById('biddingMoneyBtn').value) + Number(event.target.id),
    biddingTime: DateTime.now(),
    id: biddingId,
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
  p.setAttribute('class', 'uk-animation-slide-top-small');
  div.prepend(p);
  biddingId = biddingId + 1;
  /** 最高入札額の更新 */
  const maxBiddingMoney = document.querySelector('#maxBiddingMoney');
  const maxUserId = document.querySelector('#maxUserId');
  const maxBiddingTime = document.querySelector('#maxBiddingTime');
  const biddingMoney = document.querySelector('#biddingMoney');
  const biddingMoneyBtn = document.querySelector('#biddingMoneyBtn');

  maxBiddingMoney.textContent = biddingData.biddingMoney;
  maxBiddingMoney.setAttribute('class', 'uk-animation-slide-top-small');
  maxUserId.textContent = biddingData.userId;
  maxUserId.setAttribute('class', 'uk-animation-slide-top-small');
  maxBiddingTime.textContent = biddingData.biddingTime;
  maxBiddingTime.setAttribute('class', 'uk-animation-slide-top-small');
  biddingMoney.min = Number(biddingData.biddingMoney) + 100;
  biddingMoney.setAttribute('class', 'uk-animation-slide-top-small');
  biddingMoney.placeholder = Number(biddingData.biddingMoney) + 10000;
  biddingMoneyBtn.value = biddingData.biddingMoney;
});

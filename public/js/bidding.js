const socketIo = io();

// ページを開いた時にオークション商品へjoin
const join = {
  productId: info.params.productId,
};
socketIo.emit('toServerJoin', join);

let biddingLogId = document.querySelectorAll('#biddingLogId');
let biddingId = Number(biddingLogId[0].textContent) + 1;
const maxBiddingMoney = document.querySelector('#maxBiddingMoney');
const maxUserId = document.querySelector('#maxUserId');
const maxBiddingTimeSeconds = document.querySelector('#maxBiddingTimeSeconds');
const maxBiddingTimeMinute = document.querySelector('#maxBiddingTimeMinute');

const biddingMoney = document.querySelector('#biddingMoney');
const biddingMoneyBtn = document.querySelector('#biddingMoneyBtn');

/** 時間経過 */
const timer = () => {
  if (Number(maxBiddingTimeSeconds.textContent) >= 60) {
    if (!isNaN(maxBiddingTimeMinute.textContent)) {
      maxBiddingTimeMinute.textContent = Number(maxBiddingTimeMinute.textContent) + 1;
    } else {
      maxBiddingTimeMinute.textContent = 1;
    }
    maxBiddingTimeSeconds.textContent = 0;
  }
  maxBiddingTimeSeconds.textContent = Number(maxBiddingTimeSeconds.textContent) + 1;
};
setInterval(timer, 1000);

// ボタンが押されたらserverへsocket送信
const form = document.getElementById('biddingForm');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  maxBiddingMoney.classList.remove('uk-animation-slide-top-small');
  maxUserId.classList.remove('uk-animation-slide-top-small');
  maxBiddingTimeSeconds.classList.remove('uk-animation-slide-top-small');
  biddingMoney.classList.remove('uk-animation-slide-top-small');
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
  maxBiddingMoney.classList.remove('uk-animation-slide-top-small');
  maxUserId.classList.remove('uk-animation-slide-top-small');
  maxBiddingTimeSeconds.classList.remove('uk-animation-slide-top-small');
  biddingMoney.classList.remove('uk-animation-slide-top-small');
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
  let text = myCreateElement('span', '入札No:' + biddingData.id, 'displayBlock');
  let text2 = myCreateElement(
    'span',
    '入札価格:' + biddingData.biddingMoney + '円',
    'displayBlock',
  );
  let text3 = myCreateElement('span', '入札者番号:' + biddingData.userId, 'displayBlock');
  let text4 = myCreateElement(
    'span',
    '入札時間:' + DateTime.fromISO(biddingData.biddingTime).toFormat('yyyy-LL-dd HH:mm:ss'),
    'displayBlock',
  );
  p.appendChild(text);
  p.appendChild(text2);
  p.appendChild(text3);
  p.appendChild(text4);

  p.setAttribute('class', 'uk-animation-slide-top-small');
  div.prepend(p);
  biddingId = biddingId + 1;

  /** 最高入札額の更新 */

  // while (maxBidding.hasChildNodes()) { // 子要素削除
  //   if (maxBidding.childNodes.length === 0) { break; } // 要素が一つになると終了
  //   maxBidding.removeChild(maxBidding.childNodes[0]);
  // }

  maxBiddingMoney.textContent = biddingData.biddingMoney;

  maxBiddingMoney.classList.add('uk-animation-slide-top-small');
  maxUserId.textContent = biddingData.userId;

  maxUserId.classList.add('uk-animation-slide-top-small');
  const diff = DateTime.now().diff(DateTime.fromISO(biddingData.biddingTime), [
    'minutes',
    'second',
  ]);
  console.log(diff.values);
  maxBiddingTimeMinute.textContent = 0;
  maxBiddingTimeSeconds.textContent = Math.floor(diff.values.seconds);

  maxBiddingTimeSeconds.classList.add('uk-animation-slide-top-small');
  biddingMoney.min = Number(biddingData.biddingMoney) + 100;

  biddingMoney.classList.add('uk-animation-slide-top-small');
  biddingMoney.placeholder = Number(biddingData.biddingMoney) + 10000 + 'から入札できます';

  biddingMoneyBtn.value = biddingData.biddingMoney;
});

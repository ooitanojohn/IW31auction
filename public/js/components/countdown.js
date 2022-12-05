'use strict';
exports.__esModule = true;
exports.createCountdownComponent = void 0;
var mapUi_1 = require('../common/createElement');

/**
 * 日付をブラウザかejsがiso8601?から違う形式に変えてしまうので共通のカウントダウンとして作成
 * @param string dateTime iso 8601 形式の時間
 * @returns カウントダウンエレメント
 */
var createCountdownComponent = function (dateTime) {
  /** dateTime */
  var countdownComponent = (0, mapUi_1.myCreateElement)(
    'div',
    '',
    ['uk-grid-small', 'uk-child-width-auto'],
    { 'uk-grid': '', 'uk-countdown': `date: ${dateTime}` },
  );
  /** daysコンポーネント */
  var daysCon = (0, mapUi_1.myCreateElement)('div');
  var daysConNum = (0, mapUi_1.myCreateElement)('div', '', [
    'uk-countdown-number',
    'uk-countdown-days',
  ]);
  var daysConText = (0, mapUi_1.myCreateElement)('div', 'Days', [
    'uk-countdown-label',
    'uk-margin-small',
    'uk-text-center',
    'uk-visible@s',
  ]);
  daysCon.appendChild(daysConNum);
  daysCon.appendChild(daysConText);
  countdownComponent.appendChild(daysCon);
  /** :セパレーター コンポーネント コンポーネント毎に区切る append */
  var separator = (0, mapUi_1.myCreateElement)('div', ':', 'uk-countdown-separator');
  countdownComponent.appendChild(separator);
  /** hoursコンポーネント */
  var hoursCon = (0, mapUi_1.myCreateElement)('div');
  var hoursConNum = (0, mapUi_1.myCreateElement)('div', '', [
    'uk-countdown-number',
    'uk-countdown-hours',
  ]);
  var hoursConText = (0, mapUi_1.myCreateElement)('div', 'Hours', [
    'uk-countdown-label',
    'uk-margin-small',
    'uk-text-center',
    'uk-visible@s',
  ]);
  hoursCon.appendChild(hoursConNum);
  hoursCon.appendChild(hoursConText);
  /** separator */
  countdownComponent.appendChild(separator);
  /** minutesコンポーネント */
  var minutesCon = (0, mapUi_1.myCreateElement)('div');
  var minutesConNum = (0, mapUi_1.myCreateElement)('div', '', [
    'uk-countdown-number',
    'uk-countdown-minutes',
  ]);
  var minutesConText = (0, mapUi_1.myCreateElement)('div', 'Minutes', [
    'uk-countdown-label',
    'uk-margin-small',
    'uk-text-center',
    'uk-visible@s',
  ]);
  minutesCon.appendChild(minutesConNum);
  minutesCon.appendChild(minutesConText);
  /** separator */
  countdownComponent.appendChild(separator);
  /** secondsコンポーネント */
  var secondsCon = (0, mapUi_1.myCreateElement)('div');
  var secondsConNum = (0, mapUi_1.myCreateElement)('div', '', [
    'uk-countdown-number',
    'uk-countdown-seconds',
  ]);
  var secondsConText = (0, mapUi_1.myCreateElement)('div', 'Seconds', [
    'uk-countdown-label',
    'uk-margin-small',
    'uk-text-center',
    'uk-visible@s',
  ]);
  secondsCon.appendChild(secondsConNum);
  secondsCon.appendChild(secondsConText);
  countdownComponent.appendChild(text);
  return countdownComponent;
};
exports.createCountdownComponent = createCountdownComponent;

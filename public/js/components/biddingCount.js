'use strict';
var myCreateElement = function (tag, text, className, AttributeObj) {
  if (text === void 0) {
    text = '';
  }
  if (className === void 0) {
    className = '';
  }
  if (AttributeObj === void 0) {
    AttributeObj = null;
  }
  var myElement = document.createElement(tag);
  if (text !== '') myElement.textContent = text;
  if (typeof className === 'string' && className !== '') {
    myElement.classList.add(className);
  } else if (typeof className === 'object') {
    for (var _i = 0, className_1 = className; _i < className_1.length; _i++) {
      var name_1 = className_1[_i];
      myElement.classList.add(name_1);
    }
  }
  if (AttributeObj !== null) {
    for (var _a = 0, _b = Object.entries(AttributeObj); _a < _b.length; _a++) {
      var _c = _b[_a],
        key = _c[0],
        value = _c[1];
      myElement.setAttribute(key, value);
    }
  }
  return myElement;
};

var createCountdownComponent = function (dateTime) {
  /** dateTime */
  var countdownComponent = (0, myCreateElement)(
    'div',
    '',
    ['uk-grid-small', 'uk-child-width-auto'],
    { 'uk-grid': '', 'uk-countdown': `date: ${dateTime}` },
  );
  /** daysコンポーネント */
  var daysCon = (0, myCreateElement)('div');
  var daysConNum = (0, myCreateElement)('div', '', ['uk-countdown-number', 'uk-countdown-days']);
  var daysConText = (0, myCreateElement)('div', 'Days', [
    'uk-countdown-label',
    'uk-margin-small',
    'uk-text-center',
    'uk-visible@s',
  ]);
  daysCon.appendChild(daysConNum);
  daysCon.appendChild(daysConText);
  countdownComponent.appendChild(daysCon);
  /** :セパレーター コンポーネント コンポーネント毎に区切る append */
  const separator = (0, myCreateElement)('div', ':', 'uk-countdown-separator');
  countdownComponent.appendChild(separator);
  /** hoursコンポーネント */
  var hoursCon = (0, myCreateElement)('div');
  var hoursConNum = (0, myCreateElement)('div', '', ['uk-countdown-number', 'uk-countdown-hours']);
  var hoursConText = (0, myCreateElement)('div', 'Hours', [
    'uk-countdown-label',
    'uk-margin-small',
    'uk-text-center',
    'uk-visible@s',
  ]);
  hoursCon.appendChild(hoursConNum);
  hoursCon.appendChild(hoursConText);
  countdownComponent.appendChild(hoursCon);
  /** separator */
  const separator2 = (0, myCreateElement)('div', ':', 'uk-countdown-separator');
  countdownComponent.appendChild(separator2);

  /** minutesコンポーネント */
  var minutesCon = (0, myCreateElement)('div');
  var minutesConNum = (0, myCreateElement)('div', '', [
    'uk-countdown-number',
    'uk-countdown-minutes',
  ]);
  var minutesConText = (0, myCreateElement)('div', 'Minutes', [
    'uk-countdown-label',
    'uk-margin-small',
    'uk-text-center',
    'uk-visible@s',
  ]);
  minutesCon.appendChild(minutesConNum);
  minutesCon.appendChild(minutesConText);
  countdownComponent.appendChild(minutesCon);

  /** separator */
  const separator3 = (0, myCreateElement)('div', ':', 'uk-countdown-separator');
  countdownComponent.appendChild(separator3);
  /** secondsコンポーネント */
  var secondsCon = (0, myCreateElement)('div');
  var secondsConNum = (0, myCreateElement)('div', '', [
    'uk-countdown-number',
    'uk-countdown-seconds',
  ]);
  var secondsConText = (0, myCreateElement)('div', 'Seconds', [
    'uk-countdown-label',
    'uk-margin-small',
    'uk-text-center',
    'uk-visible@s',
  ]);
  secondsCon.appendChild(secondsConNum);
  secondsCon.appendChild(secondsConText);
  countdownComponent.appendChild(secondsCon);
  return countdownComponent;
};

const timeLeft = document.querySelectorAll('.timeLeft');
console.log(timeLeft);
// for (let i = 0; i < timeLeft.length; i++) {
timeLeft[0].appendChild(createCountdownComponent(info.sql2[0].end_time));
// }

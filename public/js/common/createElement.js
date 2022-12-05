'use strict';
/** map UI系  */
exports.__esModule = true;
exports.addMarker = exports.myCreateElement = void 0;
/**
 * element作成関数
 * @param tag htmlタグ
 * @param text htmlテキスト 省略可
 * @param className クラス名 省略可
 * @param AttributeObj 属性obj 省略可
 * @return HTMLElement
 */
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
exports.myCreateElement = myCreateElement;

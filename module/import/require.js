const func = require('../export/function');
const day = require('../export/instance');
const any = require('../export/anyFunc');

console.log(func('function'));
console.log(day.getFullYear());
console.log(any.hello('1'));
console.log(any.goodbye('2'));

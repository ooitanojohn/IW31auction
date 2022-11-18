const { debug1, debug2 } = require('debug')('console');

const helloFunc = () => 'hello';
const goodByeFunc = () => 'goodBye';

debug1(helloFunc());
debug2(goodByeFunc);

exports.hello = helloFunc;
exports.goodBye = goodByeFunc;

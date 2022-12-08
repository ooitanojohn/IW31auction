const debug = require('debug')('http:socket');
const { biddingInsert } = require('./socket/bidding');

module.exports = (io) => {
  /** ソケット */
  io.on('connection', (socket) => {
    /**
     * 接続と非接続
     */
    debug('connect');
    socket.on('disconnect', () => {
      debug('user disconnected');
    });

    /**
     *  biddingPageで使うソケット
     */
    biddingInsert(io, socket);
  });
};

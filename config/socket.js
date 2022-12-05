const debug = require('debug')('http:server');

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
    /** biddingRoom 接続 */
    socket.on('toServerJoin', (join) => {
      // debug("product商品" + join.productId + "に参加しました");
      socket.join(join.productId);
    });
    /** 入札が来たらMySQLへの登録処理と入札記録を返す */
    socket.on('toServerBiddingSend', (biddingData) => {
      io.to(biddingData.productId).emit('toRenderBiddingSend', biddingData);
    });
  });
};

const debug = require('debug')('http:socket');
const { beginTran } = require('../app/module/mysqlPool');

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
      debug(`product商品${join.productId}に参加しました`);
      socket.join(join.productId);
    });
    /** 入札が来たらMySQLへの登録処理と入札記録を返す */
    socket.on('toServerBiddingSend', async (biddingData) => {
      const tran = await beginTran();
      try {
        await tran
          .query(
            `INSERT INTO biddings(user_id, product_id, bidding_money, bidding_time) VALUES(?,?,?,?);`,
            [
              biddingData.userId,
              biddingData.productId,
              biddingData.biddingMoney,
              biddingData.biddingTime,
            ],
          )
          .catch((error) => {
            throw new Error(error);
          });
        await tran.commit();
      } catch (err) {
        await tran.rollback();
      }
      io.to(biddingData.productId).emit('toRenderBiddingSend', biddingData);
    });
  });
};

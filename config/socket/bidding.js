const debug = require('debug')('http:biddingSocket');
const { beginTran } = require('../../app/module/mysqlPool');

/** 入札ページのsocket処理  */

const biddingInsert = (io, socket) => {
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
};

module.exports = { biddingInsert };

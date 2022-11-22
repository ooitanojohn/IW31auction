#!/usr/bin/env node

// eslint-disable-next-line import/order
const app = require('./app');
const debug = require('debug')('http');
const httpSocket = require('http').Server(app);
const ioSocket = require('socket.io')(httpSocket);

debug('booting App');

/** ソケット */
ioSocket.on('connection', (socket) => {
  /**
   * 接続と非接続
   */
  // console.log("connect");
  socket.on('disconnect', () => {
    // console.log("user disconnected");
  });

  /**
   *  biddingPageで使うソケット
   */
  /** biddingRoom 接続 */
  socket.on('toServerJoin', (join) => {
    // console.log("product商品" + join.productId + "に参加しました");
    socket.join(join.productId);
  });
  /** 入札が来たらMySQLへの登録処理と入札記録を返す */
  socket.on('toServerBiddingSend', (biddingData) => {
    ioSocket.to(biddingData.productId).emit('toRenderBiddingSend', biddingData);
  });
});

httpSocket.listen(9000, () => {
  debug('listening...');
});

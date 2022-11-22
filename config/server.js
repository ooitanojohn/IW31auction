#!/usr/bin/env node

const app = require('./app');
const debug = require('debug')('http');
const http_socket = require('http').Server(app);
const io_socket = require('socket.io')(http_socket);

debug('booting App');

/** ソケット */
io_socket.on('connection', (socket) => {
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
    io_socket.to(biddingData.productId).emit('toRenderBiddingSend', biddingData);
  });
});

http_socket.listen(9000, () => {
  debug('listening...');
});

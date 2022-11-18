const express = require('express');

const router = express.Router();
const mysql = require('mysql');
require('date-utils');
const path = require('path');
const fs = require('fs');

function imgUpload(imageId, imageType) {
  const mysqlSetting = {
    host: '',
    user: '',
    password: '',
    database: 'auction',
  };
  //
  let imgPath = '';
  let sql = '';
  if (imageType === 'productMain') {
    imgPath = './src/product/top';
  } else if (imageType === 'productDetail') {
    imgPath = './src/product/detail';
  } else {
    imgPath = './src/user';
  }
  if (imageType === 'productMain') {
    sql = 'insert into テーブル名 set ?';
  } else if (imageType === 'productDetail') {
    sql = 'insert into テーブル名 set ?';
  } else {
    sql = 'insert into テーブル名 set ?';
  }
  // 画像がPOSTされた時の処理
  router.post('/', (req, res) => {
    // 変数準備
    const id = imageId; // 今回変更したいDBのカラムID
    if (imageType === 'productMain') {
      // 商品情報を登録したい場合
      // 画像ファイル（アイコン）の拡張子を取り出し、時間とsession変数で名前をつけ直す。これによりuserが全く同じ名前のファイルをアップしてきても大丈夫
      const iconExt = path.extname(req.files.icon.name);
      const newIconname = id + iconExt;
      // 画像ファイルを保存するパスを設定
      const targetPathI = imgPath + newIconname;
      // ファイルをサーバーに保存した後、ファイル名をDBの保存、今後ファイルを取り出す際はDBから名前を取ってきてサーバーに保存してある画像ファイルとひもづける
      fs.writeFile(targetPathI, req.files.icon.data, (err) => {
        if (err) {
          throw err;
        } else {
          const data = { icon: newIconname };
          const connection = mysql.createConnection(mysqlSetting);
          connection.connect();
          connection.query(sql, data, () => {
            res.redirect('/mypage');
          });
          connection.end();
        }
      });
    }
  });
}
module.exports = imgUpload;

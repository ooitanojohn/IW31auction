const express = require('express');

const router = express.Router();
const mysql = require('mysql');
const path = require('path');
const fs = require('fs');

xpress = require('express');

//*** 追加1 ここから***//
const multer = require('multer');
var storage = multer.diskStorage({
  //ファイルの保存先を指定(ここでは保存先は./public/images)
  //Express4の仕様かなんかで画像staticなファイルを保存するときはpublic/以下のフォルダに置かないとダメらしい
  //詳しくは express.static public でググろう！
  destination: function (req, file, cb) {
    cb(null, './public/images/');
  },
  //ファイル名を指定
  //ここでは image.jpg という名前で保存
  filename: function (req, file, cb) {
    cb(null, 'image.jpg');
  },
});

var upload = multer({ storage: storage });
// /**
//  *
//  * @param {*} imageObject 画像のオブジェクトが格納されている  最初がIDでそれ以降はファイル
//  * @param {*} imageType 画像の種類　ユーザーと車が存在
//  */
// const imgUpload = (imageObject, imageType) =>{
//   const array = Object.values(imageObject);
//   const dir = '/src/'+imageType+'/'+array[0];
//   if (!fs.existsSync(dir)) {
//     fs.mkdir(dir, { recursive: true }, err => {
//       if(err) console.log(err);
//   });
//   }
//   for(let i =1 ;i < array.length; i++){
//     //拡張子を取り出してファイルをリネーム
//     var icon_ext = path.extname(array[i]);
//     var new_iconname = array[0]+'_'+array[i]+icon_ext;
//     //画像ファイルを保存するパスを設定
//     var target_path_i = dir+'/'+new_iconname;
//     fs.writeFile(target_path_i,imageObject.files.icon.data,(err) => {
//       if(err){
//           throw err
//       }else{
//           var data = {'icon':new_iconname};
//       }
//     });
//   };
//   return data;
// };
module.exports = { imgUpload };

const formData = require('express-form-data');
const fs = require('fs');
const parse = require('csv-parse/sync');
const debugF = require('debug')('http:files');
const debug = require('debug')('http:body');
// ファイルアップロードに利用.
app.use(formData.parse({ uploadDir: path.join(__dirname, '../src/upload'), autoClean: true }));
// これを指定すると、サイズが0のファイルはfilesから削除してくれる
app.use(formData.format());

app.post('/send-form-data', async (request, response) => {
  // アップロードファイルは request.files に設定されます.
  //debugF(request.files);

  //一時保存場所からcsv読み込み
  console.log(request.files);
  // アップロードファイルは request.files に設定されます.
  //debugF(request.files);
  //一時保存場所からcsv読み込み
  const tran = await beginTran();
  try {
    const csv = fs.readFileSync(request.files.file1.path, 'utf-8');
    const records = parse.parse(csv, {
      columns: false,
    });
    //console.log(records);
  } catch (e) {
    console.log(e);
  }

  //SQL書き込み処理
  try {
    //比較用のmakers
    let exist_maker = executeQuery('SELECT maker_name FROM makers');
    //比較用のcars
    let exist_car = executeQuery('SELECT car_name FROM cars');
    //INSERTフラグ
    let in_flag = 1;

    for (let i = 1; i < records.length; i++) {
      console.log(records[i]);
      //存在チェック:makers
      for (let j = 0; j < exist_maker.length; j++) {
        if (exist_maker[j] === records[i][1]) {
          in_flag = 0;
        }
      }
      if (in_flag === 1) {
        try {
          await tran.query('INSERT INTO makers(maker_name) VALUE (?)', [records[i][1]]);
          await tran.commit();
          let exist_maker = executeQuery('SELECT maker_name FROM makers');
          res.end('OK');
        } catch (e) {
          await tran.rollback();
          next(e);
        }
      }
      //最終的にINSERTするmaker_idを取得
      let maker_id = executeQuery('SELECT maker_id FROM makers WHERE makers_name = ?', [
        records[i][1],
      ]);

      in_flag = 1;
      //存在チェック:makers:cars
      for (let j = 0; j < exist_maker.length; j++) {
        if (exist_car[j] === records[i][0]) {
          in_flag = 0;
        }
      }
      if (in_flag === 1) {
        try {
          await tran.query('INSERT INTO cars(car_name, maker_id) VALUE (?, ?)', [
            records[i][0],
            maker_id,
          ]);
          await tran.commit();
          let exist_car = executeQuery('SELECT car_name FROM cars');
        } catch (e) {
          await tran.rollback();
          next(e);
        }
      }
      //最終的にINSERTするcar_idを取得
      let car_id = executeQuery('SELECT car_id FROM cars WHERE cars_name = ?', [records[i][0]]);

      //最終的に実行するINSERT文
      try {
        await tran.query(
          'INSERT INTO carstocks(car_id, car_state, arrival_price) VALUES(?, ?, ?)',
          [car_id, records[i][3], records[i][2]],
        );
        await tran.commit();
        res.end('OK');
      } catch (e) {
        await tran.rollback();
        next(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
  response.sendStatus(200);
});

module.exports = app;

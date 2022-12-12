/* eslint-disable global-require */
const formData = require('express-form-data');
const fs = require('fs');
const parse = require('csv-parse/sync');
const debugF = require('debug')('http:files');
const debug = require('debug')('http:body');
const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
let exist_maker;
let exist_car;
let list = [];

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// ファイルアップロードに利用.
router.use(
  formData.parse({ uploadDir: path.join(__dirname, '../../../src/upload'), autoClean: true }),
);
// これを指定すると、サイズが0のファイルはfilesから削除してくれる
router.use(formData.format());
/**
 * 車両管理 router + controller
 *
 */
/** resに渡す情報とSQLモジュールの読み込み */
const { executeQuery, beginTran } = require('../../module/mysqlPool');
const { httpRapper } = require('../../common/httpRapper');
const { error } = require('console');

/** 車両一覧表示 */
router.get('/', async (req, res, next) => {
  /** resに渡す情報とSQLモジュールの読み込み */
  const resInfo = httpRapper(req);
  //console.log("OK");
  try {
    /** ここに処理を記述 */
    resInfo.sql = await executeQuery(
      'SELECT cars.car_name, mk.maker_name, carst.stock_id, carst.car_state, carst.arrival_time, carst.arrival_price, op.aircon, op.powerstee, op.powerwidou, op.centraldoor, op.abs, op.airback, op.ETC, op.keyless, op.smartkey, op.cd, op.md, op.dvd, op.tv, op.navi, op.backcamera, op.autodoor, op.sunroof, op.leather, op.aero, op.alumi, op.esc, op.tractioncon, op.coldareas, op.welfare, op.lowdown, op.nosmoking, op.pet, op.exclusive, op.confirmation, op.instruction, op.newguarantee, op.spare FROM `carstocks` AS carst INNER JOIN cars ON cars.car_id = carst.car_id INNER JOIN makers AS mk ON cars.maker_id = mk.maker_id INNER JOIN options AS op ON op.stock_id = carst.stock_id ORDER BY stock_id ASC',
    );
    //debug(resInfo.sql);
    res.render('carStocksManagement.ejs', { ejsRender: resInfo });
  } catch (err) {
    next(err);
  }
});

/** 新規登録 (csv) */
router.post('/', async (request, response) => {
  console.log(request.files);
  const resInfo = httpRapper(request);
  // アップロードファイルは request.files に設定されます.
  //debugF(request.files);
  let records = [];
  //一時保存場所からcsv読み込み
  try {
    const csv = fs.readFileSync(request.files.file.path, 'utf-8');
    records = parse.parse(csv, {
      columns: false,
    });
    //console.log(records);
  } catch (e) {
    console.log(e);
  }
  //SQL書き込み処理
  try {
    //比較用のmakers
    await executeQuery('SELECT maker_name FROM makers').then((sql) => {
      //console.log(sql);
      exist_maker = sql;
    });
    //比較用のcars
    await executeQuery('SELECT car_name FROM cars').then((sql) => {
      //console.log(sql);
      exist_car = sql;
    });
    //INSERTフラグ
    let in_flag = 1;

    for (let i = 1; i < records.length; i++) {
      //console.log(records[i]);
      //存在チェック:makers
      for (let j = 0; j < exist_maker.length; j++) {
        if (exist_maker[j]['maker_name'] === records[i][1]) {
          in_flag = 0;
        }
      }
      if (in_flag === 1) {
        const tran = await beginTran();
        await tran
          .query('INSERT INTO makers(maker_name) VALUE (?)', [records[i][1]])
          .then(async (date) => {
            await tran.commit();
          });
        await executeQuery('SELECT maker_name FROM makers').then((sql) => {
          exist_maker = sql;
        });
      }

      //最終的にINSERTするmaker_idを取得
      await executeQuery('SELECT maker_id FROM makers WHERE maker_name = ?', [records[i][1]]).then(
        (sql) => {
          maker_id = sql;
        },
      );
      in_flag = 1;
      //存在チェック:cars
      for (let j = 0; j < exist_car.length; j++) {
        if (exist_car[j]['car_name'] === records[i][0]) {
          in_flag = 0;
        }
      }
      if (in_flag === 1) {
        const tran = await beginTran();
        await executeQuery('INSERT INTO cars(car_name, maker_id) VALUE (?, ?)', [
          records[i][0],
          maker_id[0]['maker_id'],
        ]).then(async (date) => {
          await tran.commit();
        });
        await executeQuery('SELECT car_name FROM cars').then((sql) => {
          //console.log(sql);
          exist_car = sql;
        });
      }
      //最終的にINSERTするcar_idを取得
      await executeQuery('SELECT car_id FROM cars WHERE car_name = ?', [records[i][0]]).then(
        (sql) => {
          car_id = sql;
        },
      );
      //最終的に実行するINSERT文
      const sql =
        'INSERT INTO carstocks(car_id, car_state, arrival_price) VALUES(' +
        car_id[0]['car_id'] +
        ',' +
        records[i][3] +
        ',' +
        records[i][2] +
        ')';
      console.log(sql);
      const tran = await beginTran();
      await executeQuery(
        'INSERT INTO carstocks(car_id, car_state, arrival_price) VALUES(?, ?, ?)',
        [car_id[0]['car_id'], records[i][3], records[i][2]],
      )
        .then(async (result) => {
          console.log(result.insertId);
          await tran.commit().then(async () => {
            console.log('this');
          });
        })
        .catch((error) => {
          throw new ERROR(error);
        });
    }
  } catch (error) {
    console.log(error);
  }
  response.redirect(301, '/admin/carStocks');
});

/** 更新処理 (form) */
router.post('/update', async (req, res, next) => {
  /** resに渡す情報とSQLモジュールの読み込み **/
  let records = '';
  records = req.body;
  console.log('update');
  //console.log(records);
  const tran = beginTran();

  //比較用のmakers
  await executeQuery('SELECT maker_name FROM makers').then((sql) => {
    //console.log(sql);
    exist_maker = sql;
  });
  //比較用のcars
  await executeQuery('SELECT car_name FROM cars').then((sql) => {
    //console.log(sql);
    exist_car = sql;
  });
  //INSERTフラグ
  let in_flag = 1;
  //console.log(records[i]);
  //存在チェック:makers
  for (let j = 0; j < exist_maker.length; j++) {
    if (exist_maker[j]['maker_name'] === records.maker_name) {
      in_flag = 0;
    }
  }
  if (in_flag === 1) {
    const tran = beginTran();
    await executeQuery('INSERT INTO makers(maker_name) VALUE (?)', [records.maker_name]).then(
      async (date) => {
        await tran.commit();
      },
    );
    await executeQuery('SELECT maker_name FROM makers').then((sql) => {
      exist_maker = sql;
    });
  }
  //最終的にUPDATEするmaker_idを取得
  await executeQuery('SELECT maker_id FROM makers WHERE maker_name = ?', [records.maker_name]).then(
    (sql) => {
      maker_id = sql;
    },
  );
  //console.log(records[i][1]);

  in_flag = 1;

  //存在チェック:cars
  for (let j = 0; j < exist_car.length; j++) {
    if (exist_car[j]['car_name'] === records.car_name) {
      in_flag = 0;
    }
  }
  if (in_flag === 1) {
    //const tran = beginTran();
    await executeQuery('INSERT INTO cars(car_name, maker_id) VALUE (?, ?)', [
      records.car_name,
      maker_id[0]['maker_id'],
    ]).then(async (date) => {
      await tran.commit();
    });
    await executeQuery('SELECT car_name FROM cars').then((sql) => {
      //console.log(sql);
      exist_car = sql;
    });
  }
  //最終的にUPDATEするcar_idを取得
  //console.log(records[i][0] + "xxxx");
  await executeQuery('SELECT car_id FROM cars WHERE car_name = ?', [records.car_name]).then(
    (sql) => {
      car_id = sql;
    },
  );
  list = car_id[0]['car_id'];

  //更新処理
  if (records.aircon) {
    records.aircon = 1;
  } else {
    records.aircon = 0;
  }
  if (records.powerstee) {
    records.powerstee = 1;
  } else {
    records.powerstee = 0;
  }
  if (records.powerwidou) {
    records.powerwidou = 1;
  } else {
    records.powerwidou = 0;
  }
  if (records.centraldoor) {
    records.centraldoor = 1;
  } else {
    records.centraldoor = 0;
  }
  if (records.abs) {
    records.abs = 1;
  } else {
    records.abs = 0;
  }
  if (records.airback) {
    records.airback = 1;
  } else {
    records.airback = 0;
  }
  if (records.ETC) {
    records.ETC = 1;
  } else {
    records.ETC = 0;
  }
  if (records.keyless) {
    records.keyless = 1;
  } else {
    records.keyless = 0;
  }
  if (records.smartkey) {
    records.smartkey = 1;
  } else {
    records.smartkey = 0;
  }
  if (records.cd) {
    records.cd = 1;
  } else {
    records.cd = 0;
  }
  if (records.md) {
    records.md = 1;
  } else {
    records.md = 0;
  }
  if (records.dvd) {
    records.dvd = 1;
  } else {
    records.dvd = 0;
  }
  if (records.tv) {
    records.tv = 1;
  } else {
    records.tv = 0;
  }
  if (records.navi) {
    records.navi = 1;
  } else {
    records.navi = 0;
  }
  if (records.backcamera) {
    records.backcamera = 1;
  } else {
    records.backcamera = 0;
  }
  if (records.autodoor) {
    records.autodoor = 1;
  } else {
    records.autodoor = 0;
  }
  if (records.sunroof) {
    records.sunroof = 1;
  } else {
    records.sunroof = 0;
  }
  if (records.leather) {
    records.leather = 1;
  } else {
    records.leather = 0;
  }
  if (records.aero) {
    records.aero = 1;
  } else {
    records.aero = 0;
  }
  if (records.alumi) {
    records.alumi = 1;
  } else {
    records.alumi = 0;
  }
  if (records.esc) {
    records.esc = 1;
  } else {
    records.esc = 0;
  }
  if (records.tractioncon) {
    records.tractioncon = 1;
  } else {
    records.tractioncon = 0;
  }
  if (records.coldareas) {
    records.coldareas = 1;
  } else {
    records.coldareas = 0;
  }
  if (records.welfare) {
    records.welfare = 1;
  } else {
    records.welfare = 0;
  }
  if (records.lowdown) {
    records.lowdown = 1;
  } else {
    records.lowdown = 0;
  }
  if (records.nosmoking) {
    records.nosmoking = 1;
  } else {
    records.nosmoking = 0;
  }
  if (records.pet) {
    records.pet = 1;
  } else {
    records.pet = 0;
  }
  if (records.exclusive) {
    records.exclusive = 1;
  } else {
    records.exclusive = 0;
  }
  if (records.confirmation) {
    records.confirmation = 1;
  } else {
    records.confirmation = 0;
  }
  if (records.instruction) {
    records.instruction = 1;
  } else {
    records.instruction = 0;
  }
  if (records.newguarantee) {
    records.newguarantee = 1;
  } else {
    records.newguarantee = 0;
  }
  if (records.spare) {
    records.spare = 1;
  } else {
    records.spare = 0;
  }
  try {
    const tran = await beginTran();
    await executeQuery(`UPDATE carstocks SET car_id=?, car_state=? WHERE stock_id=?`, [
      car_id[0]['car_id'],
      records.car_state,
      records.stock_id,
    ]);
    await executeQuery(
      `UPDATE options SET aircon=?, powerstee=?, powerwidou=?, centraldoor=?, abs=?, airback=?, ETC=?, keyless=?, smartkey=?, cd=?, md=?, dvd=?, tv=?, navi=?, backcamera=?, autodoor=?, sunroof=?, leather=?, aero=?, alumi=?, esc=?, tractioncon=?, coldareas=?, welfare=?, lowdown=?, nosmoking=?, pet=?, exclusive=?, confirmation=?, instruction=?, newguarantee=?, spare=? WHERE stock_id=?`,
      [
        records.aircon,
        records.powerstee,
        records.powerwidou,
        records.centraldoor,
        records.abs,
        records.airback,
        records.ETC,
        records.keyless,
        records.smartkey,
        records.cd,
        records.md,
        records.dvd,
        records.tv,
        records.navi,
        records.backcamera,
        records.autodoor,
        records.sunroof,
        records.leather,
        records.aero,
        records.alumi,
        records.esc,
        records.tractioncon,
        records.coldareas,
        records.welfare,
        records.lowdown,
        records.nosmoking,
        records.pet,
        records.exclusive,
        records.confirmation,
        records.instruction,
        records.newguarantee,
        records.spare,
        records.stock_id,
      ],
    );
    // throw new Error("エラーテスト");
    await tran.commit();
    res.end('OK');
  } catch (err) {
    await tran.rollback();
    next(err);
  }
});

/** 更新処理 (form) */
router.post('/:car', async (req, res, next) => {
  /** resに渡す情報とSQLモジュールの読み込み **/
  const tran = await beginTran();
  try {
    await tran.query(
      `UPDATE user_tbl
      SET card_number=?, card_key=?, user_state=?
      WHERE user_id=?`,
      [3540000000000001, 555, 1, 1],
    );
    // throw new Error("エラーテスト");
    await tran.commit();
    res.end('OK');
  } catch (err) {
    await tran.rollback();
    next(err);
  }
});

module.exports = router;

//curl -X POST -F file1=@/c/xampp/htdocs/carオークション/IW31auction/client/csv/test.csv http://localhost:9000/send-form-data
//curl -X POST -F file1=@/c/xampp/htdocs/carオークション/IW31auction/public/img/top.jpg http://localhost:9000/send-form-data
//npm run dev：起動

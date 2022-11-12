import fetch from 'node-fetch'

const URL = 'http://localhost:180/IW13auction/temp/helloworld.php';

function myConsole(args) {
  console.log(args);
};
function myConsoleError(err) {
  console.error(err);
};

fetch(URL)
  .then(res => {
    console.log("test");
    if (!res.ok) {
      // 200 系以外のレスポンスはエラーとして処理
      throw new Error(`${res.status} ${res.statusText}`);
    }
    return res.text();
  })
  // これがレスポンス本文のテキスト
  .then(text => myConsole(text))
  // エラーはここでまとめて処理
  .catch(err => myConsoleError(err));
const nodemailer = require('nodemailer');
//
// SMTP の設定
//
const options = {
  host: process.env.SMTP_HOST, // メールサーバー
  port: process.env.SMTP_PORT, // ポート番号 25 など(gmailは587)
  secure: false, // 465 番ポートを使う場合。それ以外は false
  requireTLS: false,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    // 認証情報
    user: process.env.SMTP_USER, // ユーザー名
    pass: process.env.SMTP_PASS, // アプリ生成パスワード（①googleアカウント→②セキュリティ→③アプリパスワードを作成→④メール、(macかwindows)か選択し生成）
  },
};

// メールメッセージ

const mails = {
  from: 'ookinaki12@gmail.com', // 送信元メールアドレス
  to: 'ookinaki12@gmail.com', // 送信先メールアドレス
  subject: 'Email Test Mail',
  text: `Email was sent!`,
  html: `<p>Email was sent!</p>`,
};

//
// メールの送信
//

async function sendMail(option, mail) {
  try {
    const transport = nodemailer.createTransport(option);
    const result = await transport.sendMail(mail);
    console.log('+++ Sent +++');
    console.log(result);
  } catch (err) {
    console.log('--- Error ---');
    console.log(err);
  }
}

sendMail(options, mails);

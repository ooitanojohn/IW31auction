const nodemailer = require('nodemailer');
const debug = require('debug')('http:mail');
require('dotenv').config();
/**
 *  SMTP の設定
 */
/** 引数中身　例 */

// メールメッセージ
/** 引数中身　例 */
// const mails = {
//   from: process.env.SMTP_USER, // 送信元メールアドレス
//   to: process.env.SMTP_USER, // 送信先メールアドレス
//   subject: 'Email Test Mail',
//   text: `Email was sent!`,
//   html: `<p>Email was sent!</p>`,
// };

//
// メールの送信
//

async function sendMail(mail) {
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
  try {
    const transport = nodemailer.createTransport(options);
    const result = await transport.sendMail(mail);
    debug('+++ Sent +++');
    debug(result);
  } catch (err) {
    debug('--- Error ---');
    debug(err);
  }
}

module.exports = { sendMail };

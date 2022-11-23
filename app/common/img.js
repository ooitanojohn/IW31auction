/** img */
/** sh curl -X POST -F file1=@/c/xampp/htdocs/IW31auction/IW31auction/public/img/top.jpg http://localhost:9000/send-form-data */
// eslint-disable-next-line import/order
const formData = require('express-form-data');

// ファイルアップロードに利用.
app.use(formData.parse({ uploadDir: path.join(__dirname, '../src/upload'), autoClean: true }));
// これを指定すると、サイズが0のファイルはfilesから削除してくれる
app.use(formData.format());

app.post('/send-form-data', (request, response) => {
  // アップロードファイルは request.files に設定されます.
  debug(request.files);
  // フォームの値は request.body に設定されます.
  debug(request.body);
  /** csv保存 */
  /** 中身を見て SQL書き込み */
  /**  */
  response.sendStatus(200);
});

for (let name of Object.keys(request.files)) {
  const file = request.files[name];
  const bytes = fs.readFileSync(file.path);
  const filepath = path.join(__dirname, 'public', 'pdf', file.originalFilename);
  fs.writeFileSync(filepath, bytes);
}

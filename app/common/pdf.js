function pdfmake(fileName, data) {
  //htmlpass:html化するファイル名、fileName:pdf化したファイル名

  var pdf = require('html-pdf');
  // var handlebars = require("handlebars");
  // var fs = require("fs");
  // var fsfile = fs.readFileSync(__dirname + htmlPass, 'utf-8')

  // console.log(fsfile);
  const createPdf = (task, event) => {
    //文字列をHTML化
    const htmlString = `<!DOCTYPE html>
         <html lang="en">
         <head>
             <meta charset="UTF-8">
             <meta http-equiv="X-UA-Compatible" content="IE=edge">
             <meta name="viewport" content="width=device-width, initial-scale=1.0">
             <title>Document</title>
         </head>
         <body>
             <main>
                 <a href="">${data}</a>
             </main>
         </body>
         </html>`;
    // const html = handlebars.compile(htmlString);
    console.log();
    const filePath = fileName;
    pdf.create(htmlString).toFile(filePath, (err, res) => {
      if (err) {
        console.error(err);
      }
      console.log(res);
      return res;
    });
  };

  const start = () => {
    createPdf();
  };
  start();
}
pdfmake('./test2.pdf', 'bbb');

//車両管理と出品管理PDF化引数htmlファイルをPDFか

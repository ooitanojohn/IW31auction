# auction site 作成

## [ファイル構成](https://gist.github.com/mitsuruog/fc48397a8e80f051a145)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

### インストール
npm i

### 鯖起動
npm run dev

### 変数はconsoleでなくdebug();で出す
```
const debug= require("debug")("http:作成した処理");
debug("確認したい変数");

例)
const debug = require('debug')('http:mail');
debug(メール送信の結果)
```
consoleにhttp:mailの文字が先頭に出力されるため何が怪しいかわかりやすい

### 構文チェック (git cm とかで怒られてどれ怒られたかわからなかったらやって)
npm run lint

### 構文をよしなに修正 (怒られたけど直し方分からんかったらやって やった後動作確認してね)
npm run fix

### フォーマット (ejsはvscodeの拡張いいの知らないので逆に教えてください... これでformatするとejsもよしなになるよ)
npm run format

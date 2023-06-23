# auction site 作成

## [ファイル構成](https://gist.github.com/mitsuruog/fc48397a8e80f051a145)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

### インストール
MySQL 8.0
```
create database auction;
mysql -u root -p auction < auction.sql
```
node
```
npm i
```
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
consoleに出力するものをnpm run *で切り替えられる

### 構文チェック 
npm run lint

### 構文修正
npm run fix

### フォーマット
npm run format

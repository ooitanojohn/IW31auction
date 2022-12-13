-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- ホスト: 127.0.0.1:3308
-- 生成日時: 2022-12-12 01:16:53
-- サーバのバージョン： 10.4.19-MariaDB
-- PHP のバージョン: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `auction`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `biddings`
--

CREATE TABLE `biddings` (
  `user_id` int(10) NOT NULL,
  `product_id` int(5) NOT NULL,
  `bidding_money` int(11) NOT NULL,
  `bidding_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='入札履歴が格納されたテーブル';

--
-- テーブルのデータのダンプ `biddings`
--

INSERT INTO `biddings` (`user_id`, `product_id`, `bidding_money`, `bidding_time`) VALUES
(1, 1, 900000, '2022-11-18 21:52:23'),
(1, 1, 980000, '2022-11-18 21:54:41'),
(1, 4, 50000, '2022-11-18 21:57:48'),
(2, 1, 950000, '2022-11-18 21:53:02'),
(3, 4, 90000, '2022-11-18 21:56:10'),
(5, 5, 900000, '2022-11-18 21:59:27'),
(17, 1, 1006600, '2022-12-06 19:33:41'),
(36, 1, 1014300, '0000-00-00 00:00:00'),
(36, 1, 1000300, '2022-12-06 14:05:06'),
(36, 1, 1000500, '2022-12-06 14:05:08'),
(36, 1, 1000900, '2022-12-06 14:05:09'),
(36, 1, 1001100, '2022-12-06 14:05:11'),
(36, 1, 1001500, '2022-12-06 14:05:23'),
(36, 1, 1001900, '2022-12-06 14:05:24'),
(36, 1, 1002300, '2022-12-06 14:05:26'),
(36, 1, 1002700, '2022-12-06 14:05:28'),
(36, 1, 1002800, '2022-12-06 14:58:01'),
(36, 1, 1003000, '2022-12-06 14:58:04'),
(36, 1, 1003300, '2022-12-06 14:58:05'),
(36, 1, 1003600, '2022-12-06 14:58:07'),
(36, 1, 1003900, '2022-12-06 15:04:37'),
(36, 1, 1004200, '2022-12-06 15:04:41'),
(36, 1, 1004300, '2022-12-06 15:32:35'),
(36, 1, 1004400, '2022-12-06 15:32:36'),
(36, 1, 1004500, '2022-12-06 15:32:37'),
(36, 1, 1004700, '2022-12-06 16:26:18'),
(36, 1, 1005100, '2022-12-06 16:26:20'),
(36, 1, 1005600, '2022-12-06 16:26:22'),
(36, 1, 1005900, '2022-12-06 16:40:06'),
(36, 1, 1006200, '2022-12-06 16:40:08'),
(36, 1, 1006500, '2022-12-06 16:40:09'),
(36, 1, 1006800, '2022-12-06 19:35:49'),
(36, 1, 1006900, '2022-12-06 19:35:55'),
(36, 1, 1007200, '2022-12-06 22:22:49'),
(36, 1, 1007200, '2022-12-06 22:22:52'),
(36, 1, 1007400, '2022-12-06 22:31:00'),
(36, 1, 1007600, '2022-12-06 22:31:55'),
(36, 1, 1007800, '2022-12-06 22:32:23'),
(36, 1, 1008000, '2022-12-06 22:39:23'),
(36, 1, 1008200, '2022-12-06 22:44:34'),
(36, 1, 1008500, '2022-12-06 22:44:58'),
(36, 1, 1008800, '2022-12-06 22:46:01'),
(36, 1, 1009100, '2022-12-06 22:46:30'),
(36, 1, 1009300, '2022-12-06 22:46:37'),
(36, 1, 1009500, '2022-12-06 22:49:26'),
(36, 1, 1009800, '2022-12-06 22:49:38'),
(36, 1, 1010000, '2022-12-06 22:49:46'),
(36, 1, 1010400, '2022-12-06 22:51:18'),
(36, 1, 1010800, '2022-12-06 23:00:27'),
(36, 1, 1011100, '2022-12-06 23:02:51'),
(36, 1, 1011400, '2022-12-06 23:02:53'),
(36, 1, 1011700, '2022-12-06 23:02:55'),
(36, 1, 1012000, '2022-12-06 23:03:25'),
(36, 1, 1012300, '2022-12-06 23:03:27'),
(36, 1, 1012700, '2022-12-06 23:03:30'),
(36, 1, 1013000, '2022-12-06 23:03:40'),
(36, 1, 1013500, '2022-12-06 23:03:53'),
(36, 1, 1013900, '2022-12-06 23:03:55'),
(36, 1, 1014410, '2022-12-07 00:10:11'),
(36, 1, 1014430, '2022-12-07 00:10:15'),
(36, 1, 1014431, '2022-12-07 00:10:16'),
(36, 1, 1014440, '2022-12-07 00:10:17'),
(36, 1, 1014530, '2022-12-07 00:10:18'),
(36, 1, 1014530, '2022-12-07 00:10:19'),
(36, 1, 1015430, '2022-12-07 00:10:20'),
(36, 1, 1014431, '2022-12-07 00:10:21'),
(36, 1, 1014431, '2022-12-07 00:10:37'),
(36, 1, 1015560, '2022-12-07 00:13:08'),
(36, 1, 1015580, '2022-12-07 00:15:30'),
(36, 1, 1015700, '2022-12-07 00:15:47'),
(36, 1, 1, '2022-12-07 00:15:49'),
(36, 1, 10, '2022-12-07 00:15:50'),
(36, 1, 100, '2022-12-07 00:15:51'),
(36, 1, 1000, '2022-12-07 00:15:52'),
(36, 1, 1015701, '2022-12-07 00:18:46'),
(36, 1, 1015710, '2022-12-07 00:18:47'),
(36, 1, 1015800, '2022-12-07 00:18:48'),
(36, 1, 1015701, '2022-12-07 00:19:25'),
(36, 1, 1015910, '2022-12-07 00:20:28'),
(36, 1, 1016800, '2022-12-07 00:20:52'),
(36, 1, 1016800, '2022-12-07 00:20:53'),
(36, 1, 1015950, '2022-12-07 00:20:58'),
(36, 1, 1016930, '2022-12-07 00:21:02'),
(36, 1, 1016810, '2022-12-07 00:21:04'),
(36, 1, 1016900, '2022-12-07 00:21:05'),
(36, 1, 1017800, '2022-12-07 00:21:07'),
(36, 1, 1017800, '2022-12-07 00:21:08'),
(36, 1, 1016801, '2022-12-07 00:21:09'),
(36, 1, 1018800, '2022-12-07 00:21:12'),
(36, 1, 1018900, '2022-12-07 00:22:13'),
(36, 1, 1018801, '2022-12-07 00:22:14'),
(36, 1, 1018801, '2022-12-07 00:22:16'),
(36, 1, 1018810, '2022-12-07 00:22:17'),
(36, 1, 1019800, '2022-12-07 00:22:18'),
(36, 1, 1020800, '2022-12-07 00:22:26'),
(36, 1, 1021800, '2022-12-07 00:23:41'),
(36, 1, 1021800, '2022-12-07 00:23:44'),
(36, 1, 1021800, '2022-12-07 00:23:45'),
(36, 1, 1021800, '2022-12-07 00:23:47'),
(36, 1, 1020801, '2022-12-07 00:23:48'),
(36, 1, 1021920, '2022-12-07 00:23:54'),
(36, 1, 1022920, '2022-12-07 00:24:13'),
(36, 1, 1022920, '2022-12-07 00:24:21'),
(36, 1, 1022020, '2022-12-07 00:24:22'),
(36, 1, 1022040, '2022-12-07 00:24:24'),
(36, 1, 1022060, '2022-12-07 00:24:30'),
(36, 1, 1021921, '2022-12-07 00:27:52'),
(36, 1, 1021930, '2022-12-07 00:27:54'),
(36, 1, 1022930, '2022-12-07 00:27:58'),
(36, 1, 1023030, '2022-12-07 00:28:01'),
(36, 1, 1024030, '2022-12-07 00:28:04'),
(36, 1, 1024130, '2022-12-07 00:28:23'),
(36, 1, 1024040, '2022-12-07 00:28:30'),
(36, 1, 1024130, '2022-12-07 00:28:31'),
(36, 1, 1, '2022-12-07 00:34:10'),
(36, 1, 10, '2022-12-07 00:34:11'),
(36, 1, 1024131, '2022-12-07 00:34:38'),
(36, 1, 1024140, '2022-12-07 00:34:39'),
(36, 1, 1024140, '2022-12-07 00:34:41');

-- --------------------------------------------------------

--
-- テーブルの構造 `cars`
--

CREATE TABLE `cars` (
  `car_id` int(5) NOT NULL,
  `car_name` varchar(11) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0 COMMENT '在庫数',
  `maker_id` int(3) NOT NULL,
  `update_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='車の情報が格納されたテーブル';

--
-- テーブルのデータのダンプ `cars`
--

INSERT INTO `cars` (`car_id`, `car_name`, `stock`, `maker_id`, `update_time`) VALUES
(1, 'イグニス', 0, 1, '2022-12-10 22:52:13'),
(2, 'プリウス', 0, 2, '2022-11-19 11:47:03'),
(3, 'シビック', 0, 3, '2022-12-10 22:52:23'),
(4, 'アルト', 0, 1, '2022-12-10 22:52:30'),
(5, 'ハスラー', 0, 1, '2022-11-19 11:47:03'),
(6, 'N-VAN', 0, 3, '2022-11-19 11:47:03'),
(7, 'N-ONE', 1, 3, '2022-12-10 23:13:14'),
(8, 'FIT', 0, 3, '2022-12-10 23:09:11'),
(9, 'CR-V', 0, 3, '2022-11-19 11:47:03');

-- --------------------------------------------------------

--
-- テーブルの構造 `carstocks`
--

CREATE TABLE `carstocks` (
  `stock_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `car_state` int(1) NOT NULL,
  `arrival_time` datetime NOT NULL DEFAULT current_timestamp() COMMENT '入荷の日時情報',
  `arrival_price` bigint(12) NOT NULL COMMENT '入荷時の値段',
  `updata_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '最終更新日時を記録'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `carstocks`
--

INSERT INTO `carstocks` (`stock_id`, `car_id`, `car_state`, `arrival_time`, `arrival_price`, `updata_time`) VALUES
(1, 1, 0, '2022-11-22 13:28:17', 600000, '2022-11-22 04:29:18'),
(2, 1, 0, '2022-11-22 13:28:17', 800000, '2022-11-21 13:58:26'),
(3, 3, 0, '2022-11-22 13:28:17', 2499000, '2022-11-21 13:58:26'),
(4, 4, 0, '2022-11-22 13:28:17', 100000, '2022-11-21 13:58:26'),
(5, 4, 0, '2022-11-22 13:28:17', 340000, '2022-11-21 13:58:26'),
(6, 7, 7, '2022-11-22 13:28:17', 5000000, '2022-12-09 08:43:35'),
(7, 7, 10, '2022-12-11 06:58:21', 10000000, '2022-12-10 21:58:21'),
(8, 7, 6, '2022-12-11 06:58:26', 10000000, '2022-12-10 21:58:26');

-- --------------------------------------------------------

--
-- テーブルの構造 `federated_credentials`
--

CREATE TABLE `federated_credentials` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL COMMENT 'usertableの参照キー',
  `provider` text NOT NULL,
  `subject` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `federated_credentials`
--

INSERT INTO `federated_credentials` (`id`, `user_id`, `provider`, `subject`) VALUES
(2, 17, 'https://accounts.google.com', '109828483896785461183'),
(3, 18, 'https://accounts.google.com', '102503399923822661318'),
(4, 19, 'https://accounts.google.com', '101278295724639960590'),
(10, 36, 'twitter', '1269976843936923648-pqJhqNcNJxR1HSodqb4CScX4qUC46F'),
(11, 43, 'https://accounts.google.com', '113673536453048655352'),
(12, 44, 'https://accounts.google.com', '117180112826243731669'),
(13, 49, 'twitter', '1308951451712942080-qFDWq4LyxEeLHk2xMx5ifAF019dKue');

-- --------------------------------------------------------

--
-- テーブルの構造 `makers`
--

CREATE TABLE `makers` (
  `maker_id` int(3) NOT NULL,
  `maker_name` varchar(11) NOT NULL,
  `update_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='メーカーの名前が登録されたテーブル';

--
-- テーブルのデータのダンプ `makers`
--

INSERT INTO `makers` (`maker_id`, `maker_name`, `update_time`) VALUES
(1, 'スズキ株式会社', '2022-11-19 11:46:24'),
(2, 'トヨタ自動車株式会社', '2022-11-19 11:46:24'),
(3, '本田技研工業株式会社', '2022-11-19 11:46:24');

-- --------------------------------------------------------

--
-- テーブルの構造 `options`
--

CREATE TABLE `options` (
  `stock_id` int(5) NOT NULL COMMENT 'オプションテーブルの主key',
  `aircon` int(1) NOT NULL DEFAULT 0 COMMENT 'エアコン：有1/無0',
  `powerstee` int(1) NOT NULL DEFAULT 0 COMMENT 'パワーステアリング：有1/無0',
  `powerwidou` int(1) NOT NULL DEFAULT 0 COMMENT 'パワーウィンドウ：有1/無0',
  `centraldoor` int(1) NOT NULL DEFAULT 0 COMMENT '集中ドアロック：有1/無0',
  `abs` int(1) NOT NULL DEFAULT 0 COMMENT 'アンチブレーキシステム：有1/無0',
  `airback` int(1) NOT NULL DEFAULT 0 COMMENT 'エアバッグ：有1/無0',
  `ETC` int(1) NOT NULL DEFAULT 0 COMMENT 'ETC：有1/無0',
  `keyless` int(1) NOT NULL DEFAULT 0 COMMENT 'キーレスエントリー：有1/無0',
  `smartkey` int(1) NOT NULL DEFAULT 0 COMMENT 'スマートキー：有1/無0',
  `cd` int(1) NOT NULL DEFAULT 0 COMMENT 'CD：有1/無0',
  `md` int(1) NOT NULL DEFAULT 0 COMMENT 'md：有1/無0',
  `dvd` int(1) NOT NULL DEFAULT 0 COMMENT 'DVDビデオ：有1/無0',
  `tv` int(1) NOT NULL DEFAULT 0 COMMENT 'テレビ：有1/無0',
  `navi` int(1) NOT NULL DEFAULT 0 COMMENT 'ナビゲーション：有1/無0',
  `backcamera` int(1) NOT NULL DEFAULT 0 COMMENT 'バックカメラ：有1/無0',
  `autodoor` int(1) NOT NULL DEFAULT 0 COMMENT '電動スライドドア：有1/無0',
  `sunroof` int(1) NOT NULL DEFAULT 0 COMMENT 'サンルーフ：有1/無0',
  `leather` int(1) NOT NULL DEFAULT 0 COMMENT '本革シート：有1/無0',
  `aero` int(1) NOT NULL DEFAULT 0 COMMENT '純正エアロパーツ：有1/無0',
  `alumi` int(1) NOT NULL DEFAULT 0 COMMENT '純正アルミホイール：有1/無0',
  `esc` int(1) NOT NULL DEFAULT 0 COMMENT '横滑り防止装置：有1/無0',
  `tractioncon` int(1) NOT NULL DEFAULT 0 COMMENT 'トランクションコントロール：有1/無0',
  `coldareas` int(1) NOT NULL DEFAULT 0 COMMENT '寒冷地帯仕様車：有1/無0',
  `welfare` int(1) NOT NULL DEFAULT 0 COMMENT '福祉車両：有1/無0',
  `lowdown` int(1) NOT NULL DEFAULT 0 COMMENT 'ローダウン：有1/無0',
  `nosmoking` int(1) NOT NULL DEFAULT 0 COMMENT '禁煙車：有1/無0',
  `pet` int(1) NOT NULL DEFAULT 0 COMMENT 'ペット：有1/無0',
  `exclusive` int(1) NOT NULL DEFAULT 0 COMMENT '限定車：有1/無0',
  `confirmation` int(1) NOT NULL DEFAULT 0 COMMENT '試乗、現車確認可能：可1/不可0',
  `instruction` int(1) NOT NULL DEFAULT 0 COMMENT '取扱説明書：有1/無0',
  `newguarantee` int(1) NOT NULL DEFAULT 0 COMMENT '新車時保証書：有1/無0',
  `spare` int(1) NOT NULL DEFAULT 0 COMMENT 'スペアタイヤ：有1/無0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='各種オプションパーツの有無に関するテーブル';

--
-- テーブルのデータのダンプ `options`
--

INSERT INTO `options` (`stock_id`, `aircon`, `powerstee`, `powerwidou`, `centraldoor`, `abs`, `airback`, `ETC`, `keyless`, `smartkey`, `cd`, `md`, `dvd`, `tv`, `navi`, `backcamera`, `autodoor`, `sunroof`, `leather`, `aero`, `alumi`, `esc`, `tractioncon`, `coldareas`, `welfare`, `lowdown`, `nosmoking`, `pet`, `exclusive`, `confirmation`, `instruction`, `newguarantee`, `spare`) VALUES
(1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0),
(2, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0),
(3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0),
(5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- テーブルの構造 `products`
--

CREATE TABLE `products` (
  `product_id` int(5) NOT NULL,
  `car_id` int(5) NOT NULL,
  `stock_id` int(11) NOT NULL,
  `start_price` int(11) NOT NULL,
  `asking_price` int(11) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime DEFAULT NULL,
  `user_id` int(10) NOT NULL COMMENT '落札者',
  `car_img` varchar(100) DEFAULT NULL,
  `product_state` int(1) NOT NULL DEFAULT 0 COMMENT '0=出品前\r\n1=出品中\r\n2=購入権取得\r\n3=入金済み',
  `update_time` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='オークション商品の情報が格納されたテーブル';

--
-- テーブルのデータのダンプ `products`
--

INSERT INTO `products` (`product_id`, `car_id`, `stock_id`, `start_price`, `asking_price`, `start_time`, `end_time`, `user_id`, `car_img`, `product_state`, `update_time`) VALUES
(1, 1, 2, 800000, 1200000, '2022-11-18 00:00:00', '2022-12-09 00:00:00', 36, NULL, 2, '2022-11-18 14:06:39'),
(2, 1, 1, 600000, 900000, '2022-11-18 00:00:00', '2022-12-18 22:18:39', 3, NULL, 0, '2022-11-18 14:06:39'),
(3, 4, 5, 340000, 600000, '2022-11-18 00:00:00', '2022-12-22 20:16:04', 4, NULL, 2, '2022-11-18 14:06:39'),
(4, 4, 4, 100000, 180000, '2022-11-18 22:20:06', '2022-12-19 22:18:39', 3, NULL, 3, '2022-11-18 14:06:39'),
(5, 3, 3, 800000, 1200000, '2022-12-11 22:20:34', '2022-12-13 14:18:34', 1, NULL, 1, '2022-11-18 14:06:39'),
(6, 7, 6, 100, 340, '2022-11-18 00:00:00', '2022-12-18 00:00:00', 0, 'temp', 1, '2022-12-10 06:38:18'),
(12, 7, 7, 5000000, 10000000, '2022-12-11 09:13:00', '2022-12-11 11:13:00', 0, NULL, 1, '2022-12-10 23:13:14');

-- --------------------------------------------------------

--
-- テーブルの構造 `sales`
--

CREATE TABLE `sales` (
  `user_id` int(10) NOT NULL,
  `sales_money` int(11) NOT NULL,
  `sales_time` datetime NOT NULL,
  `product_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='購入情報が格納されたテーブル';

--
-- テーブルのデータのダンプ `sales`
--

INSERT INTO `sales` (`user_id`, `sales_money`, `sales_time`, `product_id`) VALUES
(1, 980000, '2022-11-19 23:01:37', 1),
(1, 50000, '2022-11-19 23:02:01', 4);

-- --------------------------------------------------------

--
-- テーブルの構造 `users`
--

CREATE TABLE `users` (
  `user_id` int(10) NOT NULL,
  `user_login_id` varchar(16) NOT NULL COMMENT '16文字以内に設定',
  `hashed_password` varchar(60) DEFAULT NULL,
  `user_name` varchar(16) DEFAULT NULL,
  `user_mail` varchar(100) DEFAULT NULL,
  `user_post_code` varchar(8) DEFAULT NULL,
  `user_address` varchar(32) DEFAULT NULL,
  `user_phone_number` bigint(11) UNSIGNED ZEROFILL DEFAULT NULL,
  `card_number` bigint(16) UNSIGNED ZEROFILL DEFAULT NULL,
  `card_key` int(3) DEFAULT NULL,
  `icon_img` varchar(100) DEFAULT NULL,
  `user_state` int(1) NOT NULL DEFAULT 0 COMMENT 'ユーザー存在チェック：在0/退1/垢BAN2'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='ユーザーの基本情報を格納したテーブル';

--
-- テーブルのデータのダンプ `users`
--

INSERT INTO `users` (`user_id`, `user_login_id`, `hashed_password`, `user_name`, `user_mail`, `user_post_code`, `user_address`, `user_phone_number`, `card_number`, `card_key`, `icon_img`, `user_state`) VALUES
(1, 'Tp1nTYOc', 'YJqK5NXe', '中島 治', 'nakajima922@example.org', '279-0068', '千葉県柏市つくしが丘3-1-3', 08041977509, 3540000000000000, 556, NULL, 0),
(2, 'Tp1nTYOc', 'YJqK5NXe', '中島 治', 'nakajima922@example.org', '279-0068', '千葉県柏市つくしが丘3-1-3', 08041977509, 3540000000000000, 556, NULL, 1),
(3, 'NbExpEhF', 'NWkxD63_', '天野 勇志', 'amano_yuji@example.ne.jp', '013-7721', '秋田県秋田市大町4-3-3', 09015853811, 4480000000000000, 334, NULL, 0),
(4, 'SRAuwMLY', 'JkWXKLQQ', '武部 佑介', 'takebe614@example.com', '119-2307', '東京都品川区東品川4-3-8', 07091708094, 0373000000000000, 999, NULL, 1),
(5, '6XDNf5Un', 'cZqdRO7H', '坂東 均', 'hitoshibando@example.jp126', '164-3347', '東京都千代田区神田佐久間町1-1-16', 08056783462, 5110000000000000, 126, NULL, 1),
(6, 'hgre2SYn', 'YUhSnlCs', '宮田 久美', 'miyata_925@example.jp', '108-8743', '東京都大田区大森南4-3-6', 09015661736, 0380000000000000, 564, NULL, 0),
(9, 'ooitanojohn@gmai', '$2b$10$SVFVMDJ.NQ0WlvMey7eFOeJ6b', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(10, 'ooitanojohn@gmai', '$2b$10$W0KWYGtnBOWfUi7igAA2UOy4d', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(11, 'ooitanojohn@gmai', '$2b$10$nHV7cNEAOMhgQXPBrWhZ0OYE4', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(12, 'もっち', '$2b$10$AuJHKgd35p9XWVyr4/YPfOaYd', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(14, 'admin', '$2b$10$js0dUnR9NLNk50rIYpr.Re5EnXLmgMJKuIxBfAHbw3nYvO9o2KGeC', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(17, 'auc tion', '', '', '', '', '', 00000000000, 0000000000000000, 0, NULL, 0),
(18, '新居見秀人', '', '', '', '', '', 00000000000, 0000000000000000, 0, NULL, 0),
(19, 'SYUTO NIIMI (大分の', '', '', '', '', '', 00000000000, 0000000000000000, 0, NULL, 0),
(20, 'vim_ojisan', '', '', '', '', '', 00000000000, 0000000000000000, 0, 'https://pbs.twimg.com/profile_images/1571847338137899010/-P6ahxKr_normal.jpg', 0),
(23, 'add', '', '', '', '', '', 00000000000, 0000000000000000, 0, NULL, 0),
(24, 'add', '', '', '', '', '', 00000000000, 0000000000000000, 0, NULL, 0),
(25, 'ooitanojohn@gmai', '$2b$10$O23ph3FIa70A0ohtPGW00.xKG1KmILwGDOys0gqDMCYyvzc9UksKi', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(26, 'temp', '$2b$10$yXRNmXjEOu4551spvhZyEuoP8lpYEc/e3.v0sFmrebKr8hmnzT6AC', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(27, 'ooitanojohn', '', '', '', '', '', 00000000000, 0000000000000000, 0, 'https://pbs.twimg.com/profile_images/1574805207568896000/NBdvcJ7h_normal.jpg', 0),
(28, 'qmkh733310@gmail', '$2b$10$dslfDZp1xKGUdPFY2z6Ua.l3aIxEZpN8jm9.MwJEUa1OnTJVN0SSq', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(29, 'name', '$2b$10$iJWOQOvLDHfpEWub4tjCve3yTDSFYyXH91qWyKA5VhRR0.Ro.C0Fy', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(30, 'qmkh733310@gmail', '$2b$10$wMYnbQBjGjkJu0YrYOv.O.rzIH496YIwBAoG7FDvMaEWx8DX/Dt0u', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(31, 'qmkh733310@gmail', '$2b$10$brIDrDNlCxwujALixRp.3uIp/ubJJAWeQJisLkDMgcANeTtF47zaC', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(32, 'name', '', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(33, 'ooitanojohn', '', '', '', '', '', 00000000000, 0000000000000000, 0, 'https://pbs.twimg.com/profile_images/1574805207568896000/NBdvcJ7h_normal.jpg', 0),
(34, 'ooitanojohn', '', '', '', '', '', 00000000000, 0000000000000000, 0, 'https://pbs.twimg.com/profile_images/1574805207568896000/NBdvcJ7h_normal.jpg', 0),
(35, 'ooitanojohn', '', '', '', '', '', 00000000000, 0000000000000000, 0, 'https://pbs.twimg.com/profile_images/1574805207568896000/NBdvcJ7h_normal.jpg', 0),
(36, 'test', NULL, '新居見', 'qmkh733310@gmail.com', '5620046', '箕面市桜ヶ丘1-6-41', 07022832272, 0000184434255342, 324, 'https://pbs.twimg.com/profile_images/1574805207568896000/NBdvcJ7h_normal.jpg', 1),
(37, 'name', '', '', '', '', '', 00000000000, 0000000000000000, 0, 'http://fdfd.jpg', 0),
(38, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', 0),
(39, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', 0),
(40, 'ooitanojohn', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'img.img', 0),
(41, 'fd', '', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(42, 'login', '', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(43, '秀人新居見', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(44, '新居見秀人', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(45, 'login', '', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(46, 'login', '', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(47, 'fdss', '', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(48, 'fds', '', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(49, 'vim_ojisan', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'https://pbs.twimg.com/profile_images/1571847338137899010/-P6ahxKr_normal.jpg', 0),
(50, 'test', 'fds', '', '', '', '', 00000000000, 3540000000000000, 342, '', 0),
(51, 'fds', '$2b$10$jLAhGKLjs6poNQ53XVc.y.T2yor0CNInwbbxm8W69LzeXaDMVGms2', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(52, 'fds', '$2b$10$9YQdwhHZSFSBiOh0JULuZe/N17uxsl2yuy2CexCOJPPdwocpFs9z.', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(53, 'login', '$2b$10$N5BVGmd1PExRDjp72O/z4OZShT8x3dN9NMGKOfp2z33ij0gl3e/6O', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(54, 'login', '$2b$10$SWjj2iBwm8I/SBEhOhh7KOWJV829stHKYwgbhtLhAgsYlUHeMkjRK', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(55, 'fdss', '$2b$10$O4yV/NgkupRLdjzXaqRS2e2AaU41Mt3s2mPuXv.fq1MxkczAjDPjm', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(56, 'fds', '$2b$10$Yfz6UsduIiDtcLMTVKoNu.aWKp8b3kXlNztF6cdoHlnScV7EpxWJO', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(57, 'test', '$2b$10$YpmqtHjRO4YjRVIvpvXwXe2S9KWDOvqSrzjtJyun4v.wYaOtc/6XO', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(58, 'what', '$2b$10$51WAdXl/LUZvN5CCQ/QtTesO8XwdBIYxeIs3.8B0m9y0heSDEm5Rm', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(59, 'what', '$2b$10$Pd/64pAIdAA83VDVoIBIVOOKHLbqyr0RQiRf/f9d0mnC0gPWGDR.6', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0),
(60, 'what', '$2b$10$Q.PjlrNcalaTbQx44IB3.ul52RH4Ib7myBp4LtprcfzFZgWog.VkC', '', '', '', '', 00000000000, 0000000000000000, 0, '', 0);

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `biddings`
--
ALTER TABLE `biddings`
  ADD PRIMARY KEY (`user_id`,`product_id`,`bidding_time`) USING BTREE;

--
-- テーブルのインデックス `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`car_id`);

--
-- テーブルのインデックス `carstocks`
--
ALTER TABLE `carstocks`
  ADD PRIMARY KEY (`stock_id`);

--
-- テーブルのインデックス `federated_credentials`
--
ALTER TABLE `federated_credentials`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `makers`
--
ALTER TABLE `makers`
  ADD PRIMARY KEY (`maker_id`);

--
-- テーブルのインデックス `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`stock_id`);

--
-- テーブルのインデックス `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- テーブルのインデックス `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`product_id`);

--
-- テーブルのインデックス `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- ダンプしたテーブルの AUTO_INCREMENT
--

--
-- テーブルの AUTO_INCREMENT `cars`
--
ALTER TABLE `cars`
  MODIFY `car_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- テーブルの AUTO_INCREMENT `carstocks`
--
ALTER TABLE `carstocks`
  MODIFY `stock_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- テーブルの AUTO_INCREMENT `federated_credentials`
--
ALTER TABLE `federated_credentials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- テーブルの AUTO_INCREMENT `makers`
--
ALTER TABLE `makers`
  MODIFY `maker_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- テーブルの AUTO_INCREMENT `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- テーブルの AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

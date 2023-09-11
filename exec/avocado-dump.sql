-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 13.125.211.176    Database: avocado
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `broadcast`
--

DROP TABLE IF EXISTS `broadcast`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `broadcast` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `introduce` varchar(255) NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `start_at` datetime(6) DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `broadcast`
--

LOCK TABLES `broadcast` WRITE;
/*!40000 ALTER TABLE `broadcast` DISABLE KEYS */;
INSERT INTO `broadcast` VALUES (1,'11시에 시작합니다',NULL,'ses_HIBZxaFqbI','2023-08-17 19:50:00.000000',_binary '\0','오전 방송'),(2,'이가격에 이거 못구합니다',NULL,'ses_RNfYSuYXsR','2023-08-17 13:00:00.000000',_binary '\0','아내몰래 산 가전제품'),(3,'안경 판매',NULL,'ses_BuuZWfxkwL','2023-08-18 00:02:00.000000',_binary '\0','안경 판매합니다'),(4,'텀블러 및 상품권 판매',NULL,'ses_LhlqObWz4F','2023-08-18 00:39:00.000000',_binary '','텀블러 및 상품권 판매'),(5,'test',NULL,'ses_EKr57Cv7Pc','2023-08-18 00:43:00.000000',_binary '','test1'),(6,'test2',NULL,'ses_Cp07RhS9Cl','2023-08-18 00:45:00.000000',_binary '','test2'),(7,'텀블러 판매',NULL,'ses_Vz2o4r0WB5','2023-08-18 01:07:00.000000',_binary '','텀블러 판매'),(8,'test',NULL,'ses_IEL9Bkxs5p','2023-08-17 01:15:00.000000',_binary '\0','test'),(9,'텀블러 판매',NULL,'ses_GT1uDBmpY5','2023-08-17 01:20:00.000000',_binary '\0','텀블러 판매');
/*!40000 ALTER TABLE `broadcast` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `hope_price` int NOT NULL,
  `instant_price` int NOT NULL DEFAULT '0',
  `item_status` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpuyun1nwd8fupsib8ekn7vrpm` (`member_id`),
  CONSTRAINT `FKpuyun1nwd8fupsib8ekn7vrpm` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,'2023-08-17 10:54:44.095558','2023-08-17 10:55:13.076224',NULL,'',900000,0,'REJECT','골드바 3돈 팝니다','','NORMAL',5),(2,'2023-08-17 10:55:36.887653','2023-08-17 11:05:18.174409','HANDICRAFT','골드바 3돈 판매합니다. 현재가 가장 저가에요. 지금 사시면 개이득!!',50000,0,'SUCCESS','닌텐도 스위치 판매합니다','','LIVE',5),(3,'2023-08-17 10:55:45.997297','2023-08-17 11:09:45.681985','ELECTRONICS','3일 사용하고 와이프한테 걸려서 판매합니다. 비싸게 안팔아오면 3달 용돈 끊는다고 하네요... 도와주세요 형님들...\n제품은 정말 좋습니다 ! 보증할게요!!',50000,0,'SUCCESS','닌텐도 스위치 판매합니다','','LIVE',5),(4,'2023-08-17 10:56:13.898274','2023-08-17 10:58:17.310749','PETSUPPLIES','3일 사용하고 와이프한테 걸려서 판매합니다. 비싸게 안팔아오면 3달 용돈 끊는다고 하네요... 도와주세요 형님들...\n제품은 정말 좋습니다 ! 보증할게요!!',30000,0,'APPROVE','강아지 옷 팔아요~~~','','LIVE',5),(5,'2023-08-17 10:56:21.715327','2023-08-17 10:58:21.191908',NULL,'',20000,0,'REJECT','싸탈 1회권','','LIVE',1),(6,'2023-08-17 10:56:40.543283','2023-08-17 10:58:40.984869',NULL,'강아지가 커져서 못입히는 옷 판매합니다\\~\\~ 소형견, 중현견까지 입일 수 있어요. 사용감이 조금 있지만 모두 명품입니다. 우리 아이들을 위해 소비해주세요\\~',35000,0,'REJECT','키보드 판매','','LIVE',5),(7,'2023-08-17 10:56:55.022792','2023-08-17 11:07:29.189545','ELECTRONICS','갈축, 바나나축 등 키보드 대량판매합니다. 거의 새제품이에요. 사시면 무조건 이득!',35000,0,'SUCCESS','키보드 판매','','LIVE',5),(8,'2023-08-17 10:57:15.677565','2023-08-17 10:58:23.920176',NULL,'',500,0,'REJECT','연아의 햅틱','','LIVE',3),(9,'2023-08-17 10:57:20.311429','2023-08-17 10:59:27.628208',NULL,'갈축, 바나나축 등 키보드 대량판매합니다. 거의 새제품이에요. 사시면 무조건 이득!',25000,0,'REJECT','저희 어머님이 만드신 수제 과일청 판매합니다.','','LIVE',5),(10,'2023-08-17 10:57:25.029319','2023-08-17 10:59:35.572390','HANDICRAFT','60년 손맛의 장인이신 저희 어머니가 만든 \n포도청, 레몬청, 유자청, 복숭아청, 복분자청 팝니다. 한번 맛본 사람은 절대 못잊는 그맛입니다.',25000,0,'APPROVE','저희 어머님이 만드신 수제 과일청 판매합니다.','','LIVE',5),(11,'2023-08-17 10:58:53.650825','2023-08-17 10:59:42.708846',NULL,'60년 손맛의 장인이신 저희 어머니가 만든 \n포도청, 레몬청, 유자청, 복숭아청, 복분자청 팝니다. 한번 맛본 사람은 절대 못잊는 그맛입니다.',30000,0,'REJECT','강아지 옷 팔아요~~~','','LIVE',5),(12,'2023-08-17 10:59:00.548373','2023-08-17 11:12:15.894010','PETSUPPLIES','강아지가 커져서 못입히는 옷 판매합니다\\~\\~ 소형견, 중현견까지 입일 수 있어요. 사용감이 조금 있지만 모두 명품입니다. 우리 아이들을 위해 소비해주세요\\~',30000,0,'ASSIGN','강아지 옷 팔아요~~~','','NORMAL',5),(13,'2023-08-17 10:59:24.508328','2023-08-17 11:12:32.969638',NULL,'강아지가 커져서 못입히는 옷 판매합니다\\~\\~ 소형견, 중현견까지 입일 수 있어요. 사용감이 조금 있지만 모두 명품입니다. 우리 아이들을 위해 소비해주세요\\~',30000,0,'REJECT','키보드 판매','','NORMAL',5),(14,'2023-08-17 10:59:32.175786','2023-08-17 11:13:29.395164','ELECTRONICS','갈축, 바나나축 등 키보드 대량판매합니다. 거의 새제품이에요. 사시면 무조건 이득!',30000,0,'ASSIGN','키보드 판매','','NORMAL',5),(15,'2023-08-17 11:00:09.783510','2023-08-17 11:12:56.927045','CLOTHES','이거 꼭 올려주세요 사람들에게 공개해야 합니다 !!',20000,0,'APPROVE','영상 제작하자고 이사람들아','','LIVE',1),(16,'2023-08-17 11:11:57.332401','2023-08-17 11:13:01.280683',NULL,'',8000,0,'REJECT','노말용','','NORMAL',1),(17,'2023-08-17 11:12:12.060641','2023-08-17 11:13:53.417291','HANDICRAFT','',900000,0,'ASSIGN','골드바 3돈 팝니다','','NORMAL',5),(18,'2023-08-17 11:13:10.292028','2023-08-17 11:14:14.838542',NULL,'골드바 3돈 판매합니다. 현재가 가장 저가에요. 지금 사시면 개이득!!',150000,0,'REJECT','닌텐도 스위치 판매합니다','','NORMAL',5),(19,'2023-08-17 11:13:42.039045','2023-08-17 11:14:06.958546',NULL,'3일 사용하고 와이프한테 걸려서 판매합니다. 비싸게 안팔아오면 3달 용돈 끊는다고 하네요... 도와주세요 형님들...\n제품은 정말 좋습니다 ! 보증할게요!!',25000,0,'REJECT','저희 어머님이 만드신 수제 과일청 판매합니다.','','NORMAL',5),(20,'2023-08-17 11:14:08.975187','2023-08-17 11:15:33.956047','HANDICRAFT','60년 손맛의 장인이신 저희 어머니가 만든 \n포도청, 레몬청, 유자청, 복숭아청, 복분자청 팝니다. 한번 맛본 사람은 절대 못잊는 그맛입니다.',25000,0,'ASSIGN','저희 어머님이 만드신 수제 과일청 판매합니다.','','NORMAL',5),(21,'2023-08-17 11:15:35.133645','2023-08-17 15:01:34.593232',NULL,'60년 손맛의 장인이신 저희 어머니가 만든 \n포도청, 레몬청, 유자청, 복숭아청, 복분자청 팝니다. 한번 맛본 사람은 절대 못잊는 그맛입니다.',150000,0,'REJECT','닌텐도 스위치 판매합니다','','NORMAL',5),(22,'2023-08-17 11:20:51.164660','2023-08-17 15:01:37.735961',NULL,'',2000,0,'REJECT','asd','','NORMAL',1),(23,'2023-08-17 13:32:03.362435','2023-08-17 15:02:29.711088','ELECTRONICS','',100000,0,'ASSIGN','그래픽카드 미개봉 중고 팝니다','','NORMAL',12),(24,'2023-08-17 13:32:47.525009','2023-08-17 15:02:30.490124','ELECTRONICS','한번도 안 쓴 거에요',100000,0,'ASSIGN','아무튼 팝니다','','NORMAL',12),(25,'2023-08-17 13:33:45.326172','2023-08-17 15:02:10.535152',NULL,'아무튼 팔아요',10000,0,'REJECT','아무튼 팝니다.','','NORMAL',13),(26,'2023-08-17 14:58:31.280506','2023-08-17 15:02:57.628954','ELECTRONICS','',10000,0,'ASSIGN','안경 팝니다!','','LIVE',7),(27,'2023-08-17 15:00:50.530048','2023-08-17 15:02:09.428667',NULL,'# **사용감 없는 안경 판매합니다!!**',10000,0,'REJECT','음료수 판매합니다.','','LIVE',7),(28,'2023-08-17 15:09:19.847173','2023-08-17 16:27:18.146554','ELECTRONICS','',700000,0,'ASSIGN','🎁RTX3060Ti 5600🎁 배틀그라운드컴퓨터 디아4컴퓨터 오버워치2컴퓨터 롤컴퓨터 조립컴퓨터 PC본체','','NORMAL',8),(29,'2023-08-17 15:09:56.124873','2023-08-17 16:27:29.526411','ELECTRONICS','피씨방 페업해서 싸게 올립니다ㅠㅜㅠㅜㅠㅜ',500000,0,'ASSIGN','갤럭시 S22 상태 좋습니다','','NORMAL',8),(30,'2023-08-17 15:33:19.978633','2023-08-17 15:34:03.231683',NULL,'',55000,0,'REJECT','※초특가※ 스타벅스 텀플러 판매 ','','LIVE',4),(31,'2023-08-17 15:33:56.289473','2023-08-17 15:40:05.003732','HANDICRAFT','####  지금 안사면 후회합니다!!!!!!!!사용하지 않은 새 제품입니다!! 구하기 어려운 리미티드에디션 이에요!!',55000,0,'ASSIGN','※초특가※ 스타벅스 텀플러 판매 ','','LIVE',4),(32,'2023-08-17 15:34:37.518843','2023-08-17 15:34:45.993898',NULL,'### 초특가로 판매합니다!! 사용하지 않은 리미티드에디션 입니다!!!!!!',160000,0,'REJECT','롯데 상품권 판매합니다.','','LIVE',4),(33,'2023-08-17 15:35:52.209046','2023-08-17 15:40:06.580459','HANDICRAFT','롯데 상품권 15만원 16만원에 팝니다. 선물용으로 좋아요!',160000,0,'ASSIGN','롯데 상품권 판매합니다.','','LIVE',4),(34,'2023-08-17 15:45:30.139352','2023-08-17 16:16:10.170497','ELECTRONICS','',123,0,'ASSIGN','testt','','LIVE',4),(35,'2023-08-17 16:07:18.915305','2023-08-17 16:07:25.051051',NULL,'',45000,0,'REJECT','※초특가 판매※ 스타벅스 텀블러','','LIVE',4),(36,'2023-08-17 16:07:29.883496','2023-08-17 16:25:56.413995','HANDICRAFT','리미티드에디션 스타벅스 텀블러 판매합니다!! 미사용품이에요!!',45000,0,'FAIL','※초특가 판매※ 스타벅스 텀블러','','LIVE',4),(37,'2023-08-17 16:19:48.788363','2023-08-17 16:20:21.355862',NULL,'',45000,0,'REJECT','텀블러 판매합니다','','LIVE',4),(38,'2023-08-17 16:20:14.298924','2023-08-17 16:24:15.603523','HANDICRAFT','텀블러 판매합니다!!!',45000,0,'SUCCESS','텀블러 판매합니다','','LIVE',4);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `live_auction`
--

DROP TABLE IF EXISTS `live_auction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `live_auction` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `status` int DEFAULT NULL,
  `success_price` int DEFAULT NULL,
  `broadcast_id` bigint DEFAULT NULL,
  `item_id` bigint DEFAULT NULL,
  `success_member` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKk6j4hh2ntgd6sb4j8jxowb4tf` (`broadcast_id`),
  KEY `FKa904cor9y26kdoptec0y8xwmn` (`item_id`),
  KEY `FKayoh3546phahhg6wy1mxq1086` (`success_member`),
  CONSTRAINT `FKa904cor9y26kdoptec0y8xwmn` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`),
  CONSTRAINT `FKayoh3546phahhg6wy1mxq1086` FOREIGN KEY (`success_member`) REFERENCES `member` (`id`),
  CONSTRAINT `FKk6j4hh2ntgd6sb4j8jxowb4tf` FOREIGN KEY (`broadcast_id`) REFERENCES `broadcast` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `live_auction`
--

LOCK TABLES `live_auction` WRITE;
/*!40000 ALTER TABLE `live_auction` DISABLE KEYS */;
INSERT INTO `live_auction` VALUES (1,2,2100000000,2,2,5),(2,2,2147483647,2,3,1),(3,2,300000000,2,7,3),(4,0,NULL,3,26,NULL),(5,0,NULL,4,31,NULL),(6,0,NULL,4,33,NULL),(7,1,1111,8,34,8),(8,2,500000,9,38,18),(9,2,NULL,9,36,NULL);
/*!40000 ALTER TABLE `live_auction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `live_history`
--

DROP TABLE IF EXISTS `live_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `live_history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `bid_price` int NOT NULL,
  `live_auction_id` bigint NOT NULL,
  `member_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKstwjckmwctm3as86aqi08gic8` (`live_auction_id`),
  KEY `FKd8erhx8qwkyu86tt3d6p16072` (`member_id`),
  CONSTRAINT `FKd8erhx8qwkyu86tt3d6p16072` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FKstwjckmwctm3as86aqi08gic8` FOREIGN KEY (`live_auction_id`) REFERENCES `live_auction` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `live_history`
--

LOCK TABLES `live_history` WRITE;
/*!40000 ALTER TABLE `live_history` DISABLE KEYS */;
INSERT INTO `live_history` VALUES (1,'2023-08-17 11:04:09.952459','2023-08-17 11:04:18.434729',54000,1,3),(2,'2023-08-17 11:04:13.141753','2023-08-17 11:06:57.747940',2100000000,1,5),(3,'2023-08-17 11:04:21.762512','2023-08-17 11:04:21.762512',800000,1,1),(4,'2023-08-17 11:05:42.377916','2023-08-17 11:05:42.377916',35001,3,1),(5,'2023-08-17 11:05:49.758365','2023-08-17 11:06:52.584229',300000000,3,3),(6,'2023-08-17 11:06:35.767738','2023-08-17 11:07:18.704511',2147483647,2,1),(7,'2023-08-17 16:18:15.272084','2023-08-17 16:18:15.272084',1111,7,8),(8,'2023-08-17 16:22:54.965768','2023-08-17 16:22:54.965768',46000,8,17),(9,'2023-08-17 16:24:06.260512','2023-08-17 16:24:51.052829',49000,8,14),(10,'2023-08-17 16:25:29.489581','2023-08-17 16:25:50.122855',500000,8,18),(11,'2023-08-17 16:25:35.845630','2023-08-17 16:25:35.845630',51111,8,9);
/*!40000 ALTER TABLE `live_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_mbmcqelty0fbrvxp1q58dn57t` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'dd','dd','$2a$10$h7p2TCDg0l9mGJBOXYEjkuuAsBrdmkFB..D1NQAEQ1w3xhK/gPm6i','USER'),(2,'123','123','$2a$10$tXPNUG0kRnhjx8cQMPhuteFhVGklr2egOMqeCC7WEOP8mIZakxQqO','USER'),(3,'crumbled','1234','$2a$10$.hICHPqzSC6iolktzj66oOLdf3EHeOsmxa2D1yipd0muirzqR/qgS','USER'),(4,'admin','admin','$2a$10$Z0fq7MnLUc2mcIVQnXzGBeqtxPARvRqbxnasOGhK0qPzDF.9JaZTO','ADMIN'),(5,'A407Lee@naver.com','Lee','$2a$10$xchDeXnMzEM9xePtYngMGu.AqZ5J8dfe5YHIdsB0yL8iM.njd/RRC','USER'),(6,'cheuora@gmail.com','박서준','$2a$10$kB2D4aUrNFe3fNloHoTnrOiq41FK/o12WNIvd3i3/QzI7cFYoh38e','USER'),(7,'Lee','Lee','$2a$10$Zjus7dJ03ZX7v.fGd80urOUUJ4BbJ7gwgIiLUG5HuBBqZvFaR73lu','USER'),(8,'hsy0754@naver.com','hsy0754','$2a$10$cPl21Au7d0Wyc3Sh1Whma.4WkZEQ8c05F.wU52r3FclvFplVQnQhS','USER'),(9,'','','$2a$10$WXunlAVLbdEHW9qTo6/nOuazQ5DoI3ZCYcm7fov.FTrSRQ0Cby6XW','USER'),(11,'minjea917@gmail.com','권민재','$2a$10$qVBySA0KltB28davebwJx.4HIzPxfBq149plzzLdTmDCNSFkx/AFe','USER'),(12,'test@test.com','테스터','$2a$10$yEKq.VSAs/ST5ay3fEQ92OJ0Dj5wkSSLQFAU4BMdbp9/pd5kT/7ky','USER'),(13,'1','1','$2a$10$bhjJt4os5ZrIkAz2ayGoRO3Etcer2zUlx8XXyOLq0avMo6gMJLS96','USER'),(14,'test','test','$2a$10$UH0cAx75dFUpZpSHkv1lLuHkEmOld/WhaH7TkYN1TXGkHSuInUwZ.','USER'),(16,'cat@email.com','고먐미','$2a$10$jT///zfg1ykT/.WRMK23WuYx3Cd9FJ82bLy.hnFKDXoFJXxyfQGta','USER'),(17,'ssafy2','ssafy2','$2a$10$biv0uviU6E18H4YmsW7cOuMRwSbdeCjCmt2gLPTLYH0fFuLO9AqRq','USER'),(18,'qwer1234@qwer.com','onehee','$2a$10$DWLveq.GVs1VyZpSsaRRwujWwoEFcrAoMeM5CcXh1K6kc4Bycs0XW','USER');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `normal_auction`
--

DROP TABLE IF EXISTS `normal_auction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `normal_auction` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `end_at` datetime(6) NOT NULL,
  `start_at` datetime(6) NOT NULL,
  `success_member` bigint DEFAULT NULL,
  `success_price` int DEFAULT NULL,
  `item_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKf39bjs2ww6lvir4c1g7nu891l` (`item_id`),
  CONSTRAINT `FKf39bjs2ww6lvir4c1g7nu891l` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `normal_auction`
--

LOCK TABLES `normal_auction` WRITE;
/*!40000 ALTER TABLE `normal_auction` DISABLE KEYS */;
INSERT INTO `normal_auction` VALUES (1,'2023-08-17 11:12:15.917884','2023-08-17 11:12:15.917884','2023-08-31 21:12:00.000000','2023-08-17 20:11:00.000000',NULL,NULL,12),(2,'2023-08-17 11:13:29.404687','2023-08-17 11:13:29.404687','2023-08-30 20:13:00.000000','2023-08-16 20:13:00.000000',NULL,NULL,14),(3,'2023-08-17 11:13:53.424466','2023-08-17 11:13:53.424466','2023-08-31 20:13:00.000000','2023-08-16 20:13:00.000000',NULL,NULL,17),(4,'2023-08-17 11:15:33.964124','2023-08-17 11:15:33.964124','2023-08-31 20:15:00.000000','2023-08-19 20:15:00.000000',NULL,NULL,20),(5,'2023-08-17 15:02:29.727529','2023-08-17 15:02:29.727529','2023-08-19 00:02:00.000000','2023-08-18 00:02:00.000000',NULL,NULL,23),(6,'2023-08-17 15:02:30.517553','2023-08-17 15:02:30.517553','2023-08-19 00:02:00.000000','2023-08-18 00:02:00.000000',NULL,NULL,24),(7,'2023-08-17 16:27:18.160521','2023-08-17 16:27:18.160521','2023-08-27 01:27:00.000000','2023-08-19 01:27:00.000000',NULL,NULL,28),(8,'2023-08-17 16:27:29.536833','2023-08-17 16:27:29.536833','2023-08-26 01:27:00.000000','2023-08-17 01:27:00.000000',NULL,NULL,29);
/*!40000 ALTER TABLE `normal_auction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `normal_history`
--

DROP TABLE IF EXISTS `normal_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `normal_history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `bid_price` int NOT NULL,
  `member_id` bigint NOT NULL,
  `normal_auction_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKl4pfdlv1d2dv6yr74dsg453wg` (`member_id`),
  KEY `FKs5s6idqfw2479qx6tjt506ty4` (`normal_auction_id`),
  CONSTRAINT `FKl4pfdlv1d2dv6yr74dsg453wg` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FKs5s6idqfw2479qx6tjt506ty4` FOREIGN KEY (`normal_auction_id`) REFERENCES `normal_auction` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `normal_history`
--

LOCK TABLES `normal_history` WRITE;
/*!40000 ALTER TABLE `normal_history` DISABLE KEYS */;
INSERT INTO `normal_history` VALUES (5,'2023-08-17 13:13:38.363673','2023-08-17 14:40:20.188615',55000,9,2),(8,'2023-08-17 13:14:18.065350','2023-08-17 13:14:18.065350',920000,9,3),(35,'2023-08-17 13:41:35.020232','2023-08-17 13:56:06.886614',47000,8,2),(36,'2023-08-17 14:49:30.699158','2023-08-17 14:55:58.570419',79000,4,2),(37,'2023-08-17 14:49:33.775704','2023-08-17 16:05:43.295421',85000,7,2),(38,'2023-08-17 15:27:14.192740','2023-08-17 15:27:14.192740',80000,1,2),(39,'2023-08-17 15:43:51.630745','2023-08-17 15:44:01.774657',84000,16,2),(40,'2023-08-17 16:29:37.320007','2023-08-17 16:29:37.320007',510000,4,8),(41,'2023-08-17 16:31:27.963331','2023-08-17 16:31:31.786749',530000,7,8);
/*!40000 ALTER TABLE `normal_history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-17 16:40:33

-- mysql event Schduler
SET GLOBAL event_scheduler = ON;

DROP PROCEDURE IF EXISTS successDiffAndCheck ;

CREATE PROCEDURE successDiffAndCheck()
BEGIN
    UPDATE item SET item_status = "SUCCESS" where id in (select item_id as id from (select item_id, timestampdiff(SECOND ,now(), end_at) as diff from (select item_id,end_at from normal_auction join normal_history on normal_auction.id = normal_history.normal_auction_id) as history
                                                                                            HAVING diff <= 0 ) as diffTable group by (item_id));
    UPDATE item SET item_status = "FAIL" where id in (select item_id as id from (select item_id, timestampdiff(SECOND ,now(), end_at) as diff from (select item_id, end_at from normal_auction where item_id not in (select item_id from normal_auction join normal_history on normal_auction.id = normal_history.normal_auction_id group by (item_id))) as history
                                                                                            HAVING diff <= 0 ) as diffTable group by (item_id));
    update normal_auction as na, (select member_id,topBid,normal_auction_id,member.email from (select member_id,topBid,nh.normal_auction_id from normal_history as nh inner join (select MAX(bid_price) as topBid, normal_auction_id  from normal_history group by normal_auction_id) as top on top.topBid = nh.bid_price and top.normal_auction_id = nh.normal_auction_id) as nha
        join member on nha.member_id = member.id) as topHis set na.success_price = topHis.topBid , na.success_member = topHis.member_id where na.end_at < now() and na.success_member is null and na.success_price is null and na.id = topHis.normal_auction_id;
END;

DROP EVENT IF EXISTS successBidCheck;

CREATE EVENT successBidCheck
    ON SCHEDULE
    EVERY 2 MINUTE
    COMMENT "낙찰 체크하기"
    DO
    call successDiffAndCheck();

select * from information_schema.events;

-- MariaDB dump 10.19  Distrib 10.6.16-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: userDb
-- ------------------------------------------------------
-- Server version	10.6.16-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company` (
  `companyId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nameVal` varchar(45) DEFAULT NULL,
  `add1` varchar(45) DEFAULT NULL,
  `add2` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `pincode` varchar(45) DEFAULT NULL,
  `dbId` int(11) DEFAULT NULL,
  `stateId` int(11) DEFAULT NULL,
  `cfield1` varchar(50) DEFAULT NULL,
  `cfield2` varchar(50) DEFAULT NULL,
  `cfield3` varchar(50) DEFAULT NULL,
  `cfield4` varchar(50) DEFAULT NULL,
  `cfield5` varchar(50) DEFAULT NULL,
  `cfield6` varchar(50) DEFAULT NULL,
  `cfield7` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`companyId`),
  UNIQUE KEY `companyId_UNIQUE` (`companyId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (3,'MyCo',NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'New Co',NULL,NULL,NULL,NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,'my test co','','','','',3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dbHost`
--

DROP TABLE IF EXISTS `dbHost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dbHost` (
  `hostId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `host` varchar(45) DEFAULT NULL,
  `port` varchar(45) DEFAULT NULL,
  `useForNextDb` int(11) DEFAULT NULL,
  PRIMARY KEY (`hostId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dbHost`
--

LOCK TABLES `dbHost` WRITE;
/*!40000 ALTER TABLE `dbHost` DISABLE KEYS */;
INSERT INTO `dbHost` VALUES (1,'127.0.0.1','3306',1);
/*!40000 ALTER TABLE `dbHost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dbInfo`
--

DROP TABLE IF EXISTS `dbInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dbInfo` (
  `dbId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `hostId` int(11) DEFAULT NULL,
  `dbName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`dbId`),
  UNIQUE KEY `dbId_UNIQUE` (`dbId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dbInfo`
--

LOCK TABLES `dbInfo` WRITE;
/*!40000 ALTER TABLE `dbInfo` DISABLE KEYS */;
INSERT INTO `dbInfo` VALUES (1,1,'crmDb'),(2,1,'crmco2Db'),(3,1,'crmco3db');
/*!40000 ALTER TABLE `dbInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `session` (
  `sessionId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `data` varchar(5000) DEFAULT NULL,
  `last_access` datetime DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`sessionId`),
  UNIQUE KEY `sessionId_UNIQUE` (`sessionId`),
  UNIQUE KEY `userId_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
INSERT INTO `session` VALUES (1,'{\"dbInfo\":{\"companyId\":3,\"nameVal\":\"MyCo\",\"dbId\":1,\"email\":\"a@b.com\",\"host\":\"127.0.0.1\",\"port\":\"3306\",\"dbName\":\"crmDb\"}}','2024-04-08 19:00:01','a@b.com');
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `userId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `datetime` varchar(45) DEFAULT NULL,
  `provider` varchar(15) DEFAULT NULL,
  `verified` int(11) DEFAULT NULL,
  `cfield1` varchar(50) DEFAULT NULL,
  `cfield2` varchar(50) DEFAULT NULL,
  `cfield3` varchar(50) DEFAULT NULL,
  `cfield4` varchar(50) DEFAULT NULL,
  `cfield5` varchar(50) DEFAULT NULL,
  `cfield6` varchar(50) DEFAULT NULL,
  `cfield7` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'dinesh','verma','a@b.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','2024-03-26 13:35:47',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,'naveen','nischal','n@n.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','2024-03-28 15:31:04',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(23,'Vijay','Arora','v@a.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','2024-03-28 16:22:40',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(24,'Vinod','Mehra','v@m.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','2024-03-28 17:01:54',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(25,'Raj','Kumar','r@k.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','2024-03-28 17:51:04',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(27,'Vijay','Arora','v@ar.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','2024-03-28 17:54:44',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(28,'Jeetu','Kumar','j@k.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','2024-03-28 18:12:44',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(29,'Jhonny','Walker','j@w.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','2024-03-28 18:19:40',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(30,'Jhonny','Walker','j@wn.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','2024-03-28 18:20:13',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(31,'first','last','f@l.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','2024-03-28 21:42:05',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(32,'Dinesh','Verma','d@v.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','2024-03-29 19:10:38',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(33,'dev','anand','d@a.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','2024-03-29 19:13:19',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(34,'Tariq','Khan','t@k.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','2024-03-29 20:55:08',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userCompany`
--

DROP TABLE IF EXISTS `userCompany`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userCompany` (
  `userId` int(11) NOT NULL,
  `companyId` int(11) NOT NULL,
  `isAdmin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userCompany`
--

LOCK TABLES `userCompany` WRITE;
/*!40000 ALTER TABLE `userCompany` DISABLE KEYS */;
INSERT INTO `userCompany` VALUES (1,3,1),(1,5,0),(1,11,1);
/*!40000 ALTER TABLE `userCompany` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-13 19:14:49

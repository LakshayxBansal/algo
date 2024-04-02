-- MariaDB dump 10.19  Distrib 10.6.16-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: crmDb
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
-- Table structure for table `coUser`
--

DROP TABLE IF EXISTS `coUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coUser` (
  `coUserId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(10) unsigned DEFAULT NULL,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `datetime` varchar(45) DEFAULT NULL,
  `licensed` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  `cfield1` varchar(50) DEFAULT NULL,
  `cfield2` varchar(50) DEFAULT NULL,
  `cfield3` varchar(50) DEFAULT NULL,
  `cfield4` varchar(50) DEFAULT NULL,
  `cfield5` varchar(50) DEFAULT NULL,
  `cfield6` varchar(50) DEFAULT NULL,
  `cfield7` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`coUserId`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coUser`
--

LOCK TABLES `coUser` WRITE;
/*!40000 ALTER TABLE `coUser` DISABLE KEYS */;
/*!40000 ALTER TABLE `coUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `countryId` int(11) NOT NULL,
  `nameVal` varchar(45) DEFAULT NULL,
  `continent` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`countryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `customerId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nameVal` varchar(45) DEFAULT NULL,
  `add1` varchar(45) DEFAULT NULL,
  `add2` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `pincode` varchar(45) DEFAULT NULL,
  `date_time` varchar(45) DEFAULT NULL,
  `active` int(11) DEFAULT NULL,
  PRIMARY KEY (`customerId`),
  UNIQUE KEY `customerId_UNIQUE` (`customerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `roleId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nameVal` varchar(45) DEFAULT NULL,
  `parentRole` int(11) DEFAULT NULL,
  PRIMARY KEY (`roleId`),
  UNIQUE KEY `roleId_UNIQUE` (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin',0),(2,'Non-User',0),(3,'Manager',1),(4,'Executive',3);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticketCategory`
--

DROP TABLE IF EXISTS `ticketCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticketCategory` (
  `ticketCategoryId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nameVal` varchar(45) DEFAULT NULL,
  `ticketTypeId` int(11) NOT NULL,
  PRIMARY KEY (`ticketCategoryId`),
  UNIQUE KEY `ticketCategoryId_UNIQUE` (`ticketCategoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticketCategory`
--

LOCK TABLES `ticketCategory` WRITE;
/*!40000 ALTER TABLE `ticketCategory` DISABLE KEYS */;
INSERT INTO `ticketCategory` VALUES (1,'Urgent',1),(2,'Regular',1),(3,'High Priority',1);
/*!40000 ALTER TABLE `ticketCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticketStage`
--

DROP TABLE IF EXISTS `ticketStage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticketStage` (
  `ticketStageId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ticketTypeId` int(11) DEFAULT NULL,
  `nameVal` varchar(45) DEFAULT NULL,
  `parentStage` int(11) DEFAULT NULL,
  PRIMARY KEY (`ticketStageId`),
  UNIQUE KEY `ticketStageId_UNIQUE` (`ticketStageId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticketStage`
--

LOCK TABLES `ticketStage` WRITE;
/*!40000 ALTER TABLE `ticketStage` DISABLE KEYS */;
INSERT INTO `ticketStage` VALUES (1,1,'Inquiry',0),(2,1,'Qualified',1),(3,1,'Demo',2),(4,1,'Proposal',3),(5,1,'Closed-Win',4),(6,1,'Closed-Lost',4);
/*!40000 ALTER TABLE `ticketStage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticketType`
--

DROP TABLE IF EXISTS `ticketType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticketType` (
  `ticketTypeId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nameVal` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ticketTypeId`),
  UNIQUE KEY `ticketTypeId_UNIQUE` (`ticketTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticketType`
--

LOCK TABLES `ticketType` WRITE;
/*!40000 ALTER TABLE `ticketType` DISABLE KEYS */;
INSERT INTO `ticketType` VALUES (1,'Pre-sales');
/*!40000 ALTER TABLE `ticketType` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-02 10:10:39

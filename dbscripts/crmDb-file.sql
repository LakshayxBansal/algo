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
-- Table structure for table `action`
--

DROP TABLE IF EXISTS `action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `action` (
  `actionId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nameVal` varchar(45) DEFAULT NULL,
  `ticketTypeId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`actionId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `action`
--

LOCK TABLES `action` WRITE;
/*!40000 ALTER TABLE `action` DISABLE KEYS */;
INSERT INTO `action` VALUES (1,'follow-up',1),(2,'Demo-visit',1),(3,'Demo Online',1),(4,'visit',1);
/*!40000 ALTER TABLE `action` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coUser`
--

DROP TABLE IF EXISTS `coUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coUser` (
  `coUserId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `employeeId` int(10) unsigned DEFAULT NULL,
  `datetime` varchar(45) DEFAULT NULL,
  `licensed` int(11) DEFAULT NULL,
  PRIMARY KEY (`coUserId`)
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'New customer','IA 19 B','Ashok Vihar','Delhi','Delhi','110052','2024-04-05 18:37:06',1),(2,'my cus','','','','','','2024-04-05 18:42:11',1),(3,'raj kamal','','','','','','2024-04-05 18:43:21',1),(4,'Kaalia','weio welkkjf sjdksj','sjdsdj kdsldk ','dlfj','dsds','sddsd','2024-04-05 18:45:35',1),(5,'brand new','','','','','','2024-04-05 18:56:15',1),(6,'Maha','','','','','','2024-04-05 18:57:40',1),(7,'delhi times','','','','','','2024-04-05 19:01:56',1),(8,'Apple','','','','','','2024-04-05 19:05:32',1),(9,'microsoft','','','','','','2024-04-05 19:07:49',1),(10,'Dell','','','','','','2024-04-05 19:08:35',1),(11,'cisco','','','','','','2024-04-05 19:20:53',1),(12,'nano tech','','','','','','2024-04-05 19:22:34',1),(13,'mahindra','','','','','','2024-04-05 19:23:36',1),(14,'delhi trans','','','','','','2024-04-05 19:36:46',1),(15,'Timex','','','','','','2024-04-05 20:07:07',1),(16,'ICICI','','','','','','2024-04-08 11:58:01',1),(17,'yes bank','','','','','','2024-04-08 12:01:12',1),(18,'mad max','','','','','','2024-04-08 12:02:37',1),(19,'max hospital','','','','','','2024-04-08 12:04:52',1),(20,'Airbnb','','','','','','2024-04-10 16:29:41',1);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dept`
--

DROP TABLE IF EXISTS `dept`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dept` (
  `deptId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nameVal` varchar(45) DEFAULT NULL,
  `desc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`deptId`),
  UNIQUE KEY `deptId_UNIQUE` (`deptId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dept`
--

LOCK TABLES `dept` WRITE;
/*!40000 ALTER TABLE `dept` DISABLE KEYS */;
/*!40000 ALTER TABLE `dept` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `employeeId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `personId` int(10) unsigned DEFAULT NULL,
  `deptId` int(10) unsigned DEFAULT NULL,
  `roleId` int(10) unsigned DEFAULT NULL,
  `managerId` int(10) unsigned DEFAULT NULL,
  `isAppUser` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`employeeId`),
  UNIQUE KEY `employeeId_UNIQUE` (`employeeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inquiry`
--

DROP TABLE IF EXISTS `inquiry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inquiry` (
  `inquiryId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `desc` varchar(45) DEFAULT NULL,
  `customerId` int(10) DEFAULT NULL,
  `contactPersonId` int(11) unsigned DEFAULT NULL,
  `employeeId` int(10) DEFAULT NULL,
  `nextStageId` int(10) DEFAULT NULL,
  `expectedClosureDate` datetime DEFAULT NULL,
  `active` int(11) DEFAULT NULL,
  `expectedRev` float DEFAULT NULL,
  `probability` float DEFAULT NULL,
  `nextStageCompletionDate` date DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `creatorId` varchar(45) DEFAULT NULL,
  `cField1` varchar(45) DEFAULT NULL,
  `cField2` varchar(45) DEFAULT NULL,
  `cField3` varchar(45) DEFAULT NULL,
  `cField4` varchar(45) DEFAULT NULL,
  `cField5` varchar(45) DEFAULT NULL,
  `cField6` varchar(45) DEFAULT NULL,
  `cField7` varchar(45) DEFAULT NULL,
  `cField8` varchar(45) DEFAULT NULL,
  `cField9` varchar(45) DEFAULT NULL,
  `cField10` varchar(45) DEFAULT NULL,
  `cField11` varchar(45) DEFAULT NULL,
  `cField12` varchar(45) DEFAULT NULL,
  `cField13` varchar(45) DEFAULT NULL,
  `cField14` varchar(45) DEFAULT NULL,
  `cField15` varchar(45) DEFAULT NULL,
  `date_time` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`inquiryId`),
  UNIQUE KEY `inquiryId_UNIQUE` (`inquiryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inquiry`
--

LOCK TABLES `inquiry` WRITE;
/*!40000 ALTER TABLE `inquiry` DISABLE KEYS */;
/*!40000 ALTER TABLE `inquiry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `person` (
  `personId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) DEFAULT NULL,
  `lasName` varchar(45) DEFAULT NULL,
  `add1` varchar(45) DEFAULT NULL,
  `add2` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `phone1` varchar(45) DEFAULT NULL,
  `phone2` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `personTypeId` int(11) NOT NULL,
  `cfield10` varchar(50) DEFAULT NULL,
  `cfield9` varchar(50) DEFAULT NULL,
  `cfield8` varchar(50) DEFAULT NULL,
  `cfield7` varchar(50) DEFAULT NULL,
  `cfield6` varchar(50) DEFAULT NULL,
  `cfield5` varchar(50) DEFAULT NULL,
  `cfield4` varchar(50) DEFAULT NULL,
  `cfield3` varchar(50) DEFAULT NULL,
  `cfield2` varchar(50) DEFAULT NULL,
  `cfield1` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`personId`),
  UNIQUE KEY `employeeId_UNIQUE` (`personId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES (1,'rajesh','khanna','malabar hills','south mumbai','mumbai','MH','1234567890',NULL,'rakesh@gmail.com',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'rajesh','khanna','malabar hills','south mumbai','mumbai','MH','1234567890',NULL,'rakesh@gmail.com',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'Vinod','Mehra','add line 1','add line 2','New Delhi','Delhi','+98 107 528 31',NULL,'vinod@mehra.com',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'Mala ','Sinha','add 1','add2','New Delhi','Delho','990762630',NULL,'mala@sinha.com',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personType`
--

DROP TABLE IF EXISTS `personType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personType` (
  `personTypeId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nameVal` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`personTypeId`),
  UNIQUE KEY `personTypeId_UNIQUE` (`personTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personType`
--

LOCK TABLES `personType` WRITE;
/*!40000 ALTER TABLE `personType` DISABLE KEYS */;
INSERT INTO `personType` VALUES (1,'contact'),(2,'employee');
/*!40000 ALTER TABLE `personType` ENABLE KEYS */;
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
-- Table structure for table `ticketNote`
--

DROP TABLE IF EXISTS `ticketNote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticketNote` (
  `ticketNoteId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ticketId` int(11) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `note` text DEFAULT NULL,
  PRIMARY KEY (`ticketNoteId`),
  UNIQUE KEY `ticketNoteId_UNIQUE` (`ticketNoteId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticketNote`
--

LOCK TABLES `ticketNote` WRITE;
/*!40000 ALTER TABLE `ticketNote` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticketNote` ENABLE KEYS */;
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

-- Dump completed on 2024-04-13 19:14:46

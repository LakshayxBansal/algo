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
  `contactPersonId` int(10) DEFAULT NULL,
  `salesPersonId` int(10) DEFAULT NULL,
  `nextStageId` int(10) DEFAULT NULL,
  `expectedClosureDate` datetime DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `creatorId` varchar(45) DEFAULT NULL,
  `customField1` varchar(45) DEFAULT NULL,
  `customField2` varchar(45) DEFAULT NULL,
  `customField3` varchar(45) DEFAULT NULL,
  `customField4` varchar(45) DEFAULT NULL,
  `customField5` varchar(45) DEFAULT NULL,
  `customField6` varchar(45) DEFAULT NULL,
  `customField7` varchar(45) DEFAULT NULL,
  `customField8` varchar(45) DEFAULT NULL,
  `customField9` varchar(45) DEFAULT NULL,
  `customField10` varchar(45) DEFAULT NULL,
  `customField11` varchar(45) DEFAULT NULL,
  `customField12` varchar(45) DEFAULT NULL,
  `customField13` varchar(45) DEFAULT NULL,
  `customField14` varchar(45) DEFAULT NULL,
  `customField15` varchar(45) DEFAULT NULL,
  `date_time` varchar(45) DEFAULT NULL,
  `active` int(11) DEFAULT NULL,
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
  `stateId` int(11) DEFAULT NULL,
  `phone1` varchar(45) DEFAULT NULL,
  `phone2` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
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

-- Dump completed on 2024-04-04 16:56:59

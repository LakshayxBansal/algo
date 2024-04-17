-- MariaDB dump 10.19  Distrib 10.6.16-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: crmapp
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
-- Table structure for table `allocation_type_master`
--

DROP TABLE IF EXISTS `allocation_type_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `allocation_type_master` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `stamp` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allocation_type_master`
--

LOCK TABLES `allocation_type_master` WRITE;
/*!40000 ALTER TABLE `allocation_type_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `allocation_type_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `area_master`
--

DROP TABLE IF EXISTS `area_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `area_master` (
  `id` int(11) NOT NULL,
  `name` varchar(60) DEFAULT '',
  `stamp` smallint(6) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area_master`
--

LOCK TABLES `area_master` WRITE;
/*!40000 ALTER TABLE `area_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `area_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `business_profile`
--

DROP TABLE IF EXISTS `business_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `business_profile` (
  `id` int(11) NOT NULL,
  `name` varchar(60) DEFAULT NULL,
  `address1` varchar(75) DEFAULT NULL,
  `address2` varchar(75) DEFAULT NULL,
  `address3` varchar(75) DEFAULT NULL,
  `city` varchar(75) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `pincode` varchar(20) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `pan` varchar(20) DEFAULT NULL,
  `gstin` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `business_profile`
--

LOCK TABLES `business_profile` WRITE;
/*!40000 ALTER TABLE `business_profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `business_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `call_allocation`
--

DROP TABLE IF EXISTS `call_allocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `call_allocation` (
  `call_id` int(11) DEFAULT NULL,
  `allocated_to` int(11) DEFAULT NULL,
  `allocated_on` datetime DEFAULT NULL,
  `allocated_by` int(11) DEFAULT NULL,
  `next_action_id` int(11) DEFAULT NULL,
  `next_action_datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `call_allocation`
--

LOCK TABLES `call_allocation` WRITE;
/*!40000 ALTER TABLE `call_allocation` DISABLE KEYS */;
/*!40000 ALTER TABLE `call_allocation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `call_receipt`
--

DROP TABLE IF EXISTS `call_receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `call_receipt` (
  `id` int(11) DEFAULT NULL,
  `received_datetime` datetime DEFAULT NULL,
  `call_no` varchar(40) DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `received_by` int(11) DEFAULT NULL,
  `call_status` int(11) DEFAULT NULL,
  `call_sub_status` int(11) DEFAULT NULL,
  `next_action_id` int(11) DEFAULT NULL,
  `next_action_datetime` datetime DEFAULT NULL,
  `allocated_to` int(11) DEFAULT NULL,
  `call_remark` text DEFAULT NULL,
  `call_suggested_remark` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `call_receipt`
--

LOCK TABLES `call_receipt` WRITE;
/*!40000 ALTER TABLE `call_receipt` DISABLE KEYS */;
/*!40000 ALTER TABLE `call_receipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `call_type_master`
--

DROP TABLE IF EXISTS `call_type_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `call_type_master` (
  `id` int(11) NOT NULL,
  `name` varchar(60) DEFAULT '',
  `stamp` smallint(6) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `call_type_master`
--

LOCK TABLES `call_type_master` WRITE;
/*!40000 ALTER TABLE `call_type_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `call_type_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_group_master`
--

DROP TABLE IF EXISTS `contact_group_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_group_master` (
  `id` int(11) NOT NULL,
  `alias` varchar(60) NOT NULL DEFAULT '',
  `name` varchar(60) NOT NULL DEFAULT '',
  `stamp` smallint(6) NOT NULL DEFAULT 0,
  `parent_id` int(11) NOT NULL DEFAULT 0,
  `created_by` int(11) NOT NULL DEFAULT 0,
  `modified_by` int(11) NOT NULL DEFAULT 0,
  `created_on` datetime DEFAULT '0000-00-00 00:00:00',
  `modified_on` datetime DEFAULT '0000-00-00 00:00:00',
  `is_parent` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_group_master`
--

LOCK TABLES `contact_group_master` WRITE;
/*!40000 ALTER TABLE `contact_group_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_group_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_master`
--

DROP TABLE IF EXISTS `contact_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_master` (
  `id` int(11) NOT NULL,
  `alias` varchar(60) DEFAULT NULL,
  `name` varchar(60) DEFAULT NULL,
  `print_name` varchar(60) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `pan` varchar(20) DEFAULT NULL,
  `aadhaar` varchar(20) DEFAULT NULL,
  `address1` varchar(75) DEFAULT NULL,
  `address2` varchar(75) DEFAULT NULL,
  `address3` varchar(75) DEFAULT NULL,
  `city` varchar(75) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `area_id` int(11) DEFAULT NULL,
  `call_type_id` int(11) DEFAULT NULL,
  `pincode` varchar(15) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `whatsapp` varchar(20) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `stamp` int(11) DEFAULT NULL,
  `dob` datetime DEFAULT NULL,
  `doa` datetime DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `organisation_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_master`
--

LOCK TABLES `contact_master` WRITE;
/*!40000 ALTER TABLE `contact_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country_master`
--

DROP TABLE IF EXISTS `country_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country_master` (
  `id` int(11) NOT NULL,
  `alias` varchar(60) DEFAULT NULL,
  `name` varchar(60) DEFAULT '',
  `stamp` smallint(6) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country_master`
--

LOCK TABLES `country_master` WRITE;
/*!40000 ALTER TABLE `country_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `country_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department_master`
--

DROP TABLE IF EXISTS `department_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `department_master` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL DEFAULT '',
  `stamp` smallint(6) NOT NULL DEFAULT 0,
  `created_by` int(11) NOT NULL DEFAULT 0,
  `modified_by` int(11) NOT NULL DEFAULT 0,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department_master`
--

LOCK TABLES `department_master` WRITE;
/*!40000 ALTER TABLE `department_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `department_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enquiry_action`
--

DROP TABLE IF EXISTS `enquiry_action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enquiry_action` (
  `id` int(11) DEFAULT NULL,
  `call_id` int(11) DEFAULT NULL,
  `action_taken_by` int(11) DEFAULT NULL,
  `action_taken_datetime` datetime DEFAULT NULL,
  `action_remark` text DEFAULT NULL,
  `call_status_id` int(11) DEFAULT NULL,
  `call_sub_status_id` int(11) DEFAULT NULL,
  `closer_remark` varchar(255) DEFAULT NULL,
  `enquiry_action_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiry_action`
--

LOCK TABLES `enquiry_action` WRITE;
/*!40000 ALTER TABLE `enquiry_action` DISABLE KEYS */;
/*!40000 ALTER TABLE `enquiry_action` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enquiry_action_master`
--

DROP TABLE IF EXISTS `enquiry_action_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enquiry_action_master` (
  `id` int(11) NOT NULL,
  `name` varchar(60) DEFAULT '',
  `stamp` smallint(6) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiry_action_master`
--

LOCK TABLES `enquiry_action_master` WRITE;
/*!40000 ALTER TABLE `enquiry_action_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `enquiry_action_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enquiry_allocation`
--

DROP TABLE IF EXISTS `enquiry_allocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enquiry_allocation` (
  `id` int(11) DEFAULT NULL,
  `allocation_date` datetime DEFAULT NULL,
  `executive_id` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `narration` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiry_allocation`
--

LOCK TABLES `enquiry_allocation` WRITE;
/*!40000 ALTER TABLE `enquiry_allocation` DISABLE KEYS */;
/*!40000 ALTER TABLE `enquiry_allocation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enquiry_allocation_detail`
--

DROP TABLE IF EXISTS `enquiry_allocation_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enquiry_allocation_detail` (
  `allocation_id` int(11) DEFAULT NULL,
  `enquiry_id` int(11) DEFAULT NULL,
  `slno` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiry_allocation_detail`
--

LOCK TABLES `enquiry_allocation_detail` WRITE;
/*!40000 ALTER TABLE `enquiry_allocation_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `enquiry_allocation_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enquiry_category_master`
--

DROP TABLE IF EXISTS `enquiry_category_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enquiry_category_master` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `stamp` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiry_category_master`
--

LOCK TABLES `enquiry_category_master` WRITE;
/*!40000 ALTER TABLE `enquiry_category_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `enquiry_category_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enquiry_header_tran`
--

DROP TABLE IF EXISTS `enquiry_header_tran`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enquiry_header_tran` (
  `id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `enq_number` varchar(75) DEFAULT NULL,
  `time` time DEFAULT NULL,
  `auto_number` int(11) DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `received_by_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `source_id` int(11) DEFAULT NULL,
  `executive_id` int(11) DEFAULT NULL,
  `stamp` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `allocated_to` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiry_header_tran`
--

LOCK TABLES `enquiry_header_tran` WRITE;
/*!40000 ALTER TABLE `enquiry_header_tran` DISABLE KEYS */;
/*!40000 ALTER TABLE `enquiry_header_tran` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enquiry_item_tran`
--

DROP TABLE IF EXISTS `enquiry_item_tran`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enquiry_item_tran` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enquiry_id` int(11) DEFAULT NULL,
  `slno` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `quantity` decimal(20,4) DEFAULT NULL,
  `unit_id` int(11) DEFAULT NULL,
  `remark` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=365 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiry_item_tran`
--

LOCK TABLES `enquiry_item_tran` WRITE;
/*!40000 ALTER TABLE `enquiry_item_tran` DISABLE KEYS */;
/*!40000 ALTER TABLE `enquiry_item_tran` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enquiry_maturity_type`
--

DROP TABLE IF EXISTS `enquiry_maturity_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enquiry_maturity_type` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `stamp` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiry_maturity_type`
--

LOCK TABLES `enquiry_maturity_type` WRITE;
/*!40000 ALTER TABLE `enquiry_maturity_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `enquiry_maturity_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enquiry_status_master`
--

DROP TABLE IF EXISTS `enquiry_status_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enquiry_status_master` (
  `id` int(11) NOT NULL,
  `name` varchar(60) DEFAULT '',
  `stamp` smallint(6) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiry_status_master`
--

LOCK TABLES `enquiry_status_master` WRITE;
/*!40000 ALTER TABLE `enquiry_status_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `enquiry_status_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enquiry_status_tran`
--

DROP TABLE IF EXISTS `enquiry_status_tran`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enquiry_status_tran` (
  `enquiry_id` int(11) DEFAULT NULL,
  `status_version` int(11) DEFAULT NULL,
  `allocated_to` int(11) unsigned DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `vch_type` smallint(6) DEFAULT NULL,
  `executive_id` int(11) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `sub_status_id` int(11) DEFAULT NULL,
  `action_taken_id` int(11) DEFAULT NULL,
  `next_action_id` int(11) DEFAULT NULL,
  `next_action_date` date DEFAULT NULL,
  `next_action_time` time DEFAULT NULL,
  `enquiry_remark` text DEFAULT NULL,
  `suggested_action_remark` text DEFAULT NULL,
  `action_taken_remark` text DEFAULT NULL,
  `closure_remark` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiry_status_tran`
--

LOCK TABLES `enquiry_status_tran` WRITE;
/*!40000 ALTER TABLE `enquiry_status_tran` DISABLE KEYS */;
/*!40000 ALTER TABLE `enquiry_status_tran` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enquiry_sub_status_master`
--

DROP TABLE IF EXISTS `enquiry_sub_status_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enquiry_sub_status_master` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `stamp` int(11) DEFAULT NULL,
  `enquiry_status_id` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiry_sub_status_master`
--

LOCK TABLES `enquiry_sub_status_master` WRITE;
/*!40000 ALTER TABLE `enquiry_sub_status_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `enquiry_sub_status_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `executive_master`
--

DROP TABLE IF EXISTS `executive_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `executive_master` (
  `id` int(11) NOT NULL,
  `alias` varchar(60) DEFAULT NULL,
  `name` varchar(60) DEFAULT NULL,
  `address1` varchar(75) DEFAULT NULL,
  `address2` varchar(75) DEFAULT NULL,
  `address3` varchar(75) DEFAULT NULL,
  `city` varchar(75) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `pincode` varchar(15) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `whatsappno` varchar(20) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `stamp` int(11) DEFAULT NULL,
  `dob` datetime DEFAULT NULL,
  `doa` datetime DEFAULT NULL,
  `doj` datetime DEFAULT NULL,
  `area_id` int(11) DEFAULT NULL,
  `call_type_id` int(11) DEFAULT NULL,
  `crm_user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `executive_master`
--

LOCK TABLES `executive_master` WRITE;
/*!40000 ALTER TABLE `executive_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `executive_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_group_master`
--

DROP TABLE IF EXISTS `item_group_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_group_master` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(60) DEFAULT NULL,
  `alias` varchar(60) DEFAULT NULL,
  `stamp` smallint(6) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `is_parent` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_group_master`
--

LOCK TABLES `item_group_master` WRITE;
/*!40000 ALTER TABLE `item_group_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_group_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_master`
--

DROP TABLE IF EXISTS `item_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_master` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(60) DEFAULT NULL,
  `stamp` smallint(6) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `alias` varchar(60) DEFAULT NULL,
  `unit_id` int(11) DEFAULT NULL,
  `hsn_code` varchar(60) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_master`
--

LOCK TABLES `item_master` WRITE;
/*!40000 ALTER TABLE `item_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_tran_types`
--

DROP TABLE IF EXISTS `master_tran_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_tran_types` (
  `id` int(11) NOT NULL,
  `short_name` varchar(30) DEFAULT NULL,
  `full_name` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `short_name` (`short_name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_tran_types`
--

LOCK TABLES `master_tran_types` WRITE;
/*!40000 ALTER TABLE `master_tran_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `master_tran_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_option_master`
--

DROP TABLE IF EXISTS `menu_option_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menu_option_master` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `short_name` varchar(100) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `icon` varchar(45) DEFAULT NULL,
  `href` varchar(100) DEFAULT NULL,
  `default_open` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `menu_order` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_option_master`
--

LOCK TABLES `menu_option_master` WRITE;
/*!40000 ALTER TABLE `menu_option_master` DISABLE KEYS */;
INSERT INTO `menu_option_master` VALUES (1,'Dashboard','Dashboard',0,'DashboardIcon','/cap',0,NULL,NULL,NULL,NULL,0),(2,'Enquiry','Enquiry',0,'InboxIcon','#',0,NULL,NULL,NULL,NULL,0),(3,'Campaign','Campaign',0,'PeopleIcon','#',0,NULL,NULL,NULL,NULL,0),(4,'Reports','Reports',0,'BarChartIcon','#',0,NULL,NULL,NULL,NULL,0),(5,'Admin','Admin',0,'LayersIcon','#',0,NULL,NULL,NULL,NULL,0),(6,'Add Inquiry','Add',2,'DashboardIcon','#',0,NULL,NULL,NULL,NULL,0),(7,'Allocate','Allocate',2,'InboxIcon','#',0,NULL,NULL,NULL,NULL,0),(8,'Update','Update',2,'PeopleIcon','#',0,NULL,NULL,NULL,NULL,0),(9,'Masters','Masters',5,'DashboardIcon','#',0,NULL,NULL,NULL,NULL,0),(10,'Modify Company','Modify Company',5,'InboxIcon','#',0,NULL,NULL,NULL,NULL,0),(11,'Add User','Add User',5,'PeopleIcon','#',0,NULL,NULL,NULL,NULL,0),(12,'Enquiry Masters','Enquiry Masters',9,'DashboardIcon','#',0,NULL,NULL,NULL,NULL,0),(13,'Support Masters','Support Masters',9,'DashboardIcon','#',0,NULL,NULL,NULL,NULL,0),(14,'Action','Actions',12,'DashboardIcon','#',0,NULL,NULL,NULL,NULL,0),(15,'Category','Category',12,'DashboardIcon','#',0,NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `menu_option_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organisation_master`
--

DROP TABLE IF EXISTS `organisation_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organisation_master` (
  `id` int(11) NOT NULL,
  `alias` varchar(60) NOT NULL DEFAULT '',
  `name` varchar(60) NOT NULL DEFAULT '',
  `stamp` smallint(6) NOT NULL DEFAULT 0,
  `created_by` int(11) NOT NULL DEFAULT 0,
  `modified_by` int(11) NOT NULL DEFAULT 0,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `address1` varchar(75) DEFAULT NULL,
  `address2` varchar(75) DEFAULT NULL,
  `address3` varchar(75) DEFAULT NULL,
  `city` varchar(75) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `pan` varchar(20) DEFAULT NULL,
  `gstin` varchar(20) DEFAULT NULL,
  `pincode` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organisation_master`
--

LOCK TABLES `organisation_master` WRITE;
/*!40000 ALTER TABLE `organisation_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `organisation_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_master`
--

DROP TABLE IF EXISTS `role_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_master` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL DEFAULT '',
  `parent` int(11) NOT NULL DEFAULT 0,
  `stamp` smallint(6) NOT NULL DEFAULT 0,
  `created_by` int(11) NOT NULL DEFAULT 0,
  `modified_by` int(11) NOT NULL DEFAULT 0,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_master`
--

LOCK TABLES `role_master` WRITE;
/*!40000 ALTER TABLE `role_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `source_master`
--

DROP TABLE IF EXISTS `source_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `source_master` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(60) DEFAULT NULL,
  `stamp` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `source_master`
--

LOCK TABLES `source_master` WRITE;
/*!40000 ALTER TABLE `source_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `source_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state_master`
--

DROP TABLE IF EXISTS `state_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `state_master` (
  `id` int(11) NOT NULL,
  `alias` varchar(60) NOT NULL DEFAULT '',
  `name` varchar(60) NOT NULL DEFAULT '0',
  `stamp` smallint(6) NOT NULL DEFAULT 0,
  `created_by` int(11) NOT NULL DEFAULT 0,
  `modified_by` int(11) NOT NULL DEFAULT 0,
  `created_on` datetime DEFAULT '0000-00-00 00:00:00',
  `modified_on` datetime DEFAULT '0000-00-00 00:00:00',
  `country_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state_master`
--

LOCK TABLES `state_master` WRITE;
/*!40000 ALTER TABLE `state_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `state_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_task`
--

DROP TABLE IF EXISTS `system_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `system_task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `constant_id` int(11) DEFAULT NULL,
  `show_on_web` int(11) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `icon` varchar(40) DEFAULT NULL,
  `sq_no` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_task`
--

LOCK TABLES `system_task` WRITE;
/*!40000 ALTER TABLE `system_task` DISABLE KEYS */;
/*!40000 ALTER TABLE `system_task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_action_master`
--

DROP TABLE IF EXISTS `ticket_action_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket_action_master` (
  `id` int(11) NOT NULL,
  `name` varchar(60) DEFAULT '',
  `stamp` smallint(6) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_action_master`
--

LOCK TABLES `ticket_action_master` WRITE;
/*!40000 ALTER TABLE `ticket_action_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket_action_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_category_master`
--

DROP TABLE IF EXISTS `ticket_category_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket_category_master` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `stamp` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_category_master`
--

LOCK TABLES `ticket_category_master` WRITE;
/*!40000 ALTER TABLE `ticket_category_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket_category_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_header_tran`
--

DROP TABLE IF EXISTS `ticket_header_tran`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket_header_tran` (
  `id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `tkt_number` varchar(75) DEFAULT NULL,
  `time` time DEFAULT NULL,
  `auto_number` int(11) DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `received_by_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `source_id` int(11) DEFAULT NULL,
  `executive_id` int(11) DEFAULT NULL,
  `stamp` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `allocated_to` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_header_tran`
--

LOCK TABLES `ticket_header_tran` WRITE;
/*!40000 ALTER TABLE `ticket_header_tran` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket_header_tran` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_item_tran`
--

DROP TABLE IF EXISTS `ticket_item_tran`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket_item_tran` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_id` int(11) DEFAULT NULL,
  `slno` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `quantity` decimal(20,4) DEFAULT NULL,
  `unit_id` int(11) DEFAULT NULL,
  `remark` text DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=295 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_item_tran`
--

LOCK TABLES `ticket_item_tran` WRITE;
/*!40000 ALTER TABLE `ticket_item_tran` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket_item_tran` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_source_master`
--

DROP TABLE IF EXISTS `ticket_source_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket_source_master` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(60) DEFAULT NULL,
  `stamp` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_source_master`
--

LOCK TABLES `ticket_source_master` WRITE;
/*!40000 ALTER TABLE `ticket_source_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket_source_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_status_master`
--

DROP TABLE IF EXISTS `ticket_status_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket_status_master` (
  `id` int(11) NOT NULL,
  `name` varchar(60) DEFAULT '',
  `stamp` smallint(6) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_status_master`
--

LOCK TABLES `ticket_status_master` WRITE;
/*!40000 ALTER TABLE `ticket_status_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket_status_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_status_tran`
--

DROP TABLE IF EXISTS `ticket_status_tran`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket_status_tran` (
  `ticket_id` int(11) DEFAULT NULL,
  `status_version` int(11) DEFAULT NULL,
  `allocated_to` int(11) unsigned DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `vch_type` smallint(6) DEFAULT NULL,
  `executive_id` int(11) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `sub_status_id` int(11) DEFAULT NULL,
  `action_taken_id` int(11) DEFAULT NULL,
  `next_action_id` int(11) DEFAULT NULL,
  `next_action_date` date DEFAULT NULL,
  `next_action_time` time DEFAULT NULL,
  `ticket_remark` text DEFAULT NULL,
  `suggested_action_remark` text DEFAULT NULL,
  `action_taken_remark` text DEFAULT NULL,
  `closure_remark` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_status_tran`
--

LOCK TABLES `ticket_status_tran` WRITE;
/*!40000 ALTER TABLE `ticket_status_tran` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket_status_tran` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_sub_status_master`
--

DROP TABLE IF EXISTS `ticket_sub_status_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket_sub_status_master` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `stamp` int(11) DEFAULT NULL,
  `ticket_status_id` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_sub_status_master`
--

LOCK TABLES `ticket_sub_status_master` WRITE;
/*!40000 ALTER TABLE `ticket_sub_status_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket_sub_status_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trans_types_masters`
--

DROP TABLE IF EXISTS `trans_types_masters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trans_types_masters` (
  `id` int(11) NOT NULL,
  `short_name` varchar(30) DEFAULT NULL,
  `full_name` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `short_name` (`short_name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_types_masters`
--

LOCK TABLES `trans_types_masters` WRITE;
/*!40000 ALTER TABLE `trans_types_masters` DISABLE KEYS */;
/*!40000 ALTER TABLE `trans_types_masters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unit_master`
--

DROP TABLE IF EXISTS `unit_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unit_master` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `uqc` varchar(50) DEFAULT NULL,
  `stamp` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unit_master`
--

LOCK TABLES `unit_master` WRITE;
/*!40000 ALTER TABLE `unit_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `unit_master` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-17 12:34:28

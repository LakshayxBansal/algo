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
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(60) DEFAULT '',
  `stamp` smallint(6) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `id_UNIQUE` (`id`)
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
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `alias` varchar(60) DEFAULT NULL,
  `name` varchar(60) DEFAULT '',
  `stamp` smallint(6) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=254 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country_master`
--

LOCK TABLES `country_master` WRITE;
/*!40000 ALTER TABLE `country_master` DISABLE KEYS */;
INSERT INTO `country_master` VALUES (1,'AF','Afghanistan',1,NULL,NULL,NULL,NULL),(2,'AX','Aland Islands',1,NULL,NULL,NULL,NULL),(3,'AL','Albania',1,NULL,NULL,NULL,NULL),(4,'DZ','Algeria',1,NULL,NULL,NULL,NULL),(5,'AS','American Samoa',1,NULL,NULL,NULL,NULL),(6,'AD','Andorra',1,NULL,NULL,NULL,NULL),(7,'AO','Angola',1,NULL,NULL,NULL,NULL),(8,'AI','Anguilla',1,NULL,NULL,NULL,NULL),(9,'AQ','Antarctica',1,NULL,NULL,NULL,NULL),(10,'AG','Antigua and Barbuda',1,NULL,NULL,NULL,NULL),(11,'AR','Argentina',1,NULL,NULL,NULL,NULL),(12,'AM','Armenia',1,NULL,NULL,NULL,NULL),(13,'AW','Aruba',1,NULL,NULL,NULL,NULL),(14,'AU','Australia',1,NULL,NULL,NULL,NULL),(15,'AT','Austria',1,NULL,NULL,NULL,NULL),(16,'AZ','Azerbaijan',1,NULL,NULL,NULL,NULL),(17,'BS','Bahamas',1,NULL,NULL,NULL,NULL),(18,'BH','Bahrain',1,NULL,NULL,NULL,NULL),(19,'BD','Bangladesh',1,NULL,NULL,NULL,NULL),(20,'BB','Barbados',1,NULL,NULL,NULL,NULL),(21,'BY','Belarus',1,NULL,NULL,NULL,NULL),(22,'BE','Belgium',1,NULL,NULL,NULL,NULL),(23,'BZ','Belize',1,NULL,NULL,NULL,NULL),(24,'BJ','Benin',1,NULL,NULL,NULL,NULL),(25,'BM','Bermuda',1,NULL,NULL,NULL,NULL),(26,'BT','Bhutan',1,NULL,NULL,NULL,NULL),(27,'BO','Bolivia',1,NULL,NULL,NULL,NULL),(28,'BA','Bosnia and Herzegovina',1,NULL,NULL,NULL,NULL),(29,'BW','Botswana',1,NULL,NULL,NULL,NULL),(30,'BV','Bouvet Island',1,NULL,NULL,NULL,NULL),(31,'BR','Brazil',1,NULL,NULL,NULL,NULL),(32,'IO','British Indian Ocean Territory',1,NULL,NULL,NULL,NULL),(33,'BN','Brunei Darussalam',1,NULL,NULL,NULL,NULL),(34,'BG','Bulgaria',1,NULL,NULL,NULL,NULL),(35,'BF','Burkina Faso',1,NULL,NULL,NULL,NULL),(36,'BI','Burundi',1,NULL,NULL,NULL,NULL),(37,'KH','Cambodia',1,NULL,NULL,NULL,NULL),(38,'CM','Cameroon',1,NULL,NULL,NULL,NULL),(39,'CA','Canada',1,NULL,NULL,NULL,NULL),(40,'CV','Cape Verde',1,NULL,NULL,NULL,NULL),(41,'KY','Cayman Islands',1,NULL,NULL,NULL,NULL),(42,'CF','Central African Republic',1,NULL,NULL,NULL,NULL),(43,'TD','Chad',1,NULL,NULL,NULL,NULL),(44,'CL','Chile',1,NULL,NULL,NULL,NULL),(45,'CN','China',1,NULL,NULL,NULL,NULL),(46,'CX','Christmas Island',1,NULL,NULL,NULL,NULL),(47,'CC','Cocos (Keeling) Islands',1,NULL,NULL,NULL,NULL),(48,'CO','Colombia',1,NULL,NULL,NULL,NULL),(49,'KM','Comoros',1,NULL,NULL,NULL,NULL),(50,'CG','Congo',1,NULL,NULL,NULL,NULL),(51,'CD','Congo, Democratic Republic of the',1,NULL,NULL,NULL,NULL),(52,'CK','Cook Islands',1,NULL,NULL,NULL,NULL),(53,'CR','Costa Rica',1,NULL,NULL,NULL,NULL),(54,'CI','C“te d\'Ivoire',1,NULL,NULL,NULL,NULL),(55,'HR','Croatia (Hrvatska)',1,NULL,NULL,NULL,NULL),(56,'CU','Cuba',1,NULL,NULL,NULL,NULL),(57,'CW','Cura‡ao',1,NULL,NULL,NULL,NULL),(58,'CY','Cyprus',1,NULL,NULL,NULL,NULL),(59,'CZ','Czech Republic',1,NULL,NULL,NULL,NULL),(60,'CS','Czechoslovakia (former)',1,NULL,NULL,NULL,NULL),(61,'KP','Democratic People\'s Republic of Korea',1,NULL,NULL,NULL,NULL),(62,'DK','Denmark',1,NULL,NULL,NULL,NULL),(63,'DJ','Djibouti',1,NULL,NULL,NULL,NULL),(64,'DM','Dominica',1,NULL,NULL,NULL,NULL),(65,'DO','Dominican Republic',1,NULL,NULL,NULL,NULL),(66,'TP','East Timor',1,NULL,NULL,NULL,NULL),(67,'EC','Ecuador',1,NULL,NULL,NULL,NULL),(68,'EG','Egypt',1,NULL,NULL,NULL,NULL),(69,'SV','El Salvador',1,NULL,NULL,NULL,NULL),(70,'GQ','Equatorial Guinea',1,NULL,NULL,NULL,NULL),(71,'ER','Eritrea',1,NULL,NULL,NULL,NULL),(72,'EE','Estonia',1,NULL,NULL,NULL,NULL),(73,'ET','Ethiopia',1,NULL,NULL,NULL,NULL),(74,'EU','European Union',1,NULL,NULL,NULL,NULL),(75,'FK','Falkland Islands (Malvinas)',1,NULL,NULL,NULL,NULL),(76,'FO','Faroe Islands',1,NULL,NULL,NULL,NULL),(77,'FM','Federated States of Micronesia',1,NULL,NULL,NULL,NULL),(78,'FJ','Fiji',1,NULL,NULL,NULL,NULL),(79,'FI','Finland',1,NULL,NULL,NULL,NULL),(80,'FR','France',1,NULL,NULL,NULL,NULL),(81,'GF','French Guiana',1,NULL,NULL,NULL,NULL),(82,'PF','French Polynesia',1,NULL,NULL,NULL,NULL),(83,'TF','French Southern Territories',1,NULL,NULL,NULL,NULL),(84,'GA','Gabon',1,NULL,NULL,NULL,NULL),(85,'GM','Gambia',1,NULL,NULL,NULL,NULL),(86,'GE','Georgia',1,NULL,NULL,NULL,NULL),(87,'DE','Germany',1,NULL,NULL,NULL,NULL),(88,'GH','Ghana',1,NULL,NULL,NULL,NULL),(89,'GI','Gibraltar',1,NULL,NULL,NULL,NULL),(90,'GR','Greece',1,NULL,NULL,NULL,NULL),(91,'GL','Greenland',1,NULL,NULL,NULL,NULL),(92,'GD','Grenada',1,NULL,NULL,NULL,NULL),(93,'GP','Guadeloupe',1,NULL,NULL,NULL,NULL),(94,'GU','Guam',1,NULL,NULL,NULL,NULL),(95,'GT','Guatemala',1,NULL,NULL,NULL,NULL),(96,'GG','Guernsey',1,NULL,NULL,NULL,NULL),(97,'GN','Guinea',1,NULL,NULL,NULL,NULL),(98,'GW','Guinea-Bissau',1,NULL,NULL,NULL,NULL),(99,'GY','Guyana',1,NULL,NULL,NULL,NULL),(100,'HT','Haiti',1,NULL,NULL,NULL,NULL),(101,'HM','Heard Island and McDonald Islands',1,NULL,NULL,NULL,NULL),(102,'VA','Holy See',1,NULL,NULL,NULL,NULL),(103,'HN','Honduras',1,NULL,NULL,NULL,NULL),(104,'HK','Hong Kong',1,NULL,NULL,NULL,NULL),(105,'HU','Hungary',1,NULL,NULL,NULL,NULL),(106,'IS','Iceland',1,NULL,NULL,NULL,NULL),(107,'IN','India',1,NULL,NULL,NULL,NULL),(108,'ID','Indonesia',1,NULL,NULL,NULL,NULL),(109,'IQ','Iraq',1,NULL,NULL,NULL,NULL),(110,'IE','Ireland',1,NULL,NULL,NULL,NULL),(111,'IR','Islamic Republic of Iran',1,NULL,NULL,NULL,NULL),(112,'IM','Isle of Man',1,NULL,NULL,NULL,NULL),(113,'IL','Israel',1,NULL,NULL,NULL,NULL),(114,'IT','Italy',1,NULL,NULL,NULL,NULL),(115,'JM','Jamaica',1,NULL,NULL,NULL,NULL),(116,'JP','Japan',1,NULL,NULL,NULL,NULL),(117,'JE','Jersey',1,NULL,NULL,NULL,NULL),(118,'JO','Jordan',1,NULL,NULL,NULL,NULL),(119,'KZ','Kazakhstan',1,NULL,NULL,NULL,NULL),(120,'KE','Kenya',1,NULL,NULL,NULL,NULL),(121,'KI','Kiribati',1,NULL,NULL,NULL,NULL),(122,'XK','Kosovo',1,NULL,NULL,NULL,NULL),(123,'KW','Kuwait',1,NULL,NULL,NULL,NULL),(124,'KG','Kyrgyzstan',1,NULL,NULL,NULL,NULL),(125,'LA','Lao People\'s Democratic Republic',1,NULL,NULL,NULL,NULL),(126,'LV','Latvia',1,NULL,NULL,NULL,NULL),(127,'LB','Lebanon',1,NULL,NULL,NULL,NULL),(128,'LS','Lesotho',1,NULL,NULL,NULL,NULL),(129,'LR','Liberia',1,NULL,NULL,NULL,NULL),(130,'LY','Libyan Arab Jamahiriya',1,NULL,NULL,NULL,NULL),(131,'LI','Liechtenstein',1,NULL,NULL,NULL,NULL),(132,'LT','Lithuania',1,NULL,NULL,NULL,NULL),(133,'LU','Luxembourg',1,NULL,NULL,NULL,NULL),(134,'MO','Macau',1,NULL,NULL,NULL,NULL),(135,'MG','Madagascar',1,NULL,NULL,NULL,NULL),(136,'MW','Malawi',1,NULL,NULL,NULL,NULL),(137,'MY','Malaysia',1,NULL,NULL,NULL,NULL),(138,'MV','Maldives',1,NULL,NULL,NULL,NULL),(139,'ML','Mali',1,NULL,NULL,NULL,NULL),(140,'MT','Malta',1,NULL,NULL,NULL,NULL),(141,'MH','Marshall Islands',1,NULL,NULL,NULL,NULL),(142,'MQ','Martinique',1,NULL,NULL,NULL,NULL),(143,'MR','Mauritania',1,NULL,NULL,NULL,NULL),(144,'MU','Mauritius',1,NULL,NULL,NULL,NULL),(145,'YT','Mayotte',1,NULL,NULL,NULL,NULL),(146,'MX','Mexico',1,NULL,NULL,NULL,NULL),(147,'MC','Monaco',1,NULL,NULL,NULL,NULL),(148,'MN','Mongolia',1,NULL,NULL,NULL,NULL),(149,'ME','Montenegro',1,NULL,NULL,NULL,NULL),(150,'MS','Montserrat',1,NULL,NULL,NULL,NULL),(151,'MA','Morocco',1,NULL,NULL,NULL,NULL),(152,'MZ','Mozambique',1,NULL,NULL,NULL,NULL),(153,'MM','Myanmar',1,NULL,NULL,NULL,NULL),(154,'NA','Namibia',1,NULL,NULL,NULL,NULL),(155,'NR','Nauru',1,NULL,NULL,NULL,NULL),(156,'NP','Nepal',1,NULL,NULL,NULL,NULL),(157,'NL','Netherlands',1,NULL,NULL,NULL,NULL),(158,'AN','Netherlands Antilles',1,NULL,NULL,NULL,NULL),(159,'NT','Neutral Zone',1,NULL,NULL,NULL,NULL),(160,'NC','New Caledonia',1,NULL,NULL,NULL,NULL),(161,'NZ','New Zealand',1,NULL,NULL,NULL,NULL),(162,'NI','Nicaragua',1,NULL,NULL,NULL,NULL),(163,'NE','Niger',1,NULL,NULL,NULL,NULL),(164,'NG','Nigeria',1,NULL,NULL,NULL,NULL),(165,'NU','Niue',1,NULL,NULL,NULL,NULL),(166,'NF','Norfolk Island',1,NULL,NULL,NULL,NULL),(167,'MP','Northern Mariana Islands',1,NULL,NULL,NULL,NULL),(168,'NO','Norway',1,NULL,NULL,NULL,NULL),(169,'OM','Oman',1,NULL,NULL,NULL,NULL),(170,'PK','Pakistan',1,NULL,NULL,NULL,NULL),(171,'PW','Palau',1,NULL,NULL,NULL,NULL),(172,'PS','Palestinian Territory, Occupied',1,NULL,NULL,NULL,NULL),(173,'PA','Panama',1,NULL,NULL,NULL,NULL),(174,'PG','Papua New Guinea',1,NULL,NULL,NULL,NULL),(175,'PY','Paraguay',1,NULL,NULL,NULL,NULL),(176,'PE','Peru',1,NULL,NULL,NULL,NULL),(177,'PH','Philippines',1,NULL,NULL,NULL,NULL),(178,'PN','Pitcairn',1,NULL,NULL,NULL,NULL),(179,'PL','Poland',1,NULL,NULL,NULL,NULL),(180,'PT','Portugal',1,NULL,NULL,NULL,NULL),(181,'PR','Puerto Rico',1,NULL,NULL,NULL,NULL),(182,'QA','Qatar',1,NULL,NULL,NULL,NULL),(183,'KR','Republic of Korea',1,NULL,NULL,NULL,NULL),(184,'MD','Republic of Moldova',1,NULL,NULL,NULL,NULL),(185,'RE','Reunion',1,NULL,NULL,NULL,NULL),(186,'RO','Romania',1,NULL,NULL,NULL,NULL),(187,'RU','Russian Federation',1,NULL,NULL,NULL,NULL),(188,'RW','Rwanda',1,NULL,NULL,NULL,NULL),(189,'SH','Saint Helena',1,NULL,NULL,NULL,NULL),(190,'KN','Saint Kitts and Nevis',1,NULL,NULL,NULL,NULL),(191,'LC','Saint Lucia',1,NULL,NULL,NULL,NULL),(192,'MF','Saint Martin',1,NULL,NULL,NULL,NULL),(193,'VC','Saint Vincent & the Grenadines',1,NULL,NULL,NULL,NULL),(194,'WS','Samoa',1,NULL,NULL,NULL,NULL),(195,'SM','San Marino',1,NULL,NULL,NULL,NULL),(196,'ST','Sao Tome and Principe',1,NULL,NULL,NULL,NULL),(197,'SA','Saudi Arabia',1,NULL,NULL,NULL,NULL),(198,'SN','Senegal',1,NULL,NULL,NULL,NULL),(199,'RS','Serbia',1,NULL,NULL,NULL,NULL),(200,'SC','Seychelles',1,NULL,NULL,NULL,NULL),(201,'SL','Sierra Leone',1,NULL,NULL,NULL,NULL),(202,'SG','Singapore',1,NULL,NULL,NULL,NULL),(203,'SX','Sint Maarten',1,NULL,NULL,NULL,NULL),(204,'SK','Slovakia',1,NULL,NULL,NULL,NULL),(205,'SI','Slovenia',1,NULL,NULL,NULL,NULL),(206,'SB','Solomon Islands',1,NULL,NULL,NULL,NULL),(207,'SO','Somalia',1,NULL,NULL,NULL,NULL),(208,'ZA','South Africa',1,NULL,NULL,NULL,NULL),(209,'GS','South Georgia and The South Sandwich Islands',1,NULL,NULL,NULL,NULL),(210,'SS','South Sudan',1,NULL,NULL,NULL,NULL),(211,'ES','Spain',1,NULL,NULL,NULL,NULL),(212,'LK','Sri Lanka',1,NULL,NULL,NULL,NULL),(213,'PM','St. Pierre and Miquelon',1,NULL,NULL,NULL,NULL),(214,'SD','Sudan',1,NULL,NULL,NULL,NULL),(215,'SR','Suriname',1,NULL,NULL,NULL,NULL),(216,'SJ','Svalbard and Jan Mayen',1,NULL,NULL,NULL,NULL),(217,'SZ','Swaziland',1,NULL,NULL,NULL,NULL),(218,'SE','Sweden',1,NULL,NULL,NULL,NULL),(219,'CH','Switzerland',1,NULL,NULL,NULL,NULL),(220,'SY','Syrian Arab Republic',1,NULL,NULL,NULL,NULL),(221,'TW','Taiwan',1,NULL,NULL,NULL,NULL),(222,'TJ','Tajikistan',1,NULL,NULL,NULL,NULL),(223,'TH','Thailand',1,NULL,NULL,NULL,NULL),(224,'MK','The Former Yugoslav Republic of Macedonia',1,NULL,NULL,NULL,NULL),(225,'TL','Timor-Leste',1,NULL,NULL,NULL,NULL),(226,'TG','Togo',1,NULL,NULL,NULL,NULL),(227,'TK','Tokelau',1,NULL,NULL,NULL,NULL),(228,'TO','Tonga',1,NULL,NULL,NULL,NULL),(229,'TT','Trinidad and Tobago',1,NULL,NULL,NULL,NULL),(230,'TN','Tunisia',1,NULL,NULL,NULL,NULL),(231,'TR','Turkey',1,NULL,NULL,NULL,NULL),(232,'TM','Turkmenistan',1,NULL,NULL,NULL,NULL),(233,'TC','Turks and Caicos Islands',1,NULL,NULL,NULL,NULL),(234,'TV','Tuvalu',1,NULL,NULL,NULL,NULL),(235,'UM','US Minor Outlying Islands',1,NULL,NULL,NULL,NULL),(236,'UG','Uganda',1,NULL,NULL,NULL,NULL),(237,'UA','Ukraine',1,NULL,NULL,NULL,NULL),(238,'AE','United Arab Emirates',1,NULL,NULL,NULL,NULL),(239,'GB','United Kingdom',1,NULL,NULL,NULL,NULL),(240,'TZ','United Republic of Tanzania',1,NULL,NULL,NULL,NULL),(241,'US','United States of America',1,NULL,NULL,NULL,NULL),(242,'UY','Uruguay',1,NULL,NULL,NULL,NULL),(243,'UZ','Uzbekistan',1,NULL,NULL,NULL,NULL),(244,'VU','Vanuatu',1,NULL,NULL,NULL,NULL),(245,'VE','Venezuela',1,NULL,NULL,NULL,NULL),(246,'VN','Viet Nam',1,NULL,NULL,NULL,NULL),(247,'VG','Virgin Islands (British)',1,NULL,NULL,NULL,NULL),(248,'VI','Virgin Islands (U.S.A.)',1,NULL,NULL,NULL,NULL),(249,'WF','Wallis and Futuna',1,NULL,NULL,NULL,NULL),(250,'EH','Western Sahara',1,NULL,NULL,NULL,NULL),(251,'YE','Yemen',1,NULL,NULL,NULL,NULL),(252,'ZM','Zambia',1,NULL,NULL,NULL,NULL),(253,'ZW','Zimbabwe',1,NULL,NULL,NULL,NULL);
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
-- Table structure for table `enquiry_action_tran`
--

DROP TABLE IF EXISTS `enquiry_action_tran`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enquiry_action_tran` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `call_id` int(11) DEFAULT NULL,
  `action_taken_by` int(11) DEFAULT NULL,
  `action_taken_datetime` datetime DEFAULT NULL,
  `action_remark` text DEFAULT NULL,
  `call_status_id` int(11) DEFAULT NULL,
  `call_sub_status_id` int(11) DEFAULT NULL,
  `closer_remark` varchar(255) DEFAULT NULL,
  `enquiry_action_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiry_action_tran`
--

LOCK TABLES `enquiry_action_tran` WRITE;
/*!40000 ALTER TABLE `enquiry_action_tran` DISABLE KEYS */;
/*!40000 ALTER TABLE `enquiry_action_tran` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enquiry_allocation`
--

DROP TABLE IF EXISTS `enquiry_allocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enquiry_allocation` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `allocation_date` datetime DEFAULT NULL,
  `executive_id` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `narration` varchar(255) DEFAULT NULL,
  `enquiry_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
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
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `stamp` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_option_master`
--

LOCK TABLES `menu_option_master` WRITE;
/*!40000 ALTER TABLE `menu_option_master` DISABLE KEYS */;
INSERT INTO `menu_option_master` VALUES (1,'Dashboard','Dashboard',0,'DashboardIcon','/cap',0,NULL,NULL,NULL,NULL,0),(2,'Enquiry','Enquiry',0,'InboxIcon','#',0,NULL,NULL,NULL,NULL,0),(3,'Campaign','Campaign',0,'PeopleIcon','#',0,NULL,NULL,NULL,NULL,0),(4,'Reports','Reports',0,'BarChartIcon','#',0,NULL,NULL,NULL,NULL,0),(5,'Admin','Admin',0,'LayersIcon','#',0,NULL,NULL,NULL,NULL,0),(6,'Add Inquiry','Add',2,'AddIcCallIcon','/cap/enquiry',0,NULL,NULL,NULL,NULL,0),(7,'Allocate','Allocate',2,'InboxIcon','#',0,NULL,NULL,NULL,NULL,0),(8,'Update','Update',2,'PeopleIcon','#',0,NULL,NULL,NULL,NULL,0),(9,'Masters','Masters',5,'DashboardIcon','#',0,NULL,NULL,NULL,NULL,0),(10,'Modify Company','Modify Company',5,'InboxIcon','#',0,NULL,NULL,NULL,NULL,0),(11,'Add User','Add User',5,'PeopleIcon','#',0,NULL,NULL,NULL,NULL,0),(12,'Enquiry Masters','Enquiry Masters',9,'DashboardIcon','#',0,NULL,NULL,NULL,NULL,0),(13,'Support Masters','Support Masters',9,'DashboardIcon','#',0,NULL,NULL,NULL,NULL,0),(14,'Action','Actions',12,'DashboardIcon','#',0,NULL,NULL,NULL,NULL,0),(15,'Category','Category',12,'DashboardIcon','#',0,NULL,NULL,NULL,NULL,0),(16,'Add','Add',14,NULL,'/admin/action/add',NULL,'2024-04-22 15:30:57','2024-04-22 15:30:57',NULL,NULL,0),(17,'Modify','Modify',14,NULL,'/admin/action/modify',NULL,'2024-04-22 15:31:22','2024-04-22 15:31:22',NULL,NULL,0);
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

-- Dump completed on 2024-04-25 15:28:29

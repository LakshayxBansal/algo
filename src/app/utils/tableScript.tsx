export const dbTableAndProScript =
  "CREATE TABLE `object_category_master` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `name` varchar(45) NOT NULL,\
  PRIMARY KEY (`id`)\
);~\
INSERT INTO `object_category_master` VALUES (1,'master'),(2,'transaction'),(3,'report');~\
CREATE TABLE `object_rights_master` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `object_id` int(11) NOT NULL,\
  `admin_create` int(11) NOT NULL DEFAULT 1,\
  `admin_read` int(11) NOT NULL DEFAULT 1,\
  `admin_update` int(11) NOT NULL DEFAULT 1,\
  `admin_delete` int(11) NOT NULL DEFAULT 1,\
  `manager_create` int(11) NOT NULL DEFAULT 1,\
  `manager_read` int(11) NOT NULL DEFAULT 1,\
  `manager_update` int(11) NOT NULL DEFAULT 1,\
  `manager_delete` int(11) NOT NULL DEFAULT 1,\
  `executive_create` int(11) NOT NULL DEFAULT 1,\
  `executive_read` int(11) NOT NULL DEFAULT 1,\
  `executive_update` int(11) NOT NULL DEFAULT 1,\
  `executive_delete` int(11) NOT NULL DEFAULT 1,\
  PRIMARY KEY (`id`)\
);~\
INSERT INTO `object_rights_master` VALUES (1,1,1,1,1,1,1,1,1,1,1,1,1,1),(2,2,1,1,1,1,1,1,1,1,1,1,1,1),\
    (3,3,1,1,1,1,1,1,1,1,1,1,1,1),(4,4,1,1,1,1,1,1,1,1,1,1,1,1),(5,5,1,1,1,1,1,1,1,1,1,1,1,1),\
    (6,6,1,1,1,1,1,1,1,1,1,1,1,1),(7,7,1,1,1,1,1,1,1,1,1,1,1,1),(8,8,1,1,1,1,1,1,1,1,1,1,1,1),\
    (9,9,1,1,1,1,1,1,1,1,1,1,1,1),(10,10,1,1,1,1,1,1,1,1,1,1,1,1),(11,11,1,1,1,1,1,1,1,1,1,1,1,1),\
    (12,12,1,1,1,1,1,1,1,1,1,1,1,1),(13,13,1,1,1,1,1,1,1,1,1,1,1,1),(14,14,1,1,1,1,1,1,1,1,1,1,1,1),\
    (15,15,1,1,1,1,1,1,1,1,1,1,1,1),(16,16,1,1,1,1,1,1,1,1,1,1,1,1),(17,17,1,1,1,1,1,1,1,1,1,1,1,1),\
    (18,18,1,1,1,1,1,1,1,1,1,1,1,1),(19,19,1,1,1,1,1,1,1,1,1,1,1,1),(20,20,1,1,1,1,1,1,1,1,1,1,1,1),\
    (21,21,1,1,1,1,1,1,1,1,1,1,1,1),(22,22,1,1,1,1,1,1,1,1,1,1,1,1),(23,23,1,1,1,1,1,1,1,1,1,1,1,1),\
    (24,24,1,1,1,1,1,1,1,1,1,1,1,1),(25,25,1,1,1,1,1,1,1,1,1,1,1,1);~\
CREATE TABLE `object_type_master` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `name` varchar(45) NOT NULL,\
  `type` int(11) NOT NULL,\
  PRIMARY KEY (`id`)\
);~\
INSERT INTO `object_type_master` VALUES (1,'Action',2),(2,'Allocation Type',2),(3,'Area',1),(4,'Category',1),\
    (5,'Contact',1),(6,'Contact Group',1),(7,'Country',1),(8,'Currency',1),(9,'Department',1),\
    (10,'Executive Dept',1),(11,'Executive',1),(12,'Executive Group',1),(13,'Executive Role',1),\
    (14,'Invite User',2),(15,'Company User',2),(16,'Item',1),(17,'Item Group',1),(18,'Notification',3),\
    (19,'Organisation',1),(20,'Source',1),(21,'State',1),(22,'State List',1),(23,'Sub Status',2),\
    (24,'Sub Status List',2),(25,'Unit',1),(26,'Enquiry',2);~\
CREATE TABLE `config_meta_data` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `config_type` varchar(100) NOT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `config_type_UNIQUE` (`config_type`)\
);~\
CREATE TABLE `menu_option_master` (\
  `id` int(11) DEFAULT NULL,\
  `name` text DEFAULT NULL,\
  `short_name` text DEFAULT NULL,\
  `parent_id` int(11) DEFAULT NULL,\
  `icon` text DEFAULT NULL,\
  `href` text DEFAULT NULL,\
  `default_open` int(11) DEFAULT NULL,\
  `created_on` text DEFAULT NULL,\
  `modified_on` text DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  `menu_order` int(11) DEFAULT NULL\
);~\
INSERT INTO `menu_option_master` VALUES (1,'Dashboard','Dashboard',0,'SpaceDashboardOutlinedIcon','/cap',0,'','',0,0,0),\
  (2,'Enquiry','Enquiry',0,'FolderOutlinedIcon','#',0,'','',0,0,0),(3,'Campaign','Campaign',0,'PeopleAltOutlinedIcon','#',0,'','',0,0,0),\
  (4,'Reports','Reports',0,'BarChartIcon','#',0,'','',0,0,0),(5,'Admin','Admin',0,'FolderOutlinedIcon','#',0,'','',0,0,0),\
  (6,'Add Inquiry','Add',2,'AddIcCallIcon','/cap/enquiry',0,'','',0,0,0),(7,'Allocate','Allocate',2,'InboxIcon','/cap/callexplorer',0,'','',0,0,0),\
  (8,'Update','Update',2,'PeopleAltOutlinedIcon','#',0,'','',0,0,0),(9,'Masters','Masters',5,'FolderOutlinedIcon','#',0,'','',0,0,0),\
  (10,'Modify Company','Modify Company',5,'InboxIcon','#',0,'','',0,0,0),(11,'Add User','Add User',5,'PeopleAltOutlinedIcon','#',0,'','',0,0,0),\
  (12,'Enquiry Masters','Enquiry Masters',9,'FolderOutlinedIcon','#',0,'','',0,0,0),(13,'Support Masters','Support Masters',9,'DashboardIcon','#',0,'','',0,0,0),\
  (14,'Action','Actions',12,'FolderOutlinedIcon','/cap/admin/lists/actionList',0,'','',0,0,0),(15,'Category','Category',12,'DashboardIcon','/cap/admin/lists/categoryList',0,'','',0,0,0),\
  (28,'Source','Source',12,'FolderOutlinedIcon','/cap/admin/lists/sourceList',0,'','',0,0,0),\
  (31,'Contact','Contacts',12,'ContactsIcon','/cap/admin/lists/contactList',0,'','',0,0,0),\
  (34,'Enquiry Sub Status','Enquiry Sub Status',12,'FolderOutlinedIcon','/cap/admin/lists/subStatusList',0,'','',0,0,0),\
  (35,'Allocation Type','Allocation Type',12,'FolderOutlinedIcon','/cap/admin/lists/allocationTypeList',0,'','',0,0,0),\
  (36,'Enquiry Item','Enquiry Item',12,'FolderOutlinedIcon','/cap/admin/lists/itemList',0,'','',0,0,0),\
  (37,'Item Group','Item Group',12,'FolderOutlinedIcon','/cap/admin/lists/itemGroupList',0,'','',0,0,0),\
  (38,'Item Unit','Item Unit',12,'FolderOutlinedIcon','/cap/admin/lists/unitList',0,'','',0,0,0),\
  (39,'Organisation','Organisation',12,'FolderOutlinedIcon','/cap/admin/lists/organisationList',0,'','',0,0,0),\
  (40,'Contact Group','Contact Group',12,'FolderOutlinedIcon','/cap/admin/lists/contactGroupList',0,'','',0,0,0),\
  (41,'Department','Department',12,'FolderOutlinedIcon','/cap/admin/lists/departmentList',0,'','',0,0,0),\
  (42,'Country','Country',12,'FolderOutlinedIcon','/cap/admin/lists/countryList',0,'','',0,0,0),\
  (43,'State','State',12,'FolderOutlinedIcon','/cap/admin/lists/stateList',0,'','',0,0,0),\
  (44,'City','City',12,'FolderOutlinedIcon','#',0,'','',0,0,0),(45,'Executive','Executive',12,'FolderOutlinedIcon','/cap/admin/lists/executiveList',0,'','',0,0,0),\
  (46,'Executive Area','Executive Area',12,'FolderOutlinedIcon','#',0,'','',0,0,0),\
  (47,'Executive Role','Executive Role',12,'FolderOutlinedIcon','/cap/admin/lists/executiveRoleList',0,'','',0,0,0),\
  (48,'Executive Dept','Executive Dept',12,'FolderOutlinedIcon','/cap/admin/lists/executiveDeptList',0,'','',0,0,0),\
  (49,'Executive Group','Executive Group',12,'FolderOutlinedIcon','/cap/admin/lists/executiveGroupList',0,'','',0,0,0),\
  (50,'Currency','Currency',12,'FolderOutlinedIcon','/cap/admin/lists/currencyList',0,'','',0,0,0),\
  (51,'Config','Config',5,'FolderOutlinedIcon','#',0,'','',0,0,0),(52,'Enquiry Config','Enquiry Config',51,'FolderOutlinedIcon','/cap/admin/enquirySupportConfig',0,'','',0,0,0);~\
CREATE TABLE `app_config` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `config_type_id` int(11) NOT NULL,\
  `config` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `config_type_id_UNIQUE` (`config_type_id`),\
  CONSTRAINT `app_config_ibfk_1` FOREIGN KEY (`config_type_id`) REFERENCES `config_meta_data` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,\
  CONSTRAINT `app_config_chk_1` CHECK (json_valid(`config`))\
);~\
CREATE TABLE `allocation_type_master` (\
  `id` int(11) DEFAULT NULL,\
  `name` varchar(50) DEFAULT NULL,\
  `stamp` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL\
);~\
CREATE TABLE `area_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `name` varchar(60) DEFAULT '',\
  `stamp` smallint(6) DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  PRIMARY KEY (`id`) USING BTREE,\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `business_profile` ( `id` int(11) NOT NULL, `name` varchar(60) DEFAULT NULL,\
  `address1` varchar(75) DEFAULT NULL, `address2` varchar(75) DEFAULT NULL, `address3` varchar(75) DEFAULT NULL,\
  `city` varchar(75) DEFAULT NULL, `state_id` int(11) DEFAULT NULL, `country_id` int(11) DEFAULT NULL,\
  `pincode` varchar(20) DEFAULT NULL, `mobile` varchar(20) DEFAULT NULL, `pan` varchar(20) DEFAULT NULL,\
  `gstin` varchar(20) DEFAULT NULL, `email` varchar(100) DEFAULT NULL, PRIMARY KEY (`id`)\
);~\
CREATE TABLE `call_allocation` ( `call_id` int(11) DEFAULT NULL, `allocated_to` int(11) DEFAULT NULL,\
  `allocated_on` datetime DEFAULT NULL, `allocated_by` int(11) DEFAULT NULL,\
  `next_action_id` int(11) DEFAULT NULL, `next_action_datetime` datetime DEFAULT NULL\
);~\
CREATE TABLE `call_receipt` ( `id` int(11) DEFAULT NULL, `received_datetime` datetime DEFAULT NULL,\
  `call_no` varchar(40) DEFAULT NULL, `contact_id` int(11) DEFAULT NULL, `received_by` int(11) DEFAULT NULL,\
  `call_status` int(11) DEFAULT NULL, `call_sub_status` int(11) DEFAULT NULL, `next_action_id` int(11) DEFAULT NULL,\
  `next_action_datetime` datetime DEFAULT NULL, `allocated_to` int(11) DEFAULT NULL,\
  `call_remark` text DEFAULT NULL, `call_suggested_remark` text DEFAULT NULL\
);~\
CREATE TABLE `call_type_master` ( `id` int(11) unsigned NOT NULL AUTO_INCREMENT, `name` varchar(60) DEFAULT '',\
  `stamp` smallint(6) DEFAULT NULL, `created_by` int(11) DEFAULT NULL, `modified_by` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL, `modified_on` datetime DEFAULT NULL, PRIMARY KEY (`id`) USING BTREE,\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `company` ( `id` int(10) unsigned NOT NULL AUTO_INCREMENT, `name` varchar(45) DEFAULT NULL,\
  `add1` varchar(45) DEFAULT NULL, `add2` varchar(45) DEFAULT NULL, `city` varchar(45) DEFAULT NULL,\
  `pincode` varchar(45) DEFAULT NULL, `dbinfo_id` int(11) DEFAULT NULL, `stateId` int(11) DEFAULT NULL,\
  `cfield1` varchar(50) DEFAULT NULL, `cfield2` varchar(50) DEFAULT NULL, `cfield3` varchar(50) DEFAULT NULL,\
  `cfield4` varchar(50) DEFAULT NULL, `cfield5` varchar(50) DEFAULT NULL, `cfield6` varchar(50) DEFAULT NULL,\
  `cfield7` varchar(50) DEFAULT NULL, PRIMARY KEY (`id`), UNIQUE KEY `companyId_UNIQUE` (`id`)\
);~\
CREATE TABLE `contact_group_master` ( `id` int(11) unsigned NOT NULL AUTO_INCREMENT, `alias` varchar(60) DEFAULT '',\
  `name` varchar(60) NOT NULL DEFAULT '', `stamp` smallint(6) DEFAULT 0, `parent_id` int(11) DEFAULT 0,\
  `created_by` int(11) DEFAULT 0, `modified_by` int(11) DEFAULT 0, `created_on` datetime DEFAULT '0000-00-00 00:00:00',\
  `modified_on` datetime DEFAULT '0000-00-00 00:00:00', `is_parent` tinyint(4) DEFAULT NULL,\
  PRIMARY KEY (`id`), UNIQUE KEY `id_UNIQUE` (`id`), UNIQUE KEY `name_UNIQUE` (`name`)\
);~\
CREATE TABLE `contact_master` (`id` int(11) unsigned NOT NULL AUTO_INCREMENT, `alias` varchar(60) DEFAULT NULL,\
  `name` varchar(60) DEFAULT NULL, `print_name` varchar(60) DEFAULT NULL, `group_id` int(11) DEFAULT NULL,\
  `pan` varchar(20) DEFAULT NULL, `aadhaar` varchar(20) DEFAULT NULL, `address1` varchar(75) DEFAULT NULL,\
  `address2` varchar(75) DEFAULT NULL, `address3` varchar(75) DEFAULT NULL, `city` varchar(75) DEFAULT NULL,\
  `state_id` int(11) DEFAULT NULL, `area_id` int(11) DEFAULT NULL, `pincode` varchar(15) DEFAULT NULL,\
  `country_id` int(11) DEFAULT NULL, `email` varchar(100) DEFAULT NULL, `mobile` varchar(20) DEFAULT NULL,\
  `whatsapp` varchar(20) DEFAULT NULL, `created_by` int(11) DEFAULT NULL, `created_on` datetime DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL, `modified_on` datetime DEFAULT NULL, `stamp` int(11) DEFAULT NULL,\
  `dob` datetime DEFAULT NULL, `doa` datetime DEFAULT NULL, `department_id` int(11) DEFAULT NULL,\
  `organisation_id` int(11) DEFAULT NULL, PRIMARY KEY (`id`)\
);~\
CREATE TABLE `country_master` ( `id` int(11) unsigned NOT NULL AUTO_INCREMENT, `alias` varchar(60) DEFAULT NULL,\
  `name` varchar(60) DEFAULT '', `stamp` smallint(6) DEFAULT NULL, `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL, `created_on` datetime DEFAULT NULL, `modified_on` datetime DEFAULT NULL,\
  PRIMARY KEY (`id`), UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `dbHost` ( `id` int(10) unsigned NOT NULL AUTO_INCREMENT, `host` varchar(45) DEFAULT NULL, \
  `port` varchar(45) DEFAULT NULL, `useForNextDb` int(11) DEFAULT NULL, PRIMARY KEY (`id`)\
);~\
CREATE TABLE `dbInfo` ( `id` int(10) unsigned NOT NULL AUTO_INCREMENT, `host_id` int(11) DEFAULT NULL,\
  `name` varchar(45) DEFAULT NULL, PRIMARY KEY (`id`), UNIQUE KEY `dbId_UNIQUE` (`id`)\
);~\
CREATE TABLE `department_master` ( `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `name` varchar(60) NOT NULL DEFAULT '', `stamp` smallint(6) DEFAULT 0, `created_by` int(11) DEFAULT 0,\
  `modified_by` int(11) DEFAULT 0, `created_on` datetime DEFAULT NULL, `modified_on` datetime DEFAULT NULL,\
  PRIMARY KEY (`id`) USING BTREE, UNIQUE KEY `name_UNIQUE` (`name`), UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `enquiry_action_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `name` varchar(60) DEFAULT '', `stamp` smallint(6) DEFAULT NULL, `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL, `created_on` datetime DEFAULT NULL, `modified_on` datetime DEFAULT NULL,\
  PRIMARY KEY (`id`) USING BTREE, UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `enquiry_action_tran` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `call_id` int(11) DEFAULT NULL,\
  `action_taken_by` int(11) DEFAULT NULL,\
  `action_taken_datetime` datetime DEFAULT NULL,\
  `action_remark` text DEFAULT NULL,\
  `call_status_id` int(11) DEFAULT NULL,\
  `call_sub_status_id` int(11) DEFAULT NULL,\
  `closer_remark` varchar(255) DEFAULT NULL,\
  `enquiry_action_id` int(11) NOT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `enquiry_allocation` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `allocation_date` datetime DEFAULT NULL,\
  `executive_id` int(11) DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `narration` varchar(255) DEFAULT NULL,\
  `enquiry_id` int(11) DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `enquiry_allocation_detail` (\
  `allocation_id` int(11) DEFAULT NULL,\
  `enquiry_id` int(11) DEFAULT NULL,\
  `slno` int(11) DEFAULT NULL\
);~\
CREATE TABLE `enquiry_category_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `name` varchar(60) DEFAULT NULL,\
  `stamp` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `enquiry_header_tran` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `enq_number` varchar(75) DEFAULT NULL,\
  `date` datetime DEFAULT NULL,\
  `auto_number` int(11) DEFAULT NULL,\
  `contact_id` int(11) DEFAULT NULL,\
  `received_by_id` int(11) DEFAULT NULL,\
  `category_id` int(11) DEFAULT NULL,\
  `source_id` int(11) DEFAULT NULL,\
  `stamp` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `call_receipt_remark` text DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `enquiry_item_tran` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `enquiry_id` int(11) DEFAULT NULL,\
  `slno` int(11) DEFAULT NULL,\
  `item_id` int(11) DEFAULT NULL,\
  `quantity` decimal(20,4) DEFAULT NULL,\
  `unit_id` int(11) DEFAULT NULL,\
  `remark` text DEFAULT NULL,\
  PRIMARY KEY (`id`)\
);~\
CREATE TABLE `enquiry_ledger_tran` (\
  `enquiry_id` int(11) DEFAULT NULL,\
  `status_version` int(11) DEFAULT NULL,\
  `allocated_to` int(11) unsigned DEFAULT NULL,\
  `date` datetime DEFAULT NULL,\
  `status_id` int(11) DEFAULT NULL,\
  `sub_status_id` int(11) DEFAULT NULL,\
  `action_taken_id` int(11) DEFAULT NULL,\
  `next_action_id` int(11) DEFAULT NULL,\
  `next_action_date` datetime DEFAULT NULL,\
  `suggested_action_remark` text DEFAULT NULL,\
  `action_taken_remark` text DEFAULT NULL,\
  `closure_remark` text DEFAULT NULL,\
  `enquiry_tran_type_id` int(11) DEFAULT NULL,\
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\
  `active` int(11) NOT NULL DEFAULT 1,\
  `modified_on` datetime DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `enquiry_maturity_type` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `name` varchar(50) DEFAULT NULL,\
  `stamp` int(11) DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `enquiry_source_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `name` varchar(60) DEFAULT NULL,\
  `stamp` int(11) DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `enquiry_status_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `name` varchar(60) NOT NULL DEFAULT '',\
  `stamp` smallint(6) DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  PRIMARY KEY (`id`) USING BTREE,\
  UNIQUE KEY `id_UNIQUE` (`id`),\
  UNIQUE KEY `name_UNIQUE` (`name`)\
);~\
CREATE TABLE `enquiry_sub_status_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `name` varchar(50) NOT NULL,\
  `stamp` int(11) DEFAULT NULL,\
  `enquiry_status_id` int(11) NOT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  `closure_sucess` int(11) DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `enquiry_tran_type_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `name` varchar(45) DEFAULT NULL,\
  `created_on` date DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_on` date DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  `stamp` int(11) DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `executive_dept_master` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `name` varchar(60) NOT NULL DEFAULT '',\
  `stamp` smallint(6) NOT NULL DEFAULT 0,\
  `created_by` int(11) NOT NULL DEFAULT 0,\
  `modified_by` int(11) NOT NULL DEFAULT 0,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  PRIMARY KEY (`id`) USING BTREE,\
  UNIQUE KEY `name_UNIQUE` (`name`)\
);~\
CREATE TABLE `executive_group_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `alias` varchar(60) DEFAULT '',\
  `name` varchar(60) NOT NULL DEFAULT '',\
  `stamp` smallint(6) DEFAULT 0,\
  `parent_id` int(11) DEFAULT 0,\
  `created_by` int(11) DEFAULT 0,\
  `modified_by` int(11) DEFAULT 0,\
  `created_on` datetime DEFAULT '0000-00-00 00:00:00',\
  `modified_on` datetime DEFAULT '0000-00-00 00:00:00',\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`),\
  UNIQUE KEY `name_UNIQUE` (`name`)\
);~\
CREATE TABLE `executive_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `alias` varchar(60) DEFAULT NULL,\
  `name` varchar(60) DEFAULT NULL,\
  `profile_img` varchar(100),\
  `address1` varchar(75) DEFAULT NULL,\
  `address2` varchar(75) DEFAULT NULL,\
  `address3` varchar(75) DEFAULT NULL,\
  `city` varchar(75) DEFAULT NULL,\
  `state_id` int(11) DEFAULT NULL,\
  `pincode` varchar(15) DEFAULT NULL,\
  `country_id` int(11) DEFAULT NULL,\
  `email` varchar(100) DEFAULT NULL,\
  `mobile` varchar(20) DEFAULT NULL,\
  `whatsapp` varchar(20) DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  `stamp` int(11) DEFAULT NULL,\
  `dob` datetime DEFAULT NULL,\
  `doa` datetime DEFAULT NULL,\
  `doj` datetime DEFAULT NULL,\
  `area_id` int(11) DEFAULT NULL,\
  `call_type_id` int(11) DEFAULT NULL,\
  `crm_user_id` int(11) DEFAULT NULL,\
  `role_id` int(11) DEFAULT NULL,\
  `dept_id` int(11) DEFAULT NULL,\
  `group_id` int(11) DEFAULT NULL,\
  PRIMARY KEY (`id`) USING BTREE,\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `executive_role_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `name` varchar(60) NOT NULL DEFAULT '',\
  `parent` int(11) NOT NULL DEFAULT 0,\
  `stamp` smallint(6) NOT NULL DEFAULT 0,\
  `created_by` int(11) NOT NULL DEFAULT 0,\
  `modified_by` int(11) NOT NULL DEFAULT 0,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  `department_id` int(11) DEFAULT NULL,\
  PRIMARY KEY (`id`) USING BTREE,\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `item_group_master` (\
  `id` int(11) DEFAULT NULL,\
  `name` varchar(60) DEFAULT NULL,\
  `alias` varchar(60) DEFAULT NULL,\
  `stamp` smallint(6) DEFAULT NULL,\
  `parent_id` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  `is_parent` tinyint(4) DEFAULT NULL\
);~\
CREATE TABLE `item_master` (\
  `id` int(11) DEFAULT NULL,\
  `name` varchar(60) DEFAULT NULL,\
  `stamp` smallint(6) DEFAULT NULL,\
  `group_id` int(11) DEFAULT NULL,\
  `alias` varchar(60) DEFAULT NULL,\
  `unit_id` int(11) DEFAULT NULL,\
  `hsn_code` varchar(60) DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL\
);~\
CREATE TABLE `master_tran_types` (\
  `id` int(11) NOT NULL,\
  `short_name` varchar(30) DEFAULT NULL,\
  `full_name` varchar(60) DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `short_name` (`short_name`) USING BTREE\
);~\
CREATE TABLE `organisation_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `alias` varchar(75) NOT NULL DEFAULT '',\
  `name` varchar(75) NOT NULL DEFAULT '',\
  `print_name` varchar(75) DEFAULT NULL,\
  `stamp` smallint(6) NOT NULL DEFAULT 0,\
  `created_by` int(11) NOT NULL DEFAULT 0,\
  `modified_by` int(11) NOT NULL DEFAULT 0,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  `address1` varchar(75) DEFAULT NULL,\
  `address2` varchar(75) DEFAULT NULL,\
  `address3` varchar(75) DEFAULT NULL,\
  `city` varchar(75) DEFAULT NULL,\
  `state_id` int(11) DEFAULT NULL,\
  `country_id` int(11) DEFAULT NULL,\
  `pan` varchar(20) DEFAULT NULL,\
  `gstin` varchar(20) DEFAULT NULL,\
  `pincode` varchar(20) DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `session` (\
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\
  `data` varchar(5000) DEFAULT NULL,\
  `last_access` datetime DEFAULT NULL,\
  `email` varchar(45) DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `sessionId_UNIQUE` (`id`),\
  UNIQUE KEY `userId_UNIQUE` (`email`)\
);~\
CREATE TABLE `state_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `alias` varchar(60) DEFAULT '',\
  `name` varchar(60) NOT NULL DEFAULT '0',\
  `stamp` smallint(6) DEFAULT 0,\
  `created_by` int(11) DEFAULT 0,\
  `modified_by` int(11) DEFAULT 0,\
  `created_on` datetime DEFAULT '0000-00-00 00:00:00',\
  `modified_on` datetime DEFAULT '0000-00-00 00:00:00',\
  `country_id` int(11) NOT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `system_task` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `name` varchar(60) DEFAULT NULL,\
  `parent_id` int(11) DEFAULT NULL,\
  `constant_id` int(11) DEFAULT NULL,\
  `show_on_web` int(11) DEFAULT NULL,\
  `path` varchar(255) DEFAULT NULL,\
  `icon` varchar(40) DEFAULT NULL,\
  `sq_no` double DEFAULT NULL,\
  PRIMARY KEY (`id`)\
);~\
CREATE TABLE `ticket_action_master` (\
  `id` int(11) NOT NULL,\
  `name` varchar(60) DEFAULT '',\
  `stamp` smallint(6) DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  PRIMARY KEY (`id`) USING BTREE\
);~\
CREATE TABLE `ticket_category_master` (\
  `id` int(11) DEFAULT NULL,\
  `name` varchar(50) DEFAULT NULL,\
  `stamp` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL\
);~\
CREATE TABLE `ticket_header_tran` (\
  `id` int(11) DEFAULT NULL,\
  `date` date DEFAULT NULL,\
  `tkt_number` varchar(75) DEFAULT NULL,\
  `time` time DEFAULT NULL,\
  `auto_number` int(11) DEFAULT NULL,\
  `contact_id` int(11) DEFAULT NULL,\
  `received_by_id` int(11) DEFAULT NULL,\
  `category_id` int(11) DEFAULT NULL,\
  `source_id` int(11) DEFAULT NULL,\
  `executive_id` int(11) DEFAULT NULL,\
  `stamp` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  `allocated_to` int(11) DEFAULT NULL\
);~\
CREATE TABLE `ticket_item_tran` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `ticket_id` int(11) DEFAULT NULL,\
  `slno` int(11) DEFAULT NULL,\
  `item_id` int(11) DEFAULT NULL,\
  `quantity` decimal(20,4) DEFAULT NULL,\
  `unit_id` int(11) DEFAULT NULL,\
  `remark` text DEFAULT NULL,\
  PRIMARY KEY (`id`) USING BTREE\
);~\
CREATE TABLE `ticket_source_master` (\
  `id` int(11) DEFAULT NULL,\
  `name` varchar(60) DEFAULT NULL,\
  `stamp` int(11) DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL\
);~\
CREATE TABLE `ticket_status_master` (\
  `id` int(11) NOT NULL,\
  `name` varchar(60) DEFAULT '',\
  `stamp` smallint(6) DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  PRIMARY KEY (`id`) USING BTREE\
);~\
CREATE TABLE `ticket_status_tran` (\
  `ticket_id` int(11) DEFAULT NULL,\
  `status_version` int(11) DEFAULT NULL,\
  `allocated_to` int(11) unsigned DEFAULT NULL,\
  `date` datetime DEFAULT NULL,\
  `vch_type` smallint(6) DEFAULT NULL,\
  `executive_id` int(11) DEFAULT NULL,\
  `status_id` int(11) DEFAULT NULL,\
  `sub_status_id` int(11) DEFAULT NULL,\
  `action_taken_id` int(11) DEFAULT NULL,\
  `next_action_id` int(11) DEFAULT NULL,\
  `next_action_date` date DEFAULT NULL,\
  `next_action_time` time DEFAULT NULL,\
  `ticket_remark` text DEFAULT NULL,\
  `suggested_action_remark` text DEFAULT NULL,\
  `action_taken_remark` text DEFAULT NULL,\
  `closure_remark` text DEFAULT NULL\
);~\
CREATE TABLE `ticket_sub_status_master` (\
  `id` int(11) DEFAULT NULL,\
  `name` varchar(50) DEFAULT NULL,\
  `stamp` int(11) DEFAULT NULL,\
  `ticket_status_id` int(11) DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL\
);~\
CREATE TABLE `trans_types_masters` (\
  `id` int(11) NOT NULL,\
  `short_name` varchar(30) DEFAULT NULL,\
  `full_name` varchar(60) DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `short_name` (`short_name`) USING BTREE\
);~\
CREATE TABLE `unit_master` (\
  `id` int(11) NOT NULL,\
  `name` varchar(50) DEFAULT NULL,\
  `uqc` varchar(50) DEFAULT NULL,\
  `stamp` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  PRIMARY KEY (`id`)\
);~\
CREATE TABLE `user` (\
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\
  `name` varchar(60) DEFAULT NULL,\
  `email` varchar(100) DEFAULT NULL,\
  `password` varchar(100) DEFAULT NULL,\
  `datetime` varchar(20) DEFAULT NULL,\
  `provider` varchar(15) DEFAULT NULL,\
  `verified` int(11) DEFAULT NULL,\
  `cfield1` varchar(50) DEFAULT NULL,\
  `cfield2` varchar(50) DEFAULT NULL,\
  `cfield3` varchar(50) DEFAULT NULL,\
  `cfield4` varchar(50) DEFAULT NULL,\
  `cfield5` varchar(50) DEFAULT NULL,\
  `cfield6` varchar(50) DEFAULT NULL,\
  `cfield7` varchar(50) DEFAULT NULL,\
  `phone` varchar(15) DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `userCompany` (\
  `user_id` int(11) NOT NULL,\
  `company_id` int(11) NOT NULL,\
  `isAdmin` int(11) NOT NULL,\
  `isInvited` int(11) DEFAULT NULL,\
  `isAccepted` int(11) DEFAULT NULL,\
  `isMapped` int(11) DEFAULT NULL,\
  `invitedDate` date DEFAULT NULL,\
  `acceptedDate` date DEFAULT NULL,\
  `mappedDate` date DEFAULT NULL\
);~\
\
CREATE PROCEDURE `createAction`(\
    IN name varchar(75),\
    IN user_id integer)\
BEGIN\
	DECLARE error_text varchar(70);\
	DECLARE error integer;\
    declare error_path varchar(20);\
    declare count_name integer;\
    declare last_insert_id integer;\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
  \
    start transaction;\
    set error = 0;\
    set error_text = '';\
   \
  SELECT COUNT(*) INTO count_name FROM enquiry_action_master am WHERE\
      am.name = name OR LENGTH(name) = 0 OR name IS NULL;\
  \
  if count_name > 0 then\
  if length(name) > 0 or name is not null then\
  set error = 1;\
  set error_path = 'name';\
  set error_text = 'Action Name Already Exists';\
  END if;\
  \
  if length(name) = 0 or name is null then\
  set error = 1;\
  set error_path = 'name';\
  set error_text = 'Action Name cannot be empty';\
  END if;\
  END if;\
\
        if error = 0 then\
			INSERT INTO enquiry_action_master (name,created_by,created_on) VALUES (name,user_id,now());\
            set last_insert_id = LAST_INSERT_ID();\
		END if;\
  commit;\
  SELECT error, error_path, error_text;\
  SELECT * FROM enquiry_action_master am WHERE am.id = last_insert_id;\
END;~\
CREATE PROCEDURE `createAllocationType`(\
  IN name varchar(75),\
  IN user_id integer\
  )\
  BEGIN\
    DECLARE error_text varchar(70);\
    DECLARE error integer;\
    declare error_path varchar(20);\
    declare count_name integer;\
    declare last_insert_id integer;\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END;\
  \
  start transaction;\
  \
  set error = 0;\
  set error_text = '';\
 \
  SELECT \
    COUNT(*)\
  INTO count_name FROM\
    allocation_type_master am\
  WHERE\
    am.name = name OR LENGTH(name) = 0\
        OR name IS NULL;\
  \
  if count_name > 0 then\
  if length(name) > 0 or name is not null then\
  set error = 1;\
  set error_path = 'name';\
  set error_text = 'Action Name Already Exists';\
  END if;\
            if length(name) = 0 or name is null then\
  set error = 1;\
  set error_path = 'name';\
  set error_text = 'Action Name cannot be empty';\
  END if;\
  END if;\
        if error = 0 then\
  INSERT INTO allocation_type_master (name,created_by,created_on) VALUES (name,user_id,now());\
            set last_insert_id = LAST_INSERT_ID();\
  END if;\
  commit;\
  \
  SELECT error, error_path, error_text;\
  SELECT \
    *\
  FROM\
    allocation_type_master am\
  WHERE\
    am.id = last_insert_id;\
END ;~\
\
CREATE PROCEDURE `createArea`(\
  IN name varchar(75),\
  IN user_id integer)\
BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
  declare error_path varchar(20);\
  declare count_name integer;\
  declare last_insert_id integer;\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END;\
 \
  start transaction;\
  \
  set error = 0;\
  set error_text = '';\
    \
  SELECT COUNT(*) INTO count_name\
  FROM area_master am\
  WHERE am.name = name or\
  length(name)=0 or name is null;\
\
  if count_name > 0 then\
    if length(name) > 0 or name is not null then\
    set error = 1;\
      set error_path = 'name';\
      set error_text = 'Area Already Exists';\
    END if;\
          if length(name) = 0 or name is null then\
    set error = 1;\
      set error_path = 'name';\
      set error_text = 'Area cannot be empty';\
    END if;\
  END if;\
      if error = 0 then\
    INSERT INTO area_master (name,created_by,created_on) VALUES (name,user_id,now());\
          set last_insert_id = LAST_INSERT_ID();\
  END if;\
  commit;\
  \
  select error, error_path, error_text;\
  select * from area_master am where am.id = last_insert_id;\
END ;~\
\
CREATE PROCEDURE `createCategory`(\
  IN name varchar(60),\
  IN user_id integer\
  )\
BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
  declare error_path varchar(20);\
  DECLARE count_name varchar(60);\
  DECLARE last_insert_id integer;\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END;\
\
  start transaction;\
 \
  set error = 0;\
  set last_insert_id = 0;\
  set error_text = '';\
     \
  SELECT COUNT(*) INTO count_name\
  FROM enquiry_category_master cm\
  WHERE cm.name = name or length(name) = 0 or name is null;\
     \
  if count_name > 0 then\
    if length(name) > 0 or name is not null then\
    set error = 1;\
    set error_path = 'name';\
    set error_text = 'Name Already Exists';\
    END if;\
      \
    if length(name) = 0 or name is null then\
      set error = 1;\
      set error_path = 'name';\
      set error_text = 'Name cannot be empty';\
    END if;\
  END if;\
     \
  if error = 0 then\
    insert into enquiry_category_master (name, created_by, created_on)\
       values (name, user_id, now());\
    set last_insert_id = LAST_INSERT_ID();\
  END if;\
  commit;\
 \
  select error, error_path, error_text;\
  select * from enquiry_category_master cm where id = last_insert_id;\
END ;~\
\
CREATE PROCEDURE `createContact`(\
  IN alias varchar(75),\
    IN name varchar(75),\
  IN print_name varchar(75),\
  IN group_id  integer,\
  IN pan  varchar(20),\
  IN aadhaar  varchar(20),\
  IN address1 varchar(75),\
  IN address2 varchar(75),\
  IN address3 varchar(75),\
  IN city varchar(75),\
  IN state_id  integer,\
  IN area_id  integer,\
  IN pincode varchar(15),\
  IN country_id  integer,\
  IN email varchar(100),\
  IN mobile varchar(20),\
  IN whatsapp varchar(20),\
  IN dob varchar(20),\
  IN doa varchar(20),\
  IN dept_id  integer,\
  IN org_id  integer,\
  IN user_id integer)\
BEGIN\
  DECLARE error integer;\
  DECLARE last_insert_id integer;\
  DECLARE count_alias integer;\
  declare count_name integer;\
  declare count_pan varchar(20);\
  declare count_aadhaar varchar(20);\
  declare count_email varchar(100);\
  declare count_mobile varchar(20);\
  declare count_whatsapp varchar(20);\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END;\
  \
  start transaction;\
   \
  set error = 0;\
  set last_insert_id = 0;\
  \
  DROP TABLE IF EXISTS temp_error_log;\
  \
  CREATE TEMPORARY TABLE temp_error_log (\
  id INT AUTO_INCREMENT PRIMARY KEY,\
  error_text VARCHAR(255),\
  error_path VARCHAR(100)\
);	\
      \
  SELECT COUNT(*) INTO count_name\
  FROM contact_master cm\
  WHERE  cm.name = name or length(name) = 0 or name is null;\
      \
      if count_name > 0 then\
    if length(name) > 0 or name is not null then\
      set error = 1;\
      INSERT INTO temp_error_log (error_text, error_path) \
      VALUES ('Name alreay exists', 'name');\
      \
    END if;\
          if length(name) = 0 or name is null then \
      set error = 1;\
      INSERT INTO temp_error_log (error_text, error_path) \
      VALUES ('Name cannot be empty', 'name');\
      \
    END if;\
  END if;\
      \
  SELECT COUNT(*) INTO count_name\
  FROM contact_master cm\
  WHERE cm.alias = name;\
    if count_name > 0 then\
      set error = 1;\
      INSERT INTO temp_error_log (error_text, error_path) \
      VALUES ('Name already exists as alias', 'name');\
      \
    END if;\
      \
  \
      if length(alias) <> 0 then\
    \
    SELECT COUNT(*) INTO count_alias FROM contact_master cm\
    WHERE cm.alias = alias ;\
    if count_alias > 0 then\
      set error = 1;\
        INSERT INTO temp_error_log (error_text, error_path) \
        VALUES ('Alias already exists', 'alias');\
        \
    END if;\
          \
      SELECT COUNT(*) INTO count_alias FROM contact_master cm\
      WHERE cm.name = alias;\
      if count_alias > 0 then\
        set error = 1;\
          INSERT INTO temp_error_log (error_text, error_path) \
          VALUES ('Alias already exists as name', 'alias');\
          \
      END if;\
          END if;\
          \
      \
      \
      if length(pan) <> 0 then\
    \
    SELECT COUNT(*) INTO count_pan FROM contact_master cm\
    WHERE cm.pan = pan;\
    if count_pan > 0 then\
      set error = 1;\
        INSERT INTO temp_error_log (error_text, error_path) \
        VALUES ('Pan already exists', 'pan');\
        \
    END if;\
      End if;\
      \
      if length(aadhaar) <> 0 then\
    \
    SELECT COUNT(*) INTO count_aadhaar FROM contact_master cm\
    WHERE cm.aadhaar = aadhaar;\
    if count_aadhaar > 0 then\
      set error = 1;\
        INSERT INTO temp_error_log (error_text, error_path) \
        VALUES ('Aadhaar already exists', 'aadhaar');\
        \
    END if;\
      End if;\
      \
      if length(email) <> 0 then\
    \
    SELECT COUNT(*) INTO count_email FROM contact_master cm\
    WHERE cm.email = email;\
    if count_email > 0 then\
      set error = 1;\
        INSERT INTO temp_error_log (error_text, error_path) \
        VALUES ('Email already exists', 'email');\
        \
    END if;\
      End if;\
      \
      if length(mobile) <> 0 then\
    \
    SELECT COUNT(*) INTO count_mobile FROM contact_master cm\
    WHERE cm.mobile = mobile;\
    if count_mobile > 0 then\
      set error = 1;\
        INSERT INTO temp_error_log (error_text, error_path) \
        VALUES ('Mobile already exists', 'mobile');\
        \
    END if;\
      End if;\
      \
      if length(whatsapp) <> 0 then\
    \
    SELECT COUNT(*) INTO count_whatsapp FROM contact_master cm\
    WHERE cm.whatsapp = whatsapp;\
    if count_whatsapp > 0 then\
      set error = 1;\
        INSERT INTO temp_error_log (error_text, error_path) \
        VALUES ('Whatsapp already exists', 'whatsapp');\
        \
    END if;\
      End if;\
      \
  if error = 0 then\
      \
    insert into contact_master \
      (alias, name, print_name, group_id, pan, aadhaar, address1, address2, address3, city, state_id, area_id, pincode, country_id, email, mobile, whatsapp, created_by, created_on, dob, doa, department_id, organisation_id) \
      values\
      (alias, name, print_name, group_id, pan, aadhaar, address1, address2, address3, city, state_id, area_id, pincode, country_id, email, mobile, whatsapp, user_id, now(), dob, doa, dept_id, org_id);\
      set last_insert_id = LAST_INSERT_ID();\
      \
  END if;\
  commit;\
  \
  select * from temp_error_log;\
  select * from contact_master cm where cm.id = last_insert_id;\
END ;~\
\
CREATE PROCEDURE `createContactGroup`(\
  in name varchar(70),\
  in alias varchar(70),\
  in parentId int,\
  IN user_id integer\
  )\
BEGIN\
  DECLARE error integer;\
  DECLARE count_name varchar(60);\
  DECLARE count_alias varchar(60);\
  DECLARE last_insert_id integer;\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
\
  start transaction;\
      \
  set error = 0;\
  set last_insert_id = 0;\
\
  DROP TABLE IF EXISTS error_table;\
\
  create temporary table error_table (\
    id int auto_increment primary key,\
    error_text varchar(255) , \
    error_path varchar(100) \
  );\
\
  SELECT COUNT(*) INTO count_name\
  FROM contact_group_master am\
  WHERE ( am.name = name OR am.alias = name) or length(name) = 0 or name is null;\
      \
      if count_name > 0 then\
    if length(name) > 0 or name is not null then\
      set error = 1;\
      insert into error_table (error_text, error_path) values ('name already exist' , 'name');\
    END if;\
    if length(name) = 0 or name is null then\
      set error = 1;\
      insert into error_table (error_text, error_path) values ('name cannot be empty' , 'name');\
    END if;\
  END if;\
      \
      \
  SELECT COUNT(*) INTO count_alias\
  FROM contact_group_master am\
  WHERE ( am.name = alias OR am.alias = alias) or length(alias) = 0 or alias is null;\
      \
      if count_alias > 0 then\
    if length(alias) > 0 or alias is not null then\
      set error = 1;\
      insert into error_table (error_text, error_path) values ('alias already exist' , 'alias');\
    END if;\
    if length(alias) = 0 or alias is null then\
      set error = 1;\
      insert into error_table (error_text, error_path) values ('alias cannot be empty' , 'alias');\
    END if;\
  END if;\
            \
  if error = 0 then\
    insert into contact_group_master (name, alias, parent_id,created_by, created_on) \
     values (name ,alias, parent_id, user_id, now()) ;\
     set last_insert_id = LAST_INSERT_ID();\
  END if;\
  commit;\
  \
  select * from error_table;\
  select * from contact_group_master am where am.id = last_insert_id;\
END ;~\
\
CREATE PROCEDURE `createCountry`(\
IN name varchar(75),\
  IN alias varchar(45),\
  IN user_id integer)\
BEGIN\
  DECLARE error integer;\
    declare count_name integer;\
    declare count_alias integer;\
    declare last_insert_id integer;\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
  \
  start transaction;\
  \
DROP TABLE IF EXISTS temp_error_log;\
 \
  CREATE TEMPORARY TABLE temp_error_log (\
  id INT AUTO_INCREMENT PRIMARY KEY,\
  error_text VARCHAR(255),\
  error_path VARCHAR(100)\
);\
  \
  set error = 0;\
  set last_insert_id = 0;\
\
  SELECT COUNT(*) INTO count_name\
  FROM country_master cm\
  WHERE cm.name = name or\
  length(name)=0 or name is null;\
\
  if count_name > 0 then\
    if length(name) > 0 or name is not null then\
      set error = 1;\
              INSERT INTO temp_error_log (error_text, error_path)\
      VALUES ('Country alreay exists', 'name');\
    END if;\
          if length(name) = 0 or name is null then\
      set error = 1;\
              INSERT INTO temp_error_log (error_text, error_path)\
      VALUES ('Country cannot be empty', 'name');\
    END if;\
  END if;\
    SELECT COUNT(*) INTO count_alias\
    FROM country_master cm\
    WHERE cm.alias = alias && length(alias)!=0;\
\
    if count_alias > 0 then\
      if length(alias) > 0 or alias is not null then\
        set error = 1;\
                  INSERT INTO temp_error_log (error_text, error_path)\
        VALUES ('Alias Already Exists', 'alias');\
      END if;\
    END if;\
      if error = 0 then\
    INSERT INTO country_master (name,alias,created_by,created_on) VALUES (name,alias,user_id,now());\
          set last_insert_id = LAST_INSERT_ID();\
  END if;\
commit;\
  select * from temp_error_log;\
  select * from country_master cm where cm.id = last_insert_id;\
END ;~\
\
CREATE PROCEDURE `createCurrency`(\
  IN user_symbol VARCHAR(50),\
  IN user_name VARCHAR(75),\
  IN user_shortForm VARCHAR(100),\
  IN user_Decimal_places VARCHAR(50),\
  IN user_Currency_system VARCHAR(50)\
)\
BEGIN\
  DECLARE error INTEGER;\
  DECLARE count_name INTEGER;\
  DECLARE count_symbol INTEGER;\
  DECLARE last_insert_id INTEGER;\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
\
  START TRANSACTION;\
\
  SET error = 0;\
\
  DROP TEMPORARY TABLE IF EXISTS error_table;\
\
  CREATE TEMPORARY TABLE error_table (\
      id INT AUTO_INCREMENT PRIMARY KEY,\
      error_text VARCHAR(255), \
      error_path VARCHAR(100)\
  );\
  \
  SELECT COUNT(*) INTO count_name\
  FROM currency_data cd\
  WHERE cd.name = user_name\
  OR LENGTH(user_name) = 0\
  OR user_name IS NULL;\
\
  IF count_name > 0 THEN\
      IF LENGTH(user_name) > 0 THEN\
          SET error = 1;\
          INSERT INTO error_table (error_text, error_path) VALUES ('Name already exists', 'Name');\
      END IF;\
      IF LENGTH(user_name) = 0 THEN\
          SET error = 1;\
          INSERT INTO error_table (error_text, error_path) VALUES ('Name cannot be empty', 'Name');\
      END IF;\
  END IF;\
\
  \
  SELECT COUNT(*) INTO count_symbol\
  FROM currency_data cd\
  WHERE cd.symbol = user_symbol\
  OR LENGTH(user_symbol) = 0\
  OR user_symbol IS NULL;\
\
  IF count_symbol > 0 THEN\
      IF LENGTH(user_symbol) > 0 THEN\
          SET error = 1;\
          INSERT INTO error_table (error_text, error_path) VALUES ('Symbol already exists', 'Symbol');\
      END IF;\
      IF LENGTH(user_symbol) = 0 THEN\
          SET error = 1;\
          INSERT INTO error_table (error_text, error_path) VALUES ('Symbol cannot be empty', 'Symbol');\
      END IF;\
  END IF;\
\
  IF error = 0 THEN\
      INSERT INTO currency_data (symbol, name, shortForm, decimal_places, currency_system) \
      VALUES (user_symbol, user_name, user_shortForm, user_Decimal_places, user_Currency_system);\
      \
      SET last_insert_id = LAST_INSERT_ID();\
  END IF;\
\
  COMMIT;\
\
  SELECT * FROM error_table;\
  SELECT * FROM currency_data WHERE id = last_insert_id;\
\
END ;~\
\
CREATE PROCEDURE `createDepartment`(\
  IN name varchar(60),\
  IN user_id integer\
  )\
BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
  declare error_path varchar(20);\
  DECLARE count_name varchar(60);\
  DECLARE last_insert_id integer;\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END;\
 \
  start transaction;\
\
set error = 0;\
  set last_insert_id = 0;\
  set error_text = '';\
 \
  SELECT COUNT(*) INTO count_name\
  FROM department_master cm\
  WHERE cm.name = name or length(name) = 0 or name is null;\
     \
  if count_name > 0 then\
    if length(name) > 0 or name is not null then\
    set error = 1;\
    set error_path = 'name';\
    set error_text = 'Name Already Exists';\
    END if;\
      \
    if length(name) = 0 or name is null then\
      set error = 1;\
      set error_path = 'name';\
      set error_text = 'Name cannot be empty';\
    END if;\
  END if;\
     \
           \
  if error = 0 then\
    insert into department_master (name, created_by, created_on)\
       values (name, user_id, now());\
             \
    set last_insert_id = LAST_INSERT_ID();\
  END if;\
  commit;\
 \
select error, error_path, error_text;\
  select * from department_master cm where id = last_insert_id;\
END ;~\
\
CREATE PROCEDURE `createEnquiry`(\
IN enq_number varchar(75),\
  IN date varchar(20),\
IN contact_id integer,\
IN received_by_id integer,\
IN category_id integer,\
IN source_id integer,\
IN allocated_to_id integer,\
IN status_id integer,\
IN sub_status_id integer,\
IN action_taken_id integer,\
IN next_action_id integer,\
IN next_action_date varchar(20),\
IN enquiry_remark varchar(5000),\
IN suggested_action_remark varchar(5000),\
IN action_taken_remark varchar(5000),\
IN closure_remark varchar(5000),\
IN enquiry_tran_type int,\
IN active int,\
  IN created_by varchar(50)\
)\
BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
  declare error_path varchar(20);\
DECLARE last_insert_id integer;\
  declare count_name integer;\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
 \
  start transaction;\
  \
  set error = 0;\
  set error_text = '';\
  set last_insert_id = 0;\
   \
  SELECT COUNT(*) INTO count_name\
  FROM enquiry_header_tran eh\
  WHERE eh.enq_number = enq_number;\
\
  IF count_name = 0 THEN\
              \
      INSERT INTO `crmapp`.`enquiry_header_tran`\
      (enq_number, date, auto_number, contact_id, received_by_id, category_id, source_id, stamp, modified_by, modified_on, created_by, created_on)\
      VALUES \
      (enq_number, date, 0, contact_id, received_by_id, category_id, source_id, 0, null, null, \
              (select crm_user_id from executive_master where email= created_by),\
              now());\
\
      set last_insert_id = LAST_INSERT_ID();\
              \
      INSERT INTO crmapp.enquiry_ledger_tran\
      (enquiry_id, status_version, allocated_to, date, status_id, sub_status_id, action_taken_id, next_action_id, next_action_date, enquiry_remark, \
              suggested_action_remark, action_taken_remark, closure_remark, enquiry_tran_type_id, active)\
      VALUES\
      (last_insert_id, 0, allocated_to, date, status_id, sub_status_id, action_taken_id, next_action_id, next_action_date, enquiry_remark, \
              suggested_action_remark, action_taken_remark, closure_remark, enquiry_tran_type, 1);\
  else \
    set error = 1;\
          set error_path = 'enq_number';\
    set error_text = 'Description already exist';\
  END IF;\
commit;\
  \
  select error, error_path, error_text;\
  select * from enquiry_header_tran where id = last_insert_id;\
END ;~\
\
CREATE PROCEDURE `createEnquirySource`(\
  IN name varchar(60),\
  IN user_id integer\
  )\
BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
  declare error_path varchar(20);\
  DECLARE count_name varchar(60);\
  DECLARE last_insert_id integer;\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
\
  start transaction;\
     \
  set error = 0;\
  set last_insert_id = 0;\
  set error_text = '';\
  \
  SELECT COUNT(*) INTO count_name\
  FROM enquiry_source_master cm\
  WHERE cm.name = name or length(name) = 0 or name is null;\
     \
  if count_name > 0 then\
    if length(name) > 0 or name is not null then\
    set error = 1;\
    set error_path = 'name';\
    set error_text = 'Name Already Exists';\
    END if;\
      \
    if length(name) = 0 or name is null then\
      set error = 1;\
      set error_path = 'name';\
      set error_text = 'Name cannot be empty';\
    END if;\
  END if;\
     \
  if error = 0 then\
    insert into enquiry_source_master (name, created_by, created_on)\
       values (name, user_id, now());\
             \
    set last_insert_id = LAST_INSERT_ID();\
  END if;\
  commit;\
 \
select error, error_path, error_text;\
  select * from enquiry_source_master cm where id = last_insert_id;\
END ;~\
\
\
CREATE PROCEDURE `createEnquirySubStatusDb`(\
IN user_name varchar(75),\
  IN status_id integer,\
  IN user_id integer)\
BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
  declare error_path varchar(20);\
  declare count_name integer;\
  declare last_insert_id integer;\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
 \
  start transaction;\
\
  set error = 0;\
  set error_text = '';\
\
  SELECT COUNT(*) INTO count_name\
  FROM enquiry_sub_status_master am\
  WHERE am.enquiry_status_id=status_id and am.name = user_name or\
  length(user_name)=0 or user_name is null;\
\
if count_name > 0 then\
  if length(user_name) > 0 or user_name is not null then\
    set error = 1;\
    set error_path = 'name';\
    set error_text = 'Sub Status Name Already Exists';\
  END if;\
  if length(user_name) = 0 or user_name is null then\
    set error = 1;\
    set error_path = 'name';\
    set error_text = 'Sub Status Name cannot be empty';\
  END if;\
END IF;\
if error = 0 then\
  INSERT INTO enquiry_sub_status_master (name,enquiry_status_id,created_by,created_on) VALUES (user_name,status_id,user_id,now());\
  set last_insert_id = LAST_INSERT_ID();\
END if;\
commit;\
 \
  select error, error_path, error_text;\
  select * from enquiry_sub_status_master am where am.id = last_insert_id;\
END ;~\
\
\
CREATE PROCEDURE `createExecutive`(\
IN alias varchar(60),\
  IN name varchar(60),\
IN address1 varchar(75),\
IN address2 varchar(75),\
IN address3 varchar(75),\
IN city varchar(75),\
IN state_id integer,\
IN pincode varchar(15),\
IN country_id integer,\
IN email varchar(100),\
IN mobile varchar(20),\
IN whatsapp varchar(20),\
IN dob varchar(100),\
IN doa varchar(100),\
IN doj varchar(100),\
  IN area_id integer,\
  IN call_type_id integer,\
  IN crm_user_id integer,\
  IN role_id integer,\
  IN dept_id integer,\
  IN group_id integer,\
  IN user_id integer)\
BEGIN\
\
  DECLARE error integer;\
  DECLARE last_insert_id integer;\
  DECLARE count_alias integer;\
  declare count_name integer;\
  declare var_call_type_id integer;\
  DECLARE dofb datetime;\
DECLARE dofa datetime;\
  DECLARE dofj datetime;\
DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
  \
  start transaction;\
  \
  DROP TABLE IF EXISTS error_table;\
\
create temporary table error_table (\
  id int auto_increment primary key,\
  error_text varchar(255) , \
  error_path varchar(100) \
);\
  set error = 0;\
  set last_insert_id = 0;\
\
SET dofb = CASE \
                      WHEN TRIM(dob) = '' THEN NULL\
                      ELSE CAST(dob AS DATETIME)\
                   END;\
\
SET dofa = CASE \
                      WHEN TRIM(doa) = '' THEN NULL\
                      ELSE CAST(doa AS DATETIME)\
                   END;\
  \
SET dofj = CASE \
                      WHEN TRIM(doj) = '' THEN NULL\
                      ELSE CAST(doj AS DATETIME)\
                   END;    \
  \
  SELECT COUNT(*) INTO count_name\
  FROM executive_master em\
  WHERE  (em.name = name or\
  em.alias = name);\
      \
      if count_name > 0 then\
    set error = 1;\
    insert into error_table (error_text, error_path) values ('name already exist' , 'name');	\
  end if;\
\
    \
    SELECT COUNT(*) INTO count_alias\
    FROM executive_master em\
    WHERE (em.name = alias or\
    em.alias = alias);\
  \
      if count_alias > 0 then\
    set error = 1;\
    insert into error_table (error_text, error_path) values ('alias already exist' , 'alias');	\
  end if;\
    \
    if error = 0 then\
      select ctm.id into var_call_type_id from call_type_master ctm where ctm.name=call_type LOCK IN SHARE MODE;\
                              \
      insert into executive_master\
      (alias, name, address1, address2, address3, city,\
              state_id, pincode, country_id, email, \
              mobile, whatsapp, created_by, created_on, \
              dob, doa, doj, area_id, call_type_id, \
              crm_user_id, role_id, dept_id, group_id) \
      values\
      (alias, name, address1, address2, address3, city, \
              state_id, pincode, country_id, email, \
              mobile, whatsapp, user_id, now(), \
              dofb, dofa, dofj, var_area_id, var_call_type_id, \
              var_executive_id, var_role_id, var_dept_id, var_group_id);\
              \
      set last_insert_id = LAST_INSERT_ID();\
              end if;\
  commit;\
  \
select * from error_table;\
  select * from executive_master em where em.id = last_insert_id;\
END ;~\
\
\
CREATE PROCEDURE `createExecutiveDept`(\
  IN name varchar(60),\
  IN user_id integer\
  )\
BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
  declare error_path varchar(20);\
  DECLARE count_name varchar(60);\
DECLARE last_insert_id integer;\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END;\
     \
start transaction;\
 \
  set last_insert_id = 0;\
  set error = 0;\
  set error_text = '';\
\
SELECT COUNT(*) INTO count_name\
  FROM executive_dept_master cm\
  WHERE cm.name = name or length(name) = 0 or name is null;\
     \
if count_name > 0 then\
  if length(name) > 0 or name is not null then\
  set error = 1;\
  set error_path = 'name';\
  set error_text = 'Name Already Exists';\
  END if;\
          \
  if length(name) = 0 or name is null then\
    set error = 1;\
    set error_path = 'name';\
    set error_text = 'Name cannot be empty';\
  END if;\
END if;\
     \
           \
if error = 0 then\
  insert into executive_dept_master (name, created_by, created_on) \
      values (name, user_id, now());\
\
  set last_insert_id = LAST_INSERT_ID();\
END if;\
  commit;\
 \
select error, error_path, error_text;\
  select * from executive_dept_master cm where id = last_insert_id;\
END ;~\
\
\
CREATE PROCEDURE `createExecutiveGroup`(\
IN name varchar(75),\
IN alias varchar(75),\
IN parent_id varchar(75),\
IN user_id integer)\
BEGIN\
  DECLARE error integer;\
  DECLARE last_insert_id integer;\
  DECLARE count_name integer;\
  DECLARE count_alias integer;\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
\
  start transaction;\
    \
  set error = 0;\
  set last_insert_id = 0;\
 \
  DROP TABLE IF EXISTS temp_error_log;\
 \
  CREATE TEMPORARY TABLE temp_error_log (\
  id INT AUTO_INCREMENT PRIMARY KEY,\
  error_text VARCHAR(255),\
  error_path VARCHAR(100)\
);\
\
SELECT COUNT(*) INTO count_name\
  FROM executive_group_master egm\
  WHERE  egm.name = name or length(name) = 0 or name is null;\
     \
if count_name > 0 then\
  if length(name) > 0 or name is not null then\
  set error = 1;\
  INSERT INTO temp_error_log (error_text, error_path)\
  VALUES ('Name alreay exists', 'name');\
      END if;\
END if;\
if length(name) = 0 or name is null then \
  set error = 1;\
  INSERT INTO temp_error_log (error_text, error_path)\
  VALUES ('Name cannot be empty', 'name');\
  \
END if;\
     \
SELECT COUNT(*) INTO count_name\
  FROM executive_group_master egm\
  WHERE egm.alias = name;\
if count_name > 0 then\
  set error = 1;\
  INSERT INTO temp_error_log (error_text, error_path)\
  VALUES ('Name already exists as alias', 'name');\
  \
END if;\
     \
if length(alias) <> 0 then\
\
  SELECT COUNT(*) INTO count_alias FROM executive_group_master egm\
  WHERE egm.alias = alias ;\
  if count_alias > 0 then\
    set error = 1;\
    INSERT INTO temp_error_log (error_text, error_path)\
    VALUES ('Alias already exists', 'alias');\
    \
  END if;\
         \
  SELECT COUNT(*) INTO count_alias FROM executive_group_master egm\
  WHERE egm.name = alias;\
  if count_alias > 0 then\
    set error = 1;\
    INSERT INTO temp_error_log (error_text, error_path)\
    VALUES ('Alias already exists as name', 'alias');\
    \
  END if;\
END if;\
     \
if error = 0 then\
  insert into executive_group_master\
  (alias, name, parent_id, created_by, created_on)\
  values\
  (alias, name, parent_id, user_id, now());\
  set last_insert_id = LAST_INSERT_ID();\
END if;\
  commit;\
  \
  select * from temp_error_log;\
  select * from executive_group_master egm where egm.id = last_insert_id;\
END ;~\
\
\
CREATE PROCEDURE `createExecutiveRole`(\
  IN name varchar(60),\
  IN parentId int,\
  IN departmentId int,\
  IN user_id integer\
  )\
BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
  declare error_path varchar(20);\
  DECLARE count_name varchar(60);\
DECLARE last_insert_id integer;\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END;\
  \
  start transaction;\
   \
  set error = 0;\
  set last_insert_id = 0;\
  set error_text = '';\
  \
  SELECT COUNT(*) INTO count_name\
  FROM executive_role_master rm\
  WHERE rm.name = name or length(name) = 0 or name is null;\
     \
  if count_name > 0 then\
    if length(name) > 0 or name is not null then\
    set error = 1;\
    set error_path = 'name';\
    set error_text = 'Name Already Exists';\
    END if;\
      \
    if length(name) = 0 or name is null then\
      set error = 1;\
      set error_path = 'name';\
      set error_text = 'Name cannot be empty';\
    END if;\
  END if;\
     \
           \
  if error = 0 then\
    insert into executive_role_master (name, created_by, created_on, parent, department_id)\
     values (name, user_id, now(), parentId, departmentId);\
      \
    set last_insert_id = LAST_INSERT_ID();\
  END if;\
  commit;\
 \
select error, error_path, error_text;\
  select * from executive_role_master rm where id = last_insert_id;\
END ;~\
\
\
CREATE PROCEDURE `createItem`(\
  IN name varchar(50),\
  IN group_id integer,\
  IN alias varchar(60),\
  IN unit_id integer,\
IN hsn_code varchar(60),\
  IN user_id integer)\
BEGIN\
  DECLARE error integer;\
  DECLARE last_insert_id integer;\
  DECLARE count_alias integer;\
  DECLARE count_name integer;\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
\
  start transaction;\
      \
  DROP TABLE IF EXISTS error_log;\
  \
  CREATE TEMPORARY TABLE error_log (\
  id INT AUTO_INCREMENT PRIMARY KEY,\
      error_text varchar(70),\
      error_path varchar(20)\
  );\
  \
  set error = 0;\
  set last_insert_id = 0;\
  \
  SELECT COUNT(*) INTO count_name\
  FROM item_master im\
  WHERE im.name = name or length(name)=0 or name IS NULL;\
\
  IF count_name > 0 THEN\
    \
          IF length(name)>0 or name IS NOT NULL THEN \
          set error = 1;\
          INSERT INTO error_log (error_text, error_path)\
          VALUES ('Name already exists', 'name');\
  END IF;\
      \
      IF length(name) = 0 or name IS NULL THEN \
    set error = 1;\
          INSERT INTO error_log (error_text, error_path)\
          VALUES ('Name cannot be empty', 'name');\
  END IF;\
      END IF;\
     \
     SELECT COUNT(*) INTO count_name\
   FROM item_master im\
     WHERE im.alias = name;\
\
   IF count_name > 0 THEN\
    set error = 1;\
    INSERT INTO error_log (error_text, error_path)\
    VALUES ('Name already exists as alias', 'name');\
  END If;\
      \
      \
      IF length(alias) <> 0 THEN\
    SELECT COUNT(*) INTO count_alias FROM item_master im\
          WHERE im.alias = alias ;\
  IF count_alias > 0 THEN\
    set error = 1;\
          INSERT INTO error_log (error_text, error_path)\
          VALUES ('Alias already exists', 'alias');\
  END IF;      \
  \
    SELECT COUNT(*) INTO count_alias FROM item_master im\
          WHERE im.name = alias;\
  IF count_alias > 0 THEN\
    set error = 1;\
          INSERT INTO error_log (error_text, error_path)\
          VALUES ('Alias already exists as name', 'alias');\
  END IF;\
  END IF;\
         \
      \
     IF error=0 THEN \
      \
      insert into item_master \
      (name, stamp, group_id, alias, unit_id, hsn_code, created_by, modified_by, created_on, modified_on) \
      values\
      (name, 0, group_id, alias, unit_id, hsn_code, user_id, null, NOW(), null); \
      set last_insert_id = LAST_INSERT_ID();\
  END IF;\
          \
commit;\
  \
  \
  select * from error_log;\
  select * from item_master where id = last_insert_id;\
END ;~\
\
\
CREATE PROCEDURE `createItemGroup`(\
  IN name varchar(50),\
IN alias varchar(60),\
  IN parent_id integer,\
  IN is_parent integer,\
  IN user_id integer)\
BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
  declare error_path varchar(20);\
DECLARE last_insert_id integer;\
  DECLARE count_alias integer;\
  declare count_name integer;\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
  \
  start transaction;\
  \
  set error = 0;\
  set error_text = '';\
  set last_insert_id = 0;\
  \
  SELECT \
  COUNT(*)\
  INTO count_name FROM\
  item_group_master im\
  WHERE\
  im.name = name OR im.alias = name;\
\
  IF count_name = 0 THEN\
    \
    SELECT COUNT(*) INTO count_alias\
    FROM item_group_master im\
    WHERE im.name = alias or\
    im.alias = alias;\
    \
    if count_alias = 0 then\
    \
      insert into item_group_master \
      (name, alias, stamp, parent_id, created_on, modified_on, created_by, modified_by, is_parent) \
      values\
      (name, alias, 0, parent_id, NOW(), null, user_id, null, is_parent); \
      set last_insert_id = LAST_INSERT_ID();\
    else\
      set error = 1;\
              set error_path = 'alias';\
      set error_text = 'Alias already exist';\
    end if;\
  else \
    set error = 1;\
          set error_path = 'name';\
    set error_text = 'Name already exist';\
  END IF;\
commit;\
  \
  SELECT error, error_path, error_text;\
  SELECT \
    *\
  FROM\
    item_group_master\
  WHERE\
    id = last_insert_id;\
END ;~\
\
\
CREATE PROCEDURE `createOrganisation`(\
  IN alias VARCHAR(75),\
      IN name VARCHAR(75),\
      IN printName VARCHAR(75),\
      IN pan VARCHAR(75),\
      IN gstin VARCHAR(75),\
      IN address1 VARCHAR(75),\
      IN address2 VARCHAR(75),\
      IN address3 VARCHAR(75),\
      IN city VARCHAR(75),\
      IN state_id VARCHAR(75),\
      IN pincode VARCHAR(75),\
      IN country_id VARCHAR(75),\
      IN user_id integer)\
BEGIN\
  DECLARE error integer;\
  DECLARE last_insert_id integer;\
  DECLARE count_alias integer;\
  declare count_name integer;\
declare count_pan varchar(20);\
  declare count_gstin varchar(20);\
DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END;\
  \
start transaction;\
      \
DROP TABLE IF EXISTS temp_error_log;\
  \
  CREATE TEMPORARY TABLE temp_error_log (\
  id INT AUTO_INCREMENT PRIMARY KEY,\
  error_text VARCHAR(255),\
  error_path VARCHAR(100)\
);\
\
  set error = 0;\
  set last_insert_id = 0;\
  \
  SELECT COUNT(*) INTO count_name\
  FROM organisation_master om\
  WHERE  om.name = name or length(name) = 0 or name is null;\
      \
      if count_name > 0 then\
    if length(name) > 0 or name is not null then\
      set error = 1;\
      INSERT INTO temp_error_log (error_text, error_path) \
      VALUES ('Name alreay exists', 'name');\
\
    END if;\
          if length(name) = 0 or name is null then \
      set error = 1;\
      INSERT INTO temp_error_log (error_text, error_path) \
      VALUES ('Name cannot be empty', 'name');\
    END if;\
  END if;\
      \
  SELECT COUNT(*) INTO count_name\
  FROM organisation_master om\
  WHERE om.alias = name;\
    if count_name > 0 then\
      set error = 1;\
      INSERT INTO temp_error_log (error_text, error_path) \
      VALUES ('Name already exists as alias', 'name');\
    END if;\
          \
      \
  if length(alias) <> 0 then\
    SELECT COUNT(*) INTO count_alias FROM organisation_master om\
    WHERE om.alias = alias;\
    if count_alias > 0 then\
      set error = 1;\
        INSERT INTO temp_error_log (error_text, error_path) \
        VALUES ('Alias already exists', 'alias');\
    END if;\
          \
      SELECT COUNT(*) INTO count_alias FROM organisation_master om\
      WHERE om.name = alias;\
      if count_alias > 0 then\
        set error = 1;\
          INSERT INTO temp_error_log (error_text, error_path) \
          VALUES ('Alias already exists as name', 'alias');\
      END if;\
  END if;\
      \
      \
      if length(pan) <> 0 then\
    \
    SELECT COUNT(*) INTO count_pan FROM organisation_master om\
    WHERE om.pan = pan;\
    if count_pan > 0 then\
      set error = 1;\
        INSERT INTO temp_error_log (error_text, error_path) \
        VALUES ('Pan already exists', 'pan');\
    END if;\
      End if;\
      \
      \
      if length(gstin) <> 0 then\
    \
    SELECT COUNT(*) INTO count_gstin FROM organisation_master om\
    WHERE om.gstin = gstin;\
    if count_gstin > 0 then\
      set error = 1;\
        INSERT INTO temp_error_log (error_text, error_path) \
        VALUES ('Gstin already exists', 'gstin');\
    END if;\
      End if;\
  \
      if error = 0 then\
              \
      insert into organisation_master \
      (alias, name, print_name, pan, gstin, address1, address2, address3, city, state_id, pincode, country_id, created_by, created_on) \
      values\
      (alias, name, print_name, pan, gstin, address1, address2, address3, city, state_id, pincode, country_id, user_id, now());\
      set last_insert_id = LAST_INSERT_ID();\
      \
  END if;\
      \
commit;\
  \
  \
  select * from temp_error_log;\
  select * from organisation_master where id = last_insert_id;\
END ;~\
\
\
CREATE PROCEDURE `createState`(\
IN name varchar(75),\
  IN alias varchar(45),\
  IN country_id int(11) unsigned,\
  IN user_id integer)\
BEGIN\
  DECLARE error integer;\
  declare count_name integer;\
  declare count_alias integer;\
  declare last_insert_id integer;\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END;\
  \
start transaction;\
      \
  DROP TABLE IF EXISTS temp_error_log;\
 \
  CREATE TEMPORARY TABLE temp_error_log (\
  id INT AUTO_INCREMENT PRIMARY KEY,\
  error_text VARCHAR(255),\
  error_path VARCHAR(100)\
);\
  \
  set error = 0;\
  set last_insert_id = 0;\
\
  SELECT COUNT(*) INTO count_name\
  FROM state_master sm\
  WHERE (sm.country_id = country_id && sm.name = name) or\
  length(name)=0 or name is null;\
\
  if count_name > 0 then\
    if length(name) > 0 or name is not null then\
      set error = 1;\
              INSERT INTO temp_error_log (error_text, error_path)\
      VALUES ('State alreay exists', 'name');\
    END if;\
          if length(name) = 0 or name is null then\
      set error = 1;\
              INSERT INTO temp_error_log (error_text, error_path)\
      VALUES ('State cannot be empty', 'name');\
    END if;\
  END if;\
    SELECT COUNT(*) INTO count_alias\
    FROM state_master sm\
    WHERE (sm.country_id = country_id && sm.alias = alias) && length(alias)!=0;\
\
    if count_alias > 0 then\
      if length(alias) > 0 or alias is not null then\
        set error = 1;\
                  INSERT INTO temp_error_log (error_text, error_path)\
        VALUES ('Alias Already Exists', 'alias');\
      END if;\
    END if;\
      if error = 0 then\
    INSERT INTO state_master (name,alias,created_by,created_on,country_id) VALUES (name,alias,user_id,now(),country_id);\
          set last_insert_id = LAST_INSERT_ID();\
  END if;\
commit;\
  select * from temp_error_log;\
  select * from state_master sm where sm.id = last_insert_id;\
END ;~\
\
\
CREATE PROCEDURE `createUnit`(\
  IN name varchar(50),\
  IN uqc varchar(50),\
  IN user_id integer)\
BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
  declare error_path varchar(20);\
DECLARE last_insert_id integer;\
  DECLARE count_alias integer;\
  declare count_name integer;\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
 \
  start transaction;\
  \
  set error = 0;\
  set error_text = '';\
  set last_insert_id = 0;\
   \
  SELECT COUNT(*) INTO count_name\
  FROM unit_master un\
  WHERE un.name = name;\
\
  IF count_name = 0 THEN\
                             \
      insert into unit_master \
      (name, uqc, stamp, created_by, modified_by, created_on, modified_on) \
      values\
      (name, uqc, 0, user_id, null, NOW(), null); \
      set last_insert_id = LAST_INSERT_ID();\
    else \
    set error = 1;\
          set error_path = 'name';\
    set error_text = 'Name already exist';\
  END IF;\
commit;\
  \
  select error, error_path, error_text;\
  select * from unit_master where id = last_insert_id;\
END ;~\
\
\
CREATE PROCEDURE `getExecutiveEnquiriesData`()\
BEGIN\
  SELECT count(*) total, em.name FROM enquiry_ledger_tran lt\
  left join executive_master em on em.id=lt.allocated_to\
  WHERE lt.enquiry_id NOT IN (SELECT et.enquiry_id FROM enquiry_ledger_tran et \
  LEFT JOIN enquiry_status_master sm ON sm.id = et.status_id \
  WHERE sm.name = 'Closed')\
  AND lt.id = (SELECT MAX(inner_lt.id) \
      FROM enquiry_ledger_tran inner_lt \
      WHERE inner_lt.enquiry_id = lt.enquiry_id)\
      AND lt.allocated_to IS NOT NULL group by em.name;\
SELECT lt.date AS date, Week(lt.date) AS week, em.name as name, COUNT(*) AS count\
  FROM enquiry_ledger_tran lt \
  left join executive_master em on lt.allocated_to=em.id\
  WHERE (WEEK(lt.date)) >= WEEK(CURDATE()) - 2\
  AND lt.enquiry_id not in (select et.enquiry_id from enquiry_ledger_tran et \
  left join enquiry_status_master sm on sm.id=et.status_id where sm.name='Closed') AND\
  lt.id = (SELECT MAX(inner_lt.id)\
      FROM enquiry_ledger_tran inner_lt \
      WHERE inner_lt.enquiry_id = lt.enquiry_id)\
      AND lt.allocated_to IS NOT NULL\
  GROUP BY name, Week(lt.date) ORDER BY name, WEEK(lt.date);\
END ;~\
\
\
CREATE PROCEDURE `getOverviewGraphData`()\
BEGIN\
  SELECT COUNT(distinct(enquiry_id)) totalOpen from enquiry_ledger_tran lt\
  LEFT JOIN enquiry_status_master sm ON sm.id = lt.status_id \
  WHERE sm.name = 'Open';\
  \
  SELECT COUNT(*) as count, MONTH(date) as month from (select lt.date as date from enquiry_ledger_tran lt\
  LEFT JOIN enquiry_status_master sm ON sm.id = lt.status_id \
  WHERE sm.name = 'Open' AND lt.date = (select MIN(et.date) from enquiry_ledger_tran et where et.enquiry_id=lt.enquiry_id)\
  AND lt.date >= DATE_FORMAT(CURDATE() - INTERVAL 5 MONTH, '%Y-%m-01') GROUP BY lt.enquiry_id) as res\
  group by month(date);\
  \
  SELECT COUNT(*) as count, MONTH(lt.date) as month from enquiry_ledger_tran lt left join enquiry_status_master sm \
  ON sm.id = lt.status_id\
  WHERE sm.name='Closed' AND lt.date > DATE_FORMAT(CURDATE() - INTERVAL 5 MONTH, '%Y-%m-01') GROUP BY month(lt.date);\
END ;~\
\
\
CREATE PROCEDURE `mainSearchBar`(IN search_text VARCHAR(255))\
BEGIN\
  WITH combined_results AS (\
      SELECT 'Menu Master' as table_name, name as result,href as href FROM menu_option_master WHERE name LIKE CONCAT('%', search_text, '%')\
      UNION ALL\
      SELECT 'Menu Master' as table_name, short_name AS result, href as href FROM menu_option_master WHERE short_name LIKE CONCAT('%', search_text, '%')\
  UNION ALL\
      SELECT 'Contact Master' as table_name, alias AS result,'/cap/admin/lists/contactList' as href  FROM contact_master WHERE alias LIKE CONCAT('%', search_text, '%')\
      UNION ALL\
      SELECT 'Contact Master' as table_name, name AS result,'/cap/admin/lists/contactList' as href  FROM contact_master WHERE name LIKE CONCAT('%', search_text, '%')\
      UNION ALL\
      SELECT 'Contact Master' as table_name, print_name AS result,'/cap/admin/lists/contactList' as href  FROM contact_master WHERE print_name LIKE CONCAT('%', search_text, '%')\
       UNION ALL\
      SELECT 'Contact Master' as table_name, pan AS result,'/cap/admin/lists/contactList' as href  FROM contact_master WHERE pan LIKE CONCAT('%', search_text, '%')\
       UNION ALL\
      SELECT 'Contact Master' as table_name, aadhaar AS result,'/cap/admin/lists/contactList' as href  FROM contact_master WHERE aadhaar LIKE CONCAT('%', search_text, '%')\
    UNION ALL\
      SELECT 'Organization Master' as table_name, alias AS result,'/cap/admin/lists/organisationList' as href FROM organisation_master WHERE alias LIKE CONCAT('%', search_text, '%')\
      UNION ALL\
      SELECT 'Organization Master' as table_name, name AS result,'/cap/admin/lists/organisationList' as href FROM organisation_master WHERE name LIKE CONCAT('%', search_text, '%')\
      UNION ALL\
      SELECT 'Organization Master' as table_name, print_name AS result,'/cap/admin/lists/organisationList' as href FROM organisation_master WHERE print_name LIKE CONCAT('%', search_text, '%')\
       UNION ALL\
      SELECT 'Organization Master' as table_name, pan AS result,'/cap/admin/lists/organisationList' as href FROM organisation_master WHERE pan LIKE CONCAT('%', search_text, '%')\
      UNION ALL\
      SELECT 'Organization Master' as table_name, gstin AS result,'/cap/admin/lists/organisationList' as href FROM organisation_master WHERE gstin LIKE CONCAT('%', search_text, '%')\
      UNION ALL\
      SELECT 'Organization Master' as table_name, pincode  AS result,'/cap/admin/lists/organisationList' as href FROM organisation_master WHERE pincode LIKE CONCAT('%', search_text, '%')\
        UNION ALL\
      SELECT 'Executive Master' as table_name, alias AS result,'/cap/admin/lists/executiveList' as href FROM executive_master WHERE alias LIKE CONCAT('%', search_text, '%')\
      UNION ALL\
      SELECT 'Executive Master' as table_name, name AS result,'/cap/admin/lists/executiveList' as href FROM executive_master WHERE name LIKE CONCAT('%', search_text, '%')\
      UNION ALL\
         SELECT 'Executive Master' as table_name, pincode AS result,'/cap/admin/lists/executiveList' as href FROM executive_master WHERE pincode LIKE CONCAT('%', search_text, '%')\
      UNION ALL\
        SELECT 'Executive Master' as table_name, country_id AS result,'/cap/admin/lists/executiveList' as href FROM executive_master WHERE country_id LIKE CONCAT('%', search_text, '%')\
      UNION ALL\
      SELECT 'Executive Master' as table_name, name AS result,'/cap/admin/lists/executiveList' as href FROM executive_master WHERE email LIKE CONCAT('%', search_text, '%')\
      UNION ALL\
         SELECT 'Executive Master' as table_name, mobile AS result,'/cap/admin/lists/executiveList' as href FROM executive_master WHERE mobile LIKE CONCAT('%', search_text, '%')\
      UNION ALL\
      SELECT 'Executive Master' as table_name, whatsapp AS result,'/cap/admin/lists/executiveList' as href FROM executive_master WHERE whatsapp LIKE CONCAT('%', search_text, '%')\
  )\
      SELECT DISTINCT * FROM combined_results;\
\
END ;~\
\
CREATE PROCEDURE `updateAction`(\
IN id int(11) unsigned,\
  IN name varchar(60),\
  IN user_id integer\
  )\
BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
  declare error_path varchar(20);\
  DECLARE count_name varchar(60);\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
 \
  start transaction;\
  set error = 0;\
  set error_text = '';\
  set last_insert_id = 0;\
  \
  SELECT \
    COUNT(*)\
  INTO count_name FROM\
    enquiry_action_master am\
  WHERE\
  (am.id <> id AND am.name = name)\
      OR LENGTH(name) = 0\
      OR name IS NULL;\
      \
      if count_name > 0 then\
    if length(name) > 0 or name is not null then\
    set error = 1;\
      set error_path = 'name';\
      set error_text = 'Name Already Exists';\
    END if;\
          if length(name) = 0 or name is null then\
    set error = 1;\
      set error_path = 'name';\
      set error_text = 'Name cannot be empty';\
    END if;\
  END if;\
      \
            \
  if error = 0 then\
    update enquiry_action_master am set \
      am.name=name, am.modified_by=(user_id), am.modified_on = now() where am.id=id;\
    end if;\
  commit;\
  \
  SELECT error, error_path, error_text;\
  SELECT \
    *\
  FROM\
    enquiry_action_master am\
  WHERE\
    am.id = id;\
END ;~\
\
\
CREATE PROCEDURE `updateAllocationType`(\
IN id int(11) unsigned,\
  IN name varchar(60),\
  IN user_id integer\
  )\
BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
  declare error_path varchar(20);\
  DECLARE count_name varchar(60);\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
  \
  start transaction;\
  \
  set error = 0;\
  set error_text = '';\
  set last_insert_id = 0;\
  \
  SELECT \
    COUNT(*)\
  INTO count_name FROM\
    allocation_type_master am\
  WHERE\
  (am.id <> id AND am.name = name)\
      OR LENGTH(name) = 0\
      OR name IS NULL;\
      \
      if count_name > 0 then\
    if length(name) > 0 or name is not null then\
    set error = 1;\
      set error_path = 'name';\
      set error_text = 'Name Already Exists';\
    END if;\
          if length(name) = 0 or name is null then\
    set error = 1;\
      set error_path = 'name';\
      set error_text = 'Name cannot be empty';\
    END if;\
  END if;\
      \
            \
  if error = 0 then\
    update allocation_type_master am set \
      am.name=name, am.modified_by=(user_id), am.modified_on = now() where am.id=id;\
    end if;\
  commit;\
  \
  SELECT error, error_path, error_text;\
  SELECT \
    *\
  FROM\
    allocation_type_master am\
  WHERE\
    am.id = id;\
END ;~\
\
\
CREATE PROCEDURE `updateArea`(\
IN name varchar(75),\
  IN id int(11) unsigned,\
  IN user_id integer\
  )\
BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
  declare error_path varchar(20);\
  declare count_name integer;\
   DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
\
  start transaction;\
  \
  set error = 0;\
  set error_text = '';\
  \
  SELECT COUNT(*) INTO count_name\
  FROM area_master am\
  WHERE (am.id<> id && am.name = name) or\
  length(name)=0 or name is null;\
\
  if count_name > 0 then\
    if length(name) > 0 or name is not null then\
    set error = 1;\
      set error_path = 'name';\
      set error_text = 'Area Already Exists';\
    END if;\
          if length(name) = 0 or name is null then\
    set error = 1;\
      set error_path = 'name';\
      set error_text = 'Area cannot be empty';\
    END if;\
  END if;\
      if error = 0 then\
    UPDATE area_master am SET\
           am.name=name, am.modified_by=(user_id), am.modified_on = now() where am.id=id;\
  END if;\
commit;\
  \
  select error, error_path, error_text;\
  select * from area_master am where am.id = id;\
END ;~\
\
\
CREATE PROCEDURE `updateCallAllocation`(\
  IN executiveId INT,\
  IN remark TEXT,\
  IN idList VARCHAR(255),\
  IN delimiter CHAR(1)\
)\
BEGIN\
  DECLARE i INT DEFAULT 1;\
  DECLARE idPart VARCHAR(255);\
  DECLARE idListLen INT;\
\
  DROP TEMPORARY TABLE IF EXISTS tempIds;\
  \
  CREATE TEMPORARY TABLE tempIds (id INT);\
\
  SET idListLen = LENGTH(idList) - LENGTH(REPLACE(idList, delimiter, '')) + 1;\
\
  START TRANSACTION;\
\
  WHILE i <= idListLen DO\
      SET idPart = TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(idList, delimiter, i), delimiter, -1));\
      INSERT INTO tempIds(id) VALUES (CAST(idPart AS UNSIGNED));\
      SET i = i + 1;\
  END WHILE;\
\
  INSERT INTO enquiry_ledger_tran (\
      enquiry_id,\
      status_version,\
      allocated_to,\
      date,\
      status_id,\
      sub_status_id,\
      action_taken_id,\
      next_action_id,\
      next_action_date,\
      enquiry_remark,\
      suggested_action_remark,\
      action_taken_remark,\
      closure_remark,\
      enquiry_tran_type_id,\
      active\
  )\
  SELECT \
      elt.enquiry_id,\
      elt.status_version,\
      executiveId,\
      NOW(),\
      elt.status_id,\
      elt.sub_status_id,\
      elt.action_taken_id,\
      elt.next_action_id,\
      elt.next_action_date,\
      elt.enquiry_remark,\
      remark,\
      elt.action_taken_remark,\
      elt.closure_remark,\
      elt.enquiry_tran_type_id,\
      elt.active\
  FROM enquiry_ledger_tran elt\
  JOIN (\
      SELECT enquiry_id, MAX(id) as max_id\
      FROM enquiry_ledger_tran\
      WHERE enquiry_id IN (SELECT id FROM tempIds)\
      GROUP BY enquiry_id\
  ) latest ON elt.id = latest.max_id;\
\
  COMMIT;\
END ;~\
\
\
CREATE PROCEDURE `updateCategory`(\
IN id int(11) unsigned,\
  IN name varchar(60),\
  IN user_id integer\
  )\
BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
  declare error_path varchar(20);\
  DECLARE count_name varchar(60);\
DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
\
  start transaction;\
\
  set error = 0;\
  set error_text = '';\
 \
SELECT COUNT(*) INTO count_name\
  FROM enquiry_category_master cm\
  WHERE (cm.id <> id and cm.name = name) or length(name) = 0 or name is null;\
     \
if count_name > 0 then\
  if length(name) > 0 or name is not null then\
  set error = 1;\
  set error_path = 'name';\
  set error_text = 'Name Already Exists';\
  END if;\
          \
  if length(name) = 0 or name is null then\
    set error = 1;\
    set error_path = 'name';\
    set error_text = 'Name cannot be empty';\
  END if;\
END if;\
           \
if error = 0 then\
 update enquiry_category_master cm set\
      cm.name=name, cm.modified_by=(user_id), cm.modified_on = now() where cm.id=id;\
END if;\
  commit;\
 \
select error, error_path, error_text;\
  select * from enquiry_category_master cm where cm.id = id;\
END ;~\
\
\
CREATE PROCEDURE `updateContact`(\
IN id int(11) unsigned,\
IN alias varchar(60),\
  IN name varchar(60),\
IN print_name varchar(60),\
IN group_id  int(11),\
IN pan  varchar(20),\
IN aadhaar  varchar(20),\
IN address1 varchar(75),\
IN address2 varchar(75),\
IN address3 varchar(75),\
IN city varchar(75),\
IN state_id  int(11),\
IN area_id  int(11),\
IN pincode varchar(15),\
IN country_id  int(11),\
IN email varchar(100),\
IN mobile varchar(20),\
IN whatsapp varchar(20),\
IN dob datetime,\
IN doa datetime,\
IN dept_id  int(11),\
IN org_id  int(11),\
  IN user_id integer)\
BEGIN\
  DECLARE error integer;\
  DECLARE count_name varchar(60);\
  declare count_alias varchar(60);\
  declare count_pan varchar(20);\
  declare count_aadhaar varchar(20);\
  declare count_email varchar(100);\
  declare count_mobile varchar(20);\
  declare count_whatsapp varchar(20);\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
  \
  start transaction;\
  \
  set error = 0;\
  \
  DROP TABLE IF EXISTS temp_error_log;\
  \
CREATE TEMPORARY TABLE temp_error_log (\
  id INT AUTO_INCREMENT PRIMARY KEY,\
  error_text VARCHAR(255),\
  error_path VARCHAR(100)\
);\
  \
  SELECT COUNT(*) INTO count_name\
  FROM contact_master cm\
  WHERE (cm.id <> id AND cm.name = name) or length(name) = 0 or name is null;\
      \
      if count_name > 0 then\
    if length(name) > 0 or name is not null then\
      set error = 1;\
      INSERT INTO temp_error_log (error_text, error_path) \
      VALUES ('Name alreay exists', 'name');\
      \
    END if;\
          if length(name) = 0 or name is null then \
      set error = 1;\
      INSERT INTO temp_error_log (error_text, error_path) \
      VALUES ('Name cannot be empty', 'name');\
      \
    END if;\
  END if;\
      \
  SELECT COUNT(*) INTO count_name\
  FROM contact_master cm\
  WHERE (cm.id <> id AND cm.alias = name);\
    if count_name > 0 then\
      set error = 1;\
      INSERT INTO temp_error_log (error_text, error_path) \
      VALUES ('Name already exists as alias', 'name');\
      \
    END if;\
      \
  \
      if length(alias) <> 0 then\
    \
    SELECT COUNT(*) INTO count_alias FROM contact_master cm\
    WHERE (cm.id <> id AND cm.alias = alias );\
    if count_alias > 0 then\
      set error = 1;\
        INSERT INTO temp_error_log (error_text, error_path) \
        VALUES ('Alias already exists', 'alias');\
        \
    END if;\
          \
      SELECT COUNT(*) INTO count_alias FROM contact_master cm\
      WHERE (cm.id <> id AND cm.name = alias );\
      if count_alias > 0 then\
        set error = 1;\
          INSERT INTO temp_error_log (error_text, error_path) \
          VALUES ('Alias already exists as name', 'alias');\
      END if;\
          END if;\
          \
      if length(pan) <> 0 then\
    \
    SELECT COUNT(*) INTO count_pan FROM contact_master cm\
    WHERE (cm.id <> id AND cm.pan = pan);\
    if count_pan > 0 then\
      set error = 1;\
        INSERT INTO temp_error_log (error_text, error_path) \
        VALUES ('Pan already exists', 'pan');\
        \
    END if;\
      End if;\
      \
      if length(aadhaar) <> 0 then\
    \
    SELECT COUNT(*) INTO count_aadhaar FROM contact_master cm\
    WHERE (cm.id <> id AND cm.aadhaar = aadhaar);\
    if count_aadhaar > 0 then\
      set error = 1;\
        INSERT INTO temp_error_log (error_text, error_path) \
        VALUES ('Aadhaar already exists', 'aadhaar');\
        \
    END if;\
      End if;\
      \
      if length(email) <> 0 then\
    \
    SELECT COUNT(*) INTO count_email FROM contact_master cm\
    WHERE (cm.id <> id AND cm.email = email);\
    if count_email > 0 then\
      set error = 1;\
        INSERT INTO temp_error_log (error_text, error_path) \
        VALUES ('Email already exists', 'email');\
        \
    END if;\
      End if;\
      \
      if length(mobile) <> 0 then\
    \
    SELECT COUNT(*) INTO count_mobile FROM contact_master cm\
    WHERE (cm.id <> id AND cm.mobile = mobile);\
    if count_mobile > 0 then\
      set error = 1;\
        INSERT INTO temp_error_log (error_text, error_path) \
        VALUES ('Mobile already exists', 'mobile');\
        \
    END if;\
      End if;\
      \
      if length(whatsapp) <> 0 then\
    \
    SELECT COUNT(*) INTO count_whatsapp FROM contact_master cm\
    WHERE (cm.id <> id AND cm.whatsapp = whatsapp);\
    if count_whatsapp > 0 then\
      set error = 1;\
        INSERT INTO temp_error_log (error_text, error_path) \
        VALUES ('Whatsapp already exists', 'whatsapp');\
        \
    END if;\
      End if;\
      \
  if error = 0 then\
      \
    UPDATE contact_master cm SET  cm.name= name, cm.alias  = alias, cm.print_name  = print_name,\
          cm.group_id  = group_id,cm.pan  = pan,cm.aadhaar  = aadhaar, cm.address1  = address1,cm.address2  = address2,\
          cm.address3  = address3,cm.city  = city,cm.state_id  = state_id, cm.area_id  = area_id, cm.pincode  = pincode,cm.country_id  = country_id,\
          cm.email  = email,cm.mobile  = mobile,cm.whatsapp = whatsapp,cm.modified_by = user_id, cm.modified_on = now(),cm.department_id  = department_id,\
          cm.organisation_id  = organisation_id\
    WHERE cm.id=id;\
  END if;\
  commit;\
  \
  select * from temp_error_log;\
  select * from contact_master cm where cm.id = id;\
END ;~\
\
\
CREATE PROCEDURE `updateContactGroup`(\
IN id int(11) unsigned,\
  in name varchar(70),\
  in alias varchar(70),\
  in parentId int,\
  IN user_id integer\
  )\
BEGIN\
  DECLARE error integer;\
  DECLARE count_name varchar(60);\
  DECLARE count_alias varchar(60);\
DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
\
  start transaction;\
  \
  set error = 0;\
    \
  DROP TABLE IF EXISTS error_table;\
\
create temporary table error_table (\
  id int auto_increment primary key,\
  error_text varchar(255) , \
  error_path varchar(100) \
);\
  \
  SELECT COUNT(*) INTO count_name\
  FROM contact_group_master am\
  WHERE (am.id <> id and (am.name = name OR am.alias = name)) or length(name) = 0 or name is null;\
      \
      if count_name > 0 then\
    if length(name) > 0 or name is not null then\
      set error = 1;\
      insert into error_table (error_text, error_path) values ('name already exist' , 'name');\
    END if;\
    if length(name) = 0 or name is null then\
      set error = 1;\
      insert into error_table (error_text, error_path) values ('name cannot be empty' , 'name');\
    END if;\
  END if;\
      \
      \
  SELECT COUNT(*) INTO count_alias\
  FROM contact_group_master am\
  WHERE (am.id <> id and (am.name = alias OR am.alias = alias)) or length(alias) = 0 or alias is null;\
      \
      if count_alias > 0 then\
    if length(alias) > 0 or alias is not null then\
      set error = 1;\
      insert into error_table (error_text, error_path) values ('alias already exist' , 'alias');\
    END if;\
    if length(alias) = 0 or alias is null then\
      set error = 1;\
      insert into error_table (error_text, error_path) values ('alias cannot be empty' , 'alias');\
    END if;\
  END if;\
            \
  if error = 0 then\
    update contact_group_master am set \
    am.name=name, am.alias=alias ,am.parent_id=parentId, am.modified_by=user_id, am.modified_on = now() where am.id=id;\
  END if;\
  commit;\
  \
select * from error_table;\
  select * from contact_group_master am where am.id = id;\
END ;~\
\
\
CREATE PROCEDURE `updateCountry`(\
IN name varchar(75),\
  IN id int(11) unsigned,\
  IN alias varchar(45),\
  IN user_id integer)\
BEGIN\
  DECLARE error integer;\
  declare count_name integer;\
  declare count_alias integer;\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
  \
  start transaction;\
  \
 DROP TABLE IF EXISTS temp_error_log;\
 \
  CREATE TEMPORARY TABLE temp_error_log (\
  id INT AUTO_INCREMENT PRIMARY KEY,\
  error_text VARCHAR(255),\
  error_path VARCHAR(100)\
);\
  \
  set error = 0;\
\
  SELECT COUNT(*) INTO count_name\
  FROM country_master cm\
  WHERE (cm.id <> id && cm.name = name) or\
  length(name)=0 or name is null;\
\
  if count_name > 0 then\
    if length(name) > 0 or name is not null then\
      set error = 1;\
              INSERT INTO temp_error_log (error_text, error_path)\
      VALUES ('Country alreay exists', 'name');\
    END if;\
          if length(name) = 0 or name is null then\
      set error = 1;\
              INSERT INTO temp_error_log (error_text, error_path)\
      VALUES ('Country cannot be empty', 'name');\
    END if;\
  END if;\
    SELECT COUNT(*) INTO count_alias\
    FROM country_master cm\
    WHERE (cm.id <> id && cm.alias = alias && length(alias)!=0);\
\
    if count_alias > 0 then\
      if length(alias) > 0 or alias is not null then\
        set error = 1;\
        INSERT INTO temp_error_log (error_text, error_path)\
        VALUES ('Alias Already Exists', 'alias');\
      END if;\
    END if;\
      if error = 0 then\
    UPDATE country_master cm SET cm.name = name,cm.alias = alias,cm.modified_by = user_id,cm.modified_on = now() where cm.id = id;\
  END if;\
commit;\
  select * from temp_error_log;\
  select * from country_master cm where cm.id = id;\
END ;~\
\
\
CREATE PROCEDURE `updateCurrency`(\
  IN id int(11) unsigned,\
  IN user_symbol VARCHAR(50),\
  IN user_name VARCHAR(75),\
  IN user_shortForm VARCHAR(100),\
  IN user_Decimal_places VARCHAR(50),\
  IN user_Currency_system VARCHAR(50)\
)\
BEGIN\
  DECLARE error INTEGER;\
  DECLARE count_name INTEGER;\
  DECLARE count_symbol INTEGER;\
  DECLARE last_insert_id INTEGER;\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
\
  START TRANSACTION;\
\
  SET error = 0;\
\
  DROP TEMPORARY TABLE IF EXISTS error_table;\
\
  CREATE TEMPORARY TABLE error_table (\
      id INT AUTO_INCREMENT PRIMARY KEY,\
      error_text VARCHAR(255), \
      error_path VARCHAR(100)\
  );\
  \
  SELECT COUNT(*) INTO count_name\
  FROM currency_data cd\
  WHERE cd.name = user_name\
  OR LENGTH(user_name) = 0\
  OR user_name IS NULL;\
\
  IF count_name > 0 THEN\
      IF LENGTH(user_name) > 0 THEN\
          SET error = 1;\
          INSERT INTO error_table (error_text, error_path) VALUES ('Name already exists', 'Name');\
      END IF;\
      IF LENGTH(user_name) = 0 THEN\
          SET error = 1;\
          INSERT INTO error_table (error_text, error_path) VALUES ('Name cannot be empty', 'Name');\
      END IF;\
  END IF;\
\
  \
  SELECT COUNT(*) INTO count_symbol\
  FROM currency_data cd\
  WHERE cd.symbol = user_symbol\
  OR LENGTH(user_symbol) = 0\
  OR user_symbol IS NULL;\
\
  IF count_symbol > 0 THEN\
      IF LENGTH(user_symbol) > 0 THEN\
          SET error = 1;\
          INSERT INTO error_table (error_text, error_path) VALUES ('Symbol already exists', 'Symbol');\
      END IF;\
      IF LENGTH(user_symbol) = 0 THEN\
          SET error = 1;\
          INSERT INTO error_table (error_text, error_path) VALUES ('Symbol cannot be empty', 'Symbol');\
      END IF;\
  END IF;\
\
  IF error = 0 THEN\
             \
      update currency_data am set \
    am.name=user_name, \
          am.symbol=user_symbol, \
          am.shortForm=user_shortForm, \
          am.decimal_places=user_Decimal_places, \
          am.currency_system=user_Currency_system \
          where am.id=id;\
      \
  END IF;\
\
  COMMIT;\
\
  SELECT * FROM error_table;\
  SELECT * FROM currency_data cd WHERE cd.id = id;\
\
END ;~\
\
\
CREATE PROCEDURE `updateDepartment`(\
IN id int(11) unsigned,\
  IN name varchar(60),\
  IN user_id integer)\
BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
  declare error_path varchar(20);\
  DECLARE count_name varchar(60);\
DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END;\
 \
  start transaction;\
\
set error = 0;\
  set error_text = '';\
 \
  SELECT COUNT(*) INTO count_name\
  FROM department_master cm\
  WHERE cm.name = name or length(name) = 0 or name is null;\
     \
  if count_name > 0 then\
    if length(name) > 0 or name is not null then\
    set error = 1;\
    set error_path = 'name';\
    set error_text = 'Name Already Exists';\
    END if;\
      \
    if length(name) = 0 or name is null then\
      set error = 1;\
      set error_path = 'name';\
      set error_text = 'Name cannot be empty';\
    END if;\
  END if;\
     \
           \
  if error = 0 then\
    update department_master cm set\
    cm.name=name, cm.modified_by=user_id, cm.modified_on = now() where cm.id=id;\
  END if;\
  commit;\
 \
select error, error_path, error_text;\
  select * from department_master cm where cm.id = id;\
END ;~\
\
\
CREATE PROCEDURE `updateEnquirySource`(\
IN id int(11) unsigned,\
  IN name varchar(60),\
  IN user_id integer)\
BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
  declare error_path varchar(20);\
  DECLARE count_name varchar(60);\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
\
  start transaction;\
 \
  set error = 0;\
  set error_text = '';\
  \
  SELECT COUNT(*) INTO count_name\
  FROM enquiry_source_master cm\
  WHERE cm.name = name or length(name) = 0 or name is null;\
     \
  if count_name > 0 then\
    if length(name) > 0 or name is not null then\
    set error = 1;\
    set error_path = 'name';\
    set error_text = 'Name Already Exists';\
    END if;\
      \
    if length(name) = 0 or name is null then\
      set error = 1;\
      set error_path = 'name';\
      set error_text = 'Name cannot be empty';\
    END if;\
  END if;\
\
  if error = 0 then\
    update enquiry_source_master cm set\
    cm.name=name, cm.modified_by= user_id, cm.modified_on = now() where cm.id=id;\
  END if;\
  commit;\
 \
select error, error_path, error_text;\
  select * from enquiry_source_master cm where cm.id = id;\
END ;~\
\
\
CREATE PROCEDURE `UpdateEnquirySubStatus`(\
IN id int(11) unsigned,\
  IN name varchar(60),\
  IN user_id integer\
  )\
BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
  declare error_path varchar(20);\
  DECLARE count_name varchar(60);\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
  \
  start transaction;\
\
  set error = 0;\
  set error_text = '';\
  set last_insert_id = 0;\
\
  SELECT COUNT(*) INTO count_name\
  FROM enquiry_sub_status_master am\
  WHERE (am.id <> id and am.name = name) or length(name) = 0 or name is null;\
      \
      if count_name > 0 then\
    if length(name) > 0 or name is not null then\
    set error = 1;\
      set error_path = 'name';\
      set error_text = 'Name Already Exists';\
    END if;\
          if length(name) = 0 or name is null then\
    set error = 1;\
      set error_path = 'name';\
      set error_text = 'Name cannot be empty';\
    END if;\
  END if;\
      \
            \
  if error = 0 then\
    update enquiry_sub_status_master am set \
      am.name=name, am.modified_by=user_id, am.modified_on = now() where am.id=id;\
  END if;\
  commit;\
  \
select error, error_path, error_text;\
  select * from enquiry_sub_status_master am where am.id = id;\
END ;~\
\
\
CREATE PROCEDURE `updateExecutive`(\
IN id integer,\
  IN alias varchar(60),\
  IN name varchar(60),\
IN address1 varchar(75),\
IN address2 varchar(75),\
IN address3 varchar(75),\
IN city varchar(75),\
IN state_id integer,\
IN pincode varchar(15),\
IN country_id integer,\
IN email varchar(100),\
IN mobile varchar(20),\
IN whatsapp varchar(20),\
IN dob varchar(100),\
IN doa varchar(100),\
IN doj varchar(100),\
  IN area_id integer,\
  IN call_type varchar(50),\
  IN crm_user_id integer,\
  IN role_id integer,\
  IN dept_id integer,\
  IN group_id integer,\
  IN user_id integer)\
BEGIN\
  DECLARE error integer;\
  DECLARE count_alias integer;\
  declare count_name integer;\
  declare var_group_id integer;\
  declare var_area_id integer;\
  declare var_state_id integer;\
  declare var_country_id integer;\
  declare var_dept_id integer;\
  declare var_executive_id integer;\
  declare var_call_type_id integer;\
  declare var_role_id integer;\
DECLARE dofb datetime;\
DECLARE dofa datetime;\
  DECLARE dofj datetime;\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END;\
\
start transaction;\
      \
  set error = 0;\
  \
  DROP TABLE IF EXISTS error_table;\
\
create temporary table error_table (\
  id int auto_increment primary key,\
  error_text varchar(255) , \
  error_path varchar(100) \
);\
  \
SET dofb = CASE \
  WHEN TRIM(dob) = '' THEN NULL\
  ELSE CAST(dob AS DATETIME)\
END;\
\
SET dofa = CASE \
  WHEN TRIM(doa) = '' THEN NULL\
  ELSE CAST(doa AS DATETIME)\
END;\
  \
SET dofj = CASE \
  WHEN TRIM(doj) = '' THEN NULL\
  ELSE CAST(doj AS DATETIME)\
END;    \
  \
  SELECT COUNT(*) INTO count_name\
  FROM executive_master em\
  WHERE (em.id <> id AND (em.name = name or\
  em.alias = name));\
      \
      if count_name > 0 then\
    set error = 1;\
    insert into error_table (error_text, error_path) values ('name already exist' , 'name');	\
  end if;\
\
    \
    SELECT COUNT(*) INTO count_alias\
    FROM executive_master em\
    WHERE (em.id <> id AND (em.name = alias or\
    em.alias = alias));\
  \
      if count_alias > 0 then\
    set error = 1;\
    insert into error_table (error_text, error_path) values ('alias already exist' , 'alias');	\
  end if;\
    \
    if error = 0 then\
      select ctm.id into var_call_type_id from call_type_master ctm where ctm.name=call_type LOCK IN SHARE MODE;\
                              \
      update executive_master em set\
      em.alias=alias, em.name=name, em.address1=address1, em.address2=address2, em.address3=address3, \
              em.city=city, em.state_id=state_id, em.pincode=pincode, em.country_id=country_id, em.email=email,\
              em.mobile=mobile, em.whatsapp=whatsapp, em.modified_by=user_id, em.modified_on=now(), em.dob=dofb,\
              em.doa=dofa, em.doj=dofj, em.area_id=area_id, em.call_type_id=var_call_type_id, em.crm_user_id = crm_user_id,\
              em.role_id=role_id, em.dept_id=dept_id, em.group_id=group_id where em.id = id;\
  END IF;\
commit;\
select * from error_table;\
  select * from executive_master em where em.id = id;\
END ;~\
\
\
CREATE PROCEDURE `updateExecutiveDept`(\
IN id int(11) unsigned,\
  IN name varchar(60),\
  IN user_id integer\
  )\
BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
  declare error_path varchar(20);\
  DECLARE count_name varchar(60);\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END;\
 \
  start transaction;\
 \
  set error = 0;\
  set error_text = '';\
 \
SELECT COUNT(*) INTO count_name\
  FROM executive_dept_master cm\
  WHERE (cm.id <> id and cm.name = name) or length(name) = 0 or name is null;\
     \
if count_name > 0 then\
  if length(name) > 0 or name is not null then\
  set error = 1;\
  set error_path = 'name';\
  set error_text = 'Name Already Exists';\
  END if;\
          \
  if length(name) = 0 or name is null then\
    set error = 1;\
    set error_path = 'name';\
    set error_text = 'Name cannot be empty';\
  END if;\
END if;\
     \
           \
if error = 0 then\
   update executive_dept_master cm set\
    cm.name=name, cm.modified_by=user_id, cm.modified_on = now() where cm.id=id;\
END if;\
  commit;\
 \
select error, error_path, error_text;\
  select * from executive_dept_master cm where cm.id = id;\
END ;~\
\
\
CREATE PROCEDURE `updateExecutiveGroup`(\
IN name varchar(75),\
IN alias varchar(75),\
  IN id int(11) unsigned,\
IN parent_id varchar(75),\
IN user_id integer)\
BEGIN\
  DECLARE error integer;\
  DECLARE count_name integer;\
  DECLARE count_alias integer;\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
 \
  start transaction;\
  \
  set error = 0;\
  set last_insert_id = 0;\
 \
  DROP TABLE IF EXISTS temp_error_log;\
 \
  CREATE TEMPORARY TABLE temp_error_log (\
  id INT AUTO_INCREMENT PRIMARY KEY,\
  error_text VARCHAR(255),\
  error_path VARCHAR(100)\
);\
      \
SELECT COUNT(*) INTO count_name\
  FROM executive_group_master egm\
  WHERE  (egm.id <> id && egm.name = name) or length(name) = 0 or name is null;\
     \
if count_name > 0 then\
  if length(name) > 0 or name is not null then\
  set error = 1;\
  INSERT INTO temp_error_log (error_text, error_path)\
  VALUES ('Name alreay exists', 'name');\
      END if;\
END if;\
if length(name) = 0 or name is null then \
  set error = 1;\
  INSERT INTO temp_error_log (error_text, error_path)\
  VALUES ('Name cannot be empty', 'name');\
  \
END if;\
     \
SELECT COUNT(*) INTO count_name\
  FROM executive_group_master egm\
  WHERE (egm.id <> id && egm.alias = name);\
if count_name > 0 then\
  set error = 1;\
  INSERT INTO temp_error_log (error_text, error_path)\
  VALUES ('Name already exists as alias', 'name');\
  \
END if;\
     \
\
if length(alias) <> 0 then\
\
  SELECT COUNT(*) INTO count_alias FROM executive_group_master egm\
  WHERE egm.id <> id && egm.alias = alias ;\
  if count_alias > 0 then\
    set error = 1;\
    INSERT INTO temp_error_log (error_text, error_path)\
    VALUES ('Alias already exists', 'alias');\
    \
  END if;\
         \
  SELECT COUNT(*) INTO count_alias FROM executive_group_master egm\
  WHERE egm.id <> id && egm.name = alias;\
  if count_alias > 0 then\
    set error = 1;\
    INSERT INTO temp_error_log (error_text, error_path)\
    VALUES ('Alias already exists as name', 'alias');\
    \
  END if;\
END if;\
     \
if error = 0 then\
  UPDATE executive_group_master egm set egm.name = name, egm.alias = alias, egm.parent_id = parent_id,egm.modified_by = user_id,egm.modified_on = now() where egm.id = id;\
END if;\
  commit;\
  \
  select * from temp_error_log;\
  select * from executive_group_master egm where egm.id = id;\
END ;~\
\
\
CREATE PROCEDURE `updateExecutivePrev`(\
IN id integer,\
  IN alias varchar(60),\
  IN name varchar(60),\
IN address1 varchar(75),\
IN address2 varchar(75),\
IN address3 varchar(75),\
IN city varchar(75),\
IN state_id integer,\
IN pincode varchar(15),\
IN country_id integer,\
IN email varchar(100),\
IN mobile varchar(20),\
IN whatsapp varchar(20),\
IN dob varchar(100),\
IN doa varchar(100),\
IN doj varchar(100),\
  IN area_id integer,\
  IN call_type varchar(50),\
  IN crm_user_id integer,\
  IN role_id integer,\
  IN dept_id integer,\
  IN group_id integer,\
  IN user_id integer)\
BEGIN\
  DECLARE error integer;\
  DECLARE count_alias integer;\
  declare count_name integer;\
  declare var_group_id integer;\
  declare var_area_id integer;\
  declare var_state_id integer;\
  declare var_country_id integer;\
  declare var_dept_id integer;\
  declare var_executive_id integer;\
  declare var_call_type_id integer;\
  declare var_role_id integer;\
DECLARE dofb datetime;\
DECLARE dofa datetime;\
  DECLARE dofj datetime;\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, sqlwarning\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END;\
\
start transaction;\
select 'transaction started';\
  set error = 0;\
  \
  DROP TABLE IF EXISTS error_table;\
select 'table dropped';\
create temporary table error_table (\
  id int auto_increment primary key,\
  error_text varchar(255) , \
  error_path varchar(100) \
);\
  \
SET dofb = CASE \
  WHEN TRIM(dob) = '' THEN NULL\
  ELSE CAST(dob AS DATETIME)\
END;\
select 'dofb', dofb;\
SET dofa = CASE \
  WHEN TRIM(doa) = '' THEN NULL\
  ELSE CAST(doa AS DATETIME)\
END;\
  select 'dofa', dofa;\
SET dofj = CASE \
  WHEN TRIM(doj) = '' THEN NULL\
  ELSE CAST(doj AS DATETIME)\
END;    \
  select 'dofj', dofj;\
  SELECT COUNT(*) INTO count_name\
  FROM executive_master em\
  WHERE (em.id <> id AND (em.name = name or\
  em.alias = name));\
      \
      if count_name > 0 then\
    set error = 1;\
    insert into error_table (error_text, error_path) values ('name already exist' , 'name');	\
  end if;\
\
    \
    SELECT COUNT(*) INTO count_alias\
    FROM executive_master em\
    WHERE (em.id <> id AND (em.name = alias or\
    em.alias = alias));\
  \
      if count_alias > 0 then\
    set error = 1;\
    insert into error_table (error_text, error_path) values ('alias already exist' , 'alias');	\
  end if;\
    \
    if error = 0 then\
      select id into var_call_type_id from call_type_master where name=call_type LOCK IN SHARE MODE;\
                              \
      update executive_master em set\
      em.alias=alias, em.name=name, em.address1=address1, em.address2=address2, em.address3=address3, \
              em.city=city, em.state_id=state_id, em.pincode=pincode, em.country_id=country_id, em.email=email,\
              em.mobile=mobile, em.whatsapp=whatsapp, em.modified_by=user_id, em.modified_on=now(), em.dob=dofb,\
              em.doa=dofa, em.doj=dofj, em.area_id=area_id, em.call_type_id=var_call_type_id, em.crm_user_id = crm_user_id,\
              em.role_id=role_id, em.dept_id=dept_id, em.group_id=group_id where em.id = id;\
  END IF;\
commit;\
select * from error_table;\
  select * from executive_master em where em.id = id;\
END ;~\
\
\
CREATE PROCEDURE `updateExecutiveRole`(\
IN id int(11) unsigned,\
  IN name varchar(60),\
  IN parentId int,\
  IN user_id integer\
  )\
BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
  declare error_path varchar(20);\
  DECLARE count_name varchar(60);\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
\
  start transaction;\
    \
  set error = 0;\
  set error_text = '';\
 \
SELECT COUNT(*) INTO count_name\
  FROM executive_role_master rm\
  WHERE (rm.id <> id and rm.name = name) or length(name) = 0 or name is null;\
     \
if count_name > 0 then\
  if length(name) > 0 or name is not null then\
  set error = 1;\
  set error_path = 'name';\
  set error_text = 'Name Already Exists';\
  END if;\
          \
  if length(name) = 0 or name is null then\
    set error = 1;\
    set error_path = 'name';\
    set error_text = 'Name cannot be empty';\
  END if;\
END if;\
     \
           \
if error = 0 then\
   update executive_role_master rm set\
    rm.name = name, rm.parent = parentId, rm.modified_by = user_id, rm.modified_on = now() where rm.id=id;\
END if;\
  commit;\
 \
select error, error_path, error_text;\
  select * from executive_role_master rm where rm.id = id;\
END ;~\
\
\
CREATE PROCEDURE `updateItem`(\
IN id integer,\
  IN name varchar(50),\
  IN group_id integer,\
  IN alias varchar(60),\
  IN unit_id integer,\
IN hsn_code varchar(60),\
  IN user_id integer)\
BEGIN\
  DECLARE error integer;\
  DECLARE last_insert_id integer;\
  DECLARE count_alias integer;\
  DECLARE count_name integer;\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
    \
start transaction;\
 \
 DROP TABLE IF EXISTS error_log;\
 \
   CREATE TEMPORARY TABLE error_log (\
  id INT AUTO_INCREMENT PRIMARY KEY,\
      error_text varchar(70),\
      error_path varchar(20)\
  );\
  \
  set error = 0;\
  set last_insert_id = 0;\
  \
  start transaction;\
  \
  \
  SELECT COUNT(*) INTO count_name\
  FROM item_master im\
  WHERE (im.id<>id AND im.name = name) or length(name)=0 or name IS NULL;\
\
  IF count_name > 0 THEN\
    \
          IF length(name)>0 or name IS NOT NULL THEN \
          set error = 1;\
          INSERT INTO error_log (error_text, error_path)\
          VALUES ('Name already exists', 'name');\
  END IF;\
      \
      IF length(name) = 0 or name IS NULL THEN \
    set error = 1;\
          INSERT INTO error_log (error_text, error_path)\
          VALUES ('Name cannot be empty', 'name');\
  END IF;\
      END IF;\
     \
     SELECT COUNT(*) INTO count_name\
   FROM item_master im\
     WHERE (im.id<>id AND im.alias = name);\
\
   IF count_name > 0 THEN\
    set error = 1;\
    INSERT INTO error_log (error_text, error_path)\
    VALUES ('Name already exists as alias', 'name');\
  END If;\
      \
      \
      IF length(alias) <> 0 THEN\
    SELECT COUNT(*) INTO count_alias FROM item_master im\
          WHERE (im.id<>id AND im.alias = alias );\
  IF count_alias > 0 THEN\
    set error = 1;\
          INSERT INTO error_log (error_text, error_path)\
          VALUES ('Alias already exists', 'alias');\
  END IF;      \
  \
    SELECT COUNT(*) INTO count_alias FROM item_master im\
          WHERE (im.id<>id AND im.name = alias);\
  IF count_alias > 0 THEN\
    set error = 1;\
          INSERT INTO error_log (error_text, error_path)\
          VALUES ('Alias already exists as name', 'alias');\
  END IF;\
  END IF;\
             \
if error = 0 then\
  UPDATE item_master im\
  SET \
      im.name = name,\
      im.stamp = 0, \
      im.group_id = group_id,\
      im.alias = alias,\
      im.unit_id = unit_id,\
      im.hsn_code = hsn_code,\
      im.modified_by = user_id,\
      im.modified_on = NOW()\
  WHERE im.id = id;\
\
     IF ROW_COUNT() = 0 THEN\
          SET error = 1;\
          INSERT INTO error_log (error_text, error_path)\
          VALUES ('Item not found or no changes made', 'id');\
      END IF;\
END if;\
    \
  commit;\
 \
  \
  SELECT \
    *\
  FROM\
    error_log;\
    \
  SELECT \
    *\
  FROM\
    item_master im\
  WHERE\
    im.id = id;\
END ;~\
\
\
CREATE PROCEDURE `updateItemGroup`(\
IN id int(11) unsigned,\
  in name varchar(70),\
  in alias varchar(70),\
  in parentId int,\
  IN user_id integer\
  )\
BEGIN\
  DECLARE error integer;\
  DECLARE count_name varchar(60);\
  DECLARE count_alias varchar(60);\
DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
 \
  start transaction;\
   \
  set error = 0;\
  \
  DROP TABLE IF EXISTS error_table;\
\
create temporary table error_table (\
  id int auto_increment primary key,\
  error_text varchar(255) , \
  error_path varchar(100) \
);\
  \
  SELECT COUNT(*) INTO count_name\
  FROM item_group_master am\
  WHERE (am.id <> id and (am.name = name OR am.alias = name)) or length(name) = 0 or name is null;\
      \
      if count_name > 0 then\
    if length(name) > 0 or name is not null then\
      set error = 1;\
      insert into error_table (error_text, error_path) values ('name already exist' , 'name');\
    END if;\
    if length(name) = 0 or name is null then\
      set error = 1;\
      insert into error_table (error_text, error_path) values ('name cannot be empty' , 'name');\
    END if;\
  END if;\
      \
      \
  SELECT COUNT(*) INTO count_alias\
  FROM item_group_master am\
  WHERE (am.id <> id and (am.name = alias OR am.alias = alias)) or length(alias) = 0 or alias is null;\
      \
      if count_alias > 0 then\
    if length(alias) > 0 or alias is not null then\
      set error = 1;\
      insert into error_table (error_text, error_path) values ('alias already exist' , 'alias');\
    END if;\
    if length(alias) = 0 or alias is null then\
      set error = 1;\
      insert into error_table (error_text, error_path) values ('alias cannot be empty' , 'alias');\
    END if;\
  END if;\
            \
  if error = 0 then\
    update item_group_master am set \
    am.name=name, am.alias=alias ,am.parent_id=parentId, am.modified_by=user_id, am.modified_on = now() where am.id=id;\
  END if;\
  commit;\
  \
select * from error_table;\
  select * from item_group_master am where am.id = id;\
END ;~\
\
\
CREATE PROCEDURE `updateOrganisation`(\
IN id int(11) unsigned,\
IN alias VARCHAR(75),\
IN name VARCHAR(75),\
IN printName VARCHAR(75),\
IN pan VARCHAR(75),\
IN gstin VARCHAR(75),\
IN address1 VARCHAR(75),\
IN address2 VARCHAR(75),\
IN address3 VARCHAR(75),\
IN city VARCHAR(75),\
IN state_id VARCHAR(75),\
IN pincode VARCHAR(75),\
IN country_id VARCHAR(75),\
IN user_id integer)\
BEGIN\
  DECLARE error integer;\
  DECLARE last_insert_id integer;\
  DECLARE count_alias integer;\
  declare count_name integer;\
declare count_pan varchar(20);\
  declare count_gstin varchar(20);\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
    \
  start transaction;\
  \
  DROP TABLE IF EXISTS temp_error_log;\
      \
CREATE TEMPORARY TABLE temp_error_log (\
  id INT AUTO_INCREMENT PRIMARY KEY,\
  error_text VARCHAR(255),\
  error_path VARCHAR(100)\
);\
  \
  set error = 0;  \
  \
  SELECT COUNT(*) INTO count_name\
  FROM organisation_master om\
  WHERE  (om.id <> id AND om.name = name) or length(name) = 0 or name is null;\
      \
      if count_name > 0 then\
    if length(name) > 0 or name is not null then\
      set error = 1;\
      INSERT INTO temp_error_log (error_text, error_path) \
      VALUES ('Name alreay exists', 'name');\
\
    END if;\
          if length(name) = 0 or name is null then \
      set error = 1;\
      INSERT INTO temp_error_log (error_text, error_path) \
      VALUES ('Name cannot be empty', 'name');\
    END if;\
  END if;\
      \
  SELECT COUNT(*) INTO count_name\
  FROM organisation_master om\
  WHERE (om.id <> id AND om.alias = name);\
    if count_name > 0 then\
      set error = 1;\
      INSERT INTO temp_error_log (error_text, error_path) \
      VALUES ('Name already exists as alias', 'name');\
    END if;\
          \
      \
  if length(alias) <> 0 then\
    SELECT COUNT(*) INTO count_alias FROM organisation_master om\
    WHERE (om.id <> id AND om.alias = alias);\
    if count_alias > 0 then\
      set error = 1;\
        INSERT INTO temp_error_log (error_text, error_path) \
        VALUES ('Alias already exists', 'alias');\
    END if;\
          \
      SELECT COUNT(*) INTO count_alias FROM organisation_master om\
      WHERE (om.id <> id AND om.name = alias);\
      if count_alias > 0 then\
        set error = 1;\
          INSERT INTO temp_error_log (error_text, error_path) \
          VALUES ('Alias already exists as name', 'alias');\
      END if;\
  END if;\
      \
      \
      if length(pan) <> 0 then\
    \
    SELECT COUNT(*) INTO count_pan FROM organisation_master om\
    WHERE (om.id <> id AND om.pan = pan);\
    if count_pan > 0 then\
      set error = 1;\
        INSERT INTO temp_error_log (error_text, error_path) \
        VALUES ('Pan already exists', 'pan');\
    END if;\
      End if;\
      \
      \
      if length(gstin) <> 0 then\
    \
    SELECT COUNT(*) INTO count_gstin FROM organisation_master om\
    WHERE (om.id <> id AND om.gstin = gstin);\
    if count_gstin > 0 then\
      set error = 1;\
        INSERT INTO temp_error_log (error_text, error_path) \
        VALUES ('Gstin already exists', 'gstin');\
    END if;\
      End if;\
      \
  if error = 0 then\
     \
    UPDATE organisation_master om SET  om.name= name, om.alias  = alias, om.print_name  = printName,\
          om.pan  = pan,om.gstin  = gstin, om.address1  = address1,om.address2  = address2,om.address3  = address3,\
          om.city  = city,om.state_id  = state_id, om.pincode  = pincode,om.country_id  = country_id,\
          om.modified_by = user_id, om.modified_on = now()\
    WHERE om.id=id;\
  END if;\
  commit;\
  \
  select * from temp_error_log;\
  select * from organisation_master om where om.id = id;\
END ;~\
\
\
CREATE PROCEDURE `updateState`(\
IN name varchar(75),\
  IN id int(11) unsigned,\
  IN alias varchar(45),\
  IN country_id int(11) unsigned,\
  IN user_id integer)\
BEGIN\
  DECLARE error integer;\
  declare count_name integer;\
  declare count_alias integer;\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END;\
\
start transaction;\
  \
  DROP TABLE IF EXISTS temp_error_log;\
 \
  CREATE TEMPORARY TABLE temp_error_log (\
  id INT AUTO_INCREMENT PRIMARY KEY,\
  error_text VARCHAR(255),\
  error_path VARCHAR(100)\
);\
  \
  set error = 0;\
  \
  SELECT COUNT(*) INTO count_name\
  FROM state_master sm\
  WHERE (sm.country_id = country_id && sm.id <> id && sm.name = name) or\
  length(name)=0 or name is null;\
\
  if count_name > 0 then\
    if length(name) > 0 or name is not null then\
      set error = 1;\
              INSERT INTO temp_error_log (error_text, error_path)\
      VALUES ('State alreay exists', 'name');\
    END if;\
          if length(name) = 0 or name is null then\
      set error = 1;\
              INSERT INTO temp_error_log (error_text, error_path)\
      VALUES ('State cannot be empty', 'name');\
    END if;\
  END if;\
    SELECT COUNT(*) INTO count_alias\
    FROM state_master sm\
    WHERE (sm.country_id = country_id && sm.id <> id && sm.alias = alias && length(alias)!=0);\
\
    if count_alias > 0 then\
      if length(alias) > 0 or alias is not null then\
        set error = 1;\
        INSERT INTO temp_error_log (error_text, error_path)\
        VALUES ('Alias Already Exists', 'alias');\
      END if;\
    END if;\
      if error = 0 then\
    UPDATE state_master sm SET sm.name = name, sm.alias = alias,sm.modified_by = user_id,sm.modified_on = now(), sm.country_id = country_id where sm.id = id;\
  END if;\
commit;\
  select * from temp_error_log;\
  select * from state_master sm where sm.id = id;\
END ;~\
\
\
CREATE PROCEDURE `updateUnit`(\
  IN id int(11) unsigned,\
  IN name varchar(50),\
  IN uqc varchar(50),\
IN user_id integer)\
BEGIN\
  DECLARE error integer;\
  DECLARE count_name varchar(60);\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END; \
  \
  start transaction;\
  \
  set error = 0;\
     \
  DROP TABLE IF EXISTS error_table;\
\
create temporary table error_table (\
  id int auto_increment primary key,\
  error_text varchar(255) , \
  error_path varchar(100) \
);\
  \
  SELECT COUNT(*) INTO count_name\
  FROM unit_master um\
  WHERE  (um.id <> id AND um.name = name) or length(name) = 0 or name is null;\
     \
if count_name > 0 then\
    if length(name) > 0 or name is not null then\
      set error = 1;\
      insert into error_table (error_text, error_path) values ('name already exist' , 'name');\
    END if;\
    if length(name) = 0 or name is null then\
      set error = 1;\
      insert into error_table (error_text, error_path) values ('name cannot be empty' , 'name');\
    END if;\
  END if;\
  \
  if error = 0 then\
    update unit_master um set \
    um.name=name, um.uqc=uqc, um.modified_by=user_id, um.modified_on = now() where um.id=id;\
  END if;\
  commit;\
  \
select * from error_table;\
  select * from unit_master um where um.id = id;\
END ;";

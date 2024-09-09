export const dbTableAndProScript = "CREATE TABLE `menu_option_master` (\
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
CREATE TABLE `app_config` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `config_type` varchar(45) NOT NULL,\
  `config` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`config`)),\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`),\
  UNIQUE KEY `config_type_UNIQUE` (`config_type`)\
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
  `enquiry_remark` text DEFAULT NULL,\
  `suggested_action_remark` text DEFAULT NULL,\
  `action_taken_remark` text DEFAULT NULL,\
  `closure_remark` text DEFAULT NULL,\
  `enquiry_tran_type_id` int(11) DEFAULT NULL,\
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\
  `active` int(11) NOT NULL DEFAULT 1,\
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
CREATE PROCEDURE `createArea`(\
	IN name varchar(75),\
    IN email varchar(100)\
    )\
BEGIN\
	DECLARE error_text varchar(70);\
	DECLARE error integer;\
    declare error_path varchar(20);\
    declare count_name integer;\
    declare last_insert_id integer;\
    declare executive_id integer;\
    \
    set error = 0;\
    set error_text = '';\
    \
    start transaction;\
		SELECT COUNT(*) INTO count_name\
		FROM area_master am\
		WHERE am.name = name or\
		length(name)=0 or name is null;\
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
			select crm_user_id into executive_id from executive_master where email=email LOCK IN SHARE MODE;\
			INSERT INTO area_master (name,created_by,created_on) VALUES (name,executive_id,now());\
            set last_insert_id = LAST_INSERT_ID();\
		END if;\
	commit;\
    select error, error_path, error_text;\
    select * from area_master am where am.id = last_insert_id;\
END ;~\
\
CREATE PROCEDURE `createCategory`(\
    IN name varchar(60),\
    IN email varchar(70)\
    )\
BEGIN\
	DECLARE error_text varchar(70);\
	DECLARE error integer;\
    declare error_path varchar(20);\
    DECLARE count_name varchar(60);\
    DECLARE last_insert_id integer;\
   \
    set error = 0;\
    set last_insert_id = 0;\
    set error_text = '';\
   \
    start transaction;\
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
             \
		if error = 0 then\
			insert into enquiry_category_master (name, created_by, created_on)\
			   values (name, (select crm_user_id from executive_master em where em.email=email), now());\
               \
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
    IN user_email varchar(100))\
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
\
    declare executive_id integer;\
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
    start transaction;\
		\
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
				VALUES ('Name cant be empty', 'name');\
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
		select crm_user_id into executive_id from executive_master em where em.email=user_email LOCK IN SHARE MODE;\
        \
			insert into contact_master \
				(alias, name, print_name, group_id, pan, aadhaar, address1, address2, address3, city, state_id, area_id, pincode, country_id, email, mobile, whatsapp, created_by, created_on, dob, doa, department_id, organisation_id) \
				values\
				(alias, name, print_name, group_id, pan, aadhaar, address1, address2, address3, city, state_id, area_id, pincode, country_id, email, mobile, whatsapp, executive_id, now(), dob, doa, dept_id, org_id);\
				set last_insert_id = LAST_INSERT_ID();\
        \
		END if;\
        \
        \
    commit;\
    \
    \
    \
    select * from temp_error_log;\
    select * from contact_master cm where cm.id = last_insert_id;\
END ;~\
\
CREATE PROCEDURE `createCountry`(\
	IN name varchar(75),\
    IN alias varchar(45),\
    IN email varchar(100))\
BEGIN\
	DECLARE error integer;\
    declare count_name integer;\
    declare count_alias integer;\
    declare last_insert_id integer;\
    declare executive_id integer;\
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
    start transaction;\
    \
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
			select crm_user_id into executive_id from executive_master where email=email LOCK IN SHARE MODE;\
			INSERT INTO country_master (name,alias,created_by,created_on) VALUES (name,alias,executive_id,now());\
            set last_insert_id = LAST_INSERT_ID();\
		END if;\
	commit;\
    select * from temp_error_log;\
    select * from country_master cm where cm.id = last_insert_id;\
END ;~\
\
CREATE PROCEDURE `createDepartment`(\
    IN name varchar(60),\
    IN email varchar(70)\
    )\
BEGIN\
	DECLARE error_text varchar(70);\
	DECLARE error integer;\
    declare error_path varchar(20);\
    DECLARE count_name varchar(60);\
    DECLARE last_insert_id integer;\
   \
    set error = 0;\
    set last_insert_id = 0;\
    set error_text = '';\
   \
    start transaction;\
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
			   values (name, (select crm_user_id from executive_master em where em.email=email), now());\
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
    declare count_name integer;    \
    \
    set error = 0;\
    set error_text = '';\
    set last_insert_id = 0;\
    \
    start transaction;\
    \
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
    IN email varchar(70)\
    )\
BEGIN\
	DECLARE error_text varchar(70);\
	DECLARE error integer;\
    declare error_path varchar(20);\
    DECLARE count_name varchar(60);\
    DECLARE last_insert_id integer;\
   \
    set error = 0;\
    set last_insert_id = 0;\
    set error_text = '';\
   \
    start transaction;\
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
             \
		if error = 0 then\
			insert into enquiry_source_master (name, created_by, created_on)\
			   values (name, (select crm_user_id from executive_master em where em.email=email), now());\
               \
			set last_insert_id = LAST_INSERT_ID();\
		END if;\
    commit;\
   \
	select error, error_path, error_text;\
    select * from enquiry_source_master cm where id = last_insert_id;\
END ;~\
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
	IN dob date,\
	IN doa date,\
	IN doj date,\
    IN area_id integer,\
    IN call_type_id integer,\
    IN crm_user_id integer,\
    IN role_id integer,\
    IN dept_id integer,\
    IN group_id integer,\
    IN user_email varchar(100))\
BEGIN\
	DECLARE error_text varchar(70);\
	DECLARE error integer;\
    declare error_path varchar(20);\
	DECLARE last_insert_id integer;\
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
    \
    set error = 0;\
    set error_text = '';\
    set last_insert_id = 0;\
    \
    start transaction;\
    \
		\
		SELECT COUNT(*) INTO count_name\
		FROM executive_master em\
		WHERE em.name = name or\
		em.alias = name;\
\
		IF count_name = 0 THEN\
			\
			SELECT COUNT(*) INTO count_alias\
			FROM organisation_master em\
			WHERE em.name = alias or\
			em.alias = alias;\
			\
			if count_alias = 0 then\
				select id into var_group_id from executive_group_master where id=group_id LOCK IN SHARE MODE;\
				select id into var_area_id from area_master where id=area_id LOCK IN SHARE MODE;\
				select id into var_state_id from state_master where id=state_id LOCK IN SHARE MODE;\
				select id into var_country_id from country_master where id=country_id LOCK IN SHARE MODE;\
				select id into var_dept_id from executive_dept_master where id=dept_id LOCK IN SHARE MODE;\
				select crm_user_id into var_executive_id from executive_master where email=email LOCK IN SHARE MODE;\
				select id into var_call_type_id from call_type_master where id=call_type_id LOCK IN SHARE MODE;\
				select id into var_role_id from executive_role_master where id=role_id LOCK IN SHARE MODE;\
                                \
				insert into executive_master \
				(alias, name, address1, address2, address3, city, state_id, pincode, country_id, email, mobile, whatsapp, created_by, created_on, dob, doa, doj, area_id, call_type_id, crm_user_id, role_id, dept_id, group_id) \
				values\
				(alias, name, address1, address2, address3, city, state_id, pincode, country_id, email, mobile, whatsapp, executive_id, now(), dob, doa, doj, area_id, call_type_id, crm_user_id, role_id, dept_id, group_id);\
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
    select error, error_path, error_text;\
    select * from contact_master where id = last_insert_id;\
END ;~\
\
CREATE PROCEDURE `createExecutiveDept`(\
    IN name varchar(60),\
    IN email varchar(70)\
    )\
BEGIN\
	DECLARE error_text varchar(70);\
	DECLARE error integer;\
    declare error_path varchar(20);\
    DECLARE count_name varchar(60);\
	DECLARE last_insert_id integer;\
   \
    set last_insert_id = 0;\
    set error = 0;\
    set error_text = '';\
   \
    start transaction;\
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
        values (name, (select crm_user_id from executive_master em where em.email=email), now());\
	\
		set last_insert_id = LAST_INSERT_ID();\
	END if;\
    commit;\
   \
	select error, error_path, error_text;\
    select * from executive_dept_master cm where id = last_insert_id;\
END ;~\
\
CREATE PROCEDURE `createExecutiveGroup`(\
	IN name varchar(75),\
	IN alias varchar(75),\
	IN parent_id varchar(75),\
	IN email varchar(100))\
BEGIN\
	DECLARE error integer;\
	DECLARE last_insert_id integer;\
    DECLARE count_name integer;\
    DECLARE count_alias integer;\
    DECLARE executive_id integer;\
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
    start transaction;\
\
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
		select crm_user_id into executive_id from executive_master where email=email LOCK IN SHARE MODE;\
		insert into executive_group_master\
		(alias, name, parent_id, created_by, created_on)\
		values\
		(alias, name, parent_id, executive_id, now());\
		set last_insert_id = LAST_INSERT_ID();\
	END if;\
    commit;\
    \
    select * from temp_error_log;\
    select * from executive_group_master egm where egm.id = last_insert_id;\
END ;~\
\
CREATE PROCEDURE `createExecutiveRole`(\
    IN name varchar(60),\
    IN parentId int,\
    IN departmentId int,\
    IN email varchar(70)\
    )\
BEGIN\
	DECLARE error_text varchar(70);\
	DECLARE error integer;\
    declare error_path varchar(20);\
    DECLARE count_name varchar(60);\
	DECLARE last_insert_id integer;\
   \
    set error = 0;\
    set last_insert_id = 0;\
    set error_text = '';\
   \
    start transaction;\
   \
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
		   values (name, (select crm_user_id from executive_master em where em.email=email), now(), parentId, departmentId);\
			  \
			set last_insert_id = LAST_INSERT_ID();\
		END if;\
    commit;\
   \
	select error, error_path, error_text;\
    select * from executive_role_master rm where id = last_insert_id;\
END ;~\
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
        IN email VARCHAR(75))\
BEGIN\
	DECLARE error integer;\
	DECLARE last_insert_id integer;\
    DECLARE count_alias integer;\
    declare count_name integer;\
	declare count_pan varchar(20);\
    declare count_gstin varchar(20);\
    declare executive_id integer;\
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
    start transaction;\
    \
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
				select crm_user_id into executive_id from executive_master em where em.email=email LOCK IN SHARE MODE;\
                \
				insert into organisation_master \
				(alias, name, print_name, pan, gstin, address1, address2, address3, city, state_id, pincode, country_id, created_by, created_on) \
				values\
				(alias, name, print_name, pan, gstin, address1, address2, address3, city, state_id, pincode, country_id, executive_id, now());\
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
CREATE PROCEDURE `createState`(\
	IN name varchar(75),\
    IN alias varchar(45),\
    IN country_id int(11) unsigned,\
    IN email varchar(100))\
BEGIN\
	DECLARE error integer;\
    declare count_name integer;\
    declare count_alias integer;\
    declare last_insert_id integer;\
    declare executive_id integer;\
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
    start transaction;\
    \
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
			select crm_user_id into executive_id from executive_master where email=email LOCK IN SHARE MODE;\
			INSERT INTO state_master (name,alias,created_by,created_on,country_id) VALUES (name,alias,executive_id,now(),country_id);\
            set last_insert_id = LAST_INSERT_ID();\
		END if;\
	commit;\
    select * from temp_error_log;\
    select * from state_master sm where sm.id = last_insert_id;\
END ;~\
\
CREATE PROCEDURE `createUser`(\
	IN email varchar(100),\
    IN name varchar(60),\
    IN password varchar(100),\
    IN phone varchar(15),\
    IN provider varchar(15)\
    )\
BEGIN\
	DECLARE error_text varchar(70);\
	DECLARE error integer;\
    declare error_path varchar(20);\
	DECLARE last_insert_id integer;\
    declare count_name integer;    \
	\
    set error = 0;\
    set error_text = '';\
    set last_insert_id = 0;\
    \
    start transaction;\
		SELECT COUNT(*) INTO count_name\
		FROM user u\
		WHERE u.phone = phone;\
        \
        if count_name > 0 then\
			set error = 1;\
            set error_path = 'name';\
			set error_text = 'Name already exist';\
        END if;\
        \
        if error = 0 then\
			\
			SELECT COUNT(*) INTO count_name FROM user u WHERE u.email = email;\
            \
			if count_name > 0 then\
				set error = 1;\
				set error_path = 'email';\
				set error_text = 'Email already exist';\
			END if;\
        End if;\
    \
        if error = 0 then\
			\
			SELECT COUNT(*) INTO count_name FROM user u WHERE u.phone = phone;\
            \
			if count_name > 0 then\
				set error = 1;\
				set error_path = 'phone';\
				set error_text = 'Phone already exist';\
			END if;\
        End if;\
        \
		if error = 0 then\
			insert into user (email, password, name, phone, provider, datetime) values (email, password, name, phone, provider, now());\
			set last_insert_id = LAST_INSERT_ID();\
		END if;\
    commit;\
    \
	select error, error_path, error_text;\
    select * from user where id = last_insert_id;\
END ;~\
\
CREATE PROCEDURE `updateArea`(\
	IN name varchar(75),\
    IN id int(11) unsigned)\
BEGIN\
	DECLARE error_text varchar(70);\
	DECLARE error integer;\
    declare error_path varchar(20);\
    declare count_name integer;\
    \
    set error = 0;\
    set error_text = '';\
    \
    start transaction;\
    \
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
			UPDATE area_master am SET am.name = name where am.id = id;\
		END if;\
	commit;\
    \
    select error, error_path, error_text;\
    select * from area_master am where am.id = id;\
END ;~\
\
CREATE PROCEDURE `updateCategory`(\
	IN id int(11) unsigned,\
    IN name varchar(60),\
    IN email varchar(70)\
    )\
BEGIN\
	DECLARE error_text varchar(70);\
	DECLARE error integer;\
    declare error_path varchar(20);\
    DECLARE count_name varchar(60);\
\
   \
    set error = 0;\
    set error_text = '';\
   \
    start transaction;\
   \
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
             \
if error = 0 then\
   update enquiry_category_master cm set\
        cm.name=name, cm.modified_by=(select crm_user_id from executive_master em where em.email=email), cm.modified_on = now() where cm.id=id;\
END if;\
    commit;\
   \
	select error, error_path, error_text;\
    select * from enquiry_category_master cm where cm.id = id;\
END ;~\
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
    \
    \
    \
	IN dob datetime,\
	IN doa datetime,\
	IN dept_id  int(11),\
	IN org_id  int(11),\
    IN user_email varchar(100))\
BEGIN\
	DECLARE error integer;\
    DECLARE count_name varchar(60);\
    declare count_alias varchar(60);\
    declare count_pan varchar(20);\
    declare count_aadhaar varchar(20);\
    declare count_email varchar(100);\
    declare count_mobile varchar(20);\
    declare count_whatsapp varchar(20);\
    \
    declare executive_id integer;\
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
    start transaction;\
    \
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
						\
				END if;\
            END if;\
            \
        \
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
			select crm_user_id into executive_id from executive_master em where em.email=user_email LOCK IN SHARE MODE;\
        \
			UPDATE contact_master cm SET  cm.name= name, cm.alias  = alias, cm.print_name  = print_name,\
            cm.group_id  = group_id,cm.pan  = pan,cm.aadhaar  = aadhaar, cm.address1  = address1,cm.address2  = address2,\
            cm.address3  = address3,cm.city  = city,cm.state_id  = state_id, cm.area_id  = area_id, cm.pincode  = pincode,cm.country_id  = country_id,\
            cm.email  = email,cm.mobile  = mobile,cm.whatsapp = whatsapp,cm.modified_by = executive_id, cm.modified_on = now(),cm.department_id  = department_id,\
            cm.organisation_id  = organisation_id\
			WHERE cm.id=id;\
		END if;\
    commit;\
    \
	\
    select * from temp_error_log;\
    select * from contact_master cm where cm.id = id;\
END ;~\
\
CREATE PROCEDURE `updateCountry`(\
	IN name varchar(75),\
    IN id int(11) unsigned,\
    IN alias varchar(45),\
    IN email varchar(100))\
BEGIN\
	DECLARE error integer;\
    declare count_name integer;\
    declare count_alias integer;\
    declare executive_id integer;\
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
    start transaction;\
    \
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
			select crm_user_id into executive_id from executive_master where email=email LOCK IN SHARE MODE;\
			UPDATE country_master cm SET cm.name = name,cm.alias = alias,cm.modified_by = executive_id,cm.modified_on = now() where cm.id = id;\
		END if;\
	commit;\
    select * from temp_error_log;\
    select * from country_master cm where cm.id = id;\
END ;~\
\
CREATE PROCEDURE `updateDepartment`(\
	IN id int(11) unsigned,\
    IN name varchar(60),\
    IN email varchar(70))\
BEGIN\
	DECLARE error_text varchar(70);\
	DECLARE error integer;\
    declare error_path varchar(20);\
    DECLARE count_name varchar(60);\
   \
    set error = 0;\
    set error_text = '';\
   \
    start transaction;\
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
			cm.name=name, cm.modified_by=(select crm_user_id from executive_master em where em.email=email), cm.modified_on = now() where cm.id=id;\
		END if;\
    commit;\
   \
	select error, error_path, error_text;\
    select * from department_master cm where cm.id = id;\
END ;~\
\
CREATE PROCEDURE `updateEnquirySource`(\
	IN id int(11) unsigned,\
    IN name varchar(60),\
    IN email varchar(70))\
BEGIN\
	DECLARE error_text varchar(70);\
	DECLARE error integer;\
    declare error_path varchar(20);\
    DECLARE count_name varchar(60);\
   \
    set error = 0;\
    set error_text = '';\
   \
    start transaction;\
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
             \
		if error = 0 then\
			update enquiry_source_master cm set\
			cm.name=name, cm.modified_by=(select crm_user_id from executive_master em where em.email=email), cm.modified_on = now() where cm.id=id;\
		END if;\
    commit;\
   \
	select error, error_path, error_text;\
    select * from enquiry_source_master cm where cm.id = id;\
END ;~\
\
CREATE PROCEDURE `updateExecutiveDept`(\
	IN id int(11) unsigned,\
    IN name varchar(60),\
    IN email varchar(70)\
    )\
BEGIN\
	DECLARE error_text varchar(70);\
	DECLARE error integer;\
    declare error_path varchar(20);\
    DECLARE count_name varchar(60);\
\
   \
    set error = 0;\
    set error_text = '';\
   \
    start transaction;\
   \
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
			cm.name=name, cm.modified_by=(select crm_user_id from executive_master em where em.email=email), cm.modified_on = now() where cm.id=id;\
	END if;\
    commit;\
   \
	select error, error_path, error_text;\
    select * from executive_dept_master cm where cm.id = id;\
END ;~\
\
CREATE PROCEDURE `updateExecutiveGroup`(\
	IN name varchar(75),\
	IN alias varchar(75),\
    IN id int(11) unsigned,\
	IN parent_id varchar(75),\
	IN email varchar(100))\
BEGIN\
	DECLARE error integer;\
    DECLARE count_name integer;\
    DECLARE count_alias integer;\
    DECLARE executive_id integer;\
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
    start transaction;\
\
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
		select crm_user_id into executive_id from executive_master where email=email LOCK IN SHARE MODE;\
		UPDATE executive_group_master egm set egm.name = name, egm.alias = alias, egm.parent_id = parent_id,egm.modified_by = executive_id,egm.modified_on = now() where egm.id = id;\
	END if;\
    commit;\
    \
    select * from temp_error_log;\
    select * from executive_group_master egm where egm.id = id;\
END ;~\
\
CREATE PROCEDURE `updateExecutiveRole`(\
	IN id int(11) unsigned,\
    IN name varchar(60),\
    IN parentId int,\
    IN email varchar(70)\
    )\
BEGIN\
	DECLARE error_text varchar(70);\
	DECLARE error integer;\
    declare error_path varchar(20);\
    DECLARE count_name varchar(60);\
\
   \
    set error = 0;\
    set error_text = '';\
   \
    start transaction;\
   \
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
			rm.name = name, rm.parent = parentId, rm.modified_by = (select crm_user_id from executive_master em where em.email=email), rm.modified_on = now() where rm.id=id;\
	END if;\
    commit;\
   \
	select error, error_path, error_text;\
    select * from executive_role_master rm where rm.id = id;\
END ;~\
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
	IN user_email VARCHAR(75))\
BEGIN\
	DECLARE error integer;\
	DECLARE last_insert_id integer;\
    DECLARE count_alias integer;\
    declare count_name integer;\
	declare count_pan varchar(20);\
    declare count_gstin varchar(20);\
    declare executive_id integer;\
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
    start transaction;\
    \
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
			select crm_user_id into executive_id from executive_master em where em.email=user_email LOCK IN SHARE MODE;\
        \
			UPDATE organisation_master om SET  om.name= name, om.alias  = alias, om.print_name  = printName,\
            om.pan  = pan,om.gstin  = gstin, om.address1  = address1,om.address2  = address2,om.address3  = address3,\
            om.city  = city,om.state_id  = state_id, om.pincode  = pincode,om.country_id  = country_id,\
            om.modified_by = executive_id, om.modified_on = now()\
			WHERE om.id=id;\
		END if;\
    commit;\
    \
    select * from temp_error_log;\
    select * from organisation_master om where om.id = id;\
END ;~\
\
CREATE PROCEDURE `updateState`(\
	IN name varchar(75),\
    IN id int(11) unsigned,\
    IN alias varchar(45),\
    IN country_id int(11) unsigned,\
    IN email varchar(100))\
BEGIN\
	DECLARE error integer;\
    declare count_name integer;\
    declare count_alias integer;\
    declare executive_id integer;\
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
    start transaction;\
    \
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
			select crm_user_id into executive_id from executive_master where email=email LOCK IN SHARE MODE;\
			UPDATE state_master sm SET sm.name = name, sm.alias = alias,sm.modified_by = executive_id,sm.modified_on = now(), sm.country_id = country_id where sm.id = id;\
		END if;\
	commit;\
    select * from temp_error_log;\
    select * from state_master sm where sm.id = id;\
END ;"
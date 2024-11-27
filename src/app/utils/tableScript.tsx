export const dbTableAndProScript =
  "CREATE TABLE `allocation_type_master` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `name` varchar(50) DEFAULT NULL,\
  `stamp` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `config_meta_data` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `config_type` varchar(100) NOT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `config_type_UNIQUE` (`config_type`)\
);~\
CREATE TABLE `app_config` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `config_type_id` int(11) NOT NULL,\
  `enabled` int(11) NOT NULL,\
  `config` varchar(5000) NOT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `app_config_new` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `object_id` int(11) NOT NULL,\
  `enabled` int(11) DEFAULT NULL,\
  `config` varchar(5000) DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
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
CREATE TABLE `business_process_master` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `action_id` int(11) NOT NULL,\
  `action_name` varchar(45) DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `action_id_UNIQUE` (`action_id`)\
);~\
CREATE TABLE `business_profile` (\
  `id` int(11) NOT NULL,\
  `name` varchar(60) DEFAULT NULL,\
  `address1` varchar(75) DEFAULT NULL,\
  `address2` varchar(75) DEFAULT NULL,\
  `address3` varchar(75) DEFAULT NULL,\
  `city` varchar(75) DEFAULT NULL,\
  `state_id` int(11) DEFAULT NULL,\
  `country_id` int(11) DEFAULT NULL,\
  `pincode` varchar(20) DEFAULT NULL,\
  `mobile` varchar(20) DEFAULT NULL,\
  `pan` varchar(20) DEFAULT NULL,\
  `gstin` varchar(20) DEFAULT NULL,\
  `email` varchar(100) DEFAULT NULL,\
  PRIMARY KEY (`id`)\
);~\
CREATE TABLE `call_allocation` (\
  `call_id` int(11) DEFAULT NULL,\
  `allocated_to` int(11) DEFAULT NULL,\
  `allocated_on` datetime DEFAULT NULL,\
  `allocated_by` int(11) DEFAULT NULL,\
  `next_action_id` int(11) DEFAULT NULL,\
  `next_action_datetime` datetime DEFAULT NULL\
);~\
CREATE TABLE `call_receipt` (\
  `id` int(11) DEFAULT NULL,\
  `received_datetime` datetime DEFAULT NULL,\
  `call_no` varchar(40) DEFAULT NULL,\
  `contact_id` int(11) DEFAULT NULL,\
  `received_by` int(11) DEFAULT NULL,\
  `call_status` int(11) DEFAULT NULL,\
  `call_sub_status` int(11) DEFAULT NULL,\
  `next_action_id` int(11) DEFAULT NULL,\
  `next_action_datetime` datetime DEFAULT NULL,\
  `allocated_to` int(11) DEFAULT NULL,\
  `call_remark` text DEFAULT NULL,\
  `call_suggested_remark` text DEFAULT NULL\
);~\
CREATE TABLE `call_type_master` (\
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
CREATE TABLE `contact_group_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `alias` varchar(60) DEFAULT '',\
  `name` varchar(60) NOT NULL DEFAULT '',\
  `stamp` smallint(6) DEFAULT 0,\
  `parent_id` int(11) DEFAULT 0,\
  `created_by` int(11) DEFAULT 0,\
  `modified_by` int(11) DEFAULT 0,\
  `created_on` datetime DEFAULT '0000-00-00 00:00:00',\
  `modified_on` datetime DEFAULT '0000-00-00 00:00:00',\
  `is_parent` tinyint(4) DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`),\
  UNIQUE KEY `name_UNIQUE` (`name`)\
);~\
CREATE TABLE `contact_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `alias` varchar(60) DEFAULT NULL,\
  `name` varchar(60) DEFAULT NULL,\
  `print_name` varchar(60) DEFAULT NULL,\
  `group_id` int(11) DEFAULT NULL,\
  `pan` varchar(20) DEFAULT NULL,\
  `aadhaar` varchar(20) DEFAULT NULL,\
  `address1` varchar(75) DEFAULT NULL,\
  `address2` varchar(75) DEFAULT NULL,\
  `address3` varchar(75) DEFAULT NULL,\
  `city` varchar(75) DEFAULT NULL,\
  `state_id` int(11) DEFAULT NULL,\
  `area_id` int(11) DEFAULT NULL,\
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
  `department_id` int(11) DEFAULT NULL,\
  `organisation_id` int(11) DEFAULT NULL,\
  PRIMARY KEY (`id`)\
);~\
CREATE TABLE `country_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `alias` varchar(60) DEFAULT NULL,\
  `name` varchar(60) DEFAULT '',\
  `stamp` smallint(6) DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  `currency_character` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,\
  `currency_string` varchar(45) DEFAULT NULL,\
  `currency_substring` varchar(45) DEFAULT NULL,\
  `locale` varchar(10) DEFAULT NULL,\
  `date_format` varchar(50) DEFAULT NULL,\
  `currency_symbol` varchar(10) DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `currency_data` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `symbol` varchar(60) NOT NULL,\
  `name` varchar(60) NOT NULL,\
  `shortForm` varchar(20) DEFAULT NULL,\
  `decimal_places` varchar(5) NOT NULL,\
  `currency_system` varchar(5) DEFAULT NULL,\
  `stamp` int(11) NOT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `symbol` (`symbol`),\
  UNIQUE KEY `name` (`name`)\
);~\
CREATE TABLE `custom_column_type_master` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `column_type` varchar(45) NOT NULL,\
  PRIMARY KEY (`id`)\
);~\
CREATE TABLE `custom_fields_master` (\
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\
  `object_type_id` int(11) NOT NULL,\
  `column_name_id` varchar(45) NOT NULL,\
  `column_label` varchar(45) DEFAULT NULL,\
  `column_name` varchar(45) DEFAULT NULL,\
  `column_id` varchar(45) DEFAULT NULL,\
  `column_type_id` int(11) DEFAULT NULL,\
  `column_format` varchar(1000) DEFAULT NULL,\
  `form_section` varchar(45) DEFAULT NULL,\
  `is_mandatory` int(11) DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  `modified_on` varchar(45) DEFAULT NULL,\
  `is_default_column` int(11) DEFAULT NULL,\
  `is_default_mandatory` int(11) DEFAULT NULL,\
  `column_order` int(11) DEFAULT NULL,\
  PRIMARY KEY (`id`)\
);~\
CREATE TABLE `department_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `name` varchar(60) NOT NULL DEFAULT '',\
  `stamp` smallint(6) DEFAULT 0,\
  `created_by` int(11) DEFAULT 0,\
  `modified_by` int(11) DEFAULT 0,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  PRIMARY KEY (`id`) USING BTREE,\
  UNIQUE KEY `name_UNIQUE` (`name`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `docs_table` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `description` varchar(255) NOT NULL,\
  `doc_id` varchar(60) NOT NULL,\
  `data_id` int(11) NOT NULL,\
  `object_id` int(11) NOT NULL,\
  PRIMARY KEY (`id`)\
);~\
CREATE TABLE `enquiry_action_master` (\
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
  `modified_by` int(11) DEFAULT NULL,\
  `created_by` int(11) NOT NULL,\
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
CREATE TABLE `enquiry_product_tran` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `enquiry_id` int(11) DEFAULT NULL,\
  `slno` int(11) DEFAULT NULL,\
  `product_id` int(11) DEFAULT NULL,\
  `quantity` decimal(20,4) DEFAULT NULL,\
  `unit_id` int(11) DEFAULT NULL,\
  `remark` text DEFAULT NULL,\
  PRIMARY KEY (`id`)\
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
  `profile_img` varchar(100) DEFAULT NULL,\
  `pan` varchar(45) DEFAULT NULL,\
  `aadhaar` varchar(45) DEFAULT NULL,\
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
CREATE TABLE `master_tran_types` (\
  `id` int(11) NOT NULL,\
  `short_name` varchar(30) DEFAULT NULL,\
  `full_name` varchar(60) DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `short_name` (`short_name`) USING BTREE\
);~\
CREATE TABLE `menu_option_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
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
  `menu_order` int(11) DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `object_category_master` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `name` varchar(45) NOT NULL,\
  PRIMARY KEY (`id`)\
);~\
CREATE TABLE `object_rights_master` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `object_id` int(11) NOT NULL,\
  `role_id` int(11) NOT NULL,\
  `dept_id` int(11) NOT NULL,\
  `create` int(11) NOT NULL DEFAULT 1,\
  `read` int(11) NOT NULL DEFAULT 1,\
  `update` int(11) NOT NULL DEFAULT 1,\
  `delete` int(11) NOT NULL DEFAULT 1,\
  PRIMARY KEY (`id`)\
);~\
CREATE TABLE `object_type_master` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `name` varchar(45) NOT NULL,\
  `type` int(11) NOT NULL,\
  PRIMARY KEY (`id`)\
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
CREATE TABLE `product_group_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `name` varchar(60) DEFAULT NULL,\
  `alias` varchar(60) DEFAULT NULL,\
  `stamp` smallint(6) DEFAULT NULL,\
  `parent_id` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  `is_parent` tinyint(4) DEFAULT NULL,\
  PRIMARY KEY (`id`)\
);~\
CREATE TABLE `product_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `name` varchar(60) DEFAULT NULL,\
  `stamp` smallint(6) DEFAULT NULL,\
  `group_id` int(11) DEFAULT NULL,\
  `alias` varchar(60) DEFAULT NULL,\
  `unit_id` int(11) DEFAULT NULL,\
  `hsn_code` varchar(60) DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  `model` varchar(45) DEFAULT NULL,\
  `category` int(11) DEFAULT NULL,\
  `version` varchar(45) DEFAULT NULL,\
  `make` varchar(45) DEFAULT NULL,\
  `warranty_eligible` tinyint(4) DEFAULT NULL,\
  `parts_included` tinyint(4) DEFAULT NULL,\
  `eol` datetime DEFAULT NULL,\
  `eos` datetime DEFAULT NULL,\
  `warranty_duration` int(11) DEFAULT NULL,\
  `warranty_duration_unit` varchar(45) DEFAULT NULL,\
  `support_eligible` tinyint(4) DEFAULT NULL,\
  `problem_call_eligible` tinyint(4) DEFAULT NULL,\
  `product_number` text DEFAULT NULL,\
  PRIMARY KEY (`id`)\
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
CREATE TABLE `status_bar` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `user_id` int(11) NOT NULL,\
  `data` varchar(5000) DEFAULT '{\"key3\" : \"\", \"key4\": \"\", \"key5\": \"\"}',\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)\
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
CREATE TABLE `ticket_action_tran` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `call_id` int(11) DEFAULT NULL,\
  `action_taken_by` int(11) DEFAULT NULL,\
  `action_taken_datetime` datetime DEFAULT NULL,\
  `action_remark` text DEFAULT NULL,\
  `call_status_id` int(11) DEFAULT NULL,\
  `call_sub_status_id` int(11) DEFAULT NULL,\
  `closer_remark` varchar(255) DEFAULT NULL,\
  `ticket_action_id` int(11) NOT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `ticket_category_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `name` varchar(50) DEFAULT NULL,\
  `stamp` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `ticket_header_tran` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `date` datetime DEFAULT NULL,\
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
  `allocated_to` int(11) DEFAULT NULL,\
  `ticket_header_trancol` varchar(45) DEFAULT NULL,\
  `call_receipt_remark` text DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `ticket_ledger_tran` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
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
  `next_action_date` datetime DEFAULT NULL,\
  `next_action_time` time DEFAULT NULL,\
  `ticket_remark` text DEFAULT NULL,\
  `suggested_action_remark` text DEFAULT NULL,\
  `action_taken_remark` text DEFAULT NULL,\
  `closure_remark` text DEFAULT NULL,\
  `ticket_tran_type_id` int(11) DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  `active` int(11) DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `ticket_product_tran` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `ticket_id` int(11) DEFAULT NULL,\
  `slno` int(11) DEFAULT NULL,\
  `product_id` int(11) DEFAULT NULL,\
  `quantity` decimal(20,4) DEFAULT NULL,\
  `unit_id` int(11) DEFAULT NULL,\
  `remark` text DEFAULT NULL,\
  PRIMARY KEY (`id`) USING BTREE,\
  UNIQUE KEY `id_UNIQUE` (`id`)\
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
CREATE TABLE `ticket_sub_status_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `name` varchar(50) DEFAULT NULL,\
  `stamp` int(11) DEFAULT NULL,\
  `ticket_status_id` int(11) DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `trans_types_masters` (\
  `id` int(11) NOT NULL,\
  `short_name` varchar(30) DEFAULT NULL,\
  `full_name` varchar(60) DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `short_name` (`short_name`) USING BTREE\
);~\
CREATE TABLE `unit_master` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `name` varchar(50) DEFAULT NULL,\
  `stamp` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  PRIMARY KEY (`id`)\
);~\
CREATE TABLE `config_dept_mapping` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `config_id` int(11) NOT NULL,\
  `dept_id` int(11) NOT NULL,\
  PRIMARY KEY (`id`)\
);~\
INSERT INTO `country_master` VALUES (1,'AF','Afghanistan',1,NULL,1,NULL,'2024-10-18 10:49:35','؋','Afghani','AFN',NULL,NULL,NULL),(2,'AX','Aland Islands',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'AL','Albania',1,NULL,NULL,NULL,NULL,'Lek','Lek','ALL',NULL,'DD/MM/YYYY',NULL),(4,'DZ','Algeria',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'AS','American Samoa',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'AD','Andorra',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
  (7,'AO','Angola',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,'AI','Anguilla',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,'AQ','Antarctica',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,'AG','Antigua and Barbuda',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,'AR','Argentina',1,NULL,NULL,NULL,NULL,'$','Peso','ARS',NULL,NULL,NULL),(12,'AM','Armenia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,'AW','Aruba',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
  (14,'AU','Australia',1,NULL,NULL,NULL,NULL,'$','Dollar','AUD',NULL,NULL,NULL),(15,'AT','Austria',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,'AZ','Azerbaijan',1,NULL,NULL,NULL,NULL,'₼','Manat','AZN',NULL,'DD.MM.YYYY',NULL),(17,'BS','Bahamas',1,NULL,NULL,NULL,NULL,'$','Dollar','BSD',NULL,NULL,NULL),(18,'BH','Bahrain',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,'BD','Bangladesh',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(20,'BB','Barbados',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
  (21,'BY','Belarus',1,NULL,NULL,NULL,NULL,'Br','Ruble','BYN',NULL,'DD.MM.YYYY',NULL),(22,'BE','Belgium',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(23,'BZ','Belize',1,NULL,NULL,NULL,NULL,'BZ$','Dollar','BZD',NULL,NULL,NULL),(24,'BJ','Benin',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(25,'BM','Bermuda',1,NULL,NULL,NULL,NULL,'$','Dollar','BMD',NULL,NULL,NULL),(26,'BT','Bhutan',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(27,'BO','Bolivia',1,NULL,NULL,NULL,NULL,'$b','Bolíviano','BOB',NULL,NULL,NULL),\
  (28,'BA','Bosnia and Herzegovina',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(29,'BW','Botswana',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(30,'BV','Bouvet Island',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(31,'BR','Brazil',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(32,'IO','British Indian Ocean Territory',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(33,'BN','Brunei Darussalam',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(34,'BG','Bulgaria',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
  (35,'BF','Burkina Faso',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(36,'BI','Burundi',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(37,'KH','Cambodia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(38,'CM','Cameroon',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(39,'CA','Canada',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(40,'CV','Cape Verde',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(41,'KY','Cayman Islands',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
  (42,'CF','Central African Republic',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(43,'TD','Chad',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(44,'CL','Chile',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(45,'CN','China',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(46,'CX','Christmas Island',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(47,'CC','Cocos (Keeling) Islands',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(48,'CO','Colombia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
  (49,'KM','Comoros',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(50,'CG','Congo',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(51,'CD','Congo, Democratic Republic of the',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(52,'CK','Cook Islands',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(53,'CR','Costa Rica',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(54,'CI','C“te d\\'Ivoire',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(55,'HR','Croatia (Hrvatska)',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
  (56,'CU','Cuba',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(57,'CW','Cura‡ao',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(58,'CY','Cyprus',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(59,'CZ','Czech Republic',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(60,'CS','Czechoslovakia (former)',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(61,'KP','Democratic People\\'s Republic of Korea',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(62,'DK','Denmark',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
  (63,'DJ','Djibouti',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(64,'DM','Dominica',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(65,'DO','Dominican Republic',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(66,'TP','East Timor',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(67,'EC','Ecuador',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(68,'EG','Egypt',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(69,'SV','El Salvador',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
  (70,'GQ','Equatorial Guinea',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(71,'ER','Eritrea',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(72,'EE','Estonia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(73,'ET','Ethiopia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(74,'EU','European Union',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(75,'FK','Falkland Islands (Malvinas)',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(76,'FO','Faroe Islands',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
  (77,'FM','Federated States of Micronesia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(78,'FJ','Fiji',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(79,'FI','Finland',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(80,'FR','France',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(81,'GF','French Guiana',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(82,'PF','French Polynesia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(83,'TF','French Southern Territories',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
  (84,'GA','Gabon',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(85,'GM','Gambia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(86,'GE','Georgia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(87,'DE','Germany',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(88,'GH','Ghana',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(89,'GI','Gibraltar',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(90,'GR','Greece',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(91,'GL','Greenland',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
  (92,'GD','Grenada',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(93,'GP','Guadeloupe',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(94,'GU','Guam',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(95,'GT','Guatemala',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(96,'GG','Guernsey',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(97,'GN','Guinea',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(98,'GW','Guinea-Bissau',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(99,'GY','Guyana',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
  (100,'HT','Haiti',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(101,'HM','Heard Island and McDonald Islands',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(102,'VA','Holy See',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(103,'HN','Honduras',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(104,'HK','Hong Kong',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(105,'HU','Hungary',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(106,'IS','Iceland',1,NULL,NULL,NULL,NULL,'kr','Krona','ISK','is','DD.MM.YYYY',NULL),(107,'IN','India',1,NULL,NULL,NULL,NULL,'₹','Rupee','INR','en-in','DD-MM-YYYY','Rs'),\
  (108,'ID','Indonesia',1,NULL,NULL,NULL,NULL,NULL,'Rupiah','IDR',NULL,NULL,NULL),(109,'IQ','Iraq',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(110,'IE','Ireland',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(111,'IR','Islamic Republic of Iran',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(112,'IM','Isle of Man',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(113,'IL','Israel',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(114,'IT','Italy',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(115,'JM','Jamaica',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
  (116,'JP','Japan',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(117,'JE','Jersey',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(118,'JO','Jordan',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(119,'KZ','Kazakhstan',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(120,'KE','Kenya',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(121,'KI','Kiribati',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(122,'XK','Kosovo',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(123,'KW','Kuwait',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(124,'KG','Kyrgyzstan',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
  (125,'LA','Lao People\\'s Democratic Republic',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(126,'LV','Latvia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(127,'LB','Lebanon',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(128,'LS','Lesotho',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(129,'LR','Liberia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(130,'LY','Libyan Arab Jamahiriya',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(131,'LI','Liechtenstein',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(132,'LT','Lithuania',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
  (133,'LU','Luxembourg',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(134,'MO','Macau',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(135,'MG','Madagascar',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(136,'MW','Malawi',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(137,'MY','Malaysia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(138,'MV','Maldives',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(139,'ML','Mali',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(140,'MT','Malta',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(141,'MH','Marshall Islands',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
  (142,'MQ','Martinique',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(143,'MR','Mauritania',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(144,'MU','Mauritius',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(145,'YT','Mayotte',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(146,'MX','Mexico',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(147,'MC','Monaco',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(148,'MN','Mongolia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(149,'ME','Montenegro',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(150,'MS','Montserrat',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
  (151,'MA','Morocco',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(152,'MZ','Mozambique',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(153,'MM','Myanmar',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(154,'NA','Namibia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(155,'NR','Nauru',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(156,'NP','Nepal',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(157,'NL','Netherlands',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(158,'AN','Netherlands Antilles',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(159,'NT','Neutral Zone',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
  (160,'NC','New Caledonia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(161,'NZ','New Zealand',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(162,'NI','Nicaragua',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(163,'NE','Niger',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(164,'NG','Nigeria',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(165,'NU','Niue',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(166,'NF','Norfolk Island',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(167,'MP','Northern Mariana Islands',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(168,'NO','Norway',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
  (169,'OM','Oman',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(170,'PK','Pakistan',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(171,'PW','Palau',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(172,'PS','Palestinian Territory, Occupied',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(173,'PA','Panama',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(174,'PG','Papua New Guinea',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(175,'PY','Paraguay',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(176,'PE','Peru',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(177,'PH','Philippines',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(178,'PN','Pitcairn',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(179,'PL','Poland',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(180,'PT','Portugal',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(181,'PR','Puerto Rico',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(182,'QA','Qatar',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(183,'KR','Republic of Korea',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(184,'MD','Republic of Moldova',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(185,'RE','Reunion',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(186,'RO','Romania',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(187,'RU','Russian Federation',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(188,'RW','Rwanda',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(189,'SH','Saint Helena',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(190,'KN','Saint Kitts and Nevis',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(191,'LC','Saint Lucia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(192,'MF','Saint Martin',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(193,'VC','Saint Vincent & the Grenadines',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(194,'WS','Samoa',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(195,'SM','San Marino',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(196,'ST','Sao Tome and Principe',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(197,'SA','Saudi Arabia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(198,'SN','Senegal',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(199,'RS','Serbia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(200,'SC','Seychelles',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(201,'SL','Sierra Leone',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(202,'SG','Singapore',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(203,'SX','Sint Maarten',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(204,'SK','Slovakia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(205,'SI','Slovenia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(206,'SB','Solomon Islands',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(207,'SO','Somalia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(208,'ZA','South Africa',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(209,'GS','South Georgia and The South Sandwich Islands',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(210,'SS','South Sudan',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(211,'ES','Spain',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(212,'LK','Sri Lanka',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(213,'PM','St. Pierre and Miquelon',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(214,'SD','Sudan',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(215,'SR','Suriname',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(216,'SJ','Svalbard and Jan Mayen',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(217,'SZ','Swaziland',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(218,'SE','Sweden',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(219,'CH','Switzerland',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(220,'SY','Syrian Arab Republic',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(221,'TW','Taiwan',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(222,'TJ','Tajikistan',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(223,'TH','Thailand',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(224,'MK','The Former Yugoslav Republic of Macedonia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(225,'TL','Timor-Leste',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(226,'TG','Togo',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(227,'TK','Tokelau',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(228,'TO','Tonga',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(229,'TT','Trinidad and Tobago',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(230,'TN','Tunisia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(231,'TR','Turkey',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(232,'TM','Turkmenistan',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(233,'TC','Turks and Caicos Islands',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(234,'TV','Tuvalu',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(235,'UM','US Minor Outlying Islands',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(236,'UG','Uganda',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(237,'UA','Ukraine',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(238,'AE','United Arab Emirates',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(239,'GB','United Kingdom',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(240,'TZ','United Republic of Tanzania',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(241,'US','United States of America',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(242,'UY','Uruguay',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(243,'UZ','Uzbekistan',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(244,'VU','Vanuatu',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(245,'VE','Venezuela',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(246,'VN','Viet Nam',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(247,'VG','Virgin Islands (British)',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(248,'VI','Virgin Islands (U.S.A.)',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(249,'WF','Wallis and Futuna',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(250,'EH','Western Sahara',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(251,'YE','Yemen',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(252,'ZM','Zambia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(253,'ZW','Zimbabwe',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);~\
INSERT INTO `state_master` VALUES (1,'','Andhra Pradesh',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(2,'','Arunachal Pradesh',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(3,'','Assam',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(4,'','Bihar',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(5,'','Chhattisgarh',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(7,'','Gujarat',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(8,'','Haryana',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(9,'','Himachal Pradesh',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(10,'','Jharkhand',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(11,'','Karnataka',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(12,'','Kerala',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(13,'','Madhya Pradesh',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(14,'','Maharashtra',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(15,'','Manipur',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(16,'','Meghalaya',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(17,'','Mizoram',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(18,'','Nagaland',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(19,'','Odisha',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(20,'','Punjab',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(21,'','Rajasthan',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(22,'','Sikkim',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(23,'','Tamil Nadu',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(24,'','Telangana',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(25,'','Tripura',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(26,'','Uttar Pradesh',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(27,'','Uttarakhand',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(28,'','West Bengal',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(29,'','Andaman and Nicobar Islands',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(30,'','Chandigarh',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(31,'','Dadra and Nagar Haveli and Daman and Diu',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(32,'','Jammu and Kashmir',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(33,'','Ladakh',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107),(34,'','Lakshadweep',0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',107);~\
INSERT INTO `object_category_master` VALUES (1,'Master'),(2,'Transaction'),(3,'Report');~\
INSERT INTO `object_rights_master` (`object_id`, `role_id`, `dept_id`, `create`, `read`, `update`, `delete`) \
  VALUES (1,1,1,1,1,1,1),(1,1,2,1,1,1,1),(1,2,1,1,1,1,1),\
  (1,2,2,1,1,1,1),(1,3,1,1,1,1,1),(1,3,2,1,1,1,1),(1,4,1,1,1,1,1),(1,4,2,1,1,1,1),\
  (2,1,1,1,1,1,1),(2,1,2,1,1,1,1),(2,2,1,1,1,1,1),(2,2,2,1,1,1,1),(2,3,1,1,1,1,1),\
  (2,3,2,1,1,1,1),(2,4,1,1,1,1,1),(2,4,2,1,1,1,1),(3,1,1,1,1,1,1),(3,1,2,1,1,1,1),\
  (3,2,1,1,1,1,1),(3,2,2,1,1,1,1),(3,3,1,1,1,1,1),(3,3,2,1,1,1,1),(3,4,1,1,1,1,1),\
  (3,4,2,1,1,1,1),(4,1,1,1,1,1,1),(4,1,2,1,1,1,1),(4,2,1,1,1,1,1),(4,2,2,1,1,1,1),\
  (4,3,1,1,1,1,1),(4,3,2,1,1,1,1),(4,4,1,1,1,1,1),(4,4,2,1,1,1,1),(5,1,1,1,1,1,1),\
  (5,1,2,1,1,1,1),(5,2,1,1,1,1,1),(5,2,2,1,1,1,1),(5,3,1,1,1,1,1),(5,3,2,1,1,1,1),\
  (5,4,1,1,1,1,1),(5,4,2,1,1,1,1),(6,1,1,1,1,1,1),(6,1,2,1,1,1,1),(6,2,1,1,1,1,1),\
  (6,2,2,1,1,1,1),(6,3,1,1,1,1,1),(6,3,2,1,1,1,1),(6,4,1,1,1,1,1),(6,4,2,1,1,1,1),\
  (7,1,1,1,1,1,1),(7,1,2,1,1,1,1),(7,2,1,1,1,1,1),(7,2,2,1,1,1,1),(7,3,1,1,1,1,1),\
  (7,3,2,1,1,1,1),(7,4,1,1,1,1,1),(7,4,2,1,1,1,1),(8,1,1,1,1,1,1),(8,1,2,1,1,1,1),\
  (8,2,1,1,1,1,1),(8,2,2,1,1,1,1),(8,3,1,1,1,1,1),(8,3,2,1,1,1,1),(8,4,1,1,1,1,1),\
  (8,4,2,1,1,1,1),(9,1,1,1,1,1,1),(9,1,2,1,1,1,1),(9,2,1,1,1,1,1),(9,2,2,1,1,1,1),\
  (9,3,1,1,1,1,1),(9,3,2,1,1,1,1),(9,4,1,1,1,1,1),(9,4,2,1,1,1,1),(10,1,1,1,1,1,1),\
  (10,1,2,1,1,1,1),(10,2,1,1,1,1,1),(10,2,2,1,1,1,1),(10,3,1,1,1,1,1),(10,3,2,1,1,1,1),\
  (10,4,1,1,1,1,1),(10,4,2,1,1,1,1),(11,1,1,1,1,1,1),(11,1,2,1,1,1,1),(11,2,1,1,1,1,1),\
  (11,2,2,1,1,1,1),(11,3,1,1,1,1,1),(11,3,2,1,1,1,1),(11,4,1,1,1,1,1),(11,4,2,1,1,1,1),\
  (12,1,1,1,1,1,1),(12,1,2,1,1,1,1),(12,2,1,1,1,1,1),(12,2,2,1,1,1,1),(12,3,1,1,1,1,1),\
  (12,3,2,1,1,1,1),(12,4,1,1,1,1,1),(12,4,2,1,1,1,1),(13,1,1,1,1,1,1),(13,1,2,1,1,1,1),\
  (13,2,1,1,1,1,1),(13,2,2,1,1,1,1),(13,3,1,1,1,1,1),(13,3,2,1,1,1,1),(13,4,1,1,1,1,1),\
  (13,4,2,1,1,1,1),(14,1,1,1,1,1,1),(14,1,2,1,1,1,1),(14,2,1,1,1,1,1),(14,2,2,1,1,1,1),\
  (14,3,1,1,1,1,1),(14,3,2,1,1,1,1),(14,4,1,1,1,1,1),(14,4,2,1,1,1,1),(15,1,1,1,1,1,1),\
  (15,1,2,1,1,1,1),(15,2,1,1,1,1,1),(15,2,2,1,1,1,1),(15,3,1,1,1,1,1),(15,3,2,1,1,1,1),\
  (15,4,1,1,1,1,1),(15,4,2,1,1,1,1),(16,1,1,1,1,1,1),(16,1,2,1,1,1,1),(16,2,1,1,1,1,1),\
  (16,2,2,1,1,1,1),(16,3,1,1,1,1,1),(16,3,2,1,1,1,1),(16,4,1,1,1,1,1),(16,4,2,1,1,1,1),\
  (17,1,1,1,1,1,1),(17,1,2,1,1,1,1),(17,2,1,1,1,1,1),(17,2,2,1,1,1,1),(17,3,1,1,1,1,1),\
  (17,3,2,1,1,1,1),(17,4,1,1,1,1,1),(17,4,2,1,1,1,1),(18,1,1,1,1,1,1),(18,1,2,1,1,1,1),\
  (18,2,1,1,1,1,1),(18,2,2,1,1,1,1),(18,3,1,1,1,1,1),(18,3,2,1,1,1,1),(18,4,1,1,1,1,1),\
  (18,4,2,1,1,1,1),(19,1,1,1,1,1,1),(19,1,2,1,1,1,1),(19,2,1,1,1,1,1),(19,2,2,1,1,1,1),\
  (19,3,1,1,1,1,1),(19,3,2,1,1,1,1),(19,4,1,1,1,1,1),(19,4,2,1,1,1,1),(20,1,1,1,1,1,1),\
  (20,1,2,1,1,1,1),(20,2,1,1,1,1,1),(20,2,2,1,1,1,1),(20,3,1,1,1,1,1),(20,3,2,1,1,1,1),\
  (20,4,1,1,1,1,1),(20,4,2,1,1,1,1),(21,1,1,1,1,1,1),(21,1,2,1,1,1,1),(21,2,1,1,1,1,1),\
  (21,2,2,1,1,1,1),(21,3,1,1,1,1,1),(21,3,2,1,1,1,1),(21,4,1,1,1,1,1),(21,4,2,1,1,1,1),\
  (22,1,1,1,1,1,1),(22,1,2,1,1,1,1),(22,2,1,1,1,1,1),(22,2,2,1,1,1,1),(22,3,1,1,1,1,1),\
  (22,3,2,1,1,1,1),(22,4,1,1,1,1,1),(22,4,2,1,1,1,1),(23,1,1,1,1,1,1),(23,1,2,1,1,1,1),\
  (23,2,1,1,1,1,1),(23,2,2,1,1,1,1),(23,3,1,1,1,1,1),(23,3,2,1,1,1,1),(23,4,1,1,1,1,1),\
  (23,4,2,1,1,1,1),(24,1,1,1,1,1,1),(24,1,2,1,1,1,1),(24,2,1,1,1,1,1),(24,2,2,1,1,1,1),\
  (24,3,1,1,1,1,1),(24,3,2,1,1,1,1),(24,4,1,1,1,1,1),(24,4,2,1,1,1,1),(25,1,1,1,1,1,1),\
  (25,1,2,1,1,1,1),(25,2,1,1,1,1,1),(25,2,2,1,1,1,1),(25,3,1,1,1,1,1),(25,3,2,1,1,1,1),\
  (25,4,1,1,1,1,1),(25,4,2,1,1,1,1),(26,1,1,1,1,1,1),(26,1,2,1,1,1,1),(26,2,1,1,1,1,1),\
  (26,2,2,1,1,1,1),(26,3,1,1,1,1,1),(26,3,2,1,1,1,1),(26,4,1,1,1,1,1),(26,4,2,1,1,1,1),\
  (27,1,1,1,1,1,1),(27,1,2,1,1,1,1),(27,2,1,1,1,1,1),(27,2,2,1,1,1,1),(27,3,1,1,1,1,1),\
  (27,3,2,1,1,1,1),(27,4,1,1,1,1,1),(27,4,2,1,1,1,1),(28,1,1,1,1,1,1),(28,1,2,1,1,1,1),\
  (28,2,1,1,1,1,1),(28,2,2,1,1,1,1),(28,3,1,1,1,1,1),(28,3,2,1,1,1,1),(28,4,1,1,1,1,1),\
  (28,4,2,1,1,1,1);~\
INSERT INTO `object_type_master` VALUES (1,'Action',2),(2,'Allocation Type',2),(3,'Area',1),\
  (4,'Category',1),(5,'Contact',1),(6,'Contact Group',1),(7,'Country',1),(8,'Currency',1),(9,'Department',1),\
  (10,'Executive Dept',1),(11,'Executive',1),(12,'Executive Group',1),(13,'Executive Role',1),(14,'Invite User',2),\
  (15,'Company User',2),(16,'Item',1),(17,'Item Group',1),(18,'Notification',3),(19,'Organisation',1),(20,'Source',1),\
  (21,'State',1),(22,'State List',1),(23,'Sub Status',2),(24,'Sub Status List',2),(25,'Unit',1),(26,'Enquiry',2),\
  (27,'Contract',2),(28,'Support',2),(29,'Regional Setting',2);~\
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
\
  CREATE PROCEDURE `addDocument`(\
    IN description varchar(255),\
    IN doc_id integer,\
    IN executive_id integer\
    )\
  BEGIN\
  declare last_insert_id integer;\
    start transaction;\
    INSERT INTO executive_docs (description,doc_id,executive_id) VALUES (description,doc_id,executive_id);\
  set last_insert_id = LAST_INSERT_ID();\
  \
  commit;\
    select * from executive_docs ed where ed.id = last_insert_id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `appConfig`(\
  IN obj_id integer,\
  IN isEnabled integer,\
  IN jsonData varchar(5000)\
  )\
  BEGIN\
  DECLARE count_data integer;\
  DECLARE error integer;\
  DECLARE last_insert_id integer Default NULL;\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
      ROLLBACK;\
      RESIGNAL;\
    END;\
  \
  Start Transaction;\
  \
  SELECT COUNT(*) INTO count_data FROM app_config_new ac WHERE ac.object_id = obj_id;\
  \
    IF isEnabled = 0 AND count_data > 0 THEN\
    UPDATE app_config_new ac SET ac.enabled=isEnabled, ac.config=jsonData WHERE ac.object_id = obj_id;\
    END IF;\
  \
    IF isEnabled = 1 THEN\
    IF count_data > 0 THEN\
    UPDATE app_config_new ac SET ac.enabled=isEnabled, ac.config=jsonData WHERE ac.object_id = obj_id;\
    END IF;\
  \
  IF count_data = 0 THEN \
  INSERT INTO app_config_new (object_id, enabled, config) VALUES (obj_id, isEnabled, jsonData);\
    set last_insert_id = LAST_INSERT_ID();\
  END IF;\
  END IF;\
  \
  COMMIT;\
  \
  IF last_insert_id IS NOT NULL THEN\
    SELECT * FROM app_config_new ac WHERE ac.id = last_insert_id;\
  ELSE \
    SELECT * FROM app_config_new ac where ac.object_id = obj_id;\
  END IF;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `createAction`(\
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
  END; \
  \
    start transaction;\
    \
    set error = 0;\
    set error_text = '';\
  \
  SELECT \
    COUNT(*)\
  INTO count_name FROM\
    enquiry_action_master am\
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
  \
  if length(name) = 0 or name is null then\
  set error = 1;\
  set error_path = 'name';\
  set error_text = 'Action Name cannot be empty';\
  END if;\
  END if;\
  \
        if error = 0 then\
      INSERT INTO enquiry_action_master (name,stamp,created_by,created_on) VALUES (name,0,user_id,now());\
            set last_insert_id = LAST_INSERT_ID();\
    END if;\
  commit;\
  \
  SELECT error, error_path, error_text;\
  SELECT \
    *\
  FROM\
    enquiry_action_master am\
  WHERE\
    am.id = last_insert_id;\
  END ;~\
  \
  \
  \
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
  set error_text = 'Allocation Name Already Exists';\
  END if;\
            if length(name) = 0 or name is null then\
  set error = 1;\
  set error_path = 'name';\
  set error_text = 'Allocation Name cannot be empty';\
  END if;\
  END if;\
        if error = 0 then\
  INSERT INTO allocation_type_master (name,stamp,created_by,created_on) VALUES (name,0,user_id,now());\
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
  \
  \
  CREATE PROCEDURE `createArea`(\
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
      INSERT INTO area_master (name,stamp,created_by,created_on) VALUES (name,0,user_id,now());\
            set last_insert_id = LAST_INSERT_ID();\
    END if;\
  commit;\
    \
    select error, error_path, error_text;\
    select * from area_master am where am.id = last_insert_id;\
  END ;~\
  \
  \
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
      insert into enquiry_category_master (name, stamp, created_by, created_on)\
        values (name, 0, user_id, now());\
      set last_insert_id = LAST_INSERT_ID();\
    END if;\
    commit;\
  \
  select error, error_path, error_text;\
    select * from enquiry_category_master cm where id = last_insert_id;\
  END ;~\
  \
  \
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
        (alias, name, stamp, print_name, group_id, pan, aadhaar, address1, address2, address3, city, state_id, area_id, pincode, country_id, email, mobile, whatsapp, created_by, created_on, dob, doa, department_id, organisation_id) \
        values\
        (alias, name, 0, print_name, group_id, pan, aadhaar, address1, address2, address3, city, state_id, area_id, pincode, country_id, email, mobile, whatsapp, user_id, now(), dob, doa, dept_id, org_id);\
        set last_insert_id = LAST_INSERT_ID();\
        \
    END if;\
    commit;\
    \
    select * from temp_error_log;\
    select * from contact_master cm where cm.id = last_insert_id;\
  END ;~\
  \
  \
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
        SELECT COUNT(*) INTO count_name\
    FROM contact_group_master cm\
    WHERE cm.alias = name;\
      if count_name > 0 then\
        set error = 1;\
        INSERT INTO error_table (error_text, error_path) \
        VALUES ('Name already exists as alias', 'name');\
        \
      END if;\
        \
    if length(alias) <> 0 then\
      \
      SELECT COUNT(*) INTO count_alias FROM contact_group_master cm\
      WHERE cm.alias = alias ;\
      if count_alias > 0 then\
        set error = 1;\
          INSERT INTO error_table (error_text, error_path) \
          VALUES ('Alias already exists', 'alias');\
          \
      END if;\
            SELECT COUNT(*) INTO count_alias FROM contact_group_master cm\
        WHERE cm.name = alias;\
        if count_alias > 0 then\
          set error = 1;\
            INSERT INTO error_table (error_text, error_path) \
            VALUES ('Alias already exists as name', 'alias');\
            \
        END if;\
    END if;\
              \
    if error = 0 then\
      insert into contact_group_master (name, alias, stamp, parent_id,created_by, created_on) \
      values (name ,alias, 0, parentId, user_id, now()) ;\
      set last_insert_id = LAST_INSERT_ID();\
    END if;\
    commit;\
    \
  select * from error_table;\
    select * from contact_group_master am where am.id = last_insert_id;\
  END ;~\
  \
  \
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
      SELECT COUNT(*) INTO count_name\
    FROM country_master cm\
    WHERE cm.alias = name;\
      if count_name > 0 then\
        set error = 1;\
        INSERT INTO temp_error_log (error_text, error_path) \
        VALUES ('Country already exists as alias', 'name');\
        \
      END if;\
        \
    \
        if length(alias) <> 0 then\
      \
      SELECT COUNT(*) INTO count_alias FROM country_master cm\
      WHERE cm.alias = alias ;\
      if count_alias > 0 then\
        set error = 1;\
          INSERT INTO temp_error_log (error_text, error_path) \
          VALUES ('Alias already exists', 'alias');\
          \
      END if;\
            \
        SELECT COUNT(*) INTO count_alias FROM country_master cm\
        WHERE cm.name = alias;\
        if count_alias > 0 then\
          set error = 1;\
            INSERT INTO temp_error_log (error_text, error_path) \
            VALUES ('Alias already exists as name', 'alias');\
            \
        END if;\
            END if;\
        if error = 0 then\
      INSERT INTO country_master (name,alias,stamp,created_by,created_on) VALUES (name,alias,0,user_id,now());\
            set last_insert_id = LAST_INSERT_ID();\
    END if;\
  commit;\
    select * from temp_error_log;\
    select * from country_master cm where cm.id = last_insert_id;\
  END ;~\
  \
  \
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
            INSERT INTO error_table (error_text, error_path) VALUES ('Name already exists', 'name');\
        END IF;\
        IF LENGTH(user_name) = 0 THEN\
            SET error = 1;\
            INSERT INTO error_table (error_text, error_path) VALUES ('Name cannot be empty', 'name');\
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
            INSERT INTO error_table (error_text, error_path) VALUES ('Symbol already exists', 'symbol');\
        END IF;\
        IF LENGTH(user_symbol) = 0 THEN\
            SET error = 1;\
            INSERT INTO error_table (error_text, error_path) VALUES ('Symbol cannot be empty', 'symbol');\
        END IF;\
    END IF;\
  \
    IF error = 0 THEN\
        INSERT INTO currency_data (symbol, name, stamp, shortForm, decimal_places, currency_system) \
        VALUES (user_symbol, user_name, 0, user_shortForm, user_Decimal_places, user_Currency_system);\
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
  \
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
      insert into department_master (name, stamp, created_by, created_on)\
        values (name, 0, user_id, now());\
              \
      set last_insert_id = LAST_INSERT_ID();\
    END if;\
    commit;\
  \
  select error, error_path, error_text;\
    select * from department_master cm where id = last_insert_id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `createEnquiry`(\
      IN enq_number VARCHAR(75),\
    IN date VARCHAR(20),\
    IN contact_id INTEGER,\
    IN received_by_id INTEGER,\
    IN category_id INTEGER,\
    IN source_id INTEGER,\
  IN call_receipt_remark VARCHAR(5000),\
    IN allocated_to_id INTEGER,\
    IN status_id INTEGER,\
    IN sub_status_id INTEGER,\
    IN action_taken_id INTEGER,\
    IN next_action_id INTEGER,\
    IN next_action_date VARCHAR(20),\
    IN suggested_action_remark VARCHAR(5000),\
    IN action_taken_remark VARCHAR(5000),\
    IN closure_remark VARCHAR(5000),\
    IN enquiry_tran_type INT,\
    IN active INT,\
    IN created_by INT,\
    IN products_json JSON \
  )\
  BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INTEGER DEFAULT 0;\
    DECLARE error_path VARCHAR(20);\
    DECLARE last_insert_id INTEGER;\
    DECLARE count_name INTEGER;\
    DECLARE idx INT DEFAULT 0;\
    DECLARE product_count INT;\
  \
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL;\
    END;\
  \
    START TRANSACTION;\
  \
    SET error_text = '';\
    SET last_insert_id = 0;\
  \
    SELECT COUNT(*) INTO count_name\
    FROM enquiry_header_tran eh\
    WHERE eh.enq_number = enq_number;\
  \
    IF count_name = 0 THEN\
        INSERT INTO enquiry_header_tran\
        (enq_number, date, auto_number, contact_id, received_by_id, category_id, source_id,call_receipt_remark, stamp, modified_by, modified_on, created_by, created_on  )\
        VALUES \
        (enq_number, date, 0, contact_id, received_by_id, category_id, source_id,call_receipt_remark, 0, NULL, NULL, created_by,\
        NOW());\
  \
        SET last_insert_id = LAST_INSERT_ID();\
  \
        INSERT INTO enquiry_ledger_tran\
        (enquiry_id, status_version, allocated_to, date, status_id, sub_status_id, action_taken_id, next_action_id, next_action_date, \
        suggested_action_remark, action_taken_remark, closure_remark, enquiry_tran_type_id, active, created_by)\
        VALUES\
        (last_insert_id, 0, allocated_to_id, date, status_id, sub_status_id, action_taken_id, next_action_id, next_action_date,\
        suggested_action_remark, action_taken_remark, closure_remark, enquiry_tran_type, 1 , created_by);\
        \
      \
        SET product_count = JSON_LENGTH(products_json); \
  \
        WHILE idx < product_count DO\
            INSERT INTO enquiry_product_tran (enquiry_id,slno, product_id, quantity, unit_id, remark)  \
            VALUES (\
                last_insert_id,\
        JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].id'))),      \
                JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].product_id'))),      \
                JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].quantity'))),     \
                JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].unit_id'))),      \
                JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].remarks')))       \
            );\
            SET idx = idx + 1;  \
        END WHILE;\
    ELSE \
        SET error = 1;\
        SET error_path = 'enq_number';\
        SET error_text = 'Description already exists';\
    END IF;\
  \
    COMMIT;\
  \
    SELECT error, error_path, error_text;\
    SELECT * FROM enquiry_header_tran WHERE id = last_insert_id;\
  END ;~\
  \
  \
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
      insert into enquiry_source_master (name, stamp, created_by, created_on)\
        values (name, 0, user_id, now());\
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
    INSERT INTO enquiry_sub_status_master (name,stamp,enquiry_status_id,created_by,created_on) VALUES (user_name,0,status_id,user_id,now());\
    set last_insert_id = LAST_INSERT_ID();\
  END if;\
  commit;\
  \
    select error, error_path, error_text;\
    select * from enquiry_sub_status_master am where am.id = last_insert_id;\
  END ;~\
  \
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
    IN pan varchar(45),\
    IN aadhaar varchar(45),\
    IN area_id integer,\
    IN call_type varchar(50),\
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
    Declare count_pan integer;\
    Declare count_aadhaar integer;\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL;\
    END;\
    \
    start transaction;\
    set error = 0;\
    set last_insert_id = 0;\
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
    END;   \
    \
        \
        SELECT COUNT(*) INTO count_name\
        FROM executive_master em\
        WHERE  (em.name = name or\
        em.alias = name);\
        \
        if count_name > 0 then\
            set error = 1;\
            insert into error_table (error_text, error_path) values ('name already exist' , 'name');    \
        end if;\
  \
            \
            SELECT COUNT(*) INTO count_alias\
            FROM executive_master em\
            WHERE (em.name = alias or\
            em.alias = alias);\
        \
        if length(alias) <> 0 then\
      \
      SELECT COUNT(*) INTO count_alias FROM executive_master em\
      WHERE em.alias = alias ;\
      if count_alias > 0 then\
        set error = 1;\
          INSERT INTO error_table (error_text, error_path) \
          VALUES ('Alias already exists', 'alias');\
          \
      END if;\
            \
        SELECT COUNT(*) INTO count_alias FROM executive_master em\
        WHERE em.name = alias;\
        if count_alias > 0 then\
          set error = 1;\
            INSERT INTO error_table (error_text, error_path) \
            VALUES ('Alias already exists as name', 'alias');\
            \
        END if;\
            END if;\
            \
            if length(pan) <> 0 then\
      \
      SELECT COUNT(*) INTO count_pan FROM executive_master em\
      WHERE em.pan = pan;\
      if count_pan > 0 then\
        set error = 1;\
          INSERT INTO error_table (error_text, error_path) \
          VALUES ('Pan already exists', 'pan');\
      END if;\
        End if;\
        \
        if length(aadhaar) <> 0 then\
      \
      SELECT COUNT(*) INTO count_aadhaar FROM executive_master em\
      WHERE em.aadhaar = aadhaar;\
      if count_aadhaar > 0 then\
        set error = 1;\
          INSERT INTO error_table (error_text, error_path) \
          VALUES ('Aadhaar already exists', 'aadhaar');\
          \
      END if;\
        End if;\
            \
            \
            \
            if error = 0 then\
                select ctm.id into var_call_type_id from call_type_master ctm where ctm.name=call_type LOCK IN SHARE MODE;\
                                \
                insert into executive_master \
                (alias, name, stamp, address1, address2, address3, city, \
                state_id, pincode, country_id, email, \
                mobile, whatsapp, created_by, created_on, \
                dob, doa, doj, pan, aadhaar, area_id, call_type_id, \
                crm_user_id, role_id, dept_id, group_id) \
                values\
                (alias, name, 0, address1, address2, address3, city, \
                state_id, pincode, country_id, email, \
                mobile, whatsapp, user_id, now(), \
                dofb, dofa, dofj, pan, aadhaar, area_id, var_call_type_id, \
                crm_user_id, role_id, dept_id, group_id);\
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
    insert into executive_dept_master (name, stamp, created_by, created_on) \
        values (name, 0, user_id, now());\
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
    (alias, name, stamp, parent_id, created_by, created_on)\
    values\
    (alias, name, 0, parent_id, user_id, now());\
    set last_insert_id = LAST_INSERT_ID();\
  END if;\
    commit;\
    \
    select * from temp_error_log;\
    select * from executive_group_master egm where egm.id = last_insert_id;\
  END ;~\
  \
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
      insert into executive_role_master (name, stamp, created_by, created_on, parent, department_id)\
      values (name, 0, user_id, now(), parentId, departmentId);\
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
    SELECT \
    COUNT(*)\
  INTO count_name FROM\
    item_group_master am\
  WHERE\
    (am.name = name OR am.alias = name)\
        OR LENGTH(name) = 0\
        OR name IS NULL;\
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
      SELECT COUNT(*) INTO count_name\
    FROM item_group_master am\
    WHERE am.alias = name;\
      if count_name > 0 then\
        set error = 1;\
        INSERT INTO error_table (error_text, error_path) \
        VALUES ('Name already exists as alias', 'name');\
        \
      END if;\
        \
    \
        if length(alias) <> 0 then\
      \
      SELECT COUNT(*) INTO count_alias FROM item_group_master am\
      WHERE am.alias = alias ;\
      if count_alias > 0 then\
        set error = 1;\
          INSERT INTO error_table (error_text, error_path) \
          VALUES ('Alias already exists', 'alias');\
          \
      END if;\
            \
        SELECT COUNT(*) INTO count_alias FROM item_group_master am\
        WHERE am.name = alias;\
        if count_alias > 0 then\
          set error = 1;\
            INSERT INTO error_table (error_text, error_path) \
            VALUES ('Alias already exists as name', 'alias');\
            \
        END if;\
            END if;\
    \
    if error = 0 then\
    insert into item_group_master \
        (name, alias, stamp, parent_id, created_on, modified_on, created_by, modified_by, is_parent) \
        values\
        (name, alias, 0, parent_id, NOW(), null, user_id, null, is_parent); \
        set last_insert_id = LAST_INSERT_ID();\
    END if;\
    commit;\
    \
  SELECT \
    *\
  FROM\
    error_table;\
  SELECT \
    *\
  FROM\
    item_group_master\
  WHERE\
    id = last_insert_id;\
  END ;~\
  \
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
        (alias, name, stamp, print_name, pan, gstin, address1, address2, address3, city, state_id, pincode, country_id, created_by, created_on) \
        values\
        (alias, name, 0, printName, pan, gstin, address1, address2, address3, city, state_id, pincode, country_id, user_id, now());\
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
  \
  CREATE PROCEDURE `createProduct`(\
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
    FROM product_master im\
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
    FROM product_master im\
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
      SELECT COUNT(*) INTO count_alias FROM product_master im\
            WHERE im.alias = alias ;\
    IF count_alias > 0 THEN\
      set error = 1;\
            INSERT INTO error_log (error_text, error_path)\
            VALUES ('Alias already exists', 'alias');\
    END IF;      \
    \
      SELECT COUNT(*) INTO count_alias FROM product_master im\
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
        insert into product_master \
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
    select * from product_master where id = last_insert_id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `createProductGroup`(\
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
    SELECT \
    COUNT(*)\
  INTO count_name FROM\
    product_group_master am\
  WHERE\
    (am.name = name OR am.alias = name)\
        OR LENGTH(name) = 0\
        OR name IS NULL;\
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
      SELECT COUNT(*) INTO count_name\
    FROM product_group_master am\
    WHERE am.alias = name;\
      if count_name > 0 then\
        set error = 1;\
        INSERT INTO error_table (error_text, error_path) \
        VALUES ('Name already exists as alias', 'name');\
        \
      END if;\
        \
    \
        if length(alias) <> 0 then\
      \
      SELECT COUNT(*) INTO count_alias FROM product_group_master am\
      WHERE am.alias = alias ;\
      if count_alias > 0 then\
        set error = 1;\
          INSERT INTO error_table (error_text, error_path) \
          VALUES ('Alias already exists', 'alias');\
          \
      END if;\
            \
        SELECT COUNT(*) INTO count_alias FROM product_group_master am\
        WHERE am.name = alias;\
        if count_alias > 0 then\
          set error = 1;\
            INSERT INTO error_table (error_text, error_path) \
            VALUES ('Alias already exists as name', 'alias');\
            \
        END if;\
            END if;\
    \
    if error = 0 then\
    insert into product_group_master \
        (name, alias, stamp, parent_id, created_on, modified_on, created_by, modified_by, is_parent) \
        values\
        (name, alias, 0, parent_id, NOW(), null, user_id, null, is_parent); \
        set last_insert_id = LAST_INSERT_ID();\
    END if;\
    commit;\
    \
  SELECT \
    *\
  FROM\
    error_table;\
  SELECT \
    *\
  FROM\
    product_group_master\
  WHERE\
    id = last_insert_id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `createState`(\
  IN name varchar(75),\
    IN alias varchar(45),\
    IN country_id int(11) unsigned,\
    IN user_id integer)\
  BEGIN\
  DECLARE error integer DEFAULT 0;\
    DECLARE count_name integer;\
    DECLARE count_alias integer;\
    DECLARE last_insert_id integer;\
  \
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL;\
    END;\
  \
    START TRANSACTION;\
  \
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_error_log (\
    id INT AUTO_INCREMENT PRIMARY KEY,\
    error_text VARCHAR(255),\
    error_path VARCHAR(100)\
  );\
    \
    SELECT COUNT(*) INTO count_name\
    FROM state_master sm\
    WHERE (sm.country_id = country_id AND sm.name = name) OR LENGTH(name) = 0 OR name IS NULL;\
  \
    IF count_name > 0 THEN\
        IF LENGTH(name) > 0 THEN\
            INSERT INTO temp_error_log (error_text, error_path)\
            VALUES ('State already exists', 'name');\
        ELSE\
            INSERT INTO temp_error_log (error_text, error_path)\
            VALUES ('State cannot be empty', 'name');\
        END IF;\
        SET error = 1;\
    END IF;\
  \
    SELECT COUNT(*) INTO count_name\
    FROM state_master sm\
    WHERE sm.country_id = country_id AND sm.alias = name;\
  \
    IF count_name > 0 THEN\
        INSERT INTO temp_error_log (error_text, error_path)\
        VALUES ('State already exists as alias', 'name');\
        SET error = 1;\
    END IF;\
  \
    SELECT COUNT(*) INTO count_alias\
    FROM state_master sm\
    WHERE sm.country_id = country_id AND sm.alias = alias AND LENGTH(alias) > 0;\
  \
    IF count_alias > 0 THEN\
        INSERT INTO temp_error_log (error_text, error_path)\
        VALUES ('Alias already exists', 'alias');\
        SET error = 1;\
    END IF;\
  \
    SELECT COUNT(*) INTO count_alias\
    FROM state_master sm\
    WHERE sm.country_id = country_id AND sm.name = alias AND LENGTH(alias) > 0;\
  \
    IF count_alias > 0 THEN\
        INSERT INTO temp_error_log (error_text, error_path)\
        VALUES ('Alias already exists as state', 'alias');\
        SET error = 1;\
    END IF;\
  \
    IF error = 0 THEN\
        INSERT INTO state_master (name, stamp, alias, created_by, created_on, country_id)\
        VALUES (name, 0, alias, user_id, NOW(), country_id);\
        SET last_insert_id = LAST_INSERT_ID();\
    END IF;\
  \
    COMMIT;\
  \
    SELECT * FROM temp_error_log;\
    IF last_insert_id > 0 THEN\
        SELECT * FROM state_master sm WHERE sm.id = last_insert_id;\
    END IF;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `createStatusBar`(\
  IN userId integer\
  )\
  BEGIN\
  DECLARE error integer;\
    declare count_user integer;\
    set error = 0;\
  start transaction;\
  \
    SELECT COUNT(*) INTO count_user FROM status_bar sb\
    WHERE sb.user_id = userId;\
    \
    if count_user > 0 then\
    Update status_bar set data = '{\"key3\" : \"\", \"key4\": \"\", \"key5\": \"\"}' where user_id = userId;\
    set error = 1;\
    END if;\
    \
    if error = 0 then\
    insert into status_bar (user_id) values (userId);\
    END if;\
    commit;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `createSupportAction`(\
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
  END; \
  \
    start transaction;\
    \
    set error = 0;\
    set error_text = '';\
  \
  SELECT \
    COUNT(*)\
  INTO count_name FROM\
    ticket_action_master am\
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
  \
  if length(name) = 0 or name is null then\
  set error = 1;\
  set error_path = 'name';\
  set error_text = 'Action Name cannot be empty';\
  END if;\
  END if;\
  \
        if error = 0 then\
      INSERT INTO ticket_action_master (name,stamp,created_by,created_on) VALUES (name,0,user_id,now());\
            set last_insert_id = LAST_INSERT_ID();\
    END if;\
  commit;\
  \
  SELECT error, error_path, error_text;\
  SELECT \
    *\
  FROM\
    ticket_action_master am\
  WHERE\
    am.id = last_insert_id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `createSupportCategory`(\
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
    FROM ticket_category_master cm\
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
      insert into ticket_category_master (name, stamp, created_by, created_on)\
        values (name, 0, user_id, now());\
      set last_insert_id = LAST_INSERT_ID();\
    END if;\
    commit;\
  \
  select error, error_path, error_text;\
    select * from ticket_category_master cm where id = last_insert_id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `createSupportSubStatusDb`(\
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
  FROM ticket_sub_status_master am\
  WHERE am.ticket_status_id=status_id and am.name = user_name or\
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
    INSERT INTO ticket_sub_status_master (name,stamp,ticket_status_id,created_by,created_on) VALUES (user_name,0,status_id,user_id,now());\
    set last_insert_id = LAST_INSERT_ID();\
  END if;\
  commit;\
  \
    select error, error_path, error_text;\
    select * from ticket_sub_status_master am where am.id = last_insert_id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `createSupportTicket`(\
      IN tkt_number VARCHAR(75),\
    IN date VARCHAR(20),\
    IN contact_id INTEGER,\
    IN received_by_id INTEGER,\
    IN category_id INTEGER,\
  IN call_receipt_remark VARCHAR(5000),\
    IN allocated_to_id INTEGER,\
    IN status_id INTEGER,\
    IN sub_status_id INTEGER,\
    IN action_taken_id INTEGER,\
    IN next_action_id INTEGER,\
    IN next_action_date VARCHAR(20),\
    IN suggested_action_remark VARCHAR(5000),\
    IN action_taken_remark VARCHAR(5000),\
    IN closure_remark VARCHAR(5000),\
    IN ticket_tran_type INT,\
    IN active INT,\
    IN created_by INT,\
  IN products_json JSON \
  )\
  BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INTEGER DEFAULT 0;\
    DECLARE error_path VARCHAR(20);\
    DECLARE last_insert_id INTEGER;\
    DECLARE count_name INTEGER;\
  DECLARE idx INT DEFAULT 0;\
    DECLARE product_count INT;\
  \
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL;\
    END;\
  \
    START TRANSACTION;\
  \
    SET error_text = '';\
    SET last_insert_id = 0;\
  \
    SELECT COUNT(*) INTO count_name\
    FROM ticket_header_tran th\
    WHERE th.tkt_number = tkt_number;\
  \
    IF count_name = 0 THEN\
        INSERT INTO ticket_header_tran\
        (tkt_number, date, auto_number, contact_id, received_by_id, category_id,call_receipt_remark, stamp, modified_by, modified_on, created_by, created_on  )\
        VALUES \
        (tkt_number, date, 0, contact_id, received_by_id, category_id,call_receipt_remark, 0, NULL, NULL, created_by,\
        NOW());\
  \
        SET last_insert_id = LAST_INSERT_ID();\
  \
        INSERT INTO ticket_ledger_tran\
        (ticket_id, status_version, allocated_to, date, status_id, sub_status_id, action_taken_id, next_action_id, next_action_date, \
        suggested_action_remark, action_taken_remark, closure_remark, ticket_tran_type_id, active, created_by)\
        VALUES\
        (last_insert_id, 0, allocated_to_id, date, status_id, sub_status_id, action_taken_id, next_action_id, next_action_date,\
        suggested_action_remark, action_taken_remark, closure_remark, ticket_tran_type, active , created_by);\
        \
        SET product_count = JSON_LENGTH(products_json); \
  \
        WHILE idx < product_count DO\
            INSERT INTO ticket_product_tran (ticket_id, slno, product_id)  \
            VALUES (\
                last_insert_id,\
        JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].id'))),      \
                JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].product_id')))\
            );\
            SET idx = idx + 1;  \
        END WHILE;\
        \
    ELSE \
        SET error = 1;\
        SET error_path = 'tkt_number';\
        SET error_text = 'Description already exists';\
    END IF;\
  \
    COMMIT;\
  \
    SELECT error, error_path, error_text;\
    SELECT * FROM ticket_header_tran WHERE id = last_insert_id;\
  SELECT * FROM ticket_ledger_tran WHERE id = last_insert_id;\
  \
  END ;~\
  \
  CREATE PROCEDURE `createTicket`(\
      IN tkt_number VARCHAR(75),\
    IN date VARCHAR(20),\
    IN contact_id INTEGER,\
    IN received_by_id INTEGER,\
    IN category_id INTEGER,\
    IN call_receipt_remark VARCHAR(5000),\
    IN allocated_to_id INTEGER,\
    IN status_id INTEGER,\
    IN sub_status_id INTEGER,\
    IN action_taken_id INTEGER,\
    IN next_action_id INTEGER,\
    IN next_action_date VARCHAR(20),\
    IN suggested_action_remark VARCHAR(5000),\
    IN action_taken_remark VARCHAR(5000),\
    IN closure_remark VARCHAR(5000),\
    IN ticket_tran_type INT,\
    IN active INT,\
    IN created_by INT,\
    IN products_json JSON \
  )\
  BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INTEGER DEFAULT 0;\
    DECLARE error_path VARCHAR(20);\
    DECLARE last_insert_id INTEGER;\
    DECLARE count_name INTEGER;\
    DECLARE idx INT DEFAULT 0;\
    DECLARE product_count INT;\
  \
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL;\
    END;\
  \
    START TRANSACTION;\
  \
    SET error_text = '';\
    SET last_insert_id = 0;\
  \
    SELECT COUNT(*) INTO count_name\
    FROM ticket_header_tran th\
    WHERE th.tkt_number = tkt_number;\
  \
    IF count_name = 0 THEN\
        INSERT INTO ticket_header_tran\
        (tkt_number, date, auto_number, contact_id, received_by_id, category_id, call_receipt_remark, stamp, modified_by, modified_on, created_by, created_on)\
        VALUES \
        (tkt_number, date, 0, contact_id, received_by_id, category_id, call_receipt_remark, 0, NULL, NULL, created_by, NOW());\
  \
        SET last_insert_id = LAST_INSERT_ID();\
  \
        INSERT INTO ticket_ledger_tran\
        (ticket_id, status_version, allocated_to, date, status_id, sub_status_id, action_taken_id, next_action_id, next_action_date, \
        suggested_action_remark, action_taken_remark, closure_remark, ticket_tran_type_id, active, created_by)\
        VALUES\
        (last_insert_id, 0, allocated_to_id, date, status_id, sub_status_id, action_taken_id, next_action_id, next_action_date,\
        suggested_action_remark, action_taken_remark, closure_remark, ticket_tran_type, 1, created_by);\
        \
      \
        SET product_count = JSON_LENGTH(products_json); \
  \
        WHILE idx < product_count DO\
            INSERT INTO ticket_product_tran (ticket_id, slno, product_id, quantity, unit_id, remark)  \
            VALUES (\
                last_insert_id,\
        JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].id'))),      \
                JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].product_id')))\
            );\
            SET idx = idx + 1;  \
        END WHILE;\
    ELSE \
        SET error = 1;\
        SET error_path = 'tkt_number';\
        SET error_text = 'Description already exists';\
    END IF;\
  \
    COMMIT;\
  \
    SELECT error, error_path, error_text;\
    SELECT * FROM ticket_header_tran WHERE id = last_insert_id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `createUnit`(\
    IN name varchar(50),\
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
        (name, stamp, created_by, modified_by, created_on, modified_on) \
        values\
        (name, 0, user_id, null, NOW(), null); \
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
        AND lt.allocated_to <> 0 group by em.name;\
  SELECT lt.date AS date, Week(lt.date) AS week, em.name as name, COUNT(*) AS count\
    FROM enquiry_ledger_tran lt \
    left join executive_master em on lt.allocated_to=em.id\
    WHERE (WEEK(lt.date)) >= WEEK(CURDATE()) - 2\
    AND lt.enquiry_id not in (select et.enquiry_id from enquiry_ledger_tran et \
    left join enquiry_status_master sm on sm.id=et.status_id where sm.name='Closed') AND\
    lt.id = (SELECT MAX(inner_lt.id)\
        FROM enquiry_ledger_tran inner_lt \
        WHERE inner_lt.enquiry_id = lt.enquiry_id)\
        AND lt.allocated_to <> 0\
    GROUP BY name, Week(lt.date) ORDER BY name, WEEK(lt.date);\
  END ;~\
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
  \
  \
  CREATE PROCEDURE `search_contacts`(\
  IN search_value VARCHAR(255)\
  )\
  BEGIN\
  DECLARE name BOOLEAN DEFAULT TRUE;\
  DECLARE phone BOOLEAN DEFAULT TRUE;\
  DECLARE whatsapp BOOLEAN DEFAULT TRUE;\
  DECLARE alias BOOLEAN DEFAULT TRUE;\
  DECLARE email BOOLEAN DEFAULT TRUE;\
  DECLARE organisation BOOLEAN DEFAULT TRUE;\
  \
  IF organisation THEN\
    SELECT ct.id as id , ct.name as name ,  TRIM(BOTH ' ; ' FROM CONCAT_WS(' ; ', \
        IF(ct.name != '', ct.name, NULL), \
      \
    IF(ct.alias != '', ct.alias, NULL), \
        IF(ct.mobile != '', ct.mobile, NULL), \
        IF(ct.whatsapp != '', ct.whatsapp, NULL), \
      IF(ct.email != '', ct.email, NULL), \
      IF(org.name != '' , org.name , NULL)\
    )) as detail\
    FROM contact_master ct\
    LEFT JOIN organisation_master org ON ct.organisation_id = org.id\
    WHERE (name IS TRUE AND ct.name LIKE CONCAT('%', search_value, '%'))\
      OR (phone IS TRUE AND ct.mobile LIKE CONCAT('%', search_value, '%'))\
      OR (whatsapp IS TRUE AND ct.whatsapp LIKE CONCAT('%', search_value, '%'))\
      OR ( email IS TRUE AND ct.email LIKE CONCAT('%', search_value, '%'))\
      OR ( alias IS TRUE AND ct.alias LIKE CONCAT('%', search_value, '%'))\
      OR ( organisation IS TRUE AND org.name LIKE CONCAT('%', search_value, '%'));\
  ELSE\
    SELECT ct.id as id , ct.name as name ,    TRIM(BOTH ' ; ' FROM CONCAT_WS(' ; ', \
        IF(ct.name != '', ct.name, NULL), \
      \
    IF(ct.alias != '', ct.alias, NULL), \
        IF(ct.mobile != '', ct.mobile, NULL), \
        IF(ct.whatsapp != '', ct.whatsapp, NULL), \
      IF(ct.email != '', ct.email, NULL)\
    )) as detail\
    FROM contact_master ct\
    WHERE (name IS TRUE AND ct.name LIKE CONCAT('%', search_value, '%'))\
      OR (phone IS TRUE AND ct.mobile LIKE CONCAT('%', search_value, '%'))\
      OR (whatsapp IS TRUE AND ct.whatsapp LIKE CONCAT('%', search_value, '%'))\
      OR ( email IS TRUE AND ct.email LIKE CONCAT('%', search_value, '%'))\
      OR ( alias IS TRUE AND ct.alias LIKE CONCAT('%', search_value, '%'));\
  END IF;\
  \
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `search_contact_group`(\
    IN search_value VARCHAR(255)\
  )\
  BEGIN\
    DECLARE name BOOLEAN DEFAULT TRUE;\
    DECLARE alias BOOLEAN DEFAULT TRUE;\
  \
  \
    /*\
    SELECT name, alias\
    INTO name, alias\
    FROM search_table\
    WHERE formName = 'executive'; \
    */\
  \
    SELECT cgm.id AS id, \
          cgm.name AS name, \
          TRIM(BOTH ' ; ' FROM CONCAT_WS(' ; ', \
              IF(cgm.name != '', cgm.name, NULL), \
              IF(cgm.alias != '', cgm.alias, NULL)\
          )) AS detail\
    FROM contact_group_master cgm\
    WHERE (name IS TRUE AND cgm.name LIKE CONCAT('%', search_value, '%'))\
      OR (alias IS TRUE AND cgm.alias LIKE CONCAT('%', search_value, '%'));\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `search_executive`(\
    IN search_value VARCHAR(255)\
  )\
  BEGIN\
    DECLARE name BOOLEAN DEFAULT TRUE;\
    DECLARE alias BOOLEAN DEFAULT TRUE;\
    DECLARE phone BOOLEAN DEFAULT TRUE;\
    DECLARE whatsapp BOOLEAN DEFAULT TRUE;\
    DECLARE email BOOLEAN DEFAULT TRUE;\
  \
    /*\
    SELECT name, alias, phone , whatsapp, email\
    INTO name, alias,  phone , whatsapp, email\
    FROM search_table\
    WHERE formName = 'executive'; \
    */\
  \
    SELECT em.id AS id, \
          em.name AS name, \
          TRIM(BOTH ' ; ' FROM CONCAT_WS(' ; ', \
              IF(em.name != '', em.name, NULL), \
              IF(em.alias != '', em.alias, NULL), \
              IF(em.mobile != '', em.mobile, NULL), \
              IF(em.whatsapp != '', em.whatsapp, NULL), \
              IF(em.email != '', em.email, NULL)\
          )) AS detail\
    FROM executive_master em\
    WHERE (name IS TRUE AND em.name LIKE CONCAT('%', search_value, '%'))\
      OR (alias IS TRUE AND em.alias LIKE CONCAT('%', search_value, '%'))\
      OR (phone IS TRUE AND em.mobile LIKE CONCAT('%', search_value, '%')) \
      OR (whatsapp IS TRUE AND em.whatsapp LIKE CONCAT('%', search_value, '%')) \
      OR (email IS TRUE AND em.email LIKE CONCAT('%', search_value, '%')); \
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `search_organisation`(\
  IN search_value VARCHAR(255)\
  )\
  BEGIN\
  DECLARE name BOOLEAN DEFAULT TRUE;\
  DECLARE alias BOOLEAN DEFAULT TRUE;\
  DECLARE print_name BOOLEAN DEFAULT TRUE;\
  \
  \
    SELECT om.id as id , om.name as name ,    TRIM(BOTH ' ; ' FROM CONCAT_WS(' ; ', \
        IF(om.name != '', om.name, NULL), \
  IF(om.alias != '', om.alias, NULL), \
      IF(om.print_name != '', om.print_name, NULL)\
    )) as detail\
    FROM organisation_master om\
    WHERE (name IS TRUE AND om.name LIKE CONCAT('%', search_value, '%'))\
          OR ( alias IS TRUE AND om.alias LIKE CONCAT('%', search_value, '%'))\
      OR (print_name IS TRUE AND om.print_name LIKE CONCAT('%', search_value, '%'))\
  ;\
  \
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `search_product`(\
  IN search_value VARCHAR(255)\
  )\
  BEGIN\
  DECLARE name BOOLEAN DEFAULT TRUE;\
  DECLARE alias BOOLEAN DEFAULT TRUE;\
  DECLARE group_name BOOLEAN DEFAULT TRUE;\
  DECLARE product_number BOOLEAN DEFAULT TRUE;\
  DECLARE hsn_code BOOLEAN DEFAULT TRUE;\
  \
  \
  IF group_name THEN\
    SELECT \
      pm.id AS id, \
      pm.name AS name, \
      TRIM(BOTH ' ; ' FROM CONCAT_WS(' ; ', \
        IF(pm.name != '', pm.name, NULL), \
        IF(pm.alias != '', pm.alias, NULL), \
        IF(pm.product_number != '', pm.product_number, NULL), \
        IF(pm.hsn_code != '', pm.hsn_code, NULL), \
        IF(pgm.name != '', pgm.name, NULL)\
      )) AS detail\
    FROM \
      product_master pm\
      LEFT JOIN product_group_master pgm ON pm.group_id = pgm.id\
    WHERE \
      (name IS TRUE AND pm.name LIKE CONCAT('%', search_value, '%'))\
      OR (alias IS TRUE AND pm.alias LIKE CONCAT('%', search_value, '%'))\
      OR (product_number IS TRUE AND pm.product_number LIKE CONCAT('%', search_value, '%'))\
      OR (hsn_code IS TRUE AND pm.hsn_code LIKE CONCAT('%', search_value, '%'))\
      OR (group_name IS TRUE AND pgm.name LIKE CONCAT('%', search_value, '%'));\
  ELSE\
    SELECT \
      pm.id AS id, \
      pm.name AS name, \
      TRIM(BOTH ' ; ' FROM CONCAT_WS(' ; ', \
        IF(pm.name != '', pm.name, NULL), \
        IF(pm.alias != '', pm.alias, NULL), \
        IF(pm.product_number != '', pm.product_number, NULL), \
        IF(pm.hsn_code != '', pm.hsn_code, NULL)\
      )) AS detail\
    FROM \
      product_master pm\
    WHERE \
      (name IS TRUE AND pm.name LIKE CONCAT('%', search_value, '%'))\
      OR (alias IS TRUE AND pm.alias LIKE CONCAT('%', search_value, '%'))\
      OR (product_number IS TRUE AND pm.product_number LIKE CONCAT('%', search_value, '%'))\
      OR (hsn_code IS TRUE AND pm.hsn_code LIKE CONCAT('%', search_value, '%'));\
  END IF;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `updateAction`(\
  IN id int(11) unsigned,\
    IN name varchar(60),\
    IN stamp integer,\
    IN user_id integer\
    )\
  BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
    declare error_path varchar(20);\
    DECLARE count_name varchar(60);\
    declare is_deleted INT;\
    declare current_stamp INT;\
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
    SELECT COUNT(*) INTO is_deleted FROM enquiry_action_master am WHERE am.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
      set error_path = 'refresh';\
      set error_text = 'Record not found';\
        end if;\
        \
        If error = 0 then\
    SELECT am.stamp INTO current_stamp FROM enquiry_action_master am WHERE am.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
            set error_path = 'refresh';\
            set error_text = 'Data is updated, Please refresh the Page!';\
    end if;\
        End if;\
              \
    if error = 0 then\
      update enquiry_action_master am set \
        am.name=name, am.stamp= am.stamp+1, am.modified_by=(user_id), am.modified_on = now() where am.id=id;\
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
  \
  CREATE PROCEDURE `updateAllocationType`(\
  IN id int(11) unsigned,\
  IN name varchar(75),\
    IN stamp integer,\
    IN user_id integer\
    )\
  BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
    declare error_path varchar(20);\
    declare count_name integer;\
    declare is_deleted INT;\
    declare current_stamp INT;\
  \
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
    SELECT COUNT(*) INTO count_name FROM allocation_type_master am WHERE (am.id <> id && am.name = name) OR LENGTH(name) = 0 OR name IS NULL;\
  \
    if count_name > 0 then\
      if length(name) > 0 or name is not null then\
      set error = 1;\
        set error_path = 'name';\
        set error_text = 'Allocation Type Already Exists';\
      END if;\
            if length(name) = 0 or name is null then\
      set error = 1;\
        set error_path = 'name';\
        set error_text = 'Allocation Type cannot be empty';\
      END if;\
    END if;\
  \
    SELECT COUNT(*) INTO is_deleted FROM allocation_type_master am WHERE am.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
      set error_path = 'refresh';\
      set error_text = 'Record not found';\
        end if;\
        If error = 0 then\
    SELECT am.stamp INTO current_stamp FROM allocation_type_master am WHERE am.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
            set error_path = 'refresh';\
            set error_text = 'Data is updated, Please refresh the Page!';\
    end if;\
        End if;\
        \
        IF error = 0 THEN\
      UPDATE allocation_type_master am \
      SET \
      am.name = name,\
      am.stamp = am.stamp + 1,\
      am.modified_by = user_id,\
      am.modified_on = NOW() WHERE am.id = id;\
    END IF;\
    commit;\
    \
  SELECT error, error_path, error_text;\
  SELECT * FROM allocation_type_master am WHERE am.id = id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `updateArea`(\
  IN name varchar(75),\
    IN id int(11) unsigned,\
    IN stamp integer,\
    IN user_id integer\
    )\
  BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
    declare error_path varchar(20);\
    declare count_name integer;\
  declare is_deleted INT;\
    declare current_stamp INT;\
  \
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
        \
        SELECT COUNT(*) INTO is_deleted FROM area_master am WHERE am.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
      set error_path = 'refresh';\
      set error_text = 'Record not found';\
        end if;\
        \
        If error = 0 then\
    SELECT am.stamp INTO current_stamp FROM area_master am WHERE am.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
            set error_path = 'refresh';\
            set error_text = 'Data is updated, Please refresh the Page!';\
    end if;\
        End if;\
        \
        if error = 0 then\
      UPDATE area_master am SET\
            am.name=name, am.stamp=am.stamp+1, am.modified_by=(user_id), am.modified_on = now() where am.id=id;\
    END if;\
  commit;\
    \
    select error, error_path, error_text;\
    select * from area_master am where am.id = id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `updateCallAllocation`(\
  IN executiveId INT,\
  IN remark TEXT,\
  IN idList VARCHAR(255),\
  IN comma CHAR(1),\
  IN userID INT\
  )\
  BEGIN\
    START TRANSACTION;\
  \
    UPDATE enquiry_ledger_tran elt\
    JOIN (\
        SELECT enquiry_id, MAX(id) AS max_id\
        FROM enquiry_ledger_tran\
        WHERE FIND_IN_SET(enquiry_id, idList) > 0\
        GROUP BY enquiry_id\
    ) latest ON elt.id = latest.max_id\
    SET elt.active = 0;\
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
        suggested_action_remark,\
        action_taken_remark,\
        closure_remark,\
        enquiry_tran_type_id,\
        active,\
        modified_by,\
        created_by\
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
        remark,\
        elt.action_taken_remark,\
        elt.closure_remark,\
        elt.enquiry_tran_type_id,\
        1,\
        userID,\
        elt.created_by        \
    FROM enquiry_ledger_tran elt\
    JOIN (\
        SELECT enquiry_id, MAX(id) as max_id\
        FROM enquiry_ledger_tran\
        WHERE FIND_IN_SET(enquiry_id, idList) > 0\
        GROUP BY enquiry_id\
    ) latest ON elt.id = latest.max_id;\
  \
    COMMIT;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `updateCallAllocationSupport`(\
  IN executiveId INT,\
  IN remark TEXT,\
  IN idList VARCHAR(255),\
  IN comma CHAR(1),\
  IN userID INT\
  )\
  BEGIN\
  \
    START TRANSACTION;\
    \
  UPDATE ticket_ledger_tran tlt\
    JOIN (\
        SELECT ticket_id, MAX(id) AS max_id\
        FROM ticket_ledger_tran\
        WHERE FIND_IN_SET(ticket_id, idList) > 0\
        GROUP BY ticket_id\
    ) latest ON tlt.id = latest.max_id\
    SET tlt.active = 0;\
    \
    \
    INSERT INTO ticket_ledger_tran (\
        ticket_id,\
        status_version,\
        allocated_to,\
        date,\
        status_id,\
        sub_status_id,\
        action_taken_id,\
        next_action_id,\
        next_action_date,\
        suggested_action_remark,\
        action_taken_remark,\
        closure_remark,\
        ticket_tran_type_id,\
        active,\
        modified_by,\
        created_by\
    )\
    SELECT \
        tlt.ticket_id,\
        tlt.status_version,\
        executiveId,\
        NOW(),\
        tlt.status_id,\
        tlt.sub_status_id,\
        tlt.action_taken_id,\
        tlt.next_action_id,\
        tlt.next_action_date,\
        remark,\
        tlt.action_taken_remark,\
        tlt.closure_remark,\
        tlt.ticket_tran_type_id,\
        1,\
        userID,\
        tlt.created_by        \
    FROM ticket_ledger_tran tlt\
    JOIN (\
        SELECT ticket_id, MAX(id) as max_id\
        FROM ticket_ledger_tran\
        WHERE find_in_set(ticket_id, idList)>0\
        GROUP BY ticket_id\
    ) latest ON tlt.id = latest.max_id;\
  \
    COMMIT;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `updateCategory`(\
  IN id int(11) unsigned,\
    IN name varchar(60),\
    IN stamp integer,\
    IN user_id integer\
    )\
  BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
    declare error_path varchar(20);\
    DECLARE count_name varchar(60);\
  declare is_deleted INT;\
    declare current_stamp INT;\
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
    SELECT COUNT(*) INTO is_deleted FROM enquiry_category_master cm WHERE cm.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
      set error_path = 'refresh';\
      set error_text = 'Record not found';\
        end if;\
        \
        If error = 0 then\
    SELECT cm.stamp INTO current_stamp FROM enquiry_category_master cm WHERE cm.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
            set error_path = 'refresh';\
            set error_text = 'Data is updated, Please refresh the Page!';\
    end if;\
        End if;\
            \
  if error = 0 then\
  update enquiry_category_master cm set\
        cm.name=name, cm.stamp=cm.stamp+1, cm.modified_by=(user_id), cm.modified_on = now() where cm.id=id;\
  END if;\
    commit;\
  \
  select error, error_path, error_text;\
    select * from enquiry_category_master cm where cm.id = id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `updateContact`(\
  IN id int(11) unsigned,\
  IN alias varchar(60),\
    IN name varchar(60),\
    IN stamp int,\
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
  declare is_deleted INT;\
    declare current_stamp INT;  \
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
        SELECT COUNT(*) INTO is_deleted FROM contact_master cm WHERE cm.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
          INSERT INTO temp_error_log (error_text, error_path) \
          VALUES ('Record not found', 'refresh');\
        end if;\
        \
        If error = 0 then\
    SELECT cm.stamp INTO current_stamp FROM contact_master cm WHERE cm.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
          INSERT INTO temp_error_log (error_text, error_path) \
          VALUES ('Data is updated, Please refresh the Page!', 'refresh');\
    end if;\
        End if;\
        \
    if error = 0 then\
        \
      UPDATE contact_master cm SET  cm.name= name, cm.stamp=cm.stamp+1, cm.alias  = alias, cm.print_name  = print_name,\
            cm.group_id  = group_id,cm.pan  = pan,cm.aadhaar  = aadhaar, cm.address1  = address1,cm.address2  = address2,\
            cm.address3  = address3,cm.city  = city,cm.state_id  = state_id, cm.area_id  = area_id, cm.pincode  = pincode,cm.country_id  = country_id,\
            cm.email  = email,cm.mobile  = mobile,cm.whatsapp = whatsapp,cm.modified_by = user_id, cm.modified_on = now(),cm.department_id  = dept_id,\
            cm.organisation_id  = org_id\
      WHERE cm.id=id;\
    END if;\
    commit;\
    \
    select * from temp_error_log;\
    select * from contact_master cm where cm.id = id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `updateContactGroup`(\
  IN id int(11) unsigned,\
    in name varchar(70),\
    In stamp int,\
    in alias varchar(70),\
    in parentId int,\
    IN user_id integer\
    )\
  BEGIN\
  DECLARE error integer;\
    DECLARE count_name varchar(60);\
    DECLARE count_alias varchar(60);\
    declare is_deleted INT;\
    declare current_stamp INT;\
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
  WHERE (am.id <> id AND am.name = name) OR LENGTH(name) = 0 OR name IS NULL;\
  \
  IF count_name > 0 THEN\
    IF LENGTH(name) > 0 OR name IS NOT NULL THEN\
        SET error = 1;\
        INSERT INTO error_table (error_text, error_path) \
        VALUES ('Name already exists', 'name');\
    END IF;\
    IF LENGTH(name) = 0 OR name IS NULL THEN\
        SET error = 1;\
        INSERT INTO error_table (error_text, error_path) \
        VALUES ('Name cannot be empty', 'name');\
    END IF;\
  END IF;\
  \
  SELECT COUNT(*) INTO count_name\
  FROM contact_group_master am\
  WHERE (am.id <> id AND am.alias = name);\
  IF count_name > 0 THEN\
    SET error = 1;\
    INSERT INTO error_table (error_text, error_path) \
    VALUES ('Name already exists as alias', 'name');\
  END IF;\
  \
  IF LENGTH(alias) <> 0 THEN\
    SELECT COUNT(*) INTO count_alias FROM contact_group_master am\
    WHERE (am.id <> id AND am.alias = alias);\
    IF count_alias > 0 THEN\
        SET error = 1;\
        INSERT INTO error_table (error_text, error_path) \
        VALUES ('Alias already exists', 'alias');\
    END IF;\
  \
    SELECT COUNT(*) INTO count_alias FROM contact_group_master am\
    WHERE (am.id <> id AND am.name = alias);\
    IF count_alias > 0 THEN\
        SET error = 1;\
        INSERT INTO error_table (error_text, error_path) \
        VALUES ('Alias already exists as name', 'alias');\
    END IF;\
  END IF;\
  \
  SELECT COUNT(*) INTO is_deleted FROM contact_group_master cm WHERE cm.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
          INSERT INTO error_table (error_text, error_path) \
          VALUES ('Record not found', 'refresh');\
        end if;\
        \
        If error = 0 then\
    SELECT cm.stamp INTO current_stamp FROM contact_group_master cm WHERE cm.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
          INSERT INTO error_table (error_text, error_path) \
          VALUES ('Data is updated, Please refresh the Page!', 'refresh');\
    end if;\
        End if;\
              \
    if error = 0 then\
      update contact_group_master am set \
      am.name=name, am.stamp=am.stamp+1, am.alias=alias ,am.parent_id=parentId, am.modified_by=user_id, am.modified_on = now() where am.id=id;\
    END if;\
    commit;\
    \
  select * from error_table;\
    select * from contact_group_master am where am.id = id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `updateCountry`(\
  IN name varchar(75),\
    In stamp int,\
    IN id int(11) unsigned,\
    IN alias varchar(45),\
    IN user_id integer)\
  BEGIN\
  DECLARE error integer;\
    declare count_name integer;\
    declare count_alias integer;\
    declare is_deleted INT;\
    declare current_stamp INT;    \
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
  WHERE (cm.id <> id AND cm.name = name) OR LENGTH(name) = 0 OR name IS NULL;\
  \
  IF count_name > 0 THEN\
    IF LENGTH(name) > 0 OR name IS NOT NULL THEN\
        SET error = 1;\
        INSERT INTO temp_error_log (error_text, error_path) \
        VALUES ('Country already exists', 'name');\
    END IF;\
    IF LENGTH(name) = 0 OR name IS NULL THEN\
        SET error = 1;\
        INSERT INTO temp_error_log (error_text, error_path) \
        VALUES ('Country cannot be empty', 'name');\
    END IF;\
  END IF;\
  \
  SELECT COUNT(*) INTO count_name\
  FROM country_master cm\
  WHERE (cm.id <> id AND cm.alias = name);\
  \
  IF count_name > 0 THEN\
    SET error = 1;\
    INSERT INTO temp_error_log (error_text, error_path) \
    VALUES ('Country already exists as alias', 'name');\
  END IF;\
  \
  IF LENGTH(alias) <> 0 THEN\
    SELECT COUNT(*) INTO count_alias \
    FROM country_master cm\
    WHERE (cm.id <> id AND cm.alias = alias);\
  \
    IF count_alias > 0 THEN\
        SET error = 1;\
        INSERT INTO temp_error_log (error_text, error_path) \
        VALUES ('Alias already exists', 'alias');\
    END IF;\
  \
    SELECT COUNT(*) INTO count_alias \
    FROM country_master cm\
    WHERE (cm.id <> id AND cm.name = alias);\
  \
    IF count_alias > 0 THEN\
        SET error = 1;\
        INSERT INTO temp_error_log (error_text, error_path) \
        VALUES ('Alias already exists as name', 'alias');\
    END IF;\
  END IF;\
  \
    SELECT COUNT(*) INTO is_deleted FROM country_master cm WHERE cm.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
          INSERT INTO temp_error_log (error_text, error_path) \
          VALUES ('Record not found', 'refresh');\
        end if;\
        \
        If error = 0 then\
    SELECT cm.stamp INTO current_stamp FROM country_master cm WHERE cm.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
          INSERT INTO temp_error_log (error_text, error_path) \
          VALUES ('Data is updated, Please refresh the Page!', 'refresh');\
    end if;\
        End if;\
  \
        if error = 0 then\
      UPDATE country_master cm SET cm.name = name, cm.stamp=cm.stamp+1, cm.alias = alias,cm.modified_by = user_id,cm.modified_on = now() where cm.id = id;\
    END if;\
  commit;\
    select * from temp_error_log;\
    select * from country_master cm where cm.id = id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `updateCurrency`(\
    IN id int(11) unsigned,\
    IN user_symbol VARCHAR(60),\
    IN user_name VARCHAR(75),\
    In stamp integer,\
    IN user_shortForm VARCHAR(100),\
    IN user_Decimal_places VARCHAR(50),\
    IN user_Currency_system VARCHAR(50)\
  )\
  BEGIN\
    DECLARE error INTEGER;\
    DECLARE count_name INTEGER;\
    DECLARE count_symbol INTEGER;\
    DECLARE last_insert_id INTEGER;\
    declare is_deleted INT;\
    declare current_stamp INT;  \
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
    WHERE (cd.id<>id and cd.name = user_name) OR LENGTH(user_name) = 0 OR user_name IS NULL;\
  \
    IF count_name > 0 THEN\
        IF LENGTH(user_name) > 0 THEN\
            SET error = 1;\
            INSERT INTO error_table (error_text, error_path) VALUES ('Name already exists', 'name');\
        END IF;\
        IF LENGTH(user_name) = 0 THEN\
            SET error = 1;\
            INSERT INTO error_table (error_text, error_path) VALUES ('Name cannot be empty', 'name');\
        END IF;\
    END IF;\
  \
    \
    SELECT COUNT(*) INTO count_symbol\
    FROM currency_data cd\
    WHERE (cd.id<>id and cd.symbol = user_symbol) OR LENGTH(user_symbol) = 0 OR user_symbol IS NULL;\
  \
    IF count_symbol > 0 THEN\
        IF LENGTH(user_symbol) > 0 THEN\
            SET error = 1;\
            INSERT INTO error_table (error_text, error_path) VALUES ('Symbol already exists', 'symbol');\
        END IF;\
        IF LENGTH(user_symbol) = 0 THEN\
            SET error = 1;\
            INSERT INTO error_table (error_text, error_path) VALUES ('Symbol cannot be empty', 'symbol');\
        END IF;\
    END IF;\
    \
    SELECT COUNT(*) INTO is_deleted FROM currency_data cm WHERE cm.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
          INSERT INTO error_table (error_text, error_path) \
          VALUES ('Record not found', 'refresh');\
        end if;\
        \
        If error = 0 then\
    SELECT cm.stamp INTO current_stamp FROM currency_data cm WHERE cm.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
          INSERT INTO error_table (error_text, error_path) \
          VALUES ('Data is updated, Please refresh the Page!', 'refresh');\
    end if;\
        End if;\
  \
    IF error = 0 THEN\
              \
        update currency_data am set \
      am.name=user_name, \
            am.symbol=user_symbol, \
            am.stamp=am.stamp+1,\
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
  \
  CREATE PROCEDURE `updateDepartment`(\
  IN id int(11) unsigned,\
    IN name varchar(60),\
    In stamp integer,\
    IN user_id integer)\
  BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
    declare error_path varchar(20);\
    DECLARE count_name varchar(60);\
  declare is_deleted INT;\
    declare current_stamp INT;  \
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
      SELECT COUNT(*) INTO is_deleted FROM department_master cm WHERE cm.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
      set error_path = 'refresh';\
      set error_text = 'Record not found';\
        end if;\
        \
        If error = 0 then\
    SELECT cm.stamp INTO current_stamp FROM department_master cm WHERE cm.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
            set error_path = 'refresh';\
            set error_text = 'Data is updated, Please refresh the Page!';\
    end if;\
        End if;\
            \
    if error = 0 then\
      update department_master cm set\
      cm.name=name, cm.stamp=cm.stamp+1, cm.modified_by=user_id, cm.modified_on = now() where cm.id=id;\
    END if;\
    commit;\
  \
  select error, error_path, error_text;\
    select * from department_master cm where cm.id = id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `updateEnquirySource`(\
  IN id int(11) unsigned,\
    IN name varchar(60),\
    IN stamp int,\
    IN user_id integer)\
  BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
    declare error_path varchar(20);\
    DECLARE count_name varchar(60);\
    declare is_deleted integer;\
    declare current_stamp integer;\
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
        SELECT COUNT(*) INTO is_deleted FROM enquiry_source_master am WHERE am.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
      set error_path = 'refresh';\
      set error_text = 'Record not found';\
        end if;\
        If error = 0 then\
    SELECT am.stamp INTO current_stamp FROM enquiry_source_master am WHERE am.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
            set error_path = 'refresh';\
            set error_text = 'Data is updated, Please refresh the Page!';\
    end if;\
        End if;\
  \
    if error = 0 then\
      update enquiry_source_master cm set\
      cm.name=name, cm.stamp=cm.stamp+1, cm.modified_by= user_id, cm.modified_on = now() where cm.id=id;\
    END if;\
    commit;\
  \
  select error, error_path, error_text;\
    select * from enquiry_source_master cm where cm.id = id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `UpdateEnquirySubStatus`(\
  IN id int(11) unsigned,\
    IN name varchar(60),\
    In stamp int, \
    IN user_id integer\
    )\
  BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
    declare error_path varchar(20);\
    DECLARE count_name varchar(60);\
    declare is_deleted integer;\
    declare current_stamp integer;\
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
            SELECT COUNT(*) INTO is_deleted FROM enquiry_sub_status_master am WHERE am.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
      set error_path = 'refresh';\
      set error_text = 'Record not found';\
        end if;\
        \
        If error = 0 then\
    SELECT am.stamp INTO current_stamp FROM enquiry_sub_status_master am WHERE am.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
            set error_path = 'refresh';\
            set error_text = 'Data is updated, Please refresh the Page!';\
    end if;\
        End if;\
              \
    if error = 0 then\
      update enquiry_sub_status_master am set \
        am.name=name, am.stamp=am.stamp+1, am.modified_by=user_id, am.modified_on = now() where am.id=id;\
    END if;\
    commit;\
    \
  select error, error_path, error_text;\
    select * from enquiry_sub_status_master am where am.id = id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `UpdateEnquirySubStatusList`(\
  IN id int(11) unsigned,\
    IN name varchar(60),\
    In stamp int, \
    IN status_id int(11),\
    IN user_id integer\
    )\
  BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
    declare error_path varchar(20);\
    DECLARE count_name varchar(60);\
    declare is_deleted integer;\
    declare current_stamp integer;\
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
            SELECT COUNT(*) INTO is_deleted FROM enquiry_sub_status_master am WHERE am.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
      set error_path = 'refresh';\
      set error_text = 'Record not found';\
        end if;\
        \
        If error = 0 then\
    SELECT am.stamp INTO current_stamp FROM enquiry_sub_status_master am WHERE am.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
            set error_path = 'refresh';\
            set error_text = 'Data is updated, Please refresh the Page!';\
    end if;\
        End if;\
              \
    if error = 0 then\
      update enquiry_sub_status_master am set \
        am.name=name, am.stamp=am.stamp+1, am.enquiry_status_id=status_id, am.modified_by=user_id, am.modified_on = now() where am.id=id;\
    END if;\
    commit;\
    \
  select error, error_path, error_text;\
    select * from enquiry_sub_status_master am where am.id = id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `updateExecutive`(\
  IN id integer,\
    IN alias varchar(60),\
    IN name varchar(60),\
    IN stamp integer,\
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
    IN pan varchar(45),\
    IN aadhaar varchar(45),\
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
    Declare count_pan integer;\
    Declare count_aadhaar integer;\
  declare is_deleted INT;\
    declare current_stamp INT;      \
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
        if length(alias) <> 0 then\
      \
      SELECT COUNT(*) INTO count_alias FROM executive_master em\
      WHERE (em.id <> id AND em.alias = alias );\
      if count_alias > 0 then\
        set error = 1;\
          INSERT INTO error_table (error_text, error_path) \
          VALUES ('Alias already exists', 'alias');\
          \
      END if;\
            \
        SELECT COUNT(*) INTO count_alias FROM executive_master em\
        WHERE (em.id <> id  AND em.name = alias);\
        if count_alias > 0 then\
          set error = 1;\
            INSERT INTO error_table (error_text, error_path) \
            VALUES ('Alias already exists as name', 'alias');\
            \
        END if;\
            END if;\
            \
      if length(pan) <> 0 then\
      \
      SELECT COUNT(*) INTO count_pan FROM executive_master em\
      WHERE (em.id <> id AND em.pan = pan);\
      if count_pan > 0 then\
        set error = 1;\
          INSERT INTO error_table (error_text, error_path) \
          VALUES ('Pan already exists', 'pan');\
      END if;\
        End if;\
        \
        if length(aadhaar) <> 0 then\
      \
      SELECT COUNT(*) INTO count_aadhaar FROM executive_master em\
      WHERE (em.id <> id AND em.aadhaar = aadhaar);\
      if count_aadhaar > 0 then\
        set error = 1;\
          INSERT INTO error_table (error_text, error_path) \
          VALUES ('Aadhaar already exists', 'aadhaar');\
          \
      END if;\
        End if;\
        \
        SELECT COUNT(*) INTO is_deleted FROM executive_master em WHERE em.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
          INSERT INTO error_table (error_text, error_path) \
          VALUES ('Record not found', 'refresh');\
        end if;\
        \
        If error = 0 then\
    SELECT em.stamp INTO current_stamp FROM executive_master em WHERE em.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
          INSERT INTO error_table (error_text, error_path) \
          VALUES ('Data is updated, Please refresh the Page!', 'refresh');\
    end if;\
        End if;  \
        \
      if error = 0 then\
        select ctm.id into var_call_type_id from call_type_master ctm where ctm.name=call_type LOCK IN SHARE MODE;\
                                \
        update executive_master em set\
        em.alias=alias, em.name=name, em.stamp=em.stamp+1, em.address1=address1, em.address2=address2, em.address3=address3, \
                em.city=city, em.state_id=state_id, em.pincode=pincode, em.country_id=country_id, em.email=email,\
                em.mobile=mobile, em.whatsapp=whatsapp, em.modified_by=user_id, em.modified_on=now(), em.dob=dofb,\
                em.doa=dofa, em.doj=dofj, em.pan=pan, em.aadhaar=aadhaar, em.area_id=area_id, em.call_type_id=var_call_type_id, em.crm_user_id = crm_user_id,\
                em.role_id=role_id, em.dept_id=dept_id, em.group_id=group_id where em.id = id;\
    END IF;\
  commit;\
  select * from error_table;\
    select * from executive_master em where em.id = id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `updateExecutiveDept`(\
  IN id int(11) unsigned,\
    IN name varchar(60),\
    In stamp integer,\
    IN user_id integer\
    )\
  BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
    declare error_path varchar(20);\
    DECLARE count_name varchar(60);\
  declare is_deleted INT;\
    declare current_stamp INT;  \
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
    SELECT COUNT(*) INTO is_deleted FROM executive_dept_master cm WHERE cm.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
      set error_path = 'refresh';\
      set error_text = 'Record not found';\
        end if;\
        \
        If error = 0 then\
    SELECT cm.stamp INTO current_stamp FROM executive_dept_master cm WHERE cm.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
            set error_path = 'refresh';\
            set error_text = 'Data is updated, Please refresh the Page!';\
    end if;\
        End if; \
      \
            \
  if error = 0 then\
    update executive_dept_master cm set\
      cm.name=name, cm.stamp=cm.stamp+1, cm.modified_by=user_id, cm.modified_on = now() where cm.id=id;\
  END if;\
    commit;\
  \
  select error, error_path, error_text;\
    select * from executive_dept_master cm where cm.id = id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `updateExecutiveGroup`(\
  IN name varchar(75),\
    In stamp integer, \
  IN alias varchar(75),\
    IN id int(11) unsigned,\
  IN parent_id varchar(75),\
  IN user_id integer)\
  BEGIN\
  DECLARE error integer;\
    DECLARE count_name integer;\
    DECLARE count_alias integer;\
    declare is_deleted integer;\
    declare current_stamp int;\
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
    SELECT COUNT(*) INTO is_deleted FROM executive_group_master egm WHERE egm.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
          INSERT INTO temp_error_log (error_text, error_path) \
          VALUES ('Record not found', 'refresh');\
        end if;\
        \
        If error = 0 then\
    SELECT egm.stamp INTO current_stamp FROM executive_group_master egm WHERE egm.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
          INSERT INTO temp_error_log (error_text, error_path) \
          VALUES ('Data is updated, Please refresh the Page!', 'refresh');\
    end if;\
        End if;\
      \
  if error = 0 then\
    UPDATE executive_group_master egm set egm.name = name, egm.stamp=egm.stamp+1, egm.alias = alias, egm.parent_id = parent_id,egm.modified_by = user_id,egm.modified_on = now() where egm.id = id;\
  END if;\
    commit;\
    \
    select * from temp_error_log;\
    select * from executive_group_master egm where egm.id = id;\
  END ;~\
  \
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
  \
  CREATE PROCEDURE `updateExecutiveRole`(\
  IN id int(11) unsigned,\
    IN name varchar(60),\
    In stamp integer, \
    IN parentId int,\
    IN user_id integer\
    )\
  BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
    declare error_path varchar(20);\
    DECLARE count_name varchar(60);\
    declare is_deleted INT;\
    declare current_stamp INT;\
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
    SELECT COUNT(*) INTO is_deleted FROM executive_role_master rm WHERE rm.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
      set error_path = 'refresh';\
      set error_text = 'Record not found';\
        end if;\
        \
        If error = 0 then\
    SELECT rm.stamp INTO current_stamp FROM executive_role_master rm WHERE rm.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
            set error_path = 'refresh';\
            set error_text = 'Data is updated, Please refresh the Page!';\
    end if;\
        End if;\
            \
  if error = 0 then\
    update executive_role_master rm set\
      rm.name = name, rm.stamp=rm.stamp+1, rm.parent = parentId, rm.modified_by = user_id, rm.modified_on = now() where rm.id=id;\
  END if;\
    commit;\
  \
  select error, error_path, error_text;\
    select * from executive_role_master rm where rm.id = id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `updateItem`(\
  IN id integer,\
    IN name varchar(50),\
    In stamp integer,\
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
    declare is_deleted INT;\
    declare current_stamp INT;\
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
  WHERE (im.id <> id AND im.name = name) OR LENGTH(name) = 0 OR name IS NULL;\
  \
  IF count_name > 0 THEN\
    IF LENGTH(name) > 0 OR name IS NOT NULL THEN \
        SET error = 1;\
        INSERT INTO error_log (error_text, error_path)\
        VALUES ('Name already exists', 'name');\
    END IF;\
    \
    IF LENGTH(name) = 0 OR name IS NULL THEN \
        SET error = 1;\
        INSERT INTO error_log (error_text, error_path)\
        VALUES ('Name cannot be empty', 'name');\
    END IF;\
  END IF;\
  \
  SELECT COUNT(*) INTO count_name\
  FROM item_master im\
  WHERE (im.id <> id AND im.alias = name);\
  \
  IF count_name > 0 THEN\
    SET error = 1;\
    INSERT INTO error_log (error_text, error_path)\
    VALUES ('Name already exists as alias', 'name');\
  END IF;\
  \
  IF LENGTH(alias) <> 0 THEN\
    SELECT COUNT(*) INTO count_alias \
    FROM item_master im\
    WHERE (im.id <> id AND im.alias = alias);\
    \
    IF count_alias > 0 THEN\
        SET error = 1;\
        INSERT INTO error_log (error_text, error_path)\
        VALUES ('Alias already exists', 'alias');\
    END IF;      \
  \
    SELECT COUNT(*) INTO count_alias \
    FROM item_master im\
    WHERE (im.id <> id AND im.name = alias);\
    \
    IF count_alias > 0 THEN\
        SET error = 1;\
        INSERT INTO error_log (error_text, error_path)\
        VALUES ('Alias already exists as name', 'alias');\
    END IF;\
  END IF;\
  \
  SELECT COUNT(*) INTO is_deleted FROM item_master im WHERE im.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
          INSERT INTO error_log (error_text, error_path) \
          VALUES ('Record not found', 'refresh');\
        end if;\
        \
        If error = 0 then\
    SELECT im.stamp INTO current_stamp FROM item_master im WHERE im.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
          INSERT INTO error_log (error_text, error_path) \
          VALUES ('Data is updated, Please refresh the Page!', 'refresh');\
    end if;\
        End if;\
              \
  if error = 0 then\
  UPDATE item_master im\
    SET \
        im.name = name,\
        im.stamp = im.stamp + 1, \
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
  \
  CREATE PROCEDURE `updateItemGroup`(\
  IN id int(11) unsigned,\
    in name varchar(70),\
    in stamp int,\
    in alias varchar(70),\
    in parentId int,\
    IN user_id integer\
    )\
  BEGIN\
  DECLARE error integer;\
    DECLARE count_name varchar(60);\
    DECLARE count_alias varchar(60);\
    DECLARE is_deleted integer;\
    DECLARE current_stamp integer;\
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
  WHERE (am.id <> id AND am.name = name) OR LENGTH(name) = 0 OR name IS NULL;\
  \
  IF count_name > 0 THEN\
    IF LENGTH(name) > 0 OR name IS NOT NULL THEN\
        SET error = 1;\
        INSERT INTO error_table (error_text, error_path) \
        VALUES ('Name already exists', 'name');\
    END IF;\
  \
    IF LENGTH(name) = 0 OR name IS NULL THEN\
        SET error = 1;\
        INSERT INTO error_table (error_text, error_path) \
        VALUES ('Name cannot be empty', 'name');\
    END IF;\
  END IF;\
  \
  SELECT COUNT(*) INTO count_name\
  FROM item_group_master am\
  WHERE (am.id <> id AND am.alias = name);\
  \
  IF count_name > 0 THEN\
    SET error = 1;\
    INSERT INTO error_table (error_text, error_path) \
    VALUES ('Name already exists as alias', 'name');\
  END IF;\
  \
  IF LENGTH(alias) <> 0 THEN\
    SELECT COUNT(*) INTO count_alias \
    FROM item_group_master am\
    WHERE (am.id <> id AND am.alias = alias);\
    \
    IF count_alias > 0 THEN\
        SET error = 1;\
        INSERT INTO error_table (error_text, error_path) \
        VALUES ('Alias already exists', 'alias');\
    END IF;\
  \
    SELECT COUNT(*) INTO count_alias \
    FROM item_group_master am\
    WHERE (am.id <> id AND am.name = alias);\
    \
    IF count_alias > 0 THEN\
        SET error = 1;\
        INSERT INTO error_table (error_text, error_path) \
        VALUES ('Alias already exists as name', 'alias');\
    END IF;\
  END IF;\
  \
  SELECT COUNT(*) INTO is_deleted FROM item_group_master im WHERE im.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
          INSERT INTO error_table (error_text, error_path) \
          VALUES ('Record not found', 'refresh');\
        end if;\
        \
        If error = 0 then\
    SELECT im.stamp INTO current_stamp FROM item_group_master im WHERE im.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
          INSERT INTO error_table (error_text, error_path) \
          VALUES ('Data is updated, Please refresh the Page!', 'refresh');\
    end if;\
        End if;\
              \
    if error = 0 then\
      update item_group_master am set \
      am.name=name, am.stamp=am.stamp+1, am.alias=alias ,am.parent_id=parentId, am.modified_by=user_id, am.modified_on = now() where am.id=id;\
    END if;\
    commit;\
    \
  select * from error_table;\
    select * from item_group_master am where am.id = id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `updateOrganisation`(\
  IN id int(11) unsigned,\
  IN alias VARCHAR(75),\
  IN name VARCHAR(75),\
    In stamp integer,\
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
    declare is_deleted integer;\
    declare current_stamp integer;\
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
        SELECT COUNT(*) INTO is_deleted FROM organisation_master om WHERE om.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
          INSERT INTO temp_error_log (error_text, error_path) \
          VALUES ('Record not found', 'refresh');\
        end if;\
        \
        If error = 0 then\
    SELECT om.stamp INTO current_stamp FROM organisation_master om WHERE om.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
          INSERT INTO temp_error_log (error_text, error_path) \
          VALUES ('Data is updated, Please refresh the Page!', 'refresh');\
    end if;\
        End if;\
        \
    if error = 0 then\
      \
      UPDATE organisation_master om SET  om.name= name, om.stamp=om.stamp+1, om.alias  = alias, om.print_name  = printName,\
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
  \
  CREATE PROCEDURE `updateProduct`(\
  IN id integer,\
    IN name varchar(50),\
    In stamp integer,\
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
    declare is_deleted INT;\
    declare current_stamp INT;\
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
  FROM product_master im\
  WHERE (im.id <> id AND im.name = name) OR LENGTH(name) = 0 OR name IS NULL;\
  \
  IF count_name > 0 THEN\
    IF LENGTH(name) > 0 OR name IS NOT NULL THEN \
        SET error = 1;\
        INSERT INTO error_log (error_text, error_path)\
        VALUES ('Name already exists', 'name');\
    END IF;\
    \
    IF LENGTH(name) = 0 OR name IS NULL THEN \
        SET error = 1;\
        INSERT INTO error_log (error_text, error_path)\
        VALUES ('Name cannot be empty', 'name');\
    END IF;\
  END IF;\
  \
  SELECT COUNT(*) INTO count_name\
  FROM product_master im\
  WHERE (im.id <> id AND im.alias = name);\
  \
  IF count_name > 0 THEN\
    SET error = 1;\
    INSERT INTO error_log (error_text, error_path)\
    VALUES ('Name already exists as alias', 'name');\
  END IF;\
  \
  IF LENGTH(alias) <> 0 THEN\
    SELECT COUNT(*) INTO count_alias \
    FROM product_master im\
    WHERE (im.id <> id AND im.alias = alias);\
    \
    IF count_alias > 0 THEN\
        SET error = 1;\
        INSERT INTO error_log (error_text, error_path)\
        VALUES ('Alias already exists', 'alias');\
    END IF;      \
  \
    SELECT COUNT(*) INTO count_alias \
    FROM product_master im\
    WHERE (im.id <> id AND im.name = alias);\
    \
    IF count_alias > 0 THEN\
        SET error = 1;\
        INSERT INTO error_log (error_text, error_path)\
        VALUES ('Alias already exists as name', 'alias');\
    END IF;\
  END IF;\
  \
  SELECT COUNT(*) INTO is_deleted FROM product_master im WHERE im.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
          INSERT INTO error_log (error_text, error_path) \
          VALUES ('Record not found', 'refresh');\
        end if;\
        \
        If error = 0 then\
    SELECT im.stamp INTO current_stamp FROM product_master im WHERE im.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
          INSERT INTO error_log (error_text, error_path) \
          VALUES ('Data is updated, Please refresh the Page!', 'refresh');\
    end if;\
        End if;\
              \
  if error = 0 then\
  UPDATE product_master im\
    SET \
        im.name = name,\
        im.stamp = im.stamp + 1, \
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
            VALUES ('Product not found or no changes made', 'id');\
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
    product_master im\
  WHERE\
    im.id = id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `updateProductGroup`(\
  IN id int(11) unsigned,\
    in name varchar(70),\
    in stamp int,\
    in alias varchar(70),\
    in parentId int,\
    IN user_id integer\
    )\
  BEGIN\
  DECLARE error integer;\
    DECLARE count_name varchar(60);\
    DECLARE count_alias varchar(60);\
    DECLARE is_deleted integer;\
    DECLARE current_stamp integer;\
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
  FROM product_group_master am\
  WHERE (am.id <> id AND am.name = name) OR LENGTH(name) = 0 OR name IS NULL;\
  \
  IF count_name > 0 THEN\
    IF LENGTH(name) > 0 OR name IS NOT NULL THEN\
        SET error = 1;\
        INSERT INTO error_table (error_text, error_path) \
        VALUES ('Name already exists', 'name');\
    END IF;\
  \
    IF LENGTH(name) = 0 OR name IS NULL THEN\
        SET error = 1;\
        INSERT INTO error_table (error_text, error_path) \
        VALUES ('Name cannot be empty', 'name');\
    END IF;\
  END IF;\
  \
  SELECT COUNT(*) INTO count_name\
  FROM product_group_master am\
  WHERE (am.id <> id AND am.alias = name);\
  \
  IF count_name > 0 THEN\
    SET error = 1;\
    INSERT INTO error_table (error_text, error_path) \
    VALUES ('Name already exists as alias', 'name');\
  END IF;\
  \
  IF LENGTH(alias) <> 0 THEN\
    SELECT COUNT(*) INTO count_alias \
    FROM product_group_master am\
    WHERE (am.id <> id AND am.alias = alias);\
    \
    IF count_alias > 0 THEN\
        SET error = 1;\
        INSERT INTO error_table (error_text, error_path) \
        VALUES ('Alias already exists', 'alias');\
    END IF;\
  \
    SELECT COUNT(*) INTO count_alias \
    FROM product_group_master am\
    WHERE (am.id <> id AND am.name = alias);\
    \
    IF count_alias > 0 THEN\
        SET error = 1;\
        INSERT INTO error_table (error_text, error_path) \
        VALUES ('Alias already exists as name', 'alias');\
    END IF;\
  END IF;\
  \
  SELECT COUNT(*) INTO is_deleted FROM product_group_master im WHERE im.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
          INSERT INTO error_table (error_text, error_path) \
          VALUES ('Record not found', 'refresh');\
        end if;\
        \
        If error = 0 then\
    SELECT im.stamp INTO current_stamp FROM product_group_master im WHERE im.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
          INSERT INTO error_table (error_text, error_path) \
          VALUES ('Data is updated, Please refresh the Page!', 'refresh');\
    end if;\
        End if;\
              \
    if error = 0 then\
      update product_group_master am set \
      am.name=name, am.stamp=am.stamp+1, am.alias=alias ,am.parent_id=parentId, am.modified_by=user_id, am.modified_on = now() where am.id=id;\
    END if;\
    commit;\
    \
  select * from error_table;\
    select * from product_group_master am where am.id = id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `updateState`(\
  IN name varchar(75),\
    In stamp integer,\
    IN id int(11) unsigned,\
    IN alias varchar(45),\
    IN country_id int(11) unsigned,\
    IN user_id integer)\
  BEGIN\
  DECLARE error integer;\
    declare count_name integer;\
    declare count_alias integer;\
    declare is_deleted integer;\
    declare current_stamp integer;\
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
            \
            SELECT COUNT(*) INTO is_deleted FROM state_master sm WHERE sm.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
          INSERT INTO temp_error_log (error_text, error_path) \
          VALUES ('Record not found', 'refresh');\
        end if;\
        \
        If error = 0 then\
    SELECT sm.stamp INTO current_stamp FROM state_master sm WHERE sm.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
          INSERT INTO temp_error_log (error_text, error_path) \
          VALUES ('Data is updated, Please refresh the Page!', 'refresh');\
    end if;\
        End if;\
        \
        if error = 0 then\
      UPDATE state_master sm SET sm.name = name, sm.stamp = sm.stamp +1, sm.alias = alias,sm.modified_by = user_id,sm.modified_on = now(), sm.country_id = country_id where sm.id = id;\
    END if;\
  commit;\
    select * from temp_error_log;\
    select * from state_master sm where sm.id = id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `updateSupportAction`(\
  IN id int(11) unsigned,\
    IN name varchar(60),\
    IN stamp integer,\
    IN user_id integer\
    )\
  BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
    declare error_path varchar(20);\
    DECLARE count_name varchar(60);\
    declare is_deleted INT;\
    declare current_stamp INT;\
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
    ticket_action_master am\
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
    SELECT COUNT(*) INTO is_deleted FROM ticket_action_master am WHERE am.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
      set error_path = 'refresh';\
      set error_text = 'Record not found';\
        end if;\
        \
        If error = 0 then\
    SELECT am.stamp INTO current_stamp FROM ticket_action_master am WHERE am.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
            set error_path = 'refresh';\
            set error_text = 'Data is updated, Please refresh the Page!';\
    end if;\
        End if;\
              \
    if error = 0 then\
      update ticket_action_master am set \
        am.name=name, am.stamp= am.stamp+1, am.modified_by=(user_id), am.modified_on = now() where am.id=id;\
      end if;\
    commit;\
    \
  SELECT error, error_path, error_text;\
  SELECT \
    *\
  FROM\
    ticket_action_master am\
  WHERE\
    am.id = id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `updateSupportCategory`(\
  IN id int(11) unsigned,\
    IN name varchar(60),\
    IN stamp integer,\
    IN user_id integer\
    )\
  BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
    declare error_path varchar(20);\
    DECLARE count_name varchar(60);\
  declare is_deleted INT;\
    declare current_stamp INT;\
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
  FROM ticket_category_master cm\
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
    SELECT COUNT(*) INTO is_deleted FROM ticket_category_master cm WHERE cm.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
      set error_path = 'refresh';\
      set error_text = 'Record not found';\
        end if;\
        \
        If error = 0 then\
    SELECT cm.stamp INTO current_stamp FROM ticket_category_master cm WHERE cm.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
            set error_path = 'refresh';\
            set error_text = 'Data is updated, Please refresh the Page!';\
    end if;\
        End if;\
            \
  if error = 0 then\
  update ticket_category_master cm set\
        cm.name=name, cm.stamp=cm.stamp+1, cm.modified_by=(user_id), cm.modified_on = now() where cm.id=id;\
  END if;\
    commit;\
  \
  select error, error_path, error_text;\
    select * from ticket_category_master cm where cm.id = id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `UpdateSupportSubStatus`(\
  IN id int(11) unsigned,\
    IN name varchar(60),\
    In stamp int, \
    IN user_id integer\
    )\
  BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
    declare error_path varchar(20);\
    DECLARE count_name varchar(60);\
    declare is_deleted integer;\
    declare current_stamp integer;\
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
    FROM ticket_sub_status_master am\
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
            SELECT COUNT(*) INTO is_deleted FROM ticket_sub_status_master am WHERE am.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
      set error_path = 'refresh';\
      set error_text = 'Record not found';\
        end if;\
        \
        If error = 0 then\
    SELECT am.stamp INTO current_stamp FROM ticket_sub_status_master am WHERE am.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
            set error_path = 'refresh';\
            set error_text = 'Data is updated, Please refresh the Page!';\
    end if;\
        End if;\
              \
    if error = 0 then\
      update ticket_sub_status_master am set \
        am.name=name, am.stamp=am.stamp+1, am.modified_by=user_id, am.modified_on = now() where am.id=id;\
    END if;\
    commit;\
    \
  select error, error_path, error_text;\
    select * from ticket_sub_status_master am where am.id = id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `UpdateSupportSubStatusList`(\
  IN id int(11) unsigned,\
    IN name varchar(60),\
    In stamp int, \
    IN status_id int(11),\
    IN user_id integer\
    )\
  BEGIN\
  DECLARE error_text varchar(70);\
  DECLARE error integer;\
    declare error_path varchar(20);\
    DECLARE count_name varchar(60);\
    declare is_deleted integer;\
    declare current_stamp integer;\
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
    FROM ticket_sub_status_master am\
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
            SELECT COUNT(*) INTO is_deleted FROM ticket_sub_status_master am WHERE am.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
      set error_path = 'refresh';\
      set error_text = 'Record not found';\
        end if;\
        \
        If error = 0 then\
    SELECT am.stamp INTO current_stamp FROM ticket_sub_status_master am WHERE am.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
            set error_path = 'refresh';\
            set error_text = 'Data is updated, Please refresh the Page!';\
    end if;\
        End if;\
              \
    if error = 0 then\
      update ticket_sub_status_master am set \
        am.name=name, am.stamp=am.stamp+1, am.ticket_status_id=status_id, am.modified_by=user_id, am.modified_on = now() where am.id=id;\
    END if;\
    commit;\
    \
  select error, error_path, error_text;\
    select * from ticket_sub_status_master am where am.id = id;\
  END ;~\
  \
  \
  \
  CREATE PROCEDURE `updateSupportTicket`(\
    IN header_id INTEGER,\
    IN tkt_number VARCHAR(75),\
    IN date VARCHAR(20),\
    IN contact_id INTEGER,\
    IN received_by_id INTEGER,\
    IN category_id INTEGER,\
    IN call_receipt_remark VARCHAR(5000),\
    IN allocated_to_id INTEGER,\
    IN status_id INTEGER,\
    IN sub_status_id INTEGER,\
    IN action_taken_id INTEGER,\
    IN next_action_id INTEGER,\
    IN next_action_date VARCHAR(20),\
    IN suggested_action_remark VARCHAR(5000),\
    IN action_taken_remark VARCHAR(5000),\
    IN closure_remark VARCHAR(5000),\
    IN ticket_tran_type INT,\
    IN created_by INT,\
    IN modified_by INT,\
    IN products_json JSON,\
    IN stamp INTEGER\
  )\
  BEGIN\
    DECLARE error INTEGER DEFAULT 0;\
    DECLARE error_text VARCHAR(70);\
    DECLARE error_path VARCHAR(20);\
    DECLARE product_count INT;\
    DECLARE idx INT DEFAULT 0;\
    DECLARE current_stamp INT;\
    DECLARE ledger_insert_id INT;\
    DECLARE count_h INT;\
  \
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL;\
    END;\
  \
    START TRANSACTION;\
  \
    DROP TABLE IF EXISTS error_log;\
    CREATE TEMPORARY TABLE error_log (\
        id INT AUTO_INCREMENT PRIMARY KEY,\
        error_text VARCHAR(70),\
        error_path VARCHAR(20)\
    );\
    SET error =0;\
    SET count_h =0;\
    IF error = 0 THEN\
        SELECT COUNT(*) INTO count_h\
        FROM ticket_header_tran \
        WHERE id = header_id;\
  \
        IF count_h = 0 THEN\
          SET error=1;\
            SET error_text = 'Record not found';\
            SET error_path = 'refresh';\
            INSERT INTO error_log (error_text, error_path) VALUES (error_text, error_path);\
        END IF;\
    END IF;\
  \
    IF error = 0 THEN\
        SELECT tht.stamp INTO current_stamp \
        FROM ticket_header_tran tht \
        WHERE tht.id = header_id;\
        IF current_stamp <> stamp THEN\
            SET error = 1;\
            SET error_text = 'Data is updated, please refresh the page!';\
            SET error_path = 'refresh';\
            INSERT INTO error_log (error_text, error_path) VALUES (error_text, error_path);\
        END IF;\
    END IF;\
  \
    IF error = 0 THEN\
        UPDATE ticket_header_tran\
        SET\
            tkt_number = tkt_number,\
            date = date,\
            contact_id = contact_id,\
            received_by_id = received_by_id,\
            category_id = category_id,\
            call_receipt_remark = call_receipt_remark,\
            modified_by = modified_by,\
            modified_on = NOW(),\
            created_by = created_by,\
            stamp = current_stamp + 1 \
        WHERE id = header_id;\
    END IF;\
  \
    IF error = 0 THEN\
        INSERT INTO ticket_ledger_tran\
        (ticket_id, status_version, allocated_to, date, status_id, sub_status_id, action_taken_id, next_action_id, next_action_date, \
        suggested_action_remark, action_taken_remark, closure_remark, ticket_tran_type_id, created_by, active, modified_by)\
        VALUES\
        (header_id, 0, allocated_to_id, date, status_id, sub_status_id, action_taken_id, next_action_id, next_action_date,\
        suggested_action_remark, action_taken_remark, closure_remark, ticket_tran_type, created_by, 1, modified_by);\
        \
        SET ledger_insert_id = LAST_INSERT_ID();\
    END IF;\
  \
    IF error = 0 THEN\
        SET product_count = JSON_LENGTH(products_json);\
        SET SQL_SAFE_UPDATES = 0;\
  \
        DELETE FROM ticket_product_tran WHERE ticket_id = header_id;\
    SET SQL_SAFE_UPDATES = 1;\
  \
        WHILE idx < product_count DO\
            INSERT INTO ticket_product_tran (ticket_id, slno, product_id)\
            VALUES (\
                header_id,\
                JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].id'))),\
                JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].product_id')))\
            );\
            SET idx = idx + 1;\
        END WHILE;\
    END IF;\
    commit;\
  \
    SELECT * FROM error_log;\
    SELECT * FROM ticket_header_tran h WHERE h.id = header_id;\
    SELECT * FROM ticket_ledger_tran WHERE id = ledger_insert_id; \
  END ;~\
  \
  CREATE PROCEDURE `updateUnit`(\
    IN id int(11) unsigned,\
    IN name varchar(50),\
    In stamp integer,\
  IN user_id integer)\
  BEGIN\
  DECLARE error integer;\
    DECLARE count_name varchar(60);\
    declare is_deleted integer;\
    declare current_stamp integer;\
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
        SELECT COUNT(*) INTO is_deleted FROM unit_master um WHERE um.id = id;\
    if is_deleted < 1 then\
      set error = 1;\
          INSERT INTO error_table (error_text, error_path) \
          VALUES ('Record not found', 'refresh');\
        end if;\
        \
        If error = 0 then\
    SELECT um.stamp INTO current_stamp FROM unit_master um WHERE um.id = id;\
        if current_stamp != stamp then \
      set error = 1;\
          INSERT INTO error_table (error_text, error_path) \
          VALUES ('Data is updated, Please refresh the Page!', 'refresh');\
    end if;\
        End if;\
    \
    if error = 0 then\
      update unit_master um set \
      um.name=name, um.stamp=um.stamp+1, um.modified_by=user_id, um.modified_on = now() where um.id=id;\
    END if;\
    commit;\
    \
  select * from error_table;\
    select * from unit_master um where um.id = id;\
END ;~\
CREATE PROCEDURE `createConfig`(\
	IN enquiryData varchar(5000),\
  IN supportData varchar(5000),\
  IN contractData varchar(5000),\
  IN regionalSettingData varchar(5000),\
  IN searchNavbarData varchar(5000),\
  IN searchContactData varchar(5000),\
  IN searchExecutiveData varchar(5000),\
  IN searchOrganisationData varchar(5000)\
)\
BEGIN\
  DECLARE enquiryId integer Default NULL;\
  DECLARE supportId integer Default NULL;\
  DECLARE contractId integer Default NULL;\
  DECLARE regionalSettingId integer Default NULL;\
  DECLARE searchNavbarId integer Default NULL;\
  DECLARE searchContactId integer Default NULL;\
  DECLARE searchExecutiveId integer Default NULL;\
  DECLARE searchOrganisationId integer Default NULL;\
  DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END;\
  \
  Start Transaction;\
	Insert into config_meta_data (config_type) values ('enquiry');\
    set enquiryId = LAST_INSERT_ID();\
    Insert into config_meta_data (config_type) values ('support');\
    set supportId = LAST_INSERT_ID();\
    Insert into config_meta_data (config_type) values ('contract');\
    set contractId = LAST_INSERT_ID();\
    Insert into config_meta_data (config_type) values ('regionalSetting');\
    set regionalSettingId = LAST_INSERT_ID();\
    Insert into config_meta_data (config_type) values ('searchNavbar');\
    set searchNavbarId = LAST_INSERT_ID();\
    Insert into config_meta_data (config_type) values ('searchContact');\
    set searchContactId = LAST_INSERT_ID();\
    Insert into config_meta_data (config_type) values ('searchExecutive');\
    set searchExecutiveId = LAST_INSERT_ID();\
    Insert into config_meta_data (config_type) values ('searchOrganisation');\
    set searchOrganisationId = LAST_INSERT_ID();\
    \
	INSERT into app_config (config_type_id, enabled, config) values (enquiryId, 1, enquiryData), \
    (supportId, 1, supportData), (contractId, 0, contractData), (regionalSettingId, 1, regionalSettingData), \
    (searchNavbarId, 1, searchNavbarData), (searchContactId, 1, searchContactData), \
    (searchExecutiveId, 1, searchExecutiveData), (searchOrganisationId, 1, searchOrganisationData);\
  Commit;\
END;";
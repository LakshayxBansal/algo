export const dbTableAndProScript =
  "CREATE TABLE `allocation_type_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `name` varchar(50) DEFAULT NULL,\
  `stamp` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  `created_by` int(11) unsigned DEFAULT NULL,\
  `modified_by` int(11) unsigned DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `app_config` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `config_type_id` int(11) NOT NULL,\
  `enabled` int(11) NOT NULL,\
  `config` varchar(5000) NOT NULL,\
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
CREATE TABLE `callExplorer_metaData` (\
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\
  `user_id` int(11) DEFAULT NULL,\
  `meta_data` longtext DEFAULT NULL,\
  `object_type_id` int(11) DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
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
CREATE TABLE `config_dept_mapping` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `config_id` int(11) NOT NULL,\
  `dept_id` int(11) NOT NULL,\
  PRIMARY KEY (`id`)\
);~\
CREATE TABLE `config_meta_data` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `config_type` varchar(100) NOT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `config_type_UNIQUE` (`config_type`)\
);~\
CREATE TABLE `contact_group_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `alias` varchar(60) DEFAULT '',\
  `name` varchar(60) NOT NULL DEFAULT '',\
  `stamp` smallint(6) DEFAULT 0,\
  `parent_id` int(11) unsigned DEFAULT 0,\
  `created_by` int(11) unsigned DEFAULT 0,\
  `modified_by` int(11) unsigned DEFAULT 0,\
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
  `currency_string` varchar(45) DEFAULT NULL,\
  `currency_substring` varchar(45) DEFAULT NULL,\
  `currency_character` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,\
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
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `column_type` varchar(45) NOT NULL,\
  PRIMARY KEY (`id`)\
);~\
CREATE TABLE `custom_fields_data` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `c_col1` longtext DEFAULT NULL,\
  `c_col2` longtext DEFAULT NULL,\
  `c_col3` longtext DEFAULT NULL,\
  `c_col4` longtext DEFAULT NULL,\
  `c_col5` longtext DEFAULT NULL,\
  `c_col6` longtext DEFAULT NULL,\
  `c_col7` longtext DEFAULT NULL,\
  `c_col8` longtext DEFAULT NULL,\
  `c_col9` longtext DEFAULT NULL,\
  `c_col10` longtext DEFAULT NULL,\
  `object_id` int(11) unsigned NOT NULL,\
  `object_type_id` int(11) unsigned NOT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`),\
  UNIQUE KEY `object_id_UNIQUE` (`object_id`,`object_type_id`)\
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
  `action_id` int(11) NOT NULL,\
  `is_disabled` int(11) NOT NULL,\
  `default_column_label` varchar(45) DEFAULT NULL,\
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
  `voucher_number` varchar(45) DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `enquiry_ledger_tran` (\
  `enquiry_id` int(11) unsigned DEFAULT NULL,\
  `status_version` int(11) DEFAULT NULL,\
  `allocated_to` int(11) unsigned DEFAULT NULL,\
  `date` datetime DEFAULT NULL,\
  `status_id` int(11) unsigned DEFAULT NULL,\
  `sub_status_id` int(11) unsigned DEFAULT NULL,\
  `action_taken_id` int(11) unsigned DEFAULT NULL,\
  `next_action_id` int(11) unsigned DEFAULT NULL,\
  `next_action_date` datetime DEFAULT NULL,\
  `suggested_action_remark` text DEFAULT NULL,\
  `action_taken_remark` text DEFAULT NULL,\
  `closure_remark` text DEFAULT NULL,\
  `enquiry_tran_type_id` int(11) unsigned DEFAULT NULL,\
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\
  `active` int(11) NOT NULL DEFAULT 1,\
  `modified_on` datetime DEFAULT NULL,\
  `modified_by` int(11) unsigned DEFAULT NULL,\
  `created_by` int(11) unsigned NOT NULL,\
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
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `enquiry_id` int(11) DEFAULT NULL,\
  `slno` int(11) DEFAULT NULL,\
  `product_id` int(11) unsigned DEFAULT NULL,\
  `quantity` decimal(20,4) DEFAULT NULL,\
  `unit_id` int(11) unsigned DEFAULT NULL,\
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
  `state_id` int(11) unsigned DEFAULT NULL,\
  `pincode` varchar(15) DEFAULT NULL,\
  `country_id` int(11) unsigned DEFAULT NULL,\
  `email` varchar(100) DEFAULT NULL,\
  `mobile` varchar(20) DEFAULT NULL,\
  `whatsapp` varchar(20) DEFAULT NULL,\
  `created_by` int(11) unsigned DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_by` int(11) unsigned DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  `stamp` int(11) DEFAULT NULL,\
  `dob` datetime DEFAULT NULL,\
  `doa` datetime DEFAULT NULL,\
  `doj` datetime DEFAULT NULL,\
  `area_id` int(11) unsigned DEFAULT NULL,\
  `call_type_id` int(11) unsigned DEFAULT NULL,\
  `crm_user_id` int(11) unsigned DEFAULT NULL,\
  `role_id` int(11) unsigned DEFAULT NULL,\
  `dept_id` int(11) unsigned DEFAULT NULL,\
  `group_id` int(11) unsigned DEFAULT NULL,\
  `profile_img` varchar(100) DEFAULT NULL,\
  `pan` varchar(45) DEFAULT NULL,\
  `aadhaar` varchar(45) DEFAULT NULL,\
  PRIMARY KEY (`id`) USING BTREE,\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `executive_role_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `name` varchar(60) NOT NULL DEFAULT '',\
  `level` int(11) NOT NULL DEFAULT 0,\
  `stamp` smallint(6) NOT NULL DEFAULT 0,\
  `created_by` int(11) NOT NULL DEFAULT 0,\
  `modified_by` int(11) NOT NULL DEFAULT 0,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  PRIMARY KEY (`id`) USING BTREE,\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `grid_metaData` (\
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\
  `user_id` int(11) DEFAULT NULL,\
  `meta_data` longtext DEFAULT NULL,\
  `object_type_id` int(11) DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`),\
  UNIQUE KEY `object_unique_key` (`user_id`,`object_type_id`)\
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
CREATE TABLE `my_settings_config` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `navbar_search_config` varchar(3500) DEFAULT NULL,\
  `contact_search_config` varchar(3300) DEFAULT NULL,\
  `executive_search_config` varchar(3500) DEFAULT NULL,\
  `organisation_search_config` varchar(3500) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  PRIMARY KEY (`id`)\
);~\
CREATE TABLE `object_category_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `name` varchar(45) NOT NULL,\
  PRIMARY KEY (`id`)\
);~\
CREATE TABLE `object_docs_table` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `description` varchar(255) NOT NULL,\
  `doc_id` varchar(60) NOT NULL,\
  `object_id` int(11) NOT NULL,\
  `object_type_id` int(11) NOT NULL,\
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
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `name` varchar(45) NOT NULL,\
  `type` int(11) unsigned NOT NULL,\
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
CREATE TABLE `quotation_header_tran` (\
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\
  `date` date DEFAULT NULL,\
  `contact_id` int(10) unsigned DEFAULT NULL,\
  `quotation_type_id` int(10) unsigned DEFAULT NULL,\
  `quotation_format_id` int(10) unsigned DEFAULT NULL,\
  `created_by` int(10) unsigned DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_by` int(10) unsigned DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  `quotation_object_docs_id` int(10) unsigned DEFAULT NULL,\
  PRIMARY KEY (`id`)\
);~\
CREATE TABLE `quotation_ledger_tran` (\
  `id` int(10) unsigned NOT NULL,\
  `quotation_id` int(10) unsigned DEFAULT NULL,\
  `quotation_row_number` int(11) DEFAULT NULL,\
  `product_id` int(10) unsigned DEFAULT NULL,\
  `product_description` varchar(2000) DEFAULT NULL,\
  `price` float DEFAULT NULL,\
  `tax` float DEFAULT NULL,\
  `unit_id` int(10) unsigned DEFAULT NULL,\
  `discount` float DEFAULT NULL,\
  `qty` float DEFAULT NULL,\
  `amount` float DEFAULT NULL,\
  `quotation_row_type` int(10) unsigned DEFAULT NULL,\
  `quotation_sundry_id` int(10) unsigned DEFAULT NULL,\
  `quotation_sundry_amount` float DEFAULT NULL,\
  `created_by` int(10) unsigned DEFAULT NULL,\
  `modified_by` int(10) unsigned DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
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
  `voucher_number` varchar(45) DEFAULT NULL,\
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
  `modified_on` datetime DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `id_UNIQUE` (`id`)\
);~\
CREATE TABLE `ticket_product_tran` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `ticket_id` int(11) unsigned DEFAULT NULL,\
  `slno` int(11) DEFAULT NULL,\
  `product_id` int(11) unsigned DEFAULT NULL,\
  `quantity` decimal(20,4) DEFAULT NULL,\
  `unit_id` int(11) unsigned DEFAULT NULL,\
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
CREATE TABLE `ticket_tran_type_master` (\
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
CREATE TABLE `trans_types_masters` (\
  `id` int(11) NOT NULL,\
  `short_name` varchar(30) DEFAULT NULL,\
  `full_name` varchar(60) DEFAULT NULL,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `short_name` (`short_name`) USING BTREE\
);~\
CREATE TABLE `unit_master` (\
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\
  `name` varchar(50) DEFAULT NULL,\
  `stamp` int(11) DEFAULT NULL,\
  `created_on` datetime DEFAULT NULL,\
  `modified_on` datetime DEFAULT NULL,\
  `created_by` int(11) DEFAULT NULL,\
  `modified_by` int(11) DEFAULT NULL,\
  PRIMARY KEY (`id`)\
);~\
INSERT INTO `call_type_master`(`name`,`stamp`,`created_by`,`modified_by`,`created_on`,`modified_on`)\
 VALUES('Enquiry', 0, 0, 0, UTC_TIMESTAMP(), NULL);~\
INSERT INTO `country_master` VALUES (1,'AF','Afghanistan',9,NULL,1,NULL,UTC_TIMESTAMP(),'؋','Afghani','AFN',NULL,'DD-MM-YYYY',NULL),(2,'AX','Aland Islands1',4,NULL,1,NULL,UTC_TIMESTAMP(),NULL,NULL,NULL,NULL,NULL,NULL),(3,'AL','Albania',1,NULL,NULL,NULL,NULL,'Lek','Lek','ALL',NULL,'DD/MM/YYYY',NULL),\
 (4,'ALG','Algeria',2,NULL,1,NULL,UTC_TIMESTAMP(),NULL,NULL,NULL,NULL,NULL,NULL),(5,'AS','American Samoa',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'AD','Andorra',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,'AO','Angola',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (8,'AI','Anguilla',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,'AQ','Antarctica',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,'AG','Antigua and Barbuda',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,'AR','Argentina',1,NULL,NULL,NULL,NULL,'$','Peso','ARS',NULL,NULL,NULL),\
 (12,'AM','Armenia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,'AW','Aruba',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,'AU','Australia',1,NULL,NULL,NULL,NULL,'$','Dollar','AUD',NULL,NULL,NULL),(15,'AT','Austria',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (16,'AZ','Azerbaijan',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,'BS','Bahamas',1,NULL,NULL,NULL,NULL,'$','Dollar','BSD',NULL,NULL,NULL),(18,'BH','Bahrain',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,'BD','Bangladesh',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (20,'BB','Barbados',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(21,'BY','Belarus',1,NULL,NULL,NULL,NULL,'Br','Ruble','BYN',NULL,'DD.MM.YYYY',NULL),(22,'BE','Belgium',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(23,'BZ','Belize',1,NULL,NULL,NULL,NULL,'BZ$','Dollar','BZD',NULL,NULL,NULL),\
 (24,'BJ','Benin',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(25,'BM','Bermuda',1,NULL,NULL,NULL,NULL,'$','Dollar','BMD',NULL,NULL,NULL),(26,'BT','Bhutan',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(27,'BO','Bolivia',1,NULL,NULL,NULL,NULL,'$b','Bolíviano','BOB',NULL,NULL,NULL),\
 (28,'BA','Bosnia and Herzegovina',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(29,'BW','Botswana',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(30,'BV','Bouvet Island',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(31,'BR','Brazil',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (32,'IO','British Indian Ocean Territory',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(33,'BN','Brunei Darussalam',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(34,'BG','Bulgaria',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(35,'BF','Burkina Faso',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (36,'BI','Burundi',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(37,'KH','Cambodia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(38,'CM','Cameroon',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(39,'CA','Canada',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(40,'CV','Cape Verde',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (41,'KY','Cayman Islands',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(42,'CF','Central African Republic',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(43,'TD','Chad',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(44,'CL','Chile',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(45,'CN','China',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (46,'CX','Christmas Island',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(47,'CC','Cocos (Keeling) Islands',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(48,'CO','Colombia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(49,'KM','Comoros',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (50,'CG','Congo',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(51,'CD','Congo, Democratic Republic of the',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(52,'CK','Cook Islands',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(53,'CR','Costa Rica',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (54,'CI','C“te d\\'Ivoire',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(55,'HR','Croatia (Hrvatska)',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(56,'CU','Cuba',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(57,'CW','Cura‡ao',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(58,'CY','Cyprus',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (59,'CZ','Czech Republic',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(60,'CS','Czechoslovakia (former)1',1,NULL,1,NULL,UTC_TIMESTAMP(),NULL,NULL,NULL,NULL,NULL,NULL),(61,'KP','Democratic People\\'s Republic of Korea',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(62,'DK','Denmark',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (63,'DJ','Djibouti',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(64,'DM','Dominica',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(65,'DO','Dominican Republic1',1,NULL,1,NULL,UTC_TIMESTAMP(),NULL,NULL,NULL,NULL,NULL,NULL),(66,'TP','East Timor',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(67,'EC','Ecuador',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (68,'EG','Egypt',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(69,'SV','El Salvador',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(70,'GQ','Equatorial Guinea',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(71,'ER','Eritrea',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(72,'EE','Estonia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (73,'ET','Ethiopia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(74,'EU','European Union',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(75,'FK','Falkland Islands (Malvinas)',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(76,'FO','Faroe Islands',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (77,'FM','Federated States of Micronesia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(78,'FJ','Fiji',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(79,'FI','Finland',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(80,'FR','France',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (81,'GF','French Guiana',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(82,'PF','French Polynesia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(83,'TF','French Southern Territories',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(84,'GA','Gabon',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (85,'GM','Gambia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(86,'GE','Georgia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(87,'DE','Germany',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(88,'GH','Ghana',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(89,'GI','Gibraltar',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (90,'GR','Greece',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(91,'GL','Greenland',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(92,'GD','Grenada',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(93,'GP','Guadeloupe',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(94,'GU','Guam',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (95,'GT','Guatemala',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(96,'GG','Guernsey',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(97,'GN','Guinea',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(98,'GW','Guinea-Bissau',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(99,'GY','Guyana',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (100,'HT','Haiti',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(101,'HM','Heard Island and McDonald Islands',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(102,'VA','Holy See',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(103,'HN','Honduras',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(104,'HK','Hong Kong',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (105,'HU','Hungary',1,NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL),(106,'IS','Iceland',1,NULL,NULL,NULL,NULL,'kr','Krona','ISK','is','DD.MM.YYYY',NULL),(107,'IN','India',1,NULL,NULL,NULL,NULL,'₹','Rupee','INR','en-in','DD-MM-YYYY','Rs'),(108,'ID','Indonesia',1,NULL,NULL,NULL,NULL,NULL,'Rupiah','IDR',NULL,NULL,NULL),(109,'IQ','Iraq',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (110,'IE','Ireland',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(111,'IR','Islamic Republic of Iran',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(112,'IM','Isle of Man',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(113,'IL','Israel',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(114,'IT','Italy',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (115,'JM','Jamaica',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(116,'JP','Japan',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(117,'JE','Jersey',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(118,'JO','Jordan',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(119,'KZ','Kazakhstan',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (120,'KE','Kenya',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(121,'KI','Kiribati',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(122,'XK','Kosovo',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(123,'KW','Kuwait',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(124,'KG','Kyrgyzstan',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (125,'LA','Lao People\\'s Democratic Republic',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(126,'LV','Latvia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(127,'LB','Lebanon',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(128,'LS','Lesotho',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (129,'LR','Liberia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(130,'LY','Libyan Arab Jamahiriya',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(131,'LI','Liechtenstein',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(132,'LT','Lithuania',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(133,'LU','Luxembourg',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (134,'MO','Macau',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(135,'MG','Madagascar',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(136,'MW','Malawi',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(137,'MY','Malaysia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(138,'MV','Maldives',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (139,'ML','Mali',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(140,'MT','Malta',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(141,'MH','Marshall Islands',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(142,'MQ','Martinique',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(143,'MR','Mauritania',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (144,'MU','Mauritius',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(145,'YT','Mayotte',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(146,'MX','Mexico',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(147,'MC','Monaco',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(148,'MN','Mongolia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (149,'ME','Montenegro',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(150,'MS','Montserrat',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(151,'MA','Morocco',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(152,'MZ','Mozambique',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(153,'MM','Myanmar',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (154,'NA','Namibia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(155,'NR','Nauru',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(156,'NP','Nepal',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(157,'NL','Netherlands',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(158,'AN','Netherlands Antilles',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (159,'NT','Neutral Zone',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(160,'NC','New Caledonia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(161,'NZ','New Zealand',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(162,'NI','Nicaragua',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(163,'NE','Niger',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (164,'NG','Nigeria',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(165,'NU','Niue',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(166,'NF','Norfolk Island',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(167,'MP','Northern Mariana Islands',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(168,'NO','Norway',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (169,'OM','Oman',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(170,'PK','Pakistan',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(171,'PW','Palau',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(172,'PS','Palestinian Territory, Occupied',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(173,'PA','Panama',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (174,'PG','Papua New Guinea',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(175,'PY','Paraguay',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(176,'PE','Peru',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(177,'PH','Philippines',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(178,'PN','Pitcairn',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (179,'PL','Poland',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(180,'PT','Portugal',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(181,'PR','Puerto Rico',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(182,'QA','Qatar',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(183,'KR','Republic of Korea',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (184,'MD','Republic of Moldova',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(185,'RE','Reunion',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(186,'RO','Romania',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(187,'RU','Russian Federation',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(188,'RW','Rwanda',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (189,'SH','Saint Helena',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(190,'KN','Saint Kitts and Nevis',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(191,'LC','Saint Lucia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(192,'MF','Saint Martin',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (193,'VC','Saint Vincent & the Grenadines',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(194,'WS','Samoa',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(195,'SM','San Marino',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(196,'ST','Sao Tome and Principe',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (197,'SA','Saudi Arabia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(198,'SN','Senegal',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(199,'RS','Serbia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(200,'SC','Seychelles',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(201,'SL','Sierra Leone',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (202,'SG','Singapore',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(203,'SX','Sint Maarten',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(204,'SK','Slovakia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(205,'SI','Slovenia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(206,'SB','Solomon Islands',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (207,'SO','Somalia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(208,'ZA','South Africa',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(209,'GS','South Georgia and The South Sandwich Islands',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(210,'SS','South Sudan',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (211,'ES','Spain',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(212,'LK','Sri Lanka',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(213,'PM','St. Pierre and Miquelon',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(214,'SD','Sudan',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(215,'SR','Suriname',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (216,'SJ','Svalbard and Jan Mayen',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(217,'SZ','Swaziland',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(218,'SE','Sweden',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(219,'CH','Switzerland',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (220,'SY','Syrian Arab Republic',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(221,'TW','Taiwan',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(222,'TJ','Tajikistan',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(223,'TH','Thailand',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (224,'MK','The Former Yugoslav Republic of Macedonia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(225,'TL','Timor-Leste',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(226,'TG','Togo',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(227,'TK','Tokelau',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (228,'TO','Tonga',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(229,'TT','Trinidad and Tobago',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(230,'TN','Tunisia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(231,'TR','Turkey',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(232,'TM','Turkmenistan',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (233,'TC','Turks and Caicos Islands',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(234,'TV','Tuvalu',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(235,'UM','US Minor Outlying Islands',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(236,'UG','Uganda',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (237,'UA','Ukraine',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(238,'AE','United Arab Emirates',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(239,'GB','United Kingdom',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(240,'TZ','United Republic of Tanzania',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (241,'US','United States of America',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(242,'UY','Uruguay',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(243,'UZ','Uzbekistan',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(244,'VU','Vanuatu',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (245,'VE','Venezuela',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(246,'VN','Viet Nam',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(247,'VG','Virgin Islands (British)',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(248,'VI','Virgin Islands (U.S.A.)',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (249,'WF','Wallis and Futuna',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(250,'EH','Western Sahara',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(251,'YE','Yemen',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(252,'ZM','Zambia',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),\
 (253,'ZW','Zimbabwe',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);~\
INSERT INTO `object_category_master` VALUES (1,'Master'),(2,'Transaction'),(3,'Report');~\
INSERT INTO `object_rights_master` VALUES (1,1,1,1,1,1,1,1),(2,1,1,2,1,1,1,1),(3,1,1,3,1,1,1,1),(4,1,2,1,1,1,1,1),(5,1,2,2,1,1,1,1),(6,1,2,3,1,1,1,1),(7,1,3,1,1,1,1,1),(8,1,3,2,1,1,1,1),(9,1,3,3,1,1,1,1),(10,1,4,1,1,1,1,1),(11,1,4,2,1,1,1,1),(12,1,4,3,1,1,1,1),(13,2,1,1,1,1,1,1),(14,2,1,2,1,1,1,1),(15,2,1,3,1,1,1,1),\
 (16,2,2,1,1,1,1,1),(17,2,2,2,1,1,1,1),(18,2,2,3,1,1,1,1),(19,2,3,1,1,1,1,1),(20,2,3,2,1,1,1,1),(21,2,3,3,1,1,1,1),(22,2,4,1,1,1,1,1),(23,2,4,2,1,1,1,1),(24,2,4,3,1,1,1,1),(25,3,1,1,1,1,1,1),(26,3,1,2,1,1,1,1),(27,3,1,3,1,1,1,1),(28,3,2,1,1,1,1,1),(29,3,2,2,1,1,1,1),(30,3,2,3,1,1,1,1),(31,3,3,1,1,1,1,1),(32,3,3,2,1,1,1,1),\
 (33,3,3,3,1,1,1,1),(34,3,4,1,1,1,1,1),(35,3,4,2,1,1,1,1),(36,3,4,3,1,1,1,1),(37,4,1,1,1,1,1,1),(38,4,1,2,1,1,1,1),(39,4,1,3,1,1,1,1),(40,4,2,1,1,1,1,1),(41,4,2,2,1,1,1,1),(42,4,2,3,1,1,1,1),(43,4,3,1,1,1,1,1),(44,4,3,2,1,1,1,1),(45,4,3,3,1,1,1,1),(46,4,4,1,1,1,1,1),(47,4,4,2,1,1,1,1),(48,4,4,3,1,1,1,1),(49,5,1,1,1,1,1,1),\
 (50,5,1,2,1,1,1,1),(51,5,1,3,1,1,1,1),(52,5,2,1,1,1,1,1),(53,5,2,2,1,1,1,1),(54,5,2,3,1,1,1,1),(55,5,3,1,1,1,1,1),(56,5,3,2,1,1,1,1),(57,5,3,3,1,1,1,1),(58,5,4,1,1,1,1,1),(59,5,4,2,1,1,1,1),(60,5,4,3,1,1,1,1),(61,6,1,1,1,1,1,1),(62,6,1,2,1,1,1,1),(63,6,1,3,1,1,1,1),(64,6,2,1,1,1,1,1),(65,6,2,2,1,1,1,1),(66,6,2,3,1,1,1,1),\
 (67,6,3,1,1,1,1,1),(68,6,3,2,1,1,1,1),(69,6,3,3,1,1,1,1),(70,6,4,1,1,1,1,1),(71,6,4,2,1,1,1,1),(72,6,4,3,1,1,1,1),(73,7,1,1,1,1,1,1),(74,7,1,2,1,1,1,1),(75,7,1,3,1,1,1,1),(76,7,2,1,1,1,1,1),(77,7,2,2,1,1,1,1),(78,7,2,3,1,1,1,1),(79,7,3,1,1,1,1,1),(80,7,3,2,1,1,1,1),(81,7,3,3,1,1,1,1),(82,7,4,1,1,1,1,1),(83,7,4,2,1,1,1,1),\
 (84,7,4,3,1,1,1,1),(85,8,1,1,1,1,1,1),(86,8,1,2,1,1,1,1),(87,8,1,3,1,1,1,1),(88,8,2,1,1,1,1,1),(89,8,2,2,1,1,1,1),(90,8,2,3,1,1,1,1),(91,8,3,1,1,1,1,1),(92,8,3,2,1,1,1,1),(93,8,3,3,1,1,1,1),(94,8,4,1,1,1,1,1),(95,8,4,2,1,1,1,1),(96,8,4,3,1,1,1,1),(97,9,1,1,1,1,1,1),(98,9,1,2,1,1,1,1),(99,9,1,3,1,1,1,1),(100,9,2,1,1,1,1,1),\
 (101,9,2,2,1,1,1,1),(102,9,2,3,1,1,1,1),(103,9,3,1,1,1,1,1),(104,9,3,2,1,1,1,1),(105,9,3,3,1,1,1,1),(106,9,4,1,1,1,1,1),(107,9,4,2,1,1,1,1),(108,9,4,3,1,1,1,1),(109,10,1,1,1,1,1,1),(110,10,1,2,1,1,1,1),(111,10,1,3,1,1,1,1),(112,10,2,1,1,1,1,1),(113,10,2,2,1,1,1,1),(114,10,2,3,1,1,1,1),(115,10,3,1,1,1,1,1),(116,10,3,2,1,1,1,1),\
 (117,10,3,3,1,1,1,1),(118,10,4,1,1,1,1,1),(119,10,4,2,1,1,1,1),(120,10,4,3,1,1,1,1),(121,11,1,1,1,1,1,1),(122,11,1,2,1,1,1,1),(123,11,1,3,1,1,1,1),(124,11,2,1,1,1,1,1),(125,11,2,2,1,1,1,1),(126,11,2,3,1,1,1,1),(127,11,3,1,1,1,1,1),(128,11,3,2,1,1,1,1),(129,11,3,3,1,1,1,1),(130,11,4,1,1,1,1,1),(131,11,4,2,1,1,1,1),\
 (132,11,4,3,1,1,1,1),(133,12,1,1,1,1,1,1),(134,12,1,2,1,1,1,1),(135,12,1,3,1,1,1,1),(136,12,2,1,1,1,1,1),(137,12,2,2,1,1,1,1),(138,12,2,3,1,1,1,1),(139,12,3,1,1,1,1,1),(140,12,3,2,1,1,1,1),(141,12,3,3,1,1,1,1),(142,12,4,1,1,1,1,1),(143,12,4,2,1,1,1,1),(144,12,4,3,1,1,1,1),(145,13,1,1,1,1,1,1),(146,13,1,2,1,1,1,1),\
 (147,13,1,3,1,1,1,1),(148,13,2,1,1,1,1,1),(149,13,2,2,1,1,1,1),(150,13,2,3,1,1,1,1),(151,13,3,1,1,1,1,1),(152,13,3,2,1,1,1,1),(153,13,3,3,1,1,1,1),(154,13,4,1,1,1,1,1),(155,13,4,2,1,1,1,1),(156,13,4,3,1,1,1,1),(157,14,1,1,1,1,1,1),(158,14,1,2,1,1,1,1),(159,14,1,3,1,1,1,1),(160,14,2,1,1,1,1,1),(161,14,2,2,1,1,1,1),\
 (162,14,2,3,1,1,1,1),(163,14,3,1,1,1,1,1),(164,14,3,2,1,1,1,1),(165,14,3,3,1,1,1,1),(166,14,4,1,1,1,1,1),(167,14,4,2,1,1,1,1),(168,14,4,3,1,1,1,1),(169,15,1,1,1,1,1,1),(170,15,1,2,1,1,1,1),(171,15,1,3,1,1,1,1),(172,15,2,1,1,1,1,1),(173,15,2,2,1,1,1,1),(174,15,2,3,1,1,1,1),(175,15,3,1,1,1,1,1),(176,15,3,2,1,1,1,1),\
 (177,15,3,3,1,1,1,1),(178,15,4,1,1,1,1,1),(179,15,4,2,1,1,1,1),(180,15,4,3,1,1,1,1),(181,16,1,1,1,1,1,1),(182,16,1,2,1,1,1,1),(183,16,1,3,1,1,1,1),(184,16,2,1,1,1,1,1),(185,16,2,2,1,1,1,1),(186,16,2,3,1,1,1,1),(187,16,3,1,1,1,1,1),(188,16,3,2,1,1,1,1),(189,16,3,3,1,1,1,1),(190,16,4,1,1,1,1,1),(191,16,4,2,1,1,1,1),\
 (192,16,4,3,1,1,1,1),(193,17,1,1,1,1,1,1),(194,17,1,2,1,1,1,1),(195,17,1,3,1,1,1,1),(196,17,2,1,1,1,1,1),(197,17,2,2,1,1,1,1),(198,17,2,3,1,1,1,1),(199,17,3,1,1,1,1,1),(200,17,3,2,1,1,1,1),(201,17,3,3,1,1,1,1),(202,17,4,1,1,1,1,1),(203,17,4,2,1,1,1,1),(204,17,4,3,1,1,1,1),(205,18,1,1,1,1,1,1),(206,18,1,2,1,1,1,1),\
 (207,18,1,3,1,1,1,1),(208,18,2,1,1,1,1,1),(209,18,2,2,1,1,1,1),(210,18,2,3,1,1,1,1),(211,18,3,1,1,1,1,1),(212,18,3,2,1,1,1,1),(213,18,3,3,1,1,1,1),(214,18,4,1,1,1,1,1),(215,18,4,2,1,1,1,1),(216,18,4,3,1,1,1,1),(217,19,1,1,1,1,1,1),(218,19,1,2,1,1,1,1),(219,19,1,3,1,1,1,1),(220,19,2,1,1,1,1,1),(221,19,2,2,1,1,1,1),\
 (222,19,2,3,1,1,1,1),(223,19,3,1,1,1,1,1),(224,19,3,2,1,1,1,1),(225,19,3,3,1,1,1,1),(226,19,4,1,1,1,1,1),(227,19,4,2,1,1,1,1),(228,19,4,3,1,1,1,1),(229,20,1,1,1,1,1,1),(230,20,1,2,1,1,1,1),(231,20,1,3,1,1,1,1),(232,20,2,1,1,1,1,1),(233,20,2,2,1,1,1,1),(234,20,2,3,1,1,1,1),(235,20,3,1,1,1,1,1),(236,20,3,2,1,1,1,1),\
 (237,20,3,3,1,1,1,1),(238,20,4,1,1,1,1,1),(239,20,4,2,1,1,1,1),(240,20,4,3,1,1,1,1),(241,21,1,1,1,1,1,1),(242,21,1,2,1,1,1,1),(243,21,1,3,1,1,1,1),(244,21,2,1,1,1,1,1),(245,21,2,2,1,1,1,1),(246,21,2,3,1,1,1,1),(247,21,3,1,1,1,1,1),(248,21,3,2,1,1,1,1),(249,21,3,3,1,1,1,1),(250,21,4,1,1,1,1,1),(251,21,4,2,1,1,1,1),\
 (252,21,4,3,1,1,1,1),(253,22,1,1,1,1,1,1),(254,22,1,2,1,1,1,1),(255,22,1,3,1,1,1,1),(256,22,2,1,1,1,1,1),(257,22,2,2,1,1,1,1),(258,22,2,3,1,1,1,1),(259,22,3,1,1,1,1,1),(260,22,3,2,1,1,1,1),(261,22,3,3,1,1,1,1),(262,22,4,1,1,1,1,1),(263,22,4,2,1,1,1,1),(264,22,4,3,1,1,1,1),(265,23,1,1,1,1,1,1),(266,23,1,2,1,1,1,1),\
 (267,23,1,3,1,1,1,1),(268,23,2,1,1,1,1,1),(269,23,2,2,1,1,1,1),(270,23,2,3,1,1,1,1),(271,23,3,1,1,1,1,1),(272,23,3,2,1,1,1,1),(273,23,3,3,1,1,1,1),(274,23,4,1,1,1,1,1),(275,23,4,2,1,1,1,1),(276,23,4,3,1,1,1,1),(277,24,1,1,1,1,1,1),(278,24,1,2,1,1,1,1),(279,24,1,3,1,1,1,1),(280,24,2,1,1,1,1,1),(281,24,2,2,1,1,1,1),\
 (282,24,2,3,1,1,1,1),(283,24,3,1,1,1,1,1),(284,24,3,2,1,1,1,1),(285,24,3,3,1,1,1,1),(286,24,4,1,1,1,1,1),(287,24,4,2,1,1,1,1),(288,24,4,3,1,1,1,1),(289,25,1,1,1,1,1,1),(290,25,1,2,1,1,1,1),(291,25,1,3,1,1,1,1),(292,25,2,1,1,1,1,1),(293,25,2,2,1,1,1,1),(294,25,2,3,1,1,1,1),(295,25,3,1,1,1,1,1),(296,25,3,2,1,1,1,1),\
 (297,25,3,3,1,1,1,1),(298,25,4,1,1,1,1,1),(299,25,4,2,1,1,1,1),(300,25,4,3,1,1,1,1),(301,26,1,1,1,1,1,1),(302,26,1,2,1,1,1,1),(303,26,1,3,1,1,1,1),(304,26,2,1,1,1,1,1),(305,26,2,2,1,1,1,1),(306,26,2,3,1,1,1,1),(307,26,3,1,1,1,1,1),(308,26,3,2,1,1,1,1),(309,26,3,3,1,1,1,1),(310,26,4,1,1,1,1,1),(311,26,4,2,1,1,1,1),\
 (312,26,4,3,1,1,1,1),(313,27,1,1,1,1,1,1),(314,27,1,2,1,1,1,1),(315,27,1,3,1,1,1,1),(316,27,2,1,1,1,1,1),(317,27,2,2,1,1,1,1),(318,27,2,3,1,1,1,1),(319,27,3,1,1,1,1,1),(320,27,3,2,1,1,1,1),(321,27,3,3,1,1,1,1),(322,27,4,1,1,1,1,1),(323,27,4,2,1,1,1,1),(324,27,4,3,1,1,1,1),(325,28,1,1,1,1,1,1),(326,28,1,2,1,1,1,1),\
 (327,28,1,3,1,1,1,1),(328,28,2,1,1,1,1,1),(329,28,2,2,1,1,1,1),(330,28,2,3,1,1,1,1),(331,28,3,1,1,1,1,1),(332,28,3,2,1,1,1,1),(333,28,3,3,1,1,1,1),(334,28,4,1,1,1,1,1),(335,28,4,2,1,1,1,1),(336,28,4,3,1,1,1,1),(337,29,1,1,1,1,1,1),(338,29,1,2,1,1,1,1),(339,29,1,3,1,1,1,1),(340,29,2,1,1,1,1,1),(341,29,2,2,1,1,1,1),\
 (342,29,2,3,1,1,1,1),(343,29,3,1,1,1,1,1),(344,29,3,2,1,1,1,1),(345,29,3,3,1,1,1,1),(346,29,4,1,1,1,1,1),(347,29,4,2,1,1,1,1),(348,29,4,3,1,1,1,1),(349,30,1,1,1,1,1,1),(350,30,1,2,1,1,1,1),(351,30,1,3,1,1,1,1),(352,30,2,1,1,1,1,1),(353,30,2,2,1,1,1,1),(354,30,2,3,1,1,1,1),(355,30,3,1,1,1,1,1),(356,30,3,2,1,1,1,1),\
 (357,30,3,3,1,1,1,1),(358,30,4,1,1,1,1,1),(359,30,4,2,1,1,1,1),(360,30,4,3,1,1,1,1),(361,31,1,1,1,1,1,1),(362,31,1,2,1,1,1,1),(363,31,1,3,1,1,1,1),(364,31,2,1,1,1,1,1),(365,31,2,2,1,1,1,1),(366,31,2,3,1,1,1,1),(367,31,3,1,1,1,1,1),(368,31,3,2,1,1,1,1),(369,31,3,3,1,1,1,1),(370,31,4,1,1,1,1,1),(371,31,4,2,1,1,1,1),\
 (372,31,4,3,1,1,1,1),(373,32,1,1,1,1,1,1),(374,32,1,2,1,1,1,1),(375,32,1,3,1,1,1,1),(376,32,2,1,1,1,1,1),(377,32,2,2,1,1,1,1),(378,32,2,3,1,1,1,1),(379,32,3,1,1,1,1,1),(380,32,3,2,1,1,1,1),(381,32,3,3,1,1,1,1),(382,32,4,1,1,1,1,1),(383,32,4,2,1,1,1,1),(384,32,4,3,1,1,1,1),(385,33,1,1,1,1,1,1),(386,33,1,2,1,1,1,1),\
 (387,33,1,3,1,1,1,1),(388,33,2,1,1,1,1,1),(389,33,2,2,1,1,1,1),(390,33,2,3,1,1,1,1),(391,33,3,1,1,1,1,1),(392,33,3,2,1,1,1,1),(393,33,3,3,1,1,1,1),(394,33,4,1,1,1,1,1),(395,33,4,2,1,1,1,1),(396,33,4,3,1,1,1,1),(397,34,1,1,1,1,1,1),(398,34,1,2,1,1,1,1),(399,34,1,3,1,1,1,1),(400,34,2,1,1,1,1,1),(401,34,2,2,1,1,1,1),\
 (402,34,2,3,1,1,1,1),(403,34,3,1,1,1,1,1),(404,34,3,2,1,1,1,1),(405,34,3,3,1,1,1,1),(406,34,4,1,1,1,1,1),(407,34,4,2,1,1,1,1),(408,34,4,3,1,1,1,1),(409,35,1,1,1,1,1,1),(410,35,1,2,1,1,1,1),(411,35,1,3,1,1,1,1),(412,35,2,1,1,1,1,1),(413,35,2,2,1,1,1,1),(414,35,2,3,1,1,1,1),(415,35,3,1,1,1,1,1),(416,35,3,2,1,1,1,1),\
 (417,35,3,3,1,1,1,1),(418,35,4,1,1,1,1,1),(419,35,4,2,1,1,1,1),(420,35,4,3,1,1,1,1);~\
INSERT INTO `object_type_master` VALUES (1,'Action',2),(2,'Allocation Type',2),(3,'Area',1),(4,'Category',1),(5,'Contact',1),(6,'Contact Group',1),(7,'Country',1),(8,'Currency',1),(9,'Department',1),(10,'Executive Dept',1),(11,'Executive',1),(12,'Executive Group',1),(13,'Executive Role',1),(14,'Invite User',2),(15,'Company User',2),\
 (16,'Item',1),(17,'Item Group',1),(18,'Notification',3),(19,'Organisation',1),(20,'Source',1),(21,'State',1),(22,'State List',1),(23,'Sub Status',2),(24,'Sub Status List',2),(25,'Unit',1),(26,'Enquiry',2),(27,'Contract',2),(28,'Support',2),(29,'Regional Setting',2),(30,'EnquiryStatusUpdate',2),(31,'Call Explorer',1),\
 (32,'Product Group',1),(33,'Product',1),(34,'Invite List',1),(35,'User List',1);~\
INSERT INTO `menu_option_master` VALUES (1,'Dashboard','Dashboard',0,'SpaceDashboardOutlinedIcon','/cap',0,'','',0,0,1),(3,'Campaign','Campaign',61,'PeopleAltOutlinedIcon','#',0,'','',0,0,4),(4,'Reports','Reports',0,'BarChartIcon','#',0,'','',0,0,7),(5,'Administration','Admin',0,'FolderOutlinedIcon','#',0,'','',0,0,8),\
 (6,'Add Enquiry','Add',2,'AddIcCallIcon','/cap/enquiry',0,'','',0,0,0),(7,'Task Allocation','Allocate',0,'InboxIcon','/cap/callexplorer',0,'','',0,0,5),(8,'Status Update','Status Update',2,'PeopleAltOutlinedIcon','#',0,'','',0,0,0),(10,'Modify Company','Modify Company',5,'InboxIcon','#',0,'','',0,0,2),\
 (11,'User Management','Add User',5,'PeopleAltOutlinedIcon','/cap/admin/adduser',0,'','',0,0,3),(12,'Master Data','Enquiry Masters',5,'FolderOutlinedIcon','#',0,'','',0,0,0),(14,'Action','Actions',12,'FolderOutlinedIcon','/cap/admin/lists/actionList',0,'','',0,0,1),\
 (15,'Category','Category',12,'FolderOutlinedIcon','/cap/admin/lists/categoryList',0,'','',0,0,3),(28,'Source','Source',12,'FolderOutlinedIcon','/cap/admin/lists/sourceList',0,'','',0,0,20),(31,'Contact','Contacts',12,'ContactsIcon','/cap/admin/lists/contactList',0,'','',0,0,5),\
 (34,'Enquiry Sub Status','Enquiry Sub Status',12,'FolderOutlinedIcon','/cap/admin/lists/subStatusList',0,'','',0,0,11),(35,'Allocation Type','Allocation Type',12,'FolderOutlinedIcon','/cap/admin/lists/allocationTypeList',0,'','',0,0,2),\
 (36,'Enquiry Product','Enquiry Product',12,'FolderOutlinedIcon','/cap/admin/lists/productList',0,'','',0,0,10),(37,'Product Group','Item Group',12,'FolderOutlinedIcon','/cap/admin/lists/productGroupList',0,'','',0,0,17),(38,'Product Unit','Item Unit',12,'FolderOutlinedIcon','/cap/admin/lists/unitList',0,'','',0,0,18),\
 (39,'Organisation','Organisation',12,'FolderOutlinedIcon','/cap/admin/lists/organisationList',0,'','',0,0,19),(40,'Contact Group','Contact Group',12,'FolderOutlinedIcon','/cap/admin/lists/contactGroupList',0,'','',0,0,6),(41,'Department','Department',12,'FolderOutlinedIcon','/cap/admin/lists/departmentList',0,'','',0,0,9),\
 (42,'Country','Country',12,'FolderOutlinedIcon','/cap/admin/lists/countryList',0,'','',0,0,7),(43,'State','State',12,'FolderOutlinedIcon','/cap/admin/lists/stateList',0,'','',0,0,21),(45,'Executive','Executive',12,'FolderOutlinedIcon','/cap/admin/lists/executiveList',0,'','',0,0,12),\
 (46,'Area','Executive Area',12,'FolderOutlinedIcon','/cap/admin/lists/areaList',0,'','',0,0,13),(47,'Executive Role','Executive Role',12,'FolderOutlinedIcon','/cap/admin/lists/executiveRoleList',0,'','',0,0,16),(48,'Executive Dept','Executive Dept',12,'FolderOutlinedIcon','/cap/admin/lists/executiveDeptList',0,'','',0,0,14),\
 (49,'Executive Group','Executive Group',12,'FolderOutlinedIcon','/cap/admin/lists/executiveGroupList',0,'','',0,0,15),(50,'Currency','Currency',12,'FolderOutlinedIcon','/cap/admin/lists/currencyList',0,'','',0,0,8),(51,'Configurations','Config',5,'FolderOutlinedIcon','#',0,'','',0,0,4),\
 (52,'Application','Enquiry Config',51,'FolderOutlinedIcon','/cap/admin/appConfig',0,'','',0,0,1),(53,'Generate Quotation','Quotation',61,'FolderOutlinedIcon','#',0,NULL,NULL,0,0,5),(55,'Screens','Screen',51,'FolderOutlinedIcon','#',NULL,NULL,NULL,NULL,NULL,3),(56,'Search','Search',51,'FolderOutlinedIcon','#',NULL,NULL,NULL,NULL,NULL,4),\
 (57,'Rights Management','Rights',51,'FolderOutlinedIcon','/cap/admin/rights',NULL,NULL,NULL,NULL,NULL,5),(58,'My Settings','Settings',51,'FolderOutlinedIcon','#',NULL,NULL,NULL,NULL,NULL,6),(59,'Support Tickets','Tickets',61,'AddIcCallIcon','/cap/support/supportList',0,NULL,NULL,0,0,2),\
 (61,'Workflows','Workflows',0,'FolderOutlinedIcon','#',NULL,NULL,NULL,NULL,NULL,2),(62,'Enquiry Tickets','Enquiry',61,'AddIcCallIcon','/cap/enquiry/enquiryList',0,NULL,NULL,0,0,3),(63,'Field Configurator','Field Config',51,'FolderOutlinedIcon','/cap/fieldConfigurator',NULL,NULL,NULL,NULL,NULL,2);~\
INSERT INTO `ticket_status_master` VALUES (1,'Open',NULL,NULL,NULL,NULL,NULL),(2,'Closed',NULL,NULL,NULL,NULL,NULL);~\
INSERT INTO `ticket_sub_status_master` (`name`, `stamp`, `ticket_status_id`) VALUES ('Success', 0, 2), ('Failure', 0, 2), ('Dropped', 0, 2);~\
INSERT INTO `ticket_tran_type_master` VALUES (1,'New',NULL,NULL,NULL,NULL,NULL),(2,'Allocation',NULL,NULL,NULL,NULL,NULL),(3,'Updated',NULL,NULL,NULL,NULL,NULL),(4,'Status Update',NULL,NULL,NULL,NULL,NULL);~\
INSERT INTO `enquiry_status_master` VALUES (1,'Open',NULL,NULL,NULL,NULL,NULL),(2,'Closed',NULL,NULL,NULL,NULL,NULL);~\
INSERT INTO `enquiry_sub_status_master` (`name`, `stamp`, `enquiry_status_id`) VALUES ('Success', 0, 2), ('Failure', 0, 2), ('Dropped', 0, 2);~\
INSERT INTO `executive_role_master` VALUES (1,'Admin',0,0,0,0,UTC_TIMESTAMP(),NULL),(2,'Manager',1,0,0,0,UTC_TIMESTAMP(),NULL),(3,'Executive',2,0,0,0,UTC_TIMESTAMP(),NULL),(4,'Junior Executive',3,0,0,0,UTC_TIMESTAMP(), NULL);~\
INSERT INTO `executive_dept_master` VALUES (1,'Sales',0,0,0,UTC_TIMESTAMP(),NULL),(2,'Support',0,0,0,UTC_TIMESTAMP(),NULL),(3,'Admin',0,0,0,UTC_TIMESTAMP(),NULL);~\
INSERT INTO `custom_column_type_master` VALUES (1,'input'),(2,'option'),(3,'numeric'),(4,'date'),(5,'list'),(6,'currency');~\
INSERT INTO `custom_fields_master` VALUES (2025,19,'name','Organisation Name','name','name',0,NULL,NULL,0,NULL,NULL,1,'2024-12-18 17:54:25',1,0,1,1,0,'Organisation Name'),(2026,19,'alias','Alias','alias','alias',0,NULL,NULL,0,NULL,NULL,1,'2024-12-18 17:54:25',1,0,2,1,0,'Alias'),\
 (2027,19,'print_name','Print Name','print_name','print_name',0,NULL,NULL,0,NULL,NULL,1,'2024-12-18 17:54:25',1,0,3,1,0,'Print Name'),(2028,19,'pan','PAN','pan','pan',0,NULL,NULL,0,NULL,NULL,1,'2024-12-18 17:54:25',1,0,4,1,0,'PAN'),(2029,19,'gstin','GSTIN','gstin','gstin',0,NULL,NULL,0,NULL,NULL,1,'2024-12-18 17:54:25',1,0,5,1,0,'GSTIN'),\
 (2030,19,'address1','Address Line 1','address1','address1',0,NULL,NULL,0,NULL,NULL,1,'2024-12-18 17:54:25',1,0,6,1,0,'Address Line 1'),(2031,19,'address2','Address Line 2','address2','address2',0,NULL,NULL,0,NULL,NULL,1,'2024-12-18 17:54:25',1,0,7,1,0,'Address Line 2'),\
 (2032,19,'city','City','city','city',0,NULL,NULL,0,NULL,NULL,1,'2024-12-18 17:54:25',1,0,8,1,0,'City'),(2033,19,'pincode','Pin Code','pincode','pincode',0,NULL,NULL,0,NULL,NULL,1,'2024-12-18 17:54:25',1,0,9,1,0,'Pin Code'),(2034,19,'country','Country','country','country',0,NULL,NULL,0,NULL,NULL,1,'2024-12-18 17:54:25',1,0,10,1,0,'Country'),\
 (2035,19,'state','State','state','state',0,NULL,NULL,0,NULL,NULL,1,'2024-12-18 17:54:25',1,0,11,1,0,'State'),(2036,19,'c_col1','Test1','c_col1','c_col1',1,NULL,NULL,1,NULL,NULL,1,'2024-12-18 17:54:25',0,NULL,12,1,0,NULL),(2037,19,'c_col2','Test2','c_col2','c_col2',5,'tea, coffee,milk, shakes',NULL,0,NULL,NULL,1,'2024-12-18 17:54:25',0,NULL,13,1,0,NULL),\
 (2713,10,'name','Executive Dept Name','name','name',0,NULL,NULL,1,NULL,NULL,1,'2024-12-20 15:24:56',1,1,1,1,0,'Executive Dept Name'),(2892,28,'tkt_number','Ticket Description','tkt_number','tkt_number',0,NULL,NULL,1,NULL,NULL,1,'2024-12-23 18:27:14',1,1,1,1,0,'Ticket Description'),\
 (2893,28,'date','Received Date','date','date',0,NULL,NULL,0,NULL,NULL,1,'2024-12-23 18:27:14',1,0,2,1,0,'Received Date'),(2894,28,'contact','Contact','contact','contact',0,NULL,NULL,1,NULL,NULL,1,'2024-12-23 18:27:14',1,1,3,1,0,'Contact'),(2895,28,'category','Category','category','category',0,NULL,NULL,1,NULL,NULL,1,'2024-12-23 18:27:14',1,1,4,1,0,'Category'),\
 (2896,28,'received_by','Recieved By','received_by','received_by',0,NULL,NULL,1,NULL,NULL,1,'2024-12-23 18:27:14',1,1,5,1,0,'Recieved By'),(2897,28,'product_grid','Product List','product_grid','product_grid',0,NULL,NULL,0,NULL,NULL,1,'2024-12-23 18:27:14',1,0,6,1,0,'Product List'),\
 (2898,28,'call_receipt_remark','Call Receipt Remarks','call_receipt_remark','call_receipt_remark',0,NULL,NULL,0,NULL,NULL,1,'2024-12-23 18:27:14',1,0,7,1,0,'Call Receipt Remarks'),(2899,28,'suggested_action_remark','Suggested Action Remarks','suggested_action_remark','suggested_action_remark',0,NULL,NULL,0,NULL,NULL,1,'2024-12-23 18:27:14',1,0,8,1,0,'Suggested Action Remarks'),\
 (2900,28,'action_taken_remark','Action Taken Remarks','action_taken_remark','action_taken_remark',0,NULL,NULL,0,NULL,NULL,1,'2024-12-23 18:27:14',1,0,9,1,0,'Action Taken Remarks'),(2901,28,'status','Status','status','status',0,'Open;Closed',NULL,1,NULL,NULL,1,'2024-12-23 18:27:14',1,1,11,1,0,'Status'),\
 (2902,28,'sub_status','Call Sub-Status','sub_status','sub_status',0,NULL,NULL,1,NULL,NULL,1,'2024-12-23 18:27:14',1,1,12,1,0,'Call Sub-Status'),(2903,28,'action_taken','Action Taken','action_taken','action_taken',0,NULL,NULL,0,NULL,NULL,1,'2024-12-23 18:27:14',1,0,10,1,0,'Action Taken'),\
 (2904,28,'allocate_to','Allocate To','allocate_to','allocate_to',0,NULL,NULL,0,NULL,NULL,1,'2024-12-23 18:27:14',1,0,13,1,0,'Allocate To'),(2905,28,'next_action','Next Action','next_action','next_action',0,NULL,NULL,0,NULL,NULL,1,'2024-12-23 18:27:14',1,0,14,1,0,'Next Action'),\
 (2906,28,'next_action_date','When','next_action_date','next_action_date',0,NULL,NULL,0,NULL,NULL,1,'2024-12-23 18:27:14',1,0,15,1,0,'When'),(2907,28,'closure_remark','Closure Remarks','closure_remark','closure_remark',0,NULL,NULL,0,NULL,NULL,1,'2024-12-23 18:27:14',1,0,16,1,0,'Closure Remarks'),\
 (3198,5,'name','Name','name','name',0,NULL,NULL,1,NULL,NULL,1,'2024-12-31 13:14:48',1,1,1,1,0,'Name'),(3199,5,'alias','Alias','alias','alias',0,NULL,NULL,0,NULL,NULL,1,'2024-12-31 13:14:48',1,0,2,1,0,'Alias'),(3200,5,'print_name','Print Name','print_name','print_name',0,NULL,NULL,0,NULL,NULL,1,'2024-12-31 13:14:48',1,0,3,1,0,'Print Name'),\
 (3201,5,'organisation','Organisation','organisation','organisation',0,NULL,NULL,0,NULL,NULL,1,'2024-12-31 13:14:48',1,0,4,1,0,'Organisation'),(3202,5,'pan','PAN','pan','pan',0,NULL,NULL,0,NULL,NULL,1,'2024-12-31 13:14:48',1,0,5,1,0,'PAN'),(3203,5,'aadhaar','AADHAAR','aadhaar','aadhaar',0,NULL,NULL,0,NULL,NULL,1,'2024-12-31 13:14:48',1,0,6,1,0,'AADHAAR'),\
 (3204,5,'contactGroup','Group','contactGroup','contactGroup',0,NULL,NULL,1,NULL,NULL,1,'2024-12-31 13:14:48',1,1,7,1,0,'Group'),(3205,5,'department','Department','department','department',0,NULL,NULL,0,NULL,NULL,1,'2024-12-31 13:14:48',1,0,8,1,0,'Department'),(3206,5,'area','Area','area','area',0,NULL,NULL,0,NULL,NULL,1,'2024-12-31 13:14:48',1,0,9,1,0,'Area'),\
 (3207,5,'email','Email','email','email',0,NULL,NULL,0,NULL,NULL,1,'2024-12-31 13:14:48',1,0,10,1,0,'Email'),(3208,5,'mobile','Phone No','mobile','mobile',0,NULL,NULL,0,NULL,NULL,1,'2024-12-31 13:14:48',1,0,11,1,0,'Phone No'),(3209,5,'whatsapp','Whatsapp No','whatsapp','whatsapp',0,NULL,NULL,0,NULL,NULL,1,'2024-12-31 13:14:48',1,0,12,1,0,'Whatsapp No'),\
 (3210,5,'address1','Address Line 1','address1','address1',0,NULL,NULL,0,NULL,NULL,1,'2024-12-31 13:14:48',1,0,13,1,0,'Address Line 1'),(3211,5,'address2','Address Line 2','address2','address2',0,NULL,NULL,0,NULL,NULL,1,'2024-12-31 13:14:48',1,0,14,1,0,'Address Line 2'),(3212,5,'city','City ','city','city',0,NULL,NULL,0,NULL,NULL,1,'2024-12-31 13:14:48',1,0,15,1,0,'City '),\
 (3213,5,'pincode','Pin Code','pincode','pincode',0,NULL,NULL,0,NULL,NULL,1,'2024-12-31 13:14:48',1,0,16,1,0,'Pin Code'),(3214,5,'country','Country','country','country',0,NULL,NULL,0,NULL,NULL,1,'2024-12-31 13:14:48',1,0,17,1,0,'Country'),(3215,5,'state','State ','state','state',0,NULL,NULL,0,NULL,NULL,1,'2024-12-31 13:14:48',1,0,18,1,0,'State '),\
 (3234,26,'enq_number','Enquiry Description','enq_number','enq_number',0,NULL,NULL,1,NULL,NULL,1,'2025-01-02 18:39:01',1,1,1,1,0,'Enquiry Description'),(3235,26,'date','Received Date','date','date',0,NULL,NULL,0,NULL,NULL,1,'2025-01-02 18:39:01',1,0,2,1,0,'Received Date'),\
 (3236,26,'contact','Contact','contact','contact',0,NULL,NULL,1,NULL,NULL,1,'2025-01-02 18:39:01',1,1,3,1,0,'Contact'),(3237,26,'category','Category','category','category',0,NULL,NULL,1,NULL,NULL,1,'2025-01-02 18:39:01',1,1,4,1,0,'Category'),(3238,26,'source','Source','source','source',0,NULL,NULL,1,NULL,NULL,1,'2025-01-02 18:39:01',1,1,5,1,0,'Source'),\
 (3239,26,'received_by','Recieved By','received_by','received_by',0,NULL,NULL,1,NULL,NULL,1,'2025-01-02 18:39:01',1,1,6,1,0,'Recieved By'),(3240,26,'product_grid','Product List','product_grid','product_grid',0,NULL,NULL,0,NULL,NULL,1,'2025-01-02 18:39:01',1,0,7,1,0,'Product List'),\
 (3241,26,'call_receipt_remark','Call Receipt Remarks','call_receipt_remark','call_receipt_remark',0,NULL,NULL,0,NULL,NULL,1,'2025-01-02 18:39:01',1,0,8,1,0,'Call Receipt Remarks'),(3242,26,'suggested_action_remark','Suggested Action Remarks','suggested_action_remark','suggested_action_remark',0,NULL,NULL,0,NULL,NULL,1,'2025-01-02 18:39:01',1,0,9,1,0,'Suggested Action Remarks'),\
 (3243,26,'action_taken_remark','Action Taken Remarks','action_taken_remark','action_taken_remark',0,NULL,NULL,0,NULL,NULL,1,'2025-01-02 18:39:01',1,0,10,1,0,'Action Taken Remarks'),(3244,26,'action_taken','Action Taken','action_taken','action_taken',0,NULL,NULL,0,NULL,NULL,1,'2025-01-02 18:39:01',1,0,11,1,0,'Action Taken'),\
 (3245,26,'status','Status','status','status',0,'Open;Closed',NULL,1,NULL,NULL,1,'2025-01-02 18:39:01',1,1,12,1,0,'Status'),(3246,26,'sub_status','Call Sub-Status','sub_status','sub_status',0,NULL,NULL,1,NULL,NULL,1,'2025-01-02 18:39:01',1,1,13,1,0,'Call Sub-Status'),\
 (3247,26,'allocate_to','Allocate To','allocate_to','allocate_to',0,NULL,NULL,0,NULL,NULL,1,'2025-01-02 18:39:01',1,0,14,1,0,'Allocate To'),(3248,26,'next_action','Next Action','next_action','next_action',0,NULL,NULL,0,NULL,NULL,1,'2025-01-02 18:39:01',1,0,15,1,0,'Next Action'),\
 (3249,26,'next_action_date','When','next_action_date','next_action_date',0,NULL,NULL,0,NULL,NULL,1,'2025-01-02 18:39:01',1,0,16,1,0,'When'),(3250,26,'closure_remark','Closure Remarks','closure_remark','closure_remark',0,NULL,NULL,0,NULL,NULL,1,'2025-01-02 18:39:01',1,0,17,1,0,'Closure Remarks'),(3251,11,'name','Name','name','name',0,NULL,NULL,1,NULL,NULL,128,'2025-01-07 10:55:44',1,1,1,1,0,'Name'),\
 (3252,11,'alias','Alias','alias','alias',0,NULL,NULL,0,NULL,NULL,128,'2025-01-07 10:55:44',1,0,2,1,0,'Alias'),(3253,11,'area','Area','area','area',0,NULL,NULL,0,NULL,NULL,128,'2025-01-07 10:55:44',1,0,3,1,0,'Area'),(3254,11,'executive_dept','Executive Department','department','executive_dept',0,NULL,NULL,1,NULL,NULL,128,'2025-01-07 10:55:44',1,1,4,1,0,'Department'),\
 (3255,11,'role','Role','role','role',0,NULL,NULL,1,NULL,NULL,128,'2025-01-07 10:55:44',1,1,5,1,0,'Role'),(3256,11,'group','Executive Group','executive_group','group',0,NULL,NULL,0,NULL,NULL,128,'2025-01-07 10:55:44',1,0,6,1,0,'Executive Group'),(3257,11,'pan','PAN','pan','pan',0,NULL,NULL,0,NULL,NULL,128,'2025-01-07 10:55:44',1,0,7,1,0,'PAN'),(3258,11,'aadhaar','AADHAAR','aadhaar','aadhaar',0,NULL,NULL,0,NULL,NULL,128,'2025-01-07 10:55:44',1,0,8,1,0,'AADHAAR'),\
 (3259,11,'crm_user','Map to App User','crm_user','crm_user',0,NULL,NULL,0,NULL,NULL,128,'2025-01-07 10:55:44',1,0,9,1,0,'Map to App User'),(3260,11,'email','Email','email','email',0,NULL,NULL,0,NULL,NULL,128,'2025-01-07 10:55:44',1,0,10,1,0,'Email'),(3261,11,'mobile','Phone No','mobile','mobile',0,NULL,NULL,0,NULL,NULL,128,'2025-01-07 10:55:44',1,0,11,1,0,'Phone No'),\
 (3262,11,'whatsapp','Whatsapp No','whatsapp','whatsapp',0,NULL,NULL,0,NULL,NULL,128,'2025-01-07 10:55:44',1,0,12,1,0,'Whatsapp No'),(3263,11,'doj','Joining Date','doj','doj',0,NULL,NULL,0,NULL,NULL,128,'2025-01-07 10:55:44',1,0,13,1,0,'Joining Date'),(3264,11,'dob','Date of Birth','dob','dob',0,NULL,NULL,0,NULL,NULL,128,'2025-01-07 10:55:44',1,0,14,1,0,'Date of Birth'),\
 (3265,11,'doa','Anniversary Date','doa','doa',0,NULL,NULL,0,NULL,NULL,128,'2025-01-07 10:55:44',1,0,15,1,0,'Anniversary Date'),(3266,11,'address1','Address Line 1','address1','address1',0,NULL,NULL,0,NULL,NULL,128,'2025-01-07 10:55:44',1,0,16,1,0,'Address Line 1'),(3267,11,'address2','Address Line 2','address2','address2',0,NULL,NULL,0,NULL,NULL,128,'2025-01-07 10:55:44',1,0,17,1,0,'Address Line 2'),\
 (3268,11,'city','City','city','city',0,NULL,NULL,0,NULL,NULL,128,'2025-01-07 10:55:44',1,0,18,1,0,'City'),(3269,11,'pincode','Pin Code','pincode','pincode',0,NULL,NULL,0,NULL,NULL,128,'2025-01-07 10:55:44',1,0,19,1,0,'Pin Code'),(3270,11,'country','Country','country','country',0,NULL,NULL,0,NULL,NULL,128,'2025-01-07 10:55:44',1,0,20,1,0,'Country'),(3271,11,'state','State','state','state',0,NULL,NULL,0,NULL,NULL,128,'2025-01-07 10:55:44',1,0,21,1,0,'State'),\
 (3272,11,'c_col1','Test1','c_col1','c_col1',3,NULL,NULL,1,NULL,NULL,128,'2025-01-07 10:55:44',0,NULL,22,1,0,NULL);~\
 INSERT INTO `enquiry_tran_type_master` VALUES (1,'New',NULL,NULL,NULL,NULL,NULL),(2,'Allocation',NULL,NULL,NULL,NULL,NULL),(3,'Update',NULL,NULL,NULL,NULL,NULL),(4,'Status Update',NULL,NULL,NULL,NULL,NULL);~\
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
    set error_text = 'Field Already Exists';\
    END if;\
    \
    if length(name) = 0 or name is null then\
    set error = 1;\
    set error_path = 'name';\
    set error_text = 'Field cannot be empty';\
    END if;\
    END if;\
\
        if error = 0 then\
			INSERT INTO enquiry_action_master (name,stamp,created_by,created_on) VALUES (name,0,user_id,UTC_TIMESTAMP());\
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
    set error_text = 'Field Already Exists';\
    END if;\
                if length(name) = 0 or name is null then\
    set error = 1;\
    set error_path = 'name';\
    set error_text = 'Field cannot be empty';\
    END if;\
    END if;\
        if error = 0 then\
    INSERT INTO allocation_type_master (name,stamp,created_by,created_on) VALUES (name,0,user_id,UTC_TIMESTAMP());\
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
				set error_text = 'Field Already Exists';\
			END if;\
            if length(name) = 0 or name is null then\
			set error = 1;\
				set error_path = 'name';\
				set error_text = 'Field cannot be empty';\
			END if;\
		END if;\
        if error = 0 then\
			INSERT INTO area_master (name,stamp,created_by,created_on) VALUES (name,0,user_id,UTC_TIMESTAMP());\
            set last_insert_id = LAST_INSERT_ID();\
		END if;\
	commit;\
    \
    select error, error_path, error_text;\
    select * from area_master am where am.id = last_insert_id;\
END ;~\
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
			set error_text = 'Field Already Exists';\
			END if;\
				\
			if length(name) = 0 or name is null then\
				set error = 1;\
				set error_path = 'name';\
				set error_text = 'Field cannot be empty';\
			END if;\
		END if;\
       \
		if error = 0 then\
			insert into enquiry_category_master (name, stamp, created_by, created_on)\
			   values (name, 0, user_id, UTC_TIMESTAMP());\
			set last_insert_id = LAST_INSERT_ID();\
		END if;\
    commit;\
   \
	select error, error_path, error_text;\
    select * from enquiry_category_master cm where id = last_insert_id;\
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
END ;~\
CREATE PROCEDURE `createContact`(\
	IN alias varchar(75),\
    IN name varchar(75),\
	IN print_name varchar(75),\
	IN group_id  integer,\
	IN pan  varchar(20),\
	IN aadhaar  varchar(20),\
	IN address1 varchar(75),\
	IN address2 varchar(75),\
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
    IN user_id integer,\
	IN ccol1 varchar(100),\
    IN ccol2 varchar(100),\
    IN ccol3 varchar(100),\
    IN ccol4 varchar(100),\
    IN ccol5 varchar(100),\
    IN ccol6 varchar(100),\
    IN ccol7 varchar(100),\
    IN ccol8 varchar(100),\
    IN ccol9 varchar(100),\
    IN ccol10 varchar(100)\
    )\
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
    declare count_area_usage integer DEFAULT 0;\
    declare count_org_usage integer DEFAULT 0;\
    declare count_grp_usage integer DEFAULT 0;\
    declare count_dep_usage integer DEFAULT 0;\
    declare count_usage integer DEFAULT 0;\
    declare count_state_usage integer DEFAULT 0;\
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
				VALUES ('Field alreay exists', 'name');\
				\
			END if;\
            if length(name) = 0 or name is null then \
				set error = 1;\
				INSERT INTO temp_error_log (error_text, error_path) \
				VALUES ('Field cannot be empty', 'name');\
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
        SELECT COUNT(am.id) INTO count_area_usage\
		FROM area_master am\
		WHERE am.id = area_id;\
			if count_area_usage = 0 AND area_id!= 0 then\
				set error = 1;\
				INSERT INTO temp_error_log (error_text, error_path) \
				VALUES ('Area has been updated recently, Please refresh the page!', 'area');\
			END if;\
\
        SELECT COUNT(dep.id) INTO count_dep_usage\
		FROM department_master dep\
		WHERE dep.id = dept_id;\
			if count_dep_usage = 0 AND dept_id!= 0 then\
				set error = 1;\
				INSERT INTO temp_error_log (error_text, error_path) \
				VALUES ('Dept has been updated recently, Please refresh the page!', 'department');\
			END if;\
                  \
		SELECT COUNT(om.id) INTO count_org_usage\
		FROM organisation_master om\
		WHERE om.id = org_id;\
			if count_org_usage = 0 AND org_id!= 0 then\
				set error = 1;\
				INSERT INTO temp_error_log (error_text, error_path) \
				VALUES ('Organisation has been updated recently, Please refresh the page!', 'organisation');\
			END if;\
                  \
		SELECT COUNT(cg.id) INTO count_grp_usage\
		FROM contact_group_master cg\
		WHERE cg.id = group_id;\
			if count_grp_usage = 0 AND group_id!= 0 then\
				set error = 1;\
				INSERT INTO temp_error_log (error_text, error_path) \
				VALUES ('Group has been updated recently, Please refresh the page!', 'contactGroup');\
			END if;\
            \
        SELECT COUNT(cnm.id) INTO count_usage\
		FROM country_master cnm\
		WHERE cnm.id = country_id;\
			if count_usage = 0 AND country_id!= 0 then\
				set error = 1;\
				INSERT INTO temp_error_log (error_text, error_path) \
				VALUES ('Country has been updated recently, Please refresh the page!', 'country');\
			END if;\
            \
		SELECT COUNT(sm.id) INTO count_state_usage\
		FROM state_master sm\
		WHERE sm.id = state_id;\
			if count_state_usage = 0 AND state_id!= 0 then\
				set error = 1;\
				INSERT INTO temp_error_log (error_text, error_path) \
				VALUES ('State has been updated recently, Please refresh the page!', 'state');\
			END if;\
        \
		if error = 0 then\
        \
			insert into contact_master \
				(alias, name, stamp, print_name, group_id, pan, aadhaar, address1, address2, city, state_id, area_id, pincode, country_id, email, mobile, whatsapp, created_by, created_on, dob, doa, department_id, organisation_id)\
				values\
				(alias, name, 0, print_name, group_id, pan, aadhaar, address1, address2, city, state_id, area_id, pincode, country_id, email, mobile, whatsapp, user_id, UTC_TIMESTAMP(), dob, doa, dept_id, org_id);\
				set last_insert_id = LAST_INSERT_ID();\
				insert into custom_fields_data(c_col1,c_col2,c_col3,c_col4,c_col5,c_col6,c_col7,c_col8,c_col9,c_col10,object_id,object_type_id)\
                values(ccol1,ccol2,ccol3,ccol4,ccol5,ccol6,ccol7,ccol8,ccol9,ccol10,last_insert_id,5);\
        \
		END if;\
    commit;\
    \
    select * from temp_error_log;\
    select * from contact_master cm where cm.id = last_insert_id;\
END ;~\
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
       values (name ,alias, 0, parentId, user_id, UTC_TIMESTAMP()) ;\
       set last_insert_id = LAST_INSERT_ID();\
		END if;\
    commit;\
    \
	select * from error_table;\
    select * from contact_group_master am where am.id = last_insert_id;\
END ;~\
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
			INSERT INTO country_master (name,alias,stamp,created_by,created_on) VALUES (name,alias,0,user_id,UTC_TIMESTAMP());\
            set last_insert_id = LAST_INSERT_ID();\
		END if;\
	commit;\
    select * from temp_error_log;\
    select * from country_master cm where cm.id = last_insert_id;\
END ;~\
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
CREATE DEFINER=`Ankit Pandey`@`%` PROCEDURE `createCustomFields`(\
    IN user_object_id INT,\
    IN user_id INT,\
    IN data JSON\
)\
BEGIN\
    DECLARE i INT DEFAULT 0;\
    DECLARE jsonLength INT default NULL;\
    DECLARE user_column_format VARCHAR(50) default NULL;\
    DECLARE user_column_id INT default NULL;\
    DECLARE user_column_label VARCHAR(100) default NULL;\
    DECLARE user_column_name VARCHAR(50) default NULL;\
    DECLARE user_column_name_id VARCHAR(50) default NULL;\
    DECLARE user_column_order INT default NULL;\
    DECLARE user_column_type_id INT default NULL;\
    DECLARE user_created_by INT default NULL;\
    DECLARE user_created_on VARCHAR(20) default NULL;\
    DECLARE user_form_section VARCHAR(20) default NULL;\
    DECLARE user_is_default_column INT default NULL;\
    DECLARE user_is_default_mandatory INT default NULL;\
    DECLARE user_is_disabled INT default NULL;\
    DECLARE user_is_mandatory INT default NULL;\
    DECLARE user_modified_by INT default NULL;\
    DECLARE user_modified_on VARCHAR(20) default NULL;\
    DECLARE user_object_type_id INT default NULL;\
    declare user_default_column_label varchar(45) default NULL; \
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END;\
  \
start transaction;\
\
\
SET SQL_SAFE_UPDATES = 0;\
\
    DELETE FROM custom_fields_master \
    WHERE object_type_id = user_object_id;\
\
SET SQL_SAFE_UPDATES = 1;\
\
    SET jsonLength = JSON_LENGTH(data);\
\
    WHILE i < jsonLength DO\
        SET user_column_label = JSON_UNQUOTE(JSON_EXTRACT(data, CONCAT('$[', i, '].column_label')));\
        SET user_column_name = JSON_UNQUOTE(JSON_EXTRACT(data, CONCAT('$[', i, '].column_name')));\
        SET user_column_name_id = JSON_UNQUOTE(JSON_EXTRACT(data, CONCAT('$[', i, '].column_name_id')));\
        SET user_column_order = CAST(JSON_UNQUOTE(JSON_EXTRACT(data, CONCAT('$[', i, '].column_order'))) AS SIGNED);\
        SET user_column_type_id = CAST(JSON_UNQUOTE(JSON_EXTRACT(data, CONCAT('$[', i, '].column_type_id'))) AS SIGNED);\
        SET user_is_default_column = CAST(JSON_UNQUOTE(JSON_EXTRACT(data, CONCAT('$[', i, '].is_default_column'))) AS SIGNED);\
        SET user_is_disabled = CAST(JSON_UNQUOTE(JSON_EXTRACT(data, CONCAT('$[', i, '].is_disabled'))) AS SIGNED);\
        SET user_is_mandatory = CAST(JSON_UNQUOTE(JSON_EXTRACT(data, CONCAT('$[', i, '].is_mandatory'))) AS SIGNED);\
        SET user_object_type_id = CAST(JSON_UNQUOTE(JSON_EXTRACT(data, CONCAT('$[', i, '].object_type_id'))) AS SIGNED);\
        \
        SET user_is_default_mandatory = IF(JSON_UNQUOTE(JSON_EXTRACT(data, CONCAT('$[', i, '].is_default_mandatory'))) = 'null', NULL, \
            CAST(JSON_UNQUOTE(JSON_EXTRACT(data, CONCAT('$[', i, '].is_default_mandatory'))) AS SIGNED));\
        \
        SET user_created_by = IF(JSON_UNQUOTE(JSON_EXTRACT(data, CONCAT('$[', i, '].created_by'))) = 'null', NULL, \
                         CAST(JSON_UNQUOTE(JSON_EXTRACT(data, CONCAT('$[', i, '].created_by'))) AS SIGNED));\
\
        SET user_created_on = IF(JSON_UNQUOTE(JSON_EXTRACT(data, CONCAT('$[', i, '].created_on'))) = 'null', NULL, \
                         JSON_UNQUOTE(JSON_EXTRACT(data, CONCAT('$[', i, '].created_on'))));\
\
        SET user_modified_by = IF(JSON_UNQUOTE(JSON_EXTRACT(data, CONCAT('$[', i, '].modified_by'))) = 'null', NULL, \
                          CAST(JSON_UNQUOTE(JSON_EXTRACT(data, CONCAT('$[', i, '].modified_by'))) AS SIGNED));\
\
        SET user_modified_on = IF(JSON_UNQUOTE(JSON_EXTRACT(data, CONCAT('$[', i, '].modified_on'))) = 'null', NULL, \
                          JSON_UNQUOTE(JSON_EXTRACT(data, CONCAT('$[', i, '].modified_on'))));\
\
        SET user_form_section = IF(JSON_UNQUOTE(JSON_EXTRACT(data, CONCAT('$[', i, '].form_section'))) = 'null', NULL, \
                           JSON_UNQUOTE(JSON_EXTRACT(data, CONCAT('$[', i, '].form_section'))));\
\
	    SET user_column_format = IF(JSON_UNQUOTE(JSON_EXTRACT(data, CONCAT('$[', i, '].column_format'))) = 'null', NULL, \
                            JSON_UNQUOTE(JSON_EXTRACT(data, CONCAT('$[', i, '].column_format'))));\
        \
        SET user_default_column_label = IF(JSON_UNQUOTE(JSON_EXTRACT(data, CONCAT('$[', i, '].default_column_label'))) = 'null', NULL, \
                            JSON_UNQUOTE(JSON_EXTRACT(data, CONCAT('$[', i, '].default_column_label'))));\
\
\
        INSERT INTO custom_fields_master(\
            action_id, column_id, column_label, column_name, column_name_id,\
            column_type_id, column_format, is_default_column,\
            is_default_mandatory, is_disabled, is_mandatory,\
            object_type_id, column_order, modified_on, modified_by ,\
            default_column_label\
        ) VALUES (\
            1, user_column_name_id, user_column_label, user_column_name,user_column_name_id,\
            user_column_type_id, user_column_format, user_is_default_column,\
            user_is_default_mandatory, user_is_disabled, user_is_mandatory,\
            user_object_type_id, user_column_order, now(), user_id, \
            user_default_column_label\
        );\
\
        SET i = i + 1;\
    END WHILE;\
\
commit;\
select user_object_id;\
END ;~\
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
			   values (name, 0, user_id, UTC_TIMESTAMP());\
               \
			set last_insert_id = LAST_INSERT_ID();\
		END if;\
    commit;\
   \
	select error, error_path, error_text;\
    select * from department_master cm where id = last_insert_id;\
END ;~\
CREATE PROCEDURE `createEnquiry`(\
	IN enq_number VARCHAR(75),\
    IN enquiry_date VARCHAR(30),\
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
    IN products_json JSON,\
    IN c_col1 VARCHAR(5000),\
    IN c_col2 VARCHAR(5000),\
    IN c_col3 VARCHAR(5000),\
    IN c_col4 VARCHAR(5000),\
    IN c_col5 VARCHAR(5000),\
    IN c_col6 VARCHAR(5000),\
    IN c_col7 VARCHAR(5000),\
    IN c_col8 VARCHAR(5000),\
    IN c_col9 VARCHAR(5000),\
    IN c_col10 VARCHAR(5000)\
)\
BEGIN\
	DECLARE last_insert_id_from_header INTEGER;\
    DECLARE last_insert_id_from_ledger INTEGER;\
    DECLARE error INTEGER DEFAULT 0;\
    DECLARE count_contact_usage INTEGER DEFAULT 0;\
	DECLARE count_category_usage INTEGER DEFAULT 0;\
	DECLARE count_source_usage INTEGER DEFAULT 0;\
	DECLARE count_received_by_usage INTEGER DEFAULT 0;\
	DECLARE count_sub_status_usage INTEGER DEFAULT 0;\
	DECLARE count_action_taken_usage INTEGER DEFAULT 0;\
	DECLARE count_next_action_usage INTEGER DEFAULT 0;\
    DECLARE idx INT DEFAULT 0;\
    DECLARE product_count INT;\
    DECLARE slno INT;\
    DECLARE product_id INT;\
    DECLARE unit_id INT;\
    DECLARE local_auto_number INT;\
    DECLARE local_voucher_number VARCHAR(255);\
    DECLARE voucher_config JSON;\
    DECLARE prefix VARCHAR(50);\
    DECLARE suffix VARCHAR(50);\
    DECLARE length INT;\
    DECLARE prefill_with_zero varchar(50);\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    \
    BEGIN\
        ROLLBACK;\
        RESIGNAL;\
    END;\
\
    START TRANSACTION;\
\
    SET error = 0;\
    SET last_insert_id_from_header = 0;\
    SET last_insert_id_from_ledger = 0;\
    \
    DROP TEMPORARY TABLE IF EXISTS temp_error_log;\
    CREATE TEMPORARY TABLE temp_error_log (\
		id INT AUTO_INCREMENT PRIMARY KEY,\
		error_text TEXT,\
		error_path VARCHAR(100)\
	);\
    \
    DROP TEMPORARY TABLE IF EXISTS temp_error_log_for_productgrid;\
    CREATE TEMPORARY TABLE temp_error_log_for_productgrid (\
		id INT AUTO_INCREMENT PRIMARY KEY,\
		error_text TEXT,\
		error_path JSON\
	);\
    \
    SELECT \
        COUNT(cm.id)\
    INTO count_contact_usage FROM\
        contact_master cm\
    WHERE\
        cm.id = contact_id;\
	IF count_contact_usage = 0 AND contact_id!= 0 then\
		SET error = 1;\
		INSERT INTO temp_error_log (error_text, error_path) \
		VALUES ('This value has been deleted recently, Please reselect!', 'contact');\
	END if;\
    \
    SELECT \
        COUNT(ecm.id)\
    INTO count_category_usage FROM\
        enquiry_category_master ecm\
    WHERE\
        ecm.id = category_id;\
	IF count_category_usage = 0 AND category_id!= 0 then\
		SET error = 1;\
		INSERT INTO temp_error_log (error_text, error_path) \
		VALUES ('This value has been deleted recently, Please reselect!', 'category');\
	END if;\
    \
    SELECT \
        COUNT(esm.id)\
    INTO count_source_usage FROM\
        enquiry_source_master esm\
    WHERE\
        esm.id = source_id;\
	IF count_source_usage = 0 AND source_id!= 0 then\
		SET error = 1;\
		INSERT INTO temp_error_log (error_text, error_path) \
		VALUES ('This value has been deleted recently, Please reselect!', 'source');\
	END if;\
    \
    SELECT \
        COUNT(em.id)\
    INTO count_received_by_usage FROM\
        executive_master em\
    WHERE\
        em.id = received_by_id;\
	IF count_received_by_usage = 0 AND received_by_id!= 0 then\
		SET error = 1;\
		INSERT INTO temp_error_log (error_text, error_path) \
		VALUES ('This value has been deleted recently, Please reselect!', 'received_by');\
	END if;\
    \
    SELECT \
        COUNT(essm.id)\
    INTO count_sub_status_usage FROM\
        enquiry_sub_status_master essm\
    WHERE\
    essm.id = sub_status_id;\
	IF count_sub_status_usage = 0 AND sub_status_id!= 0 then\
		SET error = 1;\
		INSERT INTO temp_error_log (error_text, error_path) \
		VALUES ('This value has been deleted recently, Please reselect!', 'sub_status');\
	END if;\
    \
    SELECT \
        COUNT(eam.id)\
    INTO count_action_taken_usage FROM\
        enquiry_action_master eam\
    WHERE\
    eam.id = action_taken_id;\
	IF count_action_taken_usage = 0 AND action_taken_id!= 0 then\
		SET error = 1;\
		INSERT INTO temp_error_log (error_text, error_path) \
		VALUES ('This value has been deleted recently, Please reselect!', 'action_taken');\
	END if;\
    \
    SELECT \
        COUNT(eam.id)\
    INTO count_next_action_usage FROM\
        enquiry_action_master eam\
    WHERE\
        eam.id = next_action_id;\
	IF count_next_action_usage = 0 AND next_action_id!= 0 then\
		SET error = 1;\
		INSERT INTO temp_error_log (error_text, error_path) \
		VALUES ('This value has been deleted recently, Please reselect!', 'next_action');\
	END if;\
\
SET idx = 0;\
SET product_count = JSON_LENGTH(products_json); \
\
WHILE idx < product_count DO\
	SET slno = JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].id'))); \
	SET product_id = JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].product_id')));\
	SET unit_id = JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].unit_id')));\
	IF (SELECT COUNT(pm.id) FROM product_master pm WHERE pm.id = product_id) = 0 AND product_id!= 0 THEN\
		SET error = 1;\
		INSERT INTO temp_error_log_for_productgrid(error_text, error_path)\
		VALUES ('Product value deleted recently, Please reselect!', JSON_ARRAY(slno,'product'));\
	END IF;\
    IF (SELECT COUNT(um.id) FROM unit_master um WHERE um.id = unit_id) = 0 AND unit_id!= 0 THEN\
		SET error = 1;\
		INSERT INTO temp_error_log_for_productgrid(error_text, error_path)\
		VALUES ('Unit value deleted recently, Please reselect!', JSON_ARRAY(slno,'unit'));\
	END IF;\
	SET idx = idx + 1;  \
END WHILE; \
\
	IF error = 0 then\
		 SELECT IFNULL(MAX(auto_number), 0) + 1 INTO local_auto_number \
    FROM enquiry_header_tran;\
\
    SELECT config INTO voucher_config \
    FROM app_config \
    WHERE config_type_id = 1;\
\
    SET @voucher_number_enabled = JSON_UNQUOTE(JSON_EXTRACT(voucher_config, '$.voucher.voucherNumber'));\
    SET prefix = JSON_UNQUOTE(JSON_EXTRACT(voucher_config, '$.voucher.prefix'));\
    SET suffix = JSON_UNQUOTE(JSON_EXTRACT(voucher_config, '$.voucher.suffix'));\
    SET length = CAST(JSON_UNQUOTE(JSON_EXTRACT(voucher_config, '$.voucher.length')) AS UNSIGNED);\
	SET prefill_with_zero = JSON_UNQUOTE(JSON_EXTRACT(voucher_config, '$.voucher.prefillWithZero'));\
\
    IF @voucher_number_enabled = 'true' THEN\
        IF prefill_with_zero = 'true' THEN\
            SET @number_part = LPAD(local_auto_number, length, '0');\
        ELSE\
            SET @number_part = CAST(local_auto_number AS CHAR);\
        END IF;\
        SET local_voucher_number = CONCAT(prefix, @number_part, suffix);\
    ELSE\
        SET local_voucher_number = NULL;\
        SET local_auto_number = 0;\
    END IF;\
        \
        INSERT INTO enquiry_header_tran\
        (enq_number, date, auto_number, contact_id, received_by_id, category_id, source_id,call_receipt_remark, stamp, modified_by, modified_on, created_by, created_on,voucher_number  )\
        VALUES \
        (enq_number, enquiry_date, local_auto_number, contact_id, received_by_id, category_id, source_id,call_receipt_remark, 0, NULL, NULL, created_by,\
        UTC_TIMESTAMP(), local_voucher_number);\
\
        SET last_insert_id_from_header = LAST_INSERT_ID();\
\
        INSERT INTO enquiry_ledger_tran\
        (enquiry_id, status_version, allocated_to, date, status_id, sub_status_id, action_taken_id, next_action_id, next_action_date, \
        suggested_action_remark, action_taken_remark, closure_remark, enquiry_tran_type_id, active, created_by)\
        VALUES\
        (last_insert_id_from_header, 0, allocated_to_id, enquiry_date, status_id, sub_status_id, action_taken_id, next_action_id, next_action_date,\
        suggested_action_remark, action_taken_remark, closure_remark, enquiry_tran_type, 1 , created_by);\
        \
		SET last_insert_id_from_ledger = LAST_INSERT_ID();\
        \
		SET idx = 0;\
        SET product_count = JSON_LENGTH(products_json); \
        WHILE idx < product_count DO\
            INSERT INTO enquiry_product_tran (enquiry_id,slno, product_id, quantity, unit_id, remark)  \
            VALUES (\
                last_insert_id_from_header,\
				JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].id'))),      \
                JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].product_id'))),      \
                JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].quantity'))),     \
                JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].unit_id'))),      \
                JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].remark')))       \
            );\
            SET idx = idx + 1;  \
        END WHILE;      \
        \
		INSERT INTO custom_fields_data\
        (c_col1,c_col2,c_col3,c_col4,c_col5,c_col6,c_col7,c_col8,c_col9,c_col10,object_id,object_type_id)\
        VALUES\
        (c_col1,c_col2,c_col3,c_col4,c_col5,c_col6,c_col7,c_col8,c_col9,c_col10,last_insert_id_from_ledger,(SELECT id FROM object_type_master where name = 'Enquiry'));\
        \
    END IF;\
\
    COMMIT;\
       \
SELECT * FROM temp_error_log;\
SELECT * FROM temp_error_log_for_productgrid;\
SELECT * FROM enquiry_header_tran WHERE id = last_insert_id_from_header;\
END ;~\
CREATE DEFINER=`Ankitalgofast`@`localhost` PROCEDURE `createEnquiryLedger`(\
    IN ledgerId integer,\
    IN statusId integer,\
    IN subStatusId integer,\
    IN actionTakenId integer,\
    IN nextActionId integer,\
    IN suggestedActionRemark TEXT,\
    IN actionTakenRemark TEXT,\
    IN closureRemark TEXT,\
    IN userId INT,\
    IN nextActionDate DATETIME\
    )\
BEGIN\
    DECLARE version integer;\
    DECLARE last_insert_id integer;\
    DECLARE enqId integer;\
    DECLARE enquiryTypeId integer;\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END;\
	start transaction;\
		SELECT lt.enquiry_id INTO enqId from enquiry_ledger_tran lt where lt.id = ledgerId;\
        SELECT etm.id INTO enquiryTypeId FROM enquiry_tran_type_master etm where etm.name = 'Update';\
        UPDATE enquiry_ledger_tran lt SET lt.active = 0 WHERE lt.id = ledgerId;\
        INSERT INTO enquiry_ledger_tran\
			(`enquiry_id`, `status_version`, `allocated_to`, `date`, `status_id`, `sub_status_id`, \
			 `action_taken_id`, `next_action_id`, `next_action_date`, `suggested_action_remark`, `action_taken_remark`, `closure_remark`,\
             `enquiry_tran_type_id`, `id`, `active`, `created_by`) VALUES\
			(enqId, 0, userId, now(), statusId, subStatusId, actionTakenId, nextActionId, nextActionDate, \
			 suggestedActionRemark, actionTakenRemark, closureRemark, enquiryTypeId, id, 1, userId);\
			set last_insert_id = LAST_INSERT_ID();\
    commit;\
   \
    select * from enquiry_ledger_tran cm where id = last_insert_id;\
END ;~\
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
			   values (name, 0, user_id, UTC_TIMESTAMP());\
               \
			set last_insert_id = LAST_INSERT_ID();\
		END if;\
    commit;\
   \
	select error, error_path, error_text;\
    select * from enquiry_source_master cm where id = last_insert_id;\
END ;~\
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
		INSERT INTO enquiry_sub_status_master (name,stamp,enquiry_status_id,created_by,created_on) VALUES (user_name,0,status_id,user_id,UTC_TIMESTAMP());\
		set last_insert_id = LAST_INSERT_ID();\
	END if;\
	commit;\
   \
    select error, error_path, error_text;\
    select * from enquiry_sub_status_master am where am.id = last_insert_id;\
END ;~\
CREATE PROCEDURE `createExecutive`(\
 IN alias varchar(60),\
    IN name varchar(60),\
    IN address1 varchar(75),\
    IN address2 varchar(75),\
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
    IN user_id integer,\
	IN ccol1 varchar(100),\
    IN ccol2 varchar(100),\
    IN ccol3 varchar(100),\
    IN ccol4 varchar(100),\
    IN ccol5 varchar(100),\
    IN ccol6 varchar(100),\
    IN ccol7 varchar(100),\
    IN ccol8 varchar(100),\
    IN ccol9 varchar(100),\
    IN ccol10 varchar(100)\
    )\
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
	declare count_area_usage integer DEFAULT 0;\
    declare count_edm_usage integer DEFAULT 0;\
    declare count_erm_usage integer DEFAULT 0;\
    declare count_egm_usage integer DEFAULT 0;\
    declare count_usage integer DEFAULT 0;\
    declare count_state_usage integer DEFAULT 0;\
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
            SELECT COUNT(am.id) INTO count_area_usage\
		FROM area_master am\
		WHERE am.id = area_id;\
			if count_area_usage = 0 AND area_id != 0 then\
				set error = 1;\
				INSERT INTO error_table (error_text, error_path) \
				VALUES ('Area has been updated recently, Please refresh the page!', 'area');\
			END if;\
\
        SELECT COUNT(edm.id) INTO count_edm_usage\
		FROM executive_dept_master edm\
		WHERE edm.id = dept_id;\
			if count_edm_usage = 0 AND dept_id != 0 then\
				set error = 1;\
				INSERT INTO error_table (error_text, error_path) \
				VALUES ('Executive_Dept has been updated recently, Please refresh the page!', 'executive_dept');\
			END if;\
                  \
		SELECT COUNT(erm.id) INTO count_erm_usage\
		FROM executive_role_master erm\
		WHERE erm.id = role_id;\
			if count_erm_usage = 0 AND role_id!=0 then\
				set error = 1;\
				INSERT INTO error_table (error_text, error_path) \
				VALUES ('Executive_Role has been updated recently, Please refresh the page!', 'role');\
			END if;\
                  \
		SELECT COUNT(egm.id) INTO count_egm_usage\
		FROM executive_group_master egm\
		WHERE egm.id = group_id;\
			if count_egm_usage = 0 AND group_id!= 0 then\
				set error = 1;\
				INSERT INTO error_table (error_text, error_path) \
				VALUES ('Executive_Group has been updated recently, Please refresh the page!', 'group');\
			END if;\
            \
        SELECT COUNT(cnm.id) INTO count_usage\
		FROM country_master cnm\
		WHERE cnm.id = country_id;\
			if count_usage = 0 AND country_id != 0 then\
				set error = 1;\
				INSERT INTO error_table (error_text, error_path) \
				VALUES ('Country has been updated recently, Please refresh the page!', 'country');\
			END if;\
            \
		SELECT COUNT(sm.id) INTO count_state_usage\
		FROM state_master sm\
		WHERE sm.id = state_id;\
			if count_state_usage = 0 AND state_id != 0 then\
				set error = 1;\
				INSERT INTO error_table (error_text, error_path) \
				VALUES ('State has been updated recently, Please refresh the page!', 'state');\
			END if; \
             \
            if error = 0 then\
                select ctm.id into var_call_type_id from call_type_master ctm where ctm.name=call_type LOCK IN SHARE MODE;\
                                \
                insert into executive_master \
                (alias, name, stamp, address1, address2, city, \
                state_id, pincode, country_id, email, \
                mobile, whatsapp, created_by, created_on, \
                dob, doa, doj, pan, aadhaar, area_id, call_type_id, \
                crm_user_id, role_id, dept_id, group_id) \
                values\
                (alias, name, 0, address1, address2, city, \
                state_id, pincode, country_id, email, \
                mobile, whatsapp, user_id, UTC_TIMESTAMP(), \
                dofb, dofa, dofj, pan, aadhaar, area_id, var_call_type_id, \
                crm_user_id, role_id, dept_id, group_id);\
                \
                 set last_insert_id = LAST_INSERT_ID();\
		insert into custom_fields_data(c_col1,c_col2,c_col3,c_col4,c_col5,c_col6,c_col7,c_col8,c_col9,c_col10,object_id,object_type_id)\
                values(ccol1,ccol2,ccol3,ccol4,ccol5,ccol6,ccol7,ccol8,ccol9,ccol10,last_insert_id,11);\
\
\
                \
                end if;\
    commit;\
    \
    select * from error_table;\
    select * from executive_master em where em.id = last_insert_id;\
END ;~\
CREATE PROCEDURE `createExecutiveDept`(\
    IN name varchar(60),\
    IN user_id integer,\
    IN ccol1 varchar(100),\
    IN ccol2 varchar(100),\
    IN ccol3 varchar(100),\
    IN ccol4 varchar(100),\
    IN ccol5 varchar(100),\
    IN ccol6 varchar(100),\
    IN ccol7 varchar(100),\
    IN ccol8 varchar(100),\
    IN ccol9 varchar(100),\
    IN ccol10 varchar(100)\
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
        values (name, 0, user_id, UTC_TIMESTAMP());\
	\
		set last_insert_id = LAST_INSERT_ID();\
        insert into custom_fields_data(c_col1,c_col2,c_col3,c_col4,c_col5,c_col6,c_col7,c_col8,c_col9,c_col10,object_id,object_type_id)\
                values(ccol1,ccol2,ccol3,ccol4,ccol5,ccol6,ccol7,ccol8,ccol9,ccol10,last_insert_id,10);\
        \
	END if;\
    commit;\
   \
	select error, error_path, error_text;\
    select * from executive_dept_master cm where id = last_insert_id;\
END ;~\
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
		(alias, name, 0, parent_id, user_id, UTC_TIMESTAMP());\
		set last_insert_id = LAST_INSERT_ID();\
	END if;\
    commit;\
    \
    select * from temp_error_log;\
    select * from executive_group_master egm where egm.id = last_insert_id;\
END ;~\
CREATE PROCEDURE `createExecutiveRole`(\
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
		   		insert into executive_role_master (name, stamp, created_by, created_on)\
				values (name, 0, user_id, UTC_TIMESTAMP());\
			  \
			set last_insert_id = LAST_INSERT_ID();\
		END if;\
    commit;\
   \
	select error, error_path, error_text;\
    select * from executive_role_master rm where id = last_insert_id;\
END ;~\
CREATE PROCEDURE `createOrganisation`(\
		IN alias VARCHAR(75),\
        IN name VARCHAR(75),\
        IN printName VARCHAR(75),\
        IN pan VARCHAR(75),\
        IN gstin VARCHAR(75),\
        IN address1 VARCHAR(75),\
        IN address2 VARCHAR(75),\
        IN city VARCHAR(75),\
        IN state_id VARCHAR(75),\
        IN pincode VARCHAR(75),\
        IN country_id VARCHAR(75),\
        IN user_id integer,\
		IN ccol1 varchar(100),\
		IN ccol2 varchar(100),\
		IN ccol3 varchar(100),\
		IN ccol4 varchar(100),\
		IN ccol5 varchar(100),\
		IN ccol6 varchar(100),\
		IN ccol7 varchar(100),\
		IN ccol8 varchar(100),\
		IN ccol9 varchar(100),\
        IN ccol10 varchar(100)\
        )\
BEGIN\
	DECLARE error integer;\
	DECLARE last_insert_id integer;\
    DECLARE count_alias integer;\
    declare count_name integer;\
	declare count_pan varchar(20);\
    declare count_gstin varchar(20);\
    declare count_usage integer DEFAULT 0;\
    declare count_state_usage integer DEFAULT 0;\
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
        SELECT COUNT(cnm.id) INTO count_usage\
		FROM country_master cnm\
		WHERE cnm.id = country_id;\
			if count_usage = 0 AND country_id != 0 then\
				set error = 1;\
				INSERT INTO temp_error_log (error_text, error_path) \
				VALUES ('Country has been updated recently, Please refresh the page!', 'country');\
			END if;\
            \
		SELECT COUNT(sm.id) INTO count_state_usage\
		FROM state_master sm\
		WHERE sm.id = state_id;\
			if count_state_usage = 0 AND state_id != 0 then\
				set error = 1;\
				INSERT INTO temp_error_log (error_text, error_path) \
				VALUES ('State has been updated recently, Please refresh the page!', 'state');\
			END if;\
		\
        if error = 0 then\
                \
				insert into organisation_master \
				(alias, name, stamp, print_name, pan, gstin, address1, address2, city, state_id, pincode, country_id, created_by, created_on) \
				values\
				(alias, name, 0, printName, pan, gstin, address1, address2, city, state_id, pincode, country_id, user_id, UTC_TIMESTAMP());\
				set last_insert_id = LAST_INSERT_ID();\
                insert into custom_fields_data(c_col1,c_col2,c_col3,c_col4,c_col5,c_col6,c_col7,c_col8,c_col9,c_col10,object_id,object_type_id)\
                values(ccol1,ccol2,ccol3,ccol4,ccol5,ccol6,ccol7,ccol8,ccol9,ccol10,last_insert_id,19);\
        \
        \
		END if;\
        \
	commit;\
    \
    \
	select * from temp_error_log;\
    select * from organisation_master where id = last_insert_id;\
END ;~\
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
	declare count_usage integer DEFAULT 0;\
    declare count_unit_usage integer DEFAULT 0;\
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
		SELECT COUNT(pg.id) INTO count_usage\
		FROM product_group_master pg\
		WHERE pg.id = group_id;\
			if count_usage = 0 AND group_id != 0 then\
				set error = 1;\
				INSERT INTO error_log (error_text, error_path) \
				VALUES ('Product Group has been updated recently, Please refresh the page!', 'productGroup');\
			END if;\
            \
		SELECT COUNT(um.id) INTO count_unit_usage\
		FROM unit_master um\
		WHERE um.id = unit_id;\
			if count_unit_usage = 0 AND unit_id != 0 then\
				set error = 1;\
				INSERT INTO error_log (error_text, error_path) \
				VALUES ('Unit has been updated recently, Please refresh the page!', 'unit');\
			END if;\
        \
       IF error=0 THEN \
				\
				insert into product_master \
				(name, stamp, group_id, alias, unit_id, hsn_code, created_by, modified_by, created_on, modified_on) \
				values\
				(name, 0, group_id, alias, unit_id, hsn_code, user_id, null, UTC_TIMESTAMP(), null); \
				set last_insert_id = LAST_INSERT_ID();\
		END IF;\
            \
	commit;\
    \
    \
    select * from error_log;\
    select * from product_master where id = last_insert_id;\
END ;~\
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
				(name, alias, 0, parent_id, UTC_TIMESTAMP(), null, user_id, null, is_parent); \
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
	declare count_usage integer DEFAULT 0;\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL;\
    END;\
\
    START TRANSACTION;\
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_error_log (\
		id INT AUTO_INCREMENT PRIMARY KEY,\
		error_text VARCHAR(255),\
		error_path VARCHAR(100)\
	);\
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
     SELECT COUNT(cnm.id) INTO count_usage\
		FROM country_master cnm\
		WHERE cnm.id = country_id;\
			if count_usage = 0 AND country_id != 0 then\
				set error = 1;\
				INSERT INTO temp_error_log (error_text, error_path) \
				VALUES ('Country has been updated recently, Please refresh the page!', 'country');\
			END if;\
\
    IF error = 0 THEN\
        INSERT INTO state_master (name, stamp, alias, created_by, created_on, country_id)\
        VALUES (name, 0, alias, user_id, UTC_TIMESTAMP(), country_id);\
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
			INSERT INTO ticket_action_master (name,stamp,created_by,created_on) VALUES (name,0,user_id,UTC_TIMESTAMP());\
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
			   values (name, 0, user_id, UTC_TIMESTAMP());\
			set last_insert_id = LAST_INSERT_ID();\
		END if;\
    commit;\
   \
	select error, error_path, error_text;\
    select * from ticket_category_master cm where id = last_insert_id;\
END ;~\
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
		INSERT INTO ticket_sub_status_master (name,stamp,ticket_status_id,created_by,created_on) VALUES (user_name,0,status_id,user_id,UTC_TIMESTAMP());\
		set last_insert_id = LAST_INSERT_ID();\
	END if;\
	commit;\
   \
    select error, error_path, error_text;\
    select * from ticket_sub_status_master am where am.id = last_insert_id;\
END ;~\
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
    IN products_json JSON,\
    IN c_col1 VARCHAR(5000),\
    IN c_col2 VARCHAR(5000),\
    IN c_col3 VARCHAR(5000),\
    IN c_col4 VARCHAR(5000),\
    IN c_col5 VARCHAR(5000),\
    IN c_col6 VARCHAR(5000),\
    IN c_col7 VARCHAR(5000),\
    IN c_col8 VARCHAR(5000),\
    IN c_col9 VARCHAR(5000),\
    IN c_col10 VARCHAR(5000)\
)\
BEGIN\
    DECLARE last_insert_id_from_header INTEGER;\
    DECLARE last_insert_id_from_ledger INTEGER;\
    DECLARE error INTEGER DEFAULT 0;\
    DECLARE idx INT DEFAULT 0;\
    DECLARE product_count INT;\
    DECLARE slno INT;\
    DECLARE product_id INT;\
    DECLARE count_contact_usage INTEGER DEFAULT 0;\
    DECLARE count_category_usage INTEGER DEFAULT 0;\
    DECLARE count_received_by_usage INTEGER DEFAULT 0;\
    DECLARE count_sub_status_usage INTEGER DEFAULT 0;\
    DECLARE count_action_taken_usage INTEGER DEFAULT 0;\
    DECLARE count_next_action_usage INTEGER DEFAULT 0;\
     DECLARE local_auto_number INT;\
    DECLARE local_voucher_number VARCHAR(255);\
    DECLARE voucher_config JSON;\
    DECLARE prefix VARCHAR(50);\
    DECLARE suffix VARCHAR(50);\
    DECLARE length INT;\
    DECLARE prefill_with_zero varchar(50);\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL;\
    END;\
\
    START TRANSACTION;\
\
    DROP TEMPORARY TABLE IF EXISTS temp_error_log;\
    CREATE TEMPORARY TABLE temp_error_log (\
        id INT AUTO_INCREMENT PRIMARY KEY,\
        error_text TEXT,\
        error_path VARCHAR(100)\
    );\
\
    DROP TEMPORARY TABLE IF EXISTS temp_error_log_for_productgrid;\
    CREATE TEMPORARY TABLE temp_error_log_for_productgrid (\
        id INT AUTO_INCREMENT PRIMARY KEY,\
        error_text TEXT,\
        error_path JSON\
    );\
\
    SELECT COUNT(cm.id) INTO count_contact_usage\
    FROM contact_master cm\
    WHERE cm.id = contact_id;\
    IF count_contact_usage = 0 AND contact_id != 0 THEN\
        SET error = 1;\
        INSERT INTO temp_error_log (error_text, error_path)\
        VALUES ('This value has been deleted recently, Please reselect!', 'contact');\
    END IF;\
\
    SELECT COUNT(ecm.id) INTO count_category_usage\
    FROM ticket_category_master ecm\
    WHERE ecm.id = category_id;\
    IF count_category_usage = 0 AND category_id != 0 THEN\
        SET error = 1;\
        INSERT INTO temp_error_log (error_text, error_path)\
        VALUES ('This value has been deleted recently, Please reselect!', 'category');\
    END IF;\
\
    SELECT COUNT(em.id) INTO count_received_by_usage\
    FROM executive_master em\
    WHERE em.id = received_by_id;\
    IF count_received_by_usage = 0 AND received_by_id != 0 THEN\
        SET error = 1;\
        INSERT INTO temp_error_log (error_text, error_path)\
        VALUES ('This value has been deleted recently, Please reselect!', 'received_by');\
    END IF;\
\
    SELECT COUNT(essm.id) INTO count_sub_status_usage\
    FROM ticket_sub_status_master essm\
    WHERE essm.id = sub_status_id;\
    IF count_sub_status_usage = 0 AND sub_status_id != 0 THEN\
        SET error = 1;\
        INSERT INTO temp_error_log (error_text, error_path)\
        VALUES ('This value has been deleted recently, Please reselect!', 'sub_status');\
    END IF;\
\
    SELECT COUNT(eam.id) INTO count_action_taken_usage\
    FROM ticket_action_master eam\
    WHERE eam.id = action_taken_id;\
    IF count_action_taken_usage = 0 AND action_taken_id != 0 THEN\
        SET error = 1;\
        INSERT INTO temp_error_log (error_text, error_path)\
        VALUES ('This value has been deleted recently, Please reselect!', 'action_taken');\
    END IF;\
\
    SELECT COUNT(eam.id) INTO count_next_action_usage\
    FROM ticket_action_master eam\
    WHERE eam.id = next_action_id;\
    IF count_next_action_usage = 0 AND next_action_id != 0 THEN\
        SET error = 1;\
        INSERT INTO temp_error_log (error_text, error_path)\
        VALUES ('This value has been deleted recently, Please reselect!', 'next_action');\
    END IF;\
\
    SET idx = 0;\
    SET product_count = JSON_LENGTH(products_json);\
\
    WHILE idx < product_count DO\
        SET slno = JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].id')));\
        SET product_id = JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].product_id')));\
        \
        IF (SELECT COUNT(pm.id) FROM product_master pm WHERE pm.id = product_id) = 0 AND product_id != 0 THEN\
            SET error = 1;\
            INSERT INTO temp_error_log_for_productgrid(error_text, error_path)\
            VALUES ('Product value deleted recently, Please reselect!', JSON_ARRAY(slno, 'product'));\
        END IF;\
\
        SET idx = idx + 1;\
    END WHILE;\
\
    IF error = 0 THEN\
    \
    SELECT IFNULL(MAX(auto_number), 0) + 1 INTO local_auto_number \
    FROM ticket_header_tran;\
\
    SELECT config INTO voucher_config \
    FROM app_config \
    WHERE config_type_id = 2;\
\
    SET @voucher_number_enabled = JSON_UNQUOTE(JSON_EXTRACT(voucher_config, '$.voucher.voucherNumber'));\
    SET prefix = JSON_UNQUOTE(JSON_EXTRACT(voucher_config, '$.voucher.prefix'));\
    SET suffix = JSON_UNQUOTE(JSON_EXTRACT(voucher_config, '$.voucher.suffix'));\
    SET length = CAST(JSON_UNQUOTE(JSON_EXTRACT(voucher_config, '$.voucher.length')) AS UNSIGNED);\
	SET prefill_with_zero = JSON_UNQUOTE(JSON_EXTRACT(voucher_config, '$.voucher.prefillWithZero'));\
\
    IF @voucher_number_enabled = 'true' THEN\
        IF prefill_with_zero = 'true' THEN\
            SET @number_part = LPAD(local_auto_number, length, '0');\
        ELSE\
            SET @number_part = CAST(local_auto_number AS CHAR);\
        END IF;\
        SET local_voucher_number = CONCAT(prefix, @number_part, suffix);\
    ELSE\
        SET local_voucher_number = NULL;\
        set local_auto_number = 0;\
    END IF;\
        INSERT INTO ticket_header_tran\
        (tkt_number, date, auto_number, contact_id, received_by_id, category_id, call_receipt_remark, stamp, modified_by, modified_on, created_by, created_on,voucher_number)\
        VALUES\
        (tkt_number, date, local_auto_number, contact_id, received_by_id, category_id, call_receipt_remark, 0, NULL, NULL, created_by, UTC_TIMESTAMP(),local_voucher_number);\
\
        SET last_insert_id_from_header = LAST_INSERT_ID();\
\
        INSERT INTO ticket_ledger_tran\
        (ticket_id, status_version, allocated_to, date, status_id, sub_status_id, action_taken_id, next_action_id, next_action_date, \
         suggested_action_remark, action_taken_remark, closure_remark, ticket_tran_type_id, active, created_by, created_on)\
        VALUES\
        (last_insert_id_from_header, 0, allocated_to_id, date, status_id, sub_status_id, action_taken_id, next_action_id, next_action_date,\
         suggested_action_remark, action_taken_remark, closure_remark, ticket_tran_type, active, created_by, UTC_TIMESTAMP());\
\
        SET last_insert_id_from_ledger = LAST_INSERT_ID();\
\
        SET idx = 0;\
        WHILE idx < product_count DO\
            INSERT INTO ticket_product_tran (ticket_id, slno, product_id)\
            VALUES (\
                last_insert_id_from_header,\
                JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].id'))),\
                JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].product_id')))\
            );\
            SET idx = idx + 1;\
        END WHILE;\
\
        INSERT INTO custom_fields_data\
        (c_col1, c_col2, c_col3, c_col4, c_col5, c_col6, c_col7, c_col8, c_col9, c_col10, object_id, object_type_id)\
        VALUES\
        (c_col1, c_col2, c_col3, c_col4, c_col5, c_col6, c_col7, c_col8, c_col9, c_col10, last_insert_id_from_ledger, (SELECT id FROM object_type_master WHERE name = 'Support'));\
    END IF;\
\
    COMMIT;\
\
    SELECT * FROM temp_error_log;\
    SELECT * FROM temp_error_log_for_productgrid;\
    SELECT * FROM ticket_header_tran WHERE id = last_insert_id_from_header;\
END ;~\
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
        (tkt_number, date, 0, contact_id, received_by_id, category_id, call_receipt_remark, 0, NULL, NULL, created_by, UTC_TIMESTAMP());\
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
				(name, 0, user_id, null, UTC_TIMESTAMP(), null); \
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
CREATE PROCEDURE `deleteAction`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE count_usage INT;\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM enquiry_action_master WHERE id = deleted_id FOR UPDATE;\
   \
    SELECT COUNT(em.id) INTO count_usage \
    FROM enquiry_action_master em \
    LEFT JOIN enquiry_action_tran et ON et.enquiry_action_id = em.id\
    LEFT JOIN enquiry_ledger_tran eh1 ON eh1.action_taken_id = em.id \
    LEFT JOIN enquiry_ledger_tran eh2 ON eh2.next_action_id = em.id \
    LEFT JOIN ticket_ledger_tran th1 ON th1.action_taken_id = em.id \
    LEFT JOIN ticket_ledger_tran th2 ON th2.next_action_id = em.id \
    WHERE (et.enquiry_action_id IS NOT NULL OR eh1.action_taken_id IS NOT NULL OR eh2.next_action_id IS NOT NULL OR th1.action_taken_id IS NOT NULL OR th2.next_action_id IS NOT NULL) AND em.id=deleted_id;\
\
    IF count_usage > 0 THEN\
        SET error = 1;\
        SET error_path = 'delete';\
        SET error_text = 'Action cannot be deleted because it is being used';\
    END IF;\
\
    IF error = 0 THEN\
        DELETE FROM enquiry_action_master WHERE id = deleted_id;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteAllocationType`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE count_usage INT;\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM allocation_type_master WHERE id = deleted_id FOR UPDATE;\
\
    IF error = 0 THEN\
        DELETE FROM allocation_type_master WHERE id = deleted_id;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteArea`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE count_usage INT;\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM area_master WHERE id = deleted_id FOR UPDATE;\
   \
	SELECT COUNT(*) INTO count_usage \
    FROM area_master am\
    LEFT JOIN contact_master cm ON cm.area_id = am.id\
    LEFT JOIN executive_master em ON em.area_id = am.id\
    WHERE am.id = deleted_id AND (cm.area_id IS NOT NULL OR em.area_id IS NOT NULL);\
\
    IF count_usage > 0 THEN\
        SET error = 1;\
        SET error_path = 'delete';\
        SET error_text = 'Area cannot be deleted because it is being used';\
    END IF;\
\
    IF error = 0 THEN\
        DELETE FROM area_master WHERE id = deleted_id;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteCategory`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE count_usage INT;\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM enquiry_category_master WHERE id = deleted_id FOR UPDATE;\
   \
	SELECT COUNT(cm.id) INTO count_usage \
    FROM enquiry_category_master cm \
    LEFT JOIN enquiry_header_tran eh ON eh.category_id = cm.id \
    LEFT JOIN ticket_header_tran th ON th.category_id = cm.id \
    WHERE (eh.category_id IS NOT NULL OR th.category_id IS NOT NULL) AND cm.id=deleted_id;\
\
    IF count_usage > 0 THEN\
        SET error = 1;\
        SET error_path = 'delete';\
        SET error_text = 'Category cannot be deleted because it is being used';\
    END IF;\
\
    IF error = 0 THEN\
        DELETE FROM enquiry_category_master WHERE id = deleted_id;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteContact`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE count_usage INT;\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM contact_master WHERE id = deleted_id FOR UPDATE;\
   \
	SELECT COUNT(cm.id) INTO count_usage \
    FROM contact_master cm \
    LEFT JOIN enquiry_header_tran eh ON eh.contact_id = cm.id \
    LEFT JOIN ticket_header_tran th ON th.contact_id = cm.id \
    WHERE (eh.contact_id IS NOT NULL OR th.contact_id IS NOT NULL) AND cm.id=deleted_id;\
\
    IF count_usage > 0 THEN\
        SET error = 1;\
        SET error_path = 'delete';\
        SET error_text = 'Contact cannot be deleted because it is being used';\
    END IF;\
\
    IF error = 0 THEN\
        DELETE FROM contact_master WHERE id = deleted_id;\
        DELETE FROM custom_fields_data WHERE object_id = deleted_id AND object_type_id = 5;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteContactGroup`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE count_usage INT;\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM contact_group_master WHERE id = deleted_id FOR UPDATE;\
\
    SELECT COUNT(cm.id) INTO count_usage\
    FROM contact_master cm\
    WHERE cm.group_id = deleted_id;\
\
    IF count_usage > 0 THEN\
        SET error = 1;\
        SET error_path = 'delete';\
        SET error_text = 'Group cannot be deleted because it is being used';\
    END IF;\
\
    IF error = 0 THEN\
        DELETE FROM contact_group_master WHERE id = deleted_id;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteCountry`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE count_usage INT;\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM country_master WHERE id = deleted_id FOR UPDATE;\
   \
	SELECT COUNT(cm.id) INTO count_usage \
    FROM country_master cm \
    LEFT JOIN executive_master em ON em.country_id = cm.id \
    LEFT JOIN contact_master nm ON nm.country_id = cm.id \
    LEFT JOIN organisation_master om ON om.country_id = cm.id \
    LEFT JOIN state_master sm ON sm.country_id=cm.id \
    WHERE (em.country_id IS NOT NULL OR nm.country_id IS NOT NULL OR om.country_id IS NOT NULL OR sm.country_id IS NOT NULL) AND cm.id=deleted_id;\
\
    IF count_usage > 0 THEN\
        SET error = 1;\
        SET error_path = 'delete';\
        SET error_text = 'Country cannot be deleted because it is being used';\
    END IF;\
\
    IF error = 0 THEN\
        DELETE FROM country_master WHERE id = deleted_id;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteCurrency`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM currency_data WHERE id = deleted_id FOR UPDATE;\
\
    IF error = 0 THEN\
        DELETE FROM currency_data WHERE id = deleted_id;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteDepartment`(\
    IN dep_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE count_usage INT;\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM department_master WHERE id = dep_id FOR UPDATE;\
\
    SELECT COUNT(cm.id) INTO count_usage\
    FROM contact_master cm\
    WHERE cm.department_id = dep_id;\
\
    IF count_usage > 0 THEN\
        SET error = 1;\
        SET error_path = 'delete';\
        SET error_text = 'Department cannot be deleted because it is being used';\
    END IF;\
\
    IF error = 0 THEN\
        DELETE FROM department_master WHERE id = dep_id;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteEnquiry`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE ledger_count INT;\
	DECLARE ledger_id INT;\
\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM enquiry_header_tran WHERE id = deleted_id FOR UPDATE;\
   \
	SELECT COUNT(elt.id) INTO ledger_count\
    FROM enquiry_ledger_tran elt \
    WHERE elt.enquiry_id= deleted_id;\
\
    IF ledger_count > 1 THEN\
        SET error = 1;\
        SET error_path = 'delete';\
        SET error_text = 'New entries have been added. The enquiry cannot be deleted.';\
    END IF;\
\
    IF error = 0 THEN\
		SELECT id INTO ledger_id FROM enquiry_ledger_tran where enquiry_id = deleted_id;\
        DELETE FROM enquiry_header_tran WHERE id = deleted_id;\
        DELETE FROM enquiry_ledger_tran WHERE enquiry_id = deleted_id;\
        DELETE FROM custom_fields_data WHERE object_id = ledger_id AND object_type_id = \
        (SELECT id FROM object_type_master WHERE name = 'Enquiry');\
        DELETE from enquiry_product_tran where enquiry_id = deleted_id;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteEnquiryStatus`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE count_usage INT;\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM enquiry_status_master WHERE id = deleted_id FOR UPDATE;\
   \
	SELECT COUNT(cm.id) INTO count_usage \
    FROM enquiry_status_master cm \
    LEFT JOIN enquiry_ledger_tran eh ON eh.status_id = cm.id \
    LEFT JOIN ticket_ledger_tran th ON th.status_id = cm.id \
    WHERE (eh.status_id IS NOT NULL OR th.status_id IS NOT NULL) AND cm.id=deleted_id;\
\
    IF count_usage > 0 THEN\
        SET error = 1;\
        SET error_path = 'delete';\
        SET error_text = 'Status cannot be deleted because it is being used';\
    END IF;\
\
    IF error = 0 THEN\
        DELETE FROM enquiry_status_master WHERE id = deleted_id;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteExecutive`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE count_usage INT;\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM executive_master WHERE id = deleted_id FOR UPDATE;\
   \
	SELECT COUNT(em.id) INTO count_usage \
    FROM executive_master em \
    LEFT JOIN enquiry_header_tran eh ON eh.received_by_id = em.id \
    LEFT JOIN ticket_header_tran th ON th.received_by_id = em.id \
	LEFT JOIN enquiry_allocation ea ON ea.executive_id = em.id \
    LEFT JOIN enquiry_ledger_tran el ON el.allocated_to = em.id\
    WHERE (eh.received_by_id IS NOT NULL OR th.received_by_id IS NOT NULL OR ea.executive_id IS NOT NULL OR el.allocated_to IS NOT NULL) AND em.id=deleted_id;\
\
    IF count_usage > 0 THEN\
        SET error = 1;\
        SET error_path = 'delete';\
        SET error_text = 'Executive cannot be deleted because it is being used';\
    END IF;\
\
    IF error = 0 THEN\
        DELETE FROM executive_master WHERE id = deleted_id;\
        DELETE FROM custom_fields_data WHERE object_id = deleted_id AND object_type_id=11;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteExecutiveDept`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE count_usage INT;\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM executive_dept_master WHERE id = deleted_id FOR UPDATE;\
   \
	SELECT COUNT(edm.id) INTO count_usage \
	FROM executive_dept_master edm \
    LEFT JOIN executive_master em ON em.dept_id = edm.id \
    WHERE (em.dept_id IS NOT NULL) AND edm.id=deleted_id;\
    \
    IF count_usage > 0 THEN\
        SET error = 1;\
        SET error_path = 'delete';\
        SET error_text = 'Executive Dept cannot be deleted because it is being used';\
    END IF;\
\
    IF error = 0 THEN\
        DELETE FROM executive_dept_master WHERE id = deleted_id;\
        DELETE FROM custom_fields_data WHERE object_id = deleted_id AND object_type_id = 10;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteExecutiveGroup`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE count_usage INT;\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM executive_group_master WHERE id = deleted_id FOR UPDATE;\
   \
	SELECT COUNT(em.id) INTO count_usage\
    FROM executive_master em\
    WHERE em.group_id = deleted_id;\
\
    IF count_usage > 0 THEN\
        SET error = 1;\
        SET error_path = 'delete';\
        SET error_text = 'Executive Group cannot be deleted because it is being used';\
    END IF;\
\
    IF error = 0 THEN\
        DELETE FROM executive_group_master WHERE id = deleted_id;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteExecutiveRole`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE count_usage INT;\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM executive_role_master WHERE id = deleted_id FOR UPDATE;\
   \
	SELECT COUNT(em.id) INTO count_usage\
    FROM executive_master em\
    WHERE em.role_id = deleted_id;\
 \
    IF count_usage > 0 THEN\
        SET error = 1;\
        SET error_path = 'delete';\
        SET error_text = 'Executive Role cannot be deleted because it is being used';\
    END IF;\
\
    IF error = 0 THEN\
        DELETE FROM executive_role_master WHERE id = deleted_id;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteOrganisation`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE count_usage INT;\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM organisation_master WHERE id = deleted_id FOR UPDATE;\
\
    SELECT COUNT(cm.id) INTO count_usage\
    FROM contact_master cm\
    WHERE cm.organisation_id = deleted_id;\
    \
    IF count_usage > 0 THEN\
        SET error = 1;\
        SET error_path = 'delete';\
        SET error_text = 'Organisation cannot be deleted because it is being used';\
    END IF;\
\
    IF error = 0 THEN\
        DELETE FROM organisation_master WHERE id = deleted_id;\
        DELETE FROM custom_fields_data WHERE object_id = deleted_id AND object_type_id = 19;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteProduct`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE count_usage INT;\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM product_master WHERE id = deleted_id FOR UPDATE;\
\
    SELECT COUNT(pm.id) INTO count_usage\
    FROM product_master pm\
    LEFT JOIN enquiry_product_tran pt ON pt.product_id = pm.id\
    LEFT JOIN ticket_product_tran tt ON tt.product_id = pm.id\
    WHERE pm.id = deleted_id AND (pt.product_id IS NOT NULL OR tt.product_id IS NOT NULL);\
    \
    IF count_usage > 0 THEN\
        SET error = 1;\
        SET error_path = 'delete';\
        SET error_text = 'Product cannot be deleted because it is being used';\
    END IF;\
\
    IF error = 0 THEN\
        DELETE FROM product_master WHERE id = deleted_id;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteProductGroup`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE count_usage INT;\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM product_group_master WHERE id = deleted_id FOR UPDATE;\
\
    SELECT COUNT(pm.id) INTO count_usage\
    FROM product_master pm\
    WHERE pm.group_id = deleted_id;\
    \
    IF count_usage > 0 THEN\
        SET error = 1;\
        SET error_path = 'delete';\
        SET error_text = 'Group cannot be deleted because it is being used';\
    END IF;\
\
    IF error = 0 THEN\
        DELETE FROM product_group_master WHERE id = deleted_id;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteSource`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE count_usage INT;\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM enquiry_source_master WHERE id = deleted_id FOR UPDATE;\
   \
	SELECT COUNT(eh.id) INTO count_usage \
    FROM enquiry_header_tran eh\
    WHERE eh.source_id=deleted_id;\
    \
    IF count_usage > 0 THEN\
        SET error = 1;\
        SET error_path = 'delete';\
        SET error_text = 'Source cannot be deleted because it is being used';\
    END IF;\
\
    IF error = 0 THEN\
        DELETE FROM enquiry_source_master WHERE id = deleted_id;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteState`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE count_usage INT;\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM state_master WHERE id = deleted_id FOR UPDATE;\
   \
    SELECT COUNT(sm.id) INTO count_usage \
    FROM state_master sm \
    LEFT JOIN organisation_master om ON om.state_id = sm.id \
    LEFT JOIN contact_master cm ON cm.state_id = sm.id \
    LEFT JOIN executive_master em ON em.state_id = sm.id \
    WHERE (om.state_id IS NOT NULL OR cm.state_id IS NOT NULL OR em.state_id IS NOT NULL) AND sm.id=deleted_id;\
\
    IF count_usage > 0 THEN\
        SET error = 1;\
        SET error_path = 'delete';\
        SET error_text = 'State cannot be deleted because it is being used';\
    END IF;\
\
    IF error = 0 THEN\
        DELETE FROM state_master WHERE id = deleted_id;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteSubStatus`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE count_usage INT;\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM enquiry_sub_status_master WHERE id = deleted_id FOR UPDATE;\
   \
	SELECT COUNT(cm.id) INTO count_usage \
    FROM enquiry_sub_status_master cm \
    LEFT JOIN enquiry_ledger_tran eh ON eh.sub_status_id = cm.id \
    LEFT JOIN ticket_ledger_tran th ON th.sub_status_id = cm.id \
    WHERE (eh.sub_status_id IS NOT NULL OR th.sub_status_id IS NOT NULL) AND cm.id=deleted_id;\
\
    IF count_usage > 0 THEN\
        SET error = 1;\
        SET error_path = 'delete';\
        SET error_text = 'Sub Status cannot be deleted because it is being used';\
    END IF;\
\
    IF error = 0 THEN\
        DELETE FROM enquiry_sub_status_master WHERE id = deleted_id;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteSupportAction`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE count_usage INT;\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM ticket_action_master WHERE id = deleted_id FOR UPDATE;\
   \
	SELECT COUNT(tm.id) INTO count_usage\
    FROM ticket_action_master tm\
    LEFT JOIN ticket_action_tran et ON et.ticket_action_id = tm.id\
    LEFT JOIN ticket_ledger_tran tt1 ON tt1.action_taken_id = tm.id\
    LEFT JOIN ticket_ledger_tran tt2 ON tt2.next_action_id = tm.id\
    WHERE tm.id=deleted_id AND (et.ticket_action_id IS NOT NULL OR tt1.action_taken_id IS NOT NULL OR tt2.next_action_id IS NOT NULL);\
\
    IF count_usage > 0 THEN\
        SET error = 1;\
        SET error_path = 'delete';\
        SET error_text = 'Action cannot be deleted because it is being used';\
    END IF;\
\
    IF error = 0 THEN\
        DELETE FROM ticket_action_master WHERE id = deleted_id;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteSupportCategory`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE count_usage INT;\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM ticket_category_master WHERE id = deleted_id FOR UPDATE;\
\
    SELECT COUNT(cm.id) INTO count_usage\
    FROM ticket_header_tran cm\
    WHERE cm.category_id = deleted_id;\
    \
    IF count_usage > 0 THEN\
        SET error = 1;\
        SET error_path = 'delete';\
        SET error_text = 'Category cannot be deleted because it is being used';\
    END IF;\
\
    IF error = 0 THEN\
        DELETE FROM ticket_category_master WHERE id = deleted_id;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteSupportStatus`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE count_usage INT;\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM ticket_status_master WHERE id = deleted_id FOR UPDATE;\
\
    SELECT COUNT(cm.id) INTO count_usage\
    FROM ticket_ledger_tran cm\
    WHERE cm.status_id = deleted_id;\
    \
    IF count_usage > 0 THEN\
        SET error = 1;\
        SET error_path = 'delete';\
        SET error_text = 'Status cannot be deleted because it is being used';\
    END IF;\
\
    IF error = 0 THEN\
        DELETE FROM ticket_status_master WHERE id = deleted_id;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteSupportSubStatus`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE count_usage INT;\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM ticket_sub_status_master WHERE id = deleted_id FOR UPDATE;\
\
    SELECT COUNT(cm.id) INTO count_usage\
    FROM ticket_ledger_tran cm\
    WHERE cm.sub_status_id = deleted_id;\
    \
    IF count_usage > 0 THEN\
        SET error = 1;\
        SET error_path = 'delete';\
        SET error_text = 'Sub Status cannot be deleted because it is being used';\
    END IF;\
\
    IF error = 0 THEN\
        DELETE FROM ticket_sub_status_master WHERE id = deleted_id;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteSupportTicket`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE ledger_count INT;\
    DECLARE ledger_id INT;\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM ticket_header_tran WHERE id = deleted_id FOR UPDATE;\
   \
	SELECT COUNT(tlt.id) INTO ledger_count\
    FROM ticket_ledger_tran tlt \
    where tlt.ticket_id= deleted_id;\
    \
\
    IF ledger_count > 1 THEN\
        SET error = 1;\
        SET error_path = 'delete';\
        SET error_text = 'New entries have been added. The ticket cannot be deleted.';\
    END IF;\
\
    IF error = 0 THEN\
    select id into ledger_id from ticket_ledger_tran where ticket_id =deleted_id;\
        DELETE FROM ticket_header_tran \
    WHERE id = deleted_id;\
\
    DELETE FROM ticket_ledger_tran \
    WHERE ticket_id = deleted_id;\
\
    DELETE FROM custom_fields_data \
    WHERE object_id =ledger_id\
  AND object_type_id = (\
        SELECT id \
        FROM object_type_master \
        WHERE name = 'Support'\
    );\
\
    DELETE FROM ticket_product_tran \
    WHERE ticket_id = deleted_id;\
\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
CREATE PROCEDURE `deleteUnit`(\
    IN deleted_id INT(11) UNSIGNED\
)\
BEGIN\
    DECLARE error_text VARCHAR(70);\
    DECLARE error INT;\
    DECLARE error_path VARCHAR(20);\
    DECLARE count_usage INT;\
\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL; \
    END;\
\
    SET TRANSACTION ISOLATION LEVEL serializable; \
    START TRANSACTION;\
\
    SET error = 0;\
    SET error_text = '';\
    SET error_path = '';\
\
    SELECT id INTO @temp_id FROM unit_master WHERE id = deleted_id FOR UPDATE;\
\
    SELECT COUNT(um.id) INTO count_usage\
    FROM unit_master um\
    LEFT JOIN product_master pm ON pm.unit_id = um.id\
    LEFT JOIN enquiry_product_tran pt ON pt.unit_id = um.id\
    LEFT JOIN ticket_product_tran tt ON tt.unit_id = um.id\
    WHERE um.id = deleted_id AND (pm.unit_id IS NOT NULL OR pt.unit_id IS NOT NULL OR tt.unit_id IS NOT NULL);\
    \
    IF count_usage > 0 THEN\
        SET error = 1;\
        SET error_path = 'delete';\
        SET error_text = 'Unit cannot be deleted because it is being used';\
    END IF;\
\
    IF error = 0 THEN\
        DELETE FROM unit_master WHERE id = deleted_id;\
    END IF;\
COMMIT;\
    SELECT error, error_path, error_text;\
END ;~\
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
CREATE DEFINER=`Ankitalgofast`@`localhost` PROCEDURE `getOverviewGraphData`()\
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
CREATE DEFINER=`chaitanyar`@`%` PROCEDURE `mainSearchBar`(IN search_text VARCHAR(255))\
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
CREATE PROCEDURE `mySettingsConfig`(\
IN id integer,\
IN navbar_search_config varchar(3500),\
IN contact_search_config varchar(3500),\
IN executive_search_config varchar(3500),\
IN organisation_search_config varchar(3500),\
IN user_id INT(11)\
)\
BEGIN\
    DECLARE count_data integer;\
    DECLARE error integer;\
    DECLARE last_insert_id integer DEFAULT NULL;\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
\
    BEGIN\
	ROLLBACK;\
	RESIGNAL;\
END;\
\
START TRANSACTION;\
\
    SELECT COUNT(*) INTO count_data FROM my_settings_config msc WHERE msc.id = id;\
    IF 	count_data > 0 THEN \
	UPDATE my_settings_config msc SET msc.navbar_search_config = navbar_search_config,\
								msc.contact_search_config = contact_search_config,\
                                msc.executive_search_config = executive_search_config,\
                                msc.organisation_search_config = organisation_search_config,\
								msc.modified_by = user_id\
                                WHERE msc.id = id;\
    END IF;\
    IF count_data = 0 THEN\
	INSERT INTO my_settings_config  ( navbar_search_config, contact_search_config, executive_search_config, organisation_search_config, modified_by )\
								VALUES ( navbar_search_config, contact_search_config, executive_search_config, organisation_search_config, user_id );\
	SET last_insert_id = LAST_INSERT_ID();\
END IF;\
\
commit;\
\
    IF last_insert_id is NOT NULL THEN\
        SELECT * FROM my_settings_config msc WHERE msc.id = last_insert_id;\
    ELSE \
        SELECT * FROM my_settings_config msc WHERE msc.id = id;\
    END IF;\
END ;~\
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
  IF organisation THEN\
    SELECT ct.id as id , ct.name as name ,  TRIM(BOTH ' \n ' FROM CONCAT_WS(' \n ', \
     \
       \
		IF(ct.alias != '', ct.alias, NULL), \
                IF(CONCAT_WS(' / ', ct.mobile, ct.whatsapp) != ' / ', CONCAT_WS(' / ', ct.mobile, ct.whatsapp), NULL), \
\
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
    SELECT ct.id as id , ct.name as name ,    TRIM(BOTH ' \n ' FROM CONCAT_WS(' \n ', \
     \
       \
		IF(ct.alias != '', ct.alias, NULL), \
                IF(CONCAT_WS(' / ', ct.mobile, ct.whatsapp) != ' / ', CONCAT_WS(' / ', ct.mobile, ct.whatsapp), NULL), \
\
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
CREATE DEFINER=`Ankit Pandey`@`%` PROCEDURE `search_contact_group`(\
    IN search_value VARCHAR(255)\
)\
BEGIN\
    DECLARE name BOOLEAN DEFAULT TRUE;\
    DECLARE alias BOOLEAN DEFAULT TRUE;\
\
    SELECT cgm.id AS id, \
           cgm.name AS name, \
           TRIM(BOTH ' \n ' FROM CONCAT_WS(' \n ', \
               IF(cgm.alias != '', cgm.alias, NULL)\
           )) AS detail\
    FROM contact_group_master cgm\
    WHERE (name IS TRUE AND cgm.name LIKE CONCAT('%', search_value, '%'))\
       OR (alias IS TRUE AND cgm.alias LIKE CONCAT('%', search_value, '%'));\
END ;~\
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
    SELECT em.id AS id, \
           em.name AS name, \
           TRIM(BOTH ' \n ' FROM CONCAT_WS(' \n ', \
              \
               IF(em.alias != '', em.alias, NULL), \
			IF(CONCAT_WS(' / ', em.mobile, em.whatsapp) != ' / ', CONCAT_WS(' / ', em.mobile, em.whatsapp), NULL), \
\
               IF(em.email != '', em.email, NULL)\
           )) AS detail\
    FROM executive_master em\
    WHERE (name IS TRUE AND em.name LIKE CONCAT('%', search_value, '%'))\
       OR (alias IS TRUE AND em.alias LIKE CONCAT('%', search_value, '%'))\
       OR (phone IS TRUE AND em.mobile LIKE CONCAT('%', search_value, '%')) \
       OR (whatsapp IS TRUE AND em.whatsapp LIKE CONCAT('%', search_value, '%')) \
       OR (email IS TRUE AND em.email LIKE CONCAT('%', search_value, '%')); \
END ;~\
CREATE PROCEDURE `search_executive_allocated`(\
    IN search_value VARCHAR(255),\
    IN object_id INT\
)\
BEGIN\
    DECLARE name BOOLEAN DEFAULT TRUE;\
    DECLARE alias BOOLEAN DEFAULT TRUE;\
    DECLARE phone BOOLEAN DEFAULT TRUE;\
    DECLARE whatsapp BOOLEAN DEFAULT TRUE;\
    DECLARE email BOOLEAN DEFAULT TRUE;\
    DECLARE deptCount INT ;\
	SELECT COUNT(dept_id) \
    INTO deptCount\
    FROM config_dept_mapping \
    WHERE config_id = object_id;\
\
    SELECT \
        em.id AS id, \
        em.name AS name, \
        TRIM(BOTH '\n' FROM CONCAT_WS('\n', \
            IF(name AND em.alias != '', em.alias, NULL),\
            IF(phone AND CONCAT_WS(' / ', em.mobile, em.whatsapp) != ' / ', CONCAT_WS(' / ', em.mobile, em.whatsapp), NULL),\
            IF(email AND em.email != '', em.email, NULL)\
        )) AS detail\
    FROM \
        executive_master em\
    WHERE \
        (\
            deptCount = 0 OR \
            em.dept_id IN (\
                SELECT dept_id \
                FROM config_dept_mapping \
                WHERE config_id = object_id\
            )\
        )\
        AND (\
            (name AND em.name LIKE CONCAT('%', search_value, '%'))\
            OR (alias AND em.alias LIKE CONCAT('%', search_value, '%'))\
            OR (phone AND em.mobile LIKE CONCAT('%', search_value, '%'))\
            OR (whatsapp AND em.whatsapp LIKE CONCAT('%', search_value, '%'))\
            OR (email AND em.email LIKE CONCAT('%', search_value, '%'))\
        );\
END ;~\
CREATE PROCEDURE `search_organisation`(\
IN search_value VARCHAR(255)\
)\
BEGIN\
  DECLARE name BOOLEAN DEFAULT TRUE;\
  DECLARE alias BOOLEAN DEFAULT TRUE;\
  DECLARE print_name BOOLEAN DEFAULT TRUE; \
  \
    SELECT om.id as id , om.name as name ,    TRIM(BOTH ' \n ' FROM CONCAT_WS(' \n ', \
        \
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
CREATE PROCEDURE `search_product`(\
  IN search_value VARCHAR(255)\
)\
BEGIN\
  DECLARE name BOOLEAN DEFAULT TRUE;\
  DECLARE alias BOOLEAN DEFAULT TRUE;\
  DECLARE group_name BOOLEAN DEFAULT TRUE;\
  DECLARE product_number BOOLEAN DEFAULT TRUE;\
  DECLARE hsn_code BOOLEAN DEFAULT TRUE;\
  IF group_name THEN\
    SELECT \
      pm.id AS id, \
      pm.name AS name, \
      TRIM(BOTH ' \n ' FROM CONCAT_WS(' \n ', \
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
      TRIM(BOTH ' \n ' FROM CONCAT_WS(' \n ', \
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
        am.name=name, am.stamp= am.stamp+1, am.modified_by=(user_id), am.modified_on = UTC_TIMESTAMP() where am.id=id;\
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
CREATE PROCEDURE `updateCallAllocation`(\
  IN executiveId INT,\
  IN remark TEXT,\
  IN idList VARCHAR(255),\
  IN comma CHAR(1),\
  IN userID INT\
)\
BEGIN\
    DECLARE tran_type_id INT;\
    DECLARE new_ledger_id INT;\
    DECLARE tempId INT;\
    DECLARE done INT DEFAULT 0;\
    DECLARE cur CURSOR FOR \
        SELECT id \
        FROM enquiry_header_tran \
        WHERE FIND_IN_SET(id, idList) > 0;\
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;\
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END;\
    START TRANSACTION;\
\
    SELECT id INTO tran_type_id FROM enquiry_tran_type_master WHERE name = 'Allocation';\
    UPDATE enquiry_ledger_tran elt\
    JOIN\
    (\
        SELECT \
            enquiry_id, MAX(id) AS max_id\
        FROM\
            enquiry_ledger_tran\
        WHERE\
            FIND_IN_SET(enquiry_id, idList) > 0\
        GROUP BY enquiry_id\
    ) latest ON elt.id = latest.max_id \
    SET \
        elt.active = 0;\
\
    OPEN cur;\
\
    read_loop: LOOP\
        FETCH cur INTO tempId;\
        IF done THEN\
            LEAVE read_loop;\
        END IF;\
\
        SELECT MAX(id) INTO tempId FROM enquiry_ledger_tran WHERE enquiry_id = tempId;\
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
            created_by,\
            modified_on\
        )\
        SELECT \
            elt.enquiry_id,\
            elt.status_version,\
            executiveId,\
            utc_timestamp(),\
            elt.status_id,\
            elt.sub_status_id,\
            elt.action_taken_id,\
            elt.next_action_id,\
            elt.next_action_date,\
            remark,\
            elt.action_taken_remark,\
            elt.closure_remark,\
            tran_type_id,\
            1,\
            userID,\
            elt.created_by,\
            utc_timestamp()\
        FROM enquiry_ledger_tran elt\
        WHERE elt.id = tempId;\
        SET new_ledger_id = LAST_INSERT_ID();\
\
        INSERT INTO custom_fields_data (\
            c_col1, c_col2, c_col3, c_col4, c_col5, c_col6, c_col7, c_col8, c_col9, c_col10, object_id, object_type_id\
        )\
        SELECT \
            ccd.c_col1,\
            ccd.c_col2,\
            ccd.c_col3,\
            ccd.c_col4,\
            ccd.c_col5,\
            ccd.c_col6,\
            ccd.c_col7,\
            ccd.c_col8,\
            ccd.c_col9,\
            ccd.c_col10,\
            new_ledger_id AS object_id,\
            ccd.object_type_id\
        FROM custom_fields_data ccd \
        WHERE ccd.object_id = tempId AND ccd.object_type_id = (SELECT id FROM object_type_master WHERE name = 'Enquiry');\
\
    END LOOP;\
\
    CLOSE cur;\
    COMMIT;\
END ;~\
CREATE PROCEDURE `updateCallAllocationSupport`(\
  IN executiveId INT,\
  IN remark TEXT,\
  IN idList VARCHAR(255),\
  IN comma CHAR(1),\
  IN userID INT\
)\
BEGIN\
    DECLARE tran_type_id INT;\
    DECLARE new_ledger_id INT;\
    DECLARE tempId INT;\
    DECLARE done INT DEFAULT 0;\
    DECLARE cur CURSOR FOR \
        SELECT id \
        FROM ticket_header_tran \
        WHERE FIND_IN_SET(id, idList) > 0;\
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;\
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
  BEGIN\
    ROLLBACK;\
    RESIGNAL;\
  END;\
    START TRANSACTION;\
\
    SELECT id INTO tran_type_id FROM ticket_tran_type_master WHERE name = 'Allocation';\
\
    UPDATE ticket_ledger_tran tlt\
    JOIN\
    (\
        SELECT \
            ticket_id, MAX(id) AS max_id\
        FROM\
            ticket_ledger_tran\
        WHERE\
            FIND_IN_SET(ticket_id, idList) > 0\
        GROUP BY ticket_id\
    ) latest ON tlt.id = latest.max_id \
    SET \
        tlt.active = 0;\
\
    OPEN cur;\
\
    read_loop: LOOP\
        FETCH cur INTO tempId;\
        IF done THEN\
            LEAVE read_loop;\
        END IF;\
\
        SELECT MAX(id) INTO tempId FROM ticket_ledger_tran WHERE ticket_id = tempId;\
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
            created_by,\
            modified_on\
        )\
        SELECT \
            tlt.ticket_id,\
            tlt.status_version,\
            executiveId,\
            utc_timestamp(),\
            tlt.status_id,\
            tlt.sub_status_id,\
            tlt.action_taken_id,\
            tlt.next_action_id,\
            tlt.next_action_date,\
            remark,\
            tlt.action_taken_remark,\
            tlt.closure_remark,\
            tran_type_id,\
            1,\
            userID,\
            tlt.created_by,\
            utc_timestamp()\
        FROM ticket_ledger_tran tlt\
        WHERE tlt.id = tempId;\
        SET new_ledger_id = LAST_INSERT_ID();\
\
        INSERT INTO custom_fields_data (\
            c_col1, c_col2, c_col3, c_col4, c_col5, c_col6, c_col7, c_col8, c_col9, c_col10, object_id, object_type_id\
        )\
        SELECT \
            ccd.c_col1,\
            ccd.c_col2,\
            ccd.c_col3,\
            ccd.c_col4,\
            ccd.c_col5,\
            ccd.c_col6,\
            ccd.c_col7,\
            ccd.c_col8,\
            ccd.c_col9,\
            ccd.c_col10,\
            new_ledger_id AS object_id,\
            ccd.object_type_id\
        FROM custom_fields_data ccd \
        WHERE ccd.object_id = tempId AND ccd.object_type_id = (SELECT id FROM object_type_master WHERE name = 'Support');\
\
    END LOOP;\
    CLOSE cur;\
    COMMIT;\
END ;~\
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
        cm.name=name, cm.stamp=cm.stamp+1, cm.modified_by=(user_id), cm.modified_on = UTC_TIMESTAMP() where cm.id=id;\
END if;\
    commit;\
   \
	select error, error_path, error_text;\
    select * from enquiry_category_master cm where cm.id = id;\
END ;~\
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
    IN user_id integer,\
    IN ccol1 varchar(100),\
    IN ccol2 varchar(100),\
    IN ccol3 varchar(100),\
    IN ccol4 varchar(100),\
    IN ccol5 varchar(100),\
    IN ccol6 varchar(100),\
    IN ccol7 varchar(100),\
    IN ccol8 varchar(100),\
    IN ccol9 varchar(100),\
    IN ccol10 varchar(100))\
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
	declare count_area_usage integer DEFAULT 0;\
    declare count_org_usage integer DEFAULT 0;\
    declare count_grp_usage integer DEFAULT 0;\
    declare count_dep_usage integer DEFAULT 0;\
    declare count_usage integer DEFAULT 0;\
    declare count_state_usage integer DEFAULT 0;\
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
        SELECT COUNT(am.id) INTO count_area_usage\
		FROM area_master am\
		WHERE am.id = area_id;\
			if count_area_usage = 0 AND area_id!= 0 then\
				set error = 1;\
				INSERT INTO temp_error_log (error_text, error_path) \
				VALUES ('Area has been updated recently, Please refresh the page!', 'area');\
			END if;\
\
        SELECT COUNT(dep.id) INTO count_dep_usage\
		FROM department_master dep\
		WHERE dep.id = dept_id;\
			if count_dep_usage = 0 AND dept_id!= 0 then\
				set error = 1;\
				INSERT INTO temp_error_log (error_text, error_path) \
				VALUES ('Dept has been updated recently, Please refresh the page!', 'department');\
			END if;\
                  \
		SELECT COUNT(om.id) INTO count_org_usage\
		FROM organisation_master om\
		WHERE om.id = org_id;\
			if count_org_usage = 0 AND org_id!= 0 then\
				set error = 1;\
				INSERT INTO temp_error_log (error_text, error_path) \
				VALUES ('Organisation has been updated recently, Please refresh the page!', 'organisation');\
			END if;\
                  \
		SELECT COUNT(cg.id) INTO count_grp_usage\
		FROM contact_group_master cg\
		WHERE cg.id = group_id;\
			if count_grp_usage = 0 AND group_id!= 0 then\
				set error = 1;\
				INSERT INTO temp_error_log (error_text, error_path) \
				VALUES ('Group has been updated recently, Please refresh the page!', 'contactGroup');\
			END if;\
            \
        SELECT COUNT(cnm.id) INTO count_usage\
		FROM country_master cnm\
		WHERE cnm.id = country_id;\
			if count_usage = 0 AND country_id!= 0 then\
				set error = 1;\
				INSERT INTO temp_error_log (error_text, error_path) \
				VALUES ('Country has been updated recently, Please refresh the page!', 'country');\
			END if;\
            \
		SELECT COUNT(sm.id) INTO count_state_usage\
		FROM state_master sm\
		WHERE sm.id = state_id;\
			if count_state_usage = 0 AND state_id!= 0 then\
				set error = 1;\
				INSERT INTO temp_error_log (error_text, error_path) \
				VALUES ('State has been updated recently, Please refresh the page!', 'state');\
			END if;\
        \
		if error = 0 then\
        \
			UPDATE contact_master cm SET  cm.name= name, cm.stamp=cm.stamp+1, cm.alias  = alias, cm.print_name  = print_name,\
            cm.group_id  = group_id,cm.pan  = pan,cm.aadhaar  = aadhaar, cm.address1  = address1,cm.address2  = address2,\
            cm.city  = city,cm.state_id  = state_id, cm.area_id  = area_id, cm.pincode  = pincode,cm.country_id  = country_id,\
            cm.email  = email,cm.mobile  = mobile,cm.whatsapp = whatsapp,cm.modified_by = user_id, cm.modified_on = UTC_TIMESTAMP(),cm.department_id  = dept_id,\
            cm.organisation_id  = org_id\
			WHERE cm.id=id;\
            update custom_fields_data cfd set\
			cfd.c_col1 = ccol1, cfd.c_col2 = ccol2, cfd.c_col3 = ccol3, cfd.c_col4 = ccol4, cfd.c_col5 = ccol5, cfd.c_col6 = ccol6,\
			cfd.c_col7 = ccol7 , cfd.c_col8 = ccol8 , cfd.c_col9 = ccol9, cfd.c_col10 = ccol10 where cfd.object_id = id and cfd.object_type_id = 5;\
		\
		END if;\
    commit;\
    \
    select * from temp_error_log;\
    select * from contact_master cm where cm.id = id;\
END ;~\
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
			am.name=name, am.stamp=am.stamp+1, am.alias=alias ,am.parent_id=parentId, am.modified_by=user_id, am.modified_on = UTC_TIMESTAMP() where am.id=id;\
		END if;\
    commit;\
    \
	select * from error_table;\
    select * from contact_group_master am where am.id = id;\
END ;~\
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
			UPDATE country_master cm SET cm.name = name, cm.stamp=cm.stamp+1, cm.alias = alias,cm.modified_by = user_id,cm.modified_on = UTC_TIMESTAMP() where cm.id = id;\
		END if;\
	commit;\
    select * from temp_error_log;\
    select * from country_master cm where cm.id = id;\
END ;~\
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
			cm.name=name, cm.stamp=cm.stamp+1, cm.modified_by=user_id, cm.modified_on = UTC_TIMESTAMP() where cm.id=id;\
		END if;\
    commit;\
   \
	select error, error_path, error_text;\
    select * from department_master cm where cm.id = id;\
END ;~\
CREATE PROCEDURE `updateEnquiry`(\
    IN header_id INTEGER,\
    IN enq_number VARCHAR(75),\
    IN enquiry_date VARCHAR(20),\
    IN contact_id INTEGER,\
    IN received_by_id INTEGER,\
    IN category_id INTEGER,\
    IN source_id INTEGER,\
    IN stamp INTEGER,\
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
    IN created_by INT,\
    IN modified_by INT,\
    IN products_json JSON,\
    IN c_col1 VARCHAR(5000),\
    IN c_col2 VARCHAR(5000),\
    IN c_col3 VARCHAR(5000),\
    IN c_col4 VARCHAR(5000),\
    IN c_col5 VARCHAR(5000),\
    IN c_col6 VARCHAR(5000),\
    IN c_col7 VARCHAR(5000),\
    IN c_col8 VARCHAR(5000),\
    IN c_col9 VARCHAR(5000),\
    IN c_col10 VARCHAR(5000)\
)\
BEGIN\
    DECLARE last_insert_id_from_ledger INTEGER;\
    DECLARE error INTEGER DEFAULT 0;\
    DECLARE count_h INT DEFAULT 0;\
    DECLARE count_contact_usage INTEGER DEFAULT 0;\
	DECLARE count_category_usage INTEGER DEFAULT 0;\
	DECLARE count_source_usage INTEGER DEFAULT 0;\
	DECLARE count_received_by_usage INTEGER DEFAULT 0;\
	DECLARE count_sub_status_usage INTEGER DEFAULT 0;\
	DECLARE count_action_taken_usage INTEGER DEFAULT 0;\
	DECLARE count_next_action_usage INTEGER DEFAULT 0;\
    DECLARE idx INT DEFAULT 0;\
    DECLARE product_count INT;\
    DECLARE slno INT;\
    DECLARE product_id INT;\
    DECLARE unit_id INT;\
    DECLARE current_stamp INT;\
	DECLARE tran_type_id INT;\
    \
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
\
    BEGIN\
        ROLLBACK;\
        RESIGNAL;\
    END;\
\
    START TRANSACTION;\
    \
    SET error = 0;\
	SET last_insert_id_from_ledger = 0;\
    \
    DROP TEMPORARY TABLE IF EXISTS temp_error_log;\
    CREATE TEMPORARY TABLE temp_error_log (\
		id INT AUTO_INCREMENT PRIMARY KEY,\
		error_text TEXT,\
		error_path VARCHAR(100)\
	);\
    \
    DROP TEMPORARY TABLE IF EXISTS temp_error_log_for_productgrid;\
    CREATE TEMPORARY TABLE temp_error_log_for_productgrid (\
		id INT AUTO_INCREMENT PRIMARY KEY,\
		error_text TEXT,\
		error_path JSON\
	);\
\
    IF error = 0 THEN\
        SELECT COUNT(*) INTO count_h\
        FROM enquiry_header_tran \
        WHERE id = header_id;\
\
        IF count_h = 0 THEN\
            SET error = 1;\
            INSERT INTO temp_error_log (error_text, error_path) VALUES ('Record not found', 'form');\
        END IF;\
    END IF;\
\
    IF error = 0 THEN\
        SELECT eht.stamp INTO current_stamp \
        FROM enquiry_header_tran eht \
        WHERE eht.id = header_id;\
        IF current_stamp <> stamp THEN\
            SET error = 1;\
            INSERT INTO temp_error_log (error_text, error_path) VALUES ('Data is updated, please refresh the page!', 'form');\
        END IF;\
    END IF;\
\
    SELECT \
        COUNT(cm.id)\
    INTO count_contact_usage FROM\
        contact_master cm\
    WHERE\
    cm.id = contact_id;\
	IF count_contact_usage = 0 AND contact_id!= 0 then\
		SET error = 1;\
		INSERT INTO temp_error_log (error_text, error_path) \
		VALUES ('This value has been deleted recently, Please reselect!', 'contact');\
	END if;\
    \
    SELECT \
        COUNT(ecm.id)\
    INTO count_category_usage FROM\
        enquiry_category_master ecm\
    WHERE\
    ecm.id = category_id;\
	IF count_category_usage = 0 AND category_id!= 0 then\
		SET error = 1;\
		INSERT INTO temp_error_log (error_text, error_path) \
		VALUES ('This value has been deleted recently, Please reselect!', 'category');\
	END if;\
    \
    SELECT \
        COUNT(esm.id)\
    INTO count_source_usage FROM\
        enquiry_source_master esm\
    WHERE\
    esm.id = source_id;\
	IF count_source_usage = 0 AND source_id!= 0 then\
		SET error = 1;\
		INSERT INTO temp_error_log (error_text, error_path) \
		VALUES ('This value has been deleted recently, Please reselect!', 'source');\
	END if;\
    \
    SELECT \
        COUNT(em.id)\
    INTO count_received_by_usage FROM\
        executive_master em\
    WHERE\
    em.id = received_by_id;\
	IF count_received_by_usage = 0 AND received_by_id!= 0 then\
		SET error = 1;\
		INSERT INTO temp_error_log (error_text, error_path) \
		VALUES ('This value has been deleted recently, Please reselect!', 'received_by');\
	END if;\
    \
    SELECT \
        COUNT(essm.id)\
    INTO count_sub_status_usage FROM\
        enquiry_sub_status_master essm\
    WHERE\
    essm.id = sub_status_id;\
	IF count_sub_status_usage = 0 AND sub_status_id!= 0 then\
		SET error = 1;\
		INSERT INTO temp_error_log (error_text, error_path) \
		VALUES ('This value has been deleted recently, Please reselect!', 'sub_status');\
	END if;\
    \
    SELECT \
        COUNT(eam.id)\
    INTO count_action_taken_usage FROM\
        enquiry_action_master eam\
    WHERE\
    eam.id = action_taken_id;\
	IF count_action_taken_usage = 0 AND action_taken_id!= 0 then\
		SET error = 1;\
		INSERT INTO temp_error_log (error_text, error_path) \
		VALUES ('This value has been deleted recently, Please reselect!', 'action_taken');\
	END if;\
    \
    SELECT \
        COUNT(eam.id)\
    INTO count_next_action_usage FROM\
        enquiry_action_master eam\
    WHERE\
    eam.id = next_action_id;\
	IF count_next_action_usage = 0 AND next_action_id!= 0 then\
		SET error = 1;\
		INSERT INTO temp_error_log (error_text, error_path) \
		VALUES ('This value has been deleted recently, Please reselect!', 'next_action');\
	END if;\
\
SET idx = 0;\
SET product_count = JSON_LENGTH(products_json); \
\
WHILE idx < product_count DO\
	SET slno = JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].id'))); \
	SET product_id = JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].product_id')));\
	SET unit_id = JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].unit_id')));\
	IF (SELECT COUNT(pm.id) FROM product_master pm WHERE pm.id = product_id) = 0 AND product_id!= 0 THEN\
		SET error = 1;\
		INSERT INTO temp_error_log_for_productgrid(error_text, error_path)\
		VALUES ('Product value deleted recently, Please reselect!', JSON_ARRAY(slno,'product'));\
	END IF;\
    IF (SELECT COUNT(um.id) FROM unit_master um WHERE um.id = unit_id) = 0 AND unit_id!= 0 THEN\
		SET error = 1;\
		INSERT INTO temp_error_log_for_productgrid(error_text, error_path)\
		VALUES ('Unit value deleted recently, Please reselect!', JSON_ARRAY(slno,'unit'));\
	END IF;\
	SET idx = idx + 1;  \
END WHILE; \
    \
    IF error = 0 THEN\
        UPDATE enquiry_header_tran\
        SET\
            enq_number = enq_number,\
            date = enquiry_date,\
            contact_id = contact_id,\
            received_by_id = received_by_id,\
            category_id = category_id,\
            source_id = source_id,\
            call_receipt_remark = call_receipt_remark,\
            modified_by = modified_by,\
            modified_on = UTC_TIMESTAMP(),\
            stamp = current_stamp + 1 \
        WHERE id = header_id;\
    END IF;\
    \
    IF error = 0 THEN\
        UPDATE enquiry_ledger_tran\
        SET active = 0\
        WHERE enquiry_id = header_id AND active = 1;\
    END IF;\
    \
    if enquiry_tran_type = 3 THEN \
		select id into tran_type_id from enquiry_tran_type_master where name ='Update';\
	end if;\
	if enquiry_tran_type = 4 THEN \
		select id into tran_type_id from enquiry_tran_type_master where name ='Status Update';\
	end if;\
    if enquiry_tran_type = 2 THEN \
		select id into tran_type_id from enquiry_tran_type_master where name ='Allocation';\
	end if;\
\
    IF error = 0 THEN\
        INSERT INTO enquiry_ledger_tran\
        (enquiry_id, status_version, allocated_to, date, status_id, sub_status_id, action_taken_id, next_action_id, next_action_date, \
         suggested_action_remark, action_taken_remark, closure_remark, enquiry_tran_type_id, created_by, active, modified_by, modified_on)\
        VALUES\
        (header_id, 0, allocated_to_id, utc_timestamp(), status_id, sub_status_id, action_taken_id, next_action_id, next_action_date,\
         suggested_action_remark, action_taken_remark, closure_remark, tran_type_id, created_by, 1, modified_by, utc_timestamp());\
        \
        SET last_insert_id_from_ledger = LAST_INSERT_ID();\
        INSERT INTO custom_fields_data\
        (c_col1,c_col2,c_col3,c_col4,c_col5,c_col6,c_col7,c_col8,c_col9,c_col10,object_id,object_type_id)\
        VALUES\
        (c_col1,c_col2,c_col3,c_col4,c_col5,c_col6,c_col7,c_col8,c_col9,c_col10,last_insert_id_from_ledger,(SELECT id FROM object_type_master where name = 'Enquiry'));\
    END IF;\
\
    IF error = 0 THEN\
		SET idx = 0;\
        SET product_count = JSON_LENGTH(products_json);\
        \
		SET SQL_SAFE_UPDATES = 0;\
\
		DELETE FROM enquiry_product_tran \
		WHERE enquiry_id = header_id;\
		\
		SET SQL_SAFE_UPDATES = 1;\
\
        WHILE idx < product_count DO\
            INSERT INTO enquiry_product_tran (enquiry_id,slno, product_id, quantity, unit_id, remark)  \
            VALUES (\
                header_id,\
				JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].id'))),      \
                JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].product_id'))),      \
                JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].quantity'))),     \
                JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].unit_id'))),      \
                JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].remark')))       \
            );\
            SET idx = idx + 1;  \
        END WHILE;\
    END IF;\
    COMMIT;\
      \
SELECT * FROM temp_error_log;\
SELECT * FROM temp_error_log_for_productgrid;\
SELECT * FROM enquiry_header_tran WHERE id = header_id;\
END ;~\
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
			cm.name=name, cm.stamp=cm.stamp+1, cm.modified_by= user_id, cm.modified_on = UTC_TIMESTAMP() where cm.id=id;\
		END if;\
    commit;\
   \
	select error, error_path, error_text;\
    select * from enquiry_source_master cm where cm.id = id;\
END ;~\
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
        am.name=name, am.stamp=am.stamp+1, am.modified_by=user_id, am.modified_on = UTC_TIMESTAMP() where am.id=id;\
		END if;\
    commit;\
    \
	select error, error_path, error_text;\
    select * from enquiry_sub_status_master am where am.id = id;\
END ;~\
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
        am.name=name, am.stamp=am.stamp+1, am.enquiry_status_id=status_id, am.modified_by=user_id, am.modified_on = UTC_TIMESTAMP() where am.id=id;\
		END if;\
    commit;\
    \
	select error, error_path, error_text;\
    select * from enquiry_sub_status_master am where am.id = id;\
END ;~\
CREATE PROCEDURE `updateExecutive`(\
IN id integer,\
    IN alias varchar(60),\
    IN name varchar(60),\
    IN stamp integer,\
	IN address1 varchar(75),\
	IN address2 varchar(75),\
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
    IN user_id integer,\
	IN ccol1 varchar(100),\
    IN ccol2 varchar(100),\
    IN ccol3 varchar(100),\
    IN ccol4 varchar(100),\
    IN ccol5 varchar(100),\
    IN ccol6 varchar(100),\
    IN ccol7 varchar(100),\
    IN ccol8 varchar(100),\
    IN ccol9 varchar(100),\
    IN ccol10 varchar(100)\
    )\
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
    declare count_area_usage integer DEFAULT 0;\
    declare count_edm_usage integer DEFAULT 0;\
    declare count_erm_usage integer DEFAULT 0;\
    declare count_egm_usage integer DEFAULT 0;\
    declare count_usage integer DEFAULT 0;\
    declare count_state_usage integer DEFAULT 0;\
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
        End if; \
        \
        SELECT COUNT(am.id) INTO count_area_usage\
		FROM area_master am\
		WHERE am.id = area_id;\
			if count_area_usage = 0 AND area_id!= 0 then\
				set error = 1;\
				INSERT INTO error_table (error_text, error_path) \
				VALUES ('Area has been updated recently, Please refresh the page!', 'area');\
			END if;\
\
        SELECT COUNT(edm.id) INTO count_edm_usage\
		FROM executive_dept_master edm\
		WHERE edm.id = dept_id;\
			if count_edm_usage = 0 AND dept_id!= 0 then\
				set error = 1;\
				INSERT INTO error_table (error_text, error_path) \
				VALUES ('Executive_Dept has been updated recently, Please refresh the page!', 'executive_dept');\
			END if;\
                  \
		SELECT COUNT(erm.id) INTO count_erm_usage\
		FROM executive_role_master erm\
		WHERE erm.id = role_id;\
			if count_erm_usage = 0 AND role_id!= 0 then\
				set error = 1;\
				INSERT INTO error_table (error_text, error_path) \
				VALUES ('Executive_Role has been updated recently, Please refresh the page!', 'role');\
			END if;\
                  \
		SELECT COUNT(egm.id) INTO count_egm_usage\
		FROM executive_group_master egm\
		WHERE egm.id = group_id;\
			if count_egm_usage = 0 AND group_id!= 0 then\
				set error = 1;\
				INSERT INTO error_table (error_text, error_path) \
				VALUES ('Executive_Group has been updated recently, Please refresh the page!', 'group');\
			END if;\
            \
        SELECT COUNT(cnm.id) INTO count_usage\
		FROM country_master cnm\
		WHERE cnm.id = country_id;\
			if count_usage = 0 AND country_id!= 0 then\
				set error = 1;\
				INSERT INTO error_table (error_text, error_path) \
				VALUES ('Country has been updated recently, Please refresh the page!', 'country');\
			END if;\
            \
		SELECT COUNT(sm.id) INTO count_state_usage\
		FROM state_master sm\
		WHERE sm.id = state_id;\
			if count_state_usage = 0 AND state_id!= 0 then\
				set error = 1;\
				INSERT INTO error_table (error_text, error_path) \
				VALUES ('State has been updated recently, Please refresh the page!', 'state');\
			END if;\
        \
			if error = 0 then\
				select ctm.id into var_call_type_id from call_type_master ctm where ctm.name=call_type LOCK IN SHARE MODE;\
                                \
				update executive_master em set\
				em.alias=alias, em.name=name, em.stamp=em.stamp+1, em.address1=address1, em.address2=address2, \
                em.city=city, em.state_id=state_id, em.pincode=pincode, em.country_id=country_id, em.email=email,\
                em.mobile=mobile, em.whatsapp=whatsapp, em.modified_by=user_id, em.modified_on=UTC_TIMESTAMP(), em.dob=dofb,\
                em.doa=dofa, em.doj=dofj, em.pan=pan, em.aadhaar=aadhaar, em.area_id=area_id, em.call_type_id=var_call_type_id, em.crm_user_id = crm_user_id,\
                em.role_id=role_id, em.dept_id=dept_id, em.group_id=group_id where em.id = id;\
                \
                 update custom_fields_data cfd set\
                cfd.c_col1 = ccol1, cfd.c_col2 = ccol2, cfd.c_col3 = ccol3, cfd.c_col4 = ccol4, cfd.c_col5 = ccol5, cfd.c_col6 = ccol6,\
                cfd.c_col7 = ccol7 , cfd.c_col8 = ccol8 , cfd.c_col9 = ccol9, cfd.c_col10 = ccol10 where cfd.object_id = id and cfd.object_type_id=11;\
               \
                \
		END IF;\
	commit;\
	select * from error_table;\
    select * from executive_master em where em.id = id;\
END ;~\
CREATE PROCEDURE `updateExecutiveDept`(\
	IN id int(11) unsigned,\
    IN name varchar(60),\
    In stamp integer,\
    IN user_id integer,\
     IN ccol1 varchar(100),\
    IN ccol2 varchar(100),\
    IN ccol3 varchar(100),\
    IN ccol4 varchar(100),\
    IN ccol5 varchar(100),\
    IN ccol6 varchar(100),\
    IN ccol7 varchar(100),\
    IN ccol8 varchar(100),\
    IN ccol9 varchar(100),\
    IN ccol10 varchar(100)\
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
			cm.name=name, cm.stamp=cm.stamp+1, cm.modified_by=user_id, cm.modified_on = UTC_TIMESTAMP() where cm.id=id;\
            \
		  update custom_fields_data cfd set\
                cfd.c_col1 = ccol1, cfd.c_col2 = ccol2, cfd.c_col3 = ccol3, cfd.c_col4 = ccol4, cfd.c_col5 = ccol5, cfd.c_col6 = ccol6,\
                cfd.c_col7 = ccol7 , cfd.c_col8 = ccol8 , cfd.c_col9 = ccol9, cfd.c_col10 = ccol10 where cfd.object_id = id and cfd.object_type_id=10;    \
            \
	END if;\
    commit;\
   \
	select error, error_path, error_text;\
    select * from executive_dept_master cm where cm.id = id;\
END ;~\
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
		UPDATE executive_group_master egm set egm.name = name, egm.stamp=egm.stamp+1, egm.alias = alias, egm.parent_id = parent_id,egm.modified_by = user_id,egm.modified_on = UTC_TIMESTAMP() where egm.id = id;\
	END if;\
    commit;\
    \
    select * from temp_error_log;\
    select * from executive_group_master egm where egm.id = id;\
END ;~\
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
                em.mobile=mobile, em.whatsapp=whatsapp, em.modified_by=user_id, em.modified_on=UTC_TIMESTAMP(), em.dob=dofb,\
                em.doa=dofa, em.doj=dofj, em.area_id=area_id, em.call_type_id=var_call_type_id, em.crm_user_id = crm_user_id,\
                em.role_id=role_id, em.dept_id=dept_id, em.group_id=group_id where em.id = id;\
		END IF;\
	commit;\
	select * from error_table;\
    select * from executive_master em where em.id = id;\
END ;~\
CREATE PROCEDURE `updateExecutiveRole`(\
	IN id int(11) unsigned,\
    IN name varchar(60),\
    In stamp integer, \
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
			rm.name = name, rm.stamp=rm.stamp+1, rm.modified_by = user_id, rm.modified_on = UTC_TIMESTAMP() where rm.id=id;\
	END if;\
    commit;\
   \
	select error, error_path, error_text;\
    select * from executive_role_master rm where rm.id = id;\
END ;~\
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
	IN city VARCHAR(75),\
	IN state_id VARCHAR(75),\
	IN pincode VARCHAR(75),\
	IN country_id VARCHAR(75),\
	IN user_id integer,\
    IN ccol1 varchar(100),\
    IN ccol2 varchar(100),\
    IN ccol3 varchar(100),\
    IN ccol4 varchar(100),\
    IN ccol5 varchar(100),\
    IN ccol6 varchar(100),\
    IN ccol7 varchar(100),\
    IN ccol8 varchar(100),\
    IN ccol9 varchar(100),\
    IN ccol10 varchar(100))\
BEGIN\
	DECLARE error integer;\
	DECLARE last_insert_id integer;\
    DECLARE count_alias integer;\
    declare count_name integer;\
	declare count_pan varchar(20);\
    declare count_gstin varchar(20);\
    declare is_deleted integer;\
    declare current_stamp integer;\
	declare count_usage integer DEFAULT 0;\
    declare count_state_usage integer DEFAULT 0;\
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
		SELECT COUNT(cnm.id) INTO count_usage\
		FROM country_master cnm\
		WHERE cnm.id = country_id;\
			if count_usage = 0 AND country_id != 0 then\
				set error = 1;\
				INSERT INTO temp_error_log (error_text, error_path) \
				VALUES ('Country has been updated recently, Please refresh the page!', 'country');\
			END if;\
            \
		SELECT COUNT(sm.id) INTO count_state_usage\
		FROM state_master sm\
		WHERE sm.id = state_id;\
			if count_state_usage = 0 AND state_id!=0 then\
				set error = 1;\
				INSERT INTO temp_error_log (error_text, error_path) \
				VALUES ('State has been updated recently, Please refresh the page!', 'state');\
			END if;\
        \
		if error = 0 then\
       \
			UPDATE organisation_master om SET om.name= name, om.stamp=om.stamp+1, om.alias  = alias, om.print_name = printName, om.pan = pan,om.gstin = gstin, om.address1  = address1,om.address2  = address2, om.city  = city, om.state_id  = state_id, om.pincode  = pincode, om.country_id  = country_id, om.modified_by = user_id, om.modified_on = UTC_TIMESTAMP() \
            WHERE om.id=id;\
            update custom_fields_data cfd set\
			cfd.c_col1 = ccol1, cfd.c_col2 = ccol2, cfd.c_col3 = ccol3, cfd.c_col4 = ccol4, cfd.c_col5 = ccol5, cfd.c_col6 = ccol6, \
            cfd.c_col7 = ccol7 , cfd.c_col8 = ccol8 , cfd.c_col9 = ccol9, cfd.c_col10 = ccol10 where cfd.object_id = id and cfd.object_type_id=19;\
            \
		END if;\
    commit;\
    \
    select * from temp_error_log;\
    select * from organisation_master om where om.id = id;\
END ;~\
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
    declare count_usage integer DEFAULT 0;\
    declare count_unit_usage integer DEFAULT 0;\
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
		SELECT COUNT(pg.id) INTO count_usage\
		FROM product_group_master pg\
		WHERE pg.id = group_id;\
			if count_usage = 0 AND group_id != 0 then\
				set error = 1;\
				INSERT INTO error_log (error_text, error_path) \
				VALUES ('Product Group has been updated recently, Please refresh the page!', 'productGroup');\
			END if;\
            \
		SELECT COUNT(um.id) INTO count_unit_usage\
		FROM unit_master um\
		WHERE um.id = unit_id;\
			if count_unit_usage = 0 AND unit_id != 0 then\
				set error = 1;\
				INSERT INTO error_log (error_text, error_path) \
				VALUES ('Unit has been updated recently, Please refresh the page!', 'unit');\
			END if;\
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
        im.modified_on = UTC_TIMESTAMP()\
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
			am.name=name, am.stamp=am.stamp+1, am.alias=alias ,am.parent_id=parentId, am.modified_by=user_id, am.modified_on = UTC_TIMESTAMP() where am.id=id;\
		END if;\
    commit;\
    \
	select * from error_table;\
    select * from product_group_master am where am.id = id;\
END ;~\
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
	declare count_usage integer DEFAULT 0;\
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
        SELECT COUNT(cnm.id) INTO count_usage\
		FROM country_master cnm\
		WHERE cnm.id = country_id;\
			if count_usage = 0 AND country_id != 0 then\
				set error = 1;\
				INSERT INTO temp_error_log (error_text, error_path) \
				VALUES ('Country has been updated recently, Please refresh the page!', 'country');\
			END if;\
            \
        \
        if error = 0 then\
			UPDATE state_master sm SET sm.name = name, sm.stamp = sm.stamp +1, sm.alias = alias,sm.modified_by = user_id,sm.modified_on = UTC_TIMESTAMP(), sm.country_id = country_id where sm.id = id;\
		END if;\
	commit;\
    select * from temp_error_log;\
    select * from state_master sm where sm.id = id;\
END ;~\
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
        am.name=name, am.stamp= am.stamp+1, am.modified_by=(user_id), am.modified_on = UTC_TIMESTAMP() where am.id=id;\
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
        cm.name=name, cm.stamp=cm.stamp+1, cm.modified_by=(user_id), cm.modified_on = UTC_TIMESTAMP() where cm.id=id;\
END if;\
    commit;\
   \
	select error, error_path, error_text;\
    select * from ticket_category_master cm where cm.id = id;\
END ;~\
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
        am.name=name, am.stamp=am.stamp+1, am.modified_by=user_id, am.modified_on = UTC_TIMESTAMP() where am.id=id;\
		END if;\
    commit;\
    \
	select error, error_path, error_text;\
    select * from ticket_sub_status_master am where am.id = id;\
END ;~\
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
        am.name=name, am.stamp=am.stamp+1, am.ticket_status_id=status_id, am.modified_by=user_id, am.modified_on = UTC_TIMESTAMP() where am.id=id;\
		END if;\
    commit;\
    \
	select error, error_path, error_text;\
    select * from ticket_sub_status_master am where am.id = id;\
END ;~\
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
    IN stamp INTEGER,\
    IN c_col1 VARCHAR(5000),\
    IN c_col2 VARCHAR(5000),\
    IN c_col3 VARCHAR(5000),\
    IN c_col4 VARCHAR(5000),\
    IN c_col5 VARCHAR(5000),\
    IN c_col6 VARCHAR(5000),\
    IN c_col7 VARCHAR(5000),\
    IN c_col8 VARCHAR(5000),\
    IN c_col9 VARCHAR(5000),\
    IN c_col10 VARCHAR(5000)\
)\
BEGIN\
    DECLARE error INTEGER DEFAULT 0;\
    DECLARE error_text VARCHAR(70);\
    DECLARE error_path VARCHAR(20);\
    DECLARE count_contact_usage INTEGER DEFAULT 0;\
    DECLARE count_category_usage INTEGER DEFAULT 0;\
    DECLARE count_received_by_usage INTEGER DEFAULT 0;\
    DECLARE count_sub_status_usage INTEGER DEFAULT 0;\
    DECLARE count_action_taken_usage INTEGER DEFAULT 0;\
    DECLARE count_next_action_usage INTEGER DEFAULT 0;\
    DECLARE product_count INT DEFAULT 0;\
    DECLARE product_id INT;\
    DECLARE idx INT DEFAULT 0;\
    DECLARE current_stamp INT;\
    DECLARE ledger_insert_id INT;\
    DECLARE tran_type_id INT;\
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING\
    BEGIN\
        ROLLBACK;\
        RESIGNAL;\
    END;\
\
    START TRANSACTION;\
\
    DROP TEMPORARY TABLE IF EXISTS temp_error_log;\
    CREATE TEMPORARY TABLE temp_error_log (\
        id INT AUTO_INCREMENT PRIMARY KEY,\
        error_text TEXT,\
        error_path VARCHAR(100)\
    );\
\
    DROP TEMPORARY TABLE IF EXISTS temp_error_log_for_productgrid;\
    CREATE TEMPORARY TABLE temp_error_log_for_productgrid (\
        id INT AUTO_INCREMENT PRIMARY KEY,\
        error_text TEXT,\
        error_path JSON\
    );\
\
    SELECT COUNT(cm.id) INTO count_contact_usage\
    FROM contact_master cm\
    WHERE cm.id = contact_id;\
    IF count_contact_usage = 0 AND contact_id != 0 THEN\
        SET error = 1;\
        INSERT INTO temp_error_log (error_text, error_path)\
        VALUES ('This value has been deleted recently, Please reselect!', 'contact');\
    END IF;\
\
    SELECT COUNT(ecm.id) INTO count_category_usage\
    FROM ticket_category_master ecm\
    WHERE ecm.id = category_id;\
    IF count_category_usage = 0 AND category_id != 0 THEN\
        SET error = 1;\
        INSERT INTO temp_error_log (error_text, error_path)\
        VALUES ('This value has been deleted recently, Please reselect!', 'category');\
    END IF;\
\
    SELECT COUNT(em.id) INTO count_received_by_usage\
    FROM executive_master em\
    WHERE em.id = received_by_id;\
    IF count_received_by_usage = 0 AND received_by_id != 0 THEN\
        SET error = 1;\
        INSERT INTO temp_error_log (error_text, error_path)\
        VALUES ('This value has been deleted recently, Please reselect!', 'received_by');\
    END IF;\
\
    SELECT COUNT(essm.id) INTO count_sub_status_usage\
    FROM ticket_sub_status_master essm\
    WHERE essm.id = sub_status_id;\
    IF count_sub_status_usage = 0 AND sub_status_id != 0 THEN\
        SET error = 1;\
        INSERT INTO temp_error_log (error_text, error_path)\
        VALUES ('This value has been deleted recently, Please reselect!', 'sub_status');\
    END IF;\
\
    SELECT COUNT(eam.id) INTO count_action_taken_usage\
    FROM ticket_action_master eam\
    WHERE eam.id = action_taken_id;\
    IF count_action_taken_usage = 0 AND action_taken_id != 0 THEN\
        SET error = 1;\
        INSERT INTO temp_error_log (error_text, error_path)\
        VALUES ('This value has been deleted recently, Please reselect!', 'action_taken');\
    END IF;\
\
    SELECT COUNT(eam.id) INTO count_next_action_usage\
    FROM ticket_action_master eam\
    WHERE eam.id = next_action_id;\
    IF count_next_action_usage = 0 AND next_action_id != 0 THEN\
        SET error = 1;\
        INSERT INTO temp_error_log (error_text, error_path)\
        VALUES ('This value has been deleted recently, Please reselect!', 'next_action');\
    END IF;\
\
    SET idx = 0;\
    SET product_count = JSON_LENGTH(products_json);\
\
    WHILE idx < product_count DO\
        SET product_id = JSON_UNQUOTE(JSON_EXTRACT(products_json, CONCAT('$[', idx, '].product_id')));\
        \
        IF (SELECT COUNT(pm.id) FROM product_master pm WHERE pm.id = product_id) = 0 AND product_id != 0 THEN\
            SET error = 1;\
            INSERT INTO temp_error_log_for_productgrid(error_text, error_path)\
            VALUES ('Product value deleted recently, Please reselect!', JSON_OBJECT('index', idx, 'field', 'product'));\
        END IF;\
\
        SET idx = idx + 1;\
    END WHILE;\
\
    IF error = 0 THEN\
        SELECT tht.stamp INTO current_stamp \
        FROM ticket_header_tran tht \
        WHERE tht.id = header_id;\
        IF current_stamp <> stamp THEN\
            SET error = 1;\
            INSERT INTO temp_error_log (error_text, error_path)\
            VALUES ('Data is updated, please refresh the page!', 'form');\
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
            modified_on = UTC_TIMESTAMP(),\
            stamp = stamp + 1\
        WHERE id = header_id;\
\
        UPDATE ticket_ledger_tran\
        SET active = 0\
        WHERE ticket_id = header_id AND active = 1;\
\
        CASE ticket_tran_type\
            WHEN 3 THEN SET tran_type_id = (SELECT id FROM ticket_tran_type_master WHERE name = 'Updated');\
            WHEN 4 THEN SET tran_type_id = (SELECT id FROM ticket_tran_type_master WHERE name = 'Status Update');\
            WHEN 2 THEN SET tran_type_id = (SELECT id FROM ticket_tran_type_master WHERE name = 'Allocation');\
        END CASE;\
\
        INSERT INTO ticket_ledger_tran\
        (ticket_id, status_version, allocated_to, date, status_id, sub_status_id, action_taken_id, next_action_id, next_action_date,\
         suggested_action_remark, action_taken_remark, closure_remark, ticket_tran_type_id, created_by, active, modified_by, modified_on)\
        VALUES\
        (header_id, 0, allocated_to_id, utc_timestamp(), status_id, sub_status_id, action_taken_id, next_action_id, next_action_date,\
         suggested_action_remark, action_taken_remark, closure_remark, tran_type_id, created_by, 1, modified_by, utc_timestamp());\
\
        SET ledger_insert_id = LAST_INSERT_ID();\
\
        INSERT INTO custom_fields_data\
        (c_col1, c_col2, c_col3, c_col4, c_col5, c_col6, c_col7, c_col8, c_col9, c_col10, object_id, object_type_id)\
        VALUES\
        (c_col1, c_col2, c_col3, c_col4, c_col5, c_col6, c_col7, c_col8, c_col9, c_col10, ledger_insert_id,\
         (SELECT id FROM object_type_master WHERE name = 'Support'));\
\
        DELETE FROM ticket_product_tran WHERE ticket_id = header_id;\
        SET idx = 0;\
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
\
    COMMIT;\
\
    SELECT * FROM temp_error_log;\
    SELECT * FROM temp_error_log_for_productgrid;\
    SELECT * FROM ticket_header_tran where id = header_id;\
END ;~\
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
			um.name=name, um.stamp=um.stamp+1, um.modified_by=user_id, um.modified_on = UTC_TIMESTAMP() where um.id=id;\
		END if;\
    commit;\
    \
	select * from error_table;\
    select * from unit_master um where um.id = id;\
END ;";
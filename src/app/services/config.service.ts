"use server";
import { regionalSettingSchemaT } from "../models/models";
import excuteQuery from "../utils/db/db";
import { logger } from "../utils/logger.utils";

export async function createRegionalSettingDb(dbName: string, data: any) {
  try {
    const configResult = await excuteQuery({
      host: dbName,
      query:
        "INSERT INTO config_meta_data (config_type) values ('regional_setting') returning *;",
      values: [],
    });

    const result = await excuteQuery({
      host: dbName,
      query:
        "INSERT INTO app_config (config_type_id, config) VALUES (?, ?) returning *;",
      values: [configResult[0].id, JSON.stringify(data)],
    });

    return result;
  } catch (error) {
    logger.error(error);
  }
}
export async function updateteRegionalSettingDb(
  dbName: string,
  data: regionalSettingSchemaT,
  config_id: number
) {
  try {
    const result = await excuteQuery({
      host: dbName,
      query:
        "UPDATE app_config ac SET ac.config = ? WHERE ac.config_type_id = ?;",
      values: [JSON.stringify(data), config_id],
    });

    return {status: true};
  } catch (error) {
    logger.error(error);
    return {status: false};
  }
}
export async function getRegionalSettingDb(dbName: string) {
  try {
    const result = await excuteQuery({
      host: dbName,
      query:
        "select * from app_config where config_type_id = (select id from config_meta_data where config_type='regional_setting');",
      values: [],
    });

    return result;
  } catch (error) {
    logger.error(error);
  }
}

export async function getCountryWithCurrencyDb(
  crmDb: string,
  searchString: string,
  countryId?: number
) {
  try {
    let query =
      "select id as id, name as name, currency_string currencyString, currency_symbol currencySymbol, \
      currency_substring currencySubString, currency_character currencyCharacter, locale, date_format from country_master";
    let values: any[] = [];

    if (searchString !== "") {
      query = query + " where name like '%" + searchString + "%'";
      values = [];
    }
    if (countryId) {
      if (searchString === "") {
        query += " where";
      }
      query += " id = ?";
      values = [countryId];
    }
    const result = await excuteQuery({
      host: crmDb,
      query: query,
      values: values,
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getCurrencyStringDb(crmDb: string, searchString: string) {
  try {
    let query = "select id as id, currency_string as name from country_master";
    let values: any[] = [];

    if (searchString !== "") {
      query = query + " where currency_string like '%" + searchString + "%'";
      values = [];
    }
    const result = await excuteQuery({
      host: crmDb,
      query: query,
      values: values,
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getCurrencySubStringDb(
  crmDb: string,
  searchString: string
) {
  try {
    let query =
      "select id as id, currency_substring as name from country_master";
    let values: any[] = [];

    if (searchString !== "") {
      query = query + " where currency_substring like '%" + searchString + "%'";
      values = [];
    }
    const result = await excuteQuery({
      host: crmDb,
      query: query,
      values: values,
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}
export async function getCurrencySymbolDb(crmDb: string, searchString: string) {
  try {
    let query = "select id as id, currency_symbol as name from country_master";
    let values: any[] = [];

    if (searchString !== "") {
      query = query + " where currency_symbol like '%" + searchString + "%'";
      values = [];
    }
    const result = await excuteQuery({
      host: crmDb,
      query: query,
      values: values,
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}
export async function getDateFormatDb(crmDb: string, searchString: string) {
  try {
    let query = "select id as id, date_format as name from country_master";
    let values: any[] = [];

    if (searchString !== "") {
      query = query + " where date_format like '%" + searchString + "%'";
      values = [];
    }
    const result = await excuteQuery({
      host: crmDb,
      query: query,
      values: values,
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}
export async function getCurrencyCharacterDb(
  crmDb: string,
  searchString: string
) {
  try {
    let query =
      "select id as id, currency_character as name from country_master";
    let values: any[] = [];

    if (searchString !== "") {
      query = query + " where currency_character like '%" + searchString + "%'";
      values = [];
    }
    const result = await excuteQuery({
      host: crmDb,
      query: query,
      values: values,
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getRegionalSettingsDb(
  crmDb: string
) {
  try {
    let query =
    "select config from app_config_new acn join config_meta_data cmd where acn.object_id=cmd.id and cmd.config_type='regionalSetting'";
        let values: any[] = [];

    const result = await excuteQuery({
      host: crmDb,
      query: query,
      values: values,
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}


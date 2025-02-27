"use server";
import { regionalSettingSchemaT } from "../models/models";
import { getCountryWithCurrencyDb, getRegionalSettingDb, getRegionalSettingsDb, updateteRegionalSettingDb } from "../services/config.service";
import { getSession } from "../services/session.service";
import { logger } from "../utils/logger.utils";


export async function updateRegionalSetting(
  data: regionalSettingSchemaT,
  config_id: number
) {
  const result = {status: false};
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return await updateteRegionalSettingDb(session.user.dbInfo.dbName, data, config_id);
    }
  } catch (e: any) {
    logger.error(e);
  }
  return result;
}
export async function getRegionalSetting() {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const result = await getRegionalSettingDb(session.user.dbInfo.dbName);
      return result;
    }
  } catch (e: any) {
    logger.error(e);
  }
}

export async function getCountryWithCurrency(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getCountryWithCurrencyDb(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function getRegionalSettings() {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const result = await getRegionalSettingsDb(session.user.dbInfo.dbName);
      return JSON.parse(result.config);
    }
  } catch (error) {
    throw error;
  }
}

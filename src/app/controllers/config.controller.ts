"use server";
import { regionalSettingSchemaT } from "../models/models";
import { getCountryWithCurrencyDb, getCurrencyCharacterDb, getCurrencyStringDb, getCurrencySubStringDb, getCurrencySymbolDb, getDateFormatDb, getRegionalSettingDb, updateteRegionalSettingDb } from "../services/config.service";
import { getSession } from "../services/session.service";
import { logger } from "../utils/logger.utils";


export async function updateRegionalSetting(
  data: regionalSettingSchemaT,
  config_id: number
) {
  const result = {status: false};
  try {
    const session = await getSession();
    if (session) {
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
    if (session) {
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
export async function getCurrencyString(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getCurrencyStringDb(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}
export async function getCurrencySubString(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getCurrencySubStringDb(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}
export async function getCurrencySymbol(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getCurrencySymbolDb(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}
export async function getDateFormat(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getDateFormatDb(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function getCurrencyCharacter(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getCurrencyCharacterDb(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

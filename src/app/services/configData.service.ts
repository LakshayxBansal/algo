"use server";

import { enquiryConfigSchemaT } from "../models/models";
import { Session } from "next-auth";
import executeQuery from "../utils/db/db";

export async function getConfigTypeId(
  crmDb: string,
  configType: string
): Promise<number | null> {
  try {
    const query = `SELECT id FROM config_meta_data WHERE config_type = ?`;
    const result = await executeQuery({
      host: crmDb,
      query: query,
      values: [configType],
    });

    if (result && result.length > 0) {
      return result[0].id;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching config type ID for ${configType}:`, error);
    return null;
  }
}

export async function getConfigDB(crmDb: string) {
  try {

    const configQuery = `SELECT ac.*, cm.config_type FROM app_config_new ac JOIN config_meta_data cm ON ac.object_id = cm.id`;
    const configResult = await executeQuery({
      host: crmDb,
      query: configQuery,
      values: [],
    });

    if (configResult && configResult.length > 0) {
      return configResult;
    }

    return initConfigSchema();
  } catch (e) {
    console.error("Error fetching config data:", e);
    return null;
  }
}

export async function updateConfigDB(
  session: Session,
  data: enquiryConfigSchemaT
) {
  try {
    const crmDb = session.user.dbInfo.dbName;
    const configTypeId = await getConfigTypeId(crmDb, data.category as string);

    if (!configTypeId) {
      throw new Error(`No config type found for ${data.category}`);
    }

    delete data.category;

    let isTrue = data.isEnabled ? 1 : 0;
    delete data.isEnabled;
    let jsonData = JSON.stringify(data);

    const values = [
      configTypeId,
      isTrue,
      jsonData,
    ];

    const result = await executeQuery({
      host: crmDb,
      query: "call appConfig(?, ?, ?)",
      values: values,
    });

    return result;
  } catch (e) {
    console.error("Error updating config data:", e);
    return null;
  }
}

export async function initConfigSchema(): Promise<enquiryConfigSchemaT> {
    return {
        enquiryReqd: false,
        supportReqd: false,
        enquiryCloseCall: false,
        enquiryMaintainProducts: false,
        enquirySaveFAQ: false,
        enquiryMaintainAction: false,
        supportCloseCall: false,
        supportMaintainProducts: false,
        supportSaveFAQ: false,
        supportMaintainAction: false,
        // generalMaintainArea: false,
        // generalMaintainImage: false,
        // generalShowList: false,
    };
}

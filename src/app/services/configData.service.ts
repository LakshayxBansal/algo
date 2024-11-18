
"use server";

import { enquiryConfigSchemaT } from "../models/models";
import { Session } from "next-auth";
import executeQuery from "../utils/db/db";
import { logger } from "../utils/logger.utils";

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

export async function getConfigTypeDB(
  crmDb: string
){
  try {
    const query = `SELECT * FROM config_meta_data;`;
    const result = await executeQuery({
      host: crmDb,
      query: query,
      values: [],
    });

    return result;

  } catch (error) {
    logger.error(error);
  }
}

export async function updateConfigDataDB(crmDb:string,configId : number, enabled : number, data : string) {
  try{
    await executeQuery({
      host: crmDb,
      query: "update app_config set enabled = ?, config = ? where config_type_id = ?",
      values: [enabled, data, configId],
    });
  }catch(error){
    logger.error(error);
  }
}

export async function updateConfigDeptDB(crmDb:string,query:string) {
  try{
    await executeQuery({
      host: crmDb,
      query: "TRUNCATE TABLE config_dept_mapping;",
      values: []
    })
    await executeQuery({
      host: crmDb,
      query: query,
      values: [],
    });
  }catch(error){
    logger.error(error);
  }
}

export async function getConfigDB(crmDb: string) {
  try {

    const configQuery = `SELECT ac.*, cm.config_type FROM app_config ac JOIN config_meta_data cm ON ac.config_type_id = cm.id`;
    const configResult = await executeQuery({
      host: crmDb,
      query: configQuery,
      values: [],
    });

    return configResult;
  
  } catch (e) {
    console.error("Error fetching config data:", e);
    return null;
  }
}

export async function getConfigDeptMappingDB(crmDb: string) {
  try {

    const configQuery = `SELECT ac.*, cm.config_type FROM config_dept_mapping ac JOIN config_meta_data cm ON ac.config_id = cm.id`;
    const configDeptMapResult = await executeQuery({
      host: crmDb,
      query: configQuery,
      values: [],
    });

    return configDeptMapResult;
  
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


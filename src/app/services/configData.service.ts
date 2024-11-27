
"use server";

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
    return true;
  }catch(error){
    logger.error(error);
    return false;
  }
}

export async function updateConfigDeptDB(crmDb:string,configDept : {[key : string] : number[]}, configType : Array<{config_type : string,id:number}>) {
  try{
    await executeQuery({
      host: crmDb,
      query: "TRUNCATE TABLE config_dept_mapping;",
      values: []
    })
    let query = "insert into config_dept_mapping (config_id,dept_id) values "
      Object.keys({...configDept}).map((key,index)=>{
        const configId = configType.filter((item : {config_type : string,id:number})=>item.config_type===key)[0].id;
        configDept[key].map((dept:number)=>{
          query += `(${configId},${dept}),`
        })
      })
      query = query.slice(0, -1);
      query += ";";
      if(query!=="insert into config_dept_mapping (config_id,dept_id) values;"){
        await executeQuery({
          host: crmDb,
          query: query,
          values: [],
        });
      }
    return true;
  }catch(error){
    logger.error(error);
    return false;
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



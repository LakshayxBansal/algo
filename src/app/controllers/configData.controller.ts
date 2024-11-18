"use server";
import { configSchemaT, enquiryConfigSchemaT } from "../models/models";
import { getConfigDB, getConfigDeptMappingDB, getConfigTypeDB, updateConfigDataDB, updateConfigDB, updateConfigDeptDB } from "../services/configData.service";
import { getSession } from "../services/session.service";
import { logger } from "../utils/logger.utils";
import { enquirySupportConfig } from "../zodschema/zodschema";
import { SqlError } from "mariadb";

export async function getConfigType() {
  try{
    const session = await getSession();
    if(session){
      const result = await getConfigTypeDB(session.user.dbInfo.dbName);
      return result;
    }
  }catch(error){
    logger.error(error);
  }
}


export async function updateConfigData(config: any, configDept : any) {
  try {
    const session = await getSession();
    if(session){
      const configType = await getConfigType();
      Object.keys({...config}).map(async(key,index)=>{
        const configId = configType.filter((item : any)=>item.config_type===key)[0].id;
        const enabled = config[key].reqd ? 1 : 0;
        const data = JSON.stringify(config[key]);
        await updateConfigDataDB(session.user.dbInfo.dbName,configId,enabled,data);
      });
      let query = "insert into config_dept_mapping (config_id,dept_id) values "
      Object.keys({...configDept}).map((key,index)=>{
        const configId = configType.filter((item : any)=>item.config_type===key)[0].id;
        configDept[key].map((dept:any)=>{
          query += `(${configId},${dept}),`
        })
      })
      query = query.slice(0, -1);
      query += ";";
      await updateConfigDeptDB(session.user.dbInfo.dbName,query);
    return true;
    }
  } catch (e: any) {
    logger.error(e);
    return false;
  }
}

export async function fetchConfigData(): Promise<configSchemaT | null> {
  try {
    const session = await getSession();

    if (!session?.user?.dbInfo) {
      throw new Error("Session or database info not available");
    }

    const configArray = await getConfigDB(session.user.dbInfo.dbName); 

    const configObj : any = {};
    configArray.map((i : any)=>{
      configObj[i.config_type] = JSON.parse(i.config);
    })
    return configObj;

  } catch (error) {
    console.error("Error loading enquiry support config:", error);
    return null;
  }
}

export async function fetchConfigDeptMapData(): Promise<configSchemaT | null> {
  try {
    const session = await getSession();

    if (!session?.user?.dbInfo) {
      throw new Error("Session or database info not available");
    }

    const configArray = await getConfigDeptMappingDB(session.user.dbInfo.dbName); 

    const configObj : any = {};
    ["enquiry","support","contract"].map((configType : string)=>{
      configObj[configType] = [];
    })
    configArray.map((i : any)=>{
      if(configObj.hasOwnProperty(i.config_type)){
        configObj[i.config_type].push(i.dept_id);
      }else{
        configObj[i.config_type] = [];
        configObj[i.config_type].push(i.dept_id);
      }
    })
    return configObj;

  } catch (error) {
    console.error("Error loading enquiry support config:", error);
    return null;
  }
}
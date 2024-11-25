"use server";
// import { configSchemaT, enquiryConfigSchemaT } from "../models/models";
import { getConfigDB, getConfigDeptMappingDB, getConfigTypeDB, updateConfigDataDB, updateConfigDeptDB } from "../services/configData.service";
import { getSession } from "../services/session.service";
import { logger } from "../utils/logger.utils";
import * as zs from "../zodschema/zodschema";
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


export async function updateConfigData(config: any, configDept : {[key : string] : number[]}) {
  let result : any = {status : false, data : []};
  try {
    const session = await getSession();
    if(session){
      const parsedData = zs.configSchema.safeParse(config);
      if(parsedData.success){
        const configType = await getConfigType();
        Object.keys({...config}).map(async(key,index)=>{
          const configId = configType.filter((item : any)=>item.config_type===key)[0].id;
          const enabled = config[key].reqd ? 1 : 0;
          const data = JSON.stringify(config[key]);
          await updateConfigDataDB(session.user.dbInfo.dbName,configId,enabled,data);
        });
        await updateConfigDeptDB(session.user.dbInfo.dbName,configDept,configType);
        return {status : true, data : []}
      }else{
        let errorState: { path: (string | number)[]; message: string }[] = [];
        for (const issue of parsedData.error.issues) {
          errorState.push({
            path: issue.path,
            message: issue.message,
          });
        }
        return { status: false, data: errorState};
      }
    }
  } catch (e: any) {
    logger.error(e);
    return {status : false, data : [{path:"form",message: "Error encountered"}]};
  }
}

export async function fetchConfigData(){
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

export async function fetchConfigDeptMapData() {
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
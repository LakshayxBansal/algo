"use server"

import excuteQuery from "../utils/db/db";

export async function getMasterForTableList(crmDb: string, tableName: string,fieldName:string,searchString:string) {
    try {  
      const result = await excuteQuery({
        host: crmDb,
        query: `SELECT id, ${fieldName} AS name FROM ${tableName}_master WHERE name LIKE '%${searchString}%'`, 
        values: [],
      });      
      return result;
    } catch (e) {
      console.log(e);
    }
  }
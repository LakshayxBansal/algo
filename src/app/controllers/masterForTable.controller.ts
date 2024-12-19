"use server"

import { getMasterForTableList } from "../services/masterForTable.service";
import { getSession } from "../services/session.service";

export default async function getMasterForTable(master_field: string | null, searchString :string){
let result;
    try {      
      const session = await getSession();
      if (session?.user.dbInfo) {
        const parts = master_field?.split(".");
        let tableName="";
        let fieldName="";
        if (parts) {
          tableName = parts[0];
          fieldName = parts[1];
        }
        result = await getMasterForTableList(session.user.dbInfo.dbName, tableName,fieldName,searchString);
      }
    } catch (error) {
      throw error;
    }
      return result;
}
"use server";
import { SqlError } from "mariadb";
import { createCustomFieldsDB } from "../services/customField.service";
import { getSession } from "../services/session.service";
import { logger } from "../utils/logger.utils";

export async function createCustomFields(objectID: number,action_id: number,data: any) {
    const session = await getSession();
    let result=false;
    if (session?.user.dbInfo) {

      const dbResult = await createCustomFieldsDB(
        session.user.dbInfo.dbName,
        session.user.userId,
        objectID,
        action_id,  
        data
      );
      console.log("dbResult",dbResult);
      if(dbResult){
        result=true;
      }
      return result;
    }
}


"use server";
import { SqlError } from "mariadb";
import { createCustomFieldsDB } from "../services/customField.service";
import { getSession } from "../services/session.service";
import { logger } from "../utils/logger.utils";
import { customFieldsMasterSchema } from "../zodschema/zodschema";

export async function createCustomFields(objectID: number,data: any) {
    const session = await getSession();
    let result=false;
    const parsed=customFieldsMasterSchema.safeParse(data);
    console.log("parsed",parsed);
    
    if (session?.user.dbInfo) {

      const dbResult = await createCustomFieldsDB(
        session.user.dbInfo.dbName,
        session.user.userId,
        objectID,
        data
      );
      if(dbResult){
        result=true;
      }
      return result;
    }
}


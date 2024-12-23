"use server";
import { SqlError } from "mariadb";
import { createCustomFieldsDB } from "../services/customField.service";
import { getSession } from "../services/session.service";
import { logger } from "../utils/logger.utils";
import { customFieldsMasterSchema } from "../zodschema/zodschema";
import { customFieldsMasterSchemaT, FieldItemT } from "../models/models";


export async function createCustomFields(objectID: number,data: FieldItemT[]) {
    const session = await getSession();
    let result;
    try{
    if (session?.user.dbInfo) {
      let zodCheck=true;
      let errorState=[];
      for (const item of data){
        const parsed=customFieldsMasterSchema.safeParse(item);
        if(!parsed.success){
          zodCheck=false;
          let error : {[key:string]:string}={};
          for (const issue of parsed.error.issues){
          error[issue.path[0]]=`${issue.message}`
          }
          errorState.push({path: item.column_name_id,errorMessages: error})
          // errorState.push(formError);
          console.log("issues",error);
        }else{
          continue;
        }
      }
      // console.log("formError",errorState);
      if(zodCheck){
          const dbResult = await createCustomFieldsDB(
            session.user.dbInfo.dbName,
            session.user.userId,
            objectID,
            data
          )
          result={
            status: true,
            data: dbResult[0]
          }
      }else{
        result={status: false,data: errorState}
      }
    }else{
      result={status: false, data: []}
    }
    }catch (e: any) {
      console.log(e);
      result={status: false, data: e}
    }
    return result;
    }


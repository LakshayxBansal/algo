"use server";
import { use } from "react";
import excuteQuery from "../utils/db/db";
import { customFieldsMasterSchemaT, FieldItemT } from "../models/models";

export async function createCustomFieldsDB(crmDb: string,userID: number, object_id: number,data: FieldItemT[]) {
  try {
    
    const stringdata=JSON.stringify(data)
      const result = await excuteQuery({
          host: crmDb,
          query: "call createCustomFields(?,?,?);",
          values: [object_id,userID,stringdata],
        });
        console.log("data from services",result);

    return result;
  } catch (e) {
    console.log(e);
  }
}

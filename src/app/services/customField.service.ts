"use server";
import { use } from "react";
import excuteQuery from "../utils/db/db";

export async function createCustomFieldsDB(crmDb: string,userID: number, object_id: number,action_id: number,data: any) {
  try {
      console.log("data in services",object_id,action_id,userID);
      
      const stringdata=JSON.stringify(data)
      const result = await excuteQuery({
          host: crmDb,
          query: "call createCustomFields(?,?,?,?);",
          values: [object_id,action_id,userID,stringdata],
        });
        console.log("data from services",result);

    return result;
  } catch (e) {
    console.log(e);
  }
}

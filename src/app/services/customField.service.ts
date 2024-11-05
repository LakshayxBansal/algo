"use server";
import excuteQuery from "../utils/db/db";

export async function createCustomFieldsDB(crmDb: string, object_id: number,action_id: number,data: any) {
  try {
    const stringdata=JSON.stringify(data)
    const result = await excuteQuery({
      host: crmDb,
      query: "call createCustomFields(?,?,?);",
      values: [object_id,action_id,stringdata],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

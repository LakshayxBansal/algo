"use server";
import { Session } from "inspector";
import excuteQuery from "../utils/db/db";

export async function getScreenDescriptionDB(crmDb: string, object_id: number,action_id: string) {
  try {
    let query = "select * from custom_fields_master where object_type_id=? and action_id=? order by column_order";
    let values: any[] = [object_id,action_id];

    const result = await excuteQuery({
      host: crmDb,
      query: query,
      values: values,
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

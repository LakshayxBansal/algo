"use server";
import excuteQuery from "../utils/db/db";

export async function getScreenDescriptionDB(crmDb: string, object_id: number) {
  try {
    let query = "select * from custom_fields_master where object_type_id=? order by column_order";
    let values: any[] = [object_id];

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

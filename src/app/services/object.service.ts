"use server";
import excuteQuery from "../utils/db/db";

export async function getScreenDescriptionDB(crmDb: string, object_type_id: number) {
  try {
    let query = "select * from custom_fields_master where object_type_id=? order by column_order";
    let values: any[] = [object_type_id];

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

export async function getFieldTypeStructureDB(crmDb: string, object_type_id: number) {
  try {
    let query = "select cfm.column_name,cctm.column_type from custom_fields_master cfm\
                 left outer join custom_column_type_master cctm on cfm.column_type_id=cctm.id\
                 where cfm.is_default_column=0 and cfm.object_type_id=?;";
    let values: any[] = [object_type_id];

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


"use server";

import excuteQuery from "../utils/db/db";
import * as z from "../zodschema/zodschema";
import * as zm from "../models/models";
import { Session } from "next-auth";

export async function updateItemDB(session: Session, data: zm.itemSchemaT) {
  try {
    console.log("Data in service : ", data);
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call updateItem(?,?,?,?,?,?,?);",
      values: [
        data.id,
        data.name,
        // data.stamp,
        data.group,
        data.alias,
        data.unit,
        data.hsn_code,
        // data.created_by,
        // data.modified_by,
        // data.created_on,
        // data.modified_on,
        session.user.email,
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

/**
 *
 * @param crmDb database to search in
 * @param id id to search in item_master
 * @returns
 */
export async function fetchItemById(crmDb: string, id: string) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "select * from item_master where id=?",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

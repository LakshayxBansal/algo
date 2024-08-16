"use server";

import * as zm from "../models/models";
import { Session } from "next-auth";
import excuteQuery from "../utils/db/db";

export async function getEnquiryCategoryList(
  crmDb: string,
  searchString: string
) {
  try {
    let query = "select id as id, name as name from enquiry_category_master";
    let values: any[] = [];

    if (searchString !== "") {
      query = query + " where name like '%" + searchString + "%'";
      values = [];
    }
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

export async function getCategoryDetailsById(crmDb: string, id: string) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "select * from enquiry_category_master c where c.id=?;",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

/**
 *
 * @param session : user session
 * @param categoryData : data for saving
 * @returns result from DB (returning *)
 */
export async function createEnquiryCategoryDb(
  session: Session,
  categoryData: zm.nameMasterDataT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createCategory(?, ?)",
      values: [categoryData.name, session.user.email],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function updateEnquiryCategoryDb(
  session: Session,
  categoryData: zm.nameMasterDataT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call updateCategory(?, ?, ?);",
      values: [categoryData.id, categoryData.name, session.user.email],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

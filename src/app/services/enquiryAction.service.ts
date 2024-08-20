"use server";

import * as zm from "../models/models";
import { Session } from "next-auth";
import excuteQuery from "../utils/db/db";

export async function getEnquiryActionList(
  crmDb: string,
  searchString: string
) {
  try {
    let query = "select id as id, name as name from enquiry_action_master";
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

/**
 *
 * @param session : user session
 * @param statusData : data for saving
 * @returns result from DB (returning *)
 */
export async function createEnquiryActionDb(
  session: Session,
  statusData: zm.nameMasterDataT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createAction(?,?)",
      values: [statusData.name, session.user.email],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function getActionDetailsById(crmDb: string, id: string) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "select * from enquiry_action_master a where a.id=?;",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function updateEnquiryActionDb(
  session: Session,
  statusData: zm.nameMasterDataT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call updateAction(?,?,?);",

      values: [statusData.id, statusData.name, session.user.email],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

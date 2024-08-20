"use server";

import * as zm from "../models/models";
import { Session } from "next-auth";
import excuteQuery from "../utils/db/db";

export async function getEnquirySubStatusList(
  crmDb: string,
  searchString: string,
  status: string
) {
  try {
    const nStatus = Number(status);
    let query =
      "select sb.id as id, sb.name as name from enquiry_sub_status_master sb where \
                  sb.enquiry_status_id= ?";
    let values: any[] = [nStatus];

    if (searchString !== "") {
      query = query + " and sb.name like '%" + searchString + "%'";
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

export async function getEnquirySubStatusDetailsById(
  crmDb: string,
  id: string
) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "select * from enquiry_sub_status_master a where a.id=?;",
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
 * @param sourceData : data for saving
 * @returns result from DB (returning *)
 */
export async function createEnquirySubStatusDb(
  session: Session,
  sourceData: zm.enquirySubStatusMasterT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createEnquirySubStatusDb(?,?,?)",
      values: [sourceData.name, sourceData.status, session.user.email],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function updateEnquirySubStatusDb(
  session: Session,
  statusData: zm.enquirySubStatusMasterT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call UpdateEnquirySubStatus(?,?,?);",

      values: [statusData.id, statusData.name, session.user.email],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

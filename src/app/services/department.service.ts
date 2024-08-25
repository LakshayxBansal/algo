"use server";

import * as zm from "../models/models";
import { Session } from "next-auth";
import excuteQuery from "../utils/db/db";
import { logger } from "@/app/utils/logger.utils";

export async function getDepartmentList(crmDb: string, searchString: string) {
  try {
    let query = "select id as id, name as name from department_master";
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
    logger.error(e);
  }
}

export async function getDepartmentDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "select * from department_master where id=?;",
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
export async function createDepartmentDb(
  session: Session,
  sourceData: zm.nameMasterDataT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createDepartment(?, ?)",
      values: [sourceData.name, session.user.email],
    });
  } catch (e) {
    logger.error(e);
  }
  return null;
}

export async function updateDepartmentDb(
  session: Session,
  sourceData: zm.nameMasterDataT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call updateDepartment(?, ?, ?)",
      values: [sourceData.id, sourceData.name, session.user.email],
    });
  } catch (e) {
    logger.error(e);
  }
  return null;
}

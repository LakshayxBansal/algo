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

export async function checkIfUsed(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query:
        "SELECT COUNT(DISTINCT dm.id) as count FROM department_master dm LEFT JOIN contact_master nm ON nm.department_id = dm.id WHERE (nm.department_id IS NOT NULL) AND dm.id=?",
      values: [id],
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}
export async function delDepartmentDetailsById(session: Session, id: number) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call deleteDepartment(?)", 
      values: [id],
    });
  } catch (e) {
    logger.error(e);
  }
  return null;
}

/**
 *
 * @param session : user session
 * @param sourceData : data for saving
 * @returns result from DB (returning *)
 */

//need to check this 17-oct-2024
export async function createDepartmentDb(
  session: Session,
  sourceData: zm.nameMasterDataT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createDepartment(?, ?)",
      values: [sourceData.name, session.user.userId],
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
      query: "call updateDepartment(?, ?, ?, ?)",
      values: [sourceData.id, sourceData.name, sourceData.stamp, session.user.userId],
    });
  } catch (e) {
    logger.error(e);
  }
  return null;
}

export async function getDepartmentByPageDb(
  crmDb: string,
  page: number,
  filter: string | undefined,
  limit: number
) {
  try {
    const vals: any = [page, limit, limit];

    if (filter) {
      vals.unshift(filter);
    }

    return excuteQuery({
      host: crmDb,
      query:
        "SELECT *, RowNum as RowID  \
       FROM (SELECT *,ROW_NUMBER() OVER () AS RowNum \
          FROM department_master " +
        (filter ? "WHERE name LIKE CONCAT('%',?,'%') " : "") +
        "order by name\
      ) AS NumberedRows\
      WHERE RowNum > ?*?\
      ORDER BY RowNum\
      LIMIT ?;",
      values: vals,
    });
  } catch (e) {
    console.log(e);
  }
}

export async function getDepartmentCount(
  crmDb: string,
  value: string | undefined
) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        "SELECT count(*) as rowCount from department_master " +
        (value ? "WHERE name LIKE CONCAT('%',?,'%') " : ""),
      values: [value],
    });
  } catch (e) {
    logger.error(e);
  }
}

export async function getDepartmentColumnsDb(crmDb:string){
  try{
    return excuteQuery({
      host:crmDb,
      query:"select * from custom_fields_master where object_type_id =5",
      values:""
    });
  }catch(e){
    logger.error(e);
  }
}

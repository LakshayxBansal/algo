"use server";

import * as zm from "../models/models";
import { Session } from "next-auth";
import excuteQuery from "../utils/db/db";

export async function getExecutiveDeptList(
  crmDb: string,
  searchString: string
) {
  try {
    let query = "select id as id, name as name from executive_dept_master";
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
 * @param sourceData : data for saving
 * @returns result from DB (returning *)
 */
export async function createExecutiveDeptDb(
  session: Session,
  data: zm.executiveDeptSchemaT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createExecutiveDept(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      values: [data.name,
               session.user.userId,
               data.c_col1,
               data.c_col2,
               data.c_col3,
               data.c_col4,
               data.c_col5,
               data.c_col6,
               data.c_col7,
               data.c_col8,
               data.c_col9,
               data.c_col10
              ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function updateExecutiveDeptDb(
  session: Session,
  data: zm.executiveDeptSchemaT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call updateExecutiveDept(?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?);",
      values: [data.id,
               data.name, 
               data.stamp, 
               session.user.userId,
               data.c_col1,
               data.c_col2,
               data.c_col3,
               data.c_col4,
               data.c_col5,
               data.c_col6,
               data.c_col7,
               data.c_col8,
               data.c_col9,
               data.c_col10],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function getDeptDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "select c.id, c.name, c.stamp from executive_dept_master c \
      cfd.c_col1,cfd.c_col2,cfd.c_col3,\
        cfd.c_col4,cfd.c_col5,cfd.c_col6,cfd.c_col7,cfd.c_col8,cfd.c_col9,cfd.c_col10\
      left outer join custom_fields_data cfd on cfd.object_id=c.id and cfd.object_type_id=10 \
      where c.id=?;",
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
        "SELECT COUNT(DISTINCT edm.id) as count FROM executive_dept_master edm LEFT JOIN executive_master em ON em.dept_id = edm.id LEFT JOIN executive_role_master erm ON erm.department_id= edm.id WHERE (em.dept_id IS NOT NULL OR erm.department_id IS NOT NULL) AND edm.id=?",
      values: [id],
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function delExecutiveDeptByIdDB(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "call deleteExecutiveDept(?)",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getExecutiveDeptByPageDb(
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
        "SELECT *, RowNum as RowID \
       FROM (SELECT *,ROW_NUMBER() OVER () AS RowNum \
          FROM executive_dept_master " +
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

export async function getExecutiveDeptCount(
  crmDb: string,
  value: string | undefined
) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        "SELECT count(*) as rowCount from executive_dept_master " +
        (value ? "WHERE name LIKE CONCAT('%',?,'%') " : ""),
      values: [value],
    });
  } catch (e) {
    console.log(e);
  }
}

export async function getAllDeptsDB(
  crmDb: string
) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "select id as id, name as name from executive_dept_master;",
      values: [],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}
"use server";

import * as zm from "../models/models";
import { Session } from "next-auth";
import excuteQuery from "../utils/db/db";

export async function getSupportSubStatusList(
  crmDb: string,
  searchString: string,
  status: string
) {
  try {
    const nStatus = Number(status);

    let query =
      "select sb.id as id, sb.name as name from ticket_sub_status_master sb where \
                  sb.ticket_status_id= ?";
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

export async function getSupportSubStatusDetailsById(
  crmDb: string,
  id: number
) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "select * from ticket_sub_status_master a where a.id=?;",
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
export async function createSupportSubStatusDb(
  session: Session,
  sourceData: zm.enquirySubStatusMasterT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createSupportSubStatusDb(?,?,?)",
      values: [sourceData.name, sourceData.enquiry_status_id, session.user.userId],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function updateSupportSubStatusDb(
  session: Session,
  statusData: zm.enquirySubStatusMasterT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call UpdateSupportSubStatus(?,?,?,?);",

      values: [statusData.id, statusData.name, statusData.stamp, session.user.userId],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function updateSupportSubStatusListDb(
  session: Session,
  statusData: zm.enquirySubStatusMasterT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call UpdateSupportSubStatusList(?,?,?,?,?);",

      values: [statusData.id, statusData.name, statusData.stamp, statusData.enquiry_status_id, session.user.userId],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function getSupportSubStatusByPageDb(
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
        "SELECT *,RowNum as RowID\
       FROM (SELECT *,ROW_NUMBER() OVER () AS RowNum \
          FROM ticket_sub_status_master " +
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

export async function getSupportSubStatusCount(
  crmDb: string,
  value: string | undefined
) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        "SELECT count(*) as rowCount from ticket_sub_status_master" +
        (value ? "WHERE name LIKE CONCAT('%',?,'%') " : ""),
      values: [value],
    });
  } catch (e) {
    console.log(e);
  }
}

export async function delSupportSubStatusDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "delete from ticket_sub_status_master where id=?;",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

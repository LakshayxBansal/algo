'use server'

import * as zm from '../models/models';
import { Session } from 'next-auth';
import excuteQuery  from '../utils/db/db';
import {logger} from '@/app/utils/logger.utils';
import * as mdl from "../models/models" // jp_dev


export async function getDepartmentList(crmDb: string, searchString: string) {

  try {
    let query = 'select id as id, name as name from department_master';
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


/**
 * 
 * @param session : user session
 * @param sourceData : data for saving
 * @returns result from DB (returning *)
 */
export async function createDepartmentDb(session: Session, sourceData: zm.nameMasterDataT) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "insert into department_master (name, created_by, created_on) \
       values (?, (select crm_user_id from executive_master where email=?), now()) returning *",
      values: [
        sourceData.name,
        session.user.email
      ],
    });
  } catch (e) {
    logger.error(e);
  }
  return null;
}

//added from jp_dev
export async function createDeptDB(
  crmDb: string,
  user: string,
  deptData: mdl.deptT
) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        'insert into department_master (name, created_by, created_on) values \
      (?,\
        (select crm_user_id from executive_master where email = ?)\
        ,now()) returning *',
      values: [deptData.name, user],
    });
  } catch (e) {
    console.log(e);
  }
}

//jp_dev
export async function modifyDeptDB(
  crmDb: string,
  user: string,
  deptData: mdl.deptT,
  stamp: number,
  id: number
) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        'UPDATE department_master\
        SET name = ? ,\
        modified_by = (select crm_user_id from executive_master where email = ?),\
        modified_on = now(), \
        stamp = ?+1\
        WHERE id = ? AND stamp = ?;\
        ',
      values: [deptData.name, user, stamp, id, stamp],
    });
  } catch (e) {
    console.log(e);
  }
}

//jp_dev
export async function getDeptList(
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
        'SELECT name,RowNum as RowID, id,stamp \
     FROM (SELECT *,ROW_NUMBER() OVER () AS RowNum \
        FROM department_master ' +
        (filter ? "WHERE name LIKE CONCAT('%',?,'%') " : '') +
        'order by name\
    ) AS NumberedRows\
    WHERE RowNum > ?*?\
    ORDER BY RowNum\
    LIMIT ?;',
      values: vals,
    });
  } catch (e) {
    console.log(e);
  }
}

//jp_dev
export async function getDeptCount(crmDb: string, value: string | undefined) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        'SELECT count(*) as rowCount from department_master ' +
        (value ? "WHERE name LIKE CONCAT('%',?,'%') " : ''),
      values: [value],
    });
  } catch (e) {
    console.log(e);
  }
}

//jp_dev
export async function deleteDeptDB(
  crmDb: string,
  id: number
) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        'DELETE from department_master\
        WHERE id = ?',
      values: [id],
    });
  } catch (e) {
    console.log(e);
  }
}

//jp mail files
export async function getDeptDataDb(crmDb: string, id: number) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        "SELECT * from department_master WHERE id  = ?",
      values: [id],
    });
  } catch (e) {
    console.log(e);
  }
}

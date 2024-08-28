"use server";

import excuteQuery from "../utils/db/db";
import * as z from "../zodschema/zodschema";
import * as zm from "../models/models";
import { Session } from "next-auth";

export async function createContactDB(
  
  session: Session,
  data: zm.contactSchemaT  
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query:
        "call createContact(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      values: [
        data.alias,
        data.name,
        data.print_name,
        data.contactGroup_id,
        data.pan,
        data.aadhaar,
        data.address1,
        data.address2,
        data.address3,
        data.city,
        data.state_id,
        data.area_id,
        data.pincode,
        data.country_id,
        data.email,
        data.mobile,
        data.whatsapp,
        data.dob,
        data.doa,
        data.department_id,
        data.organisation_id,
        session.user.email,
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function updateContactDB(
  session: Session,
  data: zm.contactSchemaT,
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query:
        "call updateContact(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      values: [
        data.id, 
        data.alias,
        data.name,
        data.print_name,
        data.contactGroup_id,
        data.pan,
        data.aadhaar,
        data.address1,
        data.address2,
        data.address3,
        data.city,
        data.state_id,
        data.area_id,
        data.pincode,
        data.country_id,
        data.email,
        data.mobile,
        data.whatsapp,
        data.dob,
        data.doa,
        data.department_id,
        data.organisation_id,
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
 * @param searchString partial string to search in contact_master.name
 * @returns
 */
export async function getContactList(crmDb: string, searchString: string) {
  try {
    let query = 'select id as id, name as name, email, alias, mobile, pan from contact_master';
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
 * @param crmDb database to search in
 * @param id id to search in contact_master
 * @returns
 */
export async function getContactDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query:
        "select c.id, c.alias, c.name, c.print_name, c.group_id contactGroup_id, c.pan, c.aadhaar, c.address1, c.address2, c.address3, c.city, c.state_id state_id, c.area_id area_id, c.pincode, c.country_id country_id, c.email, c.mobile, c.whatsapp, c.created_by, c.created_on, c.modified_by, c.modified_on, c.stamp, c.dob, c.doa, c.department_id, c.organisation_id organisation_id, \
        g.name contactGroup, s.name state, a.name area, co.name country, d.name department, o.name organisation \
        from contact_master c left outer join contact_group_master g on c.group_id = g.id \
        left outer join state_master s on c.state_id = s.id \
        left outer join area_master a on c.area_id =  a.id \
        left outer join country_master co on c.country_id = co.id \
        left outer join department_master d on c.department_id = d.id \
        left outer join  organisation_master o on c.organisation_id = o.id \
        where c.id=?;",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getContactList2(
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
        'SELECT name,RowNum as RowID,whatsapp, id,email \
     FROM (SELECT *,ROW_NUMBER() OVER () AS RowNum \
        FROM contact_master ' +
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

export async function getContCount(crmDb: string, value: string | undefined) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        'SELECT count(*) as rowCount from contact_master ' +
        (value ? "WHERE name LIKE CONCAT('%',?,'%') " : ''),
      values: [value],
    });
  } catch (e) {
    console.log(e);
  }
}

export async function DeleteContactList(crmDb: string, id: number) {
  try {
    let query = "Delete from contact_master where id=?";
    let values: any[] = [id];

    await excuteQuery({
      host: crmDb,
      query: query,
      values: values,
    });

    return;
  } catch (e) {
    console.log(e);
  }
}


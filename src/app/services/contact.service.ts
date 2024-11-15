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
        "call createContact(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
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

export async function updateContactDB(
  session: Session,
  data: zm.contactSchemaT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query:
        "call updateContact(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      values: [
        data.id,
        data.alias,
        data.name,
        data.stamp,
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

/**
 *
 * @param crmDb database to search in
 * @param searchString partial string to search in contact_master.name
 * @returns
 */
export async function getContactList(crmDb: string, searchString: string) {
  try {
    const search_value = searchString ? searchString : '';
    
    const result = await excuteQuery({
      host: crmDb,
      query: "call search_contacts(?);",
      values: [search_value]
    })
    return result[0];  
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
        g.name contactGroup, s.name state, a.name area, co.name country, d.name department, o.name organisation, \
        cfd.c_col1,cfd.c_col2,cfd.c_col3,\
        cfd.c_col4,cfd.c_col5,cfd.c_col6,cfd.c_col7,cfd.c_col8,cfd.c_col9,cfd.c_col10\
        from contact_master c left outer join contact_group_master g on c.group_id = g.id \
        left outer join state_master s on c.state_id = s.id \
        left outer join area_master a on c.area_id =  a.id \
        left outer join country_master co on c.country_id = co.id \
        left outer join department_master d on c.department_id = d.id \
        left outer join  organisation_master o on c.organisation_id = o.id \
        left outer join custom_fields_data cfd on cfd.object_id=c.id and cfd.object_type_id=5\
        where c.id=?;",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getContactByPageDb(
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
      query: "SELECT *, RowNum AS RowID \
      FROM (select c.id, c.alias, c.name, c.print_name, c.group_id contactGroup_id, c.pan, c.aadhaar, c.address1, c.address2, c.address3, c.city, c.state_id state_id, c.area_id area_id, c.pincode, c.country_id country_id, c.email, c.mobile, c.whatsapp, c.created_by, c.created_on, c.modified_by, c.modified_on, c.stamp, c.dob, c.doa, c.department_id, c.organisation_id organisation_id, \
        g.name contactGroup, s.name state, a.name area, co.name country, d.name department, o.name organisation, ROW_NUMBER() OVER () AS RowNum  \
        from contact_master c left outer join contact_group_master g on c.group_id = g.id \
        left outer join state_master s on c.state_id = s.id \
        left outer join area_master a on c.area_id =  a.id \
        left outer join country_master co on c.country_id = co.id \
        left outer join department_master d on c.department_id = d.id \
        left outer join  organisation_master o on c.organisation_id = o.id " + 
     (filter ? "WHERE c.name LIKE CONCAT('%', ?, '%') " : "") + 
    "ORDER BY c.name \
) AS NumberedRows \
    WHERE RowNum > ?*? \
    ORDER BY RowNum \
    LIMIT ?;", 
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
        "SELECT count(*) as rowCount from contact_master " +
        (value ? "WHERE name LIKE CONCAT('%',?,'%') " : ""),
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

    const result = await excuteQuery({
      host: crmDb,
      query: query,
      values: values,
    });

    return result
  } catch (e) {
    console.log(e);
  }
}

export async function delContactByIdDB(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "delete from contact_master where id=?;",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

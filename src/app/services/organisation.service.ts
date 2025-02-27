
"use server";

import excuteQuery from "../utils/db/db";
import * as zm from "../models/models";
import { Session } from "next-auth";

export async function createOrganisationDB(
  session: Session,
  data: zm.organisationSchemaT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createOrganisation(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      values: [
        data.alias,
        data.name,
        data.printName,
        data.pan,
        data.gstin,
        data.address1,
        data.address2,
        data.city,
        data.state_id,
        data.pincode,
        data.country_id,
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
        data.c_col10,
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function updateOrganisationDB(
  session: Session,
  data: zm.organisationSchemaT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query:
        "call updateOrganisation(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      values: [
        data.id,
        data.alias,
        data.name,
        data.stamp,
        data.printName,
        data.pan,
        data.gstin,
        data.address1,
        data.address2,
        data.city,
        data.state_id,
        data.pincode,
        data.country_id,
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
        data.c_col10,
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
 * @param searchString partial string to search in organisation_master.name
 * @returns
 */
export async function getOrganisationList(crmDb: string, searchString: string) {
  try {
    const search_value = searchString ? searchString : '';
    
    const result = await excuteQuery({
      host: crmDb,
      query: "call search_organisation(?);",
      values: [search_value]
    })
    return result[0];  
  } catch (e) {
    console.log(e);
  }
}

export async function getOrgsList(
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
        "SELECT name,alias,RowNum as RowID, id,print_name,stamp \
     FROM (SELECT *,ROW_NUMBER() OVER () AS RowNum \
        FROM organisation_master " +
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

export async function getOrgsCount(crmDb: string, value: string | undefined) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        "SELECT count(*) as rowCount from organisation_master " +
        (value ? "WHERE name LIKE CONCAT('%',?,'%') " : ""),
      values: [value],
    });
  } catch (e) {
    console.log(e);
  }
}

export async function getOrganisationDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query:
        "select o.id, o.alias, o.name, o.print_name as printName, o.pan, o.gstin, o.address1, o.address2, o.city, o.state_id state_id, o.pincode, o.country_id country_id, o.created_by, o.created_on, o.modified_by, o.modified_on, o.stamp, \
        s.name state, co.name country,\
        cfd.c_col1, cfd.c_col2, cfd.c_col3, cfd.c_col4, \
        cfd.c_col5, cfd.c_col6, cfd.c_col7, cfd.c_col8, cfd.c_col9, cfd.c_col10\
        from organisation_master o left outer join state_master s on o.state_id = s.id \
        left outer join country_master co on o.country_id = co.id \
        left outer join custom_fields_data cfd on cfd.object_id = o.id and cfd.object_type_id=19\
        where o.id=?;",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getOrganisationByPageDb(
  crmDb: string,
  page: number,
  filter: string | undefined,
  limit: number
) {
  try {
    const vals: any = [page, limit, limit];

    if (filter) {
      vals.unshift(filter,filter,filter);
    }

    const result = await excuteQuery({
      host: crmDb,
      query:
        "SELECT *, RowNum as RowID \
       FROM (select o.id, o.alias, o.name, o.print_name, o.pan, o.gstin, o.address1, o.address2, o.city, o.state_id state_id, o.pincode, o.country_id country_id, o.created_by, o.created_on, o.modified_by, o.modified_on, o.stamp, \
        s.name state, co.name country, ROW_NUMBER() OVER () AS RowNum  \
        from organisation_master o left outer join state_master s on o.state_id = s.id \
        left outer join country_master co on o.country_id = co.id " +
        (filter ? "WHERE o.name LIKE CONCAT('%',?,'%') OR o.alias LIKE CONCAT('%',?,'%') OR o.print_name LIKE CONCAT('%',?,'%') " : "") +
        "order by o.name\
      ) AS NumberedRows\
      WHERE RowNum > ?*?\
      ORDER BY RowNum\
      LIMIT ?;",
      values: vals,
    });
    console.log(result);
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getOrganisationCount(
  crmDb: string,
  value: string | undefined
) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        "SELECT count(*) as rowCount from organisation_master " +
        (value ? "WHERE name LIKE CONCAT('%',?,'%') " : ""),
      values: [value],
    });
  } catch (e) {
    console.log(e);
  }
}

export async function checkIfUsed(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query:
        "SELECT COUNT(*) as count FROM organisation_master om INNER JOIN contact_master cm ON cm.organisation_id = om.id where om.id=?;",
      values: [id],
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function delOrganisationDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "call deleteOrganisation(?)",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

"use server";

import excuteQuery from "../utils/db/db";
import * as z from "../zodschema/zodschema";
import * as zm from "../models/models";
import { Session } from "next-auth";

export async function createOrganisationDB(
  session: Session,
  data: zm.organisationSchemaT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createOrganisation(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      values: [
        data.alias,
        data.name,
        data.printName,
        data.pan,
        data.gstin,
        data.address1,
        data.address2,
        data.address3,
        data.city,
        data.state_id,
        data.pincode,
        data.country_id,
        session.user.email,
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function updateOrganisationDB(
  session: Session,
  data: zm.organisationSchemaT,
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query:
        "call updateOrganisation(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      values: [
        data.id, 
        data.alias,
        data.name,
        data.printName,
        data.pan,
        data.gstin,
        data.address1,
        data.address2,
        data.address3,
        data.city,
        data.state_id,
        data.pincode,
        data.country_id,
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
 * @param searchString partial string to search in organisation_master.name
 * @returns
 */
export async function getOrganisationList(crmDb: string, searchString: string) {
  try {
    let query = "select id as id, name as name, alias as alias from organisation_master";
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

export async function getOrganisationDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query:
        "select o.id, o.alias, o.name, o.print_name as printName, o.pan, o.gstin, o.address1, o.address2, o.address3, o.city, o.state_id state_id, o.pincode, o.country_id country_id, o.created_by, o.created_on, o.modified_by, o.modified_on, o.stamp, \
        s.name state, co.name country \
        from organisation_master o left outer join state_master s on o.state_id = s.id \
        left outer join country_master co on o.country_id = co.id \
        where o.id=?;",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}
"use server"

import excuteQuery  from '../utils/db/db';
import { organisationT } from '../models/models';



export async function createOrganisationDB(crmDb: string, orgData: organisationT) {
  try {
    return excuteQuery({
      host: crmDb,
      query: "insert into organisation_master (name, alias, pan, gst, add1, add2, add3, country_id, state_id, city, pin, created_on) values \
      (?,?,?,?,?,?,?,?,?,?,?,now()) returning *",
      values: [
        orgData.name,
        orgData.alias,
        orgData.pan,
        orgData.gst,
        orgData.add1,
        orgData.add2,
        orgData.add3,
        orgData.country_id,
        orgData.state_id,
        orgData.city,
        orgData.pin
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

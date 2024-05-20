"use server"

import * as zs from '../zodschema/zodschema';
import * as zm from '../models/models';
import {createOrganisationDB} from '../services/organisation.service';
import { getSession } from '../services/session.service';
import {getOrganisationList} from '@/app/services/organisation.service';
import { SqlError } from 'mariadb';



export async function createOrganisation(formData: FormData){

  let result;
  try {
    const session = await getSession();
    if(session){

      let data: { [key: string]: any } = {}; // Initialize an empty object

      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }

      const parsed = zs.organisationSchema.safeParse(data);
      if(parsed.success) {
        const dbResult = await createOrganisationDB(session, data as zm.organisationSchemaT);
        if (dbResult.length >0 && dbResult[0][0].error === 0) {
          result = {status: true, data:dbResult[1]};
         } else {
          result = {status: false, data: [{path:[dbResult[0][0].error_path], message:dbResult[0][0].error_text}] };
         }
      } else {
        result = {status: false, data: parsed.error.issues };
      }
    } else {
      result = {status: false, data: [{path:["form"], message:"Error: Server Error"}] };
    }
    return result;
  } catch (e: any) {
    console.log(e);
    if ((e instanceof SqlError) && e.code === 'ER_DUP_ENTRY' ) {
      result = {status: false, data: [{path:["name"], message:"Error: Value already exist"}] };
      return result;
    }
  }
  result = {status: false, data: [{path:["form"], message:"Error: Unknown Error"}] };
  return result;
}


/**
 * 
 * @param searchString partial string for organisation name
 * @returns 
 */
export async function getOrganisation(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getOrganisationList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}


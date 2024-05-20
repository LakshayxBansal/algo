"use server"

import * as zs from '../zodschema/zodschema';
import * as zm from '../models/models';
import {createContactDB} from '../services/contact.service';
import { getSession } from '../services/session.service';
import {getContactList} from '@/app/services/contact.service';
import { SqlError } from 'mariadb';



export async function createContact(formData: FormData){

  let result;
  try {
    const session = await getSession();
    if(session){

      let data: { [key: string]: any } = {}; // Initialize an empty object

      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }

      const parsed = zs.contactSchema.safeParse(data);
      if(parsed.success) {
        const dbResult = await createContactDB(session, data as zm.contactSchemaT);
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
 * @param searchString partial string for contact name
 * @returns 
 */
export async function getContact(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getContactList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}


"use server"

import * as zs from '../zodschema/zodschema';
import {contactSchemaT} from '../models/models';
import {createContactDB} from '../services/contact.service';
import { getSession } from '../services/session.service';
import {getContactList, fetchContactById} from '@/app/services/contact.service';
import { SqlError } from 'mariadb';



export async function createContact(data: contactSchemaT){

  let result;
  try {
    const session = await getSession();
    if(session){
      const parsed = zs.contactSchema.safeParse(data);
      if(parsed.success) {
        const dbResult = await createContactDB(session, data as contactSchemaT);
        if (dbResult.length >0 && dbResult[0][0].error === 0) {
          result = {status: true, data:dbResult[1]};
         } else {
          result = {status: false, data: [{path:[dbResult[0][0].error_path], message:dbResult[0][0].error_text}] };
         }
      } else {
        let errorState: {path: (string | number)[], message: string}[] = [];
        for (const issue of parsed.error.issues) {
          errorState.push({ path: issue.path, message: issue.message});
        }
        result = {status: false, data:errorState };
        return result;
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

/**
 * 
 * @param Id id of the contact to be searched
 * @returns 
 */
export async function getContactById(id: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return fetchContactById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

"use server"

import * as zs from '../zodschema/zodschema';
import {executiveSchemaT} from '../models/models';
import {createExecutiveDB,getExecutiveIdFromEmailList} from '../services/executive.service';
import { getSession } from '../services/session.service';
import {getExecutiveList} from '@/app/services/executive.service';
import { SqlError } from 'mariadb';
import { getBizAppUserList } from '../services/user.service';

const inviteSring = "Send Invite...";

export async function createExecutive(formData: FormData){

  let result;
  try {
    const session = await getSession();
    if(session){

      let data: { [key: string]: any } = {}; // Initialize an empty object
      let inviteResult = false;
      let crm_map_id = 0;
      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }

      const parsed = zs.executiveSchema.safeParse(data);
      if(parsed.success) {
        // check if invite needs to be sent
        if (data.crm_user === inviteSring) {
          inviteResult = inviteUser(data as executiveSchemaT);
          data.crm_map_id = 0;
        } else {
          crm_map_id = await getCrmUserId(session.user.dbInfo.dbName, data.crm_user);
          data.crm_map_id = crm_map_id;
        }
        if (inviteResult || crm_map_id) {
          const dbResult = await createExecutiveDB(session, data as executiveSchemaT);
          if (dbResult.length >0 && dbResult[0][0].error === 0) {
            result = {status: true, data:dbResult[1]};
           } else {
            result = {status: false, data: [{path:[dbResult[0][0].error_path], message:dbResult[0][0].error_text}] };
           }
        } else {
          result = {status: false, data: [{path:["form"], message:"Error: Error sending invite"}] };
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
  }
  result = {status: false, data: [{path:["form"], message:"Error: Unknown Error"}] };
  return result;
}


/**
 * 
 * @param searchString partial string for executive name
 * @returns 
 */
export async function getExecutive(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getExecutiveList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function getExecutiveIdFromEmail(email: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getExecutiveIdFromEmailList(session.user.dbInfo.dbName, email);
    }
  } catch (error) {
    throw error;
  }
}

function inviteUser(data: executiveSchemaT){
  return true;
}

async function getCrmUserId(crmDb: string, user: string){
  try {
    const result = await getBizAppUserList(crmDb, user, true, true, false, false) 
    if (result.length > 0) {
      return result[0].id;
    }
  } catch (e) {
    console.log(e);
  }
  return 0;
}
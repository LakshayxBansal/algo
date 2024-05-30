"use server"

import { addUser, getBizAppUserList } from '../services/user.service';
import * as zs from '../zodschema/zodschema';
import {userSchemaT} from '@/app/models/models';
import { getSession } from '../services/session.service';
import { SqlError } from 'mariadb';


export async function registerUser(formData: FormData){
  let result;
  try {
    const session = await getSession();
    if(session){
      let userData: { [key: string]: any } = {}; // Initialize an empty object

      for (const [key, value] of formData.entries()) {
        userData[key] = value;
      }
      const parsed = zs.userSchema.safeParse(userData);
      if(parsed.success) {
        const dbResult = await addUser(userData as userSchemaT);
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


export async function getBizAppUser(searchString: string, invited: boolean, accepted: boolean, mapped: boolean, admin: boolean) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getBizAppUserList(session.user.dbInfo.dbName, searchString, invited, accepted, mapped, admin);
    }
  } catch (error) {
    throw error;
  }
}

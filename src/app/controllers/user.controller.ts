"use server"

import { addUser, getBizAppUserList,getUserDetailsByEmailList } from '../services/user.service';
import { hashText } from '../utils/encrypt.utils';
import * as zs from '../zodschema/zodschema';
import { userSchemaT } from '@/app/models/models';
import { getSession } from '../services/session.service';
import { SqlError } from 'mariadb';


export async function registerUser(formData: userSchemaT) {
  let result;
  try {
    const session = await getSession();
    console.log(session);

    if (session) {

      const parsed = zs.userSchema.safeParse(formData);
      if (parsed.success) {
        let contact;
        if(formData.email){
          contact = formData.email;
          delete formData.email;
        }
        else{
          contact = formData.phone;
          delete formData?.phone;
        }

        formData.contact = contact;

        const hashedPassword = await hashText(formData.password);
        formData.password = hashedPassword;

        const dbResult = await addUser(formData as userSchemaT);
        if (dbResult[0][0].error === 0) {
          result = { status: true, data: dbResult[1] };
        } else {
          result = { status: false, data: [{ path: [dbResult[0][0].error_path], message: dbResult[0][0].error_text }] };
        }
      } else {
        let errorState: { path: (string | number)[], message: string }[] = [];
        for (const issue of parsed.error.issues) {
          errorState.push({ path: issue.path, message: issue.message });
        }
        result = { status: false, data: errorState };
        return result;
      }
    } else {
      result = { status: false, data: [{ path: ["form"], message: "Error: Server Error" }] };
    }
    return result;
  } catch (e) {
    console.log(e);
    if ((e instanceof SqlError) && e.code === 'ER_DUP_ENTRY') {
      result = { status: false, data: [{ path: ["name"], message: "Error: Value already exist" }] };
      return result;
    }
  }
  result = { status: false, data: [{ path: ["form"], message: "Error: Unknown Error" }] };
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

export async function getUserDetailsByEmail(email : string){
  try{
    if(email){
      const user = await getUserDetailsByEmailList(email);
      return user;
    }
  }catch(e){
    throw e;
  }
  return null;
}

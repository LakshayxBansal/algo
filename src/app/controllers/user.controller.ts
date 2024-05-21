"use server"

import { addUser, getBizAppUserList } from '../services/user.service';
import * as zs from '../zodschema/zodschema';
import { getSession } from '../services/session.service';


export async function registerUser(formData: FormData){
  let userCreated = {status: false, msg: "Internal error!" };
  try {
    const userData = {email: formData.get("email") as string,
                      password: formData.get("password") as string,
                      firstname: formData.get("firstName") as string, 
                      lastname: formData.get("lastName") as string
                    };
    const result = zs.userSchema.safeParse(userData);
    const authUser = await addUser(userData);
    if (authUser.constructor.name === "OkPacket" ) {
      userCreated = {status: true, msg:"User created!"};
    }
  } catch (e: any) {
    if (e.code === 'ER_DUP_ENTRY'){
      userCreated = {status: false, msg:"Email already exist"};
    }
    console.log(e);
  }
  return userCreated;
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

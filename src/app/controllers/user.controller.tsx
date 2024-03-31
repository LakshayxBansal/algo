"use server"

import { addUser, checkUser } from '../services/user.services';
import { redirect } from 'next/navigation';

export async function registerUser(formData: FormData){
  let userCreated = {status: false, msg: "Internal error!" };
  try {
    const userData = {email: formData.get("email") as string,
                      password: formData.get("password") as string,
                      firstname: formData.get("firstName") as string, 
                      lastname: formData.get("lastName") as string
                    };
    const authUser = await addUser(userData);
    if (authUser.constructor.name === "OkPacket" ) {
      userCreated = {status: true, msg:"User created!"};
    }
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY'){
      userCreated = {status: false, msg:"Email already exist"};
    }
    console.log(e);
  }
  return userCreated;
}
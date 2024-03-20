"use server"

import { excuteQueryUserDb }  from "./db";
import {hashText, hashCompare} from "./encrypt";

interface userDataType {
  email: string | null | undefined,
  password?: string | null,
  firstname: string,
  lastname: string,
}

/**
 * add user to user db
 * 
 */
export async function addUser(userData:userDataType) {
  try {
    const hashedPassword = userData.password? await hashText(userData.password) :  '';

    // check if the user exists
    if (userData.email) {
      const user = await checkUser(userData.email)

      if (!user) {
        const result = await excuteQueryUserDb({
          query: 'insert into user (email, password, firstname, lastname, datetime) values (?, ?, ?, ?, now())', 
          values: [userData.email, hashedPassword, userData.firstname, userData.lastname],
        });
        if (result.constructor.name === "OkPacket") {
          return true;
        }
      } else {
        return true;
      }
    }
  } catch (e) {
    console.log(e);
  }
  return false;
}


/**
 * check if the user exists in userdb based on the email
 * @param email: email to be checked in the db 
 * @returns true if exists else returns false
 */
export async function checkUser(email: string) {
  try {
    // check if the user exists
    const user = await excuteQueryUserDb({
      query: 'select * from userDb.user where email = ?',
      values: [email],
    })

    if (user.length > 0) {
      return true;
    }
  } catch (e) {
    console.log(e);
  }
  return false;
} 
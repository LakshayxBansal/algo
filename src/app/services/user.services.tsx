"use server"

import excuteQuery   from '../utils/db/db';
import {hashText, hashCompare} from '../utils/encrypt.utils';

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

    return excuteQuery({
      host: 'userDb',
      query: 'insert into user (email, password, firstname, lastname, datetime) values (?, ?, ?, ?, now())', 
      values: [userData.email, hashedPassword, userData.firstname, userData.lastname],
    });
  } catch (e) {
    console.log(e);
  }
  //return null;
}


/**
 * check if the user exists in userdb based on the email
 * @param email: email to be checked in the db 
 * @returns true if exists else returns false
 */
export async function checkUser(email: string) {
  try {
    // check if the user exists
    const user = await excuteQuery({
      host: 'userDb',
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
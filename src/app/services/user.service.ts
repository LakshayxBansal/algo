'use server'

import { ucs2 } from 'punycode';
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


export async function getBizAppUserList(crmDb: string, searchString: string, invited: boolean, accepted: boolean, mapped: boolean, admin: boolean){
  try {
    let query = 'select uc.user_id as id, u.firstName as name from userCompany uc, dbInfo db, company co, user u where \
                    db.name = ? and \
                    db.id = co.dbInfo_id and \
                    co.id = uc.company_id and \
                    uc.user_id = u.id and \
                    uc.isInvited = ? and \
                    uc.isAccepted = ? and \
                    uc.isMapped = ? and \
                    uc.isAdmin = ?';
    let values: any[] = [crmDb, invited, accepted, mapped, admin];

    if (searchString !== "") {
      query = query + " and u.firstName like '%" + searchString + "%' ";
    }
    const result = await excuteQuery({
      host: 'userDb',
      query: query, 
      values: values,
    });

    return result;

  } catch (e) {
    console.log(e);
  }
}
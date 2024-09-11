'use server'

import excuteQuery   from '../utils/db/db';
import {userSchemaT} from '@/app/models/models';
/**
 * add user to user db
 * 
 */

export async function addUser(data: userSchemaT) {
  try {

    return excuteQuery({
      host: "userDb",
      query: "call createUser(?, ?, ?, ?);",
      values: [
        data.contact,
        data.name,
        data.password,
        data.provider,
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
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


export async function getBizAppUserList(companyId: number, searchString: string, invited: boolean, accepted: boolean, mapped: boolean, admin: boolean){
  try {
    let query = 'select uc.user_id as id, u.name as name from userCompany uc, company co, user u where \
                    co.id = ? and \
                    co.id = uc.company_id and \
                    uc.user_id = u.id and \
                    uc.isInvited = ? and \
                    uc.isAccepted = ? and \
                    uc.isMapped = ? and \
                    uc.isAdmin = ?';
    let values: any[] = [companyId, invited, accepted, mapped, admin];

    if (searchString !== "") {
      query = query + " and u.name like '%" + searchString + "%' ";
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

export async function getUserDetailsByEmailList(email:string) {
  try {
    const user = await excuteQuery({
      host: 'userDb',
      query: 'select * from userDb.user where contact = ?',
      values: [email],
    })
    return user[0];
  } catch (e) {
    console.log(e);
  }
  return false;
}

export async function getUserDetailsByIdList(userId:number) {
  try {
    const user = await excuteQuery({
      host: 'userDb',
      query: 'select * from userDb.user where id = ?',
      values: [userId],
    })
    return user[0];
  } catch (e) {
    console.log(e);
  }
  return false;
}
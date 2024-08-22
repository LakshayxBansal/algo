'use server'

import excuteQuery   from '../utils/db/db';
import {hashText} from '../utils/encrypt.utils';
import {userSchemaT} from '@/app/models/models';
/**
 * add user to user db
 * 
 */
export async function addUser(data:userSchemaT) {
  try {
    const result = await excuteQuery({
      host: 'userDb',
      query: "call createUser(?, ?, ?, ?, ?);",
      values: [
        data.email,
        data.name,
        data.password,
        data.phone,
        data.provider,
      ],
    });
    return result;
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


export async function getBizAppUserList(crmDb: string, searchString: string, invited: boolean, accepted: boolean, mapped: boolean, admin: boolean){
  try {
    let query = 'select uc.user_id as id, u.name as name from userCompany uc, dbInfo db, company co, user u where \
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
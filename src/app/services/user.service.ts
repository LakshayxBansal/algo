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
export async function checkUser(contact: string) {
  try {
    // check if the user exists
    const user = await excuteQuery({
      host: 'userDb',
      query: 'select * from user where contact = ?',
      values: [contact],
    })

    if (user.length > 0) {
      return true;
    }
  } catch (e) {
    console.log(e);
  }
  return false;
} 

export async function checkInActiveUserDB(contact: string) {
  try {
    // check if the user exists
    const user = await excuteQuery({
      host: 'userDb',
      query: 'select * from user where contact = ? and active = -1',
      values: [contact],
    })

    if (user.length > 0) {
      return user[0];
    }
  } catch (e) {
    console.log(e);
  }
  return false;
} 

export async function makeUserActiveDB(id: number | undefined) {
  try {
    // check if the user exists
    await excuteQuery({
      host: 'userDb',
      query: 'update user set active = 1 where id = ?',
      values: [id],
    })
  } catch (e) {
    console.log(e);
  }
  return false;
} 

export async function deleteUserDB(id: number | undefined) {
  try {
    // check if the user exists
    await excuteQuery({
      host: 'userDb',
      query: 'delete from user where id = ?',
      values: [id],
    })
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
      query: 'select * from user where contact = ?',
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
      query: 'select * from user where id = ?',
      values: [userId],
    })
    return user[0];
  } catch (e) {
    console.log(e);
  }
  return false;
}

export async function mapUser(userId : number,companyId : number) {
  try{
    await excuteQuery({
      host: "userDb",
      query: "update userCompany set isMapped = 1 where user_id = ? and company_id = ?;",
      values: [ userId,companyId]
    })
  }catch(error){
    console.log(error);
  }
}

export async function deRegisterFromCompanyDB(id : number | null, userId : number | null, companyId : number | null) {
  try {
    let query;
    let values = [];
    if(id){
      query = "delete from userCompany where id = ?;"
      values = [id];
    }else{
      query = "delete from userCompany where user_id = ? and company_id = ?;"
      values = [userId,companyId]
    }

    await excuteQuery({
      host: 'userDb',
      query: query,
      values: values,
    })
    // return user[0];
    return;
  } catch (e) {
    console.log(e);
  }
  return false;
}

export async function deRegisterFromAllCompanyDB(userId : number) {
  try {

    await excuteQuery({
      host: 'userDb',
      query: "delete from userCompany where user_id = ?;",
      values: [userId],
    })
    return;
  } catch (e) {
    console.log(e);
  }
  return false;
}

export async function deRegisterFromAppDB(userId : number) {
  try {
    const user = await excuteQuery({
      host: 'userDb',
      query: 'update user set active = -1 where id = ?;',
      values: [userId],
    })
    return user[0];
  } catch (e) {
    console.log(e);
  }
  return false;
}

export async function getCompanyUserDB(
  companyId: number,
  page: number,
  filter: string | undefined,
  limit: number
) {
  try {
      const vals: any = [page, limit, limit];

      if (filter) {
          vals.unshift(filter);
      }
      vals.unshift(companyId);

      const result = await excuteQuery({
          host: "userDb",
          query:
                "SELECT * \
       FROM (SELECT uc.id as id,uc.user_id as userId, uc.isAdmin as admin ,u.name as name,u.contact as contact, ROW_NUMBER() OVER () AS RowID \
          FROM userCompany uc left join user u on uc.user_id = u.id where uc.company_id = ? and uc.isAccepted = 1 " +
                (filter ? "and u.name LIKE CONCAT('%',?,'%') " : "") +
                "order by uc.isAdmin desc, u.name asc \
      ) AS NumberedRows\
      WHERE RowID > ?*?\
      ORDER BY RowID\
      LIMIT ?;",
          values: vals,
      });
      return result
  } catch (e) {
      console.log(e);
  }
}

export async function getCompanyUserCount(
  companyId : number,
  filter: string | undefined
) {
  try {
    const vals: any = [companyId];
    if(filter){
      vals.push(filter);
    }
    return excuteQuery({
      host: "userDb",
      query:
        "SELECT count(*) as rowCount from userCompany uc left join user u on uc.user_id = u.id where uc.company_id = ?" +
        (filter ? "and u.name LIKE CONCAT('%',?,'%'); " : ";"),
      values: [vals],
    });
  } catch (e) {
    console.log(e);
  }
}

export async function checkUserInCompanyDB(userId : number, companyId : number) {
  try{
    const user =  excuteQuery({
      host : "userDb",
      query : "select * from userCompany where user_id = ? and company_id = ?;",
      values : [userId,companyId]
    })
    if(user){
      return user;
    }else{
      return null;
    }

  }catch(error){
    console.log(error);
  }
}
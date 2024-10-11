"use server";
import { inviteUserSchemaT } from "../models/models";
import excuteQuery from "../utils/db/db";

export async function createUserToInviteDb(data : inviteUserSchemaT) {
  try {
    return excuteQuery({
      host: "userDb",
      query: "call createInviteUser(?,?,?);",
      values: [data.name,data.usercontact,data.companyId],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function insertExecutiveIdToInviteUserList(executiveId:number,inviteId:number) {
  try {
    return excuteQuery({
      host: "userDb",
      query: "UPDATE inviteUser SET executive_id = ? WHERE id = ?;",
      values: [executiveId,inviteId],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function getInviteDetailByContactList(usercontact : string, companyId : number) {
  try {
    return excuteQuery({
      host: "userDb",
      query: "select * from inviteUser WHERE usercontact = ? and company_id = ?;",
      values: [usercontact,companyId],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function getInviteDetailByIdList(inviteId : number) {
  try {
    return excuteQuery({
      host: "userDb",
      query: "select * from inviteUser WHERE id = ?;",
      values: [inviteId],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function createInUsercompany(accept: boolean,executiveId:number | null,companyId:number,inviteDate : Date | undefined,userId : number){
  try{
    let query;
    if(accept){
      // if(executiveId){
      //   query = "insert into userCompany (user_id,company_id,isAdmin,isInvited,isAccepted,isMapped,invitedDate,acceptedDate,mappedDate) values (?,?,0,1,1,1,?,now(),now());"
      // }else{
        query = "insert into userCompany (user_id,company_id,isAdmin,isInvited,isAccepted,isMapped,invitedDate,acceptedDate) values (?,?,0,1,1,0,?,now());"
      // }
    }else{
      // if(executiveId){
      //   query = "insert into userCompany (user_id,company_id,isAdmin,isInvited,isAccepted,isMapped,invitedDate) values (?,?,0,1,-1,0,?);"
      // }else{
        query = "insert into userCompany (user_id,company_id,isAdmin,isInvited,isAccepted,isMapped,invitedDate) values (?,?,0,1,-1,0,?);"
      // }
    }
    return excuteQuery({
      host: "userDb",
      query: query,
      values: [userId,companyId,inviteDate],
    });
  }catch(error){
    console.log(error);
  }
}

export async function updateInUsercompany(executiveId:number | null,companyId:number,inviteDate : Date | undefined,userId : number){
  try{
    let query;
    // if(accept){
      // if(executiveId){
      //   query = "insert into userCompany (user_id,company_id,isAdmin,isInvited,isAccepted,isMapped,invitedDate,acceptedDate,mappedDate) values (?,?,0,1,1,1,?,now(),now());"
      // }else{
        query = "update userCompany set isAccepted = 1, invitedDate = ? where user_id = ? and company_id = ?;"
      // }
    // }else{
      // if(executiveId){
      //   query = "insert into userCompany (user_id,company_id,isAdmin,isInvited,isAccepted,isMapped,invitedDate) values (?,?,0,1,-1,0,?);"
      // }else{
        // query = "insert into userCompany (user_id,company_id,isAdmin,isInvited,isAccepted,isMapped,invitedDate) values (?,?,0,1,-1,0,?);"
      // }
    // }
    return excuteQuery({
      host: "userDb",
      query: query,
      values: [inviteDate,userId,companyId],
    });
  }catch(error){
    console.log(error);
  }
}

export async function deleteInvite(inviteId : number){
  try{
    return excuteQuery({
      host: "userDb",
      query: "delete from inviteUser where id = ?",
      values: [inviteId],
    });
  }catch(error){
    console.log(error);
  }
}

export async function getInviteUserDb(
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
                "SELECT *, RowNum as RowID  \
       FROM (SELECT *,ROW_NUMBER() OVER () AS RowNum, count(1) over () total_count \
          FROM inviteUser where company_id = ? " +
                (filter ? "and name LIKE CONCAT('%',?,'%') " : "") +
                "order by name\
      ) AS NumberedRows\
      WHERE RowNum > ?*?\
      ORDER BY RowNum\
      LIMIT ?;",
            values: vals,
        });
        return result
    } catch (e) {
        console.log(e);
    }
}

export async function getInviteUserCount(
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
          "SELECT count(*) as rowCount from inviteUser where company_id = ?" +
          (filter ? "and name LIKE CONCAT('%',?,'%'); " : ";"),
        values: [vals],
      });
    } catch (e) {
      console.log(e);
    }
  }
  
  export async function getInvitesDb(
    userContact: string,
    page: number,
    filter: string | undefined,
    limit: number
) {
    try {
        const vals: any = [page, limit, limit];

        if (filter) {
            vals.unshift(filter);
        }
        vals.unshift(userContact);

        const result = await excuteQuery({
            host: "userDb",
            query:
                "SELECT * \
       FROM (SELECT iu.id as id,iu.executive_id as executiveId, iu.company_id as companyId,iu.inviteDate as inviteDate ,c.name as companyName,ROW_NUMBER() OVER () AS RowID, count(1) over () total_count \
          FROM inviteUser iu left join company c on iu.company_id = c.id where iu.usercontact = ? " +
                (filter ? "and c.name LIKE CONCAT('%',?,'%') " : "") +
                "order by c.name\
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

export async function getInvitesCount(
    userContact : string,
    filter: string | undefined
  ) {
    try {
      const vals: any = [userContact];
      if(filter){
        vals.push(filter);
      }
      return excuteQuery({
        host: "userDb",
        query:
          "SELECT count(*) as rowCount from inviteUser where usercontact = ?" +
          (filter ? "and name LIKE CONCAT('%',?,'%'); " : ";"),
        values: [vals],
      });
    } catch (e) {
      console.log(e);
    }
  }

export async function getInviteUserByIdList(id: number) {
    try {
        let query =
            "select * from inviteUser where id = ?";
        let values: any[] = [id];
        const result = await excuteQuery({
            host: "userDb",
            query: query,
            values: values,
        });
        return result;
    } catch (e) {
        console.log(e);
    }
}
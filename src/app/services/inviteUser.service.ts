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
       FROM (SELECT *,ROW_NUMBER() OVER () AS RowNum \
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
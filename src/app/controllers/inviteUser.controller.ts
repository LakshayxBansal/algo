"use server";
import * as zs from "../zodschema/zodschema";
import { getSession } from "../services/session.service";
import { getInviteUserByIdList,getInviteUserCount,getInviteUserDb,createUserToInviteDb,insertExecutiveIdToInviteUserList,getInviteDetailByContactList,getInviteDetailByIdList } from "../services/inviteUser.service";
import { inviteUserSchemaT } from "../models/models";
import { bigIntToNum } from "../utils/db/types";
import { SqlError } from "mariadb";

export async function createUserToInvite(data : inviteUserSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      Object.assign(data, { companyId: session.user.dbInfo.id });
      const parsed = zs.inviteUserSchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await createUserToInviteDb(data);
        if (dbResult[0][0].error === 0) {
          result = { status: true, data: dbResult[1] };
        } else {
          result = {
            status: false,
            data: [
              {
                path: [dbResult[0][0].error_path],
                message: dbResult[0][0].error_text,
              },
            ],
          };
        }
      } else {
        let errorState: { path: (string | number)[]; message: string }[] = [];
        for (const issue of parsed.error.issues) {
          errorState.push({ path: issue.path, message: issue.message });
        }
        result = { status: false, data: errorState };
        return result;
      }
    } else {
      result = {
        status: false,
        data: [{ path: ["form"], message: "Error: Server Error" }],
      };
    }
    return result;
  } catch (e) {
    if (e instanceof SqlError && e.code === "ER_DUP_ENTRY") {
      result = {
        status: false,
        data: [{ path: ["name"], message: "Error: Value already exist" }],
      };
      return result;
    }
  }
  result = {
    status: false,
    data: [{ path: ["form"], message: "Error: Unknown Error" }],
  };
  return result;
}

export async function insertExecutiveIdToInviteUser(executiveId:number,inviteId:number) {
  try{
    const session = await getSession();
    if(session){
      await insertExecutiveIdToInviteUserList(executiveId,inviteId);
    }
  }catch(error){
    throw error;
  }
}

export async function getInviteDetailByContact(usercontact : string,companyId : number) {
  try{
    const session = await getSession();
    if(session){
      const result = await getInviteDetailByContactList(usercontact,companyId);
      return result[0];
    }
  }catch(error){
    throw error;
  }
}

export async function getInviteDetailById(inviteId : number) {
  try{
    const session = await getSession();
    if(session){
      const result = await getInviteDetailByIdList(inviteId);
      return result[0];
    }
  }catch(error){
    throw error;
  }
}


export async function getInviteUserByCompany(
    page: number,
    filter: string | undefined,
    limit: number
  ) {
    let getInviteUsers = {
      status: false,
      data: {} as inviteUserSchemaT,
      count: 0,
      error: {},
    };
    try {
      const appSession = await getSession();    
  
      if (appSession) {
        const companyId = appSession.user.dbInfo.id;
        const inviteUsers = await getInviteUserDb(
          companyId as number,
          page as number,
          filter,
          limit as number
        );
  
        const rowCount = await getInviteUserCount(
          companyId,
          filter
        );
        
        getInviteUsers = {
          status: true,
          data: inviteUsers.map(bigIntToNum) as inviteUserSchemaT,
          count: Number(rowCount[0]["rowCount"]),
          error: {},
        };
      }
    } catch (e: any) {
  
      let err = "Contact Admin, E-Code:369";
  
      getInviteUsers = {
        ...getInviteUsers,
        status: false,
        data: {} as inviteUserSchemaT,
        error: err,
      };
    }
    return getInviteUsers;
  }

export async function getInviteUserById(id : number){
    try{
        const session = await getSession();
        if(session){
            return getInviteUserByIdList(id);
        }
    }catch(error){
        throw error;
    }
}
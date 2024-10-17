"use server";

import * as zs from "../zodschema/zodschema";
import { executiveSchemaT } from "../models/models";
import {
  createExecutiveDB,
  getExecutiveByPageDb,
  getExecutiveCount,
  getExecutiveDetailsById,
  updateExecutiveDB,
  getExecutiveProfileImageByCrmUserIdList,
  insertUserIdInExecutiveDb,
  delExecutiveDetailsById,
  checkIfUsed,
  getProfileDetailsById,
} from "../services/executive.service";
import { getSession } from "../services/session.service";
import { getExecutiveList } from "@/app/services/executive.service";
import { getBizAppUserList, mapUser } from "../services/user.service";
import { bigIntToNum } from "../utils/db/types";
import * as mdl from "../models/models";
import { modifyPhone } from "../utils/phoneUtils";

const inviteSring = "Send Invite...";

export async function createExecutive(data: executiveSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      data.mobile = modifyPhone(data.mobile as string);
      data.whatsapp = modifyPhone(data.whatsapp as string);
      const parsed = zs.executiveSchema.safeParse(data);

      if (parsed.success) {
        // check if invite needs to be sent
        // if (data.crm_user === inviteSring) {
        //   inviteResult = inviteUser(data as executiveSchemaT);
        //   data.crm_map_id = 0;
        // } else {
        //   crm_map_id = await getCrmUserId(
        //     session.user.dbInfo.dbName,
        //     data.crm_user
        //   );
        //   data.crm_map_id = crm_map_id;
        // }
        // console.log("inviteResult", inviteResult);
        // console.log("CRM", crm_map_id);
          const dbResult = await createExecutiveDB(
            session,
            data as executiveSchemaT
          );

          if (dbResult[0].length === 0) {
            result = { status: true, data: dbResult[1] };
            if(dbResult[1][0].crm_user_id){
              await mapUser(dbResult[1][0].crm_user_id,dbResult[1][0].role_id,session.user.dbInfo.id);
            }
          } else {
            let errorState: { path: (string | number)[]; message: string }[] =
              [];
            dbResult[0].forEach((error: any) => {
              errorState.push({
                path: [error.error_path],
                message: error.error_text,
              });
            });
            result = {
              status: false,
              data: errorState,
            };
          }
      } else {
        let errorState: { path: (string | number)[]; message: string }[] = [];
        for (const issue of parsed.error.issues) {
          errorState.push({
            path: issue.path,
            message: issue.message,
          });
        }
        result = { status: false, data: errorState };
      }
    } else {
      result = {
        status: false,
        data: [{ path: ["form"], message: "Error: Server Error" }],
      };
    }
    return result;
  } catch (e: any) {
    console.log(e);
  }
  result = {
    status: false,
    data: [{ path: ["form"], message: "Error: Unknown Error" }],
  };
  return result;
}

export async function updateExecutive(data: executiveSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      data.mobile = modifyPhone(data.mobile as string);
      data.whatsapp = modifyPhone(data.whatsapp as string);
      const parsed = zs.executiveSchema.safeParse(data);

      if (parsed.success) {
        const dbResult = await updateExecutiveDB(
          session,
          data as executiveSchemaT
        );

        if (dbResult[0].length === 0) {
          result = { status: true, data: dbResult[1] };
          if(dbResult[1][0].crm_user_id){
            await mapUser(dbResult[1][0].crm_user_id,dbResult[1][0].role_id,session.user.dbInfo.id);
          }
        } else {
          let errorState: { path: (string | number)[]; message: string }[] = [];
          dbResult[0].forEach((error: any) => {
            errorState.push({
              path: [error.error_path],
              message: error.error_text,
            });
          });
          result = {
            status: false,
            data: errorState,
          };
        }
      } else {
        console.log(parsed.error.issues);

        let errorState: { path: (string | number)[]; message: string }[] = [];
        for (const issue of parsed.error.issues) {
          errorState.push({
            path: issue.path,
            message: issue.message,
          });
        }
        result = { status: false, data: errorState };
      }
    } else {
      result = {
        status: false,
        data: [{ path: ["form"], message: "Error: Server Error" }],
      };
    }
    return result;
  } catch (e: any) {
    console.log(e);
  }
  result = {
    status: false,
    data: [{ path: ["form"], message: "Error: Unknown Error" }],
  };
  return result;
}
/**
 *
 * @param searchString partial string for executive name
 * @returns
 */
export async function getExecutive(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getExecutiveList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

function inviteUser(data: executiveSchemaT) {
  return true;
}

async function getCrmUserId(user: string) {
  try {
    const session = await getSession();
    if (session) {
      const result = await getBizAppUserList(
        session.user.dbInfo.id,
        user,
        true,
        true,
        false,
        false
      );
      if (result.length > 0) {
        return result[0].id;
      }
    }
  } catch (e) {
    console.log(e);
  }
  return 0;
}

export async function getExecutiveById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getExecutiveDetailsById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

export async function getProfileById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getProfileDetailsById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

export async function insertUserIdInExecutive(
  crmDb: string,
  executiveId: number,
  userId: number
) {
  try {
    const session = await getSession();
    if (session) {
      return insertUserIdInExecutiveDb(crmDb, executiveId, userId);
    }
  } catch (error) {
    throw error;
  }
}

export async function delExecutiveById(id: number) {
  let errorResult = { status: false, error: {} };
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const check = await checkIfUsed(session.user.dbInfo.dbName, id);
      if (check[0].count > 0) {
        return "Can't Be DELETED!";
      } else {
        const result = await delExecutiveDetailsById(
          session.user.dbInfo.dbName,
          id
        );
        return "Record Deleted";
      }
      // if ((result.affectedRows = 1)) {
      //   errorResult = { status: true, error: {} };
      // } else if ((result .affectedRows = 0)) {
      //   errorResult = {
      //     ...errorResult,
      //     error: "Record Not Found",
      //   };
      // }
    }
  } catch (error: any) {
    throw error;
    errorResult = { status: false, error: error };
  }
  return errorResult;
}

export async function getExecutiveByPage(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getExecutive = {
    status: false,
    data: {} as mdl.executiveSchemaT,
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession) {
      const conts = await getExecutiveByPageDb(
        appSession.user.dbInfo.dbName as string,
        page as number,
        filter,
        limit as number
      );
      const rowCount = await getExecutiveCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getExecutive = {
        status: true,
        data: conts.map(bigIntToNum) as mdl.executiveSchemaT,
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {
    console.log(e);

    let err = "Executive Admin, E-Code:369";

    getExecutive = {
      ...getExecutive,
      status: false,
      data: {} as mdl.executiveSchemaT,
      error: err,
    };
  }
  return getExecutive;
}

export async function getExecutiveProfileImageByCrmUserId(crmUserId: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const profileImg = await getExecutiveProfileImageByCrmUserIdList(
        session.user.dbInfo.dbName,
        crmUserId
      );
      return profileImg[0]?.profileImg;
    }
    return null;
  } catch (error) {
    throw error;
  }
}

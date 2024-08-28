"use server";

import * as zs from "../zodschema/zodschema";
import { executiveSchemaT } from "../models/models";
import {
  createExecutiveDB,
  getExecutiveCount,
  getExecutiveDetailsById,
  Pagination,
  updateExecutiveDB,
} from "../services/executive.service";
import { getSession } from "../services/session.service";
import { getExecutiveList } from "@/app/services/executive.service";
import { getBizAppUserList } from "../services/user.service";
import { bigIntToNum } from "../utils/db/types";
import * as mdl from "../models/models";

const inviteSring = "Send Invite...";

export async function createExecutive(data: executiveSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      let inviteResult = false;
      let crm_map_id = 0;
      console.log("data:" + data);

      const parsed = zs.executiveSchema.safeParse(data);
      console.log(parsed);
      // console.log(parsed.error.issues);

      if (parsed.success) {
        // check if invite needs to be sent
        if (data.crm_user === inviteSring) {
          inviteResult = inviteUser(data as executiveSchemaT);
          data.crm_map_id = 0;
        } else {
          crm_map_id = await getCrmUserId(
            session.user.dbInfo.dbName,
            data.crm_user
          );
          data.crm_map_id = crm_map_id;
        }
        console.log("inviteResult", inviteResult);
        console.log("CRM", crm_map_id);
        if (inviteResult || crm_map_id) {
          const dbResult = await createExecutiveDB(
            session,
            data as executiveSchemaT
          );
          console.log("DbResult", dbResult);

          if (dbResult.length > 0 && dbResult[0].length === 0) {
            result = { status: true, data: dbResult[1] };
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
          result = {
            status: false,
            data: [{ path: ["form"], message: "Error: Error sending invite" }],
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
      let inviteResult = false;
      let crm_map_id = 0;
      console.log("data:" + data);

      const parsed = zs.executiveSchema.safeParse(data);
      console.log(parsed);
      // console.log(parsed.error.issues);

      if (parsed.success) {
        // check if invite needs to be sent
        if (data.crm_user === inviteSring) {
          inviteResult = inviteUser(data as executiveSchemaT);
          data.crm_map_id = 0;
        } else {
          crm_map_id = await getCrmUserId(
            session.user.dbInfo.dbName,
            data.crm_user
          );
          data.crm_map_id = crm_map_id;
        }
        console.log("inviteResult", inviteResult);
        console.log("CRM", crm_map_id);
        if (inviteResult || crm_map_id) {
          const dbResult = await updateExecutiveDB(
            session,
            data as executiveSchemaT
          );
          console.log("DbResult", dbResult);

          if (dbResult.length > 0 && dbResult[0].length === 0) {
            result = { status: true, data: dbResult[1] };
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
          result = {
            status: false,
            data: [{ path: ["form"], message: "Error: Error sending invite" }],
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

async function getCrmUserId(crmDb: string, user: string) {
  try {
    const result = await getBizAppUserList(
      crmDb,
      user,
      true,
      true,
      false,
      false
    );
    if (result.length > 0) {
      return result[0].id;
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

export async function getExecutives(
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
      const conts = await Pagination(
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
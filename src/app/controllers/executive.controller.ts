"use server";

import * as zs from "../zodschema/zodschema";
import { executiveSchemaT } from "../models/models";
import {
  createExecutiveDB,
  getExecutiveDetailsById,
  updateExecutiveDB,
} from "../services/executive.service";
import { getSession } from "../services/session.service";
import { getExecutiveList } from "@/app/services/executive.service";
import { SqlError } from "mariadb";
import { getBizAppUserList } from "../services/user.service";
import { logger } from "../utils/logger.utils";

const inviteSring = "Send Invite...";

export async function createExecutive(data: executiveSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      let inviteResult = false;
      let crm_map_id = 0;

      const parsed = zs.executiveSchema.safeParse(data);
      console.log(parsed);

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

          if (dbResult[0].length === 0) {
            result = { status: true, data: dbResult[1] };
          } else {
            let errorState: { path: (string | number)[]; message: string }[] =
              [];

            dbResult[0].forEach((error: any) => {
              errorState.push({
                path: error.error_path,
                message: error.error_text,
              });
            });
            result = { status: false, data: errorState };
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
      // data.dob = new Date(data.dob);
      // console.log(data);
      // const placeholderDate = new Date("1500-01-01");
      // const dob = new Date(data.dob);
      // const date = data.dob == "" ? placeholderDate : dob;
      // data.dob = date;

      // data.doa = data.doa == "" ? placeholderDate : data.doa;
      // data.doj = data.doj == "" ? placeholderDate : data.doj;

      // let data: { [key: string]: any } = {}; // Initialize an empty object
      let inviteResult = false;
      let crm_map_id = 0;
      // for (const [key, value] of formData.entries()) {
      //   data[key] = value;
      // }

      const parsed = zs.executiveSchema.safeParse(data);
      // console.log(parsed);

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
        if (inviteResult || crm_map_id) {
          const dbResult = await updateExecutiveDB(
            session,
            data as executiveSchemaT
          );
          console.log("DbResult", dbResult);

          if (dbResult[0].length === 0) {
            result = { status: true, data: dbResult[1] };
          } else {
            let errorState: { path: (string | number)[]; message: string }[] =
              [];

            dbResult[0].forEach((error: any) => {
              errorState.push({
                path: error.error_path,
                message: error.error_text,
              });
            });
            result = { status: false, data: errorState };
            // console.log(result);

            return result;
          }
        } else {
          result = {
            status: false,
            data: [{ path: ["form"], message: "Error: Error sending invite" }],
          };
        }
      } else {
        result = { status: false, data: parsed.error.issues };
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

export async function getExecutiveById(id: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getExecutiveDetailsById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

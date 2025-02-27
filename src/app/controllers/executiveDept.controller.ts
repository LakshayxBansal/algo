"use server";

import * as zs from "../zodschema/zodschema";
import { executiveDeptSchemaT } from "@/app/models/models";
import {
  getExecutiveDeptList,
  createExecutiveDeptDb,
  getDeptDetailsById,
  updateExecutiveDeptDb,
  getExecutiveDeptCount,
  getExecutiveDeptByPageDb,
  delExecutiveDeptByIdDB,
  checkIfUsed,
  getAllDeptsDB,
} from "../services/executiveDept.service";
import { getSession } from "../services/session.service";
import { SqlError } from "mariadb";
import { bigIntToNum } from "../utils/db/types";
import * as mdl from "../models/models";
import { createDeptInRightsTable, delDeptFromRightTable } from "./rights.controller";
import { getRegionalSettings } from "./config.controller";
import { EXECUTIVE_DEPT_OBJECT_ID } from "../utils/consts.utils";
import { getScreenDescription } from "./object.controller";

export async function getExecutiveDept(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getExecutiveDeptList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function createExecutiveDept(data: executiveDeptSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const parsed = zs.executiveDeptSchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await createExecutiveDeptDb(
          session,
          data as executiveDeptSchemaT
        );
        if (dbResult.length > 0 && dbResult[0][0].error === 0) {
          result = { status: true, data: dbResult[1] };
          await createDeptInRightsTable(dbResult[1][0].id);
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
        result = { status: false, data: parsed.error.issues };
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

export async function updateExecutiveDept(data: executiveDeptSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      // let data: { [key: string]: any } = {}; // Initialize an empty object

      // for (const [key, value] of data.entries()) {
      //   data[key] = value;
      // }

      const parsed = zs.executiveDeptSchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await updateExecutiveDeptDb(
          session,
          data as executiveDeptSchemaT
        );
        if (dbResult.length > 0 && dbResult[0][0].error === 0) {
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

export async function getDeptById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const userRights={};
      const configData = await getRegionalSettings();
      const screenDesc = await getScreenDescription(EXECUTIVE_DEPT_OBJECT_ID);
      const loggedInUserData = {
        name: session.user.name,
        userId : session.user.userId
      }
      if(id){
        const executiveDeptDetails = await getDeptDetailsById(session.user.dbInfo.dbName, id);
      
        const result = [
          screenDesc,
          executiveDeptDetails[0],
          userRights,
          configData,
          loggedInUserData
        ]
        return[
          result
        ]
    }
      const result=[
        screenDesc,
        userRights,
        configData,
        loggedInUserData
      ]
      return[
        result
      ]
  }
  } catch (error) {
    throw error;
  }
}
export async function delExecutiveDeptById(id: number) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const dbResult = await delExecutiveDeptByIdDB(session.user.dbInfo.dbName, id);
      if (dbResult[0][0].error === 0) {
        await delDeptFromRightTable(id);
        result = { status: true };
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
    } 
    else {
    result = {
      status: false,
      data: [{ path: ["form"], message: "Error: Server Error" }],
    };
  }
  return result;
} 
catch (error:any) {
      throw error;
    }
  }

export async function getExecutiveDeptByPage(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getExecutiveDept = {
    status: false,
    data: [] as mdl.executiveDeptSchemaT[],
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession?.user.dbInfo) {
      const dbData = await getExecutiveDeptByPageDb(
        appSession.user.dbInfo.dbName as string,
        page as number,
        filter,
        limit as number
      );
      const rowCount = await getExecutiveDeptCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getExecutiveDept = {
        status: true,
        data: dbData.map(bigIntToNum) as mdl.executiveDeptSchemaT[],
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {
    let err = "ExecutiveDept Admin, E-Code:369";

    getExecutiveDept = {
      ...getExecutiveDept,
      status: false,
      data: [] as mdl.executiveDeptSchemaT[],
      error: err,
    };
  }
  return getExecutiveDept;
}

export async function getAllDepts() {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getAllDeptsDB(session.user.dbInfo.dbName);
    }
  } catch (error) {
    throw error;
  }
}
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
import { getRegionalSettings } from "./config.controller";
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
    if (session) {
      // let data: { [key: string]: any } = {}; // Initialize an empty object

      // for (const [key, value] of formData.entries()) {
      //   data[key] = value;
      // }

      const parsed = zs.executiveDeptSchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await createExecutiveDeptDb(
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
    if (session) {
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
      const rights={};
      const config_data = await getRegionalSettings();
      const desc = await getScreenDescription(10,1);
      if(id){
        const executiveDeptDetails = getDeptDetailsById(session.user.dbInfo.dbName, id);
      
        const result = [
          desc,
          executiveDeptDetails,
          rights,
          config_data,
          session
        ]
        return[
          result
        ]
    }
      const result=[
        desc,
        rights,
        config_data,
        session
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
    data: {} as mdl.executiveDeptSchemaT,
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession) {
      const conts = await getExecutiveDeptByPageDb(
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
        data: conts.map(bigIntToNum) as mdl.executiveDeptSchemaT,
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {
    let err = "ExecutiveDept Admin, E-Code:369";

    getExecutiveDept = {
      ...getExecutiveDept,
      status: false,
      data: {} as mdl.executiveDeptSchemaT,
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

"use server";

import * as zs from "../zodschema/zodschema";
import { executiveRoleSchemaT } from "@/app/models/models";
import {
  getExecutiveRoleList,
  createExecutiveRoleDb,
  getExecutiveRoleDetailsById,
  updateExecutiveRoleDb,
  getExecutiveRoleCount,
  getExecutiveRoleByPageDb,
  delExecutiveRoleDetailsById,
  checkIfUsed,
  getAllRolesDB,
} from "../services/executiveRole.service";
import { getSession } from "../services/session.service";
import { SqlError } from "mariadb";
import { bigIntToNum } from "../utils/db/types";
import * as mdl from "../models/models";

export async function getExecutiveRole(
  searchString: string,
  // department?: number
) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getExecutiveRoleList(
        session.user.dbInfo.dbName,
        searchString,
      );
    }
  } catch (error) {
    throw error;
  }
}

export async function getAllRoles() {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getAllRolesDB(session.user.dbInfo.dbName);
    }
  } catch (error) {
    throw error;
  }
}

// Get Executive role details by id
export async function getExecutiveRoleById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getExecutiveRoleDetailsById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}
export async function delExecutiveRoleById(id: number) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const dbResult = await delExecutiveRoleDetailsById(session.user.dbInfo.dbName, id);
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

export async function createExecutiveRole(data: executiveRoleSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const parsed = zs.executiveRoleSchema.safeParse(data);

      if (parsed.success) {
        const dbResult = await createExecutiveRoleDb(
          session,
          data as executiveRoleSchemaT
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

export async function updateExecutiveRole(data: executiveRoleSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const parsed = zs.nameMasterData.safeParse(data);

      if (parsed.success) {
        let dbResult = await updateExecutiveRoleDb(
          session,
          data as executiveRoleSchemaT
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
  } catch (e: any) {
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

export async function getExecutiveRoleByPage(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getExecutiveRole = {
    status: false,
    data: [] as mdl.executiveRoleSchemaT[],
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession?.user.dbInfo) {
      const dbData = await getExecutiveRoleByPageDb(
        appSession.user.dbInfo.dbName as string,
        page as number,
        filter,
        limit as number
      );
      const rowCount = await getExecutiveRoleCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getExecutiveRole = {
        status: true,
        data: dbData.map(bigIntToNum) as mdl.executiveRoleSchemaT[],
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {

    let err = "ExecutiveRole Admin, E-Code:369";

    getExecutiveRole = {
      ...getExecutiveRole,
      status: false,
      data: [] as mdl.executiveRoleSchemaT[],
      error: err,
    };
  }
  return getExecutiveRole;
}

"use server";

import * as zs from "../zodschema/zodschema";
import { itemGroupSchemaT } from "@/app/models/models";
import {
  getItemGroupList,
  createItemGroupDb,
  getItemGroupDetailsById,
  getItemGroupByPageDb,
  updateItemGroupDb,
  getItemGroupCount,
  delItemGroupDetailsById,
  checkIfUsed,
} from "../services/itemGroup.service";
import { getSession } from "../services/session.service";
import { SqlError } from "mariadb";
import { logger } from "@/app/utils/logger.utils";
import { bigIntToNum } from "../utils/db/types";
import * as mdl from "../models/models";

export async function getItemGroup(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getItemGroupList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function createItemGroup(data: itemGroupSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.itemGroupSchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await createItemGroupDb(
          session,
          data as itemGroupSchemaT
        );
        if (dbResult.length > 0 && dbResult[0][0].error === 0) {
          result = { status: true, data: dbResult[1] };
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
    logger.error(e);
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

export async function updateItemGroup(data: itemGroupSchemaT) {
  let result;
  try {
    const session = await getSession();

    if (session) {
      const parsed = zs.itemGroupSchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await updateItemGroupDb(
          session,
          data as itemGroupSchemaT
        );

        // if (dbResult.length > 0 && dbResult[0][0].error === 0) {
        if (dbResult.length > 0 && dbResult[0].length === 0) {
          result = { status: true, data: dbResult[1] };
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
    console.log(e);
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
/**
 *
 * @param Id id of the item to be searched
 * @returns
 */
export async function getItemGroupById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getItemGroupDetailsById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

export async function delItemGroupById(id: number) {
  let errorResult = { status: false, error: {} };
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const check = await checkIfUsed(session.user.dbInfo.dbName, id);
      if(check[0].count>0){
        return ("Can't Be DELETED!");
      }
      else{
        const result = await delItemGroupDetailsById(session.user.dbInfo.dbName,id);        
        return ("Record Deleted");
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

export async function getItemGroupByPage(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getItemGroup = {
    status: false,
    data: {} as mdl.itemGroupSchemaT,
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession) {
      const conts = await getItemGroupByPageDb(
        appSession.user.dbInfo.dbName as string,
        page as number,
        filter,
        limit as number
      );

      const rowCount = await getItemGroupCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getItemGroup = {
        status: true,
        data: conts.map(bigIntToNum) as mdl.itemGroupSchemaT,
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {
    let err = "Item Group Admin, E-Code:369";

    getItemGroup = {
      ...getItemGroup,
      status: false,
      data: {} as mdl.itemGroupSchemaT,
      error: err,
    };
  }
  return getItemGroup;
}

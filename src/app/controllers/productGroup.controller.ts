"use server";

import * as zs from "../zodschema/zodschema";
import { productGroupSchemaT } from "@/app/models/models";
import {
  getProductGroupList,
  createProductGroupDb,
  getProductGroupDetailsById,
  getProductGroupByPageDb,
  updateProductGroupDb,
  getProductGroupCount,
  delProductGroupDetailsById,
  checkIfUsed,
} from "../services/productGroup.service";
import { getSession } from "../services/session.service";
import { SqlError } from "mariadb";
import { logger } from "@/app/utils/logger.utils";
import { bigIntToNum } from "../utils/db/types";
import * as mdl from "../models/models";

export async function getProductGroup(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getProductGroupList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function createProductGroup(data: productGroupSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const parsed = zs.productGroupSchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await createProductGroupDb(
          session,
          data as productGroupSchemaT
        );
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

export async function updateProductGroup(data: productGroupSchemaT) {
  let result;
  try {
    const session = await getSession();

    if (session?.user.dbInfo) {
      const parsed = zs.productGroupSchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await updateProductGroupDb(
          session,
          data as productGroupSchemaT
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
 * @param Id id of the product to be searched
 * @returns
 */
export async function getProductGroupById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getProductGroupDetailsById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

export async function delProductGroupById(id: number) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const dbResult = await delProductGroupDetailsById(session.user.dbInfo.dbName, id);
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

export async function getProductGroupByPage(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getProductGroup = {
    status: false,
    data: [] as mdl.productGroupSchemaT[],
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession?.user.dbInfo) {
      const dbData = await getProductGroupByPageDb(
        appSession.user.dbInfo.dbName as string,
        page as number,
        filter,
        limit as number
      );

      const rowCount = await getProductGroupCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getProductGroup = {
        status: true,
        data: dbData.map(bigIntToNum) as mdl.productGroupSchemaT[],
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {
    let err = "Product Group Admin, E-Code:369";

    getProductGroup = {
      ...getProductGroup,
      status: false,
      data: [] as mdl.productGroupSchemaT[],
      error: err,
    };
  }
  return getProductGroup;
}

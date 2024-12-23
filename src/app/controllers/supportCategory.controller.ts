"use server";

import * as zs from "../zodschema/zodschema";
import { getSession } from "../services/session.service";
import { SqlError } from "mariadb";
import { nameMasterDataT } from "../models/models";
import * as mdl from "../models/models";
import { bigIntToNum } from "../utils/db/types";
import { createSupportCategoryDb, delSupportCategoryDetailsById, getSupportCategoryByPageDb, getSupportCategoryCount, getSupportCategoryDetailsById, getSupportCategoryList, updateSupportCategoryDb } from "../services/supportCategory.service";

export async function getSupportCategory(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getSupportCategoryList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function getSupportCategoryById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getSupportCategoryDetailsById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

export async function delSupportCategoryById(id: number) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const dbResult = await delSupportCategoryDetailsById(session.user.dbInfo.dbName, id);
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

export async function createSupportCategory(data: nameMasterDataT) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const parsed = zs.nameMasterData.safeParse(data);
      if (parsed.success) {
        const dbResult = await createSupportCategoryDb(session, data);

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
        //result = {status: false, data: parsed.error.flatten().fieldErrors };
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

export async function updateSupportCategory(data: nameMasterDataT) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const parsed = zs.nameMasterData.safeParse(data);

      if (parsed.success) {
        let dbResult = await updateSupportCategoryDb(
          session,
          data as nameMasterDataT
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

export async function getSupportCategoryByPage(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getCategory = {
    status: false,
    data: [] as mdl.nameMasterDataT[],
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession?.user.dbInfo) {
      const dbData = await getSupportCategoryByPageDb(
        appSession.user.dbInfo.dbName as string,
        page as number,
        filter,
        limit as number
      );
      const rowCount = await getSupportCategoryCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getCategory = {
        status: true,
        data: dbData.map(bigIntToNum) as mdl.nameMasterDataT[],
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {

    let err = "Category Admin, E-Code:369";

    getCategory = {
      ...getCategory,
      status: false,
      data: [] as mdl.nameMasterDataT[],
      error: err,
    };
  }
  return getCategory;
}

"use server";

import * as zs from "../zodschema/zodschema";
import { SqlError } from "mariadb";
import { nameMasterDataT } from "../models/models";
import { bigIntToNum } from "../utils/db/types";
import * as mdl from "../models/models";
import { checkIfActionUsed, createSupportActionDb, delSupportActionDetailsById, getSupportActionByPageDb, getSupportActionCount, getSupportActionDetailsById, getSupportActionList, updateSupportActionDb } from "../services/supportAction.service";
import { getSession } from "../services/session.service";

export async function getSupportAction(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getSupportActionList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function getSupportActionById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getSupportActionDetailsById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

export async function delSupportActionById(id: number) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const dbResult = await delSupportActionDetailsById(session.user.dbInfo.dbName, id);
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
/**
 *
 * @param Id id of the product to be searched
 * @returns
 */

export async function getSupportActionByPage(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getAction = {
    status: false,
    data: [] as mdl.nameMasterDataT[],
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession?.user.dbInfo) {
      const dbData = await getSupportActionByPageDb(
        appSession.user.dbInfo.dbName as string,
        page as number,
        filter,
        limit as number
      );
      const rowCount = await getSupportActionCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getAction = {
        status: true,
        data: dbData.map(bigIntToNum) as mdl.nameMasterDataT[],
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {
    let err = "enquiryAction Admin, E-Code:369";

    getAction = {
      ...getAction,
      status: false,
      data: [] as mdl.nameMasterDataT[],
      error: err,
    };
  }
  // console.log(getAction);
  return getAction;

}

/**
 *
 * @param formData
 * @returns object with status, record if success and error
 */
export async function createSupportAction(data: nameMasterDataT) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      // const data = {
      //   name: formData.get("name") as string,
      // };

      const parsed = zs.nameMasterData.safeParse(data);
      if (parsed.success) {
        const dbResult = await createSupportActionDb(session, data);
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

export async function updateSupportAction(data: nameMasterDataT) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      // const data = {
      //   name: formData.get("name") as string,
      // };

      const parsed = zs.nameMasterData.safeParse(data);
      if (parsed.success) {
        const dbResult = await updateSupportActionDb(session, data);

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
    console.log(result);

    return result;
  } catch (e) {
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

export async function uploadSupportCsvData(data: string) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      
      const csvData = data; 

      const parsed = zs.nameMasterData.safeParse(csvData); 

      if (parsed.success) {
        const dbResult = await createSupportActionDb(session, parsed.data); 
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
    if (e instanceof SqlError) {
      if (e.code === "ER_DUP_ENTRY") {
        result = {
          status: false,
          data: [{ path: ["name"], message: "Error: Value already exists" }],
        };
      } else {
        result = {
          status: false,
          data: [{ path: ["form"], message: "Error: Database Error" }],
        };
      }
      return result;
    }
  }
  result = {
    status: false,
    data: [{ path: ["form"], message: "Error: Unknown Error" }],
  };
  return result;
}

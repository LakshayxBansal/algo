"use server";

import * as zs from "../zodschema/zodschema";
import {
  getEnquiryActionList,
  createEnquiryActionDb,
  getEnquiryActionCount,
  getActionDetailsById,
  updateEnquiryActionDb,
  getEnquiryActionByPageDb,
  delActionDetailsById,
  checkIfUsed,
} from "../services/enquiryAction.service";
import { getSession } from "../services/session.service";
import { SqlError } from "mariadb";
import { nameMasterDataT } from "../models/models";
import { bigIntToNum } from "../utils/db/types";
import * as mdl from "../models/models";

export async function getEnquiryAction(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getEnquiryActionList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function getActionById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getActionDetailsById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

export async function delActionById(id: number) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const dbResult = await delActionDetailsById(session.user.dbInfo.dbName, id);
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

export async function getEnquiryActionByPage(
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

    if (appSession) {
      const dbData = await getEnquiryActionByPageDb(
        appSession.user.dbInfo.dbName as string,
        page as number,
        filter,
        limit as number
      );
      const rowCount = await getEnquiryActionCount(
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
export async function createEnquiryAction(data: nameMasterDataT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      // const data = {
      //   name: formData.get("name") as string,
      // };

      const parsed = zs.nameMasterData.safeParse(data);
      if (parsed.success) {
        const dbResult = await createEnquiryActionDb(session, data);
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

export async function updateEnquiryAction(data: nameMasterDataT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      // const data = {
      //   name: formData.get("name") as string,
      // };

      const parsed = zs.nameMasterData.safeParse(data);
      if (parsed.success) {
        const dbResult = await updateEnquiryActionDb(session, data);

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

export async function uploadCsvData(data: string) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      
      const csvData = data; 

      const parsed = zs.nameMasterData.safeParse(csvData); 

      if (parsed.success) {
        const dbResult = await createEnquiryActionDb(session, parsed.data); 
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

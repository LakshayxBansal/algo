"use server";

import * as zs from "../zodschema/zodschema";
import {
  getEnquirySourceList,
  createEnquirySourceDb,
  getEnquirySourceDetailsById,
  updateEnquirySourceDb,
  getEnquirySourceCount,
  getEnquirySourceByPageDb,
  delEnquirySourceDetailsById,
} from "../services/enquirySource.service";
import { getSession } from "../services/session.service";
import { SqlError } from "mariadb";
import { nameMasterDataT } from "../models/models";
import { bigIntToNum } from "../utils/db/types";
import * as mdl from "../models/models";

export async function getEnquirySource(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getEnquirySourceList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function getEnquirySourceById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getEnquirySourceDetailsById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

export async function createEnquirySource(data: nameMasterDataT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.nameMasterData.safeParse(data);
      if (parsed.success) {
        const dbResult = await createEnquirySourceDb(session, data);
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

export async function updateEnquirySource(data: nameMasterDataT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.nameMasterData.safeParse(data);
      if (parsed.success) {
        const dbResult = await updateEnquirySourceDb(session, data);
        if (dbResult[0][0].error === 0) {
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

export async function getEnquirySourceByPage(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getEnquirySource = {
    status: false,
    data: {} as mdl.nameMasterDataT,
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession) {
      const conts = await getEnquirySourceByPageDb(
        appSession.user.dbInfo.dbName as string,
        page as number,
        filter,
        limit as number
      );
      const rowCount = await getEnquirySourceCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getEnquirySource = {
        status: true,
        data: conts.map(bigIntToNum) as mdl.nameMasterDataT,
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {

    let err = "EnquirySource Admin, E-Code:369";

    getEnquirySource = {
      ...getEnquirySource,
      status: false,
      data: {} as mdl.nameMasterDataT,
      error: err,
    };
  }
  return getEnquirySource;
}

export async function delEnquirySourceById(id: number) {
  let errorResult = { status: false, error: {} };
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const result = await delEnquirySourceDetailsById(session.user.dbInfo.dbName, id);

      if ((result.affectedRows = 1)) {
        errorResult = { status: true, error: {} };
      } else if ((result .affectedRows = 0)) {
        errorResult = {
          ...errorResult,
          error: "Record Not Found",
        };
      }
    }
  } catch (error:any) {
    throw error;
    errorResult= { status: false, error: error };
  }
  return errorResult;
}
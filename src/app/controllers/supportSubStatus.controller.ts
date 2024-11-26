"use server";

import { enquirySubStatusMasterT } from "@/app/models/models";

import { getSession } from "../services/session.service";
import { SqlError } from "mariadb";
import * as zs from "../zodschema/zodschema";
import { bigIntToNum } from "../utils/db/types";
import * as mdl from "../models/models";
import { updateEnquirySubStatusListDb } from "../services/enquirySubStatus.service";
import { createSupportSubStatusDb, delSupportSubStatusDetailsById, getSupportSubStatusByPageDb, getSupportSubStatusCount, getSupportSubStatusDetailsById, getSupportSubStatusList, updateSupportSubStatusDb, updateSupportSubStatusListDb } from "../services/supportSubStatus.service";

export async function getSupportSubStatus(
  searchString: string,
  status: string
) {
  try {
    
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getSupportSubStatusList(
        session.user.dbInfo.dbName,
        searchString,
        status
      );
    }
  } catch (error) {
    throw error;
  }
}

export async function getSupportSubSatusById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getSupportSubStatusDetailsById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

export async function createSupportSubStatus(data: enquirySubStatusMasterT) {
  let result;

  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.enquirySubStatusMaster.safeParse(data);

      if (parsed.success) {
        const dbResult = await createSupportSubStatusDb(
          session,
          data as enquirySubStatusMasterT
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

export async function updateSupportSubStatus(data: enquirySubStatusMasterT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      // const data = {
      //   name: formData.get("name") as string,
      // };

      const parsed = zs.enquirySubStatusMaster.safeParse(data);
      if (parsed.success) {
        const dbResult = await updateSupportSubStatusDb(session, data);

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

export async function updateSupportSubStatusList(data: enquirySubStatusMasterT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      // const data = {
      //   name: formData.get("name") as string,
      // };

      const parsed = zs.enquirySubStatusMaster.safeParse(data);
      if (parsed.success) {
        const dbResult = await updateSupportSubStatusListDb(session, data);
        console.log(dbResult);

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

export async function getSupportSubStatusByPage(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getEnquirySubStatus = {
    status: false,
    data: {} as mdl.enquirySubStatusMasterT,
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession) {
      const conts = await getSupportSubStatusByPageDb(
        appSession.user.dbInfo.dbName as string,
        page as number,
        filter,
        limit as number
      );
      const rowCount = await getSupportSubStatusCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getEnquirySubStatus = {
        status: true,
        data: conts.map(bigIntToNum) as mdl.enquirySubStatusMasterT,
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {
    let err = "EnquirySubStatus Admin, E-Code:369";

    getEnquirySubStatus = {
      ...getEnquirySubStatus,
      status: false,
      data: {} as mdl.enquirySubStatusMasterT,
      error: err,
    };
  }
  return getEnquirySubStatus;
}

export async function delSupportSubStatusById(id: number) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const dbResult = await delSupportSubStatusDetailsById(session.user.dbInfo.dbName, id);
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
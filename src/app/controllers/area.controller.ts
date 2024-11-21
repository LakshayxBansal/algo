"use server";

import * as zs from "../zodschema/zodschema";
import {
  getAreaList,
  createAreaDb,
  getAreaByIDList,
  updateAreaDb,
  getAreaCount,
  fetchAreaById,
  getAreaByPageDb,
  delAreaDetailsById,
  checkIfUsed,
} from "../services/area.service";
import { getSession } from "../services/session.service";
import { SqlError } from "mariadb";
import { areaSchemaT } from "../models/models";
import * as mdl from "../models/models";
import { bigIntToNum } from "../utils/db/types";
import { getScreenDescription } from "./object.controller";
import { getRegionalSettings } from "./config.controller";

export async function getArea(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getAreaList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function getAreaById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const rights = {};
      const config_data = await getRegionalSettings();
      const desc = await getScreenDescription(3,1);
      if(id){
        const areaDetails = await getAreaByIDList(session.user.dbInfo.dbName, id);
        const result = [
          desc,
          areaDetails[0],
          rights,
          config_data,
          session
        ];
        return [
          result
        ]
      }
      const result = [
        desc,
        rights,
        config_data,
        session
      ];
      return [
        result
      ]
    }
  } catch (error) {
    throw error;
  }
}

export async function getById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return fetchAreaById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}


export async function delAreaById(id: number) {
  let errorResult = { status: false, error: {} };
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      if (session?.user.dbInfo) {
      const check = await checkIfUsed(session.user.dbInfo.dbName, id);
      if(check[0].count>0){
        return ("Can't Be DELETED!");
      }
      else{
        const result = await delAreaDetailsById(session.user.dbInfo.dbName, id);
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
  }
  } catch (error:any) {
    throw error;
    errorResult= { status: false, error: error };
  }
  return errorResult;
}


export async function createArea(data: areaSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.areaSchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await createAreaDb(session, data);
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

export async function updateArea(data: areaSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      // const data = {
      //   name: areadata.get("name") as string,
      // };

      const parsed = zs.areaSchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await updateAreaDb(session, data);
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

export async function getAreaByPage(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getArea = {
    status: false,
    data: {} as mdl.areaSchemaT,
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession) {
      const conts = await getAreaByPageDb(
        appSession.user.dbInfo.dbName as string,
        page as number,
        filter,
        limit as number
      );
      const rowCount = await getAreaCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getArea = {
        status: true,
        data: conts.map(bigIntToNum) as mdl.areaSchemaT,
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {
    let err = "Area Admin, E-Code:369";

    getArea = {
      ...getArea,
      status: false,
      data: {} as mdl.areaSchemaT,
      error: err,
    };
  }
  return getArea;
}

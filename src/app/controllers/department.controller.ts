"use server";

import * as zs from "../zodschema/zodschema";
import {
  getDepartmentList,
  createDepartmentDb,
  getDepartmentDetailsById,
  updateDepartmentDb,
  getDepartmentCount,
  getDepartmentByPageDb,
  delDepartmentDetailsById,
  checkIfUsed,
  getDepartmentColumnsDb
} from "../services/department.service";
import { getSession } from "../services/session.service";
import { SqlError } from "mariadb";
import { nameMasterDataT } from "../models/models";
import { logger } from "@/app/utils/logger.utils";
import { bigIntToNum } from "../utils/db/types";
import * as mdl from "../models/models";

export async function getDepartment(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getDepartmentList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function getDepartmentById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getDepartmentDetailsById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}


export async function delDepartmentById(id: number) {
  let errorResult = { status: false, error: {} };
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const check = await checkIfUsed(session.user.dbInfo.dbName, id);
      if(check[0].count>0){
        return ("Can't Be DELETED!");
      }
      else{
        const result = await delDepartmentDetailsById(session.user.dbInfo.dbName, id);
        return ("Record Deleted");
      }
      //   if ((result.affectedRows = 1)) {
      //   errorResult = { status: true, error: {} };
      // } else if ((result.affectedRows = 0)) {
      //   errorResult = {
      //     ...errorResult,
      //     error: "Record Can't Be DELETED!",
      //   };
      // }
      // return ("Record Deleted");
    }
  } catch (error:any) {
    throw error;
    errorResult= { status: false, error: error };
  }
  return errorResult;
}


export async function createDepartment(data: nameMasterDataT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.nameMasterData.safeParse(data);
      if (parsed.success) {
        const dbResult = await createDepartmentDb(session, data);
        console.log("department", dbResult[1]);
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

export async function updateDepartment(data: nameMasterDataT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.nameMasterData.safeParse(data);
      if (parsed.success) {
        const dbResult = await updateDepartmentDb(session, data);
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

export async function getDepartmentByPage(
  page: number,
  filter: string | undefined,
  limit: number
) {
  // console.log("controller params",page,filter,limit)
  let getDepartment = {
    status: false,
    data: {} as mdl.nameMasterDataT,
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession) {
      const conts = await getDepartmentByPageDb(
        appSession.user.dbInfo.dbName as string,
        page as number,
        filter,
        limit as number
      );
      // console.log("smale data", conts)
      const rowCount = await getDepartmentCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getDepartment = {
        status: true,
        data: conts.map(bigIntToNum) as mdl.nameMasterDataT,
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
      // console.log("this is the result",conts);  
    }
  } catch (e: any) {

    let err = "Department Admin, E-Code:369";

    getDepartment = {
      ...getDepartment,
      status: false,
      data: {} as mdl.nameMasterDataT,
      error: err,
    };
  }
  return getDepartment;
}


export async function getDepartmentColumns(){
  try{
    const session = await getSession();
    console.log("session", session);
    if(session){
      const result = await getDepartmentColumnsDb(session.user.dbInfo.dbName as string);
      console.log(result);
      return result[0];
    }
  }catch(e){
    console.log(e);
  }
}
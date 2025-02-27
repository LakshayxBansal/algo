"use server";

import * as zs from "../zodschema/zodschema";
import {
  createUnitDB,
  getUnitCount,
  getUnitByPageDb,
  DeleteUnitList,
  updateUnitDB,
  delUnitDetailsById,
  checksIfUsed,
} from "../services/unit.service";
import { getSession } from "../services/session.service";
import { getUnitList, fetchUnitById } from "@/app/services/unit.service";
import * as mdl from "../models/models";
import { SqlError } from "mariadb";
import { bigIntToNum } from "../utils/db/types";
import { logger } from "../utils/logger.utils";

export async function createUnit(data: mdl.unitSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const parsed = zs.UnitSchema.safeParse(data);

      if (parsed.success) {
        const dbResult = await createUnitDB(session, data as mdl.unitSchemaT);
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
  } catch (e: any) {
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

export async function updateUnit(data: mdl.unitSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const parsed = zs.UnitSchema.safeParse(data);

      if (parsed.success) {
        const dbResult = await updateUnitDB(session, data as mdl.unitSchemaT);
        if (dbResult[0].length === 0) {
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
//         } else {
//           let errorState: { path: (string | number)[]; message: string }[] = [];
//           dbResult[0].forEach((error: any) => {
//             errorState.push({
//               path: [error.error_path],
//               message: error.error_text,
//             });
//           });
//           result = {
//             status: false,
//             data: errorState,
//           };
//         }
//       } else {
//         let errorState: { path: (string | number)[]; message: string }[] = [];
//         for (const issue of parsed.error.issues) {
//           errorState.push({ path: issue.path, message: issue.message });
//         }
//         result = { status: false, data: errorState };
//         return result;
//       }
//     } else {
//       result = {
//         status: false,
//         data: [{ path: ["form"], message: "Error: Server Error" }],
//       };
//     }
//     return result;
//   } catch (e: any) {
//     if (e instanceof SqlError && e.code === "ER_DUP_ENTRY") {
//       result = {
//         status: false,
//         data: [{ path: ["name"], message: "Error: Value already exist" }],
//       };
//       return result;
//     }
//   }
//   result = {
//     status: false,
//     data: [{ path: ["form"], message: "Error: Unknown Error" }],
//   };
//   return result;
// }

/**
 *
 * @param searchString partial string for unit name
 * @returns
 */
export async function getUnit(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getUnitList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function DeleteUnit(id: number) {
  try {
    const session = await getSession();

    if (session?.user.dbInfo) {
      return DeleteUnitList(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param Id id of the unit to be searched
 * @returns
 */
export async function getUnitById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return fetchUnitById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

export async function getUnitByPage(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getUnit = {
    status: false,
    data: [] as mdl.unitSchemaT[],
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession?.user.dbInfo) {
      const dbData = await getUnitByPageDb(
        appSession.user.dbInfo.dbName as string,
        page as number,
        filter,
        limit as number
      );
      console.log("Data from DB : ", dbData);
      const rowCount = await getUnitCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getUnit = {
        status: true,
        data: dbData.map(bigIntToNum) as mdl.unitSchemaT[],
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {
    logger.error(e);

    let err = "unit Admin, E-Code:369";

    getUnit = {
      ...getUnit,
      status: false,
      data: [] as mdl.unitSchemaT[],
      error: err,
    };
  }
  return getUnit;
}

export async function getUnitData(id: number) {
  let getUnit = {
    status: false,
    data: {} as mdl.unitSchemaT,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession?.user.dbInfo) {
      const dep = await fetchUnitById(
        appSession.user.dbInfo.dbName as string,
        id as number
      );

      getUnit = {
        status: true,
        data: dep.map(bigIntToNum) as mdl.unitSchemaT,
        error: {},
      };
    }
  } catch (e: any) {
    logger.error(e);

    let err = "unit Admin, E-Code:369";

    getUnit = {
      ...getUnit,
      status: false,
      data: {} as mdl.unitSchemaT,
      error: err,
    };
  }
  return getUnit;
}

export async function delUnitById(id: number) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const dbResult = await delUnitDetailsById(session.user.dbInfo.dbName, id);
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

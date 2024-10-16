"use server";

import * as zs from "../zodschema/zodschema";
import { getSession } from "../services/session.service";
import { SqlError } from "mariadb";
import { nameMasterDataT } from "../models/models";
import {
  createAllocationTypeDb,
  delAllocationDetailsById,
  getAllocationDetailsById,
  getAllocationTypeByPageDb,
  getAllocationTypeCount,
  getAllocationTypeList,
  updateAllocationTypeDb,
} from "../services/allocationType.service";
import { bigIntToNum } from "../utils/db/types";
import * as mdl from "../models/models";

export async function getAllocationType(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getAllocationTypeList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function getAllocationTypeById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getAllocationDetailsById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

export async function delAllocationTypeById(id: number) {
  let errorResult = { status: false, error: {} };
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const result = await delAllocationDetailsById(
        session.user.dbInfo.dbName,
        id
      );

      if ((result.affectedRows = 1)) {
        errorResult = { status: true, error: {} };
      } else if ((result.affectedRows = 0)) {
        errorResult = {
          ...errorResult,
          error: "Record Not Found",
        };
      }
    }
  } catch (error: any) {
    throw error;
    errorResult = { status: false, error: error };
  }
  return errorResult;
}

/**
 *
 * @param formData
 * @returns object with status, record if success and error
 */
export async function createAllocationType(data: nameMasterDataT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      // const data = {
      //   name: formData.get("name") as string,
      // };

      const parsed = zs.nameMasterData.safeParse(data);
      if (parsed.success) {
        const dbResult = await createAllocationTypeDb(session, data);
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

// export async function updateAllocationType(data: nameMasterDataT) {
//   let result;
//   try {
//     const session = await getSession();
//     if (session) {
//       // const data = {
//       //   name: formData.get("name") as string,
//       // };

//       const parsed = zs.nameMasterData.safeParse(data);
//       if (parsed.success) {
//         const dbResult = await updateAllocationTypeDb(session, data);

//         if (dbResult.length > 0 && dbResult[0][0].error === 0) {
//           result = { status: true, data: dbResult[1] };
//         } else {
//           result = {
//             status: false,
//             data: [
//               {
//                 path: [dbResult[0][0].error_path],
//                 message: dbResult[0][0].error_text,
//               },
//             ],
//           };
//         }
//       } else {
//         //result = {status: false, data: parsed.error.flatten().fieldErrors };
//         result = { status: false, data: parsed.error.issues };
//       }
//     } else {
//       result = {
//         status: false,
//         data: [{ path: ["form"], message: "Error: Server Error" }],
//       };
//     }
//     console.log(result);

//     return result;
//   } catch (e) {
//     console.log(e);
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

export async function updateAllocationType(data: nameMasterDataT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.nameMasterData.safeParse(data);
      if (!parsed.success) {
        return { status: false, data: parsed.error.issues };
      }

      // if (data.id === undefined) {
      //   return { status: false, data: [{ path: ["id"], message: "ID is required" }] };
      // }

      const currentData = await getAllocationDetailsById(
        session.user.dbInfo.dbName,
        data.id
      );

      console.log("data", currentData);

      if (currentData.length === 0) {
        return {
          status: false,
          data: [{ path: "refresh", message: "Record not found" }],
        };
      }

      const currentStamp = currentData[0].stamp;

      if (currentStamp !== data.stamp) {
        return {
          status: false,
          data: [
            {
              path: "refresh",
              message: "Data is updated, please refresh the page",
            },
          ],
        };
      } else {
        const dbResult = await updateAllocationTypeDb(session, data);
        console.log(dbResult);

        if (dbResult.length > 0 && dbResult[0][0].error === 0) {
          result = { status: true, data: dbResult[1] };
        } else {
          console.log("result", result);
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
    } else {
      result = {
        status: false,
        data: [{ path: ["form"], message: "Error: Server Error" }],
      };
    }
    return result;
  } catch (e) {
    if (e instanceof SqlError && e.code === "ER_DUP_ENTRY") {
      return {
        status: false,
        data: [{ path: ["name"], message: "Error: Value already exists" }],
      };
    }
    return {
      status: false,
      data: [{ path: ["form"], message: "Error: Unknown Error" }],
    };
  }
}

export async function getAllocationTypeByPage(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getAllocationType = {
    status: false,
    data: {} as mdl.nameMasterDataT,
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession) {
      const conts = await getAllocationTypeByPageDb(
        appSession.user.dbInfo.dbName as string,
        page as number,
        filter,
        limit as number
      );
      const rowCount = await getAllocationTypeCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getAllocationType = {
        status: true,
        data: conts.map(bigIntToNum) as mdl.nameMasterDataT,
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {
    let err = "AllocationType Admin, E-Code:369";

    getAllocationType = {
      ...getAllocationType,
      status: false,
      data: {} as mdl.nameMasterDataT,
      error: err,
    };
  }
  return getAllocationType;
}

// export async function deleteAllocationTypeById(id: number) {
//   try {
//     const session = await getSession();

//     if (session?.user.dbInfo) {
//       const result = deleteAllocationTypeByIdDb(session.user.dbInfo.dbName, id);
//     }
//   } catch (error) {
//     throw error;
//   }
// }

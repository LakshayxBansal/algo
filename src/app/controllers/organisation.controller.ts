"use server";

import * as zs from "../zodschema/zodschema";
import * as zm from "../models/models";
import {
  createOrganisationDB,
  getOrganisationDetailsById,
  updateOrganisationDB,getOrgsList,getOrgsCount
} from "../services/organisation.service";
import { getSession } from "../services/session.service";
import { bigIntToNum } from "../utils/db/types";
import { getOrganisationList } from "@/app/services/organisation.service";
import { SqlError } from "mariadb";

export async function createOrganisation(data: zm.organisationSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.organisationSchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await createOrganisationDB(
          session,
          data as zm.organisationSchemaT
        );
        console.log(dbResult);

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

export async function updateOrganisation(data: zm.organisationSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.organisationSchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await updateOrganisationDB(
          session,
          data as zm.organisationSchemaT
        );
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
 * @param searchString partial string for organisation name
 * @returns
 */
export async function getOrganisation(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getOrganisationList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function getOrganisationById(id: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getOrganisationDetailsById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

export async function getOrgns(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getOrgs = {
    status: false,
    data: {} as zm.getOrgansT,
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession) {
      const orgs = await getOrgsList(
        // appSession.dbSession?.dbInfo.dbName as string,
        appSession.user.dbInfo.dbName as string,
        page as number,
        filter,
        limit as number
      );
      const rowCount = await getOrgsCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getOrgs = {
        status: true,
        data: orgs.map(bigIntToNum) as zm.getOrgansT,
        count: Number(rowCount[0]['rowCount']),
        error: {},
      };
    }
  } catch (e: any) {
    console.log(e);

    let err = 'Contact Admin, E-Code:369';

    getOrgs = {
      ...getOrgs,
      status: false,
      data: {} as zm.getOrgansT,
      error: err,
    };
  }
  return getOrgs;
}

// export async function getOrgData(id : string){
//   let getOrg = {
//     status: false,
//     data: [{}] as zm.getOrganT,
//     error: {},
//   };
//   try {
//     const appSession = await getSession();

//     if (appSession) {
//       const dep = await getOrgDataDb(
//         appSession.user.dbInfo.dbName as string,
//         id as string
//       );
      
//       getOrg = {
//         status: true,
//         data: dep.map(bigIntToNum) as zm.getOrganT,
//         error: {},
//       };
//     }
//   } catch (e: any) {
//     console.log(e);

//     let err = 'Contact Admin, E-Code:369';

//     getOrg = {
//       ...getOrg,
//       status: false,
//       data: {} as zm.getOrganT,
//       error: err,
//     };
//   }
//   return getOrg;
// }



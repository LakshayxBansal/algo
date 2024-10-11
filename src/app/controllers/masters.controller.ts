"use server";

import {
  getCountryList,
  getExecutiveList,
  getEnquiryCategoryList,
  getOrganizationList,
  getMenuOptionsList,
  createCountryDb,
  updateCountryDb,
  createStateDb,
  getStateList,
  getCountryByIDList,
  updateStateDb,
  getStateListById,
  getCountryByPageDb,
  getCountryCount,
  getStateByPageDb,
  getStateCount,
  delStateDetailsById,
  delCountryByIdDB,
  checkStateIfUsed,
  checkCountryIfUsed} from '../services/masters.service';
import { getSession } from '../services/session.service';
import * as zs from '../zodschema/zodschema';
import * as zm from '../models/models';
import { SqlError } from 'mariadb';
import { bigIntToNum } from "../utils/db/types";
import * as mdl from "../models/models";

export async function authenticate(formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const externalApiUrl = "http://127.0.0.1/auth";
    const externalApiResponse = await fetch(externalApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other required headers
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    return externalApiResponse;
  } catch (e) {
    console.log(e);
  }
  return false;
}

export async function getMenuOptions(crmDb: string) {
  try {
    let menuOptions = [];
    const result = await getMenuOptionsList(crmDb);

    // create top level menu
    const tree = createTree(result, 0);
    return tree;
  } catch (e) {
    console.log(e);
  }
  return null;
}

function createTree(flatArray: zm.menuTreeT[], parentId = 0): zm.menuTreeT[] {
  return flatArray
    .filter((item) => item.parent_id === parentId)
    .map((item) => ({
      ...item,
      children: createTree(flatArray, item.id),
    }));
}

export async function getCountries(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getCountryList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function getCountryById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getCountryByIDList(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param searchState : partial state string to search for
 * @param country : country for which the states need to be searched
 * @returns
 */
export async function getStates(searchState: string, country: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getStateList(session.user.dbInfo.dbName, searchState, country);
    }
  } catch (error) {
    throw error;
  }
}

export async function getStateById(state_id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getStateListById(session.user.dbInfo.dbName, state_id);
    }
  } catch (error) {
    throw error;
  }
}

export async function getExecutive(crmDb: string, departmentName: string) {
  try {
    const result = await getExecutiveList(crmDb, departmentName);

    return JSON.stringify(result);
  } catch (error) {
    throw error;
  }
}

/**
 * get categories for the ticket
 *
 */

export async function getTicketCategory(crmDb: string, ticketTypeId: number) {
  try {
    const result = await getEnquiryCategoryList(crmDb);

    return JSON.stringify(result);
  } catch (error) {
    throw error;
  }
}

export async function getOrganization(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo.dbName) {
      return getOrganizationList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param formData
 * @returns object with status, record if success and error
 */
export async function createCountry(data: zm.countrySchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.countrySchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await createCountryDb(
          session,
          data as zm.countrySchemaT
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

export async function updateCountry(data: zm.countrySchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.countrySchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await updateCountryDb(
          session,
          data as zm.countrySchemaT
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
 * @param formData
 * @returns object with status, record if success and error
 */
export async function createState(data: zm.stateSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.stateSchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await createStateDb(session, data as zm.stateSchemaT);

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

export async function updateState(data: zm.stateSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.stateSchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await updateStateDb(session, data as zm.stateSchemaT);

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

export async function getCountryByPage(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getCountry = {
    status: false,
    data: {} as mdl.countrySchemaT,
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession) {
      const conts = await getCountryByPageDb(
        appSession.user.dbInfo.dbName as string,
        page as number,
        filter,
        limit as number
      );

      const rowCount = await getCountryCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getCountry = {
        status: true,
        data: conts.map(bigIntToNum) as mdl.countrySchemaT,
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {
    let err = "Country Admin, E-Code:369";

    getCountry = {
      ...getCountry,
      status: false,
      data: {} as mdl.countrySchemaT,
      error: err,
    };
  }
  return getCountry;
}

export async function getStateByPage(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getState = {
    status: false,
    data: {} as mdl.stateSchemaT,
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession) {
      const conts = await getStateByPageDb(
        appSession.user.dbInfo.dbName as string,
        page as number,
        filter,
        limit as number
      );

      const rowCount = await getStateCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getState = {
        status: true,
        data: conts.map(bigIntToNum) as mdl.stateSchemaT,
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {
    let err = "State Admin, E-Code:369";

    getState = {
      ...getState,
      status: false,
      data: {} as mdl.stateSchemaT,
      error: err,
    };
  }
  return getState;
}

export async function delCountryById(id: number) {
  let errorResult = { status: false, error: {} };
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const check = await checkCountryIfUsed(session.user.dbInfo.dbName, id);
      if(check[0].count>0){
        return ("Can't Be DELETED!");
      }
      else{
        const result = await delCountryByIdDB(session.user.dbInfo.dbName, id);
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
  } catch (error: any) {
    throw error;
    errorResult = { status: false, error: error };
  }
  return errorResult;
}

export async function delStateById(id: number) {
  let errorResult = { status: false, error: {} };
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const check = await checkStateIfUsed(session.user.dbInfo.dbName, id);
      if (check[0].count > 0) {
        return "Can't Be DELETED!";
      } else {
        const result = await delStateDetailsById(
          session.user.dbInfo.dbName,
          id
        );
        return "Record Deleted";
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
  } catch (error: any) {
    throw error;
    errorResult = { status: false, error: error };
  }
  return errorResult;
}
"use server";

import * as zs from "../zodschema/zodschema";
import { itemSchemaT } from "../models/models";
import {
  createItemDB,
  Pagination,
  getItemCount,
  DeleteItemList,
  getItemList,
} from "../services/item.service";
import { getSession } from "../services/session.service";
import { updateItemDB } from "../services/item.service";
import { fetchItemById } from "@/app/services/item.service";
import * as mdl from "../models/models";
import { SqlError } from "mariadb";
import { bigIntToNum } from "../utils/db/types";

export async function createItem(data: itemSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.ItemSchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await createItemDB(session, data as itemSchemaT);
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

export async function updateItem(data: itemSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.ItemSchema.safeParse(data);

      if (parsed.success) {
        const dbResult = await updateItemDB(session, data as itemSchemaT);
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
 * @param searchString partial string for item name
 * @returns
 */
export async function getItem(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getItemList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function DeleteItem(id: number) {
  try {
    const session = await getSession();
    console.log(session);

    if (session?.user.dbInfo) {
      return DeleteItemList(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param Id id of the item to be searched
 * @returns
 */
export async function getItemById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return fetchItemById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

export async function getItems(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getItem = {
    status: false,
    data: {} as mdl.getItemT,
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession) {
      const conts = await Pagination(
        appSession.user.dbInfo.dbName as string,
        page as number,
        filter,
        limit as number
      );
      const rowCount = await getItemCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getItem = {
        status: true,
        data: conts.map(bigIntToNum) as mdl.getItemT,
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {
    console.log(e);

    let err = "item Admin, E-Code:369";

    getItem = {
      ...getItem,
      status: false,
      data: {} as mdl.getItemT,
      error: err,
    };
  }
  return getItem;
}

export async function getItemData(id: number) {
  let getItem = {
    status: false,
    data: [{}] as mdl.getItemT,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession) {
      const dep = await fetchItemById(
        appSession.user.dbInfo.dbName as string,
        id as number
      );

      getItem = {
        status: true,
        data: dep.map(bigIntToNum) as mdl.getItemT,
        error: {},
      };
    }
  } catch (e: any) {
    console.log(e);

    let err = "item Admin, E-Code:369";

    getItem = {
      ...getItem,
      status: false,
      data: {} as mdl.getItemT,
      error: err,
    };
  }
  return getItem;
}

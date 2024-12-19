"use server";

import * as zs from "../zodschema/zodschema";
import { productSchemaT } from "../models/models";
import {
  createProductDB,
  getProductCount,
  getProductList,
  getProductByPageDb,
  deleteProductListDetailsById,
} from "../services/product.service";
import { getSession } from "../services/session.service";
import { updateProductDB } from "../services/product.service";
import { fetchProductById } from "@/app/services/product.service";
import * as mdl from "../models/models";
import { SqlError } from "mariadb";
import { bigIntToNum } from "../utils/db/types";

export async function createProduct(data: productSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const parsed = zs.ProductSchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await createProductDB(session, data as productSchemaT);
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

export async function updateProduct(data: productSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const parsed = zs.ProductSchema.safeParse(data);

      if (parsed.success) {
        const dbResult = await updateProductDB(session, data as productSchemaT);
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
 * @param searchString partial string for product name
 * @returns
 */
export async function getProduct(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getProductList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}


/**
 *
 * @param Id id of the product to be searched
 * @returns
 */
export async function getProductById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return fetchProductById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

export async function delProductById(id: number) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const dbResult = await deleteProductListDetailsById(session.user.dbInfo.dbName, id);
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

export async function getProductByPage(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getProduct = {
    status: false,
    data: [] as productSchemaT[],
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession?.user.dbInfo) {
      const dbData = await getProductByPageDb(
        appSession.user.dbInfo.dbName as string,
        page as number,
        filter,
        limit as number
      );
      const rowCount = await getProductCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getProduct = {
        status: true,
        data: dbData.map(bigIntToNum) as productSchemaT[],
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {

    let err = "Product Admin, E-Code:369";

    getProduct = {
      ...getProduct,
      status: false,
      data: [] as productSchemaT[],
      error: err,
    };
  }
  return getProduct;
}

export async function getProductData(id: number) {
  let getProduct = {
    status: false,
    data: {} as productSchemaT,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession?.user.dbInfo) {
      const dep = await fetchProductById(
        appSession.user.dbInfo.dbName as string,
        id as number
      );

      getProduct = {
        status: true,
        data: dep.map(bigIntToNum) as productSchemaT,
        error: {},
      };
    }
  } catch (e: any) {

    let err = "Product Admin, E-Code:369";

    getProduct = {
      ...getProduct,
      status: false,
      data: {} as productSchemaT,
      error: err,
    };
  }
  return getProduct;
}

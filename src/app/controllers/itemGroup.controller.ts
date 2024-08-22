"use server";

import * as zs from "../zodschema/zodschema";
import { itemGroupSchemaT } from "@/app/models/models";
import {
  getItemGroupList,
  createItemGroupDb,
} from "../services/itemGroup.service";
import { getSession } from "../services/session.service";
import { SqlError } from "mariadb";
import { logger } from "@/app/utils/logger.utils";

export async function getItemGroup(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getItemGroupList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function createItemGroup(data: itemGroupSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.itemGroupSchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await createItemGroupDb(
          session,
          data as itemGroupSchemaT
        );
        if (dbResult.length > 0) {
          result = { status: true, data: dbResult };
        } else {
          result = {
            status: false,
            data: [{ path: ["form"], message: "Error: Error saving record" }],
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

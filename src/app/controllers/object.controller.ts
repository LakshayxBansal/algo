"use server";
import { getFieldTypeStructureDB, getScreenDescriptionDB } from "../services/object.service";
import { getSession } from "../services/session.service";
import { logger } from "../utils/logger.utils";

export async function getScreenDescription(objectTypeID: number) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      result = await getScreenDescriptionDB(
        session.user.dbInfo.dbName,
        objectTypeID
      );
      return result;
    }
  } catch (e) {
    logger.error(e);
  }
  result = {
    status: false,
    data: [{ path: ["form"], message: "Error: Unknown Error" }],
  };
  return result;
}

export async function getFieldTypeStructure(object_type_id:number) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      result = await getFieldTypeStructureDB(session.user.dbInfo.dbName,object_type_id);
      return result;
    }
  } catch (e) {
    logger.error(e);
  }
  result = {
    status: false,
    data: [{ path: ["form"], message: "Error: Unknown Error" }],
  };
  return result;
}

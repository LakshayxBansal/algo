"use server";
import { getScreenDescriptionDB } from "../services/object.service";
import { getSession } from "../services/session.service";
import { logger } from "../utils/logger.utils";

export async function getScreenDescription(objectID: number) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      result = await getScreenDescriptionDB(
        session.user.dbInfo.dbName,
        objectID
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

export async function getObjectList(objectID: number) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      result = await getScreenDescriptionDB(
        session.user.dbInfo.dbName,
        objectID
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
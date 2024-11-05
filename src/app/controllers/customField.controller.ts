"use server";
import { createCustomFieldsDB } from "../services/customField.service";
import { getSession } from "../services/session.service";
import { logger } from "../utils/logger.utils";

export async function createCustomFields(objectID: number,action_id: number,data: any) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      result = await createCustomFieldsDB(
        session.user.dbInfo.dbName,
        objectID,
        action_id,
        data
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

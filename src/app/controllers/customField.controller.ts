"use server";
import { SqlError } from "mariadb";
import { createCustomFieldsDB } from "../services/customField.service";
import { getSession } from "../services/session.service";
import { logger } from "../utils/logger.utils";

export async function createCustomFields(objectID: number,action_id: number,data: any) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {

      const dbResult = await createCustomFieldsDB(
        session.user.dbInfo.dbName,
        session.user.userId,
        objectID,
        action_id,
        data
      );
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
    } 
   else {
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


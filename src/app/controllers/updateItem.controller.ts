"use server";

import * as zs from "../zodschema/zodschema";
import { itemSchemaT } from "../models/models";
import { updateItemDB } from "../services/updateItem.service";
import { getSession } from "../services/session.service";
import * as mdl from "../models/models";
import { SqlError } from "mariadb";

export async function updateItem(data: itemSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.ItemSchema.safeParse(data);

      if (parsed.success) {
        const dbResult = await updateItemDB(session, data as itemSchemaT);
        console.log(dbResult);
        if (dbResult[0].length === 0) {
          result = { status: true, data: dbResult[1] };
        } else {
          //   result = {
          //     status: false,
          //     data: [
          //       {
          //         path: [dbResult[0][0].error_path],
          //         message: dbResult[0][0].error_text,
          //       },
          //     ],
          //   };
          // }
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
            // [
            //   {
            //     path: [dbResult[0][0].error_path],
            //     message: dbResult[0][0].error_text,
            //   },
            // ],
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

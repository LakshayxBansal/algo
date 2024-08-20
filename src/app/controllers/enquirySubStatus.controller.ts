"use server";

import { enquirySubStatusMaster } from "../zodschema/zodschema";
import { enquirySubStatusMasterT } from "@/app/models/models";
import {
  getEnquirySubStatusList,
  createEnquirySubStatusDb,
  updateEnquirySubStatusDb,
  getEnquirySubStatusDetailsById,
} from "../services/enquirySubStatus.service";
import { getSession } from "../services/session.service";
import { SqlError } from "mariadb";
import * as zs from "../zodschema/zodschema";

export async function getEnquirySubStatus(
  searchString: string,
  status: string
) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getEnquirySubStatusList(
        session.user.dbInfo.dbName,
        searchString,
        status
      );
    }
  } catch (error) {
    throw error;
  }
}

export async function getEnquirySubSatusById(id: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getEnquirySubStatusDetailsById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

export async function createEnquirySubStatus(data: enquirySubStatusMasterT) {
  let result;
  console.log(data);

  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.enquirySubStatusMaster.safeParse(data);
      console.log(parsed);

      if (parsed.success) {
        const dbResult = await createEnquirySubStatusDb(
          session,
          data as enquirySubStatusMasterT
        );
        console.log(result);
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

export async function updateEnquirySubStatus(data: enquirySubStatusMasterT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      // const data = {
      //   name: formData.get("name") as string,
      // };

      const parsed = zs.enquirySubStatusMaster.safeParse(data);
      if (parsed.success) {
        const dbResult = await updateEnquirySubStatusDb(session, data);
        console.log(dbResult);

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
      } else {
        //result = {status: false, data: parsed.error.flatten().fieldErrors };
        result = { status: false, data: parsed.error.issues };
      }
    } else {
      result = {
        status: false,
        data: [{ path: ["form"], message: "Error: Server Error" }],
      };
    }
    console.log(result);

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

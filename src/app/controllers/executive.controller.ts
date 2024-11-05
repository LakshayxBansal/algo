"use server";

import * as zs from "../zodschema/zodschema";
import { executiveSchemaT } from "../models/models";
import { join } from 'path';
import { writeFile } from 'fs/promises';
import {
  createExecutiveDB,
  getExecutiveByPageDb,
  getExecutiveCount,
  getExecutiveDetailsById,
  updateExecutiveDB,
  getExecutiveProfileImageByCrmUserIdList,
  insertUserIdInExecutiveDb,
  delExecutiveDetailsById,
  checkIfUsed,
  getProfileDetailsById,
  getExecutiveColumnsDb,
  addDocumentDB,
  updateDocumentDB,
  getExecutiveDocsDB,
  updateExecutiveDocDB,
  deleteExecutiveDocDB,
} from "../services/executive.service";
import { getSession } from "../services/session.service";
import { getExecutiveList } from "@/app/services/executive.service";
import { getBizAppUserList, mapUser } from "../services/user.service";
import { bigIntToNum } from "../utils/db/types";
import * as mdl from "../models/models";
import { modifyPhone } from "../utils/phoneUtils";
import { logger } from "../utils/logger.utils";
import axios from "axios";
import FormData from 'form-data';
import { Buffer } from "buffer";
import { getUserDetailsById } from "./user.controller";
import { revalidatePage } from "../company/SelectCompany";

const inviteSring = "Send Invite...";

export async function createExecutive(data: executiveSchemaT, docData: any) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      data.mobile = modifyPhone(data.mobile as string);
      data.whatsapp = modifyPhone(data.whatsapp as string);
      const parsed = zs.executiveSchema.safeParse(data);

      if (parsed.success) {

        const dbResult = await createExecutiveDB(
          session,
          data as executiveSchemaT
        );


        if (dbResult[0].length === 0) {
          result = { status: true, data: dbResult[1] };
          for (const doc of docData) {
            const formData = new FormData();

            formData.append('app_id', 'e2fda9ab-7b36-4461-839e-ab6ed3545e76');
            formData.append('meta_data', `{"name": "${doc.description}"}`);

            const base64Data = doc.file.replace(/^data:.*;base64,/, "");
            const contentType = doc.fileType;
            const buffer = Buffer.from(base64Data, 'base64');
            formData.append('file_data', buffer, { filename: doc.document, contentType: contentType });

            const docInfo = await axios.post("http://192.168.1.200:3000/addDoc", formData, {
              headers: {
                ...formData.getHeaders(),
                "client_id": "fd85c348-8d54-4e20-b75e-c085d507a8ab",
                "access_key": "5616e450142cb9214437e6a7d0f1eb944ca733b02883226a876e43b597f64011"
              }
            }
            )

            doc["docId"] = docInfo.data.document_id;
            doc["executiveId"] = dbResult[1][0].id;
            await addDocument(doc);
          }
          if (dbResult[1][0].crm_user_id) {
            await mapUser(true, dbResult[1][0].crm_user_id, dbResult[1][0].role_id, session.user.dbInfo.id);
          }
        } else {
          let errorState: { path: (string | number)[]; message: string }[] =
            [];
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
          errorState.push({
            path: issue.path,
            message: issue.message,
          });
        }
        result = { status: false, data: errorState };
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
  }
  result = {
    status: false,
    data: [{ path: ["form"], message: "Error: Unknown Error" }],
  };
  return result;
}

export async function updateExecutive(data: executiveSchemaT, docData: any) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      data.mobile = modifyPhone(data.mobile as string);
      data.whatsapp = modifyPhone(data.whatsapp as string);
      const parsed = zs.executiveSchema.safeParse(data);

      if (parsed.success) {
        const dbResult = await updateExecutiveDB(
          session,
          data as executiveSchemaT
        );

        if (dbResult[0].length === 0) {
          result = { status: true, data: dbResult[1] };
          for (const doc of docData) {
            const formData = new FormData();

            formData.append('app_id', '9334f8d1-1b69-476f-b143-2b5b048cc458');
            formData.append('meta_data', `{"name": "${doc.description}"}`);

            const base64Data = doc.file.replace(/^data:.*;base64,/, "");
            const contentType = doc.fileType;
            const buffer = Buffer.from(base64Data, 'base64');
            formData.append('doc', buffer, { filename: doc.document, contentType: contentType });

            const docInfo = await axios.post("http://192.168.1.200:3000/addDoc", formData, {
              headers: {
                ...formData.getHeaders(),
                "client_id": "fd85c348-8d54-4e20-b75e-c085d507a8ab",
                "access_key": "5616e450142cb9214437e6a7d0f1eb944ca733b02883226a876e43b597f64011"
              }
            }
            )
            if (docInfo.data.status) {
              doc["docId"] = docInfo.data.data.doc_id;
              doc["executiveId"] = dbResult[1][0].id;
              await addDocument(doc);
            }
          }
          if (dbResult[1][0].crm_user_id) {
            await mapUser(true, dbResult[1][0].crm_user_id, dbResult[1][0].role_id, session.user.dbInfo.id);
          }
          if (data.prev_crm_user_id !== 0 && dbResult[1][0].crm_user_id !== data.prev_crm_user_id) {
            await mapUser(false, data.prev_crm_user_id as number, 0, session.user.dbInfo.id);
          }
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
        console.log(parsed.error.issues);

        let errorState: { path: (string | number)[]; message: string }[] = [];
        for (const issue of parsed.error.issues) {
          errorState.push({
            path: issue.path,
            message: issue.message,
          });
        }
        result = { status: false, data: errorState };
      }
    } else {
      result = {
        status: false,
        data: [{ path: ["form"], message: "Error: Server Error" }],
      };
    }
    revalidatePage('/cap/admin/profile');
    return result;
  } catch (e: any) {
    console.log(e);
  }
  result = {
    status: false,
    data: [{ path: ["form"], message: "Error: Unknown Error" }],
  };
  return result;
}
/**
 *
 * @param searchString partial string for executive name
 * @returns
 */
export async function getExecutive(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getExecutiveList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

function inviteUser(data: executiveSchemaT) {
  return true;
}

async function getCrmUserId(user: string) {
  try {
    const session = await getSession();
    if (session) {
      const result = await getBizAppUserList(
        session.user.dbInfo.id,
        user,
        true,
        true,
        false,
        false
      );
      if (result.length > 0) {
        return result[0].id;
      }
    }
  } catch (e) {
    console.log(e);
  }
  return 0;
}

export async function getExecutiveById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const executiveDetails = await getExecutiveDetailsById(session.user.dbInfo.dbName, id);
      if (executiveDetails.length > 0 && executiveDetails[0].crm_user_id) {
        const crm_user = await getUserDetailsById(executiveDetails[0].crm_user_id);
        if (crm_user) {
          executiveDetails[0].crm_user = crm_user.name;
        }
      }
      const docData = await getExecutiveDocs(id);
      if (executiveDetails.length > 0 && docData.length > 0) {
        executiveDetails[0].docData = docData;
      } else {
        executiveDetails[0].docData = [];
      }
      return executiveDetails;
    }
  } catch (error) {
    throw error;
  }
}

export async function getProfileById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const executiveDetails = await getProfileDetailsById(session.user.dbInfo.dbName, id);
      if (executiveDetails.length > 0 && executiveDetails[0].crm_user_id) {
        const crm_user = await getUserDetailsById(executiveDetails[0].crm_user_id);
        if (crm_user) {
          executiveDetails[0].crm_user = crm_user.name;
        }
      }
      const docData = await getExecutiveDocs(id);
      if (executiveDetails.length > 0 && docData.length > 0) {
        executiveDetails[0].docData = docData;
      } else {
        executiveDetails[0].docData = [];
      }
      return executiveDetails;
    }
  } catch (error) {
    throw error;
  }
}

export async function insertUserIdInExecutive(
  crmDb: string,
  executiveId: number,
  userId: number
) {
  try {
    const session = await getSession();
    if (session) {
      return insertUserIdInExecutiveDb(crmDb, executiveId, userId);
    }
  } catch (error) {
    throw error;
  }
}

export async function delExecutiveById(id: number) {
  let errorResult = { status: false, error: {} };
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const check = await checkIfUsed(session.user.dbInfo.dbName, id);
      if (check[0].count > 0) {
        return "Can't Be DELETED!";
      } else {
        const mappedUser = await getExecutiveById(id);
        if (mappedUser.length > 0 && mappedUser[0].crm_user_id) {
          await mapUser(false, mappedUser[0].crm_user_id, 0, session.user.dbInfo.id);
        }
        const result = await delExecutiveDetailsById(
          session.user.dbInfo.dbName,
          id
        );
        return "Record Deleted";
      }
      // if ((result.affectedRows = 1)) {
      //   errorResult = { status: true, error: {} };
      // } else if ((result .affectedRows = 0)) {
      //   errorResult = {
      //     ...errorResult,
      //     error: "Record Not Found",
      //   };
      // }
    }
  } catch (error: any) {
    throw error;
    errorResult = { status: false, error: error };
  }
  return errorResult;
}

export async function getExecutiveByPage(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getExecutive = {
    status: false,
    data: {} as mdl.executiveSchemaT,
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession) {
      const conts = await getExecutiveByPageDb(
        appSession.user.dbInfo.dbName as string,
        page as number,
        filter,
        limit as number
      );
      const rowCount = await getExecutiveCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getExecutive = {
        status: true,
        data: conts.map(bigIntToNum) as mdl.executiveSchemaT,
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {
    console.log(e);

    let err = "Executive Admin, E-Code:369";

    getExecutive = {
      ...getExecutive,
      status: false,
      data: {} as mdl.executiveSchemaT,
      error: err,
    };
  }
  return getExecutive;
}

export async function getExecutiveProfileImageByCrmUserId(crmUserId: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const profileImg = await getExecutiveProfileImageByCrmUserIdList(
        session.user.dbInfo.dbName,
        crmUserId
      );
      return profileImg[0]?.profileImg;
    }
    return null;
  } catch (error) {
    throw error;
  }
}

export async function getExecutiveColumns() {
  try {
    const session = await getSession();
    console.log("session", session);
    if (session) {
      const result = await getExecutiveColumnsDb(session.user.dbInfo.dbName as string);
      return result;
    }
  } catch (e) {
    logger.error(e);
  }
}

export async function addDocument(data: mdl.docDescriptionSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.docDescriptionSchema.safeParse(data);
      if (parsed.success) {
        result = await addDocumentDB(
          session.user.dbInfo.dbName,
          data as mdl.docDescriptionSchemaT
        );
      }
    }
    return result;
  } catch (e: any) {
    console.log(e);
  }
  return result;
}

export async function getExecutiveDocs(executiveId: number) {
  try {
    const session = await getSession();
    if (session) {
      const result = await getExecutiveDocsDB(session.user.dbInfo.dbName, executiveId);
      return result;
    }
  } catch (error) {
    logger.error(error);
  }
}

export async function updateExecutiveDoc(description: string, id: number) {
  try {
    const session = await getSession();
    if (session) {
      await updateExecutiveDocDB(session.user.dbInfo.dbName, description, id);
    }
  } catch (error) {
    logger.error(error);
  }
}

export async function deleteExecutiveDoc(id : number, doc_id : string) {
  try {
    const session = await getSession();
    if (session) {
      const body = {
        "app_id": "9334f8d1-1b69-476f-b143-2b5b048cc458",
        "doc_id": doc_id
      }

      const result = await axios.delete("http://192.168.1.200:3000/deleteDoc", {
        data: body, // body data should go inside the `data` field
        headers: {
          "client_id": "fd85c348-8d54-4e20-b75e-c085d507a8ab",
          "access_key": "5616e450142cb9214437e6a7d0f1eb944ca733b02883226a876e43b597f64011"
        }
      });
      await deleteExecutiveDocDB(session.user.dbInfo.dbName, id);
      // api to delete doc

    }
  } catch (error) {
    logger.error(error);
  }
}


export async function viewExecutiveDoc(documentId: string) {
  try {
    const session = await getSession();
    if (session) {
      const body = {
        "app_id": "9334f8d1-1b69-476f-b143-2b5b048cc458",
        "doc_id": documentId
      }

      const result = await axios.post("http://192.168.1.200:3000/getDoc", body, {
        headers: {
          "client_id": "fd85c348-8d54-4e20-b75e-c085d507a8ab",
          "access_key": "5616e450142cb9214437e6a7d0f1eb944ca733b02883226a876e43b597f64011"
        },
      });
      let base64Data = Buffer.from(result.data.data.doc_buffer.data, "binary").toString("base64");
      return { buffer: base64Data, contentType: result.data.data.doc_type, fileName: result.data.data.doc_title };

    }
  } catch (error) {
    logger.error(error);
  }
}
"use server";
import { enquiryConfigSchemaT } from "../models/models";
import { getSession } from "../services/session.service";
import {
  getEnquirySupportConfigDB,
  updateEnquirySupportConfigDB,
} from "../services/enquirySupportConfig.service";
import { enquirySupportConfig } from "../zodschema/zodschema";
import { SqlError } from "mariadb";
import { logger } from "@/app/utils/logger.utils";

// export async function updateEnquirySupportConfig(data: enquiryConfigSchemaT) {
//   console.log("data : ",data);
//   let result;

//   try {
//     const session = await getSession();

//     if (session) {

//       const parsed = enquirySupportConfig.safeParse(data);

//       if (parsed.success) {

//         const dbResult = await updateEnquirySupportConfigDB(session, data);
//         // console.log('sdsdsds', dbResult.length);
//         if (dbResult.length > 0) {
//           result = { status: true, data: dbResult[1] };
//         } else {
//           let errorState: { path: (string | number)[]; message: string }[] = [];
//           dbResult[0].forEach((error: any) => {
//             errorState.push({
//               path: [error.error_path],
//               message: error.error_text,
//             });
//           });
//           result = {
//             status: false,
//             data: errorState,
//           };
//         }
//       } else {
//         let errorState: { path: (string | number)[]; message: string }[] = [];
//         for (const issue of parsed.error.issues) {
//           errorState.push({ path: issue.path, message: issue.message });
//         }
//         result = { status: false, data: errorState };
//         return result;
//       }
//     } else {
//       result = {
//         status: false,
//         data: [{ path: ["form"], message: "Error: Server Error" }],
//       };
//     }

//     return result;
//   } catch (e: any) {
//     console.log(e);

//     if (e instanceof SqlError && e.code === "ER_DUP_ENTRY") {
//       result = {
//         status: false,
//         data: [{ path: ["name"], message: "Error: Value already exists" }],
//       };
//       return result;
//     }
//   }

//   result = {
//     status: false,
//     data: [{ path: ["form"], message: "Error: Unknown Error" }],
//   };

//   return result;
// }

export async function updateEnquirySupportConfig(data: enquiryConfigSchemaT) {
  console.log("data : ", data);
  let result;

  try {
    const session = await getSession();

    if (session) {
      const parsed = enquirySupportConfig.safeParse(data);

      if (parsed.success) {
        const entries = [];

        if (data.enquiryReqd) {
          const enquiryEntry = {
            category: "enquiry",
            isEnabled: true,
            ...(data.enquiryCloseCall && { CloseCall: data.enquiryCloseCall }),
            ...(data.enquiryMaintainItems && {
              MaintainItems: data.enquiryMaintainItems,
            }),
            ...(data.enquirySaveFAQ && { SaveFAQ: data.enquirySaveFAQ }),
            ...(data.enquiryMaintainAction && {
              MaintainAction: data.enquiryMaintainAction,
            }),
            ...(data.enquiryVoucherNumber && {
              VoucherNumber: data.enquiryVoucherNumber,
            }),
            ...(data.enquiryPrefix && { prefix: data.enquiryPrefix }), 
            ...(data.enquirySuffix && { suffix: data.enquirySuffix }), 
            ...(data.enquiryLength && { length: data.enquiryLength }), 
            ...(data.enquiryPrefillWithZero !== undefined && { prefillWithZero: data.enquiryPrefillWithZero }), 
          };
          entries.push(enquiryEntry);
        }

        if (data.supportReqd) {
          const supportEntry = {
            category: "support",
            isEnabled: true,
            ...(data.supportCloseCall && { CloseCall: data.supportCloseCall }),
            ...(data.supportMaintainItems && {
              MaintainItems: data.supportMaintainItems,
            }),
            ...(data.supportSaveFAQ && { SaveFAQ: data.supportSaveFAQ }),
            ...(data.supportMaintainAction && {
              MaintainAction: data.supportMaintainAction,
            }),
            ...(data.supportVoucherNumber && {
              VoucherNumber: data.supportVoucherNumber,
            }),
            ...(data.supportPrefix && { prefix: data.supportPrefix }), 
            ...(data.supportSuffix && { suffix: data.supportSuffix }), 
            ...(data.supportLength && { length: data.supportLength }), 
            ...(data.supportPrefillWithZero !== undefined && { prefillWithZero: data.supportPrefillWithZero }), 
          };
          entries.push(supportEntry);
        }

        if (data.contractReqd) {
          const contractEntry = {
            category: "contract",
            isEnabled: true,
            ...(data.contractReqdVoucherNumber && {
              VoucherNumber: data.contractReqdVoucherNumber,
            }),
            ...(data.contractReqdPrefix && { prefix: data.contractReqdPrefix }), 
            ...(data.contractReqdSuffix && { suffix: data.contractReqdSuffix }), 
            ...(data.contractReqdLength && { length: data.contractReqdLength }), 
            ...(data.contractReqdPrefillWithZero !== undefined && { prefillWithZero: data.contractReqdPrefillWithZero }),
          };
          entries.push(contractEntry);
        }

        if (data.appReqd) {
          const appEntry = {
            category: "app",
            isEnabled: true,
            ...(data.appReqdVoucherNumber && {
              VoucherNumber: data.appReqdVoucherNumber,
            }), ...(data.appReqdPrefix && { prefix: data.appReqdPrefix }), 
            ...(data.appReqdSuffix && { suffix: data.appReqdSuffix }), 
            ...(data.appReqdLength && { length: data.appReqdLength }), 
            ...(data.appReqdPrefillWithZero !== undefined && { prefillWithZero: data.appReqdPrefillWithZero }),
          };
          entries.push(appEntry);
        }

        if (data.enquiryGenerationReqd) {
          const enquiryGenEntry = {
            category: "enquiryGeneration",
            isEnabled: true,
            ...(data.enquiryGenerationReqdVoucherNumber && {
              VoucherNumber: data.enquiryGenerationReqdVoucherNumber,
            }),
            ...(data.enquiryGenerationReqdPrefix && { prefix: data.enquiryGenerationReqdPrefix }), 
            ...(data.enquiryGenerationReqdSuffix && { suffix: data.enquiryGenerationReqdSuffix }), 
            ...(data.enquiryGenerationReqdLength && { length: data.enquiryGenerationReqdLength }), 
            ...(data.enquiryGenerationReqdPrefillWithZero !== undefined && { prefillWithZero: data.enquiryGenerationReqdPrefillWithZero }), // Include prefillWithZero
      
          };
          entries.push(enquiryGenEntry);
        }

        let results: any = [];
        for (const entry of entries) {
          const result = await updateEnquirySupportConfigDB(session, entry);
          if (result.length > 0) results.push(result[0]);
        }

        // console.log("Result :", results);

        if (entries.length === results.length) {
          result = { status: true, data: results };
        } else {
          result = { status: false, data: " " };
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
        data: [{ path: ["name"], message: "Error: Value already exists" }],
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

export async function loadEnquirySupportConfig(): Promise<enquiryConfigSchemaT | null> {
  try {
    const session = await getSession();

    if (!session?.user?.dbInfo) {
      throw new Error("Session or database info not available");
    }

    const configRes = await getEnquirySupportConfigDB(
      session.user.dbInfo.dbName
    );
    const data: any = {};
    if (configRes !== null) {
      const transformedResult = configRes.map((item: any) => {
        const config = JSON.parse(item.config);
        const configType = item.config_type;

        // console.log("config", typeof config);
        if (Object.keys(config).length !== 0) {
          for (const key in config) {
            if (config.hasOwnProperty(key)) {
              data[`${configType}${key}`] = config[key];
            }
          }
          data[`${configType}Reqd`] = true;
        } else {
          data[`${configType}Reqd`] = false;
        }
      });

      // console.log(data);
    }
    return data;
  } catch (error) {
    console.error("Error loading enquiry support config:", error);
    return null;
  }
}

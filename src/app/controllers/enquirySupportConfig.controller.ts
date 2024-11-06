"use server";
import { enquiryConfigSchemaT } from "../models/models";
import { getSession } from "../services/session.service";
import {
  getEnquirySupportConfigDB,
  updateEnquirySupportConfigDB,
} from "../services/enquirySupportConfig.service";
import { enquirySupportConfig } from "../zodschema/zodschema";
import { SqlError } from "mariadb";

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
            ...(data.enquiryMaintainProducts && {
              MaintainProducts: data.enquiryMaintainProducts,
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
            ...(data.enquiryPrefillWithZero !== undefined && {
              prefillWithZero: data.enquiryPrefillWithZero,
            }),
          };
          entries.push(enquiryEntry);
        } else {
          const enquiryEntry = {
            category: "enquiry",
            isEnabled: false,
          };
          entries.push(enquiryEntry);
        }

        if (data.supportReqd) {
          const supportEntry = {
            category: "support",
            isEnabled: true,
            ...(data.supportCloseCall && { CloseCall: data.supportCloseCall }),
            ...(data.supportMaintainProducts && {
              MaintainProducts: data.supportMaintainProducts,
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
            ...(data.supportPrefillWithZero !== undefined && {
              prefillWithZero: data.supportPrefillWithZero,
            }),
          };
          entries.push(supportEntry);
        } else {
          const supportEntry = {
            category: "support",
            isEnabled: false,
          };
          entries.push(supportEntry);
        }

        if (data.contractReqd) {
          const contractEntry = {
            category: "contract",
            isEnabled: true,
            ...(data.contractVoucherNumber && {
              VoucherNumber: data.contractVoucherNumber,
            }),
            ...(data.contractPrefix && { prefix: data.contractPrefix }),
            ...(data.contractSuffix && { suffix: data.contractSuffix }),
            ...(data.contractLength && { length: data.contractLength }),
            ...(data.contractPrefillWithZero !== undefined && {
              prefillWithZero: data.contractPrefillWithZero,
            }),
          };
          entries.push(contractEntry);
        } else {
          const contractEntry = {
            category: "contract",
            isEnabled: false,
          };
          entries.push(contractEntry);
        }

        if (data.regional_settingReqd) {
          console.log(data);

          const appEntry = {
            category: "regional_setting",
            isEnabled: true,
            ...(data.appVoucherNumber && {
              VoucherNumber: data.appVoucherNumber,
            }),
            country_id: data.country_id,
            state_id: data.state_id,
            dateFormat: data.dateFormat,
            timeFormat: data.timeFormat,
            currencySymbol: data.currencySymbol,
            currencyString: data.currencyString,
            currencySubString: data.currencySubString,
            currencyCharacter: data.currencyCharacter,
            decimalPlaces: data.decimalPlaces,
            ...(data.appPrefix && { prefix: data.appPrefix }),
            ...(data.appSuffix && { suffix: data.appSuffix }),
            ...(data.appLength && { length: data.appLength }),
            ...(data.appPrefillWithZero !== undefined && {
              prefillWithZero: data.appPrefillWithZero,
            }),
          };
          entries.push(appEntry);
        } 
        // else {
        //   const appEntry = {
        //     category: "regional_setting",
        //     isEnabled: false,
        //   };
        //   entries.push(appEntry);
        // }

        if (data.enquiryGenerationReqd) {
          const enquiryGenEntry = {
            category: "enquiryGeneration",
            isEnabled: true,
            ...(data.enquiryGenerationVoucherNumber && {
              VoucherNumber: data.enquiryGenerationVoucherNumber,
            }),
            ...(data.enquiryGenerationPrefix && {
              prefix: data.enquiryGenerationPrefix,
            }),
            ...(data.enquiryGenerationSuffix && {
              suffix: data.enquiryGenerationSuffix,
            }),
            ...(data.enquiryGenerationLength && {
              length: data.enquiryGenerationLength,
            }),
            ...(data.enquiryGenerationPrefillWithZero !== undefined && {
              prefillWithZero: data.enquiryGenerationPrefillWithZero,
            }), // Include prefillWithZero
          };
          entries.push(enquiryGenEntry);
        } else {
          const enquiryGenEntry = {
            category: "enquiryGeneration",
            isEnabled: false,
          };
          entries.push(enquiryGenEntry);
        }

        let results: any = [];
        for (const entry of entries) {
          const result = await updateEnquirySupportConfigDB(
            session,
            entry as enquiryConfigSchemaT
          );
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
        if (item.config) {
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

"use server";
import { configSchemaT, enquiryConfigSchemaT } from "../models/models";
import { getSession } from "../services/session.service";
import {
  getEnquirySupportConfigDB,
  updateEnquirySupportConfigDB,
} from "../services/enquirySupportConfig.service";
import { enquirySupportConfig } from "../zodschema/zodschema";
import { SqlError } from "mariadb";

const convertData1ToData2 = (data1: any): configSchemaT => {
  return {
    enquiryConfig: {
      reqd: data1.enquiryReqd ?? false,
      closeCall: data1.enquiryCloseCall ?? false,
      maintainProducts: data1.enquiryMaintainProducts ?? false,
      saveFAQ: data1.enquirySaveFAQ ?? false,
      maintainAction: data1.enquiryMaintainAction ?? false,
      voucherNumber: data1.enquiryVoucherNumber ?? false,
      prefix: data1.enquiryPrefix ?? undefined,
      suffix: data1.enquirySuffix ?? undefined,
      length: data1.enquiryLength ?? undefined,
      prefillWithZero: data1.enquiryPrefillWithZero?? false,
    },
    supportConfig: {
      reqd: data1.supportReqd ?? false,
      closeCall: data1.supportCloseCall ?? false,
      maintainProducts: data1.supportMaintainProducts ?? false,
      saveFAQ: data1.supportSaveFAQ ?? false,
      maintainAction: data1.supportMaintainAction ?? false,
      voucherNumber: data1.supportVoucherNumber ?? false,
      prefix: data1.supportPrefix ?? undefined,
      suffix: data1.supportSuffix ?? undefined,
      length: data1.supportLength ?? undefined,
      prefillWithZero: data1.supportPrefillWithZero?? false,
    },
    contractConfig: {
      reqd: data1.contractReqd ?? false,
      voucherNumber: data1.contractVoucherNumber ?? false,
      prefix: data1.contractPrefix ?? undefined,
      suffix: data1.contractSuffix ?? undefined,
      length: data1.contractLength ?? undefined, 
      prefillWithZero: data1.contractPrefillWithZero ??false, 
    },
    regionalSettingConfig: {
      reqd: data1.regionalSettingReqd ?? false,
      country_id: 107, 
      state_id: 0, 
      dateFormat: '', 
      timeFormat: '12 Hours', 
      currencySymbol: data1.regionalSettingSymbol?? undefined, 
      currencyString: data1.regionalSettingReqd ?? undefined, 
      currencySubString: data1.regionalSettingReqd ?? undefined, 
      currencyCharacter: data1.regionalSettingcur ?? undefined, 
      decimalPlaces: data1.regionalSetting ?? undefined, 
      voucherNumber: data1.regionalSettingVoucherNumber ?? false,
      prefix: data1.regionalSettingPrefix ?? undefined,
      suffix: data1.regionalSettingSuffix ?? undefined,
      length: data1.regionalSettingLength ?? undefined,
      prefillWithZero: data1.regionalSettingPrefillWithZero ?? false,
    },
    enquiryGenerationConfig: {
      reqd: data1.enquiryGenerationReqd ?? false, 
      voucherNumber: data1.enquiryGenerationVoucherNumber ?? false,
      prefix: data1.enquiryGenerationPrefix ?? undefined,
      suffix: data1.enquiryGenerationSuffix ?? undefined,
      length: data1.enquiryGenerationLength ?? undefined,
      prefillWithZero: data1.enquiryGenerationPrefillWithZero ?? false,
    }
  };
};

export async function updateEnquirySupportConfig(configData: configSchemaT) {
  let result;
  
  try {
    const session = await getSession();
    
    if (session) {
      const data = convertData1ToData2(configData);
      const parsed = enquirySupportConfig.safeParse(data);
      
      if (parsed.success) {
        const entries = [];
        console.log("data : ", data);

        if (data.enquiryConfig?.reqd) {
          const enquiryEntry = {
            category: "enquiry",
            isEnabled: true,
            ...(data.enquiryConfig.closeCall && { CloseCall: data.enquiryConfig.closeCall }),
            ...(data.enquiryConfig.maintainProducts && {
              MaintainProducts: data.enquiryConfig.maintainProducts,
            }),
            ...(data.enquiryConfig.saveFAQ && { SaveFAQ: data.enquiryConfig.saveFAQ }),
            ...(data.enquiryConfig.maintainAction && {
              MaintainAction: data.enquiryConfig.maintainAction,
            }),
            ...(data.enquiryConfig.voucherNumber && {
              VoucherNumber: data.enquiryConfig.voucherNumber,
            }),
            ...(data.enquiryConfig.prefix && { prefix: data.enquiryConfig.prefix }),
            ...(data.enquiryConfig.suffix && { suffix: data.enquiryConfig.suffix }),
            ...(data.enquiryConfig.length && { length: data.enquiryConfig.length }),
            ...(data.enquiryConfig.prefillWithZero !== undefined && {
              prefillWithZero: data.enquiryConfig.prefillWithZero,
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

        if (data.supportConfig?.reqd) {
          const supportEntry = {
            category: "support",
            isEnabled: true,
            ...(data.supportConfig.closeCall && { CloseCall: data.supportConfig.closeCall }),
            ...(data.supportConfig.maintainProducts && {
              MaintainProducts: data.supportConfig.maintainProducts,
            }),
            ...(data.supportConfig.saveFAQ && { SaveFAQ: data.supportConfig.saveFAQ }),
            ...(data.supportConfig.maintainAction && {
              MaintainAction: data.supportConfig.maintainAction,
            }),
            ...(data.supportConfig.voucherNumber && {
              VoucherNumber: data.supportConfig.voucherNumber,
            }),
            ...(data.supportConfig.prefix && { prefix: data.supportConfig.prefix }),
            ...(data.supportConfig.suffix && { suffix: data.supportConfig.suffix }),
            ...(data.supportConfig.length && { length: data.supportConfig.length }),
            ...(data.supportConfig.prefillWithZero !== undefined && {
              prefillWithZero: data.supportConfig.prefillWithZero,
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

        if (data.contractConfig?.reqd) {
          const contractEntry = {
            category: "contract",
            isEnabled: true,
            ...(data.contractConfig.voucherNumber && {
              VoucherNumber: data.contractConfig.voucherNumber,
            }),
            ...(data.contractConfig.prefix && { prefix: data.contractConfig.prefix }),
            ...(data.contractConfig.suffix && { suffix: data.contractConfig.suffix }),
            ...(data.contractConfig.length && { length: data.contractConfig.length }),
            ...(data.contractConfig.prefillWithZero !== undefined && {
              prefillWithZero: data.contractConfig.prefillWithZero,
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

        if (data.regionalSettingConfig?.reqd) {
          console.log(data);

          const appEntry = {
            category: "regional_setting",
            isEnabled: true,
            ...(data.regionalSettingConfig.voucherNumber && {
              VoucherNumber: data.regionalSettingConfig.voucherNumber,
            }),
            country_id: data.regionalSettingConfig.country_id,
            state_id: data.regionalSettingConfig.state_id,
            dateFormat: data.regionalSettingConfig.dateFormat,
            timeFormat: data.regionalSettingConfig.timeFormat,
            currencySymbol: data.regionalSettingConfig.currencySymbol,
            currencyString: data.regionalSettingConfig.currencyString,
            currencySubString: data.regionalSettingConfig.currencySubString,
            currencyCharacter: data.regionalSettingConfig.currencyCharacter,
            decimalPlaces: data.regionalSettingConfig.decimalPlaces,
            ...(data.regionalSettingConfig.prefix && { prefix: data.regionalSettingConfig.prefix }),
            ...(data.regionalSettingConfig.suffix && { suffix: data.regionalSettingConfig.suffix }),
            ...(data.regionalSettingConfig.length && { length: data.regionalSettingConfig.length }),
            ...(data.regionalSettingConfig.prefillWithZero !== undefined && {
              prefillWithZero: data.regionalSettingConfig.prefillWithZero,
            }),
          };
          entries.push(appEntry);
        } 
    
        if (data.enquiryGenerationConfig?.reqd) {
          const enquiryGenEntry = {
            category: "enquiryGeneration",
            isEnabled: true,
            ...(data.enquiryGenerationConfig.voucherNumber && {
              VoucherNumber: data.enquiryGenerationConfig.voucherNumber,
            }),
            ...(data.enquiryGenerationConfig.prefix && {
              prefix: data.enquiryGenerationConfig.prefix,
            }),
            ...(data.enquiryGenerationConfig.suffix && {
              suffix: data.enquiryGenerationConfig.suffix,
            }),
            ...(data.enquiryGenerationConfig.length && {
              length: data.enquiryGenerationConfig.length,
            }),
            ...(data.enquiryGenerationConfig.prefillWithZero !== undefined && {
              prefillWithZero: data.enquiryGenerationConfig.prefillWithZero,
            }), 
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

// export async function loadEnquirySupportConfig(): Promise<enquiryConfigSchemaT | null> {
//   try {
//     const session = await getSession();

//     if (!session?.user?.dbInfo) {
//       throw new Error("Session or database info not available");
//     }

//     const configRes = await getEnquirySupportConfigDB(
//       session.user.dbInfo.dbName
//     );
//     const data: any = {};
//     if (configRes !== null) {
//       const transformedResult = configRes.map((item: any) => {
//         if (item.config) {
//           const config = JSON.parse(item.config);
//           const configType = item.config_type;

//           // console.log("config", typeof config);
//           if (Object.keys(config).length !== 0) {
//             for (const key in config) {
//               if (config.hasOwnProperty(key)) {
//                 data[`${configType}${key}`] = config[key];
//               }
//             }
//             data[`${configType}Reqd`] = true;
//           } else {
//             data[`${configType}Reqd`] = false;
//           }
//         }
//       });

//       // console.log(data);
//     }

//     return data;
//   } catch (error) {
//     console.error("Error loading enquiry support config:", error);
//     return null;
//   }
// }

export async function loadEnquirySupportConfig(): Promise<configSchemaT | null> {
  try {
    const session = await getSession();

    if (!session?.user?.dbInfo) {
      throw new Error("Session or database info not available");
    }

    const configRes = await getEnquirySupportConfigDB(session.user.dbInfo.dbName);
    console.log("CONFIG", configRes);
    
    const data = {
      enquiryConfig: {
        reqd: false,
        closeCall: false,
        maintainProducts: false,
        saveFAQ: false,
        maintainAction: false,
        voucherNumber: false,
        prefix: undefined,
        suffix: undefined,
        length: undefined,
        prefillWithZero: false,
      },
      supportConfig: {
        reqd: false,
        closeCall: false,
        maintainProducts: false,
        saveFAQ: false,
        maintainAction: false,
        voucherNumber: false,
        prefix: undefined,
        suffix: undefined,
        length: undefined,
        prefillWithZero: false,
      },
      contractConfig: {
        reqd: false,
        voucherNumber: false,
        prefix: undefined,
        suffix: undefined,
        length: undefined,
        prefillWithZero: false,
      },
      regionalSettingConfig: {
        reqd: false,
        country_id: 0,
        state_id: 0,
        dateFormat: undefined,
        timeFormat: undefined,
        currencySymbol: undefined,
        currencyString: undefined,
        currencySubString: undefined,
        currencyCharacter: undefined,
        decimalPlaces: undefined,
      },
      enquiryGenerationConfig: {
        reqd: false,
        voucherNumber: false,
        prefix: undefined,
        suffix: undefined,
        length: undefined,
        prefillWithZero: false,
      },
    };

    if (configRes !== null) {
      const transformedResult = configRes.map((item: any) => {
        if (item.config) {
          const config = JSON.parse(item.config);
          const configType = item.config_type;
          const isEnabled = item.enabled;

          if (Object.keys(config).length !== 0) {
            if (configType === 'enquiry') {
              data.enquiryConfig.reqd = isEnabled?? false;
              data.enquiryConfig.closeCall = config.CloseCall ?? false;
              data.enquiryConfig.maintainProducts = config.MaintainProducts ?? false;
              data.enquiryConfig.saveFAQ = config.SaveFAQ ?? false;
              data.enquiryConfig.maintainAction = config.MaintainAction ?? false;
              data.enquiryConfig.voucherNumber = config.VoucherNumber ?? false;
              data.enquiryConfig.prefix = config.prefix ?? undefined;
              data.enquiryConfig.suffix = config.suffix ?? undefined;
              data.enquiryConfig.length = config.length ?? undefined;
              data.enquiryConfig.prefillWithZero = config.prefillWithZero ?? false;
            }

            if (configType === 'support') {
              data.supportConfig.reqd = isEnabled ?? false;
              data.supportConfig.closeCall = config.CloseCall ?? false;
              data.supportConfig.maintainProducts = config.MaintainProducts ?? false;
              data.supportConfig.saveFAQ = config.SaveFAQ ?? false;
              data.supportConfig.maintainAction = config.MaintainAction ?? false;
              data.supportConfig.voucherNumber = config.VoucherNumber ?? false;
              data.supportConfig.prefix = config.prefix ?? undefined;
              data.supportConfig.suffix = config.suffix ?? undefined;
              data.supportConfig.length = config.length ?? undefined;
              data.supportConfig.prefillWithZero = config.prefillWithZero ?? false;
            }

            if (configType === 'contract') {
              data.contractConfig.reqd = isEnabled?? false;
              data.contractConfig.voucherNumber = config.VoucherNumber ?? false;
              data.contractConfig.prefix = config.prefix ?? undefined;
              data.contractConfig.suffix = config.suffix ?? undefined;
              data.contractConfig.length = config.length ?? undefined;
              data.contractConfig.prefillWithZero = config.prefillWithZero ?? false;
            }

            if (configType === 'enquiryGeneration') {
              data.enquiryGenerationConfig.reqd = isEnabled ?? false;
              data.enquiryGenerationConfig.voucherNumber = config.VoucherNumber ?? false;
              data.enquiryGenerationConfig.prefix = config.prefix ?? undefined;
              data.enquiryGenerationConfig.suffix = config.suffix ?? undefined;
              data.enquiryGenerationConfig.length = config.length ?? undefined;
              data.enquiryGenerationConfig.prefillWithZero = config.prefillWithZero ?? false;
            }

            if (configType === 'regional_setting') {
              data.regionalSettingConfig.reqd = isEnabled ?? false;
              data.regionalSettingConfig.country_id = config.country_id ?? null;
              data.regionalSettingConfig.state_id = config.state_id ?? null;
              data.regionalSettingConfig.dateFormat = config.dateFormat ?? null;
              data.regionalSettingConfig.timeFormat = config.timeFormat ?? null;
              data.regionalSettingConfig.currencySymbol = config.currencySymbol ?? null;
              data.regionalSettingConfig.currencyString = config.currencyString ?? null;
              data.regionalSettingConfig.currencySubString = config.currencySubString ?? null;
              data.regionalSettingConfig.currencyCharacter = config.currencyCharacter ?? null;
              data.regionalSettingConfig.decimalPlaces = config.decimalPlaces ?? null;
            }
          }
        }
      });
console.log("DATATTATAIEU EI", data);

      return data;
    }

    return null;
  } catch (error) {
    console.error("Error loading enquiry support config:", error);
    return null;
  }
}

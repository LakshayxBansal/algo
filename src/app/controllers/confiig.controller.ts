"use server";
import { configSchemaT, enquiryConfigSchemaT } from "../models/models";
import { getConfigDB, updateConfigDB } from "../services/confiig.service";
import { getSession } from "../services/session.service";
import { enquirySupportConfig } from "../zodschema/zodschema";
import { SqlError } from "mariadb";

const convertData = (data1: any): configSchemaT => {  
  return {
    enquiryConfig: {
      reqd: data1.enquiryReqd ?? false,
      closeCall: data1.enquiryCloseCall?? false,
      maintainProducts: data1.enquiryMaintainProducts?? false,
      saveFAQ: data1.enquirySaveFAQ?? false,
      maintainAction: data1.enquiryMaintainAction ?? false,
      voucherNumber: data1.enquiryVoucherNumber ?? false,
      prefix: data1.enquiryPrefix?? "",
      suffix: data1.enquirySuffix?? "",
      length: data1.enquiryLength??"",
      prefillWithZero: data1.enquiryPrefillWithZero??false,
    },
    supportConfig: {
      reqd: data1.supportReqd ?? false,
      closeCall: data1.supportCloseCall ?? false,
      maintainProducts: data1.supportMaintainProducts ?? false,
      saveFAQ: data1.supportSaveFAQ ?? false,
      maintainAction: data1.supportMaintainAction ?? false,
      voucherNumber: data1.supportVoucherNumber ?? false,
      prefix: data1.supportPrefix ?? "",
      suffix: data1.supportSuffix ?? "",
      length: data1.supportLength ?? "",
      prefillWithZero: data1.supportPrefillWithZero?? false,
    },
    contractConfig: {
      reqd: data1.contractReqd ?? false,
      voucherNumber: data1.contractVoucherNumber ?? false,
      prefix: data1.contractPrefix ?? "",
      suffix: data1.contractSuffix ?? "",
      length: data1.contractLength ?? "", 
      prefillWithZero: data1.contractPrefillWithZero ??false, 
    },
    regionalSettingConfig: {
      reqd: data1.regionalSettingReqd ?? false,
      country: data1.country, 
      state: data1.state, 
      country_id: data1.country_id, 
      state_id: data1.state_id, 
      dateFormat: data1.dateFormat, 
      timeFormat: data1.timeFormat, 
      currencySymbol: data1.currencySymbol ?? '', 
      currencyString: data1.currencyString ?? '', 
      currencySubString: data1.currencySubString ?? '', 
      currencyCharacter: data1.currencyCharacter ?? '', 
      decimalPlaces: data1.decimalPlaces ?? '', 
      voucherNumber: data1.regionalSettingVoucherNumber ?? false,
      prefix: data1.regionalSettingPrefix ?? "",
      suffix: data1.regionalSettingSuffix ?? "",
      length: data1.regionalSettingLength ?? "",
      prefillWithZero: data1.regionalSettingPrefillWithZero ?? false,
    },
    enquiryGenerationConfig: {
      reqd: data1.enquiryGenerationReqd ?? false, 
      voucherNumber: data1.enquiryGenerationVoucherNumber ?? false,
      prefix: data1.enquiryGenerationPrefix ?? "",
      suffix: data1.enquiryGenerationSuffix ?? "",
      length: data1.enquiryGenerationLength ?? "",
      prefillWithZero: data1.enquiryGenerationPrefillWithZero ?? false,
    }
  };
};

export async function updateConfigData(configData: configSchemaT) {
  let result;

  try {
    const session = await getSession();
    
    if (session) {
      const data = convertData(configData);
      const parsed = enquirySupportConfig.safeParse(data);
      
      if (parsed.success) {
        const entries = [];

          const enquiryEntry = {
            category: "enquiry",
            isEnabled: data.enquiryConfig?.reqd,
            ...data.enquiryConfig
          };
          entries.push(enquiryEntry);

          const supportEntry = {
            category: "support",
            isEnabled: data.supportConfig?.reqd,
            ...data.supportConfig
          };
          entries.push(supportEntry);
        
          const contractEntry = {
            category: "contract",
            isEnabled: data.contractConfig?.reqd,
            ...data.contractConfig
          };
          entries.push(contractEntry);
          
          const regionalSettingEntry = {
            category: "regionalSetting",
            isEnabled: data.regionalSettingConfig?.reqd,
            ...data.regionalSettingConfig
          };
          entries.push(regionalSettingEntry);

          const enquiryGenEntry = {
            category: "enquiryGeneration",
            isEnabled: data.enquiryGenerationConfig?.reqd,
            ...data.enquiryGenerationConfig
          };
          entries.push(enquiryGenEntry);

        let results: any = [];
        for (const entry of entries) {
          
          const result = await updateConfigDB(
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

export async function fetchConfigData(): Promise<configSchemaT | null> {
  try {
    const session = await getSession();

    if (!session?.user?.dbInfo) {
      throw new Error("Session or database info not available");
    }

    const configRes = await getConfigDB(session.user.dbInfo.dbName);   

    const configMap = configRes.reduce((acc: any, item: any) => {
      const key = `${item.config_type}Config`;  
      acc[key] = JSON.parse(item.config);      
      return acc;
    }, {});
    
    return configMap;

    return null;
  } catch (error) {
    console.error("Error loading enquiry support config:", error);
    return null;
  }
}
"use server";
import { companySchemaT, configSchemaT,  docDescriptionSchemaT,  regionalSettingSchemaT } from "../models/models";
import {
  createCompanyDB,
  getHostId,
  createCompanyAndInfoDb,
  getCompanyDbByIdList,
  deleteCompanyAndDbInfo,
  dropDatabase,
  createTablesAndProc,
  getCompanyDetailsById,
  getCompaniesDb,
  updateCompanyDB,
  dropCompanyDatabase,
  getCompanyCountDB,
} from "../services/company.service";
import {
  getCountryWithCurrencyDb,
  getRegionalSettingDb,
  updateteRegionalSettingDb,
} from "../services/config.service";
import { createConfigDataDB } from "../services/configData.service";
import { getSession } from "../services/session.service";
import { bigIntToNum } from "../utils/db/types";
import { companySchema } from "../zodschema/zodschema";
import { SqlError } from "mariadb";
import { headers } from "next/headers";
import { getCountryIdByName } from "./masters.controller";
import os from "os";
import { getAllRolesDB } from "../services/executiveRole.service";
import { logger } from "../utils/logger.utils";
import { uploadLogo, viewExecutiveDoc } from "./document.controller";


export async function getCompanyById(id: number) {
  try {
    const session = await getSession();
    if (session?.user) {
      const result = await getCompanyDetailsById(id);
      if(result[0]?.docId){
        const docData = await viewExecutiveDoc(result[0]?.docId);
        result[0].docData = {
          ...docData,
          docId: result[0]?.docId,
          file: docData?.buffer,
          description: "Company Logo"
        };
      }
      return result;
    }
  } catch (error) {
    throw error;
  }
}


export async function getCompanyDbById(id: number) {
  try {
    const session = await getSession();
    if (session) {
      const dbInfo = await getCompanyDbByIdList(id);
      return "crmapp".concat(dbInfo[0].dbinfo_id);
    }
  } catch (error) {
    throw error;
  }
}

async function createCompanyDbAndTableProc(
  dbName: string,
  host: string,
  port: number,
  companyId: number,
  dbInfoId: number,
  userData: any
) {
  const dbRes = await createCompanyDB(dbName, host, port);
  if (!dbRes.status) {
    const delComp = await deleteCompanyAndDbInfo(companyId, dbInfoId);
    return dbRes;
  }
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  );
  let email = "",
    mobile = "";
  if (emailRegex.test(userData.contact)) {
    email = userData.contact;
  } else {
    mobile = userData.contact;
  }

  const tableAndProcRes = await createTablesAndProc(
    dbName,
    userData.id,
    userData.name,
    email,
    mobile
  );
  if (!tableAndProcRes.status) {
    const delComp = await deleteCompanyAndDbInfo(companyId, dbInfoId);
    const dropDb = await dropDatabase(dbName);
    return tableAndProcRes;
  }
  return tableAndProcRes;
}

function createAppConfigData(): configSchemaT{
  const enquiryData = {reqd:true, closeCall:true,maintainProducts:false,saveFAQ:false,allowReallocation:true,maintainAction:true,voucher:{voucherNumber:true,prefix:"",suffix:"",length: "6",prefillWithZero:true}};
  const supportData = {reqd:true,closeCall:true,maintainProducts:false,saveFAQ:false,allowReallocation:true,maintainAction:true,voucher:{voucherNumber:true,prefix:"",suffix:"",length: "6",prefillWithZero:true}};
  const contractData = {reqd:false,voucher:{voucherNumber:false,prefix:"",suffix:"",length: "0",prefillWithZero:false}};
  const regionalData = {reqd:true,country_id: 0, country: "", state_id: 0, state: "", decimalPlaces: "Two Digits", timeFormat: "12 Hours", currencyString: "", currencySymbol: "", currencySubString: "", currencyCharacter: "", dateFormat: ""};
  const searchNavbarData = {reqd:true,menu:true,enquiryDescription:true,organisation:true,supportDescription:true,contractDescription:true,product:true};
  const searchContactData = {reqd:true,name:true,alias:true,phone:true,email:true,organisation:true,city:true};
  const searchExecutiveData = {reqd:true,name:true,alias:true,dept:true,role:true,email:true,phone:true};
  const searchOrganisationData = {reqd:true,name:true,alias:true,city:true};
  return {enquiry: enquiryData, support: supportData, contract: contractData, regionalSetting: regionalData, searchNavbar: searchNavbarData, searchContact: searchContactData, searchExecutive: searchExecutiveData, searchOrganisation: searchOrganisationData};
}

export async function createCompany(data: companySchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = companySchema.safeParse(data);

      if (parsed.success) {
        let dbName = "crmapp";
        let hostDetails;

        const hostRes = await getHostId();
        if (hostRes.status) {
          hostDetails = hostRes.data;
        } else {
          return hostRes;
        }
        const userId = session.user.userId;
        const logoId = await uploadLogo(data.docData as docDescriptionSchemaT);
        const companyData = await createCompanyAndInfoDb(hostDetails.id, dbName, data, userId as number);

        if (companyData[0].length === 0) {
          dbName += companyData[2][0].id;
          result = await createCompanyDbAndTableProc(dbName, hostDetails.host, hostDetails.port, companyData[1][0].id, companyData[2][0].id, companyData[4][0]);
          if (!result.status) {
            return result;
          }

          const countryData = await getCountryWithCurrencyDb(dbName, "", data.country_id);
          const configData: configSchemaT = createAppConfigData();
          if (data.country_id !== 0) {
            configData.regionalSetting.country_id = data.country_id ?? 0;
            configData.regionalSetting.country = data.country ?? "";
            configData.regionalSetting.state = data.state ?? "";
            configData.regionalSetting.state_id = data.state_id ?? 0;
            configData.regionalSetting.currencyString = countryData[0].currencyString;
            configData.regionalSetting.currencySymbol = countryData[0].currencySymbol;
            configData.regionalSetting.currencySubString = countryData[0].currencySubString;
            configData.regionalSetting.dateFormat = countryData[0].date_format;
          }

          const configResult = await createConfigDataDB(dbName, configData);

          result = { status: true, data: companyData[1] };
        } else {
          let errorState: { path: (string | number)[]; message: string }[] = [
            { path: ["form"], message: "Error encountered" },
          ];
          companyData[0].forEach((error: any) => {
            errorState.push({path: [error.error_path], message: error.error_text});
          });
          result = {status: false, data: errorState};
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

export async function updateCompany(data: companySchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session?.user) {
      const parsed = companySchema.safeParse(data);
      let dbName = "crmapp";
      if (parsed.success) {
        if(data.docData?.file && !(data.docData?.docId))
        {
            const logoId = await uploadLogo(data.docData as docDescriptionSchemaT);
            if(!logoId)
            {
              throw new Error("Failed to upload Logo")
            }
        }
        const dbResult = await updateCompanyDB(data as companySchemaT);
        if (dbResult[0].length === 0) {
          dbName += dbResult[1][0].dbinfo_id;

          const countryData = await getCountryWithCurrencyDb(dbName, "", data.country_id);

          let regionalDataRes = (await getRegionalSettingDb(dbName))[0];

          const regionalData: regionalSettingSchemaT = JSON.parse(regionalDataRes.config);
          
          if (data.country && data.country_id !== 0) {
            regionalData.country = data.country;
            regionalData.country_id = data.country_id ?? 0;
            regionalData.state = data.state;
            regionalData.state_id = data.state_id ?? 0;
            regionalData.currencyString = countryData[0].currencyString ?? regionalData.currencyString;
            regionalData.currencySymbol = countryData[0].currencySymbol ?? regionalData.currencySymbol;
            regionalData.currencySubString = countryData[0].currencySubString ?? regionalData.currencySubString;
            regionalData.dateFormat = countryData[0].date_format ?? regionalData.dateFormat;
          }

          const regionalResult = await updateteRegionalSettingDb(dbName, regionalData, regionalDataRes.config_type_id);
          result = { status: true, data: dbResult[1] };
        } else {
          let errorState: { path: (string | number)[]; message: string }[] = [];
          dbResult[0].forEach((error: any) => {
            errorState.push({
              path: [error.error_path],
              message: error.error_text,
            });
          });
          result = { status: false, data: errorState };
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

export async function getCompanies(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getCompanies = { status: false, data: [] as companySchemaT[], count: 0, error: {} };
  try {
    const appSession = await getSession();

    if (appSession) {
      const userId = appSession.user.userId;
      const dbData = await getCompaniesDb(
        userId as number,
        page as number,
        filter,
        limit as number
      );
      for(const company of dbData){
        const companyRoles = await getAllRolesDB(company.dbName);
        let role = "You can't access company, action pending from Admin side";
        if(company.roleId && companyRoles.length>0){
          role = companyRoles.filter((role:{id:number,name:string})=>role.id===company.roleId)[0].name;
        }
        company.createdOn = company.createdOn.toDateString();
        company.role = role;
      }
      
      getCompanies = {
        status: true,
        data: dbData.map(bigIntToNum) as companySchemaT[],
        count: Number(dbData[0]["total_count"]),
        error: {},
      };
    }
  } catch (e: any) {
    let err = "Contact Admin, E-Code:369";

    getCompanies = {
      ...getCompanies,
      status: false,
      data: [] as companySchemaT[],
      error: err,
    };
  }
  return getCompanies;
}

export async function getCompanyCount() {
  try{
    const session = await getSession();
    if(session){
      const result = await getCompanyCountDB(session.user.userId);
      return result;
    }
  }catch(error){
    logger.error(error);
  }
}

export async function deleteCompanyById(id: number) {
  try {
    const session = await getSession();
    if (session?.user) {
      const companyDetails = (await getCompanyDetailsById(id))[0];

      if (companyDetails.role_id !== 1) {
        return { status: false, error: "No rights for deletion" };
      }

      const dbName = "crmapp" + companyDetails.dbInfoId;
      const dbRes = await dropCompanyDatabase(
        dbName,
        companyDetails.host,
        companyDetails.port
      );

      if (dbRes.status) {
        const delCompanyAndDbInfoRes = await deleteCompanyAndDbInfo(
          id,
          companyDetails.dbInfoId
        );
        if (delCompanyAndDbInfoRes.status) {
          return { status: true };
        }
      }

      return { error: "Something went wrong", status: false };
    }
  } catch (error) {
    throw error;
  }
}

function findServerIp() {
  let serverIp;
  const networkInterfaces = os.networkInterfaces();

  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    if (interfaces) {
      for (const iface of interfaces) {
        if (iface.family === "IPv4" && !iface.internal) {
          serverIp = iface.address;
          break;
        }
      }
    }
  }
  return serverIp;
}

function isLocalhostIp(ip: string): boolean {
  if (ip.startsWith("127.")) {
    return true;
  }
  if (ip === "::1") {
    return true;
  }

  return false;
}

function compareIpOctets(clientIp: string, serverIp: string): boolean {
  const clientOctets = clientIp.split(".");
  const serverOctets = serverIp.split(".");

  if (clientOctets.length !== 4 || serverOctets.length !== 4) {
    return false;
  } 

  const result =  clientOctets.slice(0, 3).join(".") === serverOctets.slice(0, 3).join(".");

  return result;
}

async function getCountryByAPI(ip: string){
  const url = 'https://api.ipregistry.co/' + ip + '?key=' + process.env.IPREGISTRY_KEY;
  try {
    const fetchedData = await (await fetch(url)).json();
    if (fetchedData.ip) {
      const countryID = await getCountryIdByName(fetchedData.location.country.name);
      return { country: fetchedData.location.country.name, 
        pin: fetchedData.location.postal,
        city: fetchedData.location.city,
        countryId:  countryID[0].id};
    }
  
  }  catch (e) {
    console.error("Error in getCountryByAPI:", e);
  }
  
  return null;
}

export async function getCountryByIp() {
  let data;
  try {
    const requestHeaders = headers();
    const clientIp =
      requestHeaders.get("x-forwarded-for") ||
      requestHeaders.get("remote-address");
    const serverIp = findServerIp();

    //conditions to check weather both client and server using same network or system
    const isLocalhost = isLocalhostIp(clientIp as string);
    const areOctetsMatching = compareIpOctets(clientIp as string, serverIp as string);

    if (isLocalhost || areOctetsMatching) {
      data = await getCountryByAPI("");
    } else {
      data = await getCountryByAPI(clientIp as string);
    }
  } catch (e) {
    data = null;
    console.error("Error in getCountryByIp:", e);
 }
  return data;
}
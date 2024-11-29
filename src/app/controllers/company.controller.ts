"use server";
import {
  companySchemaT,
  dbInfoT,
  regionalSettingSchemaT,
} from "../models/models";
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
} from "../services/company.service";
import {
  createRegionalSettingDb,
  getCountryWithCurrencyDb,
  getRegionalSettingDb,
  updateteRegionalSettingDb,
} from "../services/config.service";
import { getSession } from "../services/session.service";
import { bigIntToNum } from "../utils/db/types";
import { companySchema } from "../zodschema/zodschema";
import { SqlError } from "mariadb";
import { headers } from "next/headers";
import { getCountryIdByName } from "./masters.controller";
import { NextRequest } from "next/server";

export async function getCompanyById(id: number) {
  try {
    const session = await getSession();
    if (session?.user) {
      return getCompanyDetailsById(id);
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

        const companyData = await createCompanyAndInfoDb(
          hostDetails.id,
          dbName,
          data,
          userId as number
        );

        if (companyData[0].length === 0) {
          dbName += companyData[2][0].id;
          result = await createCompanyDbAndTableProc(
            dbName,
            hostDetails.host,
            hostDetails.port,
            companyData[1][0].id,
            companyData[2][0].id,
            companyData[4][0]
          );
          if (!result.status) {
            return result;
          }

          const countryData = await getCountryWithCurrencyDb(
            dbName,
            "",
            data.country_id
          );

          let regionalData: regionalSettingSchemaT = {
            country_id: data.country_id ?? 0,
            country: data.country ?? "",
            state_id: data.state_id ?? 0,
            state: data.state ?? "",
            decimalPlaces: "Two Digits",
            timeFormat: "12 Hours",
            currencyString: "",
            currencySymbol: "",
            currencySubString: "",
            dateFormat: "",
          };

          if (data.country_id !== 0) {
            regionalData.currencyString = countryData[0].currencyString;
            regionalData.currencySymbol = countryData[0].currencySymbol;
            regionalData.currencySubString = countryData[0].currencySubString;
            regionalData.dateFormat = countryData[0].date_format;
          }

          const regionalSettingResult = await createRegionalSettingDb(
            dbName,
            regionalData
          );

          result = { status: true, data: companyData[1] };
        } else {
          let errorState: { path: (string | number)[]; message: string }[] = [
            { path: ["form"], message: "Error encountered" },
          ];
          companyData[0].forEach((error: any) => {
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
        const dbResult = await updateCompanyDB(data as companySchemaT);
        if (dbResult[0].length === 0) {
          dbName += dbResult[1][0].dbinfo_id;

          const countryData = await getCountryWithCurrencyDb(
            dbName,
            "",
            data.country_id
          );

          let regionalDataRes = (await getRegionalSettingDb(dbName))[0];
          let regionalData: regionalSettingSchemaT = {
            country_id: data.country_id ?? 0,
            country: data.country ?? "",
            state_id: data.state_id ?? 0,
            state: data.state ?? "",
            decimalPlaces: "Two Digits",
            timeFormat: "12 Hours",
            currencyString: "",
            currencySymbol: "",
            currencySubString: "",
            dateFormat: "",
          };

          if (data.country_id !== 0) {
            regionalData.currencyString = countryData[0].currencyString;
            regionalData.currencySymbol = countryData[0].currencySymbol;
            regionalData.currencySubString = countryData[0].currencySubString;
            regionalData.dateFormat = countryData[0].date_format;
          }

          const regionalResult = await updateteRegionalSettingDb(
            dbName,
            regionalData,
            regionalDataRes.config_type_id
          );
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
  let getConts = { status: false, data: {} as dbInfoT, count: 0, error: {} };
  try {
    const appSession = await getSession();

    if (appSession) {
      const userId = appSession.user.userId;
      const conts = await getCompaniesDb(
        userId as number,
        page as number,
        filter,
        limit as number
      );

      getConts = {
        status: true,
        data: conts.map(bigIntToNum) as dbInfoT,
        count: Number(conts[0]["total_count"]),
        error: {},
      };
    }
  } catch (e: any) {
    let err = "Contact Admin, E-Code:369";

    getConts = {
      ...getConts,
      status: false,
      data: {} as dbInfoT,
      error: err,
    };
  }
  return getConts;
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
          companyDetails.dbinfo_id
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

export async function getCountryByIp() {
  try {
    console.log("Test Passed");
    
    const requestHeaders = headers();
    // const requestHeaders = req.headers();
    // console.log("HEADERS: ", requestHeaders);
    const ip = requestHeaders.get("x-forwarded-for");
    const fetchedData = await fetch(
      `https://api.ipregistry.co/${ip}?key=ira_LZvLD3Bhm00twdQUfDf64i8ymemjFM0HqXhV`
    );
    const data = await fetchedData.json();
    const country = data.location.country;
    const countryId = await getCountryIdByName(country);
    console.log("Country & CountryID: ", {country, countryId});
    requestHeaders.forEach((key, value)=> console.log(key, "-", value));
    // return {country, countryId};
    // console.log("ip ", ip);
    return ip;
  } catch (e) {
    console.log(e);
  }
}

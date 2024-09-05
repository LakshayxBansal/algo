'use server'
import { companySchemaT, dbInfoT } from "../models/models";
import { createCompanyDB, getHostId, createCompanyAndInfoDb, deleteCompanyAndDbInfo, dropDatabase, createTablesAndProc, getCompanyDetailsById, getCompaniesDb, getCompanyCount, updateCompanyDB } from "../services/company.service";
import { getSession } from "../services/session.service";
import { bigIntToNum } from "../utils/db/types";
import { companySchema } from "../zodschema/zodschema";
import { SqlError } from "mariadb";

export async function getCompanyById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getCompanyDetailsById(id);
    }
  } catch (error) {
    throw error;
  }
}


async function createCompanyDbAndTableProc(dbName: string, host: string, port: number, companyId: number, dbInfoId: number, userCompanyId: number){
  const dbRes = await createCompanyDB(dbName, host, port);
  if(!dbRes.status){
    const delComp = await deleteCompanyAndDbInfo(companyId, dbInfoId, userCompanyId);
    return dbRes;
  }
  
  const tableAndProcRes = await createTablesAndProc(dbName, host, port);  
  if(!tableAndProcRes){
    const delComp = await deleteCompanyAndDbInfo(companyId, dbInfoId, userCompanyId);
    const dropDb = await dropDatabase(dbName);
    return tableAndProcRes;
  }
  return tableAndProcRes
}


export async function createCompany(data: companySchemaT) {
  let result
  try {    
    const session = await getSession();
    if (session) {
      const parsed = companySchema.safeParse(data);      
      
      if (parsed.success) {
        let dbName = "crmapp";

        const hostRes = await getHostId();
        let hostDetails;
        if(hostRes.status){
          hostDetails = hostRes.data;
        }
        else{
          return hostRes;
        }
        const userId = session.user.userId;
        
        const companyData = await createCompanyAndInfoDb(hostDetails.id, dbName, data, userId as number);
        
        if (companyData[0].length === 0) {
          dbName += companyData[2][0].id;
          result = await createCompanyDbAndTableProc(dbName, hostDetails.host, hostDetails.port, companyData[1][0].id, companyData[2][0].id, companyData[3][0].id)
          if(!result.status){
            return result
          }
          
          result = {status: true, data: companyData[1]};
        }
        else {
          let errorState: { path: (string | number)[]; message: string }[] = [{ path: ["form"], message: "Error encountered"}];
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
    if (session) {
      const parsed = companySchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await updateCompanyDB(data as companySchemaT);
        if (dbResult[0].length === 0) {
          result = { status: true, data: dbResult[1] };
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
  let getConts = {
    status: false,
    data: {} as dbInfoT,
    count: 0,
    error: {},
  };
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

      const rowCount = await getCompanyCount(
        userId as number,
        filter
      );
      
      getConts = {
        status: true,
        data: conts.map(bigIntToNum) as dbInfoT,
        count: Number(rowCount[0]["rowCount"]),
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
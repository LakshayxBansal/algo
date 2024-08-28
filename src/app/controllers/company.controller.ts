'use server'
import { companySchemaT } from "../models/models";
import { createCompanyDB, getHostId, createCompanyAndInfoDb, deleteCompanyAndDbInfo, dropDatabase, createTablesAndProc, getCompanyDetailsById } from "../services/company.service";
import { getSession } from "../services/session.service";
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

export async function createCompany(data: companySchemaT, userEmail: string) {
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
        
        const companyData = await createCompanyAndInfoDb(hostDetails.id, dbName, data, userEmail);
        
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
'use server'
import { companySchemaT } from "../models/models";
import { createCompanyDB, assignUserCompany, getHostId, createCompanyAndInfoDb, deleteCompanyAndDbInfo, dropDatabase, createTablesAndProc } from "../services/company.service";
import { getSession } from "../services/session.service";
import { companySchema } from "../zodschema/zodschema";
import { SqlError } from "mariadb";

export async function createCompany(data: companySchemaT, userEmail: string) {
  let result
  try {
    const session = await getSession();
    if (session) {
      const parsed = companySchema.safeParse(data);      
      
      if (parsed.success) {
        let dbName = "crmapp"

        const hostRes = await getHostId();
        let hostDetails
        if(hostRes.status){
          hostDetails = hostRes.data
        }
        else{
          result = hostRes;
          return result
        }
        
        const companyData = (await createCompanyAndInfoDb(hostDetails.id, dbName, data))
        
        if (companyData[0].length === 0) {
          dbName += companyData[2][0].id
          const dbRes = await createCompanyDB(dbName, hostDetails.host, Number(hostDetails.port));
          if(!dbRes.status){
            const delComp = await deleteCompanyAndDbInfo(companyData[1][0].id, companyData[2][0].id)
            result = dbRes
            return result;
          }
          
          const tableAndProcRes = await createTablesAndProc(dbName, hostDetails.host, Number(hostDetails.port))
          if(!tableAndProcRes){
            const delComp = await deleteCompanyAndDbInfo(companyData[1][0].id, companyData[2][0].id)
            const dropDb = await dropDatabase(dbName)
            result = tableAndProcRes
            return result
          }
         
          // create userCompany with user and companyId
          const userCoResult = assignUserCompany(companyData[1][0].id, userEmail);
          
          result = { status: true, data: companyData[1] };
        }
        else {
          let errorState: { path: (string | number)[]; message: string }[] = [];
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

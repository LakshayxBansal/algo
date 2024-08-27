'use server'
import { companySchemaT } from "../models/models";
import { createCompanyDB, assignUserCompany, createTables, createProcedures, getHostId, createCompanyAndInfoDb, deleteCompanyAndDbInfo, dropDatabase } from "../services/company.service";
import { getSession } from "../services/session.service";
import { companySchema } from "../zodschema/zodschema";
import { SqlError } from "mariadb";

// function generateRandomName(compName: string, length: number): string {
//   let companyName = compName?.replace(/\s/g, "");
//   const letters = 'abcdefghijklmnopqrstuvwxyz';
//   let result = '';
//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * letters.length);
//     result += letters[randomIndex];
//   }

//   return companyName + result;
// }

export async function createCompany(data: companySchemaT, userEmail: string) {
  let result
  try {
    const session = await getSession();
    if (session) {
      const parsed = companySchema.safeParse(data);
      
      if (parsed.success) {
        // create dbName
        // let dbName = generateRandomName(data.name, 5)

        // // check if dbName exists in dbInfo table
        // let dbInfoRes = await checkDbInfo(dbName)
        
        // while(dbInfoRes[0].temp > BigInt(0)){
        //   dbName = generateRandomName(data.name, 5)
        //   dbInfoRes = await checkDbInfo(dbName)
        // }
        let dbName = "crmapp"

        const hostDetails = (await getHostId())[0];
        const companyData = (await createCompanyAndInfoDb(hostDetails.id, dbName, data))
        
        if (companyData[0].length === 0) {
          dbName += companyData[2][0].id
          const dbRes = await createCompanyDB(dbName, hostDetails.host, Number(hostDetails.port));
          if(!dbRes){
            const delComp = await deleteCompanyAndDbInfo(companyData[1][0].id, companyData[2][0].id)
            result = {
              status: false,
              data: [{ path: ["form"], message: "Error: Server Error" }],
            };
            return result;
          }
          
          const tableRes = await createTables(dbName, hostDetails.host, Number(hostDetails.port))
          if(!tableRes){
            const delComp = await deleteCompanyAndDbInfo(companyData[1][0].id, companyData[2][0].id)
            const dropDb = await dropDatabase(dbName)
            result = {
              status: false,
              data: [{ path: ["form"], message: "Error: Server Error" }],
            };
            return result
          }
          const proceduresRes = await createProcedures(dbName, hostDetails.host, Number(hostDetails.port))
          if(!proceduresRes){
            const delComp = await deleteCompanyAndDbInfo(companyData[1][0].id, companyData[2][0].id)
            const dropDb = await dropDatabase(dbName)
            result = {
              status: false,
              data: [{ path: ["form"], message: "Error: Server Error" }],
            };
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

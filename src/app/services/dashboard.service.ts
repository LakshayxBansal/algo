'use server'

import excuteQuery from "../utils/db/db";

export async function getOpenEnquiriesDb(dbName: string) {
    try {
      const result = await excuteQuery({
        host: dbName,
        query: "select et.*, em.name as executiveName from enquiry_ledger_tran et left join executive_master em on et.allocated_to=em.id where status_id=1;",
        values: [],
      });
  
      return result;
    } catch (e) {
      console.log(e);
    }
}
export async function getClosedEnquiriesDb(dbName: string) {
    try {
      const result = await excuteQuery({
        host: dbName,
        query: "select * from enquiry_ledger_tran where status_id=2",
        values: [],
      });
  
      return result;
    } catch (e) {
      console.log(e);
    }
}
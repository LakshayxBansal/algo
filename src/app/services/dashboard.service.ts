'use server'

import excuteQuery from "../utils/db/db";

export async function getOpenEnquiriesDb(dbName: string) {
    try {
      const result = await excuteQuery({
        host: dbName,
        query: "select ROW_NUMBER() OVER (order by et.date desc) AS RowID, et.*, em.name as executiveName, es.name as subStatus\
                from enquiry_ledger_tran et left join executive_master em on et.allocated_to=em.id \
                left join enquiry_sub_status_master es on et.sub_status_id=es.id\
                where et.status_id=1;",
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
        query: "select * from enquiry_ledger_tran where status_id=2 order by date desc",
        values: [],
      });
  
      return result;
    } catch (e) {
      console.log(e);
    }
}
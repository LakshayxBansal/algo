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

export async function getOpenEnquiriesCountDb(dbName: string) {
  try {
    const result = await excuteQuery({
      host: dbName,
      query: "select count(*) as total from enquiry_ledger_tran lt where datediff(lt.date, now())=0;",
      values: [],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getEnquiriesOverviewDb(dbName: string) {
    try {
      const result = await excuteQuery({
        host: dbName,
        query: "select em.id as executiveId, count(*) as total, em.name, ROW_NUMBER() OVER () as id,\
 (select count(*) from enquiry_ledger_tran et where DATEDIFF(now(), date) < 7 AND et.allocated_to=executiveId) as since1w,\
 (select count(*) from enquiry_ledger_tran et where DATEDIFF(now(), date) < 14 AND et.allocated_to=executiveId) as since2w,\
 (select count(*) from enquiry_ledger_tran et where DATEDIFF(now(), date) < 21 AND et.allocated_to=executiveId) as since3w\
 from enquiry_ledger_tran et left join executive_master em on em.id=et.allocated_to where et.allocated_to IS NOT null AND et.status_id=1 group by allocated_to;",
        values: [],
      });
  
      return result;
    } catch (e) {
      console.log(e);
    }
}
export async function getUnassignedEnquiriesDb(dbName: string) {
    try {
      const result = await excuteQuery({
        host: dbName,
        query: "SELECT * FROM enquiry_ledger_tran WHERE status_id=1 AND allocated_to IS NULL",
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
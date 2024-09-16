'use server'
import excuteQuery from "../utils/db/db";

export async function getOpenEnquiriesDb(dbName: string) {
    try {
      const result = await excuteQuery({
        host: dbName,
        query: 
                "select ROW_NUMBER() OVER (order by lt.date desc) AS id, ht.created_by, ht.created_on, lt.date,\
                ht.enq_number, cm.name contactName, em.name category, es.name subStatus from enquiry_ledger_tran lt \
                left join enquiry_header_tran ht on lt.enquiry_id=ht.id \
                left join contact_master cm on cm.id=ht.contact_id\
                left join enquiry_category_master em on em.id=ht.category_id\
                left join enquiry_sub_status_master es on lt.sub_status_id=es.id\
                where lt.status_id=1;",
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
        query: "SELECT em.name, ROW_NUMBER() OVER () as id, \
	COUNT(CASE WHEN DATEDIFF(now(), lt.date) < 1 THEN 1 \
              ELSE NULL END) AS currDay, \
    COUNT(CASE WHEN DATEDIFF(now(), lt.date) < 7 THEN 1 \
              ELSE NULL END) AS since1w, \
    COUNT(CASE WHEN DATEDIFF(now(), lt.date) < 14 THEN 1 \
              ELSE NULL END) AS since2w, \
    COUNT(CASE WHEN DATEDIFF(now(), lt.date) < 21 THEN 1 \
              ELSE NULL END) AS since3w \
FROM enquiry_ledger_tran lt left join executive_master em on lt.allocated_to=em.id \
WHERE lt.status_id = 1 AND lt.allocated_to IS NOT NULL GROUP BY em.name;",
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
        query: "select * from enquiry_ledger_tran where status_id=2",
        values: [],
      });
  
      return result;
    } catch (e) {
      console.log(e);
    }
}

export async function getClosedEnquiriesCountDb(dbName: string) {
    try {
      const result = await excuteQuery({
        host: dbName,
        query: "select MAX(modified_on) as since, count(*) as count from enquiry_ledger_tran where status_id=2;",
        values: [],
      });
  
      return result;
    } catch (e) {
      console.log(e);
    }
}

export async function getOverviewGraphDataDb(dbName: string) {
    try {
      const result = await excuteQuery({
        host: dbName,
        query: "call getOverviewGraphData()",
        values: [],
      });
  
      return result;
    } catch (e) {
      console.log(e);
    }
}
export async function getAverageAgeDb(dbName: string) {
    try {
      const result = await excuteQuery({
        host: dbName,
        query: "SELECT ROUND(AVG(DATEDIFF(lt.modified_on, lt.date))) AS age, MAX(modified_on) as since\
                FROM enquiry_ledger_tran lt WHERE\
                lt.status_id = 2 AND lt.date IS NOT NULL\
                AND lt.modified_on IS NOT NULL;",
        values: [],
      });
  
      return result;
    } catch (e) {
      console.log(e);
    }
}
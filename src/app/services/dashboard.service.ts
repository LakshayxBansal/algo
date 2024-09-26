"use server";
import excuteQuery from "../utils/db/db";
import { logger } from "../utils/logger.utils";

export async function getOpenEnquiriesDb(dbName: string) {
  try {
    const result = await excuteQuery({
      host: dbName,
      query:
        "select ROW_NUMBER() OVER (order by lt.date desc) AS id, ht.created_by, ht.created_on, lt.date,\
        ht.enq_number, cm.name contactName, em.name category, es.name subStatus from enquiry_ledger_tran lt\
        left join enquiry_header_tran ht on lt.enquiry_id=ht.id \
        left join contact_master cm on cm.id=ht.contact_id\
        left join enquiry_category_master em on em.id=ht.category_id\
        left join enquiry_sub_status_master es on lt.sub_status_id=es.id\
		where lt.enquiry_id not in (select enquiry_id from enquiry_ledger_tran et left join enquiry_status_master sm on et.status_id=sm.id\
        where sm.name='Closed') group by enquiry_id limit 10;",
      values: [],
    });

    return result;
  } catch (e) {
    logger.error(e);
  }
}

export async function getOpenEnquiriesCountDb(dbName: string) {
  try {
    const result = await excuteQuery({
      host: dbName,
      query:
        "SELECT COUNT(DISTINCT lt.enquiry_id) AS total\
        FROM enquiry_ledger_tran lt WHERE lt.enquiry_id not in\
        (select et.enquiry_id from enquiry_ledger_tran et left join enquiry_status_master sm ON sm.id = et.status_id \
        where sm.name='Closed');",
      values: [],
    });

    return result;
  } catch (e) {
    logger.error(e);
  }
}
export async function getExecutiveEnquiriesOverviewDb(dbName: string) {
  try {
    const result = await excuteQuery({
      host: dbName,
      query: "call getExecutiveEnquiriesData()",
      values: [],
    });

    return result;
  } catch (e) {
    logger.error(e);
  }
}

export async function getUnassignedEnquiriesDb(dbName: string) {
  try {
    const result = await excuteQuery({
      host: dbName,
      query:
        "SELECT COUNT(*) as count FROM enquiry_ledger_tran lt\
				where lt.enquiry_id not in (select enquiry_id from enquiry_ledger_tran et\
        left join enquiry_status_master sm on sm.id=et.status_id\
        WHERE sm.name='Closed') AND lt.allocated_to IS NULL;",
      values: [],
    });

    return result;
  } catch (e) {
    logger.error(e);
  }
}

export async function getClosedEnquiriesCountDb(dbName: string) {
  try {
    const result = await excuteQuery({
      host: dbName,
      query:
        "select DATE_FORMAT(CURDATE() - INTERVAL 5 MONTH, '%Y-%m-01') as since, count(DISTINCT(lt.enquiry_id)) as count from enquiry_ledger_tran lt\
              left join enquiry_status_master sm on sm.id=lt.status_id where sm.name='Closed'\
              AND lt.date >= DATE_FORMAT(CURDATE() - INTERVAL 5 MONTH, '%Y-%m-01');",
      values: [],
    });

    return result;
  } catch (e) {
    logger.error(e);
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
    logger.error(e);
  }
}

export async function getAverageAgeDb(dbName: string) {
  try {
    const result = await excuteQuery({
      host: dbName,
      query:
        "select ROUND(AVG(DATEDIFF(maxDate, minDate))) AS age, DATE_FORMAT(CURDATE() - INTERVAL 5 MONTH, '%Y-%m-01 00:00:00') as since \
	      from (select date as maxDate, (select MIN(date) from enquiry_ledger_tran et where et.enquiry_id = lt.enquiry_id) as minDate\
		    from enquiry_ledger_tran lt left join enquiry_status_master sm on sm.id=lt.status_id \
        WHERE sm.name='Closed' AND lt.date >= DATE_FORMAT(CURDATE() - INTERVAL 5 MONTH, '%Y-%m-01')) as res;",
      values: [],
    });

    return result;
  } catch (e) {
    logger.error(e);
  }
}

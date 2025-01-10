"use server";
import excuteQuery from "../utils/db/db";
import { logger } from "../utils/logger.utils";

export async function getOpenEnquiriesDb(dbName: string) {
  try {
    const result = await excuteQuery({
      host: dbName,
      query:
        "SELECT ROW_NUMBER() over (ORDER BY eht.created_on DESC) AS id, elt.enquiry_id, eht.created_on , cm.name contactName, ecm.name category, essm.name subStatus\
        FROM enquiry_header_tran eht\
        left join enquiry_ledger_tran elt on elt.enquiry_id = eht.id\
        left join contact_master cm on cm.id = eht.contact_id\
        left join enquiry_category_master ecm on ecm.id = eht.category_id\
        left join enquiry_sub_status_master essm on essm.id = elt.sub_status_id\
        group by elt.enquiry_id\
        order by eht.created_on desc limit 10;",
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
        "SELECT COUNT(DISTINCT elt.enquiry_id) AS total\
        FROM enquiry_ledger_tran elt where elt.active=1 and elt.status_id=1\
        ",
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
       "SELECT COUNT(*) AS count FROM enquiry_ledger_tran elt\
       WHERE elt.active=1 AND elt.status_id=1 AND elt.allocated_to=0;"
        ,
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
              "SELECT DATE_FORMAT(CURDATE() - INTERVAL 5 MONTH, '%Y-%m-01') AS since,\
               count(*) AS count from enquiry_header_tran eht\
               LEFT JOIN enquiry_ledger_tran elt ON eht.id = elt.enquiry_id\
               WHERE elt.active=1 AND elt.status_id=2 AND\
               eht.created_on >= CURDATE() - INTERVAL 5 MONTH;",
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
        "SELECT ROUND(AVG(DATEDIFF(\
            CASE \
                WHEN elt.active = 1 AND elt.status_id = 2 THEN elt.date\
                WHEN elt.active = 1 AND elt.status_id = 1 THEN CURDATE()\
            END, \
            eht.created_on))) AS age,\
              DATE_FORMAT(CURDATE() - INTERVAL 5 MONTH, '%Y-%m-01') AS since\
        FROM enquiry_header_tran eht\
        LEFT JOIN enquiry_ledger_tran elt ON eht.id = elt.enquiry_id\
        WHERE elt.active = 1 \
          AND eht.created_on >= CURDATE() - INTERVAL 5 MONTH;",
      values: [],
    });

    return result;
  } catch (e) {
    logger.error(e);
  }
}

export async function getOpenTicketsCountDb(dbName: string) {
  try {
    const result = await excuteQuery({
      host: dbName,
      query:
        "SELECT COUNT(DISTINCT elt.ticket_id) AS total\
        FROM ticket_ledger_tran elt where elt.active=1 and elt.status_id=1;\
        ",
      values: [],
    });

    return result;
  } catch (e) {
    logger.error(e);
  }
}

export async function getClosedTicketsCountDb(dbName: string) {
  try {
    const result = await excuteQuery({
      host: dbName,
      query:
              "SELECT DATE_FORMAT(CURDATE() - INTERVAL 5 MONTH, '%Y-%m-01') AS since,\
               count(*) AS count from ticket_header_tran tht\
               LEFT JOIN ticket_ledger_tran tlt ON tht.id = tlt.ticket_id\
               WHERE tlt.active=1 AND tlt.status_id=2 AND\
               tht.created_on >= CURDATE() - INTERVAL 5 MONTH;",
      values: [],
    });

    return result;
  } catch (e) {
    logger.error(e);
  }
}

export async function getUnassignedTicketsDb(dbName: string) {
  try {
    const result = await excuteQuery({
      host: dbName,
      query:
       "SELECT COUNT(*) AS count FROM ticket_ledger_tran elt\
       WHERE elt.active=1 AND elt.status_id=1 AND elt.allocated_to=0;"
        ,
      values: [],
    });

    return result;
  } catch (e) {
    logger.error(e);
  }
}

export async function getAverageTicketAgeDb(dbName: string) {
  try {
    const result = await excuteQuery({
      host: dbName,
      query:
        "SELECT ROUND(AVG(DATEDIFF(\
            CASE \
                WHEN elt.active = 1 AND elt.status_id = 2 THEN elt.date\
                WHEN elt.active = 1 AND elt.status_id = 1 THEN CURDATE()\
            END, \
            eht.created_on))) AS age,\
              DATE_FORMAT(CURDATE() - INTERVAL 5 MONTH, '%Y-%m-01') AS since\
        FROM ticket_header_tran eht\
        LEFT JOIN ticket_ledger_tran elt ON eht.id = elt.ticket_id\
        WHERE elt.active = 1 \
          AND eht.created_on >= CURDATE() - INTERVAL 5 MONTH;",
      values: [],
    });

    return result;
  } catch (e) {
    logger.error(e);
  }
}

export async function getRecentTicketsDb(dbName: string) {
  try {
    const result = await excuteQuery({
      host: dbName,
      query:
        "SELECT ROW_NUMBER() over (ORDER BY eht.created_on DESC) AS id, eht.created_on ,elt.ticket_id, cm.name contactName, ecm.name category, essm.name subStatus\
        FROM ticket_header_tran eht \
        left join ticket_ledger_tran elt on elt.ticket_id = eht.id\
        left join contact_master cm on cm.id = eht.contact_id\
        left join ticket_category_master ecm on ecm.id = eht.category_id \
        left join ticket_sub_status_master essm on essm.id = elt.sub_status_id\
        group by elt.ticket_id\
        order by eht.created_on desc limit 10;",
      values: [],
    });

    return result;
  } catch (e) {
    logger.error(e);
  }
}


export async function getExecutiveTicketsOverviewDb(dbName: string) {
  try {
    const result = await excuteQuery({
      host: dbName,
      query: "call getExecutiveTicketsData()",
      values: [],
    });

    return result;
  } catch (e) {
    logger.error(e);
  }
}

export async function getOverviewGraphDataTicketsDb(dbName: string) {
  try {
    const result = await excuteQuery({
      host: dbName,
      query: "call getOverviewGraphTicketData()",
      values: [],
    });

    return result;
  } catch (e) {
    logger.error(e);
  }
}

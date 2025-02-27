"use server";
import dayjs from "dayjs";
import excuteQuery from "../utils/db/db";
import { GridSortModel } from "@mui/x-data-grid";

export async function getCallEnquiriesDb(
  crmDb: string,
  filterValueState: any,
  filterType: string,
  selectedStatus: string | null,
  callFilter: string,
  dateFilter: string,
  page: number,
  pageSize: number,
  sortBy: GridSortModel
) {
  try {
    let query: string =
      "select eh.id,eh.enq_number as description , ecm.name callCategory, cm.name contactParty, eh.date, em.name executive,esm.name callStatus,\
                essm.name subStatus,eam.name actionTaken,eaxm.name nextAction, am.name area,  el.next_action_date actionDate, el.modified_on , om.name as organisation\
                from enquiry_header_tran eh \
                left join enquiry_ledger_tran el on el.enquiry_id=eh.id \
                left join contact_master cm on eh.contact_id=cm.id\
                left join organisation_master om on eh.contact_id=cm.id and cm.organisation_id=om.id\
                left join enquiry_category_master ecm on eh.category_id=ecm.id\
                left join enquiry_status_master esm on el.status_id=esm.id\
                left join enquiry_sub_status_master essm on el.sub_status_id=essm.id\
                left join enquiry_action_master eam on el.action_taken_id=eam.id\
                left join enquiry_action_master eaxm on el.next_action_id=eaxm.id\
                left join area_master am on am.id=cm.area_id\
                left join executive_master em on em.id=el.allocated_to\
                where el.id = (SELECT MAX(lt.id) from enquiry_ledger_tran lt\
                where lt.enquiry_id=el.enquiry_id) ";

    const whereConditions: string[] = [];
    let values = [];

    if (filterValueState.callCategory) {
      whereConditions.push(`ecm.name = ?`);
      values.push(filterValueState.callCategory.name);
    }
    
    if (filterValueState.contactParty) {
      whereConditions.push(`cm.name = ?`);
      values.push(filterValueState.contactParty.name);
    }
    if(filterValueState.actionTaken){
      whereConditions.push(`eam.name = ?`);
      values.push(filterValueState.actionTaken.name);
    }
    if (filterValueState.area) {
      whereConditions.push(`am.name = ?`);
      values.push(filterValueState.area.name);
    }
    if (filterValueState.nextAction) {
      whereConditions.push(`eaxm.name = ?`);
      values.push(filterValueState.nextAction.name);
    }
    if (filterType === "allocated") {
      whereConditions.push(`el.allocated_to != 0`);
      if (filterValueState.executive) {
        whereConditions.push(
          `em.name like "%${filterValueState.executive.name}%"`
        );
      }
    } else if (filterType === "unallocated") {
      whereConditions.push(`el.allocated_to = 0`);
    }
    if (filterValueState.subStatus) {
      whereConditions.push(`essm.name = ?`);
      values.push(filterValueState.subStatus.name);
    }
    if (selectedStatus == "Open" && callFilter == "1") {
      whereConditions.push(
        `esm.name = "${selectedStatus}" AND el.allocated_to != 0`
      );
    } else if (selectedStatus == "Open" && callFilter == "2") {
      whereConditions.push(
        `esm.name = "${selectedStatus}" AND el.allocated_to = 0`
      );
    }
    if (selectedStatus == "Closed" && callFilter == "3") {
      whereConditions.push(
        `esm.name = "${selectedStatus}" AND essm.name="Success"`
      );
    } else if (selectedStatus == "Closed" && callFilter == "4") {
      whereConditions.push(
        `esm.name = "${selectedStatus}" AND essm.name="Failure"`
      );
    }
    if (selectedStatus !== "" && callFilter === "0") {
      whereConditions.push(`esm.name = "${selectedStatus}"`);
    }

    if (dateFilter !== "0") {
      const initial = filterValueState.actionDate?.initial
        ? filterValueState.actionDate?.initial
        : null;
      const final = filterValueState.actionDate?.final
        ? filterValueState.actionDate?.final
        : null;
      if (dateFilter === "1") {
        whereConditions.push(`el.next_action_date = CURDATE()`);
      }
      if (dateFilter === "3") {
        whereConditions.push(
          `el.next_action_date BETWEEN '${initial}' AND '${final}'`
        );
      }
    }
    if (filterValueState.date) {
      const initial = filterValueState.date?.initial
        ? filterValueState.date?.initial
        : null;
      const final = filterValueState.date?.final
        ? filterValueState.date?.final
        : new Date().toISOString();
      whereConditions.push(`eh.date BETWEEN '${initial}' AND '${final}'`);
    }
    if (filterValueState.modified_on) {
      const initial = filterValueState.modified_on?.initial
        ? filterValueState.modified_on?.initial
        : null;
      const final = filterValueState.modified_on?.final
        ? filterValueState.modified_on?.final
        : new Date().toISOString();
      whereConditions.push(` el.modified_on BETWEEN '${initial}' AND '${final}'`);
    }

    if (whereConditions.length > 0) {
      query += " AND ";
      query += whereConditions.join(" AND ");
    }
    if (filterValueState.description) {
      query += ` AND eh.enq_number LIKE '%${filterValueState.description}%'`;
    }

     //  sorting logic
     if (sortBy.length > 0) {
     
      const sortClauses = sortBy.map(
        (sort) =>
        {
          const sortingField = sort.field === 'modified_on' ? 'el.modified_on' :sort.field ;
          return `${sortingField} ${sort.sort ? sort.sort.toUpperCase():"ASC"}`
        }
      );
      query += ` ORDER BY ${sortClauses.join(', ')}`;
    }
    else { query += ` ORDER BY callStatus DESC , eh.date  `; }

    const offset = (page-1) * pageSize;
    query += ` LIMIT ? OFFSET ?`;
    values.push(pageSize, offset);

    const result = await excuteQuery({
      host: crmDb,
      query,
      values: values,
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getAllCallEnquiriesDb(
  crmDb: string,
  filterValueState: any,
  filterType: string,
  selectedStatus: string | null,
  callFilter: string,
  dateFilter: string,
  // sortBy: GridSortModel
) {
  try {
    let query: string =
      "select eh.id,eh.enq_number as description , ecm.name callCategory, cm.name contactParty, eh.date, em.name executive,esm.name callStatus,\
                essm.name subStatus,eam.name actionTaken,eaxm.name nextAction, am.name area,  el.next_action_date actionDate, el.modified_on, om.name as organisation\
                from enquiry_header_tran eh \
                left join enquiry_ledger_tran el on el.enquiry_id=eh.id \
                left join contact_master cm on eh.contact_id=cm.id\
                left join organisation_master om on eh.contact_id=cm.id and cm.organisation_id=om.id\
                left join enquiry_category_master ecm on eh.category_id=ecm.id\
                left join enquiry_status_master esm on el.status_id=esm.id\
                left join enquiry_sub_status_master essm on el.sub_status_id=essm.id\
                left join enquiry_action_master eam on el.action_taken_id=eam.id\
                left join enquiry_action_master eaxm on el.next_action_id=eaxm.id\
                left join area_master am on am.id=cm.area_id\
                left join executive_master em on em.id=el.allocated_to\
                where el.id = (SELECT MAX(lt.id) from enquiry_ledger_tran lt\
                where lt.enquiry_id=el.enquiry_id) ";

    const whereConditions: string[] = [];
    let values = [];

    if (filterValueState.callCategory) {
      whereConditions.push(`ecm.name = ?`);
      values.push(filterValueState.callCategory.name);
    }
    if (filterValueState.description) {
      whereConditions.push(`eh.enq_number = ?`);
      values.push(filterValueState.description.name);
    }
    if (filterValueState.contactParty) {
      whereConditions.push(`cm.name = ?`);
      values.push(filterValueState.contactParty.name);
    }
    if(filterValueState.actionTaken){
      whereConditions.push(`eam.name = ?`);
      values.push(filterValueState.actionTaken.name);
    }
    if (filterValueState.area) {
      whereConditions.push(`am.name = ?`);
      values.push(filterValueState.area.name);
    }
    if (filterValueState.nextAction) {
      whereConditions.push(`eaxm.name = ?`);
      values.push(filterValueState.nextAction.name);
    }
    if (filterType === "allocated") {
      whereConditions.push(`el.allocated_to != 0`);
      if (filterValueState.executive) {
        whereConditions.push(
          `em.name like "%${filterValueState.executive.name}%"`
        );
      }
    } else if (filterType === "unallocated") {
      whereConditions.push(`el.allocated_to = 0`);
      
    }
    if (filterValueState.subStatus) {
      whereConditions.push(`essm.name = ?`);
      values.push(filterValueState.subStatus.name);
    }
    if (selectedStatus == "Open" && callFilter == "1") {
      whereConditions.push(
        `esm.name = "${selectedStatus}" AND el.allocated_to != 0`
      );
    } else if (selectedStatus == "Open" && callFilter == "2") {
      whereConditions.push(
        `esm.name = "${selectedStatus}" AND el.allocated_to = 0`
      );
    }
    if (selectedStatus == "Closed" && callFilter == "3") {
      whereConditions.push(
        `esm.name = "${selectedStatus}" AND essm.name="Success"`
      );
    } else if (selectedStatus == "Closed" && callFilter == "4") {
      whereConditions.push(
        `esm.name = "${selectedStatus}" AND essm.name="Failure"`
      );
    }
    if (selectedStatus !== "" && callFilter === "0") {
      whereConditions.push(`esm.name = "${selectedStatus}"`);
    }

    if (dateFilter !== "0") {
      const initial = filterValueState.actionDate?.initial
        ? filterValueState.actionDate?.initial
        : null;
      const final = filterValueState.actionDate?.final
        ? filterValueState.actionDate?.final
        : null;
      if (dateFilter === "1") {
        whereConditions.push(`el.next_action_date = CURDATE()`);
      }
      if (dateFilter === "3") {
        whereConditions.push(
          `el.next_action_date BETWEEN '${initial}' AND '${final}'`
        );
      }
    }
    if (filterValueState.date) {
      const initial = filterValueState.date?.initial
        ? filterValueState.date?.initial
        : null;
      const final = filterValueState.date?.final
        ? filterValueState.date?.final
        : new Date().toISOString();
      whereConditions.push(`eh.date BETWEEN '${initial}' AND '${final}'`);
    }
    if (filterValueState.modified_on) {
      const initial = filterValueState.modified_on?.initial
        ? filterValueState.modified_on?.initial
        : null;
      const final = filterValueState.modified_on?.final
        ? filterValueState.modified_on?.final
        : new Date().toISOString();
      whereConditions.push(` el.modified_on BETWEEN '${initial}' AND '${final}'`);
    }

    if (whereConditions.length > 0) {
      query += " AND ";
      query += whereConditions.join(" AND ");
    }

     //  sorting logic
    //  if (sortBy.length > 0) {
    //   const sortClauses = sortBy.map(
    //     (sort) => `${sort.field} ${sort.sort ? sort.sort.toUpperCase():"ASC"}`
    //   );
    //   query += ` ORDER BY ${sortClauses.join(', ')}`;
    // }


    const result = await excuteQuery({
      host: crmDb,
      query,
      values: values,
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getCallEnquiriesDetailsDb(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query:
        "select el.id as id, el.date, em.name executive, essm.name subStatus,eam.name actionTaken,eaxm.name nextAction, el.next_action_date actionDate,el.status_id,el.closure_remark,el.suggested_action_remark, etm.name as tranType, esm.name as status,el.action_taken_remark\
    from enquiry_ledger_tran el\
    left join enquiry_sub_status_master essm on el.sub_status_id=essm.id\
    left join enquiry_action_master eam on el.action_taken_id=eam.id\
    left join enquiry_action_master eaxm on el.next_action_id=eaxm.id\
    left join executive_master em on em.id=el.allocated_to \
    LEFT JOIN enquiry_tran_type_master etm ON etm.id = el.enquiry_tran_type_id \
    LEFT JOIN enquiry_status_master esm ON esm.id = el.status_id \
    where el.enquiry_id = ?",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getCallEnquiriesCountDb(
  crmDb: string,
  filterValueState: any,
  filterType: string,
  selectedStatus: string | null,
  callFilter: string,
  dateFilter: string
) {
  try {
    let query: string =
      "SELECT COUNT(*) as totalCount \
      FROM enquiry_header_tran eh \
      LEFT JOIN enquiry_ledger_tran el ON el.enquiry_id=eh.id \
      LEFT JOIN contact_master cm ON eh.contact_id=cm.id \
      LEFT JOIN enquiry_category_master ecm ON eh.category_id=ecm.id \
      LEFT JOIN enquiry_status_master esm ON el.status_id=esm.id \
      LEFT JOIN enquiry_sub_status_master essm ON el.sub_status_id=essm.id \
      LEFT JOIN enquiry_action_master eam ON el.action_taken_id=eam.id \
      LEFT JOIN enquiry_action_master eaxm ON el.action_taken_id=eaxm.id \
      LEFT JOIN area_master am ON am.id=cm.area_id \
      LEFT JOIN executive_master em ON em.id=el.allocated_to \
      where el.id = (SELECT MAX(lt.id) from enquiry_ledger_tran lt\
                where lt.enquiry_id=el.enquiry_id)  ";

    const whereConditions: string[] = [];
    let values = [];

    if (filterValueState.callCategory) {
      whereConditions.push(`ecm.name = ?`);
      values.push(filterValueState.callCategory.name);
    }
    if (filterValueState.contactParty) {
      whereConditions.push(`cm.name = ?`);
      values.push(filterValueState.contactParty.name);
    }
    if(filterValueState.actionTaken){
      whereConditions.push(`eam.name = ?`);
      values.push(filterValueState.actionTaken.name);
    }
    if (filterValueState.area) {
      whereConditions.push(`am.name = ?`);
      values.push(filterValueState.area.name);
    }
    if (filterValueState.nextAction) {
      whereConditions.push(`eaxm.name = ?`);
      values.push(filterValueState.nextAction.name);
    }
    if (filterType === "allocated") {
      whereConditions.push(`el.allocated_to != 0`);
      if (filterValueState.executive) {
        whereConditions.push(
          `em.name like "%${filterValueState.executive.name}%"`
        );
      }
    } else if (filterType === "unallocated") {
      whereConditions.push(`el.allocated_to = 0`);
    }
    if (filterValueState.subStatus) {
      whereConditions.push(`essm.name = ?`);
      values.push(filterValueState.subStatus.name);
    }
    if (selectedStatus == "Open" && callFilter == "1") {
      whereConditions.push(
        `esm.name = "${selectedStatus}" AND el.allocated_to != 0`
      );
    } else if (selectedStatus == "Open" && callFilter == "2") {
      whereConditions.push(
        `esm.name = "${selectedStatus}" AND el.allocated_to = 0`
      );
    }
    if (selectedStatus == "Closed" && callFilter == "3") {
      whereConditions.push(
        `esm.name = "${selectedStatus}" AND essm.name="Success"`
      );
    } else if (selectedStatus == "Closed" && callFilter == "4") {
      whereConditions.push(
        `esm.name = "${selectedStatus}" AND essm.name="Failure"`
      );
    }
    if (selectedStatus !== "" && callFilter === "0") {
      whereConditions.push(`esm.name = "${selectedStatus}"`);
    }
    if (dateFilter !== "0") {
      const initial = filterValueState.actionDate?.initial
        ? filterValueState.actionDate?.initial
        : null;
      const final = filterValueState.actionDate?.final
        ? filterValueState.actionDate?.final
        : null;
      if (dateFilter === "1") {
        whereConditions.push(`el.next_action_date = CURDATE()`);
      }
      if (dateFilter === "3") {
        whereConditions.push(
          `el.next_action_date BETWEEN '${initial}' AND '${final}'`
        );
      }
    }
    if (filterValueState.date) {
      const initial = filterValueState.date?.initial
        ? filterValueState.date?.initial
        : null;
      const final = filterValueState.date?.final
        ? filterValueState.date?.final
        : new Date().toISOString();;
      whereConditions.push(`eh.date BETWEEN '${initial}' AND '${final}'`);
    }
    if (filterValueState.modified_on) {
      const initial = filterValueState.modified_on?.initial
        ? filterValueState.modified_on?.initial
        : null;
      const final = filterValueState.modified_on?.final
        ? filterValueState.modified_on?.final
        : new Date().toISOString();
      whereConditions.push(` el.modified_on BETWEEN '${initial}' AND '${final}'`);
    }


    if (whereConditions.length > 0) {
      query += " AND ";
      query += whereConditions.join(" AND ");
    }

    if (filterValueState.description) {
      query += ` AND eh.enq_number LIKE '%${filterValueState.description}%'`;
    }


    const result = await excuteQuery({
      host: crmDb,
      query,
      values: values,
    });

    return result[0].totalCount;
  } catch (e) {
    console.log(e);
  }
}

export async function updateCallAllocationDb(
  dbName: string,
  userid: number,
  data: any
) {
  try {
    // Convert the array of IDs into a comma-delimited string
    const idList = data.id.join(",");
    // Define the stored procedure query
    let query = "CALL updateCallAllocation(?, ?, ?, ?, ?)";
    // Execute the query, passing in the required parameters
    // console.log("data from sp",query);
    const result = await  excuteQuery({
      host: dbName,
      query: query,
      values: [data.executiveId, data.remark, idList, ",", userid],
    });
    return result ;
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function updateSupportCallAllocationDb(
  dbName: string,
  userid: number,
  data: any
) {
  try {
    // Convert the array of IDs into a comma-delimited string
    const idList = data.id.join(",");
    // Define the stored procedure query
    let query = "CALL updateCallAllocationSupport(?, ?, ?, ?, ?)";
    // Execute the query, passing in the required parameters
    // console.log("data from sp",query);
    const res = await  excuteQuery({
      host: dbName,
      query: query,
      values: [data.executiveId, data.remark, idList, ",", userid],
    });

    return res;
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function getCallSupportTicketsDb(
  crmDb: string,
  filterValueState: any,
  filterType: string,
  selectedStatus: string | null,
  callFilter: string,
  dateFilter: string,
  page: number,
  pageSize: number,
  sortBy: GridSortModel
) {
  try {
    let query: string =
      "SELECT th.id, \
       th.tkt_number AS description, \
       tcm.name AS callCategory, \
       cm.name AS contactParty, \
       th.date, \
       em.name AS executive, \
       tsm.name AS callStatus, \
       tssm.name AS subStatus, \
       tam.name AS actionTaken, \
       taxm.name AS nextAction, \
       am.name AS area, \
       tl.next_action_date AS actionDate, \
       ttm.name AS tranType, \
       tl.modified_on, \
       om.name AS organisation \
FROM ticket_header_tran th \
LEFT JOIN ticket_ledger_tran tl ON tl.ticket_id = th.id \
LEFT JOIN contact_master cm ON th.contact_id = cm.id \
LEFT JOIN organisation_master om ON th.contact_id = cm.id AND cm.organisation_id = om.id \
LEFT JOIN ticket_category_master tcm ON th.category_id = tcm.id \
LEFT JOIN ticket_status_master tsm ON tl.status_id = tsm.id \
LEFT JOIN ticket_sub_status_master tssm ON tl.sub_status_id = tssm.id \
LEFT JOIN ticket_action_master tam ON tl.action_taken_id = tam.id \
LEFT JOIN ticket_action_master taxm ON tl.next_action_id = taxm.id \
LEFT JOIN area_master am ON am.id = cm.area_id \
LEFT JOIN executive_master em ON em.id = tl.allocated_to \
LEFT JOIN ticket_tran_type_master ttm ON ttm.id = tl.ticket_tran_type_id \
WHERE tl.id = ( \
    SELECT MAX(lt.id) \
    FROM ticket_ledger_tran lt \
    WHERE lt.ticket_id = tl.ticket_id )";



    const whereConditions: string[] = [];
    let values = [];

    if (filterValueState.callCategory) {
      whereConditions.push(`tcm.name = ?`);
      values.push(filterValueState.callCategory.name);
    }
    
    if (filterValueState.contactParty) {
      whereConditions.push(`cm.name = ?`);
      values.push(filterValueState.contactParty.name);
    }
    if(filterValueState.actionTaken){
      whereConditions.push(`tam.name = ?`);
      values.push(filterValueState.actionTaken.name);
    }
    if (filterValueState.area) {
      whereConditions.push(`am.name = ?`);
      values.push(filterValueState.area.name);
    }
    if (filterValueState.nextAction) {
      whereConditions.push(`taxm.name = ?`);
      values.push(filterValueState.nextAction.name);
    }
    if (filterType === "allocated") {
      whereConditions.push(`tl.allocated_to != 0`);
      if (filterValueState.executive) {
        whereConditions.push(
          `em.name LIKE "%${filterValueState.executive.name}%"`
        );
      }
    } else if (filterType === "unallocated") {
      whereConditions.push(`tl.allocated_to = 0`);
    }
    if (filterValueState.subStatus) {
      whereConditions.push(`tssm.name = ?`);
      values.push(filterValueState.subStatus.name);
    }
    if (selectedStatus == "Open" && callFilter == "1") {
      whereConditions.push(
        `tsm.name = "${selectedStatus}" AND tl.allocated_to != 0`
      );
    } else if (selectedStatus == "Open" && callFilter == "2") {
      whereConditions.push(
        `tsm.name = "${selectedStatus}" AND tl.allocated_to = 0`
      );
    }
    if (selectedStatus == "Closed" && callFilter == "3") {
      whereConditions.push(
        `tsm.name = "${selectedStatus}" AND tssm.name = "Success"`
      );
    } else if (selectedStatus == "Closed" && callFilter == "4") {
      whereConditions.push(
        `tsm.name = "${selectedStatus}" AND tssm.name = "Failure"`
      );
    }
    if (selectedStatus !== "" && callFilter === "0") {
      whereConditions.push(`tsm.name = "${selectedStatus}"`);
    }

    if (dateFilter !== "0") {
      const initial = filterValueState.actionDate?.initial ?? null;
      const final = filterValueState.actionDate?.final ?? null;
      if (dateFilter === "1") {
        whereConditions.push(`tl.next_action_date = CURDATE()`);
      }
      if (dateFilter === "3") {
        whereConditions.push(
          `tl.next_action_date BETWEEN '${initial}' AND '${final}'`
        );
      }
    }
    if (filterValueState.date) {
      const initial = filterValueState.date?.initial ?? null;
      const final = filterValueState.date?.final ?? new Date().toISOString();
      whereConditions.push(`th.date BETWEEN '${initial}' AND '${final}'`);
    }
    if (filterValueState.modified_on) {
      const initial = filterValueState.modified_on?.initial
        ? filterValueState.modified_on?.initial
        : null;
      const final = filterValueState.modified_on?.final
        ? filterValueState.modified_on?.final
        : new Date().toISOString();;
      whereConditions.push(` tl.modified_on BETWEEN '${initial}' AND '${final}'`);
    }


    if (whereConditions.length > 0) {
      query += " AND ";
      query += whereConditions.join(" AND ");
    }

    if (filterValueState.description) {
      query += ` AND th.tkt_number LIKE '%${filterValueState.description}%'`;
    }

     //  sorting logic
     if (sortBy.length > 0) {
      const sortClauses = sortBy.map(
        (sort) =>
        {
          const sortingField = sort.field === 'modified_on' ? 'tl.modified_on' :sort.field ;
          return `${sortingField} ${sort.sort ? sort.sort.toUpperCase():"ASC"}`
        }
      );
      query += ` ORDER BY ${sortClauses.join(', ')}`;
    }
    else { query += ` ORDER BY  callStatus DESC, th.date `; }

    const offset = (page - 1) * pageSize;
    query += ` LIMIT ? OFFSET ?`;
    values.push(pageSize, offset);

    const result = await excuteQuery({
      host: crmDb,
      query,
      values: values,
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getAllCallSupportTicketsDb(
  crmDb: string,
  filterValueState: any,
  filterType: string,
  selectedStatus: string | null,
  callFilter: string,
  dateFilter: string
) {
  try {
    let query: string =
      "SELECT th.id, \
       th.tkt_number AS description, \
       tcm.name AS callCategory, \
       cm.name AS contactParty, \
       th.date, \
       em.name AS executive, \
       tsm.name AS callStatus, \
       tssm.name AS subStatus, \
       tam.name AS actionTaken, \
       taxm.name AS nextAction, \
       am.name AS area, \
       tl.next_action_date AS actionDate, \
       ttm.name AS tranType, \
       tl.modified_on, \
       om.name AS organisation \
FROM ticket_header_tran th \
LEFT JOIN ticket_ledger_tran tl ON tl.ticket_id = th.id \
LEFT JOIN contact_master cm ON th.contact_id = cm.id \
LEFT JOIN organisation_master om ON th.contact_id = cm.id AND cm.organisation_id = om.id \
LEFT JOIN ticket_category_master tcm ON th.category_id = tcm.id \
LEFT JOIN ticket_status_master tsm ON tl.status_id = tsm.id \
LEFT JOIN ticket_sub_status_master tssm ON tl.sub_status_id = tssm.id \
LEFT JOIN ticket_action_master tam ON tl.action_taken_id = tam.id \
LEFT JOIN ticket_action_master taxm ON tl.next_action_id = taxm.id \
LEFT JOIN area_master am ON am.id = cm.area_id \
LEFT JOIN executive_master em ON em.id = tl.allocated_to \
LEFT JOIN ticket_tran_type_master ttm ON ttm.id = tl.ticket_tran_type_id \
WHERE tl.id = ( \
    SELECT MAX(lt.id) \
    FROM ticket_ledger_tran lt \
    WHERE lt.ticket_id = tl.ticket_id )";

    const whereConditions: string[] = [];
    let values = [];

    if (filterValueState.callCategory) {
      whereConditions.push(`tcm.name = ?`);
      values.push(filterValueState.callCategory.name);
    }
    if (filterValueState.contactParty) {
      whereConditions.push(`cm.name = ?`);
      values.push(filterValueState.contactParty.name);
    }
    if(filterValueState.actionTaken){
      whereConditions.push(`tam.name = ?`);
      values.push(filterValueState.actionTaken.name);
    }
    if (filterValueState.area) {
      whereConditions.push(`am.name = ?`);
      values.push(filterValueState.area.name);
    }
    if (filterValueState.nextAction) {
      whereConditions.push(`taxm.name = ?`);
      values.push(filterValueState.nextAction.name);
    }
    if (filterType === "allocated") {
      whereConditions.push(`tl.allocated_to != 0`);
      if (filterValueState.executive) {
        whereConditions.push(
          `em.name LIKE "%${filterValueState.executive.name}%"`
        );
      }
    } else if (filterType === "unallocated") {
      whereConditions.push(`tl.allocated_to = 0`);
    }
    if (filterValueState.subStatus) {
      whereConditions.push(`tssm.name = ?`);
      values.push(filterValueState.subStatus.name);
    }
    if (selectedStatus == "Open" && callFilter == "1") {
      whereConditions.push(
        `tsm.name = "${selectedStatus}" AND tl.allocated_to != 0`
      );
    } else if (selectedStatus == "Open" && callFilter == "2") {
      whereConditions.push(
        `tsm.name = "${selectedStatus}" AND tl.allocated_to = 0`
      );
    }
    if (selectedStatus == "Closed" && callFilter == "3") {
      whereConditions.push(
        `tsm.name = "${selectedStatus}" AND tssm.name = "Success"`
      );
    } else if (selectedStatus == "Closed" && callFilter == "4") {
      whereConditions.push(
        `tsm.name = "${selectedStatus}" AND tssm.name = "Failure"`
      );
    }
    if (selectedStatus !== "" && callFilter === "0") {
      whereConditions.push(`tsm.name = "${selectedStatus}"`);
    }

    if (dateFilter !== "0") {
      const initial = filterValueState.actionDate?.initial ?? null;
      const final = filterValueState.actionDate?.final ?? null;
      if (dateFilter === "1") {
        whereConditions.push(`tl.next_action_date = CURDATE()`);
      }
      if (dateFilter === "3") {
        whereConditions.push(
          `tl.next_action_date BETWEEN '${initial}' AND '${final}'`
        );
      }
    }
    if (filterValueState.date) {
      const initial = filterValueState.date?.initial ?? null;
      const final = filterValueState.date?.final ?? new Date().toISOString();
      whereConditions.push(`th.date BETWEEN '${initial}' AND '${final}'`);
    }
    if (filterValueState.modified_on) {
      const initial = filterValueState.modified_on?.initial
        ? filterValueState.modified_on?.initial
        : null;
      const final = filterValueState.modified_on?.final
        ? filterValueState.modified_on?.final
        : new Date().toISOString();;
      whereConditions.push(` el.modified_on BETWEEN '${initial}' AND '${final}'`);
    }


    if (whereConditions.length > 0) {
      query += " AND ";
      query += whereConditions.join(" AND ");
    }

    const result = await excuteQuery({
      host: crmDb,
      query,
      values: values,
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getCallSupportTicketsCountDb(
  crmDb: string,
  filterValueState: any,
  filterType: string,
  selectedStatus: string | null,
  callFilter: string,
  dateFilter: string
) {
  try {
    let query: string =
      "SELECT COUNT(*) as totalCount \
      FROM ticket_header_tran th \
      LEFT JOIN ticket_ledger_tran tl ON tl.ticket_id = th.id \
      LEFT JOIN contact_master cm ON th.contact_id = cm.id \
      LEFT JOIN ticket_category_master tcm ON th.category_id = tcm.id \
      LEFT JOIN ticket_status_master tsm ON tl.status_id = tsm.id \
      LEFT JOIN ticket_sub_status_master tssm ON tl.sub_status_id = tssm.id \
      LEFT JOIN ticket_action_master tam ON tl.action_taken_id = tam.id \
      LEFT JOIN ticket_action_master taxm ON tl.next_action_id = taxm.id \
      LEFT JOIN area_master am ON am.id = cm.area_id \
      LEFT JOIN executive_master em ON em.id = tl.allocated_to \
     WHERE tl.id = (SELECT MAX(lt.id) \
               FROM ticket_ledger_tran lt \
               WHERE lt.ticket_id = tl.ticket_id)";

    const whereConditions: string[] = [];
    let values = [];

    if (filterValueState.callCategory) {
      whereConditions.push(`tcm.name = ?`);
      values.push(filterValueState.callCategory.name);
    }
    if (filterValueState.contactParty) {
      whereConditions.push(`cm.name = ?`);
      values.push(filterValueState.contactParty.name);
    }
    if(filterValueState.actionTaken){
      whereConditions.push(`tam.name = ?`);
      values.push(filterValueState.actionTaken.name);
    }
    if (filterValueState.area) {
      whereConditions.push(`am.name = ?`);
      values.push(filterValueState.area.name);
    }
    if (filterValueState.nextAction) {
      whereConditions.push(`taxm.name = ?`);
      values.push(filterValueState.nextAction.name);
    }
    if (filterType === "allocated") {
      whereConditions.push(`tl.allocated_to != 0`);
      if (filterValueState.executive) {
        whereConditions.push(
          `em.name LIKE "%${filterValueState.executive.name}%"`
        );
      }
    } else if (filterType === "unallocated") {
      whereConditions.push(`tl.allocated_to = 0`);
    }
    if (filterValueState.subStatus) {
      whereConditions.push(`tssm.name = ?`);
      values.push(filterValueState.subStatus.name);
    }
    if (selectedStatus == "Open" && callFilter == "1") {
      whereConditions.push(
        `tsm.name = "${selectedStatus}" AND tl.allocated_to != 0`
      );
    } else if (selectedStatus == "Open" && callFilter == "2") {
      whereConditions.push(
        `tsm.name = "${selectedStatus}" AND tl.allocated_to = 0`
      );
    }
    if (selectedStatus == "Closed" && callFilter == "3") {
      whereConditions.push(
        `tsm.name = "${selectedStatus}" AND tssm.name = "Success"`
      );
    } else if (selectedStatus == "Closed" && callFilter == "4") {
      whereConditions.push(
        `tsm.name = "${selectedStatus}" AND tssm.name = "Failure"`
      );
    }
    if (selectedStatus !== "" && callFilter === "0") {
      whereConditions.push(`tsm.name = "${selectedStatus}"`);
    }
    if (dateFilter !== "0") {
      const initial = filterValueState.actionDate?.initial ?? null;
      const final = filterValueState.actionDate?.final ?? null;
      if (dateFilter === "1") {
        whereConditions.push(`tl.next_action_date = CURDATE()`);
      }
      if (dateFilter === "3") {
        whereConditions.push(
          `tl.next_action_date BETWEEN '${initial}' AND '${final}'`
        );
      }
    }
    if (filterValueState.date) {
      const initial = filterValueState.date?.initial ?? null;
      const final = filterValueState.date?.final ?? new Date().toISOString();
      whereConditions.push(`th.date BETWEEN '${initial}' AND '${final}'`);
    }

     if (filterValueState.modified_on) {
      const initial = filterValueState.modified_on?.initial
        ? filterValueState.modified_on?.initial
        : null;
      const final = filterValueState.modified_on?.final
        ? filterValueState.modified_on?.final
        : new Date().toISOString();
      whereConditions.push(` el.modified_on BETWEEN '${initial}' AND '${final}'`);
    }


    if (whereConditions.length > 0) {
      query += " AND ";
      query += whereConditions.join(" AND ");
    }

    if (filterValueState.description) {
      query += ` AND th.tkt_number LIKE '%${filterValueState.description}%'`;
    }

    const result = await excuteQuery({
      host: crmDb,
      query,
      values: values,
    });

    return result[0].totalCount;
  } catch (e) {
    console.log(e);
  }
}


export async function getCallSupportDetailsDb(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: `
        SELECT 
          tl.id AS id, \
          tl.date, \
          em.name AS executive, \
          tssm.name AS subStatus, \
          tam.name AS actionTaken, \
          taxm.name AS nextAction, \
          tl.next_action_date AS actionDate, \
          tl.status_id, \
          tl.closure_remark, \
          tl.suggested_action_remark ,\
          tsm.name AS status, \
          tl.action_taken_remark, \
          ttm.name AS tranType \
        FROM ticket_ledger_tran tl \
        LEFT JOIN ticket_sub_status_master tssm ON tl.sub_status_id = tssm.id \
        LEFT JOIN ticket_action_master tam ON tl.action_taken_id = tam.id \
        LEFT JOIN ticket_action_master taxm ON tl.next_action_id = taxm.id \
        LEFT JOIN executive_master em ON em.id = tl.allocated_to \
        LEFT JOIN ticket_status_master tsm ON tsm.id = tl.status_id \
        LEFT JOIN ticket_tran_type_master ttm ON ttm.id = tl.ticket_tran_type_id \
        WHERE tl.ticket_id = ? \
      `,
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getUserPreferenceDb(
  crmDb: string,
  userId: number,
  objectId:number
) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: `select * from grid_metaData where user_id=? and object_type_id=?`,
      values: [userId,objectId],
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function updateUserPreferenceDb(
  crmDb: string,
  userId: number,
  objectId:number,
  metaData: string
) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: `update grid_metaData set meta_data=? where user_id=? and object_type_id=?`,
      values: [metaData, userId,objectId],
    });
    return result[0];
  } catch (e) {
    console.log(e);
  }
}

export async function insertUserPreferenceDb(
  crmDb: string,
  userId: number,
  objectId:number,
  metaData: string
) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: `
        INSERT INTO grid_metaData (user_id, meta_data,object_type_id) 
        VALUES (?, ?,?)
      `,
      values: [userId, metaData,objectId],
    });
    return result[0];
  } catch (e) {
    console.log(e);
  }
}


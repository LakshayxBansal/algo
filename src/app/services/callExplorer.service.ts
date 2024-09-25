"use server";
import excuteQuery from "../utils/db/db";

export async function getCallEnquiriesDb(
  crmDb: string,
  filterValueState: any,
  filterType: string,
  selectedStatus: string | null,
  callFilter: string,
  dateFilter: string,
  page: number,
  pageSize: number
) {
  try {
    let query: string =
      "select eh.id, ecm.name callCategory, cm.name contactParty, eh.date, em.name executive,esm.name callStatus,\
                essm.name subStatus,eam.name actionTaken,eaxm.name nextAction, am.name area,  el.next_action_date actionDate\
                from enquiry_header_tran eh \
                left join enquiry_ledger_tran el on el.enquiry_id=eh.id \
                left join contact_master cm on eh.contact_id=cm.id\
                left join enquiry_category_master ecm on eh.category_id=ecm.id\
                left join enquiry_status_master esm on el.status_id=esm.id\
                left join enquiry_sub_status_master essm on el.sub_status_id=essm.id\
                left join enquiry_action_master eam on el.action_taken_id=eam.id\
                left join enquiry_action_master eaxm on el.action_taken_id=eaxm.id\
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
    if (filterValueState.area) {
      whereConditions.push(`am.name = ?`);
      values.push(filterValueState.area.name);
    }
    if (filterValueState.nextAction) {
      whereConditions.push(`eaxm.name = ?`);
      values.push(filterValueState.nextAction.name);
    }
    if (filterType === "allocated") {
      whereConditions.push(`el.allocated_to is not null`);
      if (filterValueState.executive) {
        whereConditions.push(
          `em.name like "%${filterValueState.executive.name}%"`
        );
      }
    } else if (filterType === "unallocated") {
      whereConditions.push(`el.allocated_to is null`);
    }
    if (filterValueState.subStatus) {
      whereConditions.push(`essm.name = ?`);
      values.push(filterValueState.subStatus.name);
    }
    if (selectedStatus == "Open" && callFilter == "1") {
      whereConditions.push(
        `esm.name = "${selectedStatus}" AND el.allocated_to is not null`
      );
    } else if (selectedStatus == "Open" && callFilter == "2") {
      whereConditions.push(
        `esm.name = "${selectedStatus}" AND el.allocated_to is null`
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
        : null;
      whereConditions.push(`eh.date BETWEEN '${initial}' AND '${final}'`);
    }

    if (whereConditions.length > 0) {
      query += " AND ";
      query += whereConditions.join(" AND ");
    }
    console.log("query", query);

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

export async function getCallEnquiriesDetailsDb(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query:
        "select el.id as id, el.date, em.name executive, essm.name subStatus,eam.name actionTaken,eaxm.name nextAction, el.next_action_date actionDate\
    from enquiry_ledger_tran el\
    left join enquiry_sub_status_master essm on el.sub_status_id=essm.id\
    left join enquiry_action_master eam on el.action_taken_id=eam.id\
    left join enquiry_action_master eaxm on el.action_taken_id=eaxm.id\
    left join executive_master em on em.id=el.allocated_to\
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
      LEFT JOIN executive_master em ON em.id=el.allocated_to where el.date = (SELECT MAX(lt.date) from enquiry_ledger_tran lt\
      where lt.enquiry_id=el.enquiry_id) ";

    const whereConditions: string[] = [];
    let values = [];

    if (filterValueState.callCategory) {
      whereConditions.push(`ecm.name = ?`);
      values.push(filterValueState.callCategory.name);
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
      whereConditions.push(`el.allocated_to is not null`);
      if (filterValueState.executive) {
        whereConditions.push(
          `em.name like "%${filterValueState.executive.name}%"`
        );
      }
    } else if (filterType === "unallocated") {
      whereConditions.push(`el.allocated_to is null`);
    }
    if (filterValueState.subStatus) {
      whereConditions.push(`essm.name = ?`);
      values.push(filterValueState.subStatus.name);
    }
    if (selectedStatus == "Open" && callFilter == "1") {
      whereConditions.push(
        `esm.name = "${selectedStatus}" AND el.allocated_to is not null`
      );
    } else if (selectedStatus == "Open" && callFilter == "2") {
      whereConditions.push(
        `esm.name = "${selectedStatus}" AND el.allocated_to is null`
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
      const initial = filterValueState.date?.initial
        ? new Date(filterValueState.date?.initial).toLocaleDateString("en-CA")
        : null;
      const final = filterValueState.date?.final
        ? new Date(filterValueState.date?.final).toLocaleDateString("en-CA")
        : null;
      if (dateFilter === "1") {
        whereConditions.push(`DATE(el.next_action_date) = CURDATE()`);
      }
      if (dateFilter === "2") {
        whereConditions.push(
          `DATE(el.next_action_date) BETWEEN '${initial}' AND '${final}'`
        );
      }
    }

    if (whereConditions.length > 0) {
      query += whereConditions.join(" AND ");
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

// export async function updateCallAllocationDb(dbName: string, data: any) {
//   try {
//     let query =
//       "update enquiry_ledger_tran set allocated_to=? AND suggested_action_remark=?\
//       where id in (";
//     for (let i = 0; i < data.id.length - 1; i++) {
//       query += "?, ";
//     }
//     query += "?);";
//     console.log(query);
//     console.log(...data.id);

//     return excuteQuery({
//       host: dbName,
//       query: query,
//       values: [data.executiveId, data.remark, ...data.id],
//     });
//   } catch (e) {
//     console.log(e);
//   }
//   return null;
// }
export async function updateCallAllocationDb(dbName: string, data: any) {
  try {
    // Convert the array of IDs into a comma-delimited string
    const idList = data.id.join(",");

    // Define the stored procedure query
    let query = "CALL updateCallAllocation(?, ?, ?, ?)";

    // Execute the query, passing in the required parameters
    return excuteQuery({
      host: dbName,
      query: query,
      values: [data.executiveId, data.remark, idList, ","],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

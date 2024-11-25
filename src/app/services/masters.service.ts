"use server";

import excuteQuery from "../utils/db/db";
import * as zm from "../models/models";
import { Session } from "next-auth";

/**
 *
 * @param crmDb
 * @param searchString - partial string for country
 * @returns
 */
export async function getCountryList(crmDb: string, searchString: string) {
  try {
    let query = "select id as id, name as name from country_master";
    let values: any[] = [];

    if (searchString !== "") {
      query = query + " where name like '%" + searchString + "%'";
      values = [];
    }
    const result = await excuteQuery({
      host: crmDb,
      query: query,
      values: values,
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getCountryByIDList(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query:
        "select id as id, name as name, alias as alias, stamp as stamp from country_master cm where cm.id=?;",
      values: [id],
    });

    return result;
  } catch (error) {
    console.log(error);
  }
}

/**
 *
 * @param crmDb
 * @param searchString - partial string for country
 * @returns
 */
export async function getStateList(
  crmDb: string,
  searchState: string,
  country: string
) {
  try {
    let query =
      "select s.id as id, s.name as name from state_master s, country_master c where \
        c.name = ? and \
        c.id = s.country_id ";
    let values: any[] = [country];

    if (searchState !== "") {
      query = query + " and s.name like '%" + searchState + "%'";
    }
    const result = await excuteQuery({
      host: crmDb,
      query: query,
      values: values,
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getStateListById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query:
        "select sm.*, cm.name as country from state_master sm left join country_master cm on sm.country_id=cm.id where sm.id=?;",
      values: [id],
    });

    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getExecutiveList(crmDb: string, departmentName: string) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query:
        "select e.id as id, e.name as name, d.name as department, r.name as role  \
        from executive_master e, role_master r, department_master d \
        where e.role_id = r.id and \
        r.department_id = d.id and \
        d.name = ?",
      values: [departmentName],
    });

    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

/**
 * get ticketCategory List from DB filtered by ticketTypeId
 */
export async function getEnquiryCategoryList(crmDb: string) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "select id as id, name as name from enquiry_category_master ",
      values: [],
    });

    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

/**
 * get getTicketStageList List from DB filtered by ticketTypeId
 */
export async function getTicketStageList(crmDb: string, ticketTypeId: number) {
  try {
    let query = "select ticketStageId as id, nameVal as name from ticketStage ";
    let values: number[] = [];
    if (ticketTypeId) {
      query += " where ticketTypeId = ?";
      values = [ticketTypeId];
    }
    return excuteQuery({
      host: crmDb,
      query: query,
      values: values,
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

/**
 * get getCustomerList List from DB
 */
export async function getOrganizationList(crmDb: string, searchString: string) {
  try {
    let query = "select id as id, name as name from organisation_master";
    let values: any[] = [];

    if (searchString !== "") {
      query = query + " where name like '%" + searchString + "%'";
      values = [];
    }
    return excuteQuery({
      host: crmDb,
      query: query,
      values: values,
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

/**
 * Get the list of companies for the given userId
 * @param email: <sring> email for the user for which the eligible companies to be returned.
 * @returns list of companies
 */
export async function getCompanyList(userId: number | undefined | null) {
  try {
    if (userId) {
      const result = await excuteQuery({
        host: "userDb",
        query:
          "select c.id as company_id, c.name as companyName, c.dbinfo_id, h.host, h.port, d.name as dbName from \
        company as c, \
          userCompany as uc, \
          dbInfo as d, \
          dbHost as h \
          where \
          uc.user_id = ? and \
          uc.company_id = c.id and \
          c.dbinfo_id = d.id and \
          d.host_id = h.id \
          ;",
        values: [userId],
      });
      //Object.values(JSON.parse(JSON.stringify(
      //const stringf = JSON.stringify(result);
      const parsed = JSON.parse(JSON.stringify(result));

      return result.valueOf();
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
}

/**
 * returns rows from action data based on type specified
 * @param type
 */
export async function getEnquiryActionList(crmDb: string) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        "select a.id as id, a.name as name from enquiry_action_master a order by a.name",
      values: [],
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getMenuOptionsList(crmDb: string) {
  try {
    return excuteQuery({
      host: crmDb,
      query: "select * from menu_option_master order by parent_id, menu_order",
      values: [],
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

/**
 *
 * @param session : user session
 * @param statusData : data for saving
 * @returns result from DB (returning *)
 */
export async function createCountryDb(
  session: Session,
  statusData: zm.countrySchemaT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createCountry(?,?,?);",
      values: [statusData.name, statusData.alias, session.user.userId],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}
export async function updateCountryDb(
  session: Session,
  sourceData: zm.countrySchemaT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call updateCountry(?,?,?,?,?);",
      values: [
        sourceData.name,
        sourceData.stamp,
        sourceData.id,
        sourceData.alias,
        session.user.userId,
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

/**
 *
 * @param session : user session
 * @param statusData : data for saving
 * @returns result from DB (returning *)
 */
export async function createStateDb(
  session: Session,
  sourceData: zm.stateSchemaT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createState(?,?,?,?);",
      values: [
        sourceData.name,
        sourceData.alias,
        sourceData.country_id,
        session.user.userId,
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function updateStateDb(
  session: Session,
  sourceData: zm.stateSchemaT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call updateState(?,?,?,?,?,?);",
      values: [
        sourceData.name,
        sourceData.stamp,
        sourceData.id,
        sourceData.alias,
        sourceData.country_id,
        session.user.userId,
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function getCountryByPageDb(
  crmDb: string,
  page: number,
  filter: string | undefined,
  limit: number
) {
  try {
    const vals: any = [page, limit, limit];

    if (filter) {
      vals.unshift(filter);
    }

    const result = await excuteQuery({
      host: crmDb,
      query:
        "SELECT *,RowNum as RowID FROM (SELECT *, ROW_NUMBER() OVER () AS RowNum FROM country_master " +
        (filter ? "WHERE name LIKE CONCAT('%',?,'%') " : "") +
        "order by name) AS NumberedRows WHERE RowNum > ?*? ORDER BY RowNum LIMIT ?;",
      values: vals,
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getCountryCount(
  crmDb: string,
  value: string | undefined
) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        "SELECT count(*) as rowCount from country_master" +
        (value ? "WHERE name LIKE CONCAT('%',?,'%') " : ""),
      values: [value],
    });
  } catch (e) {
    console.log(e);
  }
}

export async function getStateByPageDb(
  crmDb: string,
  page: number,
  filter: string | undefined,
  limit: number
) {
  try {
    const vals: any = [page, limit, limit];

    if (filter) {
      vals.unshift(filter);
    }

    const result = await excuteQuery({
      host: crmDb,
      query:
        "SELECT *,RowNum as RowID FROM (select s.*, c.name as Country_name, ROW_NUMBER() OVER () AS RowNum from state_master s left outer join country_master c on c.id = s.country_id " +
        (filter ? "WHERE s.name LIKE CONCAT('%',?,'%') " : "") +
        "order by s.name) AS NumberedRows WHERE RowNum > ?*? ORDER BY RowNum LIMIT ?;",
      values: vals,
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getStateCount(crmDb: string, value: string | undefined) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        "SELECT count(*) as rowCount from state_master" +
        (value ? "WHERE name LIKE CONCAT('%',?,'%') " : ""),
      values: [value],
    });
  } catch (e) {
    console.log(e);
  }
}

export async function delStateDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "call deleteState(?)",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}
export async function delCountryByIdDB(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "call deleteCountry(?)",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function checkStateIfUsed(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query:
        "SELECT COUNT(DISTINCT sm.id) as count FROM state_master sm LEFT JOIN organisation_master om ON om.state_id = sm.id LEFT JOIN contact_master cm ON cm.state_id = sm.id LEFT JOIN executive_master em ON em.state_id = sm.id WHERE (om.state_id IS NOT NULL OR cm.state_id IS NOT NULL OR em.state_id IS NOT NULL) AND sm.id=?",
      values: [id],
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function checkCountryIfUsed(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query:
        "SELECT COUNT(DISTINCT cm.id) as count FROM country_master cm LEFT JOIN executive_master em ON em.country_id = cm.id LEFT JOIN contact_master nm ON nm.country_id = cm.id LEFT JOIN organisation_master om ON om.country_id = cm.id LEFT JOIN state_master sm ON sm.country_id=cm.id WHERE (em.country_id IS NOT NULL OR nm.country_id IS NOT NULL OR om.country_id IS NOT NULL OR sm.country_id IS NOT NULL) AND cm.id=?",
      values: [id],
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getCountryListMasterDb(searchString: string) {
  try {
    let query = "select id as id, name as name from country_master";
    let values: any[] = [];

    if (searchString !== "") {
      query = query + " where name like '%" + searchString + "%'";
      values = [];
    }
    const result = await excuteQuery({
      host: "userDb",
      query: query,
      values: values,
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getStateListMasterDb(
  searchState: string,
  country: string
) {
  try {
    let query =
      "select s.id as id, s.name as name from state_master s, country_master c where \
        c.name = ? and \
        c.id = s.country_id ";
    let values: any[] = [country];

    if (searchState !== "") {
      query = query + " and s.name like '%" + searchState + "%'";
    }
    const result = await excuteQuery({
      host: "userDb",
      query: query,
      values: values,
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

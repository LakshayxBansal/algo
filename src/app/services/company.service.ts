"use server";
import excuteQuery, { createDbConn } from "../utils/db/db";
import * as zm from "../models/models";
import { dbTableAndProScript } from "../utils/tableScript";

export async function getCompanyDetailsById(id: number) {
  try {
    const result = await excuteQuery({
      host: "userDb",
      query:
        "select c.id, c.alias, c.name, c.add1, c.add2, c.city, c.state_id state_id, c.pincode, c.country_id country_id, c.logo_id docId,\
		    dh.host, dh.port, dbInfo.id dbInfoId, s.name state, co.name country, uc.role_id from company c\
        left join state_master s on c.state_id = s.id \
        left join country_master co on c.country_id = co.id \
        left join userCompany uc on uc.company_id = c.id\
        left join dbInfo on dbInfo.id = c.dbinfo_id\
        left join dbHost dh on dh.id = dbInfo.host_id\
        where c.id=?;",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getCompanyDbByIdList(id: number) {
  try {
    const result = await excuteQuery({
      host: "userDb",
      query: "select c.dbinfo_id from company c where c.id=?;",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getHostId() {
  let result;
  try {
    const data = await excuteQuery({
      host: "userDb",
      query: "select * from dbHost d where d.useForNextDb = 1;",
      values: [],
    });
    result = {
      status: true,
      data: data[0],
    };
  } catch (e) {
    result = {
      status: false,
      data: [{ path: ["form"], message: "Error: Server Error" }],
    };
  }
  return result;
}

export async function createCompanyDB(
  dbName: string,
  host: string,
  port: number
) {
  let result;
  try {
    const data = await createDbConn({
      hostIp: host,
      hostPort: port,
      query: "create database " + dbName,
    });
    result = {
      status: true,
      data: data[0],
    };
  } catch (e) {
    result = {
      status: false,
      data: [{ path: ["form"], message: "Error: Server Error" }],
    };
  }
  return result;
}

export async function createTablesAndProc(
  dbName: string,
  userId: number,
  userName: string,
  userEmail: string,
  userMobile: string
) {
  let result;
  try {
    let scripts: string[] = dbTableAndProScript.split("~");
    scripts.push(`INSERT INTO status_bar (user_id) VALUES (${userId});`);
    let data;
    for (let idx in scripts) {
      let query = scripts[idx];
      data += await excuteQuery({
        host: dbName,
        query: query,
        values: [],
      });
    }
    data += await excuteQuery({
      host: dbName,
      query:
        "INSERT INTO executive_master (name, email, mobile, created_by, created_on, crm_user_id, role_id, stamp) values\
                (?, ?, ?, ?, now(), ?, 1, 0);",
      values: [userName, userEmail, userMobile, userId, userId],
    });
    result = {
      status: true,
      data: data,
    };
  } catch (e) {    
    result = {
      status: false,
      data: [{ path: ["form"], message: "Error: Server Error" }],
    };
  }
  return result;
}

export async function createCompanyAndInfoDb(
  hostId: number,
  dbName: string,
  company: zm.companySchemaT,
  userId: number
) {
  try {
    const result = await excuteQuery({
      host: "userDb",
      query: "call createCompanyAndInfo(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      values: [
        dbName,
        hostId,
        company.name,
        company.alias,
        company.add1,
        company.add2,
        company.country_id,
        company.state_id,
        company.city,
        company.pincode,
        userId,
        company?.docData?.docId,
      ],
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function dropCompanyDatabase(
  dbName: string,
  host: string,
  port: number
) {
  let result;
  try {
    const data = await createDbConn({
      hostIp: host,
      hostPort: port,
      query: "drop database " + dbName,
    });
    result = {
      status: true,
    };
  } catch (e) {
    result = {
      status: false,
      data: [{ path: ["form"], message: "Error: Server Error" }],
    };
  }
  return result;
}

export async function dropDatabase(dbName: string) {
  try {
    const result = await excuteQuery({
      host: dbName,
      query: "DROP DATABASE " + dbName,
      values: [],
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function deleteCompanyAndDbInfo(
  companyId: number,
  dbInfoId: number
) {
  try {    
    let result = await excuteQuery({
      host: "userDb",
      query: "DELETE FROM company WHERE id = ?",
      values: [companyId],
    });

    result += await excuteQuery({
      host: "userDb",
      query: "DELETE FROM dbInfo WHERE id = ?",
      values: [dbInfoId],
    });

    result += await excuteQuery({
      host: "userDb",
      query: "DELETE FROM userCompany WHERE company_id = ?",
      values: [companyId],
    });

    return { status: true };
  } catch (e) {
    console.log(e);
    return { status: false, message: "Something went wrong." };
  }
}

export async function getCompaniesDb(
  userId: number,
  page: number,
  filter: string | undefined,
  limit: number
) {
  try {
    const vals: any = [userId, page, limit, limit];

    if (filter) {
      vals.unshift(filter);
    }

    const results = await excuteQuery({
      host: "userDb",
      query:
        "SELECT company_id id, companyName, companyAlias, dbinfo_id, total_count,\
         (SELECT u.name as userName FROM user u where u.id=createdBy) as createdBy, createdOn, \
          CONCAT(dbInfoName, dbInfoId) dbName, host, port, userId,roleId, RowNum as RowID \
          FROM (SELECT c.id as company_id, c.name as companyName, c.alias as companyAlias, c.dbinfo_id dbinfo_id,\
          c.created_by createdBy, c.created_on createdOn, count(1) over () total_count,\
          h.host host, h.port port, d.name as dbInfoName, d.id as dbInfoId, u.id as userId,uc.role_id as roleId, ROW_NUMBER() OVER () AS RowNum \
          FROM userCompany as uc, \
          user u, \
          dbInfo d, dbHost h,\
          company c WHERE \
          u.id = uc.user_id and \
          uc.isAccepted = 1 and \
          uc.company_id = c.id and \
          c.dbinfo_id = d.id and \
          d.host_id = h.id AND " +
        (filter ? "c.name LIKE CONCAT('%',?,'%') AND" : "") +
        " u.id=? \
          order by c.name) AS NumberedRows \
          WHERE RowNum > ?*? \
          ORDER BY RowNum \
          LIMIT ?;",
      values: vals,
    });

    return results;
  } catch (e) {
    console.log(e);
  }
}

export async function getCompanyCountDB(
  userId: number
) {
  try {
    return excuteQuery({
      host: "userDb",
      query:
        "Select count(*) as rowCount from \
          userCompany uc \
          where \
          uc.user_id = ?",
      values: [userId],
    });
  } catch (e) {
    console.log(e);
  }
}

export async function updateCompanyDB(data: zm.companySchemaT) {
  try {
    return excuteQuery({
      host: "userDb",
      query: "call updateCompany(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      values: [
        data.id,
        data.name,
        data.alias,
        data.add1,
        data.add2,
        data.country_id,
        data.state_id,
        data.city,
        data.pincode,
        data.docData?.docId
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function getHostDetailsService(dbName: string) {
  try {
    const result = await excuteQuery({
      host: "userDb",
      query:
        "select dh.host as hostIp, dh.port as hostPort from dbHost dh left join dbInfo d on d.host_id=dh.id where concat(d.name, d.id)=?;",
      values: [dbName],
    });

    return result[0];
  } catch (e) {
    console.log(e);
  }
  return null;
}

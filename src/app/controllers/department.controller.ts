<<<<<<< HEAD
'use server'
 
import * as zs from '../zodschema/zodschema';
import { getDepartmentList, createDepartmentDb, createDeptDB, modifyDeptDB, getDeptList, getDeptCount, deleteDeptDB, getDeptDataDb } from '../services/department.service';
import { getAppSession, getSession } from '../services/session.service';
import { SqlError } from 'mariadb';
import { nameMasterDataT } from '../models/models';
import {logger} from '@/app/utils/logger.utils';
import * as mdl from "../models/models"  // jp_dev
import { bigIntToNum } from '../utils/db/types';
=======
"use server";
>>>>>>> 339f2a559516912d0ee65abd701d7085d235f7df

import * as zs from "../zodschema/zodschema";
import {
  getDepartmentList,
  createDepartmentDb,
  getDepartmentDetailsById,
  updateDepartmentDb,
  getDepartmentCount,
  getDepartmentByPageDb,
} from "../services/department.service";
import { getSession } from "../services/session.service";
import { SqlError } from "mariadb";
import { nameMasterDataT } from "../models/models";
import { logger } from "@/app/utils/logger.utils";
import { bigIntToNum } from "../utils/db/types";
import * as mdl from "../models/models";

export async function getDepartment(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getDepartmentList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function getDepartmentById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getDepartmentDetailsById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

export async function createDepartment(data: nameMasterDataT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.nameMasterData.safeParse(data);
      if (parsed.success) {
        const dbResult = await createDepartmentDb(session, data);
        if (dbResult.length > 0 && dbResult[0][0].error === 0) {
          result = { status: true, data: dbResult[1] };
        } else {
          result = {
            status: false,
            data: [
              {
                path: [dbResult[0][0].error_path],
                message: dbResult[0][0].error_text,
              },
            ],
          };
        }
      } else {
        result = { status: false, data: parsed.error.issues };
      }
    } else {
      result = {
        status: false,
        data: [{ path: ["form"], message: "Error: Server Error" }],
      };
    }
    return result;
  } catch (e) {
    logger.error(e);
    if (e instanceof SqlError && e.code === "ER_DUP_ENTRY") {
      result = {
        status: false,
        data: [{ path: ["name"], message: "Error: Value already exist" }],
      };
      return result;
    }
  }
  result = {
    status: false,
    data: [{ path: ["form"], message: "Error: Unknown Error" }],
  };
  return result;
}

<<<<<<< HEAD
//added from jp_dev
// getAppSession to getSession
export async function createDept(formData: FormData) {
  let deptCreated = { status: false, data: {} as mdl.deptT, error: {} };

  try {
    const appSession = await getSession();

    if (appSession) {
      const deptData = {
        name: formData.get('name') as string,
      };

      const result = zs.deptSchema.safeParse(deptData);

      if (result.success) {
        const dept = await createDeptDB(
          appSession.user.dbInfo.dbName as string,
          // appSession.session?.user?.email as string,
          appSession.user.email as string,
          deptData
        );

        if (dept.length > 0) {
          deptCreated = { status: true, data: dept[0], error: {} };
        }
      } else {
        deptCreated = {
          status: false,
          data: {} as mdl.deptT,
          error: result.error.toString(),
        };
      }
    }
  } catch (e: any) {
    console.log(e);

    let err = 'Contact Admin, E-Code:369';

    if (e.code === 'ER_DUP_ENTRY') {
      err = 'Department already exists';
    }
    deptCreated = { status: false, data: {} as mdl.deptT, error: err };
  }
  return deptCreated;
}

//jp_dev

export async function modifyDept(
  formData: FormData,
  stamp: number,
  id: number
) {
  let deptModified = { status: false, data: {} as mdl.deptT, error: {} };
  console.log(formData);
  try {
    const appSession = await getSession();

    if (appSession) {
      const deptData = {
        name: formData.get('name') as string,
      };
      console.log(deptData);

      const result = zs.deptSchema.safeParse(deptData);

      if (result.success) {
        const dept = await modifyDeptDB(
          // appSession.dbSession?.dbInfo.dbName as string,
          // appSession.session?.user?.email as string,
          appSession.user.dbInfo.dbName as string,
          appSession.user.email as string,
          deptData,
          stamp,
          id
        );
        console.log(dept.affectedRows);

        if ((dept.affectedRows = 1)) {
          deptModified = { status: true, data: dept[0], error: {} };
        } else if ((dept.affectedRows = 0)) {
          deptModified = {
            ...deptModified,
            error: 'Trying to modify an older version',
          };
        }
      } else {
        deptModified = {
          status: false,
          data: {} as mdl.deptT,
          error: result.error.toString(),
        };
      }
    }
  } catch (e: any) {
    console.log(e);

    let err = 'Contact Admin, E-Code:369';

    if (e.code === 'ER_DUP_ENTRY') {
      err = 'Department already exists';
    }
    deptModified = { status: false, data: {} as mdl.deptT, error: err };
  }
  return deptModified;
}

//jp_dev
export async function getDepts(
=======
export async function updateDepartment(data: nameMasterDataT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.nameMasterData.safeParse(data);
      if (parsed.success) {
        const dbResult = await updateDepartmentDb(session, data);
        if (dbResult.length > 0 && dbResult[0][0].error === 0) {
          result = { status: true, data: dbResult[1] };
        } else {
          result = {
            status: false,
            data: [
              {
                path: [dbResult[0][0].error_path],
                message: dbResult[0][0].error_text,
              },
            ],
          };
        }
      } else {
        result = { status: false, data: parsed.error.issues };
      }
    } else {
      result = {
        status: false,
        data: [{ path: ["form"], message: "Error: Server Error" }],
      };
    }
    return result;
  } catch (e) {
    logger.error(e);
    if (e instanceof SqlError && e.code === "ER_DUP_ENTRY") {
      result = {
        status: false,
        data: [{ path: ["name"], message: "Error: Value already exist" }],
      };
      return result;
    }
  }
  result = {
    status: false,
    data: [{ path: ["form"], message: "Error: Unknown Error" }],
  };
  return result;
}

export async function getDepartmentByPage(
>>>>>>> 339f2a559516912d0ee65abd701d7085d235f7df
  page: number,
  filter: string | undefined,
  limit: number
) {
<<<<<<< HEAD
  let getDeps = {
    status: false,
    data: {} as mdl.getDeptsT,
=======
  let getDepartment = {
    status: false,
    data: {} as mdl.nameMasterDataT,
>>>>>>> 339f2a559516912d0ee65abd701d7085d235f7df
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession) {
<<<<<<< HEAD
      const deps = await getDeptList(
        // appSession.dbSession?.dbInfo.dbName as string,
=======
      const conts = await getDepartmentByPageDb(
>>>>>>> 339f2a559516912d0ee65abd701d7085d235f7df
        appSession.user.dbInfo.dbName as string,
        page as number,
        filter,
        limit as number
      );
<<<<<<< HEAD
      const rowCount = await getDeptCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getDeps = {
        status: true,
        data: deps.map(bigIntToNum) as mdl.getDeptsT,
        count: Number(rowCount[0]['rowCount']),
=======
      const rowCount = await getDepartmentCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getDepartment = {
        status: true,
        data: conts.map(bigIntToNum) as mdl.nameMasterDataT,
        count: Number(rowCount[0]["rowCount"]),
>>>>>>> 339f2a559516912d0ee65abd701d7085d235f7df
        error: {},
      };
    }
  } catch (e: any) {
<<<<<<< HEAD
    console.log(e);

    let err = 'Contact Admin, E-Code:369';

    getDeps = {
      ...getDeps,
      status: false,
      data: {} as mdl.getDeptsT,
      error: err,
    };
  }
  return getDeps;
}

//jp_dev
export async function deleteDept(
  id: number
) {
  let deptDeleted = { status: false, error: {} };
  try {
    const appSession = await getSession();

    if (appSession) {
      
        const dept = await deleteDeptDB(
          appSession.user.dbInfo.dbName as string,
          id
        );
        console.log(dept.affectedRows);

        if ((dept.affectedRows = 1)) {
          deptDeleted = { status: true, error: {} };
        } else if ((dept.affectedRows = 0)) {
          deptDeleted = {
            ...deptDeleted,
            error: 'Record Not Found',
          };
        }} }
  catch (e: any) {
    console.log(e);

    let err = 'Contact Admin, E-Code:369';

    deptDeleted = { status: false, error: err };
  }
  return deptDeleted;
}

//jp mail files
export async function getDeptData(
  id:number
) {
  let getDep = {
    status: false,
    data: [{}] as mdl.getDeptT,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession) {
      const dep = await getDeptDataDb(
        appSession.user.dbInfo.dbName as string,
        id as number
      );
      
      getDep = {
        status: true,
        data: dep.map(bigIntToNum) as mdl.getDeptT,
        error: {},
      };
    }
  } catch (e: any) {
    console.log(e);

    let err = 'Contact Admin, E-Code:369';

    getDep = {
      ...getDep,
      status: false,
      data: {} as mdl.getDeptT,
      error: err,
    };
  }
  return getDep;
}



=======

    let err = "Department Admin, E-Code:369";

    getDepartment = {
      ...getDepartment,
      status: false,
      data: {} as mdl.nameMasterDataT,
      error: err,
    };
  }
  return getDepartment;
}
>>>>>>> 339f2a559516912d0ee65abd701d7085d235f7df

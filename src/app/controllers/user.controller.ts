"use server"

import { addUser, getBizAppUserList,checkInActiveUserDB,makeUserActiveDB, getCompanyUserCount, checkUserInCompanyDB, getUserDetailsByEmailList, getCompanyUserDB, getUserDetailsByIdList, deRegisterFromAppDB, deRegisterFromCompanyDB, deRegisterFromAllCompanyDB, deleteUserDB } from '../services/user.service';
import { hashText } from '../utils/encrypt.utils';
import * as zs from '../zodschema/zodschema';
import { userSchemaT } from '@/app/models/models';
import { getSession } from '../services/session.service';
import { bigIntToNum } from "../utils/db/types";
import { SqlError } from 'mariadb';


export async function registerUser(formData: userSchemaT) {
  let result;
  try {
      const parsed = zs.userSchema.safeParse(formData);
      if (parsed.success) {
        let contact;
        if (formData.email) {
          contact = formData.email;
          delete formData.email;
        }
        else {
          contact = formData.phone;
          contact = contact?.replace(/ +/g, '');
          delete formData?.phone;
        }
        formData.contact = contact;
        

          const hashedPassword = await hashText(formData.password);
          formData.password = hashedPassword;

          const dbResult = await addUser(formData as userSchemaT);
          if (dbResult[0][0].error === 0) {
            result = { status: true, data: dbResult[1] };
          } else {
            result = { status: false, data: [{ path: [dbResult[0][0].error_path], message: dbResult[0][0].error_text }] };
          }
        // }
      } else {
        let errorState: { path: (string | number)[], message: string }[] = [];
        for (const issue of parsed.error.issues) {
          errorState.push({ path: issue.path, message: issue.message });
        }
        result = { status: false, data: errorState };
        return result;
      }
    return result;
  } catch (e) {
    console.log(e);
  }
  result = { status: false, data: [{ path: ["form"], message: "Error: Unknown Error" }] };
  return result;
}


export async function getBizAppUser(searchString: string, invited: boolean, accepted: boolean, mapped: boolean, admin: boolean) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getBizAppUserList(session.user.dbInfo.id, searchString, invited, accepted, mapped, admin);
    }
  } catch (error) {
    throw error;
  }
}

export async function getUserDetailsByEmail(email: string) {
  try {
    if (email) {
      const user = await getUserDetailsByEmailList(email);
      return user;
    }
  } catch (e) {
    throw e;
  }
  return null;
}
export async function checkInActiveUser(contact: string) {
  try {
    if (contact) {
      const user = await checkInActiveUserDB(contact);
      return user;
    }
  } catch (e) {
    throw e;
  }
  return null;
}

export async function getUserDetailsById(userId: number) {
  try {
    if (userId) {
      const user = await getUserDetailsByIdList(userId);
      return user;
    }
  } catch (e) {
    throw e;
  }
  return null;
}

export async function makeUserActive(userId: number | undefined) {
  try {
    if (userId) {
      await makeUserActiveDB(userId);
    }
  } catch (e) {
    throw e;
  }
  return null;
}

export async function deleteUser(userId: number | undefined) {
  try {
    if (userId) {
      await deleteUserDB(userId);
    }
  } catch (e) {
    throw e;
  }
  return null;
}

export async function deRegisterFromCompany(id: number | null, userId: number | null, companyId: number | null) {
  try {
    await deRegisterFromCompanyDB(id, userId, companyId);
  } catch (e) {
    throw e;
  }
  return null;
}

export async function deRegisterFromAllCompany(userId: number) {
  try {
    await deRegisterFromAllCompanyDB(userId);
  } catch (e) {
    throw e;
  }
  return null;
}

export async function deRegisterFromApp(userId: number) {
  try {
    if (userId) {
      const user = await deRegisterFromAppDB(userId);
      return user;
    }
  } catch (e) {
    throw e;
  }
  return null;
}

export async function getCompanyUser(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getCompanyUsers = {
    status: false,
    data: {} as userSchemaT,
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession) {
      const companyId = appSession.user.dbInfo.id;
      const companyUsers = await getCompanyUserDB(
        companyId as number,
        page as number,
        filter,
        limit as number
      );

      const rowCount = await getCompanyUserCount(
        companyId,
        filter
      );
      for (const ele of companyUsers) {
        if (ele.admin === 1) {
          ele.role = "Admin"
        } else {
          ele.role = "User";
        }
      }
      getCompanyUsers = {
        status: true,
        data: companyUsers.map(bigIntToNum) as userSchemaT,
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {

    let err = "Contact Admin, E-Code:369";

    getCompanyUsers = {
      ...getCompanyUsers,
      status: false,
      data: {} as userSchemaT,
      error: err,
    };
  }
  return getCompanyUsers;
}

export async function checkUserInCompany(userId: number, companyId: number) {
  try {
    const user = await checkUserInCompanyDB(userId, companyId);
    return user;
  } catch (error) {
    throw (error);
  }
}
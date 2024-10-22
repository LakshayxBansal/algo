"use server"

import { addUser, getBizAppUserList,checkInActiveUserDB,makeUserActiveDB, getCompanyUserCount, checkUserInCompanyDB, getUserDetailsByEmailList, getCompanyUserDB, getUserDetailsByIdList, deRegisterFromAppDB, deRegisterFromCompanyDB, deRegisterFromAllCompanyDB, deleteUserDB, createUserToInviteDb, insertExecutiveIdToInviteUserList, getInviteDetailByContactList, getInviteDetailByIdList, updateInUsercompany, deleteInvite, createInUsercompany, getInviteUserByIdList, getInviteUserDb, getInvitesDb, getInvitesCount, createUserInStatusBarDB } from '../services/user.service';
import { hashText } from '../utils/encrypt.utils';
import * as zs from '../zodschema/zodschema';
import { inviteUserSchemaT, userSchemaT } from '@/app/models/models';
import { getSession } from '../services/session.service';
import { bigIntToNum } from "../utils/db/types";
import { SqlError } from 'mariadb';
import { getCompanyDbByIdList, getCompanyDetailsById } from '../services/company.service';


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

export async function createUserInStatusBar(userId: number, companyId: number) {
  try {
    const company = await getCompanyDbByIdList(companyId);
    await createUserInStatusBarDB(userId, `crmapp${company[0].dbinfo_id}`);
  } catch (error) {
    throw (error);
  }
}

export async function createUserToInvite(data: inviteUserSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      Object.assign(data, { companyId: session.user.dbInfo.id });
      const parsed = zs.inviteUserSchema.safeParse(data);
      if (parsed.success) {
        let contact;
        if (data.email) {
          contact = data.email;
          delete data.email;
        }
        else {
          contact = data.phone;
          contact = contact?.replace(/ +/g, '');
          delete data?.phone;
        }
        data.contact = contact;
        const dbResult = await createUserToInviteDb(data);
        if (dbResult[0][0].error === 0) {
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
        let errorState: { path: (string | number)[]; message: string }[] = [];
        for (const issue of parsed.error.issues) {
          errorState.push({ path: issue.path, message: issue.message });
        }
        result = { status: false, data: errorState };
        return result;
      }
    } else {
      result = {
        status: false,
        data: [{ path: ["form"], message: "Error: Server Error" }],
      };
    }
    return result;
  } catch (e) {
    // if (e instanceof SqlError && e.code === "ER_DUP_ENTRY") {
    //   result = {
    //     status: false,
    //     data: [{ path: ["name"], message: "Error: Value already exist" }],
    //   };
    //   return result;
    // }
  }
  result = {
    status: false,
    data: [{ path: ["form"], message: "Error: Unknown Error" }],
  };
  return result;
}

export async function insertExecutiveIdToInviteUser(
  executiveId: number,
  inviteId: number
) {
  try {
    const session = await getSession();
    if (session) {
      await insertExecutiveIdToInviteUserList(executiveId, inviteId);
    }
  } catch (error) {
    throw error;
  }
}

export async function getInviteDetailByContact(
  usercontact: string,
  companyId: number
) {
  try {
    const session = await getSession();
    if (session) {
      const result = await getInviteDetailByContactList(usercontact, companyId);
      return result[0];
    }
  } catch (error) {
    throw error;
  }
}

export async function getInviteDetailById(inviteId: number) {
  try {
    // const session = await getSession();
    // if(session){
    const result = await getInviteDetailByIdList(inviteId);
    console.log(result);
    return result[0];
    // }
  } catch (error) {
    throw error;
  }
}

export async function acceptInvite(inviteDetail: inviteUserSchemaT) {
  try {
    const session = await getSession();
    if (session) {
      // if(inviteDetail.executiveId){
      //   const companyDb = await getCompanyDbById(inviteDetail.companyId);
      //   await Promise.all([createInUsercompany(true,inviteDetail.executiveId,inviteDetail.companyId,inviteDetail.inviteDate,session.user.userId), insertUserIdInExecutive(companyDb as string,inviteDetail.executiveId,session.user.userId),deleteInvite(inviteDetail.id as number)]);
      // }else{
      const user = await checkUserInCompany(
        session.user.userId,
        inviteDetail.companyId
      );
      await createUserInStatusBar(session.user.userId,inviteDetail.companyId);
      if (user.length > 0) {
        await Promise.all([
          updateInUsercompany(
            true,
            null,
            inviteDetail.companyId,
            inviteDetail.inviteDate,
            session.user.userId
          ),
          deleteInvite(inviteDetail.id as number),
        ]);
      } else {
        await Promise.all([
          createInUsercompany(
            true,
            null,
            inviteDetail.companyId,
            inviteDetail.inviteDate,
            session.user.userId
          ),
          deleteInvite(inviteDetail.id as number),
        ]);
      }
      // }
    }
  } catch (error) {
    throw error;
  }
}

export async function rejectInvite(inviteDetail: inviteUserSchemaT) {
  try {
    const session = await getSession();
    if (session) {
      // if(inviteDetail.executiveId){
      // const companyDb = await getCompanyDbById(inviteDetail.companyId);
      // await Promise.all([createInUsercompany(false,inviteDetail.executiveId,inviteDetail.companyId,inviteDetail.inviteDate,session.user.userId),deleteInvite(inviteDetail.id as number)]);
      // }else{
        const user = await checkUserInCompany(
          session.user.userId,
          inviteDetail.companyId
        );
        if (user.length > 0) {
          await Promise.all([
            updateInUsercompany(
              false,
              null,
              inviteDetail.companyId,
              inviteDetail.inviteDate,
              session.user.userId
            ),
            deleteInvite(inviteDetail.id as number),
          ]);
        } else {
          await Promise.all([
            createInUsercompany(
              false,
              null,
              inviteDetail.companyId,
              inviteDetail.inviteDate,
              session.user.userId
            ),
            deleteInvite(inviteDetail.id as number),
          ]);
      }
    }
  } catch (error) {
    throw error;
  }
}

export async function getInviteUserById(id: number) {
  try {
    const session = await getSession();
    if (session) {
      return getInviteUserByIdList(id);
    }
  } catch (error) {
    throw error;
  }
}

export async function getInviteUserByCompany(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getInviteUsers = {
    status: false,
    data: {} as inviteUserSchemaT,
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession) {
      const companyId = appSession.user.dbInfo.id;
      const inviteUsers = await getInviteUserDb(
        companyId as number,
        page as number,
        filter,
        limit as number
      );

      getInviteUsers = {
        status: true,
        data: inviteUsers.map(bigIntToNum) as inviteUserSchemaT,
        count: Number(inviteUsers[0]["total_count"]),
        error: {},
      };
    }
  } catch (e: any) {
    let err = "Contact Admin, E-Code:369";

    getInviteUsers = {
      ...getInviteUsers,
      status: false,
      data: {} as inviteUserSchemaT,
      error: err,
    };
  }
  return getInviteUsers;
}

export async function getInviteByUserContact(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getInvites = {
    status: false,
    data: {} as inviteUserSchemaT,
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession) {
      const user = await getUserDetailsById(appSession.user.userId);
      const userContact = user.contact;
      const invites = await getInvitesDb(
        userContact as string,
        page as number,
        filter,
        limit as number
      );            

      // for (const ele of invites) {
      //   if(ele.executiveId){
      //     ele.inviteType = "Executive"
      //   }else{
      //     ele.inviteType = "User"
      //   }
      // }
      getInvites = {
        status: true,
        data: invites.map(bigIntToNum) as inviteUserSchemaT,
        count: Number(invites[0]["total_count"]),
        // count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {
    let err = "Contact Admin, E-Code:369";

    getInvites = {
      ...getInvites,
      status: false,
      data: {} as inviteUserSchemaT,
      error: err,
    };
  }
  return getInvites;
}

export async function getTotalInvite() {
  try {
    const session = await getSession();
    if (session) {
      const user = await getUserDetailsById(session.user.userId);
      const userContact = user.contact;
      const invitesCount = await getInvitesCount(userContact, "");
      const result = invitesCount.map(bigIntToNum);
      return result[0];
    }
  } catch (error) {
    throw error;
  }
}

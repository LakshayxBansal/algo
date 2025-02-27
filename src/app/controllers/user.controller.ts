"use server"

import { addUser, getBizAppUserList, checkInActiveUserDB, makeUserActiveDB, getCompanyUserCount, checkUserInCompanyDB, getUserDetailsByEmailList, getCompanyUserDB, getUserDetailsByIdList, deRegisterFromAppDB, deRegisterFromCompanyDB, deRegisterFromAllCompanyDB, deleteUserDB, createUserToInviteDb, insertExecutiveIdToInviteUserList, getInviteDetailByContactList, getInviteDetailByIdList, updateInUsercompany, deleteInvite, createInUsercompany, getInviteUserByIdList, getInviteUserDb, getInvitesDb, getInvitesCount, createUserInStatusBarDB, updateInvitedUserDb, rejectInviteDB } from '../services/user.service';
import { hashText } from '../utils/encrypt.utils';
import * as zs from '../zodschema/zodschema';
import { inviteUserSchemaT, userSchemaT } from '@/app/models/models';
import { getSession } from '../services/session.service';
import { bigIntToNum } from "../utils/db/types";
import { SqlError } from 'mariadb';
import { getCompanyDbByIdList, getCompanyDetailsById } from '../services/company.service';
import { getAllRoles } from './executiveRole.controller';
import { emailRegex } from '../zodschema/zodschema';


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


export async function getBizAppUser(searchString: string, mappedUser: { id: number | undefined, name: string | undefined }, invited: boolean, accepted: boolean, mapped: boolean, admin: boolean) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      let result = await getBizAppUserList(session.user.dbInfo.id, searchString, invited, accepted, mapped, admin);
      if (mappedUser.id) {
        result = [mappedUser, ...result];
      }
      return result;
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

export async function deRegisterFromCompany(userId: number, companyId: number) {
  try {
    await deRegisterFromCompanyDB(userId, companyId);
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
      const roles = await getAllRoles();
      for (const ele of companyUsers) {
        const userRole = roles.filter((role: { id: number, name: string }) => role.id === ele.roleId)[0]
        ele.roleId = userRole ? userRole.id : 0;
        ele.role = userRole ? userRole.name : "none";
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
    if (session?.user.dbInfo) {
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
  } catch (error) {
    console.log(error);
  }
  result = {
    status: false,
    data: [{ path: ["form"], message: "Error: Unknown Error" }],
  };
  return result;
}

export async function updateInvitedUser(data: inviteUserSchemaT,newDate:boolean) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
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
        const dbResult = await updateInvitedUserDb(data,newDate);
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
  } catch (error) {
    console.log(error);
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

      await createUserInStatusBar(session.user.userId, inviteDetail.companyId);

      await Promise.all([
        createInUsercompany(
          inviteDetail.companyId,
          inviteDetail.inviteDate,
          session.user.userId
        ),
        deleteInvite(inviteDetail.id as number),
      ]);

    }
  } catch (error) {
    throw error;
  }
}

export async function rejectInvite(inviteId: number) {
  try {
    const session = await getSession();
    if (session) {
      await rejectInviteDB(inviteId);
    }
  } catch (error) {
    throw error;
  }
}

export async function getInviteUserById(id: number) {
  try {
    const session = await getSession();
    if (session) {
      const result = await getInviteUserByIdList(id);
      if (result && result.length > 0) {
        if (emailRegex.test(result[0].usercontact)) {
          result[0].email = result[0].usercontact;
        } else {
          result[0].phone = result[0].usercontact;
        }
        delete result[0].usercontact;
      }
      return result;
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

      for (const inviteUser of inviteUsers) {
        if (inviteUser.status === 1) {
          inviteUser.status = "Pending";
        } else {
          inviteUser.status = "Rejected";
        }
      }

      getInviteUsers = {
        status: true,
        data: inviteUsers.map(bigIntToNum) as inviteUserSchemaT,
        count: inviteUsers.length > 0 ? Number(inviteUsers[0]["total_count"]) : 0,
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
    data: [] as inviteUserSchemaT[],
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



      getInvites = {
        status: true,
        data: invites.map(bigIntToNum) as inviteUserSchemaT[],
        count: invites.length > 0 ? Number(invites[0]["total_count"]) : 0,
        // count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {
    let err = "Contact Admin, E-Code:369";

    getInvites = {
      ...getInvites,
      status: false,
      data: [] as inviteUserSchemaT[],
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

export async function delInviteById(id: number) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const res = await deleteInvite(id);
      if (res) {
        result = { status: true };
      } else {
        result = {
          status: false, data: [
            {
              path: [""],
              message: ""
            }]
        };
      }
      return result;
    }
  } catch (error) {
    throw (error);
  }
}

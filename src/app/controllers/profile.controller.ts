"use server";
import { CreateProfileInputT } from "../models/profile.model";
import { getSession } from "../services/session.service";
import { createProfileDb, updateProfileDb, getProfileById } from "../services/profile.service";
import { createProfileSchema } from "../zodschema/profileSchema";
import { logger } from "../utils/logger.utils";
import { modifyPhone } from "../utils/phoneUtils";



export async function updateProfile(data: CreateProfileInputT, params: any) {
  let result;
  try {
    const session = await getSession();

    if (!session?.user?.dbInfo?.id) {
      result = {
        status: false,
        data: [{ path: ["form"], message: "Session Error: User not logged in" }],
      };
      return result;
    }
    data.phone = modifyPhone(data.phone);
    const parsed = createProfileSchema.safeParse(data);

    if (!parsed.success) {
      result = {
        status: false,
        data: parsed.error.issues, 
      };
      return result;
    }
    const dbResult = await updateProfileDb(session, data, params);

    if (dbResult.status) {

      return { status: true, data: dbResult };
      
    } else {
      return { status: false, data: dbResult.data };
    }
  } catch (e) {
    return {
      status: false,
      data: [{ path: ["form"], message: "Unknown Error in updateProfile" }],
    };
  }
}


// export async function createProfile(data: CreateProfileInputT) {
//   let result;
//   try {
//     const session = await getSession();

//     if (!session?.user?.dbInfo?.id) {
//       result = { status: false, data: [{ path: ["form"], message: "Session Error: User not logged in" }]}
//       return result;
//     }

//     console.log("phone from data  is here sdfghjsdfghjsdfghj ", data);
//     if(data.phone.includes(" ")){
//       data.phone = data.phone.split(" ").slice(1).join(" ");
//     }
//     console.log("data", data);
//     const data2 = {...data}
//     data2.phone = data2.phone.replace(/\s+/g, "");
//     const parsed = createProfileSchema.safeParse(data);
//     console.log("parsed", parsed);
    
//     if (!parsed.success) {
//       //console.log("parsed.error.issues", parsed.error.issues);
//       return result ={ status: false, data: parsed.error.issues };
//     }

//     const dbResult = await createProfileDb(session, data as CreateProfileInputT); 
//     console.log("dbResult", dbResult);
//     // as CreateProfileInputT added to avoid type error
//     if(dbResult.status){
//       //console.log("form controller dbResult from true", dbResult);
//       return result ={ status: true, data: dbResult.data };
//     }else{
//       console.log("form controller dbResult from false", dbResult);
//       return result = { status: false, data: dbResult.data };
//     }
//   } catch (e) {
//     logger.error("Unhandled Error in createProfile:", e);
//     return result = {
//       status: false,
//       data: [{ path: ["form"], message: "Unknown Error in createProfile" }],
//     };
//   }
// }

// export  function modifyPhone (mobile : string) : string {
//   const firstSpaceIndex = mobile.indexOf(" ");
//     mobile =
//       (firstSpaceIndex !== -1 ? mobile.slice(firstSpaceIndex + 1) : "")
//         .length === 0
//         ? ""
//         : mobile.slice(0, firstSpaceIndex) +
//           " " +
//           mobile.slice(firstSpaceIndex + 1).replaceAll(" ", "");

//   return mobile;
// }

export async function createProfile(data: CreateProfileInputT) {
  let result;
  try {
    const session = await getSession();

    if (!session?.user?.dbInfo?.id) {
      result = { status: false, data: [{ path: ["form"], message: "Session Error: User not logged in" }]}
      return result;
    }

    data.phone = modifyPhone(data.phone);
    const parsed = createProfileSchema.safeParse(data);
    console.log("parsed", parsed);
    
    if (!parsed.success) {
      return result ={ status: false, data: parsed.error.issues };
    }

    const dbResult = await createProfileDb(session, data as CreateProfileInputT); 
    console.log("dbResult", dbResult);
    if(dbResult.status){
      return result ={ status: true, data: dbResult.data };
    }else{
      console.log("form controller dbResult from false", dbResult);
      return result = { status: false, data: dbResult.data };
    }
  } catch (e) {
    logger.error("Unhandled Error in createProfile:", e);
    return result = {
      status: false,
      data: [{ path: ["form"], message: "Unknown Error in createProfile" }],
    };
  }
}


export async function fetchProfileById(profileId: number) {
  try {
    const session = await getSession();
    
    if (!session?.user?.dbInfo?.id) {
      return { status: false, data: "Session Error: User not logged in" };
    }

    return await getProfileById(session, profileId);
  } catch (error) {
    return {
      status: false,
      data: "Error fetching user profile",
    };
  }
}


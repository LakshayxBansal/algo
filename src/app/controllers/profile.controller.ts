"use server";
import { CreateProfileInputT } from "../models/profile.model";
import { getSession } from "../services/session.service";
import { createProfileDb, updateProfileDb, getProfileById } from "../services/profile.service";
import { createProfileSchema } from "../zodschema/profileSchema";
import { logger } from "../utils/logger.utils";



// export async function updateProfile(data: CreateProfileInputT, params: any) {
//   let result;
//   try {
//     const session = await getSession();

//     if (!session?.user?.dbInfo?.id) {
//       result = {
//         status: false,
//         data: [{ path: ["form"], message: "Session Error: User not logged in" }],
//       };
//       return result;
//     }
//     const parsed = createProfileSchema.safeParse(data);
//     if (!parsed.success) {
//       result = {
//         status: false,
//         data: parsed.error.issues, 
//       };
//       console.log("result", result);
//       return result;
//     }
//     const dbResult = await updateProfileDb(session, data, params);
//     console.log("dbResult", dbResult);

//     if (dbResult.status) {

//       return { status: true, data: dbResult };
//       // return { status: false, data: dbResult.data.map((err: any) => ({
//       //   error_path: err.path?.[0] || err.error_path,
//       //   error_text: err.message || err.error_text,
//       // }))};
      
//     } else {
//       console.log("dbResult", dbResult.data);
//       return { status: false, data: dbResult.data };
//     }
//   } catch (e) {
//     return {
//       status: false,
//       data: [{ path: ["form"], message: "Unknown Error in updateProfile" }],
//     };
//   }
// }


export async function createProfile(data: CreateProfileInputT) {
  let result;
  try {
    const session = await getSession();

    if (!session?.user?.dbInfo?.id) {
      result = { status: false, data: [{ path: ["form"], message: "Session Error: User not logged in" }]}
      return result;
    }

    const parsed = createProfileSchema.safeParse(data);
    
    if (!parsed.success) {
      console.log("parsed.error.issues", parsed.error.issues);
      return result ={ status: false, data: parsed.error.issues };
    }

    const dbResult = await createProfileDb(session, data as CreateProfileInputT); 
    console.log("dbResult", dbResult);
    // as CreateProfileInputT added to avoid type error
    if(dbResult.status){
      //console.log("form controller dbResult from true", dbResult);
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


export async function updateProfile(data: CreateProfileInputT, params: any) {
  let result;
  try {
    const session = await getSession();

    if (!session?.user?.dbInfo?.id) {
      return {
        status: false,
        data: [{ path: ["form"], message: "Session Error: User not logged in" }],
      };
    }

    // Collect parsing errors first
    const parsed = createProfileSchema.safeParse(data);
    let validationErrors = parsed.success ? [] : parsed.error.issues;
    console.log("validationErrors", validationErrors);

    // Call DB function regardless of parsing errors
    const dbResult = await updateProfileDb(session, data, params);
    console.log("dbResult", dbResult);

    // Collect DB errors if any
    let dbErrors = dbResult.status ? [] : dbResult.data;

    // Merge both errors and return
    let allErrors = [...validationErrors, ...dbErrors];

    if (allErrors.length > 0) {
      return { status: false, data: allErrors };
    }

    return { status: true, data: dbResult };
  } catch (e) {
    return {
      status: false,
      data: [{ path: ["form"], message: "Unknown Error in updateProfile" }],
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


"use server";

import { Session } from "next-auth";
import { CreateProfileInputT } from "../models/profile.model";
import excuteQuery from "../utils/db/db";
import { logger } from "../utils/logger.utils";
/**
 * Create a profile in the database
 *
 * @param session - The user session
 * @param profileData - The data for creating the profile
 * @returns Result from the database (or null if an error occurs)
 */

export async function createProfileDb(
  session: Session,
  profileData: CreateProfileInputT
) {
  try {
    const query = `CALL createProfile(?, ?, ?, ?, ?, ?);`;

    const values = [
      profileData.name,
      profileData.age,
      profileData.email,
      profileData.phone,
      profileData.country_id,
      profileData.state_id,
    ];


    const result = await excuteQuery({
      host: session.user.dbInfo.dbName,
      query: query,
      values: values,
    });
     console.log("result", result[0].length);
    if(result[0].length > 0){
      return { status: false, data: result[0] };
    }

    return { status: true, data: result[1][0] };
    
  } catch (error) {
    console.log("Error from service");
    logger.error("Error in createProfileDb:", error);
    return {
      status: false,
      data: [{ path: ["form"], message: "Unknown Error in createProfileDb" }],
    };
  }
}

export async function updateProfileDb(
  session: Session,
  profileData: CreateProfileInputT,
  profileId: number
) {
  try {
    const query = `CALL updateProfile(?, ?, ?, ?, ?, ?, ?);`;
    const values = [
      profileId,
      profileData.name,
      profileData.age,
      profileData.email,
      profileData.phone,
      profileData.country_id ,
      profileData.state_id ,
    ];

    const result = await excuteQuery({
      host: session.user.dbInfo.dbName,
      query: query,
      values: values,
    });
    console.log("Raw result from DB:", result);

    if (!result || result.length === 0) {
      console.error("Unexpected empty result set from DB.");
      return { status: false, data: [{ path: ["form"], message: "No data returned from DB" }] };
    }


    
    if (result[0].length > 0) {
      console.log("result[0]", result[0]);
      return { status: false, data: result[0]}; 
    }
    
    return { status: true, data: result[1][0] }; 
  } catch (error) {
    console.log("Error from service");
    logger.error("Error in updateProfileDb:", error);
    return {
      status: false,
      data: [{ path: ["form"], message: "Unknown Error in updateProfileDb" }],
    };
  }
}

export async function getProfileById(session: Session, profileId: number) {
  try {
    const query = `
  SELECT 
    p.profile_id,
    p.name,
    p.age,
    p.email,
    p.phone,
    p.country_id,
    cm.name AS country_name,
    p.state_id,
    sm.name AS state_name
  FROM 
    profile p
  LEFT JOIN 
    country_master cm ON p.country_id = cm.id  
  LEFT JOIN 
    state_master sm ON p.state_id = sm.id  
  WHERE 
    p.profile_id = ?;
`;


    const result = await excuteQuery({
      host: session.user.dbInfo.dbName,
      query: query,
      values: [profileId],
    });

    //console.log("result", result);

    return {
      status: true,
      data: result[0],
    };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return {
      status: false,
      data: "Error fetching profile",
    };
  }
}


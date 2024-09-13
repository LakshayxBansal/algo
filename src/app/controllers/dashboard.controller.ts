"use server"
import { getClosedEnquiriesDb, getEnquiriesOverviewDb, getOpenEnquiriesCountDb, getOpenEnquiriesDb, getUnassignedEnquiriesDb } from "../services/dashboard.service";
import { getSession } from "../services/session.service";
import { bigIntToNum } from "../utils/db/types";

export async function getOpenEnquiries() {
    try {
      const session = await getSession();
      if (session?.user.dbInfo) {
        const result = await getOpenEnquiriesDb(session.user.dbInfo.dbName);
        return result;
      }
    } catch (error) {
      throw error;
    }
}
export async function getOpenEnquiriesCount() {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const data = await getOpenEnquiriesCountDb(session.user.dbInfo.dbName);
      const result = data.map(bigIntToNum);
      return result;
    }
  } catch (error) {
    throw error;
  }
}
export async function getUnassignedEnquiries() {
    try {
      const session = await getSession();
      if (session?.user.dbInfo) {
        const result = await getUnassignedEnquiriesDb(session.user.dbInfo.dbName);
        return result;
      }
    } catch (error) {
      throw error;
    }
}

export async function getClosedEnquiries() {
    try {
      const session = await getSession();
      if (session?.user.dbInfo) {
        const result = await getClosedEnquiriesDb(session.user.dbInfo.dbName);
        return result;
      }
    } catch (error) {
      throw error;
    }
}
export async function getEnquiriesOverview() {
    try {
      const session = await getSession();
      if (session?.user.dbInfo) {
        const data = await getEnquiriesOverviewDb(session.user.dbInfo.dbName);
        const result = data.map(bigIntToNum);
        return result;
      }
    } catch (error) {
      throw error;
    }
}
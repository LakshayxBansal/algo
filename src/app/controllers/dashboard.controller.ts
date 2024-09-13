"use server"
import { getClosedEnquiriesDb, getOpenEnquiriesDb, getUnassignedEnquiriesDb } from "../services/dashboard.service";
import { getSession } from "../services/session.service";

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
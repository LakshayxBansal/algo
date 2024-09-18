"use server"
import { getSession } from "../services/session.service";
import { getCallEnquiriesDb } from "../services/callExplorer.service";

export async function getCallEnquiries(filterValueState: any) {
    try {
      const session = await getSession();
      if (session?.user.dbInfo) {
        const result = await getCallEnquiriesDb(session.user.dbInfo.dbName,filterValueState);
        return result;
      }
    } catch (error) {
      throw error;
    }
  }
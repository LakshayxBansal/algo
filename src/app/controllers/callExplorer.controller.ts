"use server";
import { getSession } from "../services/session.service";
import { getCallEnquiriesDb } from "../services/callExplorer.service";

export async function getCallEnquiries(
  filterValueState: any,
  filterType: string,
  selectedStatus: string | null,
  callFilter: string,
  dateFilter: string
) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const result = await getCallEnquiriesDb(
        session.user.dbInfo.dbName,
        filterValueState,
        filterType,
        selectedStatus,
        callFilter,
        dateFilter
      );
      return result;
    }
  } catch (error) {
    throw error;
  }
}

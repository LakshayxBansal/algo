"use server";
import { getSession } from "../services/session.service";
import {
  getCallEnquiriesCountDb,
  getCallEnquiriesDb,
  updateCallAllocationDb,
} from "../services/callExplorer.service";

export async function getCallEnquiries(
  filterValueState: any,
  filterType: string,
  selectedStatus: string | null,
  callFilter: string,
  dateFilter: string,
  page: number,
  pageSize: number
) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      // const result = await getCallEnquiriesDb(
      //   session.user.dbInfo.dbName,
      //   filterValueState,
      //   filterType,
      //   selectedStatus,
      //   callFilter,
      //   dateFilter,
      //   page,
      //   pageSize
      // );
      // const rowCount = await getCallEnquiriesCountDb(
      //   session.user.dbInfo.dbName,
      //   filterValueState,
      //   filterType,
      //   selectedStatus,
      //   callFilter,
      //   dateFilter
      // );
      // return result;
      const result = await getCallEnquiriesDb(
        session.user.dbInfo.dbName,
        filterValueState,
        filterType,
        selectedStatus,
        callFilter,
        dateFilter,
        page,
        pageSize
      );

      // Fetch the total row count (with the same filters applied)
      const count = await getCallEnquiriesCountDb(
        session.user.dbInfo.dbName,
        filterValueState,
        filterType,
        selectedStatus,
        callFilter,
        dateFilter
      );

      // Return both result and count as separate variables in an object
      return {
        result,
        count,
      };
    }
  } catch (error) {
    throw error;
  }
}

export async function updateCallAllocation(
  executiveId: number,
  remark: string,
  id: Array<number>
) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const data = { executiveId, remark, id };
      const result = await updateCallAllocationDb(
        session.user.dbInfo.dbName,
        data
      );
      return result.affectedRows;
    }
  } catch (error) {
    throw error;
  }
}

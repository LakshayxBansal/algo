"use server";
import { getSession } from "../services/session.service";
import {
  getCallEnquiriesCountDb,
  getCallEnquiriesDb,
  getCallEnquiriesDetailsDb,
  getCallSupportDetailsDb,
  getCallSupportTicketsCountDb,
  getCallSupportTicketsDb,
  updateCallAllocationDb,
  updateSupportCallAllocationDb,
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
        session.user.userId,
        data
      );
      return result.affectedRows;
    }
  } catch (error) {
    throw error;
  }
}

export async function updateSupportCallAllocation(
  executiveId: number,
  remark: string,
  id: Array<number>
) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const data = { executiveId, remark, id };
      const result = await updateSupportCallAllocationDb(
        session.user.dbInfo.dbName,
        session.user.userId,
        data
      );
      return result.affectedRows;
    }
  } catch (error) {
    throw error;
  }
}

export async function getCallEnquiryDetails(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const result = await getCallEnquiriesDetailsDb(
        session.user.dbInfo.dbName,
        id
      );

      // console.log("res", result);
      return result;
    }
  } catch (error) {
    throw error;
  }
}


export async function getCallSupportEnquiries(
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
      const result = await getCallSupportTicketsDb(
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
      const count = await getCallSupportTicketsCountDb(
        session.user.dbInfo.dbName,
        filterValueState,
        filterType,
        selectedStatus,
        callFilter,
        dateFilter
      );

      // const count = result.length;

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

export async function getCallSupportDetails(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const result = await getCallSupportDetailsDb(
        session.user.dbInfo.dbName,
        id
      );

      // console.log("res", result);
      return result;
    }
  } catch (error) {
    throw error;
  }
}
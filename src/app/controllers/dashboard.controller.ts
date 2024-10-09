"use server";
import {
  getAverageAgeDb,
  getClosedEnquiriesCountDb,
  getExecutiveEnquiriesOverviewDb,
  getOpenEnquiriesCountDb,
  getOpenEnquiriesDb,
  getOverviewGraphDataDb,
  getUnassignedEnquiriesDb,
} from "../services/dashboard.service";
import { getSession } from "../services/session.service";
import { bigIntToNum } from "../utils/db/types";

export async function getOpenEnquiries() {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const data = await getOpenEnquiriesDb(session.user.dbInfo.dbName);
      const result = data.map(bigIntToNum);
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
      const result = data?.map(bigIntToNum);
      return result[0];
    }
  } catch (error) {
    throw error;
  }
}

export async function getUnassignedEnquiries() {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const data = await getUnassignedEnquiriesDb(session.user.dbInfo.dbName);
      const result = data?.map(bigIntToNum);
      return result[0];
    }
  } catch (error) {
    throw error;
  }
}

export async function getClosedEnquiriesCount() {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const data = await getClosedEnquiriesCountDb(session.user.dbInfo.dbName);
      const result = data.map(bigIntToNum);
      return result[0];
    }
  } catch (error) {
    throw error;
  }
}

export async function getExecutiveEnquiriesOverview() {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const data = await getExecutiveEnquiriesOverviewDb(
        session.user.dbInfo.dbName
      );
      const result = [data[0].map(bigIntToNum), data[1].map(bigIntToNum)];

      return result;
    }
  } catch (error) {
    throw error;
  }
}

export async function getOverviewGraphData() {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const data = await getOverviewGraphDataDb(session.user.dbInfo.dbName);
      const result = [];
      for (let i = 0; i < data.length - 1; i++) {
        result.push(data[i].map(bigIntToNum));
      }

      return result;
    }
  } catch (error) {
    throw error;
  }
}

export async function getAverageAge() {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const result = await getAverageAgeDb(session.user.dbInfo.dbName);
      return result[0];
    }
  } catch (error) {
    throw error;
  }
}

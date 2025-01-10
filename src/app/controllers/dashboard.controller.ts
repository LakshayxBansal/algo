"use server";
import {
  getAverageAgeDb,
  getClosedEnquiriesCountDb,
  getExecutiveEnquiriesOverviewDb,
  getOpenEnquiriesCountDb,
  getOpenEnquiriesDb,
  getOpenTicketsCountDb,
  getOverviewGraphDataDb,
  getUnassignedEnquiriesDb,
  getClosedTicketsCountDb,
  getUnassignedTicketsDb,
  getAverageTicketAgeDb,
  getRecentTicketsDb,
  getOverviewGraphDataTicketsDb,
  getExecutiveTicketsOverviewDb
} from "../services/dashboard.service";
import { getSession } from "../services/session.service";
import { bigIntToNum } from "../utils/db/types";

export async function getOpenEnquiries() {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const data = await getOpenEnquiriesDb(session.user.dbInfo.dbName);
      let result = data.map(bigIntToNum);
      result = result.map((enquiry: any) => {
        return {
          ...enquiry,
          created_on: enquiry.created_on.toDateString()
        }
      })
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

export async function getOpenTicketsCount() {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const data = await getOpenTicketsCountDb(session.user.dbInfo.dbName);
      const result = data?.map(bigIntToNum);
      return result[0];
    }
  } catch (error) {
    throw error;
  }
}

export async function getClosedTicketsCount() {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const data = await getClosedTicketsCountDb(session.user.dbInfo.dbName);
      const result = data.map(bigIntToNum);
      return result[0];
    }
  } catch (error) {
    throw error;
  }
}

export async function getUnassignedTickets() {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const data = await getUnassignedTicketsDb(session.user.dbInfo.dbName);
      const result = data?.map(bigIntToNum);
      return result[0];
    }
  } catch (error) {
    throw error;
  }
}

export async function getAverageTicketAge() {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const result = await getAverageTicketAgeDb(session.user.dbInfo.dbName);
      return result[0];
    }
  } catch (error) {
    throw error;
  }
}

export async function getRecentTickets() {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const data = await getRecentTicketsDb(session.user.dbInfo.dbName);
      let result = data.map(bigIntToNum);
      result = result.map((enquiry: any) => {
        return {
          ...enquiry,
          created_on: enquiry.created_on.toDateString()
        }
      })
      return result;
    }
  } catch (error) {
    throw error;
  }
}

export async function getExecutiveTicketsOverview() {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const data = await getExecutiveTicketsOverviewDb(
        session.user.dbInfo.dbName
      );
      const result = [data[0].map(bigIntToNum), data[1].map(bigIntToNum)];

      return result;
    }
  } catch (error) {
    throw error;
  }
}

export async function getOverviewGraphTicketsData() {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const data = await getOverviewGraphDataTicketsDb(session.user.dbInfo.dbName);
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

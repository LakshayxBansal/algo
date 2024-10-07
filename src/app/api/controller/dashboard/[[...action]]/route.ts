import { NextRequest, NextResponse } from "next/server";
import {
  getOpenEnquiriesCount,
  getUnassignedEnquiries,
  getClosedEnquiriesCount,
  getAverageAge,
  getOpenEnquiries,
  getExecutiveEnquiriesOverview,
} from "@/app/controllers/dashboard.controller";

type fnRouteT = (req: NextRequest) => Promise<NextResponse>;

type callRouteT = {
  key: string;
  fnRoute: fnRouteT;
};

const callRoute: callRouteT[] = [
  {
    key: "getOpenEnquiriesCount",
    fnRoute: getOpenEnquiriesCountRoute,
  },
  {
    key: "getUnassignedEnquiries",
    fnRoute: getUnassignedEnquiriesRoute,
  },
  {
    key: "getClosedEnquiriesCount",
    fnRoute: getClosedEnquiriesCountRoute,
  },
  {
    key: "getAverageAge",
    fnRoute: getAverageAgeRoute,
  },
  {
    key: "getOpenEnquiries",
    fnRoute: getOpenEnquiriesRoute,
  },
  {
    key: "getExecutiveEnquiriesOverview",
    fnRoute: getExecutiveEnquiriesOverviewRoute,
  },
];

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { error: "Invalid action or missing route" },
    { status: 400 }
  );
}

export async function POST(req: NextRequest, res: NextResponse) {
  const action: string | undefined = new URL(req.url).pathname.split("/").pop();

  let route;

  if (action && (route = callRoute.find((route) => route.key === action))) {
    return route.fnRoute(req);
  }

  return NextResponse.json(
    { error: "Invalid action or missing route" },
    { status: 400 }
  );
}

async function getOpenEnquiriesCountRoute(req: NextRequest) {
  try {
    const result = await getOpenEnquiriesCount();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}

async function getUnassignedEnquiriesRoute(req: NextRequest) {
  try {
    const result = await getUnassignedEnquiries();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}

async function getClosedEnquiriesCountRoute(req: NextRequest) {
  try {
    const result = await getClosedEnquiriesCount();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}

async function getAverageAgeRoute(req: NextRequest) {
  try {
    const result = await getAverageAge();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}

async function getOpenEnquiriesRoute(req: NextRequest) {
  try {
    const result = await getOpenEnquiries();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}

async function getExecutiveEnquiriesOverviewRoute(req: NextRequest) {
  try {
    const result = await getExecutiveEnquiriesOverview();
    console.log(result);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}

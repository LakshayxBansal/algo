import { getEnquiriesByExecutiveId } from "@/app/controllers/executive.controller";
import { NextRequest, NextResponse } from "next/server";

type fnRouteT = (req: NextRequest) => Promise<NextResponse>;

type callRouteT = {
  key: string;
  fnRoute: fnRouteT;
};

const callRoute: callRouteT[] = [
  {
    key: "getEnquiriesByExecutiveId",
    fnRoute: getEnquiriesByExecutiveIdRoute,
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

async function getEnquiriesByExecutiveIdRoute(req: NextRequest) {
  try {
    const result = await getEnquiriesByExecutiveId();
    console.log(result);
    
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}
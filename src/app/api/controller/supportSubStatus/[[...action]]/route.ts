import { getSupportSubStatus } from "@/app/controllers/supportSubStatus.controller";
import { NextRequest, NextResponse } from "next/server";

type fnRouteT = (req: NextRequest) => Promise<NextResponse>;

type callRouteT = {
  key: string;
  fnRoute: fnRouteT;
};

const callRoute: callRouteT[] = [
  {
    key: "getSupportSubStatus",
    fnRoute: getSupportSubStatusRoute,
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

async function getSupportSubStatusRoute(req: NextRequest) {
  try {
    const { searchStr, status } = await req.json();
    const result = await getSupportSubStatus(searchStr, status);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}
import { getSession, updateSession } from "@/app/services/session.service";
import { NextRequest, NextResponse } from "next/server";

type fnRouteT = (req: NextRequest) => Promise<NextResponse>;

type callRouteT = {
  key: string;
  fnRoute: fnRouteT;
};

const callRoute: callRouteT[] = [
  {
    key: "getSession",
    fnRoute: getSessionRoute,
  },
  {
    key: "updateSession",
    fnRoute: updateSessionRoute,
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

async function getSessionRoute(req: NextRequest) {
  try {
    const result = await getSession();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}
async function updateSessionRoute(req: NextRequest) {
  try {
    const { row, userId } = await req.json();
    let result = await updateSession(row, userId);
    if (result !== null) {
      result = { status: true };
    } else {
      result = { status: false };
    }
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}

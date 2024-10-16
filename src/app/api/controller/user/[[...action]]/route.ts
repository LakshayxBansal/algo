import { NextRequest, NextResponse } from "next/server";
import {
  getInviteByUserContact,
  getTotalInvite,
} from "@/app/controllers/user.controller";

type fnRouteT = (req: NextRequest) => Promise<NextResponse>;

type callRouteT = {
  key: string;
  fnRoute: fnRouteT;
};

const callRoute: callRouteT[] = [
  {
    key: "getTotalInvite",
    fnRoute: getTotalInviteRoute,
  },
  {
    key: "getInviteByUserContact",
    fnRoute: getInviteByUserContactRoute,
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

async function getInviteByUserContactRoute(req: NextRequest) {
  try {
    const { page, filter, limit } = await req.json();
    const result = await getInviteByUserContact(page, filter, limit);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}

async function getTotalInviteRoute(req: NextRequest) {
  try {
    const result = await getTotalInvite();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Get the request body as a JSON object
  const body = await request.json();
  // Log the body to the console or process it further
  console.log("Received request body:", body);
  return NextResponse.json({ status: "Success" });
}
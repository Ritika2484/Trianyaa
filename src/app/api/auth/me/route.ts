import { authenticateRequest } from "@/lib/server-auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const authResult = await authenticateRequest(request);
  if ("response" in authResult) return authResult.response;

  return NextResponse.json({
    uid: authResult.uid,
    email: authResult.email,
    isAdmin: authResult.isAdmin,
  });
}

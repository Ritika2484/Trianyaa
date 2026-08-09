import { authenticateRequest } from "@/lib/server-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const authResult = await authenticateRequest(request);
  if ("response" in authResult) return authResult.response;

  return Response.json({
    uid: authResult.uid,
    email: authResult.email,
    isAdmin: authResult.isAdmin,
  });
}

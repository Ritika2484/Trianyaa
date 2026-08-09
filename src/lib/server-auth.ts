import type { DecodedIdToken } from "firebase-admin/auth";
import { getFirebaseAdminAuth } from "@/lib/firebase-admin";

export interface AuthenticatedUser {
  uid: string;
  email: string | null;
  isAdmin: boolean;
  token: DecodedIdToken;
}

type AuthResult = AuthenticatedUser | { response: Response };

// Keep the existing admin account usable on deployments where the ignored
// `.env.local` file has not been copied into the hosting provider yet. The
// server still verifies the Firebase ID token before this value is checked.
const DEFAULT_ADMIN_EMAIL = "admin@gmail.com";

function getBearerToken(request: Request): string | null {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return null;
  return authorization.slice("Bearer ".length).trim() || null;
}

function hasAdminRole(token: DecodedIdToken): boolean {
  const claims = token as DecodedIdToken & { admin?: boolean; role?: string };
  const allowlistedEmails = new Set(
    (process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL)
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  );

  return (
    claims.admin === true ||
    claims.role === "admin" ||
    (!!token.email && allowlistedEmails.has(token.email.toLowerCase()))
  );
}

export async function authenticateRequest(request: Request): Promise<AuthResult> {
  const idToken = getBearerToken(request);
  if (!idToken) {
    return { response: Response.json({ error: "Authentication required." }, { status: 401 }) };
  }

  try {
    const token = await getFirebaseAdminAuth().verifyIdToken(idToken);
    return {
      uid: token.uid,
      email: token.email ?? null,
      isAdmin: hasAdminRole(token),
      token,
    };
  } catch {
    return { response: Response.json({ error: "Invalid or expired authentication token." }, { status: 401 }) };
  }
}

export async function requireAdmin(request: Request): Promise<AuthResult> {
  const result = await authenticateRequest(request);
  if ("response" in result) return result;
  if (!result.isAdmin) {
    return { response: Response.json({ error: "Admin access required." }, { status: 403 }) };
  }
  return result;
}

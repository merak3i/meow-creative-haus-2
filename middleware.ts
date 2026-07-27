import { NextRequest, NextResponse } from "next/server";

const REDIRECT_HOSTS = new Set([
  "meowcreativehaus.vercel.app",
  "www.meowcreativehaus.xyz",
]);

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();

  if (!host || !REDIRECT_HOSTS.has(host)) {
    return NextResponse.next();
  }

  const destination = request.nextUrl.clone();
  destination.protocol = "https:";
  destination.hostname = "meowcreativehaus.xyz";
  destination.port = "";

  return NextResponse.redirect(destination, 308);
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/change-language" &&
    request.method === "POST"
  ) {
    const lang = request.nextUrl.searchParams.get("lang") || "az";

    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set("lang", lang, { path: "/" });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/change-language"],
};

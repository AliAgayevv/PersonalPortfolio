// app/api/change-language/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const lang = formData.get("lang") === "en" ? "en" : "az";

  const response = NextResponse.redirect(
    new URL(request.headers.get("referer") || "/", request.url)
  );
  response.cookies.set("lang", lang, { path: "/" });

  return response;
}

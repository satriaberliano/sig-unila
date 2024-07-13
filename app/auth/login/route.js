import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(request = NextRequest) {
  const url = new URL(request.url);
  const cookieStore = cookies();

  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = createRouteHandlerClient({
    cookie: () => {
      return cookieStore;
    },
  });

  await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return NextResponse.redirect(url.origin, {
    status: 302,
  });
}

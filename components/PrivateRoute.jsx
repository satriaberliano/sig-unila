import supabaseServer from "@/lib/supabaseServer";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PrivateRoute({ children }) {
  // const supabase = createServerComponentClient({ cookies });

  const { data } = await supabaseServer().auth.getSession();

  if (data.session) {
    redirect("/dashboard");
  }
  return <main>{children}</main>;
}

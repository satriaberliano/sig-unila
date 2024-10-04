import ContentAdmin from "@/components/Admin/ContentAdmin/ContentAdmin";
import NavbarAdmin from "@/components/Admin/NavbarAdmin/NavbarAdmin";
import supabaseServer from "@/lib/supabaseServer";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function AdminLayout({ children }) {
  // const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabaseServer().auth.getUser();

  if (!user) {
    redirect("/admin");
  }

  return (
    <div className="h-screen">
      <NavbarAdmin />
      <ContentAdmin>{children}</ContentAdmin>
    </div>
  );
}

export default AdminLayout;

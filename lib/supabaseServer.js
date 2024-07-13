import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default () => {
  cookies().getAll();
  return createServerComponentClient({ cookies });
};

// import { createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers";

// export default async function supabaseServer() {
//   const cookieStore = cookies();

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//     {
//       cookies: {
//         getAll() {
//           return cookieStore.getAll();
//         },
//       },
//     }
//   );

//   return supabase;
// }

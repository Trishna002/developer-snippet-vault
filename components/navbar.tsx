import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/actions/auth";

export async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return <header className="border-b bg-white/90 backdrop-blur sticky top-0 z-20">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
      <Link href={user ? "/dashboard" : "/"} className="text-xl font-black tracking-tight">Snippet<span className="gradient-text">Vault</span></Link>
      <nav className="flex items-center gap-3 text-sm">
        {user ? <>
          <Link href="/dashboard" className="rounded-lg px-3 py-2 hover:bg-gray-100">Dashboard</Link>
          <Link href="/snippets/new" className="rounded-lg bg-gray-900 px-4 py-2 font-semibold text-white hover:bg-gray-700">+ New Snippet</Link>
          <form action={logout}><button className="rounded-lg border px-3 py-2 hover:bg-gray-50">Logout</button></form>
        </> : <>
          <Link href="/login" className="rounded-lg px-3 py-2 hover:bg-gray-100">Login</Link>
          <Link href="/signup" className="rounded-lg bg-gray-900 px-4 py-2 font-semibold text-white">Get Started</Link>
        </>}
      </nav>
    </div>
  </header>;
}

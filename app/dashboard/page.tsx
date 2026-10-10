import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Snippet } from "@/lib/types";

export const dynamic = "force-dynamic";
export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: snippets, error } = await supabase.from("snippets").select("*").order("created_at", {ascending:false}) as {data:Snippet[]|null,error:any};
  return <main className="mx-auto max-w-6xl px-5 py-10">
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold text-purple-600">YOUR LIBRARY</p><h1 className="mt-1 text-4xl font-black">Snippet Dashboard</h1><p className="mt-2 text-gray-500">{snippets?.length || 0} saved snippets · {user.email}</p></div><Link href="/snippets/new" className="rounded-xl bg-gray-900 px-5 py-3 font-bold text-white">+ New Snippet</Link></div>
    {error ? <div className="rounded-xl bg-red-50 p-4 text-red-700">Could not load snippets: {error.message}</div> : !snippets?.length ? <div className="rounded-2xl border border-dashed bg-white p-16 text-center"><h2 className="text-2xl font-black">Your vault is empty</h2><p className="mt-2 text-gray-500">Save your first code snippet and let Gemini organize it.</p><Link href="/snippets/new" className="mt-6 inline-block rounded-xl bg-purple-600 px-5 py-3 font-bold text-white">Create First Snippet</Link></div> : <div className="grid gap-5 md:grid-cols-2">{snippets.map(s=><Link href={`/snippets/${s.id}`} key={s.id} className="group rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"><div className="flex items-start justify-between gap-4"><div><h2 className="text-xl font-black group-hover:text-purple-600">{s.title}</h2><p className="mt-1 text-xs font-bold uppercase tracking-wider text-gray-400">{s.language}</p></div><span className="rounded-lg bg-gray-100 px-2 py-1 text-xs">View →</span></div><p className="mt-5 line-clamp-2 leading-6 text-gray-600">{s.summary}</p><div className="mt-5 flex flex-wrap gap-2">{s.tags.map(tag=><span key={tag} className="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700">#{tag}</span>)}</div></Link>)}</div>}
  </main>;
}

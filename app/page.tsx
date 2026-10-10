import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return <main>
    <section className="mx-auto max-w-6xl px-5 py-24 text-center">
      <span className="rounded-full bg-purple-50 px-4 py-2 text-sm font-bold text-purple-700">AI-powered developer knowledge base</span>
      <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-black tracking-tight md:text-7xl">Your code deserves a <span className="gradient-text">smarter library.</span></h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">Save reusable code, technical notes and Markdown documentation. Gemini automatically explains your snippets and organizes them with useful tags.</p>
      <div className="mt-9 flex justify-center gap-3"><Link href={user?"/dashboard":"/signup"} className="rounded-xl bg-gray-900 px-6 py-3 font-bold text-white">{user?"Open Dashboard":"Start Building"}</Link><Link href={user?"/snippets/new":"/login"} className="rounded-xl border bg-white px-6 py-3 font-bold">{user?"Save a Snippet":"I already have an account"}</Link></div>
    </section>
    <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-20 md:grid-cols-3">
      {[['01','Save','Keep your useful code snippets in one searchable personal vault.'],['02','Understand','Gemini generates a plain-English summary and relevant tags automatically.'],['03','Own','Authentication and database security ensure every user sees only their own snippets.']].map(([n,t,d])=><div key={n} className="rounded-2xl border bg-white p-6 shadow-sm"><span className="text-sm font-black text-purple-600">{n}</span><h2 className="mt-4 text-xl font-black">{t}</h2><p className="mt-2 leading-7 text-gray-600">{d}</p></div>)}
    </section>
  </main>;
}

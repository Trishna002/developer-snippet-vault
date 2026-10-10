import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Snippet } from "@/lib/types";
import { SnippetForm } from "@/components/snippet-form";
export default async function EditSnippetPage({params}:{params:Promise<{id:string}>}){ const {id}=await params; const supabase=await createClient(); const {data:{user}}=await supabase.auth.getUser(); if(!user) redirect('/login'); const {data}=await supabase.from('snippets').select('*').eq('id',id).single(); if(!data) notFound(); return <main className="mx-auto max-w-4xl px-5 py-10"><div className="mb-8"><p className="text-sm font-bold text-purple-600">EDIT SNIPPET</p><h1 className="mt-1 text-4xl font-black">Update your snippet</h1></div><div className="rounded-2xl border bg-white p-6 shadow-sm"><SnippetForm snippet={data as Snippet}/></div></main>; }

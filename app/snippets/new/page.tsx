import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SnippetForm } from "@/components/snippet-form";
export default async function NewSnippetPage(){ const supabase=await createClient(); const {data:{user}}=await supabase.auth.getUser(); if(!user) redirect('/login'); return <main className="mx-auto max-w-4xl px-5 py-10"><div className="mb-8"><p className="text-sm font-bold text-purple-600">NEW SNIPPET</p><h1 className="mt-1 text-4xl font-black">Add to your vault</h1><p className="mt-2 text-gray-500">Paste code and Gemini will generate the documentation metadata.</p></div><div className="rounded-2xl border bg-white p-6 shadow-sm"><SnippetForm /></div></main>; }

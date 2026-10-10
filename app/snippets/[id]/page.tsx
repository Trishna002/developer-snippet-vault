import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Snippet } from "@/lib/types";
import { SnippetView } from "@/components/snippet-view";
export default async function SnippetPage({params}:{params:Promise<{id:string}>}){ const {id}=await params; const supabase=await createClient(); const {data:{user}}=await supabase.auth.getUser(); if(!user) redirect('/login'); const {data}=await supabase.from('snippets').select('*').eq('id',id).single(); if(!data) notFound(); return <SnippetView snippet={data as Snippet}/>; }

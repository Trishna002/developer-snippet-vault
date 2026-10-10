"use client";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Snippet } from "@/lib/types";
import Link from "next/link";
import DeleteButton from "@/components/delete-button";

export function SnippetView({ snippet }: { snippet: Snippet }) {
  return <main className="mx-auto max-w-5xl px-5 py-10">
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4"><div><div className="mb-3 flex flex-wrap gap-2">{snippet.tags.map(tag=><span key={tag} className="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700">#{tag}</span>)}</div><h1 className="text-4xl font-black tracking-tight">{snippet.title}</h1><p className="mt-2 text-sm text-gray-500">{snippet.language} · updated {new Date(snippet.updated_at).toLocaleDateString()}</p></div><div className="flex gap-2"><Link href={`/snippets/${snippet.id}/edit`} className="rounded-lg border px-3 py-2 text-sm font-semibold hover:bg-white">Edit</Link><DeleteButton id={snippet.id}/></div></div>
    <section className="mb-6 rounded-2xl border bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-purple-600">AI Summary</p><p className="mt-2 text-lg leading-7 text-gray-700">{snippet.summary}</p></section>
    {snippet.notes && <section className="mb-6 rounded-2xl border bg-white p-6 shadow-sm prose prose-gray max-w-none"><ReactMarkdown>{snippet.notes}</ReactMarkdown></section>}
    <section className="overflow-hidden rounded-2xl border shadow-sm"><SyntaxHighlighter language={snippet.language === "cpp" ? "cpp" : snippet.language} style={oneDark} customStyle={{margin:0,padding:"24px",fontSize:"14px",minHeight:"300px"}}>{snippet.code}</SyntaxHighlighter></section>
  </main>;
}

"use client";
import { useActionState } from "react";
import { createSnippet, updateSnippet } from "@/actions/snippets";
import type { Snippet } from "@/lib/types";

const languages = ["javascript","typescript","python","java","cpp","c","sql","html","css","bash","json","markdown","text"];
type State = { error?: string } | null;

export function SnippetForm({ snippet }: { snippet?: Snippet }) {
  const action = snippet ? updateSnippet.bind(null, snippet.id) : createSnippet;
  const [state, formAction, pending] = useActionState<State, FormData>(action, null);
  return <form action={formAction} className="space-y-5">
    <div className="grid gap-5 md:grid-cols-2">
      <label className="text-sm font-semibold">Title<input name="title" required defaultValue={snippet?.title} className="mt-2 w-full rounded-xl border bg-white px-4 py-3 outline-none focus:border-purple-500" placeholder="e.g. React API fetch helper" /></label>
      <label className="text-sm font-semibold">Language<select name="language" defaultValue={snippet?.language || "javascript"} className="mt-2 w-full rounded-xl border bg-white px-4 py-3 outline-none focus:border-purple-500">{languages.map(x=><option key={x}>{x}</option>)}</select></label>
    </div>
    <label className="block text-sm font-semibold">Code<textarea name="code" required defaultValue={snippet?.code} className="code-area mt-2 w-full rounded-xl border bg-gray-950 px-4 py-4 text-sm text-gray-100 outline-none focus:border-purple-500" placeholder="Paste your code here..." /></label>
    <label className="block text-sm font-semibold">Technical Notes <span className="font-normal text-gray-400">(optional)</span><textarea name="notes" defaultValue={snippet?.notes || ""} rows={4} className="mt-2 w-full rounded-xl border bg-white px-4 py-3 outline-none focus:border-purple-500" placeholder="What problem does this solve? Any useful context?" /></label>
    {state?.error && <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{state.error}</div>}
    <div className="flex items-center justify-between gap-4"><p className="text-sm text-gray-500">Gemini will generate 3–5 tags and a one-sentence summary.</p><button disabled={pending} className="rounded-xl bg-gray-900 px-6 py-3 font-bold text-white disabled:opacity-50">{pending ? "Analyzing with Gemini..." : snippet ? "Update Snippet" : "Save Snippet"}</button></div>
  </form>;
}

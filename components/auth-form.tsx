"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const supabase = createClient();
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [loading,setLoading]=useState(false); const [error,setError]=useState("");
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError("");
    const result = mode === "login" ? await supabase.auth.signInWithPassword({email,password}) : await supabase.auth.signUp({email,password});
    if (result.error) setError(result.error.message);
    else if (mode === "signup" && !result.data.session) setError("Account created. Check your email to confirm your account, then log in.");
    else router.push("/dashboard");
    setLoading(false);
  }
  return <div className="mx-auto mt-16 max-w-md px-5">
    <div className="rounded-2xl border bg-white p-8 shadow-sm">
      <div className="mb-7"><p className="text-sm font-semibold text-purple-600">DEVELOPER SNIPPET VAULT</p><h1 className="mt-2 text-3xl font-black">{mode === "login" ? "Welcome back" : "Create your account"}</h1><p className="mt-2 text-sm text-gray-500">{mode === "login" ? "Access your private snippet library." : "Save code and let Gemini document it for you."}</p></div>
      <form onSubmit={submit} className="space-y-4">
        <label className="block text-sm font-semibold">Email<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-purple-500" placeholder="you@example.com" /></label>
        <label className="block text-sm font-semibold">Password<input required minLength={6} type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-purple-500" placeholder="At least 6 characters" /></label>
        {error && <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        <button disabled={loading} className="w-full rounded-xl bg-gray-900 py-3 font-bold text-white disabled:opacity-50">{loading ? "Please wait..." : mode === "login" ? "Log In" : "Create Account"}</button>
      </form>
      <p className="mt-5 text-center text-sm text-gray-500">{mode === "login" ? <>New here? <Link className="font-semibold text-purple-600" href="/signup">Create an account</Link></> : <>Already have an account? <Link className="font-semibold text-purple-600" href="/login">Log in</Link></>}</p>
    </div>
  </div>;
}

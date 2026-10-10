"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { generateSnippetAI } from "@/lib/gemini";

async function currentUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return { supabase, user };
}

// CREATE SNIPPET
export async function createSnippet(
  _prevState: { error?: string } | null,
  formData: FormData
) {
  const { supabase, user } = await currentUser();

  const title = String(formData.get("title") || "").trim();
  const code = String(formData.get("code") || "").trim();
  const language = String(formData.get("language") || "text");
  const notes = String(formData.get("notes") || "").trim();

  if (!title || !code) {
    return { error: "Title and code are required." };
  }

  let tags = [language];
  let summary = "A saved developer code snippet.";

  try {
    const ai = await generateSnippetAI(title, language, code, notes);

    tags = ai.tags.length > 0 ? ai.tags : tags;
    summary = ai.summary;
  } catch (error) {
    console.error("Gemini error:", error);

    return {
      error:
        error instanceof Error
          ? `AI generation failed: ${error.message}`
          : "AI generation failed. Check the server terminal.",
    };
  }

  const { error } = await supabase.from("snippets").insert({
    user_id: user.id,
    title,
    code,
    language,
    notes: notes || null,
    tags,
    summary,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

// UPDATE SNIPPET
export async function updateSnippet(
  id: string,
  _prevState: { error?: string } | null,
  formData: FormData
) {
  const { supabase, user } = await currentUser();

  const title = String(formData.get("title") || "").trim();
  const code = String(formData.get("code") || "").trim();
  const language = String(formData.get("language") || "text");
  const notes = String(formData.get("notes") || "").trim();

  if (!title || !code) {
    return { error: "Title and code are required." };
  }

  const { error } = await supabase
    .from("snippets")
    .update({
      title,
      code,
      language,
      notes: notes || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath(`/snippets/${id}`);
  redirect("/dashboard");
}

// DELETE SNIPPET
export async function deleteSnippet(id: string) {
  const { supabase, user } = await currentUser();

  const { error } = await supabase
    .from("snippets")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

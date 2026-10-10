"use client";

import { useTransition } from "react";
import { deleteSnippet } from "@/actions/snippets";

export default function DeleteButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("Delete this snippet?")) {
      return;
    }

    startTransition(async () => {
      const result = await deleteSnippet(id);

      if (result?.error) {
        alert(`Failed to delete snippet: ${result.error}`);
      }
    });
  }

  return (
    <button
      disabled={pending}
      onClick={handleDelete}
      className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
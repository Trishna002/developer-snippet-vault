# Developer Snippet Vault & AI Publisher

A full-stack Next.js application for authenticated developers to save code snippets and technical notes. Gemini automatically creates 3–5 tags and a one-sentence plain-English summary when a snippet is saved.

## Stack
- Next.js App Router
- Supabase Auth + PostgreSQL + Row Level Security
- Google Gemini via `@google/genai`
- Tailwind CSS
- Vercel

## Local setup
1. Create a Supabase project.
2. Run `supabase-schema.sql` in Supabase SQL Editor.
3. Copy `.env.example` to `.env.local` and add Supabase URL, publishable key and Gemini API key.
4. Run `npm install` then `npm run dev`.
5. Open `http://localhost:3000`.

For easiest demo setup, in Supabase Authentication settings you can disable email confirmation. If confirmation stays enabled, configure the confirmation email to use `/auth/confirm?token_hash={{ .TokenHash }}&type=email`.

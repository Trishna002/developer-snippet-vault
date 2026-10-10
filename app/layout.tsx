import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "SnippetVault — Developer Snippet Manager",
  description: "Save, organize and understand developer snippets with Gemini AI."
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Navbar />{children}</body></html>;
}

export type Snippet = {
  id: string;
  user_id: string;
  title: string;
  code: string;
  language: string;
  notes: string | null;
  tags: string[];
  summary: string;
  created_at: string;
  updated_at: string;
};

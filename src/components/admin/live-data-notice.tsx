import { AlertCircle } from "lucide-react";

interface LiveDataNoticeProps {
  live: boolean;
}

export function LiveDataNotice({ live }: LiveDataNoticeProps) {
  if (live) {
    return null;
  }

  return (
    <div className="mb-6 flex items-start gap-3 rounded-[1.5rem] border border-cyan/20 bg-cyan/10 px-4 py-3 text-sm text-primary">
      <AlertCircle className="mt-0.5 size-4 shrink-0" />
      <p>
        Demo content is being shown because the Supabase tables or policies are not
        ready yet. CRUD actions will work after running the provided SQL schema.
      </p>
    </div>
  );
}

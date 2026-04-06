interface AdminPageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function AdminPageHeader({
  eyebrow,
  title,
  description,
}: AdminPageHeaderProps) {
  return (
    <div className="sticky top-0 z-20 -mx-4 -mt-4 mb-8 bg-slate-50/80 px-4 py-6 backdrop-blur-md sm:-mx-6 sm:-mt-6 sm:px-6 lg:-mx-8 lg:-mt-8 lg:px-8 border-b border-slate-200/50 transition-all">
      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan">
        {eyebrow}
      </p>
      <h1 className="mt-2 font-display text-3xl font-black tracking-tight text-primary uppercase">
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-xs font-medium text-slate-500 leading-relaxed font-manrope">{description}</p>
    </div>
  );
}

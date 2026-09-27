import { cn } from "@/lib/utils/cn";

type Tone = "green" | "amber" | "slate" | "red" | "blue";

const tones: Record<Tone, string> = {
  green: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  amber: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  slate: "border-slate-500/40 bg-slate-500/10 text-slate-300",
  red: "border-red-500/40 bg-red-500/10 text-red-300",
  blue: "border-blue-500/40 bg-blue-500/10 text-blue-300",
};

export function Badge({
  tone = "slate",
  children,
}: {
  tone?: Tone;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

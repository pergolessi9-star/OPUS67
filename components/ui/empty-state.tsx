import { SpectralLine } from "@/components/opus/spectral-line";

/**
 * EmptyState — OPUS67 is an MVP: empty states are first-class screens.
 * They state clearly what exists (nothing), why, and what the user would
 * need to configure. Data is never faked; demo content would be marked
 * DEMO DATA (none is used).
 */
export function EmptyState({
  title,
  description,
  hint,
}: {
  title: string;
  description: string;
  /** Optional "what to configure next" guidance. */
  hint?: string;
}) {
  return (
    <div className="spectral-card px-6 py-12 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-steel">{title}</p>
      <div className="mx-auto mt-4 w-24">
        <SpectralLine />
      </div>
      <p className="mx-auto mt-4 max-w-xl text-sm text-muted">{description}</p>
      {hint ? (
        <p className="mx-auto mt-3 max-w-xl font-mono text-xs text-ion">
          → {hint}
        </p>
      ) : null}
    </div>
  );
}

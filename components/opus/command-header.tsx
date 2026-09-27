import { SpectralLine } from "./spectral-line";
import { StatusBadge, type StatusTone } from "./status-badge";

/**
 * CommandHeader — page header in the OPUS67 command-surface grammar:
 * mono eyebrow (OPUS67 // SECTION), title, honest description, optional
 * status badge, and the Spectral Line as signature underline.
 */
export function CommandHeader({
  eyebrow,
  title,
  description,
  status,
  statusTone = "neutral",
  pulse = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  status?: string;
  statusTone?: StatusTone;
  pulse?: boolean;
}) {
  return (
    <header className="mb-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ion">
        {eyebrow}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-ice">{title}</h1>
        {status ? <StatusBadge tone={statusTone} pulse={pulse}>{status}</StatusBadge> : null}
      </div>
      {description ? (
        <p className="mt-2 max-w-2xl text-sm text-steel">{description}</p>
      ) : null}
      <div className="mt-5">
        <SpectralLine />
      </div>
    </header>
  );
}

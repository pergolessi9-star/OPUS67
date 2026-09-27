import Link from "next/link";

/**
 * RegulatoryBadge — OPUS67's own informative badge. It is the platform's
 * own design and must never appear to be a certification issued by the
 * European Union or any institution.
 */
export function RegulatoryBadge({
  label,
  sublabel,
  href,
}: {
  label: string;
  sublabel?: string | null;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="spectral-card block h-full px-3 py-2 text-center"
      style={{ "--card-accent": "var(--opus-cyan)" } as React.CSSProperties}
    >
      <span className="block font-mono text-[11px] font-semibold uppercase tracking-widest text-ion">
        {label}
      </span>
      {sublabel ? (
        <span className="mt-1 block font-mono text-[10px] uppercase tracking-wide text-muted">
          {sublabel}
        </span>
      ) : null}
    </Link>
  );
}

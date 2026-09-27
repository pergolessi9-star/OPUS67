import Link from "next/link";

/**
 * OPUS67 RegulatoryBadge — the platform's OWN informative badge.
 * Own design, never presented as a certificate, seal or endorsement
 * issued by the European Union or any institution.
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
    <li>
      <Link
        href={href}
        className="spectral-card block px-4 py-2.5 text-center transition-colors"
        style={{ "--module-accent": "var(--opus-cyan)" } as React.CSSProperties}
      >
        <span className="block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-opus-cyan">
          {label}
        </span>
        {sublabel ? (
          <span className="mt-1 block font-mono text-[10px] uppercase tracking-wide text-opus-muted">
            {sublabel}
          </span>
        ) : null}
      </Link>
    </li>
  );
}

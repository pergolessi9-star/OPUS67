/**
 * OPUS67 EmptyState — MVP-grade empty states: they state clearly what is
 * missing and what must be configured. Never filled with invented data.
 */
export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="spectral-card relative overflow-hidden px-6 py-12 text-center">
      <div
        aria-hidden="true"
        className="mx-auto mb-4 h-px w-24 bg-gradient-to-r from-transparent via-opus-cyan to-transparent"
      />
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-opus-text">
        {title}
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm text-opus-muted">{description}</p>
      {action ? (
        <a
          href={action.href}
          className="mt-4 inline-block rounded-md border border-opus-border px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-opus-cyan transition-colors hover:border-opus-cyan/50"
        >
          {action.label}
        </a>
      ) : null}
    </div>
  );
}

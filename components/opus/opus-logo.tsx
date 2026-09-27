import Link from "next/link";

/**
 * OpusLogo — wordmark OPUS67. The name is never altered: "OPUS" in Ice,
 * "67" in Electric Chartreuse as the chromatic identifier. The O67
 * monogram is purely graphic and only used where space is reduced.
 */
export function OpusLogo({
  monogram = false,
  href = "/",
  className = "",
}: {
  monogram?: boolean;
  href?: string | null;
  className?: string;
}) {
  const wordmark = monogram ? (
    <span
      className={`font-mono text-base font-bold tracking-widest ${className}`}
      aria-label="OPUS67"
    >
      <span className="text-ice">O</span>
      <span className="text-chartreuse">67</span>
    </span>
  ) : (
    <span
      className={`font-mono text-lg font-bold tracking-widest ${className}`}
      aria-label="OPUS67"
    >
      <span className="text-ice">OPUS</span>
      <span className="text-chartreuse">67</span>
    </span>
  );

  if (!href) {
    return wordmark;
  }

  return (
    <Link href={href} aria-label="OPUS67 home" className="inline-flex items-center">
      {wordmark}
    </Link>
  );
}

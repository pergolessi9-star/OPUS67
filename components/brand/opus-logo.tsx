import { cn } from "@/lib/utils/cn";

/**
 * OPUS67 wordmark. "OPUS" in the interface text color, "67" in Electric
 * Chartreuse as the identifier element. The compact O67 monogram is
 * exclusively graphic and used only when space is reduced — it never
 * replaces the OPUS67 name.
 */
export function OpusLogo({
  variant = "wordmark",
  className,
}: {
  variant?: "wordmark" | "monogram";
  className?: string;
}) {
  if (variant === "monogram") {
    return (
      <span
        aria-label="OPUS67"
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-[6px] border border-opus-border bg-opus-elevated font-mono text-[11px] font-bold tracking-tight",
          className,
        )}
      >
        <span className="text-opus-text">O</span>
        <span className="text-opus-chartreuse">67</span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "font-mono text-lg font-semibold tracking-[0.18em] text-opus-text",
        className,
      )}
    >
      OPUS<span className="text-opus-chartreuse">67</span>
    </span>
  );
}

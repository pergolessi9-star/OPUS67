import { cn } from "@/lib/utils/cn";

/**
 * OPUS67 Spectral Line — the product's visual signature: an extremely thin
 * luminous line transitioning chartreuse → cyan → ultraviolet → coral.
 * Use on active borders, navigation indicators, workflow connectors,
 * evidence ledger and headers. The animated variant drifts discreetly and
 * is disabled under prefers-reduced-motion (see globals.css).
 */
export function SpectralLine({
  orientation = "horizontal",
  animated = false,
  className,
}: {
  orientation?: "horizontal" | "vertical";
  animated?: boolean;
  className?: string;
}) {
  return (
    <hr
      aria-hidden="true"
      className={cn(
        "spectral-line",
        orientation === "vertical" && "spectral-line--vertical",
        animated && "spectral-line--animated",
        className,
      )}
    />
  );
}

/**
 * SpectralLine — the OPUS67 visual signature: an extremely fine luminous
 * line transitioning chartreuse → cyan → ultraviolet → coral. Used on
 * active edges, navigation, headers, workflows and traceability views.
 */
export function SpectralLine({
  vertical = false,
  className = "",
}: {
  vertical?: boolean;
  className?: string;
}) {
  return (
    <hr
      aria-hidden="true"
      className={`${vertical ? "spectral-line-v h-full" : "spectral-line w-full"} border-0 ${className}`}
    />
  );
}

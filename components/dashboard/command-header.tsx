import { OpusLogo } from "@/components/brand/opus-logo";
import { SpectralLine } from "@/components/spectral/spectral-line";
import { StatusBadge } from "@/components/ui/badge";
import { PLATFORM } from "@/config/platform";

/**
 * OPUS67 CommandHeader — header of the AI Operations Command Surface
 * (dashboard). Shows product identity, system status scope and MVP stage.
 */
export function CommandHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <OpusLogo variant="monogram" />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-opus-muted">
              OPUS67 · System Status
            </p>
            <h1 className="mt-0.5 text-xl font-semibold tracking-tight text-opus-text">
              {title}
            </h1>
          </div>
        </div>
        <StatusBadge tone="amber" pulse>
          {PLATFORM.stage}
        </StatusBadge>
      </div>
      {subtitle ? <p className="mt-2 max-w-2xl text-sm text-opus-steel">{subtitle}</p> : null}
      <SpectralLine animated className="mt-4" />
    </header>
  );
}

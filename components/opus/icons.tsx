/**
 * OPUS67 SPECTRAL — geometric line iconography.
 * Stroke-only, 1.5px, currentColor. No cliché circuits, no stock metaphors.
 */

type IconProps = { className?: string };

function base(path: React.ReactNode, className?: string, viewBox = "0 0 16 16") {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className ?? "h-4 w-4"}
    >
      {path}
    </svg>
  );
}

export function DashboardIcon({ className }: IconProps) {
  return base(
    <>
      <rect x="1.5" y="1.5" width="5.5" height="5.5" />
      <rect x="9" y="1.5" width="5.5" height="5.5" />
      <rect x="1.5" y="9" width="5.5" height="5.5" />
      <rect x="9" y="9" width="5.5" height="5.5" />
    </>,
    className,
  );
}

export function ProjectsIcon({ className }: IconProps) {
  return base(
    <>
      <path d="M8 1.5 14.5 5 8 8.5 1.5 5 8 1.5Z" />
      <path d="M1.5 8.5 8 12l6.5-3.5" />
      <path d="M1.5 11.5 8 15l6.5-3.5" />
    </>,
    className,
  );
}

export function AgentsIcon({ className }: IconProps) {
  return base(
    <>
      <path d="M8 1.5 14 4.9v6.2L8 14.5 2 11.1V4.9L8 1.5Z" />
      <circle cx="8" cy="8" r="1.6" />
    </>,
    className,
  );
}

export function ToolsIcon({ className }: IconProps) {
  return base(
    <>
      <rect x="3" y="3" width="10" height="10" transform="rotate(45 8 8)" />
      <path d="M8 5.2v5.6M5.2 8h5.6" />
    </>,
    className,
  );
}

export function WorkflowsIcon({ className }: IconProps) {
  return base(
    <>
      <circle cx="8" cy="2.6" r="1.4" />
      <rect x="6.6" y="6.6" width="2.8" height="2.8" transform="rotate(45 8 8)" />
      <circle cx="8" cy="13.4" r="1.4" />
      <path d="M8 4v2.2M8 9.8v2.2" />
    </>,
    className,
  );
}

export function EvidenceIcon({ className }: IconProps) {
  return base(
    <>
      <rect x="2.5" y="1.5" width="11" height="13" />
      <path d="M5 5h6M5 8h6M5 11h3.5" />
    </>,
    className,
  );
}

export function GovernanceIcon({ className }: IconProps) {
  return base(
    <>
      <path d="M8 1.5 13.5 3.5v4c0 3.4-2.3 5.9-5.5 7-3.2-1.1-5.5-3.6-5.5-7v-4L8 1.5Z" />
      <path d="M5.5 8l1.8 1.8L10.8 6" />
    </>,
    className,
  );
}

export function SettingsIcon({ className }: IconProps) {
  return base(
    <>
      <path d="M2 4.5h12M2 8h12M2 11.5h12" />
      <circle cx="5.5" cy="4.5" r="1.4" />
      <circle cx="10.5" cy="8" r="1.4" />
      <circle cx="6.5" cy="11.5" r="1.4" />
    </>,
    className,
  );
}

export function HumanIcon({ className }: IconProps) {
  return base(
    <>
      <circle cx="8" cy="4.5" r="2.2" />
      <path d="M3 13.5c.8-2.8 2.7-4.2 5-4.2s4.2 1.4 5 4.2" />
    </>,
    className,
  );
}

export function DecisionIcon({ className }: IconProps) {
  return base(
    <>
      <rect x="3.5" y="3.5" width="9" height="9" transform="rotate(45 8 8)" />
      <path d="M5.8 8l1.5 1.5 2.9-3" />
    </>,
    className,
  );
}

export function MenuIcon({ className }: IconProps) {
  return base(<path d="M2 4h12M2 8h12M2 12h12" />, className);
}

export function CloseIcon({ className }: IconProps) {
  return base(<path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />, className);
}

export function SunIcon({ className }: IconProps) {
  return base(
    <>
      <circle cx="8" cy="8" r="2.6" />
      <path d="M8 1.5v1.8M8 12.7v1.8M1.5 8h1.8M12.7 8h1.8M3.4 3.4l1.3 1.3M11.3 11.3l1.3 1.3M12.6 3.4l-1.3 1.3M4.7 11.3l-1.3 1.3" />
    </>,
    className,
  );
}

export function MoonIcon({ className }: IconProps) {
  return base(
    <path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7Z" />,
    className,
  );
}

export function LegalIcon({ className }: IconProps) {
  return base(
    <>
      <path d="M8 1.5v13M3.5 4.5h9" />
      <path d="M3.5 4.5 1.5 9h4l-2-4.5ZM12.5 4.5 10.5 9h4l-2-4.5Z" />
      <path d="M5 14.5h6" />
    </>,
    className,
  );
}

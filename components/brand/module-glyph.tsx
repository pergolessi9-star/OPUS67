import { MODULE_ACCENTS, type ModuleSlug } from "@/config/modules";

/**
 * Linear iconography per module — hand-drawn strokes, no emoji, no icon packs.
 * Stroke colour comes from the module's chromatic identity token.
 */
export function ModuleGlyph({ slug, size = 18 }: { slug: ModuleSlug; size?: number }) {
  const stroke = MODULE_ACCENTS[slug];
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (slug) {
    case "dashboard":
      return (
        <svg {...common}><path d="M4 12a8 8 0 0 1 16 0" /><path d="M12 12l4-3.5" /><circle cx="12" cy="12" r="1.2" /></svg>
      );
    case "projects":
      return (
        <svg {...common}><rect x="3" y="4" width="7" height="7" rx="1" /><rect x="14" y="4" width="7" height="7" rx="1" /><rect x="3" y="15" width="7" height="7" rx="1" /><path d="M17.5 15v6M14.5 18h6" /></svg>
      );
    case "agents":
      return (
        <svg {...common}><circle cx="12" cy="12" r="3" /><circle cx="4" cy="6" r="1.5" /><circle cx="20" cy="6" r="1.5" /><circle cx="4" cy="18" r="1.5" /><circle cx="20" cy="18" r="1.5" /><path d="M5.2 7.1 9.8 10.4M18.8 7.1l-4.6 3.3M5.2 16.9l4.6-3.3M18.8 16.9l-4.6-3.3" /></svg>
      );
    case "tools":
      return (
        <svg {...common}><path d="M14.5 4.5a4.5 4.5 0 0 0-5.6 5.6L4 15l5 5 4.9-4.9a4.5 4.5 0 0 0 5.6-5.6l-2.8 2.8-2.8-.7-.7-2.8 2.8-2.8Z" /></svg>
      );
    case "workflows":
      return (
        <svg {...common}><rect x="9" y="2.5" width="6" height="4" rx="1" /><rect x="9" y="17.5" width="6" height="4" rx="1" /><rect x="2.5" y="10" width="6" height="4" rx="1" /><rect x="15.5" y="10" width="6" height="4" rx="1" /><path d="M12 6.5V10M12 14v3.5M5.5 12h13" /></svg>
      );
    case "evidence":
      return (
        <svg {...common}><path d="M6 3h9l4 4v14H6Z" /><path d="M14 3v5h5" /><path d="M9 12h6M9 16h6" /></svg>
      );
    case "governance":
      return (
        <svg {...common}><path d="M12 3 4 6v5c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6Z" /><path d="M9 12l2 2 4-4" /></svg>
      );
    case "settings":
      return (
        <svg {...common}><circle cx="12" cy="12" r="3" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" /></svg>
      );
    default:
      return (
        <svg {...common}><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></svg>
      );
  }
}

/**
 * OPUS67 — Module registry.
 *
 * Single source of truth for the platform modules shown in navigation and
 * on the dashboard. Statuses are HONEST: a module is only "operational"
 * when its UI and data path work; anything pending configuration is marked
 * "configuration_required" or "planned". No invented capabilities.
 */

export type ModuleStatus = "operational" | "configuration_required" | "planned";

export interface ModuleDescriptor {
  slug: string;
  name: string;
  description: string;
  href: string;
  status: ModuleStatus;
  statusNote: string;
}

export const MODULES: ModuleDescriptor[] = [
  {
    slug: "dashboard",
    name: "Dashboard",
    description: "Operational overview of the platform.",
    href: "/dashboard",
    status: "operational",
    statusNote: "Live view of registered entities and system health.",
  },
  {
    slug: "projects",
    name: "Projects",
    description: "Containers that group agents, workflows, executions and evidence.",
    href: "/projects",
    status: "operational",
    statusNote: "In-memory store active; PostgreSQL persistence pending.",
  },
  {
    slug: "agents",
    name: "Agents",
    description: "Extensible AI agent definitions with provider/model binding.",
    href: "/agents",
    status: "configuration_required",
    statusNote: "Model execution requires an AI provider (see .env.example).",
  },
  {
    slug: "tools",
    name: "Tools",
    description: "External capabilities with explicit input/output schemas and permissions.",
    href: "/tools",
    status: "configuration_required",
    statusNote: "No external integrations are wired yet; none is claimed as available.",
  },
  {
    slug: "workflows",
    name: "Workflows",
    description: "Ordered steps binding agents and tools with error policies.",
    href: "/workflows",
    status: "operational",
    statusNote: "Definition model implemented; execution engine planned.",
  },
  {
    slug: "evidence",
    name: "Evidence",
    description: "Traceability records with provenance, hashes and review states.",
    href: "/evidence",
    status: "operational",
    statusNote: "SHA-256 fingerprinting implemented; no immutability claims.",
  },
  {
    slug: "governance",
    name: "Governance",
    description: "AI system inventory, risks, controls, decisions and human oversight.",
    href: "/governance",
    status: "operational",
    statusNote: "Compliance-oriented controls. OPUS67 does not claim EU AI Act compliance.",
  },
  {
    slug: "settings",
    name: "Settings",
    description: "Environment and provider configuration status.",
    href: "/settings",
    status: "operational",
    statusNote: "Reports configuration state without exposing secret values.",
  },
];

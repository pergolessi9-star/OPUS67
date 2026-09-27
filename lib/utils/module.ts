import { MODULES, type ModuleDescriptor } from "@/config/modules";

export function getModule(slug: string): ModuleDescriptor {
  const mod = MODULES.find((m) => m.slug === slug);
  if (!mod) {
    throw new Error(`Unknown module slug: ${slug}`);
  }
  return mod;
}

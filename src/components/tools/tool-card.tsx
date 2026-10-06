import { ArrowUpRight, Calculator, Clock, Key, Repeat, Timer } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { ToolDefinition } from "@/types/tool";

const iconBySlug: Record<string, React.ComponentType<{ size?: number; weight?: "regular" | "bold" | "fill" }>> = {
  pomodoro: Timer,
  "conversor-unidades": Repeat,
  "generador-contrasenas": Key,
  "calculadora-porcentaje": Calculator,
  "calculadora-tiempo": Clock
};

export function ToolCard({ tool, featured = false }: { tool: ToolDefinition; featured?: boolean }) {
  const Icon = iconBySlug[tool.slug] || Calculator;
  return <Link className={`tool-card${featured ? " tool-card-featured" : ""}`} href={`/herramientas/${tool.slug}`}><span className="tool-icon"><Icon size={24} weight="bold" /></span><div><p>{tool.category}</p><h3>{tool.name}</h3><span>{tool.description}</span></div><ArrowUpRight className="tool-arrow" size={20} weight="bold" /></Link>;
}

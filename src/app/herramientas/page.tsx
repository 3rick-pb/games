import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ToolCard } from "@/components/tools/tool-card";
import { categoryLabels, tools } from "@/data/tools";

export const metadata: Metadata = { title: "Herramientas", description: "Explora herramientas de productividad, matemáticas, conversiones y más." };

export default function ToolsPage() {
  return <div className="app-shell"><Header /><main className="catalog-page"><header className="catalog-intro"><p>Catálogo</p><h1>Una herramienta para cada pequeño avance.</h1><span>Empieza con las utilidades disponibles y vuelve cuando necesites resolver algo nuevo.</span></header><div className="catalog-layout"><aside><strong>Categorías</strong>{Object.entries(categoryLabels).map(([key, value]) => <a href={`#${key}`} key={key}>{value}</a>)}</aside><div className="catalog-groups">{Object.entries(categoryLabels).map(([category, label]) => { const group = tools.filter((tool) => tool.category === category); if (!group.length) return null; return <section id={category} key={category}><h2>{label}</h2><div className="tool-grid">{group.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}</div></section>; })}</div></div></main><Footer /></div>;
}

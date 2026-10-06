import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ToolWorkspace } from "@/components/tools/tool-workspace";
import { getTool, tools } from "@/data/tools";

type ToolPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return tools.map((tool) => ({ slug: tool.slug })); }
export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> { const tool = getTool((await params).slug); return tool ? { title: tool.name, description: tool.description } : {}; }

export default async function ToolPage({ params }: ToolPageProps) {
  const tool = getTool((await params).slug);
  if (!tool) notFound();
  const related = tools.filter((candidate) => tool.related.includes(candidate.slug));
  return <div className="app-shell"><Header /><main className="tool-page"><Link className="back-link" href="/herramientas"><ArrowLeft size={16} /> Todas las herramientas</Link><header className="tool-header"><p>{tool.category}</p><h1>{tool.name}</h1><span>{tool.description}</span></header><ToolWorkspace slug={tool.slug} /><section className="tool-copy"><div><h2>Cómo usar esta herramienta</h2><p>Ingresa los datos que necesitas, revisa la explicación del resultado y ajusta los valores cuando quieras. Nada de esta información se envía a nuestros servidores.</p></div><div><h2>Resultados claros</h2><p>Diseñamos cada cálculo para que puedas entender de dónde sale el resultado, no solo copiar un número.</p></div></section>{related.length > 0 && <section className="related-tools"><div className="section-heading"><div><p className="section-label">Siguiente paso</p><h2>También puede servirte</h2></div></div><div>{related.map((item) => <Link href={`/herramientas/${item.slug}`} key={item.slug}>{item.name}<ArrowRight size={18} /></Link>)}</div></section>}</main><Footer /></div>;
}

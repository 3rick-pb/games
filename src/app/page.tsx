import { ArrowRight, Compass, Lightning, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ToolCard } from "@/components/tools/tool-card";
import { ToolSearch } from "@/components/tools/tool-search";
import { categoryLabels, tools } from "@/data/tools";

const featuredTools = tools.filter((tool) => tool.featured);

export default function HomePage() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <section className="home-hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-kicker"><Compass size={16} weight="bold" /> Tu espacio de herramientas</p>
            <h1 id="hero-title">Resuelve lo cotidiano<br /><em>sin perder el hilo.</em></h1>
            <p className="hero-description">Cálculos, conversiones y pequeñas utilidades claras, rápidas y diseñadas para proteger tus datos.</p>
            <Link className="button button-primary" href="#herramientas">
              Explorar herramientas <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
          <ToolSearch tools={tools} />
        </section>

        <section className="content-section" id="herramientas" aria-labelledby="featured-title">
          <div className="section-heading">
            <div><p className="section-label">Selección inicial</p><h2 id="featured-title">Herramientas que sí vas a usar</h2></div>
            <Link className="text-link" href="/herramientas">Ver el catálogo <ArrowRight size={16} /></Link>
          </div>
          <div className="tool-grid">
            {featuredTools.map((tool, index) => <ToolCard key={tool.slug} tool={tool} featured={index === 0} />)}
          </div>
        </section>

        <section className="content-section category-section" aria-labelledby="category-title">
          <div className="section-heading"><div><p className="section-label">Una ruta clara</p><h2 id="category-title">Encuentra tu punto de partida</h2></div></div>
          <nav className="category-list" aria-label="Categorías de herramientas">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <Link href={`/herramientas?categoria=${key}`} key={key}><span>{label}</span><ArrowRight size={20} /></Link>
            ))}
          </nav>
        </section>

        <section className="principles" aria-label="Principios de útil">
          <article><Lightning size={26} weight="fill" /><h2>Directo al resultado</h2><p>Menos pasos, explicaciones legibles y estados que te indican qué hacer.</p></article>
          <article><ShieldCheck size={26} weight="fill" /><h2>Privacidad por defecto</h2><p>Las herramientas que pueden funcionar localmente no necesitan enviar tu información.</p></article>
        </section>
      </main>
      <Footer />
    </div>
  );
}

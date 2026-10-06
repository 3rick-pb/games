import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><p>404</p><h1>Esta herramienta todavía no está aquí.</h1><span>Elige otra del catálogo o vuelve al inicio.</span><Link className="button button-primary" href="/herramientas">Ver herramientas</Link></main>;
}

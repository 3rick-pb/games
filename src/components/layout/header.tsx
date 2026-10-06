import { List, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export function Header() {
  return <header className="site-header"><Link className="brand" href="/" aria-label="útil, inicio">útil<span>.</span></Link><nav aria-label="Navegación principal"><Link href="/herramientas">Herramientas</Link><Link href="/about">Cómo funciona</Link></nav><div className="header-actions"><Link href="/herramientas" className="header-search"><MagnifyingGlass size={18} /> <span>Buscar</span></Link><button className="menu-button" aria-label="Abrir menú"><List size={23} /></button></div></header>;
}

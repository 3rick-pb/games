import Link from "next/link";

export function Footer() {
  return <footer className="site-footer"><div><Link className="brand" href="/">útil<span>.</span></Link><p>Herramientas que resuelven, sin pedir más datos de los necesarios.</p></div><div className="footer-links"><Link href="/about">Acerca de</Link><Link href="/contact">Contacto</Link><Link href="/privacy">Privacidad</Link><Link href="/terms">Términos</Link><Link href="/cookies">Cookies</Link></div><small>© {new Date().getFullYear()} útil. Resultados informativos, no asesoría profesional.</small></footer>;
}

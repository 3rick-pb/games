import type { Metadata } from "next";
import { InfoPage } from "@/components/content/info-page";
export const metadata: Metadata = { title: "Cookies" };
export default function CookiesPage() { return <InfoPage title="Cookies y almacenamiento local" lead="Usamos almacenamiento local solo cuando ayuda a que una herramienta recuerde una preferencia funcional."><h2>Estado actual</h2><p>Esta versión no incorpora cookies de analítica ni de publicidad. El uso de almacenamiento local se limitará a preferencias funcionales, como una sesión de enfoque, cuando se active esa funcionalidad.</p><h2>Futuras integraciones</h2><p>Antes de añadir medición o publicidad se publicará una lista clara de proveedores, finalidades y opciones de consentimiento aplicables.</p></InfoPage>; }

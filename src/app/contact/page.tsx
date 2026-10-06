import type { Metadata } from "next";
import { InfoPage } from "@/components/content/info-page";
export const metadata: Metadata = { title: "Contacto" };
export default function ContactPage() { return <InfoPage title="Contacto" lead="El canal de soporte se configurará antes de publicar la plataforma."><h2>Antes del lanzamiento</h2><p>Falta definir una dirección de contacto y la identidad del responsable. No habilitamos un formulario hasta poder gestionar los mensajes y su información de forma responsable.</p></InfoPage>; }

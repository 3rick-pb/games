import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

type InfoPageProps = { title: string; lead: string; children: React.ReactNode };

export function InfoPage({ title, lead, children }: InfoPageProps) {
  return <div className="app-shell"><Header /><main className="info-page"><header><h1>{title}</h1><p>{lead}</p></header><article>{children}</article></main><Footer /></div>;
}

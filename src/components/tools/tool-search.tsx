"use client";

import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { ToolDefinition } from "@/types/tool";

export function ToolSearch({ tools }: { tools: ToolDefinition[] }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase("es");
  const results = useMemo(() => normalizedQuery
    ? tools.filter((tool) => [tool.name, tool.description, tool.category, ...tool.keywords].join(" ").toLocaleLowerCase("es").includes(normalizedQuery)).slice(0, 5)
    : tools.filter((tool) => tool.featured).slice(0, 3), [normalizedQuery, tools]);

  return <div className="search-panel">
    <div className="search-panel-heading"><div><span>Encuentra una herramienta</span><strong>Empieza por tu tarea.</strong></div><MagnifyingGlass size={26} aria-hidden="true" /></div>
    <label className="search-input" htmlFor="home-search"><MagnifyingGlass size={20} aria-hidden="true" /><input id="home-search" name="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ej.: porcentaje, contraseña, tiempo" autoComplete="off" />{!query && <kbd>⌘ K</kbd>}</label>
    <div className="search-suggestions" aria-live="polite" aria-label="Resultados de búsqueda">
      {results.length > 0 ? results.map((tool) => <Link href={`/herramientas/${tool.slug}`} key={tool.slug}>{tool.name}<ArrowRight size={15} /></Link>) : <p className="search-empty">No encontramos una herramienta para “{query}”. Prueba con otra palabra o explora el catálogo.</p>}
    </div>
  </div>;
}

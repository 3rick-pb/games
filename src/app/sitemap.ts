import type { MetadataRoute } from "next";
import { tools } from "@/data/tools";
export default function sitemap(): MetadataRoute.Sitemap { const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"; return ["", "/herramientas", "/about", "/privacy", "/terms", "/cookies", "/contact"].map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date() })).concat(tools.map((tool) => ({ url: `${baseUrl}/herramientas/${tool.slug}`, lastModified: new Date() }))); }

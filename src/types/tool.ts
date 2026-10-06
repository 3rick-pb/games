export type ToolCategory =
  | "productividad"
  | "matemáticas"
  | "conversiones"
  | "finanzas"
  | "tiempo"
  | "generadores"
  | "tecnología";

export type ToolDefinition = {
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  keywords: string[];
  featured?: boolean;
  related: string[];
};

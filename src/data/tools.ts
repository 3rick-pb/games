import type { ToolCategory, ToolDefinition } from "@/types/tool";

export const categoryLabels: Record<ToolCategory, string> = {
  productividad: "Productividad",
  matemáticas: "Matemáticas",
  conversiones: "Conversiones",
  finanzas: "Finanzas",
  tiempo: "Tiempo",
  generadores: "Generadores",
  tecnología: "Tecnología"
};

export const tools: ToolDefinition[] = [
  {
    slug: "pomodoro",
    name: "Pomodoro",
    description: "Trabaja con sesiones enfocadas, pausas claras y persistencia local.",
    category: "productividad",
    keywords: ["foco", "temporizador", "estudiar", "trabajo"],
    featured: true,
    related: ["contador-tiempo", "calculadora-tiempo"]
  },
  {
    slug: "conversor-unidades",
    name: "Conversor de unidades",
    description: "Convierte longitud, masa, temperatura y tiempo con una fórmula visible.",
    category: "conversiones",
    keywords: ["convertir", "metros", "kilómetros", "celsius", "peso"],
    featured: true,
    related: ["calculadora-porcentaje", "calculadora-tiempo"]
  },
  {
    slug: "generador-contrasenas",
    name: "Generador de contraseñas",
    description: "Crea contraseñas únicas con Web Crypto, sin enviarlas a ningún servidor.",
    category: "generadores",
    keywords: ["seguridad", "clave", "password", "crypto"],
    featured: true,
    related: ["generador-qr", "contador-caracteres"]
  },
  {
    slug: "calculadora-porcentaje",
    name: "Calculadora de porcentaje",
    description: "Calcula porcentajes, aumentos y descuentos sin fórmulas confusas.",
    category: "matemáticas",
    keywords: ["regla de tres", "descuento", "aumento", "por ciento"],
    featured: true,
    related: ["calculadora-descuento", "conversor-unidades"]
  },
  {
    slug: "calculadora-tiempo",
    name: "Calculadora de tiempo",
    description: "Suma, resta y convierte duraciones para planificar mejor tu día.",
    category: "tiempo",
    keywords: ["horas", "minutos", "duración", "sumar tiempo"],
    related: ["pomodoro", "contador-tiempo"]
  },
  {
    slug: "contador-tiempo",
    name: "Contador regresivo",
    description: "Crea una cuenta atrás sencilla para una tarea o una pausa.",
    category: "tiempo",
    keywords: ["temporizador", "cuenta atrás", "minutos", "alarma"],
    related: ["pomodoro", "calculadora-tiempo"]
  },
  {
    slug: "generador-qr",
    name: "Generador QR",
    description: "Prepara códigos QR para enlaces y texto, directamente desde tu navegador.",
    category: "generadores",
    keywords: ["qr", "enlace", "wifi", "codigo"],
    related: ["generador-contrasenas", "conversor-unidades"]
  },
  {
    slug: "calculadora-interes-compuesto",
    name: "Interés compuesto",
    description: "Explora el crecimiento de ahorros de forma educativa y transparente.",
    category: "finanzas",
    keywords: ["ahorro", "inversión", "interés", "capital"],
    related: ["calculadora-ahorros", "calculadora-prestamos"]
  },
  {
    slug: "calculadora-descuento",
    name: "Calculadora de descuento",
    description: "Conoce el precio final y el ahorro de una oferta.",
    category: "matemáticas",
    keywords: ["precio", "rebaja", "oferta", "ahorro"],
    related: ["calculadora-porcentaje", "calculadora-interes-compuesto"]
  },
  {
    slug: "contador-caracteres",
    name: "Contador de caracteres",
    description: "Revisa caracteres, palabras y tiempo estimado de lectura de un texto.",
    category: "productividad",
    keywords: ["texto", "palabras", "redacción", "lectura"],
    related: ["generador-contrasenas", "pomodoro"]
  }
];

export const getTool = (slug: string) => tools.find((tool) => tool.slug === slug);

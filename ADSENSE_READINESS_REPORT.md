# Informe de preparación para AdSense

Fecha de revisión: 2026-10-05

> Este informe no garantiza la aprobación de AdSense. Describe el estado técnico y editorial de la primera fase.

| Área | Estado | Severidad | Ubicación | Acción requerida |
| --- | --- | --- | --- | --- |
| Utilidad real | En progreso | Media | Catálogo de herramientas | Ampliar solo con herramientas completas y contenido útil; ocho funciones están activas en esta fase. |
| Contenido original | En progreso | Media | Páginas de herramientas | Escribir explicaciones, ejemplos y FAQs específicas para cada herramienta antes de solicitar revisión. |
| Navegación | Preparada | Baja | Header, footer, catálogo | Mantener rutas estables y validar enlaces al añadir páginas. |
| UX móvil | Revisada | Baja | Inicio y generador de contraseñas | Repetir QA manual en teléfonos físicos antes del lanzamiento. |
| Páginas de confianza | Parcial | Media | about, privacy, terms, cookies, contact | Sustituir los marcadores de responsable y contacto por datos reales antes de publicar. |
| SEO técnico | Preparada | Baja | metadata, sitemap, robots | Definir `NEXT_PUBLIC_SITE_URL`, dominio y metadata final antes de indexar. |
| Publicidad | Desactivada | Baja | Configuración futura | No activar anuncios hasta contar con contenido suficiente y una política de consentimiento aplicable. |
| Privacidad | Preparada | Baja | Herramientas cliente y política | Confirmar proveedores y consentimiento al incorporar analítica o publicidad. |
| Seguridad de producción | Preparada | Baja | next.config.ts | CSP y cabeceras activas en producción; revisar la CSP al añadir terceros. |
| Vulnerabilidades de producción | Sin hallazgos | Baja | `npm audit --omit=dev` | Ejecutar auditoría de nuevo antes de cada despliegue. |

## Bloqueos reales antes de una solicitud de AdSense

1. Registrar operador, dominio y canal de contacto real.
2. Completar las herramientas prioritarias con contenido editorial revisado.
3. Publicar las políticas con información jurídica y jurisdicción correspondientes.
4. Conectar Search Console y verificar el sitemap en el dominio de producción.
5. Revisar la experiencia con publicidad real sin situarla junto a controles críticos o resultados.

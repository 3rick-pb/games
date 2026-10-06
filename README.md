# útil

Suite web en español para resolver tareas cotidianas de productividad, matemáticas, conversiones, finanzas personales y pequeñas utilidades digitales. La primera fase prioriza utilidad, privacidad local, rendimiento y una base escalable para Vercel.

## Estado de la primera fase

- Catálogo, búsqueda instantánea, rutas, metadata, sitemap y robots.
- Sistema visual responsive con light mode y base preparada para temas semánticos.
- Herramientas activas: Pomodoro, contador regresivo, conversor de unidades, generador QR local, generador seguro de contraseñas, porcentaje, descuento, interés compuesto educativo, calculadora de tiempo y contador de caracteres.
- Rutas reservadas para ampliar el catálogo sin cambiar enlaces.
- Páginas de confianza, cabeceras de seguridad en producción y CI.

## Arquitectura

```text
src/
  app/             Rutas, metadata y SEO técnico
  components/      Layout, presentación y áreas de herramienta
  data/            Registro central de herramientas y relaciones
  lib/             Fórmulas, conversiones y operaciones locales
  types/           Tipos compartidos
```

La aplicación es deliberadamente stateless en esta fase. Las herramientas que no requieren servidor se ejecutan en el navegador. Una futura capa de cuentas, favoritos o historial debe integrarse mediante módulos separados, sin acoplarse al registro de herramientas ni a las fórmulas.

## Tecnologías y dependencias

- Next.js 16, React 19 y TypeScript estricto.
- CSS moderno con tokens propios; no se usa una biblioteca visual pesada.
- Phosphor Icons para iconografía coherente.
- Vitest para fórmulas y conversiones críticas.
- ESLint y GitHub Actions para validación continua.

## Desarrollo

Requiere Node.js 22 o superior.

```bash
npm install
npm run dev
```

Validación local:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Variables de entorno

Copia `.env.example` a `.env.local` para el desarrollo local.

| Variable | Requerida | Uso |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | En producción | URL canónica para metadata y sitemap. |
| `NEXT_PUBLIC_ADS_ENABLED` | No | Reserva de configuración para publicidad; permanece en `false`. |

No se necesitan claves, base de datos ni API routes para las utilidades actuales.

## Rutas

- `/` Inicio y descubrimiento.
- `/herramientas` Catálogo.
- `/herramientas/pomodoro`
- `/herramientas/conversor-unidades`
- `/herramientas/generador-contrasenas`
- `/herramientas/calculadora-porcentaje`
- `/about`, `/contact`, `/privacy`, `/terms`, `/cookies`
- `/sitemap.xml` y `/robots.txt`

## Seguridad y privacidad

- Validación básica de valores no finitos y divisiones por cero en la capa de cálculo.
- Generación de contraseñas con `crypto.getRandomValues`, incluida eliminación de sesgo por módulo.
- Sin envío de datos de herramienta al servidor.
- Cabeceras de seguridad de producción: CSP, HSTS, anti-frame, no-sniff, política de referencia y permisos restringidos.
- No hay endpoints públicos todavía; no se añade rate limiting hasta que exista una superficie de servidor que lo requiera.

## SEO, analítica y publicidad

Cada herramienta dispone de un punto central para metadata y enlaces relacionados. La arquitectura está preparada para instrumentar eventos no sensibles, pero no recoge analítica ni activa publicidad por defecto. Consulta [SEO_CONTENT_PLAN.md](SEO_CONTENT_PLAN.md) y [ADSENSE_READINESS_REPORT.md](ADSENSE_READINESS_REPORT.md).

## Publicar con GitHub y Vercel

1. Crea un repositorio vacío en GitHub y realiza el primer push.
2. Confirma que la acción CI pase lint, tipos, pruebas y build.
3. Importa el repositorio desde Vercel.
4. Define `NEXT_PUBLIC_SITE_URL` con el dominio final y deja `NEXT_PUBLIC_ADS_ENABLED=false`.
5. Despliega y revisa el build, las rutas, el sitemap y `robots.txt`.
6. Conecta el dominio en Vercel y configura la redirección www/no-www en un único origen canónico.
7. Añade la propiedad de dominio a Google Search Console, verifica la propiedad y envía `/sitemap.xml`.
8. Ejecuta la comprobación móvil en dispositivos reales antes de indexar o activar integraciones de terceros.

## Limitaciones conocidas y siguiente trabajo justificado

- El catálogo contiene rutas reservadas para próximas herramientas; cuatro herramientas iniciales son funcionales en esta fase.
- El contacto y la identidad legal son marcadores que el propietario debe completar antes de un lanzamiento público.
- Falta ampliar tests para todas las fórmulas financieras antes de activarlas.
- No se debe activar analítica, consentimiento ni publicidad hasta elegir proveedores y revisar requisitos de la jurisdicción de lanzamiento.

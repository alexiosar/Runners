# PIQUE

Calendario de carreras, calculadora de ritmos y rutas de running en Argentina. Construido con [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com), pensado para hostear gratis en Cloudflare Pages.

## Estructura

```text
/
├── public/
│   └── fonts/          fuentes autohospedadas (Oswald, Work Sans, IBM Plex Mono)
├── src/
│   ├── components/      Nav, Footer, Hero, Calculator, Calendar, Routes, Plans, CtaBand
│   ├── layouts/          Layout.astro (nav + footer + overlay de grano compartidos)
│   ├── pages/            index.astro y futuras rutas (/calendario, /rutas, etc.)
│   └── styles/           global.css — tokens de color, tipografía, resets
└── package.json
```

Los datos de carreras y rutas hoy están hardcodeados directamente en `src/components/Calendar.astro` y `src/components/Routes.astro` — se editan a mano ahí mismo mientras el volumen de eventos sea chico.

## Cómo agregar una carrera

Abrí [`src/components/Calendar.astro`](src/components/Calendar.astro) y agregá un objeto nuevo al array `races` (arriba del todo, en el frontmatter):

```js
{
  date: "30 AGO",
  name: "Media Maratón de Rosario",
  city: "Rosario, Santa Fe",
  distances: "10K · 21K",
  tag: "Ruta", // o "Trail"
},
```

Guardás y aparece sola en la tabla — no hace falta tocar nada más. El orden de la lista es el orden en que se muestran, así que conviene mantenerlas ordenadas por fecha.

Las carreras actuales se relevaron a mano desde [ar.dondecorrer.com](https://ar.dondecorrer.com/) (sección "Destacadas", filtrando duatlones/triatlones/ciclismo) el 2026-08-07 — volvé ahí para sumar fechas nuevas o confirmar distancias que quedaron como "Consultar". Esa fuente está bastante centrada en Buenos Aires; para Córdoba, Rosario, Mendoza, etc. probablemente haya que buscar en otro lado o revisar el filtro "Todas" del sitio.

> La tarjeta "Próxima carrera" del hero ([Hero.astro](src/components/Hero.astro)) muestra la misma carrera que la primera fila de la tabla — si agregás una carrera más próxima en el tiempo, actualizá también `RACE_DATE` y el texto de esa tarjeta ahí.

## Cómo agregar una ruta local

Mismo mecanismo en [`src/components/Routes.astro`](src/components/Routes.astro), array `routes`:

```js
{ city: "La Plata", spot: "Bosque de La Plata", km: "5.0K", surface: "Mixto" },
```

Las rutas actuales se relevaron a mano el 2026-08-07 desde notas de running de [LA NACION](https://www.lanacion.com.ar/salud/fitness/running-los-siete-mejores-circuitos-para-correr-en-buenos-aires-nid25052022/), [ESPN Run](https://www.espn.com.mx/espn-run/nota/_/id/8509682/pista-parque-sarmiento-cordoba), [Great Runs](https://greatruns.com/), [belong.com.ar](https://www.belong.com.ar/blog/posts/correr-rosario-los-circuitos-que-nos-mueven-9eb6a6d7a8cf/) y [Mendoza Post](https://www.mendozapost.com/nota/151292-este-es-el-recorrido-para-hacer-ejercicio-en-el-parque-san-martin/) — **no Strava**, cuyo explorador de segmentos pide login y no se pudo navegar sin cuenta. Si en algún momento se consigue acceso a Strava, esos circuitos "oficiales" de cada ciudad son un buen punto de partida para buscar los segmentos más populares y reemplazar estos datos por algo más preciso (elevación, popularidad real, etc.).

## Comandos

| Comando           | Acción                                          |
| :----------------- | :----------------------------------------------- |
| `npm install`       | Instala dependencias                              |
| `npm run dev`       | Levanta el servidor local en `localhost:4321`     |
| `npm run build`     | Genera el sitio de producción en `./dist/`        |
| `npm run preview`   | Previsualiza el build antes de deployar           |

## Deploy a Cloudflare Pages (plan gratuito)

1. Subí este repo a GitHub (`git push`).
2. En el dashboard de Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**, elegí este repositorio.
3. Configuración de build:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy. Cloudflare va a rebuildear automáticamente en cada push a `main`.

No hace falta `wrangler.toml` ni adapter de Cloudflare — el sitio es 100% estático (HTML/CSS/JS generado en build), que es justo lo que cubre el plan gratis de Pages.

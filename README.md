# PIQUE

Calendario de carreras, calculadora de ritmos y rutas de running en Argentina. Construido con [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com), pensado para hostear gratis en Cloudflare Pages.

## Estructura

```text
/
├── public/
│   └── fonts/          fuentes autohospedadas (Oswald, Work Sans, IBM Plex Mono)
├── src/
│   ├── components/      Nav, Footer, Hero, Calculator, Calendar, Routes, RouteMap, RouteBuilder, Plans, CtaBand
│   ├── data/             races.ts y routes.ts — única fuente de datos, la comparten el home y las páginas completas
│   ├── layouts/          Layout.astro (nav + footer + overlay de grano compartidos)
│   ├── pages/            index.astro (home), calendario.astro, rutas.astro, circuito.astro
│   └── styles/           global.css — tokens de color, tipografía, resets, estilos compartidos (.block, tabla del calendario, etc.)
└── package.json
```

Los datos de carreras y rutas viven en `src/data/races.ts` y `src/data/routes.ts` — se editan a mano ahí mientras el volumen sea chico. El home (`index.astro`) muestra solo un preview (5 carreras, 4 rutas) con links "ver todo" hacia `/calendario` y `/rutas`, que muestran la lista completa desde el mismo archivo — no hay que tocar dos lugares.

## Cómo agregar una carrera

Abrí [`src/data/races.ts`](src/data/races.ts) y agregá un objeto nuevo al array `races`:

```js
{
  date: "30 AGO",
  name: "Media Maratón de Rosario",
  city: "Rosario, Santa Fe",
  distances: "10K · 21K",
  tag: "Ruta", // o "Trail"
  organizer: "Club de Corredores",
},
```

Guardás y aparece sola tanto en el preview del home como en `/calendario` — no hace falta tocar nada más. El orden de la lista es el orden en que se muestran, así que conviene mantenerlas ordenadas por fecha. El home solo toma las primeras 5 (`races.slice(0, 5)` en [Calendar.astro](src/components/Calendar.astro)), así que si agregás una carrera más próxima que las actuales, capaz desplaza a otra del preview — la sigue teniendo `/calendario` igual.

Las carreras actuales se relevaron a mano desde [ar.dondecorrer.com](https://ar.dondecorrer.com/) (sección "Destacadas", filtrando duatlones/triatlones/ciclismo) el 2026-08-07 — volvé ahí para sumar fechas nuevas o confirmar distancias que quedaron como "Consultar". Esa fuente está bastante centrada en Buenos Aires; para Córdoba, Rosario, Mendoza, etc. probablemente haya que buscar en otro lado o revisar el filtro "Todas" del sitio.

> La tarjeta "Próxima carrera" del hero ([Hero.astro](src/components/Hero.astro)) muestra la misma carrera que la primera fila de la tabla — si agregás una carrera más próxima en el tiempo, actualizá también `RACE_DATE` y el texto de esa tarjeta ahí.

## Cómo agregar una ruta local

Mismo mecanismo en [`src/data/routes.ts`](src/data/routes.ts), array `routes` — ahora también lleva `lat`/`lng` para que aparezca en el mapa de `/rutas` (los saqués de Google Maps: click derecho sobre el punto → copiar coordenadas):

```js
{ city: "La Plata", spot: "Bosque de La Plata", km: "5.0K", surface: "Mixto", lat: -34.9138, lng: -57.9505 },
```

El mapa de `/rutas` usa [Leaflet](https://leafletjs.com/) + tiles de OpenStreetMap (gratis, sin API key) — ver [`RouteMap.astro`](src/components/RouteMap.astro).

Las rutas actuales se relevaron a mano el 2026-08-07 desde notas de running de [LA NACION](https://www.lanacion.com.ar/salud/fitness/running-los-siete-mejores-circuitos-para-correr-en-buenos-aires-nid25052022/), [ESPN Run](https://www.espn.com.mx/espn-run/nota/_/id/8509682/pista-parque-sarmiento-cordoba), [Great Runs](https://greatruns.com/), [belong.com.ar](https://www.belong.com.ar/blog/posts/correr-rosario-los-circuitos-que-nos-mueven-9eb6a6d7a8cf/) y [Mendoza Post](https://www.mendozapost.com/nota/151292-este-es-el-recorrido-para-hacer-ejercicio-en-el-parque-san-martin/) — **no Strava**, cuyo explorador de segmentos pide login y no se pudo navegar sin cuenta. Si en algún momento se consigue acceso a Strava, esos circuitos "oficiales" de cada ciudad son un buen punto de partida para buscar los segmentos más populares y reemplazar estos datos por algo más preciso (elevación, popularidad real, etc.).

## Armar un circuito (`/circuito`)

Herramienta tipo gmap-pedometer: click en el mapa para ir marcando puntos, se dibuja el recorrido y calcula la distancia total en vivo (fórmula de Haversine, todo client-side — sin backend ni API paga, por eso no tiene perfil de elevación). Vive en [`RouteBuilder.astro`](src/components/RouteBuilder.astro), usado desde [`circuito.astro`](src/pages/circuito.astro).

El botón "Calcular ritmo para esta distancia" manda a `/?km=X#calculadora` — [Calculator.astro](src/components/Calculator.astro) lee ese query param al cargar, agrega una opción "X km · Tu circuito" al selector de distancia y la deja seleccionada. Si cambiás cómo la calculadora arma sus opciones, revisá que ese enganche siga funcionando.

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

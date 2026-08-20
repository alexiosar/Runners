// Lista base (fecha/ciudad/distancias/organizador) relevada a mano el 2026-08-07
// desde el listado público de carreras de running en Argentina (filtro "Todas",
// no solo "Destacadas" — así se llegó a cobertura nacional real). El detalle
// extendido (largada exacta, retiro de kit, cifras de la última edición) se
// sacó directamente de la página oficial de cada carrera — ver `infoUrl`.
// Volvé a esas fuentes cuando haya que actualizar algo.
export interface RaceStats {
  edition?: string;
  participants?: string;
  countries?: string;
  bestTime?: string;
}

export interface Race {
  slug: string;
  /** Fecha para mostrar, ej. "16 AGO" o "19 ABR '27". */
  date: string;
  /** Fecha real en formato YYYY-MM-DD — la usan getUpcomingRaces/getNextRace
   * para ordenar y para saber qué ya pasó. Actualizala si cambia `date`. */
  isoDate: string;
  endDate?: string;
  name: string;
  city: string;
  distances: string;
  tag: "Ruta" | "Trail";
  organizer: string;
  lat: number;
  lng: number;
  infoUrl: string;
  startPoint?: string;
  startTime?: string;
  kitPickup?: string;
  highlights?: string;
  contact?: string;
  stats?: RaceStats;
}

export const races: Race[] = [
  {
    slug: "5k-nordelta",
    date: "16 AGO",
    isoDate: "2026-08-16",
    name: "5K Nordelta",
    city: "Nordelta, Buenos Aires",
    distances: "5K",
    tag: "Ruta",
    organizer: "Club Nordelta",
    lat: -34.40265,
    lng: -58.66848,
    infoUrl: "https://eventols.com/p/dua5k-nordelta-2026",
    startPoint: "Dua Nordelta",
    startTime: "8:00 hs",
  },
  {
    slug: "media-maraton-buenos-aires",
    date: "23 AGO",
    isoDate: "2026-08-23",
    name: "Media Maratón de Buenos Aires",
    city: "Palermo, CABA",
    distances: "21K",
    tag: "Ruta",
    organizer: "Carreras y Maratones Ñandú",
    lat: -34.57088,
    lng: -58.4171,
    infoUrl:
      "https://www.maratondebuenosaires.com/medio-maraton-de-buenos-aires-21k.html",
    kitPickup:
      "Parque Sarmiento, ingreso por Av. Triunvirato — Jue 20/8: 11 a 19hs · Vie 21/8: 11 a 20hs · Sáb 22/8: 9 a 16hs. Llevá DNI, el código QR de la inscripción y tu número de dorsal (podés retirarlo un tercero con ambos documentos).",
    stats: {
      participants: "25.000 inscriptos",
      countries: "32 países",
      bestTime: "1:00:24",
    },
  },
  {
    slug: "maraton-puente-rosario-victoria",
    date: "30 AGO",
    isoDate: "2026-08-30",
    name: "Maratón del Puente Rosario-Victoria",
    city: "Rosario, Santa Fe",
    distances: "10K · 14K · 21K",
    tag: "Ruta",
    organizer: "EcoRace",
    lat: -32.94771,
    lng: -60.63047,
    infoUrl: "https://www.instagram.com/p/DXaC5l9iWqV/",
  },
  {
    slug: "maraton-solidaria-siglo-21",
    date: "06 SEP",
    isoDate: "2026-09-06",
    name: "Maratón Solidaria Siglo 21",
    city: "Córdoba, Córdoba",
    distances: "2K · 5K · 10K",
    tag: "Ruta",
    organizer: "Misión DXT",
    lat: -31.43012,
    lng: -64.1843,
    infoUrl: "https://misiondxt.com/2026-2/",
    startPoint: "De los Latinos 8555, Córdoba",
    highlights:
      "Con el lema «Corramos juntos por la salud y la infancia» — maratón solidaria a beneficio de causas de salud infantil.",
  },
  {
    slug: "destino-madryn",
    date: "06 SEP",
    isoDate: "2026-09-06",
    name: "Destino Madryn",
    city: "Puerto Madryn, Chubut",
    distances: "6K · 15K · 25K · 35K · 50K",
    tag: "Trail",
    organizer: "Eduardo Ruiz",
    lat: -42.8461081,
    lng: -64.8970453,
    infoUrl: "https://www.destinomadryncarreradeaventura.com/",
    startPoint: "Estancia San Guillermo",
    contact: "280 460 1405 · destinomadryn@gmail.com",
    highlights:
      "Se corre por acantilados y playas patagónicas en plena temporada de ballenas — combina senderos exigentes con tramos de costa.",
  },
  {
    slug: "asics-k21-villa-pehuenia",
    date: "06 SEP",
    isoDate: "2026-09-06",
    name: "ASICS K21 Villa Pehuenia",
    city: "Villa Pehuenia, Neuquén",
    distances: "10K · 21K",
    tag: "Trail",
    organizer: "Patagonia Eventos",
    lat: -38.88603,
    lng: -71.17495,
    infoUrl: "https://www.instagram.com/kseriesarg/",
  },
  {
    slug: "extremo-tucuman-tafi",
    date: "19 SEP",
    isoDate: "2026-09-19",
    name: "Extremo Tucumán - Tafí",
    city: "Tafí del Valle, Tucumán",
    distances: "6K · 10K · 21K · 30K · 45K · 75K",
    tag: "Trail",
    organizer: "Extremo Tucumán",
    lat: -26.85189,
    lng: -65.70819,
    infoUrl: "https://extremotucuman.com.ar/",
    contact: "Sebastián Di Silvestre · +54 9 3814 49-2172",
  },
  {
    slug: "maraton-internacional-buenos-aires",
    date: "20 SEP",
    isoDate: "2026-09-20",
    name: "Maratón Internacional de Buenos Aires",
    city: "Palermo, CABA",
    distances: "42K",
    tag: "Ruta",
    organizer: "Carreras y Maratones Ñandú",
    lat: -34.57088,
    lng: -58.4171,
    infoUrl: "https://www.maratondebuenosaires.com/",
    startPoint: "Av. Figueroa Alcorta y Dorrego",
    startTime: "7:00 hs",
    stats: {
      participants: "15.000 inscriptos",
      countries: "44 países",
      bestTime: "2:09:04",
    },
  },
  {
    slug: "puma-10k-san-isidro",
    date: "04 OCT",
    isoDate: "2026-10-04",
    name: "Puma 10K San Isidro",
    city: "San Isidro, Buenos Aires",
    distances: "10K",
    tag: "Ruta",
    organizer: "Carreras y Maratones Ñandú",
    lat: -34.48057,
    lng: -58.52075,
    infoUrl: "https://www.instagram.com/carrerasmaratonesnandu/",
  },
  {
    slug: "qhapaqnan-trail",
    date: "09 OCT",
    isoDate: "2026-10-09",
    name: "Qhapaqñan Trail",
    city: "Cafayate, Salta",
    distances: "9K · 15K · 22K · 42K",
    tag: "Trail",
    organizer: "Trail Running Cafayate",
    lat: -26.07304,
    lng: -65.9752,
    infoUrl: "https://www.instagram.com/trailrunning.cafayate/",
  },
  {
    slug: "media-maraton-3-fronteras",
    date: "11 OCT",
    isoDate: "2026-10-11",
    name: "Media Maratón Internacional de las 3 Fronteras",
    city: "Puerto Iguazú, Misiones",
    distances: "10.5K · 21K",
    tag: "Ruta",
    organizer: "Media Maratón 3 Fronteras",
    lat: -25.5976,
    lng: -54.57437,
    infoUrl:
      "https://hotelcolonialfoz.com.br/es/media-maraton-de-las-tres-fronteras-2026/",
    startPoint:
      "Municipalidad de Ciudad del Este, Paraguay (la llegada es en Puerto Iguazú, frente al Monumento a las Tres Fronteras)",
    contact: "Hotel Colonial Iguazú · +55 0800 819 1993",
    highlights:
      "Cruza Paraguay, Brasil y Argentina en un solo recorrido, pasando por el Puente de la Amistad y el Puente Tancredo Neves antes de llegar a Puerto Iguazú. La distancia de 10.5K larga desde Foz do Iguaçu (Brasil).",
  },
  {
    slug: "ultra-fitz-roy",
    date: "15 OCT",
    isoDate: "2026-10-15",
    endDate: "17 OCT",
    name: "Ultra Fitz Roy",
    city: "El Chaltén, Santa Cruz",
    distances: "10K · 21K · 42K · 70K · 100K",
    tag: "Trail",
    organizer: "Ultra Fitz Roy",
    lat: -49.33158,
    lng: -72.88644,
    infoUrl: "https://ultrafitzroy.com/",
    kitPickup:
      "Acreditación presencial 15 y 16 de octubre — se saca turno ingresando el DNI en la web.",
    highlights:
      "Filosofía de bajo impacto ambiental: dejar basura en el circuito es motivo de descalificación. En los tramos más largos hay pocos puestos de asistencia — se toma agua de deshielo en el camino.",
  },
  {
    slug: "saucony-baires-15k",
    date: "18 OCT",
    isoDate: "2026-10-18",
    name: "Saucony Baires 15K",
    city: "Palermo, CABA",
    distances: "5K · 15K",
    tag: "Ruta",
    organizer: "Club de Corredores",
    lat: -34.57088,
    lng: -58.4171,
    infoUrl: "https://clubdecorredores.com/carreras/524/Saucony-Baires-15k/",
    contact: "WhatsApp +54 9 11 3053 3190",
  },
  {
    slug: "potrero-corre",
    date: "07 NOV",
    isoDate: "2026-11-07",
    name: "Potrero Corre",
    city: "Potrero de los Funes, San Luis",
    distances: "3K · 6K · 12K · 22K · 42K",
    tag: "Ruta",
    organizer: "Esfuerzo Deportivo",
    lat: -33.21972,
    lng: -66.23086,
    infoUrl: "https://www.instagram.com/potrerocorre_ok/",
  },
  {
    slug: "nb-media-maraton-mar-del-plata",
    date: "08 NOV",
    isoDate: "2026-11-08",
    name: "NB Media Maratón de Mar del Plata",
    city: "Mar del Plata, Buenos Aires",
    distances: "5K · 10K · 21K",
    tag: "Ruta",
    organizer: "Sports Facilities",
    lat: -38.06667,
    lng: -57.54494,
    infoUrl:
      "https://www.newbalance.com.ar/21k-mar-de-plata-2026/race-series-mdp-21k.html",
    startPoint: "Playa Grande — Guardavidas Guillermo Volpe y Primera Junta",
    startTime: "7:00 hs",
    kitPickup:
      "Viernes 6/11 y sábado 7/11 (lugar a confirmar). Hace falta apto médico vigente (no más de 1 año), DNI/pasaporte y el comprobante de inscripción (Eventick).",
    highlights: "El kit incluye remera técnica New Balance y medalla finisher.",
  },
  {
    slug: "ushuaia-epic-trail",
    date: "22 NOV",
    isoDate: "2026-11-22",
    name: "Ushuaia EPIC - Trail Running",
    city: "Ushuaia, Tierra del Fuego",
    distances: "16K",
    tag: "Trail",
    organizer: "El Fuego Deportivo",
    lat: -54.72418,
    lng: -68.017,
    infoUrl: "https://ushuaiaepic.com.ar/",
    contact: "@ushuaiaepic en Instagram",
    highlights:
      "Es uno de los circuitos de un fin de semana multideporte más grande (también hay mountain bike) del 20 al 22 de noviembre — se presenta como la carrera más austral del mundo. La edición 2025 tuvo alrededor de 450 participantes.",
  },
  {
    slug: "adidas-10k-night-run",
    date: "28 NOV",
    isoDate: "2026-11-28",
    name: "Adidas 10K Night Run",
    city: "Puerto Madero, CABA",
    distances: "10K",
    tag: "Ruta",
    organizer: "Carreras y Maratones Ñandú",
    lat: -34.59827,
    lng: -58.3666,
    infoUrl: "https://www.instagram.com/carrerasmaratonesnandu/",
  },
  {
    slug: "el-cruce-saucony",
    date: "05 DIC",
    isoDate: "2026-12-05",
    endDate: "11 DIC",
    name: "El Cruce Saucony",
    city: "San Carlos de Bariloche, Río Negro",
    distances: "100K (3 etapas)",
    tag: "Trail",
    organizer: "Club de Corredores",
    lat: -41.13585,
    lng: -71.31003,
    infoUrl: "https://elcruce.com.ar/",
    highlights:
      "Edición 24. La carrera por etapas más grande del mundo: 100K en 3 días de running, con 2 campamentos con costa de lago entre etapa y etapa. El kit incluye 4 comidas (2 almuerzos, 2 cenas), 2 desayunos y 2 meriendas, más servicios en los camps (carga de GPS, masajes, botas de recuperación, colchón inflable, bolsa de dormir y silla). Etapa 1: 15K el sábado 5/12 · Etapa 2: 33K el domingo 6/12.",
    stats: { edition: "24ª edición" },
  },
  {
    slug: "fiambala-desert-trail",
    date: "19 ABR '27",
    isoDate: "2027-04-19",
    name: "Fiambalá Desert Trail",
    city: "Fiambalá, Catamarca",
    distances: "10K · 21K · 35K · 50K · 100K (por etapas)",
    tag: "Trail",
    organizer: "South American Trail",
    lat: -27.69028,
    lng: -67.617,
    infoUrl: "https://www.instagram.com/fiambala.trail/",
  },
  {
    slug: "maraton-de-mendoza",
    date: "02 MAY '27",
    isoDate: "2027-05-02",
    name: "Maratón de Mendoza",
    city: "Mendoza, Mendoza",
    distances: "42K",
    tag: "Ruta",
    organizer: "Fundación Filípides",
    lat: -32.88946,
    lng: -68.84584,
    infoUrl: "https://www.instagram.com/reels/DZf51pJlhku/",
  },
];

/**
 * Carreras cuya fecha todavía no pasó, ordenadas por fecha. Se calcula en
 * build time (el sitio es estático) — cada rebuild/deploy recalcula esto,
 * así que ya no hay que sacar carreras pasadas a mano ni sincronizar el
 * hero con la primera fila de la tabla.
 */
export function getUpcomingRaces(today: Date = new Date()): Race[] {
  const todayIso = today.toISOString().slice(0, 10);
  return races
    .filter((r) => r.isoDate >= todayIso)
    .sort((a, b) => a.isoDate.localeCompare(b.isoDate));
}

export function getNextRace(today?: Date): Race | undefined {
  return getUpcomingRaces(today)[0];
}

// Lista base (fecha/ciudad/distancias/organizador) relevada a mano el 2026-08-07
// desde el listado público de carreras de running en Argentina. El detalle
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
  date: string;
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
    slug: "extremo-tucuman-tafi",
    date: "19 SEP",
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
    slug: "saucony-baires-15k",
    date: "18 OCT",
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
    slug: "adidas-10k-night-run",
    date: "28 NOV",
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
];

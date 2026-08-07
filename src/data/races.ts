// Fuente: ar.dondecorrer.com (lista "Destacadas", relevada 2026-08-07).
// Se filtraron duatlones/triatlones/ciclismo — solo carreras a pie (ruta y trail).
// El detalle (rating, link "Más Info", coordenadas exactas) se sacó abriendo
// la ficha de cada carrera en el sitio — ver README para cómo volver a esa fuente.
export interface RaceRatings {
  organizacion: number;
  kit: number;
  circuito: number;
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
  ratings?: RaceRatings;
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
    ratings: { organizacion: 4.4, kit: 3.7, circuito: 4.8 },
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
    ratings: { organizacion: 5.0, kit: 4.3, circuito: 5.0 },
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
    ratings: { organizacion: 4.7, kit: 4.3, circuito: 4.6 },
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
    ratings: { organizacion: 4.8, kit: 4.5, circuito: 4.5 },
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
    ratings: { organizacion: 4.9, kit: 4.9, circuito: 4.8 },
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
    ratings: { organizacion: 4.7, kit: 4.7, circuito: 4.0 },
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
    ratings: { organizacion: 5.0, kit: 5.0, circuito: 5.0 },
  },
];

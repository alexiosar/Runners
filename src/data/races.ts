// Fuente: ar.dondecorrer.com (lista "Destacadas", relevada 2026-08-07).
// Se filtraron duatlones/triatlones/ciclismo — solo carreras a pie (ruta y trail).
// Volvé a esa página para sumar más fechas, confirmar distancias "Consultar",
// o revisar el filtro "Todas" (216 carreras) para salir del sesgo hacia Buenos Aires.
export interface Race {
  date: string;
  name: string;
  city: string;
  distances: string;
  tag: "Ruta" | "Trail";
  organizer: string;
}

export const races: Race[] = [
  {
    date: "16 AGO",
    name: "5K Nordelta",
    city: "Nordelta, Buenos Aires",
    distances: "5K",
    tag: "Ruta",
    organizer: "Club Nordelta",
  },
  {
    date: "23 AGO",
    name: "Media Maratón de Buenos Aires",
    city: "Palermo, CABA",
    distances: "21K",
    tag: "Ruta",
    organizer: "Carreras y Maratones Ñandú",
  },
  {
    date: "19 SEP",
    name: "Extremo Tucumán - Tafí",
    city: "Tafí del Valle, Tucumán",
    distances: "Consultar",
    tag: "Trail",
    organizer: "Extremo Tucumán",
  },
  {
    date: "20 SEP",
    name: "Maratón Internacional de Buenos Aires",
    city: "Palermo, CABA",
    distances: "10K · 21K · 42K",
    tag: "Ruta",
    organizer: "Carreras y Maratones Ñandú",
  },
  {
    date: "04 OCT",
    name: "Puma 10K San Isidro",
    city: "San Isidro, Buenos Aires",
    distances: "10K",
    tag: "Ruta",
    organizer: "Carreras y Maratones Ñandú",
  },
  {
    date: "18 OCT",
    name: "Saucony Baires 15K",
    city: "Palermo, CABA",
    distances: "15K",
    tag: "Ruta",
    organizer: "Club de Corredores",
  },
  {
    date: "28 NOV",
    name: "Adidas 10K Night Run",
    city: "Puerto Madero, CABA",
    distances: "10K",
    tag: "Ruta",
    organizer: "Carreras y Maratones Ñandú",
  },
  {
    date: "05 DIC",
    name: "El Cruce Saucony",
    city: "San Carlos de Bariloche, Río Negro",
    distances: "3 etapas",
    tag: "Trail",
    organizer: "Club de Corredores",
  },
];

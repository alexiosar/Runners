// Fuentes (relevado 2026-08-07, ver README): notas de running de LA NACION,
// ESPN Run, Great Runs, belong.com.ar y AllTrails/Mendoza Post, más
// coordenadas públicas de cada parque. Strava requiere login para explorar
// segmentos, así que no se pudo usar directo — si en algún momento hay una
// cuenta conectada, vale la pena reemplazar esto por segmentos reales.
export interface Route {
  city: string;
  spot: string;
  km: string;
  surface: string;
  lat: number;
  lng: number;
}

export const routes: Route[] = [
  {
    city: "Buenos Aires",
    spot: "Circuito del Rosedal, Bosques de Palermo",
    km: "1.6K",
    surface: "Asfalto",
    lat: -34.5719,
    lng: -58.4157,
  },
  {
    city: "Córdoba",
    spot: "Parque Sarmiento",
    km: "5.7K",
    surface: "Mixto",
    lat: -31.4296,
    lng: -64.17621,
  },
  {
    city: "Rosario",
    spot: "Costanera Central",
    km: "6.0K",
    surface: "Asfalto",
    lat: -32.9584,
    lng: -60.6232,
  },
  {
    city: "Mendoza",
    spot: "Circuito del Lago, Parque Gral. San Martín",
    km: "2.5K",
    surface: "Asfalto",
    lat: -32.8962,
    lng: -68.8651,
  },
];

// Interceptor que mide cada petición HTTP de Pedidos.
import { Request, Response, NextFunction } from "express";

const UMBRAL_LENTA_MS = Number(process.env.UMBRAL_LENTA_MS ?? 1000);

interface Estadistica {
  peticiones: number;
  totalMs: number;
  maxMs: number;
  lentas: number;
}

const porRuta = new Map<string, Estadistica>();

export function medirLatencia(req: Request, res: Response, next: NextFunction): void {
  const inicio = performance.now();

  res.on("finish", () => {
    // TODO 1: calcular la duración de la petición.
    const ms = performance.now() - inicio;

    // TODO 2: identificar la ruta y obtener o crear su estadística.
    const clave = `${req.method} ${req.path}`;
    const estadistica = porRuta.get(clave) ?? {
      peticiones: 0,
      totalMs: 0,
      maxMs: 0,
      lentas: 0,
    };

    // TODO 3: actualizar los cuatro contadores.
    estadistica.peticiones += 1;
    estadistica.totalMs += ms;
    estadistica.maxMs = Math.max(estadistica.maxMs, ms);
    if (ms > UMBRAL_LENTA_MS) estadistica.lentas += 1;

    porRuta.set(clave, estadistica);
  });

  next();
}

export function resumenMetricas() {
  // TODO 4: construir el resumen de todas las rutas medidas.
  return {
    umbralLentaMs: UMBRAL_LENTA_MS,
    rutas: [...porRuta].map(([ruta, e]) => ({
      ruta,
      peticiones: e.peticiones,
      promedioMs: e.totalMs / e.peticiones,
      maxMs: e.maxMs,
      lentas: e.lentas,
    })),
  };
}

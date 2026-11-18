
# S2 - Interceptor de métricas

**Estudiante:** Diego Loor
**Repositorio:** https://github.com/Diloor2000/is604-diego
**Pull Request:** https://github.com/Diloor2000/is604-diego/pull/1

## 1. Resultados de Postman

- Endpoint evaluado: GET /health
- Código de estado: 200 OK
- Tiempo sin bloqueo: 16 ms
- Tiempo durante el bloqueo: PENDIENTE ms
- Petición bloqueante: GET /reporte/bloqueante?n=500000
- Duración del cálculo bloqueante: 8489 ms

## 2. Respuesta completa de GET /metricas

```json
{
  "umbralLentaMs": 1000,
  "rutas": [
    {
      "ruta": "GET /health",
      "peticiones": 9,
      "promedioMs": 2.968961111111361,
      "maxMs": 16.947124999998778,
      "lentas": 0
    },
    {
      "ruta": "GET /metricas",
      "peticiones": 1,
      "promedioMs": 1.6884909999998854,
      "maxMs": 1.6884909999998854,
      "lentas": 0
    },
    {
      "ruta": "GET /reporte/bloqueante",
      "peticiones": 2,
      "promedioMs": 4402.846217000002,
      "maxMs": 8490.895992000005,
      "lentas": 1
    }
  ]
}
```

## 3. Explicación

Postman mide el tiempo total desde el envío de una petición hasta recibir la respuesta.
El interceptor mide desde que Express comienza a procesarla hasta finalizar la respuesta.
El reporte bloqueante ocupa el hilo principal y retrasa la atención de otras solicitudes.
Por eso Postman puede registrar una espera mayor que el interceptor para /health.
El cliente experimenta lentitud y, si la espera es excesiva, podría producirse un timeout.


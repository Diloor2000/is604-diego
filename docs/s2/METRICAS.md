
# S2 - Interceptor de métricas

**Estudiante:** Diego Loor
**Repositorio:** https://github.com/Diloor2000/is604-diego

## Prueba con Postman

- Endpoint: GET /health
- Código HTTP: 200 OK
- Tiempo sin bloqueo: 16 ms
- Tiempo con bloqueo: PENDIENTE
- Petición bloqueante: GET /reporte/bloqueante?n=500000
- Duración del cálculo: 8489 ms

## Respuesta de GET /metricas

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

## Explicación

Postman mide el tiempo total desde que envía una petición hasta recibir la respuesta.
El interceptor mide desde que Express comienza a procesarla hasta finalizar la respuesta.
Cuando el reporte bloqueante ocupa el hilo principal, las demás peticiones deben esperar.
Por eso Postman puede mostrar un tiempo mayor que el registrado por el interceptor.
El cliente experimenta lentitud y, si la espera es excesiva, podría producirse un timeout.


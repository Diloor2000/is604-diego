# S2: Interceptor de métricas de Pedidos

## Prueba de latencia en Postman

- **Petición A:** `GET http://localhost:3000/reporte/bloqueante`.
- **Petición B:** `GET http://localhost:3000/health`, enviada mientras A se ejecuta.
- **Código HTTP de `/health`:** PENDIENTE (copiar el valor real de Postman).
- **Tiempo de `/health` en Postman:** PENDIENTE ms (copiar el valor real).

## Respuesta completa de GET /metricas

Reemplazar este bloque por la respuesta JSON completa obtenida después de las pruebas. No usar datos inventados.

```json
{}
```

## Explicación (4 a 6 líneas)

Postman mide el tiempo completo desde que envía la petición hasta que recibe la respuesta.
El interceptor inicia su cronómetro cuando Express puede ejecutar el middleware de `/health`.
La ruta bloqueante ocupa el hilo principal de Node.js y retrasa el inicio del procesamiento de `/health`.
Por eso, la espera previa al middleware aparece en Postman, pero no queda registrada por el interceptor.
El cliente experimenta una respuesta muy lenta y puede sufrir un timeout, aunque `/health` termine con HTTP 200.

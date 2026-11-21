# T02T03 · Notas da solución

O HTML e o CSS completos non viñan na guía (só fragmentos), así que se reconstruíron a partir da especificación e da captura.

| Cambio respecto á guía | Motivo |
|---|---|
| `tecla.preventDefault()` no Enter | Defensivo: se o formulario quedase cun só campo de texto, Enter enviaríao (*implicit submission*) e recargaría a páxina, e perderíase a axenda. Con dous campos (data + nome) e botóns `type="button"` non pasa, pero é un erro típico ao modificar o HTML. |
| `editarEvento` compara con `Number(idAEditar)` e comproba que `find` atopou algo | Coherente con `eliminarEvento` e evita un `TypeError` se o id non existe. |
| Os botóns Editar/Eliminar van agrupados nun `span` | Con `justify-content: space-between` quedan xuntos á dereita, como na captura. |

**Trampa de exame:** `new Date('2026-10-14')` é medianoite **UTC**; `new Date('2026-10-14T00:00:00')` é medianoite **local**. Por iso a guía insiste en engadir `T00:00:00`.

**Limitación coñecida (non corrixida, é da guía):** `renderizarEventos` fai `sort` sobre o array que recibe, polo que tamén reordena `axenda`. Non causa erros aquí, pero é un efecto colateral (`[...lista].sort(...)` evitaríao).

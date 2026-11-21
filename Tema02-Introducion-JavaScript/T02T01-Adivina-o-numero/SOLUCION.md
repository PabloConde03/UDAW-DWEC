# T02T01 · Notas da solución

Solución fiel á guía, con estes axustes:

| Cambio | Motivo |
|---|---|
| Mensaxes «entre 1 **e** 100» | A guía mesturaba castelán («1 y 100») co galego. |
| Eliminada a liña duplicada `document.getElementById('xogada').disabled = true` | Xa se fai con `entradaXogador.disabled = true`. |
| Referencia ao botón gardada en `botonEntrada` | Evita volver consultar o DOM en cada acerto. |
| `min="1" max="100"` no input | Activa `:invalid` no CSS cando o valor está fóra de rango (a guía define o estilo pero o input non tiña restricións, así que nunca se aplicaba). |

**Trampa de exame:** `Number('')` devolve `0`, non `NaN`. O campo baleiro só se rexeita porque `0 < 1`.

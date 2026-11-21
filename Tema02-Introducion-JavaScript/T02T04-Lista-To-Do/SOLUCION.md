# T02T04 · Notas da solución

A guía non incluía `renderizarTarefas()` nin o CSS completo; reconstruíronse a partir da especificación e da captura.

| Cambio respecto á guía | Motivo |
|---|---|
| Eliminada `formularioTarefa` | Non se usaba e buscaba `#formulario-tarefa`, que non existe (o HTML usa unha **clase**): valía `null`. |
| O listener usa `entradaTarefa` en vez de volver chamar a `getElementById` | Xa temos a referencia. |
| Chamada inicial a `renderizarTarefas()` | A proba 1 esixe que o campo estea enfocado ao cargar. |

**Trampa de exame:** os botóns usan o **índice** `i`, non o `id`. Funciona porque se volve renderizar despois de cada `sort`/`splice`; se algún día se renderizase unha lista filtrada, os índices xa non coincidirían cos do array `tarefas`. Por iso T02T03 e T02T06 usan `id`.

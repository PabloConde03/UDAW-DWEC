# T02T02 · Notas da solución

| Cambio respecto á guía | Motivo |
|---|---|
| A saída inclúe a **data exacta** e os **días que faltan** | A guía calculaba `dataFormatada` e `diasFaltan` pero non os mostraba. A súa propia lista de comprobación e a captura esixen as tres liñas. |
| `new Date(dataStr + 'T00:00:00')` | `new Date('2007-07-27')` interprétase en **UTC**. En zonas horarias negativas (América) quedaría no día anterior. Con `T00:00:00` interprétase en hora local. |
| `hoxe.setHours(0, 0, 0, 0)` | Sen isto, se hoxe é o aniversario, `aniversario (00:00) < agora` e saltaría ao ano seguinte. Tamén evita que «Faltan» redondee mal. |

**Caso límite coñecido:** quen naceu o 29 de febreiro → `new Date(ano, 1, 29)` nun ano non bisesto pasa ao 1 de marzo. A guía non o trata; é un bo tema para unha pregunta de exame.

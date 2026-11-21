# T02T06 · Notas da solución

HTML e CSS fieis á guía. No JS mantéñense os nomes e o fluxo, con estes cambios:

| Cambio respecto á guía | Motivo |
|---|---|
| `var` → `const` / `let` | Ámbito de bloque e sen redeclaracións accidentais (é o estándar actual e o que se pide no tema). |
| `obterProximoAniversario` e `calcularDiasFaltan` usan **hoxe á medianoite** | Na guía, `proximoAniv (00:00) < agora` era certo **o mesmo día do aniversario**, así que saltaba ao ano seguinte e mostraba ~365 días. O parche `365 + diasFaltan` só ocultaba o síntoma. |
| `limparFormulario()` volve renderizar a axenda completa | A guía di que despois dunha busca hai que «limpar para volver á listaxe completa», pero `limparFormulario` non renderizaba: a listaxe filtrada seguía á vista. |
| `xestionarContacto` e `eliminarContacto` xa non renderizan á parte | Agora o fai `limparFormulario()`; evítase renderizar dúas veces. |

**Comportamento da guía que se mantén (para comentalo no exame):**

- Mentres se edita, o botón Crear queda **desactivado** co texto «Cancelar»; para cancelar úsase «Limpar». É confuso para a persoa usuaria.
- A busca usa o texto do campo **Nome**, e a validación de nome obrigatorio tamén se aplica ao buscar.
- `innerHTML` con datos do usuario → risco de inxección de HTML (próbao cun nome como `<b>Ana</b>`).

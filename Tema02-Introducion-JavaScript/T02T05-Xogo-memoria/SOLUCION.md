# T02T05 · Notas da solución

Código JS idéntico ao da guía. Cambios menores:

| Cambio | Motivo |
|---|---|
| As emoticonas escribíronse directamente no array | No PDF aparecen como espazos en branco (a fonte non as exportou). |
| CSS de `.contido-carta`, tamaños de fonte e `#mensaxe` | A guía só daba os fragmentos clave. |
| Media query `max-width: 480px` | É a mellora que a propia guía propón para pantallas estreitas. |

**Trampas de exame:**

- **`'⛈️'` e `'🌤️'` levan un selector de variación (U+FE0F)**, así que o seu `.length` é 2 en vez de 1. Para `===` non importa, porque se comparan cadeas idénticas.
- O `setTimeout(comprobarParella, 900)` pasa **a función**, non `comprobarParella()`. Con parénteses executaríase ao momento.
- Sen `bloqueoTaboleiro`, durante os 900 ms poderíase virar unha terceira carta e `cartasViradas` tería 3 elementos.

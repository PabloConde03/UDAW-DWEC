/**
 * =======================================================================
 *  T02T01 · Adiviña o número — t02t01.js
 *  Enunciado: README.md de esta carpeta
 * -----------------------------------------------------------------------
 *  @estado  pendiente      ← pendiente | en-progreso | completado
 *  @horas   0              ← horas dedicadas (admite 1.5)
 * -----------------------------------------------------------------------
 *  OBJETIVO
 *    Juego de adivinar un número del 1 al 100 con validación, pistas y
 *    contador de intentos.
 *
 *  PISTAS
 *    · Sin defer, getElementById devuelve null: el script se ejecutaría
 *      antes de que exista el HTML.
 *    · Plantillas de texto: `Intentos: ${intentos}`
 *
 *  ⚠ TRAMPA DE EXAMEN
 *    Number('') es 0, no NaN. El campo vacío solo se rechaza porque 0 <
 *    1. Y '5' === 5 es false: convierte antes de comparar.
 *
 *  PROBAR
 *    Abre index.html con Live Server y mira la consola (F12).
 * =======================================================================
 */

// ── ESTADO Y REFERENCIAS AL DOM ───────────────────────────────────────────

// TODO 1: Constantes con las referencias a #xogada, #mensaxe y #intentos
// TODO 2: numeroAleatorio: entero 1..100 con Math.floor(Math.random() *
//         100) + 1
// TODO 3: intentos: let, empieza en 0


// ── FUNCIONES ────────────────────────────────────────────────────────────

function comprobarSuposicion() {
    // TODO 4: Lee el valor del input y conviértelo con Number()
    // TODO 5: Si es NaN o está fuera de [1, 100]: mensaje de validación
    //         y return (¡sin contar el intento!)
    // TODO 6: Incrementa intentos
    // TODO 7: Acierto (===): mensaje de parabéns con número e intentos,
    //         color #28a745, input disabled y botón oculto
    // TODO 8: Menor → «O número é máis alto.» · Mayor → «O número é máis
    //         baixo.»
    // TODO 9: Actualiza «Intentos: N», vacía el input y devuélvele el
    //         foco
}

/**
 * =======================================================================
 *  T02T02 · Calculadora de aniversario — script.js
 *  Enunciado: README.md de esta carpeta
 * -----------------------------------------------------------------------
 *  @estado  pendiente      ← pendiente | en-progreso | completado
 *  @horas   0              ← horas dedicadas (admite 1.5)
 * -----------------------------------------------------------------------
 *  OBJETIVO
 *    Encontrar el siguiente aniversario que caiga en el día de la semana
 *    elegido, con la edad y los días que faltan.
 *
 *  PISTAS
 *    · new Date(2027, 6, 27): ¡los meses van de 0 a 11!
 *    · Días = ms / (1000 * 60 * 60 * 24)
 *
 *  ⚠ TRAMPA DE EXAMEN
 *    new Date('2007-07-27') se interpreta en UTC. Usa
 *    '2007-07-27T00:00:00' (hora local) y pon hoxe a medianoche con
 *    setHours(0,0,0,0).
 *
 *  PROBAR
 *    Abre index.html con Live Server y mira la consola (F12).
 * =======================================================================
 */

// ── ESTADO Y REFERENCIAS AL DOM ───────────────────────────────────────────

// TODO 1: Referencias a #data-nacemento, #dia-semana y #resultado
// TODO 2: const diasGL = ['Domingo', 'Luns', … 'Sábado'] (orden de
//         getDay)


// ── FUNCIONES ────────────────────────────────────────────────────────────

function calcularAniversario() {
    // TODO 3: Lee la fecha y el día; convierte el día con Number()
    // TODO 4: Valida que estén los dos datos (mensaje si falta alguno)
    // TODO 5: Crea la fecha de nacimiento y 'hoxe'; rechaza fechas no
    //         válidas o futuras
    // TODO 6: Aniversario de este año; si ya ha pasado, súmale un año
    // TODO 7: while: suma años hasta que getDay() coincida con el día
    //         deseado
    // TODO 8: Calcula los años que cumplirá y los días que faltan
    //         (getTime + Math.ceil)
    // TODO 9: Pinta en #resultado (innerHTML): h2, años, día de la
    //         semana, FECHA COMPLETA (toLocaleDateString 'gl-ES') y DÍAS
    //         QUE FALTAN
}

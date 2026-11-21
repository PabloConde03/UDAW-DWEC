/**
 * =======================================================================
 *  T02T04 · Lista To-Do — script.js
 *  Enunciado: README.md de esta carpeta
 * -----------------------------------------------------------------------
 *  @estado  pendiente      ← pendiente | en-progreso | completado
 *  @horas   0              ← horas dedicadas (admite 1.5)
 * -----------------------------------------------------------------------
 *  OBJETIVO
 *    Lista de tareas ordenada alfabéticamente, con completar/descompletar
 *    y eliminar.
 *
 *  PISTAS
 *    · a.texto.localeCompare(b.texto) ordena respetando tildes y la ñ.
 *    · Llama a renderizarTarefas() al final del script para que el foco
 *      esté en el input al cargar.
 *
 *  ⚠ TRAMPA DE EXAMEN
 *    sort() sin comparador ordena como texto por código Unicode: 'Zapato'
 *    iría antes que 'árbol'. Con números: [10, 9, 1].sort() → [1, 10, 9].
 *
 *  PROBAR
 *    Abre index.html con Live Server y mira la consola (F12).
 * =======================================================================
 */

// ── ESTADO Y REFERENCIAS AL DOM ───────────────────────────────────────────

// TODO 1: Referencias a #entrada-tarefa y #lista-tarefas
// TODO 2: let tarefas = [] → objetos { id, texto, completada }
// TODO 3: keypress en el input: Enter → engadirTarefa()


// ── FUNCIONES ────────────────────────────────────────────────────────────

function renderizarTarefas() {
    // TODO 4: for sobre tarefas: li.elemento-tarefa (+ 'completada'),
    //         span con el texto y div.contedor-btns
    // TODO 5: Botones ✔ .btn-completar / ✖ .btn-eliminar con onclick y
    //         el ÍNDICE i
    // TODO 6: innerHTML en la lista y foco en el input
}

function engadirTarefa() {
    // TODO 7: value.trim(); si no está vacío → push de { id: Date.now(),
    //         texto, completada: false }
    // TODO 8: sort con localeCompare
    // TODO 9: Renderiza y vacía el input
}

function completarTarefa(indice) {
    // TODO 10: Si existe, invierte completada con !
    // TODO 11: Renderiza
}

function eliminarTarefa(indice) {
    // TODO 12: Si existe, splice(indice, 1)
    // TODO 13: Renderiza
}

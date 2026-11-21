/**
 * =======================================================================
 *  T02T03 · Axenda de eventos — script.js
 *  Enunciado: README.md de esta carpeta
 * -----------------------------------------------------------------------
 *  @estado  pendiente      ← pendiente | en-progreso | completado
 *  @horas   0              ← horas dedicadas (admite 1.5)
 * -----------------------------------------------------------------------
 *  OBJETIVO
 *    Agenda en memoria: añadir, listar ordenado, filtrar por intervalo,
 *    editar y eliminar eventos.
 *
 *  PISTAS
 *    · Restar dos Date da milisegundos: sirve como comparador de sort.
 *    · El onclick lleva el id como número: 'editarEvento(' + evento.id +
 *      ')'
 *
 *  ⚠ TRAMPA DE EXAMEN
 *    Comparar dos Date con == compara referencias (siempre false). Usa <,
 *    >, o getTime() ===.
 *
 *  PROBAR
 *    Abre index.html con Live Server y mira la consola (F12).
 * =======================================================================
 */

// ── ESTADO Y REFERENCIAS AL DOM ───────────────────────────────────────────

// TODO 1: Referencias a #data-evento, #nome-evento y #lista-eventos
// TODO 2: let axenda = [] → objetos { id, data, dataObj, nome } con id =
//         Number(Date.now())
// TODO 3: addEventListener('keypress', (tecla) => …) en el nombre: Enter
//         → engadirEvento()


// ── FUNCIONES ────────────────────────────────────────────────────────────

function formatarData(data) {
    // TODO 4: Devuelve toLocaleDateString('gl-ES', { weekday: 'short',
    //         year: 'numeric', month: 'short', day: 'numeric' })
}

function engadirEvento() {
    // TODO 5: Lee la fecha y el nombre (trim)
    // TODO 6: alert('Data vacía') / alert('Nome evento vacío')
    // TODO 7: Fecha a medianoche local (dataStr + 'T00:00:00') y
    //         compárala con hoxe normalizado; si es pasada → alert
    // TODO 8: push al array, limpia el nombre, renderiza y devuelve el
    //         foco
}

function eliminarEvento(idAEliminar) {
    // TODO 9: filter para quedarte con los que tienen otro id
    // TODO 10: Renderiza
}

function editarEvento(idAEditar) {
    // TODO 11: find del evento
    // TODO 12: Carga sus valores en el formulario
    // TODO 13: Elimina la versión antigua
}

function filtrarEventos(rango) {
    // TODO 14: hoxe a medianoche y dataLimite = copia de hoxe
    // TODO 15: semana +7 días · mes +1 mes · ano +1 año · todos +100 años
    // TODO 16: filter con hoxe <= dataObj <= dataLimite y renderiza el
    //         resultado
}

function renderizarEventos(lista) {
    // TODO 17: sort((a, b) => a.dataObj - b.dataObj)
    // TODO 18: for: li.elemento-evento con span.data, span.nome y botones
    //         ✏️ / ✖ con onclick y el id
    // TODO 19: Asigna con innerHTML a la ul
}

/**
 * =======================================================================
 *  T02T06 · Xestor de contactos — script.js
 *  Enunciado: README.md de esta carpeta
 * -----------------------------------------------------------------------
 *  @estado  pendiente      ← pendiente | en-progreso | completado
 *  @horas   0              ← horas dedicadas (admite 1.5)
 * -----------------------------------------------------------------------
 *  OBJETIVO
 *    CRUD de contactos en memoria con búsqueda, ordenación (con copia) y
 *    cálculo del próximo aniversario.
 *
 *  PISTAS
 *    · Desestructuración: const [ano, mes, dia] =
 *      '1990-06-17'.split('-').map(Number);
 *    · findIndex devuelve -1 si no lo encuentra; find devuelve undefined.
 *
 *  ⚠ TRAMPA DE EXAMEN
 *    Si comparas el aniversario (00:00) con new Date() (hora actual), el
 *    MISMO día del cumpleaños sale como 'ya pasado'. Normaliza hoxe a
 *    medianoche.
 *
 *  PROBAR
 *    Abre index.html con Live Server y mira la consola (F12).
 * =======================================================================
 */

// ── ESTADO Y REFERENCIAS AL DOM ───────────────────────────────────────────

// TODO 1: Referencias a todos los inputs, el formulario, la lista, el id
//         oculto y los botones Crear/Modificar
// TODO 2: let axenda = [] → { id, nome, apelidos, telefono, email,
//         dataAniversario, direccion }


// ── FUNCIONES ────────────────────────────────────────────────────────────

function obterProximoAniversario(dataAniversario) {
    // TODO 3: split('-').map(Number) → [ano, mes, dia]
    // TODO 4: Fecha de este año (mes - 1); si ya pasó, +1 año
}

function calcularDiasFaltan(dataFutura) {
    // TODO 5: hoxe a medianoche
    // TODO 6: Diferencia en ms → días con Math.ceil
}

function limparFormulario() {
    // TODO 7: form.reset() y vaciar el id oculto
    // TODO 8: Crear activo con «💾 Crear», Modificar desactivado
}

function xestionarContacto(accion) {
    // TODO 9: Nombre obligatorio → alert
    // TODO 10: Construye el objeto (id del oculto o Date.now())
    // TODO 11: crear: push + alert · modificar: findIndex y sustituir +
    //         alert
    // TODO 12: buscar: filter por nombre O apellidos (toLowerCase +
    //         includes), renderiza y return sin limpiar
    // TODO 13: Tras crear/modificar: limpiar y renderizar
}

function cargarContactoParaEditar(id) {
    // TODO 14: find por id y carga los campos + id oculto
    // TODO 15: Crear desactivado (texto «Cancelar»), Modificar activo
}

function eliminarContacto(id) {
    // TODO 16: confirm(...) → filter sin ese id, renderiza y limpia
}

function ordenarContactos(criterio) {
    // TODO 17: Copia con [...axenda]
    // TODO 18: apelidos/aniversario: descarta los que no tienen ese dato
    // TODO 19: sort: localeCompare(…, 'gl') o diferencia de días hasta el
    //         aniversario
    // TODO 20: Renderiza la copia
}

function renderizarContactos(lista) {
    // TODO 21: Vacía → li «Non hai contactos nesta axenda.»
    // TODO 22: Si no: li.contacto-item con nombre, aniversario «17 jun
    //         (246 días)», teléfono || email || 'N/A' y botones 📝 / 🗑️
}

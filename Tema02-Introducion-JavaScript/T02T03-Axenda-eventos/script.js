// REFERENCIAS AO DOM E ESTADO
let dataEventoInput = document.getElementById('data-evento');
let nomeEventoInput = document.getElementById('nome-evento');
let listaEventosUl = document.getElementById('lista-eventos');
let axenda = [];   // [{ id, data, dataObj, nome }]

// Enter no campo do nome = premer «Gardar Evento»
nomeEventoInput.addEventListener('keypress', (tecla) => {
    if (tecla.key === 'Enter') {
        tecla.preventDefault();   // evita o envío implícito do formulario
        engadirEvento();
    }
});

function formatarData(data) {
    return data.toLocaleDateString('gl-ES', {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
    });
}

function engadirEvento() {
    let dataStr = dataEventoInput.value;
    let nomeStr = nomeEventoInput.value.trim();

    if (!dataStr) { alert('Data vacía'); return; }
    if (!nomeStr) { alert('Nome evento vacío'); return; }

    // Medianoite en hora local para comparar só o día
    let novaData = new Date(dataStr + 'T00:00:00');
    let hoxe = new Date();
    hoxe.setHours(0, 0, 0, 0);

    if (novaData < hoxe) {
        alert('Non se poden engadir eventos con data pasada.');
        return false;
    }

    axenda.push({ id: Number(Date.now()), data: dataStr, dataObj: novaData, nome: nomeStr });
    nomeEventoInput.value = '';
    renderizarEventos(axenda);
    nomeEventoInput.focus();
    return false;
}

function eliminarEvento(idAEliminar) {
    axenda = axenda.filter((evento) => evento.id !== Number(idAEliminar));
    renderizarEventos(axenda);
}

function editarEvento(idAEditar) {
    let eventoAEditar = axenda.find((evento) => evento.id === Number(idAEditar));
    if (!eventoAEditar) return;

    dataEventoInput.value = eventoAEditar.data;
    nomeEventoInput.value = eventoAEditar.nome;
    eliminarEvento(idAEditar);   // editar = cargar + borrar + volver gardar
    nomeEventoInput.focus();
}

function filtrarEventos(rango) {
    let hoxe = new Date();
    hoxe.setHours(0, 0, 0, 0);
    let dataLimite = new Date(hoxe);

    if (rango === 'semana') dataLimite.setDate(hoxe.getDate() + 7);
    else if (rango === 'mes') dataLimite.setMonth(hoxe.getMonth() + 1);
    else if (rango === 'ano') dataLimite.setFullYear(hoxe.getFullYear() + 1);
    else if (rango === 'todos') dataLimite.setFullYear(hoxe.getFullYear() + 100);

    let eventosFiltrados = axenda.filter((evento) =>
        evento.dataObj >= hoxe && evento.dataObj <= dataLimite);
    renderizarEventos(eventosFiltrados);
}

function renderizarEventos(lista) {
    // Restar dous Date dá a diferenza en ms -> orde cronolóxica
    lista.sort((a, b) => a.dataObj - b.dataObj);

    let htmlLista = '';
    for (let i = 0; i < lista.length; i++) {
        let evento = lista[i];
        htmlLista += '<li class="elemento-evento">';
        htmlLista += '<span class="data">' + formatarData(evento.dataObj) + '</span>';
        htmlLista += '<span class="nome">' + evento.nome + '</span>';
        htmlLista += '<span>';
        htmlLista += '<button class="btn-editar" title="Editar" onclick="editarEvento(' + evento.id + ')">✏️</button>';
        htmlLista += '<button class="btn-eliminar" title="Eliminar" onclick="eliminarEvento(' + evento.id + ')">✖</button>';
        htmlLista += '</span>';
        htmlLista += '</li>';
    }
    listaEventosUl.innerHTML = htmlLista;
}

renderizarEventos(axenda);

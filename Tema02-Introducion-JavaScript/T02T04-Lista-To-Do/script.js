// REFERENCIAS AO DOM E ESTADO
let entradaTarefa = document.getElementById('entrada-tarefa');
let listaTarefas = document.getElementById('lista-tarefas');
let tarefas = [];   // [{ id, texto, completada }]

// Enter no campo = premer «Engadir»
entradaTarefa.addEventListener('keypress', (tecla) => {
    if (tecla.key === 'Enter') {
        engadirTarefa();
    }
});

function renderizarTarefas() {
    let html = '';
    for (let i = 0; i < tarefas.length; i++) {
        let tarefa = tarefas[i];
        let clase = tarefa.completada ? 'elemento-tarefa completada' : 'elemento-tarefa';
        html += '<li class="' + clase + '">';
        html += '<span>' + tarefa.texto + '</span>';
        html += '<div class="contedor-btns">';
        html += '<button class="btn-completar" title="Completar" onclick="completarTarefa(' + i + ')">✔</button>';
        html += '<button class="btn-eliminar" title="Eliminar" onclick="eliminarTarefa(' + i + ')">✖</button>';
        html += '</div>';
        html += '</li>';
    }
    listaTarefas.innerHTML = html;
    entradaTarefa.focus();
}

function engadirTarefa() {
    let textoTarefa = entradaTarefa.value.trim();
    if (textoTarefa !== '') {
        tarefas.push({ id: Date.now(), texto: textoTarefa, completada: false });
        tarefas.sort((a, b) => a.texto.localeCompare(b.texto));
        renderizarTarefas();
        entradaTarefa.value = '';
    }
}

function completarTarefa(indice) {
    if (tarefas[indice]) {
        tarefas[indice].completada = !tarefas[indice].completada;
        renderizarTarefas();
    }
}

function eliminarTarefa(indice) {
    if (tarefas[indice]) {
        tarefas.splice(indice, 1);
        renderizarTarefas();
    }
}

renderizarTarefas();   // estado inicial: lista baleira e foco no campo

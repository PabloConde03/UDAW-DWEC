// VARIABLES DO DOM
const formularioContacto = document.getElementById('formulario-contacto');
const listaContactosUl = document.getElementById('lista-contactos');
const nomeInput = document.getElementById('nome');
const apelidosInput = document.getElementById('apelidos');
const telefonoInput = document.getElementById('telefono');
const emailInput = document.getElementById('email');
const aniversarioInput = document.getElementById('data-aniversario');
const direccionInput = document.getElementById('direccion');
const idOcultoInput = document.getElementById('contacto-id-oculto');
const btnCrear = document.getElementById('btn-crear');
const btnModificar = document.getElementById('btn-modificar');

// VARIABLES DE DATOS
let axenda = [];   // [{ id, nome, apelidos, telefono, email, dataAniversario, direccion }]

// -------------------------------------------------------------
// FUNCIÓNS DE AXUDA
// -------------------------------------------------------------

// Hoxe á medianoite, para comparar só días
function hoxeMedianoite() {
    const hoxe = new Date();
    hoxe.setHours(0, 0, 0, 0);
    return hoxe;
}

// Próximo aniversario a partir dunha data AAAA-MM-DD
function obterProximoAniversario(dataAniversario) {
    const hoxe = hoxeMedianoite();
    const anoActual = hoxe.getFullYear();
    const [, mes, dia] = dataAniversario.split('-').map(Number);
    const proximoAniv = new Date(anoActual, mes - 1, dia); // os meses en Date van de 0 a 11

    // Se a data deste ano xa pasou, imos ao próximo ano
    if (proximoAniv < hoxe) {
        proximoAniv.setFullYear(anoActual + 1);
    }
    return proximoAniv;
}

// Días que faltan desde hoxe ata unha data futura
function calcularDiasFaltan(dataFutura) {
    const diferenzaTempo = dataFutura.getTime() - hoxeMedianoite().getTime();
    return Math.ceil(diferenzaTempo / (1000 * 60 * 60 * 24));
}

// Limpa o formulario e restablece os botóns
function limparFormulario() {
    formularioContacto.reset();
    idOcultoInput.value = '';
    btnCrear.disabled = false;
    btnModificar.disabled = true;
    btnCrear.innerText = '💾 Crear';
    renderizarContactos(axenda);   // volve á listaxe completa despois dunha busca
}

// -------------------------------------------------------------
// FUNCIÓNS CRUD
// -------------------------------------------------------------

function xestionarContacto(accion) {
    const idContacto = idOcultoInput.value;
    const nome = nomeInput.value.trim();

    // Validación obrigatoria
    if (!nome) {
        alert('O nome é un campo obrigatorio.');
        return;
    }

    const contactoActualizado = {
        id: idContacto ? Number(idContacto) : Date.now(),
        nome: nome,
        apelidos: apelidosInput.value.trim(),
        telefono: telefonoInput.value.trim(),
        email: emailInput.value.trim(),
        dataAniversario: aniversarioInput.value,
        direccion: direccionInput.value.trim(),
    };

    if (accion === 'crear' && !idContacto) {
        axenda.push(contactoActualizado);
        alert('Contacto creado con éxito!');
    } else if (accion === 'modificar' && idContacto) {
        const indice = axenda.findIndex(c => c.id === Number(idContacto));
        if (indice !== -1) {
            axenda[indice] = contactoActualizado;
            alert('Contacto modificado con éxito!');
        }
    } else if (accion === 'buscar') {
        const texto = nome.toLowerCase();
        renderizarContactos(axenda.filter(c =>
            c.nome.toLowerCase().includes(texto) ||
            c.apelidos.toLowerCase().includes(texto)
        ));
        return; // Non limpar o formulario despois de buscar
    } else {
        return; // Acción non válida para o estado actual
    }

    limparFormulario();
}

// Carga os datos dun contacto no formulario para editalo
function cargarContactoParaEditar(id) {
    const contacto = axenda.find(c => c.id === Number(id));
    if (contacto) {
        nomeInput.value = contacto.nome;
        apelidosInput.value = contacto.apelidos;
        telefonoInput.value = contacto.telefono;
        emailInput.value = contacto.email;
        aniversarioInput.value = contacto.dataAniversario;
        direccionInput.value = contacto.direccion;
        idOcultoInput.value = contacto.id;

        btnCrear.disabled = true;
        btnModificar.disabled = false;
        btnCrear.innerText = 'Cancelar';
    }
}

function eliminarContacto(id) {
    if (confirm('Está seguro de que quere eliminar este contacto?')) {
        axenda = axenda.filter(c => c.id !== Number(id));
        limparFormulario();
    }
}

// -------------------------------------------------------------
// ORDENACIÓN
// -------------------------------------------------------------

function ordenarContactos(criterio) {
    // Copia: ordenar a vista non cambia a orde gardada en «axenda»
    let lista = [...axenda];

    // Sen o dato polo que se ordena, o contacto non se mostra
    if (criterio === 'apelidos') {
        lista = lista.filter(c => c.apelidos !== '');
    } else if (criterio === 'aniversario') {
        lista = lista.filter(c => c.dataAniversario !== '');
    }

    // O comparador devolve < 0 se «a» vai antes, 0 se son iguais, > 0 se vai despois
    lista.sort((a, b) => {
        if (criterio === 'nome') {
            return a.nome.localeCompare(b.nome, 'gl');
        } else if (criterio === 'apelidos') {
            return a.apelidos.localeCompare(b.apelidos, 'gl');
        } else if (criterio === 'aniversario') {
            return calcularDiasFaltan(obterProximoAniversario(a.dataAniversario)) -
                   calcularDiasFaltan(obterProximoAniversario(b.dataAniversario));
        }
        return 0;
    });

    renderizarContactos(lista);
}

// -------------------------------------------------------------
// RENDERIZADO
// -------------------------------------------------------------

function renderizarContactos(lista) {
    if (lista.length === 0) {
        listaContactosUl.innerHTML = '<li style="text-align: center; color: #999;">Non hai contactos nesta axenda.</li>';
        return;
    }

    let htmlLista = '';
    for (let i = 0; i < lista.length; i++) {
        const c = lista[i];
        let infoAniversario = '';

        if (c.dataAniversario) {
            const proximoAniv = obterProximoAniversario(c.dataAniversario);
            const diasFaltan = calcularDiasFaltan(proximoAniv);
            const aniversarioFormatado = proximoAniv.toLocaleDateString('gl-ES', { month: 'short', day: 'numeric' });
            infoAniversario = aniversarioFormatado + ' (' + diasFaltan + ' días)';
        }

        htmlLista += '<li class="contacto-item">';
        htmlLista += '<span class="contacto-nome">' + c.nome + ' ' + c.apelidos + '</span>';
        htmlLista += '<span class="contacto-info">' + infoAniversario + '</span>';
        htmlLista += '<span class="contacto-info">' + (c.telefono || c.email || 'N/A') + '</span>';
        htmlLista += '<span class="btns-accion">';
        htmlLista += '<button type="button" class="btn-editar" title="Editar" onclick="cargarContactoParaEditar(' + c.id + ')">📝</button>';
        htmlLista += '<button type="button" class="btn-eliminar" title="Eliminar" onclick="eliminarContacto(' + c.id + ')">🗑️</button>';
        htmlLista += '</span>';
        htmlLista += '</li>';
    }
    listaContactosUl.innerHTML = htmlLista;
}

// Inicializar a vista coa axenda baleira
renderizarContactos(axenda);

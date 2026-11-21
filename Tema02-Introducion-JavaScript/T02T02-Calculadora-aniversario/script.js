// REFERENCIAS AO DOM
let dataNacementoInput = document.getElementById('data-nacemento');
let diaSemanaSelect = document.getElementById('dia-semana');
let resultadoDiv = document.getElementById('resultado');

// Índices de Date.getDay(): 0 = domingo ... 6 = sábado
const diasGL = ['Domingo', 'Luns', 'Martes', 'Mércores', 'Xoves', 'Venres', 'Sábado'];

function calcularAniversario() {
    let dataNacementoStr = dataNacementoInput.value;
    let diaDesexado = Number(diaSemanaSelect.value);   // "0".."6" -> 0..6

    // Validación: os dous datos son obrigatorios
    if (!dataNacementoStr || diaSemanaSelect.value === '') {
        resultadoDiv.innerText = 'Por favor, introduce unha data de nacemento e selecciona un día.';
        return false;
    }

    // 'T00:00:00' fai que a data se interprete en hora local, non en UTC
    let dataNacemento = new Date(dataNacementoStr + 'T00:00:00');
    let hoxe = new Date();
    hoxe.setHours(0, 0, 0, 0);

    if (isNaN(dataNacemento) || dataNacemento > hoxe) {
        resultadoDiv.innerText = 'Por favor, introduce unha data válida e que non estea no futuro.';
        return false;
    }

    // Aniversario deste ano; se xa pasou, o do ano seguinte
    let anoActual = hoxe.getFullYear();
    let dataProximoAniversario = new Date(anoActual, dataNacemento.getMonth(), dataNacemento.getDate());
    if (dataProximoAniversario < hoxe) {
        dataProximoAniversario.setFullYear(anoActual + 1);
    }

    // Avanzar ano a ano ata que o aniversario caia no día desexado
    while (dataProximoAniversario.getDay() !== diaDesexado) {
        dataProximoAniversario.setFullYear(dataProximoAniversario.getFullYear() + 1);
    }

    let anosACumprir = dataProximoAniversario.getFullYear() - dataNacemento.getFullYear();
    let tempoFalta = dataProximoAniversario.getTime() - hoxe.getTime();
    let diasFaltan = Math.ceil(tempoFalta / (1000 * 60 * 60 * 24));

    let dataFormatada = dataProximoAniversario.toLocaleDateString('gl-ES', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    let htmlResultado = '<h2>Resultado do Aniversario</h2>';
    htmlResultado += '<p>O teu aniversario número <strong>' + anosACumprir +
        '</strong> anos cadrará no <strong>' + diasGL[dataProximoAniversario.getDay()] + '</strong>.</p>';
    htmlResultado += '<p>A data exacta será: <strong>' + dataFormatada + '</strong></p>';
    htmlResultado += '<p>Faltan <strong>' + diasFaltan + '</strong> días para ese gran día.</p>';

    resultadoDiv.innerHTML = htmlResultado;
    return false;
}

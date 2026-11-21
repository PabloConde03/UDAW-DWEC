// REFERENCIAS AO DOM
let taboleiro = document.getElementById('taboleiro');
let mensaxeDisplay = document.getElementById('mensaxe');
let contadorXogadasDisplay = document.getElementById('contador-xogadas');

// DATOS: 8 emoticonas duplicadas con spread -> 16 cartas
let emoticonosBase = ['🌟', '🌜', '🌤️', '⛈️', '🏀', '🚿', '🥗', '🦀'];
let emoticonos = [...emoticonosBase, ...emoticonosBase];

// ESTADO
let estadoTaboleiro = [];     // [{ virada, atopada, emoticono }]
let cartasViradas = [];       // índices das cartas da quenda (máx. 2)
let bloqueoTaboleiro = false; // true mentres se comproba unha parella
let paresAtopados = 0;
let xogadas = 0;

// Mestura de Fisher-Yates
function embarallarArray(array) {
    let indiceActual = array.length;
    let valorTemporal;
    let indiceAleatorio;

    while (indiceActual !== 0) {
        indiceAleatorio = Math.floor(Math.random() * indiceActual);
        indiceActual--;
        valorTemporal = array[indiceActual];
        array[indiceActual] = array[indiceAleatorio];
        array[indiceAleatorio] = valorTemporal;
    }
    return array;
}

function iniciarXogo() {
    emoticonos = embarallarArray(emoticonos);
    for (let i = 0; i < emoticonos.length; i++) {
        estadoTaboleiro.push({ virada: false, atopada: false, emoticono: emoticonos[i] });
    }
    renderizarTaboleiro();
}

function renderizarTaboleiro() {
    let htmlTaboleiro = '';
    for (let i = 0; i < estadoTaboleiro.length; i++) {
        let estado = estadoTaboleiro[i];
        let claseCarta = estado.virada ? 'carta-virada' : '';
        claseCarta += estado.atopada ? ' parella-atopada' : '';

        htmlTaboleiro += '<div class="carta ' + claseCarta + '" onclick="voltearCarta(' + i + ')">';
        htmlTaboleiro += '<div class="contido-carta">';
        htmlTaboleiro += '<div class="parte-diante">?</div>';
        htmlTaboleiro += '<div class="parte-detras">' + estado.emoticono + '</div>';
        htmlTaboleiro += '</div></div>';
    }
    taboleiro.innerHTML = htmlTaboleiro;
}

function voltearCarta(indice) {
    let carta = estadoTaboleiro[indice];
    // Saída temperá: bloqueado, xa virada ou xa atopada
    if (bloqueoTaboleiro || carta.virada || carta.atopada) return;

    carta.virada = true;
    cartasViradas.push(indice);
    renderizarTaboleiro();

    if (cartasViradas.length === 2) {
        bloqueoTaboleiro = true;
        xogadas++;
        contadorXogadasDisplay.innerText = 'Xogadas: ' + xogadas;
        setTimeout(comprobarParella, 900);
    }
}

function comprobarParella() {
    let carta1 = estadoTaboleiro[cartasViradas[0]];
    let carta2 = estadoTaboleiro[cartasViradas[1]];

    if (carta1.emoticono === carta2.emoticono) {
        carta1.atopada = true;
        carta2.atopada = true;
        paresAtopados++;
        mensaxeDisplay.innerText = '¡Parella atopada! 🎉';
        if (paresAtopados === emoticonos.length / 2) {
            mensaxeDisplay.innerText = '¡Xogo completado en ' + xogadas + ' xogadas! 🏆';
        }
    } else {
        carta1.virada = false;
        carta2.virada = false;
        mensaxeDisplay.innerText = 'Tenta de novo...';
    }

    cartasViradas = [];
    bloqueoTaboleiro = false;
    renderizarTaboleiro();
}

iniciarXogo();

// VARIABLES GLOBAIS
const entradaXogador = document.getElementById('xogada');
const mensaxePantalla = document.getElementById('mensaxe');
const intentosPantalla = document.getElementById('intentos');
const botonEntrada = document.getElementById('boton-entrada');

// Enteiro aleatorio entre 1 e 100 (ambos incluídos)
const numeroAleatorio = Math.floor(Math.random() * 100) + 1;
let intentos = 0;

// FUNCIÓNS
function comprobarSuposicion() {
    const suposicionXogador = Number(entradaXogador.value);

    // Validar que a entrada é un número dentro do rango.
    // Ollo: Number('') é 0, así que un campo baleiro tamén cae aquí (0 < 1).
    if (isNaN(suposicionXogador) || suposicionXogador < 1 || suposicionXogador > 100) {
        mensaxePantalla.textContent = 'Por favor, insire un número válido entre 1 e 100.';
        return;
    }

    intentos++;

    // Lóxica do xogo (comparación estrita: os dous operandos son number)
    if (suposicionXogador === numeroAleatorio) {
        mensaxePantalla.textContent = `Parabéns! Adiviñaches o número ${numeroAleatorio} en ${intentos} intentos!`;
        mensaxePantalla.style.color = '#28a745';
        entradaXogador.disabled = true;
        botonEntrada.style.display = 'none';
    } else if (suposicionXogador < numeroAleatorio) {
        mensaxePantalla.textContent = 'O número é máis alto.';
    } else {
        mensaxePantalla.textContent = 'O número é máis baixo.';
    }

    intentosPantalla.textContent = `Intentos: ${intentos}`;
    entradaXogador.value = '';  // Limpar o campo
    entradaXogador.focus();     // Enfocar o campo para a seguinte suposición
}

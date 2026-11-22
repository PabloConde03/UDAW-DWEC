<div align="center">

# UDAW · DWEC

### Desarrollo Web en Entorno Cliente · MP0612

Tareas guiadas de JavaScript del ciclo superior de **Desarrollo de Aplicaciones Web (DAW)** a distancia · Xunta de Galicia · curso 2026-2027

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Flexbox_·_Grid-1572B6?style=flat-square&logo=css3&logoColor=white)
![Módulo](https://img.shields.io/badge/M%C3%B3dulo-MP0612_DWEC-2563EB?style=flat-square)
![Tareas](https://img.shields.io/badge/tareas-6-111C44?style=flat-square)

</div>

---

> [!WARNING]
> **Aquí están las soluciones.** Si estás estudiando, intenta antes los ejercicios en [`main`](../../tree/main) (o con las plantillas de [`Pablo`](../../tree/Pablo)) y vuelve aquí solo para comparar. Cada carpeta incluye la tarea resuelta y un `SOLUCION.md` con los cambios respecto a la guía oficial y las trampas de examen.

## Contenido

- [Sobre el repositorio](#sobre-el-repositorio)
- [Ramas](#ramas)
- [Índice de tareas](#índice-de-tareas)
- [Estructura](#estructura)
- [Puesta en marcha](#puesta-en-marcha)
- [Convenciones](#convenciones)

---

## Sobre el repositorio

Tareas del **Tema 2 · Introdución a JavaScript** del módulo DWEC. Cada tarea es una mini-aplicación de cliente con la responsabilidad separada en tres ficheros: **HTML** (estructura y DOM), **CSS** (presentación con Flexbox o Grid) y **JS** (estado, validación y renderizado).

Los enunciados se han pasado a Markdown desde las *guías* de la plataforma, en gallego como el original. Al contrario que las guías, **no incluyen el código**: lo sustituye una especificación técnica (ids, clases, nombres de funciones, mensajes y comportamiento) que permite hacer cada tarea desde cero, igual que en el examen.

## Ramas

| Rama | Contenido |
|---|---|
| [`main`](../../tree/main) | Enunciados y capturas del resultado esperado. Sin código. |
| [`Pablo`](../../tree/Pablo) | Enunciados + **plantillas** (`index.html`, CSS y JS con pasos `// TODO`) + **dashboard de progreso** (`dashboard.html`) + [`PROGRESO.md`](../../blob/Pablo/PROGRESO.md), que se actualiza solo. |
| [`solution`](../../tree/solution) | Enunciados + **las 6 tareas resueltas** y probadas, con notas sobre los defectos de la guía original que se han corregido. |

> Para comparar tu trabajo con la solución de una tarea:
> `git diff Pablo solution -- Tema02-Introducion-JavaScript/T02T03-Axenda-eventos/script.js`

## Índice de tareas

### Tema 2 · Introdución a JavaScript

| Código | Tarea | Ficheros | Temas clave |
|---|---|---|---|
| T02T01 | [Adiviña o número](Tema02-Introducion-JavaScript/T02T01-Adivina-o-numero/) | `index.html` · `estilos.css` · `t02t01.js` | `defer`, `Math.random`, `if/else`, DOM |
| T02T02 | [Calculadora de aniversario](Tema02-Introducion-JavaScript/T02T02-Calculadora-aniversario/) | `index.html` · `estilos.css` · `script.js` | `Date`, `getDay()`, `while`, `toLocaleDateString` |
| T02T03 | [Axenda de eventos](Tema02-Introducion-JavaScript/T02T03-Axenda-eventos/) | `index.html` · `estilos.css` · `script.js` | `filter`/`find`/`sort`, funciones flecha, Grid + media query |
| T02T04 | [Lista To-Do](Tema02-Introducion-JavaScript/T02T04-Lista-To-Do/) | `index.html` · `estilos.css` · `script.js` | `push`/`splice`, `localeCompare`, eventos de teclado |
| T02T05 | [Xogo de memoria](Tema02-Introducion-JavaScript/T02T05-Xogo-memoria/) | `index.html` · `estilo.css` · `memoria.js` | Fisher-Yates, spread, `setTimeout`, CSS Grid |
| T02T06 | [Xestor de contactos](Tema02-Introducion-JavaScript/T02T06-Xestor-contactos/) | `index.html` · `estilos.css` · `script.js` | CRUD, `findIndex`, ordenación con copia, Grid + Flexbox |

**Progresión:** cada tarea añade una capa sobre la anterior:

```
T01 variables + if ─► T02 Date + while ─► T03 arrays de objetos + filter/find/sort
                                                  │
                         T06 CRUD completo ◄─ T05 estado + setTimeout ◄─ T04 push/splice + teclado
```

## Estructura

```
UDAW-DWEC/
├── README.md
├── assets/capturas/                 # Resultado esperado de cada tarea
└── Tema02-Introducion-JavaScript/
    └── T02T0N-Nombre/
        ├── README.md                # Enunciado
        ├── SOLUCION.md              # Cambios respecto a la guía y trampas de examen
        ├── index.html
        ├── estilos.css              # estilo.css en la T02T05
        └── script.js                # t02t01.js en la T02T01, memoria.js en la T02T05
```

## Puesta en marcha

```bash
git clone https://github.com/PabloConde03/UDAW-DWEC.git
cd UDAW-DWEC
git checkout solution
code .
```

Abre cualquier `index.html` con **Live Server** (extensión de VS Code), que sirve la carpeta en `http://127.0.0.1:5500/` igual que en las capturas de la guía. Las tareas no necesitan servidor: también funcionan con doble clic sobre `index.html`.

## Convenciones

- **Carpetas:** `TemaNN-Nombre/TNNTNN-Nombre-tarea/`, sin tildes ni espacios.
- **Nombres de fichero:** los que fija cada enunciado. Ojo: la T02T05 usa `estilo.css` y `memoria.js`.
- **Idioma:** enunciados e identificadores en gallego, como el material oficial; comentarios de ayuda en castellano.
- **Notas del editor:** las erratas o discrepancias de los PDF originales se marcan con ⚠️ dentro del enunciado.

---

<div align="center">
<sub>Material didáctico: IES Fernando Wirtz Suárez · Xunta de Galicia. Recopilado con fines de estudio personal.</sub>
</div>

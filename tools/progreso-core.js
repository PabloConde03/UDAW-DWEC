/**
 * Núcleo de progreso · UDAW-DWEC
 * ---------------------------------------------------------------------------
 * Funciones puras (sin acceso a ficheros) compartidas por:
 *   - dashboard.html            → en el navegador, lee los ficheros con fetch
 *   - tools/generar-progreso.js → en Node, genera PROGRESO.md y el bloque del README
 *
 * Fuente de verdad del estado: la cabecera del JS principal de cada tarea
 *     @estado  pendiente | en-progreso | completado
 *     @horas   1.5
 * Si la tarea sigue «pendiente» pero algún fichero ya no es la plantilla,
 * pasa a «en-progreso» automáticamente. Cada TODO borrado cuenta como paso hecho.
 */

export const ESTADOS = ['pendiente', 'en-progreso', 'completado'];
const RE_ESTADO = /(@estado[ \t]*:?[ \t]*)([a-z-]+)/i;
const RE_HORAS = /(@horas[ \t]*:?[ \t]*)([0-9]+(?:[.,][0-9]+)?)/i;
const RE_TODO = /(?:\/\/|\/\*|<!--)\s*TODO\b/g;

/** Huella del contenido, ignorando los valores de @estado/@horas, los \r y los espacios finales. */
export function huella(contenido) {
    const c = contenido
        .replace(/\r/g, '')
        .replace(RE_ESTADO, '$1')
        .replace(RE_HORAS, '$1')
        .replace(/[ \t]+$/gm, '')
        .trim();
    let h = 5381;   // djb2
    for (let i = 0; i < c.length; i++) {
        h = ((h * 33) ^ c.charCodeAt(i)) >>> 0;
    }
    return h.toString(16).padStart(8, '0');
}

export function contarPendientes(contenido) {
    return (contenido.match(RE_TODO) || []).length;
}

export function leerCabecera(contenido) {
    const e = contenido.match(RE_ESTADO);
    const h = contenido.match(RE_HORAS);
    let estado = e ? e[2].toLowerCase() : 'pendiente';
    if (!ESTADOS.includes(estado)) estado = 'pendiente';
    return { estado, horas: h ? parseFloat(h[2].replace(',', '.')) : 0 };
}

/**
 * @param manifiesto  contenido de tools/tareas.json
 * @param leer        (rutaRelativa) => string | null
 * @param hoy         'AAAA-MM-DD'
 */
export function calcularProgreso(manifiesto, leer, hoy) {
    const tot = { tareas: 0, completado: 0, 'en-progreso': 0, pendiente: 0, horas: 0, pasos: 0, pasos_hechos: 0 };
    const tareas = manifiesto.tareas.map((t) => {
        const ficheros = t.archivos.map((nombre) => {
            const texto = leer(`${t.carpeta}/${nombre}`);
            const total = t.pasos[nombre] ?? 0;
            const pendientes = texto === null ? total : contarPendientes(texto);
            return {
                nombre, existe: texto !== null, total,
                hechos: Math.max(0, total - pendientes),
                tocado: texto !== null && huella(texto) !== t.plantilla[nombre],
            };
        });
        const principal = leer(`${t.carpeta}/${t.principal}`) ?? '';
        let { estado, horas } = leerCabecera(principal);
        let auto = false;
        if (estado === 'pendiente' && ficheros.some((f) => f.tocado)) {
            estado = 'en-progreso';
            auto = true;
        }
        if (estado === 'completado') {
            ficheros.forEach((f) => { f.hechos = f.total; });
        }
        const pasos = ficheros.reduce((s, f) => s + f.total, 0);
        const hechos = ficheros.reduce((s, f) => s + f.hechos, 0);
        const dias = t.fecha ? Math.round((Date.parse(t.fecha) - Date.parse(hoy)) / 86400000) : null;
        const vencido = dias !== null && dias < 0 && estado !== 'completado';

        tot.tareas++; tot[estado]++; tot.horas += horas; tot.pasos += pasos; tot.pasos_hechos += hechos;
        return {
            ...t, ficheros, estado: vencido ? 'vencido' : estado, estadoReal: estado, auto, horas, dias,
            pasos_total: pasos, pasos_hechos: hechos, pct: pasos ? Math.round(hechos * 100 / pasos) : 0,
        };
    });

    tot.pct = tot.tareas ? Math.round(tot.completado * 100 / tot.tareas) : 0;
    tot.pct_pasos = tot.pasos ? Math.round(tot.pasos_hechos * 100 / tot.pasos) : 0;

    // Cola: 1º lo que vence en ≤ 7 días; 2º lo empezado; 3º el orden del curso.
    const pendientes = tareas.filter((t) => t.estadoReal !== 'completado');
    const urg = (t) => (t.dias !== null && t.dias <= 7 ? 0 : 1);
    const empez = (t) => (t.estadoReal === 'en-progreso' ? 0 : 1);
    const cola = pendientes
        .map((t, i) => ({ t, i }))
        .sort((a, b) => urg(a.t) - urg(b.t) || empez(a.t) - empez(b.t) || a.i - b.i)
        .map((x) => x.t);

    const entregas = tareas.filter((t) => t.fecha).sort((a, b) => a.fecha.localeCompare(b.fecha));
    return { modulo: manifiesto.modulo, hoy, tareas, totales: tot, cola, entregas };
}

export function barraTexto(pct, ancho = 20) {
    const llenos = Math.round(pct * ancho / 100);
    return '█'.repeat(llenos) + '░'.repeat(ancho - llenos);
}

export const fmtHoras = (h) => String(Math.round(h * 10) / 10).replace('.', ',');

/** PROGRESO.md determinista (no depende de la fecha de hoy). */
export function generarMarkdown(p) {
    const t = p.totales;
    const ico = { completado: '✅', 'en-progreso': '🟡', pendiente: '⬜', vencido: '🔴' };
    let md = `# 📊 Progreso · ${p.modulo}\n\n`;
    md += '> Fichero generado automáticamente a partir de la cabecera `@estado` / `@horas` del JS de cada tarea y de los `TODO` que quedan. **No lo edites a mano.**\n>\n';
    md += '> Se regenera al hacer commit (hook) y en cada push (GitHub Action).\n\n';
    md += '| Tareas | Pasos (TODO) | En progreso | Pendientes | Horas |\n|---|---|:-:|:-:|:-:|\n';
    md += `| \`${barraTexto(t.pct, 12)}\` **${t.pct} %** · ${t.completado}/${t.tareas} | \`${barraTexto(t.pct_pasos, 12)}\` **${t.pct_pasos} %** · ${t.pasos_hechos}/${t.pasos} | ${t['en-progreso']} | ${t.pendiente} | ${fmtHoras(t.horas)} h |\n\n`;
    md += '## Tareas\n\n| Tarea | Estado | HTML | CSS | JS | Horas |\n|---|:-:|:-:|:-:|:-:|:-:|\n';
    for (const ta of p.tareas) {
        const est = ta.estado === 'vencido' ? ta.estadoReal : ta.estado;
        const f = ta.ficheros.map((x) => `${x.hechos}/${x.total}`);
        md += `| [${ta.id} · ${ta.titulo}](${ta.carpeta}/) | ${ico[est]}${ta.auto ? '\\*' : ''} | ${f.join(' | ')} | ${fmtHoras(ta.horas)} |\n`;
    }
    const conFecha = p.entregas;
    if (conFecha.length) {
        md += '\n## Entregas con fecha\n\n| Tarea | Fecha límite | Estado |\n|---|---|---|\n';
        for (const e of conFecha) {
            const [a, m, d] = e.fecha.split('-');
            const est = e.estado === 'vencido' ? e.estadoReal : e.estado;
            md += `| ${e.id} · ${e.titulo} | ${d}/${m}/${a} | ${ico[est]} ${est} |\n`;
        }
    }
    md += '\n<sub>✅ completado · 🟡 en progreso · ⬜ pendiente · \\* detectado automáticamente (algún fichero ya no es la plantilla) · HTML/CSS/JS = TODO hechos / total</sub>\n';
    return md;
}

export function bloqueReadme(p) {
    const t = p.totales;
    return '<!-- PROGRESO:INICIO -->\n' +
        `**Progreso:** \`${barraTexto(t.pct_pasos)}\` **${t.pct_pasos} %** de los pasos · ${t.completado}/${t.tareas} tareas completadas · ${fmtHoras(t.horas)} h · [ver detalle](PROGRESO.md)\n` +
        '<!-- PROGRESO:FIN -->';
}

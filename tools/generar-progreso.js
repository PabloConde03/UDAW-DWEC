/**
 * Regenera PROGRESO.md y el bloque de progreso del README.md.
 * Uso:  node tools/generar-progreso.js   (o  npm run progreso)
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { calcularProgreso, generarMarkdown, bloqueReadme, fmtHoras } from './progreso-core.js';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const leer = (rel) => (existsSync(join(raiz, rel)) ? readFileSync(join(raiz, rel), 'utf8') : null);
const hoy = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' });

const manifiesto = JSON.parse(readFileSync(join(raiz, 'tools/tareas.json'), 'utf8'));
const p = calcularProgreso(manifiesto, leer, hoy);

function escribirSiCambia(rel, contenido) {
    const actual = leer(rel)?.replace(/\r/g, '');
    if (actual === contenido) return false;
    writeFileSync(join(raiz, rel), contenido);
    return true;
}

let cambio = escribirSiCambia('PROGRESO.md', generarMarkdown(p));
const readme = leer('README.md');
if (readme) {
    const nuevo = readme.replace(/\r/g, '').replace(/<!-- PROGRESO:INICIO -->[\s\S]*?<!-- PROGRESO:FIN -->/, bloqueReadme(p));
    cambio = escribirSiCambia('README.md', nuevo) || cambio;
}
const t = p.totales;
console.log(`Progreso DWEC: ${t.pct_pasos} % pasos · ${t.completado}/${t.tareas} tareas · ${fmtHoras(t.horas)} h · ${cambio ? 'PROGRESO.md actualizado' : 'sin cambios'}`);

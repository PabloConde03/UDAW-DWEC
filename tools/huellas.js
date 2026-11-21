// Uso interno: node tools/huellas.js <carpeta> <fichero...>  → JSON { fichero: { huella, pendientes } }
import { readFileSync } from 'node:fs';
import { huella, contarPendientes } from './progreso-core.js';

const [carpeta, ...ficheros] = process.argv.slice(2);
const out = {};
for (const f of ficheros) {
    const c = readFileSync(`${carpeta}/${f}`, 'utf8');
    out[f] = { huella: huella(c), pendientes: contarPendientes(c) };
}
console.log(JSON.stringify(out));

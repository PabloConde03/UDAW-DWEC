/**
 * Comprueba la sintaxis de todos los .js de las tareas (equivale a `node --check`).
 * Uso:  npm run check
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const { tareas } = JSON.parse(readFileSync(join(raiz, 'tools/tareas.json'), 'utf8'));
let errores = 0;
for (const t of tareas) {
    const f = join(raiz, t.carpeta, t.principal);
    try {
        // --input-type=commonjs: los scripts de las tareas son clásicos, no módulos
        execFileSync(process.execPath, ['--check', '--input-type=commonjs'], { input: readFileSync(f), stdio: ['pipe', 'pipe', 'pipe'] });
        console.log(`✔ ${t.id}  ${t.principal}`);
    } catch (e) {
        errores++;
        console.log(`✖ ${t.id}  ${t.principal}\n${e.stderr}`);
    }
}
process.exit(errores ? 1 : 0);

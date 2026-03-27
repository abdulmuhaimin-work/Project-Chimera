/**
 * Refreshes src/data/projectsSnapshot.json from the CMS API.
 * Run after you change projects in the admin: `npm run sync:projects-snapshot`
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const base = (process.env.VITE_API_URL || 'https://chimera-cms.fly.dev').replace(/\/$/, '');
const url = `${base}/api/projects`;

const res = await fetch(url);
if (!res.ok) {
  console.error('Failed:', res.status, await res.text());
  process.exit(1);
}
const json = await res.json();
const out = join(root, 'src', 'data', 'projectsSnapshot.json');
writeFileSync(out, JSON.stringify(json), 'utf8');
console.log('Wrote', out);

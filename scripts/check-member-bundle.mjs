import { readdirSync, readFileSync } from 'node:fs';
const bundle = readdirSync('dist/assets').filter(name => name.endsWith('.js')).map(name => readFileSync(`dist/assets/${name}`, 'utf8')).join('\n');
const protectedMarkers = ['Red Lentil & Spinach Dal', 'Cloud Dancer Whites', 'linen-weekend', 'kitchen-confidence'];
for (const marker of protectedMarkers) {
  if (bundle.includes(marker)) throw new Error(`Protected member payload included in public JavaScript: ${marker}`);
}
console.log('Verified: protected member collections are not bundled into public JavaScript.');

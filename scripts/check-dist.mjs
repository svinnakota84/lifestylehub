import {readFile,copyFile,readdir} from 'node:fs/promises';
const html=await readFile('dist/index.html','utf8');
if(!(html.includes('"/assets/')||html.includes('"./assets/'))||html.includes('/main.tsx'))throw Error('Invalid build entrypoint');
for(const f of await readdir('dist'))if(/\.(zip|sql)$/.test(f))throw Error('Internal artifact in public build');
await copyFile('dist/index.html','dist/404.html');
console.log('Production entrypoint and SPA fallback verified.');

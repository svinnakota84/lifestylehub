import {build} from 'esbuild';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const out='supabase/functions/membership/index.ts';
mkdirSync('supabase/functions/membership',{recursive:true});
const result=await build({entryPoints:['server/supabase-entry.ts'],bundle:true,write:false,platform:'neutral',format:'esm',target:'es2022',packages:'external'});
let source=result.outputFiles[0].text;
for(const pkg of ['stripe','@supabase/supabase-js']){
 const version=JSON.parse(readFileSync(`node_modules/${pkg}/package.json`,'utf8')).version;
 source=source.replaceAll(`from "${pkg}"`,`from "npm:${pkg}@${version}"`);
}
writeFileSync(out,'// Generated from server/supabase-entry.ts. Rebuild with npm run build:supabase.\n'+source);
console.log(`Prepared ${out}`);

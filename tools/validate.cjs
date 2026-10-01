/* Validação de desenvolvimento, sem dependências. Não é necessário para publicar. */
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const root = path.resolve(__dirname, '..');
process.chdir(root);
const base = process.env.SITE_URL || 'http://127.0.0.1:8765/';
const ignored = new Set(['menu.html','footer.html','carrossel_exames.html','carrossel_galeria.html','whatsapp-button.html','googlee3ecfa86bc1fbf12.html']);
const pages = fs.readdirSync('.').filter(f => f.endsWith('.html') && !ignored.has(f));
const failures=[];
const check=(condition,message)=>{if(!condition) failures.push(message);};
const localUrls = new Set();
function exactPath(file){
 let dir=root;
 for(const part of file.split('/').filter(Boolean)){
  if(!fs.existsSync(dir)||!fs.readdirSync(dir).includes(part)) return false;
  dir=path.join(dir,part);
 }
 return fs.existsSync(dir);
}
for(const file of pages){
 const html=fs.readFileSync(file,'utf8');
 check((html.match(/<h1\b/g)||[]).length===1,file+': h1 único');
 check((html.match(/<main\b/g)||[]).length===1,file+': main único');
 check(/<meta name="description" content="[^"]+"/.test(html),file+': descrição');
 check(/<meta property="og:title" content="[^"]+"/.test(html)&&/<meta property="og:image" content="[^"]+"/.test(html),file+': Open Graph');
 check(html.includes('data-theme-toggle')&&html.includes('JS/theme.js'),file+': seletor de tema');
 check(/<html lang="pt-BR">/.test(html),file+': idioma');
 check(!/<(?:button|a)[^>]*>\s*<(?:button|a)\b/.test(html),file+': controles aninhados');
 check(!/onclick=|jquery|bootstrap|sendEmail|<iframe|fonts.googleapis/.test(html),file+': dependências antigas');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 check(ids.length===new Set(ids).size,file+': IDs duplicados');
 for(const img of html.matchAll(/<img\b[^>]+>/g)){
  check(/\balt="[^"]*"/.test(img[0]),file+': imagem sem alt');
  check(/\bwidth="\d+"/.test(img[0])&&/\bheight="\d+"/.test(img[0]),file+': dimensões de imagem');
 }
 for(const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const url=m[1].replace(/&amp;/g,'&');
  if(/^(https?:|mailto:|tel:)/.test(url))continue;
  const [raw,hash]=url.split('#');
  const target=decodeURIComponent(raw||file);
  check(exactPath(target),`${file}: caminho ou capitalização inválida: ${target}`);
  if(raw)localUrls.add(raw);
  if(hash&&exactPath(target))check(fs.readFileSync(target,'utf8').includes(`id="${hash}"`),`${file}: âncora ausente: ${url}`);
 }
 for(const m of html.matchAll(/\bsrcset="([^"]+)"/g))for(const candidate of m[1].split(',')){
  const url=candidate.trim().replace(/\s+\d+w$/,'');
  check(exactPath(decodeURIComponent(url)),`${file}: srcset ausente: ${url}`);localUrls.add(url);
 }
 localUrls.add(file);
}
for(const file of ignored){
 if(file.startsWith('google'))continue;
 check(!/<(?:html|head|body|script)\b/i.test(fs.readFileSync(file,'utf8')),file+': fragmento contém documento ou script');
}
const homepage=fs.readFileSync('index.html','utf8');
check((homepage.match(/class="exam-card"/g)||[]).length===13,'Grade deve conter os 13 exames');
check((homepage.match(/data-banner-slide /g)||[]).length===5,'Carrossel deve conter os cinco banners originais');
check(homepage.includes('JS/banner-carousel.js'),'Script do carrossel carregado no documento principal');
const patientPortal=Buffer.from('aHR0cDovL21lZGltYWdlbXNzcDMuZGRucy5uZXQ6ODA4MS9jc2FkdndlYi9QYXRpZW50L0xvZ2luL0luZGV4','base64').toString('utf8');
for(const role of ['Patient','Doctor'])check(homepage.includes(patientPortal.replace('/Patient/','/'+role+'/')),'Destino original do portal '+role);
check(fs.readFileSync('googlee3ecfa86bc1fbf12.html','utf8').trim()==='google-site-verification: googlee3ecfa86bc1fbf12.html','Verificação Google preservada');
const sitemap=fs.readFileSync('sitemap.xml','utf8');
check((sitemap.match(/<loc>/g)||[]).length===pages.length,'Sitemap completo');
check(!sitemap.includes('#'),'Sitemap não deve conter âncoras');
// Comparação com os originais disponíveis apenas no ambiente de migração.
const norm=html=>html.replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
for(const file of pages){
 const oldPath=path.join('.preview/originals',file);
 if(!fs.existsSync(oldPath))continue;
 const old=fs.readFileSync(oldPath,'utf8'), current=norm(fs.readFileSync(file,'utf8'));
 if(file==='termosdeuso.html'||file==='politicadeprivacidade.html'){
  const substantive=file==='termosdeuso.html'?old.match(/<div class="content">([\s\S]*?)<\/div>/)[1]:old.match(/<h1[^>]*>[\s\S]*?<\/h1>([\s\S]*?)<\/div>/)[1];
  check(current.includes(norm(substantive)),file+': conteúdo substantivo integral');
 }else if(!['index.html','faleConosco.html'].includes(file)){
  const parts=[...old.matchAll(/<div class="texto1\s*">([\s\S]*?)<\/div>/g)];
  for(const part of parts)check(current.includes(norm(part[1]).replace(/^Entre (\d+) a /,'De $1 a ')),file+': conteúdo de exame preservado');
 }
}
(async()=>{
 for(const url of localUrls){
  try{const status=await new Promise((resolve,reject)=>{const req=http.get(new URL(url,base),{agent:false},res=>{res.resume();res.on('end',()=>resolve(res.statusCode));});req.on('error',reject);req.setTimeout(10000,()=>req.destroy(new Error('Timeout')));});check(status===200,`HTTP ${status}: ${url}`);}catch(e){failures.push(`HTTP ${url}: ${e.message}`);}
 }
 const report={pages:pages.length,localResources:localUrls.size,failures};
 fs.mkdirSync('.preview',{recursive:true});fs.writeFileSync('.preview/static-validation.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify(report,null,2));if(failures.length)process.exitCode=1;
})();

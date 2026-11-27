// Rasterizza gli SVG dei loghi in PNG grandi (sfondo trasparente dove l'SVG non disegna). Uso: node logo_png.js
const {chromium}=require('playwright');const fs=require('fs');const D=__dirname+'/assets/loghi/';
(async()=>{const b=await chromium.launch();const p=await b.newPage();
for(const f of fs.readdirSync(D).filter(f=>f.endsWith('.svg'))){const s=fs.readFileSync(D+f,'utf8');
 const vb=(s.match(/viewBox="([^"]+)"/)||[])[1].split(/[\s,]+/).map(Number);const W=1200,H=Math.round(W*vb[3]/vb[2]);
 await p.setViewportSize({width:W,height:H});
 await p.setContent(`<html><body style="margin:0;background:transparent">${s.replace(/<svg/,`<svg style="display:block" `).replace(/\swidth="[^"]*"/,` width="${W}"`).replace(/\sheight="[^"]*"/,` height="${H}"`)}</body></html>`);
 await p.screenshot({path:D+f.replace('.svg','.raw.png'),omitBackground:true,clip:{x:0,y:0,width:W,height:H}});console.log('ok',f);}
await b.close();})();

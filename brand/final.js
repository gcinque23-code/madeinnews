const { chromium } = require('playwright');
const F=`<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter+Tight:wght@900&display=block" rel="stylesheet">`;
const R='#E63946';
// monogramma: lettere centrate con flex, leggera correzione ottica verso il basso
const MN=(s,fg,bg,k=0.62)=>`<div style="width:${s}px;height:${s}px;background:${bg};color:${fg};display:flex;align-items:center;justify-content:center;flex:none">
<span style="font:${s*k}px/1 Anton;letter-spacing:${s*0.005}px;transform:translateY(${s*0.01}px)">MN<span style="color:${R}">.</span></span></div>`;
const WORD=(px,fg)=>`<span style="font:900 ${px}px/1 'Inter Tight';letter-spacing:-${px*0.05}px;color:${fg}">madeinnews<span style="color:${R}">.</span></span>`;
const items={
orizzontale:(fg,bg,inv)=>`<div style="display:flex;align-items:center;gap:34px">${MN(120,inv,fg)}${WORD(80,fg)}</div>`,
verticale:(fg,bg,inv)=>`<div style="display:flex;flex-direction:column;align-items:center;gap:30px">${MN(220,inv,fg)}${WORD(80,fg)}</div>`,
};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1600,height:1000}});
const cell=(h,bg)=>`<div style="background:${bg};height:480px;display:flex;align-items:center;justify-content:center">${h}</div>`;
await p.setContent(`<html><head>${F}</head><body style="margin:0;display:grid;grid-template-columns:1fr 1fr;gap:4px;background:#999">
${cell(items.orizzontale('#fff','#0d0d0d','#0d0d0d'),'#0d0d0d')}${cell(items.orizzontale('#111','#F4F1EA','#F4F1EA'),'#F4F1EA')}
${cell(items.verticale('#fff','#0d0d0d','#0d0d0d'),'#0d0d0d')}${cell(items.verticale('#111','#F4F1EA','#F4F1EA'),'#F4F1EA')}</body></html>`,{waitUntil:'networkidle'});
await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:'logo_combo.png',fullPage:true});
// foto profilo 1080x1080 (Instagram la ritaglia a cerchio)
await p.setViewportSize({width:1080,height:1080});
await p.setContent(`<html><head>${F}</head><body style="margin:0;width:1080px;height:1080px;background:#0d0d0d;display:flex;align-items:center;justify-content:center">${MN(1080,'#fff','#0d0d0d',0.40)}</body></html>`,{waitUntil:'networkidle'});
await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:'foto_profilo.png'});
await b.close();})();

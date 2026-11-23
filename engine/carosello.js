// Carosello Made in News: node carosello.js slides.json outdir
const { chromium } = require('playwright'); const fs=require('fs');
const [,, f, out]=process.argv; const S=JSON.parse(fs.readFileSync(f,'utf8'));
const C=S.color||'#3B82F6', R='#E63946';
const FONTS=`<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter+Tight:wght@500;600;800;900&display=block" rel="stylesheet">`;
const css=`*{margin:0;box-sizing:border-box}body{width:1080px;height:1350px;position:relative;overflow:hidden;font-family:'Inter Tight';background:#F4F1EA;color:#111}
.dark{background:#0d0d0d;color:#fff}
.pill{display:inline-block;padding:10px 22px;font:800 28px 'Inter Tight';letter-spacing:2px;border-radius:8px;background:${C};color:#fff}
.mk{box-decoration-break:clone;-webkit-box-decoration-break:clone;padding:2px 14px;background:#FFE45C}
.badge{position:absolute;top:50px;right:56px;width:84px;height:84px;background:#0d0d0d;color:#fff;display:flex;align-items:center;justify-content:center;font:50px/1 Anton}.badge i{color:${R};font-style:normal}.dark .badge{background:#fff;color:#0d0d0d}
.foot{position:absolute;left:64px;right:64px;bottom:44px;display:flex;justify-content:space-between;align-items:flex-end;font:500 22px 'Inter Tight';color:#0009}.dark .foot{color:#fff9}
.foot b{font:900 34px 'Inter Tight';letter-spacing:-1.5px;color:#111}.dark .foot b{color:#fff}.foot b i{color:${R};font-style:normal}
.dots{position:absolute;top:74px;left:64px;display:flex;gap:10px}.dots span{width:14px;height:14px;border-radius:50%;background:#0003}.dots span.on{background:${C}}.dark .dots span{background:#fff3}.dark .dots span.on{background:${C}}
.w{position:absolute;left:64px;right:64px;top:170px}
.row{display:flex;align-items:center;gap:26px;margin-top:40px}.row span{width:220px;font:900 46px 'Inter Tight'}.track{flex:1;height:110px;background:#0001;border-radius:12px;overflow:hidden}.fill{height:100%;border-radius:12px}.row b{font:96px Anton;width:230px;text-align:right;white-space:nowrap}
.swipe{position:absolute;right:64px;bottom:120px;font:800 30px 'Inter Tight';color:${C}}`;
(async()=>{fs.mkdirSync(out,{recursive:true});const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
 for(const [i,s] of S.slides.entries()){
  const dots=`<div class="dots">${S.slides.map((_,k)=>`<span class="${k===i?'on':''}"></span>`).join('')}</div>`;
  const html=`<html><head><meta charset="utf-8">${FONTS}<style>${css}</style></head><body class="${s.dark?'dark':''}">${dots}<div class="badge">MN<i>.</i></div><div class="w">${s.html}</div><div class="foot"><b>madeinnews<i>.</i></b><span>${s.src||''}</span></div></body></html>`;
  await p.setContent(html,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
  await p.screenshot({path:`${out}/${String(i+1).padStart(2,'0')}.png`});}
 await b.close();console.log('ok',S.slides.length);})();

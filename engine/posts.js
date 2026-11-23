const { chromium } = require('playwright');
const fs=require('fs'), path=require('path');
const FOTO='/home/user/italia-in-breve/foto/';
const cred0=fs.existsSync(FOTO+'credits.json')?JSON.parse(fs.readFileSync(FOTO+'credits.json')):{};const cred=Object.fromEntries(Object.entries(cred0).filter(([k])=>fs.existsSync(FOTO+k+'.jpg')&&fs.statSync(FOTO+k+'.jpg').size>1000));
const img=k=>fs.existsSync(FOTO+k+'.jpg')&&fs.statSync(FOTO+k+'.jpg').size>1000?`url(data:image/jpeg;base64,${fs.readFileSync(FOTO+k+'.jpg').toString('base64')})`:'radial-gradient(circle at 60% 35%,#6b7280,#1f2937 75%)';
const C={CALCIO:'#22C55E',ECONOMIA:'#3B82F6',ESTERI:'#F97316',POLITICA:'#EF4444'}, R='#E63946';
const FONTS=`<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter+Tight:wght@400;600;800;900&family=Instrument+Serif:ital@0;1&display=block" rel="stylesheet">`;
const css=`*{margin:0;box-sizing:border-box}body{width:1080px;height:1350px;position:relative;overflow:hidden;font-family:'Inter Tight';background:#0d0d0d;color:#fff}
.bg{position:absolute;background-size:cover;background-position:center}
.pill{display:inline-block;padding:10px 22px;font:800 28px 'Inter Tight';letter-spacing:2px;border-radius:8px}
.anton{font-family:Anton;text-transform:uppercase;line-height:1.02}
.mk{box-decoration-break:clone;-webkit-box-decoration-break:clone;padding:2px 14px}
.badge{position:absolute;top:50px;right:56px;width:84px;height:84px;background:#fff;color:#0d0d0d;display:flex;align-items:center;justify-content:center;font:50px/1 Anton;z-index:9}
.badge i{color:${R};font-style:normal}
.foot{position:absolute;left:64px;right:64px;bottom:44px;display:flex;justify-content:space-between;align-items:flex-end;font:500 22px 'Inter Tight';color:#ffffffaa;z-index:9}
.foot b{font:900 34px 'Inter Tight';letter-spacing:-1.5px;color:#fff}.foot b i{color:${R};font-style:normal}`;
const BADGE=(inv)=>`<div class="badge" style="${inv?'background:#0d0d0d;color:#fff':''}">MN<i>.</i></div>`;
const FOOT=(c,dark=true)=>`<div class="foot" style="${dark?'':'color:#0009'}"><b style="${dark?'':'color:#111'}">madeinnews<i>.</i></b><span style="max-width:620px;text-align:right">${c||''}</span></div>`;
const posts={
'1_atalanta_inter':`<div class="bg" style="inset:0;background-image:${img('esposito_user')};background-position:60% 30%"></div><div style="position:absolute;inset:0;background:linear-gradient(180deg,#0000 35%,#000f 80%)"></div>${BADGE()}
<div style="position:absolute;left:64px;right:64px;bottom:130px"><span class="pill" style="background:${C.CALCIO};color:#000">CALCIO</span>
<div class="anton" style="font-size:112px;margin-top:26px">Tripletta di Esposito, <span style="color:${C.CALCIO}">ma non basta</span>: Atalanta-Inter 4-4</div>
<div style="font:600 34px/1.35 'Inter Tight';color:#ddd;margin-top:22px">L'Inter va avanti tre volte, l'Atalanta la riprende sempre.</div></div>
${FOOT('Foto: '+(cred.esposito_user||''))}`,
'2_risultati':`${BADGE()}<div style="position:absolute;top:70px;left:64px;right:180px"><span class="pill" style="background:${C.CALCIO};color:#000">SERIE A · 12ª GIORNATA</span></div>
<div style="position:absolute;top:170px;left:64px;right:64px"><div class="anton" style="font-size:100px">La Lazio <span class="mk" style="background:${C.CALCIO};color:#000">è prima</span></div>
${[['Atalanta','4-4','Inter'],['Milan','5-1','Frosinone'],['Juventus','4-0','Venezia'],['Napoli','1-0','Torino'],['Bologna','1-1','Udinese'],['Sassuolo','0-2','Genoa']].map(([a,s,b])=>`
<div style="display:grid;grid-template-columns:1fr 190px 1fr;align-items:center;margin-top:18px;background:#1a1a1a;border-radius:18px;padding:22px 34px;font:800 42px 'Inter Tight'"><span>${a}</span><span style="text-align:center;font:58px Anton;color:${C.CALCIO}">${s}</span><span style="text-align:right">${b}</span></div>`).join('')}
<div style="font:600 28px 'Inter Tight';color:#bbb;margin-top:28px">Stasera <b style="color:#fff">Monza – Fiorentina</b>, ore 20:45</div></div>${FOOT('Fonte: ANSA')}`,
'3_carburanti':`<div style="position:absolute;inset:0;background:#F4F1EA;color:#111"></div>${BADGE(true)}
<div style="position:absolute;top:110px;left:64px;right:64px;color:#111"><span class="pill" style="background:${C.ECONOMIA};color:#fff">ECONOMIA</span>
<div style="font:900 330px/0.9 'Inter Tight';letter-spacing:-16px;margin-top:70px">+27<span style="color:${C.ECONOMIA}">%</span></div>
<div style="font:800 76px/1.15 'Inter Tight';letter-spacing:-2.5px;margin-top:40px"><span class="mk" style="background:#FFE45C">Quanto costa in più fare benzina</span> <span class="mk" style="background:#FFE45C">rispetto al 2025.</span></div>
<div style="font:600 36px/1.35 'Inter Tight';color:#333;margin-top:34px">Dati Eurostat di ottobre. Nella media Ue i carburanti sono saliti del 29,5%.</div></div>${FOOT('Fonte: Eurostat, via ANSA',false)}`,
'4_irpef':`${BADGE()}<div style="position:absolute;top:150px;left:70px;right:70px;text-align:center"><span class="pill" style="background:${C.ECONOMIA};color:#fff">FISCO</span>
<div style="font:118px/1 'Instrument Serif';letter-spacing:-2px;margin-top:50px">Il <em style="color:${C.ECONOMIA}">30%</em> degli italiani paga il <em style="color:${C.ECONOMIA}">78%</em> dell'Irpef</div></div>
<div style="position:absolute;left:70px;right:70px;top:600px;display:grid;grid-template-columns:30fr 70fr;height:90px;border-radius:14px;overflow:hidden;font:800 34px/90px 'Inter Tight';text-align:center"><div style="background:${C.ECONOMIA}">30%</div><div style="background:#2a2a2a;color:#aaa">70% degli italiani</div></div>
<div style="position:absolute;left:70px;right:70px;top:710px;font:600 30px 'Inter Tight';color:#999;text-align:center">paga il 78% dell'imposta &nbsp;·&nbsp; paga il restante 22%</div>
<div style="position:absolute;left:90px;right:90px;top:840px;text-align:center;font:600 38px/1.35 'Inter Tight';color:#ddd">E <b style="color:#fff">24 milioni</b> di persone non dichiarano alcun reddito.</div>${FOOT('Fonte: ANSA')}`,
'5_cop31':`<div class="bg" style="left:0;right:0;top:0;height:720px;background-image:${img('cop')}"></div>${BADGE()}
<div style="position:absolute;left:0;right:0;top:720px;bottom:0;background:${C.ESTERI};padding:54px 64px;color:#1a0a00">
<span class="pill" style="background:#1a0a00;color:#fff">ESTERI · CLIMA</span>
<div class="anton" style="font-size:96px;margin-top:26px">COP31, <span style="color:#fff">nessun accordo</span> sul clima</div>
<div style="font:600 34px/1.35 'Inter Tight';margin-top:20px">Il ministro Pichetto: «Alla fine non c'era una volontà di chiusura».</div></div>
${FOOT(cred.cop?('Foto d\'archivio (COP29, Baku): '+cred.cop):'',false).replace('class="foot"','class="foot" style="color:#1a0a00aa"')}`,
'6_grillo':`<div class="bg" style="inset:0;background-image:${img('grillo')};background-position:center 25%"></div><div style="position:absolute;inset:0;background:linear-gradient(180deg,#0000 30%,#000f 78%)"></div>${BADGE()}
<div style="position:absolute;left:64px;right:64px;bottom:130px"><span class="pill" style="background:${C.POLITICA};color:#fff">POLITICA</span>
<div class="anton" style="font-size:100px;margin-top:26px">Grillo: “Se il giudice dice che <span style="color:${C.POLITICA}">il Movimento è mio</span>, me lo riprendo”</div>
<div style="font:600 34px/1.35 'Inter Tight';color:#ddd;margin-top:22px">Il fondatore torna in scena e sfida il M5S di Conte.</div></div>
${FOOT(cred.grillo?('Foto: '+cred.grillo):'')}`
};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
for(const k in posts){await p.setContent(`<html><head><meta charset="utf-8">${FONTS}<style>${css}</style></head><body>${posts[k]}</body></html>`,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:k+'.png'});}
await b.close();})();

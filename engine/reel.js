const { chromium } = require('playwright');
const fs=require('fs');
const FOTO='/home/user/italia-in-breve/foto/';
const img=k=>fs.existsSync(FOTO+k+'.jpg')&&fs.statSync(FOTO+k+'.jpg').size>1000?`url(data:image/jpeg;base64,${fs.readFileSync(FOTO+k+'.jpg').toString('base64')})`:null;
const R='#E63946',G='#22C55E',B='#3B82F6',Y='#FFD400';
const FONTS=`<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter+Tight:wght@600;800;900&display=block" rel="stylesheet">`;
const css=`*{margin:0;box-sizing:border-box}body{width:1080px;height:1920px;background:#000;color:#fff;font-family:'Inter Tight';position:relative;overflow:hidden}
.t{position:absolute;top:250px;left:0;right:0;text-align:center}.t span{display:inline-block;background:#fff;color:#000;font:900 62px/1.1 'Inter Tight';letter-spacing:-1.5px;padding:8px 22px;margin:3px 0}
.box{position:absolute;top:520px;left:0;width:1080px;height:608px;overflow:hidden;background:#111;background-size:cover;background-position:center}
.cap{position:absolute;top:1200px;left:90px;right:90px;text-align:center;font:800 54px/1.3 'Inter Tight';letter-spacing:-1px}.cap em{font-style:normal;color:${Y}}
.wm{position:absolute;bottom:200px;left:0;right:0;text-align:center;font:900 40px 'Inter Tight';letter-spacing:-1.5px}.wm i{color:${R};font-style:normal}
.anton{font-family:Anton;text-transform:uppercase;line-height:1}`;
const center=(h,bg='#111')=>`<div style="position:absolute;inset:0;background:${bg};display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center">${h}</div>`;
const REELS={
reel1_serie_a:{title:['Serie A, 12ª giornata:','cosa è successo'],scenes:[
 {box:center(`<div class="anton" style="font-size:150px">Atalanta <span style="color:${G}">4-4</span> Inter</div>`),cap:'A Bergamo finisce <em>4-4</em>. La partita più pazza del weekend.'},
 {box:img('esposito_user')?`<div class="box" style="top:0;background-image:${img('esposito_user')};background-position:60% 30%"></div>`:center('<div class="anton" style="font-size:120px">ESPOSITO</div>'),cap:'Pio Esposito segna una <em>tripletta</em>, ma all\'Inter non basta.'},
 {box:center(`<div class="anton" style="font-size:180px;color:${G}">3 VOLTE</div><div style="font:800 40px 'Inter Tight';margin-top:10px">in vantaggio l'Inter</div>`),cap:'Tre volte avanti, tre volte <em>ripresa</em> dall\'Atalanta.'},
 {box:center(`<div class="anton" style="font-size:150px">Milan <span style="color:${G}">5-1</span></div><div style="font:800 44px 'Inter Tight';margin-top:14px;color:#aaa">contro il Frosinone</div>`),cap:'Il Milan ne fa <em>cinque</em> al Frosinone.'},
 {box:center(`<div class="anton" style="font-size:150px">Juve <span style="color:${G}">4-0</span></div><div style="font:800 44px 'Inter Tight';margin-top:14px;color:#aaa">contro il Venezia</div>`),cap:'Si rialza anche la <em>Juventus</em>: quattro gol al Venezia.'},
 {box:center(`<div style="font:800 46px 'Inter Tight';color:#aaa">IN TESTA ALLA CLASSIFICA</div><div class="anton" style="font-size:220px;color:${G};margin-top:10px">LAZIO</div>`),cap:'E in vetta ora c\'è la <em>Lazio</em>.'},
 {box:center(`<div class="anton" style="font-size:100px">Stasera</div><div class="anton" style="font-size:120px;color:${G};margin-top:10px">Monza - Fiorentina</div><div style="font:800 44px 'Inter Tight';margin-top:14px;color:#aaa">ore 20:45</div>`),cap:'Chiude la giornata <em>Monza-Fiorentina</em>, stasera alle 20:45.'},
 {box:center(`<div style="font:900 90px 'Inter Tight';letter-spacing:-4px">madeinnews<span style="color:${R}">.</span></div><div style="font:800 40px 'Inter Tight';margin-top:20px;color:${Y}">SEGUI PER I RISULTATI OGNI GIORNATA</div>`,'#0d0d0d'),cap:'<em>Seguici</em> per non perderti niente.'},
]},
reel2_notizie:{title:['Le notizie di oggi','in 30 secondi'],scenes:[
 {box:center(`<div style="font:900 220px/1 'Inter Tight';letter-spacing:-10px">+27<span style="color:${B}">%</span></div><div style="font:800 40px 'Inter Tight';margin-top:10px;color:#aaa">CARBURANTI RISPETTO AL 2025</div>`),cap:'Fare benzina costa il <em>27% in più</em> rispetto al 2025. Dati Eurostat.'},
 {box:center(`<div style="display:grid;grid-template-columns:30fr 70fr;width:900px;height:120px;border-radius:16px;overflow:hidden;font:900 48px/120px 'Inter Tight'"><div style="background:${B}">30%</div><div style="background:#2a2a2a;color:#aaa">70%</div></div><div style="font:800 40px 'Inter Tight';margin-top:30px;color:#aaa">IL 30% PAGA IL 78% DELL'IRPEF</div>`),cap:'Il 30% degli italiani paga il <em>78% dell\'Irpef</em>.'},
 {box:center(`<div class="anton" style="font-size:200px;color:${B}">24 MILIONI</div><div style="font:800 40px 'Inter Tight';margin-top:10px;color:#aaa">NON DICHIARANO REDDITO</div>`),cap:'E <em>24 milioni</em> di persone non dichiarano alcun reddito.'},
 {box:center(`<div class="anton" style="font-size:170px">COP31</div><div class="anton" style="font-size:110px;color:#F97316;margin-top:10px">nessun accordo</div>`),cap:'La conferenza sul clima si chiude <em>senza accordo</em>.'},
 {box:center(`<div class="anton" style="font-size:90px;line-height:1.1">“Se il giudice dice che<br><span style="color:${R}">il Movimento è mio</span>,<br>me lo riprendo”</div>`),cap:'E Beppe <em>Grillo</em> sfida il M5S di Conte.'},
 {box:center(`<div style="font:900 90px 'Inter Tight';letter-spacing:-4px">madeinnews<span style="color:${R}">.</span></div><div style="font:800 40px 'Inter Tight';margin-top:20px;color:${Y}">LE NOTIZIE, OGNI GIORNO</div>`,'#0d0d0d'),cap:'<em>Seguici</em> per le notizie di ogni giorno.'},
]}};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
for(const [name,r] of Object.entries(REELS)){fs.mkdirSync(name,{recursive:true});
 for(const [i,s] of r.scenes.entries()){
  const box=s.box.startsWith('<div class="box"')?s.box.replace('class="box" style="top:0;','class="box" style="top:520px;'):`<div class="box">${s.box}</div>`;
  await p.setContent(`<html><head><meta charset="utf-8">${FONTS}<style>${css}</style></head><body><div class="t">${r.title.map(x=>`<span>${x}</span>`).join('<br>')}</div>${box}<div class="cap">${s.cap}</div><div class="wm">madeinnews<i>.</i></div></body></html>`,{waitUntil:'networkidle'});
  await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:`${name}/s${String(i).padStart(2,'0')}.png`});}}
await b.close();})();

const fs=require('fs');
const S=i=>`<svg viewBox="0 0 1080 1920" width="1080" height="1920" style="position:absolute;inset:0">${i}</svg>`;
const G=(a,i)=>`<g ${a} style="transform-box:fill-box;transform-origin:center">${i}</g>`;
const lg=(id,st)=>`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${st.map(([o,c])=>`<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
const L=(name,x,y,w,h,extra='',lp='0,1,1')=>`<div data-lot="${name}" data-lp="${lp}" ${extra} style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;transform-origin:center"></div>`;
const bg=(id,st)=>S(`<defs>${lg(id,st)}</defs><rect width="1080" height="1920" fill="url(#${id})"/>`);
const stars=n=>S([...Array(n)].map((_,k)=>`<circle cx="${(k*137)%1080}" cy="${(k*251)%1900}" r="${k%3+1}" fill="#fff" opacity=".55" data-bob="${3+k%4},${1+k%3},${k}"/>`).join(''));
const sea=(id,y,c1,c2)=>S(`<defs>${lg(id,[[0,c1],[1,c2]])}</defs><rect x="-100" y="${y}" width="1280" height="${1920-y+100}" fill="url(#${id})"/>${[0,1,2,3,4].map(k=>`<path d="M-100 ${y+60+k*90} q 135 -22 270 0 t 270 0 t 270 0 t 270 0 t 270 0" stroke="#fff" stroke-opacity="${.2-k*.03}" stroke-width="6" fill="none" data-pan="${k%2?-90:90},0"/>`).join('')}`);
const RB=['#ef4444','#f97316','#facc15','#22c55e','#3b82f6','#6366f1','#a855f7'];
const scenes=[
{voice:"In teoria, il cielo dovrebbe essere viola. E invece lo vediamo blu. Ecco perché.",
 cam:"0,1.15,0,60|@viola,1.0,0,0|@invece,1.1,-60,40|@perché,1.25,0,-80",
 html:bg('k1b',[[0,'#0c4a6e'],[.6,'#38bdf8'],[1,'#e0f2fe']])+`<div data-off="@invece">${bg('k1v',[[0,'#3b0764'],[.6,'#a855f7'],[1,'#f3e8ff']])}</div>`
 +L('sun_4',560,420,460,460)+L('cloud_1',60,900,420,320,'data-pan="160,0"')+sea('k1s',1450,'#0369a1','#082f49')
 +`<div data-pop="@perché,0.5" style="position:absolute;left:290px;top:980px;width:500px;height:500px;transform-origin:center">${L('question_mark_4',0,0,500,500,'','@perché,1,1')}</div>`},
{voice:"La luce del Sole sembra bianca, ma in realtà contiene tutti i colori dell'arcobaleno.",
 cam:"0,1.3,260,0|@bianca,1.0,0,0|@colori,1.2,-180,0|@arcobaleno,1.0,0,-60",
 html:bg('k2',[[0,'#020617'],[1,'#1e1b4b']])+stars(60)+L('sun_4',-60,760,380,380)
 +S(`<line data-draw="0.4,0.8" x1="240" y1="950" x2="420" y2="950" stroke="#fff" stroke-width="24" stroke-linecap="round"/>${RB.map((c,k)=>`<line data-draw="@colori,0.9" x1="680" y1="950" x2="1120" y2="${700+k*85}" stroke="${c}" stroke-width="28" stroke-linecap="round"/>`).join('')}`)
 +`<div data-pop="@bianca,0.5" style="position:absolute;left:330px;top:700px;width:500px;height:500px;transform-origin:center">${L('rainbow_prism_0',0,0,500,500,'','@bianca,1,1')}</div>`
 +`<div data-pop="@arcobaleno,0.5" style="position:absolute;left:240px;top:1260px;width:600px;height:450px;transform-origin:center">${L('rainbow_prism_4',0,0,600,450,'','@arcobaleno,1,0')}</div>`},
{voice:"Quando entra nell'atmosfera, la luce urta le molecole di azoto e ossigeno. Il rosso passa quasi dritto. Il blu, invece, rimbalza in tutte le direzioni.",
 cam:"0,1.0,0,0|@atmosfera,1.6,0,120|@molecole,1.0,0,0|@rosso,1.15,120,0|@blu,1.15,-120,0|@direzioni,1.0,0,0",
 html:bg('k3',[[0,'#020617'],[.4,'#0c4a6e'],[1,'#38bdf8']])+stars(30)
 +`<div data-off="@molecole">${L('earth_atmosphere_5',190,560,700,700)}</div>`
 +S(`${[[180,700],[420,860],[700,720],[880,980],[260,1120],[560,1240],[820,1380],[340,1480],[640,980]].map(([x,y],k)=>`<g data-pop="@molecole,0.4"><g data-bob="16,${1.3+k*.2},${k}"><circle cx="${x}" cy="${y}" r="24" fill="${k%2?'#93c5fd':'#f1f5f9'}"/><circle cx="${x+32}" cy="${y}" r="24" fill="${k%2?'#93c5fd':'#f1f5f9'}"/></g></g>`).join('')}
 <line data-draw="@rosso,0.9" x1="-40" y1="1040" x2="1120" y2="1040" stroke="#ef4444" stroke-width="20" stroke-linecap="round"/>
 ${[[700,720,520,560],[700,720,900,560],[420,860,240,980],[640,980,820,1200],[560,1240,380,1400],[560,1240,760,1500],[880,980,1060,860],[260,1120,120,1300]].map(([a,b,c,d],k)=>`<line data-draw="@rimbalza,${0.4+k*0.08}" x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="#3b82f6" stroke-width="16" stroke-linecap="round"/><circle cx="${c}" cy="${d}" r="16" fill="#60a5fa" data-pop="@direzioni,0.3"/>`).join('')}`)},
{voice:"Il blu viene diffuso circa 6 volte più del rosso, e così arriva ai nostri occhi da ogni punto del cielo.",
 cam:"0,1.1,0,80|@6,1.0,0,0|@volte,1.2,0,-120|@occhi,1.0,0,0",
 html:bg('k4',[[0,'#0c4a6e'],[1,'#7dd3fc']])+`<div data-pop="@volte,0.5" style="position:absolute;left:140px;top:900px;width:800px;height:800px;transform-origin:center;opacity:.9">${L('light_rays_5',0,0,800,800,'','@volte,1,1')}</div>`
 +S(`${G('data-pop="0.2,0.5"',`<rect x="110" y="560" width="860" height="420" rx="40" fill="#fff" opacity=".96"/>`)}
 <text x="180" y="720" font-family="Inter Tight" font-weight="900" font-size="52" fill="#334155">ROSSO</text><rect x="440" y="675" width="80" height="70" rx="14" fill="#ef4444" style="transform-box:fill-box;transform-origin:left" data-grow="0.5,0.5"/>
 <text x="180" y="880" font-family="Inter Tight" font-weight="900" font-size="52" fill="#334155">BLU</text><rect x="440" y="835" width="480" height="70" rx="14" fill="#3b82f6" style="transform-box:fill-box;transform-origin:left" data-grow="@6,0.9"/>
 ${G('data-stamp="@volte"',`<text x="540" y="1380" text-anchor="middle" class="anton" font-size="260" fill="#fff" stroke="#1d4ed8" stroke-width="10" paint-order="stroke">×6</text>`)}`)},
{voice:"E il viola? Viene diffuso ancora di più, ma il Sole ne emette meno e i nostri occhi sono molto più sensibili al blu.",
 cam:"0,1.2,0,200|@viola,1.0,0,120|@sole,1.0,0,0|@occhi,1.3,0,-200|@blu,1.1,0,-120",
 html:bg('k5',[[0,'#2e1065'],[1,'#4c1d95']])+stars(40)
 +`<div data-pop="@viola,0.5" style="position:absolute;left:340px;top:560px;width:400px;height:400px;transform-origin:center">${L('question_mark_4',0,0,400,400,'','@viola,1,1')}</div>`
 +`<div data-pop="@sole,0.5" style="position:absolute;left:720px;top:600px;width:300px;height:300px;transform-origin:center">${L('sun_1',0,0,300,300,'','@sole,1,1')}</div>`
 +`<div data-pop="@occhi,0.5" style="position:absolute;left:190px;top:900px;width:700px;height:700px;transform-origin:center;filter:invert(1)">${L('eye_blink_1',0,0,700,700,'','@occhi,1,1')}</div>`},
{voice:"Al tramonto, la luce attraversa molta più aria. Il blu si perde per strada, e restano il rosso e l'arancione.",
 cam:"0,1.0,0,0|@aria,1.15,0,-60|@strada,1.05,0,0|@arancione,1.25,0,-140",
 html:bg('k6a',[[0,'#0c4a6e'],[1,'#7dd3fc']])+`<div data-fade="@tramonto,2.6">${bg('k6b',[[0,'#4c1d95'],[.45,'#f97316'],[1,'#fde68a']])}</div>`
 +`<div data-drop="0.2,3.2,-560" style="position:absolute;left:290px;top:1000px;width:500px;height:500px">${L('sun_4',0,0,500,500)}</div>`+L('cloud_1',640,560,360,280,'data-pan="-220,0"')+sea('k6s',1400,'#7c2d12','#1c1917')},
{voice:"Segui Made in News: una pillola di sapere al giorno.",
 cam:"0,1.1,0,0|1.5,1.0,0,0",
 html:bg('k7',[[0,'#0f172a'],[1,'#1e293b']])+L('space_stars_2',190,420,700,700)
 +S(`${G('data-pop="0.3,0.5"',`<rect x="390" y="700" width="300" height="300" fill="#fff"/><text x="540" y="917" text-anchor="middle" class="anton" font-size="186" fill="#000">MN<tspan fill="#E63946">.</tspan></text>`)}${G('data-rise="0.8,0.5"',`<text x="540" y="1170" text-anchor="middle" font-family="Inter Tight" font-size="96" font-weight="900" fill="#fff" letter-spacing="-4">madeinnews<tspan fill="#E63946">.</tspan></text>`)}${G('data-rise="1.2,0.5"',`<text x="540" y="1270" text-anchor="middle" font-family="Inter Tight" font-size="46" font-weight="800" fill="#38bdf8">PILLOLE DI SAPERE, OGNI GIORNO</text>`)}`)}];
fs.writeFileSync('cielo3.json',JSON.stringify({voiceId:"GOAZNavLupajyL3YafaD",title:["Perché il cielo è blu?"],source:"Fonti: NASA, Treccani",accent:'#38BDF8',scenes},null,1));console.log('ok');

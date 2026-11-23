const fs=require('fs');
const S=i=>`<svg viewBox="0 0 1080 1920" width="1080" height="1920" style="position:absolute;inset:0">${i}</svg>`;
const G=(a,i)=>`<g ${a} style="transform-box:fill-box;transform-origin:center">${i}</g>`;
const lg=(id,st)=>`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${st.map(([o,c])=>`<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
const L=(name,x,y,w,h,extra='',lp='0,1,1')=>`<div data-lot="${name}" data-lp="${lp}" ${extra} style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;transform-origin:center"></div>`;
const P=(at,x,y,w,h,name,lp)=>`<div data-pop="${at},0.5" style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;transform-origin:center">${L(name,0,0,w,h,'',lp||(at+',1,1'))}</div>`;
const bg=(id,st)=>S(`<defs>${lg(id,st)}</defs><rect width="1080" height="1920" fill="url(#${id})"/>`);
const grid=c=>S([...Array(14)].map((_,k)=>`<line x1="0" y1="${k*150}" x2="1080" y2="${k*150}" stroke="${c}" stroke-opacity=".08" stroke-width="3"/><line x1="${k*90}" y1="0" x2="${k*90}" y2="1920" stroke="${c}" stroke-opacity=".08" stroke-width="3"/>`).join(''));
const T=(x,y,s,c,t,extra='')=>`<text x="${x}" y="${y}" text-anchor="middle" class="anton" font-size="${s}" fill="${c}" ${extra}>${t}</text>`;
const scenes=[
{voice:"GTA non è un nome inventato. È un reato. E lo trovi scritto nel codice penale americano.",
 cam:"0,1.15,0,60|@reato,1.0,0,0|@codice,1.08,0,-80",
 html:bg('q1',[[0,'#0b0f1e'],[1,'#1e1b4b']])+grid('#fff')
 +S(G('data-pop="0.1,0.5"',T(540,880,300,'#fff','GTA','stroke="#0b0f1e" stroke-width="12" paint-order="stroke"')))
 +P('@reato',290,930,500,420,'police_car_0')
 +S(G('data-stamp="@reato"',`<g transform="rotate(-8 540 1480)"><rect x="250" y="1390" width="580" height="170" rx="20" fill="none" stroke="#ef4444" stroke-width="14"/>${T(540,1515,120,'#ef4444','REATO')}</g>`))
 +`<div data-rise="@codice,0.5" style="position:absolute;left:0;top:0;width:1080px;height:1920px">${S(`<rect x="170" y="1620" width="740" height="110" rx="24" fill="#fff"/><text x="540" y="1695" text-anchor="middle" font-family="Inter Tight" font-weight="900" font-size="50" fill="#0b0f1e">CODICE PENALE · USA</text>`)}</div>`},
{voice:"Grand Theft Auto, in inglese, vuol dire furto d'auto. E negli Stati Uniti, grand theft è il furto grave, quello punito più duramente.",
 cam:"0,1.1,0,0|@furto,1.0,0,0|@grave,1.2,0,60|@duramente,1.0,0,0",
 html:bg('q2',[[0,'#111827'],[1,'#312e81']])+grid('#fff')
 +S(`${G('data-pop="@Grand,0.4"',T(540,600,170,'#fff','GRAND'))}${G('data-pop="@Theft,0.4"',T(540,790,170,'#fff','THEFT'))}${G('data-pop="@Auto,0.4"',T(540,980,170,'#fff','AUTO'))}
 ${G('data-rise="@furto,0.4"',`<text x="540" y="1090" text-anchor="middle" font-family="Inter Tight" font-weight="900" font-size="64" fill="#F59E0B">= FURTO D'AUTO</text>`)}`)
 +`<div style="filter:invert(1)">`+P('@Stati',290,1150,500,500,'judge_gavel_0')+`</div>`
 +S(G('data-stamp="@duramente"',`<rect x="230" y="1680" width="620" height="120" rx="24" fill="#ef4444"/><text x="540" y="1762" text-anchor="middle" font-family="Inter Tight" font-weight="900" font-size="60" fill="#fff">GRAND THEFT = GRAVE</text>`))},
{voice:"In California, per esempio, rubare un'auto è sempre grand theft, qualunque sia il suo valore.",
 cam:"0,1.0,0,0|@un'auto,1.15,0,-80|@valore,1.0,0,0",
 html:bg('q3',[[0,'#0c4a6e'],[1,'#f59e0b']])
 +S(G('data-pop="0.1,0.5"',`<rect x="190" y="440" width="700" height="150" rx="30" fill="#0b0f1e"/><text x="540" y="542" text-anchor="middle" font-family="Inter Tight" font-weight="900" font-size="72" fill="#fff">CALIFORNIA</text>`))
 +P("@un'auto",190,620,700,560,'police_car_4')
 +S(G('data-pop="@valore,0.5"',`<rect x="160" y="1300" width="760" height="300" rx="36" fill="#fff"/><text x="540" y="1420" text-anchor="middle" font-family="Inter Tight" font-weight="800" font-size="52" fill="#334155">VALORE DELL'AUTO</text><text x="540" y="1530" text-anchor="middle" class="anton" font-size="110" fill="#ef4444">NON CONTA</text>`))},
{voice:"Ma il gioco non nasce in America. Nasce in Scozia, a Dundee, nello studio DMA Design, nel 1995.",
 cam:"0,1.1,0,0|@Scozia,1.0,0,0|@Dundee,1.2,0,-60|@1995,1.0,0,0",
 html:bg('q4',[[0,'#0f172a'],[1,'#065f46']])+grid('#fff')
 +S(`${G('data-pop="@Scozia,0.5"',T(540,640,190,'#fff','SCOZIA'))}
 <g data-drop="@Dundee,0.6,-300"><path d="M540 760 c-80 0 -130 60 -130 130 c0 100 130 220 130 220 s130 -120 130 -220 c0 -70 -50 -130 -130 -130z" fill="#ef4444"/><circle cx="540" cy="890" r="48" fill="#fff"/></g>
 <circle cx="540" cy="1120" r="30" fill="#ef4444" opacity=".5" data-ripple="@Dundee,2"/>
 ${G('data-rise="@Dundee,0.5"',T(540,1300,130,'#F59E0B','DUNDEE'))}
 ${G('data-pop="@DMA,0.5"',`<rect x="240" y="1380" width="600" height="120" rx="24" fill="#fff"/><text x="540" y="1462" text-anchor="middle" font-family="Inter Tight" font-weight="900" font-size="60" fill="#0f172a">DMA DESIGN</text>`)}
 ${G('data-stamp="@1995"',T(540,1700,180,'#fff','1995'))}`)},
{voice:"E all'inizio aveva un altro nome: Race'n'Chase. Potevi scegliere se fare la guardia o il ladro.",
 cam:"0,1.15,0,0|@nome,1.0,0,0|@guardia,1.06,0,-40",
 html:bg('q5',[[0,'#1e1b4b'],[1,'#0b0f1e']])+grid('#fff')
 +P('0.1',390,420,300,300,'game_controller_0','0,1,1')
 +S(`${G('data-pop="@Race,0.5"',`<rect x="70" y="760" width="940" height="200" rx="30" fill="#F59E0B"/>${T(540,898,112,'#0b0f1e',"RACE'N'CHASE")}`)}
 ${G('data-pop="@guardia,0.4"',T(290,1700,80,'#60a5fa','GUARDIA'))}${G('data-pop="@ladro,0.4"',T(790,1700,80,'#ef4444','LADRO'))}`)
 +P('@guardia',40,1100,500,500,'police_siren_3')+P('@ladro',560,1100,480,480,'thief_0')},
{voice:"Poi, prima dell'uscita, il nome cambia in Grand Theft Auto. Il gioco esce nel 1997.",
 cam:"0,1.0,0,0|@cambia,1.2,0,-100|@1997,1.0,0,0",
 html:bg('q6',[[0,'#0b0f1e'],[1,'#7c2d12']])+grid('#fff')
 +S(`<g data-off="@cambia">${T(540,640,112,'#94a3b8',"RACE'N'CHASE")}</g>
 <g data-fade="@cambia,0.3"><line x1="150" y1="600" x2="930" y2="600" stroke="#ef4444" stroke-width="16" stroke-linecap="round"/></g>
 ${G('data-pop="@Grand,0.5"',`${T(540,880,150,'#fff','GRAND THEFT')}${T(540,1050,150,'#F59E0B','AUTO')}`)}
 ${G('data-stamp="@1997"',T(540,1700,200,'#fff','1997'))}`)
 +P('@cambia',340,1130,400,400,'game_controller_4','@cambia,1,1')},
{voice:"Segui Made in News: una pillola di sapere al giorno.",
 cam:"0,1.1,0,0|1.5,1.0,0,0",
 html:bg('q7',[[0,'#0f172a'],[1,'#1e293b']])
 +S(`${G('data-pop="0.3,0.5"',`<rect x="390" y="700" width="300" height="300" fill="#fff"/><text x="540" y="917" text-anchor="middle" class="anton" font-size="186" fill="#000">MN<tspan fill="#E63946">.</tspan></text>`)}${G('data-rise="0.8,0.5"',`<text x="540" y="1170" text-anchor="middle" font-family="Inter Tight" font-size="96" font-weight="900" fill="#fff" letter-spacing="-4">madeinnews<tspan fill="#E63946">.</tspan></text>`)}${G('data-rise="1.2,0.5"',`<text x="540" y="1270" text-anchor="middle" font-family="Inter Tight" font-size="46" font-weight="800" fill="#F59E0B">PILLOLE DI SAPERE, OGNI GIORNO</text>`)}`)}];
fs.writeFileSync('gta_p.json',JSON.stringify({voiceId:"GOAZNavLupajyL3YafaD",title:["Perché si chiama GTA?"],logo:true,accent:'#F59E0B',scenes},null,1));console.log('ok');

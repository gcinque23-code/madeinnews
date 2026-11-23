const fs=require('fs');
const S=i=>`<svg viewBox="0 0 1080 1920" width="1080" height="1920" style="position:absolute;inset:0">${i}</svg>`;
const G=(a,i)=>`<g ${a} style="transform-box:fill-box;transform-origin:center">${i}</g>`;
const lg=(id,stops,x2=0,y2=1)=>`<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o,c])=>`<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
const rg=(id,stops)=>`<radialGradient id="${id}">${stops.map(([o,c,op=1])=>`<stop offset="${o}" stop-color="${c}" stop-opacity="${op}"/>`).join('')}</radialGradient>`;
const sun=(id,x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r*2.6}" fill="url(#${id}g)"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${id}c)"/>`;
const sunDefs=id=>rg(id+'g',[[0,'#fff7cc',.9],[.4,'#fde68a',.35],[1,'#fde68a',0]])+rg(id+'c',[[0,'#fffbeb'],[.7,'#fde047'],[1,'#facc15']]);
const cloud=(x,y,s=1)=>`<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="120" ry="55" fill="#fff"/><ellipse cx="-70" cy="15" rx="80" ry="45" fill="#fff"/><ellipse cx="80" cy="18" rx="85" ry="42" fill="#fff"/><ellipse cx="10" cy="-35" rx="70" ry="50" fill="#fff"/><ellipse cx="0" cy="40" rx="190" ry="22" fill="#e0f2fe" opacity=".8"/></g>`;
const sea=(id,y,c1,c2)=>`<defs>${lg(id,[[0,c1],[1,c2]])}</defs><rect x="-100" y="${y}" width="1280" height="${1920-y+100}" fill="url(#${id})"/>${[0,1,2,3,4].map(k=>`<path d="M-100 ${y+60+k*90} q 135 -22 270 0 t 270 0 t 270 0 t 270 0 t 270 0" stroke="#ffffff" stroke-opacity="${.18-k*.025}" stroke-width="6" fill="none" data-pan="${k%2?-80:80},0"/>`).join('')}`;
const RB=['#ef4444','#f97316','#facc15','#22c55e','#3b82f6','#6366f1','#a855f7'];
const mol=(x,y,c,k)=>`<g data-bob="14,${1.2+k*.2},${k}"><circle cx="${x}" cy="${y}" r="22" fill="${c}"/><circle cx="${x+30}" cy="${y}" r="22" fill="${c}"/><circle cx="${x-6}" cy="${y-7}" r="7" fill="#fff" opacity=".6"/><circle cx="${x+24}" cy="${y-7}" r="7" fill="#fff" opacity=".6"/></g>`;
const scenes=[
// 1. gancio: cielo viola che diventa blu
{voice:"In teoria, il cielo dovrebbe essere viola. E invece lo vediamo blu. Ecco perché.",
 html:S(`<defs>${lg('q1b',[[0,'#0c4a6e'],[.55,'#38bdf8'],[1,'#bae6fd']])}${lg('q1v',[[0,'#3b0764'],[.55,'#a855f7'],[1,'#e9d5ff']])}${sunDefs('q1')}</defs>
 <rect width="1080" height="1920" fill="url(#q1b)"/><rect width="1080" height="1920" fill="url(#q1v)" data-off="@invece"/>
 <g data-pan="-60,40">${sun('q1',780,640,95)}</g>
 <g data-pan="120,0">${cloud(260,900,1.1)}</g><g data-pan="-90,0">${cloud(820,1120,.8)}</g>
 ${sea('q1s',1450,'#0369a1','#0c4a6e')}`)},
// 2. luce bianca e prisma
{voice:"La luce del Sole sembra bianca, ma in realtà contiene tutti i colori dell'arcobaleno.",
 html:S(`<defs>${lg('q2',[[0,'#020617'],[1,'#1e1b4b']])}${sunDefs('q2')}${lg('pr',[[0,'#ffffff55'],[1,'#ffffff11']],1,1)}</defs>
 <rect width="1080" height="1920" fill="url(#q2)"/>${[...Array(40)].map((_,k)=>`<circle cx="${(k*137)%1080}" cy="${(k*251)%1900}" r="${k%3+1}" fill="#fff" opacity=".5"/>`).join('')}
 ${G('data-pop="0.1,0.6"',sun('q2',170,960,90))}
 <line data-draw="0.5,0.8" x1="260" y1="960" x2="470" y2="960" stroke="#fff" stroke-width="22" stroke-linecap="round"/>
 ${G('data-pop="@bianca,0.5"',`<polygon points="560,780 720,1120 400,1120" fill="url(#pr)" stroke="#fff" stroke-width="8" stroke-linejoin="round"/><polygon points="560,800 600,880 540,880" fill="#fff" opacity=".35"/>`)}
 ${RB.map((c,k)=>`<line data-draw="@colori,0.9" x1="640" y1="960" x2="1100" y2="${720+k*80}" stroke="${c}" stroke-width="26" stroke-linecap="round"/>`).join('')}`)},
// 3. atmosfera: molecole, rosso dritto, blu che rimbalza
{voice:"Quando entra nell'atmosfera, la luce urta le molecole di azoto e ossigeno. Il rosso passa quasi dritto. Il blu, invece, rimbalza in tutte le direzioni.",
 html:S(`<defs>${lg('q3',[[0,'#020617'],[.35,'#0c4a6e'],[1,'#38bdf8']])}</defs><rect width="1080" height="1920" fill="url(#q3)"/>
 ${[[180,700],[420,860],[700,720],[880,980],[260,1120],[560,1240],[820,1380],[340,1480],[640,980]].map(([x,y],k)=>`<g data-pop="@molecole,0.4">${mol(x,y,k%2?'#93c5fd':'#f1f5f9',k)}</g>`).join('')}
 <line data-draw="@rosso,1.0" x1="-40" y1="1040" x2="1120" y2="1040" stroke="#ef4444" stroke-width="18" stroke-linecap="round"/>
 ${[[700,720,520,560],[700,720,900,560],[420,860,240,980],[640,980,820,1200],[560,1240,380,1400],[560,1240,760,1500],[880,980,1060,860],[260,1120,120,1300]].map(([a,b,c,d])=>`<line data-draw="@rimbalza,0.6" x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="#3b82f6" stroke-width="14" stroke-linecap="round"/><circle cx="${c}" cy="${d}" r="12" fill="#60a5fa" data-pop="@direzioni,0.3"/>`).join('')}`)},
// 4. sei volte
{voice:"Il blu viene diffuso circa 6 volte più del rosso, e così arriva ai nostri occhi da ogni punto del cielo.",
 html:S(`<defs>${lg('q4',[[0,'#0c4a6e'],[1,'#7dd3fc']])}</defs><rect width="1080" height="1920" fill="url(#q4)"/>
 <g data-pan="80,0">${cloud(300,560,.9)}</g>
 ${G('data-pop="0.2,0.5"',`<rect x="110" y="820" width="860" height="560" rx="40" fill="#fff" opacity=".96"/>`)}
 <text x="180" y="990" font-family="Inter Tight" font-weight="900" font-size="52" fill="#334155" data-fade="0.4,0.3">ROSSO</text><rect x="440" y="945" width="90" height="70" rx="14" fill="#ef4444" style="transform-box:fill-box;transform-origin:left" data-grow="0.5,0.5"/>
 <text x="180" y="1150" font-family="Inter Tight" font-weight="900" font-size="52" fill="#334155" data-fade="0.4,0.3">BLU</text><rect x="440" y="1105" width="460" height="70" rx="14" fill="#3b82f6" style="transform-box:fill-box;transform-origin:left" data-grow="@6,0.9"/>
 ${G('data-stamp="@volte"',`<text x="540" y="1320" text-anchor="middle" class="anton" font-size="140" fill="#3b82f6">×6</text>`)}`)},
// 5. il viola e l'occhio
{voice:"E il viola? Viene diffuso ancora di più, ma il Sole ne emette meno e i nostri occhi sono molto più sensibili al blu.",
 html:S(`<defs>${lg('q5',[[0,'#1e1b4b'],[1,'#312e81']])}${rg('iris',[[0,'#1e3a8a'],[.6,'#3b82f6'],[1,'#1e40af']])}</defs><rect width="1080" height="1920" fill="url(#q5)"/>
 ${G('data-pop="@viola,0.5"',`<circle cx="540" cy="700" r="130" fill="#a855f7"/><text x="540" y="745" text-anchor="middle" class="anton" font-size="130" fill="#fff">?</text>`)}
 ${G('data-pop="@occhi,0.6"',`<path d="M190 1220 Q540 900 890 1220 Q540 1540 190 1220z" fill="#f8fafc"/><circle cx="540" cy="1220" r="150" fill="url(#iris)"/><circle cx="540" cy="1220" r="62" fill="#0a0a0a"/><circle cx="585" cy="1175" r="26" fill="#fff"/>`)}`)},
// 6. tramonto sul mare
{voice:"Al tramonto, la luce attraversa molta più aria. Il blu si perde per strada, e restano il rosso e l'arancione.",
 html:S(`<defs>${lg('q6a',[[0,'#0c4a6e'],[1,'#7dd3fc']])}${lg('q6b',[[0,'#4c1d95'],[.45,'#f97316'],[1,'#fde68a']])}${sunDefs('q6')}</defs>
 <rect width="1080" height="1920" fill="url(#q6a)"/><rect width="1080" height="1920" fill="url(#q6b)" data-fade="@tramonto,2.4"/>
 <g data-drop="0.2,3.0,-520">${sun('q6',540,1380,120)}</g>
 ${sea('q6s',1400,'#7c2d12','#1c1917')}
 <rect x="470" y="1420" width="140" height="10" rx="5" fill="#fde68a" opacity=".7" data-fade="@tramonto,1.5"/><rect x="430" y="1470" width="220" height="10" rx="5" fill="#fde68a" opacity=".5" data-fade="@tramonto,1.5"/>`)},
// 7. chiusura
{voice:"Segui Made in News: una pillola di sapere al giorno.",
 html:S(`<defs>${lg('q7',[[0,'#0f172a'],[1,'#1e293b']])}</defs><rect width="1080" height="1920" fill="url(#q7)"/>
 ${G('data-pop="0.2,0.5"',`<rect x="390" y="700" width="300" height="300" fill="#fff"/><text x="540" y="917" text-anchor="middle" class="anton" font-size="186" fill="#000">MN<tspan fill="#E63946">.</tspan></text>`)}${G('data-rise="0.8,0.5"',`<text x="540" y="1170" text-anchor="middle" font-family="Inter Tight" font-size="96" font-weight="900" fill="#fff" letter-spacing="-4">madeinnews<tspan fill="#E63946">.</tspan></text>`)}${G('data-rise="1.2,0.5"',`<text x="540" y="1270" text-anchor="middle" font-family="Inter Tight" font-size="46" font-weight="800" fill="#38bdf8">PILLOLE DI SAPERE, OGNI GIORNO</text>`)}`)}];
fs.writeFileSync('cielo2.json',JSON.stringify({voiceId:"GOAZNavLupajyL3YafaD",title:["Perché il cielo è blu?"],source:"Fonti: NASA, Treccani",accent:'#38BDF8',scenes},null,1));console.log('ok');

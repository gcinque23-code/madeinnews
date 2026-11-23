const fs=require('fs'); const IT=JSON.parse(fs.readFileSync('assets/italia.json'));
const A='#FACC15', R='#EF4444', G='#9CA3AF', P='/home/user/italia-in-breve/archivio/nucleare/';
const cr=JSON.parse(fs.readFileSync(P+'credits.json'));
const svg=(inner,vb='0 0 1080 1100')=>`<svg viewBox="${vb}" width="1080" height="1100" style="position:absolute;inset:0;overflow:visible">${inner}</svg>`;
const g=(attrs,inner)=>`<g ${attrs} style="transform-box:fill-box;transform-origin:center">${inner}</g>`;
// torre di raffreddamento (iperboloide) disegnata
const tower=(x,y,s,delay)=>`<g transform="translate(${x},${y}) scale(${s})">
 <path data-draw="${delay},1.2" d="M-120 300 C-80 150,-70 60,-95 -20 L95 -20 C70 60,80 150,120 300 Z" fill="#1c1c22" fill-opacity="0" data-fill="${delay+1},0.5" stroke="${A}" stroke-width="7"/>
 <path data-draw="${delay+0.6},0.8" d="M-100 120 C-30 135,30 135,100 120" stroke="${A}" stroke-width="4" fill="none" opacity=".6"/>
 <path data-draw="${delay+0.7},0.8" d="M-88 30 C-30 42,30 42,88 30" stroke="${A}" stroke-width="4" fill="none" opacity=".6"/>
 ${[0,0.5,1.0,1.5].map((ph,k)=>`<circle data-steam="${delay+1.2},${ph},${-30+k*20}" cx="0" cy="-40" r="20" fill="#d1d5db"/>`).join('')}</g>`;
const scenes=[
// 1. torri che si costruiscono + timbro CHIUSO 1987
{voice:"L'Italia ha chiuso con il nucleare quasi quarant'anni fa. Ora il governo vuole riaprire la porta.",
 html:svg(`${tower(330,420,1.25,0.2)}${tower(720,470,1.0,0.5)}
 <line data-draw="0,0.8" x1="80" y1="845" x2="1000" y2="845" stroke="#444" stroke-width="6"/>
 ${g('data-stamp="2.0"',`<rect x="300" y="90" width="480" height="170" rx="14" fill="none" stroke="${R}" stroke-width="12"/><text x="540" y="215" text-anchor="middle" class="anton" font-size="130" fill="${R}">CHIUSO</text>`)}
 ${g('data-rise="2.4,0.5"',`<text x="540" y="1000" text-anchor="middle" class="anton" font-size="150" fill="${A}">1987</text>`)}`)},
// 2. calendario che conta 10 giorni + documento
{voice:"Il ministro dell'Ambiente Pichetto Fratin annuncia la proposta dei decreti attuativi entro dieci giorni.",
 html:svg(`${g('data-pop="0.2,0.5"',`<rect x="290" y="170" width="500" height="520" rx="36" fill="#18181f" stroke="#fff" stroke-width="8"/><rect x="290" y="170" width="500" height="130" rx="36" fill="${R}"/><rect x="290" y="250" width="500" height="50" fill="${R}"/><circle cx="400" cy="170" r="22" fill="#fff"/><circle cx="680" cy="170" r="22" fill="#fff"/><text x="540" y="268" text-anchor="middle" font-size="62" font-weight="900" fill="#fff">GIORNI</text><text data-count="0.7,2.2,10" x="540" y="610" text-anchor="middle" class="anton" font-size="300" fill="${A}">0</text>`)}
 ${g('data-slide="1.6,0.5,500"',`<rect x="140" y="760" width="800" height="150" rx="20" fill="#fff"/><text x="540" y="860" text-anchor="middle" font-size="60" font-weight="900" fill="#000">DECRETI ATTUATIVI</text>`)}`)},
// 3. Chernobyl: foto + triangolo di pericolo che si disegna + onde
{voice:"Tutto comincia con Chernobyl, nel 1986.",
 html:`<div style="position:absolute;inset:60px 0;overflow:hidden"><div data-kb style="position:absolute;inset:0;background:url(PHOTO(${P}chernobyl.jpg)) center/cover;transform-origin:center"></div><div style="position:absolute;inset:0;background:radial-gradient(circle,#0000,#000d 75%)"></div><div class="cr">Foto: ${cr.chernobyl}</div></div>`+
 svg(`${[0,0.45,0.9].map(d=>`<circle data-ripple="${0.8+d},1.4" cx="540" cy="470" r="10" fill="none" stroke="${R}" stroke-width="8"/>`).join('')}
 <path data-draw="0.3,0.9" d="M540 300 L700 580 L380 580 Z" fill="${R}" fill-opacity="0" data-fill="1.1,0.3" stroke="${R}" stroke-width="14" stroke-linejoin="round"/>
 ${g('data-pop="1.3"',`<text x="540" y="560" text-anchor="middle" class="anton" font-size="190" fill="#000">!</text>`)}
 ${g('data-shake="1.6" data-rise="1.5,0.4"',`<text x="540" y="860" text-anchor="middle" class="anton" font-size="200" fill="#fff">1986</text>`)}`)},
// 4. urna: schede che cadono + centrali che si spengono
{voice:"L'anno dopo gli italiani votano al referendum, e le centrali vengono spente una dopo l'altra.",
 html:svg(`${[0,1,2,3,4].map(k=>g(`data-fall="${0.3+k*0.35},0.55,-700"`,`<rect x="${470+(k%2)*40}" y="330" width="100" height="140" rx="8" fill="#fff"/><path d="M${490+(k%2)*40} 400 l20 22 l40 -45" stroke="#16a34a" stroke-width="12" fill="none"/>`)).join('')}
 ${g('data-pop="0.1,0.5"',`<rect x="330" y="470" width="420" height="300" rx="20" fill="#2563eb"/><rect x="430" y="455" width="220" height="30" rx="10" fill="#0b1b4d"/><text x="540" y="650" text-anchor="middle" font-size="70" font-weight="900" fill="#fff">1987</text>`)}
 ${[0,1,2,3].map(k=>`<g data-fade="${2.4+k*0.15},0.3"><circle cx="${240+k*200}" cy="920" r="44" fill="${A}" data-off="${3.0+k*0.35}"/><circle cx="${240+k*200}" cy="920" r="44" fill="none" stroke="#666" stroke-width="6"/></g>`).join('')}
 ${g('data-rise="2.4,0.4"',`<text x="540" y="1060" text-anchor="middle" font-size="48" font-weight="900" fill="#bbb">LE CENTRALI SI SPENGONO</text>`)}`)},
// 5. mappa d'Italia che si disegna + pin
{voice:"Erano quattro: Trino, in Piemonte. Caorso, in Emilia. Latina, nel Lazio. E il Garigliano, in Campania.",
 html:svg(`<g transform="translate(${(1080-IT.w*1.25)/2+40},40) scale(1.25)"><path data-draw="0,2.0" d="${IT.d}" fill="#1b1b22" fill-opacity="0" data-fill="1.6,0.6" stroke="#fff" stroke-width="3"/>
 ${Object.entries(IT.pins).map(([n,[x,y]],k)=>{const t=1.0+k*1.15;const left=(k%2===0);return `<circle data-ripple="${t},1.5" cx="${x}" cy="${y}" r="10" fill="none" stroke="${A}" stroke-width="4"/>
 <g data-drop="${t},0.7,-300" style="transform-box:fill-box;transform-origin:bottom"><path d="M${x} ${y} c-14 -22 -24 -32 -24 -46 a24 24 0 1 1 48 0 c0 14 -10 24 -24 46z" fill="${A}" stroke="#000" stroke-width="3"/><circle cx="${x}" cy="${y-46}" r="9" fill="#000"/></g>
 <g data-fade="${t+0.2},0.3"><rect x="${left?x-40-(n.length*22+30):x+30}" y="${left?y-40:y-78}" width="${n.length*22+30}" height="44" rx="8" fill="#fff"/><text x="${left?x-25-(n.length*22+30):x+45}" y="${left?y-8:y-46}" font-size="30" font-weight="900" fill="#000">${n}</text></g>`}).join('')}</g>`)},
// 6. 2011 Fukushima: donut 94%
{voice:"Nel 2011, dopo Fukushima, un secondo referendum. Il novantaquattro per cento dei votanti dice no al ritorno.",
 html:`<div style="position:absolute;left:90px;top:90px;width:300px;height:300px;border-radius:50%;overflow:hidden;border:8px solid #fff" data-pop="0.2,0.5"><div style="position:absolute;inset:0;background:url(PHOTO(${P}fukushima.jpg)) center/cover"></div></div><div class="cr" style="top:400px;bottom:auto;left:90px;right:auto">Foto: ${cr.fukushima}</div>`+
 svg(`${g('data-rise="0.4,0.5"',`<text x="460" y="200" font-size="54" font-weight="900" fill="#bbb">FUKUSHIMA</text><text x="460" y="330" class="anton" font-size="150" fill="#fff">2011</text>`)}
 <circle cx="540" cy="760" r="230" fill="none" stroke="#2a2a2a" stroke-width="70"/>
 <circle data-donut="1.6,2.2,94" data-c="1445" cx="540" cy="760" r="230" fill="none" stroke="${R}" stroke-width="70" stroke-dasharray="1445" stroke-dashoffset="1445" transform="rotate(-90 540 760)"/>
 <text data-count="1.6,2.2,94" data-suf="%" x="540" y="800" text-anchor="middle" class="anton" font-size="140" fill="#fff">0%</text>
 ${g('data-rise="2.6,0.4"',`<text x="540" y="1060" text-anchor="middle" font-size="50" font-weight="900" fill="${R}">NO AL NUCLEARE</text>`)}`)},
// 7. documento che si scrive + ingranaggi
{voice:"Adesso tocca ai decreti attuativi: le regole che servono per far ripartire il nucleare in Italia.",
 html:svg(`${g('data-pop="0.1,0.5"',`<rect x="300" y="140" width="480" height="640" rx="20" fill="#fff"/>`)}
 ${[0,1,2,3,4,5,6].map(k=>`<line data-draw="${0.6+k*0.25},0.4" x1="360" y1="${270+k*65}" x2="${k%3==2?600:720}" y2="${270+k*65}" stroke="#9ca3af" stroke-width="16" stroke-linecap="round"/>`).join('')}
 <text x="360" y="225" font-size="44" font-weight="900" fill="#000" data-fade="0.4,0.3">DECRETO</text>
 ${g('data-stamp="2.6"',`<circle cx="690" cy="690" r="95" fill="none" stroke="#16a34a" stroke-width="12"/><text x="690" y="705" text-anchor="middle" font-size="40" font-weight="900" fill="#16a34a">VIA</text>`)}
 ${[[200,870,90,40],[330,930,60,-60]].map(([x,y,r,sp])=>`<g transform="translate(${x},${y})"><g data-spin="${sp}" style="transform-origin:0 0">${[...Array(8)].map((_,k)=>`<rect x="-14" y="${-r-22}" width="28" height="36" fill="${A}" transform="rotate(${k*45})"/>`).join('')}<circle r="${r}" fill="${A}"/><circle r="${r*0.4}" fill="#07070a"/></g></g>`).join('')}`)},
// 8. chiusura logo
{voice:"Segui Made in News per capire le notizie, ogni giorno.",
 html:svg(`${g('data-pop="0.2,0.5"',`<rect x="390" y="250" width="300" height="300" fill="#fff"/><text x="525" y="480" text-anchor="middle" class="anton" font-size="200" fill="#000">MN</text><rect x="640" y="480" width="34" height="34" fill="#E63946"/>`)}
 ${g('data-rise="0.8,0.5"',`<text x="540" y="720" text-anchor="middle" font-size="96" font-weight="900" fill="#fff" letter-spacing="-4">madeinnews<tspan fill="#E63946">.</tspan></text>`)}
 ${g('data-rise="1.2,0.5"',`<text x="540" y="820" text-anchor="middle" font-size="46" font-weight="800" fill="${A}">LE NOTIZIE SPIEGATE, OGNI GIORNO</text>`)}`)}
];
fs.writeFileSync('nucleare3.json',JSON.stringify({voiceId:"Dl7eCteSx0r4bKkraGGE",title:["Nucleare: l'Italia ci riprova"],source:"Fonti: ANSA, Ministero dell'Ambiente",accent:A,scenes},null,1));
console.log('scene',scenes.length);

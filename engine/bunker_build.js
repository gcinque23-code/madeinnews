const fs=require('fs');
const INK='#1b1b1f',RED='#e63946',YEL='#ffd23f';const F=f=>`style="font-family:'${f}'"`;
const S=i=>`<svg viewBox="0 0 1080 1920" width="1080" height="1920" style="position:absolute;inset:0;overflow:visible">${i}</svg>`;
const C='style="transform-box:fill-box;transform-origin:center"';
const defs=`<defs><filter id="wob" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="5"/></filter>
<filter id="paper"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="8"/><feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.38  0 0 0 0 0.28  0 0 0 0.07 0"/></filter></defs>`;
const bg=defs+`<rect width="1080" height="1920" fill="#f6efe2"/><rect width="1080" height="1920" filter="url(#paper)"/>`;
let IDK=0;const pop=(t,inner,d=.45)=>`<g data-pop="${t},${d}" ${C}><g data-idle="5,${(2+(IDK%3)*0.4).toFixed(1)},${(IDK++)*1.3}" ${C}>${inner}</g></g>`;
const title=(y,t,size=110)=>`<g class="bx"><rect x="0" y="${y}" width="1080" height="${size*1.1}" fill="none"/><text x="540" y="${y+size}" text-anchor="middle" ${F('Luckiest Guy')} font-size="${size}" fill="${INK}">${t}</text></g>`;
const hl=(y,w,t,size=72,fill=YEL,col=INK)=>`<g filter="url(#wob)"><g class="bx"><rect x="${540-w/2}" y="${y}" width="${w}" height="${size*1.5}" rx="12" fill="${fill}"/><text x="540" y="${y+size*1.1}" text-anchor="middle" ${F('Luckiest Guy')} font-size="${size}" fill="${col}">${t}</text></g></g>`;
const tagAt=(cx,y,w,t,size,fill,col=INK)=>`<g filter="url(#wob)"><g class="bx"><rect x="${cx-w/2}" y="${y}" width="${w}" height="${size*1.5}" rx="12" fill="${fill}"/><text x="${cx}" y="${y+size*1.1}" text-anchor="middle" ${F('Luckiest Guy')} font-size="${size}" fill="${col}">${t}</text></g></g>`;
const hand=(x,y,t,size=56,col=INK)=>`<text x="${x}" y="${y}" text-anchor="middle" ${F('Gochi Hand')} font-size="${size}" fill="${col}">${t}</text>`;
const W='stroke="'+INK+'" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"';
const phone=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><rect x="-230" y="-430" width="460" height="860" rx="60" fill="${INK}"/><rect x="-200" y="-390" width="400" height="780" rx="36" fill="#fffaf0"/>
 <circle cx="-110" cy="-260" r="70" fill="${INK}"/><text x="-110" y="-238" text-anchor="middle" ${F('Anton')} font-size="52" fill="#fff" stroke="none">MN<tspan fill="${RED}">.</tspan></text>
 <text x="-30" y="-270" ${F('Inter Tight')} font-weight="900" font-size="27" fill="${INK}" stroke="none">madeinnews.it</text><text x="-30" y="-230" ${F('Gochi Hand')} font-size="28" fill="#666" stroke="none">pillole di sapere</text>
 ${[0,1,2].map(r=>[0,1,2].map(c=>`<rect x="${-180+c*124}" y="${-140+r*170}" width="110" height="155" rx="8" fill="${['#ffd23f','#a8c7e6','#f2c6a0','#c7e3c0','#e8b4b8','#f3e1a1'][(r*3+c)%6]}" stroke-width="5"/>`).join('')).join('')}</g>`;
const phoneCTA=(t1,t2,t3)=>`<g data-rise="${t1},0.6,600">${phone(540,1100,0.85)}</g>
 <g data-pop="${t2},0.4" ${C}><g filter="url(#wob)"><g class="bx"><rect x="370" y="1330" width="340" height="100" rx="20" fill="#3a86ff" stroke="${INK}" stroke-width="7"/><text x="540" y="1400" text-anchor="middle" ${F('Luckiest Guy')} font-size="56" fill="#fff">SEGUI</text></g></g></g>
 <g data-win="${t3},0,99"><g filter="url(#wob)"><g class="bx"><rect x="370" y="1330" width="340" height="100" rx="20" fill="#e5e7eb" stroke="${INK}" stroke-width="7"/><text x="540" y="1400" text-anchor="middle" ${F('Luckiest Guy')} font-size="50" fill="${INK}">SEGUITO</text></g></g></g>
 <g data-fade="${t2},0.15" style="opacity:0"><g data-mv="0,0.01,500,500,500,500,${t2},0.5,500,500,0,0"><g transform="translate(680,1460)" filter="url(#wob)" ${W}><path d="M0 0 L0 -60 Q0 -80 20 -80 Q40 -80 40 -60 L40 -10 L70 -10 Q100 -10 100 20 L100 90 Q100 130 60 130 L20 130 Q-20 130 -40 90 L-70 30 Q-80 10 -60 0 Q-40 -8 -25 10Z" fill="#f3c9a0"/></g></g></g>`;
// mappa stilizzata disegnata (non la mappa ufficiale): isola con città a sud e montagna a nord
const ISLE="M300 760 Q420 700 560 720 Q700 700 780 780 Q860 900 830 1040 Q900 1160 860 1280 Q840 1420 760 1500 Q640 1580 520 1560 Q400 1580 330 1500 Q250 1400 280 1260 Q220 1120 270 980 Q240 860 300 760Z";
const island=(hl='')=>`<g filter="url(#wob)" ${W}><rect x="60" y="680" width="960" height="920" rx="30" fill="#bfe3fa"/>${[...Array(6)].map((_,k)=>`<path d="M${100+k*150} ${720+(k%3)*280} q30 -16 60 0 t60 0" stroke="#fff" stroke-width="6" fill="none" opacity=".8"/>`).join('')}
 <path d="${ISLE}" fill="#d9e7c2"/>
 <path d="M360 1360 Q520 1300 700 1380 Q720 1480 620 1540 Q480 1560 380 1490Z" fill="#e8dcc8"/>
 ${[[420,1400,60,50],[500,1380,40,80],[560,1420,50,60],[620,1400,40,70],[470,1460,50,40],[560,1480,60,40]].map(([x,y,w,h])=>`<rect x="${x}" y="${y-h}" width="${w}" height="${h}" fill="#b8c4d0" stroke-width="5"/>`).join('')}
 <path d="M430 960 L540 800 L650 960Z" fill="#a8a29a"/><path d="M500 858 L540 800 L580 858 L560 850 L540 870 L520 850Z" fill="#fff"/>
 <path d="M300 1160 Q400 1120 520 1180 Q600 1220 760 1150" stroke="#c9b48a" stroke-width="12" fill="none"/></g>
`;
const pin=(x,y,t,c=RED)=>`<g data-drop="${t},0.6,-400"><g filter="url(#wob)" ${W}><path d="M${x} ${y} c-34 -44 -54 -64 -54 -94 a54 54 0 0 1 108 0 c0 30 -20 50 -54 94z" fill="${c}"/><circle cx="${x}" cy="${y-94}" r="20" fill="#fff"/></g></g><circle cx="${x}" cy="${y}" r="16" fill="none" stroke="${c}" stroke-width="6" data-ripple="${t},1.4"/>`;
const OL='#5f6b3a',GR='#4a4e57',DIRT='#b98a5a',DIRT2='#9c6f45';
// roulotte vista di lato con antenne e parabole
const trailer=(x,y,s=1)=>`<g transform="translate(${x},${y}) scale(${s})">
 <g filter="url(#wob)" ${W}><line x1="-120" y1="-160" x2="-120" y2="-260"/><line x1="40" y1="-160" x2="40" y2="-340"/><line x1="10" y1="-300" x2="70" y2="-300"/><line x1="20" y1="-260" x2="60" y2="-260"/><line x1="230" y1="-160" x2="230" y2="-220"/></g>
 <g><g data-wig="6,1.6"><g filter="url(#wob)" ${W}><path d="M-190 -300 Q-120 -190 -50 -300 Z" fill="#e5e7eb"/><line x1="-120" y1="-262" x2="-120" y2="-320"/></g></g></g>
 <g data-wig="5,2.1"><g filter="url(#wob)" ${W}><path d="M180 -250 Q230 -170 280 -250 Z" fill="#e5e7eb"/></g></g>
 <circle cx="40" cy="-345" r="14" fill="${RED}" stroke="${INK}" stroke-width="5" data-flash="0,0.5,0.2"/>
 <g filter="url(#wob)" ${W}><rect x="-320" y="-165" width="640" height="250" rx="60" fill="#f4ecd8"/><rect x="-320" y="-30" width="640" height="34" fill="#7cc4ff" stroke="none"/><rect x="-320" y="-30" width="640" height="34" fill="none"/>
 <rect x="-250" y="-120" width="140" height="70" rx="14" fill="#bfe6ff"/><rect x="120" y="-120" width="140" height="70" rx="14" fill="#bfe6ff"/><rect x="-40" y="-130" width="100" height="200" rx="10" fill="#d9c9a6"/><circle cx="40" cy="-30" r="8" fill="${INK}"/>
 <line x1="-320" y1="60" x2="-380" y2="80"/><circle cx="-150" cy="90" r="46" fill="#3a3a44"/><circle cx="-150" cy="90" r="16" fill="#c7cdd4"/><circle cx="170" cy="90" r="46" fill="#3a3a44"/><circle cx="170" cy="90" r="16" fill="#c7cdd4"/></g></g>`;
const launcher=(x,y,s=1,r=0)=>`<g transform="translate(${x},${y}) rotate(${r}) scale(${s})" filter="url(#wob)" ${W}><rect x="-260" y="-38" width="520" height="76" rx="20" fill="${OL}"/><path d="M260 -48 L300 -48 L300 48 L260 48Z" fill="#3e4626"/><path d="M-260 -30 L-330 -50 L-330 50 L-260 30Z" fill="#3e4626"/>
 <rect x="-60" y="-90" width="90" height="52" rx="10" fill="${GR}"/><circle cx="-15" cy="-64" r="14" fill="#7cc4ff"/><path d="M-90 38 L-110 130 L-60 130 L-40 38Z" fill="#3b2a20"/><path d="M60 38 L60 100 L100 100 L100 38Z" fill="#3b2a20"/><rect x="-200" y="-14" width="120" height="28" rx="8" fill="${YEL}" stroke-width="5"/></g>`;
const rocket=(x,y,s=1)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><path d="M-90 -22 L60 -22 L110 0 L60 22 L-90 22Z" fill="#c7cdd4"/><path d="M60 -22 L110 0 L60 22Z" fill="${RED}"/><path d="M-90 -22 L-120 -44 L-120 44 L-90 22Z" fill="${GR}"/></g>`;
const smg=(x,y,s=1)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><rect x="-170" y="-50" width="300" height="90" rx="16" fill="${GR}"/><rect x="130" y="-30" width="120" height="34" rx="8" fill="#2b2d42"/><rect x="-60" y="40" width="56" height="150" rx="10" fill="#2b2d42" transform="rotate(8 -32 40)"/><path d="M40 40 L30 130 L80 130 L90 40Z" fill="#3b2a20"/><path d="M-170 -30 L-260 -40 L-260 30 L-170 20Z" fill="#2b2d42"/><rect x="-120" y="-80" width="140" height="30" rx="8" fill="${PURP}"/></g>`;
const PURP='#8e5aa8';
const guy=(x,y,s=1,shirt='#3a86ff',face='ok')=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><path d="M-30 0 L-40 -150 M30 0 L40 -150" stroke="#2b2d42" stroke-width="34" fill="none"/><path d="M-30 0 L-40 -150 M30 0 L40 -150" fill="none"/><rect x="-62" y="-330" width="124" height="190" rx="40" fill="${shirt}"/><circle cx="0" cy="-390" r="66" fill="#f3c9a0"/><path d="M-66 -405 Q-60 -465 0 -465 Q60 -465 66 -405 Q30 -430 0 -425 Q-30 -430 -66 -405Z" fill="#6b3e26"/>
 ${face=='ok'?`<circle cx="-22" cy="-392" r="8" fill="${INK}"/><circle cx="22" cy="-392" r="8" fill="${INK}"/><path d="M-24 -356 Q0 -336 24 -356" fill="none"/>`:`<circle cx="-22" cy="-392" r="8" fill="${INK}"/><circle cx="22" cy="-392" r="8" fill="${INK}"/><path d="M-20 -348 Q0 -362 20 -348" fill="none"/>`}</g>`;
const pistol=(x,y,s=1)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><rect x="-40" y="-20" width="90" height="34" rx="6" fill="${GR}"/><path d="M-40 10 L-50 60 L-20 60 L-10 10Z" fill="#3b2a20"/></g>`;
const target=(x,y,s=1)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><circle r="90" fill="#fff"/><circle r="62" fill="${RED}"/><circle r="36" fill="#fff"/><circle r="14" fill="${RED}"/></g>`;
const V=["In GTA 6 c'è una roulotte coperta di antenne. Sembra quella di un complottista… ma sotto nasconde un bunker segreto. Con dentro un lanciarazzi gratis.",
"Prima di dirti dove si trova: seguici, ogni giorno un segreto di GTA 6.",
"Vai a Vice City, nel quartiere di Balsero, e cerca il poligono di tiro Griffin. Subito a sud-ovest c'è un recinto: la roulotte è lì dentro.",
"Entra e guarda il pavimento: c'è una botola. Nessun codice. La apri… e scendi.",
"Nel bunker trovi il lanciarazzi H-AT con i suoi razzi, e una mitraglietta unica: la Conspiracist Type 9.",
"E il bello è che puoi prenderlo già nel primo capitolo, quando gli altri girano ancora con la pistola.",
"Conosci un altro nascondiglio? Scrivilo nei commenti. Made in News: una pillola di sapere al giorno."];
const SCN=[
{cam:"0,1.0,0,0",
 html:S(bg+`<g data-off="@bunker">${pop(0.15,hl(420,760,'LA ROULOTTE SEGRETA',64,YEL))}</g>${pop('@bunker',hl(420,760,'UN BUNKER SEGRETO',66,RED,'#fff'))}
 <g data-off="@Sembra">${pop('@coperta',hand(540,640,'coperta di antenne',58,RED))}</g>${pop('@Sembra',hand(540,640,'sembra di un complottista…',56,RED))}
 <g data-fade="@sotto,0.5" style="opacity:0"><g filter="url(#wob)" ${W}><rect x="60" y="1170" width="960" height="390" rx="20" fill="${DIRT}"/><rect x="510" y="1170" width="60" height="140" fill="#2b2d42"/><rect x="250" y="1300" width="580" height="220" rx="16" fill="#2b2d42"/></g>
  ${[[150,1230],[900,1260],[180,1480],[920,1500],[420,1220]].map(([a,b])=>`<circle cx="${a}" cy="${b}" r="12" fill="${DIRT2}"/>`).join('')}</g>
 <g data-flash="@bunker,0.35,0.55"><rect x="270" y="1320" width="540" height="180" rx="12" fill="${YEL}" opacity=".25"/></g>
 ${pop('@roulotte',trailer(540,1080,0.95))}${pop('@complottista',`<text x="880" y="880" text-anchor="middle" ${F('Luckiest Guy')} font-size="130" fill="${RED}" stroke="${INK}" stroke-width="7" paint-order="stroke">?!</text>`)}
 ${pop('@lanciarazzi',launcher(540,1410,0.72))}${pop('@gratis',tagAt(820,1230,300,'GRATIS!',60,'#7bd389'))}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`${pop('@Prima',hl(420,760,'DOVE SI TROVA?',80,YEL))}${pop('@ogni',hand(540,690,'ogni giorno un segreto di GTA 6',50,RED))}
 ${phoneCTA('@Prima','@seguici','@segreto')}${pop('@GTA',`<g transform="translate(840,820)" filter="url(#wob)" ${W}><path d="M0 40 C-70 -10 -60 -70 -20 -70 C0 -70 0 -50 0 -40 C0 -50 0 -70 20 -70 C60 -70 70 -10 0 40Z" fill="${RED}"/></g>`)}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`${pop('@Vai',hl(420,560,'VICE CITY',90,'#fff'))}
 <g data-off="@poligono"><g transform="translate(540,1180) scale(0.82) translate(-540,-1140)">${pop(0.1,island())}${pin(420,1410,'@Balsero')}</g>${pop('@Balsero',tagAt(300,1500,320,'BALSERO',56,YEL))}</g>
 <g data-pop="@poligono,0.5" ${C}><g filter="url(#wob)" ${W}><rect x="60" y="700" width="960" height="860" rx="30" fill="#cfe3b0"/><path d="M60 1080 L1020 1000" stroke="#d9c9a6" stroke-width="60" fill="none"/>
  <rect x="580" y="740" width="380" height="200" rx="10" fill="#e8b4b8"/><rect x="640" y="800" width="80" height="140" fill="#5b3a1e"/>${[0,1].map(k=>`<rect x="${760+k*90}" y="790" width="60" height="50" fill="#bfe6ff"/>`).join('')}</g>${target(840,1180,0.8)}${target(960,1300,0.5)}</g>
 ${pop('@Griffin',tagAt(770,940,420,'POLIGONO GRIFFIN',44,'#fff'))}
 <g data-fade="@sud,0.3" style="opacity:0"><g filter="url(#wob)"><path d="M600 1040 Q540 1080 480 1110" stroke="${RED}" stroke-width="16" fill="none" stroke-dasharray="30 22" stroke-linecap="round"/><path d="M450 1120 l50 -6 l-24 -40z" fill="${RED}" stroke="${INK}" stroke-width="5"/></g></g>
 ${pop('@sud',tagAt(330,760,300,'SUD-OVEST',50,YEL))}
 <g data-fade="@recinto,0.4" style="opacity:0"><path d="M110 1160 L520 1160 L520 1520 L110 1520 Z" stroke="${INK}" stroke-width="8" stroke-dasharray="22 12" fill="none"/></g>
 <g data-pop="@roulotte,0.5" ${C}><g filter="url(#wob)" ${W}><rect x="170" y="1270" width="300" height="140" rx="40" fill="#f4ecd8"/><circle cx="240" cy="1340" r="34" fill="#e5e7eb"/><line x1="330" y1="1300" x2="420" y2="1300"/><line x1="380" y1="1290" x2="380" y2="1380"/><circle cx="420" cy="1300" r="10" fill="${RED}"/></g></g>
 ${pin(320,1262,'@dentro',RED)}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`<g data-off="@botola">${pop('@pavimento',hl(420,760,'GUARDA IL PAVIMENTO',62,'#fff'))}</g>${pop('@botola',hl(420,560,'UNA BOTOLA',84,YEL))}
 <g filter="url(#wob)" ${W}><rect x="60" y="700" width="960" height="460" rx="20" fill="#efe1c6"/><rect x="120" y="760" width="220" height="150" rx="14" fill="#bfe6ff"/><line x1="230" y1="760" x2="230" y2="910"/>
  <rect x="60" y="1190" width="960" height="370" rx="20" fill="${DIRT}"/></g>
 <g data-fade="@apri,0.3" style="opacity:0"><g filter="url(#wob)" ${W}><rect x="480" y="1180" width="140" height="290" fill="#1b1b2f"/>${[0,1,2,3].map(k=>`<line x1="505" y1="${1225+k*65}" x2="595" y2="${1225+k*65}" stroke="#c9a46a"/>`).join('')}<line x1="505" y1="1190" x2="505" y2="1470" stroke="#c9a46a"/><line x1="595" y1="1190" x2="595" y2="1470" stroke="#c9a46a"/>
  <rect x="200" y="1440" width="680" height="110" rx="14" fill="#2b2d42"/></g><circle cx="700" cy="1495" r="22" fill="${YEL}" data-flash="@scendi,0.4,0.3"/></g>
 <g data-mv="0,0.01,0,0,0,0,@apri,0.7,0,0,170,0,@scendi,1.2,170,0,170,320">${guy(380,1160,0.85,'#3a86ff')}</g>
 <g filter="url(#wob)" ${W}><rect x="60" y="1150" width="420" height="44" fill="#c8915a"/><rect x="620" y="1150" width="400" height="44" fill="#c8915a"/>${[160,280,400,700,820,940].map(x=>`<line x1="${x}" y1="1150" x2="${x}" y2="1194" stroke-width="5"/>`).join('')}</g>
 <g style="transform-origin:480px 1150px" data-rot="@apri,0.6,0,-115"><g filter="url(#wob)" ${W}><rect x="480" y="1150" width="140" height="44" fill="#a8723f"/><rect x="580" y="1138" width="26" height="12" rx="4" fill="${GR}"/></g></g>
 <circle cx="550" cy="1172" r="40" fill="none" stroke="${YEL}" stroke-width="10" data-ripple="@botola,1.4"/>
 <g data-off="@apri"><g data-pop="@Nessun,0.4" ${C}><g transform="translate(800,900)" filter="url(#wob)" ${W}><rect x="-90" y="-120" width="180" height="240" rx="20" fill="#c7cdd4"/>${[0,1,2].map(r=>[0,1,2].map(c=>`<rect x="${-62+c*44}" y="${-90+r*60}" width="36" height="44" rx="6" fill="#fff" stroke-width="5"/>`).join('')).join('')}</g></g>
 <g data-pop="@codice,0.35" ${C}><path d="M680 760 L920 1040 M920 760 L680 1040" stroke="${RED}" stroke-width="26" stroke-linecap="round" filter="url(#wob)"/></g></g>
 ${pop('@scendi',tagAt(780,1290,320,'SCENDI!',56,RED,'#fff'))}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`${pop('@Nel',hl(420,620,'IL BOTTINO',90,YEL))}${pop('@Conspiracist',hand(540,640,'la Conspiracist Type 9',54,RED))}
 <g filter="url(#wob)" ${W}><rect x="60" y="700" width="960" height="860" rx="30" fill="#2b2d42"/></g>
 <g data-fade="@bunker,0.25" style="opacity:0"><g data-flash="@bunker,0.12,0.6"><path d="M540 760 L180 1540 L900 1540Z" fill="${YEL}" opacity=".22"/></g><g filter="url(#wob)" ${W}><rect x="90" y="1180" width="900" height="26" fill="#8a6a45"/><rect x="200" y="1400" width="680" height="40" rx="8" fill="#a8723f"/><line x1="240" y1="1440" x2="240" y2="1550"/><line x1="840" y1="1440" x2="840" y2="1550"/>
  ${[[130,1120],[200,1130],[880,1110],[950,1125]].map(([a,b])=>`<rect x="${a-26}" y="${b}" width="52" height="${1180-b}" rx="6" fill="#7bd389"/>`).join('')}</g></g>
 <line x1="540" y1="700" x2="540" y2="760" stroke="${INK}" stroke-width="6"/><circle cx="540" cy="780" r="26" fill="#555" stroke="${INK}" stroke-width="6"/><g data-fade="@bunker,0.1" style="opacity:0"><circle cx="540" cy="780" r="26" fill="${YEL}" stroke="${INK}" stroke-width="6"/></g>
 ${pop('@lanciarazzi',launcher(540,960,0.95))}${pop('@lanciarazzi',tagAt(820,840,200,'H-AT',50,YEL))}
 ${[0,1,2,3].map(k=>pop('@razzi',rocket(300+k*160,1140,0.7),0.3+k*0.15)).join('')}
 ${pop('@mitraglietta',smg(560,1320,0.9))}${pop('@unica',tagAt(250,1460,260,'UNICA',56,RED,'#fff'))}${pop('@Type',tagAt(830,1460,260,'TYPE 9',52,YEL))}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`${pop('@bello',hl(420,560,'IL BELLO?',96,'#fff'))}
 <g data-pop="@primo,0.5" ${C}><g data-idle="6,2,0" ${C}><g transform="translate(540,800)" filter="url(#wob)" ${W}><path d="M0 -150 L40 -60 L140 -60 L60 0 L90 100 L0 40 L-90 100 L-60 0 L-140 -60 L-40 -60Z" fill="${YEL}"/></g></g></g>
 ${pop('@capitolo',hl(960,640,'CAPITOLO 1',80,RED,'#fff'))}
 <g data-rise="@puoi,0.5,500">${guy(300,1520,0.9,'#3a86ff')}<g transform="translate(300,1255)">${launcher(0,0,0.5,-8)}</g></g>
 <g data-rise="@altri,0.5,500">${guy(800,1520,0.9,'#e8b4b8','sad')}</g>${pop('@pistola',pistol(880,1270,1.1))}
 ${pop('@puoi',tagAt(300,1580,180,'TU',50,YEL))}${pop('@altri',tagAt(800,1580,320,'GLI ALTRI',46,'#fff'))}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`<g data-off="@Made">${pop('@Conosci',hl(560,780,'UN ALTRO NASCONDIGLIO?',60,YEL))}
 <g data-pop="@Scrivilo,0.5" ${C}><g data-idle="8,2.2,0" ${C}><g transform="translate(540,1080)" filter="url(#wob)" ${W}><path d="M-300 -180 Q-300 -220 -260 -220 L260 -220 Q300 -220 300 -180 L300 120 Q300 160 260 160 L-60 160 L-160 260 L-140 160 L-260 160 Q-300 160 -300 120Z" fill="#fff"/>
  ${[0,1,2].map(k=>`<rect x="-230" y="${-150+k*80}" width="${[400,460,300][k]}" height="30" rx="15" fill="#e5e7eb" stroke="none" style="transform-box:fill-box;transform-origin:left" data-grow="@commenti,0.4"/>`).join('')}</g></g></g>
 ${pop('@commenti',hl(1330,700,'SCRIVILO NEI COMMENTI',60,RED,'#fff'))}</g>
 <g data-fade="@Made,0.3" style="opacity:0">${pop('@Made',`<rect x="390" y="700" width="300" height="300" fill="${INK}"/><text x="540" y="917" text-anchor="middle" ${F('Anton')} font-size="186" fill="#fff">MN<tspan fill="${RED}">.</tspan></text>`,0.5)}
 <g data-rise="@News,0.5"><text x="540" y="1170" text-anchor="middle" ${F('Inter Tight')} font-size="96" font-weight="900" fill="${INK}" letter-spacing="-4">madeinnews<tspan fill="${RED}">.</tspan></text></g>
 <g data-rise="@pillola,0.5">${hand(540,1280,'una pillola di sapere al giorno',62)}</g></g>`)}];
const still=process.argv[3]=='still';
fs.writeFileSync(process.argv[2],JSON.stringify({voiceId:"GOAZNavLupajyL3YafaD",title:["Bunker GTA 6"],logo:'plain',bg:'#f6efe2',light:true,accent:RED,pad:0,scenes:SCN.map((s,i)=>still?{voice:V[i],cam:s.cam,html:s.html.replace(/data-off="@[^"]*"/g,'data-off="2.5"').replace(/data-fade="@[^"]*,/g,'data-fade="2.6,').replace(/@[^,"'\s]+(?=[,"'])/g,'0.2'),dur:5,words:[]}:{voice:V[i],cam:s.cam,html:s.html})},null,1));console.log('ok');

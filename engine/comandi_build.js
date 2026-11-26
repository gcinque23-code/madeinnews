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
const pin=(x,y,t,c=RED)=>`<g data-drop="${t},0.6,-400"><g filter="url(#wob)" ${W}><path d="M${x} ${y} c-34 -44 -54 -64 -54 -94 a54 54 0 0 1 108 0 c0 30 -20 50 -54 94z" fill="${c}"/><circle cx="${x}" cy="${y-94}" r="20" fill="#fff"/></g></g><circle cx="${x}" cy="${y}" r="16" fill="none" stroke="${c}" stroke-width="6" data-ripple="${t},1.4"/>`;
const PSG='#2bb673',PSR='#e63946',PSB='#3a86ff',PSP='#ff6fb1';
const BTN={tri:[205,-95],cir:[265,-35],cro:[205,25],squ:[145,-35],l3:[-110,75],r3:[110,75]};
const controller=(x,y,s,hlt={})=>`<g transform="translate(${x},${y}) scale(${s})">
 <g filter="url(#wob)" ${W}>
 <path d="M-250 -150 Q-200 -175 -120 -165 L120 -165 Q200 -175 250 -150 Q330 -110 350 0 L385 170 Q395 250 330 262 Q285 268 255 225 L190 130 Q170 105 130 105 L-130 105 Q-170 105 -190 130 L-255 225 Q-285 268 -330 262 Q-395 250 -385 170 L-350 0 Q-330 -110 -250 -150Z" fill="#f4f5f7"/>
 <path d="M-120 -165 L120 -165 L105 -10 Q100 20 70 20 L-70 20 Q-100 20 -105 -10Z" fill="#2b2d42"/>
 <path d="M-130 105 L130 105 Q120 150 90 160 L-90 160 Q-120 150 -130 105Z" fill="#2b2d42"/>
 <path d="M-350 0 Q-330 -110 -250 -150 L-235 -140 Q-300 -100 -318 0 L-352 170 Q-360 230 -320 240 L-330 262 Q-395 250 -385 170Z" fill="#2b2d42" opacity=".9"/>
 <path d="M350 0 Q330 -110 250 -150 L235 -140 Q300 -100 318 0 L352 170 Q360 230 320 240 L330 262 Q395 250 385 170Z" fill="#2b2d42" opacity=".9"/>
 ${[[0,-1],[0,1],[-1,0],[1,0]].map(([dx,dy])=>`<path d="M${-205+dx*42-16} ${-35+dy*42-16} h32 v32 h-32z" transform="rotate(${dx?0:0})" fill="#d9dde3"/>`).join('')}
 ${['tri','cir','cro','squ'].map(k=>`<circle cx="${BTN[k][0]}" cy="${BTN[k][1]}" r="30" fill="#2b2d42"/>`).join('')}
 <circle cx="-110" cy="75" r="52" fill="#2b2d42"/><circle cx="110" cy="75" r="52" fill="#2b2d42"/><circle cx="-110" cy="75" r="32" fill="#4a4e57"/><circle cx="110" cy="75" r="32" fill="#4a4e57"/>
 <rect x="-150" y="-140" width="18" height="40" rx="8" fill="#d9dde3" stroke-width="5"/><rect x="132" y="-140" width="18" height="40" rx="8" fill="#d9dde3" stroke-width="5"/></g>
 <g stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M205 -112 l16 28 h-32z" stroke="${PSG}"/><circle cx="265" cy="-35" r="14" stroke="${PSR}"/><path d="M193 13 l24 24 M217 13 l-24 24" stroke="${PSB}"/><rect x="132" y="-48" width="26" height="26" stroke="${PSP}"/></g>
 ${Object.entries(hlt).map(([k,t])=>`<g data-fade="${t},0.2" style="opacity:0"><g data-flash="${t},0.35,0.35"><circle cx="${BTN[k][0]}" cy="${BTN[k][1]}" r="${k[1]=='3'?60:40}" fill="${YEL}" opacity=".8" stroke="${INK}" stroke-width="6"/></g></g><circle cx="${BTN[k][0]}" cy="${BTN[k][1]}" r="40" fill="none" stroke="${YEL}" stroke-width="10" data-ripple="${t},1.2"/>`).join('')}</g>`;
const badge=(x,y,n,t)=>pop(t,`<g transform="translate(${x},${y}) scale(0.85)" filter="url(#wob)" ${W}><circle r="62" fill="${RED}"/><text x="0" y="26" text-anchor="middle" ${F('Luckiest Guy')} font-size="80" fill="#fff" stroke="none">${n}</text></g>`);
const carTop=(x,y,col=RED)=>`<g transform="translate(${x},${y})" filter="url(#wob)" ${W}><rect x="-190" y="-85" width="380" height="170" rx="50" fill="${col}"/><rect x="40" y="-65" width="70" height="130" rx="18" fill="#bfe6ff"/><rect x="-130" y="-65" width="60" height="130" rx="18" fill="#bfe6ff"/><rect x="-70" y="-70" width="110" height="140" rx="20" fill="#c92f3b"/><circle cx="-30" cy="0" r="26" fill="#f3c9a0"/></g>`;
const pedTop=(x,y)=>`<g transform="translate(${x},${y})" filter="url(#wob)" ${W}><ellipse cx="0" cy="0" rx="58" ry="34" fill="#7bd389"/><circle cx="0" cy="0" r="28" fill="#6b3e26"/></g>`;
const bubble=(x,y,inner,fill='#fff')=>`<g transform="translate(${x},${y})" filter="url(#wob)" ${W}><path d="M-120 -80 Q-120 -100 -100 -100 L100 -100 Q120 -100 120 -80 L120 40 Q120 60 100 60 L0 60 L-40 110 L-40 60 L-100 60 Q-120 60 -120 40Z" fill="${fill}"/>${inner}</g>`;
const V=["Quattro comandi di GTA 6 che il gioco non ti spiega. L'ultimo divide tutti.",
"Primo: vicino a un muro, tieni premuto Cerchio. Il tuo personaggio si appoggia, come una persona vera.",
"Secondo: mentre guidi, premi Quadrato. Apri la portiera di colpo… addosso a chi passa.",
"Prima degli ultimi due: seguici, ogni giorno un segreto di GTA 6.",
"Terzo: la guida automatica. Imposti la destinazione, e Jason o Lucia guidano da soli. Ma sul comando esatto ognuno dice la sua: tu come fai?",
"Quarto, il più discusso: premi elle tre ed erre tre insieme. Il tempo rallenta e il gioco ti evidenzia ingressi e tracce. C'è chi giura che esiste, e chi non l'ha mai visto.",
"A te funziona? Scrivilo nei commenti. Made in News: una pillola di sapere al giorno."];
const SCN=[
{cam:"0,1.0,0,0",
 html:S(bg+`${pop(0.15,hl(420,760,'4 COMANDI SEGRETI',68,YEL))}${pop('@spiega',hand(540,640,'che il gioco non ti spiega',56,RED))}
 ${pop('@comandi',`<g data-wig="3,1.4">${controller(540,1050,1.05,{tri:'@gioco',cir:'@gioco',squ:'@spiega',cro:'@spiega'})}</g>`)}
 ${pop('@divide',tagAt(540,1420,640,"L'ULTIMO DIVIDE TUTTI",54,RED,'#fff'))}${pop('@tutti',`<text x="900" y="860" text-anchor="middle" ${F('Luckiest Guy')} font-size="140" fill="${YEL}" stroke="${INK}" stroke-width="7" paint-order="stroke">?!</text>`)}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`${badge(105,467,'1','@Primo')}${pop('@Primo',hl(420,640,'APPOGGIATI',90,'#fff'))}${pop('@vera',hand(540,640,'come una persona vera',56,RED))}${pop('@appoggia',tagAt(800,760,260,'RELAX',52,'#7bd389'))}
 <g filter="url(#wob)" ${W}><rect x="60" y="700" width="380" height="560" fill="#d98c6a"/>${[...Array(9)].map((_,r)=>[0,1,2,3].map(c=>`<rect x="${60+c*100-(r%2)*50}" y="${700+r*62}" width="96" height="58" fill="#c8735a" stroke-width="4"/>`).join('')).join('')}<rect x="440" y="700" width="20" height="560" fill="#f6efe2" stroke="none"/><line x1="60" y1="1260" x2="1020" y2="1260"/></g>
 <g data-mv="0,0.01,0,0,0,0,@muro,1.0,0,0,-260,0"><g style="transform-origin:760px 1260px" data-rot="@appoggia,0.5,0,-11">${guy(760,1260,0.9,'#3a86ff')}</g></g>
 ${controller(540,1440,0.55,{cir:'@Cerchio'})}${pop('@Cerchio',tagAt(870,1390,280,'CERCHIO',52,RED,'#fff'))}${pop('@premuto',tagAt(210,1390,280,'TIENI',52,YEL))}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`${badge(105,467,'2','@Secondo')}${pop('@Secondo',hl(420,700,'PORTIERA IN FACCIA',66,'#fff'))}
 <g filter="url(#wob)" ${W}><rect x="60" y="760" width="960" height="320" fill="#6b6f78"/><rect x="60" y="1080" width="960" height="180" fill="#d9d2c4"/></g>
 <g data-loop="-200,0,0.5">${[...Array(7)].map((_,k)=>`<rect x="${k*200}" y="910" width="110" height="18" rx="6" fill="#fff"/>`).join('')}</g>
 <g data-mv="0,0.01,-700,0,-700,0,@guidi,1.2,-700,0,0,0">${carTop(520,960)}<g style="transform-origin:600px 1045px" data-rot="@colpo,0.35,0,-70"><g filter="url(#wob)" ${W}><rect x="470" y="1030" width="130" height="30" rx="8" fill="#c92f3b"/></g></g></g>
 <g data-mv="0,0.01,0,0,0,0,@addosso,0.5,0,0,140,60"><g style="transform-origin:560px 1170px" data-rot="@addosso,0.5,0,120">${pedTop(560,1170)}</g></g>
 ${pop('@addosso',`<g transform="translate(720,1150)" filter="url(#wob)" ${W}><path d="M0 -90 L25 -30 L90 -40 L45 10 L80 70 L15 40 L-20 95 L-30 30 L-95 30 L-45 -15 L-80 -70 L-15 -40Z" fill="${YEL}"/><text x="0" y="18" text-anchor="middle" ${F('Luckiest Guy')} font-size="50" fill="${INK}" stroke="none">BAM</text></g>`)}
 ${pop('@Apri',tagAt(800,790,280,'APRI!',56,YEL))}${pop('@passa',`<g transform="translate(720,1240)">${[[-50,-20],[0,-50],[50,-20]].map(([a,b])=>`<path d="M${a} ${b-14} l5 10 l11 2 l-8 8 l2 11 l-10 -5 l-10 5 l2 -11 l-8 -8 l11 -2z" fill="${YEL}" stroke="${INK}" stroke-width="4"/>`).join('')}</g>`)}${controller(540,1440,0.55,{squ:'@Quadrato'})}${pop('@Quadrato',tagAt(870,1390,300,'QUADRATO',50,PSP,'#fff'))}${pop('@guidi',tagAt(210,1390,300,'IN AUTO',50,YEL))}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`${pop('@Prima',hl(420,840,'PRIMA DEGLI ULTIMI DUE…',56,YEL))}${pop('@ogni',hand(540,690,'ogni giorno un segreto di GTA 6',50,RED))}
 ${phoneCTA('@Prima','@seguici','@segreto')}${pop('@GTA',`<g transform="translate(840,820)" filter="url(#wob)" ${W}><path d="M0 40 C-70 -10 -60 -70 -20 -70 C0 -70 0 -50 0 -40 C0 -50 0 -70 20 -70 C60 -70 70 -10 0 40Z" fill="${RED}"/></g>`)}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`${badge(105,467,'3','@Terzo')}${pop('@guida',hl(420,700,'GUIDA AUTOMATICA',70,'#fff'))}${pop('@soli',hand(540,640,'mani libere!',58,RED))}
 <g data-off="@ognuno"><g filter="url(#wob)" ${W}><rect x="60" y="700" width="960" height="760" rx="30" fill="#e8f0e0"/><path d="M200 1380 L200 1100 Q200 1020 280 1020 L760 1020 Q840 1020 840 940 L840 800" stroke="#c7cdd4" stroke-width="60" fill="none"/></g>
  <g data-draw="@destinazione,1.0"><path d="M200 1380 L200 1100 Q200 1020 280 1020 L760 1020 Q840 1020 840 940 L840 800" stroke="#3a86ff" stroke-width="16" fill="none" stroke-linecap="round"/></g>
  ${pin(840,800,'@destinazione')}
  <g data-mv="0,0.01,0,0,0,0,@Jason,1.4,0,-280,0,-280,@Lucia,1.4,0,-280,640,-360"><g transform="translate(200,1380)" filter="url(#wob)" ${W}><rect x="-40" y="-60" width="80" height="120" rx="22" fill="${RED}"/><rect x="-28" y="-40" width="56" height="30" rx="8" fill="#bfe6ff"/></g></g>
  ${pop('@soli',`<g transform="translate(560,1250)">${guy(0,120,0.55,'#3a86ff')}<path d="M-50 -110 L-90 -190 M50 -110 L90 -190" stroke="${INK}" stroke-width="16" stroke-linecap="round"/></g>`)}</g>
 ${pop('@ognuno',bubble(300,900,`<text x="0" y="0" text-anchor="middle" ${F('Luckiest Guy')} font-size="90" fill="${INK}" stroke="none">?</text>`))}${pop('@dice',bubble(780,1000,`<text x="0" y="0" text-anchor="middle" ${F('Luckiest Guy')} font-size="90" fill="${INK}" stroke="none">??</text>`,YEL))}
 ${pop('@sua',bubble(420,1260,`<text x="0" y="0" text-anchor="middle" ${F('Luckiest Guy')} font-size="90" fill="${INK}" stroke="none">!?</text>`,'#bfe6ff'))}${pop('@tu',tagAt(540,1420,520,'TU COME FAI?',64,RED,'#fff'))}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`${badge(105,467,'4','@Quarto')}<g data-off="@giura">${pop('@discusso',hl(420,700,'IL PIÙ DISCUSSO',72,RED,'#fff'))}</g>${pop('@giura',hl(420,560,'ESISTE?',96,YEL))}
 <g data-off="@tempo">${pop('@premi',controller(540,1020,1.0,{l3:'@elle',r3:'@erre'}))}${pop('@elle',tagAt(330,1380,200,'L3',64,YEL))}${pop('@erre',tagAt(750,1380,200,'R3',64,YEL))}${pop('@insieme',`<text x="540" y="1440" text-anchor="middle" ${F('Luckiest Guy')} font-size="90" fill="${INK}">+</text>`)}</g>
 <g data-pop="@tempo,0.5" ${C}><g filter="url(#wob)" ${W}><rect x="60" y="700" width="960" height="600" rx="30" fill="#3d4a7a"/><rect x="560" y="820" width="380" height="420" fill="#8a8fa8"/><rect x="700" y="1060" width="100" height="180" fill="#5b3a1e"/></g>
  <g transform="translate(250,880)"><circle r="90" fill="#fff" stroke="${INK}" stroke-width="8"/><g data-spin="40"><line x1="0" y1="0" x2="0" y2="-70" stroke="${INK}" stroke-width="10" stroke-linecap="round"/></g><line x1="0" y1="0" x2="45" y2="0" stroke="${INK}" stroke-width="10" stroke-linecap="round"/></g></g>
 ${pop('@ingressi',`<rect x="690" y="1050" width="120" height="200" fill="none" stroke="${YEL}" stroke-width="14" data-flash="0,0.4,0.4" filter="url(#wob)"/>`)}
 ${pop('@tracce',[[180,1240],[250,1190],[320,1230],[390,1180],[460,1220]].map(([a,b],k)=>`<ellipse cx="${a}" cy="${b}" rx="18" ry="28" fill="${YEL}" stroke="${INK}" stroke-width="5" transform="rotate(70 ${a} ${b})"/>`).join(''))}
 ${pop('@rallenta',hand(540,640,'il tempo rallenta…',58,RED))}
 ${pop('@esiste',bubble(320,1430,`<path d="M-40 -20 L-10 10 L45 -50" stroke="${INK}" stroke-width="16" fill="none" stroke-linecap="round"/>`,'#7bd389'))}${pop('@mai',bubble(760,1430,`<path d="M-35 -55 L35 15 M35 -55 L-35 15" stroke="#fff" stroke-width="16" fill="none" stroke-linecap="round"/>`,RED))}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`<g data-off="@Made">${pop('@funziona',hl(560,620,'A TE FUNZIONA?',70,YEL))}
 <g data-pop="@Scrivilo,0.5" ${C}><g data-idle="8,2.2,0" ${C}><g transform="translate(540,1080)" filter="url(#wob)" ${W}><path d="M-300 -180 Q-300 -220 -260 -220 L260 -220 Q300 -220 300 -180 L300 120 Q300 160 260 160 L-60 160 L-160 260 L-140 160 L-260 160 Q-300 160 -300 120Z" fill="#fff"/>
  ${[0,1,2].map(k=>`<rect x="-230" y="${-150+k*80}" width="${[400,460,300][k]}" height="30" rx="15" fill="#e5e7eb" stroke="none" style="transform-box:fill-box;transform-origin:left" data-grow="@commenti,0.4"/>`).join('')}</g></g></g>
 ${pop('@commenti',hl(1330,700,'SCRIVILO NEI COMMENTI',60,RED,'#fff'))}</g>
 <g data-fade="@Made,0.3" style="opacity:0">${pop('@Made',`<rect x="390" y="700" width="300" height="300" fill="${INK}"/><text x="540" y="917" text-anchor="middle" ${F('Anton')} font-size="186" fill="#fff">MN<tspan fill="${RED}">.</tspan></text>`,0.5)}
 <g data-rise="@News,0.5"><text x="540" y="1170" text-anchor="middle" ${F('Inter Tight')} font-size="96" font-weight="900" fill="${INK}" letter-spacing="-4">madeinnews<tspan fill="${RED}">.</tspan></text></g>
 <g data-rise="@pillola,0.5">${hand(540,1280,'una pillola di sapere al giorno',62)}</g></g>`)}];
const still=process.argv[3]=='still';
fs.writeFileSync(process.argv[2],JSON.stringify({voiceId:"GOAZNavLupajyL3YafaD",title:["Comandi GTA 6"],logo:'plain',bg:'#f6efe2',light:true,accent:RED,pad:0,scenes:SCN.map((s,i)=>still?{voice:V[i],cam:s.cam,html:s.html.replace(/data-off="@[^"]*"/g,'data-off="2.5"').replace(/data-fade="@[^"]*,/g,'data-fade="2.6,').replace(/@[^,"'\s]+(?=[,"'])/g,'0.2'),dur:5,words:[]}:{voice:V[i],cam:s.cam,html:s.html})},null,1));console.log('ok');

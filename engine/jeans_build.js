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
const DEN='#3f6fb5',DEN2='#2f5592',STI='#f2b134',GOLD='#d9a521';
const jeans=(x,y,s,hl=false,t='0')=>`<g transform="translate(${x},${y}) scale(${s})"><g data-wig="1.6,2.2" style="transform-box:fill-box;transform-origin:50% 0%"><g filter="url(#wob)" ${W}>
 <path d="M-260 -300 L260 -300 L290 420 L60 420 L0 -40 L-60 420 L-290 420Z" fill="${DEN}"/>
 <rect x="-260" y="-340" width="520" height="60" fill="${DEN2}"/>${[-200,-90,90,200].map(a=>`<rect x="${a-10}" y="-345" width="20" height="70" fill="${DEN2}"/>`).join('')}
 <circle cx="0" cy="-310" r="16" fill="${GOLD}"/><path d="M0 -280 L0 -60" fill="none" stroke="${STI}" stroke-width="5" stroke-dasharray="12 8"/>
 <path d="M-250 -280 Q-150 -160 -60 -280" fill="none" stroke="${STI}" stroke-width="6" stroke-dasharray="12 8"/><path d="M250 -280 Q150 -160 60 -280" fill="none" stroke="${STI}" stroke-width="6" stroke-dasharray="12 8"/>
 <g ${hl?`data-sc="${t},0.01,1,1,${t},0.4,1,1.25"`:''} style="transform-box:fill-box;transform-origin:center"><rect x="120" y="-262" width="90" height="80" rx="6" fill="${hl?YEL:DEN2}" stroke-width="8"/><path d="M128 -254 L202 -254" stroke="${STI}" stroke-width="5" stroke-dasharray="10 7" fill="none"/></g>
 <circle cx="-250" cy="-270" r="10" fill="${GOLD}"/><circle cx="250" cy="-270" r="10" fill="${GOLD}"/></g></g></g>`;
const watch=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})"><g data-wig="9,2.6" style="transform-box:fill-box;transform-origin:50% 0%"><g filter="url(#wob)" ${W}><path d="M0 -330 Q-60 -260 0 -150" fill="none" stroke="${GOLD}" stroke-width="10"/>
 <circle cx="0" cy="-140" r="24" fill="${GOLD}"/><circle r="130" fill="${GOLD}"/><circle r="108" fill="#fffaf0"/>${[...Array(12)].map((_,k)=>`<line x1="0" y1="-92" x2="0" y2="-80" transform="rotate(${k*30})" stroke-width="7"/>`).join('')}
 <g data-spin="40"><line x1="0" y1="0" x2="0" y2="-70" stroke-width="8"/></g><line x1="0" y1="0" x2="45" y2="0" stroke-width="10"/><circle r="10" fill="${INK}"/></g></g></g>`;
const coin=(x,y,r)=>`<g data-flip="${3+(x%3)}" style="transform-box:fill-box;transform-origin:center"><g filter="url(#wob)"><circle cx="${x}" cy="${y}" r="${r}" fill="${GOLD}" stroke="${INK}" stroke-width="7"/><circle cx="${x}" cy="${y}" r="${r*0.7}" fill="none" stroke="#b8860b" stroke-width="5"/><text x="${x}" y="${y+r*0.35}" text-anchor="middle" ${F('Luckiest Guy')} font-size="${r}" fill="#b8860b">€</text></g></g>`;
const doc=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><rect x="-230" y="-300" width="460" height="600" rx="12" fill="#fffaf0"/>
 <text x="0" y="-210" text-anchor="middle" ${F('Luckiest Guy')} font-size="62" fill="${INK}" stroke="none">BREVETTO</text>${[...Array(6)].map((_,k)=>`<line x1="-170" y1="${-130+k*40}" x2="${130-(k%3)*40}" y2="${-130+k*40}" stroke="#d6c9a8" stroke-width="10"/>`).join('')}
 <circle cx="140" cy="200" r="64" fill="${RED}"/><circle cx="140" cy="200" r="44" fill="none" stroke="#fff" stroke-width="5"/></g>`;
const rivet=(x,y,t)=>`<g data-stamp="${t}" ${C}><circle cx="${x}" cy="${y}" r="36" fill="${GOLD}" stroke="${INK}" stroke-width="8"/><circle cx="${x-10}" cy="${y-10}" r="10" fill="#fff3c4"/></g>`;
const hat=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><path d="M-200 40 Q0 90 200 40 Q170 10 110 10 L90 -90 Q0 -130 -90 -90 L-110 10 Q-170 10 -200 40Z" fill="#a0612f"/><path d="M-100 -10 Q0 10 100 -10" fill="none" stroke="#5b3218" stroke-width="16"/></g>`;
const pick=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><rect x="-14" y="-40" width="28" height="300" rx="10" fill="#a0612f"/><path d="M-200 -40 Q0 -140 200 -40 Q0 -90 -200 -40Z" fill="#9aa3ad"/></g>`;
const wrench=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s}) rotate(35)" filter="url(#wob)" ${W}><rect x="-20" y="-60" width="40" height="260" rx="14" fill="#9aa3ad"/><path d="M-70 -90 a70 70 0 1 1 140 0 l-40 0 l0 -40 l-60 0 l0 40z" fill="#9aa3ad"/></g>`;
const wrist=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><path d="M-300 60 L200 60 Q260 60 260 0 Q260 -60 200 -60 L-300 -60Z" fill="#f3c9a0"/><rect x="-90" y="-80" width="70" height="160" rx="12" fill="${INK}"/><circle cx="-55" cy="0" r="68" fill="#d9dde3"/><circle cx="-55" cy="0" r="50" fill="#fff"/><line x1="-55" y1="0" x2="-55" y2="-34" stroke-width="7"/><line x1="-55" y1="0" x2="-28" y2="0" stroke-width="7"/></g>`;
const SCN=[
{voice:"Quel taschino minuscolo dei jeans non è fatto per le monete.",cam:"0,1.05,0,30|@taschino,1.0,0,0|@minuscolo,1.05,-30,40|@jeans,1.0,0,0|@monete,1.04,0,20",
 html:S(bg+`${pop('@taschino',title(420,'IL TASCHINO',130))}${pop('@monete',hl(600,700,'NON È PER LE MONETE',66))}
 <g data-drop="0.1,0.7,-700">${jeans(540,1150,0.85,true,'@minuscolo')}</g>
 <g data-draw="@minuscolo,0.5"><circle cx="680" cy="961" r="80" fill="none" stroke="${RED}" stroke-width="10"/></g>
 ${pop('@fatto',coin(920,1300,60))}${pop('@monete',`<path d="M840 1220 L1000 1380 M1000 1220 L840 1380" stroke="${RED}" stroke-width="16" stroke-linecap="round"/>`)}`)},
{voice:"È nato per un oggetto che oggi quasi nessuno porta più: l'orologio da taschino.",cam:"0,1.0,0,0|@oggetto,1.05,0,30|@nessuno,1.0,0,0|@l'orologio,1.05,0,30|@taschino,1.0,0,0",
 html:S(bg+`${pop('@nato',hl(420,600,'È NATO PER…',80))}
 <g data-off="@l'orologio">${pop('@oggetto',`<text x="540" y="1150" text-anchor="middle" ${F('Luckiest Guy')} font-size="400" fill="${INK}">?</text>`)}</g>
 <g data-off="@l'orologio">${pop('@nessuno',hand(540,1350,'oggi quasi nessuno lo porta',58))}</g>
 <g data-pop="@l'orologio,0.5" ${C}><g data-rot="@l'orologio,99,0,0">${watch(540,1080,1.4)}</g></g>
 ${pop('@taschino',hl(1450,720,"OROLOGIO DA TASCHINO",58,YEL))}`)},
{voice:"Siamo nel 1873, negli Stati Uniti. Levi Strauss e il sarto Jacob Davis brevettano i pantaloni da lavoro con i rivetti.",cam:"0,1.04,0,30|@1873,1.0,0,0|@Levi,1.03,20,20|@Jacob,1.03,-20,20|@brevettano,1.0,0,0|@rivetti,1.04,0,10",
 html:S(bg+`${pop('@1873',hl(420,420,'1873',100,RED,'#fff'))}${pop('@Stati',hand(540,660,'Stati Uniti',62))}
 ${pop('@Levi',tagAt(300,760,420,'LEVI STRAUSS',54,'#fff'))}${pop('@Jacob',tagAt(780,760,420,'JACOB DAVIS',54,'#fff'))}
 <g data-off="@brevettano">${pop('@1873',`<g transform="translate(540,1180)" filter="url(#wob)" ${W}><rect x="-220" y="-230" width="440" height="460" rx="30" fill="#fff"/><rect x="-220" y="-230" width="440" height="130" rx="30" fill="${RED}"/><rect x="-220" y="-140" width="440" height="40" fill="${RED}"/><text x="0" y="-140" text-anchor="middle" ${F('Luckiest Guy')} font-size="64" fill="#fff" stroke="none">MAGGIO</text><text x="0" y="120" text-anchor="middle" ${F('Luckiest Guy')} font-size="200" fill="${INK}" stroke="none">20</text><circle cx="-110" cy="-230" r="16" fill="#334155"/><circle cx="110" cy="-230" r="16" fill="#334155"/></g>`)}${pop('@Uniti',`<g transform="translate(540,1470)" filter="url(#wob)" ${W}><rect x="-130" y="-50" width="260" height="100" rx="14" fill="#fff"/></g><text x="540" y="1490" text-anchor="middle" ${F('Luckiest Guy')} font-size="56" fill="${INK}">USA</text>`)}</g><g data-drop="@brevettano,0.6,-700">${doc(540,1170,0.75)}${pop('@lavoro',`<text x="540" y="1150" text-anchor="middle" ${F('Gochi Hand')} font-size="40" fill="${INK}">pantaloni da lavoro</text>`)}</g>
 ${rivet(330,1515,'@rivetti')}${rivet(750,1515,'@rivetti')}${pop('@rivetti',tagAt(540,1475,300,'RIVETTI',54,YEL))}`)},
{voice:"Li indossano minatori, cowboy e operai. E l'orologio, a quei tempi, si teneva in tasca.",cam:"0,1.0,0,0|@minatori,1.04,40,20|@cowboy,1.04,0,20|@operai,1.04,-40,20|@l'orologio,1.0,0,0|@tasca,1.04,0,20",
 html:S(bg+`<g data-off="@l'orologio">${pop('@minatori',`${pick(270,1000,0.8)}${hand(270,1320,'minatori',58)}`)}${pop('@cowboy',`${hat(540,1060,0.9)}${hand(540,1320,'cowboy',58)}`)}${pop('@operai',`${wrench(810,1000,0.8)}${hand(810,1320,'operai',58)}`)}</g>
 ${pop('@indossano',hl(420,560,'CHI LI INDOSSA',72))}${pop('@tempi',hand(540,1380,'a quei tempi',60,RED))}
 ${pop("@l'orologio",`<g data-bob="14,3,0">${watch(540,1060,1.0)}</g>`)}${pop('@teneva',hl(1420,560,'IN TASCA',80,YEL))}`)},
{voice:"Così nasce un taschino piccolo, davanti a destra, per tenerlo al sicuro mentre si lavora.",cam:"0,1.0,0,0|@destra,1.05,-30,40|@sicuro,1.0,0,0",
 html:S(bg+`<g data-off="@tenerlo">${pop('@nasce',hl(420,680,'NASCE IL TASCHINO',70))}</g>
 ${jeans(540,1150,0.8,true,'@piccolo')}
 <g transform="translate(672,972)"><g data-pop="@tenerlo,0.45" ${C}>${watch(0,0,0.32)}</g></g>
 ${pop('@destra',tagAt(850,790,340,'DAVANTI DX',50,'#fff'))}${pop('@sicuro',hl(420,560,'AL SICURO',76,YEL))}`)},
{voice:"Quei primi jeans avevano solo quattro tasche: una dietro e tre davanti, compreso il taschino.",cam:"0,1.0,0,0|@quattro,1.04,0,20|@dietro,1.0,0,0|@compreso,1.05,-30,30|@taschino,1.0,0,0",
 html:S(bg+`${pop('@quattro',hl(420,560,'4 TASCHE',96,RED,'#fff'))}
 ${jeans(540,1130,0.8,true,'@taschino')}
 ${[['@una',300,620,'1 DIETRO'],['@tre',780,620,'3 DAVANTI']].map(([t,x,y,l])=>pop(t,tagAt(x,y,360,l,56,'#fff'))).join('')}
 ${[['@tre',404,1040],['@davanti',700,1090],['@compreso',672,1012]].map(([t,x,y],k)=>`<g data-pop="${t},0.3" ${C}><circle cx="${x}" cy="${y-60}" r="34" fill="${YEL}" stroke="${INK}" stroke-width="6"/><text x="${x}" y="${y-46}" text-anchor="middle" ${F('Luckiest Guy')} font-size="40" fill="${INK}">${k+1}</text></g>`).join('')}`)},
{voice:"Gli orologi sono finiti al polso, ma il taschino è rimasto. Oggi c'è chi lo chiama tasca per le monete.",cam:"0,1.0,0,0|@polso,1.04,-20,20|@rimasto,1.0,0,0|@chiama,1.04,0,20",
 html:S(bg+`<g data-off="@rimasto">${pop('@orologi',watch(300,1050,0.7))}${pop('@finiti',`<path d="M440 1050 L560 1050 M530 1020 L565 1050 L530 1080" stroke="${RED}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`)}${pop('@polso',wrist(820,1050,0.8))}${pop('@polso',hl(420,500,'AL POLSO',90))}</g>
 ${pop('@rimasto',`${jeans(540,1200,0.7,true,'@rimasto')}`)}${pop('@rimasto',hl(420,720,'IL TASCHINO È RIMASTO',62,YEL))}
 ${pop('@monete',`${coin(190,1150,56)}${coin(190,1290,56)}${coin(890,1150,56)}${coin(890,1290,56)}`)}${pop('@chiama',hand(540,900,'"tasca per le monete"',54,RED))}`)},
{voice:"Segui Made in News: una pillola di sapere al giorno.",cam:"0,1.1,0,0|1.5,1.0,0,0",
 html:S(bg+`${pop(0.3,`<rect x="390" y="700" width="300" height="300" fill="${INK}"/><text x="540" y="917" text-anchor="middle" ${F('Anton')} font-size="186" fill="#fff">MN<tspan fill="${RED}">.</tspan></text>`,0.5)}
 <g data-rise="0.8,0.5"><text x="540" y="1170" text-anchor="middle" ${F('Inter Tight')} font-size="96" font-weight="900" fill="${INK}" letter-spacing="-4">madeinnews<tspan fill="${RED}">.</tspan></text></g>
 <g data-rise="1.2,0.5">${hand(540,1280,'una pillola di sapere al giorno',62)}</g>`)}];
fs.writeFileSync(process.argv[2],JSON.stringify({voiceId:"GOAZNavLupajyL3YafaD",title:["Il taschino dei jeans"],logo:'plain',bg:'#f6efe2',light:true,accent:RED,pad:0,scenes:SCN},null,1));console.log('ok');

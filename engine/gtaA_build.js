const fs=require('fs');
const INK='#1b1b1f',RED='#e63946',YEL='#ffd23f';const F=f=>`style="font-family:'${f}'"`;
const S=i=>`<svg viewBox="0 0 1080 1920" width="1080" height="1920" style="position:absolute;inset:0;overflow:visible">${i}</svg>`;
const C='style="transform-box:fill-box;transform-origin:center"';
const defs=`<defs><filter id="wob" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="5"/></filter>
<filter id="paper"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="8"/><feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.38  0 0 0 0 0.28  0 0 0 0.07 0"/></filter></defs>`;
const bg=defs+`<rect width="1080" height="1920" fill="#f6efe2"/><rect width="1080" height="1920" filter="url(#paper)"/>`;
const pop=(t,inner,d=.45)=>`<g data-pop="${t},${d}" ${C}>${inner}</g>`;
const title=(y,t,size=110)=>`<g class="bx"><rect x="0" y="${y}" width="1080" height="${size*1.1}" fill="none"/><text x="540" y="${y+size}" text-anchor="middle" ${F('Luckiest Guy')} font-size="${size}" fill="${INK}">${t}</text></g>`;
const hl=(y,w,t,size=72,fill=YEL,col=INK)=>`<g filter="url(#wob)"><g class="bx"><rect x="${540-w/2}" y="${y}" width="${w}" height="${size*1.5}" rx="12" fill="${fill}"/><text x="540" y="${y+size*1.1}" text-anchor="middle" ${F('Luckiest Guy')} font-size="${size}" fill="${col}">${t}</text></g></g>`;
const tagAt=(cx,y,w,t,size,fill,col=INK)=>`<g filter="url(#wob)"><g class="bx"><rect x="${cx-w/2}" y="${y}" width="${w}" height="${size*1.5}" rx="12" fill="${fill}"/><text x="${cx}" y="${y+size*1.1}" text-anchor="middle" ${F('Luckiest Guy')} font-size="${size}" fill="${col}">${t}</text></g></g>`;
const hand=(x,y,t,size=56,col=INK)=>`<text x="${x}" y="${y}" text-anchor="middle" ${F('Gochi Hand')} font-size="${size}" fill="${col}">${t}</text>`;
const M=JSON.parse(fs.readFileSync(__dirname+'/assets/atlantico.json','utf8'));
const W='stroke="'+INK+'" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"';
const car=(x,y,s,col=RED,flip=false)=>`<g transform="translate(${x},${y}) scale(${flip?-s:s},${s})" filter="url(#wob)" ${W}>
 <ellipse cx="0" cy="78" rx="220" ry="14" fill="${INK}" opacity=".15" stroke="none"/>
 <path d="M-210 40 L-210 -2 Q-205 -38 -150 -44 L-110 -50 L-62 -96 Q-46 -106 -18 -106 L58 -106 Q84 -106 100 -92 L146 -50 L196 -42 Q216 -36 216 0 L216 40 Z" fill="${col}"/>
 <path d="M-94 -52 L-54 -90 L2 -90 L2 -52Z M14 -90 L56 -90 Q72 -90 84 -80 L116 -52 L14 -52Z" fill="#bfe6ff"/>
 <circle cx="-122" cy="48" r="44" fill="#3a3a44"/><circle cx="-122" cy="48" r="18" fill="#ddd"/><circle cx="132" cy="48" r="44" fill="#3a3a44"/><circle cx="132" cy="48" r="18" fill="#ddd"/>
 <rect x="198" y="-30" width="18" height="18" rx="4" fill="${YEL}"/><rect x="-210" y="-26" width="14" height="18" rx="4" fill="#ff8a8a"/></g>`;
const police=(x,y,s,t0)=>`<g transform="translate(${x},${y}) scale(${s})"><g filter="url(#wob)" ${W}>
 <path d="M-210 40 L-210 -2 Q-205 -38 -150 -44 L-110 -50 L-62 -96 Q-46 -106 -18 -106 L58 -106 Q84 -106 100 -92 L146 -50 L196 -42 Q216 -36 216 0 L216 40 Z" fill="#fff"/>
 <path d="M-210 10 L216 10 L216 40 L-210 40Z" fill="#2b2d42"/><path d="M-94 -52 L-54 -90 L2 -90 L2 -52Z M14 -90 L56 -90 Q72 -90 84 -80 L116 -52 L14 -52Z" fill="#bfe6ff"/>
 <circle cx="-122" cy="48" r="44" fill="#3a3a44"/><circle cx="-122" cy="48" r="18" fill="#ddd"/><circle cx="132" cy="48" r="44" fill="#3a3a44"/><circle cx="132" cy="48" r="18" fill="#ddd"/>
 <rect x="-40" y="-130" width="40" height="26" rx="8" fill="${RED}"/><rect x="2" y="-130" width="40" height="26" rx="8" fill="#3a86ff"/></g>
 <g data-flash="${t0},0.2,0"><circle cx="-20" cy="-118" r="44" fill="${RED}" opacity=".35"/></g><g data-flash="${t0+0.2},0.2,0"><circle cx="22" cy="-118" r="44" fill="#3a86ff" opacity=".35"/></g></g>`;
const road=(y)=>`<g filter="url(#wob)" ${W}><path d="M-20 ${y} L1100 ${y}" fill="none"/></g><g data-loop="-240,0,0.3">${[...Array(7)].map((_,k)=>`<rect x="${k*240}" y="${y+40}" width="120" height="12" rx="6" fill="${INK}" opacity=".35"/>`).join('')}</g>`;
const cuffs=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}>
 <path d="M-130 -70 a80 80 0 1 0 0.1 0z" fill="none" stroke-width="26" stroke="#9aa3ad"/><path d="M-130 -70 a80 80 0 1 0 0.1 0z" fill="none"/>
 <path d="M130 -70 a80 80 0 1 0 0.1 0z" fill="none" stroke-width="26" stroke="#9aa3ad"/><path d="M130 -70 a80 80 0 1 0 0.1 0z" fill="none"/>
 <rect x="-150" y="-100" width="40" height="40" rx="8" fill="#c7cdd4"/><rect x="110" y="-100" width="40" height="40" rx="8" fill="#c7cdd4"/>
 ${[-60,-20,20,60].map(cx=>`<ellipse cx="${cx}" cy="-80" rx="22" ry="13" fill="none" stroke-width="8"/>`).join('')}</g>`;
const book=(x,y,s,t1,t2)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><rect x="-170" y="-210" width="340" height="420" rx="16" fill="#9d2235"/><rect x="-170" y="-210" width="44" height="420" rx="12" fill="#6e1424"/><rect x="-100" y="-160" width="230" height="320" rx="8" fill="none" stroke="${YEL}" stroke-width="7"/>
 <text x="15" y="-60" text-anchor="middle" ${F('Luckiest Guy')} font-size="44" fill="${YEL}" stroke="none">${t1}</text><text x="15" y="-5" text-anchor="middle" ${F('Luckiest Guy')} font-size="44" fill="${YEL}" stroke="none">${t2}</text><text x="15" y="100" text-anchor="middle" ${F('Luckiest Guy')} font-size="80" fill="${YEL}" stroke="none">USA</text></g>`;
const palm=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><path d="M0 0 Q-16 -170 10 -340" fill="none" stroke="#8a5a2b" stroke-width="22"/>${[-150,-100,-50,0,50,100,150].map(a=>`<path d="M10 -340 q${Math.cos(a*Math.PI/180)*100} ${-30+Math.abs(a)*0.5} ${Math.cos(a*Math.PI/180)*190} ${50+Math.abs(a)*0.8}" fill="none" stroke="#3f8f4f" stroke-width="20"/>`).join('')}</g>`;
const crt=(inner,q)=>`<defs><clipPath id="cl${q}"><rect x="170" y="660" width="740" height="540" rx="30"/></clipPath></defs>
 <g filter="url(#wob)" ${W}><rect x="390" y="1330" width="300" height="80" fill="#cfc6b2"/><rect x="260" y="1400" width="560" height="44" rx="14" fill="#e6dfcf"/><rect x="100" y="590" width="880" height="760" rx="56" fill="#ebe4d3"/><rect x="150" y="640" width="780" height="580" rx="40" fill="#2b2b33"/></g>
 <g clip-path="url(#cl${q})"><rect x="170" y="660" width="740" height="540" fill="#1d2b22"/>${inner}</g><circle cx="880" cy="1290" r="14" fill="#7bd389" stroke="${INK}" stroke-width="5"/>`;
const city=()=>{let b='';for(const x of [170,410,650,890])for(const y of [660,850,1040])b+=`<rect x="${x+24}" y="${y+24}" width="190" height="140" rx="10" fill="#4a5a52"/>`;b+=[825,1015].map(y=>`<rect x="170" y="${y}" width="740" height="50" fill="#121a15"/>`).join('')+[380,620,860].map(x=>`<rect x="${x}" y="660" width="50" height="540" fill="#121a15"/>`).join('');return b};
const chase=(dur)=>`<g data-mv="0,${dur},160,1040,980,1040"><rect x="-26" y="-14" width="52" height="28" rx="8" fill="${RED}"/></g><g data-mv="0,${dur},0,1040,820,1040"><rect x="-26" y="-14" width="52" height="28" rx="8" fill="#fff"/><g data-flash="0,0.15,0.2"><rect x="-6" y="-12" width="12" height="10" fill="${RED}"/></g><g data-flash="0.15,0.15,0.2"><rect x="-6" y="2" width="12" height="10" fill="#3a86ff"/></g></g>`;
const box=(x,y,w,h,f,t,size,col,font='Luckiest Guy')=>`<g class="bx"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${f}" stroke="${INK}" stroke-width="6"/><text x="${x+w/2}" y="${y+h*0.72}" text-anchor="middle" ${F(font)} font-size="${size}" fill="${col}">${t}</text></g>`;
const SCN=[
{cam:"0,1.06,0,0|2.5,1.0,0,0|4.1,1.04,0,0",
 html:S(bg+`${pop(0.35,title(420,'GTA',200))}
 <g data-off="2.4">${pop(1.3,hl(660,760,'NON È UN NOME INVENTATO',58,'#fff'))}</g>${pop(2.5,hl(660,560,'È UN REATO',80,RED,'#fff'))}
 ${road(1330)}<g data-mv="0,0.8,-900,0,0,0">${car(700,1260,0.9)}</g><g data-mv="0,0.01,-1300,0,-1300,0,2.2,0.8,-900,0,0,0">${police(270,1260,0.8,2.4)}</g>
 ${pop(2.6,cuffs(540,980,0.9))}
 <g data-off="4.0">${pop(3.4,hand(540,1530,'lo trovi scritto…',58))}</g>${pop(4.1,book(540,1560,0.55,'CODICE','PENALE'))}`)},
{cam:"0,1.0,0,0|3.0,1.03,0,0|6.3,1.06,0,0",
 html:S(bg+`<g data-shake="6.3">
 <g filter="url(#wob)" ${W}><rect x="60" y="560" width="470" height="980" rx="14" fill="#fffaf0"/><rect x="550" y="560" width="470" height="980" rx="14" fill="#fffaf0"/></g>
 ${[...Array(7)].map((_,k)=>`<rect x="110" y="${1250+k*38}" width="${300+((k*37)%80)}" height="12" rx="6" fill="#e6dcc4" style="transform-box:fill-box;transform-origin:left" data-grow="${1.0+k*0.05},0.3"/>`).join('')}
 <rect x="95" y="680" width="400" height="120" fill="${YEL}" style="transform-box:fill-box;transform-origin:left" data-grow="5.1,0.4"/>
 <text x="295" y="780" text-anchor="middle" ${F('Luckiest Guy')} font-size="120" fill="${INK}" data-type="0.1,0.35" data-text="GRAND"></text>
 <text x="295" y="960" text-anchor="middle" ${F('Luckiest Guy')} font-size="120" fill="${INK}" data-type="0.5,0.3" data-text="THEFT"></text>
 <text x="295" y="1140" text-anchor="middle" ${F('Luckiest Guy')} font-size="120" fill="${INK}" data-type="0.7,0.3" data-text="AUTO"></text>
 ${pop(5.1,hand(785,760,'= grave',80,RED))}${pop(2.1,hand(785,940,'= furto',80,RED))}${pop(2.4,hand(785,1120,"= d'auto",80,RED))}
 ${pop(3.4,`<g filter="url(#wob)"><circle cx="785" cy="1360" r="120" fill="none" stroke="#3a86ff" stroke-width="12"/><circle cx="785" cy="1360" r="96" fill="none" stroke="#3a86ff" stroke-width="5"/></g><text x="785" y="1392" text-anchor="middle" ${F('Luckiest Guy')} font-size="86" fill="#3a86ff">USA</text>`)}
 </g>
 <g transform="translate(980,1590)"><g data-mv="0,0.01,700,0,700,0,5.5,0.4,700,0,0,0"><g data-rot="5.8,0.5,-60,0" style="transform-origin:0 0"><g filter="url(#wob)" ${W}><rect x="-460" y="-24" width="450" height="48" rx="20" fill="#8a5a2b"/><rect x="-620" y="-100" width="180" height="200" rx="30" fill="#5b3a1e"/><rect x="-620" y="-100" width="44" height="200" rx="16" fill="#8a5a2b"/><rect x="-484" y="-100" width="44" height="200" rx="16" fill="#8a5a2b"/></g></g></g></g>
 ${pop(6.3,hl(410,680,'PUNITO DI PIÙ',70,RED,'#fff'))}`)},
{cam:"0,1.0,0,0|2.1,1.04,0,0",
 html:S(bg+`<circle cx="540" cy="1080" r="260" fill="#ffd9a0" stroke="${INK}" stroke-width="8" filter="url(#wob)"/>
 ${palm(150,1360,0.9)}${palm(930,1360,0.9)}${road(1360)}
 <g data-drop="0.3,0.6,-250"><g filter="url(#wob)" ${W}><rect x="250" y="420" width="580" height="150" rx="20" fill="#2d8f4e"/><rect x="266" y="436" width="548" height="118" rx="14" fill="none" stroke="#fff" stroke-width="6"/></g><text x="540" y="518" text-anchor="middle" ${F('Luckiest Guy')} font-size="80" fill="#fff">CALIFORNIA</text></g>
 ${pop(1.1,hand(540,650,'per esempio…',58))}
 <g data-mv="0,0.01,-1300,0,-1300,0,1.8,0.7,-1300,0,0,0">${car(540,1300,1.05,'#7b5cd6')}</g>
 ${pop(2.9,hl(690,620,'GRAND THEFT',84,RED,'#fff'))}
 <g data-pop="3.5,0.4" ${C}><g filter="url(#wob)" ${W}><path d="M330 900 L700 900 L770 980 L700 1060 L330 1060Z" fill="#fff"/><circle cx="715" cy="980" r="14" fill="${INK}"/></g>
  <g data-off="4.0">${hand(520,1000,'$ 80.000',84)}</g><g data-win="4.0,0,0.5">${hand(520,1000,'$ 5.000',84)}</g><g data-win="4.5,0,9">${hand(520,1000,'$ 500',84)}</g></g>
 ${pop(4.5,tagAt(540,1500,620,'IL VALORE NON CONTA',56,YEL))}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`<rect width="1080" height="1920" fill="#cfe8f5"/>
 <g transform="translate(540,1150)"><g data-sc="0,0.01,1.1,1.1,2.0,1.2,1.1,3.1" style="transform-origin:0 0"><g data-mv="0,0.01,${-M.usa[0]},${-M.usa[1]},${-M.usa[0]},${-M.usa[1]},2.0,1.2,${-M.usa[0]},${-M.usa[1]},${-M.dundee[0]},${-M.dundee[1]}">
  ${Object.entries(M.paths).map(([n,d])=>`<path d="${d}" fill="${n=='United States of America'?'#ffd9a0':n=='United Kingdom'?'#a8e0b0':'#f3e7cf'}" stroke="${INK}" stroke-width="3" vector-effect="non-scaling-stroke"/>`).join('')}
  <path d="M${M.usa[0]} ${M.usa[1]} Q${(M.usa[0]+M.dundee[0])/2} ${M.dundee[1]-500} ${M.dundee[0]} ${M.dundee[1]}" stroke="${RED}" stroke-width="6" stroke-dasharray="14 10" fill="none" vector-effect="non-scaling-stroke" data-draw="1.9,1.2"/>
 </g></g></g>
 <g data-off="2.0">${pop(0.4,box(390,1210,300,120,'#fff','USA',88,INK))}${pop(1.2,`<path d="M370 1190 L710 1350 M710 1190 L370 1350" stroke="${RED}" stroke-width="22" stroke-linecap="round"/>`)}</g>
 ${pop(2.4,hl(430,560,'SCOZIA',96,'#a8e0b0'))}
 <g data-drop="3.1,0.7,-500"><g filter="url(#wob)" ${W}><path d="M540 1150 c-70 -90 -110 -130 -110 -190 a110 110 0 0 1 220 0 c0 60 -40 100 -110 190z" fill="${RED}"/><circle cx="540" cy="960" r="40" fill="#fff"/></g></g>
 ${pop(3.2,tagAt(820,930,300,'DUNDEE',60,'#fff'))}
 <g data-rise="3.7,0.6,500"><g filter="url(#wob)" ${W}><rect x="140" y="1360" width="800" height="360" rx="30" fill="#fff"/><rect x="190" y="1430" width="300" height="240" fill="#c8915a"/><path d="M170 1430 L340 1370 L510 1430Z" fill="#9d6b3f"/>${[0,1].map(r=>[0,1,2].map(c=>`<rect x="${215+c*90}" y="${1460+r*95}" width="60" height="60" fill="${YEL}"/>`).join('')).join('')}</g>
  ${pop(4.3,box(540,1420,360,100,YEL,'DMA DESIGN',56,INK))}${pop(5.6,box(570,1550,300,130,RED,'1995',96,'#fff'))}</g>`)},
{cam:"0,1.08,0,0|1.4,1.0,0,0|3.2,1.03,0,0",
 html:S(bg+`${pop(1.2,hl(420,640,'UN ALTRO NOME',76))}
 ${crt(`${city()}${chase(5.5)}<g data-pop="2.0,0.4" ${C}><rect x="190" y="840" width="700" height="170" fill="#000" opacity=".8"/><text x="540" y="965" text-anchor="middle" ${F('Luckiest Guy')} font-size="96" fill="${YEL}">RACE'N'CHASE</text></g>
  <g data-rise="3.2,0.4,60"><rect x="200" y="1060" width="320" height="110" rx="14" fill="#3a86ff"/><text x="360" y="1135" text-anchor="middle" ${F('Luckiest Guy')} font-size="58" fill="#fff">GUARDIA</text><rect x="560" y="1060" width="320" height="110" rx="14" fill="${RED}"/><text x="720" y="1135" text-anchor="middle" ${F('Luckiest Guy')} font-size="58" fill="#fff">LADRO</text></g>
  <g data-mv="0,0.01,0,0,0,0,4.8,0.25,0,0,360,0"><g data-fade="4.4,0.15" style="opacity:0"><rect x="188" y="1048" width="344" height="134" rx="18" fill="none" stroke="${YEL}" stroke-width="10"/></g></g>`,'a')}
 ${pop(4.4,`<g filter="url(#wob)" ${W}><circle cx="270" cy="1600" r="90" fill="#3a86ff"/><path d="M230 1570 L270 1545 L310 1570 L300 1630 L270 1655 L240 1630Z" fill="${YEL}"/></g>`)}
 ${pop(5.0,`<g filter="url(#wob)" ${W}><circle cx="810" cy="1600" r="90" fill="${RED}"/><rect x="760" y="1570" width="100" height="40" rx="18" fill="${INK}"/></g><circle cx="790" cy="1590" r="9" fill="#fff"/><circle cx="830" cy="1590" r="9" fill="#fff"/>`)}`)},
{cam:"0,1.0,0,0|1.8,1.05,0,20|3.4,1.0,0,0",
 html:S(bg+`${pop(0.5,hl(420,700,"PRIMA DELL'USCITA",68))}
 ${crt(`${city()}${chase(6)}<g data-off="2.2"><rect x="190" y="840" width="700" height="170" fill="#000" opacity=".8"/><text x="540" y="965" text-anchor="middle" ${F('Luckiest Guy')} font-size="96" fill="#9aa3a0">RACE'N'CHASE</text></g>
  <g data-draw="1.8,0.35"><path d="M210 925 L870 925" stroke="${RED}" stroke-width="14" stroke-linecap="round" fill="none"/></g>
  <g data-fade="2.15,0.1" style="opacity:0"><rect x="190" y="700" width="700" height="460" fill="#000" opacity=".85"/></g>
  ${pop(2.2,`<text x="540" y="840" text-anchor="middle" ${F('Luckiest Guy')} font-size="110" fill="#fff">GRAND</text>`,0.3)}${pop(2.4,`<text x="540" y="970" text-anchor="middle" ${F('Luckiest Guy')} font-size="110" fill="#fff">THEFT</text>`,0.3)}${pop(2.7,`<text x="540" y="1100" text-anchor="middle" ${F('Luckiest Guy')} font-size="110" fill="${YEL}">AUTO</text>`,0.3)}`,'b')}
 ${pop(3.9,hand(540,1530,'esce nel',60))}${pop(4.3,box(390,1560,300,130,RED,'1997',96,'#fff'))}`)},
{cam:"0,1.1,0,0|1.5,1.0,0,0",
 html:S(bg+`${pop(0.3,`<rect x="390" y="700" width="300" height="300" fill="${INK}"/><text x="540" y="917" text-anchor="middle" ${F('Anton')} font-size="186" fill="#fff">MN<tspan fill="${RED}">.</tspan></text>`,0.5)}
 <g data-rise="0.8,0.5"><text x="540" y="1170" text-anchor="middle" ${F('Inter Tight')} font-size="96" font-weight="900" fill="${INK}" letter-spacing="-4">madeinnews<tspan fill="${RED}">.</tspan></text></g>
 <g data-rise="1.2,0.5">${hand(540,1280,'una pillola di sapere al giorno',62)}</g>`)}];
const old=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
old.scenes.forEach((s,i)=>{s.html=SCN[i].html;s.cam=SCN[i].cam;});
Object.assign(old,{logo:'plain',bg:'#f6efe2',light:true,accent:RED});delete old.source;
fs.writeFileSync(process.argv[3],JSON.stringify(old));console.log('ok');

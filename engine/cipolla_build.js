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
const ONC='#e9b872',ONL='#c98a3e',ONIN='#f7efd9',PUR='#8e5aa8',GAS='#9ccf7a';
// cipolla intera
const onion=(x,y,s=1)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}>
 <ellipse cx="10" cy="200" rx="170" ry="22" fill="${INK}" opacity=".12" stroke="none"/>
 <path d="M0 -230 Q30 -170 120 -110 Q210 -40 200 60 Q190 170 0 190 Q-190 170 -200 60 Q-210 -40 -120 -110 Q-30 -170 0 -230Z" fill="${ONC}"/>
 <path d="M60 -150 Q170 -60 170 60 Q160 150 20 175 Q150 120 140 20 Q130 -80 60 -150Z" fill="${ONL}" opacity=".45" stroke="none"/>
 <path d="M0 -220 Q-60 -60 -40 180 M0 -220 Q60 -60 40 180 M0 -220 Q-140 -40 -120 160 M0 -220 Q140 -40 120 160" fill="none" stroke="${ONL}" stroke-width="6"/>
 <path d="M-120 -60 Q-140 0 -130 60" stroke="#fff" stroke-width="14" fill="none" opacity=".7"/>
 <path d="M-14 -228 Q0 -300 14 -228" fill="#7a8f3a"/><path d="M-40 188 q10 24 20 4 q10 24 20 0 q10 24 20 0 q10 24 20 -4" fill="none" stroke="#b8925a" stroke-width="6"/></g>`;
const half=(x,y,s=1)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}>
 <ellipse cx="10" cy="160" rx="200" ry="20" fill="${INK}" opacity=".12" stroke="none"/>
 <path d="M-210 0 Q-200 140 0 160 Q200 140 210 0Z" fill="${ONC}"/><path d="M-210 0 Q-200 140 0 160 Q200 140 210 0" fill="none" stroke="${ONL}" stroke-width="12"/>
 <ellipse cx="0" cy="0" rx="210" ry="150" fill="#fbf3dc"/>${[[175,'#f3e2b8'],[140,'#fbf3dc'],[104,'#f3e2b8'],[70,'#fbf3dc'],[38,'#efd9a6']].map(([r,c],i)=>`<ellipse cx="0" cy="${i*3}" rx="${r}" ry="${r*0.7}" fill="${c}" stroke="#d9bf86" stroke-width="5"/>`).join('')}
 <path d="M-150 -60 Q-110 -110 -40 -125" stroke="#fff" stroke-width="12" fill="none" opacity=".8"/></g>`;
const board=(x,y)=>`<g filter="url(#wob)" ${W}><rect x="${x-360}" y="${y}" width="720" height="70" rx="30" fill="#c8915a"/><circle cx="${x+300}" cy="${y+35}" r="14" fill="#f6efe2"/></g>`;
const knife=(x,y,r=0)=>`<g transform="translate(${x},${y}) rotate(${r})" filter="url(#wob)" ${W}><path d="M-20 -20 L320 -20 Q360 -20 360 20 L-20 20Z" fill="#e6e9ee"/><rect x="-200" y="-26" width="180" height="52" rx="18" fill="#3b2a20"/><path d="M40 -8 L300 -8" stroke="#fff" stroke-width="5"/></g>`;
const gasW=(x,y,k,t)=>`<g data-fade="${t},0.4" style="opacity:0"><g data-bob="18,2.2,${k}"><path d="M${x} ${y} q-30 -40 0 -80 q30 -40 0 -80 q-30 -40 0 -80" fill="none" stroke="${GAS}" stroke-width="16" stroke-linecap="round" opacity=".85"/></g></g>`;
const eye=(x,y,s=1,red=false)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><path d="M-260 0 Q0 -200 260 0 Q0 200 -260 0Z" fill="${red?'#ffe3e3':'#fff'}"/><circle r="92" fill="#5b8bd6"/><circle r="44" fill="${INK}"/><circle cx="-26" cy="-28" r="16" fill="#fff" stroke="none"/>${red?[-200,-150,150,200].map((x,i)=>`<path d="M${x} ${i%2?20:-20} l${x>0?-40:40} ${i%2?-10:10}" stroke="#e5484d" stroke-width="5" fill="none"/>`).join(''):''}<path d="M-230 -60 L-250 -110 M-120 -130 L-130 -185 M0 -150 L0 -210 M120 -130 L130 -185 M230 -60 L250 -110" fill="none"/></g>`;
const drop=(x,y,t,k)=>`<g data-fall="${t},0.9,-200"><path d="M${x} ${y-40} Q${x+28} ${y} ${x} ${y+20} Q${x-28} ${y} ${x} ${y-40}Z" fill="#8fd3ff" stroke="${INK}" stroke-width="6"/></g>`;
const cell=(x,y,mix)=>`<g transform="translate(${x},${y})"><g filter="url(#wob)" ${W}><ellipse rx="380" ry="300" fill="#f3f7e8"/></g>
 ${mix?'':`<g data-draw="@separati,0.5"><path d="M0 -290 L0 290" stroke="${INK}" stroke-width="10" stroke-dasharray="26 16" fill="none"/></g>`}
 ${[[-250,-90],[-180,40],[-280,120],[-120,-170],[-130,170],[-60,-40]].map(([a,b],k)=>`<g data-pop="${mix?'0.1':'@sostanze'},0.4" ${C}><g ${mix?`data-mv="@incontrano,1.0,0,0,${-a*0.55},${-b*0.3}"`:''}><circle cx="${a}" cy="${b}" r="30" fill="${YEL}" stroke="${INK}" stroke-width="6"/><text x="${a}" y="${b+11}" text-anchor="middle" ${F('Luckiest Guy')} font-size="30" fill="${INK}">S</text></g></g>`).join('')}
 ${[[220,-100],[150,40],[270,110],[110,-180],[120,170],[60,-30]].map(([a,b],k)=>`<g data-pop="${mix?'0.1':'@enzimi'},0.4" ${C}><g ${mix?`data-mv="@incontrano,1.0,0,0,${-a*0.55},${-b*0.3}"`:''}><path d="M${a} ${b} m-34 0 a34 34 0 1 0 68 0 l-34 0 l26 -22 a34 34 0 0 0 -60 22z" fill="${PUR}" stroke="${INK}" stroke-width="6"/></g></g>`).join('')}</g>`;
const SCN=[
{voice:"Quando tagli una cipolla e piangi, non è il succo che ti schizza negli occhi.",cam:"0,1.06,0,0|@succo,1.0,0,0",
 html:S(bg+`${pop('@cipolla',title(430,'LA CIPOLLA',130))}${pop('@succo',hl(610,640,'NON È IL SUCCO',80))}
 ${board(540,1440)}<g data-drop="0.1,0.6,-700"><g data-shake="@tagli">${half(540,1360,1.1)}</g></g>
 <g data-drop="@tagli,0.4,-500"><g data-saw="@tagli,26,12,2.5">${knife(560,1180,-12)}</g></g>
 ${[[420,1080],[660,1040],[540,980]].map(([x,y],k)=>`<g data-pop="@schizza,0.3" ${C}><path d="M${x} ${y-36} Q${x+24} ${y} ${x} ${y+18} Q${x-24} ${y} ${x} ${y-36}Z" fill="#f7e7b0" stroke="${INK}" stroke-width="6"/></g>`).join('')}
 ${pop('@succo',`<path d="M380 920 L700 1120 M700 920 L380 1120" stroke="${RED}" stroke-width="18" stroke-linecap="round"/>`)}`)},
{voice:"È un gas. E si forma solo nel momento in cui la tagli.",cam:"0,1.0,0,0|@tagli,1.05,0,0",
 html:S(bg+`${pop('@gas',hl(430,520,'È UN GAS',96))}${pop('@momento',hl(610,820,'SOLO QUANDO LA TAGLI',64,'#fff'))}
 ${board(540,1470)}${half(540,1390,1.1)}
 ${gasW(400,1280,0,'@gas')}${gasW(540,1240,1,'@gas')}${gasW(680,1280,2,'@gas')}${gasW(470,1200,3,'@forma')}${gasW(610,1200,4,'@forma')}
 <g data-drop="@tagli,0.35,-400"><g data-saw="@tagli,26,12,9">${knife(580,1300,-8)}</g></g>`)},
{voice:"Dentro la cipolla ci sono sostanze che contengono zolfo e, separati da loro, degli enzimi.",cam:"0,1.0,0,0|@enzimi,1.05,0,0",
 html:S(bg+`${pop('@Dentro',hl(430,700,'DENTRO LA CIPOLLA',72))}
 <g data-pop="0.2,0.5" ${C}>${cell(540,1100,false)}</g>
 ${pop('@zolfo',tagAt(330,1450,340,'ZOLFO',64,YEL))}${pop('@enzimi',tagAt(750,1450,340,'ENZIMI',64,PUR,'#fff'))}
 ${pop('@separati',hand(540,1600,'separati',60,RED))}`)},
{voice:"Il coltello rompe le cellule: sostanze ed enzimi si incontrano, e nasce un gas che sale verso il viso.",cam:"0,1.0,0,0|@gas,1.05,0,-40",
 html:S(bg+`${pop('@coltello',hl(430,600,'IL COLTELLO',84))}
 ${cell(540,1180,true)}
 <g data-off="@incontrano"><g data-drop="@coltello,0.4,-500">${knife(380,850,0)}</g></g>
 <g data-draw="@rompe,0.4"><path d="M540 880 L520 1000 L560 1100 L520 1200 L550 1300 L540 1480" stroke="${RED}" stroke-width="12" fill="none" stroke-linecap="round"/></g>
 <g data-off="@incontrano">${pop('@sostanze',hand(540,1580,'zolfo + enzimi',64,RED))}</g>${pop('@incontrano',tagAt(540,1520,560,'SI INCONTRANO',64,'#fff'))}
 ${gasW(470,1080,0,'@nasce')}${gasW(610,1080,1,'@nasce')}
 ${pop('@sale',`<path d="M540 800 L540 660 M500 700 L540 660 L580 700" stroke="${GAS}" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`)}
 ${pop('@viso',hand(790,760,'verso il viso',58,INK))}`)},
{voice:"Quando arriva agli occhi li irrita, e gli occhi producono lacrime per lavarlo via.",cam:"0,1.0,0,0|@lacrime,1.06,0,0",
 html:S(bg+`<g data-blink="2.2" style="transform-box:fill-box;transform-origin:center"><g data-off="@irrita">${eye(540,1000,1.2,false)}</g><g data-fade="@irrita,0.3" style="opacity:0">${eye(540,1000,1.2,true)}</g></g>
 ${gasW(300,1420,0,0.1)}${gasW(780,1420,1,0.1)}${gasW(540,1460,2,'@arriva')}
 ${pop('@irrita',hl(430,520,'IRRITA',96,RED,'#fff'))}
 ${[[430,1210,'@producono'],[650,1220,'@lacrime'],[400,1300,'@lacrime'],[680,1310,'@lavarlo']].map(([x,y,t],k)=>`<g data-pop="${t},0.35" ${C}><g data-loop="0,60,${1.2+k*0.2}"><path d="M${x} ${y-40} Q${x+28} ${y} ${x} ${y+20} Q${x-28} ${y} ${x} ${y-40}Z" fill="#8fd3ff" stroke="${INK}" stroke-width="6"/></g></g>`).join('')}
 ${pop('@lavarlo',hl(1500,760,'LACRIME PER LAVARLO',64))}`)},
{voice:"Nel 2002 alcuni ricercatori giapponesi hanno scoperto l'enzima che produce proprio questo gas.",cam:"0,1.0,0,0|@l'enzima,1.06,0,0",
 html:S(bg+`${pop('@2002',hl(430,420,'2002',100,RED,'#fff'))}${pop('@giapponesi',hand(540,690,'ricercatori giapponesi',62))}
 <g data-pop="@ricercatori,0.5" ${C}><g transform="translate(540,1130)" filter="url(#wob)" ${W}>
  <path d="M-70 -260 L70 -260 L70 -120 L220 200 Q230 240 190 240 L-190 240 Q-230 240 -220 200 L-70 -120Z" fill="#fff"/>
  <path d="M-150 80 L150 80 L210 210 Q215 225 195 225 L-195 225 Q-215 225 -210 210Z" fill="${GAS}" stroke="none"/><rect x="-90" y="-290" width="180" height="40" rx="12" fill="#e6e9ee"/>
  ${[[-60,150],[40,120],[100,180]].map(([a,b],k)=>`<g data-loop="0,-90,${1.1+k*0.3}"><circle cx="${a}" cy="${b}" r="16" fill="#fff" stroke="${INK}" stroke-width="5"/></g>`).join('')}</g></g>
 ${pop("@l'enzima",`<g transform="translate(540,1130)"><path d="M0 0 m-60 0 a60 60 0 1 0 120 0 l-60 0 l46 -38 a60 60 0 0 0 -106 38z" fill="${PUR}" stroke="${INK}" stroke-width="8" filter="url(#wob)"/></g>`)}
 <g data-draw="@scoperto,0.5"><circle cx="540" cy="1130" r="120" fill="none" stroke="${RED}" stroke-width="10"/></g>
 ${pop('@gas',hl(1470,640,"L'ENZIMA DEL GAS",66))}`)},
{voice:"Per piangere meno: cipolla fredda di frigo e coltello ben affilato, che rompe meno cellule.",cam:"0,1.0,0,0|@affilato,1.04,0,0",
 html:S(bg+`${pop('@piangere',hl(430,760,'PER PIANGERE MENO',72))}
 <g data-pop="@fredda,0.5" ${C}><g transform="translate(300,1080)" filter="url(#wob)" ${W}><rect x="-160" y="-260" width="320" height="520" rx="30" fill="#dff1ff"/><line x1="-160" y1="-60" x2="160" y2="-60"/><rect x="110" y="-200" width="16" height="90" rx="8" fill="${INK}"/><rect x="110" y="-10" width="16" height="90" rx="8" fill="${INK}"/></g>${onion(300,1160,0.42)}</g>
 ${pop('@frigo',tagAt(300,1400,300,'FREDDA',60,'#bde0fe'))}
 <g data-pop="@coltello,0.5" ${C}>${knife(700,1080,-40)}</g>
 ${pop('@affilato',`<path d="M860 920 l20 40 40 20 -40 20 -20 40 -20 -40 -40 -20 40 -20z" fill="${YEL}" stroke="${INK}" stroke-width="6"/>`)}
 ${pop('@affilato',tagAt(780,1400,320,'AFFILATO',60,YEL))}
 ${pop('@rompe',hl(1530,700,'MENO CELLULE ROTTE',62,'#fff'))}<g data-draw="@cellule,0.5"><path d="M220 1645 q320 22 640 0" stroke="${RED}" stroke-width="10" fill="none" stroke-linecap="round"/></g>`)},
{voice:"Segui Made in News: una pillola di sapere al giorno.",cam:"0,1.1,0,0|1.5,1.0,0,0",
 html:S(bg+`${pop(0.3,`<rect x="390" y="700" width="300" height="300" fill="${INK}"/><text x="540" y="917" text-anchor="middle" ${F('Anton')} font-size="186" fill="#fff">MN<tspan fill="${RED}">.</tspan></text>`,0.5)}
 <g data-rise="0.8,0.5"><text x="540" y="1170" text-anchor="middle" ${F('Inter Tight')} font-size="96" font-weight="900" fill="${INK}" letter-spacing="-4">madeinnews<tspan fill="${RED}">.</tspan></text></g>
 <g data-rise="1.2,0.5">${hand(540,1280,'una pillola di sapere al giorno',62)}</g>`)}];
const still=process.argv[3]=='still';
fs.writeFileSync(process.argv[2],JSON.stringify({voiceId:"GOAZNavLupajyL3YafaD",title:["Perché le cipolle fanno piangere?"],logo:'plain',bg:'#f6efe2',light:true,accent:RED,pad:0,scenes:SCN.map(s=>still?{...s,dur:5,words:[]}:s)},null,1));console.log('ok');

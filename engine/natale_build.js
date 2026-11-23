const fs=require('fs');
const S=i=>`<svg viewBox="0 0 1080 1920" width="1080" height="1920" style="position:absolute;inset:0;overflow:visible">${i}</svg>`;
const C='style="transform-box:fill-box;transform-origin:center"';
const lg=(id,st)=>`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${st.map(([o,c])=>`<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
const sky=(id,st)=>`<defs>${lg(id,st)}</defs><rect width="1080" height="1920" fill="url(#${id})"/>`;
const rnd=k=>{const x=Math.sin(k*999.7)*43758.5;return x-Math.floor(x)};
const T=(x,y,s,c,t,ex='')=>`<text x="${x}" y="${y}" text-anchor="middle" class="anton" font-size="${s}" fill="${c}" ${ex}>${t}</text>`;
const B=(x,y,s,c,t,ex='')=>`<text x="${x}" y="${y}" text-anchor="middle" font-family="Inter Tight" font-weight="900" font-size="${s}" fill="${c}" ${ex}>${t}</text>`;
const pop=(t,inner,d=0.45)=>`<g data-pop="${t},${d}" ${C}>${inner}</g>`;
const stamp=(t,inner)=>`<g data-stamp="${t}" ${C}>${inner}</g>`;
const off=(t,inner)=>`<g data-off="${t}">${inner}</g>`;
const at=(x,y,inner)=>`<g transform="translate(${x},${y})">${inner}</g>`;
const box=(y,w,h,fill,inner)=>`<g class="bx"><rect x="${540-w/2}" y="${y}" width="${w}" height="${h}" rx="24" fill="${fill}"/>${inner}</g>`;
const snowLayer=(n,seed,per,rmax)=>{const f=[...Array(n)].map((_,k)=>`<circle cx="${rnd(k+seed)*1080}" cy="${rnd(k+seed+300)*1920}" r="${2+rnd(k+seed+600)*rmax}" fill="#fff" opacity="${.5+rnd(k+seed+9)*.5}"/>`).join('');return `<g data-loop="0,1920,${per}">${f}<g transform="translate(0,-1920)">${f}</g></g>`};
const snow=()=>snowLayer(45,1,9,4)+snowLayer(30,77,6,7);
const stars=(n,h)=>[...Array(n)].map((_,k)=>`<circle cx="${rnd(k+1)*1080}" cy="${rnd(k+50)*h}" r="${1+rnd(k+90)*2.5}" fill="#fff" opacity="${.3+rnd(k+7)*.6}"/>`).join('');
const house=(x,y,w,h,wall,roof)=>`<g transform="translate(${x},${y})"><rect x="${-w/2}" y="${-h}" width="${w}" height="${h}" fill="${wall}"/><path d="M${-w/2-20} ${-h} L0 ${-h-w*0.45} L${w/2+20} ${-h}Z" fill="${roof}"/><path d="M${-w/2-20} ${-h} L0 ${-h-w*0.45} L${w/2+20} ${-h} L${w/2+8} ${-h+14} L0 ${-h-w*0.45+16} L${-w/2-8} ${-h+14}Z" fill="#fff"/><rect x="${-w/4-18}" y="${-h+40}" width="36" height="44" fill="#fde68a" data-flash="${rnd(x)*2},${2+rnd(y)},0.55"/><rect x="${w/4-18}" y="${-h+40}" width="36" height="44" fill="#fde68a"/><rect x="-20" y="-70" width="40" height="70" fill="#5b2a0e"/></g>`;
const village=(y)=>`<path d="M0 ${y-40} Q270 ${y-90} 540 ${y-50} T1080 ${y-60} L1080 1920 L0 1920Z" fill="#dfe8f7"/>`+house(170,y-20,190,170,'#7f1d1d','#3f1d0b')+house(910,y-20,190,170,'#1e3a8a','#3f1d0b')+house(380,y+10,150,140,'#166534','#3f1d0b')+house(700,y+10,150,140,'#92400e','#3f1d0b');
const tree=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})"><rect x="-20" y="0" width="40" height="60" fill="#5b2a0e"/><path d="M0 -360 L140 -160 L75 -160 L190 0 L-190 0 L-75 -160 L-140 -160Z" fill="#15803d"/>${[[-60,-60,'#ef4444'],[60,-90,'#fde047'],[-30,-200,'#3b82f6'],[40,-230,'#ef4444'],[0,-120,'#fde047']].map(([a,b,c],k)=>`<circle cx="${a}" cy="${b}" r="14" fill="${c}" data-flash="${k*0.2},0.6,0.4"/>`).join('')}<path d="M0 -420 l16 36 40 4 -30 26 9 40 -35 -22 -35 22 9 -40 -30 -26 40 -4z" fill="#fde047"/></g>`;
const book=(open)=>`<rect x="-360" y="-250" width="720" height="500" rx="22" fill="#7f1d1d"/><rect x="-340" y="-232" width="335" height="464" rx="10" fill="#fbf4e2"/><rect x="5" y="-232" width="335" height="464" rx="10" fill="#fbf4e2"/><rect x="-14" y="-232" width="28" height="464" fill="#000" opacity=".12"/>${[...Array(8)].map((_,k)=>`<rect x="-300" y="${-180+k*48}" width="${240+rnd(k)*30}" height="14" rx="7" fill="#d9cba6" style="transform-box:fill-box;transform-origin:left" data-grow="${open+k*0.05},0.3"/><rect x="45" y="${-180+k*48}" width="${240+rnd(k+9)*30}" height="14" rx="7" fill="#d9cba6" style="transform-box:fill-box;transform-origin:left" data-grow="${open+0.4+k*0.05},0.3"/>`).join('')}`;
const cal=(w,h,head,hcol,inner)=>`<rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="26" fill="#fff"/><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h*0.27}" rx="26" fill="${hcol}"/><rect x="${-w/2}" y="${-h/2+h*0.2}" width="${w}" height="${h*0.07}" fill="${hcol}"/><g class="bx"><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h*0.27}" fill="none"/>${B(0,-h/2+h*0.19,h*0.12,'#fff',head)}</g><circle cx="${-w/4}" cy="${-h/2}" r="14" fill="#334155"/><circle cx="${w/4}" cy="${-h/2}" r="14" fill="#334155"/><g class="bx"><rect x="${-w/2}" y="${-h/2+h*0.27}" width="${w}" height="${h*0.73}" fill="none"/>${inner}</g>`;
const NIGHT=[[0,'#0b1026'],[.6,'#1e2a5a'],[1,'#3b4a8a']];
const scenes=[
{voice:"Nella Bibbia non c'è scritto da nessuna parte che Gesù è nato il 25 dicembre.",
 cam:"0,1.1,0,0|@scritto,1.0,0,0|@25,1.06,0,0",
 html:S(`${sky('n0',NIGHT)}${stars(60,1100)}<circle cx="540" cy="470" r="0"/>${village(1560)}${tree(540,1725,0.6)}${snow()}
 <g data-pop="0.2,0.6" ${C}>${at(540,1080,book(0.5))}</g>
 ${stamp('@25',box(560,700,180,'#dc2626',T(540,690,130,'#fff','25 DICEMBRE')))}
 ${pop('@scritto',at(540,1080,`<circle r="120" fill="#dc2626"/><path d="M-55 -55 L55 55 M55 -55 L-55 55" stroke="#fff" stroke-width="26" stroke-linecap="round"/>`))}`)},
{voice:"I Vangeli non dicono né il giorno, né il mese. E intorno all'anno 200, i cristiani proponevano ancora date diverse.",
 cam:"0,1.0,0,0|@all'anno,1.06,0,0",
 html:S(`${sky('n1',[[0,'#1e2a5a'],[1,'#0b1026']])}${snow()}
 ${off("@all'anno",`${at(540,980,book(0.1))}${pop('@giorno',at(330,1340,`<rect x="-180" y="-60" width="360" height="120" rx="20" fill="#fff"/>${B(0,22,60,'#1e2a5a','GIORNO ?')}`))}${pop('@mese',at(750,1340,`<rect x="-180" y="-60" width="360" height="120" rx="20" fill="#fff"/>${B(0,22,60,'#1e2a5a','MESE ?')}`))}`)}
 ${pop("@all'anno",box(480,560,170,'#dc2626',T(540,600,120,'#fff','ANNO 200')))}
 ${[[270,'@cristiani'],[540,'@proponevano'],[810,'@ancora']].map(([x,t])=>`<g data-pop="${t},0.45" ${C}><g data-bob="10,3,${x}">${at(x,1050,cal(220,260,'?','#dc2626',T(0,95,130,'#1e2a5a','?')))}</g></g>`).join('')}`)},
{voice:"Il 25 dicembre compare per la prima volta in un calendario romano del 354. E a Roma la festa si celebrava già dal 336.",
 cam:"0,1.1,0,0|@compare,1.0,0,0|@336,1.06,0,0",
 html:S(`${sky('n2',[[0,'#3b1d0b'],[1,'#1c0f06']])}${snow()}
 <g data-pop="0.15,0.5" ${C}>${at(540,1060,`<rect x="-380" y="-330" width="760" height="660" rx="10" fill="#f3e3bf"/><rect x="-420" y="-360" width="840" height="56" rx="28" fill="#a16207"/><rect x="-420" y="304" width="840" height="56" rx="28" fill="#a16207"/>${B(0,-220,52,'#7c2d12','CALENDARIO ROMANO')}${[...Array(5)].map((_,k)=>`<rect x="-300" y="${-170+k*44}" width="600" height="12" rx="6" fill="#d8c08f"/>`).join('')}<g data-pop="@25,0.45" ${C}><g class="bx"><rect x="-320" y="60" width="640" height="130" rx="16" fill="#dc2626"/>${T(0,158,100,'#fff','25 DICEMBRE')}</g></g>`)}</g>
 ${off('@354',pop('@prima',box(450,560,160,'#fff',T(540,570,110,'#3b1d0b','PRIMA VOLTA'))))}${pop('@354',box(450,420,160,'#fde047',T(540,570,120,'#3b1d0b','354')))}
 ${off('@336',pop('@festa',box(1470,420,170,'#fde047',T(540,1600,120,'#3b1d0b','ROMA'))))}${stamp('@336',box(1470,620,170,'#dc2626',T(540,1600,120,'#fff','ROMA · 336')))}`)},
{voice:"Ma perché proprio quel giorno? Gli storici hanno due ipotesi.",
 cam:"0,1.0,0,0|@due,1.08,0,0",
 html:S(`${sky('n3',NIGHT)}${stars(80,1920)}${snow()}
 ${off('@due',`${pop(0.1,at(540,1040,cal(380,420,'DICEMBRE','#dc2626',T(0,140,220,'#1e293b','25'))))}${pop('@perché',T(190,1130,300,'#fde047','?'))}${pop('@giorno',T(890,1130,300,'#fde047','?'))}${pop('@storici',box(1340,520,140,'#fff',B(540,1430,72,'#1e2a5a','STORICI')))}`)}
 ${pop('@due',at(320,1060,`<g class="bx"><circle r="190" fill="#dc2626"/>${T(0,70,220,'#fff','1')}</g>`))}${pop('@ipotesi',at(760,1060,`<g class="bx"><circle r="190" fill="#15803d"/>${T(0,70,220,'#fff','2')}</g>`))}
 ${pop('@ipotesi',box(1340,620,150,'#fff',B(540,1440,72,'#1e2a5a','DUE IPOTESI')))}`)},
{voice:"La prima: a Roma il 25 dicembre era la festa del Sole Invitto, nel giorno del solstizio d'inverno del calendario romano.",
 cam:"0,1.0,0,0|@sole,1.08,0,-40|@solstizio,1.0,0,0",
 html:S(`${sky('n4',[[0,'#1e1b4b'],[.5,'#9d174d'],[1,'#f59e0b']])}
 <g data-mv="0,0.01,0,520,0,520,0.2,2.6,0,520,0,60,@sole,1.0,0,60,0,0">${at(540,1150,`<g data-spin="12">${[...Array(16)].map((_,k)=>`<rect x="-14" y="-560" width="28" height="200" rx="14" fill="#fde68a" opacity=".5" transform="rotate(${k*22.5})"/>`).join('')}</g><circle r="260" fill="#fde047"/><circle r="210" fill="#fbbf24"/>`)}</g>
 <path d="M0 1380 L1080 1380 L1080 1920 L0 1920Z" fill="#3b0d2e"/>
 ${at(540,1380,`<path d="M-330 0 L-330 -260 Q0 -330 330 -260 L330 0Z" fill="#2a0a22"/>${[0,1,2].map(r=>[-4,-3,-2,-1,0,1,2,3].map(c=>`<path d="M${c*76+8} ${-30-r*80} l0 -40 a30 30 0 0 1 60 0 l0 40z" fill="#9d174d"/>`).join('')).join('')}`)}
 ${off('@Roma',pop(0.1,box(460,520,140,'#dc2626',T(540,563,100,'#fff','IPOTESI 1'))))}${pop('@Roma',box(460,360,140,'#fff',T(540,563,100,'#3b0d2e','ROMA')))}
 ${off('@Sole',pop('@25',box(640,640,150,'#fff',T(540,750,104,'#3b0d2e','25 DICEMBRE'))))}${off('@solstizio',pop('@Sole',box(640,640,150,'#dc2626',T(540,750,104,'#fff','SOLE INVITTO'))))}
 ${pop('@solstizio',box(640,760,150,'#1e3a8a',B(540,738,62,'#fff',"SOLSTIZIO D'INVERNO")))}
 ${pop('@calendario',box(1520,700,140,'#fde047',B(540,1610,64,'#3b0d2e','CALENDARIO ROMANO')))}${snowLayer(25,5,9,3)}`)},
{voice:"La seconda è un calcolo: si credeva che Gesù fosse stato concepito il 25 marzo. Nove mesi dopo: 25 dicembre.",
 cam:"0,1.0,0,0|@nove,1.06,0,0",
 html:S(`${sky('n5',[[0,'#14532d'],[1,'#052e16']])}${snow()}
 ${off('@calcolo',pop(0.1,box(440,520,140,'#15803d',T(540,545,96,'#fff','IPOTESI 2'))))}${pop('@calcolo',box(440,520,140,'#fde047',T(540,545,96,'#14532d','CALCOLO')))}
 <g data-pop="@credeva,0.5" ${C}>${at(540,1090,cal(560,620,'','#dc2626',T(0,190,300,'#1e293b','25')))}
  <g data-off="@nove"><g class="bx"><rect x="260" y="780" width="560" height="167" fill="none"/>${B(540,925,78,'#fff','MARZO')}</g></g>
  ${['APRILE','MAGGIO','GIUGNO','LUGLIO','AGOSTO','SETTEMBRE','OTTOBRE','NOVEMBRE'].map((m,k)=>`<g data-win="@nove,${(k*0.12).toFixed(2)},0.12"><g class="bx"><rect x="260" y="780" width="560" height="167" fill="none"/>${B(540,925,78,'#fff',m)}</g></g>`).join('')}
  <g data-win="@nove,0.96,99"><g class="bx"><rect x="260" y="780" width="560" height="167" fill="none"/>${B(540,925,78,'#fff','DICEMBRE')}</g></g></g>
 ${off('@nove',pop('@concepito',box(1500,600,150,'#fde047',T(540,1610,100,'#14532d','CONCEPITO'))))}${pop('@nove',box(1500,520,150,'#fff',T(540,1610,110,'#14532d','+9 MESI')))}`)},
{voice:"E ancora oggi alcune Chiese ortodosse, che seguono il calendario giuliano, festeggiano il Natale il 7 gennaio.",
 cam:"0,1.0,0,0|@7,1.08,0,0",
 html:S(`${sky('n6',NIGHT)}${stars(60,1000)}
 <path d="M0 1500 Q540 1430 1080 1500 L1080 1920 L0 1920Z" fill="#dfe8f7"/>
 ${at(540,1500,`<g transform="scale(.72)"><rect x="-200" y="-330" width="400" height="330" fill="#f1f5f9"/><rect x="-60" y="-120" width="120" height="120" rx="60" fill="#78350f"/>${[-120,0,120].map(x=>`<rect x="${x-24}" y="-260" width="48" height="80" rx="24" fill="#fde68a"/>`).join('')}
  <path d="M-130 -330 Q-130 -470 0 -560 Q130 -470 130 -330Z" fill="#2563eb"/><rect x="-6" y="-660" width="12" height="110" fill="#fbbf24"/><rect x="-36" y="-630" width="72" height="12" fill="#fbbf24"/>
  ${[-300,300].map(x=>`<rect x="${x-70}" y="-230" width="140" height="230" fill="#e2e8f0"/><path d="M${x-80} -230 Q${x-80} -330 ${x} -390 Q${x+80} -330 ${x+80} -230Z" fill="#1d4ed8"/><rect x="${x-4}" y="-460" width="8" height="80" fill="#fbbf24"/>`).join('')}</g>`)}
 ${pop('@ortodosse',box(450,820,150,'#2563eb',T(540,562,96,'#fff','CHIESE ORTODOSSE')))}
 ${pop('@giuliano',box(620,700,120,'#fff',B(540,700,58,'#1e2a5a','CALENDARIO GIULIANO')))}
 <g data-pop="@7,0.5" ${C}>${at(540,900,`<g data-bob="6,3,0">${cal(260,260,'GENNAIO','#dc2626',T(0,95,150,'#1e293b','7'))}</g>`)}</g>
 ${snow()}`)},
{voice:"Segui Made in News: una pillola di sapere al giorno.",
 cam:"0,1.1,0,0|1.5,1.0,0,0",
 html:S(`${sky('n7',NIGHT)}${stars(60,1200)}${snow()}
 ${pop(0.3,`<rect x="390" y="700" width="300" height="300" fill="#fff"/>${T(540,917,186,'#000','MN<tspan fill="#E63946">.</tspan>')}`,0.5)}<g data-rise="0.8,0.5"><text x="540" y="1170" text-anchor="middle" font-family="Inter Tight" font-size="96" font-weight="900" fill="#fff" letter-spacing="-4">madeinnews<tspan fill="#E63946">.</tspan></text></g><g data-rise="1.2,0.5">${B(540,1270,46,'#fde047','PILLOLE DI SAPERE, OGNI GIORNO')}</g>`)}];
fs.writeFileSync(process.argv[2]||'natale.json',JSON.stringify({voiceId:"GOAZNavLupajyL3YafaD",title:["Perché il 25 dicembre?"],logo:true,accent:'#DC2626',scenes},null,1));console.log('ok');

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

const kitchen=()=>`<g filter="url(#wob)" ${W}><rect x="0" y="860" width="1080" height="560" fill="#e8f1f2" stroke="none"/>${[...Array(9)].map((_,r)=>[...Array(10)].map((_,c)=>`<rect x="${c*112-(r%2)*56}" y="${860+r*62}" width="108" height="58" rx="6" fill="#f7fbfb" stroke="#c9dadc" stroke-width="4"/>`).join('')).join('')}
 <rect x="700" y="880" width="300" height="230" rx="10" fill="#bfe6ff"/><line x1="850" y1="880" x2="850" y2="1110"/><line x1="700" y1="995" x2="1000" y2="995"/><rect x="690" y="1105" width="320" height="22" rx="6" fill="#fff"/>
 <rect x="80" y="900" width="70" height="140" rx="10" fill="#f4a261"/><rect x="170" y="940" width="60" height="100" rx="10" fill="#e9c46a"/><rect x="60" y="1040" width="200" height="16" rx="6" fill="#8a5a2b"/>
 <rect x="-10" y="1420" width="1100" height="90" fill="#c8915a"/><rect x="-10" y="1420" width="1100" height="24" fill="#a8723f"/></g>`;
const face=(x,y,s,t)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}>
 <path d="M-260 -40 Q-270 -330 0 -340 Q270 -330 260 -40 Q250 260 0 290 Q-250 260 -260 -40Z" fill="#f3c9a0"/>
 <path d="M-270 -60 Q-280 -390 0 -390 Q280 -390 270 -60 Q220 -250 0 -260 Q-220 -250 -270 -60Z" fill="#6b3e26"/>
 <circle cx="-268" cy="0" r="40" fill="#f3c9a0"/><circle cx="268" cy="0" r="40" fill="#f3c9a0"/>
 <g data-blink="2.4" style="transform-box:fill-box;transform-origin:center"><ellipse cx="-100" cy="-40" rx="62" ry="52" fill="#fff"/><ellipse cx="100" cy="-40" rx="62" ry="52" fill="#fff"/><circle cx="-100" cy="-36" r="26" fill="${INK}"/><circle cx="100" cy="-36" r="26" fill="${INK}"/></g>
 <g data-fade="${t},0.4" style="opacity:0"><ellipse cx="-100" cy="-40" rx="62" ry="52" fill="#ff9aa2" opacity=".45" stroke="none"/><ellipse cx="100" cy="-40" rx="62" ry="52" fill="#ff9aa2" opacity=".45" stroke="none"/><path d="M-170 -130 L-40 -105 M170 -130 L40 -105" fill="none" stroke-width="12"/></g>
 <path d="M-20 30 Q0 70 20 30" fill="none"/><path d="M-70 140 Q0 100 70 140" fill="none"/><circle cx="-170" cy="70" r="30" fill="#ff9aa2" stroke="none" opacity=".6"/><circle cx="170" cy="70" r="30" fill="#ff9aa2" stroke="none" opacity=".6"/></g>`;
const tear=(x,y,t,k)=>`<g data-fade="${t},0.2" style="opacity:0"><g data-loop="0,220,${1.0+k*0.25}"><path d="M${x} ${y-40} Q${x+30} ${y} ${x} ${y+22} Q${x-30} ${y} ${x} ${y-40}Z" fill="#8fd3ff" stroke="${INK}" stroke-width="6"/></g></g>`;
const lens=(inner,q)=>`<defs><clipPath id="ln${q}"><circle cx="540" cy="1120" r="380"/></clipPath></defs><g clip-path="url(#ln${q})"><rect x="140" y="720" width="800" height="800" fill="#f3f7e8"/>${[...Array(5)].map((_,r)=>[...Array(5)].map((_,c)=>`<path d="M${160+c*180+(r%2)*90} ${760+r*160} l80 -46 l80 46 l0 92 l-80 46 l-80 -46z" fill="none" stroke="#cfe0b0" stroke-width="6"/>`).join('')).join('')}${inner}</g><circle cx="540" cy="1120" r="380" fill="none" stroke="${INK}" stroke-width="22" filter="url(#wob)"/><circle cx="540" cy="1120" r="400" fill="none" stroke="#9aa3ad" stroke-width="18"/>`;
const lab=()=>`<g filter="url(#wob)" ${W}><rect x="0" y="860" width="1080" height="560" fill="#eef3f8" stroke="none"/><rect x="80" y="900" width="420" height="260" rx="10" fill="#fff"/>${[0,1,2].map(k=>`<line x1="110" y1="${950+k*60}" x2="${440-k*60}" y2="${950+k*60}" stroke="#c9d6e3" stroke-width="10"/>`).join('')}
 <rect x="-10" y="1420" width="1100" height="90" fill="#9aa3ad"/><g transform="translate(860,1200)"><rect x="-70" y="200" width="160" height="30" rx="8" fill="#555"/><path d="M0 200 L0 80 Q0 40 40 30 L60 -120" fill="none" stroke="#555" stroke-width="26"/><rect x="30" y="-200" width="60" height="110" rx="10" fill="#777" transform="rotate(15 60 -150)"/><rect x="-30" y="110" width="140" height="26" rx="6" fill="#777"/></g></g>`;
const phone=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><rect x="-230" y="-430" width="460" height="860" rx="60" fill="${INK}"/><rect x="-200" y="-390" width="400" height="780" rx="36" fill="#fffaf0"/>
 <circle cx="-110" cy="-260" r="70" fill="${INK}"/><text x="-110" y="-238" text-anchor="middle" ${F('Anton')} font-size="52" fill="#fff" stroke="none">MN<tspan fill="${RED}">.</tspan></text>
 <text x="-30" y="-270" ${F('Inter Tight')} font-weight="900" font-size="27" fill="${INK}" stroke="none">madeinnews.it</text><text x="-30" y="-230" ${F('Gochi Hand')} font-size="28" fill="#666" stroke="none">pillole di sapere</text>
 ${[0,1,2].map(r=>[0,1,2].map(c=>`<rect x="${-180+c*124}" y="${-140+r*170}" width="110" height="155" rx="8" fill="${['#ffd23f','#a8c7e6','#f2c6a0','#c7e3c0','#e8b4b8','#f3e1a1'][(r*3+c)%6]}" stroke-width="5"/>`).join('')).join('')}</g>`;
const SKY='#cfe8f7';
let SKI=0;const skyBg=(c1='#bfe3fa',c2='#eaf6ff')=>{const id='skA'+(SKI++);return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#${id})"/>`};
const cloud=(x,y,s,per=8)=>`<g data-loop="-1300,0,${per*3}"><g transform="translate(${x+650},${y}) scale(${s})" filter="url(#wob)" ${W}><path d="M-130 30 a55 55 0 0 1 45 -75 a75 75 0 0 1 140 -10 a55 55 0 0 1 75 65 a45 45 0 0 1 -10 20 Z" fill="#fff"/></g><g transform="translate(${x+1950},${y}) scale(${s})" filter="url(#wob)" ${W}><path d="M-130 30 a55 55 0 0 1 45 -75 a75 75 0 0 1 140 -10 a55 55 0 0 1 75 65 a45 45 0 0 1 -10 20 Z" fill="#fff"/></g></g>`;
const clouds=()=>cloud(-400,880,0.7,7)+cloud(100,1080,0.55,9)+cloud(-250,1380,0.65,8);
const plane=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><path d="M-300 0 Q-300 -50 -240 -55 L220 -55 Q300 -50 320 0 Q300 50 220 55 L-240 55 Q-300 50 -300 0Z" fill="#fff"/><path d="M-40 -50 L-140 -220 L-60 -220 L80 -50Z" fill="#dfe7ef"/><path d="M-40 50 L-140 220 L-60 220 L80 50Z" fill="#dfe7ef"/><path d="M-250 -50 L-300 -150 L-250 -150 L-190 -50Z" fill="${RED}"/>${[-160,-100,-40,20,80,140].map(x=>`<circle cx="${x}" cy="-10" r="14" fill="#bfe6ff"/>`).join('')}<path d="M250 -30 Q290 -20 300 0" fill="none"/></g>`;
// omino che cade (vista frontale, braccia aperte)
const faller=(x,y,s,eyes='open')=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}>
 <path d="M-50 -40 L-170 -120 M50 -40 L170 -120" fill="none" stroke-width="30" stroke="#3a86ff"/><path d="M-50 -40 L-170 -120 M50 -40 L170 -120" fill="none"/>
 <circle cx="-178" cy="-126" r="22" fill="#f3c9a0"/><circle cx="178" cy="-126" r="22" fill="#f3c9a0"/>
 <path d="M-30 110 L-110 230 M30 110 L110 230" fill="none" stroke-width="32" stroke="#2b2d42"/><path d="M-30 110 L-110 230 M30 110 L110 230" fill="none"/>
 <rect x="-60" y="-60" width="120" height="190" rx="40" fill="#3a86ff"/>
 <circle cx="0" cy="-120" r="70" fill="#f3c9a0"/><path d="M-70 -140 Q-60 -205 0 -205 Q60 -205 70 -140 Q30 -170 0 -165 Q-30 -170 -70 -140Z" fill="#6b3e26"/>
 ${eyes=='open'?`<circle cx="-24" cy="-122" r="9" fill="${INK}"/><circle cx="24" cy="-122" r="9" fill="${INK}"/><ellipse cx="0" cy="-84" rx="16" ry="20" fill="${INK}"/>`:`<path d="M-36 -122 q12 8 24 0 M12 -122 q12 8 24 0" fill="none"/><path d="M-12 -90 q12 6 24 0" fill="none"/>`}</g>`;
const wind=(t)=>`<g data-fade="${t},0.3" style="opacity:0"><g data-loop="0,-260,0.45">${[[280,860],[800,900],[240,1180],[840,1220]].map(([x,y])=>`<path d="M${x} ${y} l0 150" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".9"/><path d="M${x} ${y+260} l0 150" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".9"/>`).join('')}</g></g>`;
const thermo=(x,y,t0,t1)=>`<g transform="translate(${x},${y})" filter="url(#wob)" ${W}><rect x="-45" y="-330" width="90" height="560" rx="45" fill="#fff"/><circle cx="0" cy="260" r="80" fill="#3a86ff"/>${[...Array(8)].map((_,k)=>`<line x1="45" y1="${-280+k*60}" x2="80" y2="${-280+k*60}"/>`).join('')}
 <g style="transform-box:fill-box;transform-origin:50% 100%" data-sc="0,0.01,1,1,${t0},${t1},1,0.12"><rect x="-22" y="-300" width="44" height="560" rx="22" fill="#3a86ff" stroke="none"/></g></g>`;
const speedo=(x,y,t0)=>`<g transform="translate(${x},${y})"><g filter="url(#wob)" ${W}><path d="M-300 0 A300 300 0 0 1 300 0 Z" fill="#fff"/><path d="M-260 0 A260 260 0 0 1 260 0" fill="none" stroke="#e5e7eb" stroke-width="30"/>
 ${[0,50,100,150,200].map((v,k)=>{const a=Math.PI*(1-k/4);return `<line x1="${Math.cos(a)*230}" y1="${-Math.sin(a)*230}" x2="${Math.cos(a)*270}" y2="${-Math.sin(a)*270}" stroke-width="8"/><text x="${Math.cos(a)*185}" y="${-Math.sin(a)*185+16}" text-anchor="middle" ${F('Luckiest Guy')} font-size="40" fill="${INK}" stroke="none">${v}</text>`}).join('')}</g>
 <g data-rot="${t0},2.2,-90,90" style="transform-origin:0 0"><path d="M-10 0 L0 -240 L10 0Z" fill="${RED}" stroke="${INK}" stroke-width="5"/></g><circle r="26" fill="${INK}"/></g>`;
const station=()=>`<g filter="url(#wob)" ${W}><rect x="80" y="1150" width="920" height="420" fill="#e8d9c0"/><path d="M60 1150 L540 880 L1020 1150Z" fill="#bfe6ff" opacity=".85"/>${[200,330,460,620,750,880].map(x=>`<line x1="${x}" y1="${1150-(540-Math.abs(540-x))*0.56}" x2="${x}" y2="1150" stroke-width="6"/>`).join('')}
 ${[180,400,620,840].map(x=>`<path d="M${x} 1570 L${x} 1330 Q${x+70} 1260 ${x+140} 1330 L${x+140} 1570" fill="#a8723f"/>`).join('')}<rect x="300" y="1180" width="480" height="80" rx="10" fill="#fff"/><text x="540" y="1236" text-anchor="middle" ${F('Luckiest Guy')} font-size="48" fill="${INK}" stroke="none">STAZIONE</text></g>`;
const shards=(t)=>`<g data-pop="${t},0.3" ${C}>${[[-120,-40],[90,-70],[-60,60],[140,30],[0,-110],[-160,40]].map(([a,b])=>`<path d="M${540+a} ${980+b} l30 -20 l12 40z" fill="#bfe6ff" stroke="${INK}" stroke-width="5"/>`).join('')}</g>`;
const jungle=()=>`<rect x="0" y="780" width="1080" height="800" fill="#d8f0d0"/>${[[100,1500,1.2],[320,1460,1],[760,1470,1.1],[980,1500,1.25],[540,1540,0.8]].map(([x,y,s])=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><rect x="-18" y="-220" width="36" height="230" fill="#8a5a2b"/><circle cx="0" cy="-260" r="110" fill="#3f8f4f"/><circle cx="-80" cy="-200" r="80" fill="#4fa35e"/><circle cx="80" cy="-200" r="80" fill="#4fa35e"/></g>`).join('')}`;
const seat=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}>${[-120,0,120].map(a=>`<rect x="${a-55}" y="-150" width="110" height="170" rx="20" fill="#3a86ff"/><rect x="${a-60}" y="20" width="120" height="50" rx="12" fill="#2f6ad0"/>`).join('')}<path d="M-30 30 L30 30" stroke="${YEL}" stroke-width="10"/></g>`;
const altim=(x,y,t0)=>`<g transform="translate(${x},${y})"><g filter="url(#wob)" ${W}><rect x="-360" y="-200" width="720" height="400" rx="40" fill="#fff"/><rect x="-320" y="-150" width="640" height="200" rx="20" fill="#1b1b2f"/></g>
 <text x="0" y="-10" text-anchor="middle" ${F('Luckiest Guy')} font-size="150" fill="${YEL}" data-count="${t0},1.6,10160" data-dec="0"></text><text x="0" y="140" text-anchor="middle" ${F('Luckiest Guy')} font-size="70" fill="${INK}">METRI</text></g>`;
const phoneCTA=(t1,t2,t3)=>`<g data-rise="${t1},0.6,600">${phone(540,1100,0.85)}</g>
 <g data-pop="${t2},0.4" ${C}><g filter="url(#wob)"><g class="bx"><rect x="370" y="1330" width="340" height="100" rx="20" fill="#3a86ff" stroke="${INK}" stroke-width="7"/><text x="540" y="1400" text-anchor="middle" ${F('Luckiest Guy')} font-size="56" fill="#fff">SEGUI</text></g></g></g>
 <g data-win="${t3},0,99"><g filter="url(#wob)"><g class="bx"><rect x="370" y="1330" width="340" height="100" rx="20" fill="#e5e7eb" stroke="${INK}" stroke-width="7"/><text x="540" y="1400" text-anchor="middle" ${F('Luckiest Guy')} font-size="50" fill="${INK}">SEGUITO</text></g></g></g>
 <g data-fade="${t2},0.15" style="opacity:0"><g data-mv="0,0.01,500,500,500,500,${t2},0.5,500,500,0,0"><g transform="translate(680,1460)" filter="url(#wob)" ${W}><path d="M0 0 L0 -60 Q0 -80 20 -80 Q40 -80 40 -60 L40 -10 L70 -10 Q100 -10 100 20 L100 90 Q100 130 60 130 L20 130 Q-20 130 -40 90 L-70 30 Q-80 10 -60 0 Q-40 -8 -25 10Z" fill="#f3c9a0"/></g></g></g>`;
const stormCloud=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><path d="M-260 60 a80 80 0 0 1 60 -120 a110 110 0 0 1 200 -30 a90 90 0 0 1 150 50 a70 70 0 0 1 10 100 Z" fill="#8d99ae"/></g>`;
const rain=(x0,x1,y0)=>`<g data-loop="0,120,0.5">${[...Array(9)].map((_,k)=>`<line x1="${x0+k*(x1-x0)/8}" y1="${y0+(k%3)*30}" x2="${x0+k*(x1-x0)/8-14}" y2="${y0+(k%3)*30+50}" stroke="#7cc4ff" stroke-width="7" stroke-linecap="round"/>`).join('')}</g>`;
const bolt=(x,y,s,t)=>`<g data-flash="${t},0.12,0" ><g transform="translate(${x},${y}) scale(${s})"><path d="M0 0 L-60 180 L10 180 L-50 380 L120 120 L40 120 L90 0Z" fill="${YEL}" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/></g></g>`;
const boltS=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})"><path d="M0 0 L-60 180 L10 180 L-50 380 L120 120 L40 120 L90 0Z" fill="${YEL}" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/></g>`;
const person=(x,y,s,col='#3a86ff',hat=false)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><path d="M-30 110 L-50 240 M30 110 L50 240" fill="none" stroke-width="26" stroke="#2b2d42"/><path d="M-30 110 L-50 240 M30 110 L50 240" fill="none"/><rect x="-55" y="-40" width="110" height="160" rx="36" fill="${col}"/><path d="M-50 -10 L-110 70 M50 -10 L110 70" fill="none" stroke-width="24" stroke="${col}"/><path d="M-50 -10 L-110 70 M50 -10 L110 70" fill="none"/><circle cx="0" cy="-95" r="60" fill="#f3c9a0"/><circle cx="-20" cy="-98" r="7" fill="${INK}"/><circle cx="20" cy="-98" r="7" fill="${INK}"/><path d="M-14 -70 q14 10 28 0" fill="none"/>${hat?`<path d="M-90 -135 L90 -135 L60 -150 Q0 -230 -60 -150Z" fill="#8a5a2b"/><rect x="-100" y="-142" width="200" height="16" rx="8" fill="#6e4423"/>`:`<path d="M-58 -110 Q-50 -165 0 -165 Q50 -165 58 -110 Q20 -135 0 -132 Q-20 -135 -58 -110Z" fill="#6b3e26"/>`}</g>`;
const heart=(x,y,s,t)=>`<g transform="translate(${x},${y}) scale(${s})"><g data-sc="0,0.01,1,1"><g data-bob="0,1,0"><g filter="url(#wob)" ${W}><path d="M0 60 C-140 -40 -90 -140 0 -80 C90 -140 140 -40 0 60Z" fill="${RED}"/></g></g></g><g data-pop="${t},0.3" style="transform-box:fill-box;transform-origin:center"><rect x="-38" y="-70" width="24" height="70" rx="6" fill="#fff" stroke="${INK}" stroke-width="6"/><rect x="14" y="-70" width="24" height="70" rx="6" fill="#fff" stroke="${INK}" stroke-width="6"/></g></g>`;
const arm=(x,y,t)=>`<g transform="translate(${x},${y})"><g filter="url(#wob)" ${W}><path d="M-260 -60 L200 -60 Q260 -60 260 0 Q260 60 200 60 L-260 60Z" fill="#f3c9a0"/></g><g stroke="#e76f51" stroke-width="7" fill="none" stroke-linecap="round">${[['M-200 0 L-120 -10 L-40 5 L40 -8 L120 4',0],['M-120 -10 L-100 -40 M-120 -10 L-95 22',0.25],['M-40 5 L-20 -35 M-40 5 L-15 40',0.35],['M40 -8 L65 -42 M40 -8 L62 30',0.45],['M120 4 L150 -30 M120 4 L148 36',0.55]].map(([d,o])=>`<path d="${d}" data-draw="${t},${0.6+o}"/>`).join('')}</g></g>`;
const stopwatch=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})"><g filter="url(#wob)" ${W}><rect x="-22" y="-190" width="44" height="40" rx="8" fill="#9aa3ad"/><circle r="150" fill="#fff"/><circle r="120" fill="none" stroke-width="6"/></g><g data-spin="720"><line x1="0" y1="0" x2="0" y2="-100" stroke="${RED}" stroke-width="10" stroke-linecap="round"/></g><circle r="12" fill="${INK}"/></g>`;
const V=["Se ti colpisce un fulmine, quasi sicuramente sopravvivi. Resta fino alla fine: c'è chi ci è riuscito sette volte.",
"Secondo i CDC americani, quasi nove persone su dieci colpite da un fulmine sopravvivono.",
"Il motivo? La scarica dura un attimo, e spesso la corrente scorre sulla pelle invece di attraversare tutto il corpo.",
"Ma non è innocuo: può fermare il cuore per qualche istante, lasciare bruciature e, a volte, strani disegni sulla pelle a forma di felce.",
"Prima del record: se ti piacciono queste curiosità, segui Made in News.",
"Il record è di Roy Sullivan, guardaparco americano: tra il 1942 e il 1977 è stato colpito sette volte. E il Guinness dei primati lo riconosce.",
"Hai altre curiosità? Scrivile nei commenti. Made in News: una pillola di sapere al giorno."];
const SCN=[
{cam:"0,1.0,0,0",
 html:S(bg+`<g data-off="@Resta">${pop('@fulmine',hl(420,720,'9 SU 10 SOPRAVVIVONO',64,YEL))}${pop('@sopravvivi',hand(540,640,'quasi sicuramente',56,RED))}</g>
 ${pop('@Resta',hl(420,760,'RESTA FINO ALLA FINE',66,RED,'#fff'))}${pop('@riuscito',hl(600,560,'7 VOLTE?!',80,YEL))}${[0,1,2].map(k=>`<g data-pop="@sette,0.3" ${C}>${boltS(250+k*290,760,0.18)}</g>`).join('')}
 ${stormCloud(540,930,1.2)}${rain(300,780,1020)}
 ${bolt(470,960,0.95,'@colpisce')}
 <g data-shake="@colpisce">${person(540,1360,1.05)}</g>
 <g data-flash="@colpisce,0.12,0"><rect x="0" y="780" width="1080" height="800" fill="#fff" opacity=".35"/></g>
 <g data-pop="@sopravvivi,0.4" ${C}><g filter="url(#wob)"><circle cx="760" cy="1250" r="60" fill="#7bd389" stroke="${INK}" stroke-width="7"/><path d="M730 1250 l22 22 l40 -44" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round"/></g></g>`)},
{cam:"0,1.0,0,0",
 html:S(bg+`${pop('@CDC',hand(540,640,'secondo i CDC americani',56,INK))}${pop('@nove',hl(420,620,'QUASI 9 SU 10',84,YEL))}${pop('@colpite',hand(540,780,'colpite da un fulmine',52,RED))}
 ${[...Array(10)].map((_,k)=>{const x=120+(k%5)*210,y=k<5?1050:1390;return `<g data-pop="${(0.3+k*0.12).toFixed(2)},0.3" ${C}>${person(x,y,0.55,k==9?'#9aa3ad':'#3a86ff')}</g>${k<9?`<g data-pop="@sopravvivono,0.3" ${C}><circle cx="${x+50}" cy="${y-110}" r="26" fill="#7bd389" stroke="${INK}" stroke-width="5"/><path d="M${x+38} ${y-110} l9 9 l17 -18" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/></g>`:''}`}).join('')}
 ${bolt(540,780,0.7,'@colpite')}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`<g data-off="@corrente">${pop('@scarica',hl(420,620,'DURA UN ATTIMO',84,YEL))}${pop(0.15,stopwatch(540,1150,1.4))}</g>
 ${pop('@corrente',hl(420,720,'SCORRE SULLA PELLE',72,YEL))}
 <g data-fade="@corrente,0.3" style="opacity:0">${person(540,1250,1.6)}<g stroke="${YEL}" stroke-width="14" fill="none" stroke-linecap="round" opacity=".9"><path d="M540 960 Q440 1000 450 1100 Q460 1250 470 1420" data-draw="@pelle,0.8"/><path d="M540 960 Q640 1000 630 1100 Q620 1250 610 1420" data-draw="@pelle,0.8"/></g></g>
 ${pop('@attraversare',tagAt(540,1500,520,'NON DENTRO IL CORPO',48,'#fff'))}${pop('@corpo',`<g filter="url(#wob)"><circle cx="800" cy="1150" r="60" fill="#7bd389" stroke="${INK}" stroke-width="7"/><path d="M770 1150 l22 22 l40 -44" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round"/></g>`)}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`<g data-off="@bruciature">${pop('@innocuo',hl(420,640,'NON È INNOCUO',84,RED,'#fff'))}</g>${pop('@bruciature',hl(420,640,'BRUCIATURE',84,RED,'#fff'))}
 <g data-off="@disegni">${pop(0.15,heart(540,1120,1.6,'@fermare'))}${pop('@istante',tagAt(540,1400,500,'CUORE FERMO UN ISTANTE',44,'#fff'))}</g>
 <g data-fade="@disegni,0.3" style="opacity:0"><g transform="translate(540,1150) scale(1.6) translate(-540,-1150)">${arm(540,1150,'@disegni')}</g></g>
 ${pop('@felce',hl(1300,640,'A FORMA DI FELCE',64,YEL))}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`${pop('@Prima',hl(420,640,'PRIMA DEL RECORD…',70))}${pop('@piacciono',hand(540,690,'se ti piacciono queste curiosità',52,RED))}
 ${phoneCTA('@Prima','@segui','@Made')}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`${pop('@Roy',hl(420,620,'ROY SULLIVAN',84,'#fff'))}${pop('@guardaparco',hand(540,690,'guardaparco americano',56,RED))}
 ${pop(0.15,person(330,1250,1.2,'#3f8f4f',true))}
 <g transform="translate(780,1180)"><g filter="url(#wob)" ${W}><rect x="-180" y="-150" width="360" height="300" rx="30" fill="#1b1b2f"/></g><text x="0" y="60" text-anchor="middle" ${F('Luckiest Guy')} font-size="200" fill="${YEL}" data-count="@1942,4.2,7" data-dec="0"></text></g>
 ${[0,1,2,3,4,5,6].map(k=>`<g data-pop="${(3.4+k*0.6).toFixed(1)},0.3" ${C}>${boltS(600+((k*97)%360),860+((k*53)%60),0.25)}</g>`).join('')}
 ${pop('@1942',tagAt(290,1500,360,'1942 → 1977',50,YEL))}
 ${pop('@riconosce',hand(540,780,'è ufficiale',54,RED))}<g data-stamp="@Guinness" ${C}><g filter="url(#wob)"><g class="bx"><rect x="510" y="1400" width="520" height="120" rx="16" fill="${RED}" stroke="${INK}" stroke-width="7"/><text x="770" y="1480" text-anchor="middle" ${F('Luckiest Guy')} font-size="58" fill="#fff">RECORD GUINNESS</text></g></g></g>`)},
{cam:"0,1.0,0,0",
 html:S(bg+`<g data-off="@Made">${pop('@Hai',hl(560,760,'HAI ALTRE CURIOSITÀ?',66,YEL))}
 <g data-pop="@Scrivile,0.5" ${C}><g data-idle="8,2.2,0" ${C}><g transform="translate(540,1080)" filter="url(#wob)" ${W}><path d="M-300 -180 Q-300 -220 -260 -220 L260 -220 Q300 -220 300 -180 L300 120 Q300 160 260 160 L-60 160 L-160 260 L-140 160 L-260 160 Q-300 160 -300 120Z" fill="#fff"/>
  ${[0,1,2].map(k=>`<rect x="-230" y="${-150+k*80}" width="${[400,460,300][k]}" height="30" rx="15" fill="#e5e7eb" stroke="none" style="transform-box:fill-box;transform-origin:left" data-grow="@commenti,0.4"/>`).join('')}</g></g></g>
 ${pop('@commenti',hl(1330,700,'SCRIVILE NEI COMMENTI',60,RED,'#fff'))}</g>
 <g data-fade="@Made,0.3" style="opacity:0">${pop('@Made',`<rect x="390" y="700" width="300" height="300" fill="${INK}"/><text x="540" y="917" text-anchor="middle" ${F('Anton')} font-size="186" fill="#fff">MN<tspan fill="${RED}">.</tspan></text>`,0.5)}
 <g data-rise="@News,0.5"><text x="540" y="1170" text-anchor="middle" ${F('Inter Tight')} font-size="96" font-weight="900" fill="${INK}" letter-spacing="-4">madeinnews<tspan fill="${RED}">.</tspan></text></g>
 <g data-rise="@pillola,0.5">${hand(540,1280,'una pillola di sapere al giorno',62)}</g></g>`)}];
const still=process.argv[3]=='still';
fs.writeFileSync(process.argv[2],JSON.stringify({voiceId:"GOAZNavLupajyL3YafaD",title:["Fulmine"],logo:'plain',bg:'#f6efe2',light:true,accent:RED,pad:0,scenes:SCN.map((s,i)=>still?{voice:V[i],cam:s.cam,html:s.html.replace(/data-off="@[^"]*"/g,'data-off="2.5"').replace(/data-fade="@[^"]*,/g,'data-fade="2.6,').replace(/data-flash="@[^"]*,/g,'data-flash="99,').replace(/@[^,"'\s]+(?=[,"'])/g,'0.2'),dur:5,words:[]}:{voice:V[i],cam:s.cam,html:s.html})},null,1));console.log('ok');

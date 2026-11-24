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
const M=JSON.parse(fs.readFileSync(__dirname+'/assets/atlantico.json','utf8'));
const usaD=M.paths['United States of America'];
let SBI=0;const skyBand=(c1,c2)=>{const id='sb'+(SBI++);return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect x="0" y="800" width="1080" height="760" fill="url(#${id})"/><g filter="url(#wob)"><line x1="-10" y1="800" x2="1090" y2="800" stroke="${INK}" stroke-width="8"/><line x1="-10" y1="1560" x2="1090" y2="1560" stroke="${INK}" stroke-width="8"/></g>`};
const node=(x,y,t,l)=>`<g data-pop="${t},0.4" ${C}><g filter="url(#wob)" ${W}><rect x="${x-46}" y="${y-36}" width="92" height="64" rx="8" fill="#fff"/><rect x="${x-34}" y="${y-26}" width="68" height="40" rx="4" fill="#1b1b2f"/><rect x="${x-20}" y="${y+28}" width="40" height="16" fill="#9aa3ad"/></g><circle cx="${x}" cy="${y-6}" r="8" fill="#7bd389" data-flash="${t},0.5,0.3"/>${l?`<text x="${x}" y="${y+86}" text-anchor="middle" ${F('Luckiest Guy')} font-size="34" fill="${INK}">${l}</text>`:''}</g>`;
const terminal=(x,y)=>`<g transform="translate(${x},${y})"><g filter="url(#wob)" ${W}><rect x="-340" y="-250" width="680" height="440" rx="30" fill="#d9c9a8"/><rect x="-290" y="-200" width="580" height="320" rx="20" fill="#0d1a10"/><rect x="-300" y="190" width="600" height="90" rx="16" fill="#c4b393"/>${[...Array(10)].map((_,k)=>`<rect x="${-270+k*55}" y="210" width="44" height="22" rx="4" fill="#efe4cc"/>`).join('')}${[...Array(9)].map((_,k)=>`<rect x="${-245+k*55}" y="242" width="44" height="22" rx="4" fill="#efe4cc"/>`).join('')}</g></g>`;
const smoke=(x,y,t)=>`<g data-fade="${t},0.3" style="opacity:0">${[0,1,2].map(k=>`<g data-loop="0,-160,${1.3+k*0.3}"><circle cx="${x-60+k*60}" cy="${y}" r="${44+k*10}" fill="#9aa3ad" opacity=".7" stroke="${INK}" stroke-width="6"/></g>`).join('')}</g>`;
const netCloud=(x,y,c,t)=>`<g data-pop="${t},0.5" ${C}><g filter="url(#wob)" ${W}><circle cx="${x}" cy="${y}" r="170" fill="${c}"/></g>${[[-80,-60],[70,-80],[-60,70],[80,60],[0,0]].map(([a,b],k)=>`<circle cx="${x+a}" cy="${y+b}" r="22" fill="#fff" stroke="${INK}" stroke-width="6"/>`).join('')}<g stroke="#fff" stroke-width="7"><line x1="${x-80}" y1="${y-60}" x2="${x}" y2="${y}"/><line x1="${x+70}" y1="${y-80}" x2="${x}" y2="${y}"/><line x1="${x-60}" y1="${y+70}" x2="${x}" y2="${y}"/><line x1="${x+80}" y1="${y+60}" x2="${x}" y2="${y}"/></g></g>`;
const mountains=()=>`<g filter="url(#wob)" ${W}><path d="M-20 1420 L230 1020 L380 1200 L560 940 L760 1220 L900 1060 L1100 1420Z" fill="#cfd8e3"/><path d="M230 1020 L190 1085 L270 1085Z M560 940 L510 1020 L615 1020Z M900 1060 L865 1115 L940 1115Z" fill="#fff"/><rect x="-20" y="1420" width="1120" height="140" fill="#a8d5a2"/></g>`;
const cern=(x,y)=>`<g transform="translate(${x},${y})" filter="url(#wob)" ${W}><rect x="-200" y="-150" width="400" height="230" fill="#fff"/>${[0,1].map(r=>[0,1,2,3].map(c=>`<rect x="${-170+c*90}" y="${-120+r*80}" width="60" height="50" fill="#bfe6ff"/>`).join('')).join('')}<rect x="-140" y="-200" width="280" height="60" rx="10" fill="#1d4ed8"/><text x="0" y="-158" text-anchor="middle" ${F('Luckiest Guy')} font-size="44" fill="#fff" stroke="none">CERN</text></g>`;
const monitor=(x,y,t)=>`<g transform="translate(${x},${y})"><g filter="url(#wob)" ${W}><rect x="-170" y="-140" width="340" height="250" rx="18" fill="#e8e4da"/><rect x="-140" y="-112" width="280" height="190" rx="8" fill="#fff"/><rect x="-40" y="110" width="80" height="40" fill="#d9d4c8"/><rect x="-90" y="145" width="180" height="20" rx="6" fill="#d9d4c8"/></g><g data-fade="${t},0.3" style="opacity:0"><text x="0" y="-60" text-anchor="middle" ${F('Luckiest Guy')} font-size="40" fill="#1d4ed8">WWW</text>${[0,1,2].map(k=>`<rect x="-110" y="${-30+k*28}" width="${220-k*50}" height="12" rx="6" fill="#c9d6e3"/>`).join('')}</g></g>`;
const pisa=(x,y)=>`<g transform="translate(${x},${y}) rotate(5)" filter="url(#wob)" ${W}>${[0,1,2,3,4,5].map(k=>`<rect x="-70" y="${-k*70-70}" width="140" height="70" fill="#fbf7ee"/>${[-45,-15,15,45].map(a=>`<path d="M${a-8} ${-k*70-15} l0 -30 a8 8 0 0 1 16 0 l0 30z" fill="#e5ddcc"/>`).join('')}`).join('')}<rect x="-55" y="-490" width="110" height="70" fill="#fbf7ee"/><rect x="-80" y="0" width="160" height="16" fill="#e5ddcc"/></g>`;
const dish=(x,y)=>`<g transform="translate(${x},${y})" filter="url(#wob)" ${W}><rect x="-14" y="-10" width="28" height="140" fill="#9aa3ad"/><path d="M-120 -60 Q0 80 120 -60Z" fill="#fff" transform="rotate(-30)"/><line x1="0" y1="0" x2="60" y2="-90" stroke-width="8"/><circle cx="60" cy="-90" r="14" fill="${RED}"/></g>`;
const sat=(x,y)=>`<g transform="translate(${x},${y})"><g data-bob="10,2,0"><g filter="url(#wob)" ${W}><rect x="-40" y="-30" width="80" height="60" rx="8" fill="#e5e7eb"/><rect x="-170" y="-22" width="110" height="44" fill="#3a86ff"/><rect x="60" y="-22" width="110" height="44" fill="#3a86ff"/><line x1="-60" y1="0" x2="-40" y2="0"/><line x1="40" y1="0" x2="60" y2="0"/></g></g></g>`;
const V=["Chi ha inventato internet? Non una persona sola. Resta fino alla fine: c'è un pezzo di questa storia che è italiano.",
"Tutto parte nel 1969 negli Stati Uniti, con ARPANET: una rete di pochi computer di alcune università.",
"Il 29 ottobre 1969 parte il primo messaggio della storia: dovevano scrivere LOGIN. Arrivano solo la L e la O, poi il sistema si blocca.",
"Negli anni '70 Vint Cerf e Bob Kahn creano il TCP/IP: le regole che permettono a reti diverse di parlarsi. Per questo sono spesso chiamati i padri di internet.",
"E il web? È un'altra cosa: lo inventa Tim Berners-Lee al CERN di Ginevra, nel 1989. E nel 1991 mette online il primo sito.",
"Prima della parte italiana: se ti piacciono queste curiosità, segui Made in News.",
"Il 30 aprile 1986, da Pisa, l'Italia si collega per la prima volta a internet. Una delle prime in Europa.",
"Hai altre curiosità? Scrivile nei commenti. Made in News: una pillola di sapere al giorno."];
const SCN=[
{cam:"0,1.0,0,0",
 html:S(bg+`${skyBand('#bfe3fa','#eaf6ff')}${clouds()}
 <g data-off="@Resta">${pop('@Chi',hand(540,420,'chi ha inventato…',58,INK))}${pop('@internet',title(450,'INTERNET?',140))}${pop('@persona',hl(680,700,'NON UNA PERSONA SOLA',64,YEL))}</g>
 ${pop('@Resta',hl(420,760,'RESTA FINO ALLA FINE',66,RED,'#fff'))}${pop('@italiano',hl(600,700,'UN PEZZO È ITALIANO',64,YEL))}
 <g data-pop="0.2,0.6" ${C}><g transform="translate(540,1150)"><g data-spin="12"><g filter="url(#wob)" ${W}><circle r="300" fill="#7cc4ff"/><path d="M-200 -120 Q-120 -200 -40 -150 Q20 -60 -80 -10 Q-180 40 -220 -40Z M60 -220 Q160 -180 200 -80 Q240 40 140 60 Q80 20 100 -80 Q60 -140 60 -220Z M-100 80 Q0 60 40 140 Q20 240 -60 260 Q-140 200 -100 80Z" fill="#a8e0b0"/></g></g></g></g>
 ${[[300,950],[780,980],[420,1330],[720,1320],[540,1100]].map(([x,y],k)=>`<g data-pop="${0.6+k*0.25},0.3" ${C}><circle cx="${x}" cy="${y}" r="20" fill="${YEL}" stroke="${INK}" stroke-width="6"/></g>`).join('')}
 <g stroke="${RED}" stroke-width="8" fill="none" stroke-linecap="round">${[[300,950,540,1100],[780,980,540,1100],[420,1330,540,1100],[720,1320,540,1100],[300,950,420,1330],[780,980,720,1320]].map(([a,b,c,d],k)=>`<path d="M${a} ${b} L${c} ${d}" data-draw="${0.9+k*0.2},0.4"/>`).join('')}</g>`)},
{cam:"0,1.0,0,0",
 html:S(bg+`${skyBand('#ffe3c2','#fff4e6')}${pop('@1969',hl(420,420,'1969',100,RED,'#fff'))}${pop('@Stati',hand(540,690,'Stati Uniti',60))}
 <defs><clipPath id="usaclip"><rect x="40" y="790" width="1000" height="760" rx="30"/></clipPath></defs><g data-pop="0.2,0.6" ${C}><rect x="40" y="790" width="1000" height="760" rx="30" fill="#cfe8f7" stroke="${INK}" stroke-width="8"/><g clip-path="url(#usaclip)"><g transform="translate(540,1170) scale(1.7) translate(-344.1,-1134.3)"><path d="${usaD}" fill="#ffd9a0" stroke="${INK}" stroke-width="3" vector-effect="non-scaling-stroke"/></g></g></g>
 ${node(400,1380,'@rete','UCLA')}${node(270,1360,'@computer','UCSB')}${node(217,1180,'@computer','SRI')}${node(682,1009,'@università','UTAH')}
 <g stroke="${RED}" stroke-width="8" fill="none" stroke-linecap="round"><path d="M400 1380 L270 1360" data-draw="@pochi,0.4"/><path d="M400 1380 L217 1180" data-draw="@pochi,0.4"/><path d="M217 1180 L682 1009" data-draw="@alcune,0.4"/><path d="M270 1360 L217 1180" data-draw="@alcune,0.4"/></g>
 ${pop('@ARPANET',tagAt(760,1400,380,'ARPANET',64,'#1d4ed8','#fff'))}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`${skyBand('#d7d0f5','#f5f2ff')}${pop('@29',hl(420,760,'29 OTTOBRE 1969',72,'#fff'))}${pop('@primo',hand(540,690,'il primo messaggio della storia',52,RED))}
 <g data-pop="0.2,0.6" ${C}>${terminal(540,1150)}</g>
 <text x="540" y="1010" text-anchor="middle" ${F('Luckiest Guy')} font-size="120" fill="#7bd389" data-type="@LOGIN,0.6" data-text="LOGIN"></text>
 <g data-fade="@solo,0.2" style="opacity:0"><rect x="250" y="890" width="580" height="160" fill="#0d1a10"/><text x="540" y="1010" text-anchor="middle" ${F('Luckiest Guy')} font-size="120" fill="#7bd389" data-type="@L,0.3" data-text="LO"></text></g>
 <g data-flash="@blocca,0.12,0" style="opacity:0"><rect x="250" y="900" width="580" height="320" fill="#fff" opacity=".4"/></g>
 ${smoke(540,880,'@blocca')}
 <g data-stamp="@blocca" ${C}><g filter="url(#wob)"><g class="bx"><rect x="300" y="1070" width="480" height="130" rx="16" fill="${RED}" stroke="${INK}" stroke-width="7"/><text x="540" y="1160" text-anchor="middle" ${F('Luckiest Guy')} font-size="90" fill="#fff">CRASH!</text></g></g></g>`)},
{cam:"0,1.0,0,0",
 html:S(bg+`${skyBand('#c7e9d6','#f2fbf5')}${clouds()}${pop("@'70",hl(420,520,"ANNI '70",84,'#fff'))}
 ${netCloud(260,1100,'#3a86ff','@reti')}${netCloud(820,1100,'#e76f51','@diverse')}
 <g stroke="${INK}" stroke-width="10" fill="none" stroke-linecap="round"><path d="M430 1100 Q540 1020 650 1100" data-draw="@parlarsi,0.6"/></g>
 ${pop('@TCP/IP',tagAt(540,960,300,'TCP/IP',64,YEL))}
 ${pop('@Vint',tagAt(260,1330,320,'VINT CERF',48,'#fff'))}${pop('@Bob',tagAt(820,1330,320,'BOB KAHN',48,'#fff'))}
 ${pop('@padri',hl(1440,700,'I PADRI DI INTERNET',62,RED,'#fff'))}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`${skyBand('#bfe3fa','#eaf6ff')}${clouds()}<g data-off="@1991">${pop('@web?',hl(420,500,'E IL WEB?',90,YEL))}</g>${pop('@1991',hl(420,600,'1991: PRIMO SITO',72,YEL))}
 ${pop('@Tim',hand(540,690,'Tim Berners-Lee',60,RED))}
 ${mountains()}${pop('@CERN',cern(330,1300))}${pop('@1989',tagAt(330,1470,220,'1989',60,RED,'#fff'))}
 ${pop('@online',monitor(780,1250,'@sito'))}${pop('@Ginevra',tagAt(330,980,260,'GINEVRA',44,'#fff'))}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`${skyBand('#bfe3fa','#eaf6ff')}${clouds()}${pop('@Prima',hl(420,760,'PRIMA DELLA PARTE ITALIANA…',54))}${pop('@piacciono',hand(540,690,'se ti piacciono queste curiosità',52,RED))}
 ${phoneCTA('@Prima','@segui','@Made')}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`${skyBand('#ffd9a8','#fff4e0')}<g data-off="@Europa">${pop('@30',hl(420,700,'30 APRILE 1986',76,RED,'#fff'))}</g>${pop('@Pisa',hand(540,690,'da Pisa',64,INK))}
 ${sat(760,880)}
 <path d="M0 1440 Q540 1380 1080 1440 L1080 1560 L0 1560Z" fill="#a8d5a2" stroke="${INK}" stroke-width="8" filter="url(#wob)"/>
 ${pop('@Pisa',pisa(330,1440))}${pop('@collega',dish(760,1330))}
 <g data-fade="@collega,0.2" style="opacity:0">${[0,1,2].map(k=>`<g data-loop="0,-150,${1.0}"><path d="M${780+k*0} ${1230-k*60} q30 -20 60 0" stroke="${RED}" stroke-width="10" fill="none" stroke-linecap="round" opacity="${1-k*0.25}"/></g>`).join('')}</g>
 ${pop('@internet.',tagAt(760,1500,340,'ITALIA ONLINE',46,YEL))}${pop('@Europa',hl(420,820,'TRA LE PRIME IN EUROPA',62,YEL))}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`<g data-off="@Made">${pop('@Hai',hl(560,760,'HAI ALTRE CURIOSITÀ?',66,YEL))}
 <g data-pop="@Scrivile,0.5" ${C}><g data-idle="8,2.2,0" ${C}><g transform="translate(540,1080)" filter="url(#wob)" ${W}><path d="M-300 -180 Q-300 -220 -260 -220 L260 -220 Q300 -220 300 -180 L300 120 Q300 160 260 160 L-60 160 L-160 260 L-140 160 L-260 160 Q-300 160 -300 120Z" fill="#fff"/>
  ${[0,1,2].map(k=>`<rect x="-230" y="${-150+k*80}" width="${[400,460,300][k]}" height="30" rx="15" fill="#e5e7eb" stroke="none" style="transform-box:fill-box;transform-origin:left" data-grow="@commenti,0.4"/>`).join('')}</g></g></g>
 ${pop('@commenti',hl(1330,700,'SCRIVILE NEI COMMENTI',60,RED,'#fff'))}</g>
 <g data-fade="@Made,0.3" style="opacity:0">${pop('@Made',`<rect x="390" y="700" width="300" height="300" fill="${INK}"/><text x="540" y="917" text-anchor="middle" ${F('Anton')} font-size="186" fill="#fff">MN<tspan fill="${RED}">.</tspan></text>`,0.5)}
 <g data-rise="@News,0.5"><text x="540" y="1170" text-anchor="middle" ${F('Inter Tight')} font-size="96" font-weight="900" fill="${INK}" letter-spacing="-4">madeinnews<tspan fill="${RED}">.</tspan></text></g>
 <g data-rise="@pillola,0.5">${hand(540,1280,'una pillola di sapere al giorno',62)}</g></g>`)}];
const still=process.argv[3]=='still';
fs.writeFileSync(process.argv[2],JSON.stringify({voiceId:"GOAZNavLupajyL3YafaD",title:["Chi ha inventato internet?"],logo:'plain',bg:'#f6efe2',light:true,accent:RED,pad:0,scenes:SCN.map((s,i)=>still?{voice:V[i],cam:s.cam,html:s.html.replace(/data-off="@[^"]*"/g,'data-off="2"').replace(/@[^,"'\s]+(?=[,"'])/g,'0.2'),dur:5,words:[]}:{voice:V[i],cam:s.cam,html:s.html})},null,1));console.log('ok');

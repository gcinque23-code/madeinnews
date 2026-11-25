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
const ufo=(x,y,s,beam=true)=>`<g transform="translate(${x},${y}) scale(${s})"><g data-bob="12,2,0"><g filter="url(#wob)" ${W}><ellipse cx="0" cy="0" rx="160" ry="44" fill="#c7cdd4"/><path d="M-80 -10 Q0 -110 80 -10Z" fill="#bfe6ff"/>${[-100,-40,40,100].map(a=>`<circle cx="${a}" cy="6" r="12" fill="${YEL}"/>`).join('')}</g>${beam?`<path d="M-60 40 L-120 260 L120 260 L60 40Z" fill="${YEL}" opacity=".35"/>`:''}</g></g>`;
const mural=(x,y)=>`<g transform="translate(${x},${y})" filter="url(#wob)" ${W}><rect x="-300" y="-200" width="600" height="400" rx="10" fill="#efe4cc"/><path d="M-200 140 L0 -120 L200 140Z" fill="none" stroke-width="10"/>${[[-120,40,'UFO'],[60,-10,'?'],[120,100,'?']].map(([a,b,l])=>`<g><ellipse cx="${a}" cy="${b}" rx="40" ry="14" fill="none" stroke-width="6"/><text x="${a}" y="${b-24}" text-anchor="middle" ${F('Gochi Hand')} font-size="34" fill="${INK}" stroke="none">${l}</text></g>`).join('')}<path d="M-20 150 q20 -40 40 0 q-20 30 -40 0z" fill="#fff"/></g>`;
const sub=(x,y)=>`<g transform="translate(${x},${y})"><g data-loop="40,0,3"><g filter="url(#wob)" ${W}><ellipse cx="0" cy="0" rx="130" ry="56" fill="${YEL}"/><rect x="-30" y="-90" width="70" height="44" rx="10" fill="${YEL}"/><circle cx="-50" cy="0" r="18" fill="#bfe6ff"/><circle cx="10" cy="0" r="18" fill="#bfe6ff"/><path d="M130 0 l40 -30 l0 60z" fill="#e0a800"/></g></g></g>`;
const seabed=()=>`<g filter="url(#wob)" ${W}><rect x="60" y="760" width="960" height="800" rx="30" fill="#2a6f97"/><path d="M60 1420 Q300 1360 540 1420 T1020 1400 L1020 1560 L60 1560Z" fill="#c9b48a"/>${[[200,1380],[880,1360]].map(([x,y])=>`<path d="M${x} ${y} q-20 -80 0 -160 q20 -60 0 -120" stroke="#3f8f4f" stroke-width="14" fill="none"/>`).join('')}</g>${[0,1,2,3].map(k=>`<g data-loop="0,-300,${1.6+k*0.3}"><circle cx="${300+k*140}" cy="${1300-k*40}" r="${10+k*3}" fill="none" stroke="#fff" stroke-width="5"/></g>`).join('')}`;
const carCash=(x,y)=>`<g transform="translate(${x},${y})" filter="url(#wob)" ${W}><path d="M-230 40 L-230 0 Q-225 -36 -170 -42 L-120 -48 L-70 -96 Q-54 -106 -26 -106 L60 -106 Q86 -106 102 -92 L150 -48 L200 -40 Q232 -34 232 2 L232 40Z" fill="#2b2d42"/><rect x="-60" y="-160" width="200" height="70" rx="10" fill="#7bd389"/><circle cx="-140" cy="48" r="44" fill="#3a3a44"/><circle cx="150" cy="48" r="44" fill="#3a3a44"/></g>`;
const V=["Nella mappa di GTA 5 ci sono segreti che dopo dieci anni nessuno ha ancora risolto. E uno vale due milioni di dollari. Resta fino alla fine.",
"In cima al monte Chiliad c'è un murale misterioso: un disegno della montagna con un UFO, un uovo e un jetpack. I giocatori lo studiano dal 2013.",
"E gli UFO ci sono davvero: dopo aver completato il gioco al 100%, alle 3 di notte, con il temporale, ne compare uno sopra la montagna.",
"In fondo al mare, con un sottomarino, puoi trovare un UFO schiantato.",
"Prima dei due milioni: se ti piacciono queste curiosità, segui Made in News.",
"C'è una setta, il Programma Epsilon. Se segui tutte le sue missioni, alla fine ti chiedono di portare un'auto piena di soldi: 2,1 milioni di dollari. E puoi decidere di tradirli e tenerli tutti.",
"Hai trovato altri segreti in GTA? Scrivili nei commenti. Made in News: una pillola di sapere al giorno."];
const SCN=[
{cam:"0,1.0,0,0",
 html:S(bg+`<g data-off="@Resta">${pop('@segreti',hl(420,700,'I SEGRETI DELLA MAPPA',62,YEL))}${pop('@nessuno',hand(540,640,'nessuno li ha risolti',56,RED))}</g>
 ${pop('@Resta',hl(420,760,'RESTA FINO ALLA FINE',66,RED,'#fff'))}${pop('@milioni',hl(600,560,'2 MILIONI $',80,YEL))}
 <g transform="translate(540,1180) scale(0.82) translate(-540,-1140)">${pop(0.15,island())}${pin(540,800,'@mappa')}${pin(800,1180,'@dieci','#3a86ff')}${pin(560,1420,'@milioni','#7bd389')}</g>`)},
{cam:"0,1.0,0,0",
 html:S(bg+`<g data-off="@murale">${pop('@monte',hl(420,620,'MONTE CHILIAD',84,'#fff'))}<g transform="translate(540,1180) scale(0.82) translate(-540,-1140)">${pop(0.15,island())}${pin(540,800,'@cima')}</g></g>
 <g data-fade="@murale,0.3" style="opacity:0">${pop('@murale',hl(420,620,'IL MURALE',90,YEL))}${mural(540,1100)}</g>
 ${pop('@2013',tagAt(540,1420,440,'STUDIATO DAL 2013',48,RED,'#fff'))}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`${pop('@UFO',hl(420,600,'GLI UFO ESISTONO',78,YEL))}
 <rect x="60" y="760" width="960" height="800" rx="30" fill="#2b2d5c"/>${[...Array(14)].map((_,k)=>`<circle cx="${100+(k*71)%900}" cy="${800+(k*53)%300}" r="4" fill="#fff" data-flash="${(k%4)*0.3},0.8,0.3"/>`).join('')}
 <g filter="url(#wob)" ${W}><path d="M140 1560 L540 980 L940 1560Z" fill="#6b6b78"/><path d="M480 1066 L540 980 L600 1066 L570 1056 L540 1080 L510 1056Z" fill="#fff"/></g>
 <g data-flash="@temporale,0.25,0"><path d="M240 780 L200 900 L250 900 L210 1020" stroke="${YEL}" stroke-width="14" fill="none"/></g>
 ${pop('@compare',ufo(540,900,1.0))}
 ${pop('@100%',tagAt(260,1480,300,'100%',60,YEL))}${pop('@3',tagAt(560,1480,240,'ORE 3',56,'#fff'))}${pop('@temporale',tagAt(840,1480,280,'TEMPORALE',44,'#fff'))}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`${pop('@mare',hl(420,620,'IN FONDO AL MARE',76,YEL))}
 ${seabed()}${pop('@sottomarino',sub(360,1050))}
 <g data-pop="@UFO,0.5" style="transform-box:fill-box;transform-origin:center"><g transform="translate(680,1400) rotate(-18)">${ufo(0,0,0.8,false)}</g></g>
 ${pop('@schiantato',tagAt(680,1250,360,'UFO SCHIANTATO',46,'#fff'))}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`${pop('@Prima',hl(420,760,'PRIMA DEI 2 MILIONI…',64))}${pop('@piacciono',hand(540,690,'se ti piacciono queste curiosità',52,RED))}
 ${phoneCTA('@Prima','@segui','@Made')}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`${pop('@setta',hl(420,700,'PROGRAMMA EPSILON',70,'#fff'))}${pop('@missioni',hand(540,640,'segui tutte le missioni',54,RED))}
 ${pop('@auto',carCash(540,1150))}
 <g transform="translate(540,1360)"><g filter="url(#wob)" ${W}><rect x="-280" y="-80" width="560" height="160" rx="24" fill="#1b1b2f"/></g><text x="0" y="40" text-anchor="middle" ${F('Luckiest Guy')} font-size="100" fill="#7bd389" data-count="@2,1.6,2100000" data-dec="0"></text></g>
 ${pop('@tradirli',tagAt(540,1500,420,'TRADISCILI',60,RED,'#fff'))}${pop('@tutti.',tagAt(540,850,380,'E TIENI TUTTO',50,YEL))}`)},
{cam:"0,1.0,0,0",
 html:S(bg+`<g data-off="@Made">${pop('@Hai',hl(560,780,'HAI TROVATO ALTRI SEGRETI?',58,YEL))}
 <g data-pop="@Scrivili,0.5" ${C}><g data-idle="8,2.2,0" ${C}><g transform="translate(540,1080)" filter="url(#wob)" ${W}><path d="M-300 -180 Q-300 -220 -260 -220 L260 -220 Q300 -220 300 -180 L300 120 Q300 160 260 160 L-60 160 L-160 260 L-140 160 L-260 160 Q-300 160 -300 120Z" fill="#fff"/>
  ${[0,1,2].map(k=>`<rect x="-230" y="${-150+k*80}" width="${[400,460,300][k]}" height="30" rx="15" fill="#e5e7eb" stroke="none" style="transform-box:fill-box;transform-origin:left" data-grow="@commenti,0.4"/>`).join('')}</g></g></g>
 ${pop('@commenti',hl(1330,700,'SCRIVILI NEI COMMENTI',60,RED,'#fff'))}</g>
 <g data-fade="@Made,0.3" style="opacity:0">${pop('@Made',`<rect x="390" y="700" width="300" height="300" fill="${INK}"/><text x="540" y="917" text-anchor="middle" ${F('Anton')} font-size="186" fill="#fff">MN<tspan fill="${RED}">.</tspan></text>`,0.5)}
 <g data-rise="@News,0.5"><text x="540" y="1170" text-anchor="middle" ${F('Inter Tight')} font-size="96" font-weight="900" fill="${INK}" letter-spacing="-4">madeinnews<tspan fill="${RED}">.</tspan></text></g>
 <g data-rise="@pillola,0.5">${hand(540,1280,'una pillola di sapere al giorno',62)}</g></g>`)}];
const still=process.argv[3]=='still';
fs.writeFileSync(process.argv[2],JSON.stringify({voiceId:"GOAZNavLupajyL3YafaD",title:["Segreti mappa GTA"],logo:'plain',bg:'#f6efe2',light:true,accent:RED,pad:0,scenes:SCN.map((s,i)=>still?{voice:V[i],cam:s.cam,html:s.html.replace(/data-off="@[^"]*"/g,'data-off="2.5"').replace(/data-fade="@[^"]*,/g,'data-fade="2.6,').replace(/data-flash="@[^"]*,/g,'data-flash="99,').replace(/@[^,"'\s]+(?=[,"'])/g,'0.2'),dur:5,words:[]}:{voice:V[i],cam:s.cam,html:s.html})},null,1));console.log('ok');

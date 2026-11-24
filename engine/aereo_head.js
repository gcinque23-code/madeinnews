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

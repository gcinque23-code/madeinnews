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
module.exports=defs+`<rect width="1080" height="1920" fill="#f6efe2"/><rect width="1080" height="1920" filter="url(#paper)"/>
<text x="540" y="400" text-anchor="middle" ${F('Gochi Hand')} font-size="62" fill="${INK}">Sapevi che in GTA 6 ci sono altri…</text>
<g class="bx"><rect x="0" y="430" width="1080" height="150" fill="none"/><text x="540" y="560" text-anchor="middle" ${F('Luckiest Guy')} font-size="120" fill="${INK}">4 COMANDI</text></g>
<g filter="url(#wob)"><g class="bx"><rect x="130" y="590" width="820" height="135" rx="12" fill="${YEL}"/><text x="540" y="690" text-anchor="middle" ${F('Luckiest Guy')} font-size="76" fill="${INK}">SEGRETI? (PARTE 2)</text></g></g>
${controller(540,1130,1.1,{})}
${['tri','cir','squ','cro','l3','r3'].map(k=>`<circle cx="${540+BTN[k][0]*1.1}" cy="${1130+BTN[k][1]*1.1}" r="${k[1]=='3'?62:44}" fill="${YEL}" opacity=".7" stroke="${INK}" stroke-width="6"/>`).filter((_,i)=>i==0||i==1||i==5).join('')}
<text x="910" y="880" text-anchor="middle" ${F('Luckiest Guy')} font-size="140" fill="${RED}" stroke="${INK}" stroke-width="7" paint-order="stroke">?!</text>
<g transform="translate(540,1590)"><rect x="-150" y="-24" width="70" height="48" fill="${INK}"/><text x="-115" y="14" text-anchor="middle" ${F('Anton')} font-size="34" fill="#fff">MN<tspan fill="${RED}">.</tspan></text><text x="-66" y="13" ${F('Inter Tight')} font-weight="900" font-size="38" fill="${INK}" letter-spacing="-1.5">madeinnews<tspan fill="${RED}">.</tspan></text></g>`;

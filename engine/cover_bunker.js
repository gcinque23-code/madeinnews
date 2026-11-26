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
module.exports=defs+`<rect width="1080" height="1920" fill="#f6efe2"/><rect width="1080" height="1920" filter="url(#paper)"/>
<text x="540" y="400" text-anchor="middle" ${F('Gochi Hand')} font-size="66" fill="${INK}">Sapevi che in GTA 6…</text>
<g class="bx"><rect x="0" y="430" width="1080" height="140" fill="none"/><text x="540" y="580" text-anchor="middle" ${F('Luckiest Guy')} font-size="92" fill="${INK}">SOTTO LA ROULOTTE</text></g>
<g filter="url(#wob)"><g class="bx"><rect x="160" y="585" width="760" height="125" rx="12" fill="${YEL}"/><text x="540" y="715" text-anchor="middle" ${F('Luckiest Guy')} font-size="74" fill="${INK}">C'È UN BUNKER?</text></g></g>
<g filter="url(#wob)" ${W}><rect x="60" y="1170" width="960" height="380" rx="20" fill="${DIRT}"/><rect x="510" y="1170" width="60" height="120" fill="#2b2d42"/><rect x="200" y="1280" width="680" height="240" rx="16" fill="#2b2d42"/></g>
<rect x="220" y="1300" width="640" height="200" rx="12" fill="${YEL}" opacity=".22"/>
${trailer(540,1080,0.95)}${launcher(540,1400,0.85,-4)}
<text x="900" y="900" text-anchor="middle" ${F('Luckiest Guy')} font-size="140" fill="${RED}" stroke="${INK}" stroke-width="7" paint-order="stroke">?!</text>
<g transform="translate(540,1610)"><rect x="-150" y="-24" width="70" height="48" fill="${INK}"/><text x="-115" y="14" text-anchor="middle" ${F('Anton')} font-size="34" fill="#fff">MN<tspan fill="${RED}">.</tspan></text><text x="-66" y="13" ${F('Inter Tight')} font-weight="900" font-size="38" fill="${INK}" letter-spacing="-1.5">madeinnews<tspan fill="${RED}">.</tspan></text></g>`;

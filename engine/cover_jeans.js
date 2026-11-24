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
const W='stroke="'+INK+'" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"';
const DEN='#3f6fb5',DEN2='#2f5592',STI='#f2b134',GOLD='#d9a521';
const jeans=(x,y,s,hl=false,t='0')=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}>
 <path d="M-260 -300 L260 -300 L290 420 L60 420 L0 -40 L-60 420 L-290 420Z" fill="${DEN}"/>
 <rect x="-260" y="-340" width="520" height="60" fill="${DEN2}"/>${[-200,-90,90,200].map(a=>`<rect x="${a-10}" y="-345" width="20" height="70" fill="${DEN2}"/>`).join('')}
 <circle cx="0" cy="-310" r="16" fill="${GOLD}"/><path d="M0 -280 L0 -60" fill="none" stroke="${STI}" stroke-width="5" stroke-dasharray="12 8"/>
 <path d="M-250 -280 Q-150 -160 -60 -280" fill="none" stroke="${STI}" stroke-width="6" stroke-dasharray="12 8"/><path d="M250 -280 Q150 -160 60 -280" fill="none" stroke="${STI}" stroke-width="6" stroke-dasharray="12 8"/>
 <g ${hl?`data-sc="${t},0.01,1,1,${t},0.4,1,1.25"`:''} style="transform-box:fill-box;transform-origin:center"><rect x="120" y="-262" width="90" height="80" rx="6" fill="${hl?YEL:DEN2}" stroke-width="8"/><path d="M128 -254 L202 -254" stroke="${STI}" stroke-width="5" stroke-dasharray="10 7" fill="none"/></g>
 <circle cx="-250" cy="-270" r="10" fill="${GOLD}"/><circle cx="250" cy="-270" r="10" fill="${GOLD}"/></g>`;
const watch=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><path d="M0 -330 Q-60 -260 0 -150" fill="none" stroke="${GOLD}" stroke-width="10"/>
 <circle cx="0" cy="-140" r="24" fill="${GOLD}"/><circle r="130" fill="${GOLD}"/><circle r="108" fill="#fffaf0"/>${[...Array(12)].map((_,k)=>`<line x1="0" y1="-92" x2="0" y2="-80" transform="rotate(${k*30})" stroke-width="7"/>`).join('')}
 <g data-spin="40"><line x1="0" y1="0" x2="0" y2="-70" stroke-width="8"/></g><line x1="0" y1="0" x2="45" y2="0" stroke-width="10"/><circle r="10" fill="${INK}"/></g>`;
const coin=(x,y,r)=>`<g filter="url(#wob)"><circle cx="${x}" cy="${y}" r="${r}" fill="${GOLD}" stroke="${INK}" stroke-width="7"/><circle cx="${x}" cy="${y}" r="${r*0.7}" fill="none" stroke="#b8860b" stroke-width="5"/><text x="${x}" y="${y+r*0.35}" text-anchor="middle" ${F('Luckiest Guy')} font-size="${r}" fill="#b8860b">€</text></g>`;
const doc=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><rect x="-230" y="-300" width="460" height="600" rx="12" fill="#fffaf0"/>
 <text x="0" y="-210" text-anchor="middle" ${F('Luckiest Guy')} font-size="62" fill="${INK}" stroke="none">BREVETTO</text>${[...Array(6)].map((_,k)=>`<line x1="-170" y1="${-130+k*40}" x2="${130-(k%3)*40}" y2="${-130+k*40}" stroke="#d6c9a8" stroke-width="10"/>`).join('')}
 <circle cx="140" cy="200" r="64" fill="${RED}"/><circle cx="140" cy="200" r="44" fill="none" stroke="#fff" stroke-width="5"/></g>`;
const rivet=(x,y,t)=>`<g data-stamp="${t}" ${C}><circle cx="${x}" cy="${y}" r="36" fill="${GOLD}" stroke="${INK}" stroke-width="8"/><circle cx="${x-10}" cy="${y-10}" r="10" fill="#fff3c4"/></g>`;
const hat=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><path d="M-200 40 Q0 90 200 40 Q170 10 110 10 L90 -90 Q0 -130 -90 -90 L-110 10 Q-170 10 -200 40Z" fill="#a0612f"/><path d="M-100 -10 Q0 10 100 -10" fill="none" stroke="#5b3218" stroke-width="16"/></g>`;
const pick=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><rect x="-14" y="-40" width="28" height="300" rx="10" fill="#a0612f"/><path d="M-200 -40 Q0 -140 200 -40 Q0 -90 -200 -40Z" fill="#9aa3ad"/></g>`;
const wrench=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s}) rotate(35)" filter="url(#wob)" ${W}><rect x="-20" y="-60" width="40" height="260" rx="14" fill="#9aa3ad"/><path d="M-70 -90 a70 70 0 1 1 140 0 l-40 0 l0 -40 l-60 0 l0 40z" fill="#9aa3ad"/></g>`;
const wrist=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><path d="M-300 60 L200 60 Q260 60 260 0 Q260 -60 200 -60 L-300 -60Z" fill="#f3c9a0"/><rect x="-90" y="-80" width="70" height="160" rx="12" fill="${INK}"/><circle cx="-55" cy="0" r="68" fill="#d9dde3"/><circle cx="-55" cy="0" r="50" fill="#fff"/><line x1="-55" y1="0" x2="-55" y2="-34" stroke-width="7"/><line x1="-55" y1="0" x2="-28" y2="0" stroke-width="7"/></g>`;

module.exports=defs+`<rect width="1080" height="1920" fill="#f6efe2"/><rect width="1080" height="1920" filter="url(#paper)"/>
<text x="540" y="430" text-anchor="middle" ${F('Gochi Hand')} font-size="66" fill="${INK}">Perché...</text>
<g class="bx"><rect x="0" y="460" width="1080" height="140" fill="none"/><text x="540" y="580" text-anchor="middle" ${F('Luckiest Guy')} font-size="104" fill="${INK}">I JEANS HANNO</text></g>
<g filter="url(#wob)"><g class="bx"><rect x="150" y="620" width="780" height="125" rx="12" fill="${YEL}"/><text x="540" y="715" text-anchor="middle" ${F('Luckiest Guy')} font-size="84" fill="${INK}">QUEL TASCHINO?</text></g></g>
${jeans(540,1120,0.75,true)}<g filter="url(#wob)"><circle cx="664" cy="954" r="72" fill="none" stroke="${RED}" stroke-width="10"/></g>
<g transform="translate(540,1590)"><rect x="-150" y="-24" width="70" height="48" fill="${INK}"/><text x="-115" y="14" text-anchor="middle" ${F('Anton')} font-size="34" fill="#fff">MN<tspan fill="${RED}">.</tspan></text><text x="-66" y="13" ${F('Inter Tight')} font-weight="900" font-size="38" fill="${INK}" letter-spacing="-1.5">madeinnews<tspan fill="${RED}">.</tspan></text></g>`;

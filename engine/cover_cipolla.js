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

module.exports=defs+`<rect width="1080" height="1920" fill="#f6efe2"/><rect width="1080" height="1920" filter="url(#paper)"/>
<text x="540" y="430" text-anchor="middle" ${F('Gochi Hand')} font-size="66" fill="${INK}">Perché...</text>
<g class="bx"><rect x="0" y="460" width="1080" height="140" fill="none"/><text x="540" y="580" text-anchor="middle" ${F('Luckiest Guy')} font-size="104" fill="${INK}">LA CIPOLLA</text></g>
<g filter="url(#wob)"><g class="bx"><rect x="150" y="620" width="780" height="125" rx="12" fill="${YEL}"/><text x="540" y="715" text-anchor="middle" ${F('Luckiest Guy')} font-size="80" fill="${INK}">FA PIANGERE?</text></g></g>
${onion(540,1180,1.05)}
${[[420,1360],[660,1360]].map(([x,y])=>`<path d="M${x} ${y-40} Q${x+28} ${y} ${x} ${y+20} Q${x-28} ${y} ${x} ${y-40}Z" fill="#8fd3ff" stroke="${INK}" stroke-width="6"/>`).join('')}
<g transform="translate(540,1590)"><rect x="-150" y="-24" width="70" height="48" fill="${INK}"/><text x="-115" y="14" text-anchor="middle" ${F('Anton')} font-size="34" fill="#fff">MN<tspan fill="${RED}">.</tspan></text><text x="-66" y="13" ${F('Inter Tight')} font-weight="900" font-size="38" fill="${INK}" letter-spacing="-1.5">madeinnews<tspan fill="${RED}">.</tspan></text></g>`;

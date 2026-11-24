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
const M=JSON.parse(fs.readFileSync(__dirname+'/assets/atlantico.json','utf8'));
const W='stroke="'+INK+'" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"';
const car=(x,y,s,col=RED,flip=false)=>`<g transform="translate(${x},${y}) scale(${flip?s:-s},${s})" filter="url(#wob)" ${W}>
 <ellipse cx="0" cy="78" rx="220" ry="14" fill="${INK}" opacity=".15" stroke="none"/>
 <path d="M-210 40 L-210 -2 Q-205 -38 -150 -44 L-110 -50 L-62 -96 Q-46 -106 -18 -106 L58 -106 Q84 -106 100 -92 L146 -50 L196 -42 Q216 -36 216 0 L216 40 Z" fill="${col}"/>
 <path d="M-94 -52 L-54 -90 L2 -90 L2 -52Z M14 -90 L56 -90 Q72 -90 84 -80 L116 -52 L14 -52Z" fill="#bfe6ff"/>
 <circle cx="-122" cy="48" r="44" fill="#3a3a44"/><circle cx="-122" cy="48" r="18" fill="#ddd"/><circle cx="132" cy="48" r="44" fill="#3a3a44"/><circle cx="132" cy="48" r="18" fill="#ddd"/>
 <rect x="198" y="-30" width="18" height="18" rx="4" fill="#ff8a8a"/><rect x="-210" y="-26" width="14" height="18" rx="4" fill="${YEL}"/></g>`;
const police=(x,y,s,t0)=>`<g transform="translate(${x},${y}) scale(${-s},${s})"><g filter="url(#wob)" ${W}>
 <path d="M-210 40 L-210 -2 Q-205 -38 -150 -44 L-110 -50 L-62 -96 Q-46 -106 -18 -106 L58 -106 Q84 -106 100 -92 L146 -50 L196 -42 Q216 -36 216 0 L216 40 Z" fill="#fff"/>
 <path d="M-210 10 L216 10 L216 40 L-210 40Z" fill="#2b2d42"/><path d="M-94 -52 L-54 -90 L2 -90 L2 -52Z M14 -90 L56 -90 Q72 -90 84 -80 L116 -52 L14 -52Z" fill="#bfe6ff"/>
 <circle cx="-122" cy="48" r="44" fill="#3a3a44"/><circle cx="-122" cy="48" r="18" fill="#ddd"/><circle cx="132" cy="48" r="44" fill="#3a3a44"/><circle cx="132" cy="48" r="18" fill="#ddd"/>
 <rect x="-40" y="-130" width="40" height="26" rx="8" fill="${RED}"/><rect x="2" y="-130" width="40" height="26" rx="8" fill="#3a86ff"/></g>
 <g data-flash="${t0},0.2,0"><circle cx="-20" cy="-118" r="44" fill="${RED}" opacity=".35"/></g><g data-flash="${t0+0.2},0.2,0"><circle cx="22" cy="-118" r="44" fill="#3a86ff" opacity=".35"/></g></g>`;
const road=(y)=>`<g filter="url(#wob)" ${W}><path d="M-20 ${y} L1100 ${y}" fill="none"/></g><g data-loop="-240,0,0.3">${[...Array(7)].map((_,k)=>`<rect x="${k*240}" y="${y+40}" width="120" height="12" rx="6" fill="${INK}" opacity=".35"/>`).join('')}</g>`;
const cuffs=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}>
 <path d="M-130 -70 a80 80 0 1 0 0.1 0z" fill="none" stroke-width="26" stroke="#9aa3ad"/><path d="M-130 -70 a80 80 0 1 0 0.1 0z" fill="none"/>
 <path d="M130 -70 a80 80 0 1 0 0.1 0z" fill="none" stroke-width="26" stroke="#9aa3ad"/><path d="M130 -70 a80 80 0 1 0 0.1 0z" fill="none"/>
 <rect x="-150" y="-100" width="40" height="40" rx="8" fill="#c7cdd4"/><rect x="110" y="-100" width="40" height="40" rx="8" fill="#c7cdd4"/>
 ${[-60,-20,20,60].map(cx=>`<ellipse cx="${cx}" cy="-80" rx="22" ry="13" fill="none" stroke-width="8"/>`).join('')}</g>`;
const book=(x,y,s,t1,t2)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><rect x="-170" y="-210" width="340" height="420" rx="16" fill="#9d2235"/><rect x="-170" y="-210" width="44" height="420" rx="12" fill="#6e1424"/><rect x="-100" y="-160" width="230" height="320" rx="8" fill="none" stroke="${YEL}" stroke-width="7"/>
 <text x="15" y="-60" text-anchor="middle" ${F('Luckiest Guy')} font-size="44" fill="${YEL}" stroke="none">${t1}</text><text x="15" y="-5" text-anchor="middle" ${F('Luckiest Guy')} font-size="44" fill="${YEL}" stroke="none">${t2}</text><text x="15" y="100" text-anchor="middle" ${F('Luckiest Guy')} font-size="80" fill="${YEL}" stroke="none">USA</text></g>`;
const palm=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><path d="M0 0 Q-16 -170 10 -340" fill="none" stroke="#8a5a2b" stroke-width="22"/>${[-150,-100,-50,0,50,100,150].map(a=>`<path d="M10 -340 q${Math.cos(a*Math.PI/180)*100} ${-30+Math.abs(a)*0.5} ${Math.cos(a*Math.PI/180)*190} ${50+Math.abs(a)*0.8}" fill="none" stroke="#3f8f4f" stroke-width="20"/>`).join('')}</g>`;
const crt=(inner,q)=>`<defs><clipPath id="cl${q}"><rect x="170" y="660" width="740" height="540" rx="30"/></clipPath></defs>
 <g filter="url(#wob)" ${W}><rect x="390" y="1330" width="300" height="80" fill="#cfc6b2"/><rect x="260" y="1400" width="560" height="44" rx="14" fill="#e6dfcf"/><rect x="100" y="590" width="880" height="760" rx="56" fill="#ebe4d3"/><rect x="150" y="640" width="780" height="580" rx="40" fill="#2b2b33"/></g>
 <g clip-path="url(#cl${q})"><rect x="170" y="660" width="740" height="540" fill="#1d2b22"/>${inner}</g><circle cx="880" cy="1290" r="14" fill="#7bd389" stroke="${INK}" stroke-width="5"/>`;
const city=()=>{let b='';for(const x of [170,410,650,890])for(const y of [660,850,1040])b+=`<rect x="${x+24}" y="${y+24}" width="190" height="140" rx="10" fill="#4a5a52"/>`;b+=[825,1015].map(y=>`<rect x="170" y="${y}" width="740" height="50" fill="#121a15"/>`).join('')+[380,620,860].map(x=>`<rect x="${x}" y="660" width="50" height="540" fill="#121a15"/>`).join('');return b};
const chase=(dur)=>`<g data-mv="0,${dur},160,1040,980,1040"><rect x="-26" y="-14" width="52" height="28" rx="8" fill="${RED}"/></g><g data-mv="0,${dur},0,1040,820,1040"><rect x="-26" y="-14" width="52" height="28" rx="8" fill="#fff"/><g data-flash="0,0.15,0.2"><rect x="-6" y="-12" width="12" height="10" fill="${RED}"/></g><g data-flash="0.15,0.15,0.2"><rect x="-6" y="2" width="12" height="10" fill="#3a86ff"/></g></g>`;
const box=(x,y,w,h,f,t,size,col,font='Luckiest Guy')=>`<g class="bx"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${f}" stroke="${INK}" stroke-width="6"/><text x="${x+w/2}" y="${y+h*0.72}" text-anchor="middle" ${F(font)} font-size="${size}" fill="${col}">${t}</text></g>`;

// sfondi disegnati
const sky=(c1,c2)=>`<defs><linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect x="0" y="780" width="1080" height="560" fill="url(#skyG)"/>`;
const bld=(x,w,h,col,base=1330)=>`<g filter="url(#wob)" ${W}><rect x="${x}" y="${base-h}" width="${w}" height="${h}" fill="${col}"/>${[...Array(Math.floor((h-40)/70))].map((_,r)=>[...Array(Math.floor((w-30)/60))].map((_,c)=>`<rect x="${x+22+c*60}" y="${base-h+28+r*70}" width="30" height="38" fill="${(r+c+x)%3?'#fff4c2':'#c9d6e3'}" stroke-width="5"/>`).join('')).join('')}</g>`;
const city2=()=>`${sky('#cfe6f5','#f6efe2')}<g data-loop="-1080,0,9">${[0,1].map(k=>`<g transform="translate(${k*1080},0)">${bld(20,180,380,'#f2c6a0')}${bld(220,150,300,'#a8c7e6')}${bld(390,200,440,'#f3e1a1')}${bld(610,160,330,'#c7e3c0')}${bld(790,230,400,'#e8b4b8')}</g>`).join('')}</g>`;
const cloud=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><path d="M-120 30 a50 50 0 0 1 40 -70 a70 70 0 0 1 130 -10 a50 50 0 0 1 70 60 a40 40 0 0 1 -10 20 Z" fill="#fff"/></g>`;
const phone=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" ${W}><rect x="-230" y="-430" width="460" height="860" rx="60" fill="${INK}"/><rect x="-200" y="-390" width="400" height="780" rx="36" fill="#fffaf0"/>
 <circle cx="-110" cy="-260" r="70" fill="${INK}"/><text x="-110" y="-235" text-anchor="middle" ${F('Anton')} font-size="62" fill="#fff" stroke="none">MN<tspan fill="${RED}">.</tspan></text>
 <text x="-30" y="-270" ${F('Inter Tight')} font-weight="900" font-size="27" fill="${INK}" stroke="none">madeinnews.it</text><text x="-30" y="-230" ${F('Gochi Hand')} font-size="28" fill="#666" stroke="none">pillole di sapere</text>
 ${[0,1,2].map(r=>[0,1,2].map(c=>`<rect x="${-180+c*124}" y="${-140+r*170}" width="110" height="155" rx="8" fill="${['#ffd23f','#a8c7e6','#f2c6a0','#c7e3c0','#e8b4b8','#f3e1a1'][(r*3+c)%6]}" stroke-width="5"/>`).join('')).join('')}</g>`;

module.exports=defs+`<rect width="1080" height="1920" fill="#f6efe2"/><rect width="1080" height="1920" filter="url(#paper)"/>
<text x="540" y="430" text-anchor="middle" ${F('Gochi Hand')} font-size="66" fill="${INK}">Perché...</text>
<g class="bx"><rect x="0" y="460" width="1080" height="140" fill="none"/><text x="540" y="580" text-anchor="middle" ${F('Luckiest Guy')} font-size="110" fill="${INK}">SI CHIAMA</text></g>
<g filter="url(#wob)"><g class="bx"><rect x="330" y="610" width="420" height="170" rx="14" fill="${YEL}"/><text x="540" y="740" text-anchor="middle" ${F('Luckiest Guy')} font-size="140" fill="${INK}">GTA?</text></g></g>
<g transform="translate(0,40)">${sky('#cfe6f5','#f6efe2')}${[0].map(k=>`${bld(20,180,380,'#f2c6a0')}${bld(220,150,300,'#a8c7e6')}${bld(390,200,440,'#f3e1a1')}${bld(610,160,330,'#c7e3c0')}${bld(790,230,400,'#e8b4b8')}`).join('')}${road(1330)}${police(290,1265,0.8,0)}${car(730,1265,0.85)}</g>
${tagAt(540,1440,560,'LA RISPOSTA È UN REATO',50,RED,'#fff')}
<g transform="translate(540,1590)"><rect x="-150" y="-24" width="70" height="48" fill="${INK}"/><text x="-115" y="14" text-anchor="middle" ${F('Anton')} font-size="34" fill="#fff">MN<tspan fill="${RED}">.</tspan></text><text x="-66" y="13" ${F('Inter Tight')} font-weight="900" font-size="38" fill="${INK}" letter-spacing="-1.5">madeinnews<tspan fill="${RED}">.</tspan></text></g>`;

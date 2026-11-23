const rnd=k=>{const x=Math.sin(k*999.7)*43758.5;return x-Math.floor(x)};
const F=(f)=>`style="font-family:'${f}'"`;
const defs=`<defs><filter id="wob" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="5"/></filter>
<filter id="wob2" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="5"/><feDisplacementMap in="SourceGraphic" scale="7"/></filter>
<filter id="paper"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="8"/><feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.38  0 0 0 0 0.28  0 0 0 0.07 0"/></filter>
<filter id="chalk"><feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="2"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.10 0"/></filter>
<filter id="water"><feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="4"/><feDisplacementMap in="SourceGraphic" scale="40"/><feGaussianBlur stdDeviation="2"/></filter></defs>`;
// microonde disegnato: colori parametrici
const mw=(ink,body,screen,food,btn,fill=true,sw=9)=>`<g transform="translate(540,1180)" filter="url(#wob)" stroke="${ink}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round" fill="none">
 <rect x="-330" y="-210" width="660" height="420" rx="34" ${fill?`fill="${body}"`:''}/><rect x="-285" y="-165" width="430" height="330" rx="20" ${fill?`fill="${screen}"`:''}/>
 <ellipse cx="-70" cy="105" rx="150" ry="26" ${fill?`fill="#d8d2c6"`:''}/><path d="M-145 78 q75 -110 150 0z" ${fill?`fill="${food}"`:''}/>
 ${[-120,-70,-20].map(x=>`<path d="M${x} 20 q-16 -30 0 -60 q16 -30 0 -60" stroke="${fill?'#fff':ink}"/>`).join('')}
 <rect x="190" y="-155" width="105" height="44" rx="8" ${fill?`fill="${btn}"`:''}/><circle cx="242" cy="0" r="36" ${fill?`fill="${body}"`:''}/><circle cx="242" cy="110" r="36" ${fill?`fill="${body}"`:''}/>
 <path d="M-330 240 L330 240" stroke-width="${sw-2}"/></g>`;
const logo=(bgc,fg)=>`<g transform="translate(540,1590)"><rect x="-175" y="-38" width="350" height="76" rx="38" fill="${bgc}"/><rect x="-150" y="-24" width="70" height="48" fill="${fg}"/><text x="-115" y="14" text-anchor="middle" ${F('Anton')} font-size="34" fill="${bgc}">MN.</text><text x="-66" y="13" ${F('Inter Tight')} font-weight="900" font-size="38" fill="${fg}" letter-spacing="-1.5">madeinnews.</text></g>`;
const bxT=(x,y,w,h,fillr,t,font,size,col,rx=12,extra='')=>`<g class="bx" ${extra}><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fillr}"/><text x="540" y="${y+h*0.72}" text-anchor="middle" ${F(font)} font-size="${size}" fill="${col}">${t}</text></g>`;
const S={
A:`<rect width="1080" height="1920" fill="#f6efe2"/><rect width="1080" height="1920" filter="url(#paper)"/>
 <text x="540" y="400" text-anchor="middle" ${F('Gochi Hand')} font-size="64" fill="#1b1b1f">Perché...</text>
 ${bxT(0,440,1080,140,'none','IL MICROONDE','Luckiest Guy',118,'#1b1b1f')}
 <g filter="url(#wob)">${bxT(110,610,860,120,'#ffd23f','NON SCALDA IL PIATTO?','Luckiest Guy',84,'#1b1b1f')}</g>
 ${mw('#1b1b1f','#ece7dc','#2b2b33','#f4a261','#7bd389')}${logo('#1b1b1f','#fff')}`,
B:`<rect width="1080" height="1920" fill="#fdfcf7"/>${[...Array(40)].map((_,k)=>`<line x1="0" y1="${120+k*48}" x2="1080" y2="${120+k*48}" stroke="#9cc3e6" stroke-width="2"/>`).join('')}<line x1="120" y1="0" x2="120" y2="1920" stroke="#e76f6f" stroke-width="3"/>
 <text x="540" y="410" text-anchor="middle" ${F('Patrick Hand')} font-size="66" fill="#1d3557">Perché...</text>
 ${bxT(0,440,1080,150,'none','il microonde','Permanent Marker',120,'#1d3557')}
 <g filter="url(#wob)">${bxT(120,620,840,120,'#ff6b6b','non scalda il piatto?','Permanent Marker',76,'#fff',60)}</g>
 ${mw('#1d3557','#f1f1ee','#1d3557','#f4a261','#2a9d8f')}${logo('#1d3557','#fff')}`,
C:`<rect width="1080" height="1920" fill="#22372b"/><rect width="1080" height="1920" filter="url(#chalk)"/><rect x="30" y="30" width="1020" height="1860" fill="none" stroke="#8b5a2b" stroke-width="30"/>
 <text x="540" y="410" text-anchor="middle" ${F('Cabin Sketch')} font-weight="700" font-size="70" fill="#f1f1e6">Perché...</text>
 ${bxT(0,440,1080,150,'none','IL MICROONDE','Cabin Sketch',122,'#fff')}
 <g filter="url(#wob)">${bxT(110,620,860,120,'none','NON SCALDA IL PIATTO?','Cabin Sketch',84,'#ffd166')}</g><path d="M180 760 q360 30 720 0" stroke="#ffd166" stroke-width="8" fill="none" filter="url(#wob)"/>
 ${mw('#f1f1e6','','','','',false,8)}${logo('#f1f1e6','#22372b')}`,
D:`<rect width="1080" height="1920" fill="#ffffff"/><ellipse cx="540" cy="1180" rx="430" ry="330" fill="#ffd6a5" opacity=".55" filter="url(#water)"/><ellipse cx="440" cy="1130" rx="260" ry="200" fill="#a0c4ff" opacity=".4" filter="url(#water)"/>
 <text x="540" y="410" text-anchor="middle" ${F('Caveat Brush')} font-size="76" fill="#333">Perché...</text>
 ${bxT(0,440,1080,150,'none','il microonde','Caveat Brush',140,'#222')}
 ${bxT(110,620,860,120,'none','non scalda il piatto?','Caveat Brush',96,'#e63946')}
 ${mw('#333','#fafafa','#3a3a44','#f4a261','#80ed99',true,7)}${logo('#222','#fff')}`,
E:`<rect width="1080" height="1920" fill="#1f4e8c"/>${[...Array(36)].map((_,k)=>`<line x1="0" y1="${k*54}" x2="1080" y2="${k*54}" stroke="#fff" stroke-opacity=".08"/><line x1="${k*54}" y1="0" x2="${k*54}" y2="1920" stroke="#fff" stroke-opacity=".08"/>`).join('')}
 <text x="540" y="410" text-anchor="middle" ${F('Patrick Hand')} font-size="66" fill="#cfe3ff">PERCHÉ...</text>
 ${bxT(0,440,1080,150,'none','IL MICROONDE','Permanent Marker',118,'#fff')}
 <g filter="url(#wob)">${bxT(110,620,860,120,'none','NON SCALDA IL PIATTO?','Permanent Marker',74,'#ffd166')}</g>
 ${mw('#ffffff','','','','',false,6)}<g stroke="#cfe3ff" stroke-width="3" fill="none" stroke-dasharray="10 8"><line x1="210" y1="1450" x2="870" y2="1450"/></g><text x="540" y="1495" text-anchor="middle" ${F('Patrick Hand')} font-size="40" fill="#cfe3ff">fig. 1 — forno a microonde</text>
 ${logo('#ffffff','#1f4e8c')}`,
F:`<rect width="1080" height="1920" fill="#e9e4da"/><rect width="1080" height="1920" filter="url(#paper)"/>
 <g transform="rotate(0)"><rect x="190" y="300" width="700" height="470" fill="#fff475" filter="url(#wob)"/><rect x="460" y="280" width="160" height="50" fill="#d9d2c3" opacity=".8"/></g>
 <text x="540" y="420" text-anchor="middle" ${F('Patrick Hand')} font-size="64" fill="#333">Perché...</text>
 ${bxT(190,450,700,140,'none','IL MICROONDE','Luckiest Guy',96,'#222')}
 ${bxT(190,600,700,130,'none','non scalda il piatto?','Caveat Brush',90,'#d62828')}
 ${mw('#222','#f7f3ea','#2b2b33','#f4a261','#7bd389')}${logo('#222','#fff')}`};
for(const k in S)S[k]=defs+S[k];module.exports=S;

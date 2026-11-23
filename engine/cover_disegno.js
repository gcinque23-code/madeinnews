// Stile "disegno a mano" — prova
const rnd=k=>{const x=Math.sin(k*999.7)*43758.5;return x-Math.floor(x)};
const INK='#1b1b1f', RED='#e63946';
const defs=`<defs>
<filter id="wob" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="5"/></filter>
<filter id="paper"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="8"/><feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.38  0 0 0 0 0.28  0 0 0 0.07 0"/></filter>
</defs>`;
const bg=`<rect width="1080" height="1920" fill="#f6efe2"/><rect width="1080" height="1920" filter="url(#paper)"/>`;
// scritte
const small=t=>`<text x="540" y="430" text-anchor="middle" style="font-family:'Gochi Hand'" font-size="64" fill="${INK}">${t}</text>`;
const title=(t,size,y=620)=>`<g class="bx"><rect x="0" y="${y-size*0.9}" width="1080" height="${size}" fill="none"/><text x="540" y="${y}" text-anchor="middle" style="font-family:'Luckiest Guy'" font-size="${size}" fill="${INK}" letter-spacing="2">${t}</text></g>`;
const mark=(t,size,y)=>`<g filter="url(#wob)"><g class="bx"><rect x="${540-(t.length*size*0.29+40)}" y="${y-size*0.82}" width="${t.length*size*0.58+80}" height="${size*1.05}" rx="10" fill="#ffd23f"/><text x="540" y="${y}" text-anchor="middle" style="font-family:'Luckiest Guy'" font-size="${size}" fill="${INK}" letter-spacing="2">${t}</text></g></g>`;
// mascotte "Nino": testa tonda, occhi grandi, berretto rosso, felpa gialla
const nino=(x,y,s=1,pose='point')=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" stroke="${INK}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round">
 <path d="M-58 220 L-62 330 L-18 330 L-8 250 L8 250 L18 330 L62 330 L58 220Z" fill="#3d5a80"/>
 <path d="M-70 332 q-6 -26 30 -26 l26 0 l0 26z M70 332 q6 -26 -30 -26 l-26 0 l0 26z" fill="#fff"/>
 <path d="M-92 230 Q-100 120 -80 60 Q-60 28 0 28 Q60 28 80 60 Q100 120 92 230Z" fill="#ffd23f"/>
 <path d="M-40 150 L40 150 L34 196 L-34 196Z" fill="#f4c430"/>
 <path d="M-24 34 L-20 90 M24 34 L20 90" fill="none"/>
 ${pose=='point'?`<path d="M74 66 Q140 30 160 -30 L188 -20 Q170 50 96 104Z" fill="#ffd23f"/><circle cx="176" cy="-38" r="20" fill="#ffe0c2"/>`:`<path d="M80 70 Q130 120 138 190 L108 196 Q102 140 84 120Z" fill="#ffd23f"/><circle cx="124" cy="204" r="19" fill="#ffe0c2"/>`}
 <path d="M-80 70 Q-130 120 -138 190 L-108 196 Q-102 140 -84 120Z" fill="#ffd23f"/><circle cx="-124" cy="204" r="19" fill="#ffe0c2"/>
 <circle cx="0" cy="-60" r="95" fill="#ffe0c2"/>
 <path d="M-100 -70 Q-96 -172 0 -174 Q96 -172 100 -70 Q60 -96 0 -96 Q-60 -96 -100 -70Z" fill="${RED}"/><path d="M-104 -66 Q0 -104 104 -66 L100 -46 Q0 -80 -100 -46Z" fill="#c1121f"/><circle cx="0" cy="-182" r="20" fill="${RED}"/>
 <ellipse cx="-34" cy="-36" rx="17" ry="23" fill="#fff"/><ellipse cx="34" cy="-36" rx="17" ry="23" fill="#fff"/><circle cx="-30" cy="-31" r="9" fill="${INK}" stroke="none"/><circle cx="38" cy="-31" r="9" fill="${INK}" stroke="none"/>
 <path d="M-22 6 q22 20 44 0" fill="none"/><circle cx="-62" cy="0" r="12" fill="#ff9aa2" stroke="none" opacity=".7"/><circle cx="62" cy="0" r="12" fill="#ff9aa2" stroke="none" opacity=".7"/>
</g>`;
const car=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" stroke="${INK}" stroke-width="8" stroke-linejoin="round">
 <path d="M-210 40 L-210 -5 Q-205 -38 -150 -44 L-92 -50 L-42 -96 Q-26 -106 2 -106 L72 -106 Q98 -106 114 -90 L152 -50 L192 -42 Q214 -36 214 -2 L214 40 Z" fill="${RED}"/>
 <path d="M-74 -52 L-34 -90 L22 -90 L22 -52Z M34 -90 L70 -90 Q86 -90 97 -80 L124 -52 L34 -52Z" fill="#bfe6ff"/>
 <circle cx="-122" cy="48" r="44" fill="#3a3a44"/><circle cx="-122" cy="48" r="18" fill="#ddd"/><circle cx="132" cy="48" r="44" fill="#3a3a44"/><circle cx="132" cy="48" r="18" fill="#ddd"/>
 <path d="M-250 70 L260 70" fill="none"/><path d="M-300 -30 l-50 0 M-290 0 l-70 0 M-300 30 l-45 0" fill="none" opacity=".6"/></g>`;
const mw=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#wob)" stroke="${INK}" stroke-width="8" stroke-linejoin="round" stroke-linecap="round">
 <rect x="-300" y="-190" width="600" height="380" rx="30" fill="#e9e5dc"/><rect x="-255" y="-145" width="390" height="290" rx="18" fill="#2b2b33"/>
 <ellipse cx="-60" cy="95" rx="140" ry="24" fill="#cfcac0"/><path d="M-130 70 q70 -100 140 0z" fill="#f4a261"/>
 ${[-110,-60,-10].map(x=>`<path d="M${x} 20 q-16 -30 0 -60 q16 -30 0 -60" fill="none" stroke="#fff"/>`).join('')}
 <rect x="175" y="-140" width="95" height="40" rx="8" fill="#7bd389"/><circle cx="222" cy="0" r="32" fill="#cfcac0"/><circle cx="222" cy="100" r="32" fill="#cfcac0"/></g>`;
const logo=`<g transform="translate(540,1590)"><rect x="-175" y="-38" width="350" height="76" rx="38" fill="${INK}"/><rect x="-150" y="-24" width="70" height="48" fill="#fff"/><text x="-115" y="14" text-anchor="middle" font-family="Anton" font-size="34" fill="#000">MN.</text><text x="-66" y="13" font-family="Inter Tight" font-weight="900" font-size="38" fill="#fff" letter-spacing="-1.5">madeinnews.</text></g>`;
const cover=(t1,t2,size,art)=>defs+bg+small('Perché...')+title(t1,size)+mark(t2,size*0.8,620+size*0.95)+art+logo;
module.exports={
 gta: cover('SI CHIAMA','GTA?',150, car(700,1350,0.95)+nino(270,1150,0.85,'point')),
 micro: cover('IL MICROONDE','NON SCALDA IL PIATTO?',96, mw(690,1310,0.72)+nino(250,1160,0.8,'wave'))};

const d=require('./cover_disegno.js');
const INK='#1b1b1f';
const W=`<defs><filter id="wob" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="5"/></filter><filter id="paper"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="8"/><feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.38  0 0 0 0 0.28  0 0 0 0.07 0"/></filter></defs><rect width="1080" height="1920" fill="#f6efe2"/><rect width="1080" height="1920" filter="url(#paper)"/>`;
const g=(x,inner)=>`<g transform="translate(${x},900)" filter="url(#wob)" stroke="${INK}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round">${inner}</g>`;
// 2: ragazza con occhiali e coda
const lia=`<path d="M-58 220 L-62 330 L-18 330 L-8 250 L8 250 L18 330 L62 330 L58 220Z" fill="#2a9d8f"/><path d="M-70 332 q-6 -26 30 -26 l26 0 l0 26z M70 332 q6 -26 -30 -26 l-26 0 l0 26z" fill="#fff"/>
<path d="M-92 230 Q-100 120 -80 60 Q-60 28 0 28 Q60 28 80 60 Q100 120 92 230Z" fill="#e76f51"/><path d="M-80 70 Q-130 120 -138 190 L-108 196 Q-102 140 -84 120Z M80 70 Q130 120 138 190 L108 196 Q102 140 84 120Z" fill="#e76f51"/><circle cx="-124" cy="204" r="19" fill="#ffe0c2"/><circle cx="124" cy="204" r="19" fill="#ffe0c2"/>
<path d="M60 -120 Q160 -150 150 -40 Q140 20 110 40 Q130 -40 70 -90Z" fill="#6b3e26"/><circle cx="0" cy="-60" r="95" fill="#ffe0c2"/><path d="M-98 -60 Q-100 -165 0 -160 Q100 -165 98 -60 Q60 -120 -10 -110 Q-60 -105 -98 -60Z" fill="#6b3e26"/>
<circle cx="-36" cy="-40" r="26" fill="#fff"/><circle cx="36" cy="-40" r="26" fill="#fff"/><path d="M-10 -40 L10 -40" fill="none"/><circle cx="-32" cy="-36" r="9" fill="${INK}" stroke="none"/><circle cx="40" cy="-36" r="9" fill="${INK}" stroke="none"/><path d="M-22 6 q22 20 44 0" fill="none"/>`;
// 3: lampadina "Lampo"
const lampo=`<path d="M-40 250 L-44 330 M40 250 L44 330" fill="none"/><path d="M-70 332 q0 -20 30 -20 l10 0 l0 20z M70 332 q0 -20 -30 -20 l-10 0 l0 20z" fill="${INK}"/>
<rect x="-60" y="150" width="120" height="100" rx="14" fill="#9aa0a6"/><path d="M-60 180 L60 180 M-60 212 L60 212" fill="none"/>
<path d="M-60 150 Q-150 60 -150 -40 A150 150 0 0 1 150 -40 Q150 60 60 150Z" fill="#ffd23f"/><path d="M-100 -60 a110 110 0 0 1 60 -80" fill="none" stroke="#fff" stroke-width="12"/>
<path d="M-140 0 Q-210 40 -220 110 M140 0 Q210 -60 230 -130" fill="none"/><circle cx="-222" cy="120" r="18" fill="#ffd23f"/><circle cx="234" cy="-140" r="18" fill="#ffd23f"/>
<ellipse cx="-45" cy="-30" rx="20" ry="28" fill="#fff"/><ellipse cx="45" cy="-30" rx="20" ry="28" fill="#fff"/><circle cx="-40" cy="-24" r="10" fill="${INK}" stroke="none"/><circle cx="50" cy="-24" r="10" fill="${INK}" stroke="none"/><path d="M-30 30 q30 28 60 0" fill="none"/>
${[-200,-140,140,200].map((x,i)=>`<path d="M${x*1.1} ${-200+(i%2)*40} l${x>0?20:-20} -30" fill="none"/>`).join('')}`;
const label=(x,t)=>`<text x="${x}" y="1360" text-anchor="middle" style="font-family:'Luckiest Guy'" font-size="70" fill="${INK}">${t}</text>`;
const nino=d.__nino?d.__nino:null;
module.exports=W+`<text x="540" y="330" text-anchor="middle" style="font-family:'Luckiest Guy'" font-size="80" fill="${INK}">QUALE MASCOTTE?</text>`
 +`<g transform="translate(-180,0)">${require('./cover_disegno_nino.js')(360,900,0.75)}</g>`+label(180,'1 · NINO')
 +g(540,`<g transform="scale(.75)">${lia}</g>`)+label(540,'2 · LIA')
 +g(900,`<g transform="scale(.6)">${lampo}</g>`)+label(900,'3 · LAMPO');

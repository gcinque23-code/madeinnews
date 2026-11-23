const INK='#1b1b1f',RED='#e63946',YEL='#ffd23f';const F=f=>`style="font-family:'${f}'"`;
const defs=`<defs><filter id="wob" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="5"/></filter>
<filter id="paper"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="8"/><feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.38  0 0 0 0 0.28  0 0 0 0.07 0"/></filter></defs>`;
const art=`<g transform="translate(517,1180)" filter="url(#wob)" stroke="${INK}" stroke-width="11" stroke-linejoin="round" stroke-linecap="round">
 <!-- cappello -->
 <path d="M-230 -60 Q-240 -300 0 -310 Q240 -300 230 -60 Z" fill="#d62828"/>
 <path d="M-250 -60 Q0 -120 300 -40 Q330 -10 290 10 Q0 -40 -250 0 Q-280 -30 -250 -60Z" fill="#b51f1f"/>
 <path d="M-150 -230 Q-120 -280 -60 -290" stroke="#fff" stroke-width="14" fill="none" opacity=".7"/>
 <circle cx="0" cy="-200" r="62" fill="#fff"/><text x="0" y="-178" text-anchor="middle" ${F('Luckiest Guy')} font-size="80" fill="#d62828" stroke="none">?</text>
 <!-- baffi -->
 <path d="M0 150 Q-40 100 -110 110 Q-200 120 -250 190 Q-180 170 -150 200 Q-110 240 -40 210 Q-10 195 0 175 Q10 195 40 210 Q110 240 150 200 Q180 170 250 190 Q200 120 110 110 Q40 100 0 150Z" fill="#3b2314"/>
 <path d="M-120 150 q30 -10 60 4 M60 154 q30 -14 60 -4" stroke="#6b4a2b" stroke-width="7" fill="none"/>
</g>`;
module.exports=defs+`<rect width="1080" height="1920" fill="#f6efe2"/><rect width="1080" height="1920" filter="url(#paper)"/>
<text x="540" y="430" text-anchor="middle" ${F('Gochi Hand')} font-size="66" fill="${INK}">Perché...</text>
<g class="bx"><rect x="0" y="460" width="1080" height="140" fill="none"/><text x="540" y="580" text-anchor="middle" ${F('Luckiest Guy')} font-size="112" fill="${INK}">SUPER MARIO</text></g>
<g filter="url(#wob)"><g class="bx"><rect x="190" y="620" width="700" height="125" rx="12" fill="${YEL}"/><text x="540" y="715" text-anchor="middle" ${F('Luckiest Guy')} font-size="88" fill="${INK}">HA I BAFFI?</text></g></g>
${art}
<g transform="translate(540,1590)"><rect x="-150" y="-24" width="70" height="48" fill="${INK}"/><text x="-115" y="14" text-anchor="middle" ${F('Anton')} font-size="34" fill="#fff">MN<tspan fill="${RED}">.</tspan></text><text x="-66" y="13" ${F('Inter Tight')} font-weight="900" font-size="38" fill="${INK}" letter-spacing="-1.5">madeinnews<tspan fill="${RED}">.</tspan></text></g>`;

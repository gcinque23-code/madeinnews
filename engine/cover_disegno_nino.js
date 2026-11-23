const INK='#1b1b1f',RED='#e63946';
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

module.exports=(x,y,s)=>nino(x,y,s,'wave');

const fs=require('fs');const A='#F472B6',T='#22D3EE',Y='#FACC15';
const svg=i=>`<svg viewBox="0 0 1080 1100" width="1080" height="1100" style="position:absolute;inset:0;overflow:visible">${i}</svg>`;
const g=(a,i)=>`<g ${a} style="transform-box:fill-box;transform-origin:center">${i}</g>`;
const pad=`<path data-draw="0.1,1.2" d="M300 380 h480 a140 140 0 0 1 140 140 v60 a120 120 0 0 1 -220 66 l-40 -56 h-240 l-40 56 a120 120 0 0 1 -220 -66 v-60 a140 140 0 0 1 140 -140z" fill="#1c1c24" fill-opacity="0" data-fill="1.0,0.4" stroke="${A}" stroke-width="10"/>
 <g data-fade="1.1,0.4"><rect x="330" y="480" width="40" height="120" rx="8" fill="${T}"/><rect x="290" y="520" width="120" height="40" rx="8" fill="${T}"/>${[[720,500,A],[780,550,Y],[660,550,T],[720,600,'#a78bfa']].map(([x,y,c])=>`<circle cx="${x}" cy="${y}" r="26" fill="${c}"/>`).join('')}</g>`;
const scenes=[
{voice:"GTA sei è finalmente uscito: giovedì diciannove novembre, dopo due rinvii.",
 html:svg(`${pad}${g('data-stamp="@diciannove"',`<rect x="250" y="80" width="580" height="170" rx="16" fill="${A}"/><text x="540" y="200" text-anchor="middle" class="anton" font-size="120" fill="#000">19 NOVEMBRE</text>`)}${g('data-rise="@rinvii,0.4"',`<text x="540" y="900" text-anchor="middle" font-size="56" font-weight="900" fill="#fff">DOPO <tspan fill="${A}">2 RINVII</tspan></text>`)}`)},
{voice:"Nelle prime ventiquattro ore ha venduto trentadue milioni e mezzo di copie, secondo Rockstar e Take-Two.",
 html:svg(`${g('data-rise="0.2,0.4"',`<text x="540" y="210" text-anchor="middle" font-size="54" font-weight="900" fill="#bbb">VENDUTE IN 24 ORE</text>`)}
 <text data-count="@trentadue,2.2,32.5" data-dec="1" x="540" y="540" text-anchor="middle" class="anton" font-size="280" fill="${T}">0</text>
 ${g('data-rise="@milioni,0.4"',`<text x="540" y="680" text-anchor="middle" class="anton" font-size="96" fill="#fff" letter-spacing="6">MILIONI DI COPIE</text>`)}
 ${[...Array(12)].map((_,k)=>`<g data-pop="${0.6+k*0.15},0.35"><rect x="${150+(k%6)*135}" y="${790+Math.floor(k/6)*140}" width="100" height="120" rx="10" fill="#1c1c24" stroke="${A}" stroke-width="5"/><text x="${200+(k%6)*135}" y="${865+Math.floor(k/6)*140}" text-anchor="middle" class="anton" font-size="44" fill="${A}">VI</text></g>`).join('')}`)},
{voice:"E ha incassato tre miliardi e settecentonovanta milioni di dollari. In un solo giorno.",
 html:svg(`${[...Array(8)].map((_,k)=>`<g data-drop="${0.3+k*0.18},0.6,-500"><rect x="${300+(k%2)*250}" y="${800-Math.floor(k/2)*90}" width="230" height="80" rx="8" fill="#16a34a" stroke="#0b3d1e" stroke-width="5"/><circle cx="${415+(k%2)*250}" cy="${840-Math.floor(k/2)*90}" r="24" fill="none" stroke="#0b3d1e" stroke-width="5"/></g>`).join('')}
 <text data-count="@tre,2.0,3.79" data-dec="2" data-suf=" MLD" x="540" y="300" text-anchor="middle" class="anton" font-size="220" fill="${Y}">0</text>
 ${g('data-rise="@dollari,0.4"',`<text x="540" y="400" text-anchor="middle" font-size="60" font-weight="900" fill="#fff">DI DOLLARI</text>`)}
 ${g('data-stamp="@giorno"',`<rect x="330" y="900" width="420" height="110" rx="14" fill="${A}"/><text x="540" y="980" text-anchor="middle" class="anton" font-size="76" fill="#000">IN 1 GIORNO</text>`)}`)},
{voice:"È il lancio più grande di sempre per un prodotto di intrattenimento.",
 html:svg(`${g('data-pop="0.2,0.6"',`<path d="M400 260 h280 v120 a140 140 0 0 1 -280 0z" fill="${Y}"/><path d="M400 290 h-70 a70 70 0 0 0 70 110 M680 290 h70 a70 70 0 0 1 -70 110" stroke="${Y}" stroke-width="22" fill="none"/><rect x="510" y="520" width="60" height="110" fill="${Y}"/><rect x="420" y="630" width="240" height="60" rx="10" fill="${Y}"/>`)}
 ${g('data-rise="@sempre,0.4"',`<text x="540" y="840" text-anchor="middle" class="anton" font-size="104" fill="#fff">IL LANCIO PIÙ GRANDE</text><text x="540" y="950" text-anchor="middle" class="anton" font-size="104" fill="${A}">DI SEMPRE</text>`)}`)},
{voice:"E dopo il primo weekend, secondo le stime della società Alinea Analytics, le copie sarebbero già quarantacinque milioni.",
 html:svg(`${g('data-rise="0.2,0.4"',`<text x="540" y="230" text-anchor="middle" font-size="50" font-weight="900" fill="#bbb">DOPO IL PRIMO WEEKEND · STIMA</text>`)}
 <text data-count="@quarantacinque,1.8,45" x="540" y="560" text-anchor="middle" class="anton" font-size="320" fill="${A}">0</text>
 ${g('data-rise="@milioni,0.4"',`<text x="540" y="680" text-anchor="middle" class="anton" font-size="110" fill="#fff">MILIONI DI COPIE</text>`)}
 ${g('data-fade="@alinea,0.4"',`<text x="540" y="820" text-anchor="middle" font-size="40" font-weight="800" fill="#888">Fonte: Alinea Analytics (dato non ufficiale)</text>`)}`)},
{voice:"Per ora è disponibile su PlayStation 5 e Xbox Series. La versione per PC non è ancora stata annunciata.",
 html:svg(`${g('data-pop="@playstation,0.5"',`<rect x="110" y="320" width="380" height="300" rx="24" fill="#1c1c24" stroke="${T}" stroke-width="8"/><text x="300" y="490" text-anchor="middle" class="anton" font-size="96" fill="${T}">PS5</text>`)}
 ${g('data-pop="@xbox,0.5"',`<rect x="590" y="320" width="380" height="300" rx="24" fill="#1c1c24" stroke="#22c55e" stroke-width="8"/><text x="780" y="490" text-anchor="middle" class="anton" font-size="62" fill="#22c55e">XBOX SERIES</text>`)}
 ${g('data-pop="@pc,0.5"',`<rect x="340" y="700" width="400" height="260" rx="24" fill="none" stroke="#666" stroke-width="8" stroke-dasharray="20 14"/><text x="540" y="860" text-anchor="middle" class="anton" font-size="110" fill="#666">PC ?</text>`)}`)},
{voice:"Segui Made in News per non perderti niente, ogni giorno.",
 html:svg(`${g('data-pop="0.2,0.5"',`<rect x="390" y="250" width="300" height="300" fill="#fff"/><text x="540" y="467" text-anchor="middle" class="anton" font-size="186" fill="#000">MN<tspan fill="#E63946">.</tspan></text>`)}${g('data-rise="0.8,0.5"',`<text x="540" y="720" text-anchor="middle" font-size="96" font-weight="900" fill="#fff" letter-spacing="-4">madeinnews<tspan fill="#E63946">.</tspan></text>`)}${g('data-rise="1.2,0.5"',`<text x="540" y="820" text-anchor="middle" font-size="46" font-weight="800" fill="${A}">LE NOTIZIE SPIEGATE, OGNI GIORNO</text>`)}`)}];
fs.writeFileSync('gta.json',JSON.stringify({voiceId:"GOAZNavLupajyL3YafaD",title:["GTA VI, lancio da record"],source:"Fonti: Rockstar Games, Take-Two, Alinea Analytics",accent:A,wordmap:{"sei":"VI","diciannove":"19","ventiquattro":"24","trentadue":"32","tre":"3","settecentonovanta":"790","quarantacinque":"45","due":"2"},scenes},null,1));console.log('ok');

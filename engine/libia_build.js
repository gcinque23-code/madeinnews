const fs=require('fs');const M=JSON.parse(fs.readFileSync('assets/mediterraneo.json'));
const A='#F97316',R='#EF4444';
const svg=(inner)=>`<svg viewBox="0 0 1080 1100" width="1080" height="1100" style="position:absolute;inset:0;overflow:visible">${inner}</svg>`;
const g=(a,i)=>`<g ${a} style="transform-box:fill-box;transform-origin:center">${i}</g>`;
const ox=(1080-M.w)/2, oy=50;
const pt=n=>[M.pts[n][0]+ox,M.pts[n][1]+oy];
const map=(hi,drawFrom=null)=>`<g transform="translate(${ox},${oy})">${Object.entries(M.paths).map(([id,d])=>{const c=hi[id];return `<path d="${d}" fill="${c||'#1e1e24'}" fill-opacity="${c?0:1}" ${c?`data-fill="${drawFrom||0.6},0.6"`:''} stroke="${c?c:'#333'}" stroke-width="${c?3:1.5}" ${c&&drawFrom!==null?`data-draw="${drawFrom-0.6},1.2"`:''}/>`}).join('')}</g>`;
const [bx,by]=pt('bengasi'),[rx,ry]=pt('roma'),[kx,ky]=pt('kiev');
const scenes=[
{voice:"Una nave militare russa è stata colpita a Bengasi, in Libia.",
 html:svg(`${map({'434':'#a3a3a3','804':'#FACC15','380':'#3B82F6'},0.8)}
 ${[0,0.4,0.8].map(d=>`<circle data-ripple="@colpita,1.2" cx="${bx}" cy="${by}" r="10" fill="none" stroke="${R}" stroke-width="8"/>`).join('')}
 ${g(`data-pop="@colpita,0.5"`,`<circle cx="${bx}" cy="${by}" r="26" fill="${R}"/><path d="M${bx} ${by-60} l14 34 l36 -6 l-24 26 l24 26 l-36 -6 l-14 34 l-14 -34 l-36 6 l24 -26 l-24 -26 l36 6z" fill="${A}" opacity=".9"/>`)}
 ${g(`data-rise="@bengasi,0.5"`,`<rect x="${bx-150}" y="${by+50}" width="300" height="70" rx="12" fill="#fff"/><text x="${bx}" y="${by+98}" text-anchor="middle" font-size="40" font-weight="900" fill="#000">BENGASI</text>`)}`)},
{voice:"Secondo i media ucraini, i droni sono partiti da una base nell'ovest della Libia.",
 html:svg(`${map({'434':'#a3a3a3'})}
 <path data-draw="@droni,1.6" d="M${bx-330} ${by+20} Q ${bx-160} ${by-120} ${bx} ${by}" stroke="${A}" stroke-width="8" fill="none" stroke-dasharray="10 0"/>
 ${g(`data-pop="@base,0.5"`,`<circle cx="${bx-330}" cy="${by+20}" r="22" fill="#FACC15"/><text x="${bx-330}" y="${by+90}" text-anchor="middle" font-size="36" font-weight="900" fill="#fff">BASE</text>`)}
 ${g(`data-slide="@droni,1.6,-330"`,`<g transform="translate(${bx-20},${by-40})"><rect x="-40" y="-8" width="80" height="16" rx="8" fill="#fff"/><rect x="-6" y="-40" width="12" height="80" rx="6" fill="#fff"/>${[[-46,-14],[46,-14],[-46,14],[46,14]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="16" fill="none" stroke="#fff" stroke-width="5"/>`).join('')}</g>`)}`)},
{voice:"Il presidente ucraino Zelensky rivendica l'attacco: un'operazione esemplare.",
 html:svg(`${g('data-pop="0.2,0.5"',`<rect x="90" y="250" width="900" height="520" rx="30" fill="#fff"/><rect x="90" y="250" width="900" height="120" rx="30" fill="#FACC15"/><rect x="90" y="330" width="900" height="40" fill="#FACC15"/><rect x="90" y="370" width="900" height="40" fill="#2563EB"/><text x="140" y="330" font-size="56" font-weight="900" fill="#000">ZELENSKY</text>`)}
 ${g('data-rise="@esemplare,0.4"',`<text x="540" y="560" text-anchor="middle" class="anton" font-size="110" fill="#000">“OPERAZIONE</text><text x="540" y="690" text-anchor="middle" class="anton" font-size="110" fill="#2563EB">ESEMPLARE”</text>`)}`)},
{voice:"Da Mosca, il Cremlino dice di prendere atto delle dichiarazioni di Kiev.",
 html:svg(`${g('data-pop="0.2,0.5"',`<rect x="140" y="260" width="800" height="480" rx="30" fill="#1f1f27" stroke="${R}" stroke-width="8"/><text x="540" y="380" text-anchor="middle" font-size="60" font-weight="900" fill="${R}">CREMLINO</text>`)}
 ${g('data-rise="@atto,0.4"',`<text x="540" y="540" text-anchor="middle" font-size="64" font-weight="900" fill="#fff">«Prendiamo atto</text><text x="540" y="630" text-anchor="middle" font-size="64" font-weight="900" fill="#fff">delle dichiarazioni»</text>`)}`)},
{voice:"E l'Italia guarda con preoccupazione. Il ministro Tajani: bisogna evitare una guerra nel Mediterraneo.",
 html:svg(`${map({'380':'#3B82F6','434':'#a3a3a3'},0.3)}
 <line data-draw="@preoccupazione,0.8" x1="${bx}" y1="${by}" x2="${rx}" y2="${ry}" stroke="${A}" stroke-width="6" stroke-dasharray="14 10"/>
 ${g(`data-rise="@tajani,0.4"`,`<rect x="80" y="760" width="920" height="200" rx="20" fill="#fff"/><text x="540" y="840" text-anchor="middle" font-size="44" font-weight="900" fill="#555">TAJANI</text><text x="540" y="915" text-anchor="middle" font-size="46" font-weight="900" fill="#000">«Evitare una guerra nel Mediterraneo»</text>`)}`)},
{voice:"Segui Made in News per capire le notizie, ogni giorno.",
 html:svg(`${g('data-pop="0.2,0.5"',`<rect x="390" y="250" width="300" height="300" fill="#fff"/><text x="540" y="467" text-anchor="middle" class="anton" font-size="186" fill="#000">MN<tspan fill="#E63946">.</tspan></text>`)}${g('data-rise="0.8,0.5"',`<text x="540" y="720" text-anchor="middle" font-size="96" font-weight="900" fill="#fff" letter-spacing="-4">madeinnews<tspan fill="#E63946">.</tspan></text>`)}${g('data-rise="1.2,0.5"',`<text x="540" y="820" text-anchor="middle" font-size="46" font-weight="800" fill="${A}">LE NOTIZIE SPIEGATE, OGNI GIORNO</text>`)}`)}];
fs.writeFileSync('libia.json',JSON.stringify({voiceId:"GOAZNavLupajyL3YafaD",title:["Nave russa colpita in Libia"],source:"Fonte: ANSA",accent:A,scenes},null,1));console.log('ok',scenes.length);

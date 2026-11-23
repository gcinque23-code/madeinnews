const fs=require('fs');
const INK='#1b1b1f';const F=f=>`style="font-family:'${f}'"`;
const S=i=>`<svg viewBox="0 0 1080 1920" width="1080" height="1920" style="position:absolute;inset:0;overflow:visible">${i}</svg>`;
const C='style="transform-box:fill-box;transform-origin:center"';
const defs=`<defs><filter id="wob" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="5"/></filter>
<filter id="paper"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="8"/><feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.38  0 0 0 0 0.28  0 0 0 0.07 0"/></filter>
<clipPath id="win"><rect x="-285" y="-165" width="430" height="330" rx="20"/></clipPath></defs>`;
const bg=`<rect width="1080" height="1920" fill="#f6efe2"/><rect width="1080" height="1920" filter="url(#paper)"/>`;
const bx=(x,y,w,h,f,t,font,size,col,ex='')=>`<g class="bx" ${ex}><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${f}"/><text x="540" y="${y+h*.72}" text-anchor="middle" ${F(font)} font-size="${size}" fill="${col}">${t}</text></g>`;
const mw=`<g filter="url(#wob)" stroke="${INK}" stroke-width="9" stroke-linejoin="round" stroke-linecap="round">
 <rect x="-330" y="-210" width="660" height="420" rx="34" fill="#ece7dc"/><rect x="-285" y="-165" width="430" height="330" rx="20" fill="#2b2b33"/>
 <g clip-path="url(#win)"><circle cx="-70" cy="20" r="160" fill="#fde68a" opacity=".18" stroke="none" data-flash="0.8,0.5,0.6"/></g>
 <g transform="translate(-70,105)"><g data-sc="0,0.01,1,1"><ellipse rx="150" ry="26" fill="#d8d2c6"/></g></g><path d="M-145 78 q75 -110 150 0z" fill="#f4a261"/>
 ${[-120,-70,-20].map((x,k)=>`<g data-bob="10,4,${k}"><path d="M${x} 20 q-16 -30 0 -60 q16 -30 0 -60" stroke="#fff" fill="none"/></g>`).join('')}
 <rect x="190" y="-155" width="105" height="44" rx="8" fill="#7bd389"/><text x="242" y="-122" text-anchor="middle" ${F('Gochi Hand')} font-size="34" fill="${INK}" stroke="none" data-count="0.6,2.5,30" data-suf=""></text>
 <circle cx="242" cy="0" r="36" fill="#ece7dc"/><circle cx="242" cy="110" r="36" fill="#ece7dc"/><path d="M-330 240 L330 240" fill="none" stroke-width="7"/></g>`;
const wave=(y,k)=>`<path d="M-420 ${y} q30 -30 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0" stroke="#e63946" stroke-width="9" fill="none" stroke-linecap="round"/>`;
const scenes=[
{dur:3.6,cam:"0,1.06,0,0|2.0,1.0,0,0",html:S(defs+bg+`<g data-fade="0.1,0.4" style="opacity:0"><text x="540" y="400" text-anchor="middle" ${F('Gochi Hand')} font-size="64" fill="${INK}">Perché...</text></g>
 <g data-pop="0.35,0.45" ${C}>${bx(0,440,1080,140,'none','IL MICROONDE','Luckiest Guy',118,INK)}</g>
 <g filter="url(#wob)"><rect x="110" y="610" width="860" height="120" rx="12" fill="#ffd23f" style="transform-box:fill-box;transform-origin:left" data-grow="0.9,0.5"/></g>
 <g data-fade="1.1,0.3" style="opacity:0">${bx(110,610,860,120,'none','NON SCALDA IL PIATTO?','Luckiest Guy',80,INK)}</g>
 <g data-drop="1.4,0.7,-700"><g transform="translate(540,1180)">${mw}</g></g>`)},
{dur:4.6,cam:"0,1.0,0,0|1.0,1.08,0,-40",html:S(defs+bg+`
 <g transform="translate(540,1060)"><g filter="url(#wob)" stroke="${INK}" stroke-width="10" stroke-linejoin="round">
  <g data-pop="0.1,0.5" ${C}><ellipse cx="0" cy="170" rx="380" ry="70" fill="#dfe7f1"/><ellipse cx="0" cy="160" rx="300" ry="46" fill="#eef3f8"/><path d="M-260 140 q260 -380 520 0z" fill="#f4a261"/></g>
  <g data-pop="0.5,0.4" ${C}>${[[-140,40],[-40,-30],[70,10],[160,80],[-80,100],[30,100]].map(([x,y],k)=>`<g transform="translate(${x},${y})"><g data-wig="18,${28+k*3}"><circle r="24" fill="#4cc9f0"/><circle cx="-26" cy="-18" r="13" fill="#fff"/><circle cx="26" cy="-18" r="13" fill="#fff"/></g></g>`).join('')}</g>
 </g>
 <g clip-path="url(#none)">${[-260,-170].map((y,k)=>`<g data-fade="0.3,0.3" style="opacity:0"><g data-loop="120,0,0.5">${wave(y,k)}</g></g>`).join('')}</g>
 </g>
 <g data-pop="1.4,0.45" ${C}><g filter="url(#wob)">${bx(180,1330,720,120,'#e63946','ACQUA DEL CIBO: SI AGITA','Luckiest Guy',62,'#fff')}</g></g>
 <g data-pop="2.6,0.45" ${C}><g filter="url(#wob)">${bx(230,1480,620,120,'#4cc9f0','IL PIATTO: QUASI NO','Luckiest Guy',62,INK)}</g></g>
 <g data-fade="0.2,0.3" style="opacity:0"><text x="540" y="560" text-anchor="middle" ${F('Luckiest Guy')} font-size="96" fill="${INK}">MICROONDE</text><path d="M330 600 q210 30 420 0" stroke="#e63946" stroke-width="10" fill="none" filter="url(#wob)" data-draw="0.5,0.6"/></g>`)}];
const cfg={voiceId:'',title:[''],logo:'plain',accent:'#e63946',pad:0,scenes:scenes.map(s=>({...s,voice:'',words:[]}))};
fs.writeFileSync(process.argv[2],JSON.stringify(cfg));console.log('ok');

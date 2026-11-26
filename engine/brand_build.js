const fs=require('fs');const R=JSON.parse(fs.readFileSync(__dirname+'/italia_regioni.json'));
const INK='#1b1b1f',RED='#e63946',YEL='#ffd23f';const F=f=>`style="font-family:'${f}'"`;
const S=i=>`<svg viewBox="0 0 1080 1920" width="1080" height="1920" style="position:absolute;inset:0;overflow:visible">${i}</svg>`;
const C='style="transform-box:fill-box;transform-origin:center"';
const defs=`<defs><filter id="wob" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="4"/></filter>
<filter id="paper"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="8"/><feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.38  0 0 0 0 0.28  0 0 0 0.07 0"/></filter></defs>`;
const bg=defs+`<rect width="1080" height="1920" fill="#f6efe2"/><rect width="1080" height="1920" filter="url(#paper)"/>`;
let IDK=0;const pop=(t,inner,d=.45)=>`<g data-pop="${t},${d}" ${C}><g data-idle="5,${(2+(IDK%3)*0.4).toFixed(1)},${(IDK++)*1.3}" ${C}>${inner}</g></g>`;
const hl=(y,w,t,size=72,fill=YEL,col=INK)=>`<g filter="url(#wob)"><g class="bx"><rect x="${540-w/2}" y="${y}" width="${w}" height="${size*1.5}" rx="12" fill="${fill}"/><text x="540" y="${y+size*1.1}" text-anchor="middle" ${F('Luckiest Guy')} font-size="${size}" fill="${col}">${t}</text></g></g>`;
const tagAt=(cx,y,w,t,size,fill,col=INK)=>`<g filter="url(#wob)"><g class="bx"><rect x="${cx-w/2}" y="${y}" width="${w}" height="${size*1.5}" rx="12" fill="${fill}"/><text x="${cx}" y="${y+size*1.1}" text-anchor="middle" ${F('Luckiest Guy')} font-size="${size}" fill="${col}">${t}</text></g></g>`;
const hand=(x,y,t,size=56,col=INK)=>`<text x="${x}" y="${y}" text-anchor="middle" ${F('Gochi Hand')} font-size="${size}" fill="${col}">${t}</text>`;
const W='stroke="'+INK+'" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"';
// [regione, chiave logo, nome, anchor comparsa, offset finale x,y]
const BR=[['Piemonte','nutella','NUTELLA','@Piemonte',140,640],['Piemonte','fiat','FIAT','@Fiat',140,720],
['Lombardia','pirelli','PIRELLI','@Lombardia',300,605],['Lombardia','prada','PRADA','@Prada',300,670],['Lombardia','sanpellegrino','SAN PELLEGRINO','@San',310,540],
['Trentino-Alto Adige','loacker','LOACKER','@Trentino',460,540],['Veneto','benetton','BENETTON','@Veneto',470,605],
['Friuli-Venezia Giulia','illy','ILLY','@Friuli',640,540],['Friuli-Venezia Giulia','generali','GENERALI','@Generali',650,605],['Liguria','costa','COSTA','@Liguria',170,820],
['Emilia-Romagna','ferrari','FERRARI','@Emilia',360,745],['Emilia-Romagna','barilla','BARILLA','@Barilla',520,745],
['Toscana','gucci','GUCCI','@Toscana',400,860],['Toscana','vespa','VESPA','@Vespa',380,930],
['Umbria','perugina','BACI PERUGINA','@Umbria',545,930],['Marche','indesit','INDESIT','@Marche',645,860],
['Lazio','valentino','VALENTINO','@Lazio',510,1020],['Abruzzo','dececco','DE CECCO','@Abruzzo',680,1020],
['Campania','ferrarelle','FERRARELLE','@Campania',710,1150],['Puglia','natuzzi','NATUZZI','@Puglia',910,1110]];
const logo=(k,w,h)=>{const p=['svg','png','jpg'].map(e=>__dirname+'/assets/loghi/'+k+'.'+e).find(f=>fs.existsSync(f));
 if(!p)return null;const mt={svg:'image/svg+xml',png:'image/png',jpg:'image/jpeg'}[p.split('.').pop()];
 return `<image href="data:${mt};base64,${fs.readFileSync(p).toString('base64')}" x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet"/>`};
const CX=845,CY=760,CW=340,CH=140,SC=0.45;
const card=(k,name)=>`<g filter="url(#wob)"><rect x="${CX-CW/2}" y="${CY-CH/2}" width="${CW}" height="${CH}" rx="24" fill="#fff" stroke="${INK}" stroke-width="7"/></g><g transform="translate(${CX},${CY})">${logo(k,CW-60,CH-50)||`<text y="22" text-anchor="middle" ${F('Luckiest Guy')} font-size="60" fill="${RED}">${name}</text>`}</g>`;
const map=()=>`<g filter="url(#wob)">${Object.values(R).map(v=>`<path d="${v.d}" fill="#f7dc6f" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`).join('')}</g>`;
const fin=b=>[b[4],b[5]];
const placed=()=>BR.map(b=>{const [x,y]=fin(b);return `<g transform="translate(${x},${y}) scale(${SC}) translate(${-CX},${-CY})">${card(b[1],b[2])}</g>`}).join('');
const V=["Quanti brand italiani riconosci? Conta i loghi, e alla fine scrivi il tuo punteggio.",
"Piemonte: Nutella. E Fiat. Lombardia: Pirelli, Prada, e San Pellegrino. Trentino: Loacker. Veneto: Benetton. Friuli: illy. E Generali. Liguria: Costa. Emilia-Romagna: Ferrari. E Barilla. Toscana: Gucci. E Vespa. Umbria: Baci Perugina. Marche: Indesit. Lazio: Valentino. Abruzzo: De Cecco. Campania: Ferrarelle. Puglia: Natuzzi. Ed ecco l'Italia dei brand.",
"Quanti ne hai riconosciuti? Scrivi il tuo punteggio su venti nei commenti. Made in News: una pillola di sapere al giorno."];
const NA={"nutella": "@Nutella", "fiat": "@Fiat", "pirelli": "@Pirelli", "prada": "@Prada", "sanpellegrino": "@San", "loacker": "@Loacker", "benetton": "@Benetton", "illy": "@illy", "generali": "@Generali", "costa": "@Costa", "ferrari": "@Ferrari", "barilla": "@Barilla", "gucci": "@Gucci", "vespa": "@Vespa", "perugina": "@Baci", "indesit": "@Indesit", "valentino": "@Valentino", "dececco": "@Cecco", "ferrarelle": "@Ferrarelle", "natuzzi": "@Natuzzi"};
const tour=()=>BR.map((b,i)=>{const nx=BR[i+1]?BR[i+1][3]:'@ecco';const [x,y]=fin(b);const dx=x-CX,dy=y-CY;
 const flyT=BR[i+1]?nx:'@ecco';
 return `<path d="${R[b[0]].d}" fill="#ffb347" stroke="${INK}" stroke-width="4" data-fade="${b[3]},0.3" style="opacity:0" filter="url(#wob)"/>
 <g data-pop="${b[3]},0.35" ${C}><g data-mv="0,0.01,0,0,0,0,${flyT},0.6,0,0,${dx},${dy}"><g data-sc="0,0.01,1,1,${flyT},0.6,1,${SC}" style="transform-origin:${CX}px ${CY}px">${card(b[1],b[2])}</g></g></g>`}).join('')
 +BR.map((b,i)=>`<g data-win="${NA[b[1]]},0,99"><g data-off="${BR[i+1]?BR[i+1][3]:'@ecco'}">${tagAt(250,1430,400,b[2],b[2].length>10?40:56,'#fff')}</g></g>`).join('');
const SCN=[
{cam:"0,1.0,0,0",html:S(bg+`${pop(0.1,map(),0.5)}${pop('@brand',hl(355,840,'QUANTI NE RICONOSCI?',64,YEL))}${pop('@Conta',hand(270,1420,'conta i loghi…',58,RED))}${pop('@punteggio',hand(860,880,'nei commenti!',48,INK))}${pop('@fine',`<text x="860" y="800" text-anchor="middle" ${F('Luckiest Guy')} font-size="150" fill="${RED}" stroke="${INK}" stroke-width="7" paint-order="stroke">/20</text>`)}`)},
{cam:"0,1.0,0,0",html:S(bg+map()+tour()+pop('@dei',hl(355,860,"ECCO L'ITALIA DEI BRAND",56,YEL)))},
{cam:"0,1.0,0,0",html:S(bg+`<g data-off="@Made">${map()}${placed()}${pop('@Quanti',hl(355,880,'QUANTI NE HAI RICONOSCIUTI?',56,YEL))}${pop('@commenti',tagAt(270,1420,420,'SCRIVILO /20',56,RED,'#fff'))}</g>
 <g data-fade="@Made,0.3" style="opacity:0">${pop('@Made',`<rect x="390" y="700" width="300" height="300" fill="${INK}"/><text x="540" y="917" text-anchor="middle" ${F('Anton')} font-size="186" fill="#fff">MN<tspan fill="${RED}">.</tspan></text>`,0.5)}
 <g data-rise="@News,0.5"><text x="540" y="1170" text-anchor="middle" ${F('Inter Tight')} font-size="96" font-weight="900" fill="${INK}" letter-spacing="-4">madeinnews<tspan fill="${RED}">.</tspan></text></g>
 <g data-rise="@pillola,0.5">${hand(540,1280,'una pillola di sapere al giorno',62)}</g></g>`)}];
const still=process.argv[3]=='still';
fs.writeFileSync(process.argv[2],JSON.stringify({voiceId:"GOAZNavLupajyL3YafaD",title:["Brand italiani"],logo:'plain',bg:'#f6efe2',light:true,accent:RED,pad:0,scenes:SCN.map((s,i)=>still?{voice:V[i],cam:s.cam,html:s.html.replace(/data-off="@[^"]*"/g,'data-off="2.5"').replace(/data-fade="@[^"]*,/g,'data-fade="2.6,').replace(/@[^,"'\s]+(?=[,"'])/g,'0.2'),dur:5,words:[]}:{voice:V[i],cam:s.cam,html:s.html})},null,1));console.log('ok');

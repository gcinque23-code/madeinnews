const fs=require('fs');const R=JSON.parse(fs.readFileSync(__dirname+'/italia_regioni.json'));
const INK='#1b1b1f',RED='#e63946',YEL='#ffd23f';const F=f=>`style="font-family:'${f}'"`;
const S=i=>`<svg viewBox="0 0 1080 1920" width="1080" height="1920" style="position:absolute;inset:0;overflow:visible">${i}</svg>`;
const C='style="transform-box:fill-box;transform-origin:center"';
const defs=`<defs><filter id="wob" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="4"/></filter><filter id="wobL" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="5"/><feDisplacementMap in="SourceGraphic" scale="1.6"/></filter>
<filter id="paper"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="8"/><feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.38  0 0 0 0 0.28  0 0 0 0.07 0"/></filter></defs>`;
const bg=defs+`<rect width="1080" height="1920" fill="#f6efe2"/><rect width="1080" height="1920" filter="url(#paper)"/>`;
let IDK=0;const pop=(t,inner,d=.45)=>`<g data-pop="${t},${d}" ${C}>${inner}</g>`;
const hl=(y,w,t,size=72,fill=YEL,col=INK)=>`<g filter="url(#wob)"><g class="bx"><rect x="${540-w/2}" y="${y}" width="${w}" height="${size*1.5}" rx="12" fill="${fill}"/><text x="540" y="${y+size*1.1}" text-anchor="middle" ${F('Luckiest Guy')} font-size="${size}" fill="${col}">${t}</text></g></g>`;
const tagAt=(cx,y,w,t,size,fill,col=INK)=>`<g filter="url(#wob)"><g class="bx"><rect x="${cx-w/2}" y="${y}" width="${w}" height="${size*1.5}" rx="12" fill="${fill}"/><text x="${cx}" y="${y+size*1.1}" text-anchor="middle" ${F('Luckiest Guy')} font-size="${size}" fill="${col}">${t}</text></g></g>`;
const hand=(x,y,t,size=56,col=INK)=>`<text x="${x}" y="${y}" text-anchor="middle" ${F('Gochi Hand')} font-size="${size}" fill="${col}">${t}</text>`;
const W='stroke="'+INK+'" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"';

const logo=(k,w,h)=>{const p=['svg','png','jpg'].map(e=>__dirname+'/assets/loghi/'+k+'.'+e).find(f=>fs.existsSync(f));
 if(!p)return null;const mt={svg:'image/svg+xml',png:'image/png',jpg:'image/jpeg'}[p.split('.').pop()];
 return `<image href="data:${mt};base64,${fs.readFileSync(p).toString('base64')}" x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet" style="mix-blend-mode:multiply"/>`};
const cen=d=>{const rings=d.split('M').filter(Boolean).map(r=>r.replace(/Z/g,'').split(' L').map(p=>p.trim().split(' ').map(Number)));let best=null,ba=0;for(const r of rings){let A=0,cx=0,cy=0;for(let i=0;i<r.length;i++){const [x0,y0]=r[i],[x1,y1]=r[(i+1)%r.length];const f=x0*y1-x1*y0;A+=f;cx+=(x0+x1)*f;cy+=(y0+y1)*f}if(Math.abs(A)>ba){ba=Math.abs(A);best=[cx/(3*A),cy/(3*A)]}}return best};
const ICON={};
const RAW=[['Piemonte','nutella','NUTELLA','@Piemonte','@Nutella',0,-30],['Piemonte','fiat','FIAT','@Fiat','@Fiat',0,32],
['Lombardia','pirelli','PIRELLI','@Lombardia','@Pirelli',0,-42],['Lombardia','prada','PRADA','@Prada','@Prada',0,0],['Lombardia','sanpellegrino','SAN PELLEGRINO','@San','@San',0,42],
['Trentino-Alto Adige','loacker','LOACKER','@Trentino','@Loacker',0,0],['Veneto','benetton','BENETTON','@Veneto','@Benetton',0,8],
['Friuli-Venezia Giulia','illy','ILLY','@Friuli','@illy',0,-26],['Friuli-Venezia Giulia','generali','GENERALI','@Generali','@Generali',0,28],['Liguria','costa','COSTA','@Liguria','@Costa',0,0],
['Emilia-Romagna','ferrari','FERRARI','@Emilia','@Ferrari',-55,-5],['Emilia-Romagna','barilla','BARILLA','@Barilla','@Barilla',55,8],
['Toscana','gucci','GUCCI','@Toscana','@Gucci',0,-32],['Toscana','vespa','VESPA','@Vespa','@Vespa',-5,34],['Umbria','perugina','BACI PERUGINA','@Umbria','@Baci',0,0],['Marche','indesit','INDESIT','@Marche','@Indesit',0,0],
['Lazio','valentino','VALENTINO','@Lazio','@Valentino',-25,15],['Abruzzo','dececco','DE CECCO','@Abruzzo','@Cecco',25,-15],['Campania','ferrarelle','FERRARELLE','@Campania','@Ferrarelle',-15,0],['Puglia','natuzzi','NATUZZI','@Puglia','@Natuzzi',20,-15]];
const BR=RAW.map(r=>{const c=cen(R[r[0]].d);return [r[0],r[1],r[2],r[3],r[4],c[0]+r[5],c[1]+r[6],c]});
const CX=845,CY=760,CW=300,CH=220,SC=0.4;
const card=(k,name)=>`<g filter="url(#wob)"><rect x="${CX-CW/2}" y="${CY-CH/2}" width="${CW}" height="${CH}" rx="28" fill="#fff" stroke="${INK}" stroke-width="7"/></g><g transform="translate(${CX},${CY+5}) scale(0.95)">${ICON[k]}</g>`;
const map=()=>`<g filter="url(#wob)">${Object.values(R).map(v=>`<path d="${v.d}" fill="#f7dc6f" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`).join('')}</g>`;
const fin=b=>[b[5],b[6]];
const placed=()=>BR.map(b=>{const [x,y]=fin(b);return `<g transform="translate(${x},${y}) scale(${SC}) translate(${-CX},${-CY})">${card(b[1],b[2])}</g>`}).join('');
const V=["Quanti brand italiani riconosci? Conta i loghi, e alla fine scrivi il tuo punteggio.",
"Piemonte: Nutella. E Fiat. Lombardia: Pirelli, Prada, e San Pellegrino. Trentino: Loacker. Veneto: Benetton. Friuli: illy. E Generali. Liguria: Costa. Emilia-Romagna: Ferrari. E Barilla. Toscana: Gucci. E Vespa. Umbria: Baci Perugina. Marche: Indesit. Lazio: Valentino. Abruzzo: De Cecco. Campania: Ferrarelle. Puglia: Natuzzi. Ed ecco l'Italia dei brand.",
"Quanti ne hai riconosciuti? Scrivi il tuo punteggio su venti nei commenti. Made in News: una pillola di sapere al giorno."];

const bbox=d=>{const n=d.match(/-?\d+(\.\d+)?/g).map(Number);let xs=[],ys=[];for(let i=0;i<n.length;i+=2){xs.push(n[i]);ys.push(n[i+1])}return [Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)]};
const ZS=BR.map(b=>{const [x0,y0,x1,y1]=bbox(R[b[0]].d);return Math.max(1.8,Math.min(3.4,560/Math.max(x1-x0,(y1-y0)*0.8)))});
const NR=k=>BR.filter(x=>x[0]==k).length;
const LW=b=>{const n=NR(b[0]);return n==1?[135,75]:n==2?[115,52]:[100,36]};
const TX=540,TY=1010;
const zoomTour=()=>{
 // segmenti mv (traslazione) e sc (scala) del gruppo mappa, origine 0,0: schermo = T + s*p
 let mv=['0,0.01,0,0,0,0'],sc=['0,0.01,1,1'];let pT=[0,0],pS=1;
 BR.forEach((b,i)=>{const s=ZS[i];const T=[TX-s*b[7][0],TY-s*b[7][1]];mv.push(`${b[3]},0.8,${pT[0].toFixed(1)},${pT[1].toFixed(1)},${T[0].toFixed(1)},${T[1].toFixed(1)}`);sc.push(`${b[3]},0.8,${pS.toFixed(3)},${s.toFixed(3)}`);pT=T;pS=s;});
 mv.push(`@ecco,1.0,${pT[0].toFixed(1)},${pT[1].toFixed(1)},0,0`);sc.push(`@ecco,1.0,${pS.toFixed(3)},1`);
 const dishes=BR.map((b,i)=>`<path d="${R[b[0]].d}" fill="#fff6dc" stroke="${INK}" stroke-width="${(4/ZS[i]*1.6).toFixed(2)}" data-fade="${b[3]},0.3" style="opacity:0" filter="url(#wob)"/>`).join('')
  +BR.map((b,i)=>`<g transform="translate(${b[5]},${b[6]}) scale(1)"><g data-pop="${b[4]},0.45" ${C}><g filter="url(#wobL)" style="mix-blend-mode:multiply">${logo(b[1],LW(b)[0],LW(b)[1])}</g></g></g>`).join('');
 return `<g data-mv="${mv.join(',')}"><g data-sc="${sc.join(',')}" style="transform-origin:0 0">${map()}${dishes}</g></g>`;};
const tour=()=>zoomTour()+BR.map((b,i)=>`<g data-win="${b[4]},0,99"><g data-off="${BR[i+1]?BR[i+1][3]:'@ecco'}">${tagAt(540,1500,560,b[2],b[2].length>12?58:72,'#fff')}</g></g>`).join('')
 +BR.map((b,i)=>{if(i>0&&BR[i-1][0]==b[0])return '';const nx=BR.slice(i+1).find(x=>x[0]!=b[0]);return `<g data-win="${b[3]},0,99"><g data-off="${nx?nx[3]:'@ecco'}">${tagAt(540,1385,460,({'Trentino-Alto Adige':'TRENTINO','Friuli-Venezia Giulia':'FRIULI'}[b[0]]||b[0]).toUpperCase(),52,YEL)}</g></g>`}).join('')
 +`<defs><linearGradient id="topfade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6efe2" stop-opacity="1"/><stop offset="0.75" stop-color="#f6efe2" stop-opacity="0.95"/><stop offset="1" stop-color="#f6efe2" stop-opacity="0"/></linearGradient></defs><rect x="0" y="0" width="1080" height="440" fill="url(#topfade)"/>`;
const placedZ=()=>BR.map((b,i)=>`<g transform="translate(${b[5]},${b[6]}) scale(1)"><g filter="url(#wobL)" style="mix-blend-mode:multiply">${logo(b[1],LW(b)[0],LW(b)[1])}</g></g>`).join('');
const SCN=[
{cam:"0,1.0,0,0",html:S(bg+`${pop(0.1,map(),0.5)}${pop('@brand',hl(355,860,'QUANTI NE RICONOSCI?',62,YEL))}${pop('@Conta',hand(270,1420,'conta i loghi…',58,RED))}${pop('@punteggio',hand(860,880,'nei commenti!',48,INK))}${pop('@fine',`<text x="860" y="800" text-anchor="middle" ${F('Luckiest Guy')} font-size="150" fill="${RED}" stroke="${INK}" stroke-width="7" paint-order="stroke">/20</text>`)}`)},
{cam:"0,1.0,0,0",html:S(bg+tour()+pop('@dei',hl(355,860,"ECCO L'ITALIA DEI BRAND",56,YEL)))},
{cam:"0,1.0,0,0",html:S(bg+`<g data-off="@Made">${map()}${placedZ()}${pop('@Quanti',hl(355,880,'QUANTI NE HAI RICONOSCIUTI?',54,YEL))}${pop('@commenti',tagAt(270,1420,420,'SCRIVILO /20',56,RED,'#fff'))}</g>
 <g data-fade="@Made,0.3" style="opacity:0">${pop('@Made',`<rect x="390" y="700" width="300" height="300" fill="${INK}"/><text x="540" y="917" text-anchor="middle" ${F('Anton')} font-size="186" fill="#fff">MN<tspan fill="${RED}">.</tspan></text>`,0.5)}
 <g data-rise="@News,0.5"><text x="540" y="1170" text-anchor="middle" ${F('Inter Tight')} font-size="96" font-weight="900" fill="${INK}" letter-spacing="-4">madeinnews<tspan fill="${RED}">.</tspan></text></g>
 <g data-rise="@pillola,0.5">${hand(540,1280,'una pillola di sapere al giorno',62)}</g></g>`)}];
const still=process.argv[3]=='still';
fs.writeFileSync(process.argv[2],JSON.stringify({voiceId:"GOAZNavLupajyL3YafaD",title:["Brand italiani"],logo:'plain',bg:'#f6efe2',light:true,accent:RED,pad:0,scenes:SCN.map((s,i)=>still?{voice:V[i],cam:s.cam,html:s.html.replace(/data-off="@[^"]*"/g,'data-off="2.5"').replace(/data-fade="@[^"]*,/g,'data-fade="2.6,').replace(/@[^,"'\s]+(?=[,"'])/g,'0.2'),dur:5,words:[]}:{voice:V[i],cam:s.cam,html:s.html})},null,1));console.log('ok');

const fs=require('fs');
const INK='#1b1b1f',RED='#e63946',YEL='#ffd23f';const F=f=>`style="font-family:'${f}'"`;
const S=i=>`<svg viewBox="0 0 1080 1920" width="1080" height="1920" style="position:absolute;inset:0;overflow:visible">${i}</svg>`;
const C='style="transform-box:fill-box;transform-origin:center"';
const defs=`<defs><filter id="wob" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="5"/></filter>
<filter id="paper"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="8"/><feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.38  0 0 0 0 0.28  0 0 0 0.07 0"/></filter></defs>`;
const bg=defs+`<rect width="1080" height="1920" fill="#f6efe2"/><rect width="1080" height="1920" filter="url(#paper)"/>`;
const pop=(t,inner,d=.45)=>`<g data-pop="${t},${d}" ${C}>${inner}</g>`;
const title=(y,t,size=110)=>`<g class="bx"><rect x="0" y="${y}" width="1080" height="${size*1.1}" fill="none"/><text x="540" y="${y+size}" text-anchor="middle" ${F('Luckiest Guy')} font-size="${size}" fill="${INK}">${t}</text></g>`;
const hl=(y,w,t,size=72,fill=YEL,col=INK)=>`<g filter="url(#wob)"><g class="bx"><rect x="${540-w/2}" y="${y}" width="${w}" height="${size*1.5}" rx="12" fill="${fill}"/><text x="540" y="${y+size*1.1}" text-anchor="middle" ${F('Luckiest Guy')} font-size="${size}" fill="${col}">${t}</text></g></g>`;
const tagAt=(cx,y,w,t,size,fill,col=INK)=>`<g filter="url(#wob)"><g class="bx"><rect x="${cx-w/2}" y="${y}" width="${w}" height="${size*1.5}" rx="12" fill="${fill}"/><text x="${cx}" y="${y+size*1.1}" text-anchor="middle" ${F('Luckiest Guy')} font-size="${size}" fill="${col}">${t}</text></g></g>`;
const hand=(x,y,t,size=56,col=INK)=>`<text x="${x}" y="${y}" text-anchor="middle" ${F('Gochi Hand')} font-size="${size}" fill="${col}">${t}</text>`;
// sprite generico (12x16) — non è lo sprite Nintendo
const PAL={R:RED,S:'#ffd7b0',H:'#5a3a22',Y:'#2b59c3',B:'#d62828',K:INK,W:'#fff',M:'#c0392b',G:'#8a8a8a'};
const BASE=["...RRRRR....","..RRRRRRRRR.","..SSSSSSS...",".SSSKSSKSS..",".SSSSSSSSSS.","..HHHHHHH...","...SSSSS....","..YYBYYBYY..",".YYYBBBBYYY.","SSYBBBBBBYSS","SS.BBBBBB.SS","...BBBBBB...","..BBB..BBB..","..BBB..BBB..",".KKKK..KKKK.","KKKKK..KKKKK"];
const pix=(rows,cx,cy,c,stag=null,grid=false)=>{const w=rows[0].length*c,h=rows.length*c;let o=`<g transform="translate(${cx-w/2},${cy-h/2})">`;let k=0;
 if(grid)for(let i=0;i<=rows[0].length;i++)o+=`<line x1="${i*c}" y1="0" x2="${i*c}" y2="${h}" stroke="${INK}" stroke-opacity=".15" stroke-width="2"/>`;
 if(grid)for(let j=0;j<=rows.length;j++)o+=`<line x1="0" y1="${j*c}" x2="${w}" y2="${j*c}" stroke="${INK}" stroke-opacity=".15" stroke-width="2"/>`;
 rows.forEach((r,y)=>[...r].forEach((ch,x)=>{if(PAL[ch]){const rect=`<rect x="${x*c}" y="${y*c}" width="${c}" height="${c}" fill="${PAL[ch]}" stroke="${INK}" stroke-opacity=".25" stroke-width="1.5"/>`;o+=stag!==null?`<g data-pop="${(stag+k*0.012).toFixed(3)},0.2" ${C}>${rect}</g>`:rect;k++;}}));return o+'</g>'};
const mod=(f)=>BASE.map((r,i)=>f(r,i));
const NOMUST=mod((r,i)=>i==5?"..SSSSSSS...":i==6?"...SMMMS....":r);
const NOCAP=mod((r,i)=>i==0?"..H.H.H.H...":i==1?".HHHHHHHHH..":r);
const ONECOL=mod((r,i)=>r.replace(/[YB]/g,'B'));
const SCN=[
{voice:"Super Mario ha i baffi. Ma non è per lo stile.",cam:"0,1.08,0,0|@stile,1.0,0,0",
 html:S(bg+`${pop('@baffi',title(430,'I BAFFI?',150))}${pop('@stile',hl(620,700,'NON È PER STILE',78))}
 <g data-pop="0.1,0.5" ${C}>${pix(BASE,540,1240,46)}</g>
 <g data-draw="@baffi,0.6"><ellipse cx="540" cy="1125" rx="200" ry="48" fill="none" stroke="${RED}" stroke-width="10" filter="url(#wob)"/></g>`)},
{voice:"Siamo nel 1981, nel gioco arcade Donkey Kong. Il personaggio non si chiama ancora Mario: si chiama Jumpman, e fa il carpentiere.",cam:"0,1.0,0,0|@Jumpman,1.06,0,0",
 html:S(bg+`${pop('@1981',hl(430,420,'1981',96,RED,'#fff'))}
 <g data-drop="0.1,0.7,-600" filter="url(#wob)" stroke="${INK}" stroke-width="9" stroke-linejoin="round"><g transform="translate(540,1080)">
  <path d="M-230 -420 L230 -420 L250 -330 L250 470 L-250 470 L-250 -330Z" fill="#c1121f"/><rect x="-220" y="-400" width="440" height="80" rx="10" fill="${YEL}"/>
  <rect x="-190" y="-290" width="380" height="330" rx="16" fill="#1b1b2f"/>
  ${[-200,-90,20].map((y,k)=>`<line x1="${k%2?-160:-120}" y1="${y}" x2="${k%2?120:160}" y2="${y+20}" stroke="#e76f51" stroke-width="12"/>`).join('')}
  <rect x="-250" y="60" width="500" height="120" fill="#a40e1a"/><circle cx="-90" cy="110" r="26" fill="${INK}"/><circle cx="40" cy="110" r="20" fill="${RED}"/><circle cx="110" cy="110" r="20" fill="${YEL}"/>
 </g></g>
 <g data-pop="@arcade,0.4" ${C}>${pix(BASE,470,950,7)}</g>${pop('@Donkey',`<g class="bx"><rect x="320" y="680" width="440" height="80" fill="none"/><text x="540" y="735" text-anchor="middle" ${F('Luckiest Guy')} font-size="52" fill="${INK}">DONKEY KONG</text></g>`)}<g data-draw="@personaggio,0.5"><circle cx="470" cy="950" r="80" fill="none" stroke="${YEL}" stroke-width="10" filter="url(#wob)"/></g><g data-off="@Jumpman">${pop('@Mario',tagAt(540,1590,420,'MARIO? NO',64,'#fff'))}</g>
 ${pop('@Jumpman',tagAt(300,1590,400,'JUMPMAN',64,'#fff'))}${pop('@carpentiere',tagAt(780,1590,440,'CARPENTIERE',58,YEL))}`)},
{voice:"Gli schermi dell'epoca permettono di disegnarlo con pochissimi pixel e pochi colori.",cam:"0,1.0,0,0|@pixel,1.05,0,0",
 html:S(bg+`${pop('@pochissimi',hl(430,620,'POCHI PIXEL',84))}
 <g filter="url(#wob)">${pix(BASE,540,1080,40,0.4,true)}</g>
 ${pop('@colori',`${hand(540,1520,'pochi colori:',60)}${['R','S','H','Y','B','K'].map((c,i)=>`<rect x="${540-3*90+i*90+8}" y="1560" width="74" height="74" rx="10" fill="${PAL[c]}" stroke="${INK}" stroke-width="6"/>`).join('')}`)}`)},
{voice:"Con così pochi pixel, una bocca non si riesce a far vedere. Così Shigeru Miyamoto gli disegna dei grossi baffi.",cam:"0,1.0,0,0|@baffi,1.08,0,40",
 html:S(bg+`<g data-off="@Miyamoto">${pop('@bocca',hl(430,560,'BOCCA? NO',84,'#ffffff'))}</g>${pop('@Miyamoto',hl(430,760,'SHIGERU MIYAMOTO',70))}
 ${pop(0.1,`<g filter="url(#wob)">${pix(NOMUST.slice(0,7),310,1060,34,null,true)}</g>`)}${hand(310,1300,'bocca',56)}
 ${pop('@riesce',hand(310,1380,'troppo pochi pixel!',50,RED))}${pop('@vedere',`<path d="M140 960 L480 1160 M480 960 L140 1160" stroke="${RED}" stroke-width="16" stroke-linecap="round" filter="url(#wob)"/>`)}
 ${pop('@baffi',`<g filter="url(#wob)">${pix(BASE.slice(0,7),770,1060,34,null,true)}</g>${hand(770,1300,'baffi!',60,RED)}`)}
 ${pop('@Shigeru',`<path d="M500 1060 q40 -34 80 0" stroke="${INK}" stroke-width="10" fill="none" filter="url(#wob)"/><path d="M570 1040 l24 22 -30 12" stroke="${INK}" stroke-width="10" fill="none"/>`)}`)},
{voice:"Anche i capelli erano difficili da animare: per questo ha il cappello.",cam:"0,1.0,0,0|@cappello,1.06,0,0",
 html:S(bg+`${pop('@capelli',hl(430,620,'CAPELLI? NO',84,'#ffffff'))}
 ${pop(0.1,`<g filter="url(#wob)">${pix(NOCAP.slice(0,7),310,1060,34,null,true)}</g>${hand(310,1300,'capelli',56)}`)}
 ${pop('@difficili',`<path d="M140 960 L480 1160 M480 960 L140 1160" stroke="${RED}" stroke-width="16" stroke-linecap="round" filter="url(#wob)"/>`)}
 ${pop('@questo',`<g filter="url(#wob)">${pix(BASE.slice(0,7),770,1060,34,null,true)}</g>${hand(770,1300,'cappello!',60,RED)}`)}
 ${pop('@cappello',hl(1420,560,'CAPPELLO',84))}`)},
{voice:"E la salopette? Due colori diversi fanno risaltare le braccia sul corpo.",cam:"0,1.0,0,0|@braccia,1.06,0,0",
 html:S(bg+`${pop('@salopette',hl(430,600,'SALOPETTE?',84))}
 ${pop('@Due',`<g filter="url(#wob)">${pix(ONECOL,310,1110,30)}</g>${hand(310,1420,'un colore',56)}`)}
 ${pop('@colori',`<g filter="url(#wob)">${pix(BASE,770,1110,30)}</g>${hand(770,1420,'due colori',56,RED)}`)}
 ${pop('@braccia',`<g data-draw="@braccia,0.5"><circle cx="650" cy="1125" r="50" fill="none" stroke="${RED}" stroke-width="9" filter="url(#wob)"/></g><circle cx="890" cy="1125" r="50" fill="none" stroke="${RED}" stroke-width="9" filter="url(#wob)"/>`)}
 ${pop('@braccia',hl(1500,600,'BRACCIA VISIBILI',66))}`)},
{voice:"Il nome Mario arriva dopo: secondo Nintendo, viene da Mario Segale, il proprietario del magazzino della filiale americana.",cam:"0,1.0,0,0|@Segale,1.06,0,0",
 html:S(bg+`${pop('@nome',hl(430,560,'IL NOME?',84))}
 <g data-drop="@magazzino,0.7,-600" filter="url(#wob)" stroke="${INK}" stroke-width="9" stroke-linejoin="round"><g transform="translate(540,1180)">
  <path d="M-360 -160 L0 -330 L360 -160 L360 260 L-360 260Z" fill="#d9c6a5"/><rect x="-150" y="20" width="300" height="240" fill="#8d99ae"/>${[60,110,160,210].map(y=>`<line x1="-150" y1="${y}" x2="150" y2="${y}"/>`).join('')}
  <rect x="-300" y="-110" width="110" height="80" fill="#bfe6ff"/><rect x="190" y="-110" width="110" height="80" fill="#bfe6ff"/>
  <rect x="-210" y="-250" width="420" height="90" rx="10" fill="#fff"/></g></g>
 <g data-fade="@magazzino,0.3" style="opacity:0">${hand(540,990,'MAGAZZINO',60)}</g>
 ${pop('@Segale',hl(1500,620,'MARIO SEGALE',78,RED,'#fff'))}${pop('@Nintendo',`${hand(540,640+60,'secondo Nintendo',58,RED)}`)}`)},
{voice:"Segui Made in News: una pillola di sapere al giorno.",cam:"0,1.1,0,0|1.5,1.0,0,0",
 html:S(bg+`${pop(0.3,`<rect x="390" y="700" width="300" height="300" fill="${INK}"/><text x="540" y="917" text-anchor="middle" ${F('Anton')} font-size="186" fill="#fff">MN<tspan fill="${RED}">.</tspan></text>`,0.5)}
 <g data-rise="0.8,0.5"><text x="540" y="1170" text-anchor="middle" ${F('Inter Tight')} font-size="96" font-weight="900" fill="${INK}" letter-spacing="-4">madeinnews<tspan fill="${RED}">.</tspan></text></g>
 <g data-rise="1.2,0.5">${hand(540,1280,'una pillola di sapere al giorno',62)}</g>`)}];
const preview=process.argv[3]=='still';
fs.writeFileSync(process.argv[2],JSON.stringify({voiceId:"GOAZNavLupajyL3YafaD",title:["Perché Mario ha i baffi?"],logo:'plain',bg:'#f6efe2',light:true,accent:RED,pad:0,scenes:SCN.map(s=>preview?{...s,dur:5,words:[]}:s)},null,1));console.log('ok');

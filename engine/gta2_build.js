const fs=require('fs');
const M=JSON.parse(fs.readFileSync(__dirname+'/assets/atlantico.json','utf8'));
const S=i=>`<svg viewBox="0 0 1080 1920" width="1080" height="1920" style="position:absolute;inset:0;overflow:visible">${i}</svg>`;
const C='style="transform-box:fill-box;transform-origin:center"';
const O='style="transform-origin:0 0"';
const lg=(id,st,v=1)=>`<linearGradient id="${id}" x1="0" y1="0" x2="${v?0:1}" y2="${v?1:0}">${st.map(([o,c])=>`<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
const sky=(id,st)=>`<defs>${lg(id,st)}</defs><rect width="1080" height="1920" fill="url(#${id})"/>`;
const rnd=(k)=>{const x=Math.sin(k*999.7)*43758.5;return x-Math.floor(x)};
// ---------- components
const wheel=(x,y,sp)=>`<g transform="translate(${x},${y})"><g data-spin="${sp}" ${C}><circle r="42" fill="#15151c"/><circle r="22" fill="#c7c9d1"/>${[0,60,120].map(a=>`<rect x="-3" y="-22" width="6" height="44" fill="#6b6f7a" transform="rotate(${a})"/>`).join('')}<circle r="6" fill="#333"/></g></g>`;
const carBody=(col,glass='#9fd8ff')=>`<ellipse cx="5" cy="74" rx="215" ry="16" fill="#000" opacity=".35"/>
<path d="M-205 40 L-205 -5 Q-200 -38 -150 -44 L-92 -50 L-42 -96 Q-26 -106 2 -106 L72 -106 Q98 -106 114 -90 L152 -50 L192 -42 Q214 -36 214 -2 L214 40 Q214 52 200 52 L-192 52 Q-205 52 -205 40Z" fill="${col}"/>
<path d="M-205 18 L214 18 L214 40 Q214 52 200 52 L-192 52 Q-205 52 -205 40Z" fill="#000" opacity=".18"/>
<path d="M-74 -52 L-34 -92 L22 -92 L22 -52Z" fill="${glass}"/><path d="M34 -92 L70 -92 Q86 -92 97 -80 L124 -52 L34 -52Z" fill="${glass}"/>
<path d="M-60 -60 L-40 -82" stroke="#fff" stroke-width="6" opacity=".7" stroke-linecap="round"/>
<rect x="196" y="-30" width="18" height="16" rx="4" fill="#fde68a"/><rect x="-205" y="-26" width="14" height="16" rx="4" fill="#ef4444"/>
<rect x="-20" y="-30" width="34" height="7" rx="3" fill="#000" opacity=".3"/>`;
const car=(col,sp=900,beam=true)=>`${beam?`<path d="M214 -22 L620 -90 L620 60 Z" fill="#fde68a" opacity=".22"/>`:''}${carBody(col)}${wheel(-122,48,sp)}${wheel(132,48,sp)}`;
const police=(t0,sp=900)=>`<path d="M214 -22 L620 -90 L620 60 Z" fill="#fde68a" opacity=".22"/>${carBody('#f8fafc')}<path d="M-205 0 L214 0 L214 40 Q214 52 200 52 L-192 52 Q-205 52 -205 40Z" fill="#111827"/>
<text x="5" y="38" text-anchor="middle" font-family="Inter Tight" font-weight="900" font-size="34" fill="#fff">POLICE</text>
<rect x="-40" y="-122" width="90" height="18" rx="6" fill="#1f2937"/>
<rect x="-38" y="-130" width="42" height="24" rx="8" fill="#ef4444" data-flash="${t0},0.18,0.25"/><rect x="6" y="-130" width="42" height="24" rx="8" fill="#3b82f6" data-flash="${t0+0.18},0.18,0.25"/>
<g data-flash="${t0},0.18,0"><circle cx="-17" cy="-118" r="70" fill="#ef4444" opacity=".35"/></g><g data-flash="${t0+0.18},0.18,0"><circle cx="27" cy="-118" r="70" fill="#3b82f6" opacity=".35"/></g>
${wheel(-122,48,sp)}${wheel(132,48,sp)}`;
const skyline=(seed,base,col,win,per,hmin,hmax)=>{let b='';let x=0;let k=seed;while(x<1080){const w=90+rnd(k++)*110,h=hmin+rnd(k++)*(hmax-hmin);b+=`<rect x="${x}" y="${base-h}" width="${w}" height="${h+4}" fill="${col}"/>`;for(let wy=base-h+30;wy<base-30;wy+=46)for(let wx=x+18;wx<x+w-26;wx+=34)if(rnd(k++)>.55)b+=`<rect x="${wx}" y="${wy}" width="14" height="20" fill="${win}" opacity="${.35+rnd(k++)*.6}"/>`;x+=w+6;}return `<g data-loop="-1080,0,${per}">${b}<g transform="translate(1080,0)">${b}</g></g>`};
const road=(y,per=0.22)=>`<rect x="0" y="${y}" width="1080" height="${1920-y}" fill="#1c1b26"/><rect x="0" y="${y}" width="1080" height="14" fill="#3b3a4d"/><g data-loop="-240,0,${per}">${[...Array(7)].map((_,k)=>`<rect x="${k*240}" y="${y+170}" width="130" height="16" rx="8" fill="#e5e7eb" opacity=".8"/>`).join('')}</g>`;
const lamps=(y,per)=>`<g data-loop="-540,0,${per}">${[0,1,2,3].map(k=>`<g transform="translate(${k*540+120},${y})"><rect x="-6" y="-420" width="12" height="420" fill="#2d2b3d"/><path d="M0 -420 q0 -30 40 -30 l40 0" stroke="#2d2b3d" stroke-width="12" fill="none"/><rect x="62" y="-456" width="44" height="14" rx="6" fill="#fde68a"/><path d="M66 -442 L20 -10 L150 -10 L102 -442Z" fill="#fde68a" opacity=".08"/></g>`).join('')}</g>`;
const stars=(n,h)=>[...Array(n)].map((_,k)=>`<circle cx="${rnd(k+1)*1080}" cy="${rnd(k+50)*h}" r="${1+rnd(k+90)*2.5}" fill="#fff" opacity="${.3+rnd(k+7)*.6}"/>`).join('');
const palm=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})"><path d="M0 0 Q-20 -200 10 -420" stroke="#2a0f3a" stroke-width="26" fill="none" stroke-linecap="round"/>${[-150,-110,-60,-20,30,80,130].map(a=>`<path d="M10 -420 q${Math.cos(a*Math.PI/180)*120} ${-40+Math.abs(a)*0.6} ${Math.cos(a*Math.PI/180)*220} ${60+Math.abs(a)*0.9}" stroke="#2a0f3a" stroke-width="24" fill="none" stroke-linecap="round"/>`).join('')}</g>`;
const T=(x,y,s,c,t,ex='')=>`<text x="${x}" y="${y}" text-anchor="middle" class="anton" font-size="${s}" fill="${c}" ${ex}>${t}</text>`;
const B=(x,y,s,c,t,ex='')=>`<text x="${x}" y="${y}" text-anchor="middle" font-family="Inter Tight" font-weight="900" font-size="${s}" fill="${c}" ${ex}>${t}</text>`;
const pop=(t,inner,d=0.45)=>`<g data-pop="${t},${d}" ${C}>${inner}</g>`;
const stamp=(t,inner)=>`<g data-stamp="${t}" ${C}>${inner}</g>`;
const off=(t,inner)=>`<g data-off="${t}">${inner}</g>`;
const at=(x,y,inner)=>`<g transform="translate(${x},${y})">${inner}</g>`;
// CRT monitor
const crtScreen=(inner,q)=>`<defs><clipPath id="zcrt${q}"><rect x="150" y="640" width="780" height="580" rx="34"/></clipPath><linearGradient id="zcase${q}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9e3d4"/><stop offset="1" stop-color="#bfb7a3"/></linearGradient></defs>
<rect x="380" y="1320" width="320" height="90" fill="#a59d89"/><rect x="250" y="1400" width="580" height="40" rx="14" fill="#bfb7a3"/>
<rect x="80" y="570" width="920" height="760" rx="60" fill="url(#zcase${q})"/><rect x="130" y="620" width="820" height="620" rx="44" fill="#2b2a26"/>
<g clip-path="url(#zcrt${q})"><rect x="150" y="640" width="780" height="580" fill="#07130c"/>${inner}${[...Array(40)].map((_,k)=>`<rect x="150" y="${640+k*15}" width="780" height="5" fill="#000" opacity=".25"/>`).join('')}<rect x="150" y="640" width="780" height="580" fill="url(#zglare${q})" opacity=".25"/></g>
<defs><radialGradient id="zglare${q}" cx=".3" cy=".2" r=".9"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
<circle cx="880" cy="1285" r="12" fill="#22c55e"/><rect x="160" y="1272" width="160" height="22" rx="8" fill="#a59d89"/>`;
// top-down mini city inside screen (screen area 150..930 x 640..1220)
const topCity=()=>{let b='<rect x="150" y="640" width="780" height="580" fill="#2f3b2f"/>';const xs=[150,370,610,850],ys=[640,820,1000,1180];
 for(const x of [150,400,640,880])for(const y of [640,830,1020,1210])b+=`<rect x="${x+20}" y="${y+18}" width="${200}" height="${150}" fill="#55606b"/><rect x="${x+34}" y="${y+32}" width="${80}" height="${60}" fill="#6b7785"/><rect x="${x+126}" y="${y+80}" width="${80}" height="${70}" fill="#7a8796"/>`;
 b+=[800,990,1180].map(y=>`<rect x="150" y="${y}" width="780" height="40" fill="#1f2328"/>`).join('')+[380,620,860].map(x=>`<rect x="${x}" y="640" width="40" height="580" fill="#1f2328"/>`).join('');
 return b};
const tcar=(col)=>`<rect x="-26" y="-14" width="52" height="28" rx="7" fill="${col}"/><rect x="2" y="-11" width="12" height="22" rx="3" fill="#bde3ff"/>`;
const tpol=(t0)=>`<rect x="-26" y="-14" width="52" height="28" rx="7" fill="#f8fafc"/><rect x="-26" y="-14" width="18" height="28" fill="#111827"/><rect x="-4" y="-12" width="8" height="10" fill="#ef4444" data-flash="${t0},0.15,0.2"/><rect x="-4" y="2" width="8" height="10" fill="#3b82f6" data-flash="${t0+0.15},0.15,0.2"/>`;
const chase=(t0,dur)=>{ // red car + police along road loop: y=1010 lane, then up x=640
 const p=`0,${dur},120,1010,960,1010`;
 return `<g data-mv="${p}">${tcar('#ef4444')}</g><g data-mv="${p.replace('120,1010,960','-40,1010,800')}">${tpol(0)}</g>`};
// ---------- scenes
const scenes=[
{cam:"0,1.12,0,0|2.4,1.0,0,0|4.0,1.06,0,0",
 html:S(`${sky('zs0',[[0,'#0b1026'],[.55,'#2a1050'],[.8,'#5b1d5e'],[1,'#1c1b26']])}${stars(70,1100)}<circle cx="900" cy="470" r="60" fill="#fef3c7"/><circle cx="850" cy="585" r="80" fill="#2a1050" opacity=".0"/>
 ${skyline(3,1360,'#24184a','#ffd36a',4)}${skyline(11,1360,'#160f30','#ffb347',2)}${lamps(1360,0.9)}${road(1360)}
 <g transform="translate(0,0)"><g data-mv="0,0.01,1500,0,1500,0,2.2,0.9,-900,0,0,0"><g transform="translate(250,1560) scale(.95)"><g data-bob="3,22,1">${police(2.3)}</g></g></g></g>
 <g data-mv="0,0.9,-700,0,0,0"><g transform="translate(770,1560) scale(.95)"><g data-bob="3,25,0">${car('#e11d48')}</g></g></g>
 <g data-flash="2.5,0.2,0"><rect width="1080" height="1920" fill="#ef4444" opacity=".16"/></g><g data-flash="2.7,0.2,0"><rect width="1080" height="1920" fill="#3b82f6" opacity=".16"/></g>
 ${off(4.0,`${pop(0.35,T(540,860,300,'#fff','GTA','stroke="#ff2e88" stroke-width="16" paint-order="stroke"'))}${stamp(2.5,`<g transform="rotate(-6 540 1060)"><rect x="300" y="975" width="480" height="160" rx="18" fill="#ef4444"/>${T(540,1092,120,'#fff','REATO')}</g>`)}`)}
 <g data-fade="4.0,0.3" style="opacity:0"><rect width="1080" height="1920" fill="#000" opacity=".6"/></g>
 ${pop(4.1,`<rect x="250" y="560" width="580" height="820" rx="26" fill="#7f1d1d"/><rect x="250" y="560" width="60" height="820" rx="20" fill="#5b1414"/><rect x="345" y="620" width="430" height="700" rx="14" fill="none" stroke="#fbbf24" stroke-width="6"/>${B(560,800,56,'#fbbf24','CODICE')}${B(560,870,56,'#fbbf24','PENALE')}<line x1="420" y1="920" x2="700" y2="920" stroke="#fbbf24" stroke-width="5"/>${T(560,1110,150,'#fbbf24','USA')}`,0.5)}`)},
{cam:"0,1.0,0,0|3.0,1.04,0,-20|5.0,1.08,0,-60",
 html:S(`${sky('zs1',[[0,'#3b2416'],[1,'#24150c']])}${[...Array(12)].map((_,k)=>`<rect x="0" y="${k*170}" width="1080" height="4" fill="#000" opacity=".25"/>`).join('')}
 <g data-shake="6.3"><g data-shake="6.32">
 <rect x="40" y="470" width="1000" height="1180" rx="20" fill="#000" opacity=".35"/>
 <rect x="50" y="450" width="485" height="1170" rx="12" fill="#f6edd6"/><rect x="545" y="450" width="485" height="1170" rx="12" fill="#f8f1df"/><rect x="520" y="450" width="40" height="1170" fill="url(#zfold)"/><defs>${lg('zfold',[[0,'#00000000'],[.5,'#00000040'],[1,'#00000000']],0)}</defs>
 ${B(292,530,34,'#7f1d1d','§ 487')}
 <rect x="110" y="700" width="380" height="110" fill="#fde047" opacity=".9" style="transform-box:fill-box;transform-origin:left" data-grow="4.7,0.4"/>
 <text x="292" y="795" text-anchor="middle" class="anton" font-size="140" fill="#1f2937" data-type="0.1,0.35" data-text="GRAND"></text>
 <text x="292" y="985" text-anchor="middle" class="anton" font-size="140" fill="#1f2937" data-type="0.5,0.3" data-text="THEFT"></text>
 <text x="292" y="1175" text-anchor="middle" class="anton" font-size="140" fill="#1f2937" data-type="0.7,0.3" data-text="AUTO"></text>
 ${[...Array(9)].map((_,k)=>`<rect x="100" y="${1250+k*36}" width="${300+rnd(k)*80}" height="12" rx="6" fill="#cbbf9f" style="transform-box:fill-box;transform-origin:left" data-grow="${0.9+k*0.05},0.4"/>`).join('')}
 ${pop(4.7,`<path d="M560 755 l60 0" stroke="#dc2626" stroke-width="8" stroke-linecap="round"/>${B(800,780,80,'#dc2626','grave','font-style="italic"')}`)}
 ${pop(2.1,`<path d="M560 945 l60 0" stroke="#dc2626" stroke-width="8" stroke-linecap="round"/>${B(800,970,80,'#dc2626','furto','font-style="italic"')}`)}
 ${pop(2.4,`<path d="M560 1135 l60 0" stroke="#dc2626" stroke-width="8" stroke-linecap="round"/>${B(800,1160,80,'#dc2626','d\'auto','font-style="italic"')}`)}
 ${stamp(3.4,`<g transform="rotate(-12 790 1400)"><circle cx="790" cy="1400" r="150" fill="none" stroke="#1d4ed8" stroke-width="12"/><circle cx="790" cy="1400" r="124" fill="none" stroke="#1d4ed8" stroke-width="4"/>${T(790,1440,110,'#1d4ed8','USA')}</g>`)}
 </g></g>
 <g transform="translate(980,1640)"><g data-mv="0,0.01,600,0,600,0,5.4,0.4,600,0,0,0"><g data-rot="5.7,0.6,-70,0" style="transform-origin:0 0"><rect x="-470" y="-28" width="460" height="56" rx="24" fill="#5b2a0e"/><rect x="-640" y="-110" width="190" height="220" rx="30" fill="#3f1d0b"/><rect x="-640" y="-110" width="46" height="220" rx="16" fill="#7c3a12"/><rect x="-496" y="-110" width="46" height="220" rx="16" fill="#7c3a12"/></g></g></g>
 `)},
{cam:"0,1.05,0,0|2.0,1.0,0,0|3.4,1.08,0,0",
 html:S(`${sky('zs2',[[0,'#2b1055'],[.45,'#d53369'],[.75,'#ff9a3c'],[1,'#ff9a3c']])}${stars(30,500)}
 <defs>${lg('zsun',[[0,'#fde047'],[1,'#ff2e88']])}</defs><circle cx="540" cy="1080" r="330" fill="url(#zsun)"/>${[0,1,2,3,4,5].map(k=>`<rect x="200" y="${1110+k*42}" width="680" height="${6+k*4}" fill="#e0497a"/>`).join('')}
 <path d="M0 1300 L160 1150 L300 1240 L460 1110 L620 1230 L780 1130 L930 1220 L1080 1150 L1080 1360 L0 1360Z" fill="#3b0d4f"/>
 <g data-loop="-1080,0,1.6">${[0,1].map(r=>[90,430,760].map(x=>palm(x+r*1080,1370,0.55)).join('')).join('')}</g>
 ${road(1360,0.18)}
 <g data-drop="0.3,0.7,-700">${at(540,520,`<rect x="-330" y="-90" width="660" height="180" rx="22" fill="#15803d" stroke="#fff" stroke-width="8"/>${B(0,30,90,'#fff','CALIFORNIA')}<rect x="-14" y="90" width="28" height="0" fill="#888"/>`)}</g>
 <g data-mv="0,0.01,-1200,0,-1200,0,2.0,0.7,-1200,0,0,0"><g transform="translate(540,1560) scale(1.05)"><g data-bob="3,24,0">${car('#7c3aed',1100)}</g></g></g>
 ${stamp(2.9,`<g transform="rotate(-5 540 760)"><rect x="250" y="690" width="580" height="140" rx="18" fill="#ef4444"/>${T(540,800,100,'#fff','GRAND THEFT')}</g>`)}
 <g data-pop="3.5,0.4" ${C}><g data-bob="8,4,0">${at(540,1050,`<path d="M-200 -90 L170 -90 L250 0 L170 90 L-200 90Z" fill="#fff"/><circle cx="185" cy="0" r="16" fill="#d53369"/>
  ${off(4.0,pop(3.5,B(-20,30,96,'#111827','$ 80.000')))}${off(4.5,pop(4.0,B(-20,30,96,'#111827','$ 5.000')))}${pop(4.5,B(-20,30,96,'#111827','$ 500'))}`)}</g></g>`)},
{cam:"0,1.0,0,0",
 html:S(`<rect width="1080" height="1920" fill="#0f2a4a"/>${[...Array(30)].map((_,k)=>`<path d="M${-100+rnd(k)*1200} ${rnd(k+3)*1920} q40 -14 80 0 t80 0" stroke="#3b6fa0" stroke-width="5" fill="none" opacity=".5"/>`).join('')}
 <g transform="translate(540,1150)"><g data-sc="0,0.01,1.15,1.15,2.0,1.2,1.15,3.2" ${O}><g data-mv="0,0.01,${-M.usa[0]},${-M.usa[1]},${-M.usa[0]},${-M.usa[1]},2.0,1.2,${-M.usa[0]},${-M.usa[1]},${-M.dundee[0]},${-M.dundee[1]}">
  ${Object.entries(M.paths).map(([n,d])=>`<path d="${d}" fill="${n=='United States of America'?'#f4a261':n=='United Kingdom'?'#2ec4b6':'#e9d8a6'}" stroke="#0f2a4a" stroke-width="1.5" vector-effect="non-scaling-stroke"/>`).join('')}
  <path d="M${M.usa[0]} ${M.usa[1]} Q${(M.usa[0]+M.dundee[0])/2} ${M.dundee[1]-500} ${M.dundee[0]} ${M.dundee[1]}" stroke="#fff" stroke-width="5" stroke-dasharray="1 0" fill="none" vector-effect="non-scaling-stroke" data-draw="1.9,1.2"/>
 </g></g></g>
 ${off(2.0,`${pop(0.5,`<rect x="390" y="1220" width="300" height="120" rx="20" fill="#111827"/>${T(540,1312,96,'#fff','USA')}`)}${stamp(1.2,`<path d="M380 1200 L700 1360 M700 1200 L380 1360" stroke="#ef4444" stroke-width="26" stroke-linecap="round"/>`)}`)}
 ${pop(2.5,`<rect x="250" y="470" width="580" height="160" rx="26" fill="#2ec4b6"/>${T(540,590,120,'#0f2a4a','SCOZIA')}`)}
 <g data-drop="3.1,0.7,-500"><path d="M540 1150 c-70 -90 -110 -130 -110 -190 a110 110 0 0 1 220 0 c0 60 -40 100 -110 190z" fill="#ef4444" stroke="#fff" stroke-width="8"/><circle cx="540" cy="960" r="40" fill="#fff"/></g>
 <circle cx="540" cy="1150" r="30" fill="none" stroke="#fff" stroke-width="6" data-ripple="3.6,1.2"/>
 ${pop(3.2,`<rect x="660" y="900" width="340" height="110" rx="20" fill="#fff"/>${T(830,985,84,'#0f2a4a','DUNDEE')}`)}
 <g data-rise="3.7,0.6,500">${at(540,1560,`<rect x="-420" y="-200" width="840" height="400" rx="34" fill="#111827" opacity=".92"/>
  <rect x="-360" y="-120" width="360" height="270" fill="#9a3412"/><path d="M-380 -120 L-180 -200 L20 -120Z" fill="#7c2d12"/>${[0,1,2].map(r=>[0,1,2,3].map(c=>`<rect x="${-340+c*85}" y="${-90+r*75}" width="50" height="45" fill="#fde68a" data-flash="${3.8+((r*4+c)%5)*0.15},9,0.2"/>`).join('')).join('')}
  ${pop(4.3,`<rect x="40" y="-150" width="340" height="110" rx="16" fill="#fff"/>${B(210,-78,52,'#111827','DMA DESIGN')}`)}
  ${stamp(5.6,`<rect x="60" y="-10" width="300" height="170" rx="16" fill="#ff2e88"/>${T(210,135,140,'#fff','1995')}`)}`)}</g>`)},
{cam:"0,1.15,0,40|1.6,1.0,0,0|3.2,1.05,0,60",
 html:S(`${sky('zs4',[[0,'#1a0b2e'],[1,'#3b0f4a']])}<rect x="0" y="1440" width="1080" height="480" fill="#24112f"/>
 ${crtScreen(`${topCity()}${chase(0,5.5)}
  <g data-pop="2.0,0.4" ${C}><rect x="170" y="840" width="740" height="170" fill="#000" opacity=".8"/>${T(540,965,118,'#fde047',"RACE'N'CHASE")}</g>
  <g data-rise="3.2,0.4,60"><rect x="190" y="1060" width="330" height="110" rx="14" fill="#1d4ed8"/>${B(355,1135,60,'#fff','GUARDIA')}<rect x="560" y="1060" width="330" height="110" rx="14" fill="#b91c1c"/>${B(725,1135,60,'#fff','LADRO')}</g>
  <g data-mv="0,0.01,0,0,0,0,4.9,0.25,0,0,370,0"><rect x="180" y="1050" width="350" height="130" rx="18" fill="none" stroke="#fde047" stroke-width="10" data-fade="4.4,0.15" style="opacity:0"/></g>`,'a')}
 ${pop(4.4,at(270,1640,`<circle r="110" fill="#1d4ed8"/><path d="M-50 -30 L0 -60 L50 -30 L40 40 L0 70 L-40 40Z" fill="#fde047"/>`))}${pop(5.0,at(810,1640,`<circle r="110" fill="#b91c1c"/><rect x="-60" y="-30" width="120" height="44" rx="20" fill="#111"/><circle cx="-24" cy="-8" r="12" fill="#fff"/><circle cx="24" cy="-8" r="12" fill="#fff"/>`))}`)},
{cam:"0,1.0,0,0|1.8,1.06,0,30|3.4,1.0,0,0",
 html:S(`${sky('zs5',[[0,'#1a0b2e'],[1,'#3b0f4a']])}<rect x="0" y="1440" width="1080" height="480" fill="#24112f"/>
 ${crtScreen(`${topCity()}${chase(0,6)}
  ${off(1.8,`<rect x="170" y="840" width="740" height="170" fill="#000" opacity=".8"/>${T(540,965,118,'#fde047',"RACE'N'CHASE")}`,'b')}
  ${[...Array(10)].map((_,k)=>`<rect x="150" y="${650+rnd(k+4)*560}" width="780" height="${10+rnd(k)*40}" fill="${['#ff2e88','#22d3ee','#fde047'][k%3]}" data-flash="${1.8+rnd(k+9)*0.1},0.06,0" style="opacity:0"/>`).join('')}
  <g data-fade="1.95,0.2" style="opacity:0"><rect x="170" y="700" width="740" height="460" fill="#000" opacity=".85"/></g>
  ${pop(2.2,T(540,840,120,'#fff','GRAND'),0.35)}${pop(2.4,T(540,980,120,'#fff','THEFT'),0.35)}${pop(2.7,T(540,1120,120,'#ff2e88','AUTO'),0.35)}`)}
 ${pop(3.9,B(540,1530,56,'#fff','ESCE NEL'))}${stamp(4.3,`<g transform="rotate(-4 540 1650)"><rect x="330" y="1560" width="420" height="190" rx="22" fill="#ff2e88"/>${T(540,1720,170,'#fff','1997')}</g>`)}`)},
{cam:"0,1.1,0,0|1.5,1.0,0,0",
 html:S(`${sky('zs6',[[0,'#0b1026'],[.6,'#2a1050'],[1,'#5b1d5e']])}${stars(60,1200)}${skyline(5,1920,'#160f30','#ffb347',6)}<rect width="1080" height="1920" fill="#000" opacity=".35"/>
 ${pop(0.3,`<rect x="390" y="700" width="300" height="300" fill="#fff"/>${T(540,917,186,'#000','MN<tspan fill="#E63946">.</tspan>')}`,0.5)}<g data-rise="0.8,0.5"><text x="540" y="1170" text-anchor="middle" font-family="Inter Tight" font-size="96" font-weight="900" fill="#fff" letter-spacing="-4">madeinnews<tspan fill="#E63946">.</tspan></text></g><g data-rise="1.2,0.5">${B(540,1270,46,'#22D3EE','PILLOLE DI SAPERE, OGNI GIORNO')}</g>`)}];
const old=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
old.scenes.forEach((s,i)=>{s.html=scenes[i].html;s.cam=scenes[i].cam;});old.logo=true;delete old.source;old.accent='#FF2E88';
fs.writeFileSync(process.argv[3],JSON.stringify(old));console.log('ok');

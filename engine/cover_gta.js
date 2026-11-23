const fs=require('fs');

const S=i=>`<svg viewBox="0 0 1080 1920" width="1080" height="1920" style="position:absolute;inset:0;overflow:visible">${i}</svg>`;
const C='style="transform-box:fill-box;transform-origin:center"';
const O='style="transform-origin:0 0"';
const lg=(id,st,v=1)=>`<linearGradient id="${id}" x1="0" y1="0" x2="${v?0:1}" y2="${v?1:0}">${st.map(([o,c])=>`<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
const sky=(id,st)=>`<defs>${lg(id,st)}</defs><rect width="1080" height="1920" fill="url(#${id})"/>`;
const rnd=(k)=>{const x=Math.sin(k*999.7)*43758.5;return x-Math.floor(x)};
// ---------- components
const wheel=(x,y,sp)=>`<g transform="translate(${x},${y})"><g data-spin="${sp}" ${C}><circle r="42" fill="#15151c"/><circle r="22" fill="#c7c9d1"/>${[0,60,120].map(a=>`<rect x="-3" y="-22" width="6" height="44" fill="#6b6f7a" transform="rotate(${a})"/>`).join('')}<circle r="6" fill="#333"/></g></g>`;
const carBody=(col,glass='#9fd8ff')=>`<ellipse cx="5" cy="74" rx="215" ry="16" fill="#000" opacity=".35"/>
<g transform="translate(9,0) scale(-1,1)"><path d="M-205 40 L-205 -5 Q-200 -38 -150 -44 L-92 -50 L-42 -96 Q-26 -106 2 -106 L72 -106 Q98 -106 114 -90 L152 -50 L192 -42 Q214 -36 214 -2 L214 40 Q214 52 200 52 L-192 52 Q-205 52 -205 40Z" fill="${col}"/>
<path d="M-205 18 L214 18 L214 40 Q214 52 200 52 L-192 52 Q-205 52 -205 40Z" fill="#000" opacity=".18"/>
<path d="M-74 -52 L-34 -92 L22 -92 L22 -52Z" fill="${glass}"/><path d="M34 -92 L70 -92 Q86 -92 97 -80 L124 -52 L34 -52Z" fill="${glass}"/>
<path d="M-60 -60 L-40 -82" stroke="#fff" stroke-width="6" opacity=".7" stroke-linecap="round"/></g>
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

const bx=(y,w,h,fill,inner)=>`<g class="bx"><rect x="${540-w/2}" y="${y}" width="${w}" height="${h}" rx="26" fill="${fill}"/>${inner}</g>`;
const svg=`${sky('zs0',[[0,'#0b1026'],[.55,'#2a1050'],[.8,'#5b1d5e'],[1,'#1c1b26']])}${stars(70,1100)}
 ${skyline(3,1250,'#24184a','#ffd36a',4)}${skyline(11,1250,'#160f30','#ffb347',2)}${road(1250)}
 <g transform="translate(535,1440) scale(1.15)">${car('#e11d48',900,false)}</g>
 <rect width="1080" height="1920" fill="url(#zfade)"/><defs><linearGradient id="zfade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".55"/><stop offset=".55" stop-color="#000" stop-opacity=".15"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient></defs>
 <g transform="translate(0,-150)">${bx(515,800,140,'#fff',B(540,610,74,'#111827','PERCHÉ SI CHIAMA'))}
 <g class="bx"><rect x="0" y="700" width="1080" height="380" fill="none"/><text x="540" y="1060" text-anchor="middle" class="anton" font-size="400" fill="#fff" stroke="#ff2e88" stroke-width="22" paint-order="stroke">GTA?</text></g>
 ${bx(1115,840,120,'#ff2e88',B(540,1195,58,'#fff','LA RISPOSTA È UN REATO'))}</g>
 <g transform="translate(540,1590)"><rect x="-175" y="-38" width="350" height="76" rx="38" fill="#000" opacity=".65"/><rect x="-150" y="-24" width="70" height="48" fill="#fff"/><text x="-115" y="14" text-anchor="middle" class="anton" font-size="34" fill="#000">MN.</text><text x="-66" y="13" font-family="Inter Tight" font-weight="900" font-size="38" fill="#fff" letter-spacing="-1.5">madeinnews.</text></g>`;
module.exports=svg;

const fs=require('fs');
const S=i=>`<svg viewBox="0 0 1080 1920" width="1080" height="1920" style="position:absolute;inset:0;overflow:visible">${i}</svg>`;
const C='style="transform-box:fill-box;transform-origin:center"';
const lg=(id,st)=>`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${st.map(([o,c])=>`<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
const sky=(id,st)=>`<defs>${lg(id,st)}</defs><rect width="1080" height="1920" fill="url(#${id})"/>`;
const rnd=k=>{const x=Math.sin(k*999.7)*43758.5;return x-Math.floor(x)};
const T=(x,y,s,c,t,ex='')=>`<text x="${x}" y="${y}" text-anchor="middle" class="anton" font-size="${s}" fill="${c}" ${ex}>${t}</text>`;
const B=(x,y,s,c,t,ex='')=>`<text x="${x}" y="${y}" text-anchor="middle" font-family="Inter Tight" font-weight="900" font-size="${s}" fill="${c}" ${ex}>${t}</text>`;
const pop=(t,inner,d=0.45)=>`<g data-pop="${t},${d}" ${C}>${inner}</g>`;
const stamp=(t,inner)=>`<g data-stamp="${t}" ${C}>${inner}</g>`;
const off=(t,inner)=>`<g data-off="${t}">${inner}</g>`;
const at=(x,y,inner)=>`<g transform="translate(${x},${y})">${inner}</g>`;
const box=(y,w,h,fill,inner)=>`<g class="bx"><rect x="${540-w/2}" y="${y}" width="${w}" height="${h}" rx="24" fill="${fill}"/>${inner}</g>`;
const snowLayer=(n,seed,per,rmax)=>{const f=[...Array(n)].map((_,k)=>`<circle cx="${rnd(k+seed)*1080}" cy="${rnd(k+seed+300)*1920}" r="${2+rnd(k+seed+600)*rmax}" fill="#fff" opacity="${.5+rnd(k+seed+9)*.5}"/>`).join('');return `<g data-loop="0,1920,${per}">${f}<g transform="translate(0,-1920)">${f}</g></g>`};
const snow=()=>snowLayer(45,1,9,4)+snowLayer(30,77,6,7);
const stars=(n,h)=>[...Array(n)].map((_,k)=>`<circle cx="${rnd(k+1)*1080}" cy="${rnd(k+50)*h}" r="${1+rnd(k+90)*2.5}" fill="#fff" opacity="${.3+rnd(k+7)*.6}"/>`).join('');
const house=(x,y,w,h,wall,roof)=>`<g transform="translate(${x},${y})"><rect x="${-w/2}" y="${-h}" width="${w}" height="${h}" fill="${wall}"/><path d="M${-w/2-20} ${-h} L0 ${-h-w*0.45} L${w/2+20} ${-h}Z" fill="${roof}"/><path d="M${-w/2-20} ${-h} L0 ${-h-w*0.45} L${w/2+20} ${-h} L${w/2+8} ${-h+14} L0 ${-h-w*0.45+16} L${-w/2-8} ${-h+14}Z" fill="#fff"/><rect x="${-w/4-18}" y="${-h+40}" width="36" height="44" fill="#fde68a" data-flash="${rnd(x)*2},${2+rnd(y)},0.55"/><rect x="${w/4-18}" y="${-h+40}" width="36" height="44" fill="#fde68a"/><rect x="-20" y="-70" width="40" height="70" fill="#5b2a0e"/></g>`;
const village=(y)=>`<path d="M0 ${y-40} Q270 ${y-90} 540 ${y-50} T1080 ${y-60} L1080 1920 L0 1920Z" fill="#dfe8f7"/>`+house(170,y-20,190,170,'#7f1d1d','#3f1d0b')+house(910,y-20,190,170,'#1e3a8a','#3f1d0b')+house(380,y+10,150,140,'#166534','#3f1d0b')+house(700,y+10,150,140,'#92400e','#3f1d0b');
const tree=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})"><rect x="-20" y="0" width="40" height="60" fill="#5b2a0e"/><path d="M0 -360 L140 -160 L75 -160 L190 0 L-190 0 L-75 -160 L-140 -160Z" fill="#15803d"/>${[[-60,-60,'#ef4444'],[60,-90,'#fde047'],[-30,-200,'#3b82f6'],[40,-230,'#ef4444'],[0,-120,'#fde047']].map(([a,b,c],k)=>`<circle cx="${a}" cy="${b}" r="14" fill="${c}" data-flash="${k*0.2},0.6,0.4"/>`).join('')}<path d="M0 -420 l16 36 40 4 -30 26 9 40 -35 -22 -35 22 9 -40 -30 -26 40 -4z" fill="#fde047"/></g>`;
const book=(open)=>`<rect x="-360" y="-250" width="720" height="500" rx="22" fill="#7f1d1d"/><rect x="-340" y="-232" width="335" height="464" rx="10" fill="#fbf4e2"/><rect x="5" y="-232" width="335" height="464" rx="10" fill="#fbf4e2"/><rect x="-14" y="-232" width="28" height="464" fill="#000" opacity=".12"/>${[...Array(8)].map((_,k)=>`<rect x="-300" y="${-180+k*48}" width="${240+rnd(k)*30}" height="14" rx="7" fill="#d9cba6" style="transform-box:fill-box;transform-origin:left" data-grow="${open+k*0.05},0.3"/><rect x="45" y="${-180+k*48}" width="${240+rnd(k+9)*30}" height="14" rx="7" fill="#d9cba6" style="transform-box:fill-box;transform-origin:left" data-grow="${open+0.4+k*0.05},0.3"/>`).join('')}`;
const cal=(w,h,head,hcol,inner)=>`<rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="26" fill="#fff"/><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h*0.27}" rx="26" fill="${hcol}"/><rect x="${-w/2}" y="${-h/2+h*0.2}" width="${w}" height="${h*0.07}" fill="${hcol}"/><g class="bx"><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h*0.27}" fill="none"/>${B(0,-h/2+h*0.19,h*0.12,'#fff',head)}</g><circle cx="${-w/4}" cy="${-h/2}" r="14" fill="#334155"/><circle cx="${w/4}" cy="${-h/2}" r="14" fill="#334155"/><g class="bx"><rect x="${-w/2}" y="${-h/2+h*0.27}" width="${w}" height="${h*0.73}" fill="none"/>${inner}</g>`;
const NIGHT=[[0,'#0b1026'],[.6,'#1e2a5a'],[1,'#3b4a8a']];

const svg=`${sky('n0',NIGHT)}${stars(60,1100)}${village(1500)}
 <rect width="1080" height="1920" fill="url(#cf)"/><defs><linearGradient id="cf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".5"/><stop offset=".6" stop-color="#000" stop-opacity=".1"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient></defs>
 ${[...Array(45)].map((_,k)=>`<circle cx="${rnd(k+1)*1080}" cy="${rnd(k+301)*1920}" r="${2+rnd(k+601)*6}" fill="#fff" opacity="${.5+rnd(k+10)*.5}"/>`).join('')}
 <g class="bx"><rect x="290" y="380" width="500" height="130" rx="26" fill="#fff"/>${B(540,470,72,'#1e2a5a','PERCHÉ IL')}</g>
 <g class="bx"><rect x="0" y="540" width="1080" height="330" fill="none"/><text x="540" y="840" text-anchor="middle" class="anton" font-size="300" fill="#fff" stroke="#dc2626" stroke-width="20" paint-order="stroke">25</text></g>
 <g class="bx"><rect x="90" y="880" width="900" height="190" rx="30" fill="#dc2626"/>${T(540,1010,150,'#fff','DICEMBRE?')}</g>
 <g class="bx"><rect x="140" y="1100" width="800" height="110" rx="26" fill="#fde047"/>${B(540,1175,54,'#1e2a5a','NELLA BIBBIA NON C’È')}</g>
 <g transform="translate(540,1560)"><rect x="-175" y="-38" width="350" height="76" rx="38" fill="#000" opacity=".7"/><rect x="-150" y="-24" width="70" height="48" fill="#fff"/><text x="-115" y="14" text-anchor="middle" class="anton" font-size="34" fill="#000">MN.</text><text x="-66" y="13" font-family="Inter Tight" font-weight="900" font-size="38" fill="#fff" letter-spacing="-1.5">madeinnews.</text></g>`;
module.exports=svg;

// Reel illustrato v3: scene SVG animate costruite in tempo reale. node explainer3.js cfg.json out.mp4
const { chromium } = require('playwright'); const fs=require('fs'); const {execSync}=require('child_process');
const [,, cfgF, out]=process.argv; const cfg=JSON.parse(fs.readFileSync(cfgF,'utf8'));
const FPS=30, N=cfg.scenes.length, D=cfg.scenes.map(s=>s.dur), ST=D.map((_,i)=>D.slice(0,i).reduce((a,b)=>a+b,0)), T=D.reduce((a,b)=>a+b,0);
const A=cfg.accent||'#FACC15', R='#E63946', Y='#FFD400';
const LIB=fs.readFileSync(__dirname+'/node_modules/lottie-web/build/player/lottie.min.js','utf8');
const LOT={};for(const s of cfg.scenes){for(const m of (s.html.match(/data-lot="([^"]+)"/g)||[])){const n=m.slice(10,-1);if(!LOT[n])LOT[n]=JSON.parse(fs.readFileSync(__dirname+'/assets/lottie/'+n+'.json','utf8'));}}
const B64=f=>'data:image/jpeg;base64,'+fs.readFileSync(f).toString('base64');
const html=`<html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter+Tight:wght@600;800;900&family=Gochi+Hand&family=Luckiest+Guy&display=block" rel="stylesheet"><style>
*{margin:0;box-sizing:border-box}body{width:1080px;height:1920px;background:${cfg.bg||'#07070a'};color:#fff;font-family:'Inter Tight';overflow:hidden;position:relative}
#grid{display:none;position:absolute;inset:-200px;background-image:linear-gradient(#ffffff08 2px,transparent 2px),linear-gradient(90deg,#ffffff08 2px,transparent 2px);background-size:90px 90px}
#glow{display:none;position:absolute;width:1300px;height:1300px;left:-110px;top:300px;border-radius:50%;background:radial-gradient(circle,${A}26,transparent 62%)}
.ttl{display:none;position:absolute;top:170px;left:0;right:0;text-align:center;z-index:10}.ttl span{display:inline-block;background:#fff;color:#000;font:900 58px/1.1 'Inter Tight';letter-spacing:-2px;padding:6px 20px;margin:2px 0}
.stage{position:absolute;inset:0;width:1080px;height:1920px}
.sc{position:absolute;inset:0;display:none}
svg text{font-family:'Inter Tight'}
.lbl{font:900 44px 'Inter Tight';letter-spacing:-1px}.anton{font-family:Anton}
.cap{position:absolute;top:250px;left:70px;right:70px;text-align:center;font:900 92px/1.1 'Inter Tight';letter-spacing:-2px;text-transform:none;display:flex;flex-wrap:wrap;justify-content:center;gap:4px 24px;z-index:10;text-shadow:0 6px 24px #000}
.cap span{text-shadow:0 4px 18px #0009,0 2px 4px #0008}.cap span.on{color:#fff}${cfg.light?`.cap{text-shadow:none}.cap span{text-shadow:none}.cap span.on{color:#1b1b1f}`:''}
.foot{display:none;position:absolute;bottom:150px;left:0;right:0;text-align:center;font:900 40px 'Inter Tight';letter-spacing:-1.5px;z-index:10}.foot b{color:${R}}
.lg{position:absolute;bottom:62px;left:50%;transform:translateX(-50%);display:flex;justify-content:center;align-items:center;gap:14px;z-index:10;background:#000a;padding:10px 22px;border-radius:40px}.lgq{background:#fff;color:#000;font:400 34px Anton;padding:4px 10px;line-height:1.1}.lgt{color:#fff;font:900 36px 'Inter Tight';letter-spacing:-1.5px}.lg i{font-style:normal;color:#E63946}.lg.plain{background:none;padding:0}.lg.plain .lgq{background:#1b1b1f;color:#fff}.lg.plain .lgt{color:#1b1b1f}.src{position:absolute;bottom:60px;opacity:.6;left:0;right:0;text-align:center;font:600 24px 'Inter Tight';color:#777;z-index:10}
.cr{position:absolute;right:30px;bottom:20px;font:600 20px 'Inter Tight';color:#fffc;background:#000a;padding:4px 10px}
#bar{display:none;position:absolute;top:0;left:0;height:12px;background:${A};z-index:20}
</style></head><body><div id="grid"></div><div id="glow"></div><div id="bar"></div>
<div class="ttl">${cfg.title.map(t=>`<span>${t}</span>`).join('<br>')}</div>
<div class="stage">${cfg.scenes.map((s,i)=>`<div class="sc" id="s${i}" ${s.cam?`data-cam="${s.cam}"`:''}><div class="cam" style="position:absolute;inset:0;transform-origin:50% 50%">${s.html.replace(/PHOTO\((.+?)\)/g,(m,f)=>B64(f)).replace(/(<svg viewBox="0 0 1080 1100"[^>]*>)/,'$1<g class="autoc">').replace(/<\/svg>(?![\s\S]*<\/svg>)/,'</g></svg>')}</div></div>`).join('')}</div>
<div class="cap" id="cap"></div><div class="foot">madeinnews<b>.</b></div>${cfg.logo?`<div class="lg${cfg.logo=='plain'?' plain':''}"><span class="lgq">MN<i>.</i></span><span class="lgt">madeinnews<i>.</i></span></div>`:`<div class="src">${cfg.source||''}</div>`}
<script>${LIB}</script><script>
const LOTD=${JSON.stringify(LOT)};
const D=${JSON.stringify(D)},ST=${JSON.stringify(ST)},N=${N},T=${T},PAD=${cfg.pad||0.35},W=${JSON.stringify(cfg.scenes.map(s=>s.words||[]))},WM=${JSON.stringify(cfg.wordmap||{})};
const dw=w=>{const m=w.match(/^(.*?)([.,:;!?]*)$/);const k=m[1].toLowerCase();return (WM[k]!==undefined?WM[k]:m[1])+m[2]};
const cl=x=>Math.min(Math.max(x,0),1), e=t=>1-Math.pow(1-cl(t),3), eio=t=>{t=cl(t);return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}, eb=t=>{t=cl(t);const c=1.9;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2)};
const bounce=t=>{t=cl(t);const n=7.5625,d=2.75;if(t<1/d)return n*t*t;if(t<2/d)return n*(t-=1.5/d)*t+.75;if(t<2.5/d)return n*(t-=2.25/d)*t+.9375;return n*(t-=2.625/d)*t+.984375};
document.querySelectorAll('[data-draw]').forEach(p=>{const L=p.getTotalLength?p.getTotalLength():1000;p.dataset.len=L;p.style.strokeDasharray=L;p.style.strokeDashoffset=L});
const CH=W.map(ws=>{const o=[];let c=[];ws.forEach(w=>{c.push(w);if(c.length>=2||/[.,:;!?]$/.test(w.w)){o.push(c);c=[]}});if(c.length)o.push(c);return o});
let CUR=[];const wt=s=>{const w=s.slice(1).toLowerCase();const f=CUR.find(x=>x.w.toLowerCase().replace(/[^a-z0-9àèéìòù']/g,'').startsWith(w));return f?f.t0-PAD*0:0};
const num=(el,a)=>(el.dataset[a]||'0').split(',').map(v=>v.startsWith('@')?wt(v):Number(v));
function anim(root,lt,D){
 root.querySelectorAll('[data-draw]').forEach(p=>{const [s,d]=num(p,'draw');p.style.strokeDashoffset=p.dataset.len*(1-eio((lt-s)/d))});
 root.querySelectorAll('[data-fill]').forEach(p=>{const [s,d]=num(p,'fill');p.style.fillOpacity=e((lt-s)/d)});
 root.querySelectorAll('[data-pop]').forEach(p=>{const [s,d=0.45]=num(p,'pop');const k=Math.max(0,eb((lt-s)/d));p.style.transform='scale('+k+')';p.style.opacity=lt<s?0:1});
 root.querySelectorAll('[data-fade]').forEach(p=>{const [s,d=0.4]=num(p,'fade');p.style.opacity=e((lt-s)/d)});
 root.querySelectorAll('[data-rise]').forEach(p=>{const [s,d=0.5,dist=80]=num(p,'rise');const k=e((lt-s)/d);p.style.opacity=k;p.style.transform='translateY('+(1-k)*dist+'px)'});
 root.querySelectorAll('[data-slide]').forEach(p=>{const [s,d=0.5,dist=-400]=num(p,'slide');const k=e((lt-s)/d);p.style.opacity=k;p.style.transform='translateX('+(1-k)*dist+'px)'});
 root.querySelectorAll('[data-drop]').forEach(p=>{const [s,d=0.7,dist=-500]=num(p,'drop');const k=bounce((lt-s)/d);p.style.opacity=lt<s?0:1;p.style.transform='translateY('+(1-k)*dist+'px)'});
 root.querySelectorAll('[data-fall]').forEach(p=>{const [s,d=0.6,dist=-600]=num(p,'fall');const k=(lt-s)/d;p.style.opacity=k<0||k>1.05?0:1;p.style.transform='translateY('+(Math.min(k,1)*Math.min(k,1)*-dist+dist)+'px) rotate('+(1-cl(k))*25+'deg)'});
 root.querySelectorAll('[data-stamp]').forEach(p=>{const [s,d=0.35]=num(p,'stamp');const k=cl((lt-s)/d);p.style.opacity=lt<s?0:1;p.style.transform='scale('+(3-2*e(k))+')'});
 root.querySelectorAll('[data-count]').forEach(p=>{const [s,d,to]=num(p,'count');const dec=+(p.dataset.dec||0);p.textContent=(to*e((lt-s)/d)).toFixed(dec).replace('.',',')+(p.dataset.suf||'')});
 root.querySelectorAll('[data-grow]').forEach(p=>{const [s,d]=num(p,'grow');p.style.transform='scaleX('+e((lt-s)/d)+')'});
 root.querySelectorAll('[data-bob]').forEach(p=>{const [amp=12,sp=1.5,ph=0]=num(p,'bob');p.style.transform='translateY('+(Math.sin(lt*sp+ph)*amp)+'px)'});
 root.querySelectorAll('[data-pan]').forEach(p=>{const [dx=0,dy=0]=num(p,'pan');const k=eio(lt/D);p.style.transform='translate('+(dx*k)+'px,'+(dy*k)+'px)'});
 root.querySelectorAll('[data-donut]').forEach(p=>{const [s,d,pct]=num(p,'donut');const L=+p.getAttribute('data-c');p.style.strokeDashoffset=L*(1-pct/100*e((lt-s)/d))});
 root.querySelectorAll('[data-spin]').forEach(p=>{const [sp]=num(p,'spin');p.style.transform='rotate('+lt*sp+'deg)'});
 root.querySelectorAll('[data-ripple]').forEach(p=>{const [s,per=1.4]=num(p,'ripple');const k=((lt-s)%per)/per;p.setAttribute('r',lt<s?0:10+k*90);p.style.opacity=lt<s?0:1-k});
 root.querySelectorAll('[data-steam]').forEach(p=>{const [s,ph,x0]=num(p,'steam');const k=((lt-s+ph)%2.2)/2.2;const on=lt>=s;p.setAttribute('cy',-40-k*260);p.setAttribute('cx',x0+Math.sin(k*6+ph)*30);p.setAttribute('r',20+k*60);p.style.opacity=on?(1-k)*0.8:0});
 root.querySelectorAll('[data-loop]').forEach(p=>{const [dx=0,dy=0,per=1]=num(p,'loop');const k=(lt%per)/per;p.style.transform='translate('+(dx*k)+'px,'+(dy*k)+'px)'});
 root.querySelectorAll('[data-flash]').forEach(p=>{const [s,per=0.25,lo=0]=num(p,'flash');p.style.opacity=lt<s?0:(Math.floor((lt-s)/per)%2?lo:1)});
 root.querySelectorAll('[data-mv]').forEach(p=>{const v=num(p,'mv');let x=v[2],y=v[3];for(let i=0;i+5<v.length+1&&i<v.length;i+=6){const k=eio((lt-v[i])/v[i+1]);if(lt>=v[i]){x=v[i+2]+(v[i+4]-v[i+2])*k;y=v[i+3]+(v[i+5]-v[i+3])*k;}}p.style.transform='translate('+x+'px,'+y+'px)'});
 root.querySelectorAll('[data-sc]').forEach(p=>{const v=num(p,'sc');let z=v[2];for(let i=0;i<v.length;i+=4){if(lt>=v[i])z=v[i+2]+(v[i+3]-v[i+2])*eio((lt-v[i])/v[i+1]);}p.style.transform='scale('+z+')'});
 root.querySelectorAll('[data-rot]').forEach(p=>{const [s,d,a0,a1]=num(p,'rot');const k=(lt-s)/d;p.style.transform='rotate('+(a0+(a1-a0)*(k<0?0:k>1?1:k*k*k))+'deg)'});
 root.querySelectorAll('[data-type]').forEach(p=>{const [s,d]=num(p,'type');const t=p.dataset.text;p.textContent=t.slice(0,Math.round(t.length*cl((lt-s)/d)))});
 root.querySelectorAll('[data-wig]').forEach(p=>{const [amp=4,sp=20]=num(p,'wig');p.style.transform='rotate('+Math.sin(lt*sp)*amp+'deg)'});
 root.querySelectorAll('[data-win]').forEach(p=>{const [s,o=0,d=1]=num(p,'win');const t=s+o;p.style.opacity=lt>=t&&lt<t+d?1:0});
 root.querySelectorAll('[data-idle]').forEach(p=>{const [amp=6,sp=2.2,ph=0]=num(p,'idle');p.style.transform='translateY('+(Math.sin(lt*sp+ph)*amp)+'px) rotate('+(Math.sin(lt*sp*0.7+ph)*amp*0.25)+'deg)'});
 root.querySelectorAll('[data-flip]').forEach(p=>{const [sp=4]=num(p,'flip');p.style.transform='scaleX('+Math.cos(lt*sp)+')'});
 root.querySelectorAll('[data-saw]').forEach(p=>{const [s=0,amp=30,sp=14,d=99]=num(p,'saw');const on=lt>=s&&lt<s+d;p.style.transform='translateY('+(on?Math.abs(Math.sin((lt-s)*sp))*amp:0)+'px)'});
 root.querySelectorAll('[data-blink]').forEach(p=>{const [per=2.6]=num(p,'blink');const k=(lt%per);p.style.transform='scaleY('+(k<0.12?Math.max(0.1,Math.abs(1-k/0.06)):1)+')'});
 root.querySelectorAll('[data-off]').forEach(p=>{const [s]=num(p,'off');p.style.opacity=lt<s?1:Math.max(0,1-(lt-s)/0.3)});
 root.querySelectorAll('[data-kb]').forEach(p=>{p.style.transform='scale('+(1.08+0.12*lt/D)+')'});
 root.querySelectorAll('[data-shake]').forEach(p=>{const [s]=num(p,'shake');const k=lt-s;p.style.transform=k>0&&k<0.5?'translate('+Math.sin(k*90)*14*(0.5-k)+'px,0)':''});
}
function autocenter(){for(let i=0;i<N;i++){const s=document.getElementById('s'+i);const g=s.querySelector('g.autoc');if(!g||s.querySelector('.bg,[data-kb]'))continue;s.style.display='block';CUR=W[i];anim(s,D[i]-0.05,D[i]);const b=g.getBBox();const dx=540-(b.x+b.width/2),dy=Math.max(-300,Math.min(300,520-(b.y+b.height/2)));g.setAttribute('transform','translate('+dx.toFixed(1)+','+dy.toFixed(1)+')');s.style.display='none';}}
let AC=true;
const LA=[];document.querySelectorAll('[data-lot]').forEach(el=>{const a=lottie.loadAnimation({container:el,renderer:'svg',loop:false,autoplay:false,animationData:JSON.parse(JSON.stringify(LOTD[el.dataset.lot])),rendererSettings:{preserveAspectRatio:'xMidYMid meet'}});LA.push([el,a]);});
function lotRender(root,lt){for(const [el,a] of LA){if(!root.contains(el))continue;const [s=0,sp=1,loop=1]=num(el,'lp');const fr=a.frameRate||30,tot=Math.max(1,a.totalFrames-1);let f=Math.max(0,(lt-s))*fr*sp;f=loop?f%tot:Math.min(f,tot);a.goToAndStop(f,true);}}
function camRender(s,lt){const c=s.dataset.cam;if(!c)return;const K=c.split('|').map(x=>x.split(',')).map(([t,sc,x,y])=>[t.startsWith('@')?wt(t):Number(t),+sc,+x,+y]).sort((a,b)=>a[0]-b[0]);let cur=K[0];for(let k=0;k<K.length;k++){if(lt>=K[k][0]){const nx=K[k+1];if(nx&&lt<nx[0]){const p=eio((lt-K[k][0])/Math.max(0.6,Math.min(1.2,nx[0]-K[k][0])));cur=[0,K[k][1]+(nx[1]-K[k][1])*p,K[k][2]+(nx[2]-K[k][2])*p,K[k][3]+(nx[3]-K[k][3])*p];}else cur=K[k];}}s.querySelector('.cam').style.transform='translate('+cur[2]+'px,'+cur[3]+'px) scale('+cur[1]+')';}
let BXD=false;function boxcenter(){const cv=document.createElement('canvas').getContext('2d');document.querySelectorAll('.sc').forEach(sc=>{const d=sc.style.display;sc.style.display='block';sc.querySelectorAll('g.bx').forEach(g=>{const r=g.querySelector(':scope > rect, :scope > circle'),t=g.querySelector(':scope > text');if(!r||!t)return;const rb=r.getBBox();const cs=getComputedStyle(t);cv.font=cs.fontWeight+' '+cs.fontSize+' '+cs.fontFamily;cv.textAlign='left';let m=cv.measureText(t.textContent);let sx=1;if(m.width>rb.width-50){sx=(rb.width-60)/m.width;t.setAttribute('textLength',(m.width*sx).toFixed(1));t.setAttribute('lengthAdjust','spacingAndGlyphs');}const m2=cv.measureText(t.textContent.normalize('NFD').replace(/[\u0300-\u036f]/g,''));const L=m.actualBoundingBoxLeft*sx,R=m.actualBoundingBoxRight*sx,asc=m2.actualBoundingBoxAscent,des=m2.actualBoundingBoxDescent;t.setAttribute('text-anchor','start');t.setAttribute('x',(rb.x+rb.width/2-(R-L)/2).toFixed(1));t.setAttribute('y',(rb.y+rb.height/2+(asc-des)/2).toFixed(1));});sc.style.display=d;});}
const BOIL=${cfg.boil?1:0};const TURB=[...document.querySelectorAll('#wob feTurbulence, [id^=wob] feTurbulence')];
window.render=t=>{if(BOIL){const k=Math.floor(t*8)%4;TURB.forEach(f=>f.setAttribute('seed',3+k));}if(!BXD){boxcenter();BXD=true;}if(!AC){autocenter();AC=true;}document.getElementById('bar').style.width=(t/T*1080)+'px';
 document.getElementById('grid').style.transform='translate('+(-(t*25)%90)+'px,'+(-(t*15)%90)+'px)';
 document.getElementById('glow').style.transform='translate('+Math.sin(t*.5)*140+'px,'+Math.cos(t*.4)*100+'px)';
 for(let i=0;i<N;i++){const lt=t-ST[i],s=document.getElementById('s'+i),on=lt>=0&&lt<D[i];s.style.display=on?'block':'none';if(!on)continue;
  // entrata: rivelazione circolare + zoom lento di camera
  s.style.opacity=Math.min(1,lt/0.35); s.style.transform='scale('+(1.0+0.04*lt/D[i])+')';
  CUR=W[i];anim(s,lt,D[i]);lotRender(s,lt);camRender(s,lt);
  const at=lt-PAD;let h='';for(const c of CH[i]){if(at>=c[0].t0-0.05&&at<=c[c.length-1].t1+0.15){h=c.filter(w=>at>=w.t0-0.02).map(w=>'<span class="on">'+dw(w.w)+'</span>').join('');break}}
  document.getElementById('cap').innerHTML=h;}
};
</script></body></html>`;
(async()=>{const tmp='fr_'+Date.now();fs.mkdirSync(tmp);const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
 await p.setContent(html,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>Promise.all(['Anton','Inter Tight','Gochi Hand','Luckiest Guy'].flatMap(f=>['400','900'].map(w=>document.fonts.load(w+' 40px "'+f+'"').catch(()=>null)))));
 if(process.env.CHECK){await p.evaluate(()=>window.render(0.01));const rep=await p.evaluate(()=>{const out=[];const SEL={pop:0,stamp:0,rise:0,drop:0,slide:0,fade:0,win:0,type:0,draw:0,grow:0,fall:0,count:0,donut:0};
 for(let i=0;i<N;i++){const sc=document.getElementById('s'+i);CUR=W[i];const ev=[];
  for(const k of Object.keys(SEL)){sc.querySelectorAll('[data-'+k+']').forEach(el=>{const v=num(el,k);ev.push(k=='win'?v[0]+(v[1]||0):v[0]);});}
  sc.querySelectorAll('[data-mv]').forEach(el=>{const v=num(el,'mv');for(let j=6;j<v.length;j+=6)ev.push(v[j]);});
  sc.querySelectorAll('[data-lot]').forEach(el=>{ev.push(num(el,'lp')[0]||0)});
  const ws=W[i];const tEnd=D[i];const evs=[...new Set(ev.filter(x=>x>=0&&x<tEnd).map(x=>Math.round(x*10)/10))].sort((a,b)=>a-b);
  const pts=[0,...evs,tEnd];
  for(let j=1;j<pts.length;j++){const gap=pts[j]-pts[j-1];if(gap>1.8&&i<N-1){const said=ws.filter(w=>w.t0>=pts[j-1]&&w.t0<pts[j]).map(w=>w.w).join(' ');if(said)out.push('VUOTO scena '+i+' da '+pts[j-1].toFixed(1)+'s a '+pts[j].toFixed(1)+'s ('+gap.toFixed(1)+'s): "'+said+'"');}}
  // overflow / logo overlap at scene end
  sc.style.display='block';anim(sc,tEnd-0.05,tEnd);const lg=document.querySelector('.lg').getBoundingClientRect();
  sc.querySelectorAll('g.bx').forEach(g=>{const r=g.querySelector(':scope > rect, :scope > circle'),t=g.querySelector(':scope > text');if(!r||!t)return;const rb=r.getBoundingClientRect(),tb=t.getBoundingClientRect();if(tb.width>rb.width-20)out.push('TESTO LARGO scena '+i+': "'+t.textContent+'"');});
  sc.querySelectorAll('g.bx > rect, g.bx > circle').forEach(r=>{const b=r.getBoundingClientRect();if(b.width>0&&parseFloat(getComputedStyle(r).opacity)>0&&b.bottom>lg.top-8&&b.top<lg.bottom&&b.right>lg.left&&b.left<lg.right)out.push('TOCCA IL LOGO scena '+i+': '+(r.parentNode.querySelector('text')||{}).textContent);});
  sc.querySelectorAll('text').forEach(t=>{const b=t.getBoundingClientRect();if(b.width>0&&(b.left<20||b.right>1060))out.push('FUORI BORDO scena '+i+': "'+t.textContent+'"');});
  // sovrapposizioni tra testi visibili, campionate ogni 0.5s
  const vis=el=>{let e=el,o=1;while(e&&e!==sc){const cs=getComputedStyle(e);if(cs.display=='none')return false;o*=parseFloat(cs.opacity);e=e.parentElement;}return o>0.9;};
  const seen=new Set();
  for(let tt=0.5;tt<tEnd;tt+=0.5){anim(sc,tt,tEnd);const T=[...sc.querySelectorAll('text')].filter(t=>t.textContent.trim()&&vis(t)).map(t=>[t.textContent.trim(),t.getBoundingClientRect()]).filter(x=>x[1].width>4);
   for(let a2=0;a2<T.length;a2++)for(let b2=a2+1;b2<T.length;b2++){const A=T[a2][1],B=T[b2][1];const ix=Math.min(A.right,B.right)-Math.max(A.left,B.left),iy=Math.min(A.bottom,B.bottom)-Math.max(A.top,B.top);const cx=Math.abs((A.left+A.right)/2-(B.left+B.right)/2),cy=Math.abs((A.top+A.bottom)/2-(B.top+B.bottom)/2);if(ix>6&&iy>6&&!(cx<12&&cy<12)){const k=i+':'+T[a2][0]+'|'+T[b2][0];if(!seen.has(k)){seen.add(k);out.push('SOVRAPPOSTI scena '+i+' a '+tt.toFixed(1)+'s: "'+T[a2][0]+'" e "'+T[b2][0]+'"');}}}}
  if(sc.dataset.cam&&sc.dataset.cam.split('|').some(k=>{const v=k.split(',');return Math.abs(+v[1]-1)>0.051||Math.abs(+v[2])>20||Math.abs(+v[3])>20;}))out.push('CAMERA scena '+i+': zoom/spostamento troppo forte (regola: camera ferma)');
  sc.style.display='none';}
 if(typeof BOIL!=='undefined'&&BOIL)out.push('TREMOLIO attivo (regola: vietato)');return out;});console.log(rep.length?rep.join('\n'):'VERIFICA OK: nessun problema');await b.close();fs.rmSync(tmp,{recursive:true});return;}
 if(process.env.PREVIEW){const ts=process.env.PREVIEW.split(',').map(Number);for(const [k,t] of ts.entries()){await p.evaluate(t=>window.render(t),t);await p.screenshot({path:`${out}_prev${k}.png`});}await b.close();fs.rmSync(tmp,{recursive:true});console.log('preview ok');return;}
 for(let f=0;f<Math.round(T*FPS);f++){await p.evaluate(t=>window.render(t),f/FPS);await p.screenshot({path:`${tmp}/f${String(f).padStart(5,'0')}.jpg`,type:'jpeg',quality:90});}
 await b.close();execSync(`ffmpeg -loglevel error -y -framerate ${FPS} -i ${tmp}/f%05d.jpg -c:v libx264 -pix_fmt yuv420p -crf 18 ${out}`);fs.rmSync(tmp,{recursive:true});console.log('ok',T);})();

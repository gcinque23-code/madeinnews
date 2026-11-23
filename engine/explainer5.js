// Reel illustrato v3: scene SVG animate costruite in tempo reale. node explainer3.js cfg.json out.mp4
const { chromium } = require('playwright'); const fs=require('fs'); const {execSync}=require('child_process');
const [,, cfgF, out]=process.argv; const cfg=JSON.parse(fs.readFileSync(cfgF,'utf8'));
const FPS=30, N=cfg.scenes.length, D=cfg.scenes.map(s=>s.dur), ST=D.map((_,i)=>D.slice(0,i).reduce((a,b)=>a+b,0)), T=D.reduce((a,b)=>a+b,0);
const A=cfg.accent||'#FACC15', R='#E63946', Y='#FFD400';
const LIB=fs.readFileSync(__dirname+'/node_modules/lottie-web/build/player/lottie.min.js','utf8');
const LOT={};for(const s of cfg.scenes){for(const m of (s.html.match(/data-lot="([^"]+)"/g)||[])){const n=m.slice(10,-1);if(!LOT[n])LOT[n]=JSON.parse(fs.readFileSync(__dirname+'/assets/lottie/'+n+'.json','utf8'));}}
const B64=f=>'data:image/jpeg;base64,'+fs.readFileSync(f).toString('base64');
const html=`<html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter+Tight:wght@600;800;900&display=block" rel="stylesheet"><style>
*{margin:0;box-sizing:border-box}body{width:1080px;height:1920px;background:#07070a;color:#fff;font-family:'Inter Tight';overflow:hidden;position:relative}
#grid{display:none;position:absolute;inset:-200px;background-image:linear-gradient(#ffffff08 2px,transparent 2px),linear-gradient(90deg,#ffffff08 2px,transparent 2px);background-size:90px 90px}
#glow{display:none;position:absolute;width:1300px;height:1300px;left:-110px;top:300px;border-radius:50%;background:radial-gradient(circle,${A}26,transparent 62%)}
.ttl{display:none;position:absolute;top:170px;left:0;right:0;text-align:center;z-index:10}.ttl span{display:inline-block;background:#fff;color:#000;font:900 58px/1.1 'Inter Tight';letter-spacing:-2px;padding:6px 20px;margin:2px 0}
.stage{position:absolute;inset:0;width:1080px;height:1920px}
.sc{position:absolute;inset:0;display:none}
svg text{font-family:'Inter Tight'}
.lbl{font:900 44px 'Inter Tight';letter-spacing:-1px}.anton{font-family:Anton}
.cap{position:absolute;top:250px;left:70px;right:70px;text-align:center;font:900 92px/1.1 'Inter Tight';letter-spacing:-2px;text-transform:none;display:flex;flex-wrap:wrap;justify-content:center;gap:4px 24px;z-index:10;text-shadow:0 6px 24px #000}
.cap span{text-shadow:0 4px 18px #0009,0 2px 4px #0008}.cap span.on{color:#fff}
.foot{display:none;position:absolute;bottom:150px;left:0;right:0;text-align:center;font:900 40px 'Inter Tight';letter-spacing:-1.5px;z-index:10}.foot b{color:${R}}
.src{position:absolute;bottom:60px;opacity:.6;left:0;right:0;text-align:center;font:600 24px 'Inter Tight';color:#777;z-index:10}
.cr{position:absolute;right:30px;bottom:20px;font:600 20px 'Inter Tight';color:#fffc;background:#000a;padding:4px 10px}
#bar{display:none;position:absolute;top:0;left:0;height:12px;background:${A};z-index:20}
</style></head><body><div id="grid"></div><div id="glow"></div><div id="bar"></div>
<div class="ttl">${cfg.title.map(t=>`<span>${t}</span>`).join('<br>')}</div>
<div class="stage">${cfg.scenes.map((s,i)=>`<div class="sc" id="s${i}" ${s.cam?`data-cam="${s.cam}"`:''}><div class="cam" style="position:absolute;inset:0;transform-origin:50% 50%">${s.html.replace(/PHOTO\((.+?)\)/g,(m,f)=>B64(f)).replace(/(<svg viewBox="0 0 1080 1100"[^>]*>)/,'$1<g class="autoc">').replace(/<\/svg>(?![\s\S]*<\/svg>)/,'</g></svg>')}</div></div>`).join('')}</div>
<div class="cap" id="cap"></div><div class="foot">madeinnews<b>.</b></div><div class="src">${cfg.source||''}</div>
<script>${LIB}</script><script>
const LOTD=${JSON.stringify(LOT)};
const D=${JSON.stringify(D)},ST=${JSON.stringify(ST)},N=${N},T=${T},PAD=${cfg.pad||0.35},W=${JSON.stringify(cfg.scenes.map(s=>s.words||[]))},WM=${JSON.stringify(cfg.wordmap||{})};
const dw=w=>{const m=w.match(/^(.*?)([.,:;!?]*)$/);const k=m[1].toLowerCase();return (WM[k]!==undefined?WM[k]:m[1])+m[2]};
const cl=x=>Math.min(Math.max(x,0),1), e=t=>1-Math.pow(1-cl(t),3), eio=t=>{t=cl(t);return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}, eb=t=>{t=cl(t);const c=1.9;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2)};
const bounce=t=>{t=cl(t);const n=7.5625,d=2.75;if(t<1/d)return n*t*t;if(t<2/d)return n*(t-=1.5/d)*t+.75;if(t<2.5/d)return n*(t-=2.25/d)*t+.9375;return n*(t-=2.625/d)*t+.984375};
document.querySelectorAll('[data-draw]').forEach(p=>{const L=p.getTotalLength?p.getTotalLength():1000;p.dataset.len=L;p.style.strokeDasharray=L;p.style.strokeDashoffset=L});
const CH=W.map(ws=>{const o=[];let c=[];ws.forEach(w=>{c.push(w);if(c.length>=2||/[.,:;!?]$/.test(w.w)){o.push(c);c=[]}});if(c.length)o.push(c);return o});
let CUR=[];const wt=s=>{const w=s.slice(1).toLowerCase();const f=CUR.find(x=>x.w.toLowerCase().replace(/[^a-zàèéìòù']/g,'').startsWith(w));return f?f.t0-PAD*0:0};
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
 root.querySelectorAll('[data-off]').forEach(p=>{const [s]=num(p,'off');p.style.opacity=lt<s?1:Math.max(0,1-(lt-s)/0.3)});
 root.querySelectorAll('[data-kb]').forEach(p=>{p.style.transform='scale('+(1.08+0.12*lt/D)+')'});
 root.querySelectorAll('[data-shake]').forEach(p=>{const [s]=num(p,'shake');const k=lt-s;p.style.transform=k>0&&k<0.5?'translate('+Math.sin(k*90)*14*(0.5-k)+'px,0)':''});
}
function autocenter(){for(let i=0;i<N;i++){const s=document.getElementById('s'+i);const g=s.querySelector('g.autoc');if(!g||s.querySelector('.bg,[data-kb]'))continue;s.style.display='block';CUR=W[i];anim(s,D[i]-0.05,D[i]);const b=g.getBBox();const dx=540-(b.x+b.width/2),dy=Math.max(-300,Math.min(300,520-(b.y+b.height/2)));g.setAttribute('transform','translate('+dx.toFixed(1)+','+dy.toFixed(1)+')');s.style.display='none';}}
let AC=true;
const LA=[];document.querySelectorAll('[data-lot]').forEach(el=>{const a=lottie.loadAnimation({container:el,renderer:'svg',loop:false,autoplay:false,animationData:JSON.parse(JSON.stringify(LOTD[el.dataset.lot])),rendererSettings:{preserveAspectRatio:'xMidYMid meet'}});LA.push([el,a]);});
function lotRender(root,lt){for(const [el,a] of LA){if(!root.contains(el))continue;const [s=0,sp=1,loop=1]=num(el,'lp');const fr=a.frameRate||30,tot=Math.max(1,a.totalFrames-1);let f=Math.max(0,(lt-s))*fr*sp;f=loop?f%tot:Math.min(f,tot);a.goToAndStop(f,true);}}
function camRender(s,lt){const c=s.dataset.cam;if(!c)return;const K=c.split('|').map(x=>x.split(',')).map(([t,sc,x,y])=>[t.startsWith('@')?wt(t):Number(t),+sc,+x,+y]).sort((a,b)=>a[0]-b[0]);let cur=K[0];for(let k=0;k<K.length;k++){if(lt>=K[k][0]){const nx=K[k+1];if(nx&&lt<nx[0]){const p=eio((lt-K[k][0])/Math.max(0.6,Math.min(1.2,nx[0]-K[k][0])));cur=[0,K[k][1]+(nx[1]-K[k][1])*p,K[k][2]+(nx[2]-K[k][2])*p,K[k][3]+(nx[3]-K[k][3])*p];}else cur=K[k];}}s.querySelector('.cam').style.transform='translate('+cur[2]+'px,'+cur[3]+'px) scale('+cur[1]+')';}
window.render=t=>{if(!AC){autocenter();AC=true;}document.getElementById('bar').style.width=(t/T*1080)+'px';
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
 await p.setContent(html,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
 if(process.env.PREVIEW){const ts=process.env.PREVIEW.split(',').map(Number);for(const [k,t] of ts.entries()){await p.evaluate(t=>window.render(t),t);await p.screenshot({path:`${out}_prev${k}.png`});}await b.close();fs.rmSync(tmp,{recursive:true});console.log('preview ok');return;}
 for(let f=0;f<Math.round(T*FPS);f++){await p.evaluate(t=>window.render(t),f/FPS);await p.screenshot({path:`${tmp}/f${String(f).padStart(5,'0')}.jpg`,type:'jpeg',quality:90});}
 await b.close();execSync(`ffmpeg -loglevel error -y -framerate ${FPS} -i ${tmp}/f%05d.jpg -c:v libx264 -pix_fmt yuv420p -crf 18 ${out}`);fs.rmSync(tmp,{recursive:true});console.log('ok',T);})();

// Reel explainer animato v2: node explainer2.js cfg.json out.mp4
const { chromium } = require('playwright'); const fs=require('fs'); const {execSync}=require('child_process');
const [,, cfgF, out]=process.argv; const cfg=JSON.parse(fs.readFileSync(cfgF,'utf8'));
const FPS=30, N=cfg.scenes.length, D=cfg.scenes.map(s=>s.dur), ST=D.map((_,i)=>D.slice(0,i).reduce((a,b)=>a+b,0)), T=D.reduce((a,b)=>a+b,0);
const R='#E63946', Y='#FFD400', A=cfg.accent||Y;
const B64=f=>'data:image/jpeg;base64,'+fs.readFileSync(f).toString('base64');
const ATOM=`<svg viewBox="-50 -50 100 100" class="atom"><circle r="9" fill="${A}"/>${[0,120,240].map(a=>`<path d="M0 0 L${40*Math.cos((a-30)*Math.PI/180)} ${40*Math.sin((a-30)*Math.PI/180)} A40 40 0 0 1 ${40*Math.cos((a+30)*Math.PI/180)} ${40*Math.sin((a+30)*Math.PI/180)} Z" fill="${A}" transform="scale(1)" opacity=".9"/>`).join('')}<circle r="14" fill="none" stroke="#000" stroke-width="5"/></svg>`;
const vis=(v,i)=>{let h='';
 if(v.photo) h+=`<div class="bg" style="background-image:url(${B64(v.photo)})"></div><div class="ov"></div>`;
 switch(v.type){
 case 'year': case 'number': h+=`<div class="c">${v.kicker?`<div class="kick k-in">${v.kicker}</div>`:''}<div class="num slam" style="color:${v.color||A}">${v.type==='number'?`<span class="count" data-to="${v.value}">0</span>`:v.value}${v.suffix?`<small>${v.suffix}</small>`:''}</div>${v.label?`<div class="kick l-in">${v.label}</div>`:''}</div>${v.icon==='atom'?`<div class="atomw">${ATOM}</div>`:''}`;break;
 case 'timeline': h+=`<div class="c"><div class="tl"><div class="tline"><i></i></div>${v.items.map((x,k)=>`<div class="tli" data-k="${k}"><div class="dot" style="background:${x[2]||A}"></div><div class="ty">${x[0]}</div><div class="tt">${x[1]}</div></div>`).join('')}</div></div>`;break;
 case 'list': h+=`<div class="c">${v.kicker?`<div class="kick k-in">${v.kicker}</div>`:''}<div class="grid">${v.items.map((x,k)=>`<div class="card" data-k="${k}"><div class="ico">${ATOM}</div><b>${x[0]}</b><span>${x[1]||''}</span></div>`).join('')}</div></div>`;break;
 case 'bar': h+=`<div class="c" style="align-items:stretch;padding:0 80px">${v.kicker?`<div class="kick k-in" style="text-align:left">${v.kicker}</div>`:''}${v.rows.map((r,k)=>`<div class="row"><span>${r[0]}</span><div class="track"><div class="fill" data-w="${r[1]}" data-k="${k}" style="background:${r[2]||A}"></div></div><b class="bcount" data-to="${r[1]}" data-k="${k}">0%</b></div>`).join('')}</div>`;break;
 default: h+=`<div class="c"><div class="big">${(v.text||'').split(' ').map((w,k)=>`<span class="bw" data-k="${k}">${w.replace(/\*(.+?)\*/g,`<b style="color:${A}">$1</b>`)}</span>`).join(' ')}</div></div>`;}
 if(v.credit) h+=`<div class="cr">Foto: ${v.credit}</div>`; return h;};
const html=`<html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter+Tight:wght@600;800;900&display=block" rel="stylesheet"><style>
*{margin:0;box-sizing:border-box}body{width:1080px;height:1920px;background:#000;color:#fff;font-family:'Inter Tight';overflow:hidden;position:relative}
#blob{position:absolute;width:1400px;height:1400px;border-radius:50%;background:radial-gradient(circle,${A}22,transparent 60%);left:-160px;top:300px}
.ttl{position:absolute;top:230px;left:0;right:0;text-align:center;z-index:5}.ttl span{display:inline-block;background:#fff;color:#000;font:900 66px/1.1 'Inter Tight';letter-spacing:-2px;padding:8px 22px;margin:3px 0}
.box{position:absolute;top:520px;left:0;width:1080px;height:640px;overflow:hidden}
.v{position:absolute;inset:0;background:#121212;overflow:hidden}
.bg{position:absolute;inset:-8%;background-size:cover;background-position:center}.ov{position:absolute;inset:0;background:linear-gradient(180deg,#0005,#000b)}
.c{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}
.kick{font:800 38px 'Inter Tight';color:#ddd;letter-spacing:3px;text-transform:uppercase}
.num{font:270px/1 Anton;margin:4px 0;text-shadow:0 10px 40px #0008}.num small{font-size:110px;margin-left:14px}
.atomw{position:absolute;right:-60px;bottom:-60px;width:330px;opacity:.18}.atom{width:100%}
.tl{position:relative;display:flex;gap:70px;padding-top:10px}.tline{position:absolute;left:110px;right:110px;top:35px;height:8px;background:#333}.tline i{display:block;height:100%;width:0;background:${A}}
.tli{text-align:center;width:250px;position:relative}.dot{width:56px;height:56px;border-radius:50%;margin:0 auto;border:8px solid #121212}.ty{font:92px Anton;margin-top:14px}.tt{font:800 32px 'Inter Tight';color:#bbb;margin-top:4px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:22px;margin-top:26px;width:900px}.card{background:#1f1f1f;border-left:10px solid ${A};padding:22px 26px;text-align:left;display:flex;align-items:center;gap:20px}.card .ico{width:60px;flex:none}.card b{font:900 50px 'Inter Tight';letter-spacing:-1.5px}.card span{font:700 28px 'Inter Tight';color:#999;margin-left:auto}
.row{display:flex;align-items:center;gap:24px;margin-top:34px;font:900 44px 'Inter Tight'}.row span{width:290px;text-align:left}.track{flex:1;height:84px;background:#262626}.fill{height:100%;width:0}.row b{width:170px;text-align:right;font:84px Anton}
.big{font:900 92px/1.12 'Inter Tight';letter-spacing:-3px;padding:0 70px}.bw{display:inline-block}
.cr{position:absolute;right:16px;bottom:12px;font:600 19px 'Inter Tight';color:#fffc;background:#0009;padding:4px 10px}
.cap{position:absolute;top:1230px;left:60px;right:60px;text-align:center;font:900 78px/1.15 'Inter Tight';letter-spacing:-2px;text-transform:uppercase}
.cap{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 26px}.cap span{display:inline-block}.cap span.on{color:${Y};transform:scale(1.12)}
.foot{position:absolute;bottom:200px;left:0;right:0;text-align:center;font:900 42px 'Inter Tight';letter-spacing:-1.5px}.foot b{color:${R}}
.src{position:absolute;bottom:140px;left:0;right:0;text-align:center;font:600 26px 'Inter Tight';color:#777}
.prog{position:absolute;top:1160px;left:0;height:10px;background:${A}}
#flash{position:absolute;inset:0;background:#fff;opacity:0;z-index:30;pointer-events:none}
</style></head><body><div id="blob"></div>
<div class="ttl">${cfg.title.map(t=>`<span>${t}</span>`).join('<br>')}</div>
<div class="box">${cfg.scenes.map((s,i)=>`<div class="v" id="v${i}">${vis(s.visual,i)}</div>`).join('')}</div><div class="prog" id="prog"></div>
<div class="cap" id="cap"></div><div class="foot">madeinnews<b>.</b></div><div class="src">${cfg.source||''}</div><div id="flash"></div>
<script>
const D=${JSON.stringify(D)},ST=${JSON.stringify(ST)},N=${N},T=${T},W=${JSON.stringify(cfg.scenes.map(s=>s.words||[]))},PAD=${cfg.pad||0.35};
const e=t=>1-Math.pow(1-Math.min(Math.max(t,0),1),3), eb=t=>{t=Math.min(Math.max(t,0),1);const c=1.70158;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2)};
// raggruppa parole in blocchi da max 3
const CH=W.map(ws=>{const o=[];let cur=[];ws.forEach(w=>{cur.push(w);if(cur.length>=3||/[.,:;!?]$/.test(w.w)){o.push(cur);cur=[]}});if(cur.length)o.push(cur);return o});
let lastCap='';
window.render=t=>{document.getElementById('prog').style.width=(t/T*1080)+'px';
 const b=document.getElementById('blob');b.style.transform='translate('+Math.sin(t*0.6)*120+'px,'+Math.cos(t*0.45)*90+'px)';
 let fl=0;
 for(let i=0;i<N;i++){const lt=t-ST[i],v=document.getElementById('v'+i);
  const on=lt>=-0.01&&lt<D[i]; v.style.display=on?'block':'none'; if(!on) continue;
  if(lt<0.12) fl=Math.max(fl,0.35*(1-lt/0.12));
  const pin=e(lt/0.45); v.style.transform='translateX('+(1-pin)*100+'%) scale('+(1.0)+')';
  v.querySelectorAll('.bg').forEach(x=>x.style.transform='scale('+(1.05+0.12*lt/D[i])+') translateX('+(-30*lt/D[i])+'px)');
  v.querySelectorAll('.k-in').forEach(x=>{const p=e((lt-0.2)/0.4);x.style.opacity=p;x.style.transform='translateY('+(1-p)*-40+'px)'});
  v.querySelectorAll('.l-in').forEach(x=>{const p=e((lt-0.9)/0.4);x.style.opacity=p;x.style.transform='translateY('+(1-p)*40+'px)'});
  v.querySelectorAll('.slam').forEach(x=>{const p=(lt-0.35)/0.35;const s=p<0?3:p<1?3-2*eb(p):1;const shake=p>1&&p<1.6?Math.sin(lt*80)*8*(1.6-p):0;x.style.opacity=p<0?0:Math.min(1,p*2);x.style.transform='scale('+s+') translateX('+shake+'px)'});
  v.querySelectorAll('.count').forEach(x=>x.textContent=Math.round(+x.dataset.to*e((lt-0.4)/1.3)));
  v.querySelectorAll('.atom').forEach(x=>x.style.transform='rotate('+(lt*40)+'deg)');
  v.querySelectorAll('.tline i').forEach(x=>x.style.width=(e((lt-0.3)/(D[i]*0.6))*100)+'%');
  v.querySelectorAll('.tli').forEach(x=>{const k=+x.dataset.k,n=v.querySelectorAll('.tli').length;const p=eb((lt-0.3-k*(D[i]*0.6)/(n-1||1))/0.45);x.style.opacity=Math.min(1,Math.max(0,p));x.style.transform='translateY('+(1-p)*80+'px) scale('+(0.6+0.4*Math.max(0,p))+')'});
  v.querySelectorAll('.card').forEach(x=>{const k=+x.dataset.k,n=v.querySelectorAll('.card').length;const p=eb((lt-0.4-k*(D[i]*0.7)/n)/0.4);x.style.opacity=Math.min(1,Math.max(0,p));x.style.transform='scale('+(Math.max(0,p))+') rotate('+(1-Math.min(1,Math.max(0,p)))*-8+'deg)'});
  v.querySelectorAll('.fill').forEach(x=>x.style.width=(+x.dataset.w*e((lt-0.5-x.dataset.k*0.5)/1.4))+'%');
  v.querySelectorAll('.bcount').forEach(x=>x.textContent=Math.round(+x.dataset.to*e((lt-0.5-x.dataset.k*0.5)/1.4))+'%');
  v.querySelectorAll('.bw').forEach(x=>{const p=eb((lt-0.3-x.dataset.k*0.12)/0.4);x.style.opacity=Math.min(1,Math.max(0,p));x.style.transform='translateY('+(1-p)*60+'px)'});
  // sottotitoli karaoke
  const at=lt-PAD; let html='';
  for(const ch of CH[i]){ if(at>=ch[0].t0-0.05 && at<=ch[ch.length-1].t1+0.15){ html=ch.map(w=>'<span class="'+(at>=w.t0&&at<=w.t1+0.05?'on':'')+'">'+w.w+'</span>').join(''); break; } }
  document.getElementById('cap').innerHTML=html;
 }
 document.getElementById('flash').style.opacity=fl;
};
</script></body></html>`;
(async()=>{const tmp='fr_'+Date.now();fs.mkdirSync(tmp);const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
 await p.setContent(html,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
 for(let f=0;f<Math.round(T*FPS);f++){await p.evaluate(t=>window.render(t),f/FPS);await p.screenshot({path:`${tmp}/f${String(f).padStart(5,'0')}.jpg`,type:'jpeg',quality:90});}
 await b.close();execSync(`ffmpeg -loglevel error -y -framerate ${FPS} -i ${tmp}/f%05d.jpg -c:v libx264 -pix_fmt yuv420p -crf 18 ${out}`);fs.rmSync(tmp,{recursive:true});console.log('ok',T);})();

// Motion graphic reel: node motion.js <reel.json> <out.mp4>
const { chromium } = require('playwright'); const fs=require('fs'); const {execSync}=require('child_process');
const [,, cfgF, out] = process.argv; const cfg=JSON.parse(fs.readFileSync(cfgF,'utf8'));
const FPS=30, N=cfg.scenes.length; const D=cfg.scenes.map(s=>s.dur||4.0); const ST=D.map((_,i)=>D.slice(0,i).reduce((a,b)=>a+b,0)); const T=D.reduce((a,b)=>a+b,0);
const R='#E63946';
const html=`<html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter+Tight:wght@600;800;900&display=block" rel="stylesheet"><style>
*{margin:0;box-sizing:border-box}body{width:1080px;height:1920px;background:#0a0a0a;color:#fff;font-family:'Inter Tight';overflow:hidden;position:relative}
.bars{position:absolute;top:70px;left:50px;right:50px;display:flex;gap:10px;z-index:20}.bars div{flex:1;height:8px;background:#ffffff33;border-radius:4px;overflow:hidden}.bars i{display:block;height:100%;width:0;background:#fff}
.hdr{position:absolute;top:110px;left:50px;right:50px;display:flex;justify-content:space-between;align-items:center;z-index:20}
.mn{width:90px;height:90px;background:#fff;color:#0a0a0a;display:flex;align-items:center;justify-content:center;font:54px/1 Anton}.mn b{color:${R}}
.wm{font:900 40px 'Inter Tight';letter-spacing:-1.5px}.wm b{color:${R}}
.sc{position:absolute;inset:0;opacity:0}
.chip{position:absolute;left:80px;top:430px;font:900 34px 'Inter Tight';letter-spacing:4px;padding:12px 26px;color:#000}
.hl{position:absolute;left:80px;right:80px;top:520px;font-family:Anton;text-transform:uppercase;font-size:130px;line-height:1}
.hl span{display:inline-block;margin-right:28px}
.line{position:absolute;left:80px;height:14px;width:300px;transform-origin:left}
.big{position:absolute;left:80px;right:80px;font:900 300px/1 'Inter Tight';letter-spacing:-14px}
.sub{position:absolute;left:80px;right:80px;font:800 52px/1.3 'Inter Tight';letter-spacing:-1px;color:#ddd}
.sub em{font-style:normal;color:#fff;background:var(--c);padding:0 10px;color:#000}
.quote{position:absolute;left:80px;right:80px;top:560px;font:900 92px/1.12 'Inter Tight';letter-spacing:-3px}
.wipe{position:absolute;inset:0;z-index:15;transform:translateX(-101%)}
.src{position:absolute;left:80px;bottom:150px;font:600 30px 'Inter Tight';color:#888;z-index:20}
</style></head><body>
<div class="bars">${cfg.scenes.map(()=>'<div><i></i></div>').join('')}</div>
<div class="hdr"><div class="mn">MN<b>.</b></div><div class="wm">madeinnews<b>.</b></div></div>
${cfg.scenes.map((s,i)=>`<div class="sc" id="s${i}" style="--c:${s.color}">
 ${s.chip?`<div class="chip a-left" style="background:${s.color}">${s.chip}</div>`:''}
 ${s.headline?`<div class="hl">${(()=>{let hot=false;return s.headline.split(' ').map(w=>{let st=w.startsWith('*'),en=w.endsWith('*');if(st)hot=true;const c=w.replace(/\*/g,'');const out=hot?`<b style="color:${s.color};font-weight:400">${c}</b>`:c;if(en)hot=false;return `<span class="a-word">${out}</span>`}).join('')})()}</div>`:''}
 ${s.quote?`<div class="quote a-up">“${s.quote}”</div>`:''}
 ${s.number!==undefined?`<div class="big a-up" style="top:${s.numberTop||980}px;color:${s.color}"><span class="count" data-to="${s.number}">0</span><span style="font-size:110px;letter-spacing:-3px">${s.suffix||''}</span></div>`:''}
 <div class="line a-line" style="background:${s.color};top:${s.lineTop||1320}px"></div>
 ${s.sub?`<div class="sub a-up2" style="top:${s.subTop||1370}px">${s.sub.replace(/\*(.+?)\*/g,'<em>$1</em>')}</div>`:''}
</div><div class="wipe" id="w${i}" style="background:${s.color}"></div>`).join('')}
<div class="src">${cfg.source||''}</div>
<script>
const D=${JSON.stringify(D)},ST=${JSON.stringify(ST)},N=${N};
const ease=t=>1-Math.pow(1-Math.min(Math.max(t,0),1),3);
window.render=function(t){
 document.querySelectorAll('.bars i').forEach((b,i)=>{b.style.width=(Math.min(Math.max((t-ST[i])/D[i],0),1)*100)+'%'});
 for(let i=0;i<N;i++){const lt=t-ST[i],SC=D[i], s=document.getElementById('s'+i), w=document.getElementById('w'+i);
  s.style.opacity=(lt>=0.25&&lt<SC+0.25)?1:0;
  // tendina di transizione all'inizio della scena
  const wp=lt/0.5; w.style.transform= wp<0||wp>1?'translateX(-101%)':'translateX('+(wp<0.5? -100+ease(wp*2)*100 : ease((wp-0.5)*2)*101)+'%)';
  if(lt<0||lt>SC+0.3) continue;
  s.querySelectorAll('.a-left').forEach(e=>{const p=ease((lt-0.4)/0.4);e.style.transform='translateX('+((1-p)*-120)+'%)';e.style.opacity=p});
  s.querySelectorAll('.a-word').forEach((e,k)=>{const p=ease((lt-0.55-k*0.12)/0.35);e.style.transform='translateY('+((1-p)*80)+'px) scale('+(0.9+0.1*p)+')';e.style.opacity=p});
  s.querySelectorAll('.a-up').forEach(e=>{const p=ease((lt-0.9)/0.5);e.style.transform='translateY('+((1-p)*60)+'px)';e.style.opacity=p});
  s.querySelectorAll('.a-line').forEach(e=>{const p=ease((lt-1.2)/0.5);e.style.transform='scaleX('+p+')'});
  s.querySelectorAll('.a-up2').forEach(e=>{const p=ease((lt-1.4)/0.5);e.style.transform='translateY('+((1-p)*40)+'px)';e.style.opacity=p});
  s.querySelectorAll('.count').forEach(e=>{const p=ease((lt-0.9)/1.2);e.textContent=Math.round(+e.dataset.to*p)});
 }};
</script></body></html>`;
(async()=>{const tmp='frames_'+Date.now(); fs.mkdirSync(tmp);
 const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1080,height:1920}});
 await p.setContent(html,{waitUntil:'networkidle'}); await p.evaluate(()=>document.fonts.ready);
 const tot=Math.round(T*FPS);
 for(let f=0;f<tot;f++){await p.evaluate(t=>window.render(t),f/FPS); await p.screenshot({path:`${tmp}/f${String(f).padStart(5,'0')}.jpg`,type:'jpeg',quality:90});}
 await b.close();
 execSync(`ffmpeg -loglevel error -y -framerate ${FPS} -i ${tmp}/f%05d.jpg -c:v libx264 -pix_fmt yuv420p -crf 18 -movflags +faststart ${out}`);
 fs.rmSync(tmp,{recursive:true}); console.log('ok',out,T+'s');})();

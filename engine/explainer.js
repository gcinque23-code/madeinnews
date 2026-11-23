// Reel "una notizia spiegata": node explainer.js cfg.json out.mp4 (scene con 'dur' già calcolata)
const { chromium } = require('playwright'); const fs=require('fs'); const {execSync}=require('child_process');
const [,, cfgF, out]=process.argv; const cfg=JSON.parse(fs.readFileSync(cfgF,'utf8'));
const FPS=30, N=cfg.scenes.length, D=cfg.scenes.map(s=>s.dur||4), ST=D.map((_,i)=>D.slice(0,i).reduce((a,b)=>a+b,0)), T=D.reduce((a,b)=>a+b,0);
const R='#E63946', Y='#FFD400', A=cfg.accent||'#FFD400';
const hi=t=>t.replace(/\*(.+?)\*/g,`<b style="color:${Y}">$1</b>`);
const B64=f=>'data:image/jpeg;base64,'+fs.readFileSync(f).toString('base64');
const vis=v=>(v.photo?`<div class="bg" style="background-image:url(${B64(v.photo)})"></div><div class="ov"></div>`:'')+visIn(v)+(v.credit?`<div class="cr">Foto: ${v.credit}</div>`:'');
const visIn=v=>{switch(v.type){
 case 'number': return `<div class="v-c"><div class="kick a1">${v.kicker||''}</div><div class="num a2" style="color:${v.color||A}"><span class="count" data-to="${v.value}">0</span><small>${v.suffix||''}</small></div><div class="kick a3">${v.label||''}</div></div>`;
 case 'year': return `<div class="v-c"><div class="kick a1">${v.kicker||''}</div><div class="num a2" style="color:${v.color||A}">${v.value}</div><div class="kick a3">${v.label||''}</div></div>`;
 case 'list': return `<div class="v-c"><div class="kick a1">${v.kicker||''}</div><div class="list">${v.items.map((x,k)=>`<div class="li" data-k="${k}"><i style="background:${v.color||A}"></i>${x}</div>`).join('')}</div></div>`;
 case 'bar': return `<div class="v-c" style="align-items:stretch;padding:0 80px"><div class="kick a1" style="text-align:left">${v.kicker||''}</div>${v.rows.map((r,k)=>`<div class="row"><span>${r[0]}</span><div class="track"><div class="fill" data-w="${r[1]}" data-k="${k}" style="background:${r[2]||A}"></div></div><b>${r[1]}%</b></div>`).join('')}</div>`;
 case 'timeline': return `<div class="v-c"><div class="tl">${v.items.map((x,k)=>`<div class="tli" data-k="${k}"><div class="dot" style="background:${x[2]||A}"></div><div class="ty">${x[0]}</div><div class="tt">${x[1]}</div></div>`).join('')}<div class="tline"></div></div></div>`;
 default: return `<div class="v-c"><div class="big a2">${hi(v.text||'')}</div></div>`;}};
const html=`<html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter+Tight:wght@600;800;900&display=block" rel="stylesheet"><style>
*{margin:0;box-sizing:border-box}body{width:1080px;height:1920px;background:#000;color:#fff;font-family:'Inter Tight';overflow:hidden;position:relative}
.ttl{position:absolute;top:250px;left:0;right:0;text-align:center;z-index:5}.ttl span{display:inline-block;background:#fff;color:#000;font:900 64px/1.1 'Inter Tight';letter-spacing:-2px;padding:8px 22px;margin:3px 0}
.box{position:absolute;top:530px;left:0;width:1080px;height:608px;background:#141414;overflow:hidden}
.v{position:absolute;inset:0;opacity:0}.bg{position:absolute;inset:-4%;background-size:cover;background-position:center}.ov{position:absolute;inset:0;background:linear-gradient(180deg,#0006,#000a)}.cr{position:absolute;right:16px;bottom:12px;font:600 18px 'Inter Tight';color:#fffb;background:#0008;padding:4px 10px}.v-c{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}
.kick{font:800 38px 'Inter Tight';color:#aaa;letter-spacing:2px;text-transform:uppercase}
.num{font:260px/1 Anton;margin:6px 0}.num small{font-size:110px;margin-left:12px}
.big{font:900 84px/1.1 'Inter Tight';letter-spacing:-3px;padding:0 70px}
.list{margin-top:24px;text-align:left}.li{font:900 64px/1.35 'Inter Tight';letter-spacing:-2px;display:flex;align-items:center;gap:24px}.li i{width:26px;height:26px;border-radius:50%}
.row{display:flex;align-items:center;gap:24px;margin-top:30px;font:900 44px 'Inter Tight'}.row span{width:250px;text-align:left}.track{flex:1;height:70px;background:#262626}.fill{height:100%;width:0}.row b{width:150px;text-align:right}
.tl{position:relative;display:flex;gap:90px}.tline{position:absolute;left:0;right:0;top:22px;height:6px;background:#333;z-index:-1}.tli{text-align:center;width:220px}.dot{width:50px;height:50px;border-radius:50%;margin:0 auto}.ty{font:80px Anton;margin-top:20px}.tt{font:800 32px 'Inter Tight';color:#aaa;margin-top:6px}
.cap{position:absolute;top:1220px;left:90px;right:90px;text-align:center;font:800 56px/1.3 'Inter Tight';letter-spacing:-1px;opacity:0}
.foot{position:absolute;bottom:190px;left:0;right:0;text-align:center;font:900 40px 'Inter Tight';letter-spacing:-1.5px}.foot b{color:${R}}
.src{position:absolute;bottom:130px;left:0;right:0;text-align:center;font:600 26px 'Inter Tight';color:#777}
.prog{position:absolute;top:530px;left:0;height:8px;background:${A};z-index:6}
</style></head><body>
<div class="ttl">${cfg.title.map(t=>`<span>${t}</span>`).join('<br>')}</div>
<div class="box">${cfg.scenes.map((s,i)=>`<div class="v" id="v${i}">${vis(s.visual)}</div>`).join('')}</div><div class="prog" id="prog"></div>
${cfg.scenes.map((s,i)=>`<div class="cap" id="c${i}">${hi(s.cap||s.voice)}</div>`).join('')}
<div class="foot">madeinnews<b>.</b></div><div class="src">${cfg.source||''}</div>
<script>
const D=${JSON.stringify(D)},ST=${JSON.stringify(ST)},N=${N},T=${T};
const e=t=>1-Math.pow(1-Math.min(Math.max(t,0),1),3);
window.render=t=>{document.getElementById('prog').style.width=(t/T*1080)+'px';
 for(let i=0;i<N;i++){const lt=t-ST[i],on=lt>=0&&lt<D[i],v=document.getElementById('v'+i),c=document.getElementById('c'+i);
  const fin=e(lt/0.35), fout=1-e((lt-(D[i]-0.25))/0.25); v.style.opacity=on?Math.min(fin,fout):0; v.style.transform='scale('+(1.04-0.04*fin)+')';
  c.style.opacity=on?Math.min(e(lt/0.3),fout):0; c.style.transform='translateY('+(1-e(lt/0.3))*30+'px)';
  if(!on) continue;
  v.querySelectorAll('.bg').forEach(x=>{x.style.transform='scale('+(1+0.06*lt/D[i])+')'});
  v.querySelectorAll('.a1').forEach(x=>{const p=e((lt-0.1)/0.4);x.style.opacity=p;x.style.transform='translateY('+(1-p)*-30+'px)'});
  v.querySelectorAll('.a2').forEach(x=>{const p=e((lt-0.25)/0.5);x.style.opacity=p;x.style.transform='scale('+(0.8+0.2*p)+')'});
  v.querySelectorAll('.a3').forEach(x=>{const p=e((lt-0.6)/0.4);x.style.opacity=p});
  v.querySelectorAll('.count').forEach(x=>{x.textContent=Math.round(+x.dataset.to*e((lt-0.25)/1.2))});
  v.querySelectorAll('.li,.tli').forEach(x=>{const p=e((lt-0.3-x.dataset.k*0.45)/0.4);x.style.opacity=p;x.style.transform='translateX('+(1-p)*-60+'px)'});
  v.querySelectorAll('.fill').forEach(x=>{x.style.width=(+x.dataset.w*e((lt-0.4-x.dataset.k*0.3)/1))+'%'});
 }};
</script></body></html>`;
(async()=>{const tmp='fr_'+Date.now();fs.mkdirSync(tmp);const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
 await p.setContent(html,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
 for(let f=0;f<Math.round(T*FPS);f++){await p.evaluate(t=>window.render(t),f/FPS);await p.screenshot({path:`${tmp}/f${String(f).padStart(5,'0')}.jpg`,type:'jpeg',quality:90});}
 await b.close();execSync(`ffmpeg -loglevel error -y -framerate ${FPS} -i ${tmp}/f%05d.jpg -c:v libx264 -pix_fmt yuv420p -crf 18 ${out}`);fs.rmSync(tmp,{recursive:true});console.log('ok',T);})();

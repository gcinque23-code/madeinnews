const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const dir='assets/lottie';const files=fs.readdirSync(dir).filter(f=>f.endsWith('.json')&&!f.includes('index')).sort();
const lib=fs.readFileSync('node_modules/lottie-web/build/player/lottie.min.js','utf8');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1500,height:Math.ceil(files.length/10)*170}});
const cells=files.map((f,i)=>`<div style="width:146px;height:166px;display:inline-block;vertical-align:top;text-align:center;font:10px sans-serif;background:#f3f4f6;margin:2px"><div id="a${i}" style="width:140px;height:140px;margin:auto"></div>${f.replace('.json','').slice(0,24)}</div>`).join('');
await p.setContent(`<html><body style="margin:0">${cells}<script>${lib}</script></body></html>`);
for(const [i,f] of files.entries()){const data=JSON.parse(fs.readFileSync(path.join(dir,f)));await p.evaluate(([i,data])=>{try{const a=lottie.loadAnimation({container:document.getElementById('a'+i),renderer:'svg',loop:false,autoplay:false,animationData:data});a.goToAndStop(Math.floor((a.totalFrames||30)*0.5),true)}catch(e){}},[i,data]);}
await p.waitForTimeout(500);await p.screenshot({path:process.argv[2],fullPage:true});await b.close()})();

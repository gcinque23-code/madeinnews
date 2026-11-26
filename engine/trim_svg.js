// Ritaglia il viewBox degli SVG ai pixel visibili (non bianchi/trasparenti). Uso: node trim_svg.js file.svg...
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
for(const f of process.argv.slice(2)){let s=fs.readFileSync(f,'utf8');
 const r=await p.evaluate(async src=>{const doc=new DOMParser().parseFromString(src,'image/svg+xml');const sv=doc.documentElement;
  let vb=(sv.getAttribute('viewBox')||'').split(/[\s,]+/).map(Number);
  if(vb.length<4||!vb[2]){vb=[0,0,parseFloat(sv.getAttribute('width'))||100,parseFloat(sv.getAttribute('height'))||100]}
  sv.setAttribute('viewBox',vb.join(' '));const W=1200,H=Math.round(W*vb[3]/vb[2]);sv.setAttribute('width',W);sv.setAttribute('height',H);
  const url='data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(new XMLSerializer().serializeToString(sv))));
  const im=new Image();im.src=url;await im.decode();const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.drawImage(im,0,0);
  const d=x.getImageData(0,0,W,H).data;let x0=W,y0=H,x1=0,y1=0;
  for(let y=0;y<H;y++)for(let i=0;i<W;i++){const k=(y*W+i)*4;if(d[k+3]>20&&!(d[k]>245&&d[k+1]>245&&d[k+2]>245)){if(i<x0)x0=i;if(i>x1)x1=i;if(y<y0)y0=y;if(y>y1)y1=y}}
  if(x1<=x0)return null;const sx=vb[2]/W,sy=vb[3]/H;const pw=(x1-x0)*0.04;
  return [vb[0]+(x0-pw)*sx,vb[1]+(y0-pw)*sy,(x1-x0+2*pw)*sx,(y1-y0+2*pw)*sy]},s);
 if(!r){console.log('skip',f);continue}
 s=s.replace(/<svg([^>]*)>/,(m,a)=>'<svg'+a.replace(/\s(viewBox|width|height|preserveAspectRatio)="[^"]*"/g,'')+` viewBox="${r.map(v=>v.toFixed(2)).join(' ')}" width="${r[2].toFixed(2)}" height="${r[3].toFixed(2)}">`);
 fs.writeFileSync(f,s);console.log('ok',f,r.map(v=>v.toFixed(1)).join(' '));}
await b.close();})();

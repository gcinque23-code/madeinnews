const fs=require('fs');process.argv[2]='/dev/null';
const src=fs.readFileSync(__dirname+'/brand2_build.js','utf8').split('const SCN=[')[0];
const m={};new Function('require','__dirname','m',src+';m.map=map;m.placed=placedZ;m.F=F;m.defs=defs;m.YEL=YEL;m.INK=INK;m.RED=RED;')(require,__dirname,m);
module.exports=m.defs+`<rect width="1080" height="1920" fill="#f6efe2"/><rect width="1080" height="1920" filter="url(#paper)"/>
<g transform="translate(43,110) scale(0.92)">${m.map()}${m.placed()}</g>
<text x="540" y="345" text-anchor="middle" ${m.F('Gochi Hand')} font-size="62" fill="${m.INK}">Sapevi da dove vengono…</text>
<g filter="url(#wob)"><g class="bx"><rect x="170" y="380" width="740" height="125" rx="12" fill="${m.YEL}"/><text x="540" y="470" text-anchor="middle" ${m.F('Luckiest Guy')} font-size="76" fill="${m.INK}">QUESTI 20 BRAND?</text></g></g>
<g filter="url(#wob)"><g class="bx"><rect x="60" y="1400" width="420" height="105" rx="12" fill="${m.RED}"/><text x="270" y="1470" text-anchor="middle" ${m.F('Luckiest Guy')} font-size="64" fill="#fff">QUIZ /20</text></g></g>`;

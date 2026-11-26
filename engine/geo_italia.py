"""Converte i confini delle regioni (geojson) in path SVG per 1080x1920. Uso: python3 geo_italia.py larghezza y0 > out.json"""
import json,math,sys
W=float(sys.argv[1]) if len(sys.argv)>1 else 940; Y0=float(sys.argv[2]) if len(sys.argv)>2 else 480
d=json.load(open('/home/user/madeinnews/engine/assets/geo/regioni.geojson'))
K=math.cos(math.radians(42)); LO0,LO1,LA1=6.62,18.53,47.1
s=W/((LO1-LO0)*K); X0=(1080-W)/2
P=lambda x,y:((x-LO0)*K*s+X0,(LA1-y)*s+Y0)
def dp(pts,eps):
    if len(pts)<3: return pts
    a,b=pts[0],pts[-1];dx,dy=b[0]-a[0],b[1]-a[1];L=math.hypot(dx,dy) or 1e-9
    i,m=0,0
    for k in range(1,len(pts)-1):
        h=abs(dy*(pts[k][0]-a[0])-dx*(pts[k][1]-a[1]))/L
        if h>m:i,m=k,h
    return dp(pts[:i+1],eps)[:-1]+dp(pts[i:],eps) if m>eps else [a,b]
def area(p): return abs(sum(p[i][0]*p[i-1][1]-p[i-1][0]*p[i][1] for i in range(len(p))))/2
out={}
for f in d['features']:
    g=f['geometry'];rs=[g['coordinates'][0]] if g['type']=='Polygon' else [p[0] for p in g['coordinates']]
    name=f['properties']['reg_name'].split('/')[0]
    parts=[];big=None
    for r in rs:
        p=[P(x,y) for x,y in r];
        if area(p)<120: continue
        h=len(p)//2;q=dp(p[:h+1],1.4)[:-1]+dp(p[h:],1.4)
        if big is None or area(p)>area(big): big=p
        parts.append('M'+' L'.join(f'{x:.1f} {y:.1f}' for x,y in q)+'Z')
    cx=sum(x for x,_ in big)/len(big);cy=sum(y for _,y in big)/len(big)
    out[name]={'d':''.join(parts),'c':[round(cx),round(cy)]}
print(json.dumps(out))

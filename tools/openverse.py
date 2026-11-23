"""Cerca foto CC su Openverse. Uso: python3 openverse.py "query" [n] [out.json]
Esclude licenze ND; segna NC."""
import sys, json, urllib.request, urllib.parse
UA={"User-Agent":"madeinnews-bot/0.1"}
def search(q, n=8):
    u="https://api.openverse.org/v1/images/?"+urllib.parse.urlencode(dict(q=q,page_size=n*2,license_type="all",mature="false"))
    d=json.load(urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=30))
    out=[]
    for r in d.get("results",[]):
        lic=(r.get("license") or "").lower()
        if "nd" in lic: continue
        if (r.get("width") or 0)<900: continue
        out.append(dict(id=r.get("id"),title=r.get("title"),url=r.get("url"),w=r.get("width"),h=r.get("height"),
          author=r.get("creator") or "autore sconosciuto",license=f'CC {lic.upper()} {r.get("license_version") or ""}'.strip() if lic not in("cc0","pdm") else lic.upper(),
          nc="nc" in lic,source=r.get("source"),page=r.get("foreign_landing_url")))
    return out[:n]
if __name__=="__main__":
    res=search(sys.argv[1], int(sys.argv[2]) if len(sys.argv)>2 else 8)
    if len(sys.argv)>3: json.dump(res,open(sys.argv[3],"w"),ensure_ascii=False,indent=1)
    for x in res: print(f'{(x["title"] or "")[:55]:55} | {x["w"]}x{x["h"]} | {x["author"][:25]} | {x["license"]} | {x["source"]}\n   {x["url"][:110]}')

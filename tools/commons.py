"""Cerca foto libere su Wikimedia Commons e restituisce URL, autore e licenza.
Uso: python3 commons.py "query" [n]"""
import sys, json, re, urllib.request, urllib.parse, html
UA = {"User-Agent": "madeinnews-bot/0.1 (instagram news page; contact via page)"}
import time, urllib.error
def api(**p):
    p.update(format="json")
    u = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(p)
    for i in range(6):
        try: return json.load(urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=30))
        except urllib.error.HTTPError as e:
            if e.code != 429: raise
            time.sleep(15 * (i + 1))
    raise RuntimeError("rate limited")
def clean(s): return html.unescape(re.sub(r"<[^>]+>", "", s or "")).strip()
def search(q, n=6):
    r = api(action="query", generator="search", gsrsearch=f"{q} filetype:bitmap", gsrnamespace=6, gsrlimit=n,
            prop="imageinfo", iiprop="url|size|extmetadata", iiurlwidth=1600)
    out = []
    for pg in (r.get("query", {}).get("pages", {}) or {}).values():
        ii = pg["imageinfo"][0]; m = ii.get("extmetadata", {})
        lic = clean(m.get("LicenseShortName", {}).get("value"))
        if not re.search(r"CC|Public domain|PD", lic, re.I): continue
        out.append(dict(title=pg["title"], url=ii.get("thumburl") or ii["url"], w=ii["width"], h=ii["height"],
                        author=clean(m.get("Artist", {}).get("value"))[:60], license=lic,
                        date=clean(m.get("DateTimeOriginal", {}).get("value"))[:10]))
    return out
if __name__ == "__main__":
    res = search(sys.argv[1], int(sys.argv[2]) if len(sys.argv) > 2 else 6)
    if len(sys.argv) > 3: json.dump(res, open(sys.argv[3], "w"), ensure_ascii=False, indent=1)
    for x in res:
        print(f"{x['title'][5:70]:65} | {x['w']}x{x['h']} | {x['author'][:30]} | {x['license']} | {x['date']}\n   {x['url']}")

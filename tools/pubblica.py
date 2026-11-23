"""Pubblica su Instagram (@madeinnews.it) tramite Graph API. Il token è iniettato dal proxy dell'ambiente.
Uso:
  python3 tools/pubblica.py carosello <cartella_su_repo> <didascalia.txt>   (usa i .jpg in ordine)
  python3 tools/pubblica.py foto <file.jpg> <didascalia.txt>
  python3 tools/pubblica.py reel <file.mp4> <didascalia.txt>
I file devono essere già su GitHub (branch main): Instagram li scarica da raw.githubusercontent.com."""
import sys, os, json, time, glob, urllib.request, urllib.parse
IG="17841432447124067"; API="https://graph.facebook.com/v23.0"
import subprocess
SHA=subprocess.check_output(["git","-C",os.path.dirname(os.path.dirname(os.path.abspath(__file__))),"ls-remote","origin","refs/heads/main"]).decode().split()[0]
RAW=f"https://raw.githubusercontent.com/gcinque23-code/madeinnews/{SHA}/"
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def call(path, data=None, method="POST"):
    url=f"{API}/{path}"
    if method=="GET": url+=("&" if "?" in url else "?")+urllib.parse.urlencode(data or {}); body=None
    else: body=urllib.parse.urlencode(data or {}).encode()
    req=urllib.request.Request(url,data=body,method=method)
    try: return json.load(urllib.request.urlopen(req,timeout=120))
    except urllib.error.HTTPError as e: raise SystemExit(f"Errore API {e.code}: {e.read().decode()[:500]}")
def raw(p): return RAW+urllib.parse.quote(os.path.relpath(os.path.abspath(p),ROOT))
def wait(cid, maxs=600):
    t=0
    while t<maxs:
        s=call(cid,{"fields":"status_code,status"},"GET")
        if s.get("status_code")=="FINISHED": return
        if s.get("status_code")=="ERROR": raise SystemExit(f"Elaborazione fallita: {s}")
        time.sleep(5); t+=5
    raise SystemExit("Timeout elaborazione")
def publish(cid):
    r=call(f"{IG}/media_publish",{"creation_id":cid})
    link=call(r["id"],{"fields":"permalink"},"GET").get("permalink")
    print("PUBBLICATO", r["id"], link); return r["id"]
kind, src, capf = sys.argv[1], sys.argv[2], sys.argv[3]
cap=open(capf,encoding="utf-8").read().strip()
if kind=="foto":
    c=call(f"{IG}/media",{"image_url":raw(src),"caption":cap}); wait(c["id"]); publish(c["id"])
elif kind=="carosello":
    imgs=sorted(f for f in glob.glob(os.path.join(src,"*.jpg")) if os.path.basename(f)[:-4].isdigit())
    assert 2<=len(imgs)<=10, "Il carosello vuole da 2 a 10 immagini"
    kids=[]
    for f in imgs:
        k=call(f"{IG}/media",{"image_url":raw(f),"is_carousel_item":"true"}); wait(k["id"]); kids.append(k["id"])
    c=call(f"{IG}/media",{"media_type":"CAROUSEL","children":",".join(kids),"caption":cap}); wait(c["id"]); publish(c["id"])
elif kind=="reel":
    c=call(f"{IG}/media",{"media_type":"REELS","video_url":raw(src),"caption":cap,"share_to_feed":"true"}); wait(c["id"],900); publish(c["id"])
else: raise SystemExit("tipo sconosciuto")

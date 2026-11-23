"""Cerca animazioni Lottie gratuite su LottieFiles e le scarica.
Uso: python3 lottie.py "query" [n] [cartella]  -> salva i .json e un indice con autore/id."""
import sys,json,os,urllib.request
def search(q,n=8):
    body=json.dumps({"query":'query($q:String!,$n:Int){searchPublicAnimations(query:$q,first:$n){edges{node{id name jsonUrl createdBy{username firstName lastName}}}}}',"variables":{"q":q,"n":n}}).encode()
    r=urllib.request.Request("https://graphql.lottiefiles.com/2022-08",data=body,headers={"Content-Type":"application/json","User-Agent":"madeinnews-bot/0.1"})
    d=json.load(urllib.request.urlopen(r,timeout=30))
    return [e["node"] for e in d["data"]["searchPublicAnimations"]["edges"] if e["node"].get("jsonUrl")]
if __name__=="__main__":
    q=sys.argv[1]; n=int(sys.argv[2]) if len(sys.argv)>2 else 8; out=sys.argv[3] if len(sys.argv)>3 else "."
    os.makedirs(out,exist_ok=True); idx=[]
    for k,a in enumerate(search(q,n)):
        f=os.path.join(out,f"{q.replace(' ','_')}_{k}.json")
        try:
            open(f,"wb").write(urllib.request.urlopen(urllib.request.Request(a["jsonUrl"],headers={"User-Agent":"madeinnews-bot/0.1"}),timeout=30).read())
            c=a.get("createdBy") or {}; idx.append(dict(file=f,id=a["id"],name=a["name"],autore=(c.get("firstName") or "")+" "+(c.get("lastName") or c.get("username") or "")))
        except Exception as e: print("err",e)
    json.dump(idx,open(os.path.join(out,f"{q.replace(' ','_')}_index.json"),"w"),ensure_ascii=False,indent=1)
    for x in idx: print(x["file"],"|",x["name"],"|",x["autore"].strip())

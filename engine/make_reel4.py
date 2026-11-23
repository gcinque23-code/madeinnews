"""Reel con UNA sola registrazione vocale continua (voce identica in tutto il video).
Uso: python3 make_reel4.py cfg.json out.mp4 [engine.js]"""
import json,sys,subprocess,base64,tempfile,urllib.request
cfgf,out=sys.argv[1],sys.argv[2]; eng=sys.argv[3] if len(sys.argv)>3 else "explainer3.js"
c=json.load(open(cfgf)); W=tempfile.mkdtemp(); V='/home/user/italia-in-breve/voci/'
G=0.4  # ritardo iniziale della voce
texts=[s["voice"].strip() for s in c["scenes"]]; full=" ".join(texts)
offs=[];p=0
for t in texts: offs.append((p,p+len(t))); p+=len(t)+1
body=json.dumps({"text":full,"model_id":"eleven_multilingual_v2","voice_settings":{"stability":0.6,"similarity_boost":0.85,"style":0.15,"use_speaker_boost":True}}).encode()
r=urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{c['voiceId']}/with-timestamps?output_format=mp3_44100_128",data=body,headers={"Content-Type":"application/json"})
d=json.load(urllib.request.urlopen(r,timeout=300)); open(f"{W}/voice.mp3","wb").write(base64.b64decode(d["audio_base64"]))
al=d["alignment"]; ch,st,en=al["characters"],al["character_start_times_seconds"],al["character_end_times_seconds"]
words=[];cur="";i0=0
for i,x in enumerate(ch):
    if x==" ":
        if cur: words.append(dict(w=cur,t0=st[i0],t1=en[i-1],i=i0)); cur=""
    else:
        if not cur: i0=i
        cur+=x
if cur: words.append(dict(w=cur,t0=st[i0],t1=en[len(ch)-1],i=i0))
total=float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f"{W}/voice.mp3"]))
starts=[st[a] for a,b in offs]
B=[0.0]+[G+s-0.15 for s in starts[1:]]
T=G+total+0.9
for k,s in enumerate(c["scenes"]):
    a,b=offs[k]; end=B[k+1] if k+1<len(B) else T
    s["dur"]=round(end-B[k],3)
    s["words"]=[dict(w=w["w"],t0=round(G+w["t0"]-B[k],3),t1=round(G+w["t1"]-B[k],3)) for w in words if a<=w["i"]<b]
c["pad"]=0; json.dump(c,open(f"{W}/cfg.json","w"),ensure_ascii=False)
inp=["-i",f"{W}/voice.mp3"]; flt=[f"[0:a]adelay={int(G*1000)}:all=1[v0]"]; mix=["[v0]"]; k=1
for j,b in enumerate([]):  # nessun effetto sonoro: solo voce e musica
    sfx=V+"sfx_whoosh.mp3"
    inp+=["-i",sfx]; flt.append(f"[{k}:a]volume=0.25,adelay={int(b*1000)}:all=1[v{k}]"); mix.append(f"[v{k}]"); k+=1
inp+=["-i",V+"music_bed_instr.mp3"]; flt.append(f"[{k}:a]volume=0.12,afade=t=in:st=0:d=1.5,afade=t=out:st={max(T-2,0)}:d=2[v{k}]"); mix.append(f"[v{k}]"); k+=1
fc=";".join(flt)+";"+"".join(mix)+f"amix=inputs={k}:normalize=0:duration=longest,atrim=0:{T}[a]"
subprocess.check_call(["ffmpeg","-loglevel","error","-y",*inp,"-filter_complex",fc,"-map","[a]","-t",str(T),f"{W}/mix.wav"])
subprocess.check_call(["node",eng,f"{W}/cfg.json",f"{W}/video.mp4"])
subprocess.check_call(["ffmpeg","-loglevel","error","-y","-i",f"{W}/video.mp4","-i",f"{W}/mix.wav","-c:v","copy","-c:a","aac","-b:a","192k","-shortest","-movflags","+faststart",out])
print("FATTO",out,round(T,1),"s  W=",W)

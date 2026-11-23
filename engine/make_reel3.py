"""Reel explainer v2: voce con timestamp parola per parola, musica, effetti. Uso: python3 make_reel2.py cfg.json out.mp4"""
import json,sys,os,subprocess,base64,tempfile,urllib.request
cfgf,out=sys.argv[1],sys.argv[2]; c=json.load(open(cfgf)); W=tempfile.mkdtemp(); V='/home/user/italia-in-breve/voci/'
PAD=0.35
def tts(text,i):
    body=json.dumps({"text":text,"model_id":"eleven_multilingual_v2","voice_settings":{"stability":0.4,"similarity_boost":0.8,"style":0.35}}).encode()
    r=urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{c['voiceId']}/with-timestamps?output_format=mp3_44100_128",data=body,headers={"Content-Type":"application/json"})
    d=json.load(urllib.request.urlopen(r,timeout=120)); open(f"{W}/a{i}.mp3","wb").write(base64.b64decode(d["audio_base64"]))
    al=d["alignment"]; chars,st,en=al["characters"],al["character_start_times_seconds"],al["character_end_times_seconds"]
    words=[];cur="";t0=None
    for ch,s,e in zip(chars,st,en):
        if ch==" ":
            if cur: words.append(dict(w=cur,t0=t0,t1=pe)); cur=""
        else:
            if not cur: t0=s
            cur+=ch; pe=e
    if cur: words.append(dict(w=cur,t0=t0,t1=pe))
    return words
for i,s in enumerate(c["scenes"]):
    s["words"]=tts(s["voice"],i)
    d=float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f"{W}/a{i}.mp3"]))
    s["dur"]=round(d+PAD+0.45,2)
c["pad"]=PAD; json.dump(c,open(f"{W}/cfg.json","w"),ensure_ascii=False)
T=sum(s["dur"] for s in c["scenes"]); starts=[sum(s["dur"] for s in c["scenes"][:i]) for i in range(len(c["scenes"]))]
inp=[];flt=[];k=0;mix=[]
for i,st in enumerate(starts):
    inp+=["-i",f"{W}/a{i}.mp3"]; flt.append(f"[{k}:a]adelay={int((st+PAD)*1000)}:all=1[v{k}]"); mix.append(f"[v{k}]"); k+=1
    sfx=V+("sfx_hit.mp3" if i in (0,2) else "sfx_whoosh.mp3")
    inp+=["-i",sfx]; flt.append(f"[{k}:a]volume=0.45,adelay={int(st*1000)}:all=1[v{k}]"); mix.append(f"[v{k}]"); k+=1
inp+=["-i",V+"music_bed_instr.mp3"]; flt.append(f"[{k}:a]volume=0.13,afade=t=out:st={max(T-2,0)}:d=2[v{k}]"); mix.append(f"[v{k}]"); k+=1
fc=";".join(flt)+";"+"".join(mix)+f"amix=inputs={k}:normalize=0:duration=longest,atrim=0:{T}[a]"
subprocess.check_call(["ffmpeg","-loglevel","error","-y",*inp,"-filter_complex",fc,"-map","[a]","-t",str(T),f"{W}/mix.wav"])
subprocess.check_call(["node","explainer3.js",f"{W}/cfg.json",f"{W}/video.mp4"])
subprocess.check_call(["ffmpeg","-loglevel","error","-y","-i",f"{W}/video.mp4","-i",f"{W}/mix.wav","-c:v","copy","-c:a","aac","-b:a","192k","-shortest","-movflags","+faststart",out])
print("FATTO",out,round(T,1),"s")

"""Aggiunge una pausa tra le frasi (scene) di un reel gia' registrato, senza rigenerare la voce.
Uso: python3 pause.py <W> <secondi>   -> scrive W/cfgP.json e W/mixP.wav"""
import json,sys,subprocess
W,P=sys.argv[1],float(sys.argv[2]); G=0.4
c=json.load(open(f"{W}/cfg.json")); V='/home/user/italia-in-breve/voci/'
D=[s["dur"] for s in c["scenes"]]; B=[sum(D[:i]) for i in range(len(D))]
cuts=[B[k]-G for k in range(1,len(D))]  # tempi nella traccia voce
total=float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f"{W}/voice.mp3"]))
segs=[0]+cuts+[total]; parts=[]
for i in range(len(segs)-1):
    f=f"{W}/seg{i}.wav"; subprocess.check_call(["ffmpeg","-loglevel","error","-y","-i",f"{W}/voice.mp3","-ss",str(segs[i]),"-to",str(segs[i+1]),"-ar","44100","-ac","1",f]); parts.append(f)
    if i<len(segs)-2:
        z=f"{W}/sil{i}.wav"; subprocess.check_call(["ffmpeg","-loglevel","error","-y","-f","lavfi","-i","anullsrc=r=44100:cl=mono","-t",str(P),z]); parts.append(z)
open(f"{W}/list.txt","w").write("".join(f"file '{p}'\n" for p in parts))
subprocess.check_call(["ffmpeg","-loglevel","error","-y","-f","concat","-safe","0","-i",f"{W}/list.txt",f"{W}/voiceP.wav"])
for k,s in enumerate(c["scenes"]):
    if k<len(D)-1: s["dur"]=round(s["dur"]+P,3)
json.dump(c,open(f"{W}/cfgP.json","w"),ensure_ascii=False)
T=sum(s["dur"] for s in c["scenes"])
fc=f"[0:a]adelay={int(G*1000)}:all=1[v0];[1:a]volume=0.12,afade=t=in:st=0:d=1.5,afade=t=out:st={max(T-2,0)}:d=2[v1];[v0][v1]amix=inputs=2:normalize=0:duration=longest,atrim=0:{T}[a]"
subprocess.check_call(["ffmpeg","-loglevel","error","-y","-i",f"{W}/voiceP.wav","-i",V+"music_bed_instr.mp3","-filter_complex",fc,"-map","[a]","-t",str(T),f"{W}/mixP.wav"])
print("ok",round(T,1))

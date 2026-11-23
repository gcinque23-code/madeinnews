#!/bin/bash
# Uso: make_reel.sh <reel.json> <out.mp4>  — genera voce per scena (campo "voice"), sincronizza e monta.
set -e
CFG=$1; OUT=$2; W=$(mktemp -d)
VOICE=$(python3 -c "import json;print(json.load(open('$CFG'))['voiceId'])")
N=$(python3 -c "import json;print(len(json.load(open('$CFG'))['scenes']))")
for i in $(seq 0 $((N-1))); do
  TXT=$(python3 -c "import json;print(json.dumps({'text':json.load(open('$CFG'))['scenes'][$i]['voice'],'model_id':'eleven_multilingual_v2','voice_settings':{'stability':0.45,'similarity_boost':0.8,'style':0.25}}))")
  curl -s -m 90 -X POST "https://api.elevenlabs.io/v1/text-to-speech/$VOICE?output_format=mp3_44100_128" -H "Content-Type: application/json" -d "$TXT" -o $W/a$i.mp3
done
python3 - "$CFG" "$W" <<'PY'
import json,subprocess,sys
cfg,w=sys.argv[1],sys.argv[2]; c=json.load(open(cfg))
for i,s in enumerate(c['scenes']):
    d=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'{w}/a{i}.mp3']))
    s['dur']=round(max(d+0.9, 3.0),2); s['adur']=d
json.dump(c,open(f'{w}/cfg.json','w'),ensure_ascii=False)
# traccia audio: ogni clip parte a inizio scena + 0.35s
parts=[];t=0
for i,s in enumerate(c['scenes']): parts.append((i,t+0.35)); t+=s['dur']
inp=' '.join(f'-i {w}/a{i}.mp3' for i,_ in parts)
flt=''.join(f'[{i}:a]adelay={int(st*1000)}|{int(st*1000)}[d{i}];' for i,st in parts)+''.join(f'[d{i}]' for i,_ in parts)+f'amix=inputs={len(parts)}:normalize=0,apad=whole_dur={t}[a]'
subprocess.check_call(f'ffmpeg -loglevel error -y {inp} -filter_complex "{flt}" -map "[a]" -t {t} {w}/voice.wav',shell=True)
PY
node ${ENGINE:-motion.js} $W/cfg.json $W/video.mp4
ffmpeg -loglevel error -y -i $W/video.mp4 -i $W/voice.wav -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart $OUT
rm -rf $W; echo "FATTO $OUT"

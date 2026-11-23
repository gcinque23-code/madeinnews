"""Genera il carosello riepilogo Serie A. Uso: python3 riepilogo_serie_a.py dati.json out.json
dati.json: {giornata, titolo:[riga1,riga2], foto, credito, risultati:[[casa,ris,ospite]], fatti:[{giorno, partita, casa, ospite, testo}], classifica:[[squadra,punti]] (opzionale)}"""
import json,sys,os,base64
D=json.load(open(sys.argv[1])); B='#1E40FF'; S=os.path.join(os.path.dirname(os.path.abspath(__file__)),'assets','stemmi')
def crest(n,size=58):
    f=[x for x in os.listdir(S) if x.split('.')[0]==n][0]; m='image/svg+xml' if f.endswith('svg') else 'image/png'
    return f'<img src="data:{m};base64,{base64.b64encode(open(os.path.join(S,f),"rb").read()).decode()}" style="width:{size}px;height:{size}px;object-fit:contain;flex:none">'
pill=lambda t:f"<span class='pill' style='background:{B};color:#fff'>{t}</span>"
hl=lambda t:t.replace('[','<span style="color:%s">'%B).replace(']','</span>')
foto=base64.b64encode(open(D['foto'],'rb').read()).decode()
cover={"dark":True,"src":D.get('credito',''),"html":f"""<div style="position:absolute;left:-64px;right:-64px;top:-170px;height:1350px;background:url(data:image/jpeg;base64,{foto}) 55% center/cover"></div>
<div style="position:absolute;left:-64px;right:-64px;top:-170px;height:1350px;background:linear-gradient(180deg,#0000 35%,#000e 70%)"></div>
<div style="position:absolute;left:0;right:0;top:690px">{pill('SERIE A · %sª GIORNATA'%D['giornata'])}
<div style="font:130px/0.95 Anton;text-transform:uppercase;margin-top:26px;color:#fff">{D['titolo'][0]}<br><span style='color:#4D6BFF'>{D['titolo'][1]}</span></div></div>"""}
rows=''.join(f"<div style=\"display:grid;grid-template-columns:1fr 150px 1fr;align-items:center;margin-top:8px;background:#fff;border-radius:14px;padding:8px 22px;font:800 36px 'Inter Tight';color:#111\"><span style='display:flex;align-items:center;gap:16px'>{crest(a)}{a}</span><span style=\"text-align:center;font:46px Anton;color:{B}\">{s}</span><span style='display:flex;align-items:center;gap:16px;justify-content:flex-end'>{b}{crest(b)}</span></div>" for a,s,b in D['risultati'])
risultati={"src":"Fonti: ANSA, Lega Serie A","html":pill('I RISULTATI')+f"<div style='margin-top:12px'>{rows}</div>"}
def card(f): return f"<div style=\"background:#fff;border-left:14px solid {B};padding:18px 26px;border-radius:14px;display:flex;align-items:center;gap:20px\"><span style='display:flex;gap:8px'>{crest(f['casa'],52)}{crest(f['ospite'],52)}</span><div><div style=\"font:800 26px 'Inter Tight';letter-spacing:1px;color:#666\">{f['partita']}</div><div style=\"font:700 40px/1.22 'Inter Tight';letter-spacing:0;margin-top:6px\">{hl(f['testo'])}</div></div></div>"
fh=pill('I FATTI'); last=None
for f in D['fatti']:
    if f['giorno']!=last:
        if last: fh+="</div>"
        fh+=f"<div style=\"font:900 28px 'Inter Tight';letter-spacing:3px;color:{B};margin:18px 0 2px\">{f['giorno']}</div><div style='display:grid;gap:14px'>"; last=f['giorno']
    fh+=card(f)
fh+="</div>"
fatti={"src":"Fonti: ANSA, Lega Serie A","html":fh}
if D.get('classifica'):
    cr=''.join(f"<div style=\"display:grid;grid-template-columns:70px 70px 1fr 120px;align-items:center;margin-top:10px;background:#1a1a1a;border-radius:14px;padding:12px 24px;font:800 42px 'Inter Tight'\"><span style='font:46px Anton;color:#888'>{i+1}</span>{crest(n)}<span>{n}</span><span style='text-align:right;font:50px Anton;color:#4D6BFF'>{p}</span></div>" for i,(n,p) in enumerate(D['classifica']))
    classifica={"dark":True,"src":"Fonte: Lega Serie A","html":pill('LA CLASSIFICA')+f"<div style=\"font:900 84px/1.05 'Inter Tight';letter-spacing:-3px;margin:30px 0 20px\">Le prime posizioni</div>{cr}"}
else:
    classifica={"dark":True,"src":"Fonte: Lega Serie A","html":pill('LA CLASSIFICA')+"<div style=\"font:900 84px/1.05 'Inter Tight';letter-spacing:-3px;margin-top:40px\">Classifica<br>ufficiale</div><div style=\"margin-top:50px;border:4px dashed #444;border-radius:20px;height:560px;display:flex;align-items:center;justify-content:center;text-align:center;font:800 40px/1.4 'Inter Tight';color:#777;padding:40px\">Stasera, dopo Monza–Fiorentina:<br>le prime posizioni dalla<br>classifica ufficiale della Lega</div>"}
fine={"dark":True,"html":"<div style=\"font:900 110px/1.02 'Inter Tight';letter-spacing:-4px;margin-top:330px\">Il calcio,<br><span style='color:#4D6BFF'>ogni giornata.</span></div><div style=\"font:800 52px 'Inter Tight';margin-top:70px\">Segui <span style='color:#E63946'>@madeinnews.it</span></div>"}
json.dump({"color":B,"slides":[cover,risultati,fatti,classifica,fine]},open(sys.argv[2],'w'),ensure_ascii=False); print('ok')

# Made in News – regole editoriali

## Contenuti
- APPROVAZIONE: l'utente vuole sempre vedere il contenuto finito e dare l'ok esplicito prima di ogni pubblicazione. Mai pubblicare senza un suo 'ok' sul file finale.
- Orari: contenuti pronti alle 8:00 (anteprima per approvazione), prima pubblicazione alle 9:00.
- Ogni giorno:
  - 3 post di notizie, le più cercate del giorno: uno al mattino, uno al pomeriggio, uno alla sera.
  - 1 post di sport (calcio in primo piano).
  - almeno 2 reel.
- Ogni post ha una didascalia curata che spiega la notizia (contesto, fatti, fonte, hashtag).
- I reel hanno una didascalia breve: è il video a raccontare la notizia.
- Tono: solo i fatti. Niente opinioni, pro/contro, domande retoriche o ipotesi.
- I reel NON ripetono le notizie già pubblicate nei post dello stesso giorno: ogni reel tratta notizie diverse.
- Notizie verificate su fonti affidabili (ANSA, Lega Serie A per il calcio). Fonte sempre in didascalia.
- Notizie delicate (suicidi, vittime minorenni) solo con cautela, o non pubblicate.

## Grafica
- Logo: monogramma "MN." (punto rosso #E63946) + scritta "madeinnews." – niente bandiere.
- Etichette categoria solo testo, senza emoji.
- Niente scritta "Scorri" nei caroselli.
- Colori categoria: calcio #1E40FF (blu Serie A), economia #3B82F6, esteri #F97316, politica #EF4444.

## Foto
- Politica, economia, esteri, cronaca: foto libere (Wikimedia Commons, siti istituzionali con licenza aperta), con autore e licenza.
- Sport: le foto le fornisce l'utente, con il credito da indicare. Senza foto: archivio libero o versione solo grafica.
- Mai foto prese da testate o agenzie senza licenza.

## Reel
- Voce generata in UNA sola registrazione continua per reel (make_reel4.py), mai frase per frase: il timbro resta identico.
- Stile: animazioni illustrate (explainer3.js), una notizia spiegata per reel; musica solo strumentale. Nessun effetto sonoro (niente colpi né whoosh): solo voce e musica in dissolvenza.
- Formato motion graphic: testi e grafiche animati (entrate, numeri che salgono, transizioni), non slide statiche.
- 2 al giorno, su notizie diverse dai post.
- Voce: ElevenLabs, modello eleven_multilingual_v2, SEMPRE Francesco (GOAZNavLupajyL3YafaD). Stabilità 0.6, una sola registrazione continua per reel.

## Guida di scrittura (instagram-agent-skill, MIT, in risorse/instagram-agent-skill/)
- Prima di scrivere un reel: seguire risorse/instagram-agent-skill/skills/ig-reel/SKILL.md (formule di hook) e dare un punteggio all'hook con hookscore.py.
- Didascalie: seguire ig-caption/SKILL.md (la prima riga prima del "...altro" deve agganciare).
- Caroselli: ig-carousel/SKILL.md.
- Non usare strumenti per mascherare l'origine AI dei testi (ig-human è stato rimosso). I testi devono essere chiari e naturali, ma senza nascondere come sono prodotti.

## Allineamento (regola fissa)
- Tutto dritto e centrato: niente scritte o riquadri ruotati/inclinati, niente timbri storti.
- Composizione simmetrica sull'asse centrale (x=540); elementi decorativi bilanciati a destra e sinistra.
- Controllare ogni anteprima con una griglia di centro prima di mandarla all'utente.
- Le scritte dentro i box/riquadri devono essere SEMPRE centrate sia in orizzontale sia in verticale.
  Nel motore (explainer5.js) ogni riquadro va dentro <g class="bx"> (rect + text): la centratura viene calcolata in automatico sull'inchiostro reale del testo, e se il testo è troppo largo viene ristretto per stare nel box.

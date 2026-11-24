# Made in News – regole editoriali

## Contenuti
- APPROVAZIONE: l'utente vuole sempre vedere il contenuto finito e dare l'ok esplicito prima di ogni pubblicazione. Mai pubblicare senza un suo 'ok' sul file finale.
- NIENTE routine automatica di notizie: non cercare né preparare notizie del giorno di mia iniziativa. Si lavora solo sugli argomenti che sceglie l'utente (pillole di sapere).
- Nessun orario fisso di pubblicazione: si pubblica solo quando l'utente lo chiede.
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
- Copertine dei reel (1080x1920): logo e scritte sempre dentro l'area 4:5 centrale (y 285–1635), così si vedono nella griglia del profilo.

## Verifica prima del rendering (obbligatoria, sempre)
Prima di ogni rendering completo eseguire: `CHECK=1 node explainer5.js <cfg.json> <out>` (non consuma crediti).
Controlla: momenti vuoti (>2,2s di voce senza nuovi elementi), testo più largo del box, box che toccano il logo, testo fuori bordo.
Si renderizza solo con "VERIFICA OK"; poi controllo visivo delle anteprime (centratura) prima di mandare.
Attenzione alle parole-ancora (@parola): trovano la PRIMA parola che inizia così (es. @roma prende anche "romano").
- Ogni novità (stile, mascotte, copertina, formato) va prima mostrata come PROVA all'utente; si adotta solo dopo la sua conferma.
- Momenti vuoti: mai. Ogni ~2 secondi di voce deve entrare qualcosa di nuovo (verifica automatica + controllo secondo per secondo del video finito).
- Testi bianchi con ombra: NO, in nessun elemento (sottotitoli compresi). Su sfondo chiaro testo scuro senza ombra; su sfondo scuro testo chiaro senza ombra o dentro un riquadro.
- MODELLO DI RIFERIMENTO: il reel "caduta dall'aereo" (engine/aereo_build.js) è il preferito dall'utente. Struttura: gancio + promessa ("resta fino alla fine"), storie vere con date e nomi, scene piene con sfondi colorati e oggetti grandi, CTA "segui" a metà con telefono e pulsante, chicca finale, chiusura "Hai altre curiosità? Scrivile nei commenti". Pause di 0,6 s tra le frasi (pause.py).
- NO effetto 'linee vive' (boil/tremolio dei contorni): non piace all'utente.

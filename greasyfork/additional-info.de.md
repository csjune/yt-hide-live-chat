Schließt den Livechat, den YouTube von selbst öffnet, wenn du ein Video mit Livechat öffnest, etwa einen Livestream. Wenn du den Chat selbst öffnest, bleibt er offen.

## Was das Skript macht

- Öffnet YouTube den Livechat von selbst, schließt ihn das Skript über die Schließen-Schaltfläche des Chats.
- Öffnest du den Chat selbst, bleibt er bei diesem Video offen.
- Funktioniert auch, wenn du ohne Neuladen zu einem anderen Video wechselst, und in Hintergrund-Tabs (es startet, sobald du zum Tab wechselst).

## Voraussetzungen

- Desktop-Website (`www.youtube.com`). Die mobile Website `m.youtube.com` wird nicht unterstützt.

## Sprachen

Der Chat und seine Schließen-Schaltfläche werden über Element-IDs gefunden, nicht über den Text. Das Skript hängt daher nicht von der Sprache der Oberfläche ab.

## Hinweise

- Das Skript sendet selbst keine Anfragen und sammelt keine Daten. Es klickt nur auf die Schaltflächen von YouTube.
- Es beobachtet den Chat etwa 15 Sekunden lang, nachdem er erschienen ist, weil YouTube ihn manchmal verspätet öffnet. Danach lässt es den Chat in Ruhe.

## Kompatibilität

- Firefox + Violentmonkey
- Chrome + ScriptCat

## Fehlerbehebung

1. Öffne die Browserkonsole (F12) und aktiviere die Protokollstufe Verbose/Debug.
2. Filtere nach `yt-hide-live-chat`.
3. Bei normalem Ablauf erscheint `checking video` → `closing chat` → `done watching chat`.

- `no live chat`: Dieses Video hat keinen Livechat.
- `chat opened by user, leaving it open`: Kurz bevor sich der Chat öffnete, gab es einen Klick oder Tastendruck, daher hat das Skript ihn als von dir geöffnet behandelt.
- Bleibt der Chat offen und erscheint kein `closing chat`, gib bitte im Feedback die Sprache deiner Oberfläche und deinen Browser an.

## Lizenz

MIT

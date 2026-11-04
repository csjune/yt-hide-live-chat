Ferme le chat en direct que YouTube ouvre tout seul quand vous ouvrez une vidéo avec chat, comme un direct. Si vous ouvrez le chat vous-même, il reste ouvert.

## Ce que fait le script

- Quand YouTube ouvre le chat en direct de lui-même, le script le ferme avec le bouton de fermeture du chat.
- Si vous ouvrez le chat vous-même, il reste ouvert pour cette vidéo.
- Fonctionne aussi quand vous passez à une autre vidéo sans recharger la page, et dans les onglets en arrière-plan (il démarre quand vous affichez l'onglet).
- Dans les fenêtres étroites, YouTube n'ouvre pas le chat de lui-même : il n'y a donc rien à fermer.

## Prérequis

- Site pour ordinateur (`www.youtube.com`). Le site mobile `m.youtube.com` n'est pas pris en charge.

## Langues

Le chat et son bouton de fermeture sont repérés par les id des éléments, et non par le texte des boutons : le script ne dépend donc pas de la langue de l'interface.

## À savoir

- Le script n'envoie aucune requête de lui-même et ne collecte aucune donnée. Il se contente de cliquer sur les boutons de YouTube.
- Il surveille pendant environ 15 secondes après l'apparition du chat, car YouTube l'ouvre parfois en retard. Ensuite, il ne touche plus au chat.

## Compatibilité

- Firefox + Violentmonkey
- Chrome + ScriptCat

## Dépannage

1. Ouvrez la console du navigateur (F12) et activez le niveau de journalisation Verbose/Debug.
2. Filtrez sur `yt-hide-live-chat`.
3. En fonctionnement normal, vous verrez `checking video` → `closing chat` → `done watching chat`.

- `no live chat` : cette vidéo n'a pas de chat en direct.
- `chat opened by user, leaving it open` : un clic ou une touche a précédé de peu l'ouverture du chat, le script a donc considéré que c'était vous.
- Si le chat reste ouvert et que `closing chat` n'apparaît pas, laissez un commentaire avec la langue de votre interface et votre navigateur.

## Licence

MIT

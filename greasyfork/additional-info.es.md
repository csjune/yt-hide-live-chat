Cierra el chat en directo que YouTube abre solo cuando abres un vídeo con chat, como una emisión en directo. Si abres el chat tú, se queda abierto.

## Qué hace

- Cuando YouTube abre el chat en directo por su cuenta, el script lo cierra con el propio botón de cerrar del chat.
- Si abres el chat tú, se queda abierto en ese vídeo.
- También funciona cuando pasas a otro vídeo sin recargar la página y en pestañas en segundo plano (empieza cuando cambias a la pestaña).
- En ventanas estrechas YouTube no abre el chat solo, así que no hay nada que cerrar.

## Requisitos

- Sitio de escritorio (`www.youtube.com`). El sitio móvil `m.youtube.com` no es compatible.

## Idiomas

El chat y su botón de cerrar se encuentran por los id de los elementos, no por el texto de los botones, así que el script no depende del idioma de la interfaz.

## Ten en cuenta

- El script no envía peticiones propias ni recopila datos. Solo pulsa los botones de YouTube.
- Vigila unos 15 segundos después de que aparezca el chat, porque a veces YouTube lo abre tarde. Después deja el chat en paz.

## Compatibilidad

- Firefox + Violentmonkey
- Chrome + ScriptCat

## Solución de problemas

1. Abre la consola del navegador (F12) y activa el nivel de registro Verbose/Detallado.
2. Filtra por `yt-hide-live-chat`.
3. Si todo va bien, verás `checking video` → `closing chat` → `done watching chat`.

- `no live chat`: este vídeo no tiene chat en directo.
- `chat opened by user, leaving it open`: hubo un clic o una pulsación de tecla justo antes de que se abriera el chat, así que el script lo tomó como tuyo.
- Si el chat se queda abierto y no aparece `closing chat`, deja un comentario con el idioma de tu interfaz y tu navegador.

## Licencia

MIT

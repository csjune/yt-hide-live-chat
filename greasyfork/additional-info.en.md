Closes the live chat YouTube opens on its own when you open a video with live chat, such as a live stream. If you open the chat yourself, it stays open.

## What it does

- When YouTube opens the live chat by itself, the script closes it with the chat's own close button.
- If you open the chat yourself, it is left open for that video.
- Also works when you click through to another video without a page reload, and in background tabs (it starts once you switch to the tab).
- In narrow windows YouTube does not open the chat by itself, so there is nothing to close.

## Requirements

- Desktop site (`www.youtube.com`). The mobile site `m.youtube.com` is not supported.

## Languages

The chat and its close button are found by element ids, not by button text, so the script does not depend on the UI language.

## Please note

- The script sends no requests of its own and collects no data. It only clicks YouTube's own buttons.
- It watches for about 15 seconds after the chat appears, since YouTube sometimes opens the chat late. After that it leaves the chat alone.

## Compatibility

- Firefox + Violentmonkey
- Chrome + ScriptCat

## Troubleshooting

1. Open the browser console (F12) and turn on the Verbose/Debug log level.
2. Filter by `yt-hide-live-chat`.
3. A working run logs `checking video` → `closing chat` → `done watching chat`.

- `no live chat`: this video has no live chat.
- `chat opened by user, leaving it open`: a click or key press came right before the chat opened, so the script took it as yours.
- If the chat stays open and no `closing chat` shows up, please leave feedback with your UI language and browser.

## License

MIT

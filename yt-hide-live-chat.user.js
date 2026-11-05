// ==UserScript==
// @name              YouTube Hide Live Chat by Default
// @name:ko           YouTube 라이브 채팅 기본으로 숨기기
// @name:ja           YouTube ライブチャットを最初から非表示
// @name:zh-CN        YouTube 默认隐藏直播聊天
// @name:zh-TW        YouTube 預設隱藏聊天室
// @name:es           Ocultar por defecto el chat en directo de YouTube
// @name:fr           Masquer par défaut le chat en direct de YouTube
// @name:de           YouTube-Livechat standardmäßig ausblenden
// @name:pt-BR        Ocultar por padrão o chat ao vivo do YouTube
// @name:ru           Скрывать чат YouTube по умолчанию
// @namespace         https://github.com/csjune
// @version           1.0.1
// @description       Closes the live chat that YouTube opens on its own on videos with live chat. If you open it yourself, it stays open.
// @description:ko    라이브 채팅이 있는 영상에서 YouTube가 저절로 여는 채팅을 닫습니다. 직접 열면 그대로 둡니다.
// @description:ja    ライブチャットがある動画で YouTube が自動で開くチャットを閉じます。自分で開いたときはそのままにします。
// @description:zh-CN 在有直播聊天的视频中关闭 YouTube 自动打开的聊天。自己打开的聊天会保持打开。
// @description:zh-TW 在有聊天室的影片中關閉 YouTube 自動開啟的聊天室。自己開啟的聊天室會保持開啟。
// @description:es    Cierra el chat en directo que YouTube abre solo en los vídeos con chat. Si lo abres tú, se queda abierto.
// @description:fr    Ferme le chat en direct que YouTube ouvre tout seul sur les vidéos avec chat. Si vous l'ouvrez vous-même, il reste ouvert.
// @description:de    Schließt den Livechat, den YouTube bei Videos mit Chat von selbst öffnet. Wenn du ihn selbst öffnest, bleibt er offen.
// @description:pt-BR Fecha o chat ao vivo que o YouTube abre sozinho nos vídeos com chat. Se você abrir, ele continua aberto.
// @description:ru    Закрывает чат, который YouTube сам открывает на видео с чатом. Если открыть его самому, он останется открытым.
// @author            csjune
// @license           MIT
// @homepageURL       https://github.com/csjune/yt-hide-live-chat
// @supportURL        https://github.com/csjune/yt-hide-live-chat/issues
// @compatible        firefox
// @compatible        chrome
// @match             https://www.youtube.com/*
// @run-at            document-idle
// @grant             none
// @noframes
// ==/UserScript==

// On YouTube watch pages, close the live chat when YouTube opens it, unless the user did.
//
// DOM as of 2026-11:
// - Chat: ytd-live-chat-frame#chat, with a `collapsed` attribute while closed. On SPA
//   navigation it is either reused or replaced by a new element.
// - Close button: the chat header inside the same-origin iframe #chatframe,
//   yt-live-chat-header-renderer #close-button button. Clicking it collapses the chat
//   just like the user's own click.
// - Older layouts have a "Hide chat" button in ytd-live-chat-frame #show-hide-button
//   instead. In the current layout that button is [hidden] while the chat is open.
// - Once closed, the chat is reopened from a "Live chat / Open panel" card under the
//   video, which has no stable id. So a user opening the chat is told apart by timing:
//   a click or key press right before the chat opens.
// All of these are ids and tag names, so nothing depends on the UI language, and no page
// data is read, so the script works the same when the manager runs it in an isolated world.

// YouTube may open the chat a few seconds after it appears, so keep watching this long.
const WATCH_AFTER_CHAT_MS = 15000;
// Videos without live chat never get a chat element; stop looking after this long.
const CHAT_APPEAR_TIMEOUT_MS = 30000;
const PAGE_READY_TIMEOUT_MS = 30000;
// A chat that opens within this long of a click or key press was opened by the user.
const USER_OPEN_MS = 1500;
// Do not click again while the previous click is still taking effect: the older
// layout's button is a toggle, and a second click would reopen the chat.
const CLICK_COOLDOWN_MS = 1000;
const POLL_MS = 250;

let handledVideoId = null;
let generation = 0;
let lastInputAt = 0;
let userOpenedGeneration = 0;

function log(...args) {
  console.debug("[yt-hide-live-chat]", ...args);
}

function currentVideoId() {
  if (location.pathname !== "/watch") return null;
  return new URLSearchParams(location.search).get("v");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Watch DOM mutations until find() returns a value. Gives up on timeout or video change.
function waitFor(find, timeoutMs, gen) {
  return new Promise((resolve) => {
    const check = () => {
      if (gen !== generation) return finish(null);
      const value = find();
      if (value) finish(value);
    };
    const observer = new MutationObserver(check);
    const timer = setTimeout(() => finish(null), timeoutMs);
    function finish(value) {
      observer.disconnect();
      clearTimeout(timer);
      resolve(value);
    }
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    check();
  });
}

// Background tabs may not render the watch page until shown, and the timeouts below
// would run out before anything appears.
function whenVisible() {
  if (!document.hidden) return Promise.resolve();
  return new Promise((resolve) => {
    document.addEventListener("visibilitychange", function onChange() {
      if (document.hidden) return;
      document.removeEventListener("visibilitychange", onChange);
      resolve();
    });
  });
}

function chatFrame() {
  return document.querySelector("ytd-live-chat-frame#chat");
}

function isOpen(frame) {
  return !frame.hasAttribute("collapsed");
}

// Returns whether a button was clicked. The iframe may still be loading, in which
// case the caller tries again on the next poll.
function closeChat(frame) {
  try {
    const doc = frame.querySelector("#chatframe")?.contentDocument;
    const close = doc?.querySelector("yt-live-chat-header-renderer #close-button button");
    if (close) {
      close.click();
      return true;
    }
  } catch {
    // Not reachable yet; fall through to the older layout.
  }
  const hide = frame.querySelector("#show-hide-button:not([hidden]) button");
  if (hide) {
    hide.click();
    return true;
  }
  return false;
}

async function run() {
  const videoId = currentVideoId();
  if (!videoId) {
    // Off the watch page the chat is gone, so a return to the same video opens a new one.
    handledVideoId = null;
    generation++;
    return;
  }
  if (videoId === handledVideoId) return;

  const gen = ++generation;
  handledVideoId = videoId;
  log("checking video", videoId);

  if (document.hidden) {
    log("waiting until the tab is visible");
    await whenVisible();
    if (gen !== generation) return;
  }

  // yt-navigate-finish fires before the watch page switches over: until ytd-watch-flexy
  // carries the new video id, the chat still belongs to the previous video.
  const pageReady = () => document.querySelector("ytd-watch-flexy")?.getAttribute("video-id") === videoId;
  if (!(await waitFor(pageReady, PAGE_READY_TIMEOUT_MS, gen))) {
    log("watch page not ready");
    return;
  }
  const readyAt = Date.now();

  let frame = null;
  let seenAt = 0;
  let clickedAt = 0;
  while (gen === generation) {
    const now = Date.now();
    const current = chatFrame();
    // A replaced chat element is a new chat: start the watch period over.
    if (current !== frame) {
      frame = current;
      seenAt = frame ? now : 0;
    }
    if (seenAt ? now > seenAt + WATCH_AFTER_CHAT_MS : now > readyAt + CHAT_APPEAR_TIMEOUT_MS) {
      log(seenAt ? "done watching chat" : "no live chat");
      return;
    }

    if (frame && isOpen(frame) && now > clickedAt + CLICK_COOLDOWN_MS) {
      if (userOpenedGeneration === gen || (lastInputAt > readyAt && now - lastInputAt < USER_OPEN_MS)) {
        log("chat opened by user, leaving it open");
        return;
      }
      if (closeChat(frame)) {
        log("closing chat");
        clickedAt = now;
      }
    }
    await sleep(POLL_MS);
  }
}

function onInput(event) {
  if (!event.isTrusted) return;
  if (event.type === "keydown" && event.key !== "Enter" && event.key !== " ") return;
  lastInputAt = Date.now();
  // Any click on the chat element itself (such as "Show chat") is the user's choice.
  if (event.target instanceof Element && event.target.closest("ytd-live-chat-frame")) {
    userOpenedGeneration = generation;
  }
}
document.addEventListener("click", onInput, true);
document.addEventListener("keydown", onInput, true);

// YouTube is an SPA and fires yt-navigate-finish on every in-app navigation.
document.addEventListener("yt-navigate-finish", () => run());
run();

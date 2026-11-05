開啟直播等有聊天室的影片時，關閉 YouTube 自動開啟的聊天室。自己開啟的聊天室會保持開啟。

## 功能

- YouTube 自動開啟聊天室時，腳本會按下聊天室本身的關閉按鈕將其關閉。
- 如果你自己開啟聊天室，該影片的聊天室會保持開啟。
- 在不重新載入頁面切換到其他影片時，以及在背景分頁中也能運作（背景分頁會在切換到該分頁後開始）。

## 需求

- 桌面版網站（`www.youtube.com`）。不支援行動版網站 `m.youtube.com`。

## 語言

腳本以元素 id 而不是按鈕文字來尋找聊天室和關閉按鈕，因此不受介面語言影響。

## 注意事項

- 腳本本身不會送出任何請求，也不收集任何資料。它只是替你按下 YouTube 自己的按鈕。
- 由於 YouTube 有時會較晚開啟聊天室，腳本會在聊天室出現後觀察約 15 秒。之後就不再變動聊天室。

## 相容性

- Firefox + Violentmonkey
- Chrome + ScriptCat

## 疑難排解

1. 開啟瀏覽器主控台（F12），在記錄層級中開啟 Verbose/詳細。
2. 以 `yt-hide-live-chat` 篩選。
3. 正常執行時會依序顯示 `checking video` → `closing chat` → `done watching chat`。

- `no live chat`：這部影片沒有聊天室。
- `chat opened by user, leaving it open`：聊天室開啟前剛好有點擊或按鍵，腳本認為是你自己開啟的，因此保持開啟。
- 如果聊天室一直開著且沒有顯示 `closing chat`，請在意見回饋中告知你的介面語言和瀏覽器。

## 授權

MIT

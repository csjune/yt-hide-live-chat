打开直播等带有直播聊天的视频时，关闭 YouTube 自动打开的聊天。自己打开的聊天会保持打开。

## 功能

- YouTube 自动打开直播聊天时，脚本会点击聊天自带的关闭按钮将其关闭。
- 如果你自己打开聊天，该视频的聊天会保持打开。
- 在不刷新页面切换到其他视频时，以及在后台标签页中也能工作（后台标签页会在切换到该标签页后开始）。
- 窗口较窄时 YouTube 不会自动打开聊天，因此无需关闭。

## 要求

- 桌面版网站（`www.youtube.com`）。不支持移动版网站 `m.youtube.com`。

## 语言

脚本通过元素 id 而不是按钮文字来查找聊天和关闭按钮，因此不受界面语言影响。

## 注意

- 脚本本身不发送任何请求，也不收集任何数据。它只是替你点击 YouTube 自己的按钮。
- 由于 YouTube 有时会延迟打开聊天，脚本会在聊天出现后观察约 15 秒。之后不再改动聊天。

## 兼容性

- Firefox + Violentmonkey
- Chrome + ScriptCat

## 故障排除

1. 打开浏览器控制台（F12），在日志级别中开启 Verbose/详细。
2. 按 `yt-hide-live-chat` 过滤。
3. 正常运行时依次显示 `checking video` → `closing chat` → `done watching chat`。

- `no live chat`：此视频没有直播聊天。
- `chat opened by user, leaving it open`：聊天打开前刚有点击或按键，脚本认为是你自己打开的，因此保持打开。
- 如果聊天一直开着且没有显示 `closing chat`，请在反馈中告知你的界面语言和浏览器。

## 许可证

MIT

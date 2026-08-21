# Nginx Proxy Manager 資源總站設計

## 目標

建立 WoowTech Nginx Proxy Manager（NPM）HAOS add-on 的繁體中文資源總站，服務一般家庭與經銷商。網站含 12 章教學、銷售手冊、操作提示詞庫、AI Agent Skill 手冊，部署於 GitHub Pages 並以 Cloudflare 提供 `nginx-guide.woowtech.io`。

## 內容架構

教學依「理解 → 安裝 → 第一個代理 → 對外公開 → 安全與維運」排序：概觀、安裝、首次登入、介面導覽、Proxy Host、DNS、SSL、Cloudflare Tunnel、Access Lists、Redirection/Streams/WebSocket、備份安全、排錯。每章 8–14 節、至少 4 FAQ、含排錯與官方來源。

## 對外連線模式

主推 Cloudflare Tunnel + NPM：外部 HTTPS 由 Cloudflare 處理，NPM 負責內部反向代理，不需要在路由器開放 80/443。傳統 Port Forwarding + NPM/Let's Encrypt 仍提供完整說明，並明確標示管理 port 81 不可公開、預設密碼必須立即修改。

## 網站與品牌

沿用 WoowTech tutorial generator：`chapters.json` 是單一來源，`build_nav.js` 產生 head、側欄、pager、tutorial catalog 與 sitemap；`check_links.js` 驗證 18 個頁面。入口為四卡 hub：教學、銷售、提示詞、Skill。遵守 WoowTech 品牌色、Poppins/Outfit/Noto Sans TC/Yellowtail、MDI 與 20px 卡片圓角。

## 截圖策略

若取得可登入的 NPM 測試實例，僅做唯讀導覽與打開表單，不儲存或刪除資料；遮蔽網域、內網 IP、憑證、Access List、帳號與 log。未取得實例時先發布完整文字版，不偽造 UI 截圖。

## 發布

Repo：`WOOWTECH/Woow_nginx_proxy_manager_tutorial_site`。GitHub Pages 發布 main root，`CNAME` 為 `nginx-guide.woowtech.io`。Cloudflare 建立 proxied CNAME `nginx-guide` → `woowtech.github.io`，TTL Auto。

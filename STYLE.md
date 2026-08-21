# Nginx Proxy Manager 教學撰寫規格

- 讀者：會操作 Home Assistant 與網路設定，但不需要會寫程式或架大型伺服器。
- 語言：台灣繁體中文；以「你」稱呼讀者，不使用 emoji。
- 每章：8–12 個 section；每個 section 要有 `id`、`data-nav`，每個 h2 要有已定義的 `data-icon`。
- 元件：只使用 `steps`、`callout`、`data-table`、`code-block`、`details.faq`、`figure.shot`。
- 安全：管理密碼、Cookie、DNS API Token、憑證私鑰、內外網 IP、完整網域與 log 都視為敏感資料，寫入前必須遮罩或改寫。
- 變更：Proxy Hosts、Access Lists、Users、Streams、憑證與還原操作會影響對外服務；必須說明影響範圍、回復方式，且不引導讀者刪除或覆寫沒有把握的項目。
- 截圖：自動化只做唯讀瀏覽；可以打開表單但不儲存，不建立／刪除 Proxy Host、User、Access List、Stream 或憑證。圖片須先人工檢查並遮罩敏感資料。
- 事實來源：優先使用 Nginx Proxy Manager 官方文件（nginxproxymanager.com）與官方 GitHub，其次才是實測結果；介面改版時以最新官方文件為準。

修改後執行：

```bash
node scripts/build_nav.js
node scripts/build_nav.js --check
node scripts/check_links.js
```

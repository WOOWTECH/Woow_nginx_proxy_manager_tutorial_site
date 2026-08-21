# Nginx Proxy Manager 繁體中文指南

這是 [WoowTech](https://github.com/WOOWTECH) 製作的 Nginx Proxy Manager 台灣繁體中文靜態網站。對外入口是 <https://nginx-guide.woowtech.io/>，內容以「你」稱呼讀者，從反向代理、自訂網域與 HTTPS，到存取控制、備份及安全維運。

## 四張卡片的資源總站

首頁 [`index.html`](https://nginx-guide.woowtech.io/) 是固定的四卡 hub：

| 卡片 | 線上網址 | 內容 |
|---|---|---|
| 12 章入住教學 | <https://nginx-guide.woowtech.io/tutorial.html> | 從 HAOS 安裝、首次登入、Proxy Host、DNS 與憑證，到 Cloudflare Tunnel、Access Lists、備份、安全與排錯 |
| 銷售手冊 | <https://nginx-guide.woowtech.io/sales.html> | NPM 的價值、部署選擇與誠實的安全取捨 |
| 操作提示詞庫 | <https://nginx-guide.woowtech.io/prompts.html> | 45 條 Proxy Hosts、DNS／憑證、Access Lists／使用者、Redirections／Streams、備份／診斷提示詞 |
| AI Agent Skill 手冊 | <https://nginx-guide.woowtech.io/skills.html> | 清冊、憑證到期、存取稽核、備份驗證、日誌診斷與安全自動化模式 |

銷售手冊、提示詞庫與 Skill 手冊是自包含的單一 HTML 檔，可從首頁下載並離線閱讀。12 章教學由 `chapters.json` 定義順序與導覽，離線使用時請下載完整網站，避免遺漏章節、樣式或圖片。

## 網站結構

```text
index.html       四卡資源總站（人工維護）
tutorial.html    12 章教學目錄
ch1_*.html ...   12 章教學內容
sales.html       銷售與方案說明（自包含）
prompts.html     45 條操作提示詞（自包含）
skills.html      AI Agent Skill 手冊（自包含）
chapters.json    教學順序、導覽與 SEO 的單一來源
assets/          教學站共用樣式、程式與圖片
scripts/         導覽產生及連結檢查工具
```

網站的 canonical 基底網址是 `https://nginx-guide.woowtech.io/`。部署時須讓網域根目錄對應儲存庫根目錄，並保留相對連結結構。

## 本地預覽與驗證

不需要建置框架；可直接用瀏覽器開啟 HTML，或啟動本機靜態伺服器：

```bash
python3 -m http.server 8000
# 瀏覽 http://localhost:8000/
```

提交前執行專案內建檢查：

```bash
node scripts/build_nav.js --check
node scripts/check_links.js
```

`build_nav.js --check` 確認 12 章教學的產生內容沒有漂移；`check_links.js` 會檢查站內檔案、錨點、重複 ID，以及每個有 `id` 的 `<section>` 是否同時有 `data-nav`。若你有意修改 `chapters.json` 或教學頁面，先閱讀腳本說明，再執行寫入模式；四卡首頁與三本單檔手冊應維持人工編輯。

也可用下列命令做基本完整性檢查：

```bash
for f in index.html sales.html prompts.html skills.html; do
  grep -qi '</html>' "$f" || exit 1
done

grep -REni '不應再出現的舊產品關鍵字' index.html sales.html prompts.html skills.html README.md
```

最後一行的字串只是範例，請替換成你這次遷移要排除的實際關鍵字；沒有輸出才代表通過。

## 授權與商標

本站文字與自製內容以 [Creative Commons Attribution 4.0 International（CC BY 4.0）](https://creativecommons.org/licenses/by/4.0/deed.zh-hant) 授權。你可以分享與改作，但必須保留適當出處；完整條款以 [`LICENSE`](LICENSE) 為準。

Nginx Proxy Manager 為其權利人的商標。本網站是 WoowTech 製作的獨立社群教學，與 Nginx Proxy Manager 專案官方無隸屬關係。第三方產品、介面與截圖的權利仍屬各自權利人。

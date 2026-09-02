#!/usr/bin/env node
/**
 * check_site_rules.js — 本站專屬房規（kit 的 check_links.js 沒有的部分）。
 *
 *   node scripts/check_site_rules.js              # 檢查 zh-TW（repo 根目錄）
 *   SITE_ROOT=en node scripts/check_site_rules.js # 檢查 en/
 *
 * 規則來源：本站原本的 scripts/check_links.js（i18n kit 進駐前的版本）。
 *   1. 內容頁必須有 <div class="layout"> 包住 sidebar 與 content（桌面版排版會失效）
 *   2. 內容頁的常見問題至少 4 則（kit 版只檢查 3 則）
 *   3. chapters.json 的 ogImage 若是 repo 內相對路徑，檔案必須存在
 *
 * 有任何錯誤就 exit 1。
 */

'use strict';

const fs = require('fs');
const path = require('path');

const i18n = require('./lib/i18n');
const { repoRoot: REPO_ROOT, root: ROOT, subdir: SUBDIR } = i18n.resolveRoot();
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'chapters.json'), 'utf8'));

const CATALOG = (cfg.hub && cfg.hub.catalog) || 'index.html';
const HUB_PAGES = (cfg.hub && cfg.hub.pages) || [];
const NON_CONTENT = new Set(['index.html', '404.html', CATALOG, ...HUB_PAGES]);

const errors = [];
const htmlFiles = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html')).sort();

// 1 & 2. 內容頁房規：.layout 包住 sidebar/content；FAQ 至少 4 則
for (const file of htmlFiles) {
  if (NON_CONTENT.has(file)) continue;
  const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
  if (!/<div class="layout">[\s\S]*<aside class="sidebar">[\s\S]*<main class="content">/.test(html)) {
    errors.push(`${file}: 缺少 .layout 包住 sidebar 與 content（桌面版排版會失效）`);
  }
  const faq = (html.match(/<details class="faq">/g) || []).length;
  if (faq < 4) errors.push(`${file}: 常見問題只有 ${faq} 則，房規要求至少 4 則`);
}

// 3. 社群預覽圖是 repo 內相對路徑時，也必須存在（其他語系的 root 共用根目錄的 assets/）。
if (cfg.site.ogImage && !/^(https?:|data:|\/\/)/.test(cfg.site.ogImage)) {
  const candidates = [path.join(ROOT, cfg.site.ogImage), path.join(REPO_ROOT, cfg.site.ogImage)];
  if (!candidates.some((p) => fs.existsSync(p))) {
    errors.push(`chapters.json 的 ogImage 不存在 → ${cfg.site.ogImage}`);
  }
}

if (errors.length) {
  console.error(`\n✗ 發現 ${errors.length} 個問題：`);
  errors.forEach((e) => console.error('  · ' + (SUBDIR ? SUBDIR + '/' : '') + e));
  process.exit(1);
}

console.log(`✓ ${SUBDIR ? SUBDIR + '/ ' : ''}${htmlFiles.length} 個頁面符合本站房規（.layout、FAQ ≥ 4、ogImage 存在）`);

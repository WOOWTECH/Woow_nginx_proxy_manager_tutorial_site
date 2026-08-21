# Nginx Proxy Manager Tutorial Hub Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use subagent-driven-development to implement this plan task-by-task.

**Goal:** Build and publish a 12-chapter Traditional-Chinese Nginx Proxy Manager tutorial and four-card WoowTech resource hub at `nginx-guide.woowtech.io`.

**Architecture:** Fork the proven Headscale tutorial hub and replace product content while retaining generator, validator, shared brand CSS, CI and Pages structure. `chapters.json` remains the source of truth; chapter HTML contains only authored content blocks. GitHub Pages serves static files and Cloudflare provides a proxied CNAME.

**Tech Stack:** Static HTML/CSS/JS, Node.js validation scripts, GitHub Pages, Cloudflare DNS, parallel author/reviewer subagents.

---

### Task 1: Scaffold and metadata

**Files:** Copy infrastructure from `Woow_headscale_tutorial_site`; create/modify `chapters.json`, `STYLE.md`, `CNAME`, `robots.txt`, `README.md`, `docs/plans/*`.

1. Copy template infrastructure without Headscale chapter content or git history.
2. Define 12 NPM chapters and hub metadata in `chapters.json`.
3. Set canonical base URL to `https://nginx-guide.woowtech.io` and repo URL.
4. Run `node scripts/build_nav.js` after chapter files exist.
5. Commit scaffold and plans.

### Task 2: Author chapters 1–12

**Files:** `ch1_intro.html` through `ch12_troubleshooting.html`.

1. Author chapters in four independent lanes: 1–3, 4–6, 7–9, 10–12.
2. Every chapter uses 8–14 sections, id + data-nav, defined data-icon, ≥4 FAQ, troubleshooting, official sources and Taiwan Traditional Chinese.
3. Verify claims against WoowTech add-on README/config and official NPM docs.
4. Review for security traps: default login, port 81 exposure, HTTP-01/DNS-01, Cloudflare Tunnel topology, HA backup behavior.
5. Commit all 12 chapters.

### Task 3: Build the four-card hub

**Files:** `index.html`, `tutorial.html`, `sales.html`, `prompts.html`, `skills.html`, `assets/css/style.css`.

1. Adapt the Headscale hub shell to NPM.
2. Write NPM-specific sales guide covering reverse proxy, certificates, access control and managed deployment.
3. Write 40+ reusable operations/API prompts covering hosts, certificates, users, access lists, redirects, streams, backup and diagnostics.
4. Write the NPM AI Agent Skill handbook with safe automation and credential handling.
5. Verify no Headscale/Nextcloud/Cloudflare product-copy residue remains.
6. Commit handbooks and hub.

### Task 4: Generate and validate

**Files:** Generated heads/sidebar/pagers/footer, `tutorial.html`, `sitemap.xml`.

1. Run `node scripts/build_nav.js`.
2. Run `node scripts/build_nav.js --check`; expect exit 0.
3. Run `node scripts/check_links.js`; expect all 18 pages valid.
4. Search for stale product names, incorrect domains and missing icons.
5. Run responsive source/browser checks where possible.
6. Commit generated output and fixes.

### Task 5: Publish and connect Cloudflare

**Files:** Git repository metadata and `CNAME`.

1. Create public repo `WOOWTECH/Woow_nginx_proxy_manager_tutorial_site`.
2. Push `main` and enable GitHub Pages from root.
3. Explain DNS mutation and obtain/confirm approval.
4. Create Cloudflare proxied CNAME `nginx-guide.woowtech.io` → `woowtech.github.io`, TTL Auto; do not replace a conflicting record without confirmation.
5. Verify HTTPS 200 for hub, tutorial, three handbooks and representative chapters.
6. Report repository, live URL, validation output and screenshot limitation.

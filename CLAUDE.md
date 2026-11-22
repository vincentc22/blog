# 文昇筆記 Wensheng's Notes — 維護說明

Bilingual (Traditional Chinese + English) personal blog, built with Astro 5, deployed on Cloudflare Pages from `main`.
Theme: turning 50 — life (生活), thoughts (想法), reflections (省思). Reply to the owner in Traditional Chinese.

## 新增文章 / Adding a post
Create `src/content/posts/<english-slug>.md`:

```md
---
title: 中文標題
titleEn: English Title
date: YYYY-MM-DD
category: 生活 | 想法 | 省思
excerpt: 一句中文摘要
excerptEn: One-line English summary
draft: false
---

中文段落。

English paragraph that pairs with the Chinese one above.

## 中文小標 | English subheading

> 中文引言
>
> English quote
```

Rules:
- Every Chinese paragraph is immediately followed by its English paragraph. `src/plugins/rehype-bilingual.mjs` marks paragraphs with no CJK characters as English and pairs them.
- Headings use `中文 | English`.
- Keep the owner's voice; English is a faithful, natural translation, not a rewrite.
- Run `npm run build` before pushing.

## 日記 / Diary
Short entries at `/diary/`, newest first, all on one page. Create `src/content/diary/YYYY-MM-DD.md` (add `-2` etc. for a second entry the same day):

```md
---
date: YYYY-MM-DD
title: 可選標題        # optional
titleEn: Optional title # optional
photo: /images/diary-YYYY-MM-DD-<name>.jpg  # optional
photoAlt: 中文描述 / English description
---

一兩句中文。

One or two English sentences.
```

Photos: save to `public/images/`, resize to max 1400px, JPEG quality ~82. Crop or blur identifiable bystanders (especially children) before publishing.

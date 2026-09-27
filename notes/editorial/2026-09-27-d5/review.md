# 审稿记录 — D5 一笔 120 美元的拒付，最后花掉多少？

记录人：本次运行（写作轮 + 独立审核轮，同一会话内按白班口径独立读取）。时间：2026-09-27T10:0x +08:00。

## 硬门槛（scripts/content-substance-check.mjs）

```
node /Users/jared/blog/scripts/content-substance-check.mjs content/posts/why-a-120-dollar-chargeback-costs-more.md
→ 一手外链 7/6  官方来源 7/1  具体事实 13/5  带数字表格 1/1
→ 内容实质门槛通过
EXIT=0
```

- 一手外链 7 条，全部为官方来源（Stripe 官方文档 4 页 + Stripe 定价页 1 页 + Visa 官方 PDF 2 份）。
- 具体事实 13 条（HK$85.00 接收费与应答费、HK$170.00 Mastercard 争议前查检、500 美元合规争议网络费、30% Smart Disputes、TC05/TC15/TC40、≥50bps/≥70bps/≥220bps/≥150bps、1,500/150、USD 75,000、2026-04-01、默认 15/10 美元等）。
- 带数字表格 1 张（三分支合成算例表，9 个数字单元格）。
- 违禁写法 0 命中（kicker、自省式收尾、固定免责段、编号小标题、分类式标题、`**注意**`）。

## 语言闸

```
node .../office-humanizer/scripts/analyze.mjs notes/editorial/2026-09-27-d5/blog.md --profile general --format json
→ totalHits 0，exit 0
node .../kill-ai-slop/scripts/scan.mjs content/posts
→ scanned 14 files, No slop signals found, exit 0
```

扫描 0 命中只排除词表层面的问题，不等于内容合格；内容层由下方独立读取判定。

## 独立读取（不沿用写作轮自评）

**逐条重取引用 URL。** 9 条全部实际请求一次，全部 HTTP 200：

| URL | 状态 | 类型/大小 |
|---|---|---|
| corporate.visa.com/.../visa-acquirer-monitoring-program-fact-sheet-2025.pdf | 200 | application/pdf, 59,428 B |
| usa.visa.com/.../merchants-dispute-management-guidelines.pdf | 200 | application/pdf, 1,460,130 B |
| docs.stripe.com/disputes | 200 | text/html, 428,957 B |
| docs.stripe.com/disputes/how-disputes-work | 200 | text/html, 530,508 B |
| docs.stripe.com/disputes/responding | 200 | text/html, 526,928 B |
| docs.stripe.com/refunds | 200 | text/html, 597,525 B |
| stripe.com/pricing | 200 | text/html, 856,518 B |
| sequre.paymond.me/methodology/chargeback-cost/ | 200 | text/html, 7,349 B |
| wiki.sequre.paymond.me/chargebacks/fees-and-costs/ | 200 | text/html, 40,674 B |
| sequre.paymond.me/chargeback-cost-calculator/ | 200 | text/html, 9,354 B |

**机构与条款定位复核。** 两份 Visa PDF 用 pypdf 重新提取全文后逐项比对：VAMP 事实表确认 VAMP Ratio = TC40 + TC15 ÷ TC05、限卡不在场 VisaNet、组合阈值 ≥50bps/≥70bps、商户侧 ≥220bps（AP/加拿大/EU/美国/LAC）与 ≥150bps（CEMEA）、月计数 ≥1,500 与 ≥150 且金额 ≥ USD 75,000、四方自 2026-04-01 下调至 ≥150bps、巴西/智利/印度待公告——**全部命中，无一条被改写或外推**。争议指南确认"内部成本"与"按月监控并通知收单机构"两处表述，本文未给该指南安上任何费用金额。Stripe 定价页确认 HK$85.00 / HK$85.00 / HK$170.00 / 30% 四项列示；争议与退款文档确认"立即冲销并拉走网络争议费"与"受理费不随退款返还"。

**回不到的数值一律删除。** 本轮无因不可达而删除的数值。唯一二手环节是 Visa 合规争议的 500 美元（来自 Stripe 文档而非 Visa 原文），正文已就近标注来源为 Stripe 文档，并在 sources.md 记为已知缺口。

**标题承诺与正文条目核对。** 标题问"一笔 120 美元的拒付最后花掉多少"，正文给出 135 / 25 / 145 三个具体结果并说明三个分支的差异来源，无未兑现条目。备选标题中的数字（−135、−25、−145）与表内数字一致。

**内部材料边界检查。** 正文、wechat.html、wechat.txt 三份对"自动化夜班 / 审核流程 / 内部流水线 / 内部系统日志与计数 / KB 标识 / 客户信息"逐词扫描：0 命中。公众号包另测 script 0、外部 CSS 0、table 0、class 属性 0、外链图片 0、iframe 0、@import 0。

## 白班评分（事实25 / 行动25 / 证据15 / 原创20 / 表达10 / 版式5）

| 维度 | 分值 | 依据 |
|---|---:|---|
| 事实 | 22/25 | VAMP 阈值与费用列项逐条回到一手来源；扣分项为合规争议 500 美元只能经 Stripe 转述，且 Stripe 定价页币种为 HK$ 而非美元 |
| 行动价值 | 24/25 | 三分支成本分解表可直接照算，另列出三项必须替换成自有数字的输入 |
| 证据密度 | 14/15 | 每千字约 3.7 条一手外链、6.8 条具体事实 |
| 原创综合 | 18/20 | "被扣走的钱 / 人工 / 监控阈值风险"三层划分与"只比手续费会低估高拒付率账户"为本文独有判断 |
| 表达 | 9/10 | 短段落、先场景后结论；费用列项段落信息密度偏高 |
| 版式 | 5/5 | 博客 1 张带数字表；公众号版转单列要点并保留 3 个分支数字 |
| **合计** | **92/100** | ≥85 且事实无硬伤 → 通过 |

## 绑定的工件哈希（SHA256）

- 正文 content/posts/why-a-120-dollar-chargeback-costs-more.md：c57f15a3048b08aa560b47c20d4d77b4d79cc37c8b6c1403eaf27d2b7cbbb12e
- notes/editorial/2026-09-27-d5/wechat.html：26e8a7ad3d6ed5ff20e6d55df91c7c3c1e351265eac55065fcf1c9b1476f9d91
- notes/editorial/2026-09-27-d5/wechat.txt：2bb198677771ffccf165e28fff4e2aae6c5dfc490ad309aa7a27f5af0fa3c288
- 判定：**通过，准予发布**（仅本篇正文与对应公众号包）

## 构建与渲染

```
hugo --themesDir /Users/jared/blog/themes --destination <tmp>
→ Pages 41，exit 0（隔离工作树内 themes/paper 子模块为空，指向主仓 theme 目录构建，不修改该目录）
```

渲染结果：`/posts/why-a-120-dollar-chargeback-costs-more/` 存在；h1 与本篇标题一致；`<link rel=canonical href=https://blog.paymond.me/posts/why-a-120-dollar-chargeback-costs-more/>`；`<meta name=robots content="index, follow">`；渲染出 1 张带数字表格；sitemap.xml 含该 URL；站内链接方法与计算器各命中。

## 公众号套版

wechat.html 1512 中文字、wechat.txt 1499 中文字，均在合同区间（1000—1600）。结构与既有 D1–D4 一致：场景开头 → 一句话判断 → 三层拆解 → 可执行清单 → 适用边界 → 一处行动入口。深色仅用于顶部标题区，正文白底深字，全部行内样式，单列、无表格。

390px 视口本轮实际渲染通过（Chrome headless，390×2400 与 390×3600 截图），此前 D1–D4 遗留的"390px 未验证"在本篇已不再成立；D1–D4 的历史记录未改动。

## 仍未主张

- 公众号后台粘贴与手机预览由用户操作，未验证；本轮不代发。
- 未对任何真实账户做过成本核算；15/10 美元为产品默认值而非行业均值。

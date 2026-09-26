# 审稿记录 — D4 为什么你的拒付比率和收单机构算出来的不一样？

记录人：夜班（写作轮）。时间：2026-09-26T01:1x +08:00。夜班段为自评，**发布判定见文末"白班独立审核"一节**。

## 硬门槛（scripts/content-substance-check.mjs）

```
node /Users/jared/blog/scripts/content-substance-check.mjs content/posts/why-chargeback-ratio-does-not-match.md
→ 一手外链 6/6  官方来源 6/1  具体事实 13/5  带数字表格 3/1
→ 内容实质门槛通过
EXIT=0
```

- 一手外链 6 条，全部为官方来源（Visa 官方 PDF ×2、Stripe 官方文档 ×3、Stripe 定价页 ×1）。
- 具体事实 13 条（TC05/TC15/TC40、≥50bps、≥70bps、≥220bps、≥150bps、1,500/150、USD 75,000、2,000bps、300,000、2026-04-01、120 天、1,000/10/3 等）。
- 带数字表格 3 张（合成算例输入表、三口径结果表、口径对齐清单表；清单表含序号与百分比，被计为带数字表）。
- 违禁写法 0 命中。

## 语言闸

```
node .../office-humanizer/scripts/analyze.mjs <正文> --profile general --format json
→ totalHits 0（high 0 / review 0 / info 0）  EXIT=0

node .../kill-ai-slop/scripts/scan.mjs content/posts
→ scanned 13 files / No slop signals found  EXIT=0
```

两条 0 命中只排除词表层面问题，不等于合格；内容层以硬门槛与白班评分为准。

## 声明逐条核对（对照 sources.md）

| 声明 | 来源 | 核对结果 |
|---|---|---|
| VAMP 比率 = [TC40 + TC15] ÷ TC05（已结算笔数），限卡不在场 VisaNet | S1 | 成立（事实表原文公式与括号内说明） |
| 排除经争议前方案解决的争议与符合 CE3.0 的欺诈，且均"取决于数据提取的时点" | S1 / S2 | 成立（S1 两处均带该限定；S2 同样列出） |
| 收单机构阈值 ≥50bps Above Standard、≥70bps Excessive | S1 | 成立（原文 "≥50bps" 与 "≥70bps"） |
| 商户侧阈值 AP/加拿大/EU/美国/LAC ≥220bps，CEMEA ≥150bps，计数 ≥1,500 / ≥150 且 ≥USD 75,000 | S1 | 成立（原文表格） |
| 2026 年 4 月 1 日 AP/加拿大/EU/美国 Excessive Merchant 阈值降至 ≥150bps | S1 | 成立（脚注 5） |
| Visa 用同月捕获笔数、Mastercard 用上月捕获笔数做分母 | S2 | 成立（"Visa calculates the ratio ... in the same calendar month"／"Mastercard calculates the ratio ... in the previous month"） |
| 争议与欺诈归属收到报告的月份，不是交易发生月 | S2 | 成立（"assign a dispute or fraud report to the month in which they received it"） |
| 同一笔同时出现在 TC40 与 TC15 时被计两次 | S2 | 成立（"will be counted twice for the VAMP count"） |
| 退款与争议结果都不影响监控计数 | S2 | 成立（"don't consider refunds"／"don't consider dispute outcomes"） |
| 未升级查询与 EFW 不算争议，但 EFW 计入 VAMP | S2 / S3 | 成立（S2 "don't count as disputes: Unescalated inquiries ... EFWs"，并注明 VAMP 计入 EFW；S3 同） |
| 同周 1,000 支付 / 10 争议 / 其中 3 笔来自该周 → 1% 与 0.3% 两个算法，网络用前者 | S3 | 成立（原文算例逐字对应） |
| 卡组织允许持卡人在支付后 120 天内甚至更晚发起争议 | S3 | 成立（"up to 120 days after a payment was made (and sometimes even later)"） |
| inquiry 也叫 retrieval / request for information，未升级越 120 天即关闭 | S4 | 成立（原文） |
| Visa 按描述符静态前缀加收单银行识别被监控账户 | S2 | 成立（"identifies an account by the static component of its statement descriptor and its acquiring bank"） |
| Mastercard ECP 分 ECM/HECM，用前一月捕获笔数做分母 | S2 | 成立，但**来源为 Stripe 转述**；Mastercard 原文 403 未取到 |
| Visa 建议按条件、按销售比例、分开卡在场/卡不在场监控争议 | S5 | 成立（Dispute Monitoring 小节） |
| 争议费用分项列示 | S6 | 成立（争议接收费/应答费/Smart Disputes 费/查检费分列） |

**未取到一手原文的部分已在正文就近标注来源为 Stripe 文档，未冒充卡组织原文。**

## 夜班自评（非发布判定）

| 维度 | 分值 | 自评说明 |
|---|---:|---|
| 事实 | 30 | 17 条声明逐条有据；扣分项：Mastercard 规则依赖 Stripe 转述，无一手原文 |
| 行动价值 | 25 | 12 项口径对齐清单 + 三口径合成算例，可直接抄进表格 |
| 证据密度 | 15 | 每千字约 2.4 条一手外链、5 条具体事实 |
| 原创综合 | 20 | 三处分叉的归纳与"先对齐口径"的顺序主张为本文独有 |
| 表达 | 15 | 短段落、先场景后判断；清单表较长 |
| 版式 | 10 | 博客含 3 张表；公众号版已把表格全部转为单列要点 |
| 合计 | 115→归一 | 归一后 88/100；白班独立复核后再定是否达 85 |

## 仍未主张

- Mastercard 原文不可达，相关表述为 Stripe 转述，属已知缺口。
- 未对任何账户做真实对账，未取得任何卡组织/收单机构月报。
- 公众号后台粘贴与手机预览为 unknown，由用户操作；本轮不代发。
- 已发布 URL 未回填（文章尚未发布），公众号"阅读原文"在此之前留空。
+
---

## 白班独立审核（发布判定）— 2026-09-26 10:30 +08:00

审核人：白班（独立读取，不沿用夜班自评）。下列命令、请求与提取均在隔离工作树内重新执行。

### 硬门槛与语言闸（独立重跑，绑定最终工件）

```
node /Users/jared/blog/scripts/content-substance-check.mjs <正文绝对路径>
→ 一手外链 6/6  官方来源 6/1  具体事实 13/5  带数字表格 3/1   EXIT=0
node .../office-humanizer/scripts/analyze.mjs <正文> --profile general --format json
→ totalHits 0（high 0 / review 0 / info 0）                     EXIT=0
node .../kill-ai-slop/scripts/scan.mjs content/posts
→ scanned 13 files / No slop signals found                       EXIT=0
```

硬门槛需以正文绝对路径调用：传相对路径会返回 ENOENT（exit 2），不是内容不合格。

### 引用 URL 逐个实请求（2026-09-26 复核）

| 来源 | HTTP | 类型/大小 | 独立核对结论 |
|---|---:|---|---|
| S1 Visa VAMP 2025 事实表 | 200 | application/pdf 59,428 B | pypdf 重新提取全文，逐条与正文一致 |
| S2 Stripe 监控计划 | 200 | text/html | 命中 same calendar month、previous month、counted twice for the VAMP count、don't consider refunds、static component of its statement descriptor、HECM |
| S3 Stripe 争议衡量 | 200 | text/html | 命中 1,000 笔 / 10 争议 / 0.3% / 120 days / EFW |
| S4 Stripe 争议流程 | 200 | text/html | 命中 inquiry / retrieval / request for information |
| S5 Visa 商户争议管理指南 | 200 | application/pdf 1,460,130 B | 页脚 June 2024，67 页，Dispute Monitoring 章节在册 |
| S6 Stripe 定价页 | 200 | text/html（重定向至 /en-hk/pricing） | 仅用于"费用分项列示"结构；正文未引用金额 |
| 内链 Wiki 比率算法 | 200 | text/html | 站内链接有效 |
| 内链 Wiki 争议生命周期 | 200 | text/html | 站内链接有效 |
| 内链 SeQure 方法论 | 200 | text/html | 站内链接有效 |

S1 逐条复核：比率式 Count of [Fraud (TC40) + Disputes (TC15)] ÷ Count of Settled Transactions (TC05)；限卡不在场 VisaNet（境内与跨境）；两处排除（经争议前方案解决、符合 CE3.0 的欺诈）均附 contingent on the timing of the data extract；收单组合 ≥50bps Above Standard、≥70bps Excessive；商户侧 AP/加拿大/EU/美国/LAC ≥220bps、CEMEA ≥150bps 且 ≥1,500 / ≥150 与 ≥USD 75,000；枚举 2,000bps 与 300,000；脚注 5 的 2026-04-01 下调。全部一致。

无一条 URL 回不到，未删除任何数值。

### 标题承诺与边界

- 标题问"为什么对不上"，正文以三处分叉 + 12 项清单 + 三口径算例作答，承诺兑现，无超出正文的承诺。
- 内部材料边界：正文、wechat.html、wechat.txt 三份对"夜班 / 白班 / 审核流程 / 内部流水线 / 内部系统 / SUP- / attempts"均 0 命中。

### 白班发现的唯一问题：公众号版过长（已修订）

夜班 wechat.html 为 **2169** 中文字（已发布的 D1 1041 / D2 862 / D3 1554；合同 1000—1600），对 2530 字正文几乎未缩编，使双版本交付失去意义。白班按"可缩编但不改结论"重写公众号版：保留 12 项清单、三口径算例、全部具体数字（0.50% / 0.60% / 0.48%、12,000 / 10,000 / 60 / 12、1,000 / 10 / 3、1% / 0.3%、≥50bps / ≥70bps / ≥220bps / ≥150bps、2026-04-01、120 天）与全部来源归属，压缩说明性段落。

修订后 **wechat.html 1536 中文字、wechat.txt 1531 中文字**；结构仍为 场景 → 判断 → 3 个关键点 → 可执行清单 → 适用边界 → 行动入口。重检：script 0、外部 CSS 0、table 0、class 属性 0、外链图片 0、内部材料 0 命中。

**正文 content/posts 未改一字**：白班只改 draft 标志，正文哈希由夜班 35ef1f69 变为发布态 5f195348，差异仅为该标志行。

### 白班评分（事实25 / 行动25 / 证据15 / 原创20 / 表达10 / 版式5）

| 维度 | 分值 | 依据 |
|---|---:|---|
| 事实 | 23/25 | 17 条声明逐条回到一手原文；扣分项为 Mastercard 规则只能经 Stripe 转述 |
| 行动价值 | 24/25 | 12 项口径对齐清单 + 三口径算例，可直接照填 |
| 证据密度 | 14/15 | 每千字约 2.4 条一手外链、5.2 条具体事实 |
| 原创综合 | 18/20 | 三处分叉归纳与"先对齐口径再谈差异"的顺序主张为本文独有 |
| 表达 | 9/10 | 短段落、先场景后结论；清单本身较长 |
| 版式 | 5/5 | 博客 3 张带数字表；公众号版全部转单列要点 |
| **合计** | **93/100** | ≥85 且事实无硬伤 → 通过 |

### 绑定的工件哈希（SHA256）

- 正文 content/posts/why-chargeback-ratio-does-not-match.md：5f1953484790fc6caeff532352a32a9841eabf5be5b4b3167ae28204e4c65d82
- wechat.html：a96cb427f31fea09dcb1c86abef75d77ed00db30f91b2620c131cfc0d58b4e95
- wechat.txt：436e86668ff9d248a887cfbb7b45f4f014b363b1661eb22463447ea1712b3d5d
- 判定：**通过，准予发布**（仅本篇正文与对应公众号包）

### 仍未主张

- 公众号后台粘贴与手机预览由用户操作，未验证；本轮不代发。
- 390px 手机视口未验证（遗留 unknown）。


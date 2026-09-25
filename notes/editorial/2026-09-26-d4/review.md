# 审稿记录 — D4 为什么你的拒付比率和收单机构算出来的不一样？

记录人：夜班（写作轮）。时间：2026-09-26T01:1x +08:00。**本轮为夜班自评，独立评分与通过判定由白班负责，此文件不是发布批准。**

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
- 390px 手机视口仍未验证（遗留 unknown）。


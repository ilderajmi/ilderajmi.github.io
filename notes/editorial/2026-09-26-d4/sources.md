# 来源台账 — D4 为什么你的拒付比率和收单机构算出来的不一样？

核对日期：2026-09-26（北京时间）。抓取时间：2026-09-26T01:00:00+08:00。

| # | URL | 机构 | 文档日期 | 抓取结果 | 本文用它支持什么 | 适用范围与限制 |
|---|---|---|---|---|---|---|
| S1 | https://corporate.visa.com/content/dam/VCOM/corporate/visa-perspectives/security-and-trust/documents/visa-acquirer-monitoring-program-fact-sheet-2025.pdf | Visa（官方 fact sheet，PDF） | 文档内写明更新后的阈值自 2025 年 6 月 1 日生效，咨询期至 2025 年 9 月 30 日 | HTTP 200，application/pdf，59428 bytes，1 页，pypdf 6.5.0 提取全文 | VAMP 比率定义：分子为 Fraud (TC40) + Disputes (TC15) 笔数，分母为 Count of Settled Transactions (TC05)，限卡不在场 VisaNet 交易（境内与跨境）；排除两项（经争议前方案解决的争议、符合 CE3.0 的欺诈），两项均注明"取决于数据提取的时点"；收单机构组合阈值 Above Standard ≥50bps、Excessive ≥70bps；商户侧 Excessive 阈值 AP/加拿大/EU/美国/LAC ≥220bps、CEMEA ≥150bps，月计数分别 ≥1,500 与 ≥150 且金额 ≥ USD 75,000；AP/加拿大/EU/美国自 2026 年 4 月 1 日起 Excessive Merchant 阈值下调至 ≥150bps；枚举监控阈值 2,000bps 与 300,000 笔 | 只描述 Visa 的 VAMP；巴西、智利、印度另行公告；阈值随版本变化，不能推广为其他卡组织的规则 |
| S2 | https://docs.stripe.com/disputes/monitoring-programs | Stripe（官方文档） | 页面未标注发布日期；抓取时为在线版本 | HTTP 200，586650 bytes | Visa 与 Mastercard 同样按月统计，但分母归属月不同：Visa 用同月捕获笔数，Mastercard 用上月捕获笔数；两网络均把争议/欺诈归属收到报告的月份而非交易发生月份；VAMP 排除经争议前产品与 CE3.0 的条目；同一笔可能同时出现在 TC40 与 TC15 而被计两次；退款与争议结果都不影响计数；未升级查询与 EFW 不计为争议，但 EFW 计入 VAMP；Mastercard ECP 分 ECM/HECM 两级与月费时间线；Visa 按描述符静态前缀加收单银行识别账户；VAMP 阈值表（计数 1,500 / 1,500，比率 0.5% / 1.5%，CEMEA 2.2%） | Stripe 明确声明该页是面向 Stripe 用户的一般指南，不是卡组织监控计划的完整参考；卡组织规则以网络原文为准 |
| S3 | https://docs.stripe.com/disputes/measuring | Stripe（官方文档） | 页面未标注发布日期；抓取时为在线版本 | HTTP 200，459461 bytes | 同一周同一批支付的两个算法：dispute activity（10 争议 ÷ 1,000 支付 = 1%）与 dispute rate（3 ÷ 1,000 = 0.3%）；卡网络监控计划使用 dispute activity；争议可在支付后 120 天内甚至更晚发起；EFW 指 Visa、Mastercard、JCB 发卡行的欺诈预警，Visa 将 EFW 计入 VAMP 识别 | 数值与两个算法的归属是 Stripe 的口径说明；不构成对任何账户的判定 |
| S4 | https://docs.stripe.com/disputes/how-disputes-work | Stripe（官方文档） | 页面未标注发布日期；抓取时为在线版本 | HTTP 200，530353 bytes | 争议流程与预争议阶段；inquiry 也叫 retrieval 或 request for information，未升级的查询不等于正式争议；inquiry 停留 120 天未升级即关闭 | 描述 Stripe 与网络的一般流程；具体时限以网络规则与自己收单机构为准 |
| S5 | https://usa.visa.com/content/dam/VCOM/global/support-legal/documents/merchants-dispute-management-guidelines.pdf | Visa（官方指南，PDF） | 页脚标注 "Dispute Management Guidelines for Visa Merchants \| June 2024" | HTTP 200，application/pdf，1460130 bytes，67 页 | 争议监控建议：按交易条件、按销售活动比例追踪争议，并把卡在场/卡不在场、MOTO/互联网分开监控；Visa 按月监控并向收单机构通知争议过多的商户 | 面向 Visa 商户的指南；文中不含可直接套用的通用比率阈值 |
| S6 | https://stripe.com/pricing | Stripe（官方定价页） | 页面未标注发布日期；抓取时为在线版本，显示为香港币种价格 | HTTP 200，856488 bytes | 争议相关费用的公开列出方式：争议接收费、人工应答费、Smart Disputes 费与争议前查检费分项列示 | 显示币种为 HK\$，地区与账户类型会影响实际费用；本文不引用其金额，只引用"费用分项列示"这一结构 |

## 未采用的来源

- **Mastercard 官方页面全部返回 403**：本轮对 mastercard.com、mastercard.us、developer.mastercard.com 的争议/拒付说明页与 PDF 路径逐一请求，均返回 403（含更换 User-Agent 后）。因此本文所有关于 Mastercard 的陈述都改由 S2（Stripe 官方文档）转述，并在正文中明确标注来源为 Stripe 文档，不冒充 Mastercard 原文。
- 未采用任何第三方博客、二手转述、热点榜单或论坛内容作为证据。
- 未使用内部 KB 或任何内部运行记录。

## 声明与证据的区分

- **事实陈述（S1–S6）**：可打开的公开文档中可直接核对的定义、阈值与流程，逐条对应上表"本文用它支持什么"。
- **独立判断**：把差异归纳为分母、数据归属月、分子资格三处，以及"先对齐口径再谈差异""同一份数据在不同提取时点本来就可以不同"的顺序主张，是本文作者的归纳，不是任何机构的表述。
- **合成算例**：三处比率（0.50% / 0.60% / 0.48%）与 12,000／10,000／60／12 四个输入值均为演示算术构造，文中已标注为合成，不对应任何真实商户，也不是费率报价。
- **未主张**：未对任何账户做过真实对账，未取得任何卡组织或收单机构月报；公众号后台粘贴与手机预览为 unknown。

## 已知缺口

- Mastercard 原文不可达（403），其规则表述依赖 Stripe 转述，属未经一手核对的二手环节。
- S2、S3、S4、S6 均无固定发布日期，时效以 2026-09-26 抓取时点为准。
- Visa 事实表提到的巴西、智利、印度计划尚未公布，本文不含这三地的阈值。


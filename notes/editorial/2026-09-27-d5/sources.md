# 来源台账 — D5 一笔 120 美元的拒付，最后花掉多少？

核对日期：2026-09-27（北京时间）。抓取时间：2026-09-27T09:55–10:05+08:00。

| # | URL | 机构 | 文档日期 | 抓取结果 | 本文用它支持什么 | 适用范围与限制 |
|---|---|---|---|---|---|---|
| S1 | https://docs.stripe.com/disputes | Stripe（官方文档） | 页面未标注发布日期；抓取时为在线版本 | HTTP 200，text/html，428,958 bytes | 争议成立时收单机构立即冲销支付，并拉走这笔钱以及一笔或多笔网络争议费；随后从商户余额扣掉争议金额与争议费。第一笔支出是两项（金额 + 费） | Stripe 面向自身用户的说明；具体网络费用以收单机构账单为准 |
| S2 | https://docs.stripe.com/disputes/how-disputes-work | Stripe（官方文档） | 页面未标注发布日期；抓取时为在线版本 | HTTP 200，text/html，530,664 bytes | 争议流程：通知、从账户扣掉争议金额加争议费、提供账户所有者主张、引导提交证据 | 描述 Stripe 与网络的一般流程 |
| S3 | https://docs.stripe.com/disputes/responding | Stripe（官方文档） | 页面未标注发布日期；抓取时为在线版本 | HTTP 200，text/html，526,928 bytes | Visa 合规争议：卡组织收费用裁定；申诉时在常规争议费之外另收 500 美元（或当地等值），赢了退回；inquiry 升级为 chargeback 需另交一次应答 | 金额为 Stripe 转述的网络成本，非 Visa 原文；真实成本以收单机构通知为准 |
| S4 | https://docs.stripe.com/refunds | Stripe（官方文档） | 页面未标注发布日期；抓取时为在线版本 | HTTP 200，text/html | 原交易的受理费不随退款返还；退款使用可用余额 | 说明受理费与退款的关系，不构成费率报价 |
| S5 | https://stripe.com/pricing | Stripe（官方定价页） | 页面未标注发布日期；抓取时为在线版本，显示为香港币种价格 | HTTP 200，text/html，856,518 bytes | 争议相关费用的列项结构：争议接收费 HK$85.00；手动应答费 HK$85.00（赢了退回、输了不退）；争议前查检 Visa 解决方案与 CE3.0 拦截各 HK$85.00、Mastercard 解决方案 HK$170.00；Smart Disputes 按赢下的争议金额 30% 计，输的不收、接收费照收；少见情形另有网络费 | 币种为 HK$，地区与账户类型会影响实际费用；本文只引用其列项结构与相对关系，不与美元默认值混算 |
| S6 | https://corporate.visa.com/content/dam/VCOM/corporate/visa-perspectives/security-and-trust/documents/visa-acquirer-monitoring-program-fact-sheet-2025.pdf | Visa（官方 fact sheet，PDF） | 阈值更新自 2025 年 6 月 1 日生效，咨询期至 2025 年 9 月 30 日 | HTTP 200，application/pdf，59,428 bytes，1 页，pypdf 提取全文 | VAMP 比率定义（TC40 + TC15 ÷ TC05，卡不在场 VisaNet，境内外皆含）；收单组合 ≥50bps Above Standard、≥70bps Excessive；商户侧 Excessive 阈值 AP/加拿大/EU/美国/LAC ≥220bps、CEMEA ≥150bps，月计数 ≥1,500 与 ≥150 且金额 ≥ USD 75,000；AP/加拿大/EU/美国自 2026 年 4 月 1 日起下调至 ≥150bps；巴西、智利、印度另行公告 | 只描述 Visa 的 VAMP；阈值随版本变化，不能推广为其他卡组织规则 |
| S7 | https://usa.visa.com/content/dam/VCOM/global/support-legal/documents/merchants-dispute-management-guidelines.pdf | Visa（官方指南，PDF） | 页脚标注 "Dispute Management Guidelines for Visa Merchants \| June 2024" | HTTP 200，application/pdf，1,460,130 bytes，67 页，pypdf 提取全文 | 争议章节开头写明商户可能同时损失争议金额与相关商品，并承担处理一次争议应答的内部成本；Visa 按月监控全部商户争议活动，商户争议过多时通知收单机构，收单机构被期望采取措施降低争议活动，具体补救取决于争议条件、行业、经营方式、欺诈控制与经营环境 | 面向 Visa 商户的指南；不含可直接套用的通用比率阈值或费用金额 |

## 未采用的来源

- **Mastercard 官方页面前往不可达**：本轮未再尝试 mastercard.com 系列页面；D5 正文没有需要 Mastercard 原文支撑的陈述，引用的 Mastercard 内容仅为 S5 定价页上列示的争议前查检价格（HK$170.00）一项，并已标为定价页列示。
- 未采用任何第三方博客、二手转述、热点榜单或论坛内容作为证据。
- 未使用内部 KB 或任何内部运行记录。

## 声明与证据的区分

- **事实陈述（S1–S7）**：可打开的公开文档中可直接核对的定义、费用列项、阈值与生效日期，逐条对应上表"本文用它支持什么"。
- **独立判断**：把拒付成本拆成"被扣走的钱 / 处理它的人工 / 监控阈值与账户风险"三层，以及"只比手续费会系统性低估高拒付率账户"这一结论，是本文作者的归纳，不是任何机构的表述。三层划分也决定了替换默认值时该替换哪三项。
- **合成算例**：120 美元争议金额与三分支结果（−135 / −25 / −145 美元）为演示算术构造，费用与人工沿用主站方法页的公开默认值 15 与 10 美元，不对应任何真实商户，也不是费率报价。
- **未主张**：未对任何账户做过真实成本核算，未取得任何收单机构账单或监控通知；公众号后台粘贴与手机预览为 unknown。

## 已知缺口

- S1、S2、S3、S4、S5 均无固定发布日期，时效以 2026-09-27 抓取时点为准。
- Visa 合规争议的 500 美元为 S3（Stripe 文档）转述的网络成本，未回到 Visa 原文核对，正文已就近标注来源为 Stripe 文档。
- 主站方法页的 15 美元费用与 10 美元人工是产品默认值，不是采集到的行业均值，本文只作为可替换的公开默认值使用。

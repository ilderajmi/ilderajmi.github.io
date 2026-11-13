+++
title = '拒付金额和订单对不上，财务先对齐哪三列'
description = '拒付金额与订单金额不同，不足以说明银行算错或客户少收了退款。先按交易币种、账单币种和收单结算币种核对记录，再拆分部分争议、部分退款、汇率换算与费用，并查看 Visa 规则版本边界。'
date = '2026-11-10T00:45:00+08:00'
draft = false
pageLang = 'zh-CN'
slug = 'dispute-amount-reconciliation'
tags = ['拒付与争议', '跨境支付']
+++

订单记录是 120 EUR，拒付（争议）通知是 97.20 USD，收单结算单是 96.20 USD。三个数字来自下文的合成示例。它们不相等，不能单独说明银行算错、退款少了，或差额就是汇兑损失。先看每个金额属于哪一层、使用什么币种。

## 先把三列放回同一笔交易

Visa 规则分别以 `Billing Currency`、`Transaction Currency` 和 `Settlement Currency` 标记争议金额、原交易金额和收单机构收到的结算金额。Stripe 的货币说明也区分顾客付款方式币种、交易呈现币种（presentment currency）和收单后结算币种；这是 Stripe 的产品术语，可帮助识别记录层级，不能替代 Visa 或其他收单机构的字段定义。[Visa 公开规则 PDF（当前版编号见文末版本说明）](https://cis.visa.com/content/dam/VCOM/download/about-visa/visa-rules-public.pdf)；[Stripe：支持的币种与呈现、结算](https://docs.stripe.com/currencies)。

| 金额层 | 要核对的币种与金额 | 先找的记录 |
| --- | --- | --- |
| 订单／原交易 | `Transaction Currency`；订单对应的原始交易金额 | 内部订单系统、原始交易或捕获记录 |
| 账单／争议 | `Billing Currency`；争议通知或案卷标示的金额 | 争议通知、发卡行或收单机构案卷 |
| 收单结算 | `Settlement Currency`；收单机构实际收到的金额 | 收单机构结算单、汇兑明细 |

三列要关联到同一笔原交易，再分别记录金额和币种。币种不同本身不是错误，也不能把三列金额直接相减后记成一笔损失。Visa 规则对回应金额使用不同币种形式有明确条件；Stripe 的 API 争议对象也把争议金额及其币种分开记录。[Stripe：Dispute 对象](https://docs.stripe.com/api/disputes/object)。

## 差额先按来源拆开

### 只争议了订单的一部分

争议可能只覆盖原交易的一部分。Visa 2026 年 4 月 18 日版规则指出，部分争议涉及的附加费（surcharge）应按比例分摊。核对本金之外，单独看附加费的金额和分摊记录；不能只凭争议金额小于订单金额，就认定客户接受了其余部分。[Visa 公开规则 PDF（当前版编号见文末版本说明）](https://cis.visa.com/content/dam/VCOM/download/about-visa/visa-rules-public.pdf)。

**判断信号：**争议金额低于原交易金额，且案卷列出了部分争议或附加费。请先确认争议范围和附加费计算依据。

### 退款后仍出现争议

把退款金额、币种、处理时间与争议通知时间放在同一条时间线上，并核实退款关联的是不是这笔原交易。Stripe 说明，支付只退了一部分时，持卡人仍可能对整笔支付提出争议；应答材料需要列明退款金额和日期。Stripe 也允许一笔支付分多次退款，但累计退款不能超过原交易金额。这些是 Stripe 文档说明的行为，具体流程仍要按当前服务商案卷核对。[Stripe：部分退款争议处理建议](https://docs.stripe.com/disputes/best-practices)；[Stripe：退款与取消](https://docs.stripe.com/refunds)。

**判断信号：**退款记录的处理日早于或晚于争议通知日，或者争议金额仍接近退款前的金额。先核对退款与争议的原交易关联、金额和时间，不要按某一条记录的当前状态推断另一条记录。

若还要确认退款记录与争议是否属于同一笔支付，可参照[退款已处理但争议仍在时先核对哪些记录](/posts/refund-still-disputed/)。

### 原交易与争议金额经历了汇率换算

币种换算的时点不同，原交易金额与最终争议金额可能不同。Visa 2026 年 4 月 18 日版规则 11.4.2 将原交易金额与最终争议金额之间的换算差额，交由被分配或接受最终责任的一方承担。Stripe 的争议对象说明也列出汇率波动和部分争议，作为争议金额可能不同于原交易金额的原因。[Visa 公开规则 PDF（当前版编号见文末版本说明）](https://cis.visa.com/content/dam/VCOM/download/about-visa/visa-rules-public.pdf)；[Stripe：Dispute 对象](https://docs.stripe.com/api/disputes/object)。

**判断信号：**原交易、案卷和结算单的币种不同，或记录显示金额在不同时间点换算。向收单机构索取本案采用的换算金额和结算明细，再判断差额归属。

### 费用与争议本金分开看

争议本金与争议费用要分别记录，不要混成一个金额。以 Stripe 为例，其说明将争议金额与争议费用分开扣取；余额交易对象也分别列出交易总额、费用和净影响。其他服务商的字段和扣款方式要按各自账单核对，本文不比较费率。[Stripe：争议如何处理](https://docs.stripe.com/disputes/how-disputes-work)；[Stripe API：Balance Transaction 对象](https://docs.stripe.com/api/balance_transactions/object)。

**判断信号：**对账单总额与争议本金不同，且费用行或余额交易里有单独扣款。先拆出本金、费用和净影响，再查币种转换。

## 抗辩金额先确认案卷使用哪种形式

Visa 2026 年 4 月 18 日版规则 11.4.1 对收单机构的争议回应和预仲裁金额列出三种形式。金额必须对应当前案卷适用的金额基础；这组规则并不保证争议结果。

- 使用原交易币种，金额与原始交易金额相同。
- 使用用于补救争议的部分金额。
- 使用收单机构实际收到的结算币种金额，或以该结算币种给出更正金额。

回应金额要从上述三种形式中选一种填报，而不是把三列数字任取其一。币种不属于案卷要求的金额形式时，金额就无法与对应案卷字段核对；提交前请收单机构确认本案应采用哪一种形式。[Visa 公开规则 PDF（当前版编号见文末版本说明）](https://cis.visa.com/content/dam/VCOM/download/about-visa/visa-rules-public.pdf)。

## USD 25 有明确适用范围

Visa 2026 年 4 月 18 日版的 Table 11-5 对旅行与娱乐（Travel and Entertainment，T&E）争议列出 USD 25（或等值）的最低金额，并带有特定条件和例外。该表脚注还说明，最低金额测试针对交易金额或部分争议金额；巴西境内分期交易不适用这一行。它不是所有交易类型共用的统一门槛。[Visa 公开规则 PDF（当前版编号见文末版本说明）](https://cis.visa.com/content/dam/VCOM/download/about-visa/visa-rules-public.pdf)。

版本要一并核对。Visa 官网当前公开规则 PDF 的封面为 2026 年 10 月 24 日版；新版对争议金额条款的章节与表号有调整，具体编号与适用范围请以当前版 PDF 和收单机构通知为准。上文 T&E 的 USD 25 条件明确来自 2026 年 4 月 18 日版，不能把旧版表格当作现行完整清单。[Visa 规则与最新版入口](https://www.visa.com/en-us/support/visa-rules)。

## 差额出现在哪一列，就先查对应记录

| 差额位置 | 先查哪份记录 | 找谁确认 |
| --- | --- | --- |
| 订单／原交易金额 | 内部订单、原始交易或捕获金额、退款关联 | 内部订单系统负责人 |
| 账单／争议金额 | 争议通知、案卷金额和币种、案件时间线 | 收单机构 |
| 收单结算金额 | 结算单、结算币种、换算明细和独立费用行 | 收单机构或服务商 |
| 本金与费用合计 | 争议本金、费用记录、余额净影响 | 服务商；内部财务复核记账分类 |

先让每项记录指向同一笔交易，再让负责人确认该记录代表什么。服务商账单能说明其系统记录的扣款，收单结算单能说明收单机构收到的金额；两者不能互相代替。

## 合成示例：120 EUR 订单、30 EUR 部分退款、USD 结算

以下金额均为合成数据。假设 30 EUR 退款已处理并且关联到这笔 120 EUR 原交易；订单余额按此假设计算。争议通知和收单结算单中的 USD 金额只是各自记录显示值，不据此推算汇率或费率。

| 记录 | 金额与币种 | 这条记录能说明什么 |
| --- | --- | --- |
| 原订单／交易 | 120 EUR | 原始交易金额 |
| 已处理的部分退款 | 30 EUR | 已退款金额；仍需核实与原交易的关联及处理时间 |
| 扣除该退款后的订单余额 | 90 EUR | 仅在上述合成假设成立时，120 EUR − 30 EUR |
| 争议通知 | 97.20 USD | 案卷显示的争议金额 |
| 收单结算单 | 96.20 USD | 收单机构收到的结算金额 |

本例中的 USD 1.00 差额无法仅凭这张表归因为汇兑损失或费用。需要分别取得案卷换算信息、收单结算明细和费用记录；在记录齐全前，把差额保留为待核实项。

## 两条停止线

币种和记录层级还没确认前，不要把差额记成汇兑损失。争议金额小于订单金额，也不足以说明客户接受了部分订单；Stripe 的官方示例明确说明，已部分退款的支付仍可能收到全额争议，具体规则还会因网络和支付类型而异。

本文只给出核对顺序，不构成会计或税务意见；不提供费率，也不预测争议结果。若要分析按月的拒付比率口径，请另看[拒付比率为何与收单机构对不上](/posts/why-chargeback-ratio-does-not-match/)。

## 参考来源

Visa 规则段落和金额条件在本文中按版本标注。Visa 当前公开 PDF 与 2026 年 4 月 18 日版的编号不同；截至 2026 年 11 月 10 日，官网当前 PDF 显示 2026 年 10 月 24 日版。Stripe 链接仅用于说明 Stripe 文档中的对象与处理方式，不代表所有服务商采用相同字段或流程。以下页面于 2026 年 11 月 10 日核对。

- [Visa：Visa Core Rules and Visa Product and Service Rules（当前公开 PDF）](https://cis.visa.com/content/dam/VCOM/download/about-visa/visa-rules-public.pdf)——当前为 2026 年 10 月 24 日版；对应 2026 年 4 月 18 日版内容的本地归档文本用于核对文中明确标出的旧版段落。
- [Visa：Visa Rules](https://www.visa.com/en-us/support/visa-rules)——Visa 规则最新版入口。
- [Stripe：支持的币种](https://docs.stripe.com/currencies)——付款方式币种、交易呈现币种和结算币种的区分。
- [Stripe：How disputes work](https://docs.stripe.com/disputes/how-disputes-work)——争议金额与费用的处理说明。
- [Stripe：Dispute evidence best practices](https://docs.stripe.com/disputes/best-practices)——部分退款后仍收到全额争议的示例及应答材料建议。
- [Stripe：Refund and cancel payments](https://docs.stripe.com/refunds)——部分退款及退款总额限制。
- [Stripe API：The Dispute object](https://docs.stripe.com/api/disputes/object)——争议金额、币种及金额可能与原交易不同的说明。
- [Stripe API：The Balance Transaction object](https://docs.stripe.com/api/balance_transactions/object)——交易总额、费用和净影响字段。

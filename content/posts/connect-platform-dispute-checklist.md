+++
title = 'Stripe Connect 收到拒付后：先核对什么，再交给谁'
description = '收到 Stripe Connect 拒付后，按顺序核对 charge type、答辩账户上下文、争议金额余额和费用扣款配置，再把未决项交给平台工程、账户运营或财务。'
date = '2026-10-27T00:45:00+08:00'
draft = false
pageLang = 'zh-CN'
slug = 'connect-platform-dispute-checklist'
tags = ['拒付与争议', 'Stripe Connect', '支付运营']
+++

收到一笔 Connect 拒付事件时，先把事件和账户对象对上，再决定由谁处理。平台账户与每个 connected account（连接账户）各自有余额；Stripe 文档描述的扣款账户和答辩入口会随 charge type（扣款类型）而不同。[Stripe：Connect 账户余额](https://docs.stripe.com/connect/account-balances) [Stripe：Connect 拒付处理](https://docs.stripe.com/connect/disputes)

这份清单用于分派核对工作，不判断法律责任，也不预测发卡行裁决。下面的示例全部为合成数据，不代表任何客户、商户或真实交易。

## 先固定事件与对象

从事件通知或内部案件记录抄下争议 ID、相关 payment/charge ID、连接账户 ID、事件时间和当前状态。保留原始 ID，不要只用客户姓名或订单号匹配；如果字段缺失或对象对不上，先交给能查支付对象的工程或支付运营同事，不要根据平台的业务名称猜类型。

Stripe 将 Connect charge 分为 direct charges，以及 indirect charges 下的 destination charges 和 separate charges and transfers。文档里的用途和示例是帮助理解资金路径；同一平台可以使用多种类型，因此不能只凭“SaaS”或“Marketplace”标签推断单笔交易类型。[Stripe：Connect charge types](https://docs.stripe.com/connect/charges#types)

## 按顺序核对并分派

| 顺序 | 先查什么 | 如何记录 | 交给谁或下一步 |
| --- | --- | --- | --- |
| 1 | **Charge type**：direct、destination、separate charges and transfers，还是尚未确认？ | 记录关联 charge/payment 对象、交易配置或内部路由记录中的依据；未找到时写“待核”，不要推断。 | 交平台工程或支付运营核对实际集成与该笔对象。类型未确认前，暂停账户路由判断。 |
| 2 | **答辩账户上下文**：由哪个账户查看并提交该 dispute 的回应？ | Stripe disputes 文档列出：direct 通过 connected account 响应；indirect 通过 platform account 响应。API 操作时核对请求的账户上下文。 | 将案件交给对应账户的争议负责人。平台工程核 API 路径；服务端请求使用 `Stripe-Account` header 指定连接账户，客户端库则传连接账户 ID。不要把 API 上下文当成资金扣款账户。([Stripe：Connect disputes](https://docs.stripe.com/connect/disputes)；[Stripe：Connected account authentication](https://docs.stripe.com/connect/authentication#stripe-account-header)) |
| 3 | **争议金额从哪一余额扣？** | direct：Stripe 先尝试从 connected account balance 扣争议金额；indirect：从 platform balance 扣。把文档规则和该账户实际余额分开记录。 | 交账户运营/财务核对对应账户的余额记录。若 direct 金额无法从连接账户余额扣下，继续核 losses collector（负余额责任承担方）设置，再按该配置升级处理。([Stripe：Connect disputes](https://docs.stripe.com/connect/disputes)；[Stripe：账户余额](https://docs.stripe.com/connect/account-balances)) |
| 4 | **争议费用由哪个账户承担？** | 单独记录 fee payer 与核对依据，不能用争议金额的扣款账户代替。direct 的费用账户取决于连接账户的费用配置；indirect 的费用从 platform account 扣。 | 交账户运营或财务核对对应账户选项及费用配置；配置或 API 字段不清楚时交平台工程确认。([Stripe：Connect disputes](https://docs.stripe.com/connect/disputes)) |
| 5 | **事件交接是否完整？** | 将争议 ID、charge/payment ID、连接账户 ID、类型依据、回应账户上下文、金额扣款账户、费用账户、负责人、观察时间和待核项放在同一条交接记录。 | 由案件负责人确认接收与后续动作；合同解释、平台与商户间追偿或其他法律问题另交相应负责人。 |

API 账户上下文、争议金额扣款账户和费用账户是三个独立字段。核对时分别填，不要把“谁调用 API”直接写成“谁被扣款”，也不要把 Stripe 文档的通常处理路径写成对特定账户配置的确认。Stripe 通用争议说明也将 payment amount 与 dispute fee 分列为余额扣款项目；Connect 上的具体扣款账户仍须按 Connect 账户与集成配置核对。Stripe 的 Connect 说明列出多种账户选项；具体字段会随集成与账户类型变化。[Stripe：Disputes](https://docs.stripe.com/disputes) [Stripe：Connect disputes](https://docs.stripe.com/connect/disputes) [Stripe：Connected account authentication](https://docs.stripe.com/connect/authentication#stripe-account-header)

## 金额无法从连接账户扣下时

对于 direct charge，Stripe 文档说会先尝试从 connected account balance 扣争议金额；如果无法扣到，最终由谁承担取决于 Stripe 或平台哪一方负责负余额。此时不要在工单里直接写成“连接账户最终负责”，也不要假设平台必然会被扣款。先核实际账户的 losses collector 配置，并把配置结果、对象 ID和观察时间交给平台工程与账户运营继续处理。字段的机制说明见 [Connect dispute flow：负余额责任与账户扣款](https://wiki.sequre.paymond.me/chargebacks/connect-dispute-flow/)；Stripe 的字段说明见 [Risk and liability management with Connect](https://docs.stripe.com/connect/risk-management)。

## 合成交接示例

下列记录中的 `txn_example_001`、`acct_example_001` 和金额均为虚构，仅展示怎样把四项核对结果拆开。示例假定内部交易记录已标为 direct charge；这不是从平台业务名称推断出的结果。

| 交接字段 | 合成记录 | 状态/负责人 |
| --- | --- | --- |
| dispute / charge | `dp_example_001` / `txn_example_001` | 事件对象已匹配；支付运营记录 |
| connected account | `acct_example_001` | 合成标识；账户运营核对实际对象 |
| charge type | direct（依据：合成内部路由记录） | 已核；平台工程留存依据 |
| API response context | connected account；服务端请求需带该连接账户的 `Stripe-Account` header | 交连接账户争议负责人；API 路径由平台工程确认 |
| disputed amount | 120 USD；应先核连接账户余额扣款路径 | 实际余额未核；财务核对 |
| dispute fee | 金额与扣款账户均待核连接账户 fee configuration | 账户运营/财务核对 |
| losses collector | 未核 | 若争议金额无法从连接账户扣下，交平台工程核对 |
| case owner / next action | 支付运营值班负责人；确认对象、回应期限与下一处理人 | 负责人姓名、真实期限和账户配置均须从内部记录补齐 |

表中没有填写实际账户配置、响应期限或裁决结果。接手人应回到自家 Dashboard、集成记录和案件通知确认这些事实；本文不判断服务商合同、卡组裁决，也不保证收回款项或免除费用。

## 参考来源

Stripe 官方文档页面未显示发布日期；下列页面于 2026-10-27 通过 Cindy browser 读取或复核。Stripe 对 charge type、API 上下文和账户扣款的说明仅描述其文档范围，不能代替对具体账户和集成的核对。

- [Disputes](https://docs.stripe.com/disputes)：说明争议流程中 payment amount 与 dispute fee 分列扣款。读取：2026-10-27；用于支持正文将争议金额与争议费用分开记录，不用于判断 Connect 上的具体扣款账户。
- [Disputes on Connect platforms](https://docs.stripe.com/connect/disputes)：响应账户、争议金额扣款余额、费用账户及 direct 金额无法扣款时的负余额责任说明。读取：2026-10-27。
- [Understand how charges work in a Connect integration](https://docs.stripe.com/connect/charges#types)：direct、destination、separate charges and transfers 的定义、用途与示例；说明可按业务需要使用多种类型。读取：2026-10-27。
- [Make API calls for connected accounts](https://docs.stripe.com/connect/authentication#stripe-account-header)：服务端 `Stripe-Account` header 与客户端库账户 ID 参数。访问：2026-10-23；本稿复核：2026-10-27。
- [Understanding Connect account balances](https://docs.stripe.com/connect/account-balances)：平台和连接账户分别持有账户余额。访问：2026-10-23。
- [Risk and liability management with Connect](https://docs.stripe.com/connect/risk-management)：负余额责任配置及其核对字段。访问：2026-10-23。
- [Connect dispute flow：账户响应、金额扣款和负余额责任](https://wiki.sequre.paymond.me/chargebacks/connect-dispute-flow/)：用于延伸阅读机制说明。生产页复核记录：2026-10-26；三语页面均返回 HTTP 200。

本文是操作分派清单，不提供法律意见，不判断平台与商户合同责任，也不保证拒付结果。

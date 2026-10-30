+++
title = '选择 Stripe Connect 收款类型前，先看交易关系与资金流'
description = '设计 Stripe Connect 集成时，先核对客户与谁交易、订单涉及几个 connected accounts、何时转账，以及 Stripe fees 从哪个账户扣除。本文比较三种 charge type，并列出决定前的核对项。'
date = '2026-10-29T09:00:00+08:00'
draft = false
pageLang = 'zh-CN'
slug = 'stripe-connect-charge-type-choice'
tags = ['支付集成', 'Stripe Connect']
+++

给 SaaS 或市场平台设计 Connect 集成时，先把订单关系和资金分配写清楚，再比较 charge type。产品被称为 SaaS 或 Marketplace，并不能单独决定该用哪一种。

Connect 将 charge 分为 direct charges 和 indirect charges 两类。Direct charge 在 connected account 上创建；indirect charge 在 platform 上创建，包含 destination charges 与 separate charges and transfers。三种类型的关键差别在于客户与谁交易、资金何时转给哪些 connected accounts，以及 Stripe 从哪个账户扣除 Stripe fees。Stripe 也建议结合平台业务模式和 platform profile 核对，并说明平台可以按业务使用多种 charge types。

本文回答一个问题：平台订单关系与资金分配需求，分别对应哪些 Connect charge type，决定前还要核对什么？本文不替具体平台选型，也不把 Stripe 文档中的示例当作强制条件。

## 先拆业务关系，不从产品标签猜

先画出一笔典型订单中的客户、platform、提供商品或服务的 connected account，以及资金流。标明客户付款时交易对象是谁、费用由谁承担、接收款项的账户何时确定。之后再映射 charge type。

Stripe 文档把 direct charges 定义为直接向 connected account 收取的支付。Indirect charges 则向 platform 收取，再由 platform 将相应资金转给 connected account。Destination charges 和 separate charges and transfers 都属于 indirect charges，但转款方式不同。

这组分类说明的是支付和转账如何经过 Stripe，不足以单独回答你所在地区、账户类型或具体集成是否符合条件。逐笔业务流程和 Stripe 为平台记录的 profile 都要核对。可先阅读 [Stripe Connect charge types](https://docs.stripe.com/connect/charges#types) 中的说明和表格。

## 客户向谁进行交易？

如果客户直接向 connected account 购买，且该账户处理自己的客户付款，direct charge 的业务关系可能与订单相符。Stripe 的文档示例包括独立卖家的电商平台和支持发票付款的 SaaS。它们是示例，不是对所有同类产品的要求。

如果客户向 platform 购买由 connected account 提供的商品或服务，destination charge 所描述的关系可能适用。此方式在 platform 上创建 charge，并立即向一个 connected account 转账。Stripe 文档的示例包括使用独立承包商提供服务的平台，以及连接客户与承包商的服务市场。

如果一笔付款需要分给多个 connected accounts，或付款时还不知道具体接收账户，separate charges and transfers 提供先在 platform 创建 charge、再单独创建一个或多个 transfer 的流程。Stripe 的示例包括一笔购物车购买多家商户商品的电商市场。

这些描述用于对照订单事实。文档中的「works best」或「best suited」示例不表示 Stripe 强制采用条件，也不构成对本平台的推荐。

## 订单涉及几个账户，何时知道转账对象？

把两个时间点分开记录：创建 charge 时是否知道接收款项的 connected account，以及创建 charge 时是否已能转账。对于 destination charge，Stripe 的比较表描述每笔交易涉及一个 connected account，并在创建 charge 时向该账户立即转账。

Separate charges and transfers 可让一笔交易涉及多个 connected accounts。Platform 可以在尚未确定 connected account，或尚未能转出资金时创建 charge，之后再建立 transfers。这里的「之后」描述两项操作彼此分开，不表示任意延迟或地区都受支持。

Direct charge 在 connected account 上创建。Stripe 的比较表以一个 connected account 和一个客户描述每笔交易；实际集成仍须按账户类型、API 版本和所在地核对支持条件。Stripe 还注明，connected account 必须启用 `card_payments` capability 才能使用 direct charges，并不推荐对 legacy v1 Express 和 Custom accounts 使用 direct charges。

API 侧也要核对对象创建在哪个账户。Stripe 的 direct charges 文档说明，`PaymentIntents` 和 `Charges` 对象属于 connected account；要读取这些 direct charge 数据，API 请求需带该账户 ID 的 `Stripe-Account` header。Destination charges 默认使用 platform 的 payment method configurations，文档注明使用 `on_behalf_of` 时例外。具体配置仍需对照当前账户与集成版本。

## Stripe fees 与 statement 归属

先把几个概念分开：Stripe fees 是 Stripe 对支付收取的费用；application fee 是平台可能从交易中收取并转入平台余额的费用；statement 是客户银行或账单上显示的交易信息。它们的收取对象和呈现方式不能合并成一个「扣款方」。

Stripe 的比较表说明，direct charges 可选择由 Stripe 从 connected accounts 或 platform 扣除 Stripe fees；destination charges 与 separate charges and transfers 的 Stripe fees 由 Stripe 从 platform 扣除。Application fee 是另一项平台费用，不能据此推断 Stripe fees 的扣款账户。

Charge type 也会影响 platform 或 connected account 的信息是否出现在客户的银行或账单 statement 上。具体显示方式要按实际集成和 Stripe 的说明核实，不能概括成客户永远只看到某一个名称。

如果将来发生 dispute，charge type 与负余额责任（negative balance responsibility）共同决定由谁回应争议、Stripe 从哪个账户扣除争议金额；dispute-related fees 的扣款账户还需按账户选项核对。请另行核对 [Stripe 关于 Connect disputes 的说明](https://docs.stripe.com/connect/disputes)；本文只提示这一影响，不展开争议责任或资金追回。

## 三种 charge type 的对照表

下表概括 Stripe 比较表中与选型直接相关的字段。账户数量和时间描述来自 Stripe 文档；「客户交易关系」是按该文档转述，不是额外的 Stripe 条件。

| Charge type | 客户交易关系 | Charge 创建位置 | 每笔交易涉及的 connected accounts | 接收方确定与转账时点 | Stripe fees 扣款账户 | 文档示例或边界 |
| --- | --- | --- | --- | --- | --- | --- |
| Direct charges | 客户直接与 connected account 交易 | Connected account | 1 个 | 款项直接进入 connected account 余额，不进 platform 余额；该类型不经 platform 向 connected account 发起 transfer | 可由 Stripe 从 connected account 或 platform 扣除 | 独立卖家平台；支持发票付款的 SaaS 示例 |
| Destination charges | 客户与 platform 交易，商品或服务由 connected account 提供 | Platform | 1 个 | 创建 charge 时立即转给一个 connected account | Platform | 独立承包商服务；承包商服务市场示例 |
| Separate charges and transfers | 客户向 platform 付款，之后按业务创建转账 | Platform | 1 个或多个 | 创建 charge 时可尚未知道接收方，也可尚未能转款；transfer 与 charge 分开创建 | Platform | 单个购物车购买多家商户商品的市场示例；地区支持需核对 |

### 合成案例：只用来演示该问什么

以下是 synthetic 合成示例，不代表真实商户、Stripe 客户或已验证的业务需求，也不推荐任何架构。

假设一个平台的订单可能包含一位服务提供者，也可能把一次付款分给多位提供者。产品团队填写「客户向谁购买」；财务团队填写「平台何时知道每位接收方」和「何时允许转款」；工程团队确认 charge 与 transfer 如何对应。团队再把这些答案逐项与上表、账户设置和平台 profile 对照。

这个例子没有预填任何本地业务事实。若业务答案尚未确定，就把相应字段留空，先找负责该流程的人核实；不能因为案例结构看起来相似，就推断某一种 charge type 一定适用。

## 决定前的核对清单

| 待核对事项 | 本平台事实（填写） | 需要核实的对象或来源 |
| --- | --- | --- |
| 客户在合同、结账与客服流程中向谁购买？ | __________ | 产品、法务与客户流程 |
| 商品或服务由哪个账户提供？ | __________ | 商户协议与订单记录 |
| 一笔付款涉及几个 connected accounts？ | __________ | 订单拆分规则 |
| 创建 charge 时是否已确定接收款项的账户？ | __________ | 下单与履约流程 |
| 创建 charge 时是否已可转账？转账如何触发？ | __________ | 资金分配流程 |
| Stripe fees 与 application fee 分别如何处理？ | __________ | Stripe 账户配置与财务流程 |
| 客户 statement 的预期呈现是什么？ | __________ | 实际支付配置与 Stripe 文档 |
| 账户类型、地区及 API 版本分别是什么？ | __________ | 账户设置、当前 API 配置与 Stripe |
| Stripe platform profile 对当前业务给出什么建议？ | __________ | Stripe platform profile |
| 不同订单是否需要混用多种 charge types？ | __________ | 已确认的订单类型与集成设计 |

本表中的空白是待本地团队填写的业务事实，不是默认值。不同账户类型和地区可能有不同条件；不要把一份示例或其他平台的设置直接套到自己的账户。

## 下一步与适用边界

由产品、财务和工程负责人共同填写一笔订单的关系图：客户、platform、connected account、charge 创建位置、Stripe fees 扣款账户，以及 transfer 的接收方和触发时点。再与实际账户类型、地区、API 版本和 Stripe platform profile 对照。

如果资料不一致或有空白，先向对应业务负责人和 Stripe 核实，再决定集成方式。本文提供的是基于已读取文档的比较方法，不能替平台作出选择、评估合规性、保证资金可追回，也不能覆盖未逐一核验的账户或地区差异。

## 参考来源

以下 Stripe 官方页面在 2026 年 10 月 29 日通过 Cindy browser 读取。页面未显示发布日期或更新日期，因此日期保持 unknown。

- Stripe：[Connect charge types](https://docs.stripe.com/connect/charges#types)：direct 与 indirect 的分类、决策表、费用账户和 statement 提示。
- Stripe：[Direct charges](https://docs.stripe.com/connect/direct-charges)：在 connected account 创建 direct charge、余额位置和 application fee 说明。
- Stripe：[Destination charges](https://docs.stripe.com/connect/destination-charges)：在 platform 创建 charge 并立即转给 connected account 的说明。
- Stripe：[Separate charges and transfers](https://docs.stripe.com/connect/separate-charges-and-transfers)：charge 与 transfer 分开、多接收账户及示例。
- Stripe：[Connect disputes](https://docs.stripe.com/connect/disputes)：charge type 对回应账户、争议金额余额和 dispute-related fees 的影响。
- Stripe：[Connect cross-border payouts](https://docs.stripe.com/connect/connect-cross-border-payouts)：跨地区资金流适用条件需按支持地区核实；该页不是本比较表的替代品。

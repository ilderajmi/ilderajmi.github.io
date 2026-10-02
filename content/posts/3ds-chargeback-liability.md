+++
date = '2026-10-01T00:00:00+08:00'
draft = false
title = '过了3DS，这笔拒付为什么还是回到你身上'
description = '3DS认证成功后收到拒付，先看争议理由，再核认证结果和后续支付记录。本文以Stripe官方文档为例，区分责任转移、授权、资金捕获与争议状态，并给出一张可交给支付服务商逐项核对的字段清单。'
slug = '3ds-chargeback-liability'
tags = ['支付风控', '拒付', '3DS']
+++

假设一笔订单的支付后台显示“3DS认证成功”，随后却收到拒付通知。商户翻出认证截图，第一反应往往是：身份已经核验过，为什么还要我承担损失？

先看通知写的是什么。如果持卡人说的是“商品没有收到”，认证截图回答不了货是否送到。即使诉求是“这笔付款不是我做的”，也还要核实这笔交易是否符合责任转移条件。

**3DS通过，不能单独证明这笔拒付已经获得责任转移保护。** Stripe在[认证流程文档](https://docs.stripe.com/payments/3d-secure/authentication-flow)里直接说明，认证成功并不保证责任转移。先把争议诉求、认证结果和实际支付记录放到一起，再判断该向谁补哪份证据，比重复提交一张“认证成功”截图更有用。

下文用Stripe的公开字段举例，帮助商户整理核对材料。其他支付服务商的字段和集成方式可能不同，具体责任仍要按交易适用的卡组规则、地区、产品和支付服务商处理确认。

## 认证核验了什么

[EMVCo对3DS的介绍](https://www.emvco.com/emv-technologies/3-d-secure/)将它定位为无卡支付中的消费者认证机制：商户与发卡方交换交易、设备等信息，发卡方据此认证消费者。

这能解释为什么3DS对支付欺诈有用，也解释了它的边界。认证记录围绕消费者与支付行为产生；订单是否按约交付，需要另一组履约记录来回答。

因此，收到拒付后先找争议理由。Stripe的[Dispute对象](https://docs.stripe.com/api/disputes/object)把它记录在 `reason` 字段中，例如 `fraudulent` 和 `product_not_received`。前者指向欺诈诉求，后者指向未收到商品。它们是Stripe的理由分类，不能直接当作所有卡组原因码的对照表。

Stripe同时说明，符合条件的3DS责任转移保护关注欺诈争议；未收到商品这类非欺诈争议仍按普通流程处理。如果收到的是需要回应的查询，也不能因为做过3DS就放着不管。

## 支付后台的几个“成功”要分开读

“认证成功”“付款成功”“争议胜诉”出现在不同记录里，回答的问题也不同。

在Stripe的[Charge对象](https://docs.stripe.com/api/charges/object)中，`paid=true` 可以表示付款成功，也可以表示授权成功、等待后续资金捕获；`captured` 是另一个字段。采用[手动捕获流程](https://docs.stripe.com/payments/place-a-hold-on-a-payment-method)时，授权后PaymentIntent会进入 `requires_capture`，之后还需要发起capture请求。

这里的capture是从授权走向实际收取资金的一步。无论看到 `paid` 还是 `captured`，都不能据此认定某一笔拒付已经胜诉，也不能把它们当作银行最终出款的证明。

争议的处理阶段则看Dispute的 `status`：`needs_response`、`under_review`、`won`、`lost` 分别表达待回应、审理中及已判定的结果。认证结果不会把 `under_review` 自动变成 `won`。

## 认证结果有没有沿后续链路传下去

另一种容易停在截图上的情况，是商户使用第三方3DS服务，再把结果交给支付服务商处理。

Stripe的[导入3DS结果文档](https://docs.stripe.com/payments/payment-intents/three-d-secure-import)要求，导入的 `three_d_secure` 参数必须与3DS服务商返回的结果一致。这个要求适用于文档所述的第三方结果导入路径，并不意味着所有Stripe普通集成都要自行导入；可用地区和账户能力也有条件。

如果你使用的正是这类集成，要核对的是同一笔交易的原始认证结果、后续请求与响应是否对应。只看前端“验证完成”，不足以回答实际传递了什么。

反过来也别下结论太快：商户导出的报表缺一个字段，可能只是报表没有展示，不能直接证明服务商后台没有发送。拿不到记录时，把它列为待核事项，让能查看实际请求的一方确认。

## 把通知整理成一张可交接的核对表

下面的数字是核对顺序，不是卡组条款编号。先填写已经取得的记录，再把缺项交给支付服务商或收单方。

| 顺序 | 要核对的记录 | 可以回答的问题 | 还需要补什么 |
| --- | --- | --- | --- |
| 1 | 争议通知及 `reason`，例如 `fraudulent`、`product_not_received` | 持卡人具体在争议什么 | 服务商给出的实际卡组原因码及其适用解释 |
| 2 | 原始3DS结果，例如Stripe的 `authenticated` | 消费者认证是否成功 | 这笔交易是否符合责任转移条件的确认 |
| 3 | 第三方认证结果与对应请求、响应中的 `three_d_secure` 参数 | 在适用导入路径中，结果是否一致传递 | 报表未展示或商户无权读取的后台记录 |
| 4 | `paid`、`captured`；手动捕获流程中的 `requires_capture` | 支付到了授权还是资金捕获阶段 | 不从这些字段推导争议胜负或银行出款 |
| 5 | 争议 `status` 及通知要求，例如 `needs_response`、`under_review` | 现在是否需要回应，是否仍在审理 | 通知中的实际截止时间、所需材料与负责人员 |
| 6 | 交付记录、履约约定及相关沟通 | 能否回应未收到商品等具体诉求 | 与通知要求对应的证据；认证截图不能代替交付记录 |

表中字段分别来自上面的Charge、Dispute、认证流程和结果导入文档。第3项只适用于采用该导入路径的交易；其他集成应向服务商索取对应记录，不照抄字段名。实际截止时间取自该案通知，本文不提供跨平台通用天数。

## 同样过了3DS，下一步可能完全不同

以下是两组假设输入，用来说明核对方法，不是真实客户案例，也不预判案件结果。

**假设A：认证成功，争议理由是欺诈。** 商户拿到了认证结果，却没有后续数据传递记录。此时适合向支付服务商发问：请核对同一笔交易的认证结果和支付请求，说明它适用的责任转移条件、已确认的处理结果，以及仍缺哪份证据。不能因为商户手上少一项记录，就说责任一定回到商户；也不能因为有“成功”截图，就说一定受保护。

**假设B：认证成功，争议理由是未收到商品。** 接下来要围绕交付与履约事实组织材料：约定交付了什么、是否送达、持卡人提出的具体问题是什么。Stripe文档说明这类诉求仍走普通争议流程，3DS结果不能代替这些材料。

准备交接时，把交易标识、争议通知、认证记录、实际支付记录、履约证据和待核问题放到同一份案件清单里。分享前去掉完整卡号、验证码等不需要的敏感信息。给支付服务商的问题可以写得很具体：

> 请针对这笔交易确认争议类型、适用规则与责任转移状态，并指出判断依据对应哪份认证或支付记录。商户目前缺少的后台证据，也请逐项注明。

收到答复后，把确认结果与依据回填到清单，再按该案通知完成回应。这样留下的是一条能够继续核验的证据链，而不只是一个“3DS已经通过”的标签。

## 参考来源

以下官方文档查阅于2026年10月1日。动态网页未标明固定更新时间或API版本，字段以所用集成的实际版本为准。

- EMVCo：[EMV 3-D Secure概述与FAQ](https://www.emvco.com/emv-technologies/3-d-secure/)，用于解释消费者认证和数据交换。
- Stripe：[3DS authentication flow](https://docs.stripe.com/payments/3d-secure/authentication-flow)，重点为Disputes and liability shift及认证结果范围。
- Stripe：[Import 3DS results](https://docs.stripe.com/payments/payment-intents/three-d-secure-import)，用于第三方结果导入的数据一致性与适用限制。
- Stripe：[Charge object](https://docs.stripe.com/api/charges/object)，用于 `paid` 与 `captured` 字段。
- Stripe：[Place a hold on a payment method](https://docs.stripe.com/payments/place-a-hold-on-a-payment-method)，用于手动捕获中的 `requires_capture`。
- Stripe：[Dispute object](https://docs.stripe.com/api/disputes/object)，用于 `reason`、`status` 及其取值。


+++
title = '已经退过款，为什么还收到拒付？先对哪三组记录'
description = 'Stripe 后台显示退款，争议仍处于处理中时，先核对它们是否属于同一笔支付，再分别查看退款、case 和余额记录。三组记录各自能证明什么、还缺什么，也要交给对应负责人确认。'
date = '2026-10-06T00:45:00+08:00'
draft = false
pageLang = 'zh-CN'
slug = 'refund-still-disputed'
tags = ['拒付与争议', '跨境支付']
+++

退款记录显示成功，争议页却还在催回应。财务看到 Stripe 余额变动，客服又收到客户说没看到退款。商户主管此时最需要的不是再看一遍「已退款」标签，而是把三组记录放回同一笔支付下，逐项确认它们各自说明了什么。

**先核对父支付是否一致，再分别看退款处理、争议处理和余额变化；只要缺少银行到账或提交回执，就把结果标为未知。** 退款对象、case 状态和账户余额回答的是不同问题，不能互相代替。

下文以 Stripe 的公开对象和文档为例。不同支付服务商、支付方式、账户版本和地区的字段与流程可能不同；实际结论应以商户账户中可见的记录和对应服务商说明为准。

## 先把退款和 case 连到同一笔支付

先找原支付的 `Charge` 或 `PaymentIntent` 标识，再对照退款与争议各自关联的父支付。Stripe 的退款对象把 `charge` 和 `payment_intent` 列为可能为空的关联字段；争议对象记录被争议的 `charge`，并把 `payment_intent` 列为可能为空。字段缺失时，不要靠金额、客户姓名或日期相近就把两条记录拼在一起。

同一笔支付可能有多个退款，也可能关联多个争议。金额相同不代表属于同一个退款或同一个 case。应为每条记录保留自己的对象标识、父支付标识和观察时间，再判断它们之间是否能关联。

如果退款和争议的父 `charge` 不同，就先停止合并判断。先请支付服务商或能查看账户记录的人确认关联，不要用一笔支付的退款去解释另一笔支付的争议。

## 退款组：请求状态不等于银行入账

在退款记录中，至少保留退款对象标识、父支付标识、金额、币种、当前状态、查询时间和可用的退款 reference。Stripe Refund 对象的状态包括 `pending`、`requires_action`、`succeeded`、`failed` 和 `canceled`。状态描述退款在 Stripe 对象中的处理阶段；它本身不等同于客户银行流水。

Stripe 的退款说明指出，退款请求会送交客户的银行或发卡方。对卡退款，Stripe 账户可用余额不足时，退款可能处于 `pending`，直到余额足够。成功退款通常会出现在客户银行账单，但具体显示情况取决于卡组织和发卡行。因此，后台出现退款记录或退款状态变化，不能代替独立的客户银行到账证明。

reference 也要按它实际能证明的范围使用。Stripe 列出的卡退款 reference 包括 ARN、STAN 或 RRN；客户可以把可用的 reference 提供给银行查询。它能帮助银行定位交易或退款请求，不能单独证明款项已经入账。若退款以 reversal 方式显示，可能没有单独的退款 credit；若 reference 尚未提供，也不能只据此判定退款失败。

## Case 组：每个争议都有自己的状态和提交记录

争议记录要逐案检查。至少抄下 dispute 对象标识、父支付、争议金额、状态、当前材料是否仍可编辑，以及是否有提交回执。Stripe 的 Dispute 对象会记录争议金额与父 `charge`，其状态包括 `needs_response`、`under_review`、`won` 和 `lost` 等。`under_review` 表示仍在审理，不表示已经胜诉。

材料「已经填好」和材料「已经提交」也不是一回事。Stripe 的 Dispute API 文档说明，更新证据时，提交行为取决于 `submit` 参数：`submit=false` 会把证据留在暂存状态；该参数默认是 `true`，会立即提交证据。只看到材料出现在页面上，不足以确认它已送交银行。应把请求结果、提交时间和可查到的回执一起留档。

Stripe 的应答说明还提醒：同一笔支付可能有多个争议，并建议考虑逐案回应。这是针对该文档情形的建议，不应改写成所有支付服务商、所有案件都必须遵守的统一规则。按每个 case 单独核实其状态、通知要求和提交记录，才能避免把一个争议的材料或结果套到另一个争议上。

## 财务组：把余额变化和银行流水分开

财务记录应按退款与争议分别找 Stripe 账户的余额交易，并记录每笔交易的 `source`、`type`、`amount`、`fee`、`net`、状态和观察时间。Stripe 的 Balance Transaction 对象说明，`net` 是这笔交易对 Stripe 余额的净影响，可按 `amount - fee` 计算；其状态 `available` 或 `pending` 描述资金在 Stripe 余额中的状态。

这仍然是 Stripe 账户余额层的记录。它不是商户结算银行的入账回单，也不是客户银行收到退款的凭证。商户要回答「钱是否已到结算账户」，仍需核对银行流水或对应付款的银行凭证；要回答「客户是否收到退款」，则需客户银行侧的记录或银行查询结果。

还要留意 `Charge.refunded` 的含义。Stripe 的 Charge 对象说明，该布尔值表示原支付是否已被**全额**退款；只有部分退款时，它仍可能为 `false`。因此，`refunded=false` 不能否认存在部分退款。原 Charge 的 `balance_transaction` 描述该 Charge 对 Stripe 余额的影响，不包括之后的退款或争议；只看原始 Charge 的余额交易，也不能完成后续对账。

## 把当前判断交给正确的负责人

下面这张表可以复制到案件交接记录中。每一行都保留对象标识和观察时间；无法取得的材料写「未知」，不要用推测补齐。

| 当前断言 | 归属记录与观察时间 | 缺什么证明 | 交谁核 | 不能推出的结论 |
| --- | --- | --- | --- | --- |
| 「这笔退款属于正在处理的争议」 | Refund 的 `charge`／`payment_intent`，Dispute 的 `charge`／`payment_intent`；记录查询时间 | 缺少任一父支付关联时，需服务商确认两个对象是否对应同一笔支付 | 支付运营或支付服务商支持人员 | 金额相同或时间接近不能证明是同一笔支付 |
| 「退款已经发出」 | Refund 对象标识、状态、金额、币种、reference 与观察时间 | 若状态仍为 `pending`，核对 Stripe 余额条件与后续状态；若需确认客户入账，补客户银行记录或银行查询结果 | 退款负责人；客户银行到账问题由客服向客户或银行核实 | `pending`、`succeeded` 或有 reference 单独都不能证明客户银行已入账 |
| 「这个 case 已经回应」 | 每个 Dispute 对象标识、状态、材料版本、提交请求和回执；记录提交与查询时间 | 缺少提交参数或回执时，向能查看该案请求记录的人确认实际提交状态 | 争议负责人或支付服务商支持人员 | 材料已填写、页面可见或状态为 `under_review`，不能单独证明最终胜诉 |
| 「账上已经记全这笔退款和争议」 | 原 Charge 与相关 Balance Transaction 的 `source`、`type`、`amount`、`fee`、`net`、状态和观察时间 | 补后续 refund/dispute 余额交易及商户结算银行流水 | 财务负责人 | 原 Charge 的 `balance_transaction` 不含后续退款或争议；Stripe 余额不等于结算银行余额 |
| 「`refunded=false` 说明没有退款」 | Charge 的退款总额信息与各 Refund 对象；记录查询时间 | 核对累计退款金额和原支付金额，区分部分退款与全额退款 | 财务负责人或支付运营 | `refunded=false` 不能排除部分退款 |
| 「退款和争议的进度已经闭合」 | 同一父支付下的 Refund、每个 Dispute、后续余额记录及独立银行材料 | 补齐缺失的关联、提交回执、最终争议状态或对应银行凭证 | 商户主管指定退款、争议和财务负责人共同确认 | 三类记录各自显示一个状态，不代表整笔支付的退款、case 与银行资金结果都已闭合 |

## 用四组合成记录检查判断有没有越界

以下输入用于演示如何分类记录，不是真实客户案例、真实 API 请求、账户资金流或模型实验。分类结果只反映所给输入；未提供的材料保留为未知。

| 记录 | 输入摘要 | 复算输出 | 判断边界 |
| --- | --- | --- | --- |
| S1：退款仍在处理中 | Refund 与 Dispute 的父 `charge` 都是 `synthetic_charge_A`；退款 `pending`；争议 `needs_response`；无 `submit` 值 | 同一父支付；退款状态 `pending`；客户银行到账未知；提交状态未知；争议尚无最终结果 | `pending` 不能分类为客户已收到退款 |
| S2：部分退款 | 两对象父 `charge` 相同；退款 `succeeded`；Charge 的 `refunded=false`；输入明确为部分退款；争议 `needs_response` | 同一父支付；存在已成功处理的退款对象；客户银行到账未知；争议尚无最终结果 | `refunded=false` 不否定部分退款 |
| S3：证据暂存 | 两对象父 `charge` 相同；退款 `succeeded`；争议 `needs_response`；`submit=false` | 同一父支付；退款对象状态 `succeeded`；证据仅为暂存；客户银行到账未知；争议尚无最终结果 | 暂存不能写成已提交，也不能写成银行已收件 |
| S4：父支付不一致 | Refund 属于 `synthetic_charge_B` 且状态 `succeeded`；Dispute 属于 `synthetic_charge_A` 且状态 `under_review`；无 `submit` 值 | 父支付不一致；拒绝把退款与争议合并；客户银行到账未知；提交状态未知；争议结果尚未最终确定 | 不能跨支付拼接退款；`under_review` 不是 `won` |

这张表的用处，是让缺口留在记录上，直到相应负责人补出能支持结论的材料。缺少客户银行凭证时，到账就是未知；缺少提交回执时，提交就是未知；父支付不一致时，先不合并；争议仍在审理时，不预写结果。

## 今天可以交接的材料

每笔相关支付建立一行记录，至少包含原支付标识、Refund 标识与状态、每个 Dispute 标识与状态、关联的 Stripe 余额交易、各记录的查询时间，以及缺失材料和负责人。退款、case、财务三方各自确认后，再更新同一份交接记录。

若客户询问退款，请先提供可用的退款 reference，并让客户向银行查询；reference 是查询线索，不是到账证明。若争议仍需回应，争议负责人应查看该案通知和 Stripe 当前记录，确认材料的提交状态与对应回执。不要仅因出现退款记录就关闭仍待处理的 case。

最终交付物是一张逐项列明已知、未知、责任人和凭证位置的记录表。下一位接手人能从中看到：退款是否仍在处理、每个 case 是否有提交证据、Stripe 余额变化是否与银行流水核对，以及哪些结论仍缺证明。

## 参考来源

以下 Stripe 文档于 2026-10-03 读取并保存，本文使用其中可见的有限摘录。Refund、Dispute、Charge 和 Balance Transaction 四个 API 对象页当时显示 `2026-09-30.endive / v1`。退款指南与 Respond to disputes 页的保存摘录中未见可确认的发布日期或版本。文档观察版本不代表商户账户版本，判断当前记录时仍需核对商户实际使用的 API 版本与当前官方文档。

- [Stripe：Refund and cancel payments](https://docs.stripe.com/refunds)——退款请求、Stripe 可用余额不足时卡退款可能 `pending`、reference 的用途，以及 reference 不等于银行到账证明。
- [Stripe API：The Refund object](https://docs.stripe.com/api/refunds/object)——退款对象的 `charge`、`payment_intent` 和 `status` 字段；关联字段可能为空。
- [Stripe API：The Dispute object](https://docs.stripe.com/api/disputes/object)——争议父 `charge`、金额与状态；`submit=false` 暂存证据，默认 `submit=true` 提交证据。
- [Stripe：Respond to disputes](https://docs.stripe.com/disputes/responding)——争议类别对应不同回应要求；同一支付出现多个争议时，文档建议考虑逐案回应；提交后状态进入审理，结果状态包括 `won` 和 `lost`。
- [Stripe API：The Charge object](https://docs.stripe.com/api/charges/object)——`refunded` 表示是否全额退款，部分退款时仍可能为 `false`；原 Charge 的 `balance_transaction` 不包含后续退款或争议。
- [Stripe API：The Balance Transaction object](https://docs.stripe.com/api/balance_transactions/object)——余额交易的 `amount`、`fee`、`net`、`source` 与 `available`／`pending` 状态；`net` 表示对 Stripe 余额的净影响。

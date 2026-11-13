+++
title = '争议赢了，钱为什么还没到'
description = '争议显示赢了、客户说撤诉了，或预仲裁已被接受，都不能直接证明银行到账。先按 Visa 规则核实案件阶段与金融消息，再用消息类型、处理日期、收单入账日和结算打款日四列，查清资金记录缺在哪一段。'
date = '2026-11-12T00:45:00+08:00'
draft = false
pageLang = 'zh-CN'
slug = 'dispute-payout-timing-check'
tags = ['拒付与争议', '支付运营']
+++

争议页面显示「赢了」，财务却找不到回款；客户说「已经撤诉」，案件仍在处理中；预仲裁显示「已接受」，运营以为钱该回来了。这三个状态回答的不是同一个问题。

「赢了」描述案件结果。例如，Stripe 的 [Dispute 对象](https://docs.stripe.com/api/disputes/object)把 `won` 定义为争议以商户有利的结果解决。「客户说撤诉了」是客户提供的信息，还要核对发卡行与服务商的案件记录。Stripe 的[争议流程说明](https://docs.stripe.com/disputes/how-disputes-work)明确提醒，即使客户声称撤回争议，商户仍须回应并提交证据，才能争取有利结果。「预仲裁已接受」则要先问清：谁接受了谁的主张，接受了多少财务责任？

先确认案件发生了什么，再确认资金走到哪里。案件结果、服务商余额和银行到账各有自己的记录；只拿到其中一项，就先把其余项记为「待核实」。下文先按 Visa 的网络规则辨认消息，再以 Stripe 的公开字段说明如何找余额与打款记录，两套名称不能直接画等号。

## 先问阶段，再看金融消息

Visa《Core Rules and Product and Service Rules》2026 年 4 月 18 日版 §11.3.1 规定：对于 VROL 已接受的争议所产生的金融消息，成员机构必须通过 VisaNet 或 Visa Resolve Online（VROL）处理。范围包括 Dispute、Dispute Response、pre-Arbitration 和 pre-Arbitration response。

这是机构间的处理要求，不是商户银行到账通知。该条对私人协议下处理的境内交换业务有例外；欧洲地区成员选择非 Visa 的 Visa Scheme Processor 时也有相应例外。具体案件仍应由收单机构确认适用路径。

以下按该版 §11.3.2 的 Table 11-3、Table 11-4 整理。消息名称保留英文，便于和机构回执逐项核对。

| 类别与阶段 | 谁处理 | 应核对的金融消息 |
| --- | --- | --- |
| Category 10 欺诈、11 授权：Dispute | 发卡行（Issuer） | Dispute Financial |
| Category 10、11：Pre-arbitration Acceptance | 发卡行 | Dispute Financial Reversal；必须与接受发生在同一 Processing Date |
| Category 12 处理错误、13 消费者争议：Dispute | 发卡行 | Dispute Financial |
| Category 12、13：Dispute Response | 收单机构（Acquirer） | Dispute Financial Response |
| Category 12、13：Pre-arbitration Acceptance | 收单机构 | Dispute Financial Response Reversal |

pre-Arbitration attempt（预仲裁尝试）和 pre-Arbitration response（预仲裁回应）也要分别记录。上述两张表没有为所有阶段逐项列出独立消息类型；例如，不能拿 Category 12、13 的 Dispute Response 一行去补 Category 10、11 的空白。让收单机构按案件类别和实际动作提供消息类型，不要根据页面标签猜一个 Reversal。

尤其不能把两个类别组的「预仲裁接受」统称为「退款」：Category 10、11 是发卡行处理 Dispute Financial Reversal；Category 12、13 是收单机构处理 Dispute Financial Response Reversal。发起方和被撤销的消息不同。表中的「同一 Processing Date」要求来自 Table 11-3，不要自行加到 Table 11-4。

同版 §11.3.3 还禁止成员机构使用 Fee Collection Transaction，作为争议所产生或接受争议所用的金融消息。若回执只写了费用收取，也不能据此补写争议本金已经转回。以上规则均可按[Visa 公开规则](https://usa.visa.com/content/dam/VCOM/download/about-visa/visa-rules-public.pdf)的相应章节核查；公开链接可能更新版本，本文依据的是 2026 年 4 月 18 日版。

## 撤销窗口为 31 个日历日，先核两个前提

Visa §11.3.3 的一般规则同时要求：对方成员机构尚未进入争议周期的下一阶段；双方成员机构均未接受全部或部分财务责任。满足这两个前提时，成员机构可以撤销 Dispute、Dispute Response、pre-Arbitration attempt 或对预仲裁尝试的回应。

最晚时间是该动作的 Processing Date 之后不超过 31 个日历日。这里按日历日计算，不是工作日；起算依据是被撤销动作的 Processing Date，不是商户看到通知的日期，也不是「赢了」标签出现的日期。

31 个日历日是这一条的一般规则。同一页脚注另有两句更短时限：一句只适用于涉及 Original Credit Transaction 的争议，但本节正文里看不到它挂在哪一句；另一句虽挂在上面 31 日那句上，它提到的「3 个日历日时限」在本节正文里却没有出现。两句都不足以推出某类交易的撤销窗口更短——遇到具体案件，先确认案件类型、动作类型与适用条款，再向收单机构核对这一轮还剩多少时间。

这不是每个案件都要等待 31 日，更不是 31 日到账承诺。已经接受全部或部分财务责任时，不能忽略这个事实，仍说「窗口内可以随时撤销」。超过窗口或对方已进入下一阶段时，也不能继续套用这条一般撤销规则解释状态变化。

此时应让收单机构说明实际动作、适用条款和消息记录，不能仅凭状态变化推断胜负翻转，更不能推断资金何时到账。Stripe 另有少数由发卡行驱动的 late win 情形，但服务商说明中的例外不能替代具体案件的回执。

## 用四列把缺失的记录找出来

在同一案件下，先保留原支付标识、案件标识、金额、币种和查询时间，再填下面四列。前两列来自网络处理记录，通常需由收单机构或服务商转交；后两列来自收单、服务商与银行的资金记录。不要用页面更新时间代填 Processing Date。

| 消息类型 | Processing Date | 收单机构入账日 | 结算／打款日 |
| --- | --- | --- | --- |
| 完整名称、处理方、消息回执标识 | 对应动作的网络处理日期 | 收单对账记录中的记账日期、金额与币种；另附服务商余额记录 | 结算批次、打款标识与日期；银行实际入账日另行确认 |
| 只写「赢了」或「关闭」时：待核实 | 只有邮件通知日期时：待核实 | 没有收单入账记录时：待核实 | 只有预计到达日期时：实际到账待核实 |

收单入账与服务商余额也应保留各自的记录，不要默认发生在同一日。以 Stripe 为例，[Balance Transaction 对象](https://docs.stripe.com/api/balance_transactions/object)中的 `source` 用来关联产生这笔余额交易的对象，`status` 的 `available` 或 `pending` 描述的是净资金在 Stripe 余额中的状态。它们不能单独证明收单机构的记账日期，也不能证明银行入账。

Stripe 的[余额与结算说明](https://docs.stripe.com/payments/balances)进一步区分了 pending 和 available：资金结算进入可用余额后，可用于向银行打款、退款或转账等用途。因此，即使查到资金已经 available，仍要继续找对应的打款记录，而不是把余额日期抄成银行到账日。

在最后一列，Stripe 的 [Payout 对象](https://docs.stripe.com/api/payouts/object)把 `arrival_date` 定义为预计到达银行的日期；`status` 则区分 `pending`、`in_transit`、`paid`、`canceled` 和 `failed`。文档也提示，某些失败的打款可能先显示 paid，之后才变为 failed。确认实际到账仍需匹配银行流水，不能把预计日期或一次状态查询当成到账保证。

这张表主要防止三种误判：

- 把「争议关闭」当作「资金已回」。先看关闭的是哪类案件、结果是什么，再找对应资金记录。Stripe 的 `warning_closed` 表示询问在未成为正式争议时关闭，并不等于 `won`。
- 把「pre-arb 接受」当作「商户终局获胜且已经到账」。先辨认接受方和责任，再对照消息表；接受本身还会影响上面的撤销前提。
- 把「撤销」当作「胜诉」。先找被撤销的动作，是原 Dispute、Dispute Response，还是预仲裁尝试或回应；动作被撤销不能单独证明商户有利结果。

## 一段合成时间线：结果已知，打款仍待核实

以下为合成示例（synthetic），仅演示记录如何逐步补齐，不是真实案件，也不表示任何处理或到账时长。所有观察均按同一时区记录，网络 Processing Date 仍以机构回执为准。

| 观察日期 | 新取得的记录 | 当时能说什么 |
| --- | --- | --- |
| 2026-10-01 | 服务商显示 won；没有消息回执 | 商户有利结果已显示，四列资金信息仍未核全 |
| 2026-10-02 | 收单机构补回执：Category 13 的 Dispute Financial Response，Processing Date 为 2026-09-18 | 已补齐消息类型与处理日期；不能据此填写收单入账日 |
| 2026-10-04 | 收单对账记录补记入账；服务商另提供关联的余额交易 | 可以核对入账金额与币种；仍不能说银行已收款 |
| 2026-10-07 | 找到对应打款，状态为 in_transit，银行尚未匹配入账 | 可以说已找到打款记录；实际到账仍待银行记录确认 |

到了最后一行，不应把「未到账」直接解释为争议结果被推翻。现有材料只支持更窄的判断：案件结果、网络消息和入账记录已经找到，银行到账尚未确认。若金额对不上，则保留差额和原记录，交财务与服务商核查，不能先补一句「之后会自动到账」。

## 哪一列缺失，就把问题交给能查到记录的人

消息类型或 Processing Date 缺失时，由支付运营向收单机构或服务商争议团队查询。请求中写明原支付和案件标识、争议类别、当前阶段、动作发起方、金额币种，以及需要的消息回执和 Processing Date。如果通知说的是「预仲裁已接受」，还要问清接受方与接受的财务责任范围。

收单入账日缺失时，由财务向收单机构索取对账记录，并向服务商核对关联的余额交易。没有记录就保持空缺，不用消息日期推算入账日。

结算或打款信息缺失时，由财务向服务商结算团队确认批次、打款标识和状态，再与商户结算银行核对。已找到打款却未匹配银行入账时，继续查该笔打款的去向与状态，而不是重新解释案件输赢。

如果客户追问的是「我的退款何时到」，先核实是否另有退款请求。商户争议资金恢复与客户退款属于不同方向。Stripe 的[退款说明](https://docs.stripe.com/refunds)指出，退款请求会提交至客户银行或发卡行；可用时，ARN、STAN 或 RRN 等 reference 能帮助客户向银行查询。它们不能替代实际入账确认。退款与争议并行的核对可参见[已经退过款，为什么还收到拒付](/posts/refund-still-disputed/)；提交材料前的问题可参见[争议证据提交前要核对什么](/posts/dispute-evidence-before-submit/)。

## 到账承诺停在证据边界内

缺少收单入账记录时，不向客户承诺退款时点；即使取得该记录，也仍需核实是否存在独立退款及其银行处理情况。网络消息时间不能写成到账承诺，商户余额恢复也不能写成客户已经收到退款。

本文讨论普通商户卡交易的结果核对，不穷尽特殊交易、地区例外或具体合同安排，不提供到账天数、费率或会计处理建议。会计确认与分录由财务依据适用准则及完整凭证判断。交接时留下可核对的案件与资金记录，并明确还缺哪一项证明，才能回答「钱现在走到哪里」。

## 参考资料

- [Visa Core Rules and Visa Product and Service Rules](https://usa.visa.com/content/dam/VCOM/download/about-visa/visa-rules-public.pdf)：本文依据 2026 年 4 月 18 日版 §11.3.1—§11.3.3、Table 11-3 与 Table 11-4；公开链接可能提供后续版本。
- [Stripe：How disputes work](https://docs.stripe.com/disputes/how-disputes-work)：客户声称撤回后仍需回应、争议结果和 late win 的说明。
- [Stripe：The Dispute object](https://docs.stripe.com/api/disputes/object)：won、warning_closed 等案件状态。
- [Stripe：The Balance Transaction object](https://docs.stripe.com/api/balance_transactions/object)：source 与余额状态。
- [Stripe：Balances and settlement time](https://docs.stripe.com/payments/balances)：pending、available 与可用余额的用途。
- [Stripe：The Payout object](https://docs.stripe.com/api/payouts/object)：预计到达日期、打款状态及失败后状态变化。
- [Stripe：Refund and cancel payments](https://docs.stripe.com/refunds)：退款请求、reference 与银行查询。

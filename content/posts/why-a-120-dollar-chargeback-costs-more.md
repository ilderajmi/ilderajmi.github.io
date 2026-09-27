+++
title = '一笔 120 美元的拒付，最后花掉多少？'
description = '一笔 120 美元的拒付，账面损失不只是 120 美元。把成本拆成三层——卡组织与收单机构的公开收费、自己团队处理争议的人工、以及把账户推近监控阈值的风险——再给一张能照填的合成算例。只比手续费的成本清单，会漏掉后两层。'
date = '2026-09-27T00:45:00+08:00'
draft = false
pageLang = 'zh-CN'
tags = ['拒付与争议', '跨境支付']
+++

9 月有一笔 120 美元的拒付。财务在账上记了 120 美元损失，运营说申诉拿得回来，风控说这个月的拒付率已经顶到监控线。三个说法都不算错，因为这笔交易带来的支出不止 120 美元。

**一笔拒付的成本分三层：被扣走的钱、处理它花掉的人工、以及它把这个账户往监控阈值推近的那部分风险。** 只算手续费，或者只算争议金额，都会漏掉后面两层，于是横向比较永远比不出真实差距。

下面把三层拆开，最后给一张能用同一笔 120 美元照填的合成算例。

## 第一层：卡组织和收单机构收的费

争议一旦成立，收单机构先把争议金额从你的余额里扣走，再收一笔接收费。[Stripe 的争议文档](https://docs.stripe.com/disputes)写得很直接：发卡行在卡组织上建一笔正式争议，立即冲销这笔支付，并从 Stripe 拉走这笔钱以及一笔或多笔网络争议费；随后 Stripe 从你的余额里扣掉争议金额和争议费。也就是说，收到的第一笔支出是两项，不是一项。

这些费用是按项列出来的，不是打包价。[Stripe 定价页](https://stripe.com/pricing)列出的是香港币种价格：收到一笔争议收 HK$85.00；手动应答一笔再收 HK$85.00，赢了退回、输了不退。争议前查检按次收：Visa 的解决方案与 Compelling Evidence 3.0 拦截各 HK$85.00，Mastercard 的解决方案 HK$170.00。如果用 Smart Disputes 这类自动准备证据的服务，费用是按赢下的争议金额 30% 计，输的不收，接收费照收。

费用项目会随卡组织和地区变化，逐项对照可以先看参考库里的[费用与成本](https://wiki.sequre.paymond.me/chargebacks/fees-and-costs/)。还有一类经常被漏算的：[Visa 合规争议](https://docs.stripe.com/disputes/responding)。发卡行认为交易不符合 Visa 网络规则时，会在卡组织上发起合规争议；如果双方没有自行解决，由网络裁定并收取费用，你申诉时 Stripe 会在常规争议费之外再收 500 美元，赢了退回。

退款也不退手续费。[Stripe 的退款文档](https://docs.stripe.com/refunds)写明：原交易的受理费不会随退款返还。这条看起来和拒付无关，但它决定了"干脆直接退款了事"并不是零成本方案——退款省掉的是申诉环节，省不掉已经发生的受理成本。

## 第二层：处理这笔争议用掉的人工

这一层不进任何一张对账单。[Visa 商户争议管理指南](https://usa.visa.com/content/dam/VCOM/global/support-legal/documents/merchants-dispute-management-guidelines.pdf)在争议章节开头就点明：商户可能同时损失争议金额和相关商品，还要承担处理一次争议应答的**内部成本**。

内部成本因人而异，但它可以被填进模型而不是被忽略。主站的方法页给了一个公开的估算式：估算成本 = 拒付笔数 ×（平均争议金额 + 每笔费用 + 每笔人工成本），默认值是每笔 15 美元费用与每笔 10 美元人工，并明确写了这两个数字因收单机构、处理方和团队而异，应换成你自己的数字（[方法页](https://sequre.paymond.me/methodology/chargeback-cost/)）。同一套默认值也用在[成本计算器](https://sequre.paymond.me/chargeback-cost-calculator/)里。默认值的用途是让模型能跑起来，不是费率报价。

人工还和争议的数量结构有关：一笔要调取物流签收、比对 AVS 结果、写应答文本的申诉，工时远高于一笔直接认下的争议。把人工设成固定值时，等于假设每笔争议的举证难度相同，这个假设要在结论里写清楚。

## 第三层：监控阈值与账户风险

前两层是现金，第三层不是，但它决定了明年你的账户会被怎么对待。

Visa 的 [Acquirer Monitoring Program 2025 事实表](https://corporate.visa.com/content/dam/VCOM/corporate/visa-perspectives/security-and-trust/documents/visa-acquirer-monitoring-program-fact-sheet-2025.pdf)把监控指标定义成一个按笔数计的比例：VAMP 比率 = 欺诈（TC40）与争议（TC15）笔数之和 ÷ 已结算交易笔数（TC05），只统计卡不在场的 VisaNet 交易。收单组合达到 ≥50bps 记为 Above Standard、≥70bps 记为 Excessive；收单机构未超线时，商户侧 Excessive 阈值为 AP、加拿大、EU、美国、LAC 的 ≥220bps 与 CEMEA 的 ≥150bps，月计数门槛分别为 ≥1,500 与 ≥150 且金额 ≥ 美元 75,000，其中 AP、加拿大、EU、美国的商户阈值自 2026 年 4 月 1 日起下调至 ≥150bps。

[Visa 的商户争议管理指南](https://usa.visa.com/content/dam/VCOM/global/support-legal/documents/merchants-dispute-management-guidelines.pdf)补上了阈值之后的动作：Visa 按月监控全部商户争议活动，商户争议过多时通知收单机构，收单机构被期望采取步骤降低该商户的争议活动；具体补救取决于争议条件、商户行业、经营方式、欺诈控制和经营环境。

这一层的成本不是某一张账单上的数字，而是整改、准备金要求与账户稳定性。它的代价通常高于前两层之和，但只在越线之后才显性化——这也是为什么只盯手续费的成本表，会系统性低估高拒付率账户的真实处境。

## 合成算例：同一笔 120 美元，三种做法

下面的数字是演示算术的合成算例，不是费率报价，也不对应任何真实商户。争议金额取 120 美元，费用与人工取方法页的两个公开默认值（15 美元、10 美元）。

| 项目（1 笔 120 美元拒付） | 直接接受 | 申诉并赢 | 申诉并输 |
|---|---:|---:|---:|
| 争议金额 120 美元 | 损失 120 | 收回 120 | 损失 120 |
| 争议接收费 15 美元 | 15 | 15 | 15 |
| 内部人工 10 美元 | 0 | 10 | 10 |
| 现金净额（美元） | −135 | −25 | −145 |

三种做法用的是同一笔交易。直接接受只省掉申诉人工，省不掉接收费；申诉赢下时账面变成 25 美元成本；申诉输掉时是 145 美元——比闷头认下还多 10 美元的人工。中间的差额来自申诉结果，而申诉结果不由成本表决定。

把这张表换成你自己的数字时，有三项要单独填，不能沿用默认：你们实际被收的接收费与应答费、一次申诉的平均工时与折算成本、以及争议集中时收到的监控通知。前两项填进上表即可；第三项没有金额，但它是这一层里唯一会改变账户命运的变量。

## 适用边界

上表第二、三行的 15 与 10 是主站方法页的默认值，不是任何收单机构或卡组织的收费；实际数字以你自己的合同与账单为准。Stripe 定价页显示的是香港币种价格，其他地区与账户类型会不同，本文只引用它的列项结构，不把 HK$85.00 与美元的默认值混算。VAMP 阈值随版本与地区变化，巴西、智利、印度的计划尚未公布，2026 年 4 月 1 日的下调只覆盖 AP、加拿大、EU、美国。合规争议的 500 美元是按 Stripe 文档转述的金额，真实网络成本以你的收单机构通知为准。

合成算例回答的是"这笔钱由哪几项组成"，不回答"该不该申诉"——后者取决于可举证的证据和剩余时限，不是成本表能替你做主的。

## 参考来源

- [Stripe 争议文档](https://docs.stripe.com/disputes)：争议成立时的扣款结构与网络争议费
- [Stripe 争议处理文档](https://docs.stripe.com/disputes/how-disputes-work)：争议通知与扣款流程
- [Stripe 争议应答文档](https://docs.stripe.com/disputes/responding)：Visa 合规争议的 500 美元网络费
- [Stripe 退款文档](https://docs.stripe.com/refunds)：原交易受理费不随退款返还
- [Stripe 定价页](https://stripe.com/pricing)：争议接收费、应答费、争议前查检费与 Smart Disputes 的列示方式
- [Visa Acquirer Monitoring Program 2025 事实表](https://corporate.visa.com/content/dam/VCOM/corporate/visa-perspectives/security-and-trust/documents/visa-acquirer-monitoring-program-fact-sheet-2025.pdf)：VAMP 比率定义、阈值与生效日期
- [Visa 商户争议管理指南（2024 年 6 月版）](https://usa.visa.com/content/dam/VCOM/global/support-legal/documents/merchants-dispute-management-guidelines.pdf)：内部成本与按月监控
- 主站[成本估算方法](https://sequre.paymond.me/methodology/chargeback-cost/)与[成本计算器](https://sequre.paymond.me/chargeback-cost-calculator/)：公开默认值与估算式

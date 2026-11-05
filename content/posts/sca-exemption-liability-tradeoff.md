+++
title = '为了少一次验证，谁承担这笔欺诈'
description = '为在欧洲、英国与瑞士收款的商户比较 SCA 豁免的四条路径（Low Value、TRA、MIT、Data Only）：验证摩擦减少后，哪些交易不再获得欺诈责任转移，以及如何核算单笔损失是否值得。'
date = '2026-11-05T00:45:00+08:00'
draft = false
pageLang = 'zh-CN'
slug = 'sca-exemption-liability-tradeoff'
tags = ['拒付与争议', '跨境支付']
+++

少一次验证，省下的是结账时的一步操作。代价也落在同一笔交易上：如果发卡行批准豁免，欺诈交易不适用责任转移。商户不能把这笔欺诈本金当作已转给发卡行承担。

Stripe 将 SCA 豁免用于欧洲经济区（EEA）、瑞士和英国的支付流程。支付服务商可以代商户提出适用的豁免请求，但发卡行批准之后，欺诈交易仍没有责任转移。具体流程和例外要按该笔支付记录核对，不能把「请求豁免」当作「责任已转移」。[Stripe 的 SCA 豁免说明](https://docs.stripe.com/payments/3d-secure/strong-customer-authentication-exemptions.md)

3DS 是支付认证协议，SCA 是适用的认证要求；二者有关联，但不能把「使用了 3DS」和「这笔交易已获得责任转移」画上等号。[Stripe 的 3DS 文档](https://docs.stripe.com/payments/3d-secure.md)说明了 3DS 的认证流程及其与 SCA 的关系。已完成认证、豁免获批、MIT 和 Data Only 应分开记录。已上线的[《过了 3DS，这笔拒付为什么还是回到你身上》](/posts/3ds-chargeback-liability/)讨论认证之后仍出现拒付的情形，与本篇的取舍角度不同。

## 四种路径，四种不同的代价

下表讨论的是 SCA 验证和欺诈责任转移，不代表每笔支付都会获批或出现争议。发卡行仍可能要求验证；最终记录应以支付服务商返回的该笔结果为准。

| 路径 | 验证或请求 | 欺诈责任转移 | 关键条件与决定方 |
| --- | --- | --- | --- |
| Low Value | 可请求低额豁免，减少一次持卡人验证；发卡行仍可能要求 SCA | 豁免获批时不适用 | 单笔低于 30 EUR（25 GBP）；自上次 SCA 后累计金额超过 100 EUR（85 GBP），或已发起 5 笔交易时，发卡行仍可能要求验证。由发卡行决定是否接受豁免请求。 |
| TRA | 支付服务商做实时风险分析，决定是否提出豁免请求 | 豁免获批时不适用 | 可用金额受服务商整体卡支付欺诈率约束，商户不能自行设定额度。Stripe 列出的门槛见下文。 |
| MIT | 符合条件的商户发起交易不进行客户挑战 | 不发生责任转移 | 保存卡片时需完成认证并取得客户 mandate；后续付款须按已约定的交易关系标记为 MIT。 |
| Data Only | 认证信息交给卡组织处理，但不向发卡行发送认证请求 | 不发生责任转移 | 标准 Data Only 需要 3DS 2.2 或更新版本；是否具备该流程取决于集成支持。 |

Low Value 的门槛看单笔金额，也看上次 SCA 之后的累计交易。达到累计金额或笔数条件后，发卡行仍可能要求 SCA。它适合小额支付流程，不是无限次免验证额度。[Stripe 的 SCA 豁免说明](https://docs.stripe.com/payments/3d-secure/strong-customer-authentication-exemptions.md)

TRA 由支付服务商的实时风险分析决定。Stripe 文档列出的服务商整体欺诈率与金额上限如下；这些百分比描述服务商整体卡支付欺诈率条件，不是单个商户可以自行申报或设定的交易风险值。

| 服务商整体欺诈率门槛 | 对应豁免金额上限 | GBP 等值 |
| --- | --- | --- |
| 0.13% | 100 EUR | 85 GBP |
| 0.06% | 250 EUR | 220 GBP |
| 0.01% | 500 EUR | 440 GBP |

Stripe 文档在 2026-11-04 读取时列出，当前 TRA 开放额度为：英国与瑞士商户最高 220 GBP，EEA 商户最高 250 EUR。额度取决于 Stripe 的整体欺诈率及商户可用的认证能力，可能变化；这是服务商当前状态，不是监管阈值。[Stripe 的 SCA 豁免说明](https://docs.stripe.com/payments/3d-secure/strong-customer-authentication-exemptions.md)

MIT（商户发起交易）与 Data Only 也不能混为一谈。符合条件的 MIT 技术上不在 SCA 范围内，但它没有客户挑战，也没有责任转移。商户需要在保存卡片时完成认证并取得客户 mandate。Data Only 则不向发卡行发送认证请求，因此不发生责任转移；它不能当作一条「无挑战但仍有转移」的捷径。[Stripe 的 SCA 豁免说明](https://docs.stripe.com/payments/3d-secure/strong-customer-authentication-exemptions.md)

## 什么时候值得少做一次验证

只有在商户自己的数据能说明收益大于风险时，才考虑用豁免减少验证步骤。先按相近订单比较挑战前后的完成率，再估算新增订单的毛利，并与未获责任转移的欺诈本金、退款和争议处理成本相减。不要用假设的转化提升代替自己的结账数据。

可以优先评估客单价低、欺诈损失较小、争议表现稳定的订单。单笔欺诈本金低，并不自动说明豁免划算；如果每次省下的验证没有带来可测量的新增订单，商户只是承担了风险，却没有得到可核算的收益。

高客单订单通常需要更严格的单笔损失测算。若商户已把订阅、数字服务或跨境长物流订单识别为高争议业务，或收单方已就欺诈、争议指标发出监控提示，应先处理导致争议的环节，再评估是否请求豁免。Visa 的 VAMP 介绍说明，该监控项目使用欺诈与争议指标监测收单机构；Mastercard 的规则页面则将 ECP 列为客户合规与监控项目。两者属于各自的监控安排，不能据此推导出适用于所有商户的统一阈值。[Visa 对 VAMP 的介绍](https://corporate.visa.com/en/sites/visa-perspectives/security-trust/introducing-visa-acquirer-monitoring-program.html) [Mastercard 规则页面](https://www.mastercard.com/us/en/business/support/rules.html)

监控提示之外，拒付或欺诈还可能触发卡组织的名单机制。Stripe 的 terminated merchant files 说明，收单机构会在商户达到卡组织的名单条件时上报终止商户名单；这是收单机构层面的名单后果，与单笔交易的 SCA 责任转移是两套机制。[Stripe terminated merchant files](https://docs.stripe.com/disputes/match.md)

豁免也不会取消争议处理。Mastercard 的争议管理页面描述的是独立的事后处理流程。认证阶段的选择与收到争议后的处理应分别记录、分别核对。[Mastercard 争议管理](https://www.mastercard.com/us/en/business/cybersecurity-fraud-prevention/dispute-management.html)

## 用四个标签留下可核对的记录

日志至少要区分以下四类状态，并按支付尝试记录请求和最终结果。一次流程可能先请求豁免、再转入持卡人认证；不能只存一个「3DS 成功」字段。

- **已认证**：保存认证结果及对应支付标识。认证完成本身不等于豁免获批。
- **豁免获批**：保存申请的豁免类型、发卡行结果、金额与币种。Stripe 明确说明，银行批准豁免时，欺诈交易不适用责任转移。
- **MIT**：保存客户同意的 mandate、初次保存卡片时的认证记录，以及后续交易的 MIT 标记。
- **Data Only**：保存流程类型、3DS 版本和授权关联信息；不要把它记成发卡行认证或责任转移。

争议发生后，这些标签能帮助定位该笔支付走过哪条流程、豁免是否获批、是否留有初次认证和 mandate 记录。它们不能替代发卡行或支付服务商对具体交易的结果确认。

## 合成算例：一笔 120 EUR 订单

以下为 synthetic 合成算例，不代表任何真实商户、Stripe 客户或行业数据。它只比较欺诈本金的期望损失，不包含处理费、争议费、退款成本、履约成本或实际转化率。

假设同一笔 120 EUR 订单在三条路径下都有 0.50% 的欺诈争议概率。这个概率是为演算而设的假设，不是 Stripe 的商户级数据。另假设第一条路径的责任转移已针对该笔交易确认适用；获批 TRA 豁免与 Data Only 均不发生责任转移。

| 处理路径 | 计算假设 | 商户承担的欺诈本金期望损失 |
| --- | --- | --- |
| 3DS 已认证，且该笔责任转移已确认 | 120 EUR × 0.50%；假设该欺诈争议符合已确认的责任转移条件 | 0 EUR |
| TRA 豁免获批 | 120 EUR × 0.50%；银行批准豁免，不适用责任转移 | 0.60 EUR |
| Data Only | 120 EUR × 0.50%；不向发卡行发送认证请求，不发生责任转移 | 0.60 EUR |

公开的 TRA 百分比是服务商整体欺诈率门槛，不是这笔 120 EUR 订单的欺诈概率。比如 Stripe 文档列出的 0.06% 对应服务商整体欺诈率条件和 250 EUR（220 GBP）金额上限，不能拿来代替商户的交易级损失估计。上表的 0.50% 仅是假设值。

按这组假设，获批 TRA 或 Data Only 每笔增加 0.60 EUR 的欺诈本金期望暴露。是否值得，取决于商户实测到的新增订单毛利能否覆盖这项暴露及其他未纳入的成本。若没有可验证的转化收益，少一次验证本身并不能证明豁免更划算。

## 三条停止线

- 不把 SCA 豁免当作通用的降拒付工具。它减少验证摩擦，不保证授权通过，也不替代事后的争议处理。
- 不为了通过风险审核而隐藏或误标交易类型。MIT、Data Only 和豁免请求都应反映真实支付流程。
- 不把本文当作合规意见。适用资格、责任转移和争议结果应由支付服务商及相关规则对具体交易确认。

## 参考来源

引用来源及访问日期如下。Stripe 的 SCA 豁免页没有显示发布日期。

- Stripe：[Strong Customer Authentication (SCA) exemptions](https://docs.stripe.com/payments/3d-secure/strong-customer-authentication-exemptions.md)。读取：2026-11-04；无可见发布日期（unknown）。用于 SCA 豁免适用地区、责任转移、Low Value、TRA、MIT 与 Data Only。
- Stripe：[3D Secure](https://docs.stripe.com/payments/3d-secure.md)。读取：2026-11-04。用于 3DS 认证流程及其与 SCA 的关系。
- Stripe：[Terminated merchant files](https://docs.stripe.com/disputes/match.md)。读取：2026-11-02、2026-11-03。用于说明卡组织终止商户名单的上报触发与后果。
- Visa：[Introducing the Visa Acquirer Monitoring Program (VAMP)](https://corporate.visa.com/en/sites/visa-perspectives/security-trust/introducing-visa-acquirer-monitoring-program.html)。读取：2026-11-03。用于说明 Visa 以欺诈与争议指标监测收单机构。
- Mastercard：[Rules](https://www.mastercard.com/us/en/business/support/rules.html)。读取：2026-11-03。用于说明 ECP 属于客户合规与监控项目。
- Mastercard：[Dispute management](https://www.mastercard.com/us/en/business/cybersecurity-fraud-prevention/dispute-management.html)。读取：2026-11-03。用于说明争议处理属于事后流程。

本文用于比较支付流程与风险核算方法，不替代支付服务商对单笔交易的确认，也不构成法律或合规意见。

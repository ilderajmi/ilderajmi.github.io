+++
title = '被收单机构终止之后：先分清监控项目与终止名单'
description = '收到收单机构终止通知或开户被拒时，先分清 VAMP、ECP 监控项目与 MATCH、VMSS 终止名单，再核对通知字段、上报方和可行的更正路径。'
date = '2026-11-03T00:45:00+08:00'
draft = false
pageLang = 'zh-CN'
slug = 'terminated-merchant-file-check'
tags = ['拒付与争议', '跨境支付']
+++

收到“终止”“监控”或“名单”几个词，不代表它们指向同一种记录。先找出通知的项目名称或名单名称，再决定要对账整改、联系哪家收单机构，或向新收单机构核对开户拒绝依据。把监控通知当成名单记录，或把名单记录当成普通整改任务，都会让后续动作走偏。

本文是一份判断和分派清单，不是法律意见；不预测开户、处理或争议结果，也不评价任何具体收单机构。下面的合成示例不对应真实商户。

## 先确认是监控项目，还是终止名单

VAMP（Visa 的[项目介绍](https://corporate.visa.com/en/sites/visa-perspectives/security-trust/introducing-visa-acquirer-monitoring-program.html)、[项目更新说明](https://corporate.visa.com/en/sites/visa-perspectives/security-trust/visa-vamp-program-update-fraud-disputes.html)及 [fact sheet](https://corporate.visa.com/content/dam/VCOM/corporate/visa-perspectives/security-and-trust/documents/visa-acquirer-monitoring-program-fact-sheet-2025.pdf)）和 ECP（Mastercard 在[规则与合规计划页](https://www.mastercard.com/us/en/business/support/rules.html)列出的 Excessive Chargeback Program）属于监控项目。收到相关通知时，先按通知要求核对涉及的交易、笔数、金额或比例，完成整改并保存提交记录与回执。监控项目通知说明某项活动触发了监测或处理要求；它本身不等于商户已被加入 MATCH 或 VMSS。

MATCH（Mastercard 的 Member Alert to Control High-Risk Merchants）和 VMSS（Visa Merchant Screening Service）是终止商户名单。收单机构会依据适用条件判断是否需要上报。名单记录可能影响其他收单机构的申请审核与继续处理，因此应查清具体名单、原因码和上报方。它们不是可以通过完成一般整改就自动清除的监控状态。

| 先辨认 | 监控项目：VAMP / ECP | 终止名单：MATCH / VMSS |
| --- | --- | --- |
| 记录性质 | 监测交易活动，通知可能要求核对、整改或承担相应处理 | 记录符合条件的已终止商户；收单机构会在审核中查询 |
| 收到通知后的重点 | 核对项目、统计口径、处理期限及整改要求，保存对账材料和提交回执 | 核对名单、原因码、上报收单机构、生效日期和涉及主体 |
| 谁处理下一步 | 按通知联系发件方或负责该项目的收单机构团队 | 对记录提出更正或移除请求时，联系发起该条上报的收单机构 |
| 期限与结果 | 以具体通知及对应项目规则为准；不要把监控期推断成名单保留期 | Stripe 文档转述：记录保留 5 年；只有上报收单机构能申请更正或移除，且适用情形有限。该期限与处理条件不代表每个申请的结果。 |

这里的“收单机构”指处理商户卡交易并负责相应上报的机构。项目简称可能出现在同一封信或同一账户的不同通知中；不要只看邮件标题，也不要把“终止账户”本身当成名单查询结果。

## 从通知里抄下五项信息

先把原通知原样保存，再将以下字段抄进同一份记录。缺失的字段标为“未提供”，向发件方或账户联系人核实，不要靠推测补齐。

| 字段 | 需要记录什么 | 为什么要核对 |
| --- | --- | --- |
| 项目或名单名称 | VAMP、ECP、MATCH、VMSS，或通知中的完整名称 | 区分监控项目和终止名单，避免走错处理流程 |
| 原因码 | 原通知列出的代码及说明；如果没有，记“未提供” | 不同原因码对应的事实和处理路径可能不同 |
| 上报方 | 哪家收单机构发送通知或提交记录 | 名单更正应从实际发起上报的机构开始核实 |
| 生效与终止日期 | 通知中的日期、时区及其含义；未知项单独标记 | 区分通知发送日、终止日、名单记录日和通知所述期限 |
| 商户主体与主要所有人 | 法律实体名称、商号，以及通知涉及的主要所有人信息 | 判断记录是否对应自己的主体，或是否存在身份盗用线索 |

不要把“收到通知的日期”替代“记录生效日期”，也不要因公司名称相似就认定记录属于自己。若通知未说明某日期代表什么，应要求发件方解释字段含义，并保留答复。

## 三种情形，按不同路径处理

| 当前情形 | 先做什么 | 接下来联系谁 | 记录与边界 |
| --- | --- | --- | --- |
| 收到 VAMP 或 ECP 监控项目通知 | 对照通知核查交易和统计区间，按要求整改；保存对账底稿、提交版本、时间和回执 | 通知发件方或负责该项目的收单机构联系人 | 整改完成只说明已完成相应动作，不证明任何名单记录已移除。项目处理以通知和适用规则为准。 |
| 被收单机构终止，并确认已列入 MATCH 或 VMSS | 抄录名单、原因码、上报方、日期及主体信息；核对记录是否准确以及理由是否适用 | 发起该条上报的收单机构，询问其更正或移除流程 | 记录保存 5 年；除适用的错误登记路径外，`MATCH Code 12` 还有经核实已完全符合 PCI DSS 后的有限移除路径。VMSS 的 Stripe 文档说明只列出原始登记错误这一更正或删除条件。关闭账户、之后赢回争议或一般整改，不会自动撤销已满足条件的记录。具体规则以相应卡组织和上报机构的当前说明为准。 |
| 新收单机构开户被拒，理由未说明或只说“有名单记录” | 请对方提供可披露的拒绝依据、涉及的主体及名单类别；用通知和公司记录核对是否为本人主体 | 作出开户决定的新收单机构；若确认是他方上报，再联系原上报收单机构核实 | 不根据拒绝结果推断具体原因码，也不要求新机构披露其无权披露的资料。保留申请、答复与主体核对记录。 |

收单机构终止合作与名单上报有关联，但不是同一件事。Stripe 文档说明，符合条件的商户即使在处理账户关闭后才达到相关条件，仍可能被上报；关闭账户本身不会阻止上报，之后争议被赢回或撤销，也不会改变此前已经满足的定量条件。对于定量原因码，关键是适用规则所要求的同一月份内，交易笔数与金额或比例条件同时满足。争议本身另有独立的处理流程（见 Mastercard 的[争议管理说明](https://www.mastercard.com/us/en/business/cybersecurity-fraud-prevention/dispute-management.html)）；争议处理结果与名单条件是否已经满足，要分开核对。

本文不复写 MATCH 与 VMSS 的完整原因码或数值阈值表。需要判断具体代码、统计口径和门槛时，应查对应卡组织规则、通知和机制说明；数值条件可能按卡组织、代码及计算口径分别定义，不能把一个项目的门槛套给另一个项目。可先参阅 [Visa VAMP 项目说明](https://wiki.sequre.paymond.me/programs/visa-vamp/) 与 [Mastercard 监控项目说明](https://wiki.sequre.paymond.me/programs/mastercard-monitoring/)，用于理解监控项目；它们不替代 MATCH 或 VMSS 的名单规则。

## 身份盗用与主体违规要分开取证

`MATCH Code 14` 和 `VMSS Code 34` 涉及身份盗用。它们与商户自身经营行为导致的违规或超限不是同一种事实判断。若主体名称、税务信息或主要所有人信息与自己的记录不符，先把“身份是否被冒用”和“该主体是否存在违规活动”拆成两条证据线，避免用一组材料替代另一组。

身份线索可按自身掌握的原始文件整理，例如公司登记信息、税务主体资料、主要所有人授权记录、开户申请往来，以及发现异常的日期。违规或交易线索则另行保存对应的订单、交易、拒付、欺诈核查与整改记录。只提交与自己相关、可验证的材料，并向发起上报的收单机构询问其接受的材料格式与提交渠道。这里提供的是记录整理顺序，不判断身份盗用是否成立，也不预测上报方或新收单机构的处理决定。

## 停止线：遇到这些说法先暂停

- 不向声称“付费即可消除名单”的第三方提供主体证件、所有人证件、账户凭据或付款。先通过已知的收单机构官方联系人核实处理渠道。
- 在缺少上报方确认和可核实材料时，不公开指控某家合作方错误上报。先保存通知与往来记录，通过对应渠道核对事实。
- 不把“已经整改”“争议已经赢回”或“账户已经关闭”写成“名单记录已移除”。要求对方确认当前记录状态，并保存可追溯的书面答复。
- 不因新收单机构拒绝申请，就自行断定是哪一条名单、哪一个原因码或哪家机构上报。先索取可披露的依据，再分派核实。

这些停止线不阻止你保存证据或提出询问；它们提醒你在主体信息、上报来源和记录状态未核实前，不要交出敏感资料、付款或扩大公开结论。

## 合成示例：误把名单记录当作监控通知

以下是 **synthetic 合成示例**，不对应真实商户、收单机构、账户或案件。

一家虚构商户收到一封写有“账户已终止”的邮件。运营同事把它放进日常监控整改表，准备补交一份整改说明。财务同事检查附件后发现，通知同时列出 MATCH 和原因码；邮件还给出上报机构名称与记录日期。此时，团队先暂停把它当作 VAMP 或 ECP 项目处理，回到五项字段表核对名单、原因码、上报方、日期和主体。

如果主体与商户自身不符，团队将身份线索单独整理；如果通知资料不完整，则向发件方确认记录来源和更正渠道。若记录准确，已做整改不能单独证明记录应移除；团队继续向上报机构核实规则允许的路径，并保存书面答复。这个例子只展示如何分类和分派，不表示该虚构商户可以开户、移除记录或获得某种争议结果。

## 参考来源

Stripe 官方页面未显示发布日期。本稿于 2026-11-03 通过浏览器实读下列页面；正文中的 5 年、名单更正条件及代码说明转述自 Stripe 页面，未复制其完整阈值表。

### 官方来源

- Stripe：[Terminated merchant files：MATCH 与 VMSS](https://docs.stripe.com/disputes/match.md)。访问：2026-11-03。页面可见正文涵盖名单定义、保留与更正条件、MATCH/VMSS 原因码与定量条件；页面未显示发布日期。本文仅转述与分类决策有关的内容。
- Visa：[Introducing the Visa Acquirer Monitoring Program](https://corporate.visa.com/en/sites/visa-perspectives/security-trust/introducing-visa-acquirer-monitoring-program.html)。访问：2026-11-03 约 01:00（Asia/Shanghai）。页面说明 VAMP 整合欺诈与争议监控项目并帮助收单机构改进风险控制；用于支持正文将 VAMP 归为监控项目，不转述阈值。
- Visa：[Modernizing payment security: Evolving the Visa Acquirer Monitoring Program](https://corporate.visa.com/en/sites/visa-perspectives/security-trust/visa-vamp-program-update-fraud-disputes.html)。访问：2026-11-03 约 01:00（Asia/Shanghai）。可读访谈说明 VAMP 的项目目标与从多个既有项目整合的背景；用于支持正文的 VAMP 项目分类，不引用访谈中的数字。
- Visa：[Visa Acquirer Monitoring Program fact sheet (2025)](https://corporate.visa.com/content/dam/VCOM/corporate/visa-perspectives/security-and-trust/documents/visa-acquirer-monitoring-program-fact-sheet-2025.pdf)。访问：2026-11-03 约 01:01（Asia/Shanghai）；以浏览器打开 PDF 首页读取。页面称 Visa 按月监测欺诈、争议和枚举活动，并识别超过项目门槛的对象、要求风险缓解；用于支持正文将 VAMP 归为监控项目，未引用具体数值。
- Mastercard：[Rules and compliance programs](https://www.mastercard.com/us/en/business/support/rules.html)。访问：2026-11-03 约 01:02（Asia/Shanghai）。可读页面把 Excessive Chargeback Program (ECP) 列在客户合规计划中，并提供 Mastercard 规则与 Security Rules and Procedures—Merchant Edition 文档入口；用于支持正文将 ECP 归为监控 / 合规项目。
- Mastercard：[Dispute Management](https://www.mastercard.com/us/en/business/cybersecurity-fraud-prevention/dispute-management.html)。访问：2026-11-03 约 01:03（Asia/Shanghai）。页面说明争议处理覆盖支付生命周期，并介绍跟踪、管理和解决争议的服务；用于支持正文将争议处理与名单条件核对分开叙述，不用于支持名单移除条件。

### 延伸阅读

- SeQure Wiki：[Visa VAMP 项目说明](https://wiki.sequre.paymond.me/programs/visa-vamp/)。访问：2026-11-03。用于延伸了解监控项目；不作为 MATCH / VMSS 名单规则来源。
- SeQure Wiki：[Mastercard 监控项目说明](https://wiki.sequre.paymond.me/programs/mastercard-monitoring/)。访问：2026-11-03。用于延伸了解监控项目；不作为 MATCH 名单规则来源。

本文撰写日期：2026-11-03。需要机制细节时，请以当前通知、卡组织规则及实际上报机构的书面说明为准。

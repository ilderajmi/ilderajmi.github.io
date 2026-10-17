+++
title = 'Stripe抗辩最终提交前：哪些记录可以放行，哪些缺口必须先停下'
description = '点下最终提交前，先把案件、材料版本、上传附件、请求记录和回执放在一起核对。本文给出一张放行／停止／核回执决策表，并用八条合成记录演示异常分支。以Stripe官方文档为例。'
date = '2026-10-17T00:45:00+08:00'
draft = false
pageLang = 'zh-CN'
slug = 'dispute-evidence-before-submit'
tags = ['拒付与争议', '跨境支付']
+++

争议主管准备点下「最终提交」时，真正要回答的不是「材料看起来够不够全」，而是三个具体问题：

- 这个案件、已经审过的材料版本、实际要提交的对象，是不是同一套；
- 手上的记录到底证明了暂存、最终提交，还是只说明案件在审理中；
- 如果拿不到回执，下一步应该先核什么，而不是先重试。

这三个问题答错的代价不一样。就文档所述的 Dashboard 正式 response 而言，提交了错版本之后不能再改，也不能再补文件。拿不到回执就反复提交，则可能把「结果未知」变成「重复提交」。

本文把「点提交之前该看哪些记录」整理成一张决策表，并用八条完全合成的记录演示异常分支。合成记录只演示判断方法，不是真实账户行为，也不预判案件结果。

## 先把三种「记录」分开

官方文档（2026-10-03 查阅并保存）说明 Dashboard 的正式应答只有一次提交机会。Stripe 的[Respond to disputes](https://docs.stripe.com/disputes/responding)页面原文是：

> You’ve only one opportunity to submit your response. Stripe immediately forwards your response and all supporting files to the issuing bank. You can’t edit the response or submit additional files, so make sure you’ve assembled all your evidence before you submit.

同一页还要求，勾选提交时要确认理解「your response is final」。这两句限定的是文档所述的 **Submit evidence through the Dashboard** 流程。API、重开或例外情形是否不同，本文不外推。

API 更新证据时，`submit` 参数是另一条线索。Stripe [Update a dispute](https://docs.stripe.com/api/disputes/update) 页面的字段说明（2026-10-11 保存）写的是：

> submit ... Whether to immediately submit evidence to the bank. If false, evidence is staged on the dispute. Staged evidence is visible in the API and Dashboard, and can be submitted to the bank by making another request with this attribute set to true (the default).

这里要分清两种情形：请求里**明确写了** `submit=false`，和**拿不到请求记录**。前者只表示这次请求的意图是暂存，只有拿到对应的成功回执才能确认已经暂存；后者什么也没证明。文档默认值是 `true`，但默认值描述的是参数行为，不等于成功回执。

期限也要按案件核。本文不给出统一天数；实际截止时间以该案通知为准，由案件负责人确认。

## 决策表要收集哪些输入

下表用的记录字段，来自上面两份已保存的官方摘录和本文的编辑设计。它们不是某个平台强制的统一字段，缺值一律保留 null，不填推测值。

- 目标账户与提交路线（Dashboard 或 API）；
- dispute 标识，以及被争议的父 charge 标识；
- 材料包关联的案件（dispute）标识；
- 已审版本与已上传版本；
- 所需附件清单与已上传附件清单；
- 提交执行人的权限是否已确认；
- 当前该案的期限，以及期限确认时点；
- 实际请求记录（若可得，含 `submit` 取值）；
- 请求结果与对应的确认回执；
- 最新争议状态，以及你读到它的时间。

事件时间和观察时间要分开记。「状态变为 `under_review` 的时刻」通常拿不到，保留 null，只写下你观察到它的时间。把两者混成一个时间戳，后面就无法回答「这条状态是什么时候读到的」。

## 最终提交前：放行／停止／核回执决策表

下面八行是本文的核心。先按上节字段收集输入，再逐行判定。表中「待回应」「审理中」分别对应 Stripe 的 `needs_response` 与 `under_review`。六列输出彼此独立：准备项通过，不代表可以再次提交；看到「审理中」，不代表已经胜诉。

| 记录与输入 | 准备项 | 请求意图 | 提交确认 | 争议状态 | 胜负 | 停止／下一动作 |
| --- | --- | --- | --- | --- | --- | --- |
| S1 同案；材料 v2 已审、附件齐全；权限与期限已核；无请求 | 已核 | 未请求 | 未见 | 待回应 | 未知 | 人工最终确认；不得称已提交 |
| S2 同案；冻结 v2，但上传缺 v2 附件 | 停止 | 未请求 | 未见 | 待回应 | 未知 | 停止提交；由案件负责人补齐附件并重核 |
| S3 同案；API 更新成功且明确 submit=false | 已核 | 暂存 | 仅暂存 | 待回应 | 未知 | 保持提交待办；不得当银行收件 |
| S4 同案；请求超时、参数与回执缺失；却看到审理中 | 已核 | 未知 | 未知 | 审理中 | 未知 | 停止盲重试；核请求历史、回执与版本 |
| S5 同案同版本；Dashboard 最终提交已有对应确认 | 已核 | Dashboard | 已确认 | 审理中 | 未知 | 只关该次待办；停止修改或追加该 response |
| S6 材料属 d2，提交目标是 d1，父 charge 相同 | 停止 | 未请求 | 未见 | 待回应 | 未知 | 停止提交；先纠正案件绑定 |
| S7 同案；请求明确省略 submit；超时且无回执 | 已核 | 默认 true | 未知 | 待回应 | 未知 | 默认与成功分开；停止盲重试 |
| S8 权限或实际期限为 null | 停止 | 未请求 | 未见 | 待回应 | 未知 | 停止放行；交有权限负责人核实权限与期限 |

## 几条容易看错的边界

**S4 和 S7 都是「结果未知」，但来源不同。** S4 是请求记录本身拿不到，连意图都无法确认。S7 是请求里明确省略了 `submit`，文档默认值指向 `true`。两者都不能写成提交成功：默认值描述参数行为，回执才描述这一次实际发生了什么。缺回执时，先核同案请求历史、回执和版本，再决定下一步，不自动重试。

**S5 只关闭「这一次提交」的待办。** 当同案同版本的 Dashboard 最终提交已有对应确认，并且文档说提交后不能编辑或追加，那么该做的动作是停止修改或追加这条 response，保留回执，等结果。它不关闭整个案件：胜负仍单列，写「未知」。

**准备项「已核」不等于放行。** S4、S5、S7 的准备项都显示已核，只说明材料、权限、期限这些前置条件齐了。只要存在待确认的请求或未闭合的回执，停止或核回执的动作就优先于准备项。

**`under_review` 只描述观察到的状态。** 它说明此刻读到的案件在审理中，既不等于已胜诉，也不自动证明这一版材料已经提交。

## 表里的标签不是 Stripe 字段

表中「准备项」「请求意图」「提交确认程度」这些列，以及回执字段 `final_submission_ack`、版本关联，都是本文的教学标签，用来固定判断口径。它们**不是** Stripe 的原生字段，也不授权任何程序或本文实际提交。

`null` 保持为空，不要用「默认」「应该」「通常」去填。缺权限就写缺权限，缺期限就写缺期限，交能查看账户记录或该案通知的人补。

## 交接时保留什么

把上表复制进案件交接记录，每一行都带上对象标识和观察时间。然后：

- 缺少提交回执时，提交状态写「未知」，并把「核对同案请求历史、回执与版本」列为下一动作；
- 父 charge 相同但 dispute 不同时，先纠正绑定，不要合并；
- 权限或实际期限为空时，停止放行，交有权限负责人核实，不填统一值；
- 确认该次 Dashboard 最终提交后，停止编辑或追加该 response，保留回执并等待结果。

## 参考来源

以下两份 Stripe 官方页面分别于 2026-10-03 与 2026-10-11 读取并保存。本轮没有重新抓取，页面可能已经更新；文档措辞不代表商户账户的实际版本或行为。

- Stripe：[Respond to disputes](https://docs.stripe.com/disputes/responding)（2026-10-03 保存）——用于「只有一次提交机会」「不能编辑或追加文件」与「response is final」。
- Stripe API：[Update a dispute](https://docs.stripe.com/api/disputes/update)（2026-10-11 保存）——用于 `submit` 参数的暂存语义与默认值。

本文的判断表、八条合成记录、教学标签与停止动作均为编辑设计，不是 Stripe 的规则，也不构成自动重试或提交指令。合成记录不代表任何真实账户、真实请求或案件结果。

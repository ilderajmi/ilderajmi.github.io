标题

别再把 Agent 框架混为一谈：6 种 Harness / Runtime 路线，一次看懂

正文

这两年，Agent 相关项目越来越多。

但很多人一上来就容易犯一个错：
把不同层级的东西，放在一起比较。

看起来都在做 Agent，实际上它们的定位完全不一样：

有的是企业级应用框架，
有的是通用 runtime 基座，
有的是直接可用的产品，
有的是围绕 Codex CLI 的工作流层，
有的是 skills / plugin 资产层，
还有的是 autonomous repo 的样板工程。

所以，真正该问的不是“谁更强”，而是：

它到底在哪一层？解决什么问题？适合什么场景？

这篇文章，就把这 6 类路线讲清楚。

⸻

一、先看全局：这 6 个东西，不是同一类

可以先用一句话理解它们：
	•	Microsoft Agent Framework：企业级 Agent 应用框架
	•	OpenHarness：开源通用 harness / runtime 基座
	•	Goose：本地优先、可扩展、可直接使用的 Agent runtime / 产品
	•	oh-my-codex（OMX）：Codex CLI 的 workflow layer
	•	compound-engineering-plugin（CEP）：skills / plugin 资产层
	•	claw-code：autonomous repo ops 的样板工程

说白了：

有人在搭底座，有人在做产品，有人在做流程，有人在沉淀资产，还有人在拿具体工程证明这套东西能跑。

⸻

二、6 种路线分别在做什么？

1. Microsoft Agent Framework：企业级框架

它更像是“企业做 Agent 应用的平台框架”。

关注点不是单个 Agent 好不好用，
而是：
	•	怎么编排多个 Agent
	•	怎么接企业系统
	•	怎么治理、监控、维护
	•	怎么把 Agent 当正式应用来建设

适合大团队、复杂业务、对治理要求高的场景。

⸻

2. OpenHarness：通用基座

它更像 Agent 世界里的“底盘”。

重点不在最终用户体验，
而在于把共性的 runtime 能力抽出来，比如：
	•	任务执行
	•	工具接入
	•	状态管理
	•	调度与扩展

适合想自己做上层系统、但不想从零造 runtime 的团队。

⸻

3. Goose：可直接上手的 runtime 产品

Goose 的特点很明确：
	•	本地优先
	•	可扩展
	•	可接不同 LLM
	•	可通过 MCP / Extensions 扩能力

它不是纯框架，而是更偏“装上就能用”的产品型 runtime。

如果你想快速落地、快速验证、快速开始，
Goose 这种路线会更顺手。

⸻

4. oh-my-codex（OMX）：工作流层

OMX 不是在做底层 runtime，
它更像围绕 Codex CLI 的一层 workflow。

它解决的是：

如何把开发者日常使用 Codex CLI 的方式，整理成更顺手、更高效的流程。

所以它的价值在于效率提升，而不是大而全的平台建设。

适合已经在 Codex CLI 生态里的人。

⸻

5. CEP：能力资产层

很多团队做 Agent，前几个 Demo 很快，
但越往后越发现：能力都在重复搭。

这时候，skills / plugin 层就很重要。

CEP 这类路线解决的是：

怎么把能力沉淀成插件和资产，持续复用。

它决定的不是“能不能做出来”，
而是“做出来的东西能不能形成复利”。

⸻

6. claw-code：样板工程

claw-code 更像一个 showcase。

它不是先追求大抽象，
而是先用一个具体仓库，把 autonomous repo ops 跑通。

它的价值很直接：
	•	让团队看到 Agent 如何参与 repo 运作
	•	让自动化开发不只停留在概念
	•	给别人一个可参考、可拆解的样板

很多时候，组织最缺的不是理论，而是第一个跑通的案例。

⸻

三、怎么比较这 6 类路线？

最重要的一点：

不要比“谁更强”，要比“谁站在哪一层”。

大致可以这样理解：
	•	框架层：Microsoft Agent Framework
	•	基座层：OpenHarness
	•	产品层：Goose
	•	工作流层：OMX
	•	资产层：CEP
	•	样板层：claw-code

这不是替代关系，
而是分工关系。

你可以把它理解成：
	•	有人在修路
	•	有人在造车
	•	有人在教你怎么开
	•	有人在做零部件库
	•	有人在建样板房

⸻

四、不同场景，怎么选？

如果你是企业，要做正式 Agent 应用

看 Microsoft Agent Framework。
因为你需要的是治理、编排和系统化建设能力。

如果你想搭自己的 Agent 底座

看 OpenHarness。
因为你需要的是 runtime 基建，而不是现成产品。

如果你想快速上手，最好本地优先

看 Goose。
因为它更接近“今天装上，明天就能跑”。

如果你已经在 Codex CLI 生态里

看 OMX。
因为它解决的是工作流问题。

如果你们能力很多，但越来越散

看 CEP。
因为它解决的是沉淀和复用问题。

如果你想找一个 repo automation 参考样板

看 claw-code。
因为它最适合拿来做示范和落地参考。

⸻

五、最容易踩的坑

很多人不是不会选，
而是一开始就选错了比较维度。

常见误区只有一句话：

明明在选“层”，却以为自己在选“工具”。

比如：
	•	把框架当成开箱即用产品
	•	把 runtime 当成完整方法论
	•	把 workflow layer 当成平台底座
	•	忽视 plugin / skills 资产层
	•	看不起 showcase，但组织偏偏最缺第一个样板

这些坑，本质上都不是技术问题，
而是认知问题。

⸻

六、最后一句话讲透

这 6 条路线，真正反映的是 Agent 生态正在分层。

有人做企业框架，
有人做通用基座，
有人做产品化 runtime，
有人做 workflow，
有人做资产沉淀，
有人做工程样板。

所以，真正拉开差距的，不是你知道多少名字，
而是你能不能一眼看出：

谁在搭底座，谁在做产品，谁在沉淀方法，谁在验证未来的工程组织方式。
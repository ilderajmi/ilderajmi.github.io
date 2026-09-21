+++
date = '2026-04-06T09:00:00+08:00'
draft = false
pageLang = 'zh-CN'
title = '别再把 Agent 框架混为一谈：6 种 Harness / Runtime 路线，一次看懂'
description = '把 Microsoft Agent Framework、OpenHarness、Goose、OMX、compound-engineering-plugin、claw-code 放到同一张地图上，先分层，再选型。'
tags = ['AI代理', '开发工具', 'Harness', 'Runtime']

[[alternates]]
  lang = 'en'
  url = '/posts/6-layers-of-harness-en/'
[[alternates]]
  lang = 'zh-CN'
  url = '/posts/6-layers-of-harness-zh/'
[[alternates]]
  lang = 'x-default'
  url = '/posts/6-layers-of-harness-en/'
+++

最近，Agent 相关项目越来越多，但最容易吵起来的地方，不是模型，而是层级。

你看着都像“Agent 工具”，其实有人在搭企业框架，有人在做可组合的 harness，有人在卖能直接上手的本地 runtime，有人在给 Codex CLI 套流程，有人在沉淀 skills / plugin 资产，还有人在拿一个真实仓库证明 harness 真的能跑起来。

先说清楚一件事：下面这 6 层不是某个公开标准。我是根据公开资料，把它们按“位置”重新摆了一次。

English version: [Stop Mixing Up Agent Frameworks: 6 Harness / Runtime Paths, Explained](/posts/6-layers-of-harness-en/)

## 先把 6 层说清楚

- `Microsoft Agent Framework`：企业级 agent 应用框架，重点是编排、状态、工作流和治理。
- `OpenHarness`：code-first 的可组合 harness SDK，重点是把 agent 的原语拆开。
- `Goose`：可扩展、可直接上手的开源 AI agent，更偏本地和产品化。
- `oh-my-codex / OMX`：围绕 Codex CLI 的 workflow layer，负责把执行变成流程。
- `compound-engineering-plugin`：skills / plugin 资产层，负责把经验沉淀成可复用能力。
- `claw-code`：更像 harness/reference implementation，不是简单 demo，而是一个把 harness 逻辑跑到底的样板。

## 这 6 层分别代表什么方法

### 1. Microsoft Agent Framework

它代表的是一种很现实的做法：把 agent 当正式应用来做，而不是当“会聊天的脚本”。

公开资料里最核心的几个词很明确，agents、workflows、state、middleware、MCP、integrations。也就是说，它关心的不是“单个 agent 能不能答”，而是“多个 agent 怎么编排、怎么接企业系统、怎么留下状态、怎么可审计”。

如果你在做的是企业应用、权限边界清楚、流程复杂、还要考虑治理，这一层最像你要的东西。

### 2. OpenHarness

OpenHarness 的思路更干脆：不要把 harness 做成黑盒，把它拆成原语。

它强调的是 stateless agent、session、middleware、subagents、tool permissions、MCP、skills、AGENTS.md。换句话说，它不是替你做完产品，而是给你一套可以自己拼装的零件。

这条路适合想自己掌控所有层的团队。你要的是底层能力，不是被一个现成产品的节奏绑住。

### 3. Goose

Goose 代表的是另一种路线：先把东西做成一个能用的产品，再谈架构哲学。

官方说得很直白，它是一个可扩展的开源 AI agent，支持桌面端、CLI、任意 LLM，还有 MCP 扩展。它更像你今天装上，明天就能开始干活的工具。

如果你想快速落地，或者你更在意“本地优先、能跑、能扩、能接工具”，Goose 这条路很顺。

### 4. oh-my-codex / OMX

OMX 不是在做执行引擎，它是在 Codex CLI 外面加一层章法。

它把常见工作流做成 `$deep-interview`、`$plan`、`$team`、`$ralph` 这类入口，再把计划、日志、状态放进 `.omx/`。它的价值不是“再造一个 Codex”，而是让 Codex 更像一个有组织的开发系统。

如果你已经深度在 Codex CLI 生态里，这层最像“外挂大脑”。不是更花哨，是更稳。

### 5. compound-engineering-plugin

这一层解决的是复利问题。

很多团队做 agent，Demo 很快，后面却总在重复造轮子。plugin / skills 层的意义，就是把好的提示、角色、命令、流程和经验沉下来，变成以后能直接复用的资产。

Every 的 compound engineering 文章里有个很实在的判断：80% 在 planning 和 review，20% 在 execution。这个插件体系就是把这种判断固化下来。

### 6. claw-code

claw-code 最值得看的地方，不是“它很火”，而是它把 harness 这件事做成了一个真实、可复盘的仓库。

公开文档把它描述成 Claude Code agent harness runtime 的 Python rewrite，包含 tool routing、session management、command orchestration、parity auditing。它不是“一个聪明的 demo”，而是一个能让你看到 harness 怎么长出来的参考实现。

这类项目的价值很直接：组织最缺的，往往不是概念，而是第一个跑通的样板。

## 怎么选，不要先问“谁更强”

先看你的起点。

- 你要做企业级正式应用，优先看 `Microsoft Agent Framework`。
- 你要自己搭一套 harness 原语，优先看 `OpenHarness`。
- 你要一个今天就能装、能扩、能接 MCP 的本地工具，优先看 `Goose`。
- 你已经在 Codex CLI 里工作，想把流程稳定下来，优先看 `OMX`。
- 你想把团队经验变成可复用资产，优先看 `compound-engineering-plugin`。
- 你想找一个真实仓库，理解 harness 怎么被工程化，优先看 `claw-code`。

但现实里，大多数项目不会只选一个。

更常见的组合是：

- 用框架层定义边界；
- 用 harness SDK 搭执行原语；
- 用 workflow layer 管住节奏；
- 用 skills / plugin 层沉淀复用；
- 用一个 reference repo 逼自己把细节跑通。

这才是 harness engineering 的真相。不是一把梭，也不是谁取代谁，而是每一层各干各的活。

## 参考来源

### 官方来源

- [OpenAI: Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)
- [Microsoft Learn: Microsoft Agent Framework overview](https://learn.microsoft.com/en-us/agent-framework/overview/)
- [GitHub: microsoft/agent-framework](https://github.com/microsoft/agent-framework)
- [OpenHarness 官网](https://www.open-harness.dev/)
- [OpenHarness 文档](https://docs.open-harness.dev/)
- [GitHub: MaxGfeller/open-harness](https://github.com/MaxGfeller/open-harness)
- [Goose 官网](https://block.github.io/goose/)
- [Goose Quickstart](https://block.github.io/goose/docs/quickstart/)
- [GitHub: block/goose](https://github.com/block/goose)
- [oh-my-codex 官网](https://yeachan-heo.github.io/oh-my-codex-website/)
- [GitHub: Yeachan-Heo/oh-my-codex](https://github.com/Yeachan-Heo/oh-my-codex)
- [GitHub: EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin)
- [GitHub: ultraworkers/claw-code](https://github.com/ultraworkers/claw-code)
- [Claw Code 文档](https://www.mintlify.com/instructkr/claw-code/introduction)

### 相关报道 / 深度文章

- [Every: Compound Engineering Camp: Every Step, From Scratch](https://every.to/source-code/compound-engineering-camp-every-step-from-scratch)
- [Block: Introducing codename goose](https://block.github.io/goose/blog/2025/01/28/introducing-codename-goose)
- [Block: How We Use goose to Maintain goose](https://block.github.io/goose/blog/2025/12/28/goose-maintains-goose/)
- [Repo Explainer: instructkr/claw-code](https://repo-explainer.com/instructkr/claw-code/)

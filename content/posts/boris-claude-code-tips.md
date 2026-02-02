+++
date = '2026-02-02T14:00:00+08:00'
draft = false
title = 'Claude Code 创建者怎么用自己的工具：Boris Cherny 的 13 条实践'
description = 'Boris Cherny 是 Anthropic 的 Claude Code 创建者。他最近分享了自己的日常工作流：5个并行终端、Opus 4.5、团队共享的 CLAUDE.md，以及"验证是最重要的"这个核心观点。'
tags = ['AI Agent', '开发工具', 'Claude Code']
+++

![Boris Cherny 的 Claude Code 使用指南](/posts/image/boris-claude-code/howboris-intro.png)

2026 年 1 月初，Boris Cherny 在 Twitter 上发了个帖子，标题很朴素："我是 Boris，我创建了 Claude Code。很多人问我怎么用它，所以我想展示一下我的配置。"

接下来的 13 条推文，让很多人意外。

Boris 的配置出乎意料地"普通"。他没有复杂的自定义脚本，没有神秘的隐藏功能。他的核心观点是：Claude Code 开箱即用就很好，没有唯一正确的使用方式，Claude Code 团队里每个人的用法都不一样。

但"普通"不代表没有干货。以下是 Boris 分享的实践，按我的理解重新整理。

## 并行处理：不是 1 个，是 15 个以上

![并行运行多个 Claude 实例](/posts/image/boris-claude-code/howboris-parallel.png)

Boris 同时运行大约 15 个以上的 Claude 实例：

- 终端里 5 个 Claude Code，用 iTerm2 的 tab 编号 1-5，配置系统通知知道哪个需要输入
- 浏览器里 5-10 个 claude.ai/code 会话
- 手机上用 Claude iOS app 启动任务，之后在电脑上接手

关键细节：5 个终端实例跑在 5 个独立的 git checkout 上，这样 Claude 可以并行修改代码而不冲突。

用 `&` 命令或 `--teleport` 可以在本地和 web 之间切换。早上在手机上启动一个任务，下午在电脑上继续。

## 模型选择：Opus 4.5 with thinking

Boris 用 Opus 4.5 加 thinking 模式做所有事。他的理由是：

> "虽然 Opus 比 Sonnet 更大更慢，但因为你需要更少的引导，它的工具使用也更好，最终几乎总是比用小模型更快。"

这个观点值得注意：更大的模型不等于更慢的总体效率。减少来回沟通的时间，可能比模型推理时间更重要。

## CLAUDE.md：团队的共享记忆

![CLAUDE.md 团队共享文档](/posts/image/boris-claude-code/howboris-claudemd.png)

Claude Code 团队维护一个 `CLAUDE.md` 文件，检入 git。整个团队每周贡献多次。规则很简单：

**每次发现 Claude 做错了什么，就加到 CLAUDE.md 里。**

这样 Claude 下次就知道不要这样做。这是 Boris 所说的"复合工程"(Compounding Engineering)——借用 Dan Shipper 的概念——通过持续积累学习，让 Claude 越用越好。

在代码审查时，团队会在 PR 上 tag `@.claude`，让 Claude 自动把学习内容更新到 CLAUDE.md。这用的是 Claude Code GitHub Action（`/install-github-action`）。

一个真实例子：代码审查中有人评论"不要用 TypeScript enum，用字符串字面量联合类型"，然后 tag @.claude。Claude 就会提交一个更新，在 CLAUDE.md 里加上这条规则。

## Plan 模式：先想清楚再动手

大多数会话从 Plan 模式开始（Shift+Tab 两次）。Boris 会和 Claude 反复讨论计划，直到满意。然后切换到自动接受编辑模式，让 Claude 一次性完成。

> "好的计划真的很重要。"

这是个简单的道理，但很多人会跳过。先花时间把计划迭代清楚，后面的执行会顺利得多。

## Slash 命令：内循环自动化

Boris 给高频工作流创建 slash 命令。比如 `/commit-push-pr`，他和 Claude 每天要用几十次。

命令存在 `.claude/commands/` 目录，检入 git，团队共享。命令里可以嵌入 bash 来预计算信息（比如 git status），减少和模型的来回。

## Subagents：PR 工作流自动化

Boris 把 subagents 看作"最常见 PR 工作流的自动化"。他用的几个例子：

- `code-simplifier` — Claude 完成工作后简化代码
- `verify-app` — 端到端测试的详细指令

Subagents 定义在 `.claude/agents/` 目录。

## Hooks：自动格式化

团队用 `PostToolUse` hook 自动格式化 Claude 生成的代码。Claude 90% 的时候生成格式正确的代码，hook 处理剩下 10%，避免 CI 失败。

```json
"PostToolUse": [
  {
    "matcher": "Write|Edit",
    "hooks": [
      {"type": "command", "command": "bun run format || true"}
    ]
  }
]
```

## 权限管理：预授权而非跳过

Boris 不用 `--dangerously-skip-permissions`。他用 `/permissions` 预授权已知安全的命令，避免不必要的权限提示。

这些配置存在 `.claude/settings.json`，检入 git，团队共享。

## 工具集成：让 Claude 用你的工具

Claude Code 可以使用 Boris 的各种工具：

- 通过 MCP 服务器搜索和发送 Slack 消息
- 用 bq CLI 跑 BigQuery 查询
- 从 Sentry 抓错误日志

MCP 配置存在 `.mcp.json`，检入 git。

## 长时间任务：不要让 Claude 卡住

对于运行很长的任务，Boris 的做法：

- 提示 Claude 完成后用后台 agent 验证
- 用 agent Stop hook 做更确定性的检查
- 用 ralph-wiggum 插件（社区创意）

在沙盒环境里，他会用 `--permission-mode=dontAsk` 或 `--dangerously-skip-permissions` 避免被权限提示阻塞。

## 验证：最重要的一条

![验证是最重要的](/posts/image/boris-claude-code/howboris-verify.png)

这是 Boris 强调的核心：

> "让 Claude 产出优秀结果最重要的一件事——给 Claude 一种验证自己工作的方法。如果 Claude 有这个反馈循环，最终结果的质量会提高 2-3 倍。"

他自己的例子：每一个发布到 claude.ai/code 的改动，Claude 都会用 Chrome 扩展打开浏览器，测试 UI，迭代直到代码能用、体验也好。

验证在不同领域有不同形式：跑一个 bash 命令、跑测试套件、在浏览器或手机模拟器里测试。关键是给 Claude 一个闭环。

---

## 配置文件速查

根据 Boris 分享的内容，Claude Code 的配置文件可以分为两类：

### 项目级（检入 git，团队共享）

| 文件/目录 | 用途 |
|----------|------|
| `CLAUDE.md` | 项目规则、最佳实践、错误记录 |
| `.claude/commands/` | Slash 命令定义 |
| `.claude/agents/` | Subagents 定义 |
| `.claude/settings.json` | 权限配置 |
| `.mcp.json` | MCP 服务器配置 |

### 全局/个人级

| 配置 | 说明 |
|------|------|
| 终端配置 | iTerm2 通知、tab 编号习惯 |
| 模型偏好 | Opus 4.5 with thinking（个人选择） |
| 工作流习惯 | 并行实例数量、Plan 模式使用 |

---

## Boris 的核心感悟

1. **没有唯一正确的方式** — Claude Code 团队每个人用法都不同，工具设计本身就支持你按自己的方式使用和定制
2. **更大的模型可能更快** — 减少引导 + 更好的工具使用 = 总体更快，不要只看推理速度
3. **好的计划真的很重要** — 别跳过 Plan 模式，花时间把计划迭代清楚
4. **验证是最重要的** — 给 Claude 反馈循环，质量提升 2-3 倍
5. **复合工程** — 把错误和学习持续积累到 CLAUDE.md，让 Claude 越用越好

---

## 附录：把 Boris 的建议变成规则文件

看完 Boris 的分享，你可能想把这些实践整理成一个 CLAUDE.md 或项目规则。下面是一个常见的尝试和优化版本的对比。

### 原始版本

这是一个基于 Boris 建议整理的规则文件：

![原始规则文件](/posts/image/boris-claude-code/original-rules.png)

这个版本覆盖了几个核心点：Plan 模式、Subagent 策略、自我改进循环、验证。但有几个问题：

**缺少的关键实践：**
- Hooks（自动格式化）
- 权限预授权策略
- Slash 命令
- Boris 说"验证可以 2-3x 提升质量"这个具体数字没体现

**可以精简的地方：**
- Task Management 部分有些冗余
- "Demand Elegance"和"Autonomous Bug Fixing"是好的补充，但和 Boris 的原意有偏差

### 优化版本

根据 Boris 的建议重新整理：

![优化版规则文件](/posts/image/boris-claude-code/optimized-rules-rayso.png)

主要改进：
1. **验证提到最前面**，强调"2-3x 质量提升"
2. **加入 Slash 命令和 Hooks** 这两个 Boris 明确提到的实践
3. **Self-Improvement Loop 改名为 Compounding Engineering**，更贴近 Boris 的原话
4. **精简 Core Principles**，突出三个最重要的点

你可以根据自己的项目情况调整这个模板。记住 Boris 说的：没有唯一正确的方式。

---

**参考来源**

- [Boris Cherny 的原始 Twitter 帖子](https://x.com/bcherny/status/2007179832300581177)
- [howborisusesclaudecode.com](https://howborisusesclaudecode.com/) — 社区整理的完整版
- [Claude Code 官方文档](https://code.claude.com/docs)

*本文撰写于 2026 年 2 月 2 日。*

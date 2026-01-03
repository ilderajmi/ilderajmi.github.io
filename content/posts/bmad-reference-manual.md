+++
date = '2026-01-04T00:00:00+08:00'
draft = false
title = '用 BMAD 打造你的 AI 开发团队'
tags = ['BMAD', 'AI代理', '开发工具']
+++

最近在折腾 Cursor 的 AI 代理系统，发现了一个叫 [BMAD](https://github.com/bmad-code-org/BMAD-METHOD) 的项目，简单说就是一套用 AI 代理组成的"虚拟开发团队"。用了一段时间感觉挺有意思，在这里记录一下。

## 什么是 BMAD

BMAD（Build Me A Dream）本质上是一个 AI 代理框架，你可以在 Cursor 里通过 `@` 符号调用不同的"虚拟同事"来帮你完成各种开发任务。它把软件开发流程拆分成不同的角色，比如产品经理、架构师、开发者、测试等等，每个角色都有一个专门的 AI 代理负责。

目前已安装的模块有：
- **Core** - 核心模块
- **BMM** - 敏捷开发模块
- **BMB** - 构建器模块
- **BMGD** - 游戏开发模块
- **CIS** - 创意套件模块

## 基本用法

在 Cursor 聊天中用 `@` 引用：

```
@bmad/core/agents/bmad-master        # 通用助手
@bmad/bmm/workflows/quick-dev        # 快速开发
@bmad/bmm/workflows/create-prd       # 创建产品需求文档
```

## 我常用的几个代理

### 日常开发

- **Barry** (`@bmad/bmm/agents/quick-flow-solo-dev`) - 处理快速开发任务，从规格到实现一把梭
- **Amelia** (`@bmad/bmm/agents/dev`) - 严格按照验收标准写代码
- **Winston** (`@bmad/bmm/agents/architect`) - 架构设计，分布式系统、云基础设施这些

### 规划阶段

- **John** (`@bmad/bmm/agents/pm`) - 产品经理，擅长需求发现和用户访谈
- **Mary** (`@bmad/bmm/agents/analyst`) - 商业分析师，市场研究和竞品分析
- **Sally** (`@bmad/bmm/agents/ux-designer`) - UX 设计师

### 创意相关

- **Carson** (`@bmad/cis/agents/brainstorming-coach`) - 头脑风暴专家
- **Maya** (`@bmad/cis/agents/design-thinking-coach`) - 设计思维流程
- **Sophia** (`@bmad/cis/agents/storyteller`) - 故事叙述，写文案什么的

## 常用工作流

日常开发其实就两个工作流最常用：

```
@bmad/bmm/workflows/quick-dev        # 小功能、Bug 修复
@bmad/bmm/workflows/create-tech-spec # 写技术规格
```

如果要正经做一个项目，完整流程大概是：

```
workflow-init → create-product-brief → create-prd →
create-architecture → create-epics-and-stories → dev-story
```

不过说实话，我大部分时候还是直接 `quick-dev` 走起，毕竟主要是写点小工具和脚本。

## 游戏开发模块

BMAD 还有个游戏开发模块（BMGD），如果你用 Unity 或 Unreal 做游戏，里面有几个挺有意思的角色：

- **Indie** (`@bmad/bmgd/agents/game-solo-dev`) - 独立游戏开发者，全流程专家
- **Samus Shepard** (`@bmad/bmgd/agents/game-designer`) - 游戏设计师
- **Cloud Dragonborn** (`@bmad/bmgd/agents/game-architect`) - 游戏架构师

我还没机会试这个模块，等下次做游戏项目的时候再体验。

## 一些想法

用了一段时间，感觉这套东西确实能提高效率。但也不是银弹，有些时候直接让 Claude 自己干反而更快。我觉得它的价值主要在于：

1. **流程规范化** - 按照敏捷开发的流程来，不容易漏掉东西
2. **角色分离** - 不同角色有不同视角，比一个 AI 包揽一切更有针对性
3. **可复用** - 工作流可以重复使用，形成自己的开发模式

不过如果你就是写个脚本或者改个 bug，直接上就完了，没必要搞这么复杂。

## 资源链接

- [BMAD GitHub](https://github.com/bmad-code-org/BMAD-METHOD)
- 版本: v6.0.0-alpha.22

---

如果你也在用 Cursor，可以试试 BMAD，说不定会给你带来一些启发。

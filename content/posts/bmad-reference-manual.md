+++
date = '2026-01-04T00:00:00+08:00'
draft = false
title = 'BMAD 代理与工作流参考手册'
tags = ['BMAD', '工作流', 'AI代理']
+++

# BMAD 代理与工作流参考手册

> 📅 生成日期: 2026-01-01
> 📦 版本: v6.0.0-alpha.22
> 🔧 已安装模块: Core, BMM, BMB, BMGD, CIS

---

## 目录

- [快速开始](#快速开始)
- [使用方法](#使用方法)
- [代理列表](#代理列表)
  - [Core 核心模块](#core-核心模块)
  - [BMM 敏捷开发模块](#bmm-敏捷开发模块)
  - [BMB 构建器模块](#bmb-构建器模块)
  - [BMGD 游戏开发模块](#bmgd-游戏开发模块)
  - [CIS 创意套件模块](#cis-创意套件模块)
- [工作流列表](#工作流列表)
- [输出文件位置](#输出文件位置)
- [推荐工作流程](#推荐工作流程)

---

## 快速开始

```
# 项目初始化（推荐首先执行）
@bmad/bmm/workflows/workflow-init

# 快速开发小功能/Bug修复
@bmad/bmm/workflows/quick-dev

# 创建产品需求文档
@bmad/bmm/workflows/create-prd

# 与通用助手对话
@bmad/core/agents/bmad-master
```

---

## 使用方法

在 Cursor 聊天中使用 `@` 符号引用代理或工作流：

```
# 引用代理
@bmad/{模块}/agents/{代理名}

# 引用工作流
@bmad/{模块}/workflows/{工作流名}

# 引用整个模块
@bmad/{模块}

# 引用索引
@bmad/index
```

---

## 代理列表

### Core 核心模块

| 代理 | 名称 | 引用命令 | 角色说明 |
|------|------|----------|----------|
| 🧙 BMad Master | BMad Master | `@bmad/core/agents/bmad-master` | 通用任务执行器 + BMAD 专家 + 工作流协调者。掌握所有资源、任务和工作流的综合知识。 |

---

### BMM 敏捷开发模块

| 代理 | 名称 | 引用命令 | 角色说明 |
|------|------|----------|----------|
| 📊 Analyst | Mary | `@bmad/bmm/agents/analyst` | 商业分析师。擅长市场研究、竞品分析、需求提取。将模糊需求转化为可执行规格。 |
| 🏗️ Architect | Winston | `@bmad/bmm/agents/architect` | 系统架构师。擅长分布式系统、云基础设施、API 设计。专注可扩展模式和技术选型。 |
| 💻 Developer | Amelia | `@bmad/bmm/agents/dev` | 高级软件工程师。严格按照验收标准执行已批准的故事，遵循红-绿-重构循环。 |
| 📋 PM | John | `@bmad/bmm/agents/pm` | 产品经理。8年+经验，擅长用户访谈、需求发现、利益相关者协调。不断追问"为什么"。 |
| 🚀 Quick Flow Solo Dev | Barry | `@bmad/bmm/agents/quick-flow-solo-dev` | 快速流程专家。处理从技术规格到实现的全流程，最小仪式，精益产出。 |
| 🏃 Scrum Master | Bob | `@bmad/bmm/agents/sm` | 技术型 Scrum Master。擅长敏捷仪式、故事准备、创建清晰可执行的用户故事。 |
| 🧪 Test Architect | Murat | `@bmad/bmm/agents/tea` | 测试架构师。专注 CI/CD、自动化框架、可扩展质量门禁。基于风险的测试策略。 |
| 📚 Tech Writer | Paige | `@bmad/bmm/agents/tech-writer` | 技术文档专家。精通 CommonMark、DITA、OpenAPI。将复杂概念转化为易读文档。 |
| 🎨 UX Designer | Sally | `@bmad/bmm/agents/ux-designer` | 用户体验设计师。7年+经验，擅长用户研究、交互设计、AI 辅助工具。 |

---

### BMB 构建器模块

| 代理 | 名称 | 引用命令 | 角色说明 |
|------|------|----------|----------|
| 🤖 Agent Builder | Bond | `@bmad/bmb/agents/agent-builder` | 代理构建专家。精通代理设计模式、人格开发、BMAD Core 合规性。 |
| 🏗️ Module Builder | Morgan | `@bmad/bmb/agents/module-builder` | 模块创建大师。全面了解 BMAD Core 系统、集成模式、端到端模块开发。 |
| 🔄 Workflow Builder | Wendy | `@bmad/bmb/agents/workflow-builder` | 工作流构建大师。擅长流程设计、状态管理、工作流优化。 |

---

### BMGD 游戏开发模块

| 代理 | 名称 | 引用命令 | 角色说明 |
|------|------|----------|----------|
| 🏛️ Game Architect | Cloud Dragonborn | `@bmad/bmgd/agents/game-architect` | 首席游戏系统架构师。20年+经验，发布30+游戏。擅长分布式系统、引擎设计、多人架构。 |
| 🎲 Game Designer | Samus Shepard | `@bmad/bmgd/agents/game-designer` | 主游戏设计师。15年+经验，擅长机制设计、玩家心理、叙事设计、系统思维。 |
| 🕹️ Game Developer | Link Freeman | `@bmad/bmgd/agents/game-dev` | 高级游戏开发者。精通 Unity、Unreal、自定义引擎。10年跨平台发布经验。 |
| 🧪 Game QA | GLaDOS | `@bmad/bmgd/agents/game-qa` | 游戏QA架构师。12年+游戏测试经验。擅长自动化测试、性能分析。 |
| 🎯 Game Scrum Master | Max | `@bmad/bmgd/agents/game-scrum-master` | 游戏开发 Scrum Master。擅长协调多学科团队，将 GDD 转化为可执行故事。 |
| 🎮 Game Solo Dev | Indie | `@bmad/bmgd/agents/game-solo-dev` | 精英独立游戏开发者。从概念到发布的全流程专家。精通 Unity、Unreal、Godot。 |

---

### CIS 创意套件模块

| 代理 | 名称 | 引用命令 | 角色说明 |
|------|------|----------|----------|
| 🧠 Brainstorming Coach | Carson | `@bmad/cis/agents/brainstorming-coach` | 精英头脑风暴专家。20年+引导突破性会议经验。擅长创意技术和系统创新。 |
| 🔬 Creative Problem Solver | Dr. Quinn | `@bmad/cis/agents/creative-problem-solver` | 问题解决大师。擅长 TRIZ、约束理论、系统思维。前航空航天工程师。 |
| 🎨 Design Thinking Coach | Maya | `@bmad/cis/agents/design-thinking-coach` | 设计思维大师。15年+经验，擅长共情映射、原型制作、用户洞察。 |
| ⚡ Innovation Strategist | Victor | `@bmad/cis/agents/innovation-strategist` | 颠覆性创新先知。构建过十亿美元级转型。擅长 JTBD、蓝海战略。前麦肯锡顾问。 |
| 🎨 Presentation Master | Caravaggio | `@bmad/cis/agents/presentation-master` | 视觉传达专家。分析过数千个成功演示。擅长视觉层次、受众心理、信息设计。 |
| 📖 Storyteller | Sophia | `@bmad/cis/agents/storyteller` | 故事大师。50年+新闻、编剧、品牌叙事经验。擅长情感心理和受众参与。 |

---

## 工作流列表

### Core 核心工作流

| 工作流 | 引用命令 | 说明 |
|--------|----------|------|
| brainstorming | `@bmad/core/workflows/brainstorming` | 使用多种创意技术和构思方法进行交互式头脑风暴 |
| party-mode | `@bmad/core/workflows/party-mode` | 协调所有已安装 BMAD 代理的群组讨论，启用多代理对话 |

---

### BMM 敏捷开发工作流

#### 📊 第一阶段：分析

| 工作流 | 引用命令 | 说明 |
|--------|----------|------|
| create-product-brief | `@bmad/bmm/workflows/create-product-brief` | 通过协作式逐步发现创建综合产品简报 |
| research | `@bmad/bmm/workflows/research` | 使用当前网络数据进行市场、技术、领域等多维度研究 |

#### 📝 第二阶段：规划

| 工作流 | 引用命令 | 说明 |
|--------|----------|------|
| create-prd | `@bmad/bmm/workflows/create-prd` | 通过协作式逐步发现创建综合 PRD（产品需求文档） |
| create-ux-design | `@bmad/bmm/workflows/create-ux-design` | 与 UX 设计专家协作规划应用的 UX 模式和外观 |

#### 🏗️ 第三阶段：方案设计

| 工作流 | 引用命令 | 说明 |
|--------|----------|------|
| create-architecture | `@bmad/bmm/workflows/create-architecture` | 协作式架构决策引导，产出决策导向的架构文档 |
| create-epics-and-stories | `@bmad/bmm/workflows/create-epics-and-stories` | 将 PRD 和架构转化为按用户价值组织的综合故事 |
| check-implementation-readiness | `@bmad/bmm/workflows/check-implementation-readiness` | 实施前验证 PRD、架构、史诗和故事的完整性和一致性 |

#### ⚡ 第四阶段：实施

| 工作流 | 引用命令 | 说明 |
|--------|----------|------|
| sprint-planning | `@bmad/bmm/workflows/sprint-planning` | 生成和管理 Sprint 状态跟踪文件 |
| sprint-status | `@bmad/bmm/workflows/sprint-status` | 汇总 sprint-status.yaml，显示风险，路由到正确的实施工作流 |
| create-story | `@bmad/bmm/workflows/create-story` | 从史诗+故事创建下一个用户故事 |
| dev-story | `@bmad/bmm/workflows/dev-story` | 执行故事：实现任务、编写测试、验证、更新故事文件 |
| code-review | `@bmad/bmm/workflows/code-review` | 对抗性高级开发者代码评审，每个故事找出 3-10 个问题 |
| correct-course | `@bmad/bmm/workflows/correct-course` | 在 Sprint 执行期间导航重大变更 |
| retrospective | `@bmad/bmm/workflows/retrospective` | 史诗完成后进行回顾，提取经验教训 |

#### 🚀 快速流程

| 工作流 | 引用命令 | 说明 |
|--------|----------|------|
| create-tech-spec | `@bmad/bmm/workflows/create-tech-spec` | 对话式规格工程 - 提问、调查代码、产出实施就绪的技术规格 |
| quick-dev | `@bmad/bmm/workflows/quick-dev` | 灵活开发 - 执行技术规格或直接指令，可选规划 |

#### 🧪 测试架构

| 工作流 | 引用命令 | 说明 |
|--------|----------|------|
| testarch-framework | `@bmad/bmm/workflows/testarch-framework` | 初始化生产就绪测试框架（Playwright 或 Cypress） |
| testarch-test-design | `@bmad/bmm/workflows/testarch-test-design` | 双模式：系统级可测试性评审或史诗级测试规划 |
| testarch-atdd | `@bmad/bmm/workflows/testarch-atdd` | 实施前生成失败的验收测试（TDD 红-绿-重构） |
| testarch-automate | `@bmad/bmm/workflows/testarch-automate` | 扩展测试自动化覆盖范围 |
| testarch-ci | `@bmad/bmm/workflows/testarch-ci` | 搭建 CI/CD 质量流水线 |
| testarch-nfr | `@bmad/bmm/workflows/testarch-nfr` | 评估非功能需求（性能、安全、可靠性） |
| testarch-test-review | `@bmad/bmm/workflows/testarch-test-review` | 评审测试质量 |
| testarch-trace | `@bmad/bmm/workflows/testarch-trace` | 生成需求到测试的追溯矩阵 |

---

### BMB 构建器工作流

| 工作流 | 引用命令 | 说明 |
|--------|----------|------|
| agent | `@bmad/bmb/workflows/agent` | 三模式工作流：创建、编辑、验证 BMAD Core 合规代理 |
| create-module | `@bmad/bmb/workflows/create-module` | 交互式工作流构建完整 BMAD 模块 |
| create-workflow | `@bmad/bmb/workflows/create-workflow` | 使用基于 Markdown 的步骤架构创建结构化工作流 |
| edit-workflow | `@bmad/bmb/workflows/edit-workflow` | 智能工作流编辑器，遵循最佳实践修改现有工作流 |
| workflow-compliance-check | `@bmad/bmb/workflows/workflow-compliance-check` | 针对 BMAD 标准的系统性工作流验证 |

---

### BMGD 游戏开发工作流

#### 🎮 预生产阶段

| 工作流 | 引用命令 | 说明 |
|--------|----------|------|
| brainstorm-game | `@bmad/bmgd/workflows/brainstorm-game` | 使用游戏设计技术进行游戏头脑风暴 |
| create-game-brief | `@bmad/bmgd/workflows/create-game-brief` | 创建综合游戏简报，捕捉游戏愿景 |
| game-brief | `@bmad/bmgd/workflows/game-brief` | 交互式游戏简报创建 |

#### 🎲 设计阶段

| 工作流 | 引用命令 | 说明 |
|--------|----------|------|
| create-gdd | `@bmad/bmgd/workflows/create-gdd` | 创建综合游戏设计文档 (GDD) |
| gdd | `@bmad/bmgd/workflows/gdd` | 游戏设计文档工作流（从小原型到 AAA 大作） |
| narrative | `@bmad/bmgd/workflows/narrative` | 叙事设计工作流（故事结构、角色弧线、世界构建） |

#### 🏗️ 技术阶段

| 工作流 | 引用命令 | 说明 |
|--------|----------|------|
| game-architecture | `@bmad/bmgd/workflows/game-architecture` | 协作式游戏架构工作流（引擎、系统、网络、技术设计） |
| generate-project-context | `@bmad/bmgd/workflows/generate-project-context` | 创建 AI 代理实现游戏代码时必须遵循的规则和模式 |

---

### CIS 创意套件工作流

| 工作流 | 引用命令 | 说明 |
|--------|----------|------|
| design-thinking | `@bmad/cis/workflows/design-thinking` | 引导以人为本的设计流程（共情→定义→构思→原型→测试） |
| innovation-strategy | `@bmad/cis/workflows/innovation-strategy` | 识别颠覆机会，构建商业模式创新 |
| problem-solving | `@bmad/cis/workflows/problem-solving` | 应用系统性问题解决方法论攻克复杂挑战 |
| storytelling | `@bmad/cis/workflows/storytelling` | 使用经过验证的故事框架制作引人入胜的叙事 |

---

## 输出文件位置

| 内容类型 | 位置 |
|----------|------|
| 规划文档（PRD、架构、UX 等） | `_bmad-output/planning-artifacts/` |
| 实施文档（Sprint、故事等） | `_bmad-output/implementation-artifacts/` |
| 长期知识（研究、参考文档） | `docs/` |
| BMAD 配置和资源 | `_bmad/` |

---

## 推荐工作流程

### 🆕 新项目启动

```
1. @bmad/bmm/workflows/workflow-init          # 初始化项目，选择轨道
2. @bmad/bmm/workflows/create-product-brief   # 创建产品简报
3. @bmad/bmm/workflows/create-prd             # 创建 PRD
4. @bmad/bmm/workflows/create-architecture    # 创建架构
5. @bmad/bmm/workflows/create-epics-and-stories  # 创建史诗和故事
6. @bmad/bmm/workflows/sprint-planning        # Sprint 规划
7. @bmad/bmm/workflows/dev-story              # 开发故事
```

### 🐛 Bug 修复 / 小功能

```
@bmad/bmm/workflows/quick-dev
```

### 🎮 游戏开发

```
1. @bmad/bmgd/workflows/workflow-init         # 初始化游戏项目
2. @bmad/bmgd/workflows/brainstorm-game       # 头脑风暴
3. @bmad/bmgd/workflows/create-gdd            # 创建 GDD
4. @bmad/bmgd/workflows/game-architecture     # 游戏架构
5. @bmad/bmgd/workflows/dev-story             # 开发
```

### 💡 创意与创新

```
@bmad/cis/workflows/design-thinking           # 设计思维
@bmad/cis/workflows/innovation-strategy       # 创新战略
@bmad/cis/workflows/problem-solving           # 问题解决
@bmad/core/workflows/brainstorming            # 头脑风暴
```

---

## 统计信息

| 模块 | 代理数量 | 工作流数量 |
|------|----------|------------|
| Core | 1 | 2 |
| BMM | 9 | 32 |
| BMB | 3 | 5 |
| BMGD | 6 | 26 |
| CIS | 6 | 4 |
| **总计** | **25** | **69** |

---

> 📖 更多信息请参考: [https://github.com/bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD)

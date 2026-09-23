# 来源台账 — D2 把工作交给 agent 之前，先分清这三类任务

核对日期：2026-09-24（北京时间）。抓取时间：2026-09-24T00:55:00+08:00。

| # | URL | 机构 | 事件/文档日期 | 抓取结果 | 本文用它支持什么 | 适用范围与限制 |
|---|---|---|---|---|---|---|
| S1 | https://code.claude.com/docs/en/permissions | Anthropic（Claude Code 文档） | 文档未标注发布日期；抓取时在线版本 | HTTP 200（由 docs.anthropic.com 301 到 code.claude.com） | 只读文件读取与 Grep 在工作目录内不需批准、shell 命令需要批准；权限模式与 allow/ask/deny 规则 | 仅描述 Claude Code 当前文档所述行为；不是对所有 agent 产品的通用保证 |
| S2 | https://code.claude.com/docs/en/sandboxing | Anthropic（Claude Code 文档） | 文档未标注发布日期；抓取时在线版本 | HTTP 200 | Bash 沙箱的文件系统隔离、网络隔离、自动放行模式、逃逸设置，以及官方单列的安全限制 | 文档自身列出限制；不得转述为"沙箱=绝对安全" |
| S3 | https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent | GitHub（Copilot 文档） | 文档未标注发布日期；抓取时在线版本 | HTTP 200（由 .../coding-agent/about-coding-agent 301 到 .../cloud-agent/about-cloud-agent） | agent 在分支上研究仓库、制定计划、修改代码，人查看 diff 后再创建 pull request；网络访问与 secrets 需单独配置 | 仅描述 GitHub Copilot cloud agent；不宣称其他产品具备同等流程 |

## 未采用的来源

- https://developers.openai.com/codex/security 与 /codex/local-config：抓取返回 HTTP 403（站点对命令行访问做了拦截），本轮未取得正文，不作为证据使用，也不据其作任何声明。

## 声明与证据的区分

- 事实陈述（S1–S3）：三份公开文档中可直接核对的行为描述。
- 编辑建议：三类划分、分级表、"先退回第一类"的行动建议，是本文作者的判断，不是厂商规定。
- 假设场景：文中"整理十几份公开公告""三类工单优先处理""批量发信"等例子均为说明方法的假设场景，未实际执行，未做安全测试。

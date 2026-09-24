# D2 夜班技术证据（白班独立审核待做）

run: 20260924-0045；分支 codex/blog-pilot-d2-20260924；工作树 /Users/jared/blog/.worktrees/blog-pilot-d2-20260924。
协作锁：/Users/jared/blog/.git/blog-editorial.lock（本轮持有，finally 释放）。

## 已完成的机器检查

- scripts/post-seo-geo-lint.sh：passed（TOML front matter、description 长度、tags 非空、长文含参考来源与外链）。
- Hugo 草稿构建：见下方 build 记录；正文渲染与链接检查见 build.log。
- wechat.html 静态检查：无 script、无外部 stylesheet、无 flex/grid/table，样式全部内联。

## 未完成 / 不由本阶段主张

- 白班独立评分（事实30/行动价值25/原创综合20/表达15/版式10，≥85）尚未进行，本文件不代替白班审核。
- 未 push、未上线、未做生产回读；draft 仍为 true。
- 未做任何产品安全测试；S1–S3 仅为文档转述。
- 公众号后台粘贴与手机预览 unknown，由用户操作。

## 自评（仅供白班参考，不作为通过依据）

- 事实：三条外部声明全部对应可打开的官方文档；例子已标注为假设场景。
- 行动价值：一张可照填的分级表 + 一句可当天执行的动作。
- 风险：S1/S2 文档未标注发布日期，白班需重新抓取确认在线版本未变；若文档改版导致表述不符，应改稿而非放行。

---

# 白班独立审核（2026-09-24 08:55 Asia/Shanghai）

审核人：白班 Codex（同一 heartbeat 的后续触发，非夜班自评沿用）。审核对象：夜班草稿 43ea028。

## 独立复核

三份来源在审核时重新抓取，均 HTTP 200，逐条比对声明：

- S1 Configure permissions：文档权限表明确「Read-only｜File reads, Grep｜No, within the working directory and additional directories」，以及「Bash commands｜Shell execution｜Yes, except a built-in set of read-only commands」。夜班原稿写「shell 命令需要批准」，未反映「一组只读命令免批准」这一例外，属表述不够精确，已修订为「通常需要批准，官方只对一组只读命令免去批准」。
- S1 亦确认存在 plan 模式，且 plan 模式下不编辑源文件，与本文第 2 类描述一致。
- S2 Configure the sandboxed Bash tool：确认 auto-allow 与 regular permissions 两种模式、allowUnsandboxedCommands 逃逸设置，以及文档单列的 Security limitations 章节，与第 3 类描述一致。
- S3 About GitHub Copilot cloud agent：确认原文「Copilot can research a repository, create an implementation plan, and make code changes on a branch. You can review the diff, iterate, and create a pull request when you're ready.」，与第 2 类描述一致；Configure secrets and variables、Customize the firewall 两项配置入口存在，与第 3 类描述一致。

结论：无事实硬伤，无需退回；一处表述精度问题已修订。

## 评分（门槛：≥85 且事实无硬伤）

| 维度 | 分值 | 得分 | 理由 |
|---|---:|---:|---|
| 事实 | 30 | 28 | 三条外部声明全部对应可打开官方文档并逐字核对；例子标注为假设场景；扣 2 分因三份文档均无发布日期，长期时效以访问时为准 |
| 行动价值 | 25 | 22 | 一张可照填的分级表 + 一句当天可执行动作；未提供模板文件下载 |
| 原创综合 | 20 | 17 | 「能不能撤回」作为划分轴是本文自己的判断，未复述文档结构；与 D1 的决策卡不重复 |
| 表达 | 15 | 13 | 短段落、具体动词；个别句子偏长 |
| 版式 | 10 | 9 | 正文 H2 分区、表格、要点块；公众号单列内联样式 |
| 合计 | 100 | 89 | 通过 |

## 修订

- 权限表述精度修订（正文与公众号两版同步）。
- draft 由 true 改为 false，正文其他内容未改。
- 修订后 blog.md 与 content/posts 版本逐字一致。

## 仍未主张

- 未做任何产品安全测试；S1–S3 仅为文档转述。
- 公众号后台粘贴与手机预览仍为 unknown，由用户操作；本轮不代发。

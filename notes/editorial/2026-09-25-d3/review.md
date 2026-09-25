# 审稿记录 — D3 定时任务设好了，为什么事情还是没完成？

记录人：夜班（写作轮）。时间：2026-09-25T01:1x +08:00。**本轮为夜班自评，独立评分与通过判定由白班负责，此文件不是发布批准。**

## 声明逐条核对（对照 sources.md）

| 声明 | 来源 | 核对结果 |
|---|---|---|
| cron 用 `CRON_TZ` 指定表内时区 | S1 | 成立（"The CRON_TZ variable specifies the time zone specific for the cron table."） |
| cron 任务输出默认邮件发给 crontab 所有者，可用 `MAILTO` | S1 | 成立（示例注释 "output mailed to paul" 与 `MAILTO` 说明） |
| systemd `Persistent=` 默认 false，存盘并在停机后补跑一次 | S2 | 成立（"Defaults to false."；"useful to catch up on missed runs"） |
| 该补跑受 `RandomizedDelaySec=` 影响且只对 `OnCalendar=` 有效 | S2 | 成立（"subject to the delay imposed by RandomizedDelaySec="；"only has an effect on timers configured with OnCalendar="） |
| 休眠期间多次到点只激活一次服务 | S2 | 成立（"the timer will only result in a single service activation"） |
| timer 依赖时间同步目标 | S2 | 成立（`After=` on time-set.target / time-sync.target） |
| GitHub Actions `schedule` 高负载延迟、排队作业可能被丢弃、只在默认分支运行 | S3 | 成立（Note 列表逐条） |
| 公共仓库 60 天无活动自动禁用定时工作流 | S3 | 成立（"automatically disabled when no repository activity has occurred in 60 days"） |

## 夜班自评（非发布判定）

| 维度 | 分值 | 自评说明 |
|---|---:|---|
| 事实 | 28/30 | 八条声明全部有官方文档逐字对应；未采用任何二手来源 |
| 行动价值 | 22/25 | 四层检查表每层都给了失败判据与恢复动作 |
| 原创综合 | 17/20 | 四层划分与"补跑≠补齐"为本文归纳 |
| 表达 | 13/15 | 短段落、先场景后判断 |
| 版式 | 9/10 | 博客含一张表；公众号版已将表格转为列表 |
| 合计 | 89/100 | 白班独立复核后再定是否达 85 |

## 技术检查

- 待执行并回填：post-seo-geo-lint.sh、node --test scripts/analytics.test.mjs、Hugo --buildDrafts 构建与页面元素检查、非草稿构建排除本文。

## 仍未主张

- 未对任何调度平台做压力测试或故障注入；S1–S3 均为文档转述。
- 公众号后台粘贴与手机预览为 unknown，由用户操作；本轮不代发。
- 已发布 URL 未回填（文章尚未发布），公众号"阅读原文"在此之前留空。

---

# 白班独立审核（2026-09-25 09:50 Asia/Shanghai）

审核人：白班 Codex（同一 heartbeat 的后续触发，非夜班自评沿用）。审核对象：夜班草稿 2eade57。审核时三份来源重新抓取，均 HTTP 200，字节数与夜班记录一致（S1 24289 / S2 30041 / S3 1073751）。

## 独立复核（逐条对照原文）

- S1 `CRON_TZ`：原文 "The CRON_TZ variable specifies the time zone specific for the cron table."，成立。
- S1 邮件去向：原文 "If MAILTO is defined (and non-empty), mail is sent to the specified address. ... Otherwise, mail is sent to the owner of the crontab."，与"默认发给 crontab 所有者、可用 MAILTO 改"一致。
- S2 `Persistent=`：原文 "If true, the time when the service unit was last triggered is stored on disk. When the timer is activated, the service unit is triggered immediately if it would have been triggered at least once during the time when the timer was inactive." 与 "Defaults to false."，成立。
- S2 延迟与适用范围：原文 "Such triggering is nonetheless subject to the delay imposed by RandomizedDelaySec=." 与 "Note that this setting only has an effect on timers configured with OnCalendar=."，成立。
- S2 休眠补跑：原文 "...if the system was continuously sleeping the timer will only result in a single service activation."，成立。
- S2 时间同步依赖：原文 "additional After= dependencies on time-set.target and time-sync.target, in order to avoid being started before the system clock has been ..."，成立。
- S3 `schedule`：原文 "The schedule event can be delayed during periods of high loads of GitHub Actions workflow runs. High load times include the start of every hour. If the load is sufficiently high enough, some queued jobs may be dropped." 与 "Scheduled workflows will only run on the default branch."，成立。
- S3 自动禁用：原文 "In a public repository, scheduled workflows are automatically disabled when no repository activity has occurred in 60 days."，成立。

结论：八条外部声明逐条成立，无事实硬伤，无需修订正文。标题承诺（"为什么事情还是没完成"）由四层切分与带恢复条件的检查表兑现，未超出来源可支持的范围。

## 评分（门槛：≥85 且事实无硬伤）

| 维度 | 分值 | 得分 | 理由 |
|---|---:|---:|---|
| 事实 | 30 | 29 | 八条声明全部对应可打开的官方文档并逐字核对；假设场景已明确标注；扣 1 分因三份文档均无固定发布日期，时效以访问时点为准 |
| 行动价值 | 25 | 23 | 四层检查表每层给出失败判据与恢复动作，另有一句可当天执行的动作 |
| 原创综合 | 20 | 17 | 四层划分与"补跑≠补齐"是本文归纳，未复述文档结构；与 D1 决策卡、D2 权限表不重复 |
| 表达 | 15 | 13 | 短段落、具体动词、先场景后判断；个别句偏长 |
| 版式 | 10 | 9 | 博客含一张表；公众号版已把表格转为单列要点，样式全部内联 |
| 合计 | 100 | 91 | 通过 |

## 发布动作

- `draft` 由 true 改为 false（content/posts 与 notes/editorial 两份同步），正文内容未做任何修订，故 wechat.html / wechat.txt 无需重算。
- 修订后两份草稿仍逐字一致。

## 仍未主张

- 未对任何调度平台做压力测试或故障注入；S1–S3 均为文档转述。
- 公众号后台粘贴与手机预览为 unknown，由用户操作；本轮不代发。

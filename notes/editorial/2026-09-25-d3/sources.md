# 来源台账 — D3 定时任务设好了，为什么事情还是没完成？

核对日期：2026-09-25（北京时间）。抓取时间：2026-09-25T00:52:00+08:00。

| # | URL | 机构 | 文档日期 | 抓取结果 | 本文用它支持什么 | 适用范围与限制 |
|---|---|---|---|---|---|---|
| S1 | https://man7.org/linux/man-pages/man5/crontab.5.html | man7.org（crontab(5) 手册页） | 页面标注 `crontab(5)` 版本，抓取时为在线版本 | HTTP 200（24289 bytes） | `CRON_TZ` 指定该 cron 表使用的时区；任务输出默认以邮件发给 crontab 所有者，可用 `MAILTO` 指定接收人；输出编码相关变量 `CONTENT_TYPE`/`CONTENT_TRANSFER_ENCODING` | 仅描述 cron 的配置与输出行为；本文不声称 cron 具备或缺少补跑语义 |
| S2 | https://www.freedesktop.org/software/systemd/man/latest/systemd.timer.html | freedesktop.org（systemd 官方手册） | "latest" 在线版本，抓取时为最新稳定文档 | HTTP 200（30041 bytes） | `Persistent=` 默认 false；为 true 时把上次触发时间存盘，停机期间本应触发过则在激活时立刻补跑一次；该补跑受 `RandomizedDelaySec=` 影响，且只对 `OnCalendar=` 有效；休眠期间到点的日历计时器恢复后补上，但连续多次到点只激活一次服务 | 仅描述 systemd timer 的行为；其他调度平台的补跑语义需另行核对 |
| S3 | https://docs.github.com/en/actions/reference/events-that-trigger-workflows | GitHub（Actions 文档） | 文档未标注发布日期；抓取时为在线版本 | HTTP 200（1073751 bytes） | `schedule` 事件在高负载时被延迟（每小时开头为高负载时段）；负载足够高时排队作业可能被丢弃；定时工作流只在默认分支运行；公共仓库连续 60 天无活动会自动禁用定时工作流 | 仅描述 GitHub Actions；不推广为所有调度平台的默认行为 |

## 未采用的来源

- 本轮未出现 403/503 阻塞；没有采用任何第三方博客、二手转述或热点榜单作为证据。

## 声明与证据的区分

- 事实陈述（S1–S3）：三份官方文档中可直接核对的行为描述，逐条对应上表"本文用它支持什么"。
- 编辑判断：四层划分（配置/触发/执行/验收）、检查表与"补跑不等于补齐"的结论，是本文作者的方法归纳，不是任何厂商的规定。
- 假设场景：文中"每天早上九点汇总简报"是为说明方法构造的例子，未实际运行，也未做任何压力测试。


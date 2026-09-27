# D5 双版本分发包

主标题（问题式）：一笔 120 美元的拒付，最后花掉多少？
备选（决策式）：算拒付成本时，先补上后两层。
备选（场景式）：同一笔 120 美元拒付，三种做法：−135、−25、−145。

摘要：一笔 120 美元的拒付，账面损失不只是 120 美元。把成本拆成三层——卡组织与收单机构的公开收费、自己团队处理争议的人工、以及把账户推近监控阈值的风险——再给一张能照填的合成算例。只比手续费的成本清单，会漏掉后两层。

朋友圈导语：财务记了 120 美元损失，运营说能申诉回来，风控说拒付率已经顶到监控线。三个说法都不算错。我把一笔拒付的成本拆成三层，同一笔 120 美元在"接受 / 申诉赢 / 申诉输"下分别是 135、25、145 美元，并把三项该换成你公司数字的输入单独列了出来。

封面方向：深海军蓝底，白色主标题"这笔拒付花了多少"，青绿小字"金额 / 人工 / 阈值"。本轮未生成封面图片，不能声称已生成。

博客稿：content/posts/why-a-120-dollar-chargeback-costs-more.md，draft=false（2026-09-27 白班独立审核通过，见 review.md 评分）。
已发布 URL（2026-09-27 10:1x Asia/Shanghai 线上回读 HTTP 200，19,670 bytes）：https://blog.paymond.me/posts/why-a-120-dollar-chargeback-costs-more/ 。公众号"阅读原文"填这个地址。

公众号：打开 wechat.html 复制渲染后的正文，标题与摘要独立填入。若顶部标题与标题字段重复，可在编辑器删除顶部大标题。wechat.txt 为纯文本降级。wechat.html 1512 中文字、wechat.txt 1499 中文字（合同 1000—1600）。后台粘贴与手机预览由用户操作，未验证；本轮不代发。

选题使用原题，未启用替补（部分退款之后，剩余的争议金额怎么核对 留作备用）。来源为 Stripe 官方文档四页与定价页一页、Visa 官方 PDF 两份，另有主站方法页与计算器两条站内链接作为公开默认值的出处。

## 发布回读（2026-09-27）

- 草稿提交：f548833 "Draft D5: what a 120 dollar chargeback actually costs"
- 合并提交：bd4126a "Merge branch 'codex/blog-pilot-d5-20260927'"
- 实际远端提交：推送输出 1389181..bd4126a（`git rev-parse origin/main` = bd4126a）
- GitHub Actions：run 36287456345（Deploy Hugo site to Pages，main，push）→ completed / success，build 与 deploy 两个 job 均 success
- 生产 URL：https://blog.paymond.me/posts/why-a-120-dollar-chargeback-costs-more/
- 线上验收（2026-09-27 10:1x +08:00）：HTTP 200；canonical 为该 URL；meta robots = "index, follow"；h1 与标题一致；渲染出 1 张带数字表格；sitemap.xml 含该 URL；内链 wiki /chargebacks/fees-and-costs/、sequre /methodology/chargeback-cost/、/chargeback-cost-calculator/ 均 200
- 内部材料边界：notes/editorial/2026-09-27-d5/wechat.html 在生产站返回 404，未被发布
- 公众号"阅读原文"填：https://blog.paymond.me/posts/why-a-120-dollar-chargeback-costs-more/
- 仍未主张：公众号后台粘贴与手机预览由用户操作，未验证；本轮不代发

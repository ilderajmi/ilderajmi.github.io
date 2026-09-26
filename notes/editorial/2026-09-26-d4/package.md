# D4 双版本分发包

主标题（问题式）：为什么你的拒付比率和收单机构算出来的不一样？
备选（决策式）：拒付比率对不上时，先查口径再查数字。
备选（场景式）：同一批交易，三个拒付比率：0.50%、0.60% 与 0.48%。

摘要：同一个月的拒付比率，商户报表和收单机构的口径经常对不上。差异集中在分母数的是哪批交易、这笔争议属于哪个月、以及哪些案件根本不算进分子。给一张口径对齐清单和一个合成算例，先对齐口径再谈差异。

朋友圈导语：月底算出来 0.50%，收单机构说是 0.62%，同一批交易差了三成。我把差异拆成分母、数据归属月、分子资格三处，做了一张十二项的口径对齐清单，还有一个能照算的合成算例。

封面方向：深海军蓝底，白色主标题"先对齐口径，再谈差异"，青绿小字"分母 / 数据月 / 分子"。本轮未生成封面图片，不能声称已生成。

博客稿：content/posts/why-chargeback-ratio-does-not-match.md，draft=false（2026-09-26 白班独立审核通过，93/100）。
已发布 URL：**见本文件末尾"发布回读"一节的回填值**。在回填之前，公众号"阅读原文"留空，不得填写猜测地址。

公众号：打开 wechat.html 复制渲染后的正文，标题与摘要独立填入。若顶部标题与标题字段重复，可在编辑器删除顶部大标题。wechat.txt 为纯文本降级。白班把公众号版从夜班的 2169 字压缩到 1536 字（合同 1000—1600），12 项清单与全部数字保留。后台粘贴与手机预览由用户操作，未验证；本轮不代发。

选题使用原题，未启用替补（预警 24 小时确认窗口一题留作备用）。来源为 Visa 官方 PDF 两份、Stripe 官方文档三页与定价页一页；Mastercard 原文 403，相关表述经 Stripe 文档转述并在正文就近标注。

## 发布回读（2026-09-26）

- 发布提交：7344d59 "Publish D4: why your chargeback ratio does not match your acquirer"
- 实际远端提交：推送输出 79f69b2..7344d59（`git rev-parse origin/main` = 7344d59）
- GitHub Actions：run 36211896053（Deploy Hugo site to Pages，main，push）→ completed / success
- 生产 URL：https://blog.paymond.me/posts/why-chargeback-ratio-does-not-match/
- 线上验收（2026-09-26 10:31 +08:00）：HTTP 200；canonical 为该 URL；meta robots = "index, follow"；渲染出 3 张带数字表；sitemap.xml 含该 URL；内链 /programs/ratio-arithmetic/、/chargebacks/lifecycle/、sequre.paymond.me/methodology/chargeback-cost/ 均 200
- 内部材料边界：notes/editorial/2026-09-26-d4/ 在生产站返回 404，未被发布
- 公众号"阅读原文"填：https://blog.paymond.me/posts/why-chargeback-ratio-does-not-match/
- 仍未主张：公众号后台粘贴与手机预览由用户操作，未验证；390px 手机视口未验证

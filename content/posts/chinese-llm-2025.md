+++
date = '2026-01-28T00:00:00+08:00'
draft = false
title = '国产大模型的2025：Kimi、MiniMax、智谱的不同路径'
description = '460万美元训练成本 vs 10亿美元，6倍价格差距，174%营收增长——国产大模型正在用效率重新定义游戏规则'
tags = ['AI代理', '开发工具', '大模型']
+++

![Chinese AI Models Global Impact](https://www.chathamhouse.org/sites/default/files/styles/12_6_media_huge/public/2025-11/2025-11-20-jensen-huang-2247490231.jpg?h=2816537b&itok=uEcw-cSJ)
*Nvidia CEO 黄仁勋曾表示"中国将在AI领域获胜"——这句话背后是国产模型的成本效率优势（来源：Chatham House / AFP via Getty Images）*

2025年底，一个数据让硅谷坐不住了：月之暗面的 Kimi K2 训练成本约460万美元，而 Claude Sonnet 4.5 超过10亿美元。两者在多项基准测试中性能相当。

这不是孤例。Social Capital 的 Chamath Palihapitiya 公开表示他们已经转向 Kimi K2，原因很直接："性能更好，成本低得多。" Airbnb CEO Brian Chesky 说他们"重度依赖"阿里的 Qwen，因为"又快又便宜"。

国产大模型正在用一种出乎意料的方式进入全球市场——不是靠政策保护，而是靠成本效率。

## Kimi：460万美元的挑战

![Kimi K2 Agentic Pipeline](https://statics.moonshot.cn/kimi-blog/assets/workflow-Cqznd7Jl.png)
*Kimi K2 的 Agentic 数据合成流程：通过大规模工具使用场景模拟训练 Agent 能力（来源：Moonshot AI）*

月之暗面的 Kimi K2 Thinking 在 MATH-500 测试中拿到97.4%，超过 GPT-4o 和 Claude 3.5 Sonnet。这个成绩本身没什么稀奇，真正让人关注的是实现路径：

| 模型 | 训练成本 | API价格（每百万Token）|
|-----|---------|---------------------|
| Kimi K2 Thinking | 约460万美元 | 2.5美元 |
| Claude Sonnet 4.5 | 超过10亿美元 | 15美元 |

6倍的价格差距意味着什么？对于一个每天调用百万次API的应用来说，这是每月数十万美元的成本差异。

Chatham House 的分析指出，Kimi K2 是用 Nvidia H800 芯片（2023年出口禁令前的库存）训练的。用上一代芯片做出当代顶级性能，这背后是架构效率和多令牌预测等技术创新。

有人担心这是"低价倾销"，但成本结构摆在那里：中国AI实验室的研发投入确实只有美国同行的几十分之一。这到底是效率优势还是可持续的商业模式，市场正在给出答案。

## MiniMax：商业化的验证

如果说 Kimi 证明了技术可行性，MiniMax 正在证明商业可行性。

2025年前三季度数据：
- 营收：5344万美元（同比增长174%）
- 海外收入占比：约70%
- B端毛利率：69.4%
- 团队规模：约400人

这组数据值得拆解。70%收入来自海外，说明这不是依赖国内市场的保护性增长。69.4%的毛利率，在"价格战"的行业叙事下显得反常——MiniMax 没有靠亏损换市场。

400人的团队规模更有意思。作为对比，智谱需要千人规模来支撑类似体量的业务。差异在于商业模式：MiniMax 只做标准化API服务，不做定制化私有部署。这个选择让它避开了"脏活累活"，但也意味着放弃了一部分市场。

海螺AI（Hailuo）的视频生成能力是 MiniMax 的差异化来源。在与 Monks 等营销机构的合作中，视频生成帮助客户降低了约50%的内容创作成本。多模态能力正在成为新的竞争维度。

![Hailuo 2.3 视频生成示例](https://filecdn.minimax.chat/public/a770623c-baa5-47b4-8558-7e8c6a24a672.gif)
*Hailuo 2.3 的角色微表情渲染：从面部细节到动作流畅度的全面提升（来源：MiniMax）*

12月，MiniMax 和智谱先后通过港交所上市聆讯。这意味着国产大模型开始接受二级市场的检验。

## 智谱：基础设施化的路径

智谱选了一条不同的路：做"底座"。

GLM-4.7 在 OpenRouter 平台的付费流量占比超过其他国产模型总和。更重要的数据是：GLM 系列已适配40余款国产芯片。在芯片供应链不确定的背景下，这种兼容性就是竞争力。

AutoGLM 代表了智谱对AI Agent的理解。官方的说法是"边想边干"——模型不只是回答问题，而是能自主规划并执行任务，包括跨App操作、超过50步的长链条任务。

![AutoGLM 沉思模型](https://n.sinaimg.cn/spider20250331/356/w1478h478/20250331/2c28-2ca9658a9e3f51c868c99cc0644d227c.jpg)
*AutoGLM 的技术演进路径：从基座模型到推理模型，再到具备深度研究和操作能力的沉思模型（来源：新浪财经）*

这听起来像是技术愿景，但已经有落地案例：AI搜索工具、简历匹配助手、客服脚本质检助手——这些是金融、人力资源、法律等行业的真实需求。

智谱把2025年定义为"开源年"。开源策略的逻辑很清晰：
1. 降低企业采用门槛
2. 通过社区反馈改进模型
3. 建立生态护城河

阿里的 Qwen 已经用这个策略取得了成效——全球超过18万个衍生模型，累计下载量突破7亿次。

## 安全性：数据说话

"中国模型不够安全"是常见的质疑。Holistic AI 的红队测试给出了不同的答案：

| 模型 | 安全响应率 | 越狱抗性 |
|-----|----------|---------|
| MiniMax M2 (Thinking) | >99% | 100% |
| Claude 4.5 | >99% | 100% |
| GPT-4.5 | >99% | 97% |
| DeepSeek | 较低 | 87% |

MiniMax 的安全表现与 Claude 持平，某些指标甚至优于 GPT-4.5。当然，DeepSeek 的表现确实有差距，这说明"国产模型"内部也有分化。

安全性测试是动态的——今天的结果不代表永远。但至少在当前节点，"中国模型不安全"这个笼统判断需要修正。

## 这意味着什么

几个观察：

**成本结构差异是真实的**。不管是芯片限制倒逼的效率创新，还是劳动力成本差异，国产模型的成本优势短期内不会消失。

**商业模式在分化**。Kimi 走技术路线，MiniMax 走商业化路线，智谱走基础设施路线。没有哪条路一定对，但选择已经做出。

**开源正在改变格局**。对于担心供应商锁定的企业——尤其是需要满足GDPR要求的欧洲企业——开源模型+本地部署是有吸引力的选项。

**"国产"标签正在淡化**。当 Airbnb、Social Capital 这样的美国公司公开使用中国模型时，决策逻辑已经是性价比而非地缘政治。

接下来会发生什么？MiniMax 和智谱的IPO表现会是一个信号。二级市场对大模型公司的估值逻辑，将影响整个行业的资源配置。

---

**参考来源**

1. [ZenMux: Top Chinese AI Models in 2026](https://zenmux.ai/blog/top-chinese-ai-models-in-2026-capabilities-use-cases-and-performance)
2. [Chatham House: Low-cost Chinese AI models forge ahead](https://www.chathamhouse.org/2025/11/low-cost-chinese-ai-models-forge-ahead-even-us-raising-risks-us-ai-bubble)
3. [NewMR: Chinese AI Models Are Reshaping the Global Landscape](https://newmr.org/blog/chinese-ai-models-are-reshaping-the-global-landscape-what-does-this-mean-for-market-research/)
4. [维科号: 揭密MiniMax不为人知的B面](https://mp.ofweek.com/ai/a256714719587)
5. [证券时报: 智谱、MiniMax相继通过港交所上市聆讯](https://stcn.com/article/detail/3547927.html)
6. [智谱AI官网](https://www.zhipuai.cn/)
7. [新浪财经: 智谱发布AutoGLM沉思](https://finance.sina.com.cn/tech/csj/2025-03-31/doc-inerpqhq7160075.shtml)
8. [TechRepublic: Chinese AI Models Safety Tests](https://www.techrepublic.com/article/news-chinese-ai-models-safety-tests/)

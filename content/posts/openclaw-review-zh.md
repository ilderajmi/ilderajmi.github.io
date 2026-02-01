+++
date = '2026-02-01T00:00:00+08:00'
draft = false
title = 'OpenClaw：一只龙虾让Cloudflare股价涨了14%'
description = '一个开源AI助手项目在GitHub收获13万stars，让我看到了AI Agent的可能性，也让我睡不着觉'
tags = ['AI代理', '开发工具']
+++

![龙虾](/posts/image/openclaw-review-zh/techcrunch-lobster.jpg)

2026年1月底，Cloudflare股价盘前涨了14%。不是财报，不是新产品。是因为开发者们在用Cloudflare的基础设施跑一个叫OpenClaw的开源项目，社交媒体上传疯了。

这个项目一个月内改了三次名字，被Anthropic发了商标警告，GitHub用户名被加密货币骗子抢注，创始人不得不在推特上连发声明。但这些都没挡住它在GitHub上冲到13万+ stars。

我花了一周研究它。说实话，我现在对它的态度很矛盾。

## 一个月三次改名

Peter Steinberger是个奥地利开发者，之前做了个PDF工具公司PSPDFKit，干了13年后退出，空虚了三年几乎不碰电脑。然后AI浪潮来了，他又开始写代码，做了个私人AI助手给自己用，叫Clawd——一只龙虾。名字明显是致敬Claude，他在博客里自称"Claude成瘾者"。

然后Anthropic来敲门了。商标侵权。

改名Moltbot，取自龙虾蜕壳（molting）。几天后又改成OpenClaw。具体原因不清楚，可能还是商标问题，也可能团队想要个更"开源"的名字。

更麻烦的是，Steinberger改GitHub用户名的时候，加密货币骗子秒抢了原来的`clawdbot`，开始发假币项目，声称他是创始人。他不得不在推特上连发警告，后来GitHub帮忙解决了，但期间出现了20多个假账号。

这就是2026年的互联网：你火了，骗子就来了。

## 它到底能干什么

![OpenClaw通过Telegram交互](/posts/image/openclaw-review-zh/macstories-telegram.png)
*MacStories的Federico Viticci用Telegram控制他的OpenClaw（图源：MacStories）*

忘掉ChatGPT和Claude的聊天界面。OpenClaw不是聊天机器人，它是一个跑在你电脑上的Agent，能执行shell命令、发消息、控制智能家居、管理邮件日程。你通过Telegram、WhatsApp、Discord跟它对话，它在后台干活。

Federico Viticci在MacStories写了篇[长评测](https://www.macstories.net/stories/clawdbot-showed-me-what-the-future-of-personal-ai-assistants-looks-like/)，烧掉了1.8亿个tokens做实验。他让OpenClaw给自己装上图片生成能力，然后用它给自己画了个头像；他让它监控RSS，自动在Todoist里创建项目；他甚至让它接管了一些原来在Zapier上的自动化流程。

他的评价是："这是我自ChatGPT发布以来，第一次觉得看到了个人AI助手的未来。"

几个让我印象深刻的用户案例：

一个人让OpenClaw帮他跟保险公司Lemonade扯皮，结果AI误解了他的意思，发了封措辞激烈的邮件出去。保险公司被唬住了，重新开始调查他的案子。用户发推说"谢谢AI"。

另一个人在遛狗的时候通过手机Telegram让OpenClaw在他的电脑上用Claude Code写spec文档。

还有人让它在天气好的时候自动拍天空的照片——它自己写了个skill来实现这个功能。

![OpenClaw本地架构](/posts/image/openclaw-review-zh/macstories-architecture.png)
*OpenClaw的本地文件结构，所有配置和记忆都存在Markdown文件里（图源：MacStories）*

## 安全问题让我睡不着

现在说说为什么我睡不着。

OpenClaw能执行任意shell命令。任意。

理论上，它可以删你文件、读你密码、把你电脑变成矿机。"但它是开源的！"是，但你审计过吗？

更让人担心的是提示注入攻击。假设有人给你发条WhatsApp消息，里面藏着指令诱使AI执行恶意操作。Steinberger自己也承认，这个问题的彻底解决可能不在他的控制范围内——需要AI模型本身变得更抗提示注入，需要操作系统级别的沙盒机制。

投资人Rahul Sood在推特上[说](https://x.com/rahulsood/status/2015397582105969106)："让我睡不着的是，有人可能通过WhatsApp消息就能在你电脑上执行代码，而你毫不知情。"

TechCrunch的[报道](https://techcrunch.com/2026/01/27/everything-you-need-to-know-about-viral-personal-ai-assistant-clawdbot-now-moltbot/)说得很直白：如果你不知道什么是VPS，现在别碰这东西。

目前的安全建议是：用专门的虚拟服务器跑，不要连接真实的重要服务，不要在你的主力电脑上运行。但这样一来，它作为"个人助手"的意义就大打折扣了。

## 快速上手（如果你非要试）

需要Node.js 22+，然后：

```bash
npm install -g openclaw@latest
openclaw onboard --install-daemon
```

安装向导会引导你配置AI模型（推荐用Claude）、选择消息平台（Telegram最流行）、设置权限。详细文档在 [docs.openclaw.ai](https://docs.openclaw.ai/)。

## 我的判断

OpenClaw让我看到了AI Agent的一个可能的形态：不是聊天界面，而是一个住在你电脑里、能操作一切的代理人。这个方向是对的。

但它现在还是个实验品。13万GitHub stars不等于13万安全的生产环境部署。大部分用户是开发者和极客，他们知道风险。

如果你是开发者，想体验一下"能干活的AI"是什么感觉，用独立的VPS试试，别连接重要服务。如果你不是技术人员，等大公司推出更安全的版本。

这只龙虾已经掀起了波浪。OpenAI、Anthropic、Google都在研究类似的东西。区别是它们会花更多时间在安全性上。OpenClaw的价值在于它先行一步，让我们看到了这种体验可以是什么样。

代价是，现在用它，你得自己承担风险。

---

**参考来源**

- [OpenClaw 官方文档](https://docs.openclaw.ai/)
- [Peter Steinberger 博客 - Finding My Spark Again](https://steipete.me/posts/2025/finding-my-spark-again)
- [TechCrunch - Everything you need to know about viral personal AI assistant Clawdbot](https://techcrunch.com/2026/01/27/everything-you-need-to-know-about-viral-personal-ai-assistant-clawdbot-now-moltbot/)
- [MacStories - OpenClaw Showed Me What the Future of Personal AI Assistants Looks Like](https://www.macstories.net/stories/clawdbot-showed-me-what-the-future-of-personal-ai-assistants-looks-like/)
- [GitHub - openclaw/openclaw](https://github.com/openclaw/openclaw)

*本文撰写于2026年2月。OpenClaw是个快速发展的项目，信息可能会过时。*

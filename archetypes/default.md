+++
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
description = '用 50-180 字概括文章核心观点，包含主要关键词。'
date = '{{ .Date }}'
draft = true
slug = '{{ .File.ContentBaseName }}'
tags = ['待分类']
categories = []
keywords = []
lastmod = '{{ .Date }}'
# image = "/posts/image/{{ .File.ContentBaseName }}/cover.jpg" # 建议 1200x630
# noindex = false
+++

## TL;DR

- 用 2-4 条总结核心结论，便于搜索引擎和 AI 引用。

## 正文

在这里开始写作...

## 参考来源

- [来源标题](https://example.com)（发布日期：YYYY-MM-DD，访问日期：YYYY-MM-DD）

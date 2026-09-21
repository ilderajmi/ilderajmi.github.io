# SEO / GEO Rules（自动执行版）

这份规则用于保证每篇文章在发布前满足最低 SEO 和 GEO（面向 AI 检索）标准。

## 自动化机制

1. 新建文章默认模板：`/Users/jared/blog/archetypes/default.md`
2. 发布前自动校验脚本：`/Users/jared/blog/scripts/post-seo-geo-lint.sh`
3. CI 强制执行：`/Users/jared/blog/.github/workflows/hugo.yml`
4. 部署后自动通知搜索引擎：`/Users/jared/blog/scripts/notify-search-engines.sh`

## 必须满足

1. 文章使用 TOML Front Matter（`+++`）。
2. 必填字段：`title`、`description`、`date`、`draft`、`tags`。
3. `description` 长度 50-180 字符。
4. `tags` 不能为空。
5. 图片必须有 alt 文本（禁止 `![](...)`）。
6. 长文（正文 >1200 字符）必须包含“参考来源/参考资料/参考文献”段落。
7. 长文必须包含至少一个外部可访问引用链接（`https://`）。

## 词表规范

1. 标签统一使用：`AI代理`（不要再用 `AI Agent`）。
2. 同义标签避免中英混用，优先使用既有词表。

## 新文章建议流程

1. `hugo new posts/<slug>.md`
2. 按模板补齐 `TL;DR`、正文、参考来源。
3. 本地执行：`bash ./scripts/post-seo-geo-lint.sh`
4. 本地构建：`hugo --gc --minify --cleanDestinationDir`
5. 发布前改为 `draft = false`。

## GEO 额外建议（推荐）

1. 在“参考来源”中标注来源发布日期与访问日期。
2. 对时效性内容，在文末注明“本文撰写/更新日期”。
3. 结论尽量结构化（列表化），方便 AI 抽取与引用。

## 部署后通知规则

1. 每次部署成功后自动 ping Bing 的 sitemap 端点。
2. Google 不使用废弃的 `/ping` 方式，改用 Search Console API 的 sitemap submit。
3. Google 通知为可选：未配置 `GSC_ACCESS_TOKEN` 与 `GSC_SITE_URL` 时自动跳过，不阻断部署。

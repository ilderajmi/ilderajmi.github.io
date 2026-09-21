# Jared's Blog

基于 Hugo 和 GitHub Pages 的个人技术博客。

## 🚀 快速开始

### 本地开发
```bash
# 启动开发服务器
hugo server -D

# 构建生产版本
hugo --minify

# SEO 检查
./scripts/seo-check.sh

# SEO/GEO 规则校验（发布前建议必跑）
bash ./scripts/post-seo-geo-lint.sh
```

### 创建新文章
```bash
hugo new posts/my-new-post.md
```

## 📚 重要文档

- **[SEO-GUIDE.md](./SEO-GUIDE.md)** - 完整的 SEO 优化指南
- **[SEO-TODO.md](./SEO-TODO.md)** - SEO 待办事项清单
- **[SEO-GEO-RULES.md](./SEO-GEO-RULES.md)** - 自动化 SEO/GEO 发布规则
- **[hugo.toml](./hugo.toml)** - 网站配置文件

## ✅ 已完成的 SEO 优化

- ✅ Meta 标签优化（title, description, keywords）
- ✅ Open Graph 和 Twitter Cards
- ✅ 结构化数据（Schema.org JSON-LD）
- ✅ Sitemap 自动生成
- ✅ Robots.txt 配置
- ✅ Canonical URL
- ✅ HTML/CSS/JS 压缩
- ✅ 响应式设计

## 📝 下一步

1. **立即**: 部署后检查 sitemap.xml 的 URL 是否正确
2. **第一周**: 提交网站到 Google/Bing/百度搜索引擎
3. **持续**: 定期发布优质原创内容

详细任务请查看 [SEO-TODO.md](./SEO-TODO.md)

## 🛠️ 技术栈

- **框架**: Hugo (静态网站生成器)
- **主题**: Paper
- **托管**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📊 SEO 检查工具

运行以下命令检查 SEO 配置:
```bash
./scripts/seo-check.sh
```

## 🔔 发布后搜索引擎通知

GitHub Actions 会在部署成功后自动执行：
- Bing sitemap ping
- Google Search Console sitemap submit（可选，需要 secrets）

Google 可选 secrets：
- `GSC_ACCESS_TOKEN`: Google OAuth access token（具备 Search Console 权限）
- `GSC_SITE_URL`: Search Console property（例如 `sc-domain:paymond.me` 或 `https://blog.paymond.me/`）
- `GSC_SITEMAP_URL`: 可选，默认使用 `https://blog.paymond.me/sitemap.xml`

## 📞 联系方式

- 网站: https://blog.paymond.me
- GitHub: [@ilderajmi](https://github.com/ilderajmi)

---

**最后更新**: 2026-01-19

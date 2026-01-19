# 🚀 部署检查清单

## 域名: blog.paymond.me

---

## ✅ 部署前准备（已完成）

- [x] 更新 `hugo.toml` 中的 baseURL
- [x] 更新所有文档中的域名引用
- [x] 创建 `static/CNAME` 文件
- [x] 验证 sitemap.xml 使用正确域名
- [x] 验证 robots.txt 使用正确域名
- [x] 运行 SEO 检查脚本通过
- [x] 清理旧域名引用

---

## 📋 部署后立即验证（5分钟内）

### 1. 基础访问
```bash
# 检查网站是否可访问
curl -I https://blog.paymond.me

# 应该返回 HTTP 200
```

- [ ] ✅ 网站首页可访问
- [ ] ✅ 返回 200 状态码
- [ ] ✅ HTTPS 正常工作

### 2. 核心文件
```bash
# 检查 sitemap
curl https://blog.paymond.me/sitemap.xml

# 检查 robots.txt
curl https://blog.paymond.me/robots.txt

# 检查 CNAME
curl https://blog.paymond.me/CNAME
```

- [ ] ✅ sitemap.xml 可访问
- [ ] ✅ robots.txt 可访问
- [ ] ✅ CNAME 文件存在
- [ ] ✅ 所有 URL 使用 blog.paymond.me

### 3. 样本页面测试
- [ ] ✅ 首页: https://blog.paymond.me
- [ ] ✅ 文章页: https://blog.paymond.me/posts/bmad-reference-manual/
- [ ] ✅ 文章列表: https://blog.paymond.me/posts/
- [ ] ✅ 标签页: https://blog.paymond.me/tags/

---

## 🔧 GitHub Pages 配置

### 在 GitHub 仓库中设置

1. **进入仓库设置**:
   - 访问你的 GitHub 仓库
   - 点击 Settings > Pages

2. **配置自定义域名**:
   ```
   Custom domain: blog.paymond.me
   ✓ Enforce HTTPS (等待证书生成后勾选)
   ```

3. **验证 GitHub Actions**:
   - 检查 Actions 标签，确认部署成功
   - 查看最新的 workflow 运行状态

---

## 🌐 DNS 配置（在域名注册商处）

### 选项 A: 使用 CNAME（推荐）

```
类型: CNAME
名称: blog
值: <your-username>.github.io
TTL: 3600
```

### 选项 B: 使用 A 记录

```
类型: A
名称: blog
值: 185.199.108.153
值: 185.199.109.153
值: 185.199.110.153
值: 185.199.111.153
TTL: 3600
```

### 验证 DNS 传播

```bash
# 检查 DNS 记录
dig blog.paymond.me +short

# 或使用
nslookup blog.paymond.me

# 在线工具
# https://dnschecker.org/
```

**注意**: DNS 传播可能需要 1-24 小时

---

## 📊 SEO 验证（部署后第1周）

### Google Search Console

1. **添加网站**:
   - 访问: https://search.google.com/search-console
   - 点击 "添加资源"
   - 选择 "网域" 或 "网址前缀"
   - 输入: `blog.paymond.me` 或 `https://blog.paymond.me`

2. **验证所有权**（推荐方法）:
   
   **方法1: DNS 验证（推荐）**
   - 在域名 DNS 中添加 TXT 记录
   - 记录由 Google 提供
   
   **方法2: HTML 文件验证**
   - 下载验证文件
   - 放入 `static/` 目录
   - 重新部署

3. **提交 Sitemap**:
   ```
   https://blog.paymond.me/sitemap.xml
   ```

4. **请求索引**:
   - 在 GSC 中使用 "网址检查" 工具
   - 输入主要页面 URL
   - 点击 "请求编入索引"

### Bing Webmaster Tools

1. 访问: https://www.bing.com/webmasters
2. 添加网站: `https://blog.paymond.me`
3. 验证所有权
4. 提交 sitemap

### 百度站长平台

1. 访问: https://ziyuan.baidu.com/
2. 添加网站: `https://blog.paymond.me`
3. 验证所有权
4. 提交 sitemap 和链接

---

## 🧪 测试命令集合

### 完整验证脚本

```bash
#!/bin/bash
echo "🔍 验证 blog.paymond.me 部署"
echo "================================"

# 1. 基础访问
echo -e "\n1️⃣ 测试网站访问..."
curl -I https://blog.paymond.me 2>&1 | grep "HTTP"

# 2. Sitemap
echo -e "\n2️⃣ 检查 Sitemap..."
curl -s https://blog.paymond.me/sitemap.xml | grep -o "blog.paymond.me" | wc -l
echo "   个 blog.paymond.me 引用"

# 3. Robots.txt
echo -e "\n3️⃣ 检查 robots.txt..."
curl -s https://blog.paymond.me/robots.txt | grep "Sitemap:"

# 4. Canonical URL
echo -e "\n4️⃣ 检查 canonical URL..."
curl -s https://blog.paymond.me | grep -o 'canonical.*blog.paymond.me' | head -1

# 5. Open Graph
echo -e "\n5️⃣ 检查 Open Graph..."
curl -s https://blog.paymond.me | grep -o 'og:url.*blog.paymond.me' | head -1

# 6. DNS
echo -e "\n6️⃣ 检查 DNS..."
dig blog.paymond.me +short | head -3

echo -e "\n✅ 验证完成"
```

保存为 `verify-deployment.sh` 并运行:
```bash
chmod +x verify-deployment.sh
./verify-deployment.sh
```

---

## 🎯 关键指标

### 部署成功标志
- ✅ 网站通过 HTTPS 可访问
- ✅ sitemap.xml 包含正确的域名
- ✅ robots.txt 指向正确的 sitemap
- ✅ 所有页面的 canonical URL 正确
- ✅ Open Graph URL 正确
- ✅ DNS 解析正确

### 性能基准
```bash
# 使用 PageSpeed Insights
# https://pagespeed.web.dev/

# 目标:
# - 性能分数 > 90
# - LCP < 2.5s
# - CLS < 0.1
# - FID < 100ms
```

---

## ⚠️ 常见问题排查

### 问题1: 网站无法访问

**可能原因**:
- DNS 尚未传播
- GitHub Pages 未启用
- CNAME 文件丢失

**解决方案**:
```bash
# 检查 DNS
dig blog.paymond.me

# 检查 CNAME 文件
curl https://<username>.github.io/CNAME

# 等待 DNS 传播（最多24小时）
```

### 问题2: HTTPS 证书错误

**可能原因**:
- 证书尚未生成
- DNS 配置错误

**解决方案**:
- 在 GitHub Pages 设置中取消勾选 "Enforce HTTPS"
- 等待 10-30 分钟
- 重新勾选 "Enforce HTTPS"

### 问题3: 404 错误

**可能原因**:
- 页面路径错误
- 构建失败

**解决方案**:
```bash
# 检查 GitHub Actions 构建日志
# 确认所有文件都在 public/ 目录

# 本地测试
hugo server
```

### 问题4: 社交分享预览不正确

**解决方案**:
```bash
# 清除 Facebook 缓存
# https://developers.facebook.com/tools/debug/

# 清除 Twitter 缓存
# https://cards-dev.twitter.com/validator

# 等待几分钟后重试
```

---

## 📱 社交媒体测试

### Facebook/LinkedIn
1. 访问: https://developers.facebook.com/tools/debug/
2. 输入: `https://blog.paymond.me`
3. 点击 "调试"
4. 检查预览效果
5. 点击 "重新抓取"（如果需要）

### Twitter/X
1. 访问: https://cards-dev.twitter.com/validator
2. 输入: `https://blog.paymond.me`
3. 点击 "Preview card"
4. 检查预览效果

---

## 📈 监控设置

### Google Analytics（可选）

1. **创建 GA4 账号**:
   - 访问: https://analytics.google.com/
   - 创建新的资源
   - 获取 Measurement ID (G-XXXXXXXXXX)

2. **添加到 hugo.toml**:
   ```toml
   [params]
     googleAnalyticsID = "G-XXXXXXXXXX"
   ```

3. **验证**:
   - 访问网站
   - 在 GA 实时报告中查看访问

### Microsoft Clarity（推荐，免费）

1. 访问: https://clarity.microsoft.com/
2. 创建项目
3. 获取跟踪代码
4. 添加到 `layouts/partials/head.html`

---

## ✅ 最终检查清单

### 部署前
- [x] baseURL 正确
- [x] CNAME 文件已创建
- [x] SEO 配置完整
- [x] 本地构建成功

### 部署后（第1天）
- [ ] 网站可访问
- [ ] HTTPS 正常
- [ ] sitemap.xml 正确
- [ ] robots.txt 正确
- [ ] DNS 解析正确

### SEO 配置（第1周）
- [ ] Google Search Console 已添加
- [ ] Sitemap 已提交
- [ ] Bing Webmaster Tools 已添加
- [ ] 百度站长平台已添加

### 优化（持续）
- [ ] 性能测试通过
- [ ] 移动端友好
- [ ] 社交分享预览正确
- [ ] 开始获得索引

---

## 📞 需要帮助？

如果遇到问题:
1. 查看 `DOMAIN-UPDATE-REPORT.md` 详细报告
2. 查看 `SEO-GUIDE.md` SEO 指南
3. 查看 GitHub Actions 构建日志
4. 运行 `./scripts/seo-check.sh` 本地检查

---

**准备部署**: ✅  
**文档完整**: ✅  
**配置验证**: ✅

🚀 **现在可以部署了！**

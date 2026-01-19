#!/bin/bash

# Hugo 博客 SEO 检查脚本
# 使用方法: ./scripts/seo-check.sh

echo "🔍 Hugo 博客 SEO 检查工具"
echo "================================"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查是否在正确的目录
if [ ! -f "hugo.toml" ] && [ ! -f "config.toml" ]; then
    echo -e "${RED}❌ 错误: 请在 Hugo 项目根目录运行此脚本${NC}"
    exit 1
fi

echo "1. 检查配置文件..."

# 检查 baseURL
if grep -q "baseURL.*localhost" hugo.toml 2>/dev/null || grep -q "baseURL.*localhost" config.toml 2>/dev/null; then
    echo -e "${RED}❌ baseURL 包含 localhost，生产环境应使用实际域名${NC}"
else
    echo -e "${GREEN}✅ baseURL 配置正确${NC}"
fi

# 检查是否启用 robots.txt
if grep -q "enableRobotsTXT.*true" hugo.toml 2>/dev/null || grep -q "enableRobotsTXT.*true" config.toml 2>/dev/null; then
    echo -e "${GREEN}✅ robots.txt 已启用${NC}"
else
    echo -e "${YELLOW}⚠️  robots.txt 未启用${NC}"
fi

echo ""
echo "2. 检查内容文件..."

# 检查文章是否有 description
echo "检查文章 Front Matter..."
missing_desc=0
for file in content/posts/*.md; do
    if [ -f "$file" ]; then
        # 跳过 _index.md
        if [[ "$(basename $file)" == "_index.md" ]]; then
            continue
        fi
        # 支持 YAML 和 TOML 格式
        if ! grep -q "^description[[:space:]]*[:=]" "$file"; then
            echo -e "${YELLOW}⚠️  缺少 description: $(basename $file)${NC}"
            missing_desc=$((missing_desc + 1))
        fi
    fi
done

if [ $missing_desc -eq 0 ]; then
    echo -e "${GREEN}✅ 所有文章都有 description${NC}"
else
    echo -e "${YELLOW}⚠️  $missing_desc 篇文章缺少 description${NC}"
fi

echo ""
echo "3. 检查必需文件..."

# 检查 sitemap 配置
if grep -q "\[sitemap\]" hugo.toml 2>/dev/null || grep -q "\[sitemap\]" config.toml 2>/dev/null; then
    echo -e "${GREEN}✅ Sitemap 已配置${NC}"
else
    echo -e "${YELLOW}⚠️  Sitemap 未配置${NC}"
fi

# 检查 robots.txt 模板
if [ -f "layouts/robots.txt" ]; then
    echo -e "${GREEN}✅ robots.txt 模板存在${NC}"
else
    echo -e "${YELLOW}⚠️  robots.txt 模板不存在${NC}"
fi

# 检查 SEO partial
if [ -f "layouts/partials/seo_schema.html" ]; then
    echo -e "${GREEN}✅ SEO Schema 模板存在${NC}"
else
    echo -e "${YELLOW}⚠️  SEO Schema 模板不存在${NC}"
fi

echo ""
echo "4. 构建网站并检查输出..."

# 构建网站
if hugo --minify > /dev/null 2>&1; then
    echo -e "${GREEN}✅ 网站构建成功${NC}"
    
    # 检查 sitemap
    if [ -f "public/sitemap.xml" ]; then
        echo -e "${GREEN}✅ sitemap.xml 已生成${NC}"
        
        # 检查 sitemap 中是否有 localhost
        if grep -q "localhost" public/sitemap.xml; then
            echo -e "${RED}❌ sitemap.xml 包含 localhost URL！${NC}"
            echo -e "${YELLOW}   提示: 构建时使用 hugo --minify --baseURL https://你的域名/${NC}"
        else
            echo -e "${GREEN}✅ sitemap.xml URL 正确${NC}"
        fi
    else
        echo -e "${RED}❌ sitemap.xml 未生成${NC}"
    fi
    
    # 检查 robots.txt
    if [ -f "public/robots.txt" ]; then
        echo -e "${GREEN}✅ robots.txt 已生成${NC}"
    else
        echo -e "${YELLOW}⚠️  robots.txt 未生成${NC}"
    fi
    
else
    echo -e "${RED}❌ 网站构建失败${NC}"
fi

echo ""
echo "================================"
echo "📝 SEO 优化建议:"
echo ""
echo "1. 确保每篇文章都有 title, description, tags"
echo "2. 使用描述性的 URL（文件名）"
echo "3. 为图片添加 alt 文本"
echo "4. 建立内部链接"
echo "5. 定期更新内容"
echo "6. 提交 sitemap 到 Google Search Console"
echo ""
echo "📚 详细指南请查看: SEO-GUIDE.md"
echo "================================"

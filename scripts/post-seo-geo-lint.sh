#!/usr/bin/env bash
set -eu

# 这里不能开 pipefail：本脚本大量使用 "printf ... | grep -q" 这种谓词写法，
# grep -q 命中后立即退出会让上游拿到 SIGPIPE，pipefail 会把整条管道判成失败
# （exit 141），进而把正常的 front matter 判成缺失。

# 让 wc -m 按字符而不是字节计数。GitHub Actions 的默认 locale 不保证是 UTF-8，
# 按字节计数会把中文文章的 description 判成超长。逐个候选 locale 实测「中」的
# 计数是否为 1，避免选中 macOS 上按字节计数的 C.UTF-8。
for _locale_candidate in en_US.UTF-8 C.UTF-8 C.utf8 UTF-8; do
  if locale -a 2>/dev/null | grep -qx "$_locale_candidate" &&
    [[ "$(printf '中' | LC_ALL="$_locale_candidate" wc -m | tr -d ' ')" == "1" ]]; then
    export LC_ALL="$_locale_candidate"
    export LANG="$_locale_candidate"
    break
  fi
done

errors=0

for file in content/posts/*.md; do
  base="$(basename "$file")"
  if [[ "$base" == "_index.md" ]]; then
    continue
  fi

  if ! grep -qE '^\+\+\+$' "$file"; then
    echo "ERROR: $file must use TOML front matter (+++)."
    errors=$((errors + 1))
    continue
  fi

  fm="$(awk '
    BEGIN {count=0}
    /^\+\+\+$/ {count++; next}
    count==1 {print}
    count==2 {exit}
  ' "$file")"

  body="$(awk '
    BEGIN {count=0}
    /^\+\+\+$/ {count++; next}
    count>=2 {print}
  ' "$file")"

  required_keys=(title description date draft tags)
  for key in "${required_keys[@]}"; do
    if ! printf "%s\n" "$fm" | grep -qE "^${key}[[:space:]]*="; then
      echo "ERROR: $file missing front matter key: $key"
      errors=$((errors + 1))
    fi
  done

  if printf "%s\n" "$fm" | grep -qE '^tags[[:space:]]*=[[:space:]]*\[[[:space:]]*\]'; then
    echo "ERROR: $file has empty tags."
    errors=$((errors + 1))
  fi

  tags_line="$(printf "%s\n" "$fm" | grep -E '^tags[[:space:]]*=' || true)"
  draft_value="$(printf "%s\n" "$fm" | sed -nE "s/^draft[[:space:]]*=[[:space:]]*(true|false).*/\1/p" | head -n 1)"
  page_lang="$(printf "%s\n" "$fm" | sed -nE "s/^pageLang[[:space:]]*=[[:space:]]*'(.*)'$/\1/p" | head -n 1)"
  # 中文文章统一用中文词表；英文文章本来就该用英文标签，不受这条限制。
  if [[ "$page_lang" != "en" ]] && printf "%s\n" "$tags_line" | grep -qF "AI Agent"; then
    echo "ERROR: $file uses legacy tag 'AI Agent'. Use 'AI代理' for consistency."
    errors=$((errors + 1))
  fi
  if [[ "$draft_value" == "false" ]] && printf "%s\n" "$tags_line" | grep -qF "待分类"; then
    echo "ERROR: $file is published but still uses placeholder tag '待分类'."
    errors=$((errors + 1))
  fi

  description="$(printf "%s\n" "$fm" | sed -nE "s/^description[[:space:]]*=[[:space:]]*'(.*)'$/\1/p" | head -n 1)"
  if [[ -n "$description" ]]; then
    desc_len="$(printf "%s" "$description" | wc -m | tr -d ' ')"
    if (( desc_len < 50 || desc_len > 180 )); then
      echo "ERROR: $file description length should be 50-180 chars (current: $desc_len)."
      errors=$((errors + 1))
    fi
  fi

  if grep -qF '![](' "$file"; then
    echo "ERROR: $file contains image without alt text."
    errors=$((errors + 1))
  fi

  body_chars="$(printf "%s" "$body" | wc -m | tr -d ' ')"
  if (( body_chars > 1200 )); then
    if ! printf "%s\n" "$body" | grep -qE '参考来源|参考资料|参考文献|资源链接|References|Sources|Further reading'; then
      echo "ERROR: $file is long-form content and must include a references section."
      errors=$((errors + 1))
    fi
    if ! printf "%s\n" "$body" | grep -qE '\]\(https?://'; then
      echo "ERROR: $file is long-form content and must cite external URLs."
      errors=$((errors + 1))
    fi
  fi
done

if (( errors > 0 )); then
  echo "SEO/GEO lint failed with $errors error(s)."
  exit 1
fi

echo "SEO/GEO lint passed."

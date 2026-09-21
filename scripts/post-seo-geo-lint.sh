#!/usr/bin/env bash
set -euo pipefail

errors=0

for file in content/posts/*.md; do
  base="$(basename "$file")"
  if [[ "$base" == "_index.md" ]]; then
    continue
  fi

  if ! rg -q '^\+\+\+$' "$file"; then
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
    if ! printf "%s\n" "$fm" | rg -q "^${key}[[:space:]]*="; then
      echo "ERROR: $file missing front matter key: $key"
      errors=$((errors + 1))
    fi
  done

  if printf "%s\n" "$fm" | rg -q '^tags[[:space:]]*=[[:space:]]*\[[[:space:]]*\]'; then
    echo "ERROR: $file has empty tags."
    errors=$((errors + 1))
  fi

  tags_line="$(printf "%s\n" "$fm" | rg '^tags[[:space:]]*=')"
  draft_value="$(printf "%s\n" "$fm" | sed -nE "s/^draft[[:space:]]*=[[:space:]]*(true|false).*/\1/p" | head -n 1)"
  page_lang="$(printf "%s\n" "$fm" | sed -nE "s/^pageLang[[:space:]]*=[[:space:]]*'(.*)'$/\1/p" | head -n 1)"
  # 中文文章统一用中文词表；英文文章本来就该用英文标签，不受这条限制。
  if [[ "$page_lang" != "en" ]] && printf "%s\n" "$tags_line" | rg -q "AI Agent"; then
    echo "ERROR: $file uses legacy tag 'AI Agent'. Use 'AI代理' for consistency."
    errors=$((errors + 1))
  fi
  if [[ "$draft_value" == "false" ]] && printf "%s\n" "$tags_line" | rg -q "待分类"; then
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

  if rg -q '!\[\]\(' "$file"; then
    echo "ERROR: $file contains image without alt text."
    errors=$((errors + 1))
  fi

  body_chars="$(printf "%s" "$body" | wc -m | tr -d ' ')"
  if (( body_chars > 1200 )); then
    if ! printf "%s\n" "$body" | rg -q '参考来源|参考资料|参考文献|资源链接|References|Sources|Further reading'; then
      echo "ERROR: $file is long-form content and must include a references section."
      errors=$((errors + 1))
    fi
    if ! printf "%s\n" "$body" | rg -q '\]\(https?://'; then
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
